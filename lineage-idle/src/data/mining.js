// mining.js — Catálogo de Dados da Profissão de Mineração & Veios de Aden (Lineage II Style)

export const MINING_ZONES = {
  zone_abandoned_coal: {
    id: 'zone_abandoned_coal',
    name: '古魯丁煤礦坑道',
    icon: '⛏️',
    minLevel: 15,
    difficulty: 1,
    description: '古老地下礦坑，可開採煤與淺層鐵礦，非常適合新手礦工。',
    availableNodes: ['node_coal_deposit', 'node_crude_iron_pocket', 'node_gravel_strata', 'node_pyrite_cluster'],
    requiredLamp: null,
    baseMineTime: 3300
  },
  zone_mithril_mines: {
    id: 'zone_mithril_mines',
    name: '矮人古代礦山',
    icon: '💎',
    minLevel: 22,
    difficulty: 2,
    description: '由亞丁著名工匠血盟開鑿的迷宮礦道，銀礦豐富並帶有少量米索莉。',
    availableNodes: ['node_pure_iron_seam', 'node_silver_vein', 'node_dense_coal_pillar', 'node_cokes_rock'],
    requiredLamp: 'lamp_oil',
    baseMineTime: 3800
  },
  zone_plains_quarry: {
    id: 'zone_plains_quarry',
    name: 'Pedreira das Colinas de Dion',
    icon: '🪨',
    minLevel: 28,
    difficulty: 3,
    description: '裸露的堅硬變質岩山坡，富含重鐵礦結核與閃亮礦塊。',
    availableNodes: ['node_heavy_iron_boulder', 'node_rich_silver_pocket', 'node_mithril_crust', 'node_quarry_granite'],
    requiredLamp: 'lamp_miner',
    baseMineTime: 4200
  },
  zone_giran_deep_vein: {
    id: 'zone_giran_deep_vein',
    name: 'Veio Profundo das Gargantas de Giran',
    icon: '✨',
    minLevel: 34,
    difficulty: 4,
    description: '地殼壓力形成的裂隙，凝聚著古代米索莉與高級合金礦物。',
    availableNodes: ['node_deep_mithril_lode', 'node_silver_nugget_mother', 'node_cokes_furnace_core', 'node_steel_shale'],
    requiredLamp: 'lamp_miner',
    baseMineTime: 4800
  },
  zone_iron_stronghold: {
    id: 'zone_iron_stronghold',
    name: 'Fosso Glacial de Schuttgart',
    icon: '❄️',
    minLevel: 38,
    difficulty: 5,
    description: '極深冰封礦井，嚴寒使永久凍土下的奧里哈魯根礦脈結晶化。',
    availableNodes: ['node_oriharukon_frozen_vein', 'node_ancient_mithril_cluster', 'node_iron_bedrock', 'node_dense_mineral_mass'],
    requiredLamp: 'lamp_alchemical',
    baseMineTime: 5400
  },
  zone_forge_of_gods: {
    id: 'zone_forge_of_gods',
    name: 'Forja dos Deuses de Goddard',
    icon: '🌋',
    minLevel: 40,
    difficulty: 6,
    description: '鄰近火龍巢穴的灼熱火山洞室，是傳說精金自然露出的唯一地點。',
    availableNodes: ['node_adamantite_core_rock', 'node_oriharukon_radiant_geode', 'node_magma_tempered_slag', 'node_primordial_bedrock'],
    requiredLamp: 'lamp_crystal',
    baseMineTime: 6200
  }
};

export function getMiningZonesList() {
  return Object.values(MINING_ZONES);
}

export const MINE_HAZARDS = {
  none: { id: 'none', name: '穩定岩層', desc: 'Sem perigos ocultos.' },
  gas_pocket: { id: 'gas_pocket', name: '瓦斯囊', desc: '可燃氣體。重擊可能引發爆炸（造成 10% HP 傷害並額外消耗耐久）。' },
  seismic_fault: { id: 'seismic_fault', name: '地震裂隙', desc: 'Rocha fraturada. Perda de estabilidade acelerada (2x).' },
  dense_crystal: { id: 'dense_crystal', name: 'Veio Cristalino', desc: '純淨水晶；精準採礦可使產量加倍。' }
};

