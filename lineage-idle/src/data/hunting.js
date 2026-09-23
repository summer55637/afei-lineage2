// hunting.js — Catálogo de Dados da Profissão de Caça Silvestre & Peles de Aden (Lineage II Style)

export const HUNTING_ZONES = {
  zone_talking_forest: {
    id: 'zone_talking_forest',
    name: '說話之島林地',
    icon: '🌲',
    minLevel: 15,
    difficulty: 1,
    description: '新手村周圍寧靜而茂密的森林，棲息著幼年動物與小型掠食者。',
    availablePrey: ['prey_hare', 'prey_fox', 'prey_stag', 'prey_young_boar'],
    requiredLure: null,
    baseTrackTime: 3000
  },
  zone_gludio_plains: {
    id: 'zone_gludio_plains',
    name: '古魯丁平原',
    icon: '🌾',
    minLevel: 18,
    difficulty: 2,
    description: '飽經古代戰火的開闊原野，迅捷狼群與強壯野豬在丘陵間巡遊。',
    availablePrey: ['prey_grey_wolf', 'prey_plains_boar', 'prey_wasteland_hyena', 'prey_alpha_wolf'],
    requiredLure: 'lure_meat',
    baseTrackTime: 3500
  },
  zone_dion_hills: {
    id: 'zone_dion_hills',
    name: '狄恩丘陵與沼澤',
    icon: '🌿',
    minLevel: 22,
    difficulty: 3,
    description: '植被繁茂且山坡潮濕，巨大的棕熊與猛禽支配此地。',
    availablePrey: ['prey_brown_bear', 'prey_marsh_panther', 'prey_hunting_hawk', 'prey_swamp_alligator'],
    requiredLure: 'lure_scent',
    baseTrackTime: 4000
  },
  zone_giran_wilderness: {
    id: 'zone_giran_wilderness',
    name: '奇岩海岸叢林',
    icon: '🌴',
    minLevel: 26,
    difficulty: 4,
    description: '封閉熱帶叢林中遍布有毒掠食者、敏捷貓科與巨大蛇類。',
    availablePrey: ['prey_shadow_panther', 'prey_savanna_lion', 'prey_giant_viper', 'prey_giran_gorgon_hound'],
    requiredLure: 'lure_scent',
    baseTrackTime: 4500
  },
  zone_oren_snowlands: {
    id: 'zone_oren_snowlands',
    name: '歐瑞雪原',
    icon: '❄️',
    minLevel: 32,
    difficulty: 5,
    description: '被永恆冰雪覆蓋的松林，白色猛獸擁有厚實毛皮與鋒利牙齒。',
    availablePrey: ['prey_frost_tiger', 'prey_cave_bear', 'prey_snow_wolf', 'prey_tundra_mammoth'],
    requiredLure: 'lure_blood',
    baseTrackTime: 5000
  },
  zone_goddard_peaks: {
    id: 'zone_goddard_peaks',
    name: '高達特岩峰',
    icon: '⛰️',
    minLevel: 38,
    difficulty: 6,
    description: '火山峭壁與銳利山脊之間，分布著野生獅鷲與亞丁古代奇美拉的巢穴。',
    availablePrey: ['prey_mountain_chimera', 'prey_wild_gryphon', 'prey_young_wyvern', 'prey_phoenix_hawk'],
    requiredLure: 'lure_crystal',
    baseTrackTime: 6000
  }
};

export function getHuntingZonesList() {
  return Object.values(HUNTING_ZONES);
}

export const APPROACH_TACTICS = {
  stalk: {
    id: 'stalk',
    name: '隱密接近',
    icon: '👣',
    desc: '逆風接近，捕獲率 +15%，警戒值緩慢上升（+10）。',
    timeMult: 1.2,
    qualityBonus: 0.15,
    durabilityCost: 1,
    alertChange: 10
  },
  ambush: {
    id: 'ambush',
    name: '暗影伏擊',
    icon: '🎯',
    desc: '耐心等待，警戒值 -20；若警戒低於 40，可發動暴擊。',
    timeMult: 1.3,
    qualityBonus: 0.0,
    durabilityCost: 1,
    alertChange: -20
  },
  rush: {
    id: 'rush',
    name: '立即衝鋒',
    icon: '⚡',
    desc: '迅速突進，追蹤時間 -35%，但警戒值大幅上升（+45）。',
    timeMult: 0.65,
    qualityBonus: -0.15,
    durabilityCost: 1,
    alertChange: 45
  },
  lure: {
    id: 'lure',
    name: '投放誘餌',
    icon: '🥩',
    desc: '消耗 1 個誘餌，警戒值 -35，並穩定風向以利逆風接近。',
    timeMult: 1.0,
    qualityBonus: 0.0,
    durabilityCost: 0,
    alertChange: -35
  }
};

