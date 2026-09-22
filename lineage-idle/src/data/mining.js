// mining.js — Catálogo de Dados da Profissão de Mineração & Veios de Aden (Lineage II Style)

export const MINING_ZONES = {
  zone_abandoned_coal: {
    id: 'zone_abandoned_coal',
    name: '古魯丁煤礦坑道',
    icon: '⛏️',
    minLevel: 15,
    difficulty: 1,
    description: '古老的地下坑道，可開採煤礦與淺層鐵礦，非常適合新手礦工。',
    availableNodes: ['node_coal_deposit', 'node_crude_iron_pocket', 'node_gravel_strata', 'node_pyrite_cluster'],
    requiredLamp: null,
    baseMineTime: 3300
  },
  zone_mithril_mines: {
    id: 'zone_mithril_mines',
    name: '矮人古代礦坑',
    icon: '💎',
    minLevel: 22,
    difficulty: 2,
    description: '由亞丁最優秀工匠血盟開鑿的迷宮坑道，富含銀礦脈與少量米索莉。',
    availableNodes: ['node_pure_iron_seam', 'node_silver_vein', 'node_dense_coal_pillar', 'node_cokes_rock'],
    requiredLamp: 'lamp_oil',
    baseMineTime: 3800
  },
  zone_plains_quarry: {
    id: 'zone_plains_quarry',
    name: '狄恩丘陵採石場',
    icon: '🪨',
    minLevel: 28,
    difficulty: 3,
    description: '開闊岩坡遍布堅硬變質岩，盛產重鐵礦結核與閃耀礦塊。',
    availableNodes: ['node_heavy_iron_boulder', 'node_rich_silver_pocket', 'node_mithril_crust', 'node_quarry_granite'],
    requiredLamp: 'lamp_miner',
    baseMineTime: 4200
  },
  zone_giran_deep_vein: {
    id: 'zone_giran_deep_vein',
    name: '奇岩峽谷深層礦脈',
    icon: '✨',
    minLevel: 34,
    difficulty: 4,
    description: '地殼裂縫中的高壓凝聚了稀有古代米索莉與高階合金礦物。',
    availableNodes: ['node_deep_mithril_lode', 'node_silver_nugget_mother', 'node_cokes_furnace_core', 'node_steel_shale'],
    requiredLamp: 'lamp_miner',
    baseMineTime: 4800
  },
  zone_iron_stronghold: {
    id: 'zone_iron_stronghold',
    name: '修加特冰霜礦坑',
    icon: '❄️',
    minLevel: 38,
    difficulty: 5,
    description: '極深的冰凍礦井，嚴寒使永凍層下的奧里哈魯根形成金色結晶礦脈。',
    availableNodes: ['node_oriharukon_frozen_vein', 'node_ancient_mithril_cluster', 'node_iron_bedrock', 'node_dense_mineral_mass'],
    requiredLamp: 'lamp_alchemical',
    baseMineTime: 5400
  },
  zone_forge_of_gods: {
    id: 'zone_forge_of_gods',
    name: '高達特諸神熔爐',
    icon: '🌋',
    minLevel: 40,
    difficulty: 6,
    description: '鄰近火龍巢穴的熾熱火山洞窟，是傳說精金自然出露的唯一區域。',
    availableNodes: ['node_adamantite_core_rock', 'node_oriharukon_radiant_geode', 'node_magma_tempered_slag', 'node_primordial_bedrock'],
    requiredLamp: 'lamp_crystal',
    baseMineTime: 6200
  }
};

export function getMiningZonesList() {
  return Object.values(MINING_ZONES);
}

export const MINE_HAZARDS = {
  none: { id: 'none', name: '穩定岩層', desc: '沒有隱藏危險。' },
  gas_pocket: { id: 'gas_pocket', name: '瓦斯囊', desc: '可燃性瓦斯，重擊可能引發爆炸（造成 10% 生命值傷害並額外消耗工具耐久）。' },
  seismic_fault: { id: 'seismic_fault', name: '地震裂隙', desc: '岩層破裂，穩定度下降速度變為 2 倍。' },
  dense_crystal: { id: 'dense_crystal', name: '水晶礦脈', desc: '純淨水晶，精準採礦可使產量加倍。' }
};

