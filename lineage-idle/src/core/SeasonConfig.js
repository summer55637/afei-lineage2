/**
 * SeasonConfig.js — Motor Central de Controle de Temporadas e Crônicas de Aden.
 *
 * Controla a liberação progressiva de sistemas, limites de nível, regras de encantamento
 * e narrativa imersiva de cada temporada.
 *
 * SEASON DINÂMICA: O stage ativo é controlado via window.__serverSeason (definido pelo
 * painel Admin em tempo real) — não é mais uma constante hardcoded.
 */

export const SEASONS_DATA = {
  1: {
    id: 1,
    title: "第 1 季：亞丁覺醒",
    subtitle: "編年史 I — 天選者的最初旅程",
    maxLevel: 40,
    maxGrade: "B",
    active: true,
    releaseDate: "現正開放",
    description: "英雄們在亞丁王國展開旅程。掌握職業的基礎技巧、打造第一批裝備，並爭奪冒險初期的財富。",
    unlockedTabs: [
      "zones", "character", "inventory", "warehouse", "skills",
      "shop", "market", "craft", "alchemy", "astral", "quests", "rankings", "enchant", "dolls", "fishing",
      "hunting", "expeditions", "gathering", "mining", "cosmetics"
    ],
    features: [
      "⚔️ 初期狩獵區（古魯丁、狄恩、奇岩）",
      "👤 第 1、2 次轉職（等級 20、40）",
      "🎒 無級別、D 級、C 級與初階 B 級裝備",
      "✦ 職業基礎技能樹",
      "🧸 可收藏的怪物與首領娃娃",
      "⚒️ 基礎鍛造與藥劑煉金",
      "✨ 安全強化至 +7",
      "🎯 每日任務與第 1 季戰鬥通行證",
      "🏆 全服等級與財富排行榜"
    ]
  },
  2: {
    id: 2,
    title: "第 2 季：血盟與城堡時代",
    subtitle: "編年史 II — 戰爭領主進軍",
    maxLevel: 75,
    maxGrade: "A",
    active: false,
    releaseDate: "即將開放",
    description: "同盟逐漸成形，第一聲戰爭號角響徹山谷。大型城堡與傲慢之塔的支配權爭奪正式開始！",
    unlockedTabs: [
      "clan", "tower", "magiclamp", "expeditions", "raids"
    ],
    features: [
      "🛡️ 建立與發展血盟（等級 1～10）",
      "🏰 城堡攻城戰（古魯丁、狄恩、奇岩）",
      "🏰 傲慢之塔（1～50 層）",
      "🧸 首領娃娃與進階怪物圖鑑",
      "🪔 魔法神燈與隨機製作輪盤",
      "🐉 世界團隊首領初登場（蟻后、核心、歐爾芬）"
    ]
  },
  3: {
    id: 3,
    title: "第 3 季：七封印與奧林匹亞",
    subtitle: "編年史 III — 封印覺醒與英雄王座",
    maxLevel: 85,
    maxGrade: "S",
    active: false,
    releaseDate: "未來季節",
    description: "光明與黑暗勢力在地下墓穴與死靈墓穴正面交鋒。大競技場將為亞丁最初的至高英雄加冕，並授予無限武器。",
    unlockedTabs: [
      "sevensigns", "olympiad", "fortress", "colosseum", "codex", "subclasses"
    ],
    features: [
      "🏛️ 七封印爭奪戰（黎明 vs 黃昏與馬門商人）",
      "🏆 每週大奧林匹亞與英雄加冕",
      "👤 副職業與認證系統",
      "✨ 使用生命石進行精煉",
      "✦ 技能強化（+1～+30）",
      "⚔️ 領地要塞與護身符",
      "🐉 中階大型首領（札肯、巴溫）"
    ]
  },
  4: {
    id: 4,
    title: "第 4 季：巨龍之怒與多重世界",
    subtitle: "編年史 IV — 遠古怒吼與次元之戰",
    maxLevel: 120,
    maxGrade: "S84",
    active: false,
    releaseDate: "未來季節",
    description: "傳說巨龍從千年沉睡中甦醒，次元屏障也隨之崩裂，開啟 2D 像素戰場與 3D 競技場！",
    unlockedTabs: [
      "zones", "character", "inventory", "warehouse", "skills",
      "shop", "market", "craft", "alchemy", "astral", "quests", "rankings", "enchant", "dolls", "fishing",
      "hunting", "expeditions", "gathering", "mining", "cosmetics",
      "clan", "tower", "magiclamp", "raids",
      "sevensigns", "olympiad", "fortress", "colosseum", "codex", "subclasses"
    ],
    features: [
      "🐉 頂級世界首領：安塔瑞斯與巴拉卡斯",
      "👾 正式開放「亞丁像素 2D」模式",
      "⚔ 正式開放「3D 競技場」模式",
      "🏰 亞丁與高達德頂級城堡攻城戰",
      "👤 完整第 3、4 次轉職與神聖變身"
    ]
  }
};

