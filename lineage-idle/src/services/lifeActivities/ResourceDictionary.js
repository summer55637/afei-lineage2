/**
 * ResourceDictionary.js — Dicionário Canônico de Recursos de Aden Arena.
 * 
 * Garante que cada recurso semântico possua exatamente um itemId canônico,
 * metadados formais, ícone comprovado no repositório e função clara na cadeia de refino e forja.
 */

export const RESOURCE_CATEGORIES = {
  RAW_FISH: 'raw_fish',
  RAW_HUNT: 'raw_hunt',
  RAW_FLORA: 'raw_flora',
  RAW_MINERAL: 'raw_mineral',
  PROCESSED_LEATHER: 'processed_leather',
  PROCESSED_METAL: 'processed_metal',
  PROCESSED_TEXTILE: 'processed_textile',
  PROCESSED_BONE: 'processed_bone',
  CRYSTAL: 'crystal',
  SPECIAL_COMPONENT: 'special_component'
};

export const CANONICAL_RESOURCES = {
  // ─── MATÉRIAS-PRIMAS BRUTAS: CAÇA (RAW HUNT) ───
  bone: {
    itemId: 'bone',
    name: '動物骨',
    category: RESOURCE_CATEGORIES.RAW_HUNT,
    grade: 'none',
    icon: 'materials/bone.png',
    price: 15,
    desc: '野生獸骨碎片。可用於製作粉末與長柄武器。'
  },
  pelt: {
    itemId: 'pelt',
    name: '生獸皮',
    category: RESOURCE_CATEGORIES.RAW_HUNT,
    grade: 'none',
    icon: 'materials/suede.png',
    price: 25,
    desc: '從獵物身上取得、尚未鹽漬與鞣製的生皮。'
  },
  suede: {
    itemId: 'suede',
    name: '柔軟麂皮',
    category: RESOURCE_CATEGORIES.RAW_HUNT,
    grade: 'none',
    icon: 'materials/suede.png',
    price: 25,
    desc: '從保存良好的獸體取得的柔軟絨面皮，是鞋類與內襯的基礎材料。'
  },

  // ─── MATÉRIAS-PRIMAS BRUTAS: COLETA (RAW FLORA) ───
  branch: {
    itemId: 'branch',
    name: '堅韌野生樹枝',
    category: RESOURCE_CATEGORIES.RAW_FLORA,
    grade: 'none',
    icon: 'materials/branch.png',
    price: 12,
    desc: '採自古魯丁與狄恩古樹的柔韌木材，可製作法杖與弓。'
  },
  stem: {
    itemId: 'stem',
    name: '野生莖幹',
    category: RESOURCE_CATEGORIES.RAW_FLORA,
    grade: 'none',
    icon: 'materials/branch.png',
    price: 15,
    desc: '從亞丁野生植物採集的富含樹液柔韌莖幹。'
  },
  charcoal: {
    itemId: 'charcoal',
    name: '木炭',
    category: RESOURCE_CATEGORIES.RAW_FLORA,
    grade: 'none',
    icon: 'materials/charcoal.png',
    price: 20,
    desc: '由森林木材燒製而成的木炭，是熔爐燃燒的重要燃料。'
  },
  compressed_wood: {
    itemId: 'compressed_wood',
    name: '高級壓縮木材',
    category: RESOURCE_CATEGORIES.RAW_FLORA,
    grade: 'd',
    icon: 'materials/compressed_wood.png',
    price: 80,
    desc: '由工匠精選並壓製的木板，是高衝擊武器握柄的重要材料。'
  },

  // ─── MATÉRIAS-PRIMAS BRUTAS: MINERAÇÃO (RAW MINERAL) ───
  iron_ore: {
    itemId: 'iron_ore',
    name: '粗鐵礦',
    category: RESOURCE_CATEGORIES.RAW_MINERAL,
    grade: 'none',
    icon: 'materials/iron_ore.png',
    price: 30,
    desc: '直接從矮人礦坑岩層採出的鐵礦，是亞丁冶金的基礎材料。'
  },
  coal: {
    itemId: 'coal',
    name: '純煤',
    category: RESOURCE_CATEGORIES.RAW_MINERAL,
    grade: 'none',
    icon: 'materials/coal.png',
    price: 35,
    desc: '高密度化石燃料，可在熔煉重型合金時產生極高熱量。'
  },
  silver_nugget: {
    itemId: 'silver_nugget',
    name: '高級銀礦粒',
    category: RESOURCE_CATEGORIES.RAW_MINERAL,
    grade: 'none',
    icon: 'materials/silver_nugget.png',
    price: 55,
    desc: '閃耀的天然銀礦，可傳導乙太與魔力，常用於祭司與法師武器。'
  },
  mithril_ore: {
    itemId: 'mithril_ore',
    name: '古代米索莉礦',
    category: RESOURCE_CATEGORIES.RAW_MINERAL,
    grade: 'd',
    icon: 'materials/mithril_ore.png',
    price: 120,
    desc: '傳說金屬，輕如羽毛、堅如鑽石，常用於鎖甲與輕型匕首。'
  },
  oriharukon_ore: {
    itemId: 'oriharukon_ore',
    name: '奧里哈魯根礦',
    category: RESOURCE_CATEGORIES.RAW_MINERAL,
    grade: 'c',
    icon: 'materials/oriharukon_ore.png',
    price: 250,
    desc: '極稀有的金色礦石，蘊含天界力量，是 C 級武器的重要材料。'
  },
  adamantite: {
    itemId: 'adamantite',
    name: '精金礦塊',
    category: RESOURCE_CATEGORIES.RAW_MINERAL,
    grade: 'c',
    icon: 'materials/adamantite.png',
    price: 450,
    desc: '沉重且極難破壞的礦石，可承受高階魔法產生的高熱。'
  },

  // ─── INSUMOS PROCESSADOS & REFINADOS (PROCESSED) ───
  leather: {
    itemId: 'leather',
    name: '堅韌鞣皮',
    category: RESOURCE_CATEGORIES.PROCESSED_LEATHER,
    grade: 'none',
    icon: 'materials/leather.png',
    price: 75,
    desc: '以天然單寧鞣製的皮革，是輕甲的基礎材料。'
  },
  crafted_leather: {
    itemId: 'crafted_leather',
    name: '強化加工皮革',
    category: RESOURCE_CATEGORIES.PROCESSED_LEATHER,
    grade: 'd',
    icon: 'materials/crafted_leather.png',
    price: 220,
    desc: '經硬化並以高密度繩線縫製的皮革，用於高階 D 級套裝。'
  },
  bone_powder: {
    itemId: 'bone_powder',
    name: '碎骨粉',
    category: RESOURCE_CATEGORIES.PROCESSED_BONE,
    grade: 'none',
    icon: 'materials/bone_powder.png',
    price: 40,
    desc: '以研缽細磨的骨粉，是淬鍊與煉金合成的重要試劑。'
  },
  coarse_bone_powder: {
    itemId: 'coarse_bone_powder',
    name: '精製粗骨粉',
    category: RESOURCE_CATEGORIES.PROCESSED_BONE,
    grade: 'd',
    icon: 'materials/coarse_bone_powder.png',
    price: 140,
    desc: '高純度骨質黏合材料，用於結合金屬板。'
  },
  cord: {
    itemId: 'cord',
    name: '強化編織繩',
    category: RESOURCE_CATEGORIES.PROCESSED_TEXTILE,
    grade: 'none',
    icon: 'materials/cord.png',
    price: 45,
    desc: '以植物纖維四股編織而成，用於武器握把與弓弦。'
  },
  braided_hemp: {
    itemId: 'braided_hemp',
    name: '煉金編織麻纖維',
    category: RESOURCE_CATEGORIES.PROCESSED_TEXTILE,
    grade: 'none',
    icon: 'materials/braided_hemp.png',
    price: 60,
    desc: '以植物油處理的高強度乾燥麻纖維。'
  },
  cotton_thread: {
    itemId: 'cotton_thread',
    name: '細棉線',
    category: RESOURCE_CATEGORIES.PROCESSED_TEXTILE,
    grade: 'none',
    icon: 'materials/cotton_thread.png',
    price: 30,
    desc: '精細紡製的棉線，用於縫製法袍與鎖甲內襯。'
  },
  silver_thread: {
    itemId: 'silver_thread',
    name: '輝光銀線',
    category: RESOURCE_CATEGORIES.PROCESSED_TEXTILE,
    grade: 'd',
    icon: 'materials/silver_thread.png',
    price: 160,
    desc: '以柔韌銀絲與棉線編織而成，可提升魔法披風對黑暗魔法的抵抗。'
  },
  metallic_fiber: {
    itemId: 'metallic_fiber',
    name: '編織金屬纖維',
    category: RESOURCE_CATEGORIES.PROCESSED_TEXTILE,
    grade: 'd',
    icon: 'materials/metallic_fiber.png',
    price: 180,
    desc: '交織淬火鐵絲，用於強化鎖甲與重型護手。'
  },
  steel: {
    itemId: 'steel',
    name: '純淬鍊鋼',
    category: RESOURCE_CATEGORIES.PROCESSED_METAL,
    grade: 'd',
    icon: 'materials/steel.png',
    price: 150,
    desc: '以煤炭高溫熔煉的鋼板，是 D 級鍛造的標準材料。'
  },
  steel_ingot: {
    itemId: 'steel_ingot',
    name: '高級鋼錠',
    category: RESOURCE_CATEGORIES.PROCESSED_METAL,
    grade: 'c',
    icon: 'materials/steel_ingot.png',
    price: 350,
    desc: '以矮人模具鑄造的精製鋼錠，是 C 級武器的基礎材料。'
  },
  silver_mold: {
    itemId: 'silver_mold',
    name: '銀製鑄模',
    category: RESOURCE_CATEGORIES.SPECIAL_COMPONENT,
    grade: 'd',
    icon: 'materials/silver_mold.png',
    price: 280,
    desc: '矮人製作的雕刻鑄模，可鑄造銀戒指、耳環與護身符。'
  },

  // ─── CRISTAIS CANÔNICOS DE FORJA (CRYSTALS) ───
  crystal_d: {
    itemId: 'crystal_d',
    name: '水晶：D 級',
    category: RESOURCE_CATEGORIES.CRYSTAL,
    grade: 'd',
    icon: 'materials/crystal_blue_d.png',
    price: 450,
    desc: '由 D 級物品結晶化後取得的濃縮魔法精華。'
  },
  crystal_c: {
    itemId: 'crystal_c',
    name: '水晶：C 級',
    category: RESOURCE_CATEGORIES.CRYSTAL,
    grade: 'c',
    icon: 'materials/crystal_green_c.png',
    price: 1200,
    desc: '由 C 級物品結晶化後取得的純淨魔法精華。'
  },

  // ─── MATERIAIS REFINADOS DE BANCADA (REFINED) ───
  compressed_wood: {
    itemId: 'compressed_wood',
    name: '壓縮木材',
    category: RESOURCE_CATEGORIES.RAW_FLORA,
    grade: 'none',
    icon: 'materials/compressed_wood.png',
    price: 60,
    desc: '經木炭與密封劑處理的木材，用於弓架與法杖。'
  },
  varnish: {
    itemId: 'varnish',
    name: '天然清漆',
    category: RESOURCE_CATEGORIES.SPECIAL_COMPONENT,
    grade: 'none',
    icon: 'materials/varnish.png',
    price: 45,
    desc: '由植物莖液蒸餾而成，可為防具與金屬合金提供防水保護。'
  },
  varnish_of_purity: {
    itemId: 'varnish_of_purity',
    name: '純淨清漆',
    category: RESOURCE_CATEGORIES.SPECIAL_COMPONENT,
    grade: 'd',
    icon: 'materials/varnish_of_purity.png',
    price: 320,
    desc: '高純度煉金清漆，用於高級武器淬鍊。'
  },
  mithril_alloy: {
    itemId: 'mithril_alloy',
    name: '米索莉合金',
    category: RESOURCE_CATEGORIES.PROCESSED_METAL,
    grade: 'd',
    icon: 'materials/mithril_alloy.png',
    price: 400,
    desc: '以米索莉礦與清漆熔煉而成，兼具輕量與優異魔力傳導性。'
  },
  synthetic_cokes: {
    itemId: 'synthetic_cokes',
    name: '合成焦炭',
    category: RESOURCE_CATEGORIES.SPECIAL_COMPONENT,
    grade: 'd',
    icon: 'materials/synthetic_cokes.png',
    price: 260,
    desc: '具極高熔點的精煉焦炭，用於熔鑄帝國鋼材。'
  },
  enria: {
    itemId: 'enria',
    name: '恩里亞試劑',
    category: RESOURCE_CATEGORIES.SPECIAL_COMPONENT,
    grade: 'c',
    icon: 'materials/enria.png',
    price: 650,
    desc: '半固態奧術試劑，可製作 C 級武器與防具。'
  },
  durable_metal_plate: {
    itemId: 'durable_metal_plate',
    name: '耐久金屬板',
    category: RESOURCE_CATEGORIES.PROCESSED_METAL,
    grade: 'c',
    icon: 'materials/durable_metal_plate.png',
    price: 800,
    desc: '以鋼與米索莉製成的裝甲板，用於重型胸甲與盾牌。'
  },
  fish_oil: {
    itemId: 'fish_oil',
    name: '精煉魚油',
    category: RESOURCE_CATEGORIES.SPECIAL_COMPONENT,
    grade: 'none',
    icon: 'materials/varnish.png',
    price: 80,
    desc: '由亞丁魚類精煉出的油脂，可作為機械潤滑劑與料理基底。'
  },
  pure_fish_oil: {
    itemId: 'pure_fish_oil',
    name: '純淨魚油',
    category: RESOURCE_CATEGORIES.SPECIAL_COMPONENT,
    grade: 'd',
    icon: 'materials/varnish_of_purity.png',
    price: 280,
    desc: '由稀有魚類與清漆精製而成，是鍛造與藥水的重要試劑。'
  }
};

