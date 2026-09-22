/**
 * bossBalance.js — Configurações Data-Driven de Chefes e Epic Raids do Lineage Idle.
 *
 * Centraliza estatísticas, limites de CP (minimumCP / recommendedCP),
 * mecânicas de enrage e métricas-alvo (TTK/TTD) para calibração.
 * Totalmente alinhado aos envelopes canônicos da FASE 4:
 * Early Epic (40-90s), Mid Epic (60-120s), Late Epic (75-150s), Pinnacle (90-180s).
 */

export const RAID_BOSS_BALANCE = {
  queen_ant: {
    id: 'queen_ant',
    name: '蟻后 👑',
    title: '古魯丁荒野女王',
    lvl: 40,
    reqLvl: 30,
    minimumCP: 7750,
    recommendedCP: 11000,
    hp: 24000,
    atk: 175,
    def: 65,
    mdef: 90,
    eva: 10,
    crit: 12,
    atkSpd: 1.0,
    xp: 28000,
    sp: 350,
    gold: [15000, 30000],
    fatalSkill: {
      name: '酸性費洛蒙爆發',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.30
    },
    mechanics: [
      { name: '腐蝕毒雲', triggerHp: 0.75, damagePercent: 0.10, text: '⚠️ 蟻后釋放了酸性毒雲！' },
      { name: '護理蟻召喚', triggerHp: 0.35, healPercent: 0.10, text: '✨ 護理蟻為女王恢復了 10% 生命值！' }
    ],
    targetMetrics: {
      ttkMin: 40,      // Early Epic Canonical TTK
      ttkMax: 90,      // Early Epic Maximum Envelope (90s)
      ttdBase: 35
    }
  },

  core: {
    id: 'core',
    name: '克魯瑪之塔核心 🔮',
    title: '古代文明的秘法核心',
    lvl: 50,
    reqLvl: 45,
    minimumCP: 13000,
    recommendedCP: 18000,
    hp: 60000,
    atk: 230,
    def: 85,
    mdef: 115,
    eva: 12,
    crit: 14,
    atkSpd: 1.0,
    xp: 55000,
    sp: 650,
    gold: [35000, 65000],
    fatalSkill: {
      name: '量子電漿浩劫',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.30
    },
    mechanics: [
      { name: '電磁屏障', triggerHp: 0.60, damagePercent: 0.12, text: '⚡ 核心啟動反射屏障，造成範圍電擊！' },
      { name: '電漿超載', triggerHp: 0.25, damagePercent: 0.15, text: '💥 高壓電漿超載已觸發！' }
    ],
    targetMetrics: { ttkMin: 60, ttkMax: 120, ttdBase: 35 }
  },

  orfen: {
    id: 'orfen',
    name: '暗影歐爾芬 🕷️',
    title: '孢子之海女王',
    lvl: 55,
    reqLvl: 50,
    minimumCP: 18000,
    recommendedCP: 26000,
    hp: 96000,
    atk: 290,
    def: 105,
    mdef: 145,
    eva: 16,
    crit: 15,
    atkSpd: 1.05,
    xp: 90000,
    sp: 950,
    gold: [50000, 95000],
    fatalSkill: {
      name: '噬魂致命孢子',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.32
    },
    mechanics: [
      { name: '致幻孢子霧', triggerHp: 0.70, damagePercent: 0.12, text: '🌫️ 歐爾芬以劇毒孢子霧籠罩競技場！' },
      { name: '瞬移回巢', triggerHp: 0.30, healPercent: 0.10, text: '🕷️ 歐爾芬退入暗影並恢復了 10% 生命值！' }
    ],
    targetMetrics: { ttkMin: 60, ttkMax: 120, ttdBase: 35 }
  },

  zaken: {
    id: 'zaken',
    name: '札肯船長 🏴‍☠️',
    title: '惡魔島的不死領主',
    lvl: 60,
    reqLvl: 55,
    minimumCP: 24000,
    recommendedCP: 35000,
    hp: 138000,
    atk: 360,
    def: 125,
    mdef: 175,
    eva: 18,
    crit: 18,
    atkSpd: 1.1,
    xp: 140000,
    sp: 1600,
    gold: [80000, 160000],
    fatalSkill: {
      name: '永恆黑暗血色華爾滋',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.32
    },
    mechanics: [
      { name: '暗影步', triggerHp: 0.65, damagePercent: 0.14, text: '🌑 札肯融入暗影並從背後發動攻擊！' },
      { name: '吸血盛宴', triggerHp: 0.30, healPercent: 0.10, damagePercent: 0.10, text: '🩸 吸血盛宴：札肯吸取了你的生命！' }
    ],
    targetMetrics: { ttkMin: 60, ttkMax: 120, ttdBase: 32 }
  },

  barakiel: {
    id: 'barakiel',
    name: '光輝烈焰巴拉基艾爾 🔥',
    title: '高達特高貴的神聖守護者',
    lvl: 75,
    reqLvl: 75,
    minimumCP: 40000,
    recommendedCP: 58000,
    hp: 215000,
    atk: 420,
    def: 145,
    mdef: 195,
    eva: 14,
    crit: 18,
    atkSpd: 1.1,
    xp: 280000,
    sp: 2800,
    gold: [150000, 300000],
    fatalSkill: {
      name: '高貴淨化之炎',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.32
    },
    mechanics: [
      { name: '光輝靈氣', triggerHp: 0.50, damagePercent: 0.15, text: '🌟 巴拉基艾爾釋放神聖高貴之炎！' }
    ],
    targetMetrics: { ttkMin: 75, ttkMax: 150, ttdBase: 32 }
  },

  baium: {
    id: 'baium',
    name: '巴溫皇帝 ⚡',
    title: '傲慢之塔君王',
    lvl: 75,
    reqLvl: 70,
    minimumCP: 45000,
    recommendedCP: 65000,
    hp: 330000,
    atk: 480,
    def: 165,
    mdef: 220,
    eva: 15,
    crit: 20,
    atkSpd: 1.15,
    xp: 320000,
    sp: 3200,
    gold: [180000, 360000],
    fatalSkill: {
      name: '帝國泰坦審判',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.35
    },
    mechanics: [
      { name: '雷霆粉碎拳', triggerHp: 0.70, damagePercent: 0.15, text: '⚡ 巴溫施展了雷霆粉碎拳！' },
      { name: '被囚神祇之怒', triggerHp: 0.30, damagePercent: 0.18, text: '🌩️ 帝王之怒：巴溫大幅提升了攻擊力！' }
    ],
    targetMetrics: { ttkMin: 75, ttkMax: 150, ttdBase: 30 }
  },

  frintezza: {
    id: 'frintezza',
    name: '弗林特莎王子與哈里夏 🎻',
    title: '帝國陵墓樂章大師',
    lvl: 85,
    reqLvl: 80,
    minimumCP: 60000,
    recommendedCP: 85000,
    hp: 470000,
    atk: 500,
    def: 195,
    mdef: 260,
    eva: 16,
    crit: 22,
    atkSpd: 1.2,
    xp: 680000,
    sp: 5800,
    gold: [350000, 700000],
    fatalSkill: {
      name: '哈里夏末日交響曲',
      triggerHps: [0.50, 0.25],
      duration: 5000,
      damageHeroPercent: 0.35
    },
    mechanics: [
      { name: '催眠安魂曲', triggerHp: 0.65, damagePercent: 0.14, text: '🎼 弗林特莎的旋律擾亂了你的感官！' },
      { name: '哈里夏惡魔變身', triggerHp: 0.25, damagePercent: 0.18, text: '👹 史卡雷特・馮・哈里夏化身為翼魔形態！' }
    ],
    targetMetrics: { ttkMin: 75, ttkMax: 150, ttdBase: 28 }
  },

  antharas: {
    id: 'antharas',
    name: '地龍安塔瑞斯 🐉',
    title: '地下深淵之主',
    lvl: 95,
    reqLvl: 85,
    minimumCP: 80000,
    recommendedCP: 115000,
    hp: 670000,
    atk: 600,
    def: 240,
    mdef: 310,
    eva: 12,
    crit: 24,
    atkSpd: 1.25,
    xp: 1400000,
    sp: 12000,
    gold: [700000, 1400000],
    fatalSkill: {
      name: '遠古地脈崩裂',
      triggerHps: [0.50, 0.20],
      duration: 5000,
      damageHeroPercent: 0.35
    },
    mechanics: [
      { name: '化石地震', triggerHp: 0.70, damagePercent: 0.14, text: '🌋 化石地震：地面劇烈震動，造成巨大傷害！' },
      { name: '遠古恐懼咆哮', triggerHp: 0.35, damagePercent: 0.16, text: '🐉 安塔瑞斯的恐懼咆哮撕裂了防禦！' }
    ],
    targetMetrics: { ttkMin: 90, ttkMax: 180, ttdBase: 25 }
  },

  valakas: {
    id: 'valakas',
    name: '火龍巴拉卡斯 🔥',
    title: '諸神熔爐火山的至高領主',
    lvl: 100,
    reqLvl: 90,
    minimumCP: 105000,
    recommendedCP: 150000,
    hp: 1500000,
    atk: 680,
    def: 280,
    mdef: 360,
    eva: 15,
    crit: 25,
    atkSpd: 1.3,
    xp: 2500000,
    sp: 25000,
    gold: [1500000, 3000000],
    fatalSkill: {
      name: '龍族滅絕隕石',
      triggerHps: [0.50, 0.20],
      duration: 5000,
      damageHeroPercent: 0.35
    },
    mechanics: [
      { name: '煉獄吐息', triggerHp: 0.70, damagePercent: 0.12, text: '🔥 太古火焰吐息將防禦焚燒殆盡！' },
      { name: '火山煉獄', triggerHp: 0.35, damagePercent: 0.14, text: '🌋 火山進入最大規模爆發！' }
    ],
    targetMetrics: { ttkMin: 90, ttkMax: 180, ttdBase: 22 }
  }
};

/**
 * Retorna os dados de balanceamento de um chefe de raid específico.
 * @param {string} raidId 
 * @returns {Object|null}
 */
export function getRaidBossBalance(raidId) {
  return RAID_BOSS_BALANCE[raidId] || null;
}

export const getBossBalance = getRaidBossBalance;

/**
 * Retorna se o herói possui CP suficiente para ingressar na raid.
 * @param {number} heroCP 
 * @param {string} raidId 
 * @returns {boolean}
 */
export function canEnterRaid(heroCP, raidId) {
  const boss = getRaidBossBalance(raidId);
  if (!boss) return true;
  return Number(heroCP) >= (boss.minimumCP || 0);
}
