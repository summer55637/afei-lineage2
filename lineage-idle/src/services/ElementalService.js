/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ELEMENTAL SERVICE — NÍVEL 17: SOUL CRYSTALS & ATRIBUTOS ELEMENTAIS
 * ═══════════════════════════════════════════════════════════════════════════
 * Gerencia o sistema canônico de Encrustação de Lineage 2:
 * 1. Atributos Elementais (Fogo, 水, Vento, Terra, Sagrado, Trevas)
 * 2. Gating e Tetos por Grau de Equipamento (C/B: 60, A: 150, S: 300 Arma / 120 Armadura)
 * 3. Soul Crystals com suporte a Armas Primárias e Secundárias (Dual Arsenal)
 * 4. Sinergia em Combate (Vantagem Oposta, Dano Sagrado vs Undead, Defesa Elemental)
 * 5. Regra de Migração 17.4 (Valores excedentes são preservados sem downgrade)
 */

import { D } from '../core/GameConfig.js';

export const ELEMENT_DEFINITIONS = {
  fire: {
    key: 'fire',
    name: '火',
    icon: '🔥',
    color: '#ef4444',
    opposed: 'water',
    stoneId: 'fire_stone',
    desc: '對水屬性敵人傷害 +20%，對火屬性敵人傷害 -20%。',
    dropZone: '諸神熔爐（等級 70+）'
  },
  water: {
    key: 'water',
    name: '水',
    icon: '💧',
    color: '#3b82f6',
    opposed: 'fire',
    stoneId: 'water_stone',
    desc: '對火屬性敵人傷害 +20%，對水屬性敵人傷害 -20%。',
    dropZone: '伊娃花園（等級 45+）'
  },
  wind: {
    key: 'wind',
    name: '風',
    icon: '🌪️',
    color: '#22c55e',
    opposed: 'earth',
    stoneId: 'wind_stone',
    desc: '對地屬性敵人傷害 +20%，對風屬性敵人傷害 -20%。',
    dropZone: '龍之谷（等級 55+）'
  },
  earth: {
    key: 'earth',
    name: '地',
    icon: '🌍',
    color: '#d97706',
    opposed: 'wind',
    stoneId: 'earth_stone',
    desc: '對風屬性敵人傷害 +20%，對地屬性敵人傷害 -20%。',
    dropZone: '密銀礦坑（等級 35+）'
  },
  holy: {
    key: 'holy',
    name: '神聖',
    icon: '✨',
    color: '#eab308',
    opposed: 'dark',
    stoneId: 'holy_stone',
    desc: '對不死族、墓穴與惡魔的傷害提高 30%。',
    dropZone: '寂靜修道院（等級 75+）'
  },
  dark: {
    key: 'dark',
    name: '黑暗',
    icon: '🌑',
    color: '#a855f7',
    opposed: 'holy',
    stoneId: 'dark_stone',
    desc: '對神聖與天界生物的傷害提高 20%。',
    dropZone: '帝國陵墓／地穴（等級 70+）'
  }
};

export const ELEMENTAL_GRADE_GATING = {
  s: { minLevel: 76, maxCapWeapon: 300, maxCapArmor: 120, stoneCost: 250000, label: 'S 級' },
  a: { minLevel: 61, maxCapWeapon: 150, maxCapArmor: 60, stoneCost: 100000, label: 'A 級' },
  b: { minLevel: 52, maxCapWeapon: 60, maxCapArmor: 30, stoneCost: 50000, label: 'B 級' },
  c: { minLevel: 40, maxCapWeapon: 60, maxCapArmor: 30, stoneCost: 30000, label: 'C 級' }
};

export const SOUL_CRYSTAL_GRADE_GATING = {
  s: { minLevel: 76, adenaCost: 500000, label: 'S 級' },
  a: { minLevel: 61, adenaCost: 250000, label: 'A 級' },
  b: { minLevel: 52, adenaCost: 100000, label: 'B 級' },
  c: { minLevel: 40, adenaCost: 50000, label: 'C 級' },
  d: { minLevel: 20, adenaCost: 20000, label: 'D 級' }
};

