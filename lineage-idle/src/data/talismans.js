/**
 * Bracelets & Talismans System (Lineage II Canonical)
 * Braceletes com 1 a 4 slots de talismãs e catálogo de talismãs equipáveis com efeitos táticos.
 */

export const BRACELETS = {
  bracelet_steel: {
    id: 'bracelet_steel',
    name: '鋼鐵手鐲（D 級）',
    grade: 'D',
    slots: 1,
    costEpaulettes: 150,
    icon: '📿',
    desc: '基礎鋼製手鐲，提供 1 個護符欄位。'
  },
  bracelet_bronze: {
    id: 'bracelet_bronze',
    name: '青銅手鐲（C 級）',
    grade: 'C',
    slots: 2,
    costEpaulettes: 400,
    icon: '📿',
    desc: '精製青銅手鐲，提供 2 個護符欄位。'
  },
  bracelet_silver: {
    id: 'bracelet_silver',
    name: '米索莉手鐲（B 級）',
    grade: 'B',
    slots: 3,
    costEpaulettes: 900,
    icon: '📿',
    desc: '米索莉手鐲，提供 3 個護符欄位。'
  },
  bracelet_gold: {
    id: 'bracelet_gold',
    name: '黃金手鐲（A 級）',
    grade: 'A',
    slots: 4,
    costEpaulettes: 2000,
    icon: '📿',
    desc: '高級黃金手鐲，提供 4 個護符欄位。'
  },
  bracelet_dynasty: {
    id: 'bracelet_dynasty',
    name: '王朝手鐲（S 級 👑）',
    grade: 'S',
    slots: 4,
    costEpaulettes: 5000,
    icon: '👑',
    desc: '帝國君王手鐲，提供 4 個護符欄位，所有護符效果提高 10%。'
  }
};

export const TALISMANS = {
  talisman_power: {
    id: 'talisman_power',
    name: '力量護符 ⚔️',
    icon: '⚔️',
    costEpaulettes: 100,
    desc: '物理攻擊 +6%、魔法攻擊 +6%',
    stats: { pAtkMult: 0.06, mAtkMult: 0.06 }
  },
  talisman_defense: {
    id: 'talisman_defense',
    name: '防禦護符 🛡️',
    icon: '🛡️',
    costEpaulettes: 100,
    desc: '物理防禦 +8%、魔法防禦 +8%',
    stats: { pDefMult: 0.08, mDefMult: 0.08 }
  },
  talisman_haste: {
    id: 'talisman_haste',
    name: '速度與急速護符 ⚡',
    icon: '⚡',
    costEpaulettes: 120,
    desc: '攻擊速度 +15、迴避 +10',
    stats: { speed: 15, eva: 10 }
  },
  talisman_crit: {
    id: 'talisman_crit',
    name: '暴擊毀滅護符 💥',
    icon: '💥',
    costEpaulettes: 150,
    desc: '暴擊率 +25、暴擊傷害 +8%',
    stats: { crit: 25, critDmg: 0.08 }
  },
  talisman_life_force: {
    id: 'talisman_life_force',
    name: '生命力護符 🌿',
    icon: '🌿',
    costEpaulettes: 200,
    desc: '最大 HP +15%、MP 恢復 +25%',
    stats: { hpMult: 0.15, mpRegen: 0.25 }
  },
  talisman_cancel: {
    id: 'talisman_cancel',
    name: '增益解除護符 🌀',
    icon: '🌀',
    costEpaulettes: 250,
    desc: 'PvP 傷害 +10%，並有機率解除目標的防禦增益',
    stats: { pvpDmg: 0.10, pAtkMult: 0.04 }
  }
};
