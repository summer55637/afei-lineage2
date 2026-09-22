// MiningService.js — Motor Central de Mineração & Veios Minerais de Aden (Lineage II Style)
import {
  MINING_ZONES,
  MINERAL_NODES_CATALOG,
  PICKAXES_CATALOG,
  LAMPS_CATALOG,
  MINING_TACTICS
} from '../../data/mining.js';
import { addToInventory, removeFromInventory } from '../InventoryService.js';
import { LifeActivityCore } from './LifeActivityCore.js';
import { RewardEngine } from './RewardEngine.js';
import { resolveCanonicalResourceId, getCanonicalResourceDef } from './ResourceDictionary.js';

export const MiningService = {
  getMiningState(state) {
    if (state) {
      LifeActivityCore.getActivityState(state, 'mining');
    }
    if (!state.mining || typeof state.mining !== 'object') {
      state.mining = {
        skillLevel: 1,
        skillXp: 0,
        pickaxe: 'pickaxe_none',
        selectedTactic: 'standard',
        activeLamp: null,
        activeZone: 'zone_abandoned_coal',
        isMining: false,
        mineStartTime: 0,
        targetedNodeId: null,
        mineDuration: 3300,
        totalMined: 0,
        miningLog: {},
        autoMining: false,
        lastAutoTick: 0,
        pickaxeDurability: {
          pickaxe_none: 50
        },
        lampInventory: {}
      };
    }

    if (!state.mining.pickaxe) {
      state.mining.pickaxe = 'pickaxe_none';
    }
    if (!state.mining.selectedTactic) {
      state.mining.selectedTactic = 'standard';
    }
    if (!state.mining.pickaxeDurability) {
      state.mining.pickaxeDurability = {};
    }
    if (state.mining.pickaxeDurability.pickaxe_none === undefined) {
      state.mining.pickaxeDurability.pickaxe_none = 50;
    }
    if (!state.mining.lampInventory) {
      state.mining.lampInventory = {};
    }
    if (!state.mining.miningLog) {
      state.mining.miningLog = {};
    }
    if (!state.mining.activeZone) {
      state.mining.activeZone = 'zone_abandoned_coal';
    }
    if (state.mining.galleryStability === undefined) {
      state.mining.galleryStability = 100;
    }
    if (!state.mining.veinHazard) {
      const hazards = ['none', 'none', 'none', 'gas_pocket', 'seismic_fault', 'dense_crystal'];
      state.mining.veinHazard = hazards[Math.floor(Math.random() * hazards.length)];
    }
    if (state.mining.veinProbed === undefined) {
      state.mining.veinProbed = false;
    }

    return state.mining;
  },

  getAvailableZones(state) {
    const playerLvl = Number(state?.level) || 1;
    return Object.values(MINING_ZONES).filter(zone => playerLvl >= zone.minLevel);
  },

  probeVein(state, callbacks = {}) {
    const mState = this.getMiningState(state);
    mState.veinProbed = true;
    if (callbacks.log) callbacks.log("🔍 金屬回聲顯示出岩石內部結構……", 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  shoreUpGallery(state, callbacks = {}) {
    const mState = this.getMiningState(state);
    const branchItem = state.inventory?.find(i => (i.itemId || i.id) === 'branch' && (i.qty || i.count) > 0);
    const woodItem = state.inventory?.find(i => (i.itemId || i.id) === 'compressed_wood' && (i.qty || i.count) > 0);

    const targetMatId = branchItem ? 'branch' : (woodItem ? 'compressed_wood' : null);
    if (!targetMatId) {
      if (callbacks.log) callbacks.log('⚠️ 你沒有木材（樹枝或壓縮木材）可用來支撐坑道！', 'warning');
      return false;
    }

    let toDeduct = 1;
    for (let i = state.inventory.length - 1; i >= 0 && toDeduct > 0; i--) {
      const item = state.inventory[i];
      if ((item.id === targetMatId || item.itemId === targetMatId) && !item.equipped) {
        const currentStack = item.count || item.qty || 1;
        if (currentStack <= toDeduct) {
          toDeduct -= currentStack;
          state.inventory.splice(i, 1);
        } else {
          if (item.count !== undefined) item.count = currentStack - toDeduct;
          if (item.qty !== undefined) item.qty = currentStack - toDeduct;
          toDeduct = 0;
        }
      }
    }

    mState.galleryStability = Math.min(100, (mState.galleryStability ?? 100) + 35);
    if (callbacks.log) callbacks.log('🪵 你已加固坑道樑柱！穩定度 +35%。', 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  selectZone(state, zoneId, callbacks = {}) {
    const mState = this.getMiningState(state);
    const zone = MINING_ZONES[zoneId];
    if (!zone) return false;

    const playerLvl = Number(state?.level) || 1;
    if (playerLvl < zone.minLevel) {
      if (callbacks.log) callbacks.log(`⚠️ 等級不足，無法進入 ${zone.name} 的礦坑！需要等級 ${zone.minLevel}。`, 'warning');
      return false;
    }

    mState.activeZone = zoneId;
    mState.isMining = false;
    mState.targetedNodeId = null;

    if (callbacks.log) callbacks.log(`📍 你已進入 **${zone.name}** 的礦坑。`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  selectLamp(state, lampId, callbacks = {}) {
    const mState = this.getMiningState(state);
    if (!lampId) {
      mState.activeLamp = null;
      if (callbacks.updateAllUI) callbacks.updateAllUI();
      return true;
    }

    const available = mState.lampInventory[lampId] || 0;
    if (available <= 0) {
      if (callbacks.log) callbacks.log('⚠️ 你的背包中沒有這盞提燈／燈具！', 'warning');
      return false;
    }

    mState.activeLamp = lampId;
    const lampDef = LAMPS_CATALOG[lampId];
    if (callbacks.log) callbacks.log(`🏮 已點亮：**${lampDef?.name || lampId}**。`, 'system');

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  buyLamp(state, lampId, qty = 1, callbacks = {}) {
    const lamp = LAMPS_CATALOG[lampId];
    if (!lamp) return false;

    const count = Math.max(1, Math.floor(qty));
    const totalCost = lamp.buyPrice * count;

    if ((state.gold || 0) < totalCost) {
      if (callbacks.log) callbacks.log(`⚠️ 金幣不足！購買 ${count}× ${lamp.name} 需要 ${totalCost.toLocaleString()} 金幣。`, 'warning');
      return false;
    }

    state.gold -= totalCost;
    const mState = this.getMiningState(state);
    mState.lampInventory[lampId] = (mState.lampInventory[lampId] || 0) + count;

    if (!mState.activeLamp) {
      mState.activeLamp = lampId;
    }

    if (callbacks.log) callbacks.log(`🎒 已用 ${totalCost.toLocaleString()} 金幣購買 ${count}× **${lamp.name}**。`, 'loot');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  buyPickaxe(state, pickaxeId, callbacks = {}) {
    const pick = PICKAXES_CATALOG[pickaxeId];
    if (!pick) return false;

    const mState = this.getMiningState(state);
    if (mState.pickaxeDurability[pickaxeId] !== undefined) {
      if (callbacks.log) callbacks.log(`⚠️ 你已經擁有 ${pick.name}！`, 'warning');
      return false;
    }

    if (mState.skillLevel < pick.minMiningLevel) {
      if (callbacks.log) callbacks.log(`⚠️ 採礦等級不足！需要採礦等級 ${pick.minMiningLevel}。`, 'warning');
      return false;
    }

    if ((state.gold || 0) < pick.buyPrice) {
      if (callbacks.log) callbacks.log(`⚠️ 金幣不足！需要 ${pick.buyPrice.toLocaleString()} 金幣。`, 'warning');
      return false;
    }

    state.gold -= pick.buyPrice;
    mState.pickaxeDurability[pickaxeId] = pick.durabilityMax;
    mState.pickaxe = pickaxeId;

    if (callbacks.log) callbacks.log(`⛏️ 已取得並裝備 **${pick.name}**！`, 'rarity-legendary');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  equipPickaxe(state, pickaxeId, callbacks = {}) {
    const pick = PICKAXES_CATALOG[pickaxeId];
    if (!pick) return false;

    const mState = this.getMiningState(state);
    if (mState.pickaxeDurability[pickaxeId] === undefined && pickaxeId !== 'pickaxe_none') {
      if (callbacks.log) callbacks.log('⚠️ 你的收藏中沒有這把十字鎬！', 'warning');
      return false;
    }

    mState.pickaxe = pickaxeId;
    if (callbacks.log) callbacks.log(`⛏️ 已裝備十字鎬：**${pick.name}**。`, 'system');

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  repairPickaxe(state, pickaxeId, callbacks = {}) {
    const mState = this.getMiningState(state);
    const targetPickaxeId = pickaxeId || mState.pickaxe;
    const pick = PICKAXES_CATALOG[targetPickaxeId];
    if (!pick) return false;

    const currentDur = mState.pickaxeDurability[targetPickaxeId] ?? pick.durabilityMax;
    if (currentDur >= pick.durabilityMax) {
      if (callbacks.log) callbacks.log(`⚠️ 你的 ${pick.name} 已經鍛造並磨利完成！`, 'warning');
      return false;
    }

    const missingPct = (pick.durabilityMax - currentDur) / pick.durabilityMax;
    const cost = Math.max(100, Math.floor(pick.repairCost * missingPct));

    if ((state.gold || 0) < cost) {
      if (callbacks.log) callbacks.log(`⚠️ 金幣不足！重新鍛造十字鎬尖端需要 ${cost.toLocaleString()} 金幣。`, 'warning');
      return false;
    }

    state.gold -= cost;
    mState.pickaxeDurability[targetPickaxeId] = pick.durabilityMax;

    // Sincroniza com LifeActivityCore
    const actState = LifeActivityCore.getActivityState(state, 'mining');
    actState.toolDurability = pick.durabilityMax;

    if (callbacks.log) callbacks.log(`✨ **${pick.name}** 已重新鍛造！耐久度恢復（${pick.durabilityMax}/${pick.durabilityMax}）。`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  selectTactic(state, tacticId, callbacks = {}) {
    const mState = this.getMiningState(state);
    const tactic = MINING_TACTICS[tacticId] || MINING_TACTICS.standard;
    mState.selectedTactic = tactic.id;
    mState.activeTactic = tactic.id;
    if (callbacks.log) callbacks.log(`⛏️ 已選擇挖掘技巧：**${tactic.name}**（${tactic.desc}）。`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  pickNodeForZone(zoneId, activeLampId) {
    const zone = MINING_ZONES[zoneId] || MINING_ZONES.zone_abandoned_coal;
    const nodes = zone.availableNodes.map(id => MINERAL_NODES_CATALOG[id]).filter(Boolean);
    if (nodes.length === 0) return MINERAL_NODES_CATALOG.node_coal_deposit;

    const lamp = activeLampId ? LAMPS_CATALOG[activeLampId] : null;

    const weights = {
      common: 50,
      uncommon: 25,
      rare: 15,
      epic: 8,
      legendary: 2
    };

    if (lamp && lamp.rarityBoost) {
      if (lamp.rarityBoost === 'uncommon') weights.uncommon += 20;
      if (lamp.rarityBoost === 'rare') weights.rare += 25;
      if (lamp.rarityBoost === 'epic') weights.epic += 20;
      if (lamp.rarityBoost === 'legendary') weights.legendary += 20;
    }

    const roll = Math.random() * (weights.common + weights.uncommon + weights.rare + weights.epic + weights.legendary);
    let accum = 0;
    let targetRarity = 'common';

    for (const [r, w] of Object.entries(weights)) {
      accum += w;
      if (roll <= accum) {
        targetRarity = r;
        break;
      }
    }

    const matched = nodes.filter(n => n.rarity === targetRarity);
    if (matched.length > 0) {
      return matched[Math.floor(Math.random() * matched.length)];
    }

    return nodes[Math.floor(Math.random() * nodes.length)];
  },

  startMining(state, tacticId = null, callbacks = {}) {
    const mState = this.getMiningState(state);
    const activePickaxeId = mState.pickaxe || 'pickaxe_none';
    const pickDef = PICKAXES_CATALOG[activePickaxeId];
    const dur = mState.pickaxeDurability[activePickaxeId] ?? 0;

    if (dur <= 0) {
      if (callbacks.log) callbacks.log(`⚠️ 你的 ${pickDef?.name || '十字鎬'} 已失去硬度！請重新鍛造後再繼續挖掘。`, 'warning');
      return { success: false, reason: 'broken_tool' };
    }

    if (tacticId && MINING_TACTICS[tacticId]) {
      mState.selectedTactic = tacticId;
      mState.activeTactic = tacticId;
    }
    const tactic = MINING_TACTICS[mState.selectedTactic] || MINING_TACTICS.standard;

    // Consome 1 óleo/combustível de lâmpada se houver
    let lampSpeedMult = 1.0;
    if (mState.activeLamp) {
      const lampStock = mState.lampInventory[mState.activeLamp] || 0;
      if (lampStock > 0) {
        mState.lampInventory[mState.activeLamp] -= 1;
        const lampDef = LAMPS_CATALOG[mState.activeLamp];
        if (lampDef?.speedBoost) {
          lampSpeedMult = lampDef.speedBoost;
        }
      } else {
        mState.activeLamp = null;
      }
    }

    const zone = MINING_ZONES[mState.activeZone] || MINING_ZONES.zone_abandoned_coal;
    const node = this.pickNodeForZone(mState.activeZone, mState.activeLamp);

    let mineDuration = node.baseTime || zone.baseMineTime || 3300;
    mineDuration = Math.max(1200, Math.floor((mineDuration * (tactic.timeMult || 1.0)) / lampSpeedMult));

    mState.isMining = true;
    mState.mineStartTime = Date.now();
    mState.targetedNodeId = node.id;
    mState.mineDuration = mineDuration;
    mState.activeTactic = tactic.id;

    if (callbacks.log) {
      callbacks.log(`⛏️ 已選擇礦脈！[${tactic.name}] 正在 ${zone.name} 開採 **${node.name}**...`, 'system');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return { success: true };
  },

  finishMining(state, callbacks = {}) {
    const mState = this.getMiningState(state);
    if (!mState.isMining || !mState.targetedNodeId) return false;

    const now = Date.now();
    const elapsed = now - (mState.mineStartTime || now);
    const needed = mState.mineDuration ?? 3300;

    if (elapsed < needed) {
      const waitSec = ((needed - elapsed) / 1000).toFixed(1);
      if (callbacks.log) callbacks.log(`⚠️ 礦脈仍在開採中！請再等待 ${waitSec} 秒。`, 'warning');
      return false;
    }

    const node = MINERAL_NODES_CATALOG[mState.targetedNodeId];
    if (!node) {
      mState.isMining = false;
      mState.targetedNodeId = null;
      return false;
    }

    // Consome durabilidade da picareta
    const activePickaxeId = mState.pickaxe || 'pickaxe_none';
    const pickDef = PICKAXES_CATALOG[activePickaxeId];
    if (mState.pickaxeDurability[activePickaxeId] !== undefined) {
      mState.pickaxeDurability[activePickaxeId] = Math.max(0, mState.pickaxeDurability[activePickaxeId] - 1);
    }
    const actState = LifeActivityCore.getActivityState(state, 'mining');
    actState.toolDurability = mState.pickaxeDurability[activePickaxeId] ?? 0;

    if (actState.toolDurability <= 0) {
      mState.isMining = false;
      mState.targetedNodeId = null;
      mState.autoMining = false;
      if (callbacks.log) callbacks.log(`💥 **十字鎬損壞！** 你的 ${pickDef?.name || '十字鎬'} 尖端已損壞，請到鐵匠處重新鍛造後再繼續。`, 'error');
      if (callbacks.updateAllUI) callbacks.updateAllUI();
      if (callbacks.save) callbacks.save();
      return false;
    }

    const tactic = MINING_TACTICS[mState.activeTactic] || MINING_TACTICS.standard;
    let stabilityLoss = tactic.stabilityLoss || 12;
    if (mState.veinHazard === 'seismic_fault') {
      stabilityLoss *= 2;
    }
    mState.galleryStability = Math.max(0, mState.galleryStability - stabilityLoss);

    if (mState.galleryStability <= 15) {
      if (callbacks.log) callbacks.log('⚠️ 礦坑局部坍塌！落石造成你損失此礦脈 50% 的礦石。', 'error');
    }

    if (mState.veinHazard === 'gas_pocket' && tactic.id === 'heavy') {
      state.hp = Math.max(1, state.hp - Math.floor(state.maxHp * 0.10));
      mState.pickaxeDurability[activePickaxeId] = Math.max(0, mState.pickaxeDurability[activePickaxeId] - 2);
      if (callbacks.log) callbacks.log('💥 瓦斯爆炸！火花引爆了氣囊。生命值 -10%，十字鎬額外損失耐久！', 'error');
    }

    const pickBonus = pickDef?.qualityBonus || 0.0;
    const qualityMod = pickBonus + (tactic.qualityBonus || 0.0);

    const quality = RewardEngine.rollQuality(mState.skillLevel, qualityMod);
    const primaryMatRaw = node.yields.primary;
    const secMatRaw = node.yields.secondary;

    const primaryMat = resolveCanonicalResourceId(primaryMatRaw);
    const secMat = secMatRaw ? resolveCanonicalResourceId(secMatRaw) : null;

    let basePrimaryQty = node.yields.primaryQty || 1;
    let baseSecQty = node.yields.secondaryQty || 0;

    if (mState.veinHazard === 'dense_crystal' && tactic.id === 'precision') {
      basePrimaryQty *= 2;
      baseSecQty *= 2;
      if (callbacks.log) callbacks.log('✨ 精準開採水晶礦脈成功！產量加倍。', 'system');
    }

    if (mState.galleryStability <= 15) {
      basePrimaryQty = Math.max(1, Math.floor(basePrimaryQty * 0.5));
      baseSecQty = Math.floor(baseSecQty * 0.5);
    }

    const primaryQty = RewardEngine.calculateYield(basePrimaryQty, quality);
    const secQty = baseSecQty > 0 ? RewardEngine.calculateYield(baseSecQty, quality) : 0;

    addToInventory(state, primaryMat, primaryQty, node.rarity, false, callbacks, true);
    if (secMat && secQty > 0) {
      addToInventory(state, secMat, secQty, node.rarity, false, callbacks, true);
    }

    // Registro no Catálogo Mineral e Codex
    mState.miningLog[node.id] = (mState.miningLog[node.id] || 0) + 1;
    mState.totalMined = (mState.totalMined || 0) + 1;
    LifeActivityCore.recordCodexDiscovery(state, 'mining', node.id);

    // XP
    const xpBase = node.xpReward || 8;
    const finalXp = Math.round(xpBase * quality.mult);
    LifeActivityCore.addXp(state, 'mining', finalXp, callbacks);

    mState.isMining = false;
    mState.targetedNodeId = null;
    mState.veinProbed = false;
    
    // Rola próximo hazard
    const hazards = ['none', 'none', 'none', 'gas_pocket', 'seismic_fault', 'dense_crystal'];
    mState.veinHazard = hazards[Math.floor(Math.random() * hazards.length)];

    const primaryDisplayName = getCanonicalResourceDef(primaryMat)?.name || primaryMat;
    const secondaryDisplayName = secMat ? (getCanonicalResourceDef(secMat)?.name || secMat) : null;

    if (callbacks.log) {
      const qualityPrefix = quality.tier === 'perfect' ? '💎 **無瑕礦石！**'
        : quality.tier === 'excellent' ? '✨ **極純礦石！**'
        : '✓ 開採完成：';
      callbacks.log(`⛏️ ${qualityPrefix} 開採 **${node.name}**【${quality.name}】！獲得 +${primaryQty}× ${primaryDisplayName}${secMat && secQty > 0 ? `、+${secQty}× ${secondaryDisplayName}` : ''}！（+${finalXp} 採礦經驗值）`, 'loot');
    }

    if (callbacks.floatText) {
      callbacks.floatText(`+${primaryQty}× ${primaryDisplayName}`, 'float-gold');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  toggleAutoMining(state, callbacks = {}) {
    const mState = this.getMiningState(state);
    if (mState.skillLevel < 5) {
      if (callbacks.log) callbacks.log('⚠️ 自動採礦（AFK）會在採礦等級 5 解鎖！', 'warning');
      return false;
    }

    mState.autoMining = !mState.autoMining;
    mState.lastAutoTick = Date.now();

    if (callbacks.log) {
      callbacks.log(
        mState.autoMining
          ? '⛏️ **自動採礦（AFK）已啟用！**你的礦工將持續開採礦脈。'
          : '⏸️ **自動採礦（AFK）已暫停。**',
        'system'
      );
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  processAutoMine(state, callbacks = {}) {
    const mState = this.getMiningState(state);
    if (!mState.autoMining) return;

    const activePickaxeId = mState.pickaxe || 'pickaxe_none';
    const dur = mState.pickaxeDurability[activePickaxeId] ?? 0;
    if (dur <= 0) {
      mState.autoMining = false;
      if (callbacks.log) callbacks.log('⚠️ AFK 採礦已中斷：你的十字鎬壞掉了！', 'warning');
      if (callbacks.updateAllUI) callbacks.updateAllUI();
      return;
    }

    const now = Date.now();
    if (!mState.isMining) {
      this.startMining(state, null, callbacks);
    } else {
      const elapsed = now - (mState.mineStartTime || now);
      const needed = mState.mineDuration ?? 3300;
      if (elapsed >= needed) {
        this.finishMining(state, callbacks);
      }
    }
  },

  processOfflineMining(state, minutesOffline = 0, callbacks = {}) {
    const mState = this.getMiningState(state);
    if (!mState.autoMining) return null;

    const activePickaxeId = mState.pickaxe || 'pickaxe_none';
    let availableDur = mState.pickaxeDurability[activePickaxeId] ?? 0;
    if (availableDur <= 0) return null;

    const clampedMinutes = Math.min(480, Math.max(0, minutesOffline));
    if (clampedMinutes < 2) return null;

    // 1 extração a cada 30 segundos com 25% de eficiência
    const totalPotential = Math.floor((clampedMinutes * 60) / 30 * 0.25);
    const actualMines = Math.min(availableDur, Math.max(1, totalPotential));

    if (actualMines <= 0) return null;

    mState.pickaxeDurability[activePickaxeId] -= actualMines;
    const actState = LifeActivityCore.getActivityState(state, 'mining');
    actState.toolDurability = mState.pickaxeDurability[activePickaxeId];

    const zoneId = mState.activeZone || 'zone_abandoned_coal';
    let totalXp = 0;
    const matsGained = {};

    for (let i = 0; i < actualMines; i++) {
      const node = this.pickNodeForZone(zoneId, null);
      mState.miningLog[node.id] = (mState.miningLog[node.id] || 0) + 1;
      mState.totalMined = (mState.totalMined || 0) + 1;
      totalXp += node.xpReward || 8;

      const pMat = resolveCanonicalResourceId(node.yields.primary);
      const pQty = node.yields.primaryQty || 1;
      matsGained[pMat] = (matsGained[pMat] || 0) + pQty;

      const sMatRaw = node.yields.secondary;
      const sQty = node.yields.secondaryQty || 0;
      if (sMatRaw && sQty > 0) {
        const sMat = resolveCanonicalResourceId(sMatRaw);
        matsGained[sMat] = (matsGained[sMat] || 0) + sQty;
      }
    }

    for (const [matId, qty] of Object.entries(matsGained)) {
      addToInventory(state, matId, qty, 'common', false, callbacks, true);
    }

    LifeActivityCore.addXp(state, 'mining', totalXp, callbacks);

    if (callbacks.log) {
      callbacks.log(`💤 **離線採礦報告（${clampedMinutes} 分鐘）：**在亞丁開採了 ${actualMines} 個礦脈！（+${totalXp} 採礦經驗值）`, 'rarity-legendary');
    }

    return { actualMines, matsGained, totalXp };
  },

  startHarvest(state, tacticId = null, callbacks = {}) {
    return this.startMining(state, tacticId, callbacks);
  },

  finishHarvest(state, callbacks = {}) {
    return this.finishMining(state, callbacks);
  },

  exchangeOres(state, oreId, qty = 1, callbacks = {}) {
    return false;
  }
};