export const WIND_DIRECTIONS = {
  headwind: { id: 'headwind', name: '逆風', icon: '🌬️⬇️', desc: '噪音降低 50%，獵物較平靜，警戒值上升較慢。', alertMult: 0.5 },
  crosswind: { id: 'crosswind', name: '側風', icon: '🌬️➡️', desc: '風向平衡，沒有額外加成或懲罰。', alertMult: 1.0 },
  tailwind: { id: 'tailwind', name: '順風', icon: '🌬️⬆️', desc: '氣味會傳向獵物，警戒值上升速度 +35%。', alertMult: 1.35 }
};

export const PREY_CATALOG = {
  // Comum (Talking Island & Gludio)
  prey_hare: {
    id: 'prey_hare', name: '丘陵野兔', icon: '🐇', rarity: 'common', behavior: 'elusive',
    weightRange: '1–3 公斤', xpReward: 6, sellPrice: 15,
    skinYield: { primary: 'leather', primaryQty: 2, secondary: 'cord', secondaryQty: 1 },
    exchangeRate: 5, exchangeReward: 'leather', exchangeRewardName: '鞣製皮革',
    zones: ['zone_talking_forest']
  },
  prey_fox: {
    id: 'prey_fox', name: '亞丁狡狐', icon: '🦊', rarity: 'common', behavior: 'elusive',
    weightRange: '4–8 公斤', xpReward: 8, sellPrice: 25,
    skinYield: { primary: 'leather', primaryQty: 3, secondary: 'cotton_thread', secondaryQty: 2 },
    exchangeRate: 5, exchangeReward: 'leather', exchangeRewardName: '鞣製皮革',
    zones: ['zone_talking_forest']
  },
  prey_young_boar: {
    id: 'prey_young_boar', name: '幼年野豬', icon: '🐗', rarity: 'common', behavior: 'calm',
    weightRange: '15–30 公斤', xpReward: 10, sellPrice: 35,
    skinYield: { primary: 'leather', primaryQty: 4, secondary: 'bone', secondaryQty: 2 },
    exchangeRate: 5, exchangeReward: 'bone', exchangeRewardName: '動物骨頭',
    zones: ['zone_talking_forest']
  },
  prey_grey_wolf: {
    id: 'prey_grey_wolf', name: '古魯丁灰狼', icon: '🐺', rarity: 'common', behavior: 'aggressive',
    weightRange: '20–40 公斤', xpReward: 12, sellPrice: 40,
    skinYield: { primary: 'leather', primaryQty: 5, secondary: 'bone', secondaryQty: 3 },
    exchangeRate: 5, exchangeReward: 'bone', exchangeRewardName: '動物骨頭',
    zones: ['zone_gludio_plains']
  },

  // Incomum
  prey_stag: {
    id: 'prey_stag', name: '精靈貴族鹿', icon: '🦌', rarity: 'uncommon', behavior: 'elusive',
    weightRange: '50–90 公斤', xpReward: 18, sellPrice: 80,
    skinYield: { primary: 'leather', primaryQty: 2, secondary: 'bone', secondaryQty: 3 },
    exchangeRate: 3, exchangeReward: 'leather', exchangeRewardName: '鞣製皮革',
    zones: ['zone_talking_forest']
  },
  prey_plains_boar: {
    id: 'prey_plains_boar', name: '鎧甲野豬', icon: '🐗', rarity: 'uncommon', behavior: 'tenacious',
    weightRange: '60–110 公斤', xpReward: 20, sellPrice: 95,
    skinYield: { primary: 'leather', primaryQty: 2, secondary: 'cokes', secondaryQty: 1 },
    exchangeRate: 3, exchangeReward: 'leather', exchangeRewardName: '鞣製皮革',
    zones: ['zone_gludio_plains']
  },
  prey_wasteland_hyena: {
    id: 'prey_wasteland_hyena', name: '荒野鬣狗', icon: '🐕', rarity: 'uncommon', behavior: 'aggressive',
    weightRange: '30–55 公斤', xpReward: 22, sellPrice: 110,
    skinYield: { primary: 'leather', primaryQty: 2, secondary: 'braided_hemp', secondaryQty: 2 },
    exchangeRate: 3, exchangeReward: 'suede', exchangeRewardName: '麂皮',
    zones: ['zone_gludio_plains']
  },
  prey_hunting_hawk: {
    id: 'prey_hunting_hawk', name: '狄恩獵鷹', icon: '🦅', rarity: 'uncommon', behavior: 'elusive',
    weightRange: '3–6 公斤', xpReward: 25, sellPrice: 125,
    skinYield: { primary: 'leather', primaryQty: 2, secondary: 'cord', secondaryQty: 3 },
    exchangeRate: 3, exchangeReward: 'braided_hemp', exchangeRewardName: '編織大麻',
    zones: ['zone_dion_hills']
  },

  // Raro
  prey_alpha_wolf: {
    id: 'prey_alpha_wolf', name: '黑牙狼王', icon: '🐺', rarity: 'rare', behavior: 'aggressive',
    weightRange: '55–80 公斤', xpReward: 40, sellPrice: 250,
    skinYield: { primary: 'crafted_leather', primaryQty: 1, secondary: 'bone', secondaryQty: 5 },
    exchangeRate: 2, exchangeReward: 'crafted_leather', exchangeRewardName: '加工皮革',
    zones: ['zone_gludio_plains']
  },
  prey_brown_bear: {
    id: 'prey_brown_bear', name: '丘陵棕熊', icon: '🐻', rarity: 'rare', behavior: 'tenacious',
    weightRange: '180–320 公斤', xpReward: 45, sellPrice: 300,
    skinYield: { primary: 'crafted_leather', primaryQty: 1, secondary: 'cokes', secondaryQty: 2 },
    exchangeRate: 2, exchangeReward: 'crafted_leather', exchangeRewardName: '加工皮革',
    zones: ['zone_dion_hills']
  },
  prey_marsh_panther: {
    id: 'prey_marsh_panther', name: '沼澤黑豹', icon: '🐆', rarity: 'rare', behavior: 'elusive',
    weightRange: '70–100 公斤', xpReward: 50, sellPrice: 350,
    skinYield: { primary: 'crafted_leather', primaryQty: 2, secondary: 'suede', secondaryQty: 4 },
    exchangeRate: 2, exchangeReward: 'crafted_leather', exchangeRewardName: '加工皮革',
    zones: ['zone_dion_hills']
  },
  prey_swamp_alligator: {
    id: 'prey_swamp_alligator', name: '狄恩鎧甲鱷魚', icon: '🐊', rarity: 'rare', behavior: 'tenacious',
    weightRange: '120–220 公斤', xpReward: 55, sellPrice: 400,
    skinYield: { primary: 'crafted_leather', primaryQty: 2, secondary: 'bone', secondaryQty: 8 },
    exchangeRate: 2, exchangeReward: 'steel', exchangeRewardName: '精製鋼',
    zones: ['zone_dion_hills']
  },
  prey_savanna_lion: {
    id: 'prey_savanna_lion', name: '草原帝國獅', icon: '🦁', rarity: 'rare', behavior: 'aggressive',
    weightRange: '150–250 公斤', xpReward: 60, sellPrice: 450,
    skinYield: { primary: 'crafted_leather', primaryQty: 2, secondary: 'cord', secondaryQty: 5 },
    exchangeRate: 2, exchangeReward: 'crafted_leather', exchangeRewardName: '加工皮革',
    zones: ['zone_giran_wilderness']
  },
  prey_snow_wolf: {
    id: 'prey_snow_wolf', name: '冰原極地狼', icon: '🐺', rarity: 'rare', behavior: 'aggressive',
    weightRange: '60–90 公斤', xpReward: 65, sellPrice: 500,
    skinYield: { primary: 'crafted_leather', primaryQty: 2, secondary: 'varnish', secondaryQty: 5 },
    exchangeRate: 2, exchangeReward: 'mithril_alloy', exchangeRewardName: '米索莉合金',
    zones: ['zone_oren_snowlands']
  },

  // Épico
  prey_shadow_panther: {
    id: 'prey_shadow_panther', name: '奇岩暗影豹', icon: '🐈‍⬛', rarity: 'epic', behavior: 'elusive',
    weightRange: '90–140 公斤', xpReward: 100, sellPrice: 1000,
    skinYield: { primary: 'crafted_leather', primaryQty: 4, secondary: 'enria', secondaryQty: 1 },
    exchangeRate: 1, exchangeReward: 'enria', exchangeRewardName: '恩尼亞',
    zones: ['zone_giran_wilderness']
  },
  prey_giant_viper: {
    id: 'prey_giant_viper', name: '叢林泰坦巨蛇', icon: '🐍', rarity: 'epic', behavior: 'aggressive',
    weightRange: '100–200 公斤', xpReward: 110, sellPrice: 1200,
    skinYield: { primary: 'crafted_leather', primaryQty: 4, secondary: 'metallic_thread', secondaryQty: 2 },
    exchangeRate: 1, exchangeReward: 'metallic_thread', exchangeRewardName: '金屬線',
    zones: ['zone_giran_wilderness']
  },
  prey_frost_tiger: {
    id: 'prey_frost_tiger', name: '冰霜劍齒虎', icon: '🐅', rarity: 'epic', behavior: 'aggressive',
    weightRange: '180–280 公斤', xpReward: 125, sellPrice: 1400,
    skinYield: { primary: 'crafted_leather', primaryQty: 5, secondary: 'mold_lubricant', secondaryQty: 2 },
    exchangeRate: 1, exchangeReward: 'durable_metal_plate', exchangeRewardName: '耐久金屬板',
    zones: ['zone_oren_snowlands']
  },
  prey_cave_bear: {
    id: 'prey_cave_bear', name: '洞穴古熊', icon: '🐻‍❄️', rarity: 'epic', behavior: 'tenacious',
    weightRange: '350–550 公斤', xpReward: 140, sellPrice: 1600,
    skinYield: { primary: 'crafted_leather', primaryQty: 5, secondary: 'oriharukon_ore', secondaryQty: 2 },
    exchangeRate: 1, exchangeReward: 'oriharukon_ore', exchangeRewardName: '奧里哈魯根礦石',
    zones: ['zone_oren_snowlands']
  },

  // Lendário (Oren & Goddard)
  prey_tundra_mammoth: {
    id: 'prey_tundra_mammoth', name: '凍原巨型猛獁', icon: '🦣', rarity: 'legendary', behavior: 'tenacious',
    weightRange: '2000–4500 公斤', xpReward: 250, sellPrice: 3500,
    skinYield: { primary: 'crafted_leather', primaryQty: 10, secondary: 'durable_metal_plate', secondaryQty: 3 },
    exchangeRate: 1, exchangeReward: 'durable_metal_plate', exchangeRewardName: '耐久金屬板 x2',
    zones: ['zone_oren_snowlands']
  },
  prey_mountain_chimera: {
    id: 'prey_mountain_chimera', name: '岩峰皇家奇美拉', icon: '🦁', rarity: 'legendary', behavior: 'aggressive',
    weightRange: '400–750 公斤', xpReward: 300, sellPrice: 4500,
    skinYield: { primary: 'crafted_leather', primaryQty: 12, secondary: 'enria', secondaryQty: 3 },
    exchangeRate: 1, exchangeReward: 'enria', exchangeRewardName: '恩尼亞 x3',
    zones: ['zone_goddard_peaks']
  },
  prey_wild_gryphon: {
    id: 'prey_wild_gryphon', name: '高達特野生獅鷲', icon: '🦅', rarity: 'legendary', behavior: 'elusive',
    weightRange: '300–600 公斤', xpReward: 320, sellPrice: 5000,
    skinYield: { primary: 'crafted_leather', primaryQty: 15, secondary: 'oriharukon_ore', secondaryQty: 4 },
    exchangeRate: 1, exchangeReward: 'oriharukon_ore', exchangeRewardName: '奧里哈魯根礦石 x3',
    zones: ['zone_goddard_peaks']
  },
  prey_young_wyvern: {
    id: 'prey_young_wyvern', name: '山脈翼龍王', icon: '🐉', rarity: 'legendary', behavior: 'aggressive',
    weightRange: '600–1200 公斤', xpReward: 400, sellPrice: 7500,
    skinYield: { primary: 'crafted_leather', primaryQty: 20, secondary: 'metallic_thread', secondaryQty: 6 },
    exchangeRate: 1, exchangeReward: 'durable_metal_plate', exchangeRewardName: '耐久金屬板 x4',
    zones: ['zone_goddard_peaks']
  }
};

