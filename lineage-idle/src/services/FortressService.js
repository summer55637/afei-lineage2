import { FORTRESSES } from '../data/fortresses.js';
import { BRACELETS, TALISMANS } from '../data/talismans.js';

export class FortressService {
  /**
   * Garante a inicialização do estado de 要塞s
   */
  static ensureState(state) {
    if (!state.fortresses || typeof state.fortresses !== 'object') {
      state.fortresses = {
        owned: [], // array de IDs de fortalezas conquistadas
        epaulettes: 0,
        lastCollectionTime: Date.now(),
        equippedBracelet: 'bracelet_steel', // ID do bracelete equipado
        equippedTalismans: ['talisman_power'], // Array de até 4 talismãs equipados
        activeSiege: null
      };
    }
    if (!Array.isArray(state.fortresses.owned)) state.fortresses.owned = [];
    if (!Array.isArray(state.fortresses.equippedTalismans)) state.fortresses.equippedTalismans = [];
    if (typeof state.fortresses.epaulettes !== 'number') state.fortresses.epaulettes = 0;
    return state.fortresses;
  }

  /**
   * Inicia o cerco à 要塞
   */
  static startFortressSiege(state, fortId, hooks = {}) {
    const fState = this.ensureState(state);
    const fort = FORTRESSES[fortId];
    if (!fort) return { success: false, message: '找不到要塞。' };

    if (state.level < fort.level) {
      return { success: false, message: `攻擊 ${fort.name} 需要等級 ${fort.level} 以上。` };
    }

    fState.activeSiege = {
      fortId,
      fortName: fort.name,
      generatorsRemaining: fort.generators,
      defenderHp: fort.defenders.hp,
      maxHp: fort.defenders.hp,
      pAtk: fort.defenders.pAtk,
      pDef: fort.defenders.pDef,
      turn: 1,
      isCompleted: false
    };

    hooks.log?.(`⚔️ 已開始攻擊 **${fort.name}**！摧毀守軍的 ${fort.generators} 座能源產生器！`, 'warning');
    hooks.onUpdate?.();
    return { success: true, siege: fState.activeSiege };
  }

  /**
   * Executa um turno no cerco à 要塞
   */
  static executeSiegeTurn(state, hooks = {}) {
    const fState = this.ensureState(state);
    const siege = fState.activeSiege;
    if (!siege || siege.isCompleted) {
      return { success: false, message: '目前沒有進行中的要塞攻城戰。' };
    }

    const playerStats = state.stats || { atk: 3000, matk: 3000 };
    const fort = FORTRESSES[siege.fortId];

    // Destruição dos Geradores de Energia
    if (siege.generatorsRemaining > 0) {
      siege.generatorsRemaining--;
      hooks.log?.(`💥 能源產生器已摧毀！（剩餘 ${siege.generatorsRemaining} 座）`, 'combat');
      if (siege.generatorsRemaining === 0) {
        hooks.log?.(`🚩 所有能源產生器都已摧毀！要塞隊長現身進行最終決戰！`, 'warning');
      }
      hooks.onUpdate?.();
      return { success: true, stage: 'generators', remaining: siege.generatorsRemaining };
    }

    // Confronto com os Defensores
    const dmg = Math.max(200, Math.floor((playerStats.atk || 2000) * 2.0 - siege.pDef * 0.5));
    siege.defenderHp = Math.max(0, siege.defenderHp - dmg);
    hooks.log?.(`⚔️ 對要塞守軍造成 **${dmg.toLocaleString()}** 傷害！（剩餘 HP：${siege.defenderHp.toLocaleString()}）`, 'combat');

    if (siege.defenderHp <= 0) {
      siege.isCompleted = true;
      if (!fState.owned.includes(siege.fortId)) {
        fState.owned.push(siege.fortId);
      }
      const epaulettesReward = fort.level * 10;
      fState.epaulettes += epaulettesReward;
      hooks.log?.(`🏆 旗幟升起！你已攻下 **${fort.name}**！獎勵：+${epaulettesReward} 騎士肩章，並啟用領地加成！`, 'victory');
      fState.activeSiege = null;
      hooks.onUpdate?.();
      return { success: true, isVictory: true, fortId: fort.id };
    }

    siege.turn++;
    hooks.onUpdate?.();
    return { success: true, isVictory: false, siege };
  }

  /**
   * Atualiza a produção de Knight's Epaulettes com base nas fortalezas sob posse
   */
  static updateProductionTick(state) {
    const fState = this.ensureState(state);
    if (!fState.owned || fState.owned.length === 0) return;

    const now = Date.now();
    const elapsedMinutes = (now - (fState.lastCollectionTime || now)) / 60000;
    if (elapsedMinutes >= 1) {
      let totalRate = 0;
      for (const fId of fState.owned) {
        const def = FORTRESSES[fId];
        if (def) totalRate += def.epauletteRate;
      }
      const gained = Math.floor(elapsedMinutes * totalRate);
      if (gained > 0) {
        fState.epaulettes += gained;
        fState.lastCollectionTime = now;
      }
    }
  }

