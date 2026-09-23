// gathering.js — Catálogo de Dados da Profissão de Coleta Botânica & Flora de Aden (Lineage II Style)

export const GATHERING_ZONES = {
  zone_gludio_fields: {
    id: 'zone_gludio_fields',
    name: '古魯丁田野與草原',
    icon: '🌾',
    minLevel: 15,
    difficulty: 1,
    description: '古魯丁磨坊周圍的開闊草地，盛產落枝、野生纖維與基礎藥草。',
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
    description: '潮濕山坡與積水岸邊，盛產富含樹脂的苔蘚、粗麻與纖維根。',
    availableNodes: ['node_hemp_fiber', 'node_marsh_varnish_moss', 'node_swamp_root', 'node_charcoal_bark'],
    requiredPouch: 'pouch_dew',
    baseGatherTime: 3600
  },
  zone_giran_hills: {
    id: 'zone_giran_hills',
    name: '奇岩丘陵與果園',
    icon: '🌳',
    minLevel: 26,
    difficulty: 3,
    description: '陽光充足的林地遍布高級樹木，可取得硬木與製作鍊金膠劑的黏稠樹液。',
    availableNodes: ['node_iron_wood_trunk', 'node_mold_resin_tree', 'node_silver_leaf_herb', 'node_hardened_bark'],
    requiredPouch: 'pouch_herb',
    baseGatherTime: 4000
  },
  zone_oren_woods: {
    id: 'zone_oren_woods',
    name: '歐瑞冰霜森林',
    icon: '❄️',
    minLevel: 32,
    difficulty: 4,
    description: '能抵禦暴風雪的古老松木，產出濃稠植物潤滑樹脂與高密度木材。',
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
    description: '沐浴在殷海薩女神光芒下的靈性高原，聖花可提煉植物乙太與恩尼亞精華。',
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
    description: '適應熾熱硫磺土壤的礦化植被，可產出化石木與植物金屬纖維。',
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
    desc: '耐心採收且不傷根部，高品質機率 +25%，並可忽略尖刺與毒素危險。',
    timeMult: 1.2,
    qualityBonus: 0.25,
    durabilityCost: 1
  },
  standard: {
    id: 'standard',
    name: '標準採集',
    icon: '🧺',
    desc: '傳統採集方式，在速度與植物純度間取得平衡。',
    timeMult: 1.0,
    qualityBonus: 0.0,
    durabilityCost: 1
  },
  cleave: {
    id: 'cleave',
    name: '快速收割',
    icon: '⚡',
    desc: '快速強力割取嫩芽，採集時間 -35%、純度 -15%；遇到尖刺時較危險。',
    timeMult: 0.65,
    qualityBonus: -0.15,
    durabilityCost: 1
  },
  inspect: {
    id: 'inspect',
    name: '檢查嫩芽',
    icon: '🔍',
    desc: '顯示純度與危險，之後採集可額外獲得 +20% 純度。立即完成。',
    timeMult: 0,
    qualityBonus: 0.2,
    durabilityCost: 0
  }
};

export const BOTANICAL_HAZARDS = {
  none: '無危險。',
  thorn: '尖銳荊棘（若使用快速收割且處理不慎，會損失 5% 生命值）。',
  toxin: '有毒孢子（純度降低 25%，並造成暫時性負面狀態）。',
  resin: '濃稠樹脂（若處理不慎會黏住鐮刀，額外消耗 1 點耐久度）。'
};

export const BOTANICAL_SIGNALS = {
  thorn: '莖部散布著細小黑色尖刺。',
  toxin: '濕潤葉片散發淡淡硫磺霧氣。',
  resin: '濃稠的琥珀色樹液結節在陽光下閃耀。',
  none: '晶瑩露珠點綴在完整花瓣上。'
};

