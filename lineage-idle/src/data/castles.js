/**
 * castles.js — Definições dos Castelos de Aden e Mecânicas de Cerco (Castle Sieges).
 *
 * Contém os 5 Castelos canônicos de Aden, suas taxas de Adena,
 * stats das fases de cerco e itens exclusivos da Loja do Lorde.
 */

export const CASTLES = {
  gludio: {
    id: 'gludio',
    name: '古魯丁城堡 🏰',
    title: '亞丁西方要塞',
    reqCharLevel: 40,
    reqClanLevel: 5,
    taxRatePercent: 5,
    adenaPerHour: 25000,
    adenaPerMinute: 416,
    icon: 'gradespecial/scrolls/scroll_enchant_armor_d.png',
    bg: 'dungeon_wastelands',
    desc: '西方第一座大型堡壘，掌控古魯丁與古魯丁村莊的商業路線。',
    siege: {
      gateHp: 150000,
      gateDef: 120,
      guardsHp: 200000,
      guardsAtk: 450,
      guardsDef: 140,
      castRoundsRequired: 3
    }
  },

  dion: {
    id: 'dion',
    name: '狄恩城堡 🏰',
    title: '肥沃平原城塞',
    reqCharLevel: 52,
    reqClanLevel: 5,
    taxRatePercent: 8,
    adenaPerHour: 50000,
    adenaPerMinute: 833,
    icon: 'gradespecial/scrolls/scroll_enchant_armor_c.png',
    bg: 'dungeon_cruma',
    desc: '四周環繞肥沃丘陵，鄰近神秘的克魯瑪高塔。',
    siege: {
      gateHp: 350000,
      gateDef: 180,
      guardsHp: 500000,
      guardsAtk: 750,
      guardsDef: 220,
      castRoundsRequired: 3
    }
  },

  giran: {
    id: 'giran',
    name: '奇岩城堡 👑',
    title: '亞丁商業核心與皇家港口',
    reqCharLevel: 65,
    reqClanLevel: 5,
    taxRatePercent: 12,
    adenaPerHour: 100000,
    adenaPerMinute: 1666,
    icon: 'gradespecial/scrolls/scroll_enchant_armor_b.png',
    bg: 'dungeon_spores',
    desc: '全大陸最大的商業中心，世界貿易帶來源源不絕的財富。',
    siege: {
      gateHp: 750000,
      gateDef: 280,
      guardsHp: 1100000,
      guardsAtk: 1200,
      guardsDef: 340,
      castRoundsRequired: 4
    }
  },

  goddard: {
    id: 'goddard',
    name: '高達特城堡 ❄️',
    title: '北方雪原堡壘',
    reqCharLevel: 76,
    reqClanLevel: 5,
    taxRatePercent: 15,
    adenaPerHour: 180000,
    adenaPerMinute: 3000,
    icon: 'gradespecial/scrolls/scroll_enchant_armor_a.png',
    bg: 'dungeon_goddard',
    desc: '建立於北方冰封山脈的要塞，守護通往阿爾戈斯之壁與瓦卡地區的道路。',
    siege: {
      gateHp: 1500000,
      gateDef: 380,
      guardsHp: 2200000,
      guardsAtk: 1850,
      guardsDef: 460,
      castRoundsRequired: 4
    }
  },

  aden: {
    id: 'aden',
    name: '亞丁帝國城堡 👑✨',
    title: '萬王至尊王座',
    reqCharLevel: 80,
    reqClanLevel: 5,
    taxRatePercent: 20,
    adenaPerHour: 350000,
    adenaPerMinute: 5833,
    icon: 'gradespecial/scrolls/scroll_blessed_weapon_s.png',
    bg: 'dungeon_imperial_tomb',
    desc: '亞丁最宏偉的城堡。統治此處者將左右諸國命運，並獲得龐大貢金。',
    siege: {
      gateHp: 3000000,
      gateDef: 550,
      guardsHp: 4500000,
      guardsAtk: 2600,
      guardsDef: 650,
      castRoundsRequired: 5
    }
  }
};

export const CASTLE_SHOP_CATALOG = [
  {
    id: 'crown_of_lord',
    name: '領主王冠 👑',
    priceAdena: 10000000,
    priceAc: 0,
    reqCastle: true,
    slot: 'head',
    icon: 'gradespecial/jewels/jewel_ring_queen_ant.png',
    desc: '僅限亞丁城堡領主佩戴的神聖王冠。所有屬性（STR/DEX/INT/WIT/CON/MEN）+5，最大 生命值／CP +15%。',
    stats: { allStats: 5, hpPercent: 0.15, cpPercent: 0.15 }
  },
  {
    id: 'castle_cloak',
    name: '城堡領主披風 🛡️',
    priceAdena: 5000000,
    priceAc: 0,
    reqCastle: true,
    slot: 'cloak',
    icon: 'gradespecial/scrolls/scroll_blessed_armor_s.png',
    desc: '以王國純金絲線繡製的披風，物理防禦 +180、魔法防禦 +180。',
    stats: { pDef: 180, mDef: 180 }
  },
  {
    id: 'elixir_lord_cp_10x',
    name: '10x 皇家 CP 靈藥 🧪',
    priceAdena: 250000,
    priceAc: 0,
    reqCastle: true,
    icon: 'gradespecial/potions/potion_health_xl.png',
    desc: '戰鬥中立即恢復 3,500 CP。'
  },
  {
    id: 'giant_codex_castle_pack',
    name: '3x 巨人秘典禮包 📜',
    priceAdena: 3000000,
    priceAc: 0,
    reqCastle: true,
    icon: 'gradespecial/scrolls/scroll_enchant_weapon_s.png',
    desc: '用於技能強化（+1～+30）的古代秘典。'
  }
];
