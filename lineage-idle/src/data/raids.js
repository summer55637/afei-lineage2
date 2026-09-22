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
    name: '巨蟻女王 👑',
    title: '古魯丁荒野女王',
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
    desc: '巨型螞蟻女王。工蟻群會為她療傷，同時她會散布腐蝕性酸毒。',
    fatalSkill: {
      name: '酸性費洛蒙爆發',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '腐蝕毒雲', triggerHp: 0.75, damagePercent: 0.15, text: '⚠️ 巨蟻女王釋放了酸性毒雲！' },
      { name: '護理蟻召喚', triggerHp: 0.35, healPercent: 0.20, text: '✨ 護理蟻為女王恢復了 20% HP！' }
    ],
    drops: [
      { itemId: 'jewel_ring_queen_ant', name: '巨蟻女王戒指', chance: 0.25, isEpicJewel: true },
      { itemId: 'scroll_blessed_armor', name: '祝福的防具強化卷軸', chance: 0.40 },
      { itemId: 'scroll_blessed_weapon', name: '祝福的武器強化卷軸', chance: 0.25 },
      { itemId: 'adena_coins', count: 10, name: '10x 亞丁幣（AC）', chance: 0.50 }
    ]
  },

  core: {
    id: 'core',
    name: '克魯瑪高塔核心 🔮',
    title: '古代文明秘法核心',
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
    desc: '泰坦留在克魯瑪高塔核心的自我意識裝置，會發射電漿射線並啟動反射屏障。',
    fatalSkill: {
      name: '量子電漿浩劫',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '電磁屏障', triggerHp: 0.60, damagePercent: 0.20, text: '⚡ 核心啟動反射屏障，造成範圍電擊！' },
      { name: '電漿超載', triggerHp: 0.25, damagePercent: 0.30, text: '💥 電漿超載 de Alta Voltagem disparada!' }
    ],
    drops: [
      { itemId: 'jewel_ring_core', name: '核心戒指', chance: 0.25, isEpicJewel: true },
      { itemId: 'scroll_blessed_armor', name: '祝福的防具強化卷軸', chance: 0.45 },
      { itemId: 'scroll_blessed_weapon', name: '祝福的武器強化卷軸', chance: 0.30 },
      { itemId: 'adena_coins', count: 15, name: '15x 亞丁幣（AC）', chance: 0.50 }
    ]
  },

  orfen: {
    id: 'orfen',
    name: '暗影奧爾芬 🕷️',
    title: '孢子之海女王',
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
    desc: '能操控真菌與毒孢子的巨大變異蛛形生物，受傷後會瞬移回巢穴。',
    fatalSkill: {
      name: '噬魂致命孢子',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '幻覺孢子霧', triggerHp: 0.70, damagePercent: 0.18, text: '🌫️ 奧爾芬以劇毒孢子霧籠罩競技場！' },
      { name: '瞬移回巢', triggerHp: 0.30, healPercent: 0.15, text: '🕷️ 奧爾芬退入暗影並恢復 15% HP！' }
    ],
    drops: [
      { itemId: 'jewel_earring_orfen', name: '奧爾芬耳環', chance: 0.25, isEpicJewel: true },
      { itemId: 'scroll_blessed_armor', name: '祝福的防具強化卷軸', chance: 0.50 },
      { itemId: 'scroll_blessed_weapon', name: '祝福的武器強化卷軸', chance: 0.35 },
      { itemId: 'adena_coins', count: 20, name: '20x 亞丁幣（AC）', chance: 0.50 }
    ]
  },

  zaken: {
    id: 'zaken',
    name: '海賊船長札肯 🏴‍☠️',
    title: '惡魔島不死領主',
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
    desc: '遭受永恆吸血詛咒的海賊船長，被困在惡魔島幽靈船內。',
    fatalSkill: {
      name: '永恆黑暗血之華爾滋',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '暗影步伐', triggerHp: 0.65, damagePercent: 0.22, text: '🌑 札肯融入暗影並從背後發動攻擊！' },
      { name: '吸血盛宴', triggerHp: 0.30, healPercent: 0.20, damagePercent: 0.15, text: '🩸 吸血盛宴：札肯吸取你的生命並恢復 20% HP！' }
    ],
    drops: [
      { itemId: 'jewel_earring_of_zaken', name: '札肯耳環', chance: 0.25, isEpicJewel: true },
      { itemId: 'armor_zaken_cloack', name: '札肯海賊披風', chance: 0.30 },
      { itemId: 'scroll_blessed_weapon', name: '祝福的武器強化卷軸', chance: 0.40 },
      { itemId: 'adena_coins', count: 25, name: '25x 亞丁幣（AC）', chance: 0.50 }
    ]
  },

  baium: {
    id: 'baium',
    name: '皇帝巴溫 ⚡',
    title: '傲慢之塔支配者',
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
    desc: '古代艾爾摩－亞丁皇帝，被眾神石化於傲慢之塔第 14 層。',
    fatalSkill: {
      name: '帝國泰坦審判',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '雷霆粉碎拳', triggerHp: 0.70, damagePercent: 0.25, text: '⚡ Baium desferiu o 雷霆粉碎拳!' },
      { name: '被囚神性的狂怒', triggerHp: 0.30, damagePercent: 0.35, text: '🌩️ 帝國狂怒：巴溫大幅提升攻擊力！' }
    ],
    drops: [
      { itemId: 'jewel_ring_of_baium', name: '巴溫戒指', chance: 0.25, isEpicJewel: true },
      { itemId: 'weapon_samurai_longsword', name: '武士長劍 +5', chance: 0.35 },
      { itemId: 'scroll_blessed_weapon', name: '祝福的武器強化卷軸', chance: 0.50 },
      { itemId: 'adena_coins', count: 50, name: '50x 亞丁幣（AC）', chance: 0.50 }
    ]
  },

  frintezza: {
    id: 'frintezza',
    name: '王子弗林特沙與哈利夏 🎻',
    title: '帝國陵墓指揮者',
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
    desc: '受詛咒的王子彈奏黑暗管風琴，同時惡魔冠軍史卡雷特・凡・哈利夏屠殺入侵者。',
    fatalSkill: {
      name: '哈利夏末日交響曲',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '催眠安魂曲', triggerHp: 0.65, damagePercent: 0.25, text: '🎼 弗林特沙的旋律擾亂你的感官並削弱力量！' },
      { name: '哈利夏惡魔變身', triggerHp: 0.25, damagePercent: 0.40, text: '👹 史卡雷特・凡・哈利夏化身為翼魔形態！' }
    ],
    drops: [
      { itemId: 'jewel_necklace_of_frintezza', name: '弗林特沙項鍊', chance: 0.25, isEpicJewel: true },
      { itemId: 'weapon_frost_lord_sword', name: '霜之領主劍（第 6 階巔峰）', chance: 0.20 },
      { itemId: 'scroll_blessed_weapon', name: '祝福的武器強化卷軸', chance: 0.55 },
      { itemId: 'adena_coins', count: 75, name: '75x 亞丁幣（AC）', chance: 0.50 }
    ]
  },

  antharas: {
    id: 'antharas',
    name: '地龍安塔瑞斯 🐉',
    title: '地下深淵之王',
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
    desc: '守護奇岩地底深處的恐怖地龍，牠的震動能撼動山脈並石化軍隊。',
    fatalSkill: {
      name: '古代地質崩壞',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '化石地震', triggerHp: 0.70, damagePercent: 0.30, text: '🌋 化石地震: O chão estremece causando dano maciço!' },
      { name: '古代恐懼咆哮', triggerHp: 0.35, damagePercent: 0.40, text: '🐉 安塔瑞斯的恐怖咆哮撕裂防禦屏障！' }
    ],
    drops: [
      { itemId: 'jewel_earring_of_antharas', name: '安塔瑞斯耳環', chance: 0.25, isEpicJewel: true },
      { itemId: 'weapon_frost_lord_two_hand_sword', name: '霜之領主巨劍（第 6 階巔峰）', chance: 0.25 },
      { itemId: 'scroll_blessed_weapon', name: '祝福的武器強化卷軸', chance: 0.60 },
      { itemId: 'adena_coins', count: 100, name: '100x 亞丁幣（AC）', chance: 0.50 }
    ]
  },

  valakas: {
    id: 'valakas',
    name: '火龍巴拉卡斯 🔥',
    title: '諸神熔爐火山至高領主',
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
    desc: '亞丁最強大的生物，棲息於諸神熔爐的熔岩火口，焚盡所有膽敢挑戰牠的人。',
    fatalSkill: {
      name: '烈焰龍之太陽滅絕',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '熾熱隕石雨', triggerHp: 0.75, damagePercent: 0.30, text: '☄️ 巴拉卡斯的隕石雨焚燒整座競技場！' },
      { name: '火山地獄吐息', triggerHp: 0.40, damagePercent: 0.45, text: '🔥 永恆烈焰吐息以龐大力量正面命中！' },
      { name: '熾熱火口光環', triggerHp: 0.15, damagePercent: 0.50, text: '🌋 巴拉卡斯進入極限火山狂怒！' }
    ],
    drops: [
      { itemId: 'jewel_necklace_of_valakas', name: '巴拉卡斯項鍊', chance: 0.25, isEpicJewel: true },
      { itemId: 'jewel_ring_of_valakas', name: '巴拉卡斯戒指', chance: 0.25, isEpicJewel: true },
      { itemId: 'armor_valakas_cloack', name: '巴拉卡斯龍披風', chance: 0.35 },
      { itemId: 'valakas_mask', name: '巴拉卡斯烈焰面具', chance: 0.40 },
      { itemId: 'scroll_blessed_weapon', name: '祝福的武器強化卷軸', chance: 0.75 },
      { itemId: 'adena_coins', count: 150, name: '150x 亞丁幣（AC）', chance: 0.60 }
    ]
  },

  barakiel: {
    id: 'barakiel',
    name: '光輝火焰巴拉基艾爾 🔥',
    title: '女神法杖守護者（貴族任務）',
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
    desc: '阿爾戈斯之壁的烈焰領主。擊敗他是貴族任務第 3 部分的最終試煉，可取得女神法杖。',
    fatalSkill: {
      name: '貴族榮耀之火',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.60
    },
    mechanics: [
      { name: '太陽烈焰爆發', triggerHp: 0.60, damagePercent: 0.20, text: '🔥 Barakiel conjurou 太陽烈焰爆發!' },
      { name: '純淨火焰屏障', triggerHp: 0.25, healPercent: 0.15, text: '🛡️ Barakiel invocou a 純淨火焰屏障!' }
    ],
    drops: [
      { itemId: 'staff_goddess_rain_song', name: 'Staff of Goddess: Rain Song', chance: 1.0 },
      { itemId: 'scroll_blessed_universal', name: '祝福的通用強化卷軸', chance: 1.0 },
      { itemId: 'scroll_blessed_weapon', name: '祝福的武器強化卷軸', chance: 0.50 },
      { itemId: 'adena_coins', count: 30, name: '30x 亞丁幣（AC）', chance: 0.50 }
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
