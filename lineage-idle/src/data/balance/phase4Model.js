/**
 * phase4Model.js — Canonical Operational Model & Acceptance Matrices (Master Game Balance — Phase 4)
 *
 * Implements the canonical formulas and thresholds defined in the Phase 4 specification:
 * - Preparation Score (PS) and its Monotonicity Rule
 * - CP Bands and CP Ratio
 * - Projected Survival Time (PST) and Survival Margin (SM)
 * - Deterministic Combat Outcomes (WIN, LOSS, DRAW, TIMEOUT)
 * - Resource Pressure classification
 * - Acceptance criteria, Wilson Score 95% Confidence Interval calculations
 */

// 1. CANONICAL UNITS DICTIONARY (Section 3)
export const CANONICAL_UNITS = {
  level: 'level',
  hp: 'HP',
  mp: 'MP',
  patk: 'stat points',
  matk: 'stat points',
  pdef: 'stat points',
  mdef: 'stat points',
  accuracy: 'rating',
  evasion: 'rating',
  critRate: '%',
  critMultiplier: '×',
  attackSpeed: 'actions/s',
  castSpeed: 'actions/s',
  hps: 'HP/s',
  dps: 'damage/s',
  ttk: 's',
  ttd: 's',
  pst: 's',
  survivalMargin: '×',
  ehp: 'effective HP',
  winRate: '%',
  lossRate: '%',
  drawRate: '%',
  timeoutRate: '%',
  potionUsage: '%',
  potionCost: 'Adena/combat',
  potionCostRatio: '%',
  mpConsumption: 'MP/s',
  mpPerCast: 'MP/cast',
  mpTotal: 'MP/combat',
  cp: 'CP',
  cpRatio: '×',
  preparationScore: 'PS',
  preparationComponent: '%',
  resourcePressure: 'categorical'
};

// 2. PREPARATION SCORE (Sections 4, 5, 6, 7, 30, 31)
// PS = Equipment * 0.30 + Consumables * 0.15 + Buffs * 0.15 + Skills * 0.20 + Rotation * 0.20
export const PREPARATION_PROFILES = {
  POOR: {
    id: 'POOR',
    ps: 75,
    desc: '準備不足',
    components: { equipment: 83.3, consumables: 60, buffs: 60, skills: 80, rotation: 80 },
    defaultPotionStock: 18
  },
  STANDARD: {
    id: 'STANDARD',
    ps: 100,
    desc: '官方基準',
    components: { equipment: 100, consumables: 100, buffs: 100, skills: 100, rotation: 100 },
    defaultPotionStock: 25
  },
  FULL: {
    id: 'FULL',
    ps: 125,
    desc: '準備完整',
    components: { equipment: 110, consumables: 140, buffs: 130, skills: 125, rotation: 132.5 },
    defaultPotionStock: 35
  },
  OPTIMIZED: {
    id: 'OPTIMIZED',
    ps: 150,
    desc: '準備極佳',
    components: { equipment: 130, consumables: 170, buffs: 160, skills: 150, rotation: 157.5 },
    defaultPotionStock: 50
  }
};

/**
 * Calculates the Preparation Score (PS) via the canonical weighted formula:
 * PS = Equipment * 0.30 + Consumables * 0.15 + Buffs * 0.15 + Skills * 0.20 + Rotation * 0.20
 * @param {Object} components
 * @returns {number} PS in units of 'PS'
 */
export function calculatePreparationScore({
  equipment = 100,
  consumables = 100,
  buffs = 100,
  skills = 100,
  rotation = 100
} = {}) {
  const ps =
    Number(equipment) * 0.30 +
    Number(consumables) * 0.15 +
    Number(buffs) * 0.15 +
    Number(skills) * 0.20 +
    Number(rotation) * 0.20;
  return Math.round(ps * 10) / 10;
}

// 3. CP BANDS & RATIO (Sections 9, 10)
export function calculateCpRatio(playerCp, recommendedCp) {
  if (!recommendedCp || recommendedCp <= 0) return 1.0;
  return Math.round((playerCp / recommendedCp) * 100) / 100;
}

