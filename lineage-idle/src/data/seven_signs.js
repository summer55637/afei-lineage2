/**
 * Seven Signs Data Definitions (Lineage II Canonical)
 * Competição entre Lords of Dawn e Revolutionaries of Dusk,
 * Conversão de Seal Stones em Ancient Adena (AA),
 * Chefes de Selo (Lilith & Anakim), e Serviços dos Mercadores de Mammon.
 */

export const FACTIONS = {
  dawn: {
    id: 'dawn',
    name: '黎明君主 ☀️',
    icon: '☀️',
    desc: '追求神聖秩序與秘法祝福的殷海薩貴族與信徒。',
    bonusDesc: '+10% 神聖傷害與 +5% 經驗值'
  },
  dusk: {
    id: 'dusk',
    name: '黃昏革命軍 🌒',
    icon: '🌒',
    desc: '效忠席琳、企圖打破帝國枷鎖的叛軍與地下戰士。',
    bonusDesc: '+10% 黑暗傷害與 +5% 掉落率'
  }
};

export const SEAL_STONES = {
  seal_stone_blue: {
    id: 'seal_stone_blue',
    name: '藍色封印石 🔷',
    icon: '🔷',
    aaValue: 3,
    desc: '從低階地下墓穴怪物取得的元素封印石，價值 3 古代金幣。'
  },
  seal_stone_green: {
    id: 'seal_stone_green',
    name: '綠色封印石 🟢',
    icon: '🟢',
    aaValue: 5,
    desc: '從中階死靈墓地取得的純淨封印石，價值 5 古代金幣。'
  },
  seal_stone_red: {
    id: 'seal_stone_red',
    name: '紅色封印石 🔴',
    icon: '🔴',
    aaValue: 10,
    desc: '凝聚古老血液力量的最高級封印石，價值 10 古代金幣。'
  }
};

export const NECROPOLIS_ZONES = [
  { id: 'necro_sacrifice', name: '祭品死靈墓地', level: 32, stones: ['seal_stone_blue'], minScore: 100 },
  { id: 'necro_pilgrim', name: '巡禮者死靈墓地', level: 42, stones: ['seal_stone_blue', 'seal_stone_green'], minScore: 300 },
  { id: 'necro_worship', name: '禮拜者死靈墓地', level: 52, stones: ['seal_stone_green'], minScore: 600 },
  { id: 'necro_patriot', name: '愛國者死靈墓地', level: 62, stones: ['seal_stone_green', 'seal_stone_red'], minScore: 1200 },
  { id: 'necro_ascetics', name: '禁慾者地下墓穴', level: 72, stones: ['seal_stone_green', 'seal_stone_red'], minScore: 2500 },
  { id: 'necro_martyrs', name: '殉教者地下墓穴', level: 76, stones: ['seal_stone_red'], minScore: 5000 },
  { id: 'necro_apostles', name: '使徒地下墓穴', level: 80, stones: ['seal_stone_red'], minScore: 10000 },
  { id: 'necro_disciple', name: '門徒死靈墓地', level: 84, stones: ['seal_stone_red'], minScore: 20000 }
];

export const SEVEN_SIGNS_BOSSES = {
  lilith: {
    id: 'lilith',
    name: '莉莉絲 🌑',
    title: '深淵女王與席琳使者',
    level: 80,
    faction: 'dusk',
    hp: 450000,
    pAtk: 2200,
    pDef: 1800,
    mDef: 1950,
    desc: '沉睡於門徒死靈墓地深處的席琳古代生物。',
    reqAA: 50000,
    rewards: {
      aa: 150000,
      xp: 2500000,
      sp: 500000,
      items: ['scroll_blessed_weapon', 'scroll_blessed_universal', 'life_stone_mid']
    }
  },
  anakim: {
    id: 'anakim',
    name: '安娜金 ☀️',
    title: '殷海薩神聖使者',
    level: 80,
    faction: 'dawn',
    hp: 450000,
    pAtk: 2300,
    pDef: 1750,
    mDef: 2100,
    desc: '被天界光翼包圍的殷海薩熾炎天使，守護使徒地下墓穴。',
    reqAA: 50000,
    rewards: {
      aa: 150000,
      xp: 2500000,
      sp: 500000,
      items: ['scroll_blessed_weapon', 'scroll_blessed_universal', 'life_stone_mid']
    }
  }
};

export const MAMMON_BLACKSMITH_SERVICES = [
  {
    id: 'weapon_exchange',
    name: '等階武器交換（同階）',
    costAA: 25000,
    desc: '可將任何 A 或 S 級武器交換為相同等級的其他武器類型（例如劍換弓或匕首）。'
  },
  {
    id: 'unseal_armor',
    name: '解除防具封印',
    costAA: 50000,
    desc: '解除 A 或 S 級防具封印，開啟完整套裝效果與最高屬性。'
  },
  {
    id: 'sa_infusion',
    name: '靈魂水晶灌注（特殊能力等級 13）',
    costAA: 100000,
    desc: '直接在已裝備武器上附加特殊能力（專注、急速或靈敏）。'
  }
];

export const MAMMON_MERCHANT_CATALOG = [
  {
    id: 'scroll_of_enchant_weapon',
    name: '通用武器強化卷軸 📜',
    costAA: 30000,
    icon: 'scrolls/scroll_of_enchant_weapon_.png',
    desc: '可安全強化武器的通用卷軸。'
  },
  {
    id: 'scroll_blessed_weapon',
    name: '祝福的武器強化卷軸 📜',
    costAA: 80000,
    icon: 'scrolls/scroll_of_enchant_weapon_.png',
    desc: '最高級卷軸，失敗時保留武器目前強化等級。'
  },
  {
    id: 'scroll_blessed_universal',
    name: '祝福的通用強化卷軸 🌟',
    costAA: 150000,
    icon: 'scrolls/scroll_of_enchant_weapon_.png',
    desc: '可強化任何裝備，並完全防止失敗時破壞或降級。'
  },
  {
    id: 'life_stone_mid',
    name: '中級生命石 💎',
    costAA: 60000,
    icon: 'scrolls/exp_scroll.png',
    desc: '可為裝備附加特殊屬性與技能增幅的生命石。'
  }
];
