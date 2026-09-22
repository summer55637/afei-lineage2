import { FACTIONS, SEAL_STONES, SEVEN_SIGNS_BOSSES, MAMMON_BLACKSMITH_SERVICES, MAMMON_MERCHANT_CATALOG, NECROPOLIS_ZONES } from '../data/seven_signs.js';

export class SevenSignsService {
  /**
   * Inicializa o estado de Seven Signs se necessário
   */
  static ensureState(state) {
    if (!state.sevenSigns || typeof state.sevenSigns !== 'object') {
      state.sevenSigns = {
        faction: null, // 'dawn' | 'dusk'
        playerScore: 0,
        dawnScore: 250000,
        duskScore: 240000,
        ancientAdena: 0,
        stonesDeposited: { seal_stone_blue: 0, seal_stone_green: 0, seal_stone_red: 0 },
        activeBossFight: null,
        bossDefeats: { lilith: 0, anakim: 0 }
      };
    }
    if (typeof state.sevenSigns.ancientAdena !== 'number') {
      state.sevenSigns.ancientAdena = 0;
    }
    return state.sevenSigns;
  }

  /**
   * Escolhe a facção (Dawn ou Dusk)
   */
  static joinFaction(state, factionId, hooks = {}) {
    const ss = this.ensureState(state);
    if (!FACTIONS[factionId]) {
      return { success: false, message: '陣營無效。' };
    }
    ss.faction = factionId;
    hooks.log?.(`🏛️ 你已在七封印競賽中向 **${FACTIONS[factionId].name}** 陣營宣誓效忠！`, 'system');
    hooks.onUpdate?.();
    return { success: true, faction: factionId };
  }

  /**
   * Deposita pedras de selo para pontuar e converter em 古代金幣
   */
  static depositStones(state, stoneId, count = 1, hooks = {}) {
    const ss = this.ensureState(state);
    if (!ss.faction) {
      return { success: false, message: '你必須先選擇陣營。' };
    }
    const def = SEAL_STONES[stoneId];
    if (!def) return { success: false, message: '封印石無效。' };

    const inv = state.inventory || [];
    const invItem = inv.find(i => (i.id === stoneId || i.itemId === stoneId));
    const available = invItem ? (invItem.count || 1) : 0;
    if (available < count) {
      return { success: false, message: `你沒有 ${count}x ${def.name}。` };
    }

    // Deduz do inventário
    if (invItem.count && invItem.count > count) {
      invItem.count -= count;
    } else {
      const idx = inv.indexOf(invItem);
      if (idx !== -1) inv.splice(idx, 1);
    }

    const aaGained = count * def.aaValue;
    ss.ancientAdena += aaGained;
    ss.playerScore += aaGained;
    ss.stonesDeposited[stoneId] = (ss.stonesDeposited[stoneId] || 0) + count;

    if (ss.faction === 'dawn') {
      ss.dawnScore += aaGained;
    } else {
      ss.duskScore += aaGained;
    }

    hooks.log?.(`🏛️ 你交付了 **${count}x ${def.name}**，獲得 **+${aaGained.toLocaleString()} 古代金幣**！`, 'gain');
    hooks.onUpdate?.();
    return { success: true, aaGained, totalAA: ss.ancientAdena };
  }

  /**
   * Inicia o confronto contra Lilith ou Anakim
   */
  static startBossFight(state, bossId, hooks = {}) {
    const ss = this.ensureState(state);
    const boss = SEVEN_SIGNS_BOSSES[bossId];
    if (!boss) return { success: false, message: '找不到封印首領。' };

    if (state.level < boss.level) {
      return { success: false, message: `挑戰 ${boss.name} 需要等級 ${boss.level} 以上。` };
    }

    if (ss.ancientAdena < boss.reqAA) {
      return { success: false, message: `開啟聖域傳送門需要 ${boss.reqAA.toLocaleString()} 古代金幣。` };
    }

    ss.ancientAdena -= boss.reqAA;
    ss.activeBossFight = {
      bossId,
      bossName: boss.name,
      bossHp: boss.hp,
      maxHp: boss.hp,
      pAtk: boss.pAtk,
      pDef: boss.pDef,
      turn: 1
    };

    hooks.log?.(`⚡ 封印傳送門已開啟！你進入了 **${boss.name}** 的神聖聖域！`, 'warning');
    hooks.onUpdate?.();
    return { success: true, fight: ss.activeBossFight };
  }