/**
 * Mapeador de Aliases Históricos para IDs Canônicos.
 * Elimina duplicações semânticas e fallbacks incorretos.
 */
export const RESOURCE_ALIASES = {
  // Caça
  animal_bone: 'bone',
  animal_skin: 'leather',
  raw_hide: 'leather',
  treated_leather: 'crafted_leather',
  
  // Coleta
  thread: 'cotton_thread',
  wood: 'branch',
  fish_oil: 'varnish',
  
  // Mineração
  iron: 'iron_ore',
  iron_ingot: 'steel',
  silver: 'silver_nugget',
  mithril: 'mithril_ore',
  oriharukon: 'oriharukon_ore',
  
  // Moldes e Ligas
  metallic_thread: 'metallic_fiber',
  steel_mold: 'silver_mold',
  var_of_purity: 'varnish_of_purity'
};

/**
 * Resolve qualquer ID para o ID Canônico oficial.
 * @param {string} itemId 
 * @returns {string} ID Canônico
 */
export function resolveCanonicalResourceId(itemId) {
  if (!itemId) return 'iron_ore';
  if (CANONICAL_RESOURCES[itemId]) return itemId;
  if (RESOURCE_ALIASES[itemId]) return RESOURCE_ALIASES[itemId];
  return itemId;
}

/**
 * Retorna a definição completa de um recurso canônico.
 * @param {string} itemId 
 * @returns {Object}
 */
export function getCanonicalResourceDef(itemId) {
  const canonId = resolveCanonicalResourceId(itemId);
  return CANONICAL_RESOURCES[canonId] || {
    itemId: canonId,
    name: canonId,
    category: 'unknown',
    grade: 'none',
    icon: 'materials/iron_ore.png',
    price: 10,
    desc: '亞丁的材料資源。'
  };
}

export const RESOURCE_DICTIONARY = CANONICAL_RESOURCES;
