// mercenaries.js — Catálogo de Dados de Mercenários e Taverna de Aden (Lineage II Style)

export const MERCENARY_RARITIES = {
  common: {
    id: 'common',
    name: '普通',
    color: '#94a3b8',
    bgBadge: 'rgba(148, 163, 184, 0.15)',
    border: 'rgba(148, 163, 184, 0.4)',
    powerMult: 1.0,
    hireCostBase: 5000,
    weight: 55
  },
  uncommon: {
    id: 'uncommon',
    name: '優良',
    color: '#22c55e',
    bgBadge: 'rgba(34, 197, 94, 0.15)',
    border: 'rgba(34, 197, 94, 0.4)',
    powerMult: 1.25,
    hireCostBase: 12000,
    weight: 25
  },
  rare: {
    id: 'rare',
    name: '稀有',
    color: '#3b82f6',
    bgBadge: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.4)',
    powerMult: 1.6,
    hireCostBase: 30000,
    weight: 14
  },
  epic: {
    id: 'epic',
    name: '史詩',
    color: '#a855f7',
    bgBadge: 'rgba(168, 85, 247, 0.15)',
    border: 'rgba(168, 85, 247, 0.4)',
    powerMult: 2.2,
    hireCostBase: 75000,
    weight: 5
  },
  legendary: {
    id: 'legendary',
    name: '傳說',
    color: '#f59e0b',
    bgBadge: 'rgba(245, 158, 11, 0.2)',
    border: 'rgba(245, 158, 11, 0.5)',
    powerMult: 3.0,
    hireCostBase: 200000,
    weight: 1
  }
};

export const MERCENARY_TRAITS = {
  veteran: {
    id: 'veteran',
    name: '老兵',
    icon: '🎖️',
    desc: '遠征總戰力 +10%',
    powerBonusPct: 0.10,
    color: '#eab308'
  },
  greedy: {
    id: 'greedy',
    name: '貪婪',
    icon: '💰',
    desc: '掠奪金幣 +20%、獲得 XP -5%',
    goldBonusPct: 0.20,
    xpBonusPct: -0.05,
    color: '#f59e0b'
  },
  cautious: {
    id: 'cautious',
    name: '謹慎',
    icon: '🛡️',
    desc: '危險事件受到傷害 -25%、遠征時間 +10%',
    hazardDamageReduction: 0.25,
    durationMult: 1.10,
    color: '#3b82f6'
  },
  disciplined: {
    id: 'disciplined',
    name: '自律',
    icon: '📜',
    desc: '傭兵遠征 XP +15%',
    xpBonusPct: 0.15,
    color: '#8b5cf6'
  },
  lucky: {
    id: 'lucky',
    name: '幸運',
    icon: '🍀',
    desc: '額外寶箱與稀有遺物機率 +15%',
    bonusChestChance: 0.15,
    color: '#22c55e'
  },
  agile: {
    id: 'agile',
    name: '敏捷',
    icon: '⚡',
    desc: '遠征行軍時間 -15%',
    speedReduction: 0.15,
    color: '#06b6d4'
  }
};

export const MERCENARY_SPECIALIZATIONS = {
  guardian: {
    id: 'guardian',
    name: '守護者',
    icon: '🛡️',
    role: '坦克與防禦',
    desc: '建立防線保護隊伍，減輕危險與伏擊造成的損失。',
    synergyName: '不動之盾',
    synergyDesc: '伏擊與危險傷害 -35%（額外保護 +10% 金幣）',
    hazardMitigation: 0.35,
    goldSafetyBonus: 0.10
  },
  tracker: {
    id: 'tracker',
    name: '追蹤者',
    icon: '🏹',
    role: '斥候與導航',
    desc: '熟悉亞丁荒野的秘密路線，可縮短行軍時間並發現捷徑。',
    synergyName: '敏捷步伐',
    synergyDesc: '遠征時間 -20%（額外資源節點 +20%）',
    speedReduction: 0.20,
    extraResourceChance: 0.20
  },
  thief: {
    id: 'thief',
    name: '盜賊',
    icon: '🗡️',
    role: '潛入與盜竊',
    desc: '擅長解除古代陷阱與撬開寶箱。',
    synergyName: '絲綢之手',
    synergyDesc: '額外寶箱機率 +35%（陷阱傷害 -40%）',
    bonusChestChance: 0.35,
    trapMitigation: 0.40
  },
  mage: {
    id: 'mage',
    name: '秘法法師',
    icon: '🔮',
    role: '秘法與元素傷害',
    desc: '操控秘法力量，驅散魔法屏障與惡魔。',
    synergyName: '星界虹吸',
    synergyDesc: '星界碎片 +50%（秘密房間機率 +25%）',
    extraShardsPct: 0.50,
    secretChamberChance: 0.25
  },
  healer: {
    id: 'healer',
    name: '治療者',
    icon: '✨',
    role: '神聖治療與支援',
    desc: '治療戰傷、維持士氣並驅散詛咒。',
    synergyName: '伊娃祝福',
    synergyDesc: '小隊 XP +30%（車隊殘餘傷害 -25%）',
    extraXpPct: 0.30,
    residualMitigation: 0.25
  }
};

