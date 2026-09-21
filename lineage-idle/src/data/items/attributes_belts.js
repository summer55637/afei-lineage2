/**
 * attributes_belts.js — Atributos Elementais, Síntese de Cintos (PvE) e Augmentation por Life Stones
 */

export const ELEMENT_OPPOSITES = {
  fire: 'water',
  water: 'fire',
  earth: 'wind',
  wind: 'earth',
  dark: 'holy',
  holy: 'dark'
};

export const ELEMENTAL_STONES = {
  fire_stone: { id: 'fire_stone', name: '火之石 🔥', element: 'fire', slot: 'material', type: 'elemental_stone', tier: 4, rarity: 'epic', price: 25000, icon: 'materials/fire_reagent.png', desc: '灌注至武器（+20）或防具（+6），賦予火屬性。' },
  water_stone: { id: 'water_stone', name: '水之石 💧', element: 'water', slot: 'material', type: 'elemental_stone', tier: 4, rarity: 'epic', price: 25000, icon: 'materials/water_reagent.png', desc: '灌注至武器（+20）或防具（+6），賦予水屬性。' },
  earth_stone: { id: 'earth_stone', name: '地之石 🌍', element: 'earth', slot: 'material', type: 'elemental_stone', tier: 4, rarity: 'epic', price: 25000, icon: 'materials/compressed_stone.png', desc: '灌注至武器（+20）或防具（+6），賦予地屬性。' },
  wind_stone: { id: 'wind_stone', name: '風之石 🌪️', element: 'wind', slot: 'material', type: 'elemental_stone', tier: 4, rarity: 'epic', price: 25000, icon: 'materials/white_gemstone.png', desc: '灌注至武器（+20）或防具（+6），賦予風屬性。' },
  dark_stone: { id: 'dark_stone', name: '闇之石 🌑', element: 'dark', slot: 'material', type: 'elemental_stone', tier: 4, rarity: 'epic', price: 25000, icon: 'materials/dark_seed.png', desc: '灌注至武器（+20）或防具（+6），賦予闇屬性。' },
  holy_stone: { id: 'holy_stone', name: '神聖之石 ✨', element: 'holy', slot: 'material', type: 'elemental_stone', tier: 4, rarity: 'epic', price: 25000, icon: 'materials/holy_water.png', desc: '灌注至武器（+20）或防具（+6），賦予神聖屬性。' }
};

export const LIFE_STONE_ITEMS = {
  lifestone_common: { id: 'lifestone_common', name: '普通生命石 💎', grade: 'common', slot: 'material', type: 'lifestone', tier: 3, rarity: 'rare', price: 50000, icon: 'materials/crystal_blue_d.png', desc: '用於武器精煉的基礎生命石。' },
  lifestone_mid: { id: 'lifestone_mid', name: '中級生命石 💎', grade: 'mid', slot: 'material', type: 'lifestone', tier: 4, rarity: 'epic', price: 150000, icon: 'materials/bluem_gemstone.png', desc: '中級生命石，精煉時較容易取得額外屬性。' },
  lifestone_high: { id: 'lifestone_high', name: '高級生命石 💎', grade: 'high', slot: 'material', type: 'lifestone', tier: 5, rarity: 'legendary', price: 400000, icon: 'materials/crystal_red_b.png', desc: '高級生命石，較高機率取得物品技能。' },
  lifestone_top: { id: 'lifestone_top', name: '頂級生命石 💎', grade: 'top', slot: 'material', type: 'lifestone', tier: 6, rarity: 'sovereign', price: 1000000, icon: 'materials/crystal_gold_s.png', desc: '頂級生命石，具有 40% 光效機率與 25% 史詩物品技能機率。' }
};

export const BELT_ITEMS = {
  belt_cloth: { id: 'belt_cloth', name: '布腰帶［無等級］', slot: 'belt', tier: 1, rarity: 'common', price: 5000, icon: 'nograde/armors/armor_adventurer_belt.png', desc: '簡易布製腰帶，負重上限 +500。' },
  belt_leather: { id: 'belt_leather', name: '皮革腰帶［D 級］', slot: 'belt', tier: 2, rarity: 'rare', price: 25000, icon: 'graded/armors/armor_brigandine_belt.png', desc: '強化皮革腰帶，負重上限 +1000、物防 +10。' },
  belt_iron: { id: 'belt_iron', name: '鐵製腰帶［C 級］', slot: 'belt', tier: 3, rarity: 'epic', price: 75000, icon: 'gradec/armors/armor_full_plate_belt.png', desc: '鑲鐵腰帶，負重上限 +1500、物防 +20。' },
  belt_mithril: { id: 'belt_mithril', name: '米索莉腰帶［B 級］', slot: 'belt', tier: 4, rarity: 'epic', price: 200000, icon: 'gradeb/armors/armor_blue_wolf_belt.png', desc: '米索莉魔法腰帶，負重上限 +2000、物防 +35。' },
  belt_blessed_top: { id: 'belt_blessed_top', name: '祝福頂級魔法飾品腰帶［S］', slot: 'belt', tier: 6, rarity: 'legendary', price: 1000000, icon: 'gradespecial/armors/armor_nobless_belt.png', desc: '至尊神聖腰帶：PvE 總防禦 +7.2%、物理與技能傷害 +6%。' }
};

export function getAttributeDamageBonus(attackerAttr = 0, targetAttrDef = 0) {
  const diff = Math.max(0, attackerAttr - targetAttrDef);
  if (diff < 20) return 1.0;
  if (diff < 50) return 1.08 + (diff - 20) * (0.12 / 30);
  if (diff < 150) return 1.20;
  if (diff < 300) return 1.40;
  return 1.70;
}

export const BELT_COMPOUND_RATES = {
  1: { rate: 0.30, label: '腰帶合成（30% 成功率）' }
};

export const SUPERIOR_LIFE_STONE_AUGMENTS = [
  { id: 'might', name: '物品技能：力量', desc: '物攻 +8%（PvE）', pAtkMult: 0.08 },
  { id: 'empower', name: '物品技能：魔力催化', desc: '魔攻 +15%（PvE）', mAtkMult: 0.15 },
  { id: 'shield', name: '物品技能：護盾', desc: '物防 +10%（PvE）', pDefMult: 0.10 },
  { id: 'magicBarrier', name: '物品技能：魔法屏障', desc: '魔防 +12%（PvE）', mDefMult: 0.12 },
  { id: 'focus', name: '物品技能：專注', desc: '物理暴擊率 +50。', critRateAdd: 50 },
  { id: 'wildMagic', name: '物品技能：狂野魔法', desc: '魔法暴擊率 +4。', mCritAdd: 4 },
  { id: 'vampiricRage', name: '物品技能：吸血狂怒', desc: '吸血 +6%', lifestealAdd: 0.06 }
];