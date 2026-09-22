/**
 * DailyRewardService.js — Serviço de Recompensas Diárias e Sequência de Login (Daily Check-in)
 */

export const DAILY_REWARDS_TABLE = [
  { day: 1, name: '金幣袋', icon: '💰', desc: '50,000 金幣', rewardType: 'adena', count: 50000, rarity: 'common' },
  { day: 2, name: '戰鬥魂彈', icon: '⚡', desc: '1,000 個無級別魂彈', rewardType: 'item', itemId: 'soulshot_ng', count: 1000, rarity: 'common' },
  { day: 3, name: 'XL 治癒藥水', icon: '🧪', desc: '100 瓶 XL 生命藥水', rewardType: 'item', itemId: 'hp_potion_xl', count: 100, rarity: 'uncommon' },
  { day: 4, name: '武器強化卷軸', icon: '📜', desc: '3 張通用武器強化卷軸', rewardType: 'item', itemId: 'scroll_of_enchant_weapon', count: 3, rarity: 'rare' },
  { day: 5, name: '防具強化卷軸', icon: '🛡️', desc: '5 張通用防具強化卷軸', rewardType: 'item', itemId: 'scroll_of_enchant_armor', count: 5, rarity: 'rare' },
  { day: 6, name: 'XP 魔法神燈', icon: '🪔', desc: '1 個幸運魔法燈', rewardType: 'special', count: 1, rarity: 'rare' },
  { day: 7, name: '⭐ 第一週祝福', icon: '🎁', desc: '5 張武器強化卷軸 + 100,000 金幣', isMilestone: true, rewardType: 'combo', itemId: 'scroll_of_enchant_weapon', count: 5, adena: 100000, rarity: 'epic' },

  { day: 8, name: '金幣寶藏', icon: '💰', desc: '150,000 金幣', rewardType: 'adena', count: 150000, rarity: 'common' },
  { day: 9, name: '魔靈彈', icon: '✨', desc: '1,000 個無級別魔靈彈', rewardType: 'item', itemId: 'spiritshot_ng', count: 1000, rarity: 'common' },
  { day: 10, name: '神秘 SP 藥瓶', icon: '🔮', desc: '500 SP', rewardType: 'sp', count: 500, rarity: 'uncommon' },
  { day: 11, name: '武器強化卷軸', icon: '📜', desc: '3 張通用武器強化卷軸', rewardType: 'item', itemId: 'scroll_of_enchant_weapon', count: 3, rarity: 'rare' },
  { day: 12, name: '防具強化卷軸', icon: '🛡️', desc: '5 張通用防具強化卷軸', rewardType: 'item', itemId: 'scroll_of_enchant_armor', count: 5, rarity: 'rare' },
  { day: 13, name: '神秘靈魂水晶', icon: '💎', desc: '2 個第 1 階段靈魂水晶', rewardType: 'item', itemId: 'soul_crystal_stage_1', count: 2, rarity: 'rare' },
  { day: 14, name: '⭐⭐ 第二週寶藏', icon: '🏆', desc: '1 個首領娃娃箱 + 300,000 金幣', isMilestone: true, rewardType: 'combo', doll: true, adena: 300000, rarity: 'epic' },

  { day: 15, name: '亞丁財富', icon: '💰', desc: '300,000 金幣', rewardType: 'adena', count: 300000, rarity: 'common' },
  { day: 16, name: '超大型藥水包', icon: '🧪', desc: '250 瓶 XL 生命藥水', rewardType: 'item', itemId: 'hp_potion_xl', count: 250, rarity: 'uncommon' },
  { day: 17, name: '古代魔法書頁', icon: '📖', desc: '5 張古代魔法書頁', rewardType: 'item', itemId: 'ancient_spellbook_page', count: 5, rarity: 'rare' },
  { day: 18, name: '武器強化卷軸', icon: '📜', desc: '3 張通用武器強化卷軸', rewardType: 'item', itemId: 'scroll_of_enchant_weapon', count: 3, rarity: 'rare' },
  { day: 19, name: '防具強化卷軸', icon: '🛡️', desc: '5 張通用防具強化卷軸', rewardType: 'item', itemId: 'scroll_of_enchant_armor', count: 5, rarity: 'rare' },
  { day: 20, name: '大量 SP 儲備', icon: '🔮', desc: '1,500 SP', rewardType: 'sp', count: 1500, rarity: 'epic' },
  { day: 21, name: '⭐⭐⭐ 第三週榮耀', icon: '👑', desc: '10 張 4★ 魔法書頁 + 500,000 金幣', isMilestone: true, rewardType: 'combo', itemId: 'ancient_spellbook_page', count: 10, adena: 500000, rarity: 'epic' },

  { day: 22, name: '皇家金幣寶庫', icon: '💰', desc: '750,000 金幣', rewardType: 'adena', count: 750000, rarity: 'common' },
  { day: 23, name: '帝國補給', icon: '⚡', desc: '5,000 個無級別魂彈', rewardType: 'item', itemId: 'soulshot_ng', count: 5000, rarity: 'uncommon' },
  { day: 24, name: '武器強化卷軸', icon: '📜', desc: '3 張通用武器強化卷軸', rewardType: 'item', itemId: 'scroll_of_enchant_weapon', count: 3, rarity: 'rare' },
  { day: 25, name: '防具強化卷軸', icon: '🛡️', desc: '5 張通用防具強化卷軸', rewardType: 'item', itemId: 'scroll_of_enchant_armor', count: 5, rarity: 'rare' },
  { day: 26, name: '祝福武器卷軸', icon: '📜', desc: '2 張通用祝福武器卷軸', rewardType: 'item', itemId: 'scroll_blessed_weapon', count: 2, rarity: 'epic' },
  { day: 27, name: '祝福防具卷軸', icon: '🛡️', desc: '4 張通用祝福防具卷軸', rewardType: 'item', itemId: 'scroll_blessed_armor', count: 4, rarity: 'epic' },
  { day: 28, name: '👑 亞丁至尊王冠', icon: '💎', desc: '1,500,000 金幣 + 3 個魔法燈 + 2,000 SP', isMilestone: true, rewardType: 'combo', adena: 1500000, lamps: 3, sp: 2000, rarity: 'legendary' }
];

