/**
 * Fortress Siege System Data (Lineage II Canonical)
 * 5 Fortalezas estratégicas, produção contínua de Knight's Epaulettes e buffs de território.
 */

export const FORTRESSES = {
  aaru_fortress: {
    id: 'aaru_fortress',
    name: '阿魯要塞 🛡️',
    region: '古魯丁領地',
    level: 55,
    epauletteRate: 15, // epaulettes por minuto
    defenders: { hp: 120000, pAtk: 1100, pDef: 950 },
    generators: 3,
    buff: { stat: 'pDef', val: 0.05, label: '邊境 物理防禦 +5%' }
  },
  demon_fortress: {
    id: 'demon_fortress',
    name: '惡魔要塞 😈',
    region: '狄恩領地',
    level: 65,
    epauletteRate: 25,
    defenders: { hp: 180000, pAtk: 1400, pDef: 1200 },
    generators: 3,
    buff: { stat: 'mDef', val: 0.06, label: '邊境 魔法防禦 +6%' }
  },
  dragonspine_fortress: {
    id: 'dragonspine_fortress',
    name: '龍脊要塞 🐉',
    region: '奇岩領地',
    level: 72,
    epauletteRate: 40,
    defenders: { hp: 260000, pAtk: 1800, pDef: 1500 },
    generators: 3,
    buff: { stat: 'pAtk', val: 0.06, label: '領地 物理攻擊 +6%' }
  },
  hive_fortress: {
    id: 'hive_fortress',
    name: '蜂巢要塞 🐝',
    region: '高達特領地',
    level: 78,
    epauletteRate: 60,
    defenders: { hp: 350000, pAtk: 2200, pDef: 1800 },
    generators: 4,
    buff: { stat: 'crit', val: 15, label: '暴擊率 +15' }
  },
  monastic_fortress: {
    id: 'monastic_fortress',
    name: '修道院要塞 ⛪',
    region: '魯因與亞丁領地',
    level: 82,
    epauletteRate: 90,
    defenders: { hp: 480000, pAtk: 2600, pDef: 2100 },
    generators: 4,
    buff: { stat: 'matk', val: 0.08, label: '領地 魔法攻擊 +8%' }
  }
};
