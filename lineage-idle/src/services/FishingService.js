// FishingService.js — Motor Central de 釣魚 de Aden (Lineage II Style)
import { FISHING_ZONES, FISH_CATALOG, RODS_CATALOG, BAIT_CATALOG, FIGHT_PROFILES, getFishingXpForLevel } from '../data/fishing.js';
import { FISHING_BALANCE, calculateCatchChance, rollFishRarity, calculateFishValue } from '../data/economy/fishingBalance.js';
import { addToInventory, removeFromInventoryByItemId, getInventoryCount } from './InventoryService.js';
import { LifeActivityCore } from './lifeActivities/LifeActivityCore.js';
import { RewardEngine } from './lifeActivities/RewardEngine.js';
import { resolveCanonicalResourceId } from './lifeActivities/ResourceDictionary.js';

export const FishingService = {
  getFishingState(state) {
    // Sincroniza e garante LifeActivities canônico
    if (state) {
      LifeActivityCore.getActivityState(state, 'fishing');
    }
    if (!state.fishing) {
      state.fishing = {
        skillLevel: 1,
        skillXp: 0,
        rod: 'rod_none',
        activeBait: null,
        activeZone: 'zone_talking_island',
        isFishing: false,
        activeFight: null,
        castStartTime: 0,
        totalCaught: 0,
        fishLog: {},
        autoFishing: false,
        lastAutoTick: 0,
        rodDurability: {
          rod_none: 50
        },
        baitInventory: {}
      };
    }
    // Garante que o jogador sempre possua ao menos a vara de bambu básica
    if (!state.fishing.rod) {
      state.fishing.rod = 'rod_none';
    }
    if (!state.fishing.rodDurability) {
      state.fishing.rodDurability = {};
    }
    if (state.fishing.rodDurability['rod_none'] === undefined) {
      state.fishing.rodDurability['rod_none'] = 50;
    }
    if (!state.fishing.baitInventory) {
      state.fishing.baitInventory = {};
    }
    if (!state.fishing.fishLog) {
      state.fishing.fishLog = {};
    }
    return state.fishing;
  },

  resolveZoneId(zoneId) {
    if (!zoneId) return 'zone_talking_island';
    if (FISHING_ZONES[zoneId]) return zoneId;
    const stripped = String(zoneId).replace(/^(fish_|fishing_)/, '');
    if (FISHING_ZONES[stripped]) return stripped;
    if (FISHING_ZONES['zone_' + stripped]) return 'zone_' + stripped;
    return null;
  },

  getAvailableZones(state) {
    const playerLvl = Number(state?.level) || 1;
    return Object.values(FISHING_ZONES).filter(zone => playerLvl >= zone.minLevel);
  },

  selectZone(state, zoneId, callbacks = {}) {
    const fState = this.getFishingState(state);
    const resolvedId = this.resolveZoneId(zoneId);
    const zone = FISHING_ZONES[resolvedId];
    if (!zone) return false;

    const playerLvl = Number(state?.level) || 1;
    if (playerLvl < zone.minLevel) {
      if (callbacks.log) callbacks.log(`⚠️ 等級不足，無法前往 ${zone.name}！需要等級 ${zone.minLevel}。`, 'warning');
      return false;
    }

    fState.activeZone = resolvedId;
    fState.isFishing = false;

    if (callbacks.log) callbacks.log(`📍 你帶著釣魚裝備前往 **${zone.name}**。`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  selectBait(state, baitId, callbacks = {}) {
    const fState = this.getFishingState(state);
    if (!baitId) {
      fState.activeBait = null;
      if (callbacks.updateAllUI) callbacks.updateAllUI();
      return true;
    }

    const available = fState.baitInventory[baitId] || 0;
    if (available <= 0) {
      if (callbacks.log) callbacks.log(`⚠️ 你的釣魚庫存中沒有這種魚餌。`, 'warning');
      return false;
    }

    fState.activeBait = baitId;
    const bait = BAIT_CATALOG[baitId];
    if (callbacks.log) callbacks.log(`🪱 已裝上魚餌 **${bait ? bait.name : baitId}**（剩餘 ${available} 個）。`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    return true;
  },

  buyBait(state, baitId, quantity = 10, callbacks = {}) {
    const bait = BAIT_CATALOG[baitId];
    if (!bait) return false;

    const count = Math.max(1, Math.floor(quantity));
    const totalCost = bait.buyPrice * count;

    if ((state.gold || 0) < totalCost) {
      if (callbacks.log) callbacks.log(`⚠️ 金幣不足！購買 ${count}x ${bait.name} 需要 ${totalCost.toLocaleString()} 金幣。`, 'warning');
      return false;
    }

    state.gold -= totalCost;
    const fState = this.getFishingState(state);
    fState.baitInventory[baitId] = (fState.baitInventory[baitId] || 0) + count;

    // Se nenhuma isca estiver ativa, ativa esta automaticamente
    if (!fState.activeBait) {
      fState.activeBait = baitId;
    }

    if (callbacks.log) callbacks.log(`🛒 已購買 **${count}x ${bait.name}**，花費 ${totalCost.toLocaleString()} 金幣。`, 'gain');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  buyRod(state, rodId, callbacks = {}) {
    const rod = RODS_CATALOG[rodId];
    if (!rod) return false;

    const fState = this.getFishingState(state);
    if (fState.rodDurability[rodId] !== undefined) {
      if (callbacks.log) callbacks.log(`⚠️ 你已經擁有 ${rod.name}！`, 'warning');
      return false;
    }

    if (fState.skillLevel < rod.minFishingLevel) {
      if (callbacks.log) callbacks.log(`⚠️ 釣魚等級不足！需要釣魚等級 ${rod.minFishingLevel}。`, 'warning');
      return false;
    }

    if ((state.gold || 0) < rod.buyPrice) {
      if (callbacks.log) callbacks.log(`⚠️ 金幣不足，無法購買 ${rod.name}（${rod.buyPrice.toLocaleString()} 金幣）。`, 'warning');
      return false;
    }

    state.gold -= rod.buyPrice;
    fState.rodDurability[rodId] = rod.durability;
    fState.rod = rodId;

    if (callbacks.log) callbacks.log(`🎣 已取得並裝備 **${rod.name}**！`, 'rarity-epic');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  equipRod(state, rodId, callbacks = {}) {
    const fState = this.getFishingState(state);
    if (fState.rodDurability[rodId] === undefined) {
      if (callbacks.log) callbacks.log(`⚠️ 你的背包中沒有這支釣竿。`, 'warning');
      return false;
    }

    fState.rod = rodId;
    const rod = RODS_CATALOG[rodId];
    if (callbacks.log) callbacks.log(`🎣 已裝備 **${rod ? rod.name : rodId}**。`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    return true;
  },

  repairRod(state, rodId, callbacks = {}) {
    const fState = this.getFishingState(state);
    const rod = RODS_CATALOG[rodId];
    if (!rod || fState.rodDurability[rodId] === undefined) return false;

    const currentDura = fState.rodDurability[rodId] || 0;
    const missing = rod.durability - currentDura;
    if (missing <= 0) {
      if (callbacks.log) callbacks.log(`✨ ${rod.name} 的耐久度已經是最大值！`, 'system');
      return false;
    }

    const costPerPoint = Math.max(1, Math.ceil(rod.repairCost / rod.durability));
    const totalRepairCost = missing * costPerPoint;

    if ((state.gold || 0) < totalRepairCost) {
      if (callbacks.log) callbacks.log(`⚠️ 金幣不足，無法修理釣竿！費用：${totalRepairCost.toLocaleString()} 金幣。`, 'warning');
      return false;
    }

    state.gold -= totalRepairCost;
    fState.rodDurability[rodId] = rod.durability;

    if (callbacks.log) callbacks.log(`🔨 鐵匠已修復 **${rod.name}**（+${missing} 耐久度），花費 ${totalRepairCost.toLocaleString()} 金幣。`, 'gain');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  castLine(state, zoneIdOrCallback = {}, maybeCallbacks = {}) {
    let callbacks = zoneIdOrCallback;
    const fState = this.getFishingState(state);
    if (typeof zoneIdOrCallback === 'string') {
      const resolved = this.resolveZoneId(zoneIdOrCallback);
      fState.activeZone = resolved || zoneIdOrCallback;
      callbacks = maybeCallbacks || {};
    }
    callbacks = callbacks || {};

    if (fState.isFishing) {
      return { success: false, reason: 'already_fishing' };
    }

    // Valida durabilidade da vara (regra estrita de quebra de ferramenta)
    const currentRodKey = fState.rod || 'rod_none';
    const currentDurability = fState.rodDurability[currentRodKey] ?? 0;
    if (currentRodKey !== 'rod_none' && currentDurability <= 0) {
      if (callbacks.log) callbacks.log(`⚠️ 你的釣竿已損壞或耐久度為 0！請先找鐵匠修理後再拋竿。`, 'warning');
      return { success: false, reason: 'broken_tool' };
    }

    const zoneId = this.resolveZoneId(fState.activeZone) || 'zone_talking_island';
    const zone = FISHING_ZONES[zoneId];
    if (!zone) {
      if (callbacks.log) callbacks.log(`⚠️ 請先選擇釣魚區。`, 'warning');
      return { success: false, reason: 'no_zone' };
    }

    // Checa isca necessária
    if (zone.requiredBait) {
      const baitCount = fState.baitInventory[zone.requiredBait] || 0;
      if (fState.activeBait !== zone.requiredBait || baitCount <= 0) {
        const requiredBaitDef = BAIT_CATALOG[zone.requiredBait];
        if (callbacks.log) callbacks.log(`⚠️ ${zone.name} 水域需要 **${requiredBaitDef ? requiredBaitDef.name : zone.requiredBait}**！`, 'warning');
        return { success: false, reason: 'invalid_bait' };
      }
    }

    // Se tem isca ativa equipada, valida contagem
    if (!fState.activeBait || (fState.baitInventory[fState.activeBait] || 0) <= 0) {
      // Procura qualquer isca disponível no inventário
      const availableBaitKey = Object.keys(fState.baitInventory).find(bKey => (fState.baitInventory[bKey] || 0) > 0);
      if (availableBaitKey) {
        fState.activeBait = availableBaitKey;
      } else {
        if (callbacks.log) callbacks.log(`⚠️ 魚鉤上沒有魚餌！請購買更多魚餌後繼續釣魚。`, 'warning');
        return { success: false, reason: 'no_bait' };
      }
    }

    // Consome 1 isca
    fState.baitInventory[fState.activeBait]--;

    // Consome durabilidade da vara se equipada
    if (currentDurability > 0) {
      fState.rodDurability[currentRodKey]--;
    }

    fState.isFishing = true;
    fState.castStartTime = Date.now();

    const castDuration = zone.baseCatchTime || FISHING_BALANCE.MANUAL_CAST_TIME_MS;

    if (callbacks.log) callbacks.log(`🌊 已在 **${zone.name}** 拋竿……等待浮標下沉！`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();

    return { success: true, castTime: castDuration };
  },

  reelIn(state, timingAccuracy = 0.8, callbacks = {}) {
    const fState = this.getFishingState(state);
    if (!fState.isFishing) {
      return { caught: false, reason: 'not_fishing' };
    }

    // Se já está numa luta ativa, delega para actionReel
    if (fState.activeFight && fState.activeFight.status === 'fighting') {
      return this.actionReel(state, callbacks);
    }

    // Inicia a luta interativa com o peixe
    return this.startFight(state, callbacks);
  },

  startFight(state, callbacks = {}) {
    const fState = this.getFishingState(state);
    if (!fState.isFishing) return { success: false, reason: 'not_fishing' };

    const zoneId = fState.activeZone || 'zone_talking_island';
    const zone = FISHING_ZONES[zoneId] || FISHING_ZONES.zone_talking_island;
    const bait = BAIT_CATALOG[fState.activeBait] || null;
    const baitRarityBoost = bait ? bait.rarityBoost : 0;
    const rolledRarity = rollFishRarity(fState.skillLevel, baitRarityBoost, false);

    let candidateFishIds = zone.availableFish.filter(fId => FISH_CATALOG[fId]?.rarity === rolledRarity);
    if (candidateFishIds.length === 0) candidateFishIds = zone.availableFish;

    const chosenFishId = candidateFishIds[Math.floor(Math.random() * candidateFishIds.length)];
    const fishDef = FISH_CATALOG[chosenFishId] || FISH_CATALOG.fish_carp;
    const profile = FIGHT_PROFILES[fishDef.fightProfile] || FIGHT_PROFILES.calm;

    const baseStamina = fishDef.baseStamina || 50;
    const maxStamina = Math.round(baseStamina * (profile.staminaMult || 1.0));

    fState.activeFight = {
      fishId: chosenFishId,
      fishDef,
      profile,
      maxStamina,
      fishStamina: maxStamina,
      lineTension: 20,
      playerControl: 50,
      turns: 0,
      status: 'fighting'
    };

    if (callbacks.log) {
      callbacks.log(`🌊🎣 **魚上鉤了！** 一隻 **${fishDef.name}** [${profile.name}] 咬餌！控制張力並耗盡牠的耐力！`, 'rarity-epic');
    }
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    return { success: true, fight: fState.activeFight };
  },

  actionReel(state, callbacks = {}) {
    const fState = this.getFishingState(state);
    const fight = fState.activeFight;
    if (!fight || fight.status !== 'fighting') return { success: false };

    fight.playerControl = Math.min(100, fight.playerControl + 16);
    fight.fishStamina = Math.max(0, fight.fishStamina - 12);
    fight.lineTension += Math.round(18 * (fight.profile.tensionRate || 1.0));
    fight.turns++;

    return this._resolveFightTurn(state, fState, fight, '你收緊魚線（+控制、+張力）。', callbacks);
  },

  actionYield(state, callbacks = {}) {
    const fState = this.getFishingState(state);
    const fight = fState.activeFight;
    if (!fight || fight.status !== 'fighting') return { success: false };

    fight.lineTension = Math.max(5, fight.lineTension - 32);
    fight.playerControl = Math.max(0, fight.playerControl - 10);
    fight.fishStamina = Math.min(fight.maxStamina, fight.fishStamina + Math.round(7 * (fight.profile.recoverRate || 1.0)));
    fight.turns++;

    return this._resolveFightTurn(state, fState, fight, '你放鬆魚線以降低壓力（-張力，魚恢復部分體力）。', callbacks);
  },

  actionForce(state, callbacks = {}) {
    const fState = this.getFishingState(state);
    const fight = fState.activeFight;
    if (!fight || fight.status !== 'fighting') return { success: false };

    fight.fishStamina = Math.max(0, fight.fishStamina - 26);
    fight.playerControl = Math.min(100, fight.playerControl + 22);
    fight.lineTension += Math.round(42 * (fight.profile.tensionRate || 1.0));
    fight.turns++;

    return this._resolveFightTurn(state, fState, fight, '⚡ 強力拉竿！大幅削減魚的耐力，但魚線張力也逼近極限！', callbacks);
  },

  actionRest(state, callbacks = {}) {
    const fState = this.getFishingState(state);
    const fight = fState.activeFight;
    if (!fight || fight.status !== 'fighting') return { success: false };

    fight.lineTension = Math.max(10, fight.lineTension - 18);
    fight.fishStamina = Math.min(fight.maxStamina, fight.fishStamina + 3);
    fight.turns++;

    return this._resolveFightTurn(state, fState, fight, '你穩定姿勢（降低中量張力）。', callbacks);
  },

  _resolveFightTurn(state, fState, fight, actionMsg, callbacks = {}) {
    const log = callbacks.log || (() => {});
    const floatText = callbacks.floatText || (() => {});

    // Fish AI reaction
    const profile = fight.profile;
    const isBurst = Math.random() < (profile.burstChance || 0.15);
    if (isBurst) {
      const burstTension = Math.round(16 * (profile.tensionRate || 1.0));
      fight.lineTension += burstTension;
      log(`⚠️ 魚突然猛烈衝刺！（張力 +${burstTension}%）`, 'warning');
      if (floatText) floatText('魚猛烈衝刺！', 'float-damage');
    } else {
      fight.playerControl = Math.max(0, fight.playerControl - 4);
    }

    // 1. Checa quebra de linha
    if (fight.lineTension >= 100) {
      fight.status = 'line_broken';
      fState.isFishing = false;
      fState.activeFight = null;
      log('💥 **魚線斷裂！** 張力超過承受上限，魚帶著魚鉤逃走了！', 'error');
      if (floatText) floatText('💥 魚線斷裂！', 'float-damage');
      LifeActivityCore.consumeDurability(state, 'fishing', callbacks);
      if (callbacks.updateAllUI) callbacks.updateAllUI();
      if (callbacks.save) callbacks.save();
      return { status: 'line_broken', message: '魚線斷裂！' };
    }

    // 2. Checa fuga do peixe por perda de controle
    if (fight.playerControl <= 0) {
      fight.status = 'fish_escaped';
      fState.isFishing = false;
      fState.activeFight = null;
      log('💨 **魚逃走了！** 你失去對捲線器的控制，魚成功脫逃。', 'warning');
      if (floatText) floatText('💨 魚逃走了！', 'float-miss');
      if (callbacks.updateAllUI) callbacks.updateAllUI();
      if (callbacks.save) callbacks.save();
      return { status: 'fish_escaped', message: '魚逃走了！' };
    }

    // 3. Checa captura com sucesso
    if (fight.fishStamina <= 0) {
      fight.status = 'caught';
      fState.isFishing = false;
      fState.activeFight = null;
      return this._finalizeFightCatch(state, fState, fight, callbacks);
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    return { status: 'fighting', message: actionMsg, fight };
  },

  _finalizeFightCatch(state, fState, fight, callbacks = {}) {
    const log = callbacks.log || (() => {});
    const floatText = callbacks.floatText || (() => {});
    const fishDef = fight.fishDef;

    // Consome durabilidade através do LifeActivityCore
    LifeActivityCore.consumeDurability(state, 'fishing', callbacks);

    // Rola qualidade e tamanho via RewardEngine
    const quality = RewardEngine.rollQuality(fState.skillLevel);
    const size = RewardEngine.rollFishSize();

    // Calcula peso realista modulado pelo tamanho
    const weightMin = fishDef.baseWeight?.min || 0.5;
    const weightMax = fishDef.baseWeight?.max || 2.0;
    const baseW = weightMin + Math.random() * (weightMax - weightMin);
    const finalWeight = Number((baseW * size.weightMult).toFixed(2));

    // Concede XP modulado
    const xpBase = fishDef.xpReward || 20;
    const finalXp = Math.round(xpBase * quality.mult * size.valueMult);
    LifeActivityCore.addXp(state, 'fishing', finalXp, callbacks);

    fState.totalCaught = (fState.totalCaught || 0) + 1;
    fState.fishLog = fState.fishLog || {};
    fState.fishLog[fishDef.id] = (fState.fishLog[fishDef.id] || 0) + 1;

    // Adiciona ao inventário
    addToInventory(state, fishDef.id, 1, fishDef.rarity, false, callbacks, true);

    // Registra no Codex
    LifeActivityCore.recordCodexDiscovery(state, 'fishing', fishDef.id);

    const rarityClass = fishDef.rarity === 'legendary' ? 'rarity-legendary'
      : fishDef.rarity === 'epic' ? 'rarity-epic'
      : fishDef.rarity === 'rare' ? 'rarity-rare' : 'loot';

    log(`🎣 **精彩捕獲！** 釣到 **${fishDef.name}** [${quality.name} · ${size.name}]（${finalWeight} 公斤）！（+${finalXp} 釣魚經驗值）`, rarityClass);
    if (floatText) floatText(`+1 ${fishDef.icon} ${fishDef.name}!`, 'float-crit');

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();

    return {
      status: 'caught',
      fish: fishDef,
      quality,
      size,
      weight: finalWeight,
      xpGained: finalXp
    };
  },

  toggleAutoFish(state, callbacks = {}) {
    const fState = this.getFishingState(state);

    if (fState.skillLevel < FISHING_BALANCE.AUTO_FISH_UNLOCK_LEVEL) {
      if (callbacks.log) callbacks.log(`🔒 自動釣魚需要釣魚等級 ${FISHING_BALANCE.AUTO_FISH_UNLOCK_LEVEL} 以上！請先繼續手動釣魚提升技巧。`, 'warning');
      return false;
    }

    fState.autoFishing = !fState.autoFishing;
    fState.lastAutoTick = Date.now();

    if (fState.autoFishing) {
      if (callbacks.log) callbacks.log(`🤖 **自動釣魚已啟用！** 只要還有魚餌與耐久度，角色就會在背景持續釣魚。`, 'gain');
      if (callbacks.floatText) callbacks.floatText(`🎣 自動釣魚已啟用！`, 'float-gold');
    } else {
      if (callbacks.log) callbacks.log(`🛑 自動釣魚已暫停。`, 'system');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  processAutoFish(state, callbacks = {}) {
    const fState = this.getFishingState(state);
    if (!fState.autoFishing) return;

    const now = Date.now();
    const interval = FISHING_BALANCE.AUTO_FISH_INTERVAL_MS;
    const elapsed = now - (fState.lastAutoTick || now);

    if (elapsed < interval) return;

    const ticks = Math.min(10, Math.floor(elapsed / interval));
    fState.lastAutoTick = now;

    const zoneId = fState.activeZone || 'zone_talking_island';
    const zone = FISHING_ZONES[zoneId] || FISHING_ZONES.zone_talking_island;
    const rod = RODS_CATALOG[fState.rod] || RODS_CATALOG.rod_none;

    for (let t = 0; t < ticks; t++) {
      // Checa se ainda há isca disponível
      if (!fState.activeBait || (fState.baitInventory[fState.activeBait] || 0) <= 0) {
        const nextBait = Object.keys(fState.baitInventory).find(b => (fState.baitInventory[b] || 0) > 0);
        if (nextBait) {
          fState.activeBait = nextBait;
        } else {
          fState.autoFishing = false;
          if (callbacks.log) callbacks.log(`⚠️ 魚餌已用完！自動釣魚已停止。`, 'warning');
          break;
        }
      }

      // Consome 1 isca
      fState.baitInventory[fState.activeBait]--;

      // Consome durabilidade através do LifeActivityCore
      const duraRes = LifeActivityCore.consumeDurability(state, 'fishing', callbacks);
      if (duraRes.broken) {
        fState.autoFishing = false;
        break;
      }

      const bait = BAIT_CATALOG[fState.activeBait] || null;
      const isBrokenRod = (fState.rodDurability[fState.rod || 'rod_none'] || 0) <= 0;
      const rodBonus = (rod.catchBonus - 1.0) * (isBrokenRod ? FISHING_BALANCE.BROKEN_ROD_CATCH_PENALTY : 1.0);
      const baitBonus = bait ? (bait.catchBonus - 1.0) : 0;
      const zoneDiffMod = -(zone.difficulty - 1) * 0.05;

      const catchProb = calculateCatchChance(fState.skillLevel, rodBonus, baitBonus, zoneDiffMod) * FISHING_BALANCE.AUTO_FISH_EFFICIENCY;

      if (Math.random() <= catchProb) {
        const rarity = rollFishRarity(fState.skillLevel, bait ? bait.rarityBoost : 0, true);
        let candidates = zone.availableFish.filter(id => FISH_CATALOG[id]?.rarity === rarity);
        if (candidates.length === 0) candidates = zone.availableFish;

        const fishId = candidates[Math.floor(Math.random() * candidates.length)];
        const fish = FISH_CATALOG[fishId] || FISH_CATALOG.fish_carp;

        fState.totalCaught = (fState.totalCaught || 0) + 1;
        fState.fishLog[fishId] = (fState.fishLog[fishId] || 0) + 1;
        fState.skillXp += fish.xpReward;

        addToInventory(state, fishId, 1, fish.rarity, false, callbacks, true);
      }
    }

    this._checkLevelUp(state, fState, callbacks);
  },

  processOfflineFish(state, minutesOffline, callbacks = {}) {
    const fState = this.getFishingState(state);
    if (!fState.autoFishing) return { totalCaught: 0, xpGained: 0 };

    const effectiveMinutes = Math.min(minutesOffline, FISHING_BALANCE.OFFLINE_MAX_MINUTES);
    if (effectiveMinutes <= 0) return { totalCaught: 0, xpGained: 0 };

    const zoneId = fState.activeZone || 'zone_talking_island';
    const zone = FISHING_ZONES[zoneId] || FISHING_ZONES.zone_talking_island;
    const rod = RODS_CATALOG[fState.rod] || RODS_CATALOG.rod_none;

    const totalAvailableBait = Object.values(fState.baitInventory).reduce((sum, count) => sum + (count || 0), 0);
    if (totalAvailableBait <= 0) {
      fState.autoFishing = false;
      return { totalCaught: 0, xpGained: 0 };
    }

    // Calcula quantos arremessos foram possíveis
    const rodBonus = rod.catchBonus - 1.0;
    const maxCatchesByTime = Math.floor((effectiveMinutes * 60 * 1000) / FISHING_BALANCE.OFFLINE_FISH_INTERVAL_MS * FISHING_BALANCE.OFFLINE_EFFICIENCY);
    const castsToSimulate = Math.min(totalAvailableBait, maxCatchesByTime);

    let caughtCount = 0;
    let totalXp = 0;

    for (let c = 0; c < castsToSimulate; c++) {
      // Consome isca sequencialmente
      const baitKey = Object.keys(fState.baitInventory).find(k => (fState.baitInventory[k] || 0) > 0);
      if (!baitKey) break;
      fState.baitInventory[baitKey]--;

      // Consome durabilidade
      const duraRes = LifeActivityCore.consumeDurability(state, 'fishing', callbacks);
      if (duraRes.broken) {
        fState.autoFishing = false;
        break;
      }

      const bait = BAIT_CATALOG[baitKey];
      const isBrokenRod = (fState.rodDurability[fState.rod || 'rod_none'] || 0) <= 0;
      const effRodBonus = rodBonus * (isBrokenRod ? FISHING_BALANCE.BROKEN_ROD_CATCH_PENALTY : 1.0);
      const baitBonus = bait ? (bait.catchBonus - 1.0) : 0;
      const zoneDiffMod = -(zone.difficulty - 1) * 0.05;

      const prob = calculateCatchChance(fState.skillLevel, effRodBonus, baitBonus, zoneDiffMod) * FISHING_BALANCE.OFFLINE_EFFICIENCY;

      if (Math.random() <= prob) {
        const rarity = rollFishRarity(fState.skillLevel, bait ? bait.rarityBoost : 0, true);
        let candidates = zone.availableFish.filter(id => FISH_CATALOG[id]?.rarity === rarity);
        if (candidates.length === 0) candidates = zone.availableFish;

        const fishId = candidates[Math.floor(Math.random() * candidates.length)];
        const fish = FISH_CATALOG[fishId] || FISH_CATALOG.fish_carp;

        fState.totalCaught = (fState.totalCaught || 0) + 1;
        fState.fishLog[fishId] = (fState.fishLog[fishId] || 0) + 1;
        fState.skillXp += fish.xpReward;
        totalXp += fish.xpReward;
        caughtCount++;

        addToInventory(state, fishId, 1, fish.rarity, false, callbacks, true);
      }
    }

    this._checkLevelUp(state, fState, callbacks);
    fState.lastAutoTick = Date.now();

    return {
      totalCaught: caughtCount,
      xpGained: totalXp
    };
  },

  exchangeFish(state, fishId, quantity = 5, callbacks = {}) {
    const fish = FISH_CATALOG[fishId];
    if (!fish) return { success: false, reason: 'invalid_fish' };

    const ownedCount = getInventoryCount(state, fishId);
    const reqRate = fish.exchangeRate || 5;

    if (ownedCount < reqRate) {
      if (callbacks.log) callbacks.log(`⚠️ ${fish.name} 數量不足！至少需要 ${reqRate}x 才能向釣魚大師進行兌換。`, 'warning');
      return { success: false, reason: 'insufficient_fish' };
    }

    const countToExchange = Math.min(ownedCount, Math.max(reqRate, Math.floor(quantity / reqRate) * reqRate));
    const packages = Math.floor(countToExchange / reqRate);

    if (packages <= 0) return { success: false };

    // Remove os peixes do inventário
    removeFromInventoryByItemId(state, fishId, countToExchange);

    // Adiciona o material de recompensa canônico
    const canonicalMatId = resolveCanonicalResourceId(fish.materialReward);
    addToInventory(state, canonicalMatId, packages, 'common', false, callbacks, true);

    if (callbacks.log) {
      callbacks.log(`📦 已交付 **${countToExchange}x ${fish.name}**，獲得 **${packages}x ${fish.materialName}** 作為鍛造材料！`, 'rarity-legendary');
    }
    if (callbacks.floatText) {
      callbacks.floatText(`+${packages}x ${fish.materialName}!`, 'float-gold');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();

    return { success: true, count: packages, materialName: fish.materialName };
  },

  getSkillProgress(state) {
    const fState = this.getFishingState(state);
    const nextXp = getFishingXpForLevel(fState.skillLevel + 1);
    const currXp = fState.skillXp || 0;
    const percent = nextXp > 0 ? Math.min(100, Math.floor((currXp / nextXp) * 100)) : 100;
    return {
      level: fState.skillLevel,
      xp: currXp,
      nextXp,
      percent
    };
  },

  getFishingStats(state) {
    const fState = this.getFishingState(state);
    const speciesDiscovered = Object.keys(fState.fishLog || {}).length;
    const totalSpecies = Object.keys(FISH_CATALOG).length;
    return {
      totalCaught: fState.totalCaught || 0,
      speciesDiscovered,
      totalSpecies
    };
  },

  _checkLevelUp(state, fState, callbacks = {}) {
    let leveledUp = false;
    let nextXp = getFishingXpForLevel(fState.skillLevel + 1);

    while (fState.skillLevel < FISHING_BALANCE.MAX_FISHING_LEVEL && fState.skillXp >= nextXp) {
      fState.skillLevel++;
      leveledUp = true;

      if (callbacks.log) {
        callbacks.log(`🎉 **釣魚等級提升！** 你的亞丁釣魚等級已達 **${fState.skillLevel}**！`, 'rarity-legendary');
      }
      if (callbacks.floatText) {
        callbacks.floatText(`釣魚等級 ${fState.skillLevel}！`, 'float-crit');
      }

      nextXp = getFishingXpForLevel(fState.skillLevel + 1);
    }

    return leveledUp;
  }
};