export const KNIVES_CATALOG = {
  knife_none: {
    id: 'knife_none',
    name: '粗製獵刀',
    grade: 'none',
    icon: '🔪',
    minHuntingLevel: 1,
    durabilityMax: 50,
    repairCost: 500,
    buyPrice: 0,
    perfectSkinBonus: 0.0,
    desc: '以鍛鐵製成的簡易刀刃，適合處理小型獵物。'
  },
  knife_d: {
    id: 'knife_d',
    name: '古魯丁鋼製獵刀',
    grade: 'd',
    icon: '🗡️',
    minHuntingLevel: 3,
    durabilityMax: 120,
    repairCost: 2500,
    buyPrice: 15000,
    perfectSkinBonus: 0.15,
    desc: '由古魯丁武器匠打造，鋒利刀刃使完美毛皮機率 +15%。'
  },
  knife_c: {
    id: 'knife_c',
    name: '精靈米索莉獵刀',
    grade: 'c',
    icon: '✨',
    minHuntingLevel: 8,
    durabilityMax: 250,
    repairCost: 7500,
    buyPrice: 60000,
    perfectSkinBonus: 0.30,
    desc: '受精靈祝福的輕巧精準刀刃，完美毛皮機率 +30%。'
  },
  knife_b: {
    id: 'knife_b',
    name: '奇岩掠食者獵刀',
    grade: 'b',
    icon: '⚔️',
    minHuntingLevel: 15,
    durabilityMax: 450,
    repairCost: 20000,
    buyPrice: 200000,
    perfectSkinBonus: 0.50,
    desc: '奇岩叢林菁英獵人使用的獵刀，完美毛皮機率 +50%。'
  },
  knife_a: {
    id: 'knife_a',
    name: '帝國狩獵大師之刃',
    grade: 'a',
    icon: '👑',
    minHuntingLevel: 25,
    durabilityMax: 800,
    repairCost: 60000,
    buyPrice: 750000,
    perfectSkinBonus: 0.80,
    desc: '帝國大馬士革鋼傑作，可俐落切割厚皮（完美毛皮機率 +80%）。'
  }
};