  /**
   * Executa um turno no confronto contra o Chefe de Selo
   */
  static executeBossTurn(state, hooks = {}) {
    const ss = this.ensureState(state);
    const fight = ss.activeBossFight;
    if (!fight) return { success: false, message: '目前沒有進行中的封印爭奪戰。' };

    const boss = SEVEN_SIGNS_BOSSES[fight.bossId];
    const playerStats = state.stats || { atk: 2500, matk: 2500, def: 2000, mdef: 2000 };
    const playerDmg = Math.max(100, Math.floor((playerStats.atk || 1500) * 1.5 - fight.pDef * 0.4));
    fight.bossHp = Math.max(0, fight.bossHp - playerDmg);

    hooks.log?.(`⚔️ 你對 **${boss.name}** 造成 **${playerDmg.toLocaleString()}** 傷害（HP：${fight.bossHp.toLocaleString()} / ${fight.maxHp.toLocaleString()}）`, 'combat');

    if (fight.bossHp <= 0) {
      // Vitória!
      ss.bossDefeats[fight.bossId] = (ss.bossDefeats[fight.bossId] || 0) + 1;
      ss.ancientAdena += boss.rewards.aa;
      state.xp = (state.xp || 0) + boss.rewards.xp;
      state.sp = (state.sp || 0) + boss.rewards.sp;

      state.inventory = state.inventory || [];
      for (const it of boss.rewards.items) {
        state.inventory.push({
          id: it,
          itemId: it,
          uid: 'ss_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
          count: 1
        });
      }

      ss.activeBossFight = null;
      hooks.log?.(`🏆 榮耀勝利！你擊敗了 **${boss.name}**！獎勵：+${boss.rewards.aa.toLocaleString()} AA、+${boss.rewards.xp.toLocaleString()} XP 與頂級物品！`, 'victory');
      hooks.onUpdate?.();
      return { success: true, isVictory: true, rewards: boss.rewards };
    }

    // Contra-ataque do Chefe
    const bossDmg = Math.max(50, Math.floor(fight.pAtk * 1.2 - (playerStats.def || 1000) * 0.2));
    state.hp = Math.max(1, (state.hp || 5000) - bossDmg);
    hooks.log?.(`⚠️ **${boss.name}** 施放毀滅性攻擊，對玩家造成 **${bossDmg.toLocaleString()}** 傷害！`, 'danger');

    fight.turn++;
    hooks.onUpdate?.();
    return { success: true, isVictory: false, fight };
  }

  /**
   * Comprar item do Mercador de Mammon
   */
  static buyMammonItem(state, itemId, hooks = {}) {
    const ss = this.ensureState(state);
    const item = MAMMON_MERCHANT_CATALOG.find(i => i.id === itemId);
    if (!item) return { success: false, message: '找不到瑪門物品。' };

    if (ss.ancientAdena < item.costAA) {
      return { success: false, message: `古代金幣不足，需要 ${item.costAA.toLocaleString()} AA。` };
    }

    ss.ancientAdena -= item.costAA;
    state.inventory = state.inventory || [];
    state.inventory.push({
      id: item.id,
      itemId: item.id,
      name: item.name,
      uid: 'mammon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      count: 1
    });

    hooks.log?.(`🛒 你以 **${item.costAA.toLocaleString()} AA** 從瑪門商人購買了 **${item.name}**！`, 'gain');
    hooks.onUpdate?.();
    return { success: true, item };
  }

  /**
   * Deselar armadura com o Blacksmith of Mammon
   */
  static unsealArmor(state, armorItem, hooks = {}) {
    const accessCheck = this.canAccessExclusiveBlacksmith(state);
    if (!accessCheck.allowed) {
      return { success: false, message: accessCheck.message };
    }

    const ss = this.ensureState(state);
    const cost = 50000;
    if (ss.ancientAdena < cost) {
      return { success: false, message: `古代金幣不足，解除防具封印需要 ${cost.toLocaleString()} AA。` };
    }
    if (!armorItem) return { success: false, message: '請選擇一件封印防具。' };

    ss.ancientAdena -= cost;
    armorItem.isUnsealed = true;
    armorItem.name = armorItem.name ? armorItem.name.replace('(Sealed)', '').trim() + '（已解除封印 ✨）' : '已解除封印的防具 ✨';
    
    hooks.log?.(`⚒️ 馬門鐵匠已解除 **${armorItem.name}** 的古代封印！裝備已釋放完整潛能！`, 'gain');
    hooks.onUpdate?.();
    return { success: true, armor: armorItem };
  }

