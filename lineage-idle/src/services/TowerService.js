/**
 * TowerService.js — Motor da Torre da Insolência (Tower of Insolence) do Lineage Idle.
 *
 * Responsável pela definição de andares (1 a 100), desafios de chefes de andar,
 * bônus permanente acumulativo por andar concluído e sistema de Varredura Diária (Sweep).
 */

import { D } from '../core/GameConfig.js';
import { MONSTERS } from '../data/monsters.js';
import { addToInventory } from './InventoryService.js';
import { triggerQuestEvent } from './QuestService.js';
import { startCombat, stopCombat } from '../engine/CombatEngine.js';

/**
 * Retorna as propriedades e estatísticas de um andar da Torre.
 * @param {number} floorNum — Número do andar (1 a 100)
 * @returns {Object} Definição do andar
 */
export function getTowerFloorDef(floorNum) {
  const f = Math.max(1, Math.min(100, Number(floorNum) || 1));
  const isBoss = f % 10 === 0;

  const names = {
    10: '哈拉特，高塔守護者（首領）',
    20: '克妮亞，鮮血女皇（首領）',
    30: '瓦蘭，黑暗大公（首領）',
    40: '卡瓦坦，艾爾摩守護者（首領）',
    50: '巴溫，不死皇帝（首領）',
    60: '銀河，太古存在（首領）',
    70: '希爾海德，鋼鐵泰坦（首領）',
    80: '戈爾貢達，王國毀滅者（首領）',
    90: '維德雷特，惡魔守護者（首領）',
    100: '傲慢大天使（最終首領）'
  };

  const name = names[f] || (isBoss ? `第 ${f} 層守護者（首領）` : `傲慢戰士（等級 ${f}）`);
  const reqLvl = Math.min(100, Math.floor(f * 0.95) + 1);

  const baseHp = Math.floor(120 * Math.pow(1.12, f - 1) * (isBoss ? 2.5 : 1));
  const baseAtk = Math.floor(18 * Math.pow(1.09, f - 1) * (isBoss ? 1.4 : 1));
  const baseDef = Math.floor(10 * Math.pow(1.08, f - 1));

  const mdef = Math.floor(8 * Math.pow(1.07, f - 1));
  const goldReward = Math.floor(300 * Math.pow(1.10, f - 1) * (isBoss ? 3 : 1));
  const spReward = Math.floor(12 * f * (isBoss ? 2 : 1));

  return {
    floor: f,
    name,
    isBoss,
    reqLvl,
    hp: baseHp,
    atk: baseAtk,
    def: baseDef,
    mdef,
    xp: Math.floor(120 * f * 1.5),
    sp: spReward,
    gold: goldReward,
    rewardLamps: isBoss ? Math.floor(f / 10) : 0,
    rewardCrystals: isBoss ? (f >= 50 ? 'crystal_s' : 'crystal_a') : null
  };
}

/**
 * Calculates the minimum CP required to enter a tower floor.
 * Scales exponentially with floor number to match monster stat growth.
 * @param {number} floorNum
 * @returns {number} Minimum CP
 */
export function getTowerFloorMinimumCP(floorNum) {
  const f = Math.max(1, Math.min(100, Number(floorNum) || 1));
  // Base CP of 500 scaling at 1.10× per floor
  return Math.floor(500 * Math.pow(1.10, f - 1));
}

/**
 * Calculates the recommended CP for comfortable tower floor clearing.
 * Approximately 1.45× the minimum CP.
 * @param {number} floorNum
 * @returns {number} Recommended CP
 */
export function getTowerFloorRecommendedCP(floorNum) {
  return Math.floor(getTowerFloorMinimumCP(floorNum) * 1.45);
}

/**
 * Inicia o desafio ao andar atual da Torre da Insolência.
 * @param {Object} state
 * @param {Object} [callbacks] — { log, floatText, el, renderStageMonster, attackMonster }
 */
