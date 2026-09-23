/**
 * StarterJourneyService.js — Jornada dos Pioneiros de Aden (Onboarding & 7-Step Progression)
 * 
 * Guia passo a passo para iniciantes com recompensas progressivas para garantir retenção e engajamento nos primeiros 7 marcos.
 */

import { CashShopService } from './CashShopService.js';

export const STARTER_JOURNEY_STEPS = [
  {
    id: 'step_1_first_blood',
    stepNumber: 1,
    title: '亞丁初戰',
    desc: '在狩獵區至少擊敗 10 隻怪物。',
    icon: '⚔️',
    targetCount: 10,
    checkProgress: (state) => Math.min(10, state.stats?.monstersKilled || state.monstersKilled || 0),
    rewardText: '25,000 金幣 + 500 發無等級魂彈',
    reward: { adena: 25000, itemId: 'soulshot_ng', qty: 500 }
  },
  {
    id: 'step_2_reach_lvl20',
    stepNumber: 2,
    title: '戰士覺醒',
    desc: '達到等級 20 並完成第一次轉職。',
    icon: '⭐',
    targetCount: 20,
    checkProgress: (state) => Math.min(20, state.level || 1),
    rewardText: '50,000 金幣 + 5 張武器強化卷軸',
    reward: { adena: 50000, itemId: 'scroll_of_enchant_weapon', qty: 5 }
  },
  {
    id: 'step_3_first_forge',
    stepNumber: 3,
    title: '帝國鍛造之火',
    desc: '在鍛造系統完成第一次裝備強化或合成。',
    icon: '🔨',
    targetCount: 1,
    checkProgress: (state) => {
      const enchants = state.stats?.enchantsAttempted || 0;
      const fusions = state.stats?.fusionsAttempted || 0;
      const hasEnchantedWeapon = Boolean(state.equipment?.weapon && (state.inventory?.find(i => i.uid === state.equipment.weapon)?.enchantLevel > 0));
      return (enchants > 0 || fusions > 0 || hasEnchantedWeapon) ? 1 : 0;
    },
    rewardText: '1 顆中級生命石 + 50,000 金幣',
    reward: { adena: 50000, itemId: 'life_stone_mid', qty: 1 }
  },
  {
    id: 'step_4_skill_mastery',
    stepNumber: 4,
    title: '魔法與劍刃精通',
    desc: '至少將一個技能提升到等級 2 以上。',
    icon: '⚡',
    targetCount: 1,
    checkProgress: (state) => {
      const skills = state.skills || {};
      const hasLvl2 = Object.values(skills).some(s => (typeof s === 'number' ? s : s?.level || 0) >= 2);
      return hasLvl2 ? 1 : 0;
    },
    rewardText: '2,500 技能點 + 100 瓶特大型魔力藥水',
    reward: { sp: 2500, itemId: 'mp_potion_xl', qty: 100 }
  },
  {
    id: 'step_5_raid_boss',
    stepNumber: 5,
    title: '挑戰巨獸',
    desc: '在亞丁狩獵傳送門挑戰任意團隊首領。',
    icon: '👹',
    targetCount: 1,
    checkProgress: (state) => {
      const clears = Object.keys(state.dailyRaidClears || {}).length;
      const raids = state.stats?.raidsAttempted || 0;
      return (clears > 0 || raids > 0) ? 1 : 0;
    },
    rewardText: '100,000 金幣 + 2 張額外團隊副本入場券',
    reward: { adena: 100000, raidTickets: 2 }
  },
  {
    id: 'step_6_clan_brotherhood',
    stepNumber: 6,
    title: '戰友之盟',
    desc: '加入血盟、進行一次捐獻，或造訪血盟會館。',
    icon: '🛡️',
    targetCount: 1,
    checkProgress: (state) => {
      const clan = state.clan;
      const hasDonation = (clan?.donationsAdena || 0) > 0 || (clan?.donationsSp || 0) > 0;
      const hasCustomName = Boolean(clan?.name && clan.name !== '亞丁守護者');
      const hasReputation = (clan?.reputation || 0) > 100;
      return (hasDonation || hasCustomName || hasReputation) ? 1 : 0;
    },
    rewardText: '100 血盟聲望 + 100,000 金幣',
    reward: { adena: 100000, clanRep: 100 }
  },
  {
    id: 'step_7_arena_glory',
    stepNumber: 7,
    title: '第二職業與競技榮耀',
    desc: '達到等級 40，或參加一次競技場／奧林匹亞戰鬥。',
    icon: '👑',
    targetCount: 1,
    checkProgress: (state) => {
      const oly = (state.olympiad?.wins || 0) + (state.olympiad?.losses || 0);
      const col = (state.colosseum?.duelWins || 0) + (state.colosseum?.duelLosses || 0);
      const lvl40 = (state.level || 1) >= 40 ? 1 : 0;
      return (oly > 0 || col > 0 || lvl40 > 0) ? 1 : 0;
    },
    rewardText: '100 亞丁幣 + 10 張武器強化卷軸 + 稱號：亞丁先驅者',
    reward: { adenCoins: 100, itemId: 'scroll_of_enchant_weapon', qty: 10, cosmeticTitle: '亞丁先驅者' }
  }
];