export const MINING_TACTICS = {
  precision: {
    id: 'precision',
    name: 'Cinzelamento Preciso',
    icon: '🎯',
    desc: '沿天然岩縫精準敲擊，+25% 純礦塊機率，穩定度僅下降 5%。',
    timeMult: 1.2,
    qualityBonus: 0.25,
    durabilityCost: 1,
    stabilityLoss: 5
  },
  standard: {
    id: 'standard',
    name: '標準採礦',
    icon: '⛏️',
    desc: 'Ritmo firme e cadenciado de picareta. Rendimento e perda de estabilidade moderados (-12%).',
    timeMult: 1.0,
    qualityBonus: 0.0,
    durabilityCost: 1,
    stabilityLoss: 12
  },
  heavy: {
    id: 'heavy',
    name: 'Golpe Demolidor',
    icon: '💥',
    desc: '以強力敲擊快速破壞外層，時間 -35%，但穩定度大幅下降（-28%），也有瓦斯爆炸風險。',
    timeMult: 0.65,
    qualityBonus: -0.15,
    durabilityCost: 1,
    stabilityLoss: 28
  },
  probe: {
    id: 'probe',
    name: '聲波探勘',
    icon: '🔍',
    desc: '不震動礦坑即可偵測礦脈危險。',
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
    id: 'node_coal_deposit', name: '淺層煤礦脈', icon: '⚫', rarity: 'common',
    desc: '容易碎裂的煤礦層。',
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
    id: 'node_gravel_strata', name: 'Estrato Arenoso de Cascalho', icon: '⛏️', rarity: 'common',
    desc: '由多種富礦沉積物形成的混合礦床。',
    yields: { primary: 'coal', primaryQty: 2, secondary: 'iron_ore', secondaryQty: 2 },
    baseTime: 3100, xpReward: 7, zones: ['zone_abandoned_coal']
  },
  node_pyrite_cluster: {
    id: 'node_pyrite_cluster', name: 'Agregado de Pirita Bruta', icon: '🪙', rarity: 'common',
    desc: '伴隨高密度鐵礦囊出現的金色水晶。',
    yields: { primary: 'iron_ore', primaryQty: 4, secondary: 'coal', secondaryQty: 1 },
    baseTime: 3500, xpReward: 10, zones: ['zone_abandoned_coal']
  },

  // Incomum
  node_pure_iron_seam: {
    id: 'node_pure_iron_seam', name: '矮人鐵礦脈', icon: '⚙️', rarity: 'uncommon',
    desc: '在山腹深處開採出的連續高密度礦脈。',
    yields: { primary: 'iron_ore', primaryQty: 5, secondary: 'cokes', secondaryQty: 1 },
    baseTime: 3800, xpReward: 18, zones: ['zone_mithril_mines']
  },
  node_silver_vein: {
    id: 'node_silver_vein', name: 'Veio Reluzente de Prata', icon: '🥈', rarity: 'uncommon',
    desc: 'Fita prateada brilhando contra as paredes de pedra escura.',
    yields: { primary: 'silver_nugget', primaryQty: 2, secondary: 'iron_ore', secondaryQty: 2 },
    baseTime: 4000, xpReward: 22, zones: ['zone_mithril_mines']
  },
  node_dense_coal_pillar: {
    id: 'node_dense_coal_pillar', name: 'Coluna de Antracito Puro', icon: '🪨', rarity: 'uncommon',
    desc: '燃燒乾淨且熱值較高的化石煤。',
    yields: { primary: 'coal', primaryQty: 6, secondary: 'cokes', secondaryQty: 1 },
    baseTime: 3900, xpReward: 20, zones: ['zone_mithril_mines']
  },
  node_cokes_rock: {
    id: 'node_cokes_rock', name: '天然焦炭層', icon: '🔥', rarity: 'uncommon',
    desc: '因接近地熱裂隙而被高溫煅燒的煤結核。',
    yields: { primary: 'cokes', primaryQty: 2, secondary: 'iron_ore', secondaryQty: 3 },
    baseTime: 4100, xpReward: 24, zones: ['zone_mithril_mines']
  },

  // Raro
  node_heavy_iron_boulder: {
    id: 'node_heavy_iron_boulder', name: 'Megalito de Hematita de Dion', icon: '🛡️', rarity: 'rare',
    desc: '高礦物密度、難以擊碎的礦塊。',
    yields: { primary: 'iron_ore', primaryQty: 8, secondary: 'steel', secondaryQty: 1 },
    baseTime: 4400, xpReward: 44, zones: ['zone_plains_quarry']
  },
  node_rich_silver_pocket: {
    id: 'node_rich_silver_pocket', name: '高純度銀礦囊', icon: '✨', rarity: 'rare',
    desc: '晶體純度極高的銀礦晶洞。',
    yields: { primary: 'silver_nugget', primaryQty: 4, secondary: 'iron_ore', secondaryQty: 4 },
    baseTime: 4600, xpReward: 48, zones: ['zone_plains_quarry']
  },
  node_deep_mithril_lode: {
    id: 'node_deep_mithril_lode', name: '深層米索莉礦脈', icon: '💎', rarity: 'rare',
    desc: '帶銀藍色澤的粗米索莉礦石。',
    yields: { primary: 'mithril_ore', primaryQty: 2, secondary: 'silver_nugget', secondaryQty: 2 },
    baseTime: 4900, xpReward: 55, zones: ['zone_giran_deep_vein']
  },
  node_cokes_furnace_core: {
    id: 'node_cokes_furnace_core', name: 'Cerne de Rocha Calcinada', icon: '🌋', rarity: 'rare',
    desc: '可承受 C 級鍛造溫度的礦物。',
    yields: { primary: 'cokes', primaryQty: 3, secondary: 'steel', secondaryQty: 1 },
    baseTime: 4700, xpReward: 52, zones: ['zone_giran_deep_vein']
  },

  // Épico
  node_oriharukon_frozen_vein: {
    id: 'node_oriharukon_frozen_vein', name: 'Veio Dourado de Oriharukon', icon: '🌟', rarity: 'epic',
    desc: '鑲嵌在修加特花崗岩中的金色神秘金屬絲。',
    yields: { primary: 'oriharukon_ore', primaryQty: 2, secondary: 'mithril_ore', secondaryQty: 2 },
    baseTime: 5400, xpReward: 95, zones: ['zone_iron_stronghold']
  },
  node_ancient_mithril_cluster: {
    id: 'node_ancient_mithril_cluster', name: 'Ninho de Mithril Ancestral', icon: '🔷', rarity: 'epic',
    desc: '具有極高魔力傳導性的巨大米索莉結晶。',
    yields: { primary: 'mithril_ore', primaryQty: 4, secondary: 'oriharukon_ore', secondaryQty: 1 },
    baseTime: 5500, xpReward: 105, zones: ['zone_iron_stronghold']
  },

  // Lendário
  node_adamantite_core_rock: {
    id: 'node_adamantite_core_rock', name: '原初精金巨岩', icon: '⚡', rarity: 'legendary',
    desc: '埋藏於諸神熔爐下方的隕石碎片，硬度無可匹敵。',
    yields: { primary: 'adamantite', primaryQty: 2, secondary: 'oriharukon_ore', secondaryQty: 3 },
    baseTime: 6200, xpReward: 260, zones: ['zone_forge_of_gods']
  },
  node_oriharukon_radiant_geode: {
    id: 'node_oriharukon_radiant_geode', name: 'Geodo Radiante de Oriharukon', icon: '👑', rarity: 'legendary',
    desc: '充滿原初黃金水晶的巨大火山晶洞。',
    yields: { primary: 'oriharukon_ore', primaryQty: 4, secondary: 'adamantite', secondaryQty: 1 },
    baseTime: 6400, xpReward: 300, zones: ['zone_forge_of_gods']
  }
};

