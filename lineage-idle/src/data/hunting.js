// hunting.js — Catálogo de Dados da Profissão de Caça Silvestre & Peles de Aden (Lineage II Style)

export const HUNTING_ZONES = {
  zone_talking_forest: {
    id: 'zone_talking_forest',
    name: 'Bosques de Talking Island',
    icon: '🌲',
    minLevel: 15,
    difficulty: 1,
    description: 'Bosques densos e calmos ao redor da vila inicial. Lar de animais jovens e pequenos predadores.',
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
    description: 'Campos abertos marcados por guerras antigas. Alcateias de lobos velozes e javalis robustos patrulham as colinas.',
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
    description: '植被繁茂、坡地潮濕，強壯棕熊與猛禽主宰此地。',
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
    description: '茂密熱帶叢林，充滿有毒掠食者、敏捷貓科動物與巨大蛇類。',
    availablePrey: ['prey_shadow_panther', 'prey_savanna_lion', 'prey_giant_viper', 'prey_giran_gorgon_hound'],
    requiredLure: 'lure_scent',
    baseTrackTime: 4500
  },
  zone_oren_snowlands: {
    id: 'zone_oren_snowlands',
    name: 'Terras Nevadas de Oren',
    icon: '❄️',
    minLevel: 32,
    difficulty: 5,
    description: 'Florestas de pinheiros cobertas de gelo eterno. Feras albas com peles espessas e dentes afiados.',
    availablePrey: ['prey_frost_tiger', 'prey_cave_bear', 'prey_snow_wolf', 'prey_tundra_mammoth'],
    requiredLure: 'lure_blood',
    baseTrackTime: 5000
  },
  zone_goddard_peaks: {
    id: 'zone_goddard_peaks',
    name: 'Picos Rochosos de Goddard',
    icon: '⛰️',
    minLevel: 38,
    difficulty: 6,
    description: '火山峭壁與鋒利山稜，棲息著野生獅鷲與亞丁古代奇美拉。',
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
    name: '潛行接近',
    icon: '👣',
    desc: 'Move-se contra o vento. +15% de chance de captura, alerta sobe devagar (+10).',
    timeMult: 1.2,
    qualityBonus: 0.15,
    durabilityCost: 1,
    alertChange: 10
  },
  ambush: {
    id: 'ambush',
    name: 'Emboscada nas Sombras',
    icon: '🎯',
    desc: '耐心等待。警戒值 -20；若警戒低於 40，可觸發暴擊。',
    timeMult: 1.3,
    qualityBonus: 0.0,
    durabilityCost: 1,
    alertChange: -20
  },
  rush: {
    id: 'rush',
    name: 'Investida Imediata',
    icon: '⚡',
    desc: '快速突進，追蹤時間 -35%，但警戒值 +45。',
    timeMult: 0.65,
    qualityBonus: -0.15,
    durabilityCost: 1,
    alertChange: 45
  },
  lure: {
    id: 'lure',
    name: '投放誘餌',
    icon: '🥩',
    desc: 'Consome 1 atrativo. Reduz alerta em 35 e estabiliza vento para Contra o Vento.',
    timeMult: 1.0,
    qualityBonus: 0.0,
    durabilityCost: 0,
    alertChange: -35
  }
};

export const WIND_DIRECTIONS = {
  headwind: { id: 'headwind', name: 'Contra o Vento', icon: '🌬️⬇️', desc: '噪音降低 50%，獵物較平靜，警戒上升較慢。', alertMult: 0.5 },
  crosswind: { id: 'crosswind', name: 'Vento Lateral', icon: '🌬️➡️', desc: '風向穩定，沒有額外加成或懲罰。', alertMult: 1.0 },
  tailwind: { id: 'tailwind', name: 'A Favor do Vento', icon: '🌬️⬆️', desc: '氣味順風擴散，獵物警戒值上升速度 +35%。', alertMult: 1.35 }
};