export const MINING_TACTICS = {
  precision: {
    id: 'precision',
    name: '精準鑿擊',
    icon: '🎯',
    desc: '沿岩石天然節理精準敲擊，純淨礦塊機率 +25%，穩定度損失 -5%。',
    timeMult: 1.2,
    qualityBonus: 0.25,
    durabilityCost: 1,
    stabilityLoss: 5
  },
  standard: {
    id: 'standard',
    name: '標準採礦',
    icon: '⛏️',
    desc: '穩定節奏揮動礦鎬，產量與穩定度損失都屬中等（-12%）。',
    timeMult: 1.0,
    qualityBonus: 0.0,
    durabilityCost: 1,
    stabilityLoss: 12
  },
  heavy: {
    id: 'heavy',
    name: '破碎重擊',
    icon: '💥',
    desc: '以強力重擊破壞外層，時間 -35%，但穩定度大幅下降（-28%），且可能引爆瓦斯。',
    timeMult: 0.65,
    qualityBonus: -0.15,
    durabilityCost: 1,
    stabilityLoss: 28
  },
  probe: {
    id: 'probe',
    name: '聲波探勘',
    icon: '🔍',
    desc: '不造成坑道震動即可偵測礦脈危險。',
    timeMult: 0,
    qualityBonus: 0,
    durabilityCost: 0,
    stabilityLoss: 0,
    isInstant: true
  }
};