  /**
   * Comprar/Equipar 手鐲
   */
  static buyBracelet(state, braceletId, hooks = {}) {
    const fState = this.ensureState(state);
    const def = BRACELETS[braceletId];
    if (!def) return { success: false, message: '找不到手鐲。' };

    if (fState.epaulettes < def.costEpaulettes) {
      return { success: false, message: `騎士肩章不足，需要 ${def.costEpaulettes}。` };
    }

    fState.epaulettes -= def.costEpaulettes;
    fState.equippedBracelet = braceletId;
    // Ajusta o limite de talismãs caso o novo bracelete tenha menos slots
    if (fState.equippedTalismans.length > def.slots) {
      fState.equippedTalismans = fState.equippedTalismans.slice(0, def.slots);
    }

    hooks.log?.(`📿 你已鍛造並裝備 **${def.name}**（${def.slots} 個護符欄位）！`, 'gain');
    hooks.onUpdate?.();
    return { success: true, bracelet: def };
  }

  /**
   * Comprar e equipar um 護符
   */
  static equipTalisman(state, talismanId, hooks = {}) {
    const fState = this.ensureState(state);
    const def = TALISMANS[talismanId];
    if (!def) return { success: false, message: '護符 não encontrado.' };

    const bracelet = BRACELETS[fState.equippedBracelet] || BRACELETS['bracelet_steel'];
    const maxSlots = bracelet.slots;

    if (fState.equippedTalismans.includes(talismanId)) {
      return { success: false, message: '此護符已經裝備。' };
    }

    if (fState.equippedTalismans.length >= maxSlots) {
      return { success: false, message: `你的手環最多只能裝備 ${maxSlots} 個護符。請先卸下一個再裝備。` };
    }

    if (fState.epaulettes < def.costEpaulettes) {
      return { success: false, message: `騎士肩章不足，需要 ${def.costEpaulettes}。` };
    }

    fState.epaulettes -= def.costEpaulettes;
    fState.equippedTalismans.push(talismanId);

    hooks.log?.(`✨ 護符 **${def.name}** equipado com sucesso no bracelete! (${fState.equippedTalismans.length}/${maxSlots})`, 'gain');
    hooks.onUpdate?.();
    return { success: true, talisman: def };
  }

  /**
   * Remover um 護符 equipado
   */
  static unequipTalisman(state, talismanId, hooks = {}) {
    const fState = this.ensureState(state);
    const idx = fState.equippedTalismans.indexOf(talismanId);
    if (idx === -1) return { success: false, message: '護符 não está equipado.' };

    fState.equippedTalismans.splice(idx, 1);
    hooks.log?.(`護符 removido do bracelete.`, 'system');
    hooks.onUpdate?.();
    return { success: true };
  }

  /**
   * Calcula todos os bônus ativos de 要塞s e 護符s
   */
  static getBonuses(state) {
    const fState = this.ensureState(state);
    const res = {
      pAtkMult: 0,
      mAtkMult: 0,
      pDefMult: 0,
      mDefMult: 0,
      crit: 0,
      critDmg: 0,
      hpMult: 0,
      mpRegen: 0,
      speed: 0,
      eva: 0,
      pvpDmg: 0
    };

    // Bônus territoriais das 要塞s possuídas
    for (const fId of fState.owned) {
      const fort = FORTRESSES[fId];
      if (fort && fort.buff) {
        if (fort.buff.stat === 'pDef') res.pDefMult += fort.buff.val;
        else if (fort.buff.stat === 'mDef') res.mDefMult += fort.buff.val;
        else if (fort.buff.stat === 'pAtk') res.pAtkMult += fort.buff.val;
        else if (fort.buff.stat === 'matk') res.mAtkMult += fort.buff.val;
        else if (fort.buff.stat === 'crit') res.crit += fort.buff.val;
      }
    }

    // Bônus dos 護符s equipados
    const isDynasty = fState.equippedBracelet === 'bracelet_dynasty';
    const mult = isDynasty ? 1.10 : 1.0;

    for (const tId of fState.equippedTalismans) {
      const tal = TALISMANS[tId];
      if (tal && tal.stats) {
        if (tal.stats.pAtkMult) res.pAtkMult += tal.stats.pAtkMult * mult;
        if (tal.stats.mAtkMult) res.mAtkMult += tal.stats.mAtkMult * mult;
        if (tal.stats.pDefMult) res.pDefMult += tal.stats.pDefMult * mult;
        if (tal.stats.mDefMult) res.mDefMult += tal.stats.mDefMult * mult;
        if (tal.stats.crit) res.crit += Math.floor(tal.stats.crit * mult);
        if (tal.stats.critDmg) res.critDmg += tal.stats.critDmg * mult;
        if (tal.stats.hpMult) res.hpMult += tal.stats.hpMult * mult;
        if (tal.stats.mpRegen) res.mpRegen += tal.stats.mpRegen * mult;
        if (tal.stats.speed) res.speed += Math.floor(tal.stats.speed * mult);
        if (tal.stats.eva) res.eva += Math.floor(tal.stats.eva * mult);
        if (tal.stats.pvpDmg) res.pvpDmg += tal.stats.pvpDmg * mult;
      }
    }

    return {
      ...res,
      pAtk: res.pAtkMult,
      mAtk: res.mAtkMult,
      pDef: res.pDefMult,
      mDef: res.mDefMult
    };
  }
}