export const PREY_CATALOG = {
  // Comum (Talking Island & Gludio)
  prey_hare: {
    id: 'prey_hare', name: 'Lebre das Colinas', icon: '🐇', rarity: 'common', behavior: 'elusive',
    weightRange: '1-3 kg', xpReward: 6, sellPrice: 15,
    skinYield: { primary: 'leather', primaryQty: 2, secondary: 'cord', secondaryQty: 1 },
    exchangeRate: 5, exchangeReward: 'leather', exchangeRewardName: 'Couro Curtido',
    zones: ['zone_talking_forest']
  },
  prey_fox: {
    id: 'prey_fox', name: '亞丁狡猾狐狸', icon: '🦊', rarity: 'common', behavior: 'elusive',
    weightRange: '4-8 kg', xpReward: 8, sellPrice: 25,
    skinYield: { primary: 'leather', primaryQty: 3, secondary: 'cotton_thread', secondaryQty: 2 },
    exchangeRate: 5, exchangeReward: 'leather', exchangeRewardName: 'Couro Curtido',
    zones: ['zone_talking_forest']
  },
  prey_young_boar: {
    id: 'prey_young_boar', name: 'Javali Jovem', icon: '🐗', rarity: 'common', behavior: 'calm',
    weightRange: '15-30 kg', xpReward: 10, sellPrice: 35,
    skinYield: { primary: 'leather', primaryQty: 4, secondary: 'bone', secondaryQty: 2 },
    exchangeRate: 5, exchangeReward: 'bone', exchangeRewardName: 'Osso Animal',
    zones: ['zone_talking_forest']
  },
  prey_grey_wolf: {
    id: 'prey_grey_wolf', name: 'Lobo Cinzento de Gludio', icon: '🐺', rarity: 'common', behavior: 'aggressive',
    weightRange: '20-40 kg', xpReward: 12, sellPrice: 40,
    skinYield: { primary: 'leather', primaryQty: 5, secondary: 'bone', secondaryQty: 3 },
    exchangeRate: 5, exchangeReward: 'bone', exchangeRewardName: 'Osso Animal',
    zones: ['zone_gludio_plains']
  },

  // Incomum
  prey_stag: {
    id: 'prey_stag', name: 'Cervo Nobre de Elven', icon: '🦌', rarity: 'uncommon', behavior: 'elusive',
    weightRange: '50-90 kg', xpReward: 18, sellPrice: 80,
    skinYield: { primary: 'leather', primaryQty: 2, secondary: 'bone', secondaryQty: 3 },
    exchangeRate: 3, exchangeReward: 'leather', exchangeRewardName: 'Couro Curtido',
    zones: ['zone_talking_forest']
  },
  prey_plains_boar: {
    id: 'prey_plains_boar', name: '裝甲野豬', icon: '🐗', rarity: 'uncommon', behavior: 'tenacious',
    weightRange: '60-110 kg', xpReward: 20, sellPrice: 95,
    skinYield: { primary: 'leather', primaryQty: 2, secondary: 'cokes', secondaryQty: 1 },
    exchangeRate: 3, exchangeReward: 'leather', exchangeRewardName: 'Couro Curtido',
    zones: ['zone_gludio_plains']
  },
  prey_wasteland_hyena: {
    id: 'prey_wasteland_hyena', name: 'Hiena dos Ermos', icon: '🐕', rarity: 'uncommon', behavior: 'aggressive',
    weightRange: '30-55 kg', xpReward: 22, sellPrice: 110,
    skinYield: { primary: 'leather', primaryQty: 2, secondary: 'braided_hemp', secondaryQty: 2 },
    exchangeRate: 3, exchangeReward: 'suede', exchangeRewardName: '麂皮',
    zones: ['zone_gludio_plains']
  },
  prey_hunting_hawk: {
    id: 'prey_hunting_hawk', name: '狄恩獵鷹', icon: '🦅', rarity: 'uncommon', behavior: 'elusive',
    weightRange: '3-6 kg', xpReward: 25, sellPrice: 125,
    skinYield: { primary: 'leather', primaryQty: 2, secondary: 'cord', secondaryQty: 3 },
    exchangeRate: 3, exchangeReward: 'braided_hemp', exchangeRewardName: '編織麻纖',
    zones: ['zone_dion_hills']
  },

  // Raro
  prey_alpha_wolf: {
    id: 'prey_alpha_wolf', name: 'Lobo Alfa da Presa Negra', icon: '🐺', rarity: 'rare', behavior: 'aggressive',
    weightRange: '55-80 kg', xpReward: 40, sellPrice: 250,
    skinYield: { primary: 'crafted_leather', primaryQty: 1, secondary: 'bone', secondaryQty: 5 },
    exchangeRate: 2, exchangeReward: 'crafted_leather', exchangeRewardName: 'Couro Trabalhado',
    zones: ['zone_gludio_plains']
  },
  prey_brown_bear: {
    id: 'prey_brown_bear', name: 'Urso Pardo das Colinas', icon: '🐻', rarity: 'rare', behavior: 'tenacious',
    weightRange: '180-320 kg', xpReward: 45, sellPrice: 300,
    skinYield: { primary: 'crafted_leather', primaryQty: 1, secondary: 'cokes', secondaryQty: 2 },
    exchangeRate: 2, exchangeReward: 'crafted_leather', exchangeRewardName: 'Couro Trabalhado',
    zones: ['zone_dion_hills']
  },
  prey_marsh_panther: {
    id: 'prey_marsh_panther', name: '沼澤黑豹', icon: '🐆', rarity: 'rare', behavior: 'elusive',
    weightRange: '70-100 kg', xpReward: 50, sellPrice: 350,
    skinYield: { primary: 'crafted_leather', primaryQty: 2, secondary: 'suede', secondaryQty: 4 },
    exchangeRate: 2, exchangeReward: 'crafted_leather', exchangeRewardName: 'Couro Trabalhado',
    zones: ['zone_dion_hills']
  },
  prey_swamp_alligator: {
    id: 'prey_swamp_alligator', name: '狄恩裝甲鱷魚', icon: '🐊', rarity: 'rare', behavior: 'tenacious',
    weightRange: '120-220 kg', xpReward: 55, sellPrice: 400,
    skinYield: { primary: 'crafted_leather', primaryQty: 2, secondary: 'bone', secondaryQty: 8 },
    exchangeRate: 2, exchangeReward: 'steel', exchangeRewardName: '精煉鋼',
    zones: ['zone_dion_hills']
  },
  prey_savanna_lion: {
    id: 'prey_savanna_lion', name: '草原帝王獅', icon: '🦁', rarity: 'rare', behavior: 'aggressive',
    weightRange: '150-250 kg', xpReward: 60, sellPrice: 450,
    skinYield: { primary: 'crafted_leather', primaryQty: 2, secondary: 'cord', secondaryQty: 5 },
    exchangeRate: 2, exchangeReward: 'crafted_leather', exchangeRewardName: 'Couro Trabalhado',
    zones: ['zone_giran_wilderness']
  },
  prey_snow_wolf: {
    id: 'prey_snow_wolf', name: 'Lobo Polar das Geleiras', icon: '🐺', rarity: 'rare', behavior: 'aggressive',
    weightRange: '60-90 kg', xpReward: 65, sellPrice: 500,
    skinYield: { primary: 'crafted_leather', primaryQty: 2, secondary: 'varnish', secondaryQty: 5 },
    exchangeRate: 2, exchangeReward: 'mithril_alloy', exchangeRewardName: 'Liga de Mithril',
    zones: ['zone_oren_snowlands']
  },

  // Épico
  prey_shadow_panther: {
    id: 'prey_shadow_panther', name: 'Pantera das Sombras de Giran', icon: '🐈‍⬛', rarity: 'epic', behavior: 'elusive',
    weightRange: '90-140 kg', xpReward: 100, sellPrice: 1000,
    skinYield: { primary: 'crafted_leather', primaryQty: 4, secondary: 'enria', secondaryQty: 1 },
    exchangeRate: 1, exchangeReward: 'enria', exchangeRewardName: 'Enria',
    zones: ['zone_giran_wilderness']
  },
  prey_giant_viper: {
    id: 'prey_giant_viper', name: '叢林巨型蝰蛇', icon: '🐍', rarity: 'epic', behavior: 'aggressive',
    weightRange: '100-200 kg', xpReward: 110, sellPrice: 1200,
    skinYield: { primary: 'crafted_leather', primaryQty: 4, secondary: 'metallic_thread', secondaryQty: 2 },
    exchangeRate: 1, exchangeReward: 'metallic_thread', exchangeRewardName: '金屬線',
    zones: ['zone_giran_wilderness']
  },
  prey_frost_tiger: {
    id: 'prey_frost_tiger', name: 'Tigre Dentes-de-Sabre Glacial', icon: '🐅', rarity: 'epic', behavior: 'aggressive',
    weightRange: '180-280 kg', xpReward: 125, sellPrice: 1400,
    skinYield: { primary: 'crafted_leather', primaryQty: 5, secondary: 'mold_lubricant', secondaryQty: 2 },
    exchangeRate: 1, exchangeReward: 'durable_metal_plate', exchangeRewardName: '堅固金屬板',
    zones: ['zone_oren_snowlands']
  },
  prey_cave_bear: {
    id: 'prey_cave_bear', name: '古老洞穴熊', icon: '🐻‍❄️', rarity: 'epic', behavior: 'tenacious',
    weightRange: '350-550 kg', xpReward: 140, sellPrice: 1600,
    skinYield: { primary: 'crafted_leather', primaryQty: 5, secondary: 'oriharukon_ore', secondaryQty: 2 },
    exchangeRate: 1, exchangeReward: 'oriharukon_ore', exchangeRewardName: '奧里哈魯根礦石',
    zones: ['zone_oren_snowlands']
  },

  // Lendário (Oren & Goddard)
  prey_tundra_mammoth: {
    id: 'prey_tundra_mammoth', name: 'Mamute Colossal da Tundra', icon: '🦣', rarity: 'legendary', behavior: 'tenacious',
    weightRange: '2000-4500 kg', xpReward: 250, sellPrice: 3500,
    skinYield: { primary: 'crafted_leather', primaryQty: 10, secondary: 'durable_metal_plate', secondaryQty: 3 },
    exchangeRate: 1, exchangeReward: 'durable_metal_plate', exchangeRewardName: '堅固金屬板 x2',
    zones: ['zone_oren_snowlands']
  },
  prey_mountain_chimera: {
    id: 'prey_mountain_chimera', name: 'Quimera Real dos Picos', icon: '🦁', rarity: 'legendary', behavior: 'aggressive',
    weightRange: '400-750 kg', xpReward: 300, sellPrice: 4500,
    skinYield: { primary: 'crafted_leather', primaryQty: 12, secondary: 'enria', secondaryQty: 3 },
    exchangeRate: 1, exchangeReward: 'enria', exchangeRewardName: 'Enria x3',
    zones: ['zone_goddard_peaks']
  },
  prey_wild_gryphon: {
    id: 'prey_wild_gryphon', name: 'Grifo Selvagem de Goddard', icon: '🦅', rarity: 'legendary', behavior: 'elusive',
    weightRange: '300-600 kg', xpReward: 320, sellPrice: 5000,
    skinYield: { primary: 'crafted_leather', primaryQty: 15, secondary: 'oriharukon_ore', secondaryQty: 4 },
    exchangeRate: 1, exchangeReward: 'oriharukon_ore', exchangeRewardName: '奧里哈魯根礦石 x3',
    zones: ['zone_goddard_peaks']
  },
  prey_young_wyvern: {
    id: 'prey_young_wyvern', name: 'Wyvern Alfa da Cordilheira', icon: '🐉', rarity: 'legendary', behavior: 'aggressive',
    weightRange: '600-1200 kg', xpReward: 400, sellPrice: 7500,
    skinYield: { primary: 'crafted_leather', primaryQty: 20, secondary: 'metallic_thread', secondaryQty: 6 },
    exchangeRate: 1, exchangeReward: 'durable_metal_plate', exchangeRewardName: '堅固金屬板 x4',
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
    desc: 'Forjada pelos armeiros de Gludio. Fio afiado que aumenta em +15% a chance de peles perfeitas.'
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
    desc: '受精靈祝福的輕巧精準刀刃，+30% 完美毛皮機率。'
  },
  knife_b: {
    id: 'knife_b',
    name: 'Faca do Predador de Giran',
    grade: 'b',
    icon: '⚔️',
    minHuntingLevel: 15,
    durabilityMax: 450,
    repairCost: 20000,
    buyPrice: 200000,
    perfectSkinBonus: 0.50,
    desc: '奇岩叢林菁英獵人使用，+50% 完美毛皮機率。'
  },
  knife_a: {
    id: 'knife_a',
    name: '帝國獵人大師之刃',
    grade: 'a',
    icon: '👑',
    minHuntingLevel: 25,
    durabilityMax: 800,
    repairCost: 60000,
    buyPrice: 750000,
    perfectSkinBonus: 0.80,
    desc: '帝國大馬士革鋼傑作，可精準切割厚皮（+80% 完美毛皮機率）。'
  }
};