export const PICKAXES_CATALOG = {
  pickaxe_none: {
    id: 'pickaxe_none',
    name: '粗製銅鎬',
    grade: 'none',
    icon: '⛏️',
    minMiningLevel: 1,
    durabilityMax: 50,
    repairCost: 500,
    buyPrice: 0,
    qualityBonus: 0.0,
    desc: '以青銅鎬頭與普通木柄製成的基礎工具。'
  },
  pickaxe_d: {
    id: 'pickaxe_d',
    name: '矮人鐵鎬',
    grade: 'd',
    icon: '⚒️',
    minMiningLevel: 3,
    durabilityMax: 120,
    repairCost: 2500,
    buyPrice: 15000,
    qualityBonus: 0.15,
    desc: '由礦山大師淬鍊打造，+15% 純礦石機率。'
  },
  pickaxe_c: {
    id: 'pickaxe_c',
    name: '強化鋼鎬',
    grade: 'c',
    icon: '✨',
    minMiningLevel: 8,
    durabilityMax: 250,
    repairCost: 7500,
    buyPrice: 60000,
    qualityBonus: 0.30,
    desc: '斜刃設計可劈開花崗岩而不破壞稀有礦脈（+30% 純度）。'
  },
  pickaxe_b: {
    id: 'pickaxe_b',
    name: '高壓米索莉鎬',
    grade: 'b',
    icon: '💎',
    minMiningLevel: 15,
    durabilityMax: 450,
    repairCost: 20000,
    buyPrice: 200000,
    qualityBonus: 0.50,
    desc: '能輕鬆開採深層米索莉與奧里哈魯根礦脈（+50% 純度）。'
  },
  pickaxe_a: {
    id: 'pickaxe_a',
    name: '帝國泰坦鍛造鑽',
    grade: 'a',
    icon: '👑',
    minMiningLevel: 25,
    durabilityMax: 800,
    repairCost: 60000,
    buyPrice: 750000,
    qualityBonus: 0.80,
    desc: '受馬普勒祝福的傑作，可鑽穿精金礦塊（+80% 純度）。'
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
    desc: 'Ilumina as galerias escuras, aumentando o ritmo dos golpes (+15% velocidade).'
  },
  lamp_miner: {
    id: 'lamp_miner',
    name: '矮人電石燈',
    icon: '🔦',
    buyPrice: 350,
    rarityBoost: 'rare',
    speedBoost: 1.25,
    desc: 'Chama brilhante que revela o brilho sutil de veios de prata e mithril.'
  },
  lamp_alchemical: {
    id: 'lamp_alchemical',
    name: '鍊金鬼火燈',
    icon: '🧪',
    buyPrice: 1000,
    rarityBoost: 'epic',
    speedBoost: 1.40,
    desc: '能感應奧里哈魯根天然磁性的幽光燈。'
  },
  lamp_crystal: {
    id: 'lamp_crystal',
    name: 'Cristal da Chama Eterna de Goddard',
    icon: '🔮',
    buyPrice: 3000,
    rarityBoost: 'legendary',
    speedBoost: 1.60,
    desc: 'Chama que nunca se apaga sob os gases da Forja dos Deuses, avistando Adamantite.'
  }
};
