// gathering.js — Catálogo de Dados da Profissão de Coleta Botânica & Flora de Aden (Lineage II Style)

export const GATHERING_ZONES = {
  zone_gludio_fields: {
    id: 'zone_gludio_fields',
    name: 'Campos e Prados de Gludio',
    icon: '🌾',
    minLevel: 15,
    difficulty: 1,
    description: '古魯丁磨坊周圍的開闊草地，富含落枝、野生纖維與常見藥草。',
    availableNodes: ['node_wild_branch', 'node_reed_stem', 'node_cotton_bush', 'node_medicinal_herb'],
    requiredPouch: null,
    baseGatherTime: 3200
  },
  zone_dion_marsh: {
    id: 'zone_dion_marsh',
    name: '狄恩肥沃沼澤',
    icon: '🌿',
    minLevel: 20,
    difficulty: 2,
    description: '潮濕坡地與積水岸邊，盛產富含樹脂的苔蘚、粗麻與纖維根。',
    availableNodes: ['node_hemp_fiber', 'node_marsh_varnish_moss', 'node_swamp_root', 'node_charcoal_bark'],
    requiredPouch: 'pouch_dew',
    baseGatherTime: 3600
  },
  zone_giran_hills: {
    id: 'zone_giran_hills',
    name: 'Colinas e Pomares de Giran',
    icon: '🌳',
    minLevel: 26,
    difficulty: 3,
    description: '陽光充足的林地散布著高級樹木，可取得硬木與製作鍊金黏著劑的樹液。',
    availableNodes: ['node_iron_wood_trunk', 'node_mold_resin_tree', 'node_silver_leaf_herb', 'node_hardened_bark'],
    requiredPouch: 'pouch_herb',
    baseGatherTime: 4000
  },
  zone_oren_woods: {
    id: 'zone_oren_woods',
    name: '歐瑞冰封森林',
    icon: '❄️',
    minLevel: 32,
    difficulty: 4,
    description: 'Pinheiros ancestrais que resistem a nevascas intensas. Resinas densas de lubrificante vegetal e madeira prensada.',
    availableNodes: ['node_frost_pine_core', 'node_lubricant_sap', 'node_glacier_moss', 'node_compressed_timber'],
    requiredPouch: 'pouch_herb',
    baseGatherTime: 4500
  },
  zone_aden_plateau: {
    id: 'zone_aden_plateau',
    name: '亞丁神聖高原',
    icon: '🌸',
    minLevel: 36,
    difficulty: 5,
    description: '沐浴在殷海薩女神光芒中的神聖草原，盛開可提煉植物乙太與恩里亞的聖花。',
    availableNodes: ['node_einhasad_bloom', 'node_enria_spore', 'node_celestial_brier', 'node_golden_branch'],
    requiredPouch: 'pouch_alchemical',
    baseGatherTime: 5000
  },
  zone_goddard_valley: {
    id: 'zone_goddard_valley',
    name: '高達特火山谷',
    icon: '🌋',
    minLevel: 40,
    difficulty: 6,
    description: '適應灼熱硫磺土壤的礦化植物，可產出化石木與植物金屬纖維。',
    availableNodes: ['node_phoenix_petrified_log', 'node_volcanic_ash_stalk', 'node_fire_bloom_core', 'node_adamantine_bark'],
    requiredPouch: 'pouch_crystal',
    baseGatherTime: 5800
  }
};

export function getGatheringZonesList() {
  return Object.values(GATHERING_ZONES);
}

export const GATHERING_TACTICS = {
  delicate: {
    id: 'delicate',
    name: '精準修剪',
    icon: '✂️',
    desc: '耐心採收、不傷根系，+25% 高品質機率，並可避開荊棘與毒素危險。',
    timeMult: 1.2,
    qualityBonus: 0.25,
    durabilityCost: 1
  },
  standard: {
    id: 'standard',
    name: '標準採集',
    icon: '🧺',
    desc: '傳統採集方式，在速度與純度之間取得平衡。',
    timeMult: 1.0,
    qualityBonus: 0.0,
    durabilityCost: 1
  },
  cleave: {
    id: 'cleave',
    name: '快速收割',
    icon: '⚡',
    desc: '以強力動作快速採收，時間 -35%、純度 -15%；遇到荊棘時較危險。',
    timeMult: 0.65,
    qualityBonus: -0.15,
    durabilityCost: 1
  },
  inspect: {
    id: 'inspect',
    name: 'Examinar Broto',
    icon: '🔍',
    desc: '可偵測純度與危險；偵測後再採集可 +20% 純度，且立即完成。',
    timeMult: 0,
    qualityBonus: 0.2,
    durabilityCost: 0
  }
};

