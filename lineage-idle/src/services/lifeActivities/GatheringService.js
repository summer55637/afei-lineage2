// GatheringService.js — Motor Central de Coleta Botânica & Flora de Aden (Lineage II Style)
import {
  GATHERING_ZONES,
  FLORA_NODES_CATALOG,
  SICKLES_CATALOG,
  POUCHES_CATALOG,
  GATHERING_TACTICS,
  BOTANICAL_HAZARDS,
  BOTANICAL_SIGNALS
} from '../../data/gathering.js';
import { addToInventory } from '../InventoryService.js';
import { LifeActivityCore } from './LifeActivityCore.js';
import { RewardEngine } from './RewardEngine.js';
import { resolveCanonicalResourceId } from './ResourceDictionary.js';

export const GatheringService = {
  getGatheringState(state) {
    if (state) {
      LifeActivityCore.getActivityState(state, 'gathering');
    }
    if (!state.gathering || typeof state.gathering !== 'object') {
      state.gathering = {
        skillLevel: 1,
        skillXp: 0,
        sickle: 'sickle_none',
        selectedTactic: 'standard',
        activePouch: null,
        activeZone: 'zone_gludio_fields',
        isGathering: false,
        harvestStartTime: 0,
        targetedNodeId: null,
        targetedNodePurity: 0,
        targetedNodeHazard: 'none',
        targetedNodeSignal: '',
        inspected: false,
        harvestDuration: 3000,
        totalHarvested: 0,
        gatheringLog: {},
        autoGathering: false,
        lastAutoTick: 0,
        sickleDurability: {
          sickle_none: 50
        },
        pouchInventory: {}
      };
    }

    if (!state.gathering.sickle) {
      state.gathering.sickle = 'sickle_none';
    }
    if (!state.gathering.selectedTactic) {
      state.gathering.selectedTactic = 'standard';
    }
    if (!state.gathering.sickleDurability) {
      state.gathering.sickleDurability = {};
    }
    if (state.gathering.sickleDurability.sickle_none === undefined) {
      state.gathering.sickleDurability.sickle_none = 50;
    }
    if (!state.gathering.pouchInventory) {
      state.gathering.pouchInventory = {};
    }
    if (!state.gathering.gatheringLog) {
      state.gathering.gatheringLog = {};
    }
    if (!state.gathering.activeZone) {
      state.gathering.activeZone = 'zone_gludio_fields';
    }

    return state.gathering;
  },

  getAvailableZones(state) {
    const playerLvl = Number(state?.level) || 1;
    return Object.values(GATHERING_ZONES).filter(zone => playerLvl >= zone.minLevel);
  },

  selectZone(state, zoneId, callbacks = {}) {
    const gState = this.getGatheringState(state);
    const zone = GATHERING_ZONES[zoneId];
    if (!zone) return false;

    const playerLvl = Number(state?.level) || 1;
    if (playerLvl < zone.minLevel) {
      if (callbacks.log) callbacks.log(`⚠️ 等級不足，無法在 ${zone.name} 採集！需要等級 ${zone.minLevel}。`, 'warning');
      return false;
    }

    gState.activeZone = zoneId;
    gState.isGathering = false;
    gState.targetedNodeId = null;

    if (callbacks.log) callbacks.log(`📍 你已在 **${zone.name}** 準備好植物採集籃。`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  selectPouch(state, pouchId, callbacks = {}) {
    const gState = this.getGatheringState(state);
    if (!pouchId) {
      gState.activePouch = null;
      if (callbacks.updateAllUI) callbacks.updateAllUI();
      return true;
    }

    const available = gState.pouchInventory[pouchId] || 0;
    if (available <= 0) {
      if (callbacks.log) callbacks.log('⚠️ 你的庫存中沒有此採集籃／保存袋！', 'warning');
      return false;
    }

    gState.activePouch = pouchId;
    const pouchDef = POUCHES_CATALOG[pouchId];
    if (callbacks.log) callbacks.log(`🧺 已啟用採集籃：**${pouchDef?.name || pouchId}**。`, 'system');

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  buyPouch(state, pouchId, qty = 1, callbacks = {}) {
    const pouch = POUCHES_CATALOG[pouchId];
    if (!pouch) return false;

    const count = Math.max(1, Math.floor(qty));
    const totalCost = pouch.buyPrice * count;

    if ((state.gold || 0) < totalCost) {
      if (callbacks.log) callbacks.log(`⚠️ 金幣不足！購買 ${count}x ${pouch.name} 需要 ${totalCost.toLocaleString()} 金幣。`, 'warning');
      return false;
    }

    state.gold -= totalCost;
    const gState = this.getGatheringState(state);
    gState.pouchInventory[pouchId] = (gState.pouchInventory[pouchId] || 0) + count;

    if (!gState.activePouch) {
      gState.activePouch = pouchId;
    }

    if (callbacks.log) callbacks.log(`🎒 已用 ${totalCost.toLocaleString()} 金幣購買 ${count}x **${pouch.name}**。`, 'loot');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  buySickle(state, sickleId, callbacks = {}) {
    const sickle = SICKLES_CATALOG[sickleId];
    if (!sickle) return false;

    const gState = this.getGatheringState(state);
    if (gState.sickleDurability[sickleId] !== undefined) {
      if (callbacks.log) callbacks.log(`⚠️ 你已經擁有 ${sickle.name}！`, 'warning');
      return false;
    }

    if (gState.skillLevel < sickle.minGatheringLevel) {
      if (callbacks.log) callbacks.log(`⚠️ 採集等級不足！需要採集等級 ${sickle.minGatheringLevel}。`, 'warning');
      return false;
    }

    if ((state.gold || 0) < sickle.buyPrice) {
      if (callbacks.log) callbacks.log(`⚠️ 金幣不足！需要 ${sickle.buyPrice.toLocaleString()} 金幣。`, 'warning');
      return false;
    }

    state.gold -= sickle.buyPrice;
    gState.sickleDurability[sickleId] = sickle.durabilityMax;
    gState.sickle = sickleId;

    if (callbacks.log) callbacks.log(`🌾 已取得並裝備 **${sickle.name}**！`, 'rarity-legendary');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  equipSickle(state, sickleId, callbacks = {}) {
    const sickle = SICKLES_CATALOG[sickleId];
    if (!sickle) return false;

    const gState = this.getGatheringState(state);
    if (gState.sickleDurability[sickleId] === undefined && sickleId !== 'sickle_none') {
      if (callbacks.log) callbacks.log('⚠️ 你的收藏中沒有這把鐮刀！', 'warning');
      return false;
    }

    gState.sickle = sickleId;
    if (callbacks.log) callbacks.log(`🌾 已裝備鐮刀：**${sickle.name}**。`, 'system');

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  repairSickle(state, sickleId, callbacks = {}) {
    const gState = this.getGatheringState(state);
    const targetSickleId = sickleId || gState.sickle;
    const sickle = SICKLES_CATALOG[targetSickleId];
    if (!sickle) return false;

    const currentDur = gState.sickleDurability[targetSickleId] ?? sickle.durabilityMax;
    if (currentDur >= sickle.durabilityMax) {
      if (callbacks.log) callbacks.log(`⚠️ 你的 ${sickle.name} 已磨利，可直接進行採集！`, 'warning');
      return false;
    }

    const missingPct = (sickle.durabilityMax - currentDur) / sickle.durabilityMax;
    const cost = Math.max(100, Math.floor(sickle.repairCost * missingPct));

    if ((state.gold || 0) < cost) {
      if (callbacks.log) callbacks.log(`⚠️ 金幣不足！磨利鐮刀需要 ${cost.toLocaleString()} 金幣。`, 'warning');
      return false;
    }

    state.gold -= cost;
    gState.sickleDurability[targetSickleId] = sickle.durabilityMax;

    // Sincroniza com LifeActivityCore
    const actState = LifeActivityCore.getActivityState(state, 'gathering');
    actState.toolDurability = sickle.durabilityMax;

    if (callbacks.log) callbacks.log(`✨ **${sickle.name}** 已磨利！耐久度恢復（${sickle.durabilityMax}/${sickle.durabilityMax}）。`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  selectTactic(state, tacticId, callbacks = {}) {
    const gState = this.getGatheringState(state);
    const tactic = GATHERING_TACTICS[tacticId] || GATHERING_TACTICS.standard;
    gState.selectedTactic = tactic.id;
    gState.activeTactic = tactic.id;
    if (callbacks.log) callbacks.log(`✂️ 已選擇修剪技巧：**${tactic.name}**（${tactic.desc}）。`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  pickNodeForZone(zoneId, activePouchId) {
    const zone = GATHERING_ZONES[zoneId] || GATHERING_ZONES.zone_gludio_fields;
    const nodes = zone.availableNodes.map(id => FLORA_NODES_CATALOG[id]).filter(Boolean);
    if (nodes.length === 0) return FLORA_NODES_CATALOG.node_wild_branch;

    const pouch = activePouchId ? POUCHES_CATALOG[activePouchId] : null;

    const weights = {
      common: 50,
      uncommon: 25,
      rare: 15,
      epic: 8,
      legendary: 2
    };

    if (pouch && pouch.rarityBoost) {
      if (pouch.rarityBoost === 'uncommon') weights.uncommon += 20;
      if (pouch.rarityBoost === 'rare') weights.rare += 25;
      if (pouch.rarityBoost === 'epic') weights.epic += 20;
      if (pouch.rarityBoost === 'legendary') weights.legendary += 20;
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

  inspectNode(state, callbacks = {}) {
    const gState = this.getGatheringState(state);
    if (!gState.targetedNodeId) return false;
    if (gState.inspected) return false;
    
    gState.inspected = true;
    if (callbacks.log) callbacks.log(`🔍 植物檢測：純度 ${gState.targetedNodePurity}%。${gState.targetedNodeSignal} 危險：${BOTANICAL_HAZARDS[gState.targetedNodeHazard]}`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  skipNode(state, callbacks = {}) {
    const gState = this.getGatheringState(state);
    const node = this.pickNodeForZone(gState.activeZone, gState.activePouch);
    gState.targetedNodeId = node.id;
    gState.targetedNodePurity = 50 + Math.floor(Math.random() * 51);
    const hazards = Object.keys(BOTANICAL_HAZARDS);
    gState.targetedNodeHazard = hazards[Math.floor(Math.random() * hazards.length)];
    gState.targetedNodeSignal = BOTANICAL_SIGNALS[gState.targetedNodeHazard];
    gState.inspected = false;
    gState.isGathering = false;
    
    if (callbacks.log) callbacks.log(`⏭️ 你放棄目前的植株，並在 ${GATHERING_ZONES[gState.activeZone].name} 尋找新的目標……`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  startHarvest(state, tacticId = null, callbacks = {}) {
    const gState = this.getGatheringState(state);
    const activeSickleId = gState.sickle || 'sickle_none';
    const sickleDef = SICKLES_CATALOG[activeSickleId];
    const dur = gState.sickleDurability[activeSickleId] ?? 0;

    if (dur <= 0) {
      if (callbacks.log) callbacks.log(`⚠️ 你的 ${sickleDef?.name || '鐮刀'} 已變鈍！請先磨利再繼續採集。`, 'warning');
      return { success: false, reason: 'broken_tool' };
    }

    if (tacticId && GATHERING_TACTICS[tacticId]) {
      gState.selectedTactic = tacticId;
      gState.activeTactic = tacticId;
    }
    const tactic = GATHERING_TACTICS[gState.selectedTactic] || GATHERING_TACTICS.standard;

    // Consome 1 cesto se houver
    let pouchSpeedMult = 1.0;
    if (gState.activePouch) {
      const pouchStock = gState.pouchInventory[gState.activePouch] || 0;
      if (pouchStock > 0) {
        gState.pouchInventory[gState.activePouch] -= 1;
        const pouchDef = POUCHES_CATALOG[gState.activePouch];
        if (pouchDef?.speedBoost) {
          pouchSpeedMult = pouchDef.speedBoost;
        }
      } else {
        gState.activePouch = null;
      }
    }

    const zone = GATHERING_ZONES[gState.activeZone] || GATHERING_ZONES.zone_gludio_fields;
    
    let node;
    if (gState.targetedNodeId && !gState.isGathering) {
        node = FLORA_NODES_CATALOG[gState.targetedNodeId];
    } else {
        node = this.pickNodeForZone(gState.activeZone, gState.activePouch);
        gState.targetedNodeId = node.id;
        gState.targetedNodePurity = 50 + Math.floor(Math.random() * 51);
        const hazards = Object.keys(BOTANICAL_HAZARDS);
        gState.targetedNodeHazard = hazards[Math.floor(Math.random() * hazards.length)];
        gState.targetedNodeSignal = BOTANICAL_SIGNALS[gState.targetedNodeHazard];
        gState.inspected = false;
    }

    if (!node) node = this.pickNodeForZone(gState.activeZone, gState.activePouch);

    let harvestDuration = node.baseTime || zone.baseGatherTime || 3200;
    harvestDuration = Math.max(1200, Math.floor((harvestDuration * (tactic.timeMult || 1.0)) / pouchSpeedMult));

    gState.isGathering = true;
    gState.harvestStartTime = Date.now();
    gState.targetedNodeId = node.id;
    gState.harvestDuration = harvestDuration;
    gState.activeTactic = tactic.id;

    if (callbacks.log) {
      callbacks.log(`🌿 已選定植物！[${tactic.name}] 正在 ${zone.name} 採集 **${node.name}**……`, 'system');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return { success: true };
  },

  finishHarvest(state, callbacks = {}) {
    const gState = this.getGatheringState(state);
    if (!gState.isGathering || !gState.targetedNodeId) return false;

    const now = Date.now();
    const elapsed = now - (gState.harvestStartTime || now);
    const needed = gState.harvestDuration ?? 3000;

    if (elapsed < needed) {
      const waitSec = ((needed - elapsed) / 1000).toFixed(1);
      if (callbacks.log) callbacks.log(`⚠️ 採集仍在進行中！請再等待 ${waitSec} 秒。`, 'warning');
      return false;
    }

    const node = FLORA_NODES_CATALOG[gState.targetedNodeId];
    if (!node) {
      gState.isGathering = false;
      gState.targetedNodeId = null;
      return false;
    }

    // Consome durabilidade
    const activeSickleId = gState.sickle || 'sickle_none';
    const sickleDef = SICKLES_CATALOG[activeSickleId];
    if (gState.sickleDurability[activeSickleId] !== undefined) {
      gState.sickleDurability[activeSickleId] = Math.max(0, gState.sickleDurability[activeSickleId] - 1);
    }
    const actState = LifeActivityCore.getActivityState(state, 'gathering');
    actState.toolDurability = gState.sickleDurability[activeSickleId] ?? 0;

    if (actState.toolDurability <= 0) {
      gState.isGathering = false;
      gState.targetedNodeId = null;
      gState.autoGathering = false;
      if (callbacks.log) callbacks.log(`💥 **鐮刀已鈍！** 你的 ${sickleDef?.name || '鐮刀'} 已完全失去鋒利度，請先磨利再繼續。`, 'error');
      if (callbacks.updateAllUI) callbacks.updateAllUI();
      if (callbacks.save) callbacks.save();
      return false;
    }

    const tactic = GATHERING_TACTICS[gState.activeTactic] || GATHERING_TACTICS.standard;
    const sickleBonus = sickleDef?.qualityBonus || 0.0;
    
    let hazardPenalty = 0;
    if (gState.activeTactic !== 'delicate') {
      if (gState.targetedNodeHazard === 'thorn' && gState.activeTactic === 'cleave') {
        const dmg = Math.floor((state.maxHp || 100) * 0.05);
        state.hp = Math.max(1, (state.hp || 100) - dmg);
        if (callbacks.log) callbacks.log(`🩸 尖銳荊棘刺傷了你！（${dmg} 傷害）`, 'error');
      }
      if (gState.targetedNodeHazard === 'resin' && gState.activeTactic === 'cleave') {
        gState.sickleDurability[activeSickleId] = Math.max(0, gState.sickleDurability[activeSickleId] - 1);
        if (callbacks.log) callbacks.log(`⚠️ 黏稠樹液黏住鐮刀！（耐久度 -1）`, 'warning');
      }
      if (gState.targetedNodeHazard === 'toxin') {
        hazardPenalty = 0.25;
        if (callbacks.log) callbacks.log(`🤢 有毒孢子覆蓋植物，純度下降！`, 'warning');
      }
    }

    let nodePurity = (gState.targetedNodePurity || 100) / 100;
    if (gState.inspected && gState.activeTactic !== 'inspect') {
      nodePurity += 0.20;
    }
    nodePurity = Math.max(0, Math.min(1.0, nodePurity - hazardPenalty));

    const qualityMod = sickleBonus + (tactic.qualityBonus || 0.0) + (nodePurity - 1.0);

    const quality = RewardEngine.rollQuality(gState.skillLevel, qualityMod);
    const primaryMatRaw = node.yields.primary;
    const secMatRaw = node.yields.secondary;

    const primaryMat = resolveCanonicalResourceId(primaryMatRaw);
    const secMat = secMatRaw ? resolveCanonicalResourceId(secMatRaw) : null;

    const basePrimaryQty = node.yields.primaryQty || 1;
    const primaryQty = RewardEngine.calculateYield(basePrimaryQty, quality);

    const baseSecQty = node.yields.secondaryQty || 0;
    const secQty = baseSecQty > 0 ? RewardEngine.calculateYield(baseSecQty, quality) : 0;

    addToInventory(state, primaryMat, primaryQty, node.rarity, false, callbacks, true);
    if (secMat && secQty > 0) {
      addToInventory(state, secMat, secQty, node.rarity, false, callbacks, true);
    }

    // Registro no Catálogo Botânico e Codex
    gState.gatheringLog[node.id] = (gState.gatheringLog[node.id] || 0) + 1;
    gState.totalHarvested = (gState.totalHarvested || 0) + 1;
    LifeActivityCore.recordCodexDiscovery(state, 'gathering', node.id);

    // XP
    const xpBase = node.xpReward || 8;
    const finalXp = Math.round(xpBase * quality.mult);
    LifeActivityCore.addXp(state, 'gathering', finalXp, callbacks);

    gState.isGathering = false;
    gState.targetedNodeId = null;

    if (callbacks.log) {
      const qualityPrefix = quality.tier === 'perfect' ? '🌸 **完美採集！**'
        : quality.tier === 'excellent' ? '✨ **優秀採集！**'
        : '✓ 採集完成：';
      callbacks.log(`🌿 ${qualityPrefix} 採集 **${node.name}** [${quality.name}]！獲得 +${primaryQty}x ${primaryMat.toUpperCase()}${secMat && secQty > 0 ? ` 與 +${secQty}x ${secMat.toUpperCase()}` : ''}！（+${finalXp} 採集 XP）`, 'loot');
    }

    if (callbacks.floatText) {
      callbacks.floatText(`+${primaryQty}x ${primaryMat.toUpperCase()}`, 'float-gold');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  toggleAutoGathering(state, callbacks = {}) {
    const gState = this.getGatheringState(state);
    if (gState.skillLevel < 5) {
      if (callbacks.log) callbacks.log('⚠️ 自動採集（AFK）會在採集等級 5 解鎖！', 'warning');
      return false;
    }

    gState.autoGathering = !gState.autoGathering;
    gState.lastAutoTick = Date.now();

    if (callbacks.log) {
      callbacks.log(
        gState.autoGathering
          ? '🌿 **自動採集（AFK）已啟用！**角色將持續採集藥草與木材。'
          : '⏸️ **自動採集（AFK）已暫停。**',
        'system'
      );
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  processAutoGather(state, callbacks = {}) {
    const gState = this.getGatheringState(state);
    if (!gState.autoGathering) return;

    const activeSickleId = gState.sickle || 'sickle_none';
    const dur = gState.sickleDurability[activeSickleId] ?? 0;
    if (dur <= 0) {
      gState.autoGathering = false;
      if (callbacks.log) callbacks.log('⚠️ 自動採集已中斷：你的鐮刀已經鈍化！', 'warning');
      if (callbacks.updateAllUI) callbacks.updateAllUI();
      return;
    }

    const now = Date.now();
    if (!gState.isGathering) {
      this.startHarvest(state, null, callbacks);
    } else {
      const elapsed = now - (gState.harvestStartTime || now);
      const needed = gState.harvestDuration ?? 3200;
      if (elapsed >= needed) {
        this.finishHarvest(state, callbacks);
      }
    }
  },

  processOfflineGathering(state, minutesOffline = 0, callbacks = {}) {
    const gState = this.getGatheringState(state);
    if (!gState.autoGathering) return null;

    const activeSickleId = gState.sickle || 'sickle_none';
    let availableDur = gState.sickleDurability[activeSickleId] ?? 0;
    if (availableDur <= 0) return null;

    const clampedMinutes = Math.min(480, Math.max(0, minutesOffline));
    if (clampedMinutes < 2) return null;

    // 1 colheita a cada 30 segundos com 25% de eficiência
    const totalPotential = Math.floor((clampedMinutes * 60) / 30 * 0.25);
    const actualHarvests = Math.min(availableDur, Math.max(1, totalPotential));

    if (actualHarvests <= 0) return null;

    gState.sickleDurability[activeSickleId] -= actualHarvests;
    const actState = LifeActivityCore.getActivityState(state, 'gathering');
    actState.toolDurability = gState.sickleDurability[activeSickleId];

    const zoneId = gState.activeZone || 'zone_gludio_fields';
    let totalXp = 0;
    const matsGained = {};

    for (let i = 0; i < actualHarvests; i++) {
      const node = this.pickNodeForZone(zoneId, null);
      gState.gatheringLog[node.id] = (gState.gatheringLog[node.id] || 0) + 1;
      gState.totalHarvested = (gState.totalHarvested || 0) + 1;
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

    LifeActivityCore.addXp(state, 'gathering', totalXp, callbacks);

    if (callbacks.log) {
      callbacks.log(`💤 **離線採集報告（${clampedMinutes} 分鐘）：**在亞丁採集了 ${actualHarvests} 叢植物！（+${totalXp} 採集 XP）`, 'rarity-legendary');
    }

    return { actualHarvests, matsGained, totalXp };
  },

  startGathering(state, tacticId = null, callbacks = {}) {
    return this.startHarvest(state, tacticId, callbacks);
  },

  finishGathering(state, callbacks = {}) {
    return this.finishHarvest(state, callbacks);
  },

  exchangeHerbs(state, herbId, qty = 1, callbacks = {}) {
    return false;
  }
};
