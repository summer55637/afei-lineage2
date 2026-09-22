/**
 * AchievementService.js — Sistema de 成就s e Títulos Conquistáveis de Aden
 * 
 * Rastreia marcos épicos do jogador e desbloqueia títulos honoríficos, auras e molduras visuais.
 */

import { TITLES_CATALOG } from './CosmeticService.js';

export const ACHIEVEMENTS = [
  {
    id: 'ach_first_blood',
    title: 'Primeiro Sangue',
    desc: 'Derrote pelo menos 100 monstros em combate.',
    icon: '⚔️',
    target: 100,
    checkProgress: (state) => state.stats?.monstersKilled || state.monstersKilled || 0,
    rewardText: '稱號：「新手獵人」+ 25,000 金幣',
    reward: { adena: 25000, titleId: 'title_novice_hunter', titleName: '新手獵人', titleColor: '#86efac' }
  },
  {
    id: 'ach_carnage',
    title: 'Carnificina em Aden',
    desc: '在冒險旅途中擊敗 2,500 隻怪物。',
    icon: '💀',
    target: 2500,
    checkProgress: (state) => state.stats?.monstersKilled || state.monstersKilled || 0,
    rewardText: '稱號：「亞丁收割者」+ 250,000 金幣',
    reward: { adena: 250000, titleId: 'title_ceifador', titleName: '亞丁收割者', titleColor: '#ef4444' }
  },
  {
    id: 'ach_steel_master',
    title: '鋼鐵大師（+10）',
    desc: '裝備或持有一把強化 +10 以上的武器。',
    icon: '🔨',
    target: 1,
    checkProgress: (state) => {
      const inv = state.inventory || [];
      const hasPlus10 = inv.some(i => (i.enchant || i.enchantLevel || 0) >= 10);
      return hasPlus10 ? 1 : 0;
    },
    rewardText: '稱號：「鍛造大師」+ 青銅邊框',
    reward: { titleId: 'title_forjador', titleName: '鍛造大師', titleColor: '#f59e0b', frameId: 'frame_bronze' }
  },
  {
    id: 'ach_divine_blade',
    title: '天界之刃（+16）',
    desc: '裝備或持有一把強化 +16 以上的傳說武器。',
    icon: '✨',
    target: 1,
    checkProgress: (state) => {
      const inv = state.inventory || [];
      const hasPlus16 = inv.some(i => (i.enchant || i.enchantLevel || 0) >= 16);
      return hasPlus16 ? 1 : 0;
    },
    rewardText: '稱號：「神聖之刃」+ 皇家金色邊框',
    reward: { titleId: 'title_lamina_divina', titleName: '神聖之刃', titleColor: '#ffd700', frameId: 'frame_gold' }
  },
  {
    id: 'ach_titan_slayer',
    title: 'Terror dos Titãs',
    desc: 'Derrote pelo menos 10 Chefes de Raid épicos.',
    icon: '👹',
    target: 10,
    checkProgress: (state) => {
      const clears = Object.values(state.dailyRaidClears || {}).reduce((a, b) => a + (typeof b === 'number' ? b : 1), 0);
      return Math.max(clears, state.stats?.raidsAttempted || 0);
    },
    rewardText: 'Título: « Flagelo dos Titãs » + 500.000 Adena',
    reward: { adena: 500000, titleId: 'title_titan_slayer', titleName: 'Flagelo dos Titãs', titleColor: '#f97316' }
  },
  {
    id: 'ach_tower_sovereign',
    title: 'Soberano da Torre',
    desc: 'Conquiste pelo menos 15 andares na Torre da Insolência.',
    icon: '🏰',
    target: 15,
    checkProgress: (state) => state.tower?.highestFloor || state.towerFloor || 1,
    rewardText: 'Título: « 成就dor das Alturas » + Aura Abissal',
    reward: { titleId: 'title_tower_sovereign', titleName: '成就dor das Alturas', titleColor: '#c084fc', auraId: 'aura_abyssal_shadow' }
  },
  {
    id: 'ach_feudal_lord',
    title: 'Lorde Feudal de Aden',
    desc: 'Conquiste um Castelo ou Fortaleza para seu estandarte.',
    icon: '🛡️',
    target: 1,
    checkProgress: (state) => {
      const hasCastle = (state.castlesOwned && state.castlesOwned.length > 0) || (state.castles && Object.values(state.castles).some(c => c.isOwned));
      const hasFort = (state.fortress?.owned && state.fortress.owned.length > 0);
      return (hasCastle || hasFort) ? 1 : 0;
    },
    rewardText: 'Título: « Lorde de Aden » + Moldura Prata Épica',
    reward: { titleId: 'title_lorde', titleName: 'Lorde de Aden', titleColor: '#38bdf8', frameId: 'frame_silver' }
  },
  {
    id: 'ach_gladiator',
    title: 'Gladiador Eterno',
    desc: 'Vença pelo menos 20 confrontos no Coliseu ou nas Olimpíadas.',
    icon: '👑',
    target: 20,
    checkProgress: (state) => {
      const oly = state.olympiad?.wins || 0;
      const col = state.colosseum?.duelWins || 0;
      return oly + col;
    },
    rewardText: 'Título: « Gladiador Eterno » + 100 Aden Coins',
    reward: { adenCoins: 100, titleId: 'title_gladiator', titleName: 'Gladiador Eterno', titleColor: '#f97316' }
  },
  {
    id: 'ach_noblesse',
    title: 'Nobreza Sagrada',
    desc: 'Atinja Nível 75+ e conquiste a dádiva de Noblesse ou Subclasse ativa.',
    icon: '🕊️',
    target: 1,
    checkProgress: (state) => (state.level >= 75 || state.isNoblesse || (state.subclasses && state.subclasses.length > 0)) ? 1 : 0,
    rewardText: 'Título: « Nobre de Einhasad » + Aura Serafim Divina',
    reward: { titleId: 'title_nobre', titleName: 'Nobre de Einhasad', titleColor: '#38bdf8', auraId: 'aura_divine_seraph' }
  },
  {
    id: 'ach_ancient_legend',
    title: 'Lenda Ancestral (Nível 80)',
    desc: 'Alcance o cobiçado Nível 80 no continente de Aden.',
    icon: '⭐',
    target: 80,
    checkProgress: (state) => state.level || 1,
    rewardText: 'Título: « Lenda de Aden » + Moldura Celestial dos Deuses',
    reward: { titleId: 'title_lenda', titleName: 'Lenda de Aden', titleColor: '#ffd700', frameId: 'frame_celestial' }
  }
];

