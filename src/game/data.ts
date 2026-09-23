// Lineage-inspired data: races, exclusive classes, exclusive weapons, enemies.

export type RaceId =
  | "human"
  | "elf"
  | "darkelf"
  | "orc"
  | "dwarf"
  | "kamael";

export type WeaponShape =
  | "sword"
  | "mace"
  | "dagger"
  | "bow"
  | "staff"
  | "spear"
  | "kris"
  | "scythe"
  | "wand"
  | "axe"
  | "fist"
  | "totem"
  | "hammer"
  | "crossbow"
  | "dualsword"
  | "soulblade";

export interface Weapon {
  id: string;
  name: string;
  shape: WeaponShape;
  kind: "melee" | "ranged";
  damage: number;
  cooldown: number; // ms between attacks
  reach: number; // melee arc radius (logical px)
  arc: number; // melee half-angle (radians)
  knockback: number; // px/s impulse applied to enemies
  projSpeed?: number; // ranged projectile speed px/s
  projSize?: number; // ranged projectile radius
  color: string;
  emoji: string;
}

export interface ClassDef {
  id: string;
  name: string;
  role: string;
  hp: number;
  speed: number; // px/s
  weapon: Weapon;
  color: string; // body accent
  desc: string;
}

export interface RaceDef {
  id: RaceId;
  name: string;
  color: string;
  blurb: string;
  classes: ClassDef[];
}

export interface EnemyType {
  id: string;
  name: string;
  color: string;
  accent: string;
  hp: number;
  speed: number;
  damage: number;
  radius: number;
  score: number;
  shape:
    | "goblin"
    | "spider"
    | "skeleton"
    | "orc"
    | "knight"
    | "elemental"
    | "wraith"
    | "troll";
}

