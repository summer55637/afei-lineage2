/**
 * augmentation.js — Catálogo de Life Stones, Gemstones e Habilidades de Itens (Item Skills).
 *
 * Contém o sistema de refinamento de armas por Ferreiros de Aden.
 */

export const LIFE_STONES = {
  life_stone_28: {
    id: 'life_stone_28',
    name: '生命石－等級 28（D 級）',
    grade: 'normal',
    level: 28,
    icon: 'gradespecial/scrolls/scroll_enchant_weapon_d.png',
    priceAdena: 25000,
    glowChance: 0.15,
    skillChance: 0.10,
    statMultiplier: 0.6,
    gemstonesNeeded: 5,
    gemstoneGrade: 'D',
    desc: '等級 28 的 D 級武器生命石，可賦予基礎戰鬥屬性。'
  },
  life_stone_34: {
    id: 'life_stone_34',
    name: '中級生命石－等級 34（D 級頂級）',
    grade: 'mid',
    level: 34,
    icon: 'gradespecial/scrolls/scroll_enchant_weapon_d.png',
    priceAdena: 50000,
    glowChance: 0.30,
    skillChance: 0.20,
    statMultiplier: 0.8,
    gemstonesNeeded: 8,
    gemstoneGrade: 'D',
    desc: 'D 級武器用中級生命石，有較高機率取得稀有屬性。'
  },
  life_stone_40: {
    id: 'life_stone_40',
    name: '頂級生命石－等級 40（C 級）',
    grade: 'high',
    level: 40,
    icon: 'gradespecial/scrolls/scroll_enchant_weapon_c.png',
    priceAdena: 120000,
    glowChance: 0.50,
    skillChance: 0.35,
    statMultiplier: 1.0,
    gemstonesNeeded: 10,
    gemstoneGrade: 'C',
    desc: '等級 40 的 C 級頂級生命石，高機率獲得武器光效與物品技能。'
  },
  life_stone_mid_76: {
    id: 'life_stone_mid_76',
    name: '中級生命石－等級 76 💠',
    grade: 'mid',
    level: 76,
    icon: 'gradespecial/scrolls/scroll_enchant_weapon_a.png',
    priceAdena: 2000000,
    glowChance: 0.35,
    skillChance: 0.20,
    statMultiplier: 1.2,
    desc: '等級 76 以上武器用中級生命石，可賦予額外屬性並有機率獲得秘法光效。'
  },
  life_stone_high_76: {
    id: 'life_stone_high_76',
    name: '高級生命石－等級 76 🔮',
    grade: 'high',
    level: 76,
    icon: 'gradespecial/scrolls/scroll_enchant_weapon_s.png',
    priceAdena: 5000000,
    glowChance: 0.70,
    skillChance: 0.45,
    statMultiplier: 1.5,
    desc: '等級 76 以上武器用高級生命石，高機率獲得武器光效與物品技能。'
  },
  life_stone_top_76: {
    id: 'life_stone_top_76',
    name: '頂級生命石－等級 76 👑💎',
    grade: 'top',
    level: 76,
    icon: 'gradespecial/scrolls/scroll_blessed_weapon_s.png',
    priceAdena: 12000000,
    glowChance: 1.0,
    skillChance: 0.75,
    statMultiplier: 2.0,
    desc: '亞丁最純淨的傳說生命石，100% 產生武器光效，並有極高機率獲得稀有物品技能！'
  }
};

export const ITEM_SKILLS = [
  {
    id: 'item_skill_active_might',
    name: '物品技能：主動力量 ⚔️',
    type: 'active',
    desc: '暫時提升物理攻擊 15%。',
    stats: { pAtkPercent: 0.15 }
  },
  {
    id: 'item_skill_active_shield',
    name: '物品技能：主動護盾 🛡️',
    type: 'active',
    desc: '暫時提升物理防禦 15%。',
    stats: { pDefPercent: 0.15 }
  },
  {
    id: 'item_skill_active_wild_magic',
    name: '物品技能：主動狂野魔法 🔮',
    type: 'active',
    desc: '魔法暴擊率 +25%。',
    stats: { magicCritPercent: 0.25 }
  },
  {
    id: 'item_skill_active_heal',
    name: '物品技能：主動強效治療 💚',
    type: 'active',
    desc: '立即恢復 3,000 生命值。',
    stats: { instantHeal: 3000 }
  },
  {
    id: 'item_skill_passive_focus',
    name: '物品技能：被動專注 🎯',
    type: 'passive',
    desc: '永久增加 30 點暴擊率。',
    stats: { critBonus: 30 }
  },
  {
    id: 'item_skill_passive_clarity',
    name: '物品技能：被動清晰 💧',
    type: 'passive',
    desc: '所有技能 魔力 消耗降低 15%。',
    stats: { mpReductionPercent: 0.15 }
  },
  {
    id: 'item_skill_passive_duel',
    name: '物品技能：被動決鬥之力 🏆',
    type: 'passive',
    desc: '大奧林匹亞決鬥與 PVP 傷害 +12%。',
    stats: { pvpDamagePercent: 0.12 }
  },
  {
    id: 'item_skill_chance_stun',
    name: '物品技能：機率暈眩 ⚡',
    type: 'chance',
    desc: '普通攻擊有 15% 機率使目標暈眩 2 回合。',
    stats: { stunChance: 0.15 }
  }
];

export const STAT_ROLL_POOL = [
  { name: '+物理攻擊', key: 'atk', min: 15, max: 45 },
  { name: '+魔法攻擊', key: 'matk', min: 20, max: 60 },
  { name: '+物理防禦', key: 'def', min: 15, max: 40 },
  { name: '+魔法防禦', key: 'mdef', min: 18, max: 50 },
  { name: '+最大 生命值', key: 'hp', min: 200, max: 650 },
  { name: '+最大戰鬥力', key: 'cp', min: 250, max: 800 },
  { name: '+暴擊率', key: 'crit', min: 5, max: 18 },
  { name: '+迴避', key: 'eva', min: 3, max: 8 }
];
