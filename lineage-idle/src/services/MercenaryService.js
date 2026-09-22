// MercenaryService.js — Gestor da Taverna e Esquadrão de Mercenários de Aden
import {
  MERCENARY_RARITIES,
  MERCENARY_SPECIALIZATIONS,
  MERCENARY_TEMPLATES,
  MERCENARY_TRAITS,
  getMercenaryXpForLevel,
  calculateMercenaryPower,
  rollMercenaryTrait
} from '../data/mercenaries.js';

const TAVERN_REFRESH_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 horas
const TAVERN_FORCE_REFRESH_COST = 10000; // 10.000 Adena
const MAX_OWNED_MERCENARIES = 12;

export const MercenaryService = {
  getMercenariesState(state) {
    if (!state.mercenaries || typeof state.mercenaries !== 'object') {
      state.mercenaries = {
        owned: [],
        tavernPool: [],
        lastTavernRefresh: 0
      };
    }
    if (!Array.isArray(state.mercenaries.owned)) {
      state.mercenaries.owned = [];
    }
    if (!Array.isArray(state.mercenaries.tavernPool)) {
      state.mercenaries.tavernPool = [];
    }
    return state.mercenaries;
  },

  isMercenaryBusy(state, mercUid) {
    if (!state.expeditions || !Array.isArray(state.expeditions)) return false;
    return state.expeditions.some(exp => {
      if (exp.claimed) return false;
      return Array.isArray(exp.squad) && exp.squad.includes(mercUid);
    });
  },

  getMercenaryByUid(state, mercUid) {
    const mState = this.getMercenariesState(state);
    return mState.owned.find(m => m.uid === mercUid) || null;
  },

  rollRarity() {
    const roll = Math.random() * 100;
    let accumulated = 0;
    const rarities = Object.values(MERCENARY_RARITIES);
    for (const r of rarities) {
      accumulated += r.weight;
      if (roll <= accumulated) {
        return r.id;
      }
    }
    return 'common';
  },

  generateTavernPool(count = 4) {
    const pool = [];
    const usedIds = new Set();

    for (let i = 0; i < count; i++) {
      // Sorteia raridade
      const rolledRarity = this.rollRarity();
      // Filtra templates compatíveis ou mais próximos
      let eligible = MERCENARY_TEMPLATES.filter(t => t.rarity === rolledRarity && !usedIds.has(t.id));
      if (eligible.length === 0) {
        eligible = MERCENARY_TEMPLATES.filter(t => !usedIds.has(t.id));
      }
      if (eligible.length === 0) {
        eligible = MERCENARY_TEMPLATES;
      }

      const template = eligible[Math.floor(Math.random() * eligible.length)];
      usedIds.add(template.id);

      const rarityDef = MERCENARY_RARITIES[template.rarity] || MERCENARY_RARITIES.common;
      const uid = 'candidate_' + Date.now() + '_' + Math.floor(Math.random() * 10000);

      pool.push({
        uid,
        templateId: template.id,
        name: template.name,
        title: template.title,
        icon: template.icon,
        spec: template.spec,
        rarity: template.rarity,
        basePower: template.basePower,
        quote: template.quote,
        level: 1,
        xp: 0,
        trait: rollMercenaryTrait(),
        loyalty: 50,
        hireCost: rarityDef.hireCostBase
      });
    }

    return pool;
  },

  refreshTavern(state, force = false, callbacks = {}) {
    const mState = this.getMercenariesState(state);
    const now = Date.now();
    const elapsed = now - (mState.lastTavernRefresh || 0);

    if (force) {
      if ((state.gold || 0) < TAVERN_FORCE_REFRESH_COST) {
        if (callbacks.log) callbacks.log(`⚠️ 金幣不足，無法刷新酒館契約！需要 ${TAVERN_FORCE_REFRESH_COST.toLocaleString()} 金幣。`, 'warning');
        return false;
      }
      state.gold -= TAVERN_FORCE_REFRESH_COST;
    } else if (mState.tavernPool.length > 0 && elapsed < TAVERN_REFRESH_INTERVAL_MS) {
      // Cooldown ainda ativo
      return false;
    }

    mState.tavernPool = this.generateTavernPool(4);
    mState.lastTavernRefresh = now;

    if (callbacks.log) {
      callbacks.log(`🍺 **新的傭兵來到亞丁酒館！** 查看目前可用的新契約。`, 'system');
    }
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  hireMercenary(state, candidateUid, callbacks = {}) {
    const mState = this.getMercenariesState(state);
    const candidateIdx = mState.tavernPool.findIndex(c => c.uid === candidateUid);
    if (candidateIdx < 0) {
      if (callbacks.log) callbacks.log('⚠️ 傭兵契約已失效或目前不可用。', 'warning');
      return false;
    }

    if (mState.owned.length >= MAX_OWNED_MERCENARIES) {
      if (callbacks.log) callbacks.log(`⚠️ 你的傭兵營已滿（${mState.owned.length}/${MAX_OWNED_MERCENARIES}）！請先解雇一名傭兵再招募新的傭兵。`, 'warning');
      return false;
    }

    const candidate = mState.tavernPool[candidateIdx];
    if ((state.gold || 0) < candidate.hireCost) {
      if (callbacks.log) callbacks.log(`⚠️ 金幣不足，無法招募 ${candidate.name}！需要 ${candidate.hireCost.toLocaleString()} 金幣。`, 'warning');
      return false;
    }

    state.gold -= candidate.hireCost;
    mState.tavernPool.splice(candidateIdx, 1);

    const hiredMerc = {
      ...candidate,
      uid: 'merc_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
      hiredAt: Date.now()
    };

    mState.owned.push(hiredMerc);

    const rarityDef = MERCENARY_RARITIES[hiredMerc.rarity] || MERCENARY_RARITIES.common;
    const specDef = MERCENARY_SPECIALIZATIONS[hiredMerc.spec] || { name: hiredMerc.spec };

    if (callbacks.log) {
      callbacks.log(`⚔️ **${hiredMerc.name}**（${specDef.name}，[${rarityDef.name}]）接受了契約並加入你的傭兵營！`, 'rarity-legendary');
    }
    if (callbacks.floatText) {
      callbacks.floatText(`+傭兵：${hiredMerc.name}`, 'float-gold');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  dismissMercenary(state, mercUid, callbacks = {}) {
    const mState = this.getMercenariesState(state);
    const mercIdx = mState.owned.findIndex(m => m.uid === mercUid);
    if (mercIdx < 0) return false;

    if (this.isMercenaryBusy(state, mercUid)) {
      if (callbacks.log) callbacks.log('⚠️ 此傭兵目前正在遠征，無法解雇！', 'warning');
      return false;
    }

    const merc = mState.owned[mercIdx];
    const refund = Math.floor((merc.hireCost || 5000) * 0.25);
    state.gold = (state.gold || 0) + refund;

    mState.owned.splice(mercIdx, 1);

    if (callbacks.log) {
      callbacks.log(`🛡️ ${merc.name} 已榮譽退役。返還：+${refund.toLocaleString()} 金幣。`, 'system');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return true;
  },

  addMercenaryXp(state, mercUid, xpAmount, callbacks = {}) {
    const merc = this.getMercenaryByUid(state, mercUid);
    if (!merc) return null;

    merc.xp = (merc.xp || 0) + xpAmount;
    let leveledUp = false;
    const oldLevel = merc.level || 1;

    while (merc.level < 20) {
      const needed = getMercenaryXpForLevel(merc.level);
      if (merc.xp >= needed) {
        merc.xp -= needed;
        merc.level += 1;
        leveledUp = true;
      } else {
        break;
      }
    }

    if (leveledUp && callbacks.log) {
      callbacks.log(`⭐ **${merc.name} 升到等級 ${merc.level}！** 遠征戰力提升至 ${calculateMercenaryPower(merc)}！`, 'rarity-legendary');
    }

    // Concede +2 de lealdade por expedição concluída com sucesso
    this.addMercenaryLoyalty(state, mercUid, 2, callbacks);

    return { leveledUp, oldLevel, newLevel: merc.level, loyalty: merc.loyalty };
  },

  addMercenaryLoyalty(state, mercUid, amount = 1, callbacks = {}) {
    const merc = this.getMercenaryByUid(state, mercUid);
    if (!merc) return 50;
    const oldLoyalty = merc.loyalty ?? 50;
    merc.loyalty = Math.max(0, Math.min(100, oldLoyalty + amount));
    if (merc.loyalty >= 80 && oldLoyalty < 80 && callbacks.log) {
      callbacks.log(`🤝 **${merc.name} 達到狂熱忠誠（Lv.${merc.loyalty}）！** 效率最高且成本降低！`, 'rarity-legendary');
    }
    return merc.loyalty;
  }
};
