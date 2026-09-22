/**
 * AlchemyService.js — Módulo de 鍊金術, Cadinho de Almas & Invocação do Chefe do Caos.
 */

import { D } from '../core/GameConfig.js';
import { ALL_ITEMS as CATALOG_ALL_ITEMS } from '../data/items/index.js';
import { addToInventory, getInventoryCount } from './InventoryService.js';
import {
  CHAOS_BOSS_SUMMON_COST,
  CHAOS_BOSS_STAT_MULTIPLIERS,
  CHAOS_BOSS_DROPLIST_BY_SEASON,
  getSeasonForLevel
} from '../data/economy/chaosBossBalance.js';
import { chargeRandomCraft } from './CraftService.js';

export function getItemDef(itemId) {
  if (!itemId) return null;
  const data = D();
  return data?.ALL_ITEMS?.[itemId] || CATALOG_ALL_ITEMS?.[itemId] || null;
}

export const ESSENCES_PER_GRADE = {
  'nograde': 1,
  'no-grade': 1,
  'ng': 1,
  'd': 3,
  'c': 8,
  'b': 20,
  'a': 50,
  's': 120,
  'frostlord': 300,
  'frost': 300
};

export const ESSENCE_FEE_PER_GRADE = {
  'nograde': 50,
  'no-grade': 50,
  'ng': 50,
  'd': 150,
  'c': 400,
  'b': 1000,
  'a': 2500,
  's': 6000,
  'frostlord': 15000,
  'frost': 15000
};

export const ALCHEMY_RECIPES = {
  elixir_berserker: {
    id: 'elixir_berserker',
    name: '狂戰士靈藥',
    icon: '⚔️',
    desc: '+15% 物理攻擊、+10% 攻擊速度，持續 1 小時',
    cost: { fire: 15, wind: 10 },
    gold: 2500,
    duration: 3600000
  },
  elixir_arcanist: {
    id: 'elixir_arcanist',
    name: '奧術師靈藥',
    icon: '🔮',
    desc: '+20% 魔法攻擊、+50% 魔力恢復，持續 1 小時',
    cost: { water: 15, fire: 10 },
    gold: 2500,
    duration: 3600000
  },
  elixir_fortune: {
    id: 'elixir_fortune',
    name: '幸運靈藥',
    icon: '💰',
    desc: '+25% 掉落率、+30% 金幣獲得量，持續 1 小時',
    cost: { earth: 20, water: 15 },
    gold: 5000,
    duration: 3600000
  },
  elixir_titan: {
    id: 'elixir_titan',
    name: '泰坦靈藥',
    icon: '🛡️',
    desc: '+25% 最大生命值、+20% 物理防禦，持續 1 小時',
    cost: { earth: 25, fire: 15 },
    gold: 5000,
    duration: 3600000
  },
  elixir_transcendence: {
    id: 'elixir_transcendence',
    name: '超越靈藥',
    icon: '✨',
    desc: '+20% 經驗值、+20% 技能點獲得量，持續 1 小時',
    cost: { water: 25, wind: 20 },
    gold: 10000,
    duration: 3600000
  },
  boss_summon_stone: {
    id: 'boss_summon_stone',
    name: '深淵召喚石',
    icon: '🌀',
    desc: '在放置模式撕裂空間，召喚擁有頂級掉落的【混沌】首領！',
    cost: { fire: 50, water: 50 },
    gold: 25000,
    duration: 0,
    isItem: true,
    itemId: 'boss_summon_stone'
  }
};

/**
 * Retorna o tipo de essência gerada por um equipamento.
 */
