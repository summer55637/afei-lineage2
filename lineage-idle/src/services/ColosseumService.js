import { DUEL_BET_TIERS, DUEL_OPPONENT_ARCHETYPES, SURVIVAL_WAVES, COLOSSEUM_SHOP_CATALOG } from '../data/colosseum.js';

export class ColosseumService {
  /**
   * Garante a inicialização do estado do 競技場
   */
  static ensureState(state) {
    if (!state.colosseum || typeof state.colosseum !== 'object') {
      state.colosseum = {
        badges: 0,
        duelWins: 0,
        duelLosses: 0,
        highestWave: 0,
        activeDuel: null,
        activeSurvival: null
      };
    }
    if (typeof state.colosseum.badges !== 'number') state.colosseum.badges = 0;
    return state.colosseum;
  }

  /**
   * Inicia um 決鬥 1v1 com 賭注
   */
  static startDuel(state, tierId, hooks = {}, customOpponent = null) {
    const colState = this.ensureState(state);
    const tier = DUEL_BET_TIERS.find(t => t.id === tierId) || DUEL_BET_TIERS[0];

    if ((state.gold || 0) < tier.bet) {
      return { success: false, message: `金幣不足，無法支付 ${tier.bet.toLocaleString()} 金幣 的賭注。` };
    }

    // Deduz a aposta
    state.gold -= tier.bet;

    const pStats = state.stats || { atk: 2000, def: 1800, maxHp: 8000 };
    let oppName, oppTitle, oppIcon, oppHp, oppPAtk, oppPDef;

    if (customOpponent) {
      oppName = customOpponent.charName || customOpponent.name || '傳說挑戰者';
      oppTitle = customOpponent.className ? `等級 ${customOpponent.level || 80} ${customOpponent.className}` : '王國角鬥士';
      oppIcon = customOpponent.isHero ? '👑' : '⚔️';
      
      const snap = customOpponent.statsSnapshot || {};
      oppHp = snap.hp || Math.floor((pStats.maxHp || 8000) * 1.1);
      oppPAtk = snap.pAtk || Math.floor((pStats.atk || 2000) * 1.05);
      oppPDef = snap.pDef || Math.floor((pStats.def || 1800) * 1.05);
    } else {
      // Seleciona um arquétipo aleatório
      const arch = DUEL_OPPONENT_ARCHETYPES[Math.floor(Math.random() * DUEL_OPPONENT_ARCHETYPES.length)];
      oppName = arch.name;
      oppTitle = arch.title;
      oppIcon = arch.icon;
      oppHp = Math.floor((pStats.maxHp || 8000) * (arch.hpMult || 1.0));
      oppPAtk = Math.floor((pStats.atk || 2000) * (arch.pAtkMult || 1.0));
      oppPDef = Math.floor((pStats.def || 1800) * (arch.pDefMult || 1.0));
    }

    colState.activeDuel = {
      tierId: tier.id,
      bet: tier.bet,
      rewardAA: tier.rewardAA,
      opponentName: oppName,
      opponentTitle: oppTitle,
      opponentIcon: oppIcon,
      hp: oppHp,
      maxHp: oppHp,
      pAtk: oppPAtk,
      pDef: oppPDef,
      playerHp: state.hp || pStats.maxHp,
      playerMaxHp: pStats.maxHp,
      turn: 1
    };

    hooks.log?.(`⚔️ 已在奇岩競技場與 **${oppName}** 開始決鬥！賭注：${tier.bet.toLocaleString()} 金幣`, 'warning');
    hooks.onUpdate?.();
    return { success: true, duel: colState.activeDuel };
  }

  /**
   * Executa um turno no 決鬥 1v1
   */
  static executeDuelTurn(state, hooks = {}) {
    const colState = this.ensureState(state);
    const duel = colState.activeDuel;
    if (!duel) return { success: false, message: '目前沒有進行中的決鬥。' };

    const pStats = state.stats || { atk: 2500, def: 2000 };
    const pDmg = Math.max(150, Math.floor((pStats.atk || 2000) * 1.6 - duel.pDef * 0.4));
    duel.hp = Math.max(0, duel.hp - pDmg);

    hooks.log?.(`⚔️ 你的攻擊命中 **${duel.opponentName}**，造成 **${pDmg.toLocaleString()}** 傷害！（剩餘生命值：${duel.hp.toLocaleString()}）`, 'combat');

    if (duel.hp <= 0) {
      // 勝利!
      const winGold = duel.bet * 2;
      state.gold = (state.gold || 0) + winGold;
      colState.badges += 10;
      colState.duelWins++;

      hooks.log?.(`🏆 決鬥勝利！你擊敗 **${duel.opponentName}**！獎勵：+${winGold.toLocaleString()} 金幣 與 +10 競技場徽章！`, 'victory');
      colState.activeDuel = null;
      hooks.onUpdate?.();
      return { success: true, isVictory: true, goldWon: winGold };
    }

    // Contra-ataque do oponente
    const oppDmg = Math.max(100, Math.floor(duel.pAtk * 1.4 - (pStats.def || 1800) * 0.3));
    state.hp = Math.max(1, (state.hp || 5000) - oppDmg);
    hooks.log?.(`💥 **${duel.opponentName}** 發動連擊，對你的角色造成 **${oppDmg.toLocaleString()}** 傷害！`, 'danger');

    duel.turn++;
    hooks.onUpdate?.();
    return { success: true, isVictory: false, duel };
  }