export const RACES: RaceDef[] = [
  {
    id: "human",
    name: "人類",
    color: "#e0b753",
    blurb: "亞丁適應力最強的種族，各方面能力都十分均衡。",
    classes: [
      {
        id: "warrior",
        name: "戰士",
        role: "劍術大師",
        hp: 110,
        speed: 235,
        color: "#e0b753",
        weapon: {
          id: "sword",
          name: "鈦金長劍",
          shape: "sword",
          kind: "melee",
          damage: 22,
          cooldown: 340,
          reach: 82,
          arc: 0.72,
          knockback: 150,
          color: "#ffd76a",
          emoji: "🗡️",
        },
        desc: "攻守均衡的劍士，以迅捷而穩定的斬擊作戰。",
      },
      {
        id: "knight",
        name: "騎士",
        role: "守護者",
        hp: 142,
        speed: 205,
        color: "#c9a23a",
        weapon: {
          id: "mace",
          name: "重型戰鎚",
          shape: "mace",
          kind: "melee",
          damage: 36,
          cooldown: 640,
          reach: 76,
          arc: 0.95,
          knockback: 340,
          color: "#cfd6e0",
          emoji: "🔨",
        },
        desc: "攻擊起手較慢，但能施展撼動大地的重擊。",
      },
      {
        id: "rogue",
        name: "盜賊",
        role: "刺客",
        hp: 92,
        speed: 256,
        color: "#d8c27a",
        weapon: {
          id: "dagger",
          name: "暗影匕首",
          shape: "dagger",
          kind: "melee",
          damage: 14,
          cooldown: 210,
          reach: 66,
          arc: 0.6,
          knockback: 90,
          color: "#7fe9ff",
          emoji: "🗡️",
        },
        desc: "以閃電般快速的匕首連擊撕裂成群敵人。",
      },
    ],
  },
  {
    id: "elf",
    name: "精靈",
    color: "#74d68a",
    blurb: "森林之子，優雅、迅捷且精準。",
    classes: [
      {
        id: "archer",
        name: "弓箭手",
        role: "鷹眼",
        hp: 96,
        speed: 240,
        color: "#74d68a",
        weapon: {
          id: "bow",
          name: "貴族長弓",
          shape: "bow",
          kind: "ranged",
          damage: 18,
          cooldown: 360,
          reach: 0,
          arc: 0,
          knockback: 60,
          projSpeed: 660,
          projSize: 6,
          color: "#9bf0a8",
          emoji: "🏹",
        },
        desc: "迅捷的遠程攻擊者，以穿透箭矢打擊敵人。",
      },
      {
        id: "mystic",
        name: "秘法師",
        role: "咒術編織者",
        hp: 88,
        speed: 225,
        color: "#7fd1c0",
        weapon: {
          id: "staff",
          name: "賢者法杖",
          shape: "staff",
          kind: "ranged",
          damage: 27,
          cooldown: 560,
          reach: 0,
          arc: 0,
          knockback: 80,
          projSpeed: 560,
          projSize: 10,
          color: "#8fd0ff",
          emoji: "🪄",
        },
        desc: "凝聚強大的秘法能量，發射沉重魔法彈。",
      },
      {
        id: "sentinel",
        name: "守衛者",
        role: "槍兵",
        hp: 118,
        speed: 220,
        color: "#6fc77f",
        weapon: {
          id: "spear",
          name: "精靈長槍",
          shape: "spear",
          kind: "melee",
          damage: 26,
          cooldown: 430,
          reach: 126,
          arc: 0.5,
          knockback: 170,
          color: "#bff0c0",
          emoji: "🔱",
        },
        desc: "利用長距離槍擊保持安全距離壓制敵人。",
      },
    ],
  },
  {
    id: "darkelf",
    name: "黑暗精靈",
    color: "#a878ff",
    blurb: "與暗影為伍、毫不留情的夜之支配者。",
    classes: [
      {
        id: "assassin",
        name: "刺客",
        role: "夜刃",
        hp: 90,
        speed: 250,
        color: "#a878ff",
        weapon: {
          id: "kris",
          name: "克里斯匕首",
          shape: "kris",
          kind: "melee",
          damage: 16,
          cooldown: 230,
          reach: 72,
          arc: 0.65,
          knockback: 110,
          color: "#d6a8ff",
          emoji: "🗡️",
        },
        desc: "擅長貼身作戰、毫不留情的致命殺手。",
      },
      {
        id: "shillien",
        name: "席琳使徒",
        role: "收割者",
        hp: 112,
        speed: 215,
        color: "#8f5cf0",
        weapon: {
          id: "scythe",
          name: "靈魂鐮刀",
          shape: "scythe",
          kind: "melee",
          damage: 31,
          cooldown: 560,
          reach: 96,
          arc: 1.2,
          knockback: 250,
          color: "#c79bff",
          emoji: "🌙",
        },
        desc: "以大範圍鐮刀橫掃攻擊周圍所有敵人。",
      },
      {
        id: "sorcerer",
        name: "術士",
        role: "咒術師",
        hp: 84,
        speed: 222,
        color: "#b06cff",
        weapon: {
          id: "wand",
          name: "詛咒魔杖",
          shape: "wand",
          kind: "ranged",
          damage: 23,
          cooldown: 450,
          reach: 0,
          arc: 0,
          knockback: 70,
          projSpeed: 610,
          projSize: 8,
          color: "#e08bff",
          emoji: "🪄",
        },
        desc: "以快速黑暗魔彈對敵人施加詛咒。",
      },
    ],
  },
  {
    id: "orc",
    name: "半獸人",
    color: "#d07a3c",
    blurb: "兇猛而堅不可摧，以力量為最高信條。",
    classes: [
      {
        id: "destroyer",
        name: "破壞者",
        role: "狂戰士",
        hp: 152,
        speed: 200,
        color: "#d07a3c",
        weapon: {
          id: "axe",
          name: "巨斧",
          shape: "axe",
          kind: "melee",
          damage: 44,
          cooldown: 780,
          reach: 88,
          arc: 1.0,
          knockback: 380,
          color: "#ff9a4d",
          emoji: "🪓",
        },
        desc: "出手雖慢，但能造成極為致命的巨大傷害。",
      },
      {
        id: "monk",
        name: "武僧",
        role: "怒拳",
        hp: 120,
        speed: 248,
        color: "#e08a4a",
        weapon: {
          id: "fist",
          name: "鐵拳",
          shape: "fist",
          kind: "melee",
          damage: 12,
          cooldown: 170,
          reach: 58,
          arc: 0.75,
          knockback: 80,
          color: "#ffc06a",
          emoji: "✊",
        },
        desc: "以高速拳擊連段不斷壓制敵人。",
      },
      {
        id: "overlord",
        name: "霸主",
        role: "戰爭領主",
        hp: 130,
        speed: 210,
        color: "#c96a30",
        weapon: {
          id: "totem",
          name: "戰爭圖騰",
          shape: "totem",
          kind: "ranged",
          damage: 21,
          cooldown: 700,
          reach: 0,
          arc: 0,
          knockback: 120,
          projSpeed: 480,
          projSize: 14,
          color: "#ffb347",
          emoji: "🗿",
        },
        desc: "以大範圍拋射會爆炸的戰爭圖騰。",
      },
    ],
  },
  {
    id: "dwarf",
    name: "矮人",
    color: "#c9a05a",
    blurb: "精通工藝、體格強健且防守堅韌的種族。",
    classes: [
      {
        id: "artisan",
        name: "工匠",
        role: "鍛造大師",
        hp: 146,
        speed: 200,
        color: "#c9a05a",
        weapon: {
          id: "hammer",
          name: "鍛造戰鎚",
          shape: "hammer",
          kind: "melee",
          damage: 39,
          cooldown: 720,
          reach: 80,
          arc: 1.0,
          knockback: 320,
          color: "#ffd27a",
          emoji: "🔨",
        },
        desc: "以震撼大地的重擊粉碎敵人。",
      },
      {
        id: "warsmith",
        name: "戰爭鐵匠",
        role: "工程師",
        hp: 120,
        speed: 215,
        color: "#b98a44",
        weapon: {
          id: "crossbow",
          name: "重型弩",
          shape: "crossbow",
          kind: "ranged",
          damage: 25,
          cooldown: 520,
          reach: 0,
          arc: 0,
          knockback: 90,
          projSpeed: 780,
          projSize: 6,
          color: "#e0b870",
          emoji: "🏹",
        },
        desc: "使用高速弩箭進行精準遠距離狙擊。",
      },
    ],
  },
  {
    id: "kamael",
    name: "卡麥爾",
    color: "#46c7b8",
    blurb: "來自東方的翼人戰士，勇猛而紀律嚴明。",
    classes: [
      {
        id: "berserker",
        name: "狂戰士",
        role: "雙劍士",
        hp: 108,
        speed: 240,
        color: "#46c7b8",
        weapon: {
          id: "dualsword",
          name: "雙劍",
          shape: "dualsword",
          kind: "melee",
          damage: 18,
          cooldown: 260,
          reach: 74,
          arc: 0.85,
          knockback: 130,
          color: "#7ff0e0",
          emoji: "⚔️",
        },
        desc: "雙刃如鋼鐵風暴般高速旋舞。",
      },
      {
        id: "soulbreaker",
        name: "破魂者",
        role: "靈魂束縛者",
        hp: 96,
        speed: 230,
        color: "#3fb0a4",
        weapon: {
          id: "soulblade",
          name: "靈魂之刃",
          shape: "soulblade",
          kind: "ranged",
          damage: 29,
          cooldown: 500,
          reach: 0,
          arc: 0,
          knockback: 90,
          projSpeed: 720,
          projSize: 9,
          color: "#9ffff0",
          emoji: "🔮",
        },
        desc: "向敵人投射高度凝聚的靈魂能量。",
      },
    ],
  },
];