export function getEssenceTypeForItem(def) {
  if (!def) return 'fire';
  const slot = String(def.slot || '').toLowerCase();
  const type = String(def.type || '').toLowerCase();
  const element = String(def.element || def.elemental || '').toLowerCase();

  if (element === 'water' || slot.includes('robe') || type.includes('robe')) {
    return 'water';
  }
  if (element === 'fire' || ['weapon', 'sword', 'mace', 'dagger', 'bow', 'staff', 'spear', 'dualsword', 'kris', 'axe', 'hammer', 'fist', 'rapier'].some(x => slot.includes(x) || type.includes(x))) {
    return 'fire';
  }
  if (element === 'earth' || ['armor', 'shield', 'helmet', 'chest', 'legs', 'sigil'].some(x => slot.includes(x) || type.includes(x))) {
    return 'earth';
  }
  if (element === 'wind' || ['boots', 'gloves', 'cloak', 'belt', 'hair'].some(x => slot.includes(x) || type.includes(x))) {
    return 'wind';
  }
  if (['ring', 'necklace', 'earring', 'talisman', 'agathion', 'accessory'].some(x => slot.includes(x) || type.includes(x))) {
    return 'water';
  }
  return 'fire';
}

/**
 * Retorna o grau do item normalizado para 鍊金術.
 */
export function getGradeForItem(def, inv) {
  if (inv && inv.rarity) {
    const r = String(inv.rarity).toLowerCase();
    if (r.includes('frost') || r === 'sovereign') return 'frostlord';
    if (r.includes('legend') || r === 's' || r === 'primordial') return 's';
    if (r.includes('epic') || r === 'a') return 'a';
    if (r.includes('rare') || r === 'b') return 'b';
    if (r.includes('uncommon') || r === 'c') return 'c';
    if (r === 'd') return 'd';
  }
  if (def) {
    if (def.req?.level) {
      const lvl = Number(def.req.level) || 0;
      if (lvl >= 85) return 'frostlord';
      if (lvl >= 76) return 's';
      if (lvl >= 62) return 'a';
      if (lvl >= 52) return 'b';
      if (lvl >= 40) return 'c';
      if (lvl >= 20) return 'd';
      return 'nograde';
    }
    if (def.tier !== undefined) {
      const t = Number(def.tier) || 1;
      if (t >= 7) return 'frostlord';
      if (t === 6) return 's';
      if (t === 5) return 'a';
      if (t === 4) return 'b';
      if (t === 3) return 'c';
      if (t === 2) return 'd';
      if (t <= 1) return 'nograde';
    }
  }
  return 'nograde';
}

/**
 * Calcula o rendimento de essências e taxa para um item.
 */
export function getDissolveYield(inv, def) {
  const grade = getGradeForItem(def, inv);
  const essenceType = getEssenceTypeForItem(def);
  const count = ESSENCES_PER_GRADE[grade] || 1;
  const fee = ESSENCE_FEE_PER_GRADE[grade] || 50;
  return {
    grade,
    essenceType,
    count,
    fee,
    essences: {
      fire: essenceType === 'fire' ? count : 0,
      earth: essenceType === 'earth' ? count : 0,
      wind: essenceType === 'wind' ? count : 0,
      water: essenceType === 'water' ? count : 0
    }
  };
}

/**
 * Dissolve um item individual no Cadinho de Almas.
 */