export const MERCENARY_TEMPLATES = [
  // Guardiões
  {
    id: 'merc_tarkin',
    name: '古魯丁塔金',
    title: '鋼鐵堡壘',
    icon: '🛡️',
    spec: 'guardian',
    rarity: 'common',
    basePower: 50,
    quote: '只要我還有一口氣，就沒有怪物能越過這面盾！'
  },
  {
    id: 'merc_darius',
    name: '指揮官達里烏斯',
    title: '要塞哨兵',
    icon: '⚔️',
    spec: 'guardian',
    rarity: 'uncommon',
    basePower: 80,
    quote: '保持陣形！亞丁的榮耀會守護我們。'
  },
  {
    id: 'merc_brann',
    name: '橡木盾布蘭',
    title: '荒野聖騎士',
    icon: '🛡️',
    spec: 'guardian',
    rarity: 'rare',
    basePower: 130,
    quote: '以神聖之光為名，我將粉碎敵軍先鋒。'
  },
  {
    id: 'merc_valerius',
    name: '瓦勒里斯領主',
    title: '狄恩鋼鐵將軍',
    icon: '🏰',
    spec: 'guardian',
    rarity: 'epic',
    basePower: 210,
    quote: '我們前進時，就像一座無法攻破的堡壘！'
  },

  // 追蹤者es
  {
    id: 'merc_lyra',
    name: '森林萊拉',
    title: '荒野斥候',
    icon: '🏹',
    spec: 'tracker',
    rarity: 'common',
    basePower: 55,
    quote: '風會把藏在葉間的每一道足跡告訴我。'
  },
  {
    id: 'merc_kestrel',
    name: '鷹眼凱斯特爾',
    title: '伏擊射手',
    icon: '🦅',
    spec: 'tracker',
    rarity: 'uncommon',
    basePower: 85,
    quote: '箭矢抵達心臟時，弦聲才剛傳到耳邊。'
  },
  {
    id: 'merc_sylas',
    name: '風行者賽拉斯',
    title: '地下墓穴嚮導',
    icon: '🧭',
    spec: 'tracker',
    rarity: 'rare',
    basePower: 135,
    quote: '我知道連古代國王都已遺忘的捷徑。'
  },
  {
    id: 'merc_artemis',
    name: '滿月阿爾忒彌斯',
    title: '精靈斥候女王',
    icon: '🌙',
    spec: 'tracker',
    rarity: 'epic',
    basePower: 220,
    quote: '黑夜是我的披風，群星就是我的地圖。'
  },

  // Ladrões / Infiltradores
  {
    id: 'merc_corvus',
    name: '疾風科爾沃斯',
    title: '扒手',
    icon: '🗡️',
    spec: 'thief',
    rarity: 'common',
    basePower: 52,
    quote: '只要眨一下眼，你的東西就可能變成我的。'
  },
  {
    id: 'merc_jarek',
    name: '巧手賈雷克',
    title: '開鎖專家',
    icon: '🗝️',
    spec: 'thief',
    rarity: 'uncommon',
    basePower: 82,
    quote: '沒有任何密室能抵擋我的開鎖技巧。'
  },
  {
    id: 'merc_shani',
    name: '奇岩之影莎妮',
    title: '叛逃刺客',
    icon: '👥',
    spec: 'thief',
    rarity: 'rare',
    basePower: 140,
    quote: '如霧般無聲，如蠍毒般致命。'
  },
  {
    id: 'merc_raven',
    name: '夜鴉',
    title: '盜賊公會大師',
    icon: '👑',
    spec: 'thief',
    rarity: 'legendary',
    basePower: 320,
    quote: '席琳最大的寶藏，理應屬於征服它的人！'
  },

  // Magos Arcanos
  {
    id: 'merc_elena',
    name: '活焰艾蓮娜',
    title: '秘法學徒',
    icon: '🔥',
    spec: 'mage',
    rarity: 'common',
    basePower: 60,
    quote: '火焰會燒盡所有猶豫與疑惑。'
  },
  {
    id: 'merc_morgrim',
    name: '大地莫格林',
    title: '深淵召喚師',
    icon: '⚡',
    spec: 'mage',
    rarity: 'uncommon',
    basePower: 90,
    quote: '大地的脈流會因我的命令而震動。'
  },
  {
    id: 'merc_selene',
    name: '瑟琳大師',
    title: '暗影女巫',
    icon: '🔮',
    spec: 'mage',
    rarity: 'rare',
    basePower: 145,
    quote: '原初魔法足以粉碎一切世俗幻象。'
  },
  {
    id: 'merc_azrael',
    name: '星界編織者阿茲瑞爾',
    title: '象牙塔大法師',
    icon: '🌌',
    spec: 'mage',
    rarity: 'legendary',
    basePower: 330,
    quote: '宇宙也會在象牙塔的古老智慧面前低頭！'
  },

  // 治療者s / Suporte
  {
    id: 'merc_vanya',
    name: '虔誠者凡雅',
    title: '伊娃侍從',
    icon: '✨',
    spec: 'healer',
    rarity: 'common',
    basePower: 48,
    quote: '伊娃的聖水能治癒任何傷口。'
  },
  {
    id: 'merc_celestine',
    name: '修女瑟蕾絲汀',
    title: '黎明祭司',
    icon: '🕊️',
    spec: 'healer',
    rarity: 'uncommon',
    basePower: 78,
    quote: '只要有我守護，就不會有同伴倒下。'
  },
  {
    id: 'merc_thalor',
    name: '光拳塔洛爾',
    title: '驅魔武僧',
    icon: '☀️',
    spec: 'healer',
    rarity: 'rare',
    basePower: 130,
    quote: '黑暗與不死生物都將被神聖之火淨化！'
  },
  {
    id: 'merc_isolde',
    name: '女族長伊索德',
    title: '亞丁活聖女',
    icon: '👑',
    spec: 'healer',
    rarity: 'epic',
    basePower: 215,
    quote: '亞丁的希望永遠不會熄滅！'
  }
];