/**
 * Retorna a string de data UTC atual (ex: '2026-08-15').
 * @returns {string}
 */
export function getTodayDateString() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
}

/**
 * Inicializa ou normaliza o objeto dailyRewards no estado.
 * @param {Object} state
 * @returns {Object}
 */
export function ensureDailyRewardsState(state) {
  if (!state.dailyRewards || typeof state.dailyRewards !== 'object') {
    state.dailyRewards = {
      currentDay: 1,
      claimedDays: [],
      lastClaimDate: '',
      streak: 0,
      totalClaims: 0
    };
  }
  return state.dailyRewards;
}

/**
 * Verifica se a recompensa de hoje já está disponível para resgate.
 * @param {Object} state
 * @returns {{ canClaim: boolean, currentDay: number, streak: number, reward: Object }}
 */
export function getDailyRewardStatus(state) {
  const dr = ensureDailyRewardsState(state);
  const today = getTodayDateString();
  const canClaim = dr.lastClaimDate !== today;
  const currentDay = Math.max(1, Math.min(28, dr.currentDay || 1));
  const reward = DAILY_REWARDS_TABLE[currentDay - 1] || DAILY_REWARDS_TABLE[0];

  return {
    canClaim,
    currentDay,
    streak: dr.streak || 0,
    reward,
    claimedDays: dr.claimedDays || []
  };
}

/**
 * Executa o resgate da recompensa diária atual.
 * @param {Object} state
 * @param {Object} helpers — { log, addToInventory, floatText }
 * @returns {{ success: boolean, message: string, reward?: Object }}
 */
export function claimDailyReward(state, helpers = {}) {
  const dr = ensureDailyRewardsState(state);
  const today = getTodayDateString();

  if (dr.lastClaimDate === today) {
    return { success: false, message: '你今天已經領取每日獎勵，明天再回來！' };
  }

  const currentDay = Math.max(1, Math.min(28, dr.currentDay || 1));
  const reward = DAILY_REWARDS_TABLE[currentDay - 1];
  if (!reward) {
    return { success: false, message: '找不到每日獎勵。' };
  }

  // Entrega as recompensas
  if (reward.rewardType === 'adena' || reward.adena) {
    const goldGain = (reward.count && reward.rewardType === 'adena') ? reward.count : (reward.adena || 0);
    state.gold = (state.gold || 0) + goldGain;
  }

  if (reward.rewardType === 'sp' || reward.sp) {
    const spGain = (reward.count && reward.rewardType === 'sp') ? reward.count : (reward.sp || 0);
    state.sp = (state.sp || 0) + spGain;
  }

  if (reward.lamps || (reward.rewardType === 'special' && reward.name.includes('神燈'))) {
    const lamps = reward.lamps || reward.count || 1;
    state.magicLamps = (state.magicLamps || 0) + lamps;
  }

  if (reward.doll) {
    state.dolls = state.dolls || [];
    state.dolls.push({ id: 'doll_queen_ant_1', name: '蟻后娃娃（第 1 階）', tier: 1, stars: 1 });
  }

  if (reward.itemId && helpers.addToInventory) {
    helpers.addToInventory(reward.itemId, reward.count || 1);
  }

  // Atualiza estado do calendário
  dr.lastClaimDate = today;
  dr.claimedDays = dr.claimedDays || [];
  if (!dr.claimedDays.includes(currentDay)) {
    dr.claimedDays.push(currentDay);
  }
  dr.streak = (dr.streak || 0) + 1;
  dr.totalClaims = (dr.totalClaims || 0) + 1;

  // Avança para o próximo dia (reseta no dia 28 para ciclo contínuo)
  if (currentDay >= 28) {
    dr.currentDay = 1;
    dr.claimedDays = [];
  } else {
    dr.currentDay = currentDay + 1;
  }

  if (helpers.log) {
    helpers.log(`🎁 [每日簽到] 已領取第 ${currentDay} 天：${reward.name}（${reward.desc}）！目前連續簽到：🔥 ${dr.streak} 天！`, 'rarity-legendary');
  }

  if (helpers.floatText) {
    helpers.floatText(`🎁 Check-in Dia ${currentDay}!`, 'gilt');
  }

  return { success: true, message: `第 ${currentDay} 天獎勵領取成功！`, reward };
}