export const BOTANICAL_HAZARDS = {
  none: 'Sem perigo.',
  thorn: '尖銳荊棘（快速收割時若處理不當，會損失 5% HP）。',
  toxin: '劇毒孢子（純度 -25%，並造成暫時負面狀態）。',
  resin: '濃稠樹脂（若採集不慎會黏住鐮刀，額外消耗 1 點耐久）。'
};

export const BOTANICAL_SIGNALS = {
  thorn: 'Pequenos espinhos negros pontilham o caule.',
  toxin: '濕潤葉片散發淡淡硫磺霧。',
  resin: '濃厚琥珀樹液在陽光下閃耀。',
  none: '晶瑩露珠點綴著完美花瓣。'
};

export const FLORA_NODES_CATALOG = {
  // Comum
  node_wild_branch: {
    id: 'node_wild_branch', name: '落枝灌木', icon: '🌿', rarity: 'common',
    desc: '柔韌枝條堆積在陽光充足的林間空地。',
    yields: { primary: 'branch', primaryQty: 2, secondary: 'charcoal', secondaryQty: 1 },
    baseTime: 3000, xpReward: 6, zones: ['zone_gludio_fields']
  },
  node_reed_stem: {
    id: 'node_reed_stem', name: '濕地蘆葦', icon: '🌾', rarity: 'common',
    desc: 'Juncos resistentes à beira das nascentes.',
    yields: { primary: 'branch', primaryQty: 3, secondary: 'cord', secondaryQty: 1 },
    baseTime: 3200, xpReward: 8, zones: ['zone_gludio_fields']
  },
  node_cotton_bush: {
    id: 'node_cotton_bush', name: 'Algodoeiro Silvestre', icon: '🌱', rarity: 'common',
    desc: '可直接用於紡織的純棉纖維。',
    yields: { primary: 'cotton_thread', primaryQty: 3, secondary: 'cord', secondaryQty: 1 },
    baseTime: 3000, xpReward: 8, zones: ['zone_gludio_fields']
  },
  node_medicinal_herb: {
    id: 'node_medicinal_herb', name: 'Ervas de Cura de Gludio', icon: '☘️', rarity: 'common',
    desc: '富含芳香纖維的療癒植物。',
    yields: { primary: 'cotton_thread', primaryQty: 2, secondary: 'charcoal', secondaryQty: 2 },
    baseTime: 3400, xpReward: 10, zones: ['zone_gludio_fields']
  },

  // Incomum
  node_hemp_fiber: {
    id: 'node_hemp_fiber', name: '沼澤麻', icon: '🌿', rarity: 'uncommon',
    desc: 'Fibras vegetais de extrema tenacidade encontradas na neblina de Dion.',
    yields: { primary: 'braided_hemp', primaryQty: 2, secondary: 'cord', secondaryQty: 2 },
    baseTime: 3600, xpReward: 18, zones: ['zone_dion_marsh']
  },
  node_marsh_varnish_moss: {
    id: 'node_marsh_varnish_moss', name: 'Musgo Vernizado', icon: '🍃', rarity: 'uncommon',
    desc: '富含天然樹脂油的滴水苔蘚。',
    yields: { primary: 'varnish', primaryQty: 2, secondary: 'braided_hemp', secondaryQty: 1 },
    baseTime: 3800, xpReward: 20, zones: ['zone_dion_marsh']
  },
  node_swamp_root: {
    id: 'node_swamp_root', name: 'Raiz Fibrosa de Dion', icon: '🪴', rarity: 'uncommon',
    desc: '能淨化泥濘水域的深根植物。',
    yields: { primary: 'branch', primaryQty: 4, secondary: 'charcoal', secondaryQty: 2 },
    baseTime: 3600, xpReward: 22, zones: ['zone_dion_marsh']
  },
  node_charcoal_bark: {
    id: 'node_charcoal_bark', name: 'Tronco Queimado Ancestral', icon: '🪵', rarity: 'uncommon',
    desc: '具有高熱值的炭化樹皮。',
    yields: { primary: 'charcoal', primaryQty: 4, secondary: 'branch', secondaryQty: 2 },
    baseTime: 4000, xpReward: 24, zones: ['zone_dion_marsh']
  },

  // Raro
  node_iron_wood_trunk: {
    id: 'node_iron_wood_trunk', name: 'Pau-Ferro Imperial', icon: '🌳', rarity: 'rare',
    desc: '產自奇岩森林、如金屬合金般沉重的木材。',
    yields: { primary: 'compressed_wood', primaryQty: 2, secondary: 'varnish', secondaryQty: 3 },
    baseTime: 4200, xpReward: 42, zones: ['zone_giran_hills']
  },
  node_mold_resin_tree: {
    id: 'node_mold_resin_tree', name: '奇岩鍊金樹脂木', icon: '🌲', rarity: 'rare',
    desc: '會分泌高純度植物膠，可用於鑄造模具。',
    yields: { primary: 'mold_glue', primaryQty: 2, secondary: 'varnish', secondaryQty: 2 },
    baseTime: 4500, xpReward: 46, zones: ['zone_giran_hills']
  },
  node_silver_leaf_herb: {
    id: 'node_silver_leaf_herb', name: '銀葉草', icon: '✨', rarity: 'rare',
    desc: 'Planta luminescente cujas nervuras filtram minerais preciosos do solo.',
    yields: { primary: 'silver_thread', primaryQty: 1, secondary: 'cotton_thread', secondaryQty: 4 },
    baseTime: 4400, xpReward: 50, zones: ['zone_giran_hills']
  },
  node_hardened_bark: {
    id: 'node_hardened_bark', name: 'Casca Escamosa de Giran', icon: '🛡️', rarity: 'rare',
    desc: 'Cascas espessas empregadas no forro interno de escudos.',
    yields: { primary: 'compressed_wood', primaryQty: 2, secondary: 'charcoal', secondaryQty: 4 },
    baseTime: 4300, xpReward: 52, zones: ['zone_giran_hills']
  },

  // Épico
  node_frost_pine_core: {
    id: 'node_frost_pine_core', name: 'Cerne do Pinheiro Glacial', icon: '❄️', rarity: 'epic',
    desc: 'Cerne congelado imune ao apodrecimento colhido na neve de Oren.',
    yields: { primary: 'compressed_wood', primaryQty: 3, secondary: 'mold_lubricant', secondaryQty: 2 },
    baseTime: 4800, xpReward: 85, zones: ['zone_oren_woods']
  },
  node_lubricant_sap: {
    id: 'node_lubricant_sap', name: 'Seiva de Lubrificante de Molde', icon: '🧪', rarity: 'epic',
    desc: 'Composto vegetal viscoso que previne o atrito nas matrizes de armas nobres.',
    yields: { primary: 'mold_lubricant', primaryQty: 2, secondary: 'mold_glue', secondaryQty: 2 },
    baseTime: 5000, xpReward: 95, zones: ['zone_oren_woods']
  },
  node_einhasad_bloom: {
    id: 'node_einhasad_bloom', name: '亞丁殷海薩之花', icon: '🌸', rarity: 'epic',
    desc: '受祝福的花瓣在亞丁陽光下如液態黃金般閃耀。',
    yields: { primary: 'enria', primaryQty: 1, secondary: 'compressed_wood', secondaryQty: 2 },
    baseTime: 5200, xpReward: 110, zones: ['zone_aden_plateau']
  },
  node_enria_spore: {
    id: 'node_enria_spore', name: 'Esporo de Enria Cristalina', icon: '💎', rarity: 'epic',
    desc: '將大地神秘能量凝聚為恩里亞顆粒的神聖真菌。',
    yields: { primary: 'enria', primaryQty: 2, secondary: 'silver_thread', secondaryQty: 2 },
    baseTime: 5400, xpReward: 120, zones: ['zone_aden_plateau']
  },

  // Lendário
  node_phoenix_petrified_log: {
    id: 'node_phoenix_petrified_log', name: '鳳凰石化樹幹', icon: '🔥', rarity: 'legendary',
    desc: '在高達特山峰被原初火焰灼燒卻從未化為灰燼的化石木。',
    yields: { primary: 'compressed_wood', primaryQty: 6, secondary: 'enria', secondaryQty: 3 },
    baseTime: 6000, xpReward: 250, zones: ['zone_goddard_valley']
  },
  node_adamantine_bark: {
    id: 'node_adamantine_bark', name: 'Casca Mineralizada de Adamantite', icon: '⚡', rarity: 'legendary',
    desc: '含有宇宙礦脈的植物外殼。',
    yields: { primary: 'enria', primaryQty: 3, secondary: 'compressed_wood', secondaryQty: 4 },
    baseTime: 6200, xpReward: 300, zones: ['zone_goddard_valley']
  }
};

