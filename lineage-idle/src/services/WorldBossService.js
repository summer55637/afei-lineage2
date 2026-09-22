/**
 * WorldBossService.js — Sistema de Eventos Globais Programados & Incursões de 世界首領
 * 
 * Cronograma sincronizado com relógio UTC:
 * - Janelas a cada 3 horas (00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00 UTC).
 * - Duração da Invasão: 45 minutos por ciclo.
 * - Rotação Canônica:
 *   1. Queen Ant dos Ermos (Lv. 45)
 *   2. Capitão Pirata Zaken (Lv. 65)
 *   3. Imperador Baium da Torre (Lv. 75)
 *   4. Dragão da Terra Antharas (Lv. 95)
 *   5. Dragão do Fogo Valakas (Lv. 100)
 */

export const WORLD_BOSS_CATALOG = {
  queen_ant_world: {
    id: 'queen_ant_world',
    name: '蟻后 👑',
    title: '古魯丁荒野女王',
    lvl: 45,
    hp: 850000,
    maxHp: 850000,
    atk: 450,
    def: 180,
    mdef: 220,
    eva: 20,
    crit: 15,
    xpReward: 350000,
    spReward: 15000,
    goldReward: 500000,
    adenCoinsReward: 25,
    icon: 'gradespecial/jewels/jewel_ring_queen_ant.png',
    bg: 'dungeon_wastelands',
    lore: '巨蟻女王自古魯丁荒野深處現身，她的酸性費洛蒙能腐蝕最堅固的防具。',
    drops: [
      { itemId: 'jewel_ring_queen_ant', name: '蟻后戒指', chance: 0.35, isEpicJewel: true },
      { itemId: 'book_4star', name: '神聖魔法書：4★（神聖）', chance: 0.20 },
      { itemId: 'scroll_blessed_weapon', name: '祝福武器強化卷軸', count: 3, chance: 0.60 },
      { itemId: 'adena_coins', count: 25, name: '25 枚亞丁幣（AC）', chance: 1.0 }
    ]
  },
  zaken_world: {
    id: 'zaken_world',
    name: '海賊船長札肯 ⚓',
    title: '惡魔島的不死災厄',
    lvl: 65,
    hp: 1850000,
    maxHp: 1850000,
    atk: 850,
    def: 380,
    mdef: 420,
    eva: 30,
    crit: 22,
    xpReward: 950000,
    spReward: 35000,
    goldReward: 1200000,
    adenCoinsReward: 35,
    icon: 'gradespecial/jewels/jewel_earring_zaken.png',
    bg: 'pirates_ship',
    lore: '札肯被永恆詛咒困在幽靈船上，會吸取所有膽敢踏上甲板之人的生命力。',
    drops: [
      { itemId: 'jewel_earring_zaken', name: '札肯耳環', chance: 0.35, isEpicJewel: true },
      { itemId: 'book_4star', name: '神聖魔法書：4★（神聖）', chance: 0.30 },
      { itemId: 'scroll_blessed_weapon', name: '祝福武器強化卷軸', count: 5, chance: 0.70 },
      { itemId: 'adena_coins', count: 35, name: '35 枚亞丁幣（AC）', chance: 1.0 }
    ]
  },
  baium_world: {
    id: 'baium_world',
    name: '皇帝巴溫 ⚡',
    title: '傲慢之塔的受囚暴君',
    lvl: 75,
    hp: 3500000,
    maxHp: 3500000,
    atk: 1650,
    def: 720,
    mdef: 810,
    eva: 40,
    crit: 28,
    xpReward: 2500000,
    spReward: 80000,
    goldReward: 2500000,
    adenCoinsReward: 50,
    icon: 'gradespecial/jewels/jewel_ring_baium.png',
    bg: 'tower_peak',
    lore: '他是建造傲慢之塔、挑戰眾神的皇帝；雷霆之拳與秘法閃電足以摧毀整支軍隊。',
    drops: [
      { itemId: 'jewel_ring_baium', name: '巴溫戒指', chance: 0.35, isEpicJewel: true },
      { itemId: 'book_4star', name: '神聖魔法書：4★（神聖）', chance: 0.40 },
      { itemId: 'scroll_blessed_weapon', name: '祝福武器強化卷軸', count: 8, chance: 0.80 },
      { itemId: 'adena_coins', count: 50, name: '50 枚亞丁幣（AC）', chance: 1.0 }
    ]
  },
  antharas_world: {
    id: 'antharas_world',
    name: '地龍安塔瑞斯 🐉',
    title: '大地龍之王',
    lvl: 95,
    hp: 8500000,
    maxHp: 8500000,
    atk: 3200,
    def: 1450,
    mdef: 1650,
    eva: 50,
    crit: 35,
    xpReward: 8000000,
    spReward: 250000,
    goldReward: 6000000,
    adenCoinsReward: 75,
    icon: 'gradespecial/jewels/jewel_earring_antharas.png',
    bg: 'antharas_lair',
    lore: '席琳女神孕育的巨大龍族。安塔瑞斯在奇岩自千年沉睡中甦醒時，大地震動、巨石從天而降。',
    drops: [
      { itemId: 'jewel_earring_antharas', name: '安塔瑞斯耳環', chance: 0.35, isEpicJewel: true },
      { itemId: 'book_4star', name: '神聖魔法書：4★（神聖）', chance: 0.60 },
      { itemId: 'scroll_blessed_weapon', name: '祝福武器強化卷軸', count: 12, chance: 0.90 },
      { itemId: 'adena_coins', count: 75, name: '75 枚亞丁幣（AC）', chance: 1.0 }
    ]
  },
  valakas_world: {
    id: 'valakas_world',
    name: '火龍巴拉卡斯 🌋',
    title: '火焰與火山的至高支配者',
    lvl: 100,
    hp: 12500000,
    maxHp: 12500000,
    atk: 4800,
    def: 2100,
    mdef: 2400,
    eva: 60,
    crit: 40,
    xpReward: 15000000,
    spReward: 500000,
    goldReward: 10000000,
    adenCoinsReward: 100,
    icon: 'gradespecial/jewels/jewel_necklace_valakas.png',
    bg: 'valakas_volcano',
    lore: '席琳龍族中最令人畏懼的存在，棲息於諸神熔爐的熔岩深處，烈焰吐息足以摧毀文明。',
    drops: [
      { itemId: 'jewel_necklace_valakas', name: '瓦拉卡斯項鍊', chance: 0.35, isEpicJewel: true },
      { itemId: 'book_4star', name: '神聖魔法書：4★（神聖）', chance: 0.75 },
      { itemId: 'scroll_blessed_weapon', name: '祝福武器強化卷軸', count: 15, chance: 1.0 },
      { itemId: 'adena_coins', count: 100, name: '100 枚亞丁幣（AC）', chance: 1.0 }
    ]
  }
};