export function dissolveItem(state, uid, callbacks = {}) {
  const log = callbacks.log || (() => {});
  const updateAllUI = callbacks.updateAllUI || (() => {});
  const save = callbacks.save || (() => {});

  if (!state.inventory || !Array.isArray(state.inventory)) return false;
  const idx = state.inventory.findIndex(i => i.uid === uid);
  if (idx < 0) return false;
  const inv = state.inventory[idx];

  const equippedUids = Object.values(state.equipment || {}).filter(Boolean);
  if (equippedUids.includes(uid) || inv.equipped) {
    log('⚠️ 無法分解正在使用中的裝備！', 'warning');
    return false;
  }

  if (state.lockedItems && state.lockedItems.includes(uid)) {
    log('🔒 此物品已鎖定，無法出售／分解！', 'warning');
    return false;
  }

  const def = getItemDef(inv.itemId);
  const slot = (def?.slot || '').toLowerCase();
  const EQUIP_SLOTS = ['weapon', 'armor', 'shield', 'helmet', 'gloves', 'boots', 'legs', 'ring', 'necklace', 'earring', 'belt', 'cloak', 'sigil'];
  if (!def || !EQUIP_SLOTS.includes(slot) || def.stack || def.isQuestItem || def.type === 'material' || def.type === 'quest' || def.type === 'consumable') {
    log('⚠️ 只有裝備可以在靈魂熔爐中分解！', 'warning');
    return false;
  }

  const yieldData = getDissolveYield(inv, def);
  if ((state.gold || 0) < yieldData.fee) {
    log(`⚠️ 金幣不足，無法進行煉金！需要 ${yieldData.fee.toLocaleString()} 金幣。`, 'warning');
    return false;
  }

  state.gold -= yieldData.fee;
  state.inventory.splice(idx, 1);

  if (!state.essences) state.essences = { fire: 0, earth: 0, wind: 0, water: 0 };
  if (state.essences.astral !== undefined) {
    state.essences.water = (state.essences.water || 0) + state.essences.astral;
    delete state.essences.astral;
  }
  state.essences[yieldData.essenceType] = (state.essences[yieldData.essenceType] || 0) + yieldData.count;

  const typeLabels = { fire: '火 🔥', earth: '地 🛡️', wind: '風 🍃', water: '水 💧' };
  log(`🔥 靈魂熔爐：已分解 [${def.name}]（+${yieldData.count} ${typeLabels[yieldData.essenceType] || yieldData.essenceType} 精華）！`, 'loot');

  updateAllUI();
  save();
  return true;
}

/**
 * Dissolve em lote todos os equipamentos de um determinado Grau.
 */
export function dissolveItemsByGrade(state, targetGrade = 'all', callbacks = {}) {
  const log = callbacks.log || (() => {});
  const updateAllUI = callbacks.updateAllUI || (() => {});
  const save = callbacks.save || (() => {});

  if (!state.inventory || !Array.isArray(state.inventory)) return 0;
  const equippedSet = new Set(Object.values(state.equipment || {}).filter(Boolean));
  const lockedSet = new Set(state.lockedItems || []);
  const EQUIP_SLOTS = ['weapon', 'armor', 'shield', 'helmet', 'gloves', 'boots', 'legs', 'ring', 'necklace', 'earring', 'belt', 'cloak', 'sigil'];

  const toDissolve = [];
  for (const inv of state.inventory) {
    if (inv.equipped || equippedSet.has(inv.uid) || lockedSet.has(inv.uid)) continue;
    const def = getItemDef(inv.itemId);
    if (!def) continue;
    const slot = (def.slot || '').toLowerCase();
    if (!EQUIP_SLOTS.includes(slot) || def.stack || def.isQuestItem || def.type === 'material' || def.type === 'quest' || def.type === 'consumable') continue;

    const grade = getGradeForItem(def, inv);
    const isTarget = targetGrade === 'all'
      || (targetGrade === 'nograde' && (grade === 'nograde' || grade === 'no-grade' || grade === 'ng'))
      || (targetGrade === 'd' && grade === 'd')
      || (targetGrade === 'c' && grade === 'c')
      || (targetGrade === 'b' && grade === 'b')
      || (targetGrade === 'a' && grade === 'a')
      || (targetGrade === 's' && grade === 's');

    if (isTarget) {
      toDissolve.push({ inv, def, grade });
    }
  }

  if (toDissolve.length === 0) {
    log(`⚠️ 沒有可分解的未裝備 ${targetGrade.toUpperCase()} 級裝備！`, 'warning');
    return 0;
  }

  let totalFee = 0;
  let totalEssences = { fire: 0, earth: 0, wind: 0, water: 0 };
  let count = 0;

  for (const { inv, def, grade } of toDissolve) {
    const fee = ESSENCE_FEE_PER_GRADE[grade] || 50;
    if ((state.gold || 0) < totalFee + fee) break;

    totalFee += fee;
    const type = getEssenceTypeForItem(def);
    const amount = ESSENCES_PER_GRADE[grade] || 1;
    totalEssences[type] = (totalEssences[type] || 0) + amount;
    count++;

    const idx = state.inventory.indexOf(inv);
    if (idx >= 0) state.inventory.splice(idx, 1);
  }

  if (count === 0) {
    log('⚠️ 金幣不足，無法進行批次分解！', 'warning');
    return 0;
  }

  state.gold -= totalFee;
  if (!state.essences) state.essences = { fire: 0, earth: 0, wind: 0, water: 0 };
  if (state.essences.astral !== undefined) {
    state.essences.water = (state.essences.water || 0) + state.essences.astral;
    delete state.essences.astral;
  }
  for (const [type, amt] of Object.entries(totalEssences)) {
    if (amt > 0) state.essences[type] = (state.essences[type] || 0) + amt;
  }

  log(`🔥 靈魂熔爐：已分解 ${count} 件裝備（+${totalEssences.fire} 🔥、+${totalEssences.earth} 🛡️、+${totalEssences.wind} 🍃、+${totalEssences.water} 💧）！`, 'rarity-legendary');
  updateAllUI();
  save();
  return count;
}