  /**
   * Gatekeeper de Acesso ao Ferreiro / Mercador Oculto dos Selos.
   * Regra: Apenas a facção vencedora ganha acesso durante o período de validação dos selos.
   * @param {Object} state
   * @returns {{ allowed: boolean, message: string }}
   */
  static canAccessExclusiveBlacksmith(state) {
    const ss = this.ensureState(state);
    const phase = ss.phase || 'seal_validation'; // 'competition' | 'seal_validation'
    const winner = ss.winnerFaction || (ss.dawnScore >= ss.duskScore ? 'dawn' : 'dusk');

    if (phase === 'competition') {
      return {
        allowed: false,
        message: '七封印競賽期間，封印鐵匠正處於神聖冥想狀態。'
      };
    }

    if (!ss.faction) {
      return {
        allowed: false,
        message: '拒絕進入：你尚未向任何七封印陣營宣誓效忠。'
      };
    }

    if (ss.faction !== winner) {
      return {
        allowed: false,
        message: `限制進入：本週只有勝利陣營【${FACTIONS[winner]?.name || winner}】的成員能獲得瑪門隱藏鐵匠的祝福。`
      };
    }

    return {
      allowed: true,
      message: `允許進入：歡迎來到瑪門隱藏鍛造所，【${FACTIONS[winner]?.name || winner}】陣營的尊貴勇士。`
    };
  }

  /**
   * Resolução do Ciclo Semanal das Seven Signs (Cron/Loop de Servidor).
   * @param {Object} state
   * @param {'dawn'|'dusk'|'tie'|null} overrideWinner
   * @returns {Object}
   */
  static resolveWeeklyCycle(state, overrideWinner = null) {
    const ss = this.ensureState(state);
    ss.cycleNumber = (ss.cycleNumber || 1);

    if (ss.phase === 'competition' || !ss.phase) {
      let winner = overrideWinner;
      if (!winner) {
        winner = ss.dawnScore > ss.duskScore ? 'dawn' : ss.duskScore > ss.dawnScore ? 'dusk' : 'tie';
      }
      ss.phase = 'seal_validation';
      ss.winnerFaction = winner;
      ss.cycleEndsAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    } else {
      ss.cycleNumber += 1;
      ss.phase = 'competition';
      ss.winnerFaction = null;
      ss.dawnScore = 250000;
      ss.duskScore = 240000;
      ss.cycleEndsAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    }

    return ss;
  }

  /**
   * Cálculo de Penalidade de Morte no Mundo Aberto (Open World Death Penalty).
   * - Inocente: Perde 4% de EXP e 2% chance de drop de item da mochila.
   * - PK / Assassino (Karma > 0): Perde 10% de EXP e 60% chance de drop de item valioso.
   * @param {Object} state
   * @param {Object} hooks
   * @returns {{ expLost: number, droppedItem: Object|null }}
   */
  static applyDeathPenalty(state, hooks = {}) {
    const karma = state.karma || 0;
    const isPk = karma > 0;
    const currentXp = state.xp || 0;
    
    // Perda de EXP
    const expLossRate = isPk ? 0.10 : 0.04;
    const expLost = Math.floor(currentXp * expLossRate);
    state.xp = Math.max(0, currentXp - expLost);

    // Chance de Drop de Item
    let droppedItem = null;
    const dropChance = isPk ? 0.60 : 0.02;
    const inv = state.inventory || [];

    if (Math.random() <= dropChance && inv.length > 0) {
      // Prioriza itens não equipados
      const eligibleIndices = [];
      inv.forEach((item, index) => {
        if (!item.isEquipped || isPk) eligibleIndices.push(index);
      });

      if (eligibleIndices.length > 0) {
        const pickedIndex = eligibleIndices[Math.floor(Math.random() * eligibleIndices.length)];
        droppedItem = inv.splice(pickedIndex, 1)[0];
      }
    }

    hooks.log?.(
      `💀 **死亡懲罰：**你損失了 ${expLost.toLocaleString()} EXP！${droppedItem ? `💥 物品【${droppedItem.name || droppedItem.id}】掉落在地上！` : ''}`,
      'danger'
    );
    hooks.onUpdate?.();

    return { expLost, droppedItem };
  }
}