export const LURES_CATALOG = {
  lure_meat: {
    id: 'lure_meat',
    name: 'Carne Fresca',
    icon: '🥩',
    buyPrice: 100,
    rarityBoost: 'uncommon',
    speedBoost: 1.15,
    desc: '基礎誘餌，可快速吸引草食動物與常見掠食者（+15% 速度）。'
  },
  lure_scent: {
    id: 'lure_scent',
    name: '野性費洛蒙',
    icon: '🧪',
    buyPrice: 350,
    rarityBoost: 'rare',
    speedBoost: 1.25,
    desc: '精製芳香誘劑，可吸引森林與山區的稀有物種。'
  },
  lure_blood: {
    id: 'lure_blood',
    name: 'Isca de Sangue Alfa',
    icon: '🩸',
    buyPrice: 1000,
    rarityBoost: 'epic',
    speedBoost: 1.40,
    desc: '以首領獵物之血製成的精華，可吸引兇猛與史詩級野獸。'
  },
  lure_crystal: {
    id: 'lure_crystal',
    name: '古代野獸精華',
    icon: '🔮',
    buyPrice: 3000,
    rarityBoost: 'legendary',
    speedBoost: 1.60,
    desc: '灌注大地魔力的瓶裝精華，是發現傳說奇美拉與飛龍的重要道具。'
  }
};

export function getHuntingXpForLevel(level) {
  const lvl = Math.max(1, Math.min(30, Math.floor(level)));
  if (lvl >= 30) return 9999999;
  return lvl * lvl * 50;
}
