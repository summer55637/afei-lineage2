// fishing.js — Catálogo de Dados do Sistema de Pesca de Aden (Lineage II Style)

export const FISHING_ZONES = {
  zone_talking_island: {
    id: "zone_talking_island",
    name: "說話之島海岸",
    icon: "🌊",
    minLevel: 15,
    difficulty: 1,
    description: "平靜水域，非常適合初學者，常見魚群十分豐富。",
    availableFish: ["fish_carp", "fish_goby", "fish_starfish", "fish_talking_squid"],
    requiredBait: null,
    baseCatchTime: 3000
  },
  zone_gludin: {
    id: "zone_gludin",
    name: "古魯丁港口",
    icon: "⛵",
    minLevel: 18,
    difficulty: 2,
    description: "繁忙的港口，魚群會聚集在商船與貨物殘餘附近覓食。",
    availableFish: ["fish_carp", "fish_gludin_puffer", "fish_octopus", "fish_ray", "fish_gludin_shark"],
    requiredBait: "bait_worm",
    baseCatchTime: 3500
  },
  zone_elven_village: {
    id: "zone_elven_village",
    name: "精靈村湖泊",
    icon: "🏞️",
    minLevel: 22,
    difficulty: 3,
    description: "受伊娃女神祝福的清澈水域，棲息著許多魔法魚種。",
    availableFish: ["fish_elven_trout", "fish_crystal_salmon", "fish_silver_bass", "fish_elven_goldfish"],
    requiredBait: "bait_lure",
    baseCatchTime: 4000
  },
  zone_dion: {
    id: "zone_dion",
    name: "狄恩河",
    icon: "🦆",
    minLevel: 26,
    difficulty: 4,
    description: "水流強勁，需要熟練技巧；這裡棲息著速度快且強壯的魚類。",
    availableFish: ["fish_dion_eel", "fish_mud_catfish", "fish_dion_pike", "fish_river_crab", "fish_mandragora_fish"],
    requiredBait: "bait_golden",
    baseCatchTime: 4500
  },
  zone_giran: {
    id: "zone_giran",
    name: "奇岩海岸",
    icon: "🌅",
    minLevel: 32,
    difficulty: 5,
    description: "深邃的外海水域，棲息著珍貴、肉食性且兇猛的魚類。",
    availableFish: ["fish_giran_dragonfish", "fish_swordfish", "fish_tuna", "fish_giran_manta", "fish_kraken_tentacle"],
    requiredBait: "bait_golden",
    baseCatchTime: 5000
  },
  zone_innadril: {
    id: "zone_innadril",
    name: "因納得立湖",
    icon: "🏰",
    minLevel: 38,
    difficulty: 6,
    description: "環繞海音城的壯麗翡翠湖泊，深處流傳著古老傳說。",
    availableFish: ["fish_innadril_sunfish", "fish_rainbow_trout", "fish_abyssal_angler", "fish_siren_scale", "fish_water_dragon_fry"],
    requiredBait: "bait_crystal",
    baseCatchTime: 6000
  }
};

export function getFishingZonesList() {
  return Object.values(FISHING_ZONES);
}