export const SA_RUNES = {
  red: {
    focus: { key: 'focus', name: '專注', stat: 'crit', baseVal: 35, desc: '提高物理暴擊率' },
    might: { key: 'might', name: '力量', stat: 'patk', baseVal: 0.12, desc: '提高物理攻擊力' }
  },
  green: {
    acumen: { key: 'acumen', name: '靈敏', stat: 'castSpd', baseVal: 0.15, desc: '提高魔法施法速度' },
    health: { key: 'health', name: '生命', stat: 'hp', baseVal: 0.20, desc: '提高最大生命值' }
  },
  blue: {
    empower: { key: 'empower', name: '魔力增幅', stat: 'matk', baseVal: 0.15, desc: '提高魔法攻擊力' },
    guidance: { key: 'guidance', name: '引導', stat: 'accuracy', baseVal: 4, desc: '提高命中並降低失誤' }
  }
};

/**
 * Identifica o Grau de um item com fallback gracioso.
 */
export function getItemGrade(item) {
  if (!item) return 'none';
  const gData = D();
  const def = gData?.ALL_ITEMS?.[item.itemId || item.id] || item;
  const rawGrade = String(item.grade || def?.grade || '').toLowerCase();
  if (['s', 'a', 'b', 'c', 'd'].includes(rawGrade)) return rawGrade;
  
  // Detecção por tier de nível do item
  const lvlReq = Number(item.reqLvl || def?.reqLvl || def?.level || 1);
  if (lvlReq >= 76) return 's';
  if (lvlReq >= 61) return 'a';
  if (lvlReq >= 52) return 'b';
  if (lvlReq >= 40) return 'c';
  if (lvlReq >= 20) return 'd';
  return 'none';
}

/**
 * Retorna as regras de gating e teto elemental para um item.
 */
export function getElementalGating(item) {
  const grade = getItemGrade(item);
  const gating = ELEMENTAL_GRADE_GATING[grade];
  if (!gating) {
    return {
      eligible: false,
      grade,
      minLevel: 40,
      maxCapWeapon: 0,
      maxCapArmor: 0,
      stoneCost: 0,
      label: grade === 'd' ? 'D 級（無法附加元素）' : '無品級（無法附加元素）'
    };
  }

  const gData = D();
  const def = gData?.ALL_ITEMS?.[item.itemId || item.id] || item;
  const slot = def?.slot || item.slot;
  const isWeapon = slot === 'weapon' || slot === 'weapon2';

  return {
    eligible: true,
    grade,
    minLevel: gating.minLevel,
    maxCap: isWeapon ? gating.maxCapWeapon : gating.maxCapArmor,
    maxCapWeapon: gating.maxCapWeapon,
    maxCapArmor: gating.maxCapArmor,
    stoneCost: gating.stoneCost,
    label: gating.label,
    isWeapon
  };
}

/**
 * Aplica infusão elemental em armas ou armaduras respeitando tetos, nível e custo.
 * 17.4 Migration: Não rebaixa atributos de itens que já possuem valor acima do teto,
 * mas bloqueia novas adições até que o nível/grau correspondente seja atingido.
 */
