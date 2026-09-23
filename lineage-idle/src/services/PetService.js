// 寵物Service.js — Gerenciador de Mascotes & 夥伴s de Batalha
import { PET_CATALOG } from '../data/pets.js';

export const PetService = {
  get寵物State(state) {
    if (!state.petData) {
      state.petData = {
        active寵物Id: null,
        pets: {},
        lastFeedTime: Date.now()
      };
    }
    return state.petData;
  },

  adopt寵物(state, petId, callbacks = {}) {
    const petDef = PET_CATALOG[petId];
    if (!petDef) return { success: false, reason: 'invalid_pet' };

    const pState = this.get寵物State(state);
    if (pState.pets[petId]) {
      if (callbacks.log) callbacks.log(`你已經擁有 ${petDef.name}！`, 'warning');
      return { success: false, reason: 'already_owned' };
    }

    const cost = petDef.cost || 50000;
    if ((state.gold || 0) < cost) {
      if (callbacks.log) callbacks.log(`金幣不足！領養需要 ${cost.toLocaleString()} 金幣。`, 'warning');
      return { success: false, reason: 'insufficient_gold' };
    }

    if ((state.level || 1) < petDef.unlockLvl) {
      if (callbacks.log) callbacks.log(`等級不足！${petDef.name} 需要等級 ${petDef.unlockLvl} 以上。`, 'warning');
      return { success: false, reason: 'level_locked' };
    }

    state.gold -= cost;
    pState.pets[petId] = {
      id: petId,
      name: petDef.name,
      level: 1,
      xp: 0,
      hunger: 100, // 0 a 100%
      adoptedAt: Date.now()
    };

    if (!pState.active寵物Id) {
      pState.active寵物Id = petId;
    }

    if (callbacks.log) callbacks.log(`🎉 你已領養夥伴 **${petDef.name}**！`, 'rarity-epic');
    if (callbacks.floatText) callbacks.floatText(`🐾 新寵物：${petDef.name}！`, 'float-jackpot');

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return { success: true };
  },

  summon寵物(state, petId, callbacks = {}) {
    const pState = this.get寵物State(state);
    if (petId && !pState.pets[petId]) return { success: false, reason: 'not_owned' };

    pState.active寵物Id = pState.active寵物Id === petId ? null : petId;
    const active = pState.pets[pState.active寵物Id];

    if (callbacks.log) {
      if (active) callbacks.log(`🐾 你召喚了 **${active.name}**（等級 ${active.level}）並肩作戰！`, 'gain');
      else callbacks.log('🐾 寵物已收回休息。', 'system');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return { success: true, active寵物Id: pState.active寵物Id };
  },

  feed寵物(state, callbacks = {}) {
    const pState = this.get寵物State(state);
    if (!pState.active寵物Id || !pState.pets[pState.active寵物Id]) {
      if (callbacks.log) callbacks.log('目前沒有可餵食的出戰寵物。', 'warning');
      return { success: false, reason: 'no_active_pet' };
    }

    const feedCost = 5000;
    if ((state.gold || 0) < feedCost) {
      if (callbacks.log) callbacks.log('金幣不足，無法購買寵物特製飼料（5,000 金幣）。', 'warning');
      return { success: false, reason: 'insufficient_gold' };
    }

    state.gold -= feedCost;
    const pet = pState.pets[pState.active寵物Id];
    pet.hunger = 100;
    pState.lastFeedTime = Date.now();

    if (callbacks.log) callbacks.log(`🍖 你餵食了 **${pet.name}**！飽食度恢復至 100%。`, 'gain');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return { success: true };
  },

  add寵物Xp(state, xpAmount, callbacks = {}) {
    const pState = this.get寵物State(state);
    if (!pState.active寵物Id || !pState.pets[pState.active寵物Id]) return;

    const pet = pState.pets[pState.active寵物Id];
    if (pet.level >= 60) return; // Cap 60

    pet.xp = (pet.xp || 0) + Math.floor(xpAmount * 0.25); // 25% do XP do herói
    const reqXp = pet.level * pet.level * 400;

    if (pet.xp >= reqXp && pet.level < 60) {
      pet.xp -= reqXp;
      pet.level++;
      if (callbacks.log) callbacks.log(`🌟 你的夥伴 **${pet.name}** 升到 **${pet.level} 級**！`, 'rarity-epic');
      if (callbacks.floatText) callbacks.floatText(`🐾 寵物升級！（等級 ${pet.level}）`, 'float-epic');
    }
  },

  getActive寵物Bonus(state) {
    const pState = this.get寵物State(state);
    if (!pState.active寵物Id || !pState.pets[pState.active寵物Id]) return null;

    const pet = pState.pets[pState.active寵物Id];
    const def = PET_CATALOG[pet.id];
    if (!def) return null;

    const lvl = pet.level || 1;
    const buffVal = def.buff.baseVal + (lvl * def.buff.valPerLvl);
    const petAtk = def.baseAtk + (lvl * def.atkPerLvl);

    return {
      id: pet.id,
      name: pet.name,
      level: lvl,
      stat: def.buff.stat,
      val: buffVal,
      atk: petAtk,
      desc: def.buff.desc
    };
  }
};