export function classifyCpBand(playerCp, minimumCp, recommendedCp) {
  const pCp = Number(playerCp) || 0;
  const minCp = Number(minimumCp) || 0;
  const recCp = Number(recommendedCp) || 1;

  if (pCp < minCp) return 'LOCKED';
  if (pCp < recCp) return 'CHALLENGING';
  if (pCp < recCp * 1.10) return 'RECOMMENDED';
  if (pCp < recCp * 1.50) return 'FAVORABLE';
  return 'FARM';
}

// 4. PROJECTED SURVIVAL TIME & SURVIVAL MARGIN (Sections 29, 30, 31, 32, 33, 34)
/**
 * Calculates Effective HP Budget:
 * Effective HP Budget = Current HP + Expected Healing + Expected Potion Healing
 */
export function calculateEffectiveHpBudget(currentHp, expectedSkillHeal = 0, expectedPotionHeal = 0) {
  return Math.max(1, Number(currentHp) + Number(expectedSkillHeal) + Number(expectedPotionHeal));
}

/**
 * Calculates Projected Survival Time (PST):
 * PST = Effective HP Budget / Sustained Incoming DPS
 * Unit: seconds (s)
 */
export function calculatePST(effectiveHpBudget, sustainedIncomingDps) {
  const dps = Math.max(0.1, Number(sustainedIncomingDps) || 0.1);
  const pst = effectiveHpBudget / dps;
  return Math.round(pst * 10) / 10;
}

/**
 * Calculates Survival Margin (SM):
 * Survival Margin = PST / Scenario Median TTK
 * Unit: ×
 */
export function calculateSurvivalMargin(pst, scenarioMedianTtk) {
  const ttk = Math.max(0.1, Number(scenarioMedianTtk) || 0.1);
  const sm = pst / ttk;
  return Math.round(sm * 100) / 100;
}

/**
 * Classifies Survival Margin (Section 33)
 */
export function classifySurvivalMargin(sm) {
  const val = Number(sm) || 0;
  if (val < 0.95) return { tier: 'CRITICAL', status: 'FAIL', desc: '生存能力不足' };
  if (val < 1.25) return { tier: 'VERY HARD', status: 'PASS_MINIMUM', desc: '可生存，但壓力很高' };
  if (val < 1.50) return { tier: 'CHALLENGING', status: 'PASS_CHALLENGE', desc: '具有挑戰性，但仍可應對' };
  if (val < 2.00) return { tier: 'COMFORTABLE', status: 'PASS_RECOMMENDED', desc: '舒適且穩定' };
  return { tier: 'DOMINATED', status: 'PASS_FARM', desc: '完全壓制' };
}

// 5. COMBAT OUTCOMES & RATES (Sections 35 to 47)
export const COMBAT_OUTCOME = {
  WIN: 'WIN',
  LOSS: 'LOSS',
  DRAW: 'DRAW',
  TIMEOUT: 'TIMEOUT'
};

export function calculateCombatRates(wins, losses, draws, timeouts, total) {
  const runs = Math.max(1, total || (wins + losses + draws + timeouts));
  const winRate = Math.round((wins / runs) * 1000) / 10;
  const lossRate = Math.round((losses / runs) * 1000) / 10;
  const drawRate = Math.round((draws / runs) * 1000) / 10;
  const timeoutRate = Math.round((timeouts / runs) * 1000) / 10;

  return {
    winRate,
    lossRate,
    drawRate,
    timeoutRate,
    totalRuns: runs,
    isConsistent: Math.abs(winRate + lossRate + drawRate + timeoutRate - 100.0) <= 0.2
  };
}

// 6. RESOURCE PRESSURE (Sections 48 to 53)
export function classifyResourcePressure(potionUsagePercent, hpLossPercent = 0, mpDepletionPercent = 0) {
  const maxPressure = Math.max(
    Number(potionUsagePercent) || 0,
    Number(hpLossPercent) || 0,
    Number(mpDepletionPercent) || 0
  );

  if (maxPressure <= 25) return 'LOW';
  if (maxPressure <= 50) return 'MODERATE';
  if (maxPressure <= 100) return 'HIGH';
  return 'EXCESSIVE';
}

export function calculatePotionCost(potionsUsed, unitPrice = 100) {
  return Math.round(Number(potionsUsed) * unitPrice);
}

export function calculatePotionCostRatio(potionCostAdena, guaranteedRewardAdena) {
  if (!guaranteedRewardAdena || guaranteedRewardAdena <= 0) return 0;
  return Math.round((potionCostAdena / guaranteedRewardAdena) * 10000) / 100;
}