export const FLORA_NODES_CATALOG = {
  // Comum
  node_wild_branch: {
    id: 'node_wild_branch', name: '落枝灌木', icon: '🌿', rarity: 'common',
    desc: '堆積在陽光林間空地的柔韌樹枝。',
    yields: { primary: 'branch', primaryQty: 2, secondary: 'charcoal', secondaryQty: 1 },
    baseTime: 3000, xpReward: 6, zones: ['zone_gludio_fields']
  },
  node_reed_stem: {
    id: 'node_reed_stem', name: '濕地蘆葦', icon: '🌾', rarity: 'common',
    desc: '生長在泉水邊緣的堅韌蘆葦。',
    yields: { primary: 'branch', primaryQty: 3, secondary: 'cord', secondaryQty: 1 },
    baseTime: 3200, xpReward: 8, zones: ['zone_gludio_fields']
  },
  node_cotton_bush: {
    id: 'node_cotton_bush', name: '野生棉花', icon: '🌱', rarity: 'common',
    desc: '可直接用於紡織的純淨棉絮。',
    yields: { primary: 'cotton_thread', primaryQty: 3, secondary: 'cord', secondaryQty: 1 },
    baseTime: 3000, xpReward: 8, zones: ['zone_gludio_fields']
  },
  node_medicinal_herb: {
    id: 'node_medicinal_herb', name: '古魯丁治療草藥', icon: '☘️', rarity: 'common',
    desc: '富含芳香纖維的療癒植物。',
    yields: { primary: 'cotton_thread', primaryQty: 2, secondary: 'charcoal', secondaryQty: 2 },
    baseTime: 3400, xpReward: 10, zones: ['zone_gludio_fields']
  },

  // Incomum
  node_hemp_fiber: {
    id: 'node_hemp_fiber', name: '沼澤大麻', icon: '🌿', rarity: 'uncommon',
    desc: '在狄恩霧地中採得的極高韌性植物纖維。',
    yields: { primary: 'braided_hemp', primaryQty: 2, secondary: 'cord', secondaryQty: 2 },
    baseTime: 3600, xpReward: 18, zones: ['zone_dion_marsh']
  },
  node_marsh_varnish_moss: {
    id: 'node_marsh_varnish_moss', name: '樹脂苔蘚', icon: '🍃', rarity: 'uncommon',
    desc: '富含天然樹脂油的濕潤苔蘚。',
    yields: { primary: 'varnish', primaryQty: 2, secondary: 'braided_hemp', secondaryQty: 1 },
    baseTime: 3800, xpReward: 20, zones: ['zone_dion_marsh']
  },
  node_swamp_root: {
    id: 'node_swamp_root', name: '狄恩纖維根', icon: '🪴', rarity: 'uncommon',
    desc: '能淨化泥濘水源的深層根系。',
    yields: { primary: 'branch', primaryQty: 4, secondary: 'charcoal', secondaryQty: 2 },
    baseTime: 3600, xpReward: 22, zones: ['zone_dion_marsh']
  },
  node_charcoal_bark: {
    id: 'node_charcoal_bark', name: '古代焦木', icon: '🪵', rarity: 'uncommon',
    desc: '具有極高熱能的碳化樹皮。',
    yields: { primary: 'charcoal', primaryQty: 4, secondary: 'branch', secondaryQty: 2 },
    baseTime: 4000, xpReward: 24, zones: ['zone_dion_marsh']
  },

  // Raro
  node_iron_wood_trunk: {
    id: 'node_iron_wood_trunk', name: '帝國鐵木', icon: '🌳', rarity: 'rare',
    desc: '奇岩森林特有、重量如金屬合金般沉重的木材。',
    yields: { primary: 'compressed_wood', primaryQty: 2, secondary: 'varnish', secondaryQty: 3 },
    baseTime: 4200, xpReward: 42, zones: ['zone_giran_hills']
  },
  node_mold_resin_tree: {
    id: 'node_mold_resin_tree', name: '奇岩鍊金膠樹', icon: '🌲', rarity: 'rare',
    desc: '會分泌高純度植物膠液，可用於鑄造模具。',
    yields: { primary: 'mold_glue', primaryQty: 2, secondary: 'varnish', secondaryQty: 2 },
    baseTime: 4500, xpReward: 46, zones: ['zone_giran_hills']
  },
  node_silver_leaf_herb: {
    id: 'node_silver_leaf_herb', name: '銀葉草', icon: '✨', rarity: 'rare',
    desc: '會發光的植物，其葉脈能從土壤中過濾珍貴礦物。',
    yields: { primary: 'silver_thread', primaryQty: 1, secondary: 'cotton_thread', secondaryQty: 4 },
    baseTime: 4400, xpReward: 50, zones: ['zone_giran_hills']
  },
  node_hardened_bark: {
    id: 'node_hardened_bark', name: '奇岩鱗皮樹皮', icon: '🛡️', rarity: 'rare',
    desc: '厚實樹皮，可用於盾牌內襯。',
    yields: { primary: 'compressed_wood', primaryQty: 2, secondary: 'charcoal', secondaryQty: 4 },
    baseTime: 4300, xpReward: 52, zones: ['zone_giran_hills']
  },

  // Épico
  node_frost_pine_core: {
    id: 'node_frost_pine_core', name: '冰松心材', icon: '❄️', rarity: 'epic',
    desc: '從歐瑞雪地取得、幾乎不會腐朽的冰凍心材。',
    yields: { primary: 'compressed_wood', primaryQty: 3, secondary: 'mold_lubricant', secondaryQty: 2 },
    baseTime: 4800, xpReward: 85, zones: ['zone_oren_woods']
  },
  node_lubricant_sap: {
    id: 'node_lubricant_sap', name: '模具潤滑樹液', icon: '🧪', rarity: 'epic',
    desc: '黏稠植物化合物，可降低高階武器模具的摩擦。',
    yields: { primary: 'mold_lubricant', primaryQty: 2, secondary: 'mold_glue', secondaryQty: 2 },
    baseTime: 5000, xpReward: 95, zones: ['zone_oren_woods']
  },
  node_einhasad_bloom: {
    id: 'node_einhasad_bloom', name: '亞丁殷海薩之花', icon: '🌸', rarity: 'epic',
    desc: '受祝聖的花瓣，在亞丁陽光下如液態黃金般閃耀。',
    yields: { primary: 'enria', primaryQty: 1, secondary: 'compressed_wood', secondaryQty: 2 },
    baseTime: 5200, xpReward: 110, zones: ['zone_aden_plateau']
  },
  node_enria_spore: {
    id: 'node_enria_spore', name: '水晶恩里亞孢子', icon: '💎', rarity: 'epic',
    desc: '能將大地神秘能量凝聚成恩尼亞顆粒的神聖真菌。',
    yields: { primary: 'enria', primaryQty: 2, secondary: 'silver_thread', secondaryQty: 2 },
    baseTime: 5400, xpReward: 120, zones: ['zone_aden_plateau']
  },

  // Lendário
  node_phoenix_petrified_log: {
    id: 'node_phoenix_petrified_log', name: '鳳凰石化木', icon: '🔥', rarity: 'legendary',
    desc: '曾在高達特山巔承受太古烈焰卻未化為灰燼的化石木。',
    yields: { primary: 'compressed_wood', primaryQty: 6, secondary: 'enria', secondaryQty: 3 },
    baseTime: 6000, xpReward: 250, zones: ['zone_goddard_valley']
  },
  node_adamantine_bark: {
    id: 'node_adamantine_bark', name: '精金礦化樹皮', icon: '⚡', rarity: 'legendary',
    desc: '富含宇宙礦脈成分的特殊植物外殼。',
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
    desc: '用於砍除灌木與草叢的簡易彎刃工具。'
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
    desc: '在鄉村工坊淬鍊的鋼製工具，純淨收成機率 +15%。'
  },
  sickle_c: {
    id: 'sickle_c',
    name: '狄恩植物學鐮刀',
    grade: 'c',
    icon: '✨',
    minGatheringLevel: 8,
    durabilityMax: 250,
    repairCost: 7500,
    buyPrice: 60000,
    qualityBonus: 0.30,
    desc: '細鋸齒米索莉刃線，不會壓壞植物莖部（純度 +30%）。'
  },
  sickle_b: {
    id: 'sickle_b',
    name: '草藥大師鐮刀',
    grade: 'b',
    icon: '🍃',
    minGatheringLevel: 15,
    durabilityMax: 450,
    repairCost: 20000,
    buyPrice: 200000,
    qualityBonus: 0.50,
    desc: '奇岩菁英鍊金術師使用的工具，植物純度 +50%。'
  },
  sickle_a: {
    id: 'sickle_a',
    name: '帝國神聖收割刃',
    grade: 'a',
    icon: '👑',
    minGatheringLevel: 25,
    durabilityMax: 800,
    repairCost: 60000,
    buyPrice: 750000,
    qualityBonus: 0.80,
    desc: '受祝聖的神器，可完整保存乙太特性（純度 +80%）。'
  }
};

