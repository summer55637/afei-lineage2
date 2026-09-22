// ========================================
// Aden Arena — Itemization / loot module
// Equipment drops that bend the numbers:
// damage %, move speed %, flat HP, cooldown
// reduction, crit chance and lifesteal.
// ========================================

export type ItemSlot = "armor" | "trinket" | "boots";
export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export const RARITY_COLOR: Record<Rarity, string> = {
  common: "#b9c2cf",
  uncommon: "#4fd07a",
  rare: "#4aa8ff",
  epic: "#c08bff",
  legendary: "#ffb347",
};

export const RARITY_RANK: Record<Rarity, number> = {
  common: 0,
  uncommon: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
};

const RARITY_WEIGHT: Record<Rarity, number> = {
  common: 60,
  uncommon: 30,
  rare: 13,
  epic: 4.5,
  legendary: 1.2,
};

export interface ItemDef {
  id: string;
  name: string;
  slot: ItemSlot;
  rarity: Rarity;
  icon: string;
  dmgPct?: number;
  speedPct?: number;
  hp?: number;
  cdr?: number;
  crit?: number;
  lifesteal?: number;
  desc: string;
  dropWeight: number;
  minWave: number;
}

export const SLOTS: ItemSlot[] = ["armor", "trinket", "boots"];

export const ITEMS: ItemDef[] = [
  // ---------- ARMOR (chest) ----------
  { id: "padded_vest", name: "襯墊背心", slot: "armor", rarity: "common", icon: "🧥", hp: 22, desc: "多層襯墊可減輕擦身而過的攻擊。", dropWeight: 3, minWave: 1 },
  { id: "studded_leather", name: "鉚釘皮甲", slot: "armor", rarity: "uncommon", icon: "🧥", hp: 38, dmgPct: 3, desc: "以硬化皮革與鐵製鉚釘打造。", dropWeight: 3, minWave: 3 },
  { id: "chainmail", name: "鎖子甲", slot: "armor", rarity: "rare", icon: "🛡", hp: 64, dmgPct: 6, desc: "由數千個互相扣合的金屬環製成。", dropWeight: 2, minWave: 6 },
  { id: "berserker_girdle", name: "狂戰士護腰", slot: "armor", rarity: "rare", icon: "🛡", dmgPct: 12, crit: 5, desc: "將狂怒牢牢束縛於身軀。", dropWeight: 2, minWave: 10 },
  { id: "plate_of_valor", name: "勇氣板甲", slot: "armor", rarity: "epic", icon: "🛡", hp: 105, dmgPct: 10, desc: "為堅守戰線的戰士所鍛造。", dropWeight: 1.5, minWave: 12 },
  { id: "aegis_of_aden", name: "亞丁神盾", slot: "armor", rarity: "legendary", icon: "🛡", hp: 185, dmgPct: 15, cdr: 5, desc: "王國最高工藝的鋼鐵防具。", dropWeight: 1, minWave: 22 },

  // ---------- BOOTS ----------
  { id: "worn_sandals", name: "磨損涼鞋", slot: "boots", rarity: "common", icon: "👡", speedPct: 4, desc: "幾乎只靠意志勉強維持完整。", dropWeight: 3, minWave: 1 },
  { id: "leather_boots", name: "皮靴", slot: "boots", rarity: "uncommon", icon: "🥾", speedPct: 7, hp: 12, desc: "走過無數道路後變得柔軟合腳。", dropWeight: 3, minWave: 3 },
  { id: "swiftstride", name: "迅捷之靴", slot: "boots", rarity: "rare", icon: "🥾", speedPct: 11, hp: 22, desc: "穿上後彷彿大地都在腳下飛逝。", dropWeight: 2, minWave: 7 },
  { id: "monk_wrap", name: "武僧纏足", slot: "boots", rarity: "rare", icon: "🥾", speedPct: 8, cdr: 8, desc: "腳步無聲，出手更加迅捷。", dropWeight: 2, minWave: 10 },
  { id: "windrunner", name: "風行者之靴", slot: "boots", rarity: "epic", icon: "👢", speedPct: 16, hp: 44, desc: "以暴風的氣息編織而成。", dropWeight: 1.5, minWave: 14 },
  { id: "titan_greaves", name: "泰坦護腿", slot: "boots", rarity: "epic", icon: "👢", hp: 120, dmgPct: 5, desc: "每一步都足以震裂石板。", dropWeight: 1.5, minWave: 18 },
  { id: "hermes_greaves", name: "赫密士護腿", slot: "boots", rarity: "legendary", icon: "👢", speedPct: 22, cdr: 5, hp: 60, desc: "足跟如有羽翼，受到盜賊之神祝福。", dropWeight: 1, minWave: 24 },

  // ---------- TRINKETS ----------
  { id: "copper_band", name: "銅戒", slot: "trinket", rarity: "common", icon: "💍", crit: 3, desc: "一枚帶來好運、邊緣略帶銅綠的戒指。", dropWeight: 3, minWave: 1 },
  { id: "wolf_fang_charm", name: "狼牙護符", slot: "trinket", rarity: "uncommon", icon: "📿", crit: 6, dmgPct: 3, desc: "剛從獵物身上取下，仍殘留餘溫。", dropWeight: 3, minWave: 3 },
  { id: "scholars_mark", name: "學者印記", slot: "trinket", rarity: "uncommon", icon: "📿", cdr: 10, hp: 20, desc: "能使思緒更加敏捷的印記。", dropWeight: 2.5, minWave: 5 },
  { id: "ruby_pendant", name: "紅寶石墜飾", slot: "trinket", rarity: "rare", icon: "📿", crit: 9, dmgPct: 6, lifesteal: 3, desc: "宛如第二顆心臟般搏動。", dropWeight: 2, minWave: 8 },
  { id: "vampire_seal", name: "吸血鬼印記", slot: "trinket", rarity: "epic", icon: "💍", crit: 12, lifesteal: 8, dmgPct: 8, desc: "它會吸取生命，而你也一樣。", dropWeight: 1.5, minWave: 15 },
  { id: "seer_orb", name: "先知寶珠", slot: "trinket", rarity: "epic", icon: "🔮", cdr: 12, crit: 10, desc: "彷彿在施法開始前就已看見結局。", dropWeight: 1.5, minWave: 18 },
  { id: "soul_gem", name: "靈魂寶石", slot: "trinket", rarity: "legendary", icon: "💎", crit: 16, lifesteal: 12, dmgPct: 12, cdr: 8, desc: "宛如被囚禁的星辰，渴望吞噬更多力量。", dropWeight: 1, minWave: 26 },
];

export const ITEM_BY_ID: Record<string, ItemDef> = (() => {
  const m: Record<string, ItemDef> = {};
  for (const it of ITEMS) m[it.id] = it;
  return m;
})();

// Roll a drop for a kill. Bosses are guaranteed loot; everyone else
// scales gently with wave depth, and rarity leans upward as you climb.
export function rollItemDrop(wave: number, boss: boolean): ItemDef | null {
  const chance = boss ? 1 : Math.min(0.05 + wave * 0.0045, 0.24);
  if (Math.random() > chance) return null;
  const pool = ITEMS.filter((i) => i.minWave <= Math.max(1, wave));
  if (!pool.length) return null;
  const boost = 1 + wave * 0.012;
  let total = 0;
  const ws = pool.map((i) => {
    let w = RARITY_WEIGHT[i.rarity] * i.dropWeight;
    if (i.rarity === "epic" || i.rarity === "legendary") w *= boost;
    total += w;
    return w;
  });
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= ws[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}