// 7. STATISTICAL UTILITIES (Wilson Score 95% Confidence Interval)
export function calculateConfidenceInterval95(wins, total) {
  if (!total || total <= 0) return { method: 'Wilson', p: 0, lower: 0, upper: 0, intervalStr: '[0.00%, 0.00%]' };
  const n = total;
  const p = wins / n;
  const z = 1.95996; // 95% standard normal quantile
  const z2 = z * z;

  // Wilson score interval formula
  const denom = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denom;
  const rad = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / denom;

  const lower = Math.max(0, center - rad);
  const upper = Math.min(1, center + rad);

  const lowerPct = Math.round(lower * 10000) / 100;
  const upperPct = Math.round(upper * 10000) / 100;
  const marginPct = Math.round(((upperPct - lowerPct) / 2) * 100) / 100;

  return {
    method: 'Wilson',
    p: Math.round(p * 1000) / 10,
    lower: lowerPct,
    upper: upperPct,
    marginPct,
    intervalStr: `[${lowerPct.toFixed(2)}%, ${upperPct.toFixed(2)}%]`
  };
}

// 8. OFFICIAL ACCEPTANCE CRITERIA MATRIX (Section 87 & User Strict Criteria)
export const ACCEPTANCE_MATRIX = {
  MINIMUM_WR_FULL: 50.0,         // %
  MINIMUM_SM_FULL: 1.00,         // ×
  MINIMUM_RESOURCE_USAGE: 100.0, // % max
  RECOMMENDED_WR_STANDARD: 95.0, // %
  RECOMMENDED_SM_STANDARD: 1.50, // × (STRICT FOR ALL CONTENT, NO SPECIAL BOSS EXCEPTION)
  FAVORABLE_WR: 99.0,            // %
  FARM_WR: 99.5,                 // %
  FARM_TTK_RATIO: 0.50,          // × (COMPARED USING RAW VALUE <= 0.50)
  RECOMMENDED_TO_MIN_CP_MIN: 1.25, // ×
  RECOMMENDED_TO_MIN_CP_MAX: 1.75, // ×
  DRAW_RATE_PASS_MAX: 1.0,       // %
  TIMEOUT_RATE_TARGET: 0.0,      // %
  POTION_COST_REWARD_MAX: 5.0,   // %
  P95_TO_MEDIAN_TTK_MAX: 1.50,   // ×
  P95_TO_MEDIAN_RNG_MAX: 1.75    // ×
};

export const CANONICAL_VARIABLES = Object.freeze({
  C: { name: '內容', desc: '正在測試的內容' },
  K: { name: '職業', desc: '玩家職業' },
  L: { name: '等級', desc: '玩家等級' },
  CP: { name: '戰鬥力', unit: 'CP' },
  PS: { name: '準備分數', unit: 'PS' },
  B: { name: '配置', desc: '裝備與技能配置' },
  R: { name: '規則版本', desc: '平衡規則版本' },
  S: { name: '隨機種子', desc: '模擬隨機種子' },
  N: { name: '執行次數', desc: '模擬執行次數' },
  // Offensive
  PATK: { name: '物理攻擊', unit: '屬性點' },
  MATK: { name: '魔法攻擊', unit: '屬性點' },
  CR: { name: '暴擊率', unit: '%' },
  CM: { name: '暴擊倍率', unit: '×' },
  AS: { name: '攻擊速度', unit: '次／秒' },
  CS: { name: '施法速度', unit: '次／秒' },
  ACC: { name: '命中', unit: '數值' },
  // Defensive
  PDEF: { name: '物理防禦', unit: '屬性點' },
  MDEF: { name: '魔法防禦', unit: '屬性點' },
  HP: { name: '目前生命值', unit: 'HP' },
  MaxHP: { name: '最大生命值', unit: 'HP' },
  MP: { name: '目前魔力', unit: 'MP' },
  MaxMP: { name: '最大魔力', unit: 'MP' },
  EVA: { name: '迴避', unit: '數值' },
  RES: { name: '抗性', unit: '數值' },
  DR: { name: '傷害減免', unit: '%' },
  SH: { name: '護盾吸收量', unit: 'HP' },
  // Temporal
  TTK: { name: '擊殺時間', unit: 's' },
  TTD: { name: '存活時間', unit: 's' },
  PST_VAR: { name: '預估存活時間', unit: 's' },
  CT: { name: '戰鬥持續時間', unit: 's' },
  // Combat
  D: { name: '總傷害', unit: '傷害' },
  H: { name: '有效治療量', unit: 'HP' },
  DPS: { name: '持續傷害輸出', unit: '傷害／秒' },
  HPS: { name: '有效每秒治療量', unit: 'HP/s' },
  // Resources
  MPSpent: { name: '消耗魔力', unit: 'MP' },
  PotionUsed: { name: '藥水消耗量', unit: '瓶／戰鬥' },
  PotionStock: { name: '初始藥水庫存', unit: '瓶' },
  PotionCost: { name: '消耗品成本', unit: '金幣／戰鬥' },
  // Rewards
  XP: { name: '經驗值', unit: 'XP' },
  Adena: { name: '金幣', unit: '金幣' },
  RewardValue: { name: '標準化獎勵價值', unit: '金幣' },
  GuaranteedReward: { name: '最低保證獎勵', unit: '金幣' }
});

