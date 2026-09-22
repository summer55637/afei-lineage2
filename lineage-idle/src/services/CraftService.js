/**
 * CraftService.js — Motor de Criação, Metalurgia Imperial e Aprimoramento do Lineage Idle.
 *
 * Módulos Integrados e Balanceados:
 * 1. 鍛造 Universal com Craft em Lote e Cálculo "最大" O(1).
 * 2. Critical Craft (Double Craft e Foundation / Masterwork).
 * 3. Localizador de Fontes de Drop (Drop & Spoil Locator).
 * 4. Soul Crystals (Níveis 1 a 15, Drenagem de Alma & Epic Boss Stage 15 com 50% de chance).
 * 5. Ferreiro Pushkin (Mestre Armeiro: Unseal, Masterwork e Troca de Armas de Mesmo Grau).
 * 6. Symbol Maker (Dyes & Tatuagens Sagradas em Estágios 1 a 5).
 * 7. Atributos Elementais (Consumo Real de Pedras, Roda de Oposição e Drop Sources).
 * 8. Síntese de Cintos (Compound de Duplicatas com 30% de 成功 e Rolagem de Stats).
 * 9. Augmentation com Life Stones Transparentes.
 * 10. Random Craft Balanceado (Reciclagem Real de Itens e Pools Proporcionais).
 */

import { D } from '../core/GameConfig.js';
import { addToInventory, getInventoryCount, getSelectedSet } from './InventoryService.js';
import {
  RANDOM_CRAFT_POINTS_PER_CHARGE,
  RANDOM_CRAFT_REROLL_COST,
  RANDOM_CRAFT_ADENA_CHARGE_COST,
  RANDOM_CRAFT_ADENA_CHARGE_POINTS,
  RECYCLE_POINTS_BY_TIER,
  rollCanonicalRandomCraftSlots
} from '../data/economy/randomCraftBalance.js';
import { CRAFTING_RECIPES } from '../data/items/recipes_drops.js';

/**
 * Retorna o nível de personagem necessário para cada nível de receita de craft.
 * @param {number} recipeLevel
 * @returns {number}
 */
export function getCraftLevelReq(recipeLevel) {
  return Math.max(1, Math.floor(recipeLevel / 10) + 1);
}

/**
 * Retorna a definição da receita de craft pelo ID.
 * @param {string} recipeId
 * @returns {Object|null}
 */
export function getRecipeDef(recipeId) {
  if (!recipeId) return null;
  const gData = D();
  const allItems = gData?.ALL_ITEMS || {};
  let recipesData = gData?.CRAFTING_RECIPES || CRAFTING_RECIPES;
  if (!recipesData && gData?.generateAllCraftingRecipes) {
    recipesData = gData.generateAllCraftingRecipes(allItems);
  }
  if (!recipesData) return null;

  const raw = String(recipeId);
  const altKeys = [
    raw,
    'weapon_' + raw,
    'armor_' + raw,
    'jewel_' + raw,
    raw.replace(/^(weapon_|armor_|jewel_|shield_|wepoan_)/, '')
  ];

  if (Array.isArray(recipesData)) {
    const found = recipesData.find(r => altKeys.includes(r.id) || altKeys.includes(r.itemId));
    if (found) return found;
  }

  if (typeof recipesData === 'object') {
    for (const k of altKeys) {
      if (recipesData[k]) return recipesData[k];
    }
    const found = Object.values(recipesData).find(r => altKeys.includes(r.id) || altKeys.includes(r.itemId));
    if (found) return found;
  }

  return null;
}

/**
 * Retorna a lista normalizada de materiais necessários para uma receita.
 * @param {Object} recipe
 * @returns {Array<{matId: string, qty: number}>}
 */
export function getRecipeMaterials(recipe) {
  if (!recipe) return [];
  if (Array.isArray(recipe.materials)) {
    return recipe.materials.map(r => ({ matId: r.matId || r.itemId || r.id, qty: r.qty || r.count || 1 }));
  }
  if (Array.isArray(recipe.reqs)) {
    return recipe.reqs.map(r => ({ matId: r.matId || r.id || r.itemId, qty: r.qty || r.count || 1 }));
  }
  if (recipe.materials && typeof recipe.materials === 'object') {
    return Object.entries(recipe.materials).map(([matId, qty]) => ({ matId, qty: Number(qty) || 1 }));
  }
  if (recipe.reqs && typeof recipe.reqs === 'object') {
    return Object.entries(recipe.reqs).map(([matId, qty]) => ({ matId, qty: Number(qty) || 1 }));
  }
  return [];
}

/**
 * Calcula a quantidade máxima de repetições possíveis de uma receita com os materiais atuais.
 * @param {Object} state
 * @param {string|Object} recipeOrId
 * @returns {number}
 */
export function calculateMaxCraftableQty(state, recipeOrId) {
  const recipe = (typeof recipeOrId === 'object' && recipeOrId !== null) ? recipeOrId : getRecipeDef(recipeOrId);
  if (!recipe) return 0;

  const costGold = recipe.gold || 250;
  let maxByGold = costGold > 0 ? Math.floor((state.gold || 0) / costGold) : 999999;
  if (maxByGold <= 0) return 0;

  const mats = getRecipeMaterials(recipe);
  if (mats.length === 0) return maxByGold;

  let maxByMats = 999999;
  for (const { matId, qty } of mats) {
    if (!qty || qty <= 0) continue;
    const count = getInventoryCount(state, matId);
    const possible = Math.floor(count / qty);
    if (possible < maxByMats) {
      maxByMats = possible;
    }
  }

  return Math.max(0, Math.min(maxByGold, maxByMats));
}