export function getMercenaryXpForLevel(level) {
  const lvl = Math.max(1, Math.min(20, Math.floor(level)));
  if (lvl >= 20) return 9999999;
  return lvl * lvl * 80;
}

export function calculateMercenaryPower(merc) {
  if (!merc) return 0;
  const rarityDef = MERCENARY_RARITIES[merc.rarity] || MERCENARY_RARITIES.common;
  const lvl = merc.level || 1;
  const base = merc.basePower || 50;
  let power = (base + (lvl - 1) * 15) * (rarityDef.powerMult || 1.0);

  // Bônus de Lealdade (0-100)
  const loyalty = merc.loyalty ?? 50;
  if (loyalty >= 80) power *= 1.10;
  else if (loyalty >= 50) power *= 1.05;
  else if (loyalty < 20) power *= 0.90; // desmotivado

  // Bônus de Traço
  if (merc.trait && MERCENARY_TRAITS[merc.trait]?.powerBonusPct) {
    power *= (1 + MERCENARY_TRAITS[merc.trait].powerBonusPct);
  }

  return Math.floor(power);
}

export function rollMercenaryTrait() {
  const traitKeys = Object.keys(MERCENARY_TRAITS);
  return traitKeys[Math.floor(Math.random() * traitKeys.length)];
}
