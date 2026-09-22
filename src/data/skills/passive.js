// ═══════════════════════════════════════════
// SKILLS — Passive Mastery & Stat Boost Skills
// ═══════════════════════════════════════════

export const PASSIVE_SKILLS = {
  weapon_mastery_f: {
    id: "weapon_mastery_f",
    name: "武器精通",
    type: "passive",
    rarity: "1★",
    cost: 5,
    max: 10,
    reqLvl: 1,
    tier: 0,
    icon: "🗡️",
    desc: "每級提高 2.5 基礎物理攻擊。",
    // NOVO: Valores reais para o motor calcular
    bonuses: { atk: 2.5 } 
  },
  light_armor_f: {
    id: "light_armor_f",
    name: "輕甲精通",
    type: "passive",
    rarity: "1★",
    cost: 10,
    max: 5,
    reqLvl: 20,
    tier: 1,
    icon: "🥋",
    desc: "穿著輕甲時提高物理防禦與迴避。",
    bonuses: { def: 2.0, eva: 1.0 }
  },
  heavy_armor_f: {
    id: "heavy_armor_f",
    name: "重甲精通",
    type: "passive",
    rarity: "1★",
    cost: 10,
    max: 5,
    reqLvl: 20,
    tier: 1,
    icon: "🛡️",
    desc: "穿著重甲時每級提高 2.5 物理防禦。",
    bonuses: { def: 2.5 }
  },
  boost_hp_f: {
    id: "boost_hp_f",
    name: "生命強化",
    type: "passive",
    rarity: "1★",
    cost: 10,
    max: 5,
    reqLvl: 20,
    tier: 1,
    icon: "❤️",
    desc: "每級提高 40 最大生命值。",
    bonuses: { hp: 40 }
  },
  weapon_mastery_m: {
    id: "weapon_mastery_m",
    name: "魔法武器精通",
    type: "passive",
    rarity: "1★",
    cost: 5,
    max: 10,
    reqLvl: 1,
    tier: 0,
    icon: "🔮",
    desc: "每級提高 2.5 魔法攻擊。",
    bonuses: { matk: 2.5 }
  },
  robe_mast_m: {
    id: "robe_mast_m",
    name: "法袍精通",
    type: "passive",
    rarity: "1★",
    cost: 10,
    max: 5,
    reqLvl: 1,
    tier: 0,
    icon: "👘",
    desc: "穿著法袍時提高物理防禦並加快魔力恢復。",
    bonuses: { def: 1.5, mpRegen: 2.0 }
  },
  boost_mana_m: {
    id: "boost_mana_m",
    name: "魔力強化",
    type: "passive",
    rarity: "1★",
    cost: 10,
    max: 5,
    reqLvl: 20,
    tier: 1,
    icon: "🌊",
    desc: "每級提高 40 最大魔力。",
    bonuses: { mp: 40 }
  },
  anti_magic_m: {
    id: "anti_magic_m",
    name: "抗魔",
    type: "passive",
    rarity: "1★",
    cost: 15,
    max: 5,
    reqLvl: 20,
    tier: 1,
    icon: "🛡️✨",
    desc: "提高 18 魔法防禦與魔法抗性。",
    bonuses: { mdef: 18 }
  },
  dual_weapon_mast: {
    id: "dual_weapon_mast",
    name: "雙武器精通",
    type: "passive",
    rarity: "2★",
    cost: 20,
    max: 5,
    reqLvl: 40,
    tier: 2,
    icon: "⚔️",
    desc: "使用雙刀時提高 15% 物理攻擊。",
    bonuses: { atkPct: 15 } // Porcentagem
  }
};
