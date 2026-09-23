// DyeService.js — Gerenciamento do Symbol Maker & Tatuagens de Henna
import { DYES_CATALOG } from '../data/dyes.js';

export const DyeService = {
  getDyeSlots(state) {
    const lvl = state.level || 1;
    return [
      { index: 0, requiredLvl: 20, name: '第 1 符號（第一次轉職）', unlocked: lvl >= 20, tattoo: state.tattoos?.[0] || null },
      { index: 1, requiredLvl: 40, name: '第 2 符號（第二次轉職）', unlocked: lvl >= 40, tattoo: state.tattoos?.[1] || null },
      { index: 2, requiredLvl: 76, name: '第 3 符號（第三次轉職）', unlocked: lvl >= 76, tattoo: state.tattoos?.[2] || null }
    ];
  },

  calculateNetDyeBonuses(state) {
    const net = { str: 0, dex: 0, con: 0, int: 0, wit: 0, men: 0 };
    if (!state.tattoos || !Array.isArray(state.tattoos)) return net;

    for (const t of state.tattoos) {
      if (!t) continue;
      if (t.plusStat && net[t.plusStat] !== undefined) net[t.plusStat] += (t.plusVal || 0);
      if (t.minusStat && net[t.minusStat] !== undefined) net[t.minusStat] -= (t.minusVal || 0);
    }

    // Teto canônico de no máximo +5 de aumento por atributo
    for (const k of Object.keys(net)) {
      net[k] = Math.min(5, net[k]);
    }
    return net;
  },

  drawDye(state, slotIndex, dyeId, callbacks = {}) {
    const dyeDef = DYES_CATALOG[dyeId];
    if (!dyeDef) {
      if (callbacks.log) callbacks.log('無效的染料。', 'warning');
      return { success: false, reason: 'invalid_dye' };
    }

    const slots = this.getDyeSlots(state);
    const slot = slots[slotIndex];
    if (!slot || !slot.unlocked) {
      if (callbacks.log) callbacks.log(`此紋身欄位需要等級 ${slot?.requiredLvl || 20} 以上！`, 'warning');
      return { success: false, reason: 'slot_locked' };
    }

    const costAdena = dyeDef.fee || 50000;
    if ((state.gold || 0) < costAdena) {
      if (callbacks.log) callbacks.log(`金幣不足！符號雕刻需要 ${costAdena.toLocaleString()} 金幣。`, 'warning');
      return { success: false, reason: 'insufficient_gold' };
    }

    const requiredItems = dyeDef.requiredCount || 10;
    const invIdx = (state.inventory || []).findIndex(i => i.itemId === dyeId);
    const hasItems = invIdx >= 0 && (state.inventory[invIdx].count || 1) >= requiredItems;

    if (!hasItems) {
      if (callbacks.log) callbacks.log(`你需要 ${requiredItems}× ${dyeDef.name} 才能刻印此符號！`, 'warning');
      return { success: false, reason: 'insufficient_items' };
    }

    // Consome Adena e Tintas
    state.gold -= costAdena;
    if (state.inventory[invIdx].count > requiredItems) {
      state.inventory[invIdx].count -= requiredItems;
    } else {
      state.inventory.splice(invIdx, 1);
    }

    state.tattoos = state.tattoos || [null, null, null];
    state.tattoos[slotIndex] = {
      id: dyeId,
      name: dyeDef.name,
      shortName: dyeDef.shortName,
      icon: dyeDef.icon,
      plusStat: dyeDef.plusStat,
      plusVal: dyeDef.plusVal,
      minusStat: dyeDef.minusStat,
      minusVal: dyeDef.minusVal,
      engravedAt: Date.now()
    };

    if (callbacks.log) {
      callbacks.log(`🎭 神聖符號刻印完成！**${dyeDef.shortName}** 已刻入第 ${slotIndex + 1} 欄。`, 'rarity-epic');
    }
    if (callbacks.floatText) {
      callbacks.floatText(`🎭 紋身刻印完成！（${dyeDef.shortName}）`, 'float-jackpot');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return { success: true };
  },

  removeDye(state, slotIndex, callbacks = {}) {
    state.tattoos = state.tattoos || [null, null, null];
    const existing = state.tattoos[slotIndex];
    if (!existing) {
      if (callbacks.log) callbacks.log('此欄位目前沒有刻印符號。', 'warning');
      return { success: false, reason: 'empty_slot' };
    }

    const removalFee = 10000;
    if ((state.gold || 0) < removalFee) {
      if (callbacks.log) callbacks.log(`金幣不足，無法移除！費用：${removalFee.toLocaleString()} 金幣。`, 'warning');
      return { success: false, reason: 'insufficient_gold' };
    }

    state.gold -= removalFee;
    const refundedItemId = existing.id;
    const refundedCount = 5; // Reembolsa 50% das tintas

    // Devolve as tintas para o inventário
    const invIdx = (state.inventory || []).findIndex(i => i.itemId === refundedItemId);
    if (invIdx >= 0) {
      state.inventory[invIdx].count = (state.inventory[invIdx].count || 1) + refundedCount;
    } else {
      state.inventory = state.inventory || [];
      state.inventory.push({
        uid: 'dye_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        itemId: refundedItemId,
        count: refundedCount,
        equipped: false
      });
    }

    state.tattoos[slotIndex] = null;

    if (callbacks.log) {
      callbacks.log(`🧹 已移除符號 **${existing.shortName}**！返還 ${refundedCount}× 染料。`, 'system');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return { success: true };
  }
};