export const ENEMY_TYPES: EnemyType[] = [
  {
    id: "goblin",
    name: "哥布林",
    color: "#6fae3f",
    accent: "#bff07a",
    hp: 26,
    speed: 96,
    damage: 8,
    radius: 13,
    score: 10,
    shape: "goblin",
  },
  {
    id: "spider",
    name: "洞穴蜘蛛",
    color: "#9b59ff",
    accent: "#d6b3ff",
    hp: 16,
    speed: 142,
    damage: 6,
    radius: 10,
    score: 12,
    shape: "spider",
  },
  {
    id: "skeleton",
    name: "骷髏",
    color: "#d8d2c0",
    accent: "#ffffff",
    hp: 42,
    speed: 82,
    damage: 12,
    radius: 15,
    score: 18,
    shape: "skeleton",
  },
  {
    id: "orc",
    name: "半獸人掠奪者",
    color: "#c0703a",
    accent: "#ffb27a",
    hp: 72,
    speed: 70,
    damage: 16,
    radius: 20,
    score: 28,
    shape: "orc",
  },
  {
    id: "knight",
    name: "黑暗騎士",
    color: "#8a8f9c",
    accent: "#dfe4ee",
    hp: 130,
    speed: 56,
    damage: 22,
    radius: 25,
    score: 48,
    shape: "knight",
  },
  {
    id: "elemental",
    name: "元素精靈",
    color: "#36c5d6",
    accent: "#aef3ff",
    hp: 54,
    speed: 64,
    damage: 14,
    radius: 16,
    score: 32,
    shape: "elemental",
  },
  {
    id: "wraith",
    name: "怨靈",
    color: "#7d8aa8",
    accent: "#dfe7ff",
    hp: 30,
    speed: 150,
    damage: 10,
    radius: 14,
    score: 22,
    shape: "wraith",
  },
  {
    id: "troll",
    name: "洞穴巨魔",
    color: "#6a7a44",
    accent: "#c6d29a",
    hp: 140,
    speed: 48,
    damage: 24,
    radius: 26,
    score: 40,
    shape: "troll",
  },
];