export const LURES_CATALOG = {
  lure_meat: {
    id: 'lure_meat',
    name: '新鮮肉塊',
    icon: '🥩',
    buyPrice: 100,
    rarityBoost: 'uncommon',
    speedBoost: 1.15,
    desc: '可快速吸引草食動物與一般掠食者的基礎誘餌（速度 +15%）。'
  },
  lure_scent: {
    id: 'lure_scent',
    name: '野性費洛蒙',
    icon: '🧪',
    buyPrice: 350,
    rarityBoost: 'rare',
    speedBoost: 1.25,
    desc: '精製芳香誘餌，可吸引森林與山區的稀有物種。'
  },
  lure_blood: {
    id: 'lure_blood',
    name: '王者血餌',
    icon: '🩸',
    buyPrice: 1000,
    rarityBoost: 'epic',
    speedBoost: 1.40,
    desc: '以首領級獵物血液製成的精華，可吸引兇猛與史詩級野獸。'
  },
  lure_crystal: {
    id: 'lure_crystal',
    name: '古代野獸精華',
    icon: '🔮',
    buyPrice: 3000,
    rarityBoost: 'legendary',
    speedBoost: 1.60,
    desc: '注入大地魔力的瓶裝精華，是發現傳說奇美拉與翼龍的重要道具。'
  }
};

export function getHuntingXpForLevel(level) {
  const lvl = Math.max(1, Math.min(30, Math.floor(level)));
  if (lvl >= 30) return 9999999;
  return lvl * lvl * 50;
}