export function applyElementalInfusion(state, equipUid, elementKey = 'fire', callbacks = {}) {
  const inv = state.inventory || [];
  const item = inv.find(i => i.uid === equipUid || i.id === equipUid);
  if (!item) {
    if (callbacks.log) callbacks.log('找不到可進行元素灌注的物品。', 'system');
    return false;
  }

  const gData = D();
  const def = gData?.ALL_ITEMS?.[item.itemId || item.id] || item;
  const slot = def?.slot || item.slot;
  const validSlots = ['weapon', 'weapon2', 'armor', 'chest', 'legs', 'head', 'helmet', 'gloves', 'boots', 'shield'];
  if (!validSlots.includes(slot)) {
    if (callbacks.log) callbacks.log('只有武器、防具與盾牌可以進行元素灌注！', 'system');
    return false;
  }

  const gating = getElementalGating(item);
  if (!gating.eligible) {
    if (callbacks.log) callbacks.log(`${gating.label} 裝備不支援元素灌注，需要 C 級以上裝備。`, 'system');
    return false;
  }

  const playerLvl = Number(state.level || 1);
  if (playerLvl < gating.minLevel) {
    if (callbacks.log) callbacks.log(`等級不足！${gating.label} 裝備需要等級 ${gating.minLevel} 以上才能進行元素灌注。`, 'system');
    return false;
  }

  const currentVal = Number(item.elementalAttribute?.val || 0);
  const currentElem = item.elementalAttribute?.element || 'none';

  // Regra de Migração 17.4: Se já tem valor igual ou superior ao teto, não reduz mas trava novos ganhos
  if (currentVal >= gating.maxCap) {
    if (callbacks.log) callbacks.log(`此裝備的 ${gating.label} 已達 +${gating.maxCap} 上限！`, 'system');
    return false;
  }

  // Se o item já tem outro elemento diferente, canonicamente no L2 precisa ser limpo ou sobreposto
  if (currentElem !== 'none' && currentElem !== elementKey && currentVal > 0) {
    if (callbacks.log) callbacks.log(`此物品已具有 [${currentElem.toUpperCase()}] 元素。請先清除原屬性，再灌注 ${elementKey.toUpperCase()}。`, 'system');
    return false;
  }

  // Custo em Adena
  const cost = gating.stoneCost;
  if ((state.gold || 0) < cost) {
    if (callbacks.log) callbacks.log(`金幣不足！元素灌注需要 ${cost.toLocaleString()} 金幣。`, 'system');
    return false;
  }

  // Consumo opcional de Pedra Elemental do inventário (se existir)
  const elemDef = ELEMENT_DEFINITIONS[elementKey] || ELEMENT_DEFINITIONS.fire;
  const stoneIdx = inv.findIndex(i => (i.itemId === elemDef.stoneId || i.id === elemDef.stoneId) && !i.equipped && (i.count || 1) > 0);
  if (stoneIdx !== -1) {
    if ((inv[stoneIdx].count || 1) > 1) {
      inv[stoneIdx].count--;
    } else {
      inv.splice(stoneIdx, 1);
    }
  }

  state.gold -= cost;

  const isWeapon = slot === 'weapon' || slot === 'weapon2';
  const step = isWeapon ? 20 : 6;
  const newVal = Math.min(gating.maxCap, currentVal + step);

  item.elementalAttribute = {
    element: elementKey,
    val: newVal
  };

  if (callbacks.log) {
    callbacks.log(`✨ 元素鍊金：${item.name || def.name} 已灌注 +${step} ${elemDef.name} ${elemDef.icon}！（${newVal}/${gating.maxCap}）`, 'rarity-epic');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

/**
 * Remove atributo elemental de um item (Reset).
 */
export function removeElementalInfusion(state, equipUid, callbacks = {}) {
  const inv = state.inventory || [];
  const item = inv.find(i => i.uid === equipUid || i.id === equipUid);
  if (!item || !item.elementalAttribute || item.elementalAttribute.val <= 0) return false;

  const resetCost = 25000;
  if ((state.gold || 0) < resetCost) {
    if (callbacks.log) callbacks.log(`金幣不足，無法進行元素淨化。需要 ${resetCost.toLocaleString()} 金幣。`, 'system');
    return false;
  }

  state.gold -= resetCost;
  const oldElem = item.elementalAttribute.element;
  item.elementalAttribute = { element: 'none', val: 0 };

  if (callbacks.log) {
    callbacks.log(`🌊 淨化完成：已成功移除 ${item.name || item.itemId} 的 [${oldElem.toUpperCase()}] 屬性。`, 'system');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

/**
 * Engaste de Soul Crystal (SA) em qualquer arma (Primária, Secundária ou Mochila).
 */
export function applySoulCrystalToWeapon(state, weaponUid, color = 'red', saKey = 'focus', callbacks = {}) {
  const inv = state.inventory || [];
  const item = inv.find(i => i.uid === weaponUid || i.id === weaponUid);
  if (!item) {
    if (callbacks.log) callbacks.log('找不到可鑲嵌靈魂水晶的武器。', 'system');
    return false;
  }

  const gData = D();
  const def = gData?.ALL_ITEMS?.[item.itemId || item.id] || item;
  const slot = def?.slot || item.slot;
  if (slot !== 'weapon' && slot !== 'weapon2') {
    if (callbacks.log) callbacks.log('靈魂水晶只能鑲嵌在主武器或副武器上！', 'system');
    return false;
  }

  const grade = getItemGrade(item);
  const gating = SOUL_CRYSTAL_GRADE_GATING[grade] || SOUL_CRYSTAL_GRADE_GATING.d;
  const playerLvl = Number(state.level || 1);

  if (playerLvl < gating.minLevel) {
    if (callbacks.log) callbacks.log(`等級不足！${gating.label} 武器需要等級 ${gating.minLevel}+ 才能鑲嵌靈魂水晶。`, 'system');
    return false;
  }

  const adenaCost = gating.adenaCost;
  if ((state.gold || 0) < adenaCost) {
    if (callbacks.log) callbacks.log(`金幣不足！在這把武器鑲嵌靈魂水晶需要 ${adenaCost.toLocaleString()} 金幣。`, 'system');
    return false;
  }

  const saGroup = SA_RUNES[color];
  const saBonus = saGroup?.[saKey] || Object.values(saGroup || {})[0];
  if (!saBonus) return false;

  // Busca cristal no inventário
  const crystalIdx = inv.findIndex(i => (i.itemId?.startsWith('soul_crystal_') || i.isSoulCrystal) && !i.equipped);
  const crystalLevel = crystalIdx !== -1 ? (inv[crystalIdx].stage || inv[crystalIdx].crystalLevel || 1) : 1;

  if (crystalIdx !== -1) {
    inv.splice(crystalIdx, 1); // Consome o cristal utilizado
  }

  state.gold -= adenaCost;

  // Escala de poder por nível do cristal (Nível 1 = 50%, Nível 10 = 85%, Nível 15 = 120%)
  const powerScale = 0.50 + (crystalLevel * 0.05);
  const finalVal = typeof saBonus.baseVal === 'number'
    ? (saBonus.baseVal > 1 ? Math.round(saBonus.baseVal * powerScale) : parseFloat((saBonus.baseVal * powerScale).toFixed(3)))
    : saBonus.baseVal;

  item.soulCrystal = {
    color,
    key: saKey,
    name: saBonus.name,
    level: crystalLevel,
    desc: `${saBonus.desc} (+${typeof finalVal === 'number' && finalVal < 1 ? (finalVal * 100).toFixed(0) + '%' : finalVal})`,
    stat: saBonus.stat,
    val: finalVal
  };

  if (callbacks.log) {
    callbacks.log(`🔮 已賦予特殊能力（等級 ${crystalLevel}）：${item.name || def.name} 獲得【特殊能力：${saBonus.name}】！（${item.soulCrystal.desc}）`, 'rarity-legendary');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

/**
 * Remove SA de uma arma.
 */
export function removeSoulCrystalFromWeapon(state, weaponUid, callbacks = {}) {
  const inv = state.inventory || [];
  const item = inv.find(i => i.uid === weaponUid || i.id === weaponUid);
  if (!item || !item.soulCrystal) return false;

  const cost = 20000;
  if ((state.gold || 0) < cost) {
    if (callbacks.log) callbacks.log(`金幣不足！取出靈魂水晶需要 ${cost.toLocaleString()} 金幣。`, 'system');
    return false;
  }

  state.gold -= cost;
  const oldSa = item.soulCrystal.name;
  item.soulCrystal = null;

  if (callbacks.log) {
    callbacks.log(`🧹 已從 ${item.name || item.itemId} 取出靈魂水晶 [${oldSa}]。`, 'system');
  }

  if (callbacks.updateAllUI) callbacks.updateAllUI();
  if (callbacks.save) callbacks.save();
  return true;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CÁLCULO DE COMBATE ELEMENTAL (OFENSIVO & DEFENSIVO)
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * Calcula o multiplicador elemental do ataque do jogador contra o monstro.
 * Considera Arma Primária + Arma Secundária (Dual Arsenal +50% contribuição).
 */
export function calculatePlayerElementalDamage(state, monster, rawDamage = 100) {
  const inv = state.inventory || [];
  const wpn1 = state.equipment?.weapon ? inv.find(i => i.uid === state.equipment.weapon) : null;
  const wpn2 = state.equipment?.weapon2 ? inv.find(i => i.uid === state.equipment.weapon2) : null;

  const elem1 = wpn1?.elementalAttribute || { element: 'none', val: 0 };
  const elem2 = wpn2?.elementalAttribute || { element: 'none', val: 0 };

  // Se nenhuma arma tiver elemento
  if ((elem1.val <= 0 || elem1.element === 'none') && (elem2.val <= 0 || elem2.element === 'none')) {
    return { finalDamage: rawDamage, multiplier: 1.0, element: 'none', bonusText: null };
  }

  // Determina elemento predominante e valor efetivo
  let activeElement = 'none';
  let totalEffectiveVal = 0;

  if (elem1.val > 0 && elem1.element !== 'none') {
    activeElement = elem1.element;
    totalEffectiveVal += elem1.val;
    // Se a secundária compartilha o mesmo elemento, soma com 50% de eficiência
    if (elem2.element === elem1.element) {
      totalEffectiveVal += Math.floor(elem2.val * 0.5);
    }
  } else if (elem2.val > 0 && elem2.element !== 'none') {
    activeElement = elem2.element;
    totalEffectiveVal += Math.floor(elem2.val * 0.75); // Secundária liderando o elemento
  }

  if (totalEffectiveVal <= 0 || activeElement === 'none') {
    return { finalDamage: rawDamage, multiplier: 1.0, element: 'none', bonusText: null };
  }

  // Bônus base de poder elemental (até +40% no teto de 300)
  let elemMult = 1.0 + ((Math.min(300, totalEffectiveVal) / 300) * 0.40);
  let bonusText = null;

  const monElem = monster?.element || (monster?.category === 'undead' || monster?.isUndead ? 'dark' : null);
  const defElem = ELEMENT_DEFINITIONS[activeElement];

  if (monElem && defElem) {
    // Vantagem de Oposição canônica L2 (+20%)
    if (defElem.opposed === monElem) {
      elemMult += 0.20;
      bonusText = `💥 元素克制（+20% ${defElem.name} 對 ${ELEMENT_DEFINITIONS[monElem]?.name || monElem}）！`;
    }
    // Especial Sagrado vs Dark / Undead / Demônios (+30%)
    else if (activeElement === 'holy' && (monElem === 'dark' || monster?.category === 'undead' || monster?.category === 'demon')) {
      elemMult += 0.30;
      bonusText = `✨ 神聖淨化（對不死族 +30%）！`;
    }
    // Penalidade se atacar mesmo elemento (-20%)
    else if (activeElement === monElem) {
      elemMult = Math.max(0.60, elemMult - 0.20);
      bonusText = `🛡️ 元素抗性（同屬性傷害 -20%）`;
    }
  }

  const finalDamage = Math.floor(rawDamage * elemMult);
  return {
    finalDamage,
    multiplier: elemMult,
    element: activeElement,
    effectiveVal: totalEffectiveVal,
    bonusText
  };
}

/**
 * Calcula a redução de dano recebido pelo jogador com base nos atributos de suas armaduras.
 */
export function calculateArmorElementalMitigation(state, monster, incomingDamage = 100) {
  if (!state.equipment) return incomingDamage;

  const inv = state.inventory || [];
  const armorSlots = ['armor', 'chest', 'legs', 'helmet', 'gloves', 'boots', 'shield'];
  
  // Agrega resistência elemental por elemento
  const elemResist = { fire: 0, water: 0, wind: 0, earth: 0, holy: 0, dark: 0 };
  let totalResist = 0;

  for (const slot of armorSlots) {
    const uid = state.equipment[slot];
    if (!uid) continue;
    const item = inv.find(i => i.uid === uid);
    if (item?.elementalAttribute?.val > 0 && item.elementalAttribute.element !== 'none') {
      const eKey = item.elementalAttribute.element;
      if (elemResist[eKey] !== undefined) {
        elemResist[eKey] += item.elementalAttribute.val;
        totalResist += item.elementalAttribute.val;
      }
    }
  }

  if (totalResist <= 0) return incomingDamage;

  const monElem = monster?.element || (monster?.category === 'undead' ? 'dark' : null);
  let mitigationPct = 0;

  if (monElem && elemResist[monElem] > 0) {
    // No canon de L2, ter atributo do mesmo elemento na armadura concede resistência direta àquele elemento
    const specificVal = elemResist[monElem];
    // Até 40% de mitigação contra o elemento específico (teto de 240 resist)
    mitigationPct = Math.min(0.40, (specificVal / 240) * 0.40);
  } else {
    // Redução geral suave para qualquer dano
    mitigationPct = Math.min(0.20, (totalResist / 600) * 0.20);
  }

  return Math.max(1, Math.floor(incomingDamage * (1 - mitigationPct)));
}

export const ElementalService = {
  ELEMENT_DEFINITIONS,
  ELEMENTAL_GRADE_GATING,
  SOUL_CRYSTAL_GRADE_GATING,
  SA_RUNES,
  getItemGrade,
  getElementalGating,
  applyElementalInfusion,
  removeElementalInfusion,
  applySoulCrystalToWeapon,
  removeSoulCrystalFromWeapon,
  calculatePlayerElementalDamage,
  calculateArmorElementalMitigation
};

export default ElementalService;