export const MINERAL_NODES_CATALOG = {
  // Comum
  node_coal_deposit: {
    id: 'node_coal_deposit', name: '表層煤礦脈', icon: '⚫', rarity: 'common',
    desc: '容易敲碎的煤礦層。',
    yields: { primary: 'coal', primaryQty: 3, secondary: 'iron_ore', secondaryQty: 1 },
    baseTime: 3200, xpReward: 6, zones: ['zone_abandoned_coal']
  },
  node_crude_iron_pocket: {
    id: 'node_crude_iron_pocket', name: '粗鐵礦結核', icon: '🪨', rarity: 'common',
    desc: '富含氧化鐵的紅色岩石。',
    yields: { primary: 'iron_ore', primaryQty: 3, secondary: 'coal', secondaryQty: 1 },
    baseTime: 3300, xpReward: 8, zones: ['zone_abandoned_coal']
  },
  node_gravel_strata: {
    id: 'node_gravel_strata', name: '砂礫礦層', icon: '⛏️', rarity: 'common',
    desc: '由多種富含礦物的沉積物混合形成。',
    yields: { primary: 'coal', primaryQty: 2, secondary: 'iron_ore', secondaryQty: 2 },
    baseTime: 3100, xpReward: 7, zones: ['zone_abandoned_coal']
  },
  node_pyrite_cluster: {
    id: 'node_pyrite_cluster', name: '粗黃鐵礦聚合體', icon: '🪙', rarity: 'common',
    desc: '伴隨高密度鐵礦囊出現的金色晶體。',
    yields: { primary: 'iron_ore', primaryQty: 4, secondary: 'coal', secondaryQty: 1 },
    baseTime: 3500, xpReward: 10, zones: ['zone_abandoned_coal']
  },

  // Incomum
  node_pure_iron_seam: {
    id: 'node_pure_iron_seam', name: '矮人鐵礦帶', icon: '⚙️', rarity: 'uncommon',
    desc: '深藏山腹、連續且高密度的礦脈。',
    yields: { primary: 'iron_ore', primaryQty: 5, secondary: 'cokes', secondaryQty: 1 },
    baseTime: 3800, xpReward: 18, zones: ['zone_mithril_mines']
  },
  node_silver_vein: {
    id: 'node_silver_vein', name: '閃耀銀礦脈', icon: '🥈', rarity: 'uncommon',
    desc: '在深色岩壁上閃耀的銀色礦帶。',
    yields: { primary: 'silver_nugget', primaryQty: 2, secondary: 'iron_ore', secondaryQty: 2 },
    baseTime: 4000, xpReward: 22, zones: ['zone_mithril_mines']
  },
  node_dense_coal_pillar: {
    id: 'node_dense_coal_pillar', name: '純無煙煤柱', icon: '🪨', rarity: 'uncommon',
    desc: '燃燒乾淨且熱值極高的化石煤。',
    yields: { primary: 'coal', primaryQty: 6, secondary: 'cokes', secondaryQty: 1 },
    baseTime: 3900, xpReward: 20, zones: ['zone_mithril_mines']
  },
  node_cokes_rock: {
    id: 'node_cokes_rock', name: '天然焦炭層', icon: '🔥', rarity: 'uncommon',
    desc: '受附近地熱裂縫煅燒形成的焦炭結核。',
    yields: { primary: 'cokes', primaryQty: 2, secondary: 'iron_ore', secondaryQty: 3 },
    baseTime: 4100, xpReward: 24, zones: ['zone_mithril_mines']
  },

  // Raro
  node_heavy_iron_boulder: {
    id: 'node_heavy_iron_boulder', name: '狄恩赤鐵巨岩', icon: '🛡️', rarity: 'rare',
    desc: '高密度礦物巨塊，非常難以敲碎。',
    yields: { primary: 'iron_ore', primaryQty: 8, secondary: 'steel', secondaryQty: 1 },
    baseTime: 4400, xpReward: 44, zones: ['zone_plains_quarry']
  },
  node_rich_silver_pocket: {
    id: 'node_rich_silver_pocket', name: '高純銀礦囊', icon: '✨', rarity: 'rare',
    desc: '擁有極高晶體純度的銀礦晶洞。',
    yields: { primary: 'silver_nugget', primaryQty: 4, secondary: 'iron_ore', secondaryQty: 4 },
    baseTime: 4600, xpReward: 48, zones: ['zone_plains_quarry']
  },
  node_deep_mithril_lode: {
    id: 'node_deep_mithril_lode', name: '深層米索莉礦脈', icon: '💎', rarity: 'rare',
    desc: '帶有銀藍色澤的天然米索莉原礦。',
    yields: { primary: 'mithril_ore', primaryQty: 2, secondary: 'silver_nugget', secondaryQty: 2 },
    baseTime: 4900, xpReward: 55, zones: ['zone_giran_deep_vein']
  },
  node_cokes_furnace_core: {
    id: 'node_cokes_furnace_core', name: '煅燒岩芯', icon: '🌋', rarity: 'rare',
    desc: '能承受 C 級鍛造高溫的特殊礦化岩芯。',
    yields: { primary: 'cokes', primaryQty: 3, secondary: 'steel', secondaryQty: 1 },
    baseTime: 4700, xpReward: 52, zones: ['zone_giran_deep_vein']
  },

  // Épico
  node_oriharukon_frozen_vein: {
    id: 'node_oriharukon_frozen_vein', name: '奧里哈魯根金色礦脈', icon: '🌟', rarity: 'epic',
    desc: '嵌在修加特花崗岩中的神秘金色金屬絲脈。',
    yields: { primary: 'oriharukon_ore', primaryQty: 2, secondary: 'mithril_ore', secondaryQty: 2 },
    baseTime: 5400, xpReward: 95, zones: ['zone_iron_stronghold']
  },
  node_ancient_mithril_cluster: {
    id: 'node_ancient_mithril_cluster', name: '古代米索莉礦巢', icon: '🔷', rarity: 'epic',
    desc: '具有極高魔法導能性的巨大米索莉結晶。',
    yields: { primary: 'mithril_ore', primaryQty: 4, secondary: 'oriharukon_ore', secondaryQty: 1 },
    baseTime: 5500, xpReward: 105, zones: ['zone_iron_stronghold']
  },

  // Lendário
  node_adamantite_core_rock: {
    id: 'node_adamantite_core_rock', name: '太古精金巨石', icon: '⚡', rarity: 'legendary',
    desc: '埋藏在諸神熔爐下方的隕石碎片，硬度無可匹敵。',
    yields: { primary: 'adamantite', primaryQty: 2, secondary: 'oriharukon_ore', secondaryQty: 3 },
    baseTime: 6200, xpReward: 260, zones: ['zone_forge_of_gods']
  },
  node_oriharukon_radiant_geode: {
    id: 'node_oriharukon_radiant_geode', name: '閃耀奧里哈魯根晶洞', icon: '👑', rarity: 'legendary',
    desc: '內部充滿太古金色晶體的巨大火山晶洞。',
    yields: { primary: 'oriharukon_ore', primaryQty: 4, secondary: 'adamantite', secondaryQty: 1 },
    baseTime: 6400, xpReward: 300, zones: ['zone_forge_of_gods']
  }
};

