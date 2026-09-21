/**
 * raids.js — Definições dos Raid Bosses e Masmorras Diárias do Lineage Idle.
 *
 * Contém os 8 Chefes Épicos canônicos de Lineage II:
 * 1. Queen Ant (Lv. 40 - Ermos de Gludio)
 * 2. Core (Lv. 50 - Torre Cruma)
 * 3. Orfen (Lv. 55 - Mar de Esporos)
 * 4. Zaken (Lv. 60 - Navio Pirata da Ilha do Diabo)
 * 5. Imperador Baium (Lv. 75 - Torre da Insolência)
 * 6. Frintezza & Scarlet van Halisha (Lv. 85 - Sepulcro Imperial)
 * 7. Dragão Antharas (Lv. 95 - Covil do Dragão da Terra)
 * 8. Dragão Valakas (Lv. 100 - Vulcão Forja dos Deuses)
 */

import { RAID_BOSS_BALANCE } from './balance/bossBalance.js';

export const RAID_BOSSES = {
  queen_ant: {
    id: 'queen_ant',
    name: 'Queen Ant 👑',
    title: 'Rainha dos Ermos de Gludio',
    lvl: 40,
    hp: 35000,
    atk: 220,
    def: 75,
    mdef: 110,
    eva: 10,
    crit: 12,
    xp: 28000,
    sp: 350,
    gold: [15000, 30000],
    boss: true,
    raid: true,
    reqLvl: 30,
    icon: 'gradespecial/jewels/jewel_ring_queen_ant.png',
    bg: 'dungeon_wastelands',
    desc: '巨大蟻群的女王。工蟻會持續治療她，同時她會散播腐蝕性酸毒。',
    fatalSkill: {
      name: '酸性費洛蒙爆發',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: 'Nuvem de Veneno Corrosivo', triggerHp: 0.75, damagePercent: 0.15, text: '⚠️ 蟻后釋放了酸性毒霧！' },
      { name: 'Chamado das Formigas Nutrizes', triggerHp: 0.35, healPercent: 0.20, text: '✨ Formigas Nutrizes curaram a Rainha em +20% HP!' }
    ],
    drops: [
      { itemId: 'jewel_ring_queen_ant', name: 'Ring of Queen Ant', chance: 0.25, isEpicJewel: true },
      { itemId: 'scroll_blessed_armor', name: 'Blessed Scroll: Enchant Armor', chance: 0.40 },
      { itemId: 'scroll_blessed_weapon', name: 'Blessed Scroll: Enchant Weapon', chance: 0.25 },
      { itemId: 'adena_coins', count: 10, name: '10x Aden Coins (AC)', chance: 0.50 }
    ]
  },

  core: {
    id: 'core',
    name: 'Core da Torre Cruma 🔮',
    title: '古代文明奧術核心',
    lvl: 50,
    hp: 65000,
    atk: 340,
    def: 115,
    mdef: 160,
    eva: 12,
    crit: 14,
    xp: 55000,
    sp: 650,
    gold: [35000, 65000],
    boss: true,
    raid: true,
    reqLvl: 45,
    icon: 'gradespecial/jewels/jewel_ring_core.png',
    bg: 'dungeon_cruma',
    desc: '泰坦遺留在克魯瑪之塔核心的意識體，會發射電漿並展開反射屏障。',
    fatalSkill: {
      name: '量子電漿災變',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '電磁屏障', triggerHp: 0.60, damagePercent: 0.20, text: '⚡ 核心啟動反射屏障，造成範圍電擊！' },
      { name: 'Sobrecarga de Plasma', triggerHp: 0.25, damagePercent: 0.30, text: '💥 Sobrecarga de Plasma de Alta Voltagem disparada!' }
    ],
    drops: [
      { itemId: 'jewel_ring_core', name: 'Ring of Core', chance: 0.25, isEpicJewel: true },
      { itemId: 'scroll_blessed_armor', name: 'Blessed Scroll: Enchant Armor', chance: 0.45 },
      { itemId: 'scroll_blessed_weapon', name: 'Blessed Scroll: Enchant Weapon', chance: 0.30 },
      { itemId: 'adena_coins', count: 15, name: '15x Aden Coins (AC)', chance: 0.50 }
    ]
  },

  orfen: {
    id: 'orfen',
    name: 'Orfen das Sombras 🕷️',
    title: 'Senhora do Mar de Esporos',
    lvl: 55,
    hp: 95000,
    atk: 420,
    def: 145,
    mdef: 210,
    eva: 18,
    crit: 16,
    xp: 90000,
    sp: 950,
    gold: [50000, 95000],
    boss: true,
    raid: true,
    reqLvl: 50,
    icon: 'gradespecial/jewels/jewel_earring_orfen.png',
    bg: 'dungeon_sea_of_spores',
    desc: '操控真菌與毒孢子的巨大變異蜘蛛，受傷後會傳送回巢穴。',
    fatalSkill: {
      name: 'Esporo Mortal Devorador de Almas',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '幻覺孢子霧', triggerHp: 0.70, damagePercent: 0.18, text: '🌫️ 歐瑞芬以劇毒孢子霧籠罩戰場！' },
      { name: 'Teletransporte para o Ninho', triggerHp: 0.30, healPercent: 0.15, text: '🕷️ Orfen recuou para as sombras e regenerou +15% de HP!' }
    ],
    drops: [
      { itemId: 'jewel_earring_orfen', name: 'Earring of Orfen', chance: 0.25, isEpicJewel: true },
      { itemId: 'scroll_blessed_armor', name: 'Blessed Scroll: Enchant Armor', chance: 0.50 },
      { itemId: 'scroll_blessed_weapon', name: 'Blessed Scroll: Enchant Weapon', chance: 0.35 },
      { itemId: 'adena_coins', count: 20, name: '20x Aden Coins (AC)', chance: 0.50 }
    ]
  },

  zaken: {
    id: 'zaken',
    name: '海賊王札肯 🏴‍☠️',
    title: 'Senhor Imortal da Ilha do Diabo',
    lvl: 60,
    hp: 140000,
    atk: 520,
    def: 175,
    mdef: 250,
    eva: 22,
    crit: 18,
    xp: 140000,
    sp: 1600,
    gold: [80000, 160000],
    boss: true,
    raid: true,
    reqLvl: 55,
    icon: 'gradespecial/jewels/jewel_earring_of_zaken.png',
    bg: 'dungeon_devils_isle',
    desc: '被永恆吸血詛咒束縛於惡魔島幽靈船中的海賊船長。',
    fatalSkill: {
      name: 'Valsa Sangrenta das Trevas Eternas',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: 'Passo das Sombras', triggerHp: 0.65, damagePercent: 0.22, text: '🌑 Zaken se desmaterializou nas sombras e atacou pelas costas!' },
      { name: '吸血盛宴', triggerHp: 0.30, healPercent: 0.20, damagePercent: 0.15, text: '🩸 吸血盛宴：札肯吸取你的生命並恢復 +20% HP！' }
    ],
    drops: [
      { itemId: 'jewel_earring_of_zaken', name: 'Earring of Zaken', chance: 0.25, isEpicJewel: true },
      { itemId: 'armor_zaken_cloack', name: 'Capa Pirata de Zaken', chance: 0.30 },
      { itemId: 'scroll_blessed_weapon', name: 'Blessed Scroll: Enchant Weapon', chance: 0.40 },
      { itemId: 'adena_coins', count: 25, name: '25x Aden Coins (AC)', chance: 0.50 }
    ]
  },

  baium: {
    id: 'baium',
    name: 'Imperador Baium ⚡',
    title: '傲慢之塔霸主',
    lvl: 75,
    hp: 260000,
    atk: 750,
    def: 230,
    mdef: 330,
    eva: 15,
    crit: 20,
    xp: 320000,
    sp: 3200,
    gold: [180000, 360000],
    boss: true,
    raid: true,
    reqLvl: 70,
    icon: 'gradespecial/jewels/jewel_ring_of_baium.png',
    bg: 'dungeon_tower_of_insolence',
    desc: '被諸神石化於傲慢之塔第 14 層的古代艾爾摩亞丁皇帝。',
    fatalSkill: {
      name: '帝國泰坦審判',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '雷霆粉碎拳', triggerHp: 0.70, damagePercent: 0.25, text: '⚡ Baium desferiu o 雷霆粉碎拳!' },
      { name: '囚禁神祇之怒', triggerHp: 0.30, damagePercent: 0.35, text: '🌩️ 帝王之怒：巴溫大幅提升攻擊力！' }
    ],
    drops: [
      { itemId: 'jewel_ring_of_baium', name: 'Ring of Baium', chance: 0.25, isEpicJewel: true },
      { itemId: 'weapon_samurai_longsword', name: 'Samurai Longsword +5', chance: 0.35 },
      { itemId: 'scroll_blessed_weapon', name: 'Blessed Scroll: Enchant Weapon', chance: 0.50 },
      { itemId: 'adena_coins', count: 50, name: '50x Aden Coins (AC)', chance: 0.50 }
    ]
  },

  frintezza: {
    id: 'frintezza',
    name: '王子弗林迪薩與哈里夏 🎻',
    title: 'Maestro do Sepulcro Imperial',
    lvl: 85,
    hp: 420000,
    atk: 1050,
    def: 310,
    mdef: 440,
    eva: 18,
    crit: 22,
    xp: 680000,
    sp: 5800,
    gold: [350000, 700000],
    boss: true,
    raid: true,
    reqLvl: 80,
    icon: 'gradespecial/jewels/jewel_necklace_of_frintezza.png',
    bg: 'dungeon_imperial_tomb',
    desc: '受詛咒的王子演奏黑暗管風琴，惡魔勇士史卡雷特・范・哈里夏則屠戮入侵者。',
    fatalSkill: {
      name: '哈里夏末日交響曲',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '催眠安魂曲', triggerHp: 0.65, damagePercent: 0.25, text: '🎼 弗林迪薩的旋律擾亂感官並吸取你的力量！' },
      { name: '哈里夏惡魔變身', triggerHp: 0.25, damagePercent: 0.40, text: '👹 史卡雷特・范・哈里夏化為有翼惡魔！' }
    ],
    drops: [
      { itemId: 'jewel_necklace_of_frintezza', name: 'Necklace of Frintezza', chance: 0.25, isEpicJewel: true },
      { itemId: 'weapon_frost_lord_sword', name: 'Frost Lord Sword (Tier 6 Apex)', chance: 0.20 },
      { itemId: 'scroll_blessed_weapon', name: 'Blessed Scroll: Enchant Weapon', chance: 0.55 },
      { itemId: 'adena_coins', count: 75, name: '75x Aden Coins (AC)', chance: 0.50 }
    ]
  },

  antharas: {
    id: 'antharas',
    name: '地龍安塔瑞斯 🐉',
    title: '地底深淵之主',
    lvl: 95,
    hp: 750000,
    atk: 1450,
    def: 410,
    mdef: 590,
    eva: 12,
    crit: 24,
    xp: 1400000,
    sp: 12000,
    gold: [700000, 1400000],
    boss: true,
    raid: true,
    reqLvl: 85,
    icon: 'gradespecial/jewels/jewel_earring_of_antharas.png',
    bg: 'dungeon_antharas_lair',
    desc: '守護奇岩地底深處的可怕地龍，震動足以撼動山岳並石化軍隊。',
    fatalSkill: {
      name: '古代地殼崩裂',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '化石地震', triggerHp: 0.70, damagePercent: 0.30, text: '🌋 化石地震: O chão estremece causando dano maciço!' },
      { name: 'Rugido do Pavor Ancestral', triggerHp: 0.35, damagePercent: 0.40, text: '🐉 安塔瑞斯的恐怖咆哮擊碎防禦屏障！' }
    ],
    drops: [
      { itemId: 'jewel_earring_of_antharas', name: 'Earring of Antharas', chance: 0.25, isEpicJewel: true },
      { itemId: 'weapon_frost_lord_two_hand_sword', name: 'Frost Lord Greatsword (Tier 6 Apex)', chance: 0.25 },
      { itemId: 'scroll_blessed_weapon', name: 'Blessed Scroll: Enchant Weapon', chance: 0.60 },
      { itemId: 'adena_coins', count: 100, name: '100x Aden Coins (AC)', chance: 0.50 }
    ]
  },

  valakas: {
    id: 'valakas',
    name: '火龍巴拉卡斯 🔥',
    title: '諸神熔爐火山至尊',
    lvl: 100,
    hp: 1250000,
    atk: 1950,
    def: 510,
    mdef: 740,
    eva: 15,
    crit: 25,
    xp: 2500000,
    sp: 25000,
    gold: [1500000, 3000000],
    boss: true,
    raid: true,
    reqLvl: 90,
    icon: 'gradespecial/jewels/jewel_necklace_of_valakas.png',
    bg: 'dungeon_valakas_volcano',
    desc: 'A criatura mais poderosa de Aden. Habita a caldeira de lava da Forja dos Deuses, incinerando quem ousa desafi-lo.',
    fatalSkill: {
      name: '烈焰巨龍日蝕',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: 'Chuva de Meteoros Incandescentes', triggerHp: 0.75, damagePercent: 0.30, text: '☄️ Chuva de Meteoros de Valakas incinera toda a arena!' },
      { name: '火山地獄吐息', triggerHp: 0.40, damagePercent: 0.45, text: '🔥 Sopro de Chamas Eternas atinge em cheio com poder colossal!' },
      { name: 'Aura da Caldeira Ardente', triggerHp: 0.15, damagePercent: 0.50, text: '🌋 巴拉卡斯進入極限火山狂怒！' }
    ],
    drops: [
      { itemId: 'jewel_necklace_of_valakas', name: 'Necklace of Valakas', chance: 0.25, isEpicJewel: true },
      { itemId: 'jewel_ring_of_valakas', name: 'Ring of Valakas', chance: 0.25, isEpicJewel: true },
      { itemId: 'armor_valakas_cloack', name: 'Valakas Dragon Cloak', chance: 0.35 },
      { itemId: 'valakas_mask', name: '巴拉卡斯烈焰面具', chance: 0.40 },
      { itemId: 'scroll_blessed_weapon', name: 'Blessed Scroll: Enchant Weapon', chance: 0.75 },
      { itemId: 'adena_coins', count: 150, name: '150x Aden Coins (AC)', chance: 0.60 }
    ]
  },

  barakiel: {
    id: 'barakiel',
    name: 'Flame of Splendor Barakiel 🔥',
    title: '女神權杖守護者（貴族任務）',
    lvl: 75,
    hp: 180000,
    atk: 520,
    def: 180,
    mdef: 240,
    eva: 15,
    crit: 16,
    xp: 150000,
    sp: 1800,
    gold: [50000, 100000],
    boss: true,
    raid: true,
    isBarakiel: true,
    reqLvl: 75,
    icon: 'gradespecial/scrolls/scroll_enchant_weapon_s.png',
    bg: 'dungeon_goddard',
    desc: '阿爾戈斯之壁的烈焰領主。擊敗他是貴族任務第三階段取得女神權杖的最終考驗。',
    fatalSkill: {
      name: '貴族榮耀之焰',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '太陽烈焰爆發', triggerHp: 0.60, damagePercent: 0.20, text: '🔥 Barakiel conjurou 太陽烈焰爆發!' },
      { name: 'Barreira de Fogo Puro', triggerHp: 0.25, healPercent: 0.15, text: '🛡️ Barakiel invocou a Barreira de Fogo Puro!' }
    ],
    drops: [
      { itemId: 'staff_goddess_rain_song', name: 'Staff of Goddess: Rain Song', chance: 1.0 },
      { itemId: 'scroll_blessed_universal', name: '通用祝福強化卷軸', chance: 1.0 },
      { itemId: 'scroll_blessed_weapon', name: '祝福武器強化卷軸', chance: 0.50 },
      { itemId: 'adena_coins', count: 30, name: '30x Aden Coins (AC)', chance: 0.50 }
    ]
  }
};

// Merge calibrated stats, minimumCP, and recommendedCP from RAID_BOSS_BALANCE
for (const [key, balancedBoss] of Object.entries(RAID_BOSS_BALANCE)) {
  if (RAID_BOSSES[key]) {
    Object.assign(RAID_BOSSES[key], {
      minimumCP: balancedBoss.minimumCP,
      recommendedCP: balancedBoss.recommendedCP,
      hp: balancedBoss.hp,
      atk: balancedBoss.atk,
      def: balancedBoss.def,
      mdef: balancedBoss.mdef,
      fatalSkill: balancedBoss.fatalSkill || RAID_BOSSES[key].fatalSkill,
      mechanics: balancedBoss.mechanics || RAID_BOSSES[key].mechanics,
      targetMetrics: balancedBoss.targetMetrics
    });
  }
}
