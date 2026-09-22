/**
 * heirloom_items.js — Catálogo de Equipamentos de Herança (Heirloom Scaling Gear).
 * 
 * Itens que escalam dinamicamente com o nível do jogador (Lv. 1 ao 40):
 * - Lv. 1 ao 19 (Fase 1): +50% de poder relativo ao No-Grade Verde de topo.
 * - Lv. 20 ao 39 (Fase 2): +50% de poder relativo ao D-Grade Verde de topo.
 * - Lv. 40+ (Fase 3): 100% dos atributos de um C-Grade Azul (+4/+6 com Glow).
 */

export const HEIRLOOM_ITEMS = {
  // ─── ARMAS DE HERANÇA (HEIRLOOM WEAPONS) ───────────────────────────────────
  weapon_heirloom_sword: {
    id: 'weapon_heirloom_sword',
    name: '領主傳承之劍',
    slot: 'weapon',
    weaponType: 'sword',
    rarity: 'heirloom',
    tier: 3, // Grade C na maturidade plena
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '會隨持有者從等級 1 成長至 40 而逐步提升力量的古代長劍。',
    icon: 'gradec/weapons/weapon_samurai_longsword.png',
    base: { atk: 138, crit: 8, hit: 12 },
    heirloomScaling: {
      phase1: { maxLvl: 19, baseMult: 1.5, stats: { atk: 38, crit: 5, hit: 5 }, label: '高階 無等級（+50%）' },
      phase2: { maxLvl: 39, baseMult: 1.5, stats: { atk: 85, crit: 7, hit: 8 }, label: '高階 D 級（+50%）' },
      phase3: { maxLvl: 40, baseMult: 1.0, stats: { atk: 138, crit: 8, hit: 12, enchantGlow: true }, label: '完整 C 級（+4 光效）' }
    }
  },
  weapon_heirloom_spear: {
    id: 'weapon_heirloom_spear',
    name: '先鋒傳承長槍',
    slot: 'weapon',
    weaponType: 'spear',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '會隨英雄等級提升而成長的傳說騎戰長槍（Lv.1～40）。',
    icon: 'gradec/weapons/weapon_spiked_spear.png',
    base: { atk: 138, crit: 6, hit: 10, aoeTargets: 4 },
    heirloomScaling: {
      phase1: { maxLvl: 19, baseMult: 1.5, stats: { atk: 38, crit: 4, hit: 4, aoeTargets: 2 }, label: '高階 無等級（+50%）' },
      phase2: { maxLvl: 39, baseMult: 1.5, stats: { atk: 85, crit: 5, hit: 7, aoeTargets: 3 }, label: '高階 D 級（+50%）' },
      phase3: { maxLvl: 40, baseMult: 1.0, stats: { atk: 138, crit: 6, hit: 10, aoeTargets: 4, enchantGlow: true }, label: '完整 C 級（+4 光效）' }
    }
  },
  weapon_heirloom_dagger: {
    id: 'weapon_heirloom_dagger',
    name: '暗影傳承匕首',
    slot: 'weapon',
    weaponType: 'dagger',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '以星辰鋼鍛造的精準刀刃，會隨 Lv.1～40 成長並提升致命能力。',
    icon: 'gradec/weapons/weapon_darkelven_dagger.png',
    base: { atk: 118, crit: 18, hit: 15, eva: 8 },
    heirloomScaling: {
      phase1: { maxLvl: 19, baseMult: 1.5, stats: { atk: 32, crit: 10, hit: 6, eva: 3 }, label: '高階 無等級（+50%）' },
      phase2: { maxLvl: 39, baseMult: 1.5, stats: { atk: 72, crit: 14, hit: 10, eva: 5 }, label: '高階 D 級（+50%）' },
      phase3: { maxLvl: 40, baseMult: 1.0, stats: { atk: 118, crit: 18, hit: 15, eva: 8, enchantGlow: true }, label: '完整 C 級（+4 光效）' }
    }
  },
  weapon_heirloom_bow: {
    id: 'weapon_heirloom_bow',
    name: '森林傳承之弓',
    slot: 'weapon',
    weaponType: 'bow',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '以神聖精靈木雕製的柔韌長弓，箭矢威力會持續成長。',
    icon: 'gradec/weapons/weapon_eminence_bow.png',
    base: { atk: 168, crit: 15, hit: 14 },
    heirloomScaling: {
      phase1: { maxLvl: 19, baseMult: 1.5, stats: { atk: 45, crit: 8, hit: 5 }, label: '高階 無等級（+50%）' },
      phase2: { maxLvl: 39, baseMult: 1.5, stats: { atk: 105, crit: 12, hit: 9 }, label: '高階 D 級（+50%）' },
      phase3: { maxLvl: 40, baseMult: 1.0, stats: { atk: 168, crit: 15, hit: 14, enchantGlow: true }, label: '完整 C 級（+4 光效）' }
    }
  },
  weapon_heirloom_staff: {
    id: 'weapon_heirloom_staff',
    name: '奧術傳承法杖',
    slot: 'weapon',
    weaponType: 'staff',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '鑲嵌奧術水晶的法杖，可強化魔法威力。',
    icon: 'gradec/weapons/weapon_crystal_staff.png',
    base: { atk: 68, matk: 165, mdef: 18, mp: 80 },
    heirloomScaling: {
      phase1: { maxLvl: 19, baseMult: 1.5, stats: { atk: 18, matk: 45, mdef: 6, mp: 20 }, label: '高階 無等級（+50%）' },
      phase2: { maxLvl: 39, baseMult: 1.5, stats: { atk: 42, matk: 102, mdef: 12, mp: 45 }, label: '高階 D 級（+50%）' },
      phase3: { maxLvl: 40, baseMult: 1.0, stats: { atk: 68, matk: 165, mdef: 18, mp: 80, enchantGlow: true }, label: '完整 C 級（+4 光效）' }
    }
  },
  weapon_heirloom_duals: {
    id: 'weapon_heirloom_duals',
    name: '角鬥士傳承雙劍',
    slot: 'weapon',
    weaponType: 'dual_sword',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '為高速戰士鍛造的雙刃武器，可施展致命連斬。',
    icon: 'gradec/weapons/weapon_dual_revolution_sword.png',
    base: { atk: 148, crit: 10, hit: 12 },
    heirloomScaling: {
      phase1: { maxLvl: 19, baseMult: 1.5, stats: { atk: 40, crit: 6, hit: 5 }, label: '高階 無等級（+50%）' },
      phase2: { maxLvl: 39, baseMult: 1.5, stats: { atk: 92, crit: 8, hit: 8 }, label: '高階 D 級（+50%）' },
      phase3: { maxLvl: 40, baseMult: 1.0, stats: { atk: 148, crit: 10, hit: 12, enchantGlow: true }, label: '完整 C 級（+4 光效）' }
    }
  },
  weapon_heirloom_blunt: {
    id: 'weapon_heirloom_blunt',
    name: '工匠傳承戰鎚',
    slot: 'weapon',
    weaponType: 'blunt',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '沉重鍛造戰鎚，能以強烈衝擊粉碎敵方防具。',
    icon: 'gradec/weapons/weapon_big_hammer.png',
    base: { atk: 142, crit: 6, hit: 10, stunChance: 0.15 },
    heirloomScaling: {
      phase1: { maxLvl: 19, baseMult: 1.5, stats: { atk: 39, crit: 4, hit: 4, stunChance: 0.05 }, label: '高階 無等級（+50%）' },
      phase2: { maxLvl: 39, baseMult: 1.5, stats: { atk: 88, crit: 5, hit: 7, stunChance: 0.10 }, label: '高階 D 級（+50%）' },
      phase3: { maxLvl: 40, baseMult: 1.0, stats: { atk: 142, crit: 6, hit: 10, stunChance: 0.15, enchantGlow: true }, label: '完整 C 級（+4 光效）' }
    }
  },

  // ─── ARMADURAS DE HERANÇA POR ARQUÉTIPO (HEAVY, LIGHT, ROBE) ─────────────
  
  // 1. CONJUNTO PESADO (HEAVY - GUERREIROS, TANKS, VANGUARD)
  armor_heirloom_chest_heavy: {
    id: 'armor_heirloom_chest_heavy',
    name: '傳承板甲',
    slot: 'armor',
    armorType: 'heavy',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '為承受衝鋒與巨型怪物衝擊而打造的板甲胸甲。',
    icon: 'gradec/armors/armor_full_plate_heavy_armor.png',
    base: { def: 98, hp: 280, mdef: 36, weightBonus: 2000 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 28, hp: 70, mdef: 10, weightBonus: 500 } },
      phase2: { maxLvl: 39, stats: { def: 60, hp: 160, mdef: 22, weightBonus: 1200 } },
      phase3: { maxLvl: 40, stats: { def: 98, hp: 280, mdef: 36, weightBonus: 2000 } }
    }
  },
  armor_heirloom_legs_heavy: {
    id: 'armor_heirloom_legs_heavy',
    name: '傳承板甲護腿',
    slot: 'legs',
    armorType: 'heavy',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '為前線戰士設計的可動式腿部防具。',
    icon: 'gradec/armors/armor_plated_leather_light_pants.png',
    base: { def: 62, hp: 180, mdef: 24 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 18, hp: 45, mdef: 7 } },
      phase2: { maxLvl: 39, stats: { def: 38, hp: 100, mdef: 15 } },
      phase3: { maxLvl: 40, stats: { def: 62, hp: 180, mdef: 24 } }
    }
  },
  armor_heirloom_helmet_heavy: {
    id: 'armor_heirloom_helmet_heavy',
    name: '傳承板甲頭盔',
    slot: 'helmet',
    armorType: 'heavy',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '配有防護面罩的拋光鐵製頭盔。',
    icon: 'gradec/armors/armor_full_plate_heavy_helmet.png',
    base: { def: 42, hp: 120, mdef: 18 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 12, hp: 30, mdef: 5 } },
      phase2: { maxLvl: 39, stats: { def: 26, hp: 70, mdef: 11 } },
      phase3: { maxLvl: 40, stats: { def: 42, hp: 120, mdef: 18 } }
    }
  },
  armor_heirloom_gloves_heavy: {
    id: 'armor_heirloom_gloves_heavy',
    name: '傳承鐵製護手',
    slot: 'gloves',
    armorType: 'heavy',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '堅固護手，可更穩定地揮舞重型武器。',
    icon: 'gradec/armors/armor_full_plate_heavy_gloves.png',
    base: { def: 32, atkSpeed: 5, hit: 6, mdef: 14 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 9, atkSpeed: 2, hit: 2, mdef: 4 } },
      phase2: { maxLvl: 39, stats: { def: 20, atkSpeed: 3, hit: 4, mdef: 8 } },
      phase3: { maxLvl: 40, stats: { def: 32, atkSpeed: 5, hit: 6, mdef: 14 } }
    }
  },
  armor_heirloom_boots_heavy: {
    id: 'armor_heirloom_boots_heavy',
    name: '傳承鐵製戰靴',
    slot: 'boots',
    armorType: 'heavy',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '強化戰靴，可提升近身戰鬥時的穩定性。',
    icon: 'gradec/armors/armor_full_plate_heavy_boots.png',
    base: { def: 32, speed: 6, mdef: 14 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 9, speed: 2, mdef: 4 } },
      phase2: { maxLvl: 39, stats: { def: 20, speed: 4, mdef: 8 } },
      phase3: { maxLvl: 40, stats: { def: 32, speed: 6, mdef: 14 } }
    }
  },

  // 2. CONJUNTO LEVE (LIGHT - ARQUEIROS, ASSASSINOS, KAMAEL)
  armor_heirloom_chest_light: {
    id: 'armor_heirloom_chest_light',
    name: '傳承皮革背心',
    slot: 'armor',
    armorType: 'light',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '強化柔韌皮革製成，兼顧靈活移動與精準閃避。',
    icon: 'gradec/armors/armor_theca_light_armor.png',
    base: { def: 78, eva: 8, crit: 6, mdef: 32 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 22, eva: 3, crit: 2, mdef: 8 } },
      phase2: { maxLvl: 39, stats: { def: 48, eva: 5, crit: 4, mdef: 18 } },
      phase3: { maxLvl: 40, stats: { def: 78, eva: 8, crit: 6, mdef: 32 } }
    }
  },
  armor_heirloom_legs_light: {
    id: 'armor_heirloom_legs_light',
    name: '傳承皮革長褲',
    slot: 'legs',
    armorType: 'light',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '輕巧獵人長褲，不會妨礙潛行步伐。',
    icon: 'gradec/armors/armor_theca_light_pants.png',
    base: { def: 50, eva: 6, speed: 4, mdef: 20 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 14, eva: 2, speed: 1, mdef: 6 } },
      phase2: { maxLvl: 39, stats: { def: 30, eva: 4, speed: 2, mdef: 12 } },
      phase3: { maxLvl: 40, stats: { def: 50, eva: 6, speed: 4, mdef: 20 } }
    }
  },
  armor_heirloom_helmet_light: {
    id: 'armor_heirloom_helmet_light',
    name: '傳承皮革帽',
    slot: 'helmet',
    armorType: 'light',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '開放式輕型頭部防具，可維持最佳瞄準精度。',
    icon: 'gradec/armors/armor_theca_light_helmet.png',
    base: { def: 34, hit: 6, mdef: 16 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 10, hit: 2, mdef: 4 } },
      phase2: { maxLvl: 39, stats: { def: 20, hit: 4, mdef: 10 } },
      phase3: { maxLvl: 40, stats: { def: 34, hit: 6, mdef: 16 } }
    }
  },
  armor_heirloom_gloves_light: {
    id: 'armor_heirloom_gloves_light',
    name: '傳承皮革手套',
    slot: 'gloves',
    armorType: 'light',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '龍皮製成的手套，可提高攻擊與箭矢射擊速度。',
    icon: 'gradec/armors/armor_theca_light_gloves.png',
    base: { def: 26, atkSpeed: 8, crit: 4, mdef: 12 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 8, atkSpeed: 3, crit: 1, mdef: 3 } },
      phase2: { maxLvl: 39, stats: { def: 16, atkSpeed: 5, crit: 2, mdef: 7 } },
      phase3: { maxLvl: 40, stats: { def: 26, atkSpeed: 8, crit: 4, mdef: 12 } }
    }
  },
  armor_heirloom_boots_light: {
    id: 'armor_heirloom_boots_light',
    name: '傳承皮革靴',
    slot: 'boots',
    armorType: 'light',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '柔軟靴子可降低腳步聲並提升奔跑速度。',
    icon: 'gradec/armors/armor_theca_light_boots.png',
    base: { def: 26, speed: 10, eva: 6, mdef: 12 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 8, speed: 4, eva: 2, mdef: 3 } },
      phase2: { maxLvl: 39, stats: { def: 16, speed: 7, eva: 4, mdef: 7 } },
      phase3: { maxLvl: 40, stats: { def: 26, speed: 10, eva: 6, mdef: 12 } }
    }
  },

  // 3. CONJUNTO MÁGICO (ROBE - MAGOS, FEITICEIROS, HEALERS)
  armor_heirloom_chest_robe: {
    id: 'armor_heirloom_chest_robe',
    name: '傳承奧術法袍',
    slot: 'armor',
    armorType: 'robe',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '以乙太絲線編織的法袍，可提升魔法力量與 魔力 恢復。',
    icon: 'gradec/armors/armor_karmian_robe_armor.png',
    base: { def: 56, matk: 35, mp: 250, mdef: 58, mpRegen: 8 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 16, matk: 10, mp: 60, mdef: 16, mpRegen: 2 } },
      phase2: { maxLvl: 39, stats: { def: 34, matk: 22, mp: 140, mdef: 35, mpRegen: 5 } },
      phase3: { maxLvl: 40, stats: { def: 56, matk: 35, mp: 250, mdef: 58, mpRegen: 8 } }
    }
  },
  armor_heirloom_legs_robe: {
    id: 'armor_heirloom_legs_robe',
    name: '傳承奧術長褲',
    slot: 'legs',
    armorType: 'robe',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '可穩定魔力流動的魔法下裝。',
    icon: 'gradec/armors/armor_karmian_robe_pants.png',
    base: { def: 38, mp: 160, mdef: 40 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 10, mp: 40, mdef: 12 } },
      phase2: { maxLvl: 39, stats: { def: 24, mp: 90, mdef: 24 } },
      phase3: { maxLvl: 40, stats: { def: 38, mp: 160, mdef: 40 } }
    }
  },
  armor_heirloom_helmet_robe: {
    id: 'armor_heirloom_helmet_robe',
    name: '傳承奧術頭冠',
    slot: 'helmet',
    armorType: 'robe',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '鑲嵌藍寶石的銀色頭冠，可在施法時保持思緒清晰。',
    icon: 'gradec/armors/armor_karmian_helmet.png',
    base: { def: 26, matk: 15, mdef: 32 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 8, matk: 4, mdef: 10 } },
      phase2: { maxLvl: 39, stats: { def: 16, matk: 9, mdef: 20 } },
      phase3: { maxLvl: 40, stats: { def: 26, matk: 15, mdef: 32 } }
    }
  },
  armor_heirloom_gloves_robe: {
    id: 'armor_heirloom_gloves_robe',
    name: '傳承絲綢手套',
    slot: 'gloves',
    armorType: 'robe',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '以純淨魔法絲綢製成，可提升施法速度。',
    icon: 'gradec/armors/armor_karmian_robe_gloves.png',
    base: { def: 20, castSpeed: 15, mdef: 24 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 6, castSpeed: 5, mdef: 8 } },
      phase2: { maxLvl: 39, stats: { def: 12, castSpeed: 10, mdef: 15 } },
      phase3: { maxLvl: 40, stats: { def: 20, castSpeed: 15, mdef: 24 } }
    }
  },
  armor_heirloom_boots_robe: {
    id: 'armor_heirloom_boots_robe',
    name: '傳承奧術涼鞋',
    slot: 'boots',
    armorType: 'robe',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    set: 'heirloom_set',
    maxHeirloomLevel: 40,
    desc: '可將大地魔力導向施法者的輕型涼鞋。',
    icon: 'gradec/armors/armor_karmian_robe_boots.png',
    base: { def: 20, speed: 7, mpRegen: 4, mdef: 24 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 6, speed: 3, mpRegen: 1, mdef: 8 } },
      phase2: { maxLvl: 39, stats: { def: 12, speed: 5, mpRegen: 2, mdef: 15 } },
      phase3: { maxLvl: 40, stats: { def: 20, speed: 7, mpRegen: 4, mdef: 24 } }
    }
  },

  // Aliases de compatibilidade
  armor_heirloom_chest: {
    id: 'armor_heirloom_chest_heavy',
    name: '傳承板甲',
    slot: 'armor',
    armorType: 'heavy',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '為承受衝鋒與巨型怪物衝擊而打造的板甲胸甲。',
    icon: 'gradec/armors/armor_full_plate_heavy_armor.png',
    base: { def: 98, hp: 280, mdef: 36, weightBonus: 2000 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 28, hp: 70, mdef: 10, weightBonus: 500 } },
      phase2: { maxLvl: 39, stats: { def: 60, hp: 160, mdef: 22, weightBonus: 1200 } },
      phase3: { maxLvl: 40, stats: { def: 98, hp: 280, mdef: 36, weightBonus: 2000 } }
    }
  },
  armor_heirloom_legs: {
    id: 'armor_heirloom_legs_heavy',
    name: '傳承板甲護腿',
    slot: 'legs',
    armorType: 'heavy',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '為前線戰士設計的可動式腿部防具。',
    icon: 'gradec/armors/armor_plated_leather_light_pants.png',
    base: { def: 62, hp: 180, mdef: 24 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 18, hp: 45, mdef: 7 } },
      phase2: { maxLvl: 39, stats: { def: 38, hp: 100, mdef: 15 } },
      phase3: { maxLvl: 40, stats: { def: 62, hp: 180, mdef: 24 } }
    }
  },
  armor_heirloom_helmet: {
    id: 'armor_heirloom_helmet_heavy',
    name: '傳承板甲頭盔',
    slot: 'helmet',
    armorType: 'heavy',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '配有防護面罩的拋光鐵製頭盔。',
    icon: 'gradec/armors/armor_full_plate_heavy_helmet.png',
    base: { def: 42, hp: 120, mdef: 18 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 12, hp: 30, mdef: 5 } },
      phase2: { maxLvl: 39, stats: { def: 26, hp: 70, mdef: 11 } },
      phase3: { maxLvl: 40, stats: { def: 42, hp: 120, mdef: 18 } }
    }
  },
  armor_heirloom_gloves: {
    id: 'armor_heirloom_gloves_heavy',
    name: '傳承鐵製護手',
    slot: 'gloves',
    armorType: 'heavy',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '堅固護手，可更穩定地揮舞重型武器。',
    icon: 'gradec/armors/armor_full_plate_heavy_gloves.png',
    base: { def: 32, atkSpeed: 5, hit: 6, mdef: 14 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 9, atkSpeed: 2, hit: 2, mdef: 4 } },
      phase2: { maxLvl: 39, stats: { def: 20, atkSpeed: 3, hit: 4, mdef: 8 } },
      phase3: { maxLvl: 40, stats: { def: 32, atkSpeed: 5, hit: 6, mdef: 14 } }
    }
  },
  armor_heirloom_boots: {
    id: 'armor_heirloom_boots_heavy',
    name: '傳承鐵製戰靴',
    slot: 'boots',
    armorType: 'heavy',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '強化戰靴，可提升近身戰鬥時的穩定性。',
    icon: 'gradec/armors/armor_full_plate_heavy_boots.png',
    base: { def: 32, speed: 6, mdef: 14 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 9, speed: 2, mdef: 4 } },
      phase2: { maxLvl: 39, stats: { def: 20, speed: 4, mdef: 8 } },
      phase3: { maxLvl: 40, stats: { def: 32, speed: 6, mdef: 14 } }
    }
  },
  shield_heirloom_aegis: {
    id: 'shield_heirloom_aegis',
    name: '神盾傳承之盾',
    slot: 'shield',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '可阻擋投射物與重擊的守護之盾。',
    icon: 'gradec/armors/armor_full_plate_shield.png',
    base: { def: 74, blockRate: 25, hp: 150 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 22, blockRate: 15, hp: 40 } },
      phase2: { maxLvl: 39, stats: { def: 46, blockRate: 20, hp: 90 } },
      phase3: { maxLvl: 40, stats: { def: 74, blockRate: 25, hp: 150 } }
    }
  },

  // ─── JOIAS DE HERANÇA (HEIRLOOM JEWELRY) ───────────────────────────────────
  jewelry_heirloom_necklace: {
    id: 'jewelry_heirloom_necklace',
    name: '亞丁傳承項鍊',
    slot: 'necklace',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '皇家護身符，可提供更高魔法防護與生命力。',
    icon: 'gradec/jewels/jewel_blessed_necklace.png',
    base: { mdef: 48, hp: 160, mp: 80 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { mdef: 14, hp: 40, mp: 20 } },
      phase2: { maxLvl: 39, stats: { mdef: 29, hp: 90, mp: 45 } },
      phase3: { maxLvl: 40, stats: { mdef: 48, hp: 160, mp: 80 } }
    }
  },
  jewelry_heirloom_earring_1: {
    id: 'jewelry_heirloom_earring_1',
    name: '月之傳承耳環',
    slot: 'earring1',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '沐浴月光的神秘耳環，可提升防禦與抗性。',
    icon: 'gradec/jewels/jewel_blessed_earing.png',
    base: { mdef: 36, hp: 90, stunResist: 0.10 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { mdef: 10, hp: 25, stunResist: 0.03 } },
      phase2: { maxLvl: 39, stats: { mdef: 22, hp: 50, stunResist: 0.06 } },
      phase3: { maxLvl: 40, stats: { mdef: 36, hp: 90, stunResist: 0.10 } }
    }
  },
  jewelry_heirloom_earring_2: {
    id: 'jewelry_heirloom_earring_2',
    name: '日之傳承耳環',
    slot: 'earring2',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '承載太陽能量的閃耀耳環，可提升恢復能力。',
    icon: 'gradec/jewels/jewel_blessed_earing.png',
    base: { mdef: 36, hp: 90, hpRegen: 5 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { mdef: 10, hp: 25, hpRegen: 1 } },
      phase2: { maxLvl: 39, stats: { mdef: 22, hp: 50, hpRegen: 3 } },
      phase3: { maxLvl: 40, stats: { mdef: 36, hp: 90, hpRegen: 5 } }
    }
  },
  jewelry_heirloom_ring_1: {
    id: 'jewelry_heirloom_ring_1',
    name: '命運傳承戒指',
    slot: 'ring1',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '鑲嵌古代藍寶石，可提升攻擊力。',
    icon: 'gradec/jewels/jewel_blessed_ring.png',
    base: { mdef: 24, atk: 12, critDmg: 0.05 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { mdef: 7, atk: 3, critDmg: 0.01 } },
      phase2: { maxLvl: 39, stats: { mdef: 15, atk: 7, critDmg: 0.03 } },
      phase3: { maxLvl: 40, stats: { mdef: 24, atk: 12, critDmg: 0.05 } }
    }
  },
  jewelry_heirloom_ring_2: {
    id: 'jewelry_heirloom_ring_2',
    name: '榮耀傳承戒指',
    slot: 'ring2',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '鑲嵌古代紅寶石，可提升暴擊率。',
    icon: 'gradec/jewels/jewel_blessed_ring.png',
    base: { mdef: 24, crit: 5, matk: 15 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { mdef: 7, crit: 1, matk: 4 } },
      phase2: { maxLvl: 39, stats: { mdef: 15, crit: 3, matk: 9 } },
      phase3: { maxLvl: 40, stats: { mdef: 24, crit: 5, matk: 15 } }
    }
  },

  // ─── ACESSÓRIOS ESPECIAIS DE HERANÇA (CLOAK, BELT, CROWN) ─────────────────
  cloak_heirloom_royal: {
    id: 'cloak_heirloom_royal',
    name: '傳承皇家披風',
    slot: 'cloak',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '以金線刺繡的天鵝絨披風，可抵禦各種元素。',
    icon: 'gradec/armors/armor_full_plate_cloack.png',
    base: { def: 18, mdef: 22, hp: 100 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 5, mdef: 6, hp: 30 } },
      phase2: { maxLvl: 39, stats: { def: 11, mdef: 14, hp: 60 } },
      phase3: { maxLvl: 40, stats: { def: 18, mdef: 22, hp: 100 } }
    }
  },
  belt_heirloom_champion: {
    id: 'belt_heirloom_champion',
    name: '冠軍傳承腰帶',
    slot: 'belt',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '龍皮腰帶，可提升負重與背包容量。',
    icon: 'gradec/armors/armor_full_plate_belt.png',
    base: { def: 14, hp: 80, weightBonus: 3000, invSlots: 20 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 4, hp: 20, weightBonus: 1000, invSlots: 10 } },
      phase2: { maxLvl: 39, stats: { def: 8, hp: 50, weightBonus: 2000, invSlots: 15 } },
      phase3: { maxLvl: 40, stats: { def: 14, hp: 80, weightBonus: 3000, invSlots: 20 } }
    }
  },
  hair_heirloom_crown: {
    id: 'hair_heirloom_crown',
    name: '至尊領主翼冠',
    slot: 'hair1',
    rarity: 'heirloom',
    tier: 3,
    isHeirloom: true,
    maxHeirloomLevel: 40,
    desc: '帶有雙翼的閃耀金色頭冠，散發威嚴與權威。',
    icon: 'acessories/noble_gold_crown.png',
    base: { def: 10, mdef: 15, hp: 100, xpBoost: 0.10 },
    heirloomScaling: {
      phase1: { maxLvl: 19, stats: { def: 3, mdef: 5, hp: 30, xpBoost: 0.05 } },
      phase2: { maxLvl: 39, stats: { def: 6, mdef: 10, hp: 60, xpBoost: 0.08 } },
      phase3: { maxLvl: 40, stats: { def: 10, mdef: 15, hp: 100, xpBoost: 0.10 } }
    }
  }
};
