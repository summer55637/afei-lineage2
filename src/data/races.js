// ═══════════════════════════════════════════
// RACES — Definção modular de Raças
// ═══════════════════════════════════════════

export const RACES = {
  human: {
    id: "human",
    name: "Human",
    desc: "多才多藝，在戰鬥與魔法之間取得良好平衡。",
    startZone: "talkingIsland",
    stats: { atk: 0, def: 0, eva: 0, matk: 0, mdef: 0, crit: 0, hp: 0, mp: 0 }
  },
  elf: {
    id: "elf",
    name: "Elf",
    desc: "Graciosos, alta esquiva e velocidade de ataque.",
    startZone: "talkingIsland",
    stats: { atk: 0, def: -2, eva: 8, matk: 0, mdef: 0, crit: 2, hp: -5, mp: 5 }
  },
  darkelf: {
    id: "darkelf",
    name: "Dark Elf",
    desc: "擅長致命暴擊與毀滅性的黑暗魔法。",
    startZone: "talkingIsland",
    stats: { atk: 2, def: -2, eva: 4, matk: 6, mdef: 2, crit: 4, hp: -3, mp: 3 }
  },
  orc: {
    id: "orc",
    name: "Orc",
    desc: "體魄強韌，擁有強大力量與較高生命值。",
    startZone: "talkingIsland",
    stats: { atk: 4, def: 6, eva: -4, matk: -2, mdef: -2, crit: 0, hp: 15, mp: -5 }
  },
  dwarf: {
    id: "dwarf",
    name: "Dwarf",
    desc: "精通工藝製作，並具有額外掉落與製作加成。",
    startZone: "talkingIsland",
    stats: { atk: 0, def: 4, eva: -2, matk: 0, mdef: 0, crit: 0, hp: 10, mp: 0, lootBonus: 15 }
  },
  kamael: {
    id: "kamael",
    name: "Kamael",
    desc: "身手敏捷且致命，精通靈魂之力與劍術。",
    startZone: "talkingIsland",
    stats: { atk: 6, def: -2, eva: 6, matk: 0, mdef: 0, crit: 4, hp: 0, mp: 0 }
  },
  sylph: {
    id: "sylph",
    name: "Sylph",
    desc: "Atiradores elementais do vento com armas de fogo.",
    startZone: "talkingIsland",
    stats: { atk: 4, def: -2, eva: 12, matk: 2, mdef: 0, crit: 6, hp: -5, mp: 5 }
  },
  highelf: {
    id: "highelf",
    name: "High Elf",
    desc: "Elfos supremos com magia sagrada e defesa divina.",
    startZone: "talkingIsland",
    stats: { atk: 0, def: 2, eva: 4, matk: 8, mdef: 4, crit: 0, hp: 0, mp: 10 }
  },
  ertheia: {
    id: "ertheia",
    name: "Ertheia",
    desc: "駕馭風之力的戰士，擁有優秀的魔法潛力。",
    startZone: "talkingIsland",
    stats: { atk: 2, def: 0, eva: 10, matk: 4, mdef: 0, crit: 2, hp: 0, mp: 5 }
  }
};