/**
 * Dissolve todos os equipamentos lixo (No-Grade, D e C) desequipados e não travados.
 */
export function dissolveAllJunkEquipment(state, callbacks = {}) {
  const grades = ['nograde', 'd', 'c'];
  let total = 0;
  for (const g of grades) {
    total += dissolveItemsByGrade(state, g, callbacks);
  }
  return total;
}

/**
 * Fabrica um elixir alquímico ou item especial.
 */
export function craftElixir(state, recipeId, qty = 1, callbacks = {}) {
  const log = callbacks.log || (() => {});
  const updateAllUI = callbacks.updateAllUI || (() => {});
  const save = callbacks.save || (() => {});

  const recipe = ALCHEMY_RECIPES[recipeId];
  if (!recipe) return false;
  const count = Math.max(1, Math.floor(qty));
  const totalGold = recipe.gold * count;

  if ((state.gold || 0) < totalGold) {
    log(`⚠️ 金幣不足！需要 ${totalGold.toLocaleString()} 金幣。`, 'warning');
    return false;
  }

  if (!state.essences) state.essences = { fire: 0, earth: 0, wind: 0, water: 0 };
  if (state.essences.astral !== undefined) {
    state.essences.water = (state.essences.water || 0) + state.essences.astral;
    delete state.essences.astral;
  }
  for (const [type, amt] of Object.entries(recipe.cost)) {
    const required = amt * count;
    if ((state.essences[type] || 0) < required) {
      const essenceLabel = { fire: '火', earth: '地', wind: '風', water: '水' }[type] || type;
      log(`⚠️ 精華不足！需要 ${required} 個${essenceLabel}精華。`, 'warning');
      return false;
    }
  }

  state.gold -= totalGold;
  for (const [type, amt] of Object.entries(recipe.cost)) {
    state.essences[type] -= amt * count;
  }

  if (recipe.isItem) {
    addToInventory(state, recipe.itemId || recipeId, count, 'rare', false, { log, updateAllUI, save }, true);
    log(`🧪 鍊金：製作了 ${count}×【${recipe.name}】並放入背包！`, 'loot');
  } else {
    if (!state.activeElixirs) state.activeElixirs = {};
    if (!state.buffs) state.buffs = {};
    const now = Date.now();
    const currentExpiry = state.activeElixirs[recipeId] && state.activeElixirs[recipeId] > now
      ? state.activeElixirs[recipeId]
      : now;
    const finalExpiry = currentExpiry + recipe.duration * count;
    state.activeElixirs[recipeId] = finalExpiry;
    state.buffs[recipeId] = {
      name: recipe.name,
      icon: recipe.icon,
      desc: recipe.desc,
      amount: 1,
      until: finalExpiry,
      isElixir: true
    };
    log(`🧪 已啟用 ${recipe.name} ${count} 小時！加成已套用至狀態效果與屬性！`, 'rarity-legendary');
  }

  updateAllUI();
  save();
  return true;
}