export const FIGHT_PROFILES = {
  calm: {
    id: 'calm', name: '平靜',
    staminaMult: 0.8, tensionRate: 1.0, recoverRate: 0.7, burstChance: 0.05,
    desc: '溫馴的魚，容易疲勞，拉力變化容易預測。'
  },
  erratic: {
    id: 'erratic', name: '不規則',
    staminaMult: 1.1, tensionRate: 1.4, recoverRate: 1.1, burstChance: 0.25,
    desc: '會突然改變方向，使魚線張力快速飆升。'
  },
  aggressive: {
    id: 'aggressive', name: '兇猛',
    staminaMult: 1.3, tensionRate: 1.6, recoverRate: 1.0, burstChance: 0.35,
    desc: '持續猛烈拉扯魚線，需要精準控制煞車。'
  },
  deepDiver: {
    id: 'deepDiver', name: '深潛型',
    staminaMult: 1.5, tensionRate: 1.2, recoverRate: 1.4, burstChance: 0.15,
    desc: '會向深處下潛，若放線過多就會恢復體力。'
  },
  surfaceRunner: {
    id: 'surfaceRunner', name: '水面疾行型',
    staminaMult: 1.0, tensionRate: 1.5, recoverRate: 0.9, burstChance: 0.40,
    desc: '在水面高速衝刺，可能扯斷魚線。'
  },
  heavy: {
    id: 'heavy', name: '重型巨物',
    staminaMult: 1.8, tensionRate: 1.8, recoverRate: 1.1, burstChance: 0.10,
    desc: '重量驚人且耐力極高，每拉近一公尺都十分吃力。'
  },
  burstRunner: {
    id: 'burstRunner', name: '爆發型',
    staminaMult: 1.2, tensionRate: 2.2, recoverRate: 1.3, burstChance: 0.50,
    desc: '平靜與猛烈爆衝交替出現，準備不足的魚線很容易被扯斷。'
  }
};