/**
 * Retorna o ID da season ativa em tempo real.
 * Prioridade: window.__adminUnlockedAll (4) > window.__serverSeason > localStorage > state.serverSeason > 1
 */
export function getCurrentSeasonId() {
  if (typeof window !== 'undefined' && window.__adminUnlockedAll) {
    return 4;
  }
  if (typeof localStorage !== 'undefined' && localStorage.getItem('aden_admin_unlock_all') === 'true') {
    return 4;
  }
  if (typeof window !== 'undefined' && window.__serverSeason >= 1) {
    return Number(window.__serverSeason);
  }
  if (typeof localStorage !== 'undefined') {
    const stored = Number(localStorage.getItem('aden_server_season') || localStorage.getItem('aden_admin_season'));
    if (stored >= 1) {
      if (typeof window !== 'undefined') window.__serverSeason = stored;
      return stored;
    }
  }
  // Tenta ler do estado global se disponível
  try {
    const gs = typeof window !== 'undefined' && window.getGameState && window.getGameState();
    if (gs && gs.serverSeason >= 1) return Number(gs.serverSeason);
  } catch (_) {}
  return 1;
}

/**
 * Retorna as informações da temporada atual ativa.
 */
export function getCurrentSeason() {
  return SEASONS_DATA[getCurrentSeasonId()] || SEASONS_DATA[1];
}

/**
 * Verifica se uma aba/recurso está desbloqueado na temporada ativa atual.
 * Se o Admin ativou o modo 'unlock all', todas as abas retornam true.
 * Acumula: temporadas 1..currentSeason ficam todas desbloqueadas.
 * @param {string} tabId
 * @returns {boolean}
 */
export function isFeatureUnlocked(tabId) {
  if (typeof window !== 'undefined' && window.__adminUnlockedAll) {
    return true;
  }
  if (typeof localStorage !== 'undefined' && localStorage.getItem('aden_admin_unlock_all') === 'true') {
    return true;
  }
  const currentId = getCurrentSeasonId();
  if (currentId >= 4) {
    return true;
  }
  for (let s = 1; s <= currentId; s++) {
    const season = SEASONS_DATA[s];
    if (season && season.unlockedTabs && season.unlockedTabs.includes(tabId)) {
      return true;
    }
  }
  return false;
}

/**
 * Retorna qual temporada desbloqueará a funcionalidade.
 * @param {string} tabId
 * @returns {Object|null}
 */
export function getSeasonForFeature(tabId) {
  for (const s of Object.values(SEASONS_DATA)) {
    if (s.unlockedTabs && s.unlockedTabs.includes(tabId)) {
      return s;
    }
  }
  return SEASONS_DATA[2];
}

export function getSeasonMaxLevel() {
  if (typeof window !== 'undefined' && (window.__adminUnlockedAll || (typeof localStorage !== 'undefined' && localStorage.getItem('aden_admin_unlock_all') === 'true'))) {
    return 120;
  }
  if (typeof window !== 'undefined' && window.globalServerCap) {
    return Number(window.globalServerCap);
  }
  if (typeof localStorage !== 'undefined') {
    const storedCap = Number(localStorage.getItem('aden_server_cap'));
    if (storedCap >= 40) return storedCap;
  }
  const season = getCurrentSeason();
  return season?.maxLevel ?? 40;
}

/**
 * Mapa de level cap → season ID para o Admin Panel.
 */
export const CAP_TO_SEASON = {
  40:  1,
  60:  1,
  75:  2,
  85:  3,
  100: 3,
  120: 4,
};