export const PICKAXES_CATALOG = {
  pickaxe_none: {
    id: 'pickaxe_none',
    name: '粗製銅礦鎬',
    grade: 'none',
    icon: '⛏️',
    minMiningLevel: 1,
    durabilityMax: 50,
    repairCost: 500,
    buyPrice: 0,
    qualityBonus: 0.0,
    desc: '以青銅鍛造尖端與普通木柄製成的基礎工具。'
  },
  pickaxe_d: {
    id: 'pickaxe_d',
    name: '矮人鐵礦鎬',
    grade: 'd',
    icon: '⚒️',
    minMiningLevel: 3,
    durabilityMax: 120,
    repairCost: 2500,
    buyPrice: 15000,
    qualityBonus: 0.15,
    desc: '使用礦坑大師的淬火技術鍛造，純礦石出現機率 +15%。'
  },
  pickaxe_c: {
    id: 'pickaxe_c',
    name: '強化鋼製礦鎬',
    grade: 'c',
    icon: '✨',
    minMiningLevel: 8,
    durabilityMax: 250,
    repairCost: 7500,
    buyPrice: 60000,
    qualityBonus: 0.30,
    desc: '斜刃設計可劈開花崗岩而不破壞稀有礦脈（純度 +30%）。'
  },
  pickaxe_b: {
    id: 'pickaxe_b',
    name: '高壓米索莉礦鎬',
    grade: 'b',
    icon: '💎',
    minMiningLevel: 15,
    durabilityMax: 450,
    repairCost: 20000,
    buyPrice: 200000,
    qualityBonus: 0.50,
    desc: '能輕鬆貫穿深層米索莉與奧里哈魯根礦脈（純度 +50%）。'
  },
  pickaxe_a: {
    id: 'pickaxe_a',
    name: '帝國鍛造泰坦鑽頭',
    grade: 'a',
    icon: '👑',
    minMiningLevel: 25,
    durabilityMax: 800,
    repairCost: 60000,
    buyPrice: 750000,
    qualityBonus: 0.80,
    desc: '受 Maphr 祝福的傑作，可鑽穿精金巨塊（純度 +80%）。'
  }
};

export const LAMPS_CATALOG = {
  lamp_oil: {
    id: 'lamp_oil',
    name: '礦油燈',
    icon: '🏮',
    buyPrice: 100,
    rarityBoost: 'uncommon',
    speedBoost: 1.15,
    desc: '照亮黑暗坑道，提高採礦敲擊速度（速度 +15%）。'
  },
  lamp_miner: {
    id: 'lamp_miner',
    name: '矮人碳化燈',
    icon: '🔦',
    buyPrice: 350,
    rarityBoost: 'rare',
    speedBoost: 1.25,
    desc: '明亮火焰能顯現銀礦與米索莉礦脈的微弱光澤。'
  },
  lamp_alchemical: {
    id: 'lamp_alchemical',
    name: '鍊金鬼火燈',
    icon: '🧪',
    buyPrice: 1000,
    rarityBoost: 'epic',
    speedBoost: 1.40,
    desc: '對奧里哈魯根天然磁性有反應的幽光。'
  },
  lamp_crystal: {
    id: 'lamp_crystal',
    name: '高達特永恆火焰水晶',
    icon: '🔮',
    buyPrice: 3000,
    rarityBoost: 'legendary',
    speedBoost: 1.60,
    desc: '即使在諸神熔爐的氣體中也不會熄滅，可協助發現精金。'
  }
};