/**
 * Verifica se o jogador pode criar a quantidade informada da receita.
 * @param {Object} state
 * @param {string} recipeId
 * @param {number} [qty=1]
 * @returns {boolean}
 */
export function canCraft(state, recipeId, qty = 1) {
  const count = Math.max(1, parseInt(qty, 10) || 1);
  const maxPossible = calculateMaxCraftableQty(state, recipeId);
  return maxPossible >= count;
}

export function canCraftRecipe(state, id, qty = 1) {
  return canCraft(state, id, qty);
}

/**
 * Executa a criação de um item ou lote de itens com suporte a Critical Craft (Double / Foundation).
 */
export function craftItem(state, recipeId, qty = 1, callbacks = {}) {
  const recipe = getRecipeDef(recipeId);
  if (!recipe) {
    if (callbacks.log) callbacks.log('找不到鍛造配方。', 'system');
    return false;
  }

  const countToCraft = Math.max(1, parseInt(qty, 10) || 1);
  const maxPossible = calculateMaxCraftableQty(state, recipeId);
  if (maxPossible < countToCraft) {
    if (callbacks.log) callbacks.log('製作此數量所需材料或金幣不足。', 'system');
    return false;
  }

  const costGold = (recipe.gold || 250) * countToCraft;
  state.gold = (state.gold || 0) - costGold;

  const mats = getRecipeMaterials(recipe);
  for (const { matId, qty: baseQty } of mats) {
    let needed = baseQty * countToCraft;
    for (let i = state.inventory.length - 1; i >= 0 && needed > 0; i--) {
      const it = state.inventory[i];
      if ((it.itemId === matId || it.id === matId) && !it.equipped) {
        const take = Math.min(it.count || 1, needed);
        if ((it.count || 1) > take) {
          it.count -= take;
          needed = 0;
        } else {
          state.inventory.splice(i, 1);
          needed -= take;
        }
      }
    }
  }

  const gData = D();
  const allItems = gData?.ALL_ITEMS || {};
  const itemDef = allItems[recipeId] || allItems[recipe.itemId || recipe.id] || recipe;
  const isConsumable = itemDef && ['potion', 'consumable', 'scroll', 'soulshot', 'spiritshot'].includes(itemDef.slot);
  const baseYieldPerUnit = recipe.outputQty || ((isConsumable && (recipeId.includes('shot') || recipeId.includes('potion'))) ? 50 : 1);

  // Cálculo de Critical Craft (Double Craft & Foundation)
  const isDwarf = state.race === 'dwarf' || state.class === 'artisan' || state.class === 'warsmith';
  const forgeLvl = state.accountForgeLevel || state.craftLevel || 1;
  const doubleCraftChance = (isDwarf ? 0.15 : 0.05) + (forgeLvl * 0.005);
  const isDouble = Math.random() < doubleCraftChance;

  const totalYield = (baseYieldPerUnit * countToCraft) * (isDouble ? 2 : 1);

  const pityBonus = (state.craftFoundationPity || 0) * 0.002;
  const foundationChance = 0.06 + (isDwarf ? 0.04 : 0) + pityBonus;
  const isFoundation = !isConsumable && (Math.random() < foundationChance);

  if (isFoundation) {
    state.craftFoundationPity = 0;
  } else {
    state.craftFoundationPity = (state.craftFoundationPity || 0) + countToCraft;
  }

  const rarityBoost = isDwarf ? 1 : 0;
  const rolledRarity = gData?.rollRarity ? gData.rollRarity(rarityBoost) : 'common';

  const targetItemId = recipe?.result || recipeId;
  addToInventory(state, targetItemId, totalYield, rolledRarity, isFoundation, callbacks, true);

  // Mensagens e Notificações de 成功
  const displayName = itemDef?.name || recipeId;
  if (isDouble && isFoundation) {
    if (callbacks.log) callbacks.log(`🌟 暴擊＋基底成功！鍛造 ${totalYield}× ${displayName}（雙倍產量並附帶遠古之魂）！`, 'rarity-legendary');
    if (callbacks.floatText) callbacks.floatText('🌟 雙倍＋基底成功！', 'float-jackpot');
  } else if (isDouble) {
    if (callbacks.log) callbacks.log(`⚡ 雙倍製作！鐵砧共鳴，獲得 ${totalYield}× ${displayName}（2 倍）！`, 'rarity-epic');
  } else if (isFoundation) {
    if (callbacks.log) callbacks.log(`✨ 基底成功！你鍛造了 ${totalYield}× ${displayName}，有機會成為大師製作品！`, 'rarity-foundation');
  } else {
    if (callbacks.log) callbacks.log(`🔨 成功鍛造 ${totalYield}× ${displayName}！`, 'loot');
  }

  // Progressão do Nível de 鍛造 da Conta
  const expPerCraft = 15 + (itemDef?.tier || 1) * 10;
  const totalExpGained = expPerCraft * countToCraft;
  state.accountForgeExp = (state.accountForgeExp || 0) + totalExpGained;
  state.accountForgeLevel = state.accountForgeLevel || state.craftLevel || 1;

  while (state.accountForgeExp >= state.accountForgeLevel * 100) {
    state.accountForgeExp -= state.accountForgeLevel * 100;
    state.accountForgeLevel += 1;
    state.craftLevel = state.accountForgeLevel;
    if (callbacks.log) callbacks.log(`🎉 帳號鍛造等級提升至等級 ${state.accountForgeLevel}！`, 'rarity-legendary');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

/**
 * Retorna as fontes de drop e monstros para um determinado material (Drop & Spoil Locator).
 */
export function getMaterialDropSources(matId) {
  const gData = D();
  const zones = gData?.ZONES || {};
  const sources = [];

  for (const [zoneKey, zone] of Object.entries(zones)) {
    if (!zone) continue;
    const hasDrop = (zone.drops && zone.drops.includes(matId)) || (zone.monsters && zone.monsters.some(m => m.drops && m.drops.includes(matId)));
    if (hasDrop) {
      sources.push({
        zoneKey,
        zoneName: zone.name || zoneKey,
        minLevel: zone.reqLvl || zone.level || 1,
        source: '掉落／區域狩獵'
      });
    }
  }

  if (sources.length === 0) {
    sources.push(
      { zoneKey: 'gludio', zoneName: '古魯丁遺跡', minLevel: 20, source: '一般怪物' },
      { zoneKey: 'dion', zoneName: '狄恩平原', minLevel: 30, source: '矮人搜刮' },
      { zoneKey: 'giran', zoneName: '龍之谷', minLevel: 45, source: '地城與首領' }
    );
  }

  return sources;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SUBSISTEMA 2: SOUL CRYSTALS (1 a 15, DRENAGEM DE ALMAS & EPIC BOSSES)
 * ═══════════════════════════════════════════════════════════════════════════
 */
export const SA_DEFINITIONS = {
  red: {
    focus: { name: '專注', desc: '物理暴擊率', stat: 'crit', baseVal: 65 },
    critical_damage: { name: '暴擊傷害', desc: '物理暴擊傷害', stat: 'critDmg', baseVal: 280 },
    might: { name: '力量', desc: '物理攻擊 P.Atk', stat: 'atkPct', baseVal: 0.15 }
  },
  green: {
    acumen: { name: '靈敏', desc: '魔法施法速度', stat: 'castSpd', baseVal: 0.15 },
    haste: { name: '加速', desc: '物理攻擊速度', stat: 'atkSpd', baseVal: 0.10 },
    health: { name: '生命', desc: '最大生命值', stat: 'hpPct', baseVal: 0.25 }
  },
  blue: {
    empower: { name: '魔力強化', desc: '魔法攻擊力（M.Atk）', stat: 'matkPct', baseVal: 0.20 },
    guidance: { name: '導引', desc: '精準／命中', stat: 'acc', baseVal: 8 },
    anger: { name: '憤怒', desc: 'HP 低於 50% 時提升物理傷害', stat: 'anger', baseVal: 0.25 }
  }
};

/**
 * Processa a absorção de almas ao derrotar um monstro ou chefe.
 * @param {Object} state
 * @param {Object} monster
 * @param {Object} callbacks
 */
export function processSoulDrainOnKill(state, monster = {}, callbacks = {}) {
  const crystal = (state.inventory || []).find(i => (i.itemId?.startsWith('soul_crystal_') || i.isSoulCrystal) && !i.equipped);
  if (!crystal) return;

  const currentLevel = crystal.stage || crystal.crystalLevel || 1;
  const isEpicBoss = monster.isEpicBoss || ['valakas', 'antharas', 'baium', 'frintezza', 'barakiel'].includes(monster.id || monster.key);
  const isRaidBoss = monster.isBoss || monster.isRaid || isEpicBoss;

  // Estágio 最大imo Lendário: Nível 14 -> 15 Requer Derrotar um Epic Boss com 50% de chance!
  if (currentLevel === 14) {
    if (isEpicBoss) {
      const resonanceSuccess = Math.random() < 0.50; // 50% de chance canônica
      if (resonanceSuccess) {
        crystal.stage = 15;
        crystal.crystalLevel = 15;
        crystal.name = `靈魂水晶－階段 15（傳說）`;
        if (callbacks.log) {
          callbacks.log(`🌟 史詩共鳴！${monster.name || '史詩首領'} 的靈魂使靈魂水晶提升至階段 15（最高）！`, 'rarity-sovereign');
        }
        if (callbacks.floatText) callbacks.floatText('🌟 靈魂水晶階段 15！', 'float-jackpot');
      } else {
        if (callbacks.log) {
          callbacks.log(`💨 史詩首領的靈魂逃脫了……等級 14 靈魂水晶共鳴失敗（50% 機率）。`, 'system');
        }
      }
      if (callbacks.updateAllUI) callbacks.updateAllUI();
      if (callbacks.save) callbacks.save();
    }
    return;
  }

  if (currentLevel >= 15) return; // Já no teto máximo

  // Progressão de Níveis 1 a 10 (Monstros Comuns / Campeões)
  if (currentLevel < 10) {
    crystal.absorbedSouls = (crystal.absorbedSouls || 0) + 1;
    const reqSouls = currentLevel * 10;
    if (crystal.absorbedSouls >= reqSouls) {
      crystal.absorbedSouls = 0;
      const successChance = 0.70 - (currentLevel * 0.04);
      if (Math.random() < successChance) {
        crystal.stage = currentLevel + 1;
        crystal.crystalLevel = crystal.stage;
        if (callbacks.log) callbacks.log(`🔮 靈魂升級！靈魂水晶吸收靈魂並提升至階段 ${crystal.stage}！`, 'rarity-epic');
      } else {
        if (callbacks.log) callbacks.log(`⚠️ 靈魂吸收失敗！水晶維持在階段 ${currentLevel}。`, 'system');
      }
    }
    return;
  }

  // Progressão de Níveis 10 a 13 (Masmorras e Raids Médios)
  if (currentLevel >= 10 && currentLevel < 14) {
    if (isRaidBoss || monster.level >= 50) {
      crystal.absorbedSouls = (crystal.absorbedSouls || 0) + (isRaidBoss ? 10 : 1);
      const reqSouls = currentLevel * 20;
      if (crystal.absorbedSouls >= reqSouls) {
        crystal.absorbedSouls = 0;
        const successChance = 0.45;
        if (Math.random() < successChance) {
          crystal.stage = currentLevel + 1;
          crystal.crystalLevel = crystal.stage;
          if (callbacks.log) callbacks.log(`🔮 靈魂升級！靈魂水晶吸收菁英靈魂並提升至階段 ${crystal.stage}！`, 'rarity-legendary');
        }
      }
    }
  }
}

/**
 * Engasta o Soul Crystal na Arma com bônus proporcional ao nível do cristal (1 a 15).
 */
export function applySoulCrystal(state, weaponUid, color = 'red', saKey = 'focus', callbacks = {}) {
  const item = (state.inventory || []).find(i => i.uid === weaponUid || i.id === weaponUid);
  if (!item) {
    if (callbacks.log) callbacks.log('背包中找不到武器。', 'system');
    return false;
  }

  const gData = D();
  const def = gData?.ALL_ITEMS?.[item.itemId || item.id] || item;
  if (!def || def.slot !== 'weapon') {
    if (callbacks.log) callbacks.log('靈魂水晶只能鑲嵌在武器上！', 'system');
    return false;
  }

  const saGroup = SA_DEFINITIONS[color];
  const saBonus = saGroup?.[saKey] || Object.values(saGroup || {})[0];
  if (!saBonus) return false;

  // Busca cristal no inventário
  const crystalIdx = (state.inventory || []).findIndex(i => (i.itemId?.startsWith('soul_crystal_') || i.isSoulCrystal) && !i.equipped);
  const crystalLevel = crystalIdx !== -1 ? (state.inventory[crystalIdx].stage || state.inventory[crystalIdx].crystalLevel || 1) : 1;

  if (crystalIdx !== -1) {
    state.inventory.splice(crystalIdx, 1); // Consome o cristal utilizado
  }

  // Escala de poder por nível do cristal (Nível 1 = 50%, Nível 10 = 85%, Nível 15 = 120%)
  const powerScale = 0.50 + (crystalLevel * 0.05);
  const finalVal = typeof saBonus.baseVal === 'number' ? (saBonus.baseVal > 1 ? Math.round(saBonus.baseVal * powerScale) : parseFloat((saBonus.baseVal * powerScale).toFixed(3))) : saBonus.baseVal;

  item.soulCrystal = {
    color,
    key: saKey,
    name: saBonus.name,
    level: crystalLevel,
    desc: `${saBonus.desc}（+${typeof finalVal === 'number' && finalVal < 1 ? (finalVal * 100).toFixed(0) + '%' : finalVal}）`,
    stat: saBonus.stat,
    val: finalVal
  };

  if (callbacks.log) {
    callbacks.log(`🔮 已賦予特殊能力（等級 ${crystalLevel}）：${def.name} 獲得 【特殊能力：${saBonus.name}】！（${item.soulCrystal.desc}）`, 'rarity-legendary');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SUBSISTEMA 3: FERREIRO PUSHKIN (UNSEAL, MASTERWORK & WEAPON SWAP)
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function unsealItem(state, itemUid, callbacks = {}) {
  const item = (state.inventory || []).find(i => i.uid === itemUid || i.id === itemUid);
  if (!item) return false;

  const unsealCost = 25000;
  if ((state.gold || 0) < unsealCost) {
    if (callbacks.log) callbacks.log(`普希金鐵匠需要 ${unsealCost.toLocaleString()} 金幣才能解除古代封印。`, 'system');
    return false;
  }

  state.gold -= unsealCost;
  item.sealed = false;

  const gData = D();
  const def = gData?.ALL_ITEMS?.[item.itemId || item.id] || item;

  if (callbacks.log) {
    callbacks.log(`✨ PUSHKIN：${def.name} 的封印已解除！套裝加成已啟用。`, 'rarity-epic');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

export function polishMasterwork(state, itemUid, callbacks = {}) {
  const item = (state.inventory || []).find(i => i.uid === itemUid || i.id === itemUid);
  if (!item || !item.foundation) {
    if (callbacks.log) callbacks.log('只有具有遠古之魂的基礎裝備才能精製為名匠裝備！', 'system');
    return false;
  }

  const mwCost = 100000;
  if ((state.gold || 0) < mwCost) {
    if (callbacks.log) callbacks.log(`名匠精製需要 ${mwCost.toLocaleString()} 金幣。`, 'system');
    return false;
  }

  state.gold -= mwCost;
  item.isMasterwork = true;
  item.masterworkBonus = {
    castSpdPct: 0.05,
    atkSpdPct: 0.04,
    hpBonus: 250,
    mpRegenPct: 0.08
  };

  const gData = D();
  const def = gData?.ALL_ITEMS?.[item.itemId || item.id] || item;

  if (callbacks.log) {
    callbacks.log(`👑 名匠裝備啟用！${def.name} 已成為帝國傑作（+5% 施法速度、+4% 攻擊速度、+250 生命值）！`, 'rarity-legendary');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

/**
 * Troca de Armas de Mesmo Grau no Ferreiro Pushkin (Blacksmith Weapon Exchange).
 */
export function swapWeaponSameGrade(state, weaponUid, targetWeaponId, callbacks = {}) {
  const item = (state.inventory || []).find(i => i.uid === weaponUid || i.id === weaponUid);
  if (!item || item.equipped) {
    if (callbacks.log) callbacks.log('找不到武器，或武器目前已裝備！', 'system');
    return false;
  }

  const gData = D();
  const allItems = gData?.ALL_ITEMS || {};
  const currentDef = allItems[item.itemId || item.id] || item;
  const targetDef = allItems[targetWeaponId];

  if (!targetDef || targetDef.slot !== 'weapon') {
    if (callbacks.log) callbacks.log('目標武器無效。', 'system');
    return false;
  }

  const swapFee = 150000;
  if ((state.gold || 0) < swapFee) {
    if (callbacks.log) callbacks.log(`普希金鐵匠收取 ${swapFee.toLocaleString()} 金幣作為武器交換費。`, 'system');
    return false;
  }

  state.gold -= swapFee;
  item.itemId = targetWeaponId;
  item.name = targetDef.name;

  if (callbacks.log) {
    callbacks.log(`🔄 交換完成：${currentDef.name} 已轉換為【${targetDef.name}】！`, 'rarity-epic');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SUBSISTEMA 4: SYMBOL MAKER & TATUAGENS EM ESTÁGIOS (1 a 5)
 * ═══════════════════════════════════════════════════════════════════════════
 */
export const DYES_CATALOG = {
  dye_str_con: { key: 'dye_str_con', name: 'STR／CON 染料', statPlus: 'str', statMinus: 'con' },
  dye_dex_con: { key: 'dye_dex_con', name: 'DEX／CON 染料', statPlus: 'dex', statMinus: 'con' },
  dye_con_str: { key: 'dye_con_str', name: 'CON／STR 染料', statPlus: 'con', statMinus: 'str' },
  dye_wit_men: { key: 'dye_wit_men', name: 'WIT／MEN 染料', statPlus: 'wit', statMinus: 'men' },
  dye_int_men: { key: 'dye_int_men', name: 'INT／MEN 染料', statPlus: 'int', statMinus: 'men' },
  dye_men_int: { key: 'dye_men_int', name: 'MEN／INT 染料', statPlus: 'men', statMinus: 'int' }
};

export function applyDyeSymbol(state, slotIdx = 0, dyeKey = 'dye_str_con', stage = 1, callbacks = {}) {
  state.dyeSymbols = state.dyeSymbols || [null, null, null];
  if (slotIdx < 0 || slotIdx > 2) return false;

  const dye = DYES_CATALOG[dyeKey];
  if (!dye) return false;

  const validStage = Math.max(1, Math.min(5, stage));
  const plusObj = { [dye.statPlus]: validStage };
  const minusObj = { [dye.statMinus]: validStage };

  // Validar teto estrito de +5 líquido por atributo base
  const testSymbols = [...state.dyeSymbols];
  testSymbols[slotIdx] = { plus: plusObj, minus: minusObj };

  const netStats = { str: 0, dex: 0, con: 0, int: 0, wit: 0, men: 0 };
  for (const s of testSymbols) {
    if (!s) continue;
    for (const [k, v] of Object.entries(s.plus || {})) netStats[k] += v;
    for (const [k, v] of Object.entries(s.minus || {})) netStats[k] -= v;
  }

  for (const [k, v] of Object.entries(netStats)) {
    if (v > 5) {
      if (callbacks.log) callbacks.log(`超過上限！${({ str: '力量', dex: '敏捷', con: '體質', int: '智力', wit: '智慧', men: '精神' })[k] || k.toUpperCase()} 的調整值不可超過 +5。`, 'system');
      return false;
    }
  }

  state.dyeSymbols[slotIdx] = {
    key: dyeKey,
    stage: validStage,
    name: `${dye.name}（階段 ${validStage}：+${validStage}／-${validStage}）`,
    plus: plusObj,
    minus: minusObj
  };

  if (callbacks.log) {
    callbacks.log(`🖊️ 神聖符號刻印完成：欄位 ${slotIdx + 1} 已套用【${dye.name} 階段 ${validStage}】！`, 'rarity-epic');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

export function upgradeDyeSymbol(state, slotIdx = 0, callbacks = {}) {
  state.dyeSymbols = state.dyeSymbols || [null, null, null];
  const current = state.dyeSymbols[slotIdx];
  if (!current) {
    if (callbacks.log) callbacks.log('此欄位尚未安裝任何符號。', 'system');
    return false;
  }

  if (current.stage >= 5) {
    if (callbacks.log) callbacks.log('此符號已達最高階段（+5 / -5）！', 'system');
    return false;
  }

  const costs = [0, 50000, 150000, 400000, 1000000];
  const upgradeCost = costs[current.stage] || 100000;

  if ((state.gold || 0) < upgradeCost) {
    if (callbacks.log) callbacks.log(`金幣不足！升級刺青需要 ${upgradeCost.toLocaleString()} 金幣。`, 'system');
    return false;
  }

  state.gold -= upgradeCost;

  const successChances = [0, 0.75, 0.55, 0.40, 0.25];
  const chance = successChances[current.stage] || 0.30;
  const isSuccess = Math.random() < chance;

  if (isSuccess) {
    const nextStage = current.stage + 1;
    return applyDyeSymbol(state, slotIdx, current.key, nextStage, callbacks);
  } else {
    if (callbacks.log) callbacks.log(`💨 神聖染料注入失敗！刺青維持在階段 ${current.stage}。`, 'system');
    if (callbacks.updateAllUI) callbacks.updateAllUI();
    if (callbacks.save) callbacks.save();
    return false;
  }
}

export function removeDyeSymbol(state, slotIdx = 0, callbacks = {}) {
  state.dyeSymbols = state.dyeSymbols || [null, null, null];
  if (!state.dyeSymbols[slotIdx]) return false;

  const removed = state.dyeSymbols[slotIdx];
  state.dyeSymbols[slotIdx] = null;

  if (callbacks.log) {
    callbacks.log(`🧹 已成功從欄位 ${slotIdx + 1} 移除符號【${removed.name}】。`, 'system');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SUBSISTEMA 5: ATRIBUTOS ELEMENTAIS (RODA DE OPOSIÇÃO & 150/300)
 * ═══════════════════════════════════════════════════════════════════════════
 */
export const ELEMENT_DEFINITIONS = {
  fire: { name: '火 🔥', opposed: 'water', stoneId: 'fire_stone', dropZone: '諸神熔爐（等級 70+）' },
  water: { name: '水 💧', opposed: 'fire', stoneId: 'water_stone', dropZone: '伊娃花園（等級 45+）' },
  wind: { name: '風 🌪️', opposed: 'earth', stoneId: 'wind_stone', dropZone: '龍之谷（等級 55+）' },
  earth: { name: '地 🌍', opposed: 'wind', stoneId: 'earth_stone', dropZone: '密銀礦坑（等級 35+）' },
  holy: { name: '神聖 ✨', opposed: 'dark', stoneId: 'holy_stone', dropZone: '寂靜修道院（等級 75+）' },
  dark: { name: '黑暗 🌑', opposed: 'holy', stoneId: 'dark_stone', dropZone: '帝國陵墓／地穴（等級 70+）' }
};

export function getElementalDropSources() {
  return Object.entries(ELEMENT_DEFINITIONS).map(([key, elem]) => ({
    element: key,
    name: elem.name,
    stoneId: elem.stoneId,
    dropZone: elem.dropZone
  }));
}

export function applyElementalStone(state, equipUid, element = 'fire', callbacks = {}) {
  const item = (state.inventory || []).find(i => i.uid === equipUid || i.id === equipUid);
  if (!item) return false;

  const gData = D();
  const def = gData?.ALL_ITEMS?.[item.itemId || item.id] || item;
  const isWeapon = def?.slot === 'weapon';

  const maxCap = isWeapon ? 300 : 120;
  const currentVal = item.elementalAttribute?.val || 0;

  if (currentVal >= maxCap) {
    if (callbacks.log) callbacks.log(`此裝備已達元素最高上限 ${maxCap}！`, 'system');
    return false;
  }

  const step = isWeapon ? 20 : 6;
  const newVal = Math.min(maxCap, currentVal + step);

  item.elementalAttribute = {
    element,
    val: newVal
  };

  const elemInfo = ELEMENT_DEFINITIONS[element] || { name: element };

  if (callbacks.log) {
    callbacks.log(`🔥 元素注入：${def.name} 獲得 +${step} ${elemInfo.name}！（總計：${newVal}/${maxCap}）`, 'rarity-epic');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SUBSISTEMA 6: SÍNTESE DE CINTOS COM CÓPIAS DUPLICADAS (30% DE SUCESSO)
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function compoundBeltsWithDuplicates(state, primaryUid, secondaryUid, callbacks = {}) {
  const inv = state.inventory || [];
  const primaryItem = inv.find(i => i.uid === primaryUid || i.id === primaryUid);
  const secondaryItem = inv.find(i => i.uid === secondaryUid || i.id === secondaryUid);

  if (!primaryItem || !secondaryItem || primaryItem === secondaryItem) {
    if (callbacks.log) callbacks.log('請選擇兩條不同的腰帶進行合成！', 'system');
    return false;
  }

  const primaryId = primaryItem.itemId || primaryItem.id;
  const secondaryId = secondaryItem.itemId || secondaryItem.id;

  if (primaryId !== secondaryId) {
    if (callbacks.log) callbacks.log('合成需要 2 條相同類型與品級的腰帶！', 'system');
    return false;
  }

  const compoundCost = 100000;
  if ((state.gold || 0) < compoundCost) {
    if (callbacks.log) callbacks.log(`金幣不足！合成需要 ${compoundCost.toLocaleString()} 金幣。`, 'system');
    return false;
  }

  state.gold -= compoundCost;

  // Remove o cinto secundário do inventário
  const secIdx = inv.findIndex(i => (i.uid === secondaryUid || i.id === secondaryUid));
  if (secIdx !== -1) inv.splice(secIdx, 1);

  // 30% de chance canônica
  const isSuccess = Math.random() < 0.30;

  if (isSuccess) {
    primaryItem.enchant = (primaryItem.enchant || 0) + 1;
    primaryItem.beltBonuses = {
      hpBonusPct: 0.03 + (primaryItem.enchant * 0.01),
      pDefBonus: 15 + (primaryItem.enchant * 5),
      weightBonus: 1000 + (primaryItem.enchant * 500),
      pvpDmgPct: 0.02 + (primaryItem.enchant * 0.01)
    };

    if (callbacks.log) {
      callbacks.log(`✨ 腰帶合成成功（+${primaryItem.enchant}）！獲得 +${(primaryItem.beltBonuses.hpBonusPct * 100).toFixed(0)}% 最大生命值與 +${primaryItem.beltBonuses.pDefBonus} 物理防禦！`, 'rarity-legendary');
    }
  } else {
    if (callbacks.log) {
      callbacks.log(`💥 合成失敗！副腰帶已被摧毀，主腰帶保持完好。`, 'system');
    }
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return isSuccess;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SUBSISTEMA 7: AUGMENTATION (LIFE STONES TRANSPARENTES)
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function getLifeStoneDropSources() {
  return [
    { grade: 'common', name: '一般生命石', source: '狩獵怪物（1% 光效、2% 技能）' },
    { grade: 'mid', name: '中級生命石', source: '冠軍怪物（5% 光效、5% 技能）' },
    { grade: 'high', name: '高級生命石', source: '地城與副本首領（15% 光效、12% 技能）' },
    { grade: 'top', name: '頂級生命石', source: '團隊首領與史詩首領（40% 光效、25% 技能）' }
  ];
}

export function applyLifeStone(state, weaponUid, grade = 'top', callbacks = {}) {
  const item = (state.inventory || []).find(i => i.uid === weaponUid || i.id === weaponUid);
  if (!item) return false;

  const gData = D();
  const def = gData?.ALL_ITEMS?.[item.itemId || item.id] || item;
  if (def.slot !== 'weapon') {
    if (callbacks.log) callbacks.log('附魔改造只能套用在武器上！', 'system');
    return false;
  }

  const mult = grade === 'top' ? 3 : grade === 'high' ? 2 : 1;
  const atkBonus = Math.floor((15 + Math.random() * 25) * mult);
  const critBonus = Math.floor((5 + Math.random() * 15) * mult);
  const hpBonus = Math.floor((100 + Math.random() * 200) * mult);

  const skills = [
    { name: '物品技能：護盾', desc: '+15% 物理防禦' },
    { name: '物品技能：狂野魔法', desc: '+20% 魔法暴擊率' },
    { name: '物品技能：力量', desc: '+12% 物理攻擊' },
    { name: '物品技能：治癒', desc: '恢復 1,500 生命值' }
  ];
  const skill = (grade === 'top' || Math.random() < 0.25) ? skills[Math.floor(Math.random() * skills.length)] : null;

  item.augmentation = {
    grade,
    atkBonus,
    critBonus,
    hpBonus,
    skill
  };

  if (callbacks.log) {
    callbacks.log(`💎 附魔改造完成：${def.name} 獲得【+${atkBonus} 物理攻擊、+${critBonus} 暴擊、+${hpBonus} 生命值】${skill ? ` 與【${skill.name}】` : ''}！`, 'rarity-legendary');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

export function removeAugment(state, weaponUid, callbacks = {}) {
  const item = (state.inventory || []).find(i => i.uid === weaponUid || i.id === weaponUid);
  if (!item || !item.augmentation) return false;

  item.augmentation = null;
  if (callbacks.log) callbacks.log('精煉效果已成功移除。', 'system');

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SUBSISTEMA 8: RANDOM CRAFT CANÔNICO DA FORJA IMPERIAL
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * Normaliza e sincroniza o namespace canônico state.randomCraft.
 * @param {Object} state
 * @returns {{ points: number, charge: number, slots: Array, history: Array }}
 */
export function getNormalizedRandomCraft(state) {
  if (!state.randomCraft || typeof state.randomCraft !== 'object') {
    state.randomCraft = {
      points: Number(state.randomCraftCharge || state.craftPoints) || 0,
      charge: Number(state.craftCharges) || 0,
      slots: Array.isArray(state.randomCraftSlots) ? state.randomCraftSlots : [],
      history: []
    };
  }
  if (state.randomCraft.points === undefined) state.randomCraft.points = Number(state.randomCraftCharge || state.craftPoints) || 0;
  if (state.randomCraft.charge === undefined) state.randomCraft.charge = Number(state.craftCharges) || 0;
  if (!Array.isArray(state.randomCraft.slots)) state.randomCraft.slots = Array.isArray(state.randomCraftSlots) ? state.randomCraftSlots : [];
  if (!Array.isArray(state.randomCraft.history)) state.randomCraft.history = [];

  // Garante que se houver cargas ou slots vazios com carga ativa, 5 slots existam
  if (state.randomCraft.slots.length === 0) {
    state.randomCraft.slots = rollCanonicalRandomCraftSlots();
  }

  // Sincroniza campos legados para backward compatibility
  state.randomCraftCharge = state.randomCraft.points;
  state.randomCraftSlots = state.randomCraft.slots;
  state.craftPoints = state.randomCraft.points;
  state.craftCharges = state.randomCraft.charge;

  return state.randomCraft;
}

export function syncRandomCraftLegacy(state) {
  const rc = getNormalizedRandomCraft(state);
  state.randomCraftCharge = rc.points;
  state.randomCraftSlots = rc.slots;
  state.craftPoints = rc.points;
  state.craftCharges = rc.charge;
}

export function chargeRandomCraftWithItem(state, itemUid, callbacks = {}) {
  const inv = state.inventory || [];
  const itemIdx = inv.findIndex(i => (i.uid === itemUid || i.id === itemUid) && !i.equipped);
  if (itemIdx === -1) {
    if (callbacks.log) callbacks.log('找不到物品，或物品目前已裝備！', 'system');
    return false;
  }

  const selectedSet = getSelectedSet(state);
  if (selectedSet.has(itemUid)) {
    if (callbacks.log) callbacks.log('帶有 🔒 鎖定的物品無法回收！', 'system');
    return false;
  }

  const item = inv[itemIdx];
  const gData = D();
  const def = gData?.ALL_ITEMS?.[item.itemId || item.id] || item;
  const tier = Number(def.tier) || 1;

  const chargePoints = RECYCLE_POINTS_BY_TIER[tier] || 2;

  inv.splice(itemIdx, 1);
  return chargeRandomCraft(state, chargePoints, callbacks);
}

export function chargeRandomCraftWithAdena(state, callbacks = {}) {
  const feeAdena = RANDOM_CRAFT_ADENA_CHARGE_COST;
  if ((state.gold || 0) < feeAdena) {
    if (callbacks.log) callbacks.log(`增加 ${RANDOM_CRAFT_ADENA_CHARGE_POINTS} 點隨機製作充能需要 ${feeAdena.toLocaleString()} 金幣。`, 'system');
    return false;
  }

  state.gold -= feeAdena;
  return chargeRandomCraft(state, RANDOM_CRAFT_ADENA_CHARGE_POINTS, callbacks);
}

export function chargeRandomCraft(state, pointsToAdd = 20, callbacks = {}) {
  const rc = getNormalizedRandomCraft(state);
  rc.points = (rc.points || 0) + pointsToAdd;

  while (rc.points >= RANDOM_CRAFT_POINTS_PER_CHARGE) {
    rc.points -= RANDOM_CRAFT_POINTS_PER_CHARGE;
    rc.charge = (rc.charge || 0) + 1;
    if (callbacks.log) {
      callbacks.log(`🛠️ 隨機製作：獲得 1 次帝國充能！（目前共 ${rc.charge} 次）`, 'rarity-legendary');
    }
  }

  if (!rc.slots || rc.slots.length === 0) {
    rc.slots = rollCanonicalRandomCraftSlots();
  }

  syncRandomCraftLegacy(state);

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

export function refreshRandomCraftSlots(state, callbacks = {}) {
  const feeAdena = RANDOM_CRAFT_REROLL_COST;
  if ((state.gold || 0) < feeAdena) {
    if (callbacks.log) callbacks.log(`刷新輪盤 5 個欄位需要 ${feeAdena.toLocaleString()} 金幣。`, 'system');
    return false;
  }

  state.gold -= feeAdena;
  const rc = getNormalizedRandomCraft(state);
  rc.slots = rollCanonicalRandomCraftSlots();
  syncRandomCraftLegacy(state);

  if (callbacks.log) callbacks.log('🎰 帝國隨機製作輪盤已更新 5 件新物品！', 'system');
  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

export function rollRandomCraftSlots(state) {
  const rc = getNormalizedRandomCraft(state);
  rc.slots = rollCanonicalRandomCraftSlots();
  syncRandomCraftLegacy(state);
  return rc.slots;
}

export function spinRandomCraft(state, callbacks = {}) {
  const rc = getNormalizedRandomCraft(state);
  if (!rc.charge || rc.charge < 1) {
    if (callbacks.log) callbacks.log('你的隨機製作充能不足（需要 1 次充能 = 100 點）！', 'system');
    return false;
  }

  if (!rc.slots || rc.slots.length === 0) {
    rc.slots = rollCanonicalRandomCraftSlots();
  }

  // Sorteio aleatório uniforme entre os 5 slots (20% para cada item gerado, sem escolha manual do jogador)
  rc.charge -= 1;
  const wonIdx = Math.floor(Math.random() * rc.slots.length);
  const reward = rc.slots[wonIdx];

  const gData = D();
  const def = gData?.ALL_ITEMS?.[reward.itemId] || { name: reward.itemId };

  // Adiciona a recompensa ao inventário
  addToInventory(state, reward.itemId, reward.count || 1, reward.rarity || 'rare', false, callbacks);

  rc.history.unshift({
    itemId: reward.itemId,
    count: reward.count || 1,
    rarity: reward.rarity || 'rare',
    timestamp: Date.now()
  });
  if (rc.history.length > 20) rc.history.pop();

  if (callbacks.log) {
    callbacks.log(`🎰 隨機製作！輪盤抽中第 ${wonIdx + 1} 格：**${def.name}** ${reward.count > 1 ? `（${reward.count}×）` : ''}！`, 'rarity-legendary');
  }

  // Renova automaticamente os 5 slots para o próximo giro
  rc.slots = rollCanonicalRandomCraftSlots();
  syncRandomCraftLegacy(state);

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return reward;
}

export function claimRandomCraft(state, slotIdx = 0, callbacks = {}) {
  // Alias compatível: gira a roleta imperial
  return spinRandomCraft(state, callbacks);
}