export const SICKLES_CATALOG = {
  sickle_none: {
    id: 'sickle_none',
    name: '粗製修枝鐮刀',
    grade: 'none',
    icon: '🌾',
    minGatheringLevel: 1,
    durabilityMax: 50,
    repairCost: 500,
    buyPrice: 0,
    qualityBonus: 0.0,
    desc: '用於切割灌木與矮樹叢的簡易彎刃。'
  },
  sickle_d: {
    id: 'sickle_d',
    name: '古魯丁強化鐮刀',
    grade: 'd',
    icon: '🌱',
    minGatheringLevel: 3,
    durabilityMax: 120,
    repairCost: 2500,
    buyPrice: 15000,
    qualityBonus: 0.15,
    desc: '鄉間工坊淬鍊的鋼製鐮刀，+15% 純淨採集物機率。'
  },
  sickle_c: {
    id: 'sickle_c',
    name: '狄恩植物鐮刀',
    grade: 'c',
    icon: '✨',
    minGatheringLevel: 8,
    durabilityMax: 250,
    repairCost: 7500,
    buyPrice: 60000,
    qualityBonus: 0.30,
    desc: '細鋸齒米索莉刀刃，不會壓碎莖部（+30% 純度）。'
  },
  sickle_b: {
    id: 'sickle_b',
    name: '藥草大師鐮刀',
    grade: 'b',
    icon: '🍃',
    minGatheringLevel: 15,
    durabilityMax: 450,
    repairCost: 20000,
    buyPrice: 200000,
    qualityBonus: 0.50,
    desc: '奇岩菁英鍊金師使用的工具，+50% 植物純度。'
  },
  sickle_a: {
    id: 'sickle_a',
    name: '帝國神聖採集刃',
    grade: 'a',
    icon: '👑',
    minGatheringLevel: 25,
    durabilityMax: 800,
    repairCost: 60000,
    buyPrice: 750000,
    qualityBonus: 0.80,
    desc: '受祝福的神器，可完整保存乙太特性（+80% 純度）。'
  }
};