export function statisticalMedian(arr) {
  if (!arr || !arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const n = sorted.length;
  if (n % 2 === 1) return sorted[(n - 1) / 2];
  return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}

export function sampleVariance(arr) {
  if (!arr || arr.length < 2) return 0;
  const n = arr.length;
  const mean = arr.reduce((s, v) => s + v, 0) / n;
  const sumSqDev = arr.reduce((s, v) => s + (v - mean) ** 2, 0);
  return sumSqDev / (n - 1);
}

export function sampleStdDev(arr) {
  return Math.sqrt(sampleVariance(arr));
}

export function standardError(arr) {
  if (!arr || arr.length < 2) return 0;
  return sampleStdDev(arr) / Math.sqrt(arr.length);
}

export function wilsonScoreInterval(wins, total) {
  if (!total || total <= 0) return { p: 0, lower: 0, upper: 0, lowerPct: 0, upperPct: 0, method: 'Wilson' };
  const n = total;
  const p = wins / n;
  const z = 1.959963984540054;
  const z2 = z * z;
  const denom = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denom;
  const halfWidth = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / denom;
  const lower = p === 0 ? 0 : Math.max(0, center - halfWidth);
  const upper = p === 1 ? 1 : Math.min(1, center + halfWidth);
  return {
    method: 'Wilson',
    p,
    lower,
    upper,
    lowerPct: lower * 100,
    upperPct: upper * 100,
    intervalStr: `[${(lower * 100).toFixed(2)}%, ${(upper * 100).toFixed(2)}%]`
  };
}

export function studentTConfidenceInterval(arr, alpha = 0.05) {
  if (!arr || arr.length < 2) return { mean: arr?.[0] || 0, lower: arr?.[0] || 0, upper: arr?.[0] || 0 };
  const n = arr.length;
  const mean = arr.reduce((s, v) => s + v, 0) / n;
  const se = standardError(arr);
  // Approximation of t critical value for large df
  const df = n - 1;
  const z = 1.959963984540054;
  // Cornish-Fisher expansion for t approximation
  const g1 = (z * z * z + z) / (4 * df);
  const t = z + g1;
  const margin = t * se;
  return { mean, lower: mean - margin, upper: mean + margin, se, df, t, n };
}

export function deterministicPercentile(arr, q) {
  if (!arr || !arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const pos = q * (sorted.length - 1);
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

export function validateOutcomeConsistency(wr, lr, dr, tr) {
  const sum = wr + lr + dr + tr;
  return Math.abs(sum - 1.0) <= 1e-12;
}

export function calculateOffensiveDelta(dpsTest, dpsBase) {
  if (!dpsBase || dpsBase <= 0) return 0;
  return (dpsTest / dpsBase) - 1;
}

export function calculateDefensiveDelta(pstTest, pstBase) {
  if (!pstBase || pstBase <= 0) return 0;
  return (pstTest / pstBase) - 1;
}

export function calculateHealingDelta(hpsTest, hpsBase) {
  if (!hpsBase || hpsBase <= 0) return 0;
  return (hpsTest / hpsBase) - 1;
}

export function calculateTTKImprovement(ttkTest, ttkBase) {
  if (!ttkBase || ttkBase <= 0) return 0;
  return 1 - (ttkTest / ttkBase);
}

export function calculateRealPowerScore(od, dd, hd, rd) {
  return 0.45 * (Number(od) || 0) + 0.30 * (Number(dd) || 0) + 0.10 * (Number(hd) || 0) + 0.15 * (Number(rd) || 0);
}

export function calculateCPEfficiency(rps, cpDelta) {
  if (!cpDelta || cpDelta <= 0) return 0;
  return rps / cpDelta;
}

export function detectCPInflation(cpDiffPercent, realPowerDiffPercent) {
  return cpDiffPercent > 20 && realPowerDiffPercent < 5;
}

export function detectCPUndervaluation(cpDiffPercent, realPowerDiffPercent) {
  return cpDiffPercent <= 5 && realPowerDiffPercent > 20;
}

export function detectCPRepresentationFailure(cpDiffPercent, realPowerDiffPercent) {
  return Math.abs(realPowerDiffPercent) > 20 && Math.abs(cpDiffPercent) <= 5;
}

export function calculateEHP(maxHp, effectiveDefense, kDef = 250) {
  return maxHp * (1 + effectiveDefense / kDef);
}

export function calculateEHPBudget(currentHp, expectedHealing, expectedPotionHealing, expectedShieldAbsorption = 0) {
  return currentHp + expectedHealing + expectedPotionHealing + expectedShieldAbsorption;
}

export function calculateSIDPS(totalEffectiveDamageTaken, effectiveCombatDuration) {
  if (effectiveCombatDuration <= 0) return 0;
  return totalEffectiveDamageTaken / effectiveCombatDuration;
}

export function calculateCanonicalPST(ehpBudget, sidps) {
  if (sidps <= 0) return Infinity;
  return ehpBudget / sidps;
}

export function calculateCanonicalSM(pst, scenarioMedianTTK) {
  if (scenarioMedianTTK <= 0) return Infinity;
  return pst / scenarioMedianTTK;
}

export function evaluateBoundary(value, threshold, operator = '>=') {
  switch (operator) {
    case '>=': return value >= threshold;
    case '>': return value > threshold;
    case '<=': return value <= threshold;
    case '<': return value < threshold;
    case '==': return Math.abs(value - threshold) <= 1e-12;
    default: return false;
  }
}

export const HARD_CRITERIA = Object.freeze({
  MINIMUM_WR_LOWER_CI: 50.0,
  MINIMUM_SM: 1.00,
  MINIMUM_RESOURCE_USAGE_MAX: 100.0,
  RECOMMENDED_WR_LOWER_CI: 95.0,
  RECOMMENDED_SM: 1.50,
  FARM_WR_LOWER_CI: 99.5,
  FARM_TTK_RATIO_MAX: 0.5000,
  DRAW_RATE_MAX: 1.0,
  TIMEOUT_RATE_MAX: 0.0,
  POTION_COST_RATIO_MAX: 5.0,
  NORMAL_MONSTER_TTK_MAX: 15.0,
  GRADE_PROGRESSION_MIN: 1.00,
});

export const SOFT_CRITERIA = Object.freeze({
  CP_GAP_MIN: 1.25,
  CP_GAP_MAX: 1.75,
  SLOT_POWER_RATIO_MIN: 0.85,
  SLOT_POWER_RATIO_MAX: 1.15,
  ENCHANT_SPIKE_REVIEW: 2.0,
  ENCHANT_SPIKE_FAIL: 3.0,
  GRADE_SPIKE_REVIEW: 1.50,
  GRADE_SPIKE_FAIL: 2.00,
  CHAMPION_RATIO_MAX: 4.00,
  TOWER_CP_GROWTH_MIN: 1.05,
  TOWER_CP_GROWTH_MAX: 1.20,
  TOWER_CP_GROWTH_FAIL: 1.35,
  TOWER_TTK_GROWTH_MIN: 1.00,
  TOWER_TTK_GROWTH_MAX: 1.25,
  TOWER_TTK_GROWTH_FAIL: 1.50,
  P95_MEDIAN_MAX: 1.50,
  P95_MEDIAN_FAIL: 2.00,
  SLOT_POWER_RATIO_FAIL_LOW: 0.70,
  SLOT_POWER_RATIO_FAIL_HIGH: 1.50,
});