const BOSS_KEYS = ['queen_ant_world', 'zaken_world', 'baium_world', 'antharas_world', 'valakas_world'];
const CYCLE_MS = 3 * 60 * 60 * 1000; // 3 horas por ciclo
const ACTIVE_DURATION_MS = 45 * 60 * 1000; // 45 minutos ativo

export const WorldBossService = {
  /**
   * Retorna o status do 世界首領 atual e cronograma
   */
  getStatus() {
    const now = Date.now();
    const cycleIndex = Math.floor(now / CYCLE_MS);
    const cycleStart = cycleIndex * CYCLE_MS;
    const elapsedInCycle = now - cycleStart;

    const bossIndex = cycleIndex % BOSS_KEYS.length;
    const nextBossIndex = (cycleIndex + 1) % BOSS_KEYS.length;

    const activeBossKey = BOSS_KEYS[bossIndex];
    const nextBossKey = BOSS_KEYS[nextBossIndex];

    const currentBoss = WORLD_BOSS_CATALOG[activeBossKey];
    const nextBoss = WORLD_BOSS_CATALOG[nextBossKey];

    const isActive = elapsedInCycle < ACTIVE_DURATION_MS;
    const msLeftActive = isActive ? (ACTIVE_DURATION_MS - elapsedInCycle) : 0;
    const msUntilNext = isActive ? (CYCLE_MS - elapsedInCycle) : (CYCLE_MS - elapsedInCycle);

    const fmt = (ms) => {
      const s = Math.floor(ms / 1000) % 60;
      const m = Math.floor(ms / (1000 * 60)) % 60;
      const h = Math.floor(ms / (1000 * 60 * 60));
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    return {
      currentBoss,
      nextBoss,
      isActive,
      msLeftActive,
      msUntilNext,
      timeFormatted: isActive ? fmt(msLeftActive) : fmt(msUntilNext)
    };
  },

  /**
   * Engaja o combate de Incursão Global contra o 世界首領
   */
  joinWorldBoss(state, callbacks = {}) {
    const { log = console.log, floatText = () => {}, renderStageMonster = () => {}, attackMonster = () => {}, save = () => {} } = callbacks;
    if (!state) return { success: false };

    const status = this.getStatus();
    if (!status.isActive) {
      log(`⚠️ 目前沒有世界首領活動。下次甦醒：${status.timeFormatted}。`, 'warning');
      return { success: false, reason: 'not_active' };
    }

    const bossDef = status.currentBoss;

    // Constrói monstro ativo de 世界首領 com mecânicas globais
    state.activeMonster = {
      id: bossDef.id,
      name: bossDef.name,
      title: bossDef.title,
      lvl: bossDef.lvl,
      hp: bossDef.hp,
      maxHp: bossDef.maxHp,
      atk: bossDef.atk,
      def: bossDef.def,
      mdef: bossDef.mdef,
      eva: bossDef.eva,
      crit: bossDef.crit,
      boss: true,
      isWorldBoss: true,
      bg: bossDef.bg,
      worldBossDrops: bossDef.drops,
      xpReward: bossDef.xpReward,
      spReward: bossDef.spReward,
      goldReward: bossDef.goldReward,
      adenCoinsReward: bossDef.adenCoinsReward
    };

    log(`🚨 **[全球突襲]** 你已進入 **${bossDef.name}** 的巢穴！準備迎接大型戰鬥！`, 'rarity-legendary');
    floatText(`⚡ 突襲：${bossDef.name.toUpperCase()}！`, 'float-jackpot');

    renderStageMonster(state);
    if (typeof attackMonster === 'function') attackMonster();
    save();

    return { success: true, boss: bossDef };
  },

  /**
   * Processa recompensas épicas após derrota do 世界首領
   */
  processWorldBossDefeat(state, callbacks = {}) {
    const { log = console.log, floatText = () => {}, addToInventory = () => {} } = callbacks;
    const m = state.activeMonster;
    if (!m || !m.isWorldBoss) return;

    const gold = m.goldReward || 1000000;
    const ac = m.adenCoinsReward || 50;

    state.gold = (state.gold || 0) + gold;
    state.adenCoins = (state.adenCoins || 0) + ac;

    log(`👑 **[全服勝利]** 可怕的世界首領 **${m.name}** 已被擊敗！你獲得 ${gold.toLocaleString()} 金幣與 ${ac} 亞丁幣！`, 'rarity-legendary');
    floatText('🏆 世界首領已擊敗！', 'float-jackpot');

    // Distribuição de drops
    if (m.worldBossDrops && Array.isArray(m.worldBossDrops)) {
      for (const drop of m.worldBossDrops) {
        if (Math.random() <= drop.chance) {
          state.inventory = state.inventory || [];
          state.inventory.push({
            uid: 'wb_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            itemId: drop.itemId,
            name: drop.name,
            count: drop.count || 1,
            rarity: drop.isEpicJewel ? 'legendary' : 'epic'
          });
          log(`✨ **[史詩掉落]** 你獲得了：**${drop.name}**！`, 'rarity-legendary');
        }
      }
    }
  }
};
