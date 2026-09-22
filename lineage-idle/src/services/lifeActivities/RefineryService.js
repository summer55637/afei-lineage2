// RefineryService.js — Bancada de Refino de Materiais de Life Activities 2.0
import { addToInventory } from '../InventoryService.js';
import { RESOURCE_DICTIONARY } from './ResourceDictionary.js';

export const REFINERY_RECIPES = [
  // ─── 1. Madeira & Fibras (Wood & Fibers) ───
  {
    id: 'refine_compressed_wood',
    name: '壓縮木材',
    desc: '以木炭處理的高密度木材，用於弓與強化握柄。',
    category: 'wood',
    icon: 'materials/compressed_wood.png',
    inputs: [
      { matId: 'branch', qty: 5 },
      { matId: 'charcoal', qty: 2 }
    ],
    output: { matId: 'compressed_wood', qty: 1 },
    adenaCost: 150,
    forgeExp: 5
  },
  {
    id: 'refine_varnish',
    name: '天然清漆',
    desc: '由植物莖液蒸餾而成，可為木材與金屬合金提供防水效果。',
    category: 'wood',
    icon: 'materials/varnish.png',
    inputs: [
      { matId: 'stem', qty: 5 }
    ],
    output: { matId: 'varnish', qty: 1 },
    adenaCost: 100,
    forgeExp: 4
  },
  {
    id: 'refine_cord',
    name: '編織繩',
    desc: '將棉纖維加壓編織而成，是弓與輕甲的材料。',
    category: 'wood',
    icon: 'materials/cord.png',
    inputs: [
      { matId: 'cotton_thread', qty: 4 }
    ],
    output: { matId: 'cord', qty: 1 },
    adenaCost: 120,
    forgeExp: 4
  },
  {
    id: 'refine_braided_hemp',
    name: '帝國編織麻繩',
    desc: '高強度的高級繩索，用於 D 級與 C 級裝備。',
    category: 'wood',
    icon: 'materials/braided_hemp.png',
    inputs: [
      { matId: 'stem', qty: 4 },
      { matId: 'cord', qty: 2 }
    ],
    output: { matId: 'braided_hemp', qty: 1 },
    adenaCost: 350,
    forgeExp: 8
  },

  // ─── 2. Curtume & Peles (Leather & Bones) ───
  {
    id: 'refine_leather',
    name: '高級鞣製皮革',
    desc: '經鹽漬與刮製處理後柔化的野獸皮革。',
    category: 'leather',
    icon: 'materials/leather.png',
    inputs: [
      { matId: 'pelt', qty: 3 }
    ],
    output: { matId: 'leather', qty: 1 },
    adenaCost: 150,
    forgeExp: 5
  },
  {
    id: 'refine_crafted_leather',
    name: '加工皮革（Crafted Leather）',
    desc: '以繩線縫製強化的鞣製皮革，是輕甲與腰帶的基礎材料。',
    category: 'leather',
    icon: 'materials/crafted_leather.png',
    inputs: [
      { matId: 'leather', qty: 4 },
      { matId: 'cord', qty: 2 }
    ],
    output: { matId: 'crafted_leather', qty: 1 },
    adenaCost: 500,
    forgeExp: 10
  },
  {
    id: 'refine_coarse_bone_powder',
    name: '粗骨粉',
    desc: '將怪物骨骼粉碎精煉，用於陶瓷合金與煉金。',
    category: 'leather',
    icon: 'materials/coarse_bone_powder.png',
    inputs: [
      { matId: 'bone', qty: 10 }
    ],
    output: { matId: 'coarse_bone_powder', qty: 1 },
    adenaCost: 250,
    forgeExp: 6
  },

  // ─── 3. Metalurgia Imperial (Metals & Alloys) ───
  {
    id: 'refine_steel',
    name: '精煉帝國鋼',
    desc: '以鐵礦與煤炭高溫鍛造而成的純合金。',
    category: 'metal',
    icon: 'materials/steel.png',
    inputs: [
      { matId: 'iron_ore', qty: 5 },
      { matId: 'coal', qty: 5 }
    ],
    output: { matId: 'steel', qty: 1 },
    adenaCost: 450,
    forgeExp: 10
  },
  {
    id: 'refine_mithril_alloy',
    name: '米索莉合金',
    desc: '米索莉礦與純化清漆熔合而成，極為輕盈並具有魔法抗性。',
    category: 'metal',
    icon: 'materials/mithril_alloy.png',
    inputs: [
      { matId: 'mithril_ore', qty: 3 },
      { matId: 'varnish', qty: 2 }
    ],
    output: { matId: 'mithril_alloy', qty: 1 },
    adenaCost: 750,
    forgeExp: 14
  },
  {
    id: 'refine_synthetic_cokes',
    name: '合成焦炭',
    desc: '由煤炭與木炭融合製成的高熱值燃料。',
    category: 'metal',
    icon: 'materials/synthetic_cokes.png',
    inputs: [
      { matId: 'coal', qty: 4 },
      { matId: 'charcoal', qty: 4 }
    ],
    output: { matId: 'synthetic_cokes', qty: 1 },
    adenaCost: 550,
    forgeExp: 10
  },
  {
    id: 'refine_metallic_fiber',
    name: '金屬纖維',
    desc: '將鐵絲編入纖維基底，用於鎖子甲與盾牌。',
    category: 'metal',
    icon: 'materials/metallic_fiber.png',
    inputs: [
      { matId: 'iron_ore', qty: 4 },
      { matId: 'cord', qty: 3 }
    ],
    output: { matId: 'metallic_fiber', qty: 1 },
    adenaCost: 650,
    forgeExp: 12
  },

  // ─── 4. Alquimia & Reagentes (Alchemy & Reagents) ───
  {
    id: 'refine_varnish_of_purity',
    name: '純淨清漆',
    desc: '由植物清漆與粗骨粉合成的稀有煉金化合物。',
    category: 'alchemy',
    icon: 'materials/varnish_of_purity.png',
    inputs: [
      { matId: 'varnish', qty: 3 },
      { matId: 'coarse_bone_powder', qty: 1 }
    ],
    output: { matId: 'varnish_of_purity', qty: 1 },
    adenaCost: 800,
    forgeExp: 15
  },
  {
    id: 'refine_enria',
    name: 'Enria（奧術試劑）',
    desc: '具有極高魔力傳導性的流體材料，用於 C 級與 B 級武器。',
    category: 'alchemy',
    icon: 'materials/enria.png',
    inputs: [
      { matId: 'stem', qty: 8 },
      { matId: 'coarse_bone_powder', qty: 2 }
    ],
    output: { matId: 'enria', qty: 1 },
    adenaCost: 1200,
    forgeExp: 20
  },
  {
    id: 'refine_durable_metal_plate',
    name: '耐用金屬板',
    desc: '以帝國鋼與米索莉粉層壓製成的重型裝甲板。',
    category: 'metal',
    icon: 'materials/durable_metal_plate.png',
    inputs: [
      { matId: 'steel', qty: 2 },
      { matId: 'mithril_ore', qty: 2 }
    ],
    output: { matId: 'durable_metal_plate', qty: 1 },
    adenaCost: 1500,
    forgeExp: 22
  },

  // ─── 5. Pescado & Óleos Nobres (Fishing & Biological Oils) ───
  {
    id: 'refine_fish_oil',
    name: '精煉魚油',
    desc: '以亞丁新鮮魚類冷壓萃取的天然油脂，是潤滑劑與燉菜的基礎材料。',
    category: 'alchemy',
    icon: 'materials/varnish.png',
    inputs: [
      { matId: 'fish_raw', qty: 3 }
    ],
    output: { matId: 'fish_oil', qty: 1 },
    adenaCost: 200,
    forgeExp: 6
  },
  {
    id: 'refine_pure_fish_oil',
    name: '純淨魚油',
    desc: '以高密度植物清漆蒸餾而成，用於鍛造輕甲與高級弓。',
    category: 'alchemy',
    icon: 'materials/varnish_of_purity.png',
    inputs: [
      { matId: 'fish_oil', qty: 3 },
      { matId: 'varnish', qty: 1 }
    ],
    output: { matId: 'pure_fish_oil', qty: 1 },
    adenaCost: 600,
    forgeExp: 14
  }
];

