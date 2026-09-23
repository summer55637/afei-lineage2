/**
 * races_echo.js — Atributos e bônus das raças no sistema Echo of Elements (L2 Essence 547).
 */

export const RACES_ECHO = {
  human:    { name: '人類',     desc: '多才多藝，在戰鬥與魔法方面表現均衡。',       stats: { atk: 0,  def: 0,  eva: 0,  matk: 0,  mdef: 0  }, startZone: 'talkingIsland' },
  elf:      { name: '精靈',       desc: '優雅靈巧，擁有高迴避與攻擊速度。',    stats: { atk: 0,  def:-2,  eva: 8,  matk: 0,  mdef: 0  }, startZone: 'talkingIsland' },
  darkelf:  { name: '黑暗精靈',  desc: '擅長暴擊與強大的黑暗魔法。', stats: { atk: 2,  def:-2,  eva: 4,  matk: 6,  mdef: 2  }, startZone: 'talkingIsland' },
  orc:      { name: '半獸人',       desc: '體魄強韌，擁有強大力量與高生命值。',             stats: { atk: 4,  def: 6,  eva:-4,  matk:-2,  mdef:-2 }, startZone: 'talkingIsland' },
  dwarf:    { name: '矮人',     desc: '工藝大師，擁有額外掉落與製作加成。',        stats: { atk: 0,  def: 4,  eva:-2,  matk: 0,  mdef: 0, lootBonus: 0.15 }, startZone: 'talkingIsland' },
  kamael:   { name: '闇天使',    desc: '敏捷而致命，擅長靈魂力量與劍術。',   stats: { atk: 6,  def:-2,  eva: 6,  matk: 0,  mdef: 0  }, startZone: 'talkingIsland' },
  sylph:    { name: '風精靈',     desc: '操控風之元素、使用槍械的射手。', stats: { atk: 4,  def:-2,  eva:12,  matk: 2,  mdef: 0  }, startZone: 'talkingIsland' },
  highelf:  { name: '高等精靈',  desc: '擅長神聖魔法與神聖防禦的至高精靈。', stats: { atk: 0,  def: 2,  eva: 4,  matk: 8,  mdef: 4  }, startZone: 'talkingIsland' },
  ertheia:  { name: '艾爾提亞',   desc: '擁有高度魔法潛力的風之戰士。',    stats: { atk: 2,  def: 0,  eva:10,  matk: 4,  mdef: 0  }, startZone: 'talkingIsland' }
};
