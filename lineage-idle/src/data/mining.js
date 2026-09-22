// mining.js — Catálogo de Dados da Profissão de Mineração & Veios de Aden (Lineage II Style)

export const MINING_ZONES = {
  zone_abandoned_coal: {
    id: 'zone_abandoned_coal',
    name: '古魯丁煤礦坑道',
    icon: '⛏️',
    minLevel: 15,
    difficulty: 1,
    description: 'Antigas galerias subterrâneas de extração de combustível fóssil e ferro superficial. Ideal para novos mineradores.',
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
    description: 'Túneis labirínticos escavados pelos maiores clãs artífices de Aden. Veios abundantes de prata e traços de mithril.',
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
    description: 'Encostas rochosas abertas com rochas metamórficas duras. Ricas em nódulos de ferro pesado e pepitas reluzentes.',
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
    description: 'Fendas tectônicas onde a pressão da terra condensou minerais raros de Mithril Ancestral e ligas nobres.',
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
    description: 'Poços gelados de alta profundidade. O frio extremo cristalizou veios dourados de Oriharukon sob o permafrost.',
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
    description: 'Câmaras vulcânicas incandescentes próximas ao covil dos dragões de fogo. Único local onde o lendário Adamantite aflora.',
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
  gas_pocket: { id: 'gas_pocket', name: '瓦斯囊', desc: '可燃性瓦斯，重擊可能引發爆炸（造成 10% HP 傷害並額外消耗工具耐久）。' },
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
    desc: 'Camadas de carvão mineral fáceis de esfarelar.',
    yields: { primary: 'coal', primaryQty: 3, secondary: 'iron_ore', secondaryQty: 1 },
    baseTime: 3200, xpReward: 6, zones: ['zone_abandoned_coal']
  },
  node_crude_iron_pocket: {
    id: 'node_crude_iron_pocket', name: '粗鐵礦結核', icon: '🪨', rarity: 'common',
    desc: 'Rocha avermelhada rica em óxido de ferro.',
    yields: { primary: 'iron_ore', primaryQty: 3, secondary: 'coal', secondaryQty: 1 },
    baseTime: 3300, xpReward: 8, zones: ['zone_abandoned_coal']
  },
  node_gravel_strata: {
    id: 'node_gravel_strata', name: '砂礫礦層', icon: '⛏️', rarity: 'common',
    desc: 'Depósito misto de sedimentos ricos em minérios.',
    yields: { primary: 'coal', primaryQty: 2, secondary: 'iron_ore', secondaryQty: 2 },
    baseTime: 3100, xpReward: 7, zones: ['zone_abandoned_coal']
  },
  node_pyrite_cluster: {
    id: 'node_pyrite_cluster', name: '粗黃鐵礦聚合體', icon: '🪙', rarity: 'common',
    desc: 'Cristais dourados que acompanham bolsões de ferro de alta densidade.',
    yields: { primary: 'iron_ore', primaryQty: 4, secondary: 'coal', secondaryQty: 1 },
    baseTime: 3500, xpReward: 10, zones: ['zone_abandoned_coal']
  },

  // Incomum
  node_pure_iron_seam: {
    id: 'node_pure_iron_seam', name: '矮人鐵礦帶', icon: '⚙️', rarity: 'uncommon',
    desc: 'Veio contínuo e denso escavado nas profundezas das montanhas.',
    yields: { primary: 'iron_ore', primaryQty: 5, secondary: 'cokes', secondaryQty: 1 },
    baseTime: 3800, xpReward: 18, zones: ['zone_mithril_mines']
  },
  node_silver_vein: {
    id: 'node_silver_vein', name: '閃耀銀礦脈', icon: '🥈', rarity: 'uncommon',
    desc: 'Fita prateada brilhando contra as paredes de pedra escura.',
    yields: { primary: 'silver_nugget', primaryQty: 2, secondary: 'iron_ore', secondaryQty: 2 },
    baseTime: 4000, xpReward: 22, zones: ['zone_mithril_mines']
  },
  node_dense_coal_pillar: {
    id: 'node_dense_coal_pillar', name: '純無煙煤柱', icon: '🪨', rarity: 'uncommon',
    desc: 'Carvão fóssil de queima limpa e poder calorífico superior.',
    yields: { primary: 'coal', primaryQty: 6, secondary: 'cokes', secondaryQty: 1 },
    baseTime: 3900, xpReward: 20, zones: ['zone_mithril_mines']
  },
  node_cokes_rock: {
    id: 'node_cokes_rock', name: '天然焦炭層', icon: '🔥', rarity: 'uncommon',
    desc: 'Nódulo de carvão calcinado pela proximidade de fendas térmicas.',
    yields: { primary: 'cokes', primaryQty: 2, secondary: 'iron_ore', secondaryQty: 3 },
    baseTime: 4100, xpReward: 24, zones: ['zone_mithril_mines']
  },

  // Raro
  node_heavy_iron_boulder: {
    id: 'node_heavy_iron_boulder', name: '狄恩赤鐵巨岩', icon: '🛡️', rarity: 'rare',
    desc: 'Bloco de alta densidade mineral difícil de quebrar.',
    yields: { primary: 'iron_ore', primaryQty: 8, secondary: 'steel', secondaryQty: 1 },
    baseTime: 4400, xpReward: 44, zones: ['zone_plains_quarry']
  },
  node_rich_silver_pocket: {
    id: 'node_rich_silver_pocket', name: '高純銀礦囊', icon: '✨', rarity: 'rare',
    desc: 'Geodo de prata de excepcional pureza cristalina.',
    yields: { primary: 'silver_nugget', primaryQty: 4, secondary: 'iron_ore', secondaryQty: 4 },
    baseTime: 4600, xpReward: 48, zones: ['zone_plains_quarry']
  },
  node_deep_mithril_lode: {
    id: 'node_deep_mithril_lode', name: '深層米索莉礦脈', icon: '💎', rarity: 'rare',
    desc: 'Minério de mithril bruto com tons azulados prateados.',
    yields: { primary: 'mithril_ore', primaryQty: 2, secondary: 'silver_nugget', secondaryQty: 2 },
    baseTime: 4900, xpReward: 55, zones: ['zone_giran_deep_vein']
  },
  node_cokes_furnace_core: {
    id: 'node_cokes_furnace_core', name: '煅燒岩芯', icon: '🌋', rarity: 'rare',
    desc: 'Mineralização que suporta as temperaturas de forja C-Grade.',
    yields: { primary: 'cokes', primaryQty: 3, secondary: 'steel', secondaryQty: 1 },
    baseTime: 4700, xpReward: 52, zones: ['zone_giran_deep_vein']
  },

  // Épico
  node_oriharukon_frozen_vein: {
    id: 'node_oriharukon_frozen_vein', name: '奧里哈魯根金色礦脈', icon: '🌟', rarity: 'epic',
    desc: 'Filamentos áureos de metal místico incrustados no granito de Schuttgart.',
    yields: { primary: 'oriharukon_ore', primaryQty: 2, secondary: 'mithril_ore', secondaryQty: 2 },
    baseTime: 5400, xpReward: 95, zones: ['zone_iron_stronghold']
  },
  node_ancient_mithril_cluster: {
    id: 'node_ancient_mithril_cluster', name: '古代米索莉礦巢', icon: '🔷', rarity: 'epic',
    desc: 'Cristalizações colossais de mithril com altíssima condutividade mágica.',
    yields: { primary: 'mithril_ore', primaryQty: 4, secondary: 'oriharukon_ore', secondaryQty: 1 },
    baseTime: 5500, xpReward: 105, zones: ['zone_iron_stronghold']
  },

  // Lendário
  node_adamantite_core_rock: {
    id: 'node_adamantite_core_rock', name: '太古精金巨石', icon: '⚡', rarity: 'legendary',
    desc: 'Fragmento de meteoro enterrado sob a Forja dos Deuses. Dureza insuperável.',
    yields: { primary: 'adamantite', primaryQty: 2, secondary: 'oriharukon_ore', secondaryQty: 3 },
    baseTime: 6200, xpReward: 260, zones: ['zone_forge_of_gods']
  },
  node_oriharukon_radiant_geode: {
    id: 'node_oriharukon_radiant_geode', name: '閃耀奧里哈魯根晶洞', icon: '👑', rarity: 'legendary',
    desc: 'Geodo vulcânico gigante preenchido de cristais de ouro primordial.',
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
    desc: 'Ferramenta básica com ponta forjada em bronze e cabo de madeira comum.'
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
    desc: 'Forjada com a têmpera dos mestres das minas. +15% de chance de minérios puros.'
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
    desc: 'Lâmina chanfrada que parte o granito sem esfarelar veios raros (+30% pureza).'
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
    desc: 'Penetra filões profundos de mithril e oriharukon com grande facilidade (+50% pureza).'
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
    desc: 'Obra-prima abençoada por Maphr. Capaz de perfurar blocos de adamantite (+80% pureza).'
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
    name: '矮人碳化燈',
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
    desc: 'Luz espectral sensível ao magnetismo natural do Oriharukon.'
  },
  lamp_crystal: {
    id: 'lamp_crystal',
    name: '高達特永恆火焰水晶',
    icon: '🔮',
    buyPrice: 3000,
    rarityBoost: 'legendary',
    speedBoost: 1.60,
    desc: 'Chama que nunca se apaga sob os gases da Forja dos Deuses, avistando Adamantite.'
  }
};
