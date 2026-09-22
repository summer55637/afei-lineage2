/**
 * Colosseum & PvP Duels System Data
 * Duelos amistosos 1v1 com apostas de Adena, Modo Sobrevivência em 10 Ondas e Loja de Badges do Coliseu.
 */

export const DUEL_BET_TIERS = [
  { id: 'bet_100k', name: '學徒決鬥', bet: 100000, rewardAA: 500, label: '100,000 金幣' },
  { id: 'bet_500k', name: '角鬥士決鬥', bet: 500000, rewardAA: 2500, label: '500,000 金幣' },
  { id: 'bet_2m5', name: '冠軍決鬥', bet: 2500000, rewardAA: 12500, label: '2,500,000 金幣' },
  { id: 'bet_10m', name: '亞丁傳說決鬥', bet: 10000000, rewardAA: 50000, label: '10,000,000 金幣' }
];

export const DUEL_OPPONENT_ARCHETYPES = [
  {
    type: 'duelist',
    name: '奇岩角鬥士 ⚔️',
    title: '雙劍大師',
    icon: '⚔️',
    hpMult: 1.2,
    pAtkMult: 1.1,
    pDefMult: 1.2
  },
  {
    type: 'archer',
    name: '幽靈弓手 🏹',
    title: '銀月遊俠菁英射手',
    icon: '🏹',
    hpMult: 0.9,
    pAtkMult: 1.3,
    critMult: 1.5
  },
  {
    type: 'nuker',
    name: '奧術法師 🔮',
    title: '卓越奧術師',
    icon: '🔮',
    hpMult: 0.8,
    mAtkMult: 1.4,
    mDefMult: 1.3
  },
  {
    type: 'dagger',
    name: '暗影刺客 🗡️',
    title: '致命深淵行者',
    icon: '🗡️',
    hpMult: 0.85,
    pAtkMult: 1.25,
    critMult: 1.8
  },
  {
    type: 'tank',
    name: '帝國聖騎士 🛡️',
    title: '鳳凰騎士鐵壁',
    icon: '🛡️',
    hpMult: 1.6,
    pDefMult: 1.5,
    mDefMult: 1.4
  }
];

export const SURVIVAL_WAVES = [
  { wave: 1, name: '競技場猛獸（狼與熊）', hp: 40000, pAtk: 600, pDef: 500, badges: 5 },
  { wave: 2, name: '狄恩新手角鬥士', hp: 75000, pAtk: 900, pDef: 750, badges: 10 },
  { wave: 3, name: '芙羅蘭盜賊團', hp: 120000, pAtk: 1200, pDef: 950, badges: 15 },
  { wave: 4, name: '象牙塔叛逆法師', hp: 180000, pAtk: 1600, pDef: 1100, badges: 20 },
  { wave: 5, name: '傲慢之塔石像鬼', hp: 260000, pAtk: 2000, pDef: 1400, badges: 30 },
  { wave: 6, name: '帝國陵墓老兵', hp: 350000, pAtk: 2400, pDef: 1700, badges: 40 },
  { wave: 7, name: '席琳不死冠軍', hp: 480000, pAtk: 2800, pDef: 2000, badges: 50 },
  { wave: 8, name: '黑暗深淵騎士', hp: 650000, pAtk: 3300, pDef: 2300, badges: 70 },
  { wave: 9, name: '亞丁皇家衛隊將軍', hp: 850000, pAtk: 3800, pDef: 2600, badges: 100 },
  { wave: 10, name: '競技場至尊領主 👑', hp: 1200000, pAtk: 4500, pDef: 3000, badges: 200 }
];

export const COLOSSEUM_SHOP_CATALOG = [
  {
    id: 'gladiator_circlet',
    name: '角鬥士冠軍頭冠 👑',
    costBadges: 250,
    icon: '👑',
    desc: '競技場至尊冠軍頭冠（P.Def +100、M.Def +100、PvP 傷害 +5%）。'
  },
  {
    id: 'potion_heroic_cp',
    name: '大型英雄 CP 藥水（x20）🧪',
    costBadges: 50,
    icon: '🧪',
    desc: '高濃度戰鬥藥水，立即恢復 2,000 CP。'
  },
  {
    id: 'giants_codex_mastery',
    name: "巨人秘典－精通 🌟",
    costBadges: 400,
    icon: '🌟',
    desc: '用於安全強化技能的巨人秘典。'
  },
  {
    id: 'scroll_enchant_weapon_s',
    name: 'S 級武器強化卷軸 📜',
    costBadges: 300,
    icon: '📜',
    desc: '用於強化 S 級武器的神聖卷軸。'
  }
];
