/**
 * olympiad.js — Definições de Armas Infinity de Herói, Habilidades Heroicas,
 * Gladiadores de Arena e Catálogo da Loja de Olimpíadas.
 */

export const INFINITY_WEAPONS = {
  weapon_infinity_blade: {
    id: 'weapon_infinity_blade',
    name: '無限之刃 👑',
    slot: 'weapon',
    tier: 6,
    rarity: 'legendary',
    atk: 280,
    matk: 190,
    crit: 12,
    def: 60,
    hp: 500,
    mp: 250,
    req: { level: 76, isHero: true },
    price: 1000000,
    icon: 'gradespecial/weapons/zaken_sword.png',
    desc: '大奧林匹亞英雄之劍：P.Atk +280、M.Atk +190、暴擊 +12%、P.Def +60、HP +500，並有機率解除對手增益。'
  },
  weapon_infinity_cleaver: {
    id: 'weapon_infinity_cleaver',
    name: '無限巨劍 👑',
    slot: 'weapon',
    tier: 6,
    rarity: 'legendary',
    atk: 345,
    matk: 190,
    crit: 15,
    critDmg: 0.30,
    hp: 750,
    req: { level: 76, isHero: true },
    price: 1000000,
    icon: 'gradespecial/weapons/orfen_twohanded_sword.png',
    desc: '英雄雙手劍：P.Atk +345、暴擊傷害 +30%、暴擊 +15%、HP +750。'
  },
  weapon_infinity_axe: {
    id: 'weapon_infinity_axe',
    name: '無限戰斧 👑',
    slot: 'weapon',
    tier: 6,
    rarity: 'legendary',
    atk: 280,
    matk: 190,
    crit: 10,
    stunChance: 25,
    hp: 600,
    req: { level: 76, isHero: true },
    price: 1000000,
    icon: 'gradespecial/weapons/weapon_frost_lord_axe.png',
    desc: '英雄戰斧：P.Atk +280、暈眩機率 +25%、暴擊 +10%、HP +600。'
  },
  weapon_infinity_rod: {
    id: 'weapon_infinity_rod',
    name: '無限法杖 👑',
    slot: 'weapon',
    tier: 6,
    rarity: 'legendary',
    atk: 175,
    matk: 360,
    crit: 8,
    castSpeed: 20,
    mpRegen: 15,
    mp: 600,
    req: { level: 76, isHero: true },
    price: 1000000,
    icon: 'gradespecial/weapons/imperial_staff.png',
    desc: '英雄魔法杖：M.Atk +360、施法速度 +20%、MP 恢復 +15、MP +600。'
  },
  weapon_infinity_bow: {
    id: 'weapon_infinity_bow',
    name: '無限之弓 👑',
    slot: 'weapon',
    tier: 6,
    rarity: 'legendary',
    atk: 395,
    matk: 190,
    crit: 18,
    critDmg: 0.25,
    speed: 15,
    req: { level: 76, isHero: true },
    price: 1000000,
    icon: 'gradespecial/weapons/draconic_bow.png',
    desc: '英雄帝國弓：P.Atk +395、暴擊 +18%、暴擊傷害 +25%、移動速度 +15，並可發動穿透射擊。'
  },
  weapon_infinity_dagger: {
    id: 'weapon_infinity_dagger',
    name: '無限匕首 👑',
    slot: 'weapon',
    tier: 6,
    rarity: 'legendary',
    atk: 255,
    matk: 190,
    crit: 22,
    eva: 18,
    atkSpeed: 15,
    req: { level: 76, isHero: true },
    price: 1000000,
    icon: 'gradespecial/weapons/baium_dagger.png',
    desc: '英雄致命匕首：P.Atk +255、暴擊 +22%、迴避 +18、攻擊速度 +15%，並具致命一擊。'
  },
  weapon_infinity_spear: {
    id: 'weapon_infinity_spear',
    name: '無限長槍 👑',
    slot: 'weapon',
    tier: 6,
    rarity: 'legendary',
    atk: 295,
    matk: 190,
    crit: 12,
    aoeDmg: 0.30,
    hp: 600,
    req: { level: 76, isHero: true },
    price: 1000000,
    icon: 'gradespecial/weapons/gorde_spear.png',
    desc: '英雄泰坦長槍：P.Atk +295、範圍傷害 +30%、暴擊 +12%、HP +600。'
  },
  weapon_infinity_duals: {
    id: 'weapon_infinity_duals',
    name: '無限雙劍 👑',
    slot: 'weapon',
    tier: 6,
    rarity: 'legendary',
    atk: 340,
    matk: 190,
    crit: 16,
    atkSpeed: 20,
    hp: 550,
    req: { level: 76, isHero: true },
    price: 1000000,
    icon: 'gradespecial/weapons/juriel_dual_sword.png',
    desc: '英雄雙劍：P.Atk +340、攻擊速度 +20%、暴擊 +16%、HP +550。'
  }
};