export function getRace(id: RaceId): RaceDef {
  return RACES.find((r) => r.id === id) ?? RACES[0];
}

// ---------- Skills & Magic ----------
export type SkillKind =
  | "aoe"
  | "nova"
  | "point"
  | "beam"
  | "dash"
  | "projectile"
  | "heal"
  | "buff";

export interface SkillDef {
  id: string;
  name: string;
  emoji: string;
  kind: SkillKind;
  cooldown: number; // seconds
  mana: number;
  damage?: number; // multiplier of weapon damage
  radius?: number; // world px
  range?: number; // world px (point/beam)
  count?: number; // projectiles
  spread?: number; // radians
  duration?: number; // buff/dash seconds
  buff?: "damage" | "speed" | "atkspeed" | "shield";
  amount?: number; // buff mult or heal fraction
  buffAmount?: number; // secondary buff mult (for heal+buff skills)
  slow?: number; // 0..1 (1 = freeze)
  stun?: boolean;
  desc: string;
}

export const SKILLS: Record<string, SkillDef[]> = {
  warrior: [
    { id: "whirl", name: "旋風斬", emoji: "🌀", kind: "aoe", cooldown: 6, mana: 30, radius: 130, damage: 1.6, desc: "旋轉攻擊周圍所有敵人。" },
    { id: "charge", name: "衝鋒", emoji: "💥", kind: "dash", cooldown: 5, mana: 25, damage: 2.2, duration: 0.18, desc: "向前衝刺並重創敵人。" },
  ],
  knight: [
    { id: "bash", name: "盾擊", emoji: "🛡️", kind: "nova", cooldown: 7, mana: 35, radius: 130, damage: 1.3, slow: 0.5, desc: "以盾牌重擊敵人並使其減速。" },
    { id: "sanctuary", name: "聖域", emoji: "✨", kind: "heal", cooldown: 12, mana: 50, amount: 0.4, duration: 3, buff: "shield", desc: "恢復生命並獲得暫時護盾。" },
  ],
  rogue: [
    { id: "shadowstep", name: "暗影步", emoji: "👤", kind: "dash", cooldown: 4, mana: 22, damage: 2.0, duration: 0.16, desc: "瞬移至敵人身旁，從暗影中發動攻擊。" },
    { id: "fan", name: "刀刃扇舞", emoji: "🔪", kind: "aoe", cooldown: 7, mana: 30, radius: 115, damage: 1.0, desc: "向四周爆發大量刀刃。" },
  ],
  archer: [
    { id: "multi", name: "多重射擊", emoji: "🏹", kind: "projectile", cooldown: 5, mana: 25, count: 3, spread: 0.42, damage: 1.0, desc: "向前方扇形射出多支箭矢。" },
    { id: "volley", name: "箭雨", emoji: "🌧️", kind: "point", cooldown: 8, mana: 35, range: 300, radius: 120, damage: 1.3, desc: "向遠方指定區域降下箭雨。" },
  ],
  mystic: [
    { id: "meteor", name: "隕石術", emoji: "☄️", kind: "point", cooldown: 8, mana: 45, range: 320, radius: 130, damage: 1.8, desc: "召喚具有毀滅威力的隕石。" },
    { id: "frost", name: "冰霜新星", emoji: "❄️", kind: "nova", cooldown: 7, mana: 30, radius: 150, damage: 1.0, slow: 0.6, desc: "凍結並粉碎周圍敵人。" },
  ],
  sentinel: [
    { id: "impale", name: "穿刺", emoji: "🔱", kind: "beam", cooldown: 6, mana: 30, range: 340, damage: 1.6, desc: "貫穿一直線上的敵人。" },
    { id: "warcry", name: "戰吼", emoji: "📣", kind: "buff", cooldown: 12, mana: 40, buff: "damage", amount: 1.4, duration: 8, desc: "提升自身傷害。" },
  ],
  assassin: [
    { id: "shadowstep", name: "暗影步", emoji: "👤", kind: "dash", cooldown: 4, mana: 20, damage: 2.2, duration: 0.16, desc: "從黑暗中瞬移並發動突襲。" },
    { id: "poison", name: "毒霧", emoji: "☠️", kind: "aoe", cooldown: 8, mana: 35, radius: 120, damage: 1.2, slow: 0.4, desc: "釋放使敵人減速的毒霧。" },
  ],
  shillien: [
    { id: "deathcoil", name: "死亡迴旋", emoji: "🌑", kind: "aoe", cooldown: 8, mana: 45, radius: 150, damage: 1.8, desc: "以巨大鐮刃橫掃敵人。" },
    { id: "siphon", name: "生命汲取", emoji: "🩸", kind: "heal", cooldown: 10, mana: 40, amount: 0.3, buff: "damage", buffAmount: 1.3 as any, duration: 6, desc: "吸取生命並強化後續攻擊。" },
  ],
  sorcerer: [
    { id: "chain", name: "連鎖閃電", emoji: "⚡", kind: "nova", cooldown: 6, mana: 35, radius: 160, damage: 1.4, desc: "對周圍敵人釋放連鎖閃電。" },
    { id: "darkpulse", name: "黑暗脈衝", emoji: "🌑", kind: "beam", cooldown: 7, mana: 30, range: 320, damage: 1.5, desc: "射出一道黑暗能量光束。" },
  ],
  destroyer: [
    { id: "earth", name: "裂地震擊", emoji: "🌋", kind: "aoe", cooldown: 9, mana: 50, radius: 150, damage: 2.0, stun: true, desc: "震碎大地並使敵人暈眩。" },
    { id: "enrage", name: "狂暴", emoji: "😡", kind: "buff", cooldown: 14, mana: 40, buff: "damage", amount: 1.5, duration: 8, desc: "大幅提升傷害。" },
  ],
  monk: [
    { id: "flurry", name: "連擊", emoji: "🥊", kind: "buff", cooldown: 8, mana: 30, buff: "atkspeed", amount: 2.2, duration: 5, desc: "快速連續發動多次攻擊。" },
    { id: "chi", name: "氣療術", emoji: "💚", kind: "heal", cooldown: 10, mana: 40, amount: 0.35, desc: "以氣恢復生命。" },
  ],
  overlord: [
    { id: "warcry", name: "戰吼", emoji: "📣", kind: "buff", cooldown: 12, mana: 40, buff: "damage", amount: 1.4, duration: 8, desc: "強化自身攻擊。" },
    { id: "meteortotem", name: "隕石圖騰", emoji: "🗿", kind: "point", cooldown: 7, mana: 35, range: 300, radius: 120, damage: 1.4, desc: "投擲會爆炸的圖騰。" },
  ],
  artisan: [
    { id: "forge", name: "鍛造炸彈", emoji: "💣", kind: "point", cooldown: 8, mana: 45, range: 240, radius: 130, damage: 2.0, desc: "投擲具有強大威力的炸彈。" },
    { id: "steam", name: "蒸氣護盾", emoji: "💨", kind: "buff", cooldown: 12, mana: 40, buff: "shield", duration: 3, desc: "獲得暫時護盾。" },
  ],
  warsmith: [
    { id: "pierce", name: "穿透射擊", emoji: "➹", kind: "beam", cooldown: 6, mana: 30, range: 420, damage: 1.6, desc: "射出遠距離穿透箭矢。" },
    { id: "trap", name: "陷阱", emoji: "🪤", kind: "point", cooldown: 7, mana: 30, range: 260, radius: 110, damage: 1.2, slow: 0.5, desc: "設置會爆炸並使敵人減速的陷阱。" },
  ],
  berserker: [
    { id: "blade", name: "刀刃風暴", emoji: "🌪️", kind: "aoe", cooldown: 6, mana: 30, radius: 130, damage: 1.4, desc: "高速揮舞雙刃形成風暴。" },
    { id: "enrage", name: "狂暴", emoji: "😡", kind: "buff", cooldown: 12, mana: 40, buff: "damage", amount: 1.5, duration: 8, desc: "進入狂亂狀態並提升傷害。" },
  ],
  soulbreaker: [
    { id: "soulrend", name: "靈魂撕裂", emoji: "🔮", kind: "beam", cooldown: 6, mana: 35, range: 360, damage: 1.8, desc: "以光束撕裂敵人的靈魂。" },
    { id: "soullink", name: "靈魂連結", emoji: "🔗", kind: "heal", cooldown: 10, mana: 40, amount: 0.25, buff: "damage", buffAmount: 1.3 as any, duration: 6, desc: "透過靈魂連結恢復生命並獲得強化。" },
  ],
};

export const CLASS_META: Record<
  string,
  { manaMax: number; manaRegen: number }
> = {
  warrior: { manaMax: 100, manaRegen: 14 },
  knight: { manaMax: 100, manaRegen: 12 },
  rogue: { manaMax: 100, manaRegen: 15 },
  archer: { manaMax: 110, manaRegen: 15 },
  mystic: { manaMax: 120, manaRegen: 16 },
  sentinel: { manaMax: 100, manaRegen: 14 },
  assassin: { manaMax: 95, manaRegen: 16 },
  shillien: { manaMax: 110, manaRegen: 15 },
  sorcerer: { manaMax: 115, manaRegen: 16 },
  destroyer: { manaMax: 110, manaRegen: 12 },
  monk: { manaMax: 110, manaRegen: 15 },
  overlord: { manaMax: 110, manaRegen: 14 },
  artisan: { manaMax: 110, manaRegen: 13 },
  warsmith: { manaMax: 110, manaRegen: 15 },
  berserker: { manaMax: 100, manaRegen: 15 },
  soulbreaker: { manaMax: 115, manaRegen: 16 },
};