/**
 * Invoca um Chefe do Caos (Chaos Boss) usando a Pedra de Convocação Abissal.
 */
export function useChaosBossSummonStone(state, callbacks = {}) {
  const log = callbacks.log || (() => {});
  const updateAllUI = callbacks.updateAllUI || (() => {});
  const save = callbacks.save || (() => {});
  const floatText = callbacks.floatText || (() => {});

  const stoneCount = getInventoryCount(state, 'boss_summon_stone');
  if (stoneCount <= 0) {
    log('⚠️ 你的背包中沒有【深淵召喚石】！請先在煉金系統製作。', 'warning');
    return false;
  }

  // Consome 1 pedra da mochila
  const idx = state.inventory.findIndex(i => i.itemId === 'boss_summon_stone' && !i.equipped);
  if (idx >= 0) {
    if ((state.inventory[idx].count || 1) > 1) {
      state.inventory[idx].count--;
    } else {
      state.inventory.splice(idx, 1);
    }
  }

  const gData = D();
  const bosses = [
    { id: 'queen_ant', name: '蟻后', level: 40, hp: 120000, atk: 450, def: 220, exp: 35000, sp: 8000, gold: 50000, icon: 'monsters/queen_ant.png' },
    { id: 'core', name: '克魯瑪高塔核心', level: 50, hp: 200000, atk: 650, def: 350, exp: 60000, sp: 15000, gold: 80000, icon: 'monsters/core.png' },
    { id: 'orfen', name: '孢子之海歐爾芬', level: 60, hp: 350000, atk: 900, def: 480, exp: 110000, sp: 28000, gold: 120000, icon: 'monsters/orfen.png' },
    { id: 'zaken', name: '海賊王札肯', level: 70, hp: 600000, atk: 1300, def: 650, exp: 220000, sp: 55000, gold: 200000, icon: 'monsters/zaken.png' },
    { id: 'baium', name: '皇帝巴溫', level: 75, hp: 1200000, atk: 2200, def: 900, exp: 450000, sp: 120000, gold: 400000, icon: 'monsters/baium.png' },
    { id: 'barakiel', name: '光輝之炎巴拉基爾', level: 80, hp: 1800000, atk: 2800, def: 1200, exp: 700000, sp: 200000, gold: 600000, icon: 'monsters/barakiel.png' },
    { id: 'frintezza', name: '王子弗林泰沙與哈里沙', level: 85, hp: 2500000, atk: 3600, def: 1500, exp: 1100000, sp: 320000, gold: 900000, icon: 'monsters/frintezza.png' },
    { id: 'antharas', name: '地龍安塔瑞斯', level: 90, hp: 4000000, atk: 5000, def: 2000, exp: 2000000, sp: 600000, gold: 1500000, icon: 'monsters/antharas.png' },
    { id: 'valakas', name: '火龍巴拉卡斯', level: 95, hp: 6000000, atk: 6800, def: 2600, exp: 3500000, sp: 1000000, gold: 2500000, icon: 'monsters/valakas.png' }
  ];

  // Escala com o nível atual do jogador
  const playerLvl = state.level || 1;
  const eligibleBosses = bosses.filter(b => b.level <= playerLvl + 15);
  const baseBoss = eligibleBosses.length > 0
    ? eligibleBosses[Math.floor(Math.random() * eligibleBosses.length)]
    : bosses[0];

  const chaosHp = Math.floor(baseBoss.hp * CHAOS_BOSS_STAT_MULTIPLIERS.hp);
  const chaosBoss = {
    ...baseBoss,
    id: `chaos_${baseBoss.id}`,
    baseId: baseBoss.id,
    name: `[混沌] ${baseBoss.name}`,
    title: '👑 混沌首領',
    isChaosBoss: true,
    isBoss: true,
    isRaid: true,
    isRaidBoss: true,
    boss: true,
    level: baseBoss.level,
    hp: chaosHp,
    maxHp: chaosHp,
    _maxHp: chaosHp,
    _stunnedUntil: 0,
    _triggeredMechanics: {},
    atk: Math.floor(baseBoss.atk * CHAOS_BOSS_STAT_MULTIPLIERS.atk),
    def: Math.floor(baseBoss.def * CHAOS_BOSS_STAT_MULTIPLIERS.def),
    exp: Math.floor(baseBoss.exp * CHAOS_BOSS_STAT_MULTIPLIERS.exp),
    sp: Math.floor(baseBoss.sp * CHAOS_BOSS_STAT_MULTIPLIERS.sp),
    gold: Math.floor(baseBoss.gold * CHAOS_BOSS_STAT_MULTIPLIERS.gold),
    icon: baseBoss.icon
  };

  state.activeMonster = chaosBoss;
  state.target = chaosBoss.id;
  state.isRaidActive = false; // Permite combate idle normal

  log(`🌀 混沌裂隙已開啟！你在戰鬥模式召喚了 ${chaosBoss.name}！`, 'rarity-legendary');
  floatText('🌀 混沌首領已召喚！', 'float-meteor');

  if (callbacks.renderStageMonster) {
    try { callbacks.renderStageMonster(); } catch (e) {}
  }

  updateAllUI();
  save();
  return true;
}