export const FISH_CATALOG = {
  // Comum (50%)
  fish_carp: {
    id: "fish_carp", name: "巡游鯉", icon: "🐟", rarity: "common",
    fightProfile: "calm", baseStamina: 40,
    baseWeight: { min: 0.5, max: 2.0 }, xpReward: 15, sellPrice: 20,
    exchangeRate: 5, materialReward: "branch", materialName: "野生樹枝",
    zones: ["zone_talking_island", "zone_gludin"]
  },
  fish_goby: {
    id: "fish_goby", name: "普通蝦虎魚", icon: "🐠", rarity: "common",
    fightProfile: "calm", baseStamina: 35,
    baseWeight: { min: 0.2, max: 0.8 }, xpReward: 15, sellPrice: 15,
    exchangeRate: 5, materialReward: "leather", materialName: "鞣製皮革",
    zones: ["zone_talking_island"]
  },
  fish_starfish: {
    id: "fish_starfish", name: "海星", icon: "⭐", rarity: "common",
    fightProfile: "calm", baseStamina: 30,
    baseWeight: { min: 0.1, max: 0.5 }, xpReward: 18, sellPrice: 25,
    exchangeRate: 5, materialReward: "cotton_thread", materialName: "棉線",
    zones: ["zone_talking_island"]
  },
  fish_mud_catfish: {
    id: "fish_mud_catfish", name: "泥鯰", icon: "🐟", rarity: "common",
    fightProfile: "heavy", baseStamina: 60,
    baseWeight: { min: 2.0, max: 5.0 }, xpReward: 25, sellPrice: 40,
    exchangeRate: 5, materialReward: "bone", materialName: "動物骨頭",
    zones: ["zone_dion"]
  },
  fish_tuna: {
    id: "fish_tuna", name: "銀鮪魚", icon: "🐟", rarity: "common",
    fightProfile: "heavy", baseStamina: 70,
    baseWeight: { min: 5.0, max: 15.0 }, xpReward: 30, sellPrice: 60,
    exchangeRate: 5, materialReward: "coal", materialName: "煤礦",
    zones: ["zone_giran"]
  },
  fish_silver_bass: {
    id: "fish_silver_bass", name: "銀鱸", icon: "🐟", rarity: "common",
    fightProfile: "erratic", baseStamina: 50,
    baseWeight: { min: 1.0, max: 3.5 }, xpReward: 22, sellPrice: 35,
    exchangeRate: 5, materialReward: "charcoal", materialName: "木炭",
    zones: ["zone_elven_village"]
  },

  // Incomum (25%)
  fish_talking_squid: {
    id: "fish_talking_squid", name: "說話之島魷魚", icon: "🦑", rarity: "uncommon",
    fightProfile: "erratic", baseStamina: 55,
    baseWeight: { min: 0.5, max: 1.5 }, xpReward: 35, sellPrice: 50,
    exchangeRate: 3, materialReward: "charcoal", materialName: "木炭",
    zones: ["zone_talking_island"]
  },
  fish_gludin_puffer: {
    id: "fish_gludin_puffer", name: "古魯丁河豚", icon: "🐡", rarity: "uncommon",
    fightProfile: "erratic", baseStamina: 65,
    baseWeight: { min: 1.0, max: 2.5 }, xpReward: 45, sellPrice: 70,
    exchangeRate: 3, materialReward: "suede", materialName: "柔軟麂皮",
    zones: ["zone_gludin"]
  },
  fish_elven_trout: {
    id: "fish_elven_trout", name: "精靈鱒魚", icon: "🐠", rarity: "uncommon",
    fightProfile: "calm", baseStamina: 50,
    baseWeight: { min: 1.5, max: 3.0 }, xpReward: 50, sellPrice: 90,
    exchangeRate: 3, materialReward: "iron_ore", materialName: "鐵礦石",
    zones: ["zone_elven_village"]
  },
  fish_river_crab: {
    id: "fish_river_crab", name: "河蟹", icon: "🦀", rarity: "uncommon",
    fightProfile: "calm", baseStamina: 55,
    baseWeight: { min: 0.3, max: 1.2 }, xpReward: 55, sellPrice: 110,
    exchangeRate: 3, materialReward: "crafted_leather", materialName: "加工皮革",
    zones: ["zone_dion"]
  },
  fish_swordfish: {
    id: "fish_swordfish", name: "劍魚", icon: "🗡️", rarity: "uncommon",
    fightProfile: "surfaceRunner", baseStamina: 80,
    baseWeight: { min: 20.0, max: 45.0 }, xpReward: 70, sellPrice: 150,
    exchangeRate: 3, materialReward: "silver_nugget", materialName: "銀礦塊",
    zones: ["zone_giran"]
  },
  fish_rainbow_trout: {
    id: "fish_rainbow_trout", name: "虹鱒", icon: "🐠", rarity: "uncommon",
    fightProfile: "surfaceRunner", baseStamina: 75,
    baseWeight: { min: 2.0, max: 6.0 }, xpReward: 80, sellPrice: 200,
    exchangeRate: 3, materialReward: "steel", materialName: "鍛造鋼",
    zones: ["zone_innadril"]
  },

  // Raro (15%)
  fish_octopus: {
    id: "fish_octopus", name: "暗影章魚", icon: "🐙", rarity: "rare",
    fightProfile: "deepDiver", baseStamina: 95,
    baseWeight: { min: 3.0, max: 8.0 }, xpReward: 90, sellPrice: 120,
    exchangeRate: 2, materialReward: "mithril_ore", materialName: "米索莉礦石",
    zones: ["zone_gludin"]
  },
  fish_crystal_salmon: {
    id: "fish_crystal_salmon", name: "水晶鮭魚", icon: "🐟", rarity: "rare",
    fightProfile: "surfaceRunner", baseStamina: 100,
    baseWeight: { min: 5.0, max: 12.0 }, xpReward: 110, sellPrice: 180,
    exchangeRate: 2, materialReward: "coal", materialName: "煤礦",
    zones: ["zone_elven_village"]
  },
  fish_dion_eel: {
    id: "fish_dion_eel", name: "狄恩鰻魚", icon: "🐍", rarity: "rare",
    fightProfile: "erratic", baseStamina: 90,
    baseWeight: { min: 1.5, max: 4.5 }, xpReward: 120, sellPrice: 220,
    exchangeRate: 2, materialReward: "braided_hemp", materialName: "編織大麻",
    zones: ["zone_dion"]
  },
  fish_giran_manta: {
    id: "fish_giran_manta", name: "奇岩鬼蝠魟", icon: "🦇", rarity: "rare",
    fightProfile: "deepDiver", baseStamina: 130,
    baseWeight: { min: 50.0, max: 120.0 }, xpReward: 150, sellPrice: 350,
    exchangeRate: 2, materialReward: "silver_mold", materialName: "銀製模具",
    zones: ["zone_giran"]
  },
  fish_abyssal_angler: {
    id: "fish_abyssal_angler", name: "深淵鮟鱇", icon: "🏮", rarity: "rare",
    fightProfile: "deepDiver", baseStamina: 120,
    baseWeight: { min: 8.0, max: 18.0 }, xpReward: 170, sellPrice: 450,
    exchangeRate: 2, materialReward: "mithril_ore", materialName: "米索莉礦石",
    zones: ["zone_innadril"]
  },

  // Épico (8%)
  fish_ray: {
    id: "fish_ray", name: "電鰩", icon: "⚡", rarity: "epic",
    fightProfile: "aggressive", baseStamina: 140,
    baseWeight: { min: 15.0, max: 35.0 }, xpReward: 200, sellPrice: 300,
    exchangeRate: 1, materialReward: "silver_thread", materialName: "銀線",
    zones: ["zone_gludin", "zone_giran"]
  },
  fish_elven_goldfish: {
    id: "fish_elven_goldfish", name: "精靈金魚", icon: "🪙", rarity: "epic",
    fightProfile: "calm", baseStamina: 100,
    baseWeight: { min: 0.5, max: 1.5 }, xpReward: 230, sellPrice: 400,
    exchangeRate: 1, materialReward: "metallic_fiber", materialName: "金屬纖維",
    zones: ["zone_elven_village"]
  },
  fish_mandragora_fish: {
    id: "fish_mandragora_fish", name: "曼陀羅魚", icon: "🌱", rarity: "epic",
    fightProfile: "burstRunner", baseStamina: 135,
    baseWeight: { min: 2.0, max: 5.0 }, xpReward: 260, sellPrice: 550,
    exchangeRate: 1, materialReward: "steel_ingot", materialName: "鋼錠",
    zones: ["zone_dion"]
  },
  fish_giran_dragonfish: {
    id: "fish_giran_dragonfish", name: "奇岩龍魚", icon: "🐉", rarity: "epic",
    fightProfile: "burstRunner", baseStamina: 160,
    baseWeight: { min: 30.0, max: 80.0 }, xpReward: 300, sellPrice: 800,
    exchangeRate: 1, materialReward: "oriharukon_ore", materialName: "奧里哈魯根礦石",
    zones: ["zone_giran"]
  },

  // Lendário (2%)
  fish_gludin_shark: {
    id: "fish_gludin_shark", name: "古魯丁大白鯊", icon: "🦈", rarity: "legendary",
    fightProfile: "aggressive", baseStamina: 200,
    baseWeight: { min: 100.0, max: 300.0 }, xpReward: 400, sellPrice: 1500,
    exchangeRate: 1, materialReward: "oriharukon_ore", materialName: "奧里哈魯根礦石",
    zones: ["zone_gludin"]
  },
  fish_dion_pike: {
    id: "fish_dion_pike", name: "鋼鱗梭魚", icon: "⚜️", rarity: "legendary",
    fightProfile: "aggressive", baseStamina: 190,
    baseWeight: { min: 25.0, max: 60.0 }, xpReward: 500, sellPrice: 2000,
    exchangeRate: 1, materialReward: "steel", materialName: "鍛造鋼",
    zones: ["zone_dion"]
  },
  fish_kraken_tentacle: {
    id: "fish_kraken_tentacle", name: "克拉肯觸手", icon: "🦑", rarity: "legendary",
    fightProfile: "heavy", baseStamina: 240,
    baseWeight: { min: 50.0, max: 150.0 }, xpReward: 650, sellPrice: 4000,
    exchangeRate: 1, materialReward: "silver_mold", materialName: "銀製模具",
    zones: ["zone_giran"]
  },
  fish_innadril_sunfish: {
    id: "fish_innadril_sunfish", name: "因納得立翻車魚", icon: "☀️", rarity: "legendary",
    fightProfile: "deepDiver", baseStamina: 250,
    baseWeight: { min: 400.0, max: 1000.0 }, xpReward: 800, sellPrice: 6000,
    exchangeRate: 1, materialReward: "mithril_ore", materialName: "米索莉礦石",
    zones: ["zone_innadril"]
  },
  fish_siren_scale: {
    id: "fish_siren_scale", name: "海妖之鱗", icon: "🧜‍♀️", rarity: "legendary",
    fightProfile: "burstRunner", baseStamina: 180,
    baseWeight: { min: 0.1, max: 0.5 }, xpReward: 900, sellPrice: 8000,
    exchangeRate: 1, materialReward: "crafted_leather", materialName: "加工皮革",
    zones: ["zone_innadril"]
  },
  fish_water_dragon_fry: {
    id: "fish_water_dragon_fry", name: "水龍幼體", icon: "🐲", rarity: "legendary",
    fightProfile: "heavy", baseStamina: 280,
    baseWeight: { min: 10.0, max: 30.0 }, xpReward: 1200, sellPrice: 10000,
    exchangeRate: 1, materialReward: "adamantite", materialName: "精金塊",
    zones: ["zone_innadril"]
  }
};