export const POUCHES_CATALOG = {
  pouch_dew: {
    id: 'pouch_dew',
    name: 'Bolsa de Orvalho Matinal',
    icon: '💧',
    buyPrice: 100,
    rarityBoost: 'uncommon',
    speedBoost: 1.15,
    desc: '保持纖維新鮮與水分（+15% 速度）。'
  },
  pouch_herb: {
    id: 'pouch_herb',
    name: '鍊金亞麻籃',
    icon: '🧺',
    buyPrice: 350,
    rarityBoost: 'rare',
    speedBoost: 1.25,
    desc: '可避免過度日照，並提高發現稀有樹脂節點的機會。'
  },
  pouch_alchemical: {
    id: 'pouch_alchemical',
    name: '真空保存瓶',
    icon: '🧪',
    buyPrice: 1000,
    rarityBoost: 'epic',
    speedBoost: 1.40,
    desc: '隔絕恩里亞孢子與高級樹液接觸氧氣。'
  },
  pouch_crystal: {
    id: 'pouch_crystal',
    name: '天界乙太甕',
    icon: '🔮',
    buyPrice: 3000,
    rarityBoost: 'legendary',
    speedBoost: 1.60,
    desc: '注入神聖祝福、專門保存鳳凰木材的容器。'
  }
};