/**
 * Processa a entrega dos drops especiais do Caos ao abater um Chaos Boss.
 */
export function processChaosBossLoot(state, monster, callbacks = {}) {
  if (!monster || !monster.isChaosBoss) return;
  const log = callbacks.log || (() => {});
  const updateAllUI = callbacks.updateAllUI || (() => {});
  const save = callbacks.save || (() => {});

  log(`👑 歷史性勝利！混沌首領 ${monster.name} 已敗於你的力量！`, 'rarity-legendary');

  const season = getSeasonForLevel(state.level || 1);
  const droplist = CHAOS_BOSS_DROPLIST_BY_SEASON[season] || CHAOS_BOSS_DROPLIST_BY_SEASON[1];

  // 1. Drops Garantidos da Temporada
  if (Array.isArray(droplist.guaranteed)) {
    for (const drop of droplist.guaranteed) {
      addToInventory(state, drop.itemId, drop.count || 1, drop.rarity || 'rare', false, callbacks, true);
      const def = getItemDef(drop.itemId) || { name: drop.itemId };
      log(`🎁 混沌保證掉落：獲得 ${drop.count || 1}×【${def.name}】！`, 'loot');
    }
  }

  // 2. Adena da Temporada
  const goldReward = Math.floor(droplist.goldMin + Math.random() * (droplist.goldMax - droplist.goldMin + 1));
  state.gold = (state.gold || 0) + goldReward;
  log(`🪙 混沌金幣：從擊敗的首領取得 +${goldReward.toLocaleString()} 金幣！`, 'loot');

  // 3. Drops com Probabilidade da Temporada
  if (Array.isArray(droplist.chanceDrops)) {
    for (const cd of droplist.chanceDrops) {
      if (Math.random() < cd.chance) {
        addToInventory(state, cd.itemId, cd.count || 1, cd.rarity || 'epic', false, callbacks, true);
        const def = getItemDef(cd.itemId) || { name: cd.itemId };
        log(`💎 混沌稀有掉落（${Math.round(cd.chance * 100)}%）：獲得 [${def.name}]！`, 'rarity-legendary');
      }
    }
  }

  // 4. Concede 100 Pontos de Carga do Random Craft Canônico
  chargeRandomCraft(state, 100, callbacks);

  updateAllUI();
  save();
}