export const POUCHES_CATALOG = {
  pouch_dew: {
    id: 'pouch_dew',
    name: '晨露袋',
    icon: '💧',
    buyPrice: 100,
    rarityBoost: 'uncommon',
    speedBoost: 1.15,
    desc: '讓植物纖維保持新鮮與含水狀態（速度 +15%）。'
  },
  pouch_herb: {
    id: 'pouch_herb',
    name: '鍊金亞麻籃',
    icon: '🧺',
    buyPrice: 350,
    rarityBoost: 'rare',
    speedBoost: 1.25,
    desc: '隔絕過強日照，並提高稀有樹脂節點出現機率。'
  },
  pouch_alchemical: {
    id: 'pouch_alchemical',
    name: '真空保存瓶',
    icon: '🧪',
    buyPrice: 1000,
    rarityBoost: 'epic',
    speedBoost: 1.40,
    desc: '隔絕恩尼亞孢子與高階樹液，避免接觸氧氣。'
  },
  pouch_crystal: {
    id: 'pouch_crystal',
    name: '天界乙太甕',
    icon: '🔮',
    buyPrice: 3000,
    rarityBoost: 'legendary',
    speedBoost: 1.60,
    desc: '注入神聖祝福的容器，可安全保存鳳凰木材。'
  }
};