export const RODS_CATALOG = {
  rod_none: {
    id: "rod_none", name: "竹製釣竿（初學者）", icon: "🎣", grade: "none", minFishingLevel: 1,
    catchBonus: 1.0, durability: 50, repairCost: 50, buyPrice: 0
  },
  rod_d: {
    id: "rod_d", name: "學徒釣竿（D 級）", icon: "🎣", grade: "d", minFishingLevel: 3,
    catchBonus: 1.15, durability: 100, repairCost: 250, buyPrice: 5000
  },
  rod_c: {
    id: "rod_c", name: "強化釣竿（C 級）", icon: "🎣", grade: "c", minFishingLevel: 8,
    catchBonus: 1.30, durability: 200, repairCost: 750, buyPrice: 25000
  },
  rod_b: {
    id: "rod_b", name: "大師釣竿（B 級）", icon: "🎣", grade: "b", minFishingLevel: 15,
    catchBonus: 1.50, durability: 400, repairCost: 2500, buyPrice: 120000
  },
  rod_a: {
    id: "rod_a", name: "帝國釣竿（A 級）", icon: "🔱", grade: "a", minFishingLevel: 25,
    catchBonus: 1.80, durability: 800, repairCost: 7500, buyPrice: 500000
  }
};

export const BAIT_CATALOG = {
  bait_worm: {
    id: "bait_worm", name: "新鮮蚯蚓", icon: "🪱", buyPrice: 10,
    effectDescription: "價格低廉的基礎魚餌，效果標準。",
    catchBonus: 1.0, rarityBoost: 0.0
  },
  bait_lure: {
    id: "bait_lure", name: "發光幼蟲", icon: "🐛", buyPrice: 50,
    effectDescription: "在深水中發光。捕獲率 +20%，稀有魚機率 +5%。",
    catchBonus: 1.2, rarityBoost: 0.05
  },
  bait_golden: {
    id: "bait_golden", name: "奇岩黃金魚餌", icon: "✨", buyPrice: 200,
    effectDescription: "能完美反射光線。捕獲率 +50%，稀有魚機率 +15%。",
    catchBonus: 1.5, rarityBoost: 0.15
  },
  bait_crystal: {
    id: "bait_crystal", name: "深淵水晶魚餌", icon: "💎", buyPrice: 1000,
    effectDescription: "注入魔力水晶。捕獲率加倍，史詩／傳說魚機率 +30%。",
    catchBonus: 2.0, rarityBoost: 0.30
  }
};

export function getFishingXpForLevel(level) {
  return Math.floor(level * level * 50);
}

export const FISH_EXCHANGE_TIERS = {
  common: { name: "階級 1：普通", description: "5 條魚 → 1 份基礎材料", exchangeRate: 5 },
  uncommon: { name: "階級 2：優良", description: "3 條魚 → 1 份精製材料", exchangeRate: 3 },
  rare: { name: "階級 3：稀有", description: "2 條魚 → 1 份特殊材料", exchangeRate: 2 },
  epic: { name: "階級 4：史詩", description: "1 條魚 → 1 份稀有材料", exchangeRate: 1 },
  legendary: { name: "階級 5：傳說", description: "1 條魚 → 1 份高階材料", exchangeRate: 1 }
};