export const RefineryService = {
  getRecipes(category = 'all') {
    if (!category || category === 'all') return REFINERY_RECIPES;
    return REFINERY_RECIPES.filter(r => r.category === category);
  },

  getRecipeById(recipeId) {
    return REFINERY_RECIPES.find(r => r.id === recipeId) || null;
  },

  getMaterialCount(state, matId) {
    if (!state || !Array.isArray(state.inventory)) return 0;
    let total = 0;
    for (const item of state.inventory) {
      if (!item || item.equipped) continue;
      const itemId = item.itemId || item.id;
      if (itemId === matId || item.id === matId) {
        total += (item.count || 1);
      } else if (matId === 'fish_raw' && typeof itemId === 'string' && itemId.startsWith('fish_') && itemId !== 'fish_oil' && itemId !== 'fish_stew') {
        total += (item.count || 1);
      }
    }
    return total;
  },

  calculateMaxRefinements(state, recipeId) {
    const recipe = this.getRecipeById(recipeId);
    if (!recipe) return 0;

    let maxByMats = Infinity;
    for (const inp of recipe.inputs) {
      const have = this.getMaterialCount(state, inp.matId);
      const possible = Math.floor(have / inp.qty);
      if (possible < maxByMats) {
        maxByMats = possible;
      }
    }

    if (maxByMats === Infinity || maxByMats <= 0) return 0;

    const gold = state.gold || 0;
    const maxByGold = recipe.adenaCost > 0 ? Math.floor(gold / recipe.adenaCost) : Infinity;

    return Math.max(0, Math.min(maxByMats, maxByGold));
  },

  refine(state, recipeId, times = 1, callbacks = {}) {
    const recipe = this.getRecipeById(recipeId);
    if (!recipe) {
      if (callbacks.log) callbacks.log('⚠️ 未知的精煉配方。', 'warning');
      return { success: false, reason: 'invalid_recipe' };
    }

    const count = Math.max(1, Math.floor(times));
    const totalAdena = (recipe.adenaCost || 0) * count;

    if ((state.gold || 0) < totalAdena) {
      if (callbacks.log) callbacks.log(`⚠️ 金幣不足！精煉需要 ${totalAdena.toLocaleString()} 金幣。`, 'warning');
      return { success: false, reason: 'insufficient_gold' };
    }

    // Valida todos os materiais necessários
    for (const inp of recipe.inputs) {
      const requiredTotal = inp.qty * count;
      const currentHave = this.getMaterialCount(state, inp.matId);
      if (currentHave < requiredTotal) {
        const matDef = RESOURCE_DICTIONARY[inp.matId] || { name: inp.matId };
        if (callbacks.log) {
          callbacks.log(`⚠️ 材料不足！需要 ${requiredTotal}x ${matDef.name}（目前擁有 ${currentHave}）。`, 'warning');
        }
        return { success: false, reason: 'insufficient_materials', missing: inp.matId };
      }
    }

    // Deduz materiais através de todos os stacks disponíveis
    for (const inp of recipe.inputs) {
      let toDeduct = inp.qty * count;
      for (let i = state.inventory.length - 1; i >= 0 && toDeduct > 0; i--) {
        const item = state.inventory[i];
        if (!item || item.equipped) continue;
        const itemId = item.itemId || item.id;
        const isMatch = (itemId === inp.matId || item.id === inp.matId) || (inp.matId === 'fish_raw' && typeof itemId === 'string' && itemId.startsWith('fish_') && itemId !== 'fish_oil' && itemId !== 'fish_stew');
        if (isMatch) {
          const currentStack = item.count || 1;
          if (currentStack <= toDeduct) {
            toDeduct -= currentStack;
            state.inventory.splice(i, 1);
          } else {
            item.count = currentStack - toDeduct;
            toDeduct = 0;
          }
        }
      }
    }

    // Deduz Adena
    state.gold -= totalAdena;

    // Entrega material refinado
    const outputQty = (recipe.output.qty || 1) * count;
    addToInventory(state, recipe.output.matId, outputQty, 'common', false, callbacks, true);

    // Concede EXP para a Forja Imperial
    const earnedForgeExp = (recipe.forgeExp || 5) * count;
    state.accountForgeExp = (state.accountForgeExp || 0) + earnedForgeExp;
    const forgeLvl = state.accountForgeLevel || state.craftLevel || 1;
    const reqExp = forgeLvl * 100;
    let forgeLeveledUp = false;
    if (state.accountForgeExp >= reqExp) {
      state.accountForgeExp -= reqExp;
      state.accountForgeLevel = forgeLvl + 1;
      state.craftLevel = state.accountForgeLevel;
      forgeLeveledUp = true;
    }

    const outDef = RESOURCE_DICTIONARY[recipe.output.matId] || { name: recipe.name };

    if (callbacks.log) {
      callbacks.log(
        `⚗️ **精煉完成：**成功製作 +${outputQty}x **${outDef.name}**！（-${totalAdena.toLocaleString()} 金幣，+${earnedForgeExp} 鍛造 EXP）`,
        'loot'
      );
      if (forgeLeveledUp) {
        callbacks.log(`🔨 **你的帝國鍛造等級提升至 ${state.accountForgeLevel}！**`, 'rarity-legendary');
      }
    }

    if (callbacks.floatText) {
      callbacks.floatText(`+${outputQty} ${outDef.name}!`, 'float-gold');
    }

    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();

    return {
      success: true,
      recipeId,
      count,
      outputQty,
      earnedForgeExp,
      forgeLeveledUp
    };
  },

  refineAll(state, recipeId, callbacks = {}) {
    const maxCount = this.calculateMaxRefinements(state, recipeId);
    if (maxCount <= 0) {
      if (callbacks.log) callbacks.log('⚠️ 精煉此材料所需資源或金幣不足。', 'warning');
      return { success: false, reason: 'cannot_refine' };
    }
    return this.refine(state, recipeId, maxCount, callbacks);
  }
};