export const StarterJourneyService = {
  getJourneyStatus(state) {
    if (!state) return { steps: [], completedCount: 0, claimedCount: 0 };
    state.starterJourney = state.starterJourney || { claimedSteps: [] };

    let completedCount = 0;
    let claimedCount = 0;

    const steps = STARTER_JOURNEY_STEPS.map(step => {
      const current = step.checkProgress(state);
      const isCompleted = current >= step.targetCount;
      const isClaimed = (state.starterJourney.claimedSteps || []).includes(step.id);
      const canClaim = isCompleted && !isClaimed;

      if (isCompleted) completedCount++;
      if (isClaimed) claimedCount++;

      return {
        ...step,
        currentProgress: current,
        isCompleted,
        isClaimed,
        canClaim
      };
    });

    return {
      steps,
      completedCount,
      claimedCount,
      allClaimed: claimedCount >= STARTER_JOURNEY_STEPS.length,
      currentActiveStep: steps.find(s => !s.isClaimed) || null
    };
  },

  claimStepReward(state, stepId, callbacks = {}) {
    const { log = console.log, floatText = () => {}, onUpdate = () => {} } = callbacks;
    if (!state) return { success: false };

    state.starterJourney = state.starterJourney || { claimedSteps: [] };
    const step = STARTER_JOURNEY_STEPS.find(s => s.id === stepId);
    if (!step) return { success: false, reason: 'invalid_step' };

    if ((state.starterJourney.claimedSteps || []).includes(stepId)) {
      log('這個先驅者旅程里程碑已經領取。', 'warning');
      return { success: false, reason: 'already_claimed' };
    }

    const current = step.checkProgress(state);
    if (current < step.targetCount) {
      log(`里程碑尚未完成：${step.title}（${current}/${step.targetCount}）。`, 'error');
      return { success: false, reason: 'incomplete' };
    }

    // Aplicar recompensas
    state.starterJourney.claimedSteps.push(stepId);
    const rew = step.reward;

    if (rew.adena) state.gold = (state.gold || 0) + rew.adena;
    if (rew.sp) state.sp = (state.sp || 0) + rew.sp;
    if (rew.adenCoins) {
      CashShopService.addAdenCoins(state, rew.adenCoins, { log });
    }
    if (rew.raidTickets) state.dailyRaidTickets = (state.dailyRaidTickets || 3) + rew.raidTickets;
    if (rew.clanRep && state.clan) state.clan.reputation = (state.clan.reputation || 100) + rew.clanRep;
    if (rew.cosmeticTitle) {
      state.cosmetics = state.cosmetics || {};
      state.cosmetics.unlockedTitles = state.cosmetics.unlockedTitles || ['亞丁新手'];
      if (!state.cosmetics.unlockedTitles.includes(rew.cosmeticTitle)) {
        state.cosmetics.unlockedTitles.push(rew.cosmeticTitle);
      }
    }
    if (rew.itemId && rew.qty) {
      state.inventory = state.inventory || [];
      const existing = state.inventory.find(i => i.itemId === rew.itemId);
      if (existing) {
        existing.count = (existing.count || existing.qty || 1) + rew.qty;
        existing.qty = existing.count;
      } else {
        state.inventory.push({
          uid: 'sj_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
          itemId: rew.itemId,
          name: rew.itemId.toUpperCase(),
          count: rew.qty,
          qty: rew.qty,
          rarity: 'common',
          type: 'consumable'
        });
      }
    }

    log(`🎉 **[先驅者旅程－第 ${step.stepNumber} 步]** 你完成了「${step.title}」！獎勵：${step.rewardText}！`, 'rarity-legendary');
    floatText('✨ 里程碑完成！', 'float-jackpot');

    onUpdate();
    return { success: true, step };
  }
};
