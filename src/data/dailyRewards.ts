/**
 * dailyRewards.ts — Calendário de Recompensas Diárias (28 Dias) do Aden Arena.
 *
 * Oferece recompensas progressivas com marcos especiais nos dias 7, 14, 21 e 28
 * para maximizar a retenção diária de jogadores.
 */

export interface DailyRewardDay {
  day: number;
  name: string;
  icon: string;
  desc: string;
  isMilestone?: boolean;
  rewardType: 'adena' | 'sp' | 'item' | 'doll' | 'special';
  itemId?: string;
  count: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export const DAILY_REWARDS_28: DailyRewardDay[] = [
  // Semana 1: Suprimentos & Primeiros Encantos
  { day: 1, name: '金幣袋', icon: '💰', desc: '50,000 金幣', rewardType: 'adena', count: 50000, rarity: 'common' },
  { day: 2, name: '無等級魂彈', icon: '⚡', desc: '1,000 個無等級魂彈', rewardType: 'item', itemId: 'soulshot_ng', count: 1000, rarity: 'common' },
  { day: 3, name: '生命藥水（特大）', icon: '🧪', desc: '100 瓶生命藥水（特大）', rewardType: 'item', itemId: 'hp_potion_xl', count: 100, rarity: 'uncommon' },
  { day: 4, name: 'D 級武器強化卷軸', icon: '📜', desc: '3 張 D 級武器強化卷軸', rewardType: 'item', itemId: 'scroll_enchant_weapon_d', count: 3, rarity: 'rare' },
  { day: 5, name: 'D 級防具強化卷軸', icon: '🛡️', desc: '5 張 D 級防具強化卷軸', rewardType: 'item', itemId: 'scroll_enchant_armor_d', count: 5, rarity: 'rare' },
  { day: 6, name: '經驗魔法神燈', icon: '🪔', desc: '1 個幸運魔法神燈', rewardType: 'special', count: 1, rarity: 'rare' },
  { day: 7, name: '⭐ 第一週祝福', icon: '🎁', desc: '1 張 D 級祝福武器強化卷軸 + 100,000 金幣', isMilestone: true, rewardType: 'item', itemId: 'scroll_enchant_weapon_d', count: 5, rarity: 'epic' },

  // Semana 2: Forja e Grau C
  { day: 8, name: '金幣寶藏', icon: '💰', desc: '150,000 金幣', rewardType: 'adena', count: 150000, rarity: 'common' },
  { day: 9, name: '戰鬥魔靈彈', icon: '✨', desc: '1,000 個無等級魔靈彈', rewardType: 'item', itemId: 'spiritshot_ng', count: 1000, rarity: 'common' },
  { day: 10, name: '神秘技能點藥瓶', icon: '🔮', desc: '500 技能點', rewardType: 'sp', count: 500, rarity: 'uncommon' },
  { day: 11, name: 'C 級武器強化卷軸', icon: '📜', desc: '3 張 C 級武器強化卷軸', rewardType: 'item', itemId: 'scroll_enchant_weapon_c', count: 3, rarity: 'rare' },
  { day: 12, name: 'C 級防具強化卷軸', icon: '🛡️', desc: '5 張 C 級防具強化卷軸', rewardType: 'item', itemId: 'scroll_enchant_armor_c', count: 5, rarity: 'rare' },
  { day: 13, name: '神秘靈魂水晶', icon: '💎', desc: '50 個靈魂水晶碎片', rewardType: 'item', itemId: 'soul_crystal_stage_1', count: 2, rarity: 'rare' },
  { day: 14, name: '⭐⭐ 第二週寶藏', icon: '🏆', desc: '1 個首領娃娃箱 + 300,000 金幣', isMilestone: true, rewardType: 'special', count: 1, rarity: 'epic' },

  // Semana 3: Grau B & Habilidades Nobres
  { day: 15, name: '亞丁財富', icon: '💰', desc: '300,000 金幣', rewardType: 'adena', count: 300000, rarity: 'common' },
  { day: 16, name: '超大型藥水包', icon: '🧪', desc: '250 瓶 XL 生命藥水 + 250 瓶 XL 魔力藥水', rewardType: 'item', itemId: 'hp_potion_xl', count: 250, rarity: 'uncommon' },
  { day: 17, name: '古代技能書頁', icon: '📖', desc: '5 張古代技能書頁', rewardType: 'item', itemId: 'ancient_spellbook_page', count: 5, rarity: 'rare' },
  { day: 18, name: 'B 級武器強化卷軸', icon: '📜', desc: '3 張 B 級武器強化卷軸', rewardType: 'item', itemId: 'scroll_enchant_weapon_b', count: 3, rarity: 'rare' },
  { day: 19, name: 'B 級防具強化卷軸', icon: '🛡️', desc: '5 張 B 級防具強化卷軸', rewardType: 'item', itemId: 'scroll_enchant_armor_b', count: 5, rarity: 'rare' },
  { day: 20, name: '大量技能點補給', icon: '🔮', desc: '1.500 技能點', rewardType: 'sp', count: 1500, rarity: 'epic' },
  { day: 21, name: '⭐⭐⭐ 第三週榮耀', icon: '👑', desc: '10 張 4★ 技能書頁 + 500,000 金幣', isMilestone: true, rewardType: 'item', itemId: 'ancient_spellbook_page', count: 10, rarity: 'epic' },

  // Semana 4: Grau A/S & Glória Suprema
  { day: 22, name: '皇家金幣寶箱', icon: '💰', desc: '750,000 金幣', rewardType: 'adena', count: 750000, rarity: 'common' },
  { day: 23, name: '帝國補給', icon: '⚡', desc: '5,000 個魂彈／魔靈彈', rewardType: 'item', itemId: 'soulshot_ng', count: 5000, rarity: 'uncommon' },
  { day: 24, name: 'A 級武器強化卷軸', icon: '📜', desc: '3 張 A 級武器強化卷軸', rewardType: 'item', itemId: 'scroll_enchant_weapon_a', count: 3, rarity: 'rare' },
  { day: 25, name: 'A 級防具強化卷軸', icon: '🛡️', desc: '5 張 A 級防具強化卷軸', rewardType: 'item', itemId: 'scroll_enchant_armor_a', count: 5, rarity: 'rare' },
  { day: 26, name: 'S 級武器強化卷軸', icon: '📜', desc: '2 張 S 級武器強化卷軸', rewardType: 'item', itemId: 'scroll_enchant_weapon_s', count: 2, rarity: 'epic' },
  { day: 27, name: 'S 級防具強化卷軸', icon: '🛡️', desc: '4 張 S 級防具強化卷軸', rewardType: 'item', itemId: 'scroll_enchant_armor_s', count: 4, rarity: 'epic' },
  { day: 28, name: '👑 亞丁至尊王冠', icon: '💎', desc: '1 件傳說史詩遺物 + 1,500,000 金幣 + 3 個魔法神燈', isMilestone: true, rewardType: 'special', count: 1, rarity: 'legendary' }
];