  /**
   * Inicia o Desafio de Sobrevivência (Survival Waves 1 a 10)
   */
  static startSurvival(state, hooks = {}) {
    const colState = this.ensureState(state);
    const wave1 = SURVIVAL_WAVES[0];

    colState.activeSurvival = {
      waveIndex: 0,
      waveData: wave1,
      currentHp: wave1.hp,
      maxHp: wave1.hp,
      pAtk: wave1.pAtk,
      pDef: wave1.pDef,
      totalBadgesAccumulated: 0,
      isCompleted: false
    };

    hooks.log?.(`🔥 競技場生存挑戰開始！第 1/10 波：**${wave1.name}**！`, 'warning');
    hooks.onUpdate?.();
    return { success: true, survival: colState.activeSurvival };
  }

  /**
   * Executa um turno no Desafio de Sobrevivência
   */
  static executeSurvivalTurn(state, hooks = {}) {
    const colState = this.ensureState(state);
    const s = colState.activeSurvival;
    if (!s || s.isCompleted) return { success: false, message: '目前沒有進行中的生存挑戰。' };

    const pStats = state.stats || { atk: 3000, def: 2500 };
    const pDmg = Math.max(200, Math.floor((pStats.atk || 2500) * 1.8 - s.pDef * 0.4));
    s.currentHp = Math.max(0, s.currentHp - pDmg);

    hooks.log?.(`⚔️ 對第 ${s.waveIndex + 1} 波敵人造成 **${pDmg.toLocaleString()}** 傷害！（剩餘生命值：${s.currentHp.toLocaleString()}）`, 'combat');

    if (s.currentHp <= 0) {
      // Onda superada
      const waveEarnedBadges = s.waveData.badges;
      s.totalBadgesAccumulated += waveEarnedBadges;
      colState.badges += waveEarnedBadges;

      if (s.waveIndex + 1 > colState.highestWave) {
        colState.highestWave = s.waveIndex + 1;
      }

      hooks.log?.(`✨ 已突破第 ${s.waveIndex + 1} 波！（+${waveEarnedBadges} 枚競技場徽章）`, 'gain');

      if (s.waveIndex + 1 >= SURVIVAL_WAVES.length) {
        // Concluiu as 10 ondas
        s.isCompleted = true;
        colState.activeSurvival = null;
        hooks.log?.(`👑 競技場至尊冠軍！你成功突破全部 10 波生存挑戰！`, 'victory');
        hooks.onUpdate?.();
        return { success: true, isCompleted: true, totalBadges: s.totalBadgesAccumulated };
      }

      // Avança para a próxima onda
      s.waveIndex++;
      s.waveData = SURVIVAL_WAVES[s.waveIndex];
      s.currentHp = s.waveData.hp;
      s.maxHp = s.waveData.hp;
      s.pAtk = s.waveData.pAtk;
      s.pDef = s.waveData.pDef;

      hooks.log?.(`⚠️ 注意！第 ${s.waveIndex + 1}/10 波進入競技場：**${s.waveData.name}**！`, 'warning');
      hooks.onUpdate?.();
      return { success: true, nextWave: s.waveIndex + 1 };
    }

    hooks.onUpdate?.();
    return { success: true, isVictory: false, survival: s };
  }

  /**
   * Compra itens na Loja do 競技場 com Badges
   */
  static buyShopItem(state, itemId, hooks = {}) {
    const colState = this.ensureState(state);
    const item = COLOSSEUM_SHOP_CATALOG.find(i => i.id === itemId);
    if (!item) return { success: false, message: '競技場商店中找不到此物品。' };

    if (colState.badges < item.costBadges) {
      return { success: false, message: `競技場徽章不足，需要 ${item.costBadges} 枚。` };
    }

    colState.badges -= item.costBadges;
    state.inventory = state.inventory || [];
    state.inventory.push({
      id: item.id,
      itemId: item.id,
      name: item.name,
      uid: 'colosseum_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      count: 1
    });

    hooks.log?.(`🛒 你以 **${item.costBadges} 枚徽章** 購買了 **${item.name}**！`, 'gain');
    hooks.onUpdate?.();
    return { success: true, item };
  }
}