export function challengeTowerFloor(state, callbacks = {}) {
  state.tower = state.tower || { highestFloor: 0, currentFloor: 1, lastSweepTime: 0 };
  const targetFloor = (state.tower.highestFloor || 0) + 1;
  if (targetFloor > 100) {
    if (callbacks.log) callbacks.log('🏆 你已攻略傲慢之塔全部 100 層！', 'rarity-legendary');
    return;
  }

  const fDef = getTowerFloorDef(targetFloor);

  if (state.level < fDef.reqLvl) {
    if (callbacks.log) callbacks.log(`⚠️ 等級不足！第 ${targetFloor} 層需要等級 ${fDef.reqLvl}。`, 'system');
    return;
  }

  if (callbacks.log) callbacks.log(`🏰 挑戰第 ${targetFloor} 層：**${fDef.name}**！`, 'rarity-legendary');
  if (callbacks.floatText) callbacks.floatText(`第 ${targetFloor} 層！`, 'float-jackpot');

  const towerMonsterId = `tower_floor_${targetFloor}`;
  const monsterObj = {
    id: towerMonsterId,
    name: fDef.name,
    hp: fDef.hp,
    _maxHp: fDef.hp,
    maxHp: fDef.hp,
    atk: fDef.atk,
    def: fDef.def,
    eva: Math.min(20, Math.floor(fDef.floor / 5)),
    xp: fDef.xp,
    sp: fDef.sp,
    gold: [fDef.gold, Math.floor(fDef.gold * 1.3)],
    boss: fDef.isBoss,
    isTower: true,
    towerFloor: targetFloor,
    _stunnedUntil: 0
  };

  if (state.zone) {
    state.lastHuntingZone = state.zone;
  }
  state.towerCombatActive = true;
  state.towerStartTime = Date.now();

  MONSTERS[towerMonsterId] = monsterObj;
  if (typeof window !== 'undefined') {
    if (window.GameData?.MONSTERS) window.GameData.MONSTERS[towerMonsterId] = monsterObj;
    if (window.ALL_MONSTERS) window.ALL_MONSTERS[towerMonsterId] = monsterObj;
  }
  state.target = towerMonsterId;
  state.activeMonster = monsterObj;
  if (!state.zone) state.zone = 'talkingIsland';

  if (callbacks.el) {
    const sz = callbacks.el('stage-zone');
    if (sz) sz.textContent = `🏰 高塔副本 · 第 ${targetFloor} 層（60 秒）`;
    const zn = callbacks.el('zone-name');
    if (zn) zn.textContent = `高塔第 ${targetFloor} 層`;
  }

  stopCombat(state);
  startCombat(state, callbacks);
  if (callbacks.renderStageMonster) callbacks.renderStageMonster();
}

/**
 * Finaliza com vitória a conquista de um andar da Torre.
 * @param {Object} state
 * @param {number} floorNum
 * @param {Object} [callbacks]
 */
export function completeTowerFloor(state, floorNum, callbacks = {}) {
  state.towerCombatActive = false;
  state.tower = state.tower || { highestFloor: 0, currentFloor: 1, lastSweepTime: 0 };
  if (floorNum > state.tower.highestFloor) {
    state.tower.highestFloor = floorNum;
    state.tower.currentFloor = Math.min(100, floorNum + 1);

    const fDef = getTowerFloorDef(floorNum);
    if (callbacks.log) callbacks.log(`🏆 勝利！已攻略第 ${floorNum} 層！永久 ATK／DEF +${floorNum}%！`, 'rarity-legendary');
    if (callbacks.floatText) callbacks.floatText(`第 ${floorNum} 層攻略完成！`, 'float-jackpot');

    if (fDef.rewardLamps > 0) {
      state.magicLamps = (state.magicLamps || 0) + fDef.rewardLamps;
      if (callbacks.log) callbacks.log(`🪔 首次擊破獎勵：+${fDef.rewardLamps} 個魔法神燈！`, 'rarity-epic');
    }
    if (fDef.rewardCrystals) {
      addToInventory(state, fDef.rewardCrystals, 3, null, false, callbacks);
      const gData = D();
      const cName = gData?.ALL_ITEMS?.[fDef.rewardCrystals]?.name || fDef.rewardCrystals;
      if (callbacks.log) callbacks.log(`✨ 首次擊破獎勵：+3x ${cName}！`, 'rarity-legendary');
    }

    triggerQuestEvent(state, 'boss', 1);
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save(true, true);
}

/**
 * Realiza a Varredura Diária (Sweep) da Torre da Insolência coletando 50% dos recursos de todos os andares conquistados.
 * @param {Object} state
 * @param {Object} [callbacks]
 */
export function sweepTowerDaily(state, callbacks = {}) {
  state.tower = state.tower || { highestFloor: 0, currentFloor: 1, lastSweepTime: 0 };
  const highest = state.tower.highestFloor || 0;
  if (highest < 1) {
    if (callbacks.log) callbacks.log('至少攻略高塔 1 層才能進行每日掃蕩！', 'system');
    return;
  }

  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  if (state.tower.lastSweepTime && (now - state.tower.lastSweepTime) < ONE_DAY) {
    if (callbacks.log) callbacks.log('今天已完成每日掃蕩！請明天再來。', 'system');
    return;
  }

  state.tower.lastSweepTime = now;

  let totalGold = 0;
  let totalSp = 0;
  for (let i = 1; i <= highest; i++) {
    const fDef = getTowerFloorDef(i);
    totalGold += Math.floor(fDef.gold * 0.5);
    totalSp += Math.floor(fDef.sp * 0.5);
  }

  state.gold = (state.gold || 0) + totalGold;
  state.sp = (state.sp || 0) + totalSp;

  if (callbacks.log) callbacks.log(`🧹 高塔掃蕩完成！領取 ${highest} 層獎勵：+${totalGold.toLocaleString()} 金幣、+${totalSp.toLocaleString()} 技能點！`, 'rarity-legendary');
  if (callbacks.floatText) callbacks.floatText(`+${totalGold.toLocaleString()}g 掃蕩獎勵！`, 'float-jackpot');

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save(true, true);
}
