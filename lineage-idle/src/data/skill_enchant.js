/**
 * skill_enchant.js — Definições e Tabelas de Encantamento de Habilidades (+1 a +30).
 *
 * Contém as 4 rotas canônicas (Power, Cost, Chance/Time, Element),
 * chances progressivas, custos de SP e Adena, e os livros Giant's Codex.
 */

export const ENCHANT_ROUTES = {
  power: {
    id: 'power',
    name: '力量路線 ⚔️',
    desc: '每級提升技能基礎傷害與效果 3%（+30 時共 +90%）。',
    bonusPerLevel: 0.03,
    type: 'damage'
  },
  cost: {
    id: 'cost',
    name: '消耗路線 💧',
    desc: '每級降低技能 MP 消耗 2.5%（+30 時共 -75%）。',
    bonusPerLevel: 0.025,
    type: 'mp_cost'
  },
  chance: {
    id: 'chance',
    name: '命中／持續路線 🎯',
    desc: '每級提高減益命中率 2%，或延長增益持續時間。',
    bonusPerLevel: 0.02,
    type: 'chance_duration'
  },
  element: {
    id: 'element',
    name: '元素路線 🔥❄️',
    desc: '每級增加 12 點元素屬性（+30 時共 +360 元素）。',
    bonusPerLevel: 12,
    type: 'elemental_power'
  }
};

/**
 * Tabela de taxas de sucesso e custos para cada nível (+1 até +30).
 */
export function getEnchantLevelData(targetLevel) {
  const lvl = Math.max(1, Math.min(30, targetLevel));

  // Cálculo de chance de sucesso
  let successRate = 0.95;
  if (lvl <= 3) successRate = 0.95;
  else if (lvl <= 6) successRate = 0.85;
  else if (lvl <= 9) successRate = 0.70;
  else if (lvl <= 12) successRate = 0.55;
  else if (lvl <= 15) successRate = 0.42;
  else if (lvl <= 20) successRate = 0.30;
  else if (lvl <= 25) successRate = 0.20;
  else successRate = 0.10; // +26 a +30

  const spCost = Math.round(50000 * Math.pow(1.15, lvl - 1));
  const adenaCost = Math.round(150000 * Math.pow(1.18, lvl - 1));

  return {
    targetLevel: lvl,
    successRate,
    successRatePercent: Math.round(successRate * 100),
    spCost,
    adenaCost,
    reqItemNormal: 'giants_codex',
    reqItemMastery: 'giants_codex_mastery'
  };
}

export const ENCHANT_ITEMS = {
  giants_codex: {
    id: 'giants_codex',
    name: "巨人秘典 📜",
    desc: "亞丁巨人的神聖秘典，用於技能 +1～+30 強化；失敗時強化歸零。",
    icon: 'gradespecial/scrolls/scroll_enchant_weapon_s.png',
    price: 1500000
  },
  giants_codex_mastery: {
    id: 'giants_codex_mastery',
    name: "巨人秘典－精通 🌟",
    desc: "由殷海薩封印的最高秘典，強化失敗時保留目前技能強化等級。",
    icon: 'gradespecial/scrolls/scroll_blessed_weapon_s.png',
    price: 5000000
  }
};