export const AchievementService = {
  getAchievementsStatus(state) {
    if (!state) return { achievements: [], completedCount: 0, claimedCount: 0 };
    state.achievements = state.achievements || { claimed: [] };

    let completedCount = 0;
    let claimedCount = 0;

    const list = ACHIEVEMENTS.map(ach => {
      const progress = ach.checkProgress(state);
      const isCompleted = progress >= ach.target;
      const isClaimed = (state.achievements.claimed || []).includes(ach.id);
      const canClaim = isCompleted && !isClaimed;

      if (isCompleted) completedCount++;
      if (isClaimed) claimedCount++;

      return {
        ...ach,
        currentProgress: progress,
        isCompleted,
        isClaimed,
        canClaim
      };
    });

    return {
      achievements: list,
      completedCount,
      claimedCount,
      total: ACHIEVEMENTS.length
    };
  },

  claimAchievement(state, achId, callbacks = {}) {
    const { log = console.log, floatText = () => {}, onUpdate = () => {} } = callbacks;
    if (!state) return { success: false };

    state.achievements = state.achievements || { claimed: [] };
    const ach = ACHIEVEMENTS.find(a => a.id === achId);
    if (!ach) return { success: false, reason: 'invalid_achievement' };

    if ((state.achievements.claimed || []).includes(achId)) {
      log('Esta conquista já foi resgatada anteriormente.', 'warning');
      return { success: false, reason: 'already_claimed' };
    }

    const current = ach.checkProgress(state);
    if (current < ach.target) {
      log(`成就 ainda em andamento: ${ach.title} (${current}/${ach.target}).`, 'error');
      return { success: false, reason: 'incomplete' };
    }

    // Marca como resgatada
    state.achievements.claimed.push(achId);
    const rew = ach.reward;

    if (rew.adena) state.gold = (state.gold || 0) + rew.adena;
    if (rew.adenCoins) state.adenCoins = (state.adenCoins || 0) + rew.adenCoins;

    state.cosmetics = state.cosmetics || {};
    state.cosmetics.unlockedTitles = state.cosmetics.unlockedTitles || ['title_none'];
    state.cosmetics.unlockedFrames = state.cosmetics.unlockedFrames || ['frame_default'];
    state.cosmetics.unlockedAuras = state.cosmetics.unlockedAuras || ['aura_none'];

    // Registrar e desbloquear título
    if (rew.titleId) {
      if (!TITLES_CATALOG[rew.titleId]) {
        TITLES_CATALOG[rew.titleId] = {
          id: rew.titleId,
          name: rew.titleName,
          titleText: rew.titleName,
          desc: `成就do na realização: ${ach.title}`,
          color: rew.titleColor || '#ffd700',
          costAdena: 0
        };
      }
      if (!state.cosmetics.unlockedTitles.includes(rew.titleId)) {
        state.cosmetics.unlockedTitles.push(rew.titleId);
      }
    }

    // Desbloquear moldura
    if (rew.frameId && !state.cosmetics.unlockedFrames.includes(rew.frameId)) {
      state.cosmetics.unlockedFrames.push(rew.frameId);
    }

    // Desbloquear aura
    if (rew.auraId && !state.cosmetics.unlockedAuras.includes(rew.auraId)) {
      state.cosmetics.unlockedAuras.push(rew.auraId);
    }

    log(`🏆 **[CONQUISTA CONCLUÍDA]** Você completou '${ach.title}'! 獎勵: ${ach.rewardText}!`, 'rarity-legendary');
    floatText('🏆 CONQUISTA CONCLUÍDA!', 'float-jackpot');

    onUpdate();
    return { success: true, ach };
  }
};