export const HEROIC_SKILLS = {
  heroic_valor: {
    id: 'heroic_valor',
    name: '英雄勇氣 👑',
    type: 'buff',
    cd: 60000,
    duration: 120000,
    desc: '提升英雄勇氣：2 分鐘內 P.Atk +250、M.Atk +300、P.Def +500。',
    stats: { atk: 250, matk: 300, def: 500 }
  },
  heroic_miracle: {
    id: 'heroic_miracle',
    name: '英雄奇蹟 🛡️',
    type: 'buff',
    cd: 90000,
    duration: 30000,
    desc: '女神的英雄奇蹟：30 秒內 P.Def +5,400、M.Def +4,050，並大幅提升抗性。',
    stats: { def: 5400, mdef: 4050 }
  },
  heroic_berserker: {
    id: 'heroic_berserker',
    name: '英雄狂戰 ⚡',
    type: 'buff',
    cd: 60000,
    duration: 60000,
    desc: '英雄毀滅狂怒：攻擊與施法速度 +50%、速度 +100。',
    stats: { atkSpeed: 50, castSpeed: 50, speed: 100 }
  },
  heroic_grandeur: {
    id: 'heroic_grandeur',
    name: '英雄威嚴 💥',
    type: 'debuff',
    cd: 45000,
    desc: '威嚴氣場：周圍敵人的 P.Def 與 M.Def 降低 30%，持續 30 秒。',
    debuff: { defReduce: 0.30, mdefReduce: 0.30 }
  }
};

export const OLYMPIAD_GLADIATORS = [
  { id: 'glad_1', name: '鬥士凱倫', title: '奇岩決鬥者', lvl: 76, hp: 22000, atk: 480, def: 380, mdef: 310, class: 'duelist', elo: 1000 },
  { id: 'glad_2', name: '聖騎士沃恩', title: '神聖鳳凰騎士', lvl: 77, hp: 28000, atk: 430, def: 520, mdef: 410, class: 'phoenix_knight', elo: 1100 },
  { id: 'glad_3', name: '弓手萊拉', title: '暗影射手', lvl: 78, hp: 19500, atk: 560, def: 340, mdef: 290, class: 'sagittarius', elo: 1200 },
  { id: 'glad_4', name: '法師希莉絲', title: '秘法火焰大法師', lvl: 79, hp: 18000, atk: 250, matk: 620, def: 320, mdef: 450, class: 'archmage', elo: 1300 },
  { id: 'glad_5', name: '刺客德雷文', title: '致命冒險者', lvl: 80, hp: 21000, atk: 520, def: 360, mdef: 320, class: 'adventurer', elo: 1400 },
  { id: 'glad_6', name: '領主瓦勒里斯', title: '狂怒泰坦', lvl: 82, hp: 35000, atk: 610, def: 420, mdef: 330, class: 'titan', elo: 1500 },
  { id: 'glad_7', name: '術士莫瓦斯', title: '死靈法師奪魂者', lvl: 83, hp: 20500, atk: 260, matk: 680, def: 350, mdef: 480, class: 'soultaker', elo: 1600 },
  { id: 'glad_8', name: '決鬥者札瑞克', title: '大卡瓦塔里領主', lvl: 85, hp: 32000, atk: 670, def: 460, mdef: 390, class: 'grand_khavatari', elo: 1750 }
];

export const OLYMPIAD_SHOP_CATALOG = [
  {
    id: 'scroll_blessed_universal',
    name: "祝福的通用強化卷軸",
    priceTokens: 500,
    icon: 'scrolls/scroll_of_enchant_weapon_.png',
    desc: '祝福的通用強化卷軸: encanta qualquer equipamento (+1) com proteção total contra quebra em caso de falha.',
    reward: { itemId: 'scroll_blessed_universal', count: 1 }
  },
  {
    id: 'blessed_scroll_weapon_s',
    name: '祝福的武器強化卷軸',
    priceTokens: 1200,
    icon: 'scrolls/scroll_of_enchant_weapon_.png',
    desc: '祝福的武器強化卷軸. Em caso de falha, o item preserva o nível e não se destrói.',
    reward: { itemId: 'scroll_blessed_weapon', count: 1 }
  },
  {
    id: 'blessed_scroll_armor_s',
    name: '祝福的武器強化卷軸dura',
    priceTokens: 600,
    icon: 'scrolls/scroll_of_enchant_armor.png',
    desc: '祝福的武器強化卷軸dura. Preserva o equipamento com segurança.',
    reward: { itemId: 'scroll_blessed_armor', count: 1 }
  },
  {
    id: 'hero_cp_potion_bundle',
    name: "100x 英雄戰鬥 CP 藥水",
    priceTokens: 150,
    icon: 'consumables/cp_potion.png',
    desc: 'Pacote com 100 Poções de Restauração Imediata de Pontos de Combate.',
    reward: { itemId: 'hp_potion_xl', count: 100 }
  },
  {
    id: 'secret_elixir_vigor',
    name: '英雄活力靈藥（1 小時）',
    priceTokens: 300,
    icon: 'consumables/elixir_vigor.png',
    desc: '狩獵 1 小時內 XP +20%、金幣 +20%、傷害 +10%。',
    reward: { itemId: 'elixir_vigor_1h', count: 5 }
  }
];
