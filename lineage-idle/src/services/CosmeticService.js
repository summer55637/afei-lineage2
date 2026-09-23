/**
 * CosmeticService.js — Sistema de 外觀s VFX (100% Visual / Idle).
 * 
 * REGRA RIGOROSA: Nenhum cosmético fornece status de combate, HP, dano ou defesa.
 * São 100% visuais e cosméticos, servindo como prestige/sumidouro de Adena.
 */

export const AURAS_CATALOG = {
  aura_none: {
    id: 'aura_none',
    name: '無光環',
    desc: '隱藏角色目前啟用的所有光環。',
    cssClass: '',
    icon: '🚫',
    color: 'transparent',
    costAdena: 0,
    reqHero: false
  },
  aura_hero_golden: {
    id: 'aura_hero_golden',
    name: '英雄金色光環',
    desc: '亞丁奧林匹亞冠軍所散發的經典金色光輝。',
    cssClass: 'hero-aura-golden',
    icon: '👑',
    color: '#ffd700',
    costAdena: 0,
    reqHero: true
  },
  aura_crimson_warlord: {
    id: 'aura_crimson_warlord',
    name: '緋紅戰爭光環',
    desc: '歷經千場戰鬥的狂熱與戰意所化成的緋紅火焰。',
    cssClass: 'hero-aura-crimson',
    icon: '🔥',
    color: '#ef4444',
    costAdena: 1000000,
    reqHero: false
  },
  aura_abyssal_shadow: {
    id: 'aura_abyssal_shadow',
    name: '深淵暗影光環',
    desc: '來自地下墓穴深處的黑紫色乙太漩渦。',
    cssClass: 'hero-aura-abyssal',
    icon: '🌑',
    color: '#a855f7',
    costAdena: 1500000,
    reqHero: false
  },
  aura_divine_seraph: {
    id: 'aura_divine_seraph',
    name: '神聖熾天使光環',
    desc: '殷海薩神殿守護天使所散發的天界光芒。',
    cssClass: 'hero-aura-divine',
    icon: '✨',
    color: '#38bdf8',
    costAdena: 2000000,
    reqHero: false
  },
  aura_frost_monarch: {
    id: 'aura_frost_monarch',
    name: '冰霜君王光環',
    desc: '永恆霜晶使英雄周圍的空氣凝結。',
    cssClass: 'hero-aura-frost',
    icon: '❄️',
    color: '#67e8f9',
    costAdena: 1500000,
    reqHero: false
  },
  aura_emerald_nature: {
    id: 'aura_emerald_nature',
    name: '翠綠自然光環',
    desc: '受伊娃女神精靈祝福的古老翠綠光輝。',
    cssClass: 'hero-aura-emerald',
    icon: '🌿',
    color: '#22c55e',
    costAdena: 1000000,
    reqHero: false
  }
};

export const ITEM_FRAMES_CATALOG = {
  frame_default: {
    id: 'frame_default',
    name: '預設邊框',
    desc: '亞丁樸實鐵製邊框。',
    cssClass: 'cosmetic-frame-default',
    icon: '🔲',
    costAdena: 0
  },
  frame_bronze: {
    id: 'frame_bronze',
    name: '古代青銅邊框',
    desc: '為裝備欄位打造的經典雕刻青銅邊框。',
    cssClass: 'cosmetic-frame-bronze',
    icon: '🥉',
    costAdena: 250000
  },
  frame_silver: {
    id: 'frame_silver',
    name: '史詩銀色邊框',
    desc: '刻有神秘符文的高貴銀色飾邊。',
    cssClass: 'cosmetic-frame-silver',
    icon: '🥈',
    costAdena: 750000
  },
  frame_gold: {
    id: 'frame_gold',
    name: '皇家金色邊框',
    desc: '配得上亞丁王族與貴族的純金邊框。',
    cssClass: 'cosmetic-frame-gold',
    icon: '🥇',
    costAdena: 2000000
  },
  frame_obsidian: {
    id: 'frame_obsidian',
    name: '神秘黑曜石邊框',
    desc: '浸染紫色奧術乙太的黑色火山岩。',
    cssClass: 'cosmetic-frame-obsidian',
    icon: '🔮',
    costAdena: 3500000
  },
  frame_celestial: {
    id: 'frame_celestial',
    name: '眾神天界邊框',
    desc: '以席琳與殷海薩之淚鍛造出的脈動神聖光輝。',
    cssClass: 'cosmetic-frame-celestial',
    icon: '🌟',
    costAdena: 5000000
  }
};

export const TITLES_CATALOG = {
  title_none: {
    id: 'title_none',
    name: '無稱號',
    titleText: '',
    desc: '不顯示任何榮譽稱號。',
    color: '#94a3b8',
    costAdena: 0
  },
  title_lenda: {
    id: 'title_lenda',
    name: '亞丁傳奇',
    titleText: '亞丁傳奇',
    desc: '其事蹟被大陸各地酒館的吟遊詩人傳唱。',
    color: '#ffd700',
    costAdena: 500000
  },
  title_dragonslayer: {
    id: 'title_dragonslayer',
    name: '屠龍者',
    titleText: '屠龍者',
    desc: '敢於挑戰古代巨龍利爪與烈焰的戰士。',
    color: '#ef4444',
    costAdena: 1000000
  },
  title_shadowlord: {
    id: 'title_shadowlord',
    name: '暗影領主',
    titleText: '暗影領主',
    desc: '掌握黑暗奧秘與地下墓穴力量的絕對大師。',
    color: '#a855f7',
    costAdena: 1200000
  },
  title_aurora: {
    id: 'title_aurora',
    name: '黎明使者',
    titleText: '黎明使者',
    desc: '守護黎明封印之光的英雄。',
    color: '#38bdf8',
    costAdena: 1200000
  },
  title_gladiator: {
    id: 'title_gladiator',
    name: '永恆鬥士',
    titleText: '永恆鬥士',
    desc: '未嘗敗績的老練鬥士，其腳步足以震撼亞丁競技場。',
    color: '#f97316',
    costAdena: 1500000
  },
  title_immortal: {
    id: 'title_immortal',
    name: '不死者',
    titleText: '不死者',
    desc: '超越凡人脆弱之軀並獲得永恆之人。',
    color: '#f8fafc',
    costAdena: 3000000
  }
};

export class CosmeticService {
  /**
   * Garante a estrutura correta de cosméticos no estado do jogador.
   */
  static ensureState(state) {
    if (!state) return;
    if (!state.cosmetics || typeof state.cosmetics !== 'object') {
      state.cosmetics = {
        unlockedAuras: ['aura_none'],
        activeAura: 'aura_none',
        unlockedFrames: ['frame_default'],
        activeFrame: 'frame_default',
        unlockedTitles: ['title_none'],
        activeTitle: 'title_none'
      };
    }
    state.cosmetics.unlockedAuras = state.cosmetics.unlockedAuras || ['aura_none'];
    state.cosmetics.unlockedFrames = state.cosmetics.unlockedFrames || ['frame_default'];
    state.cosmetics.unlockedTitles = state.cosmetics.unlockedTitles || ['title_none'];

    // Se o jogador é Herói das Olimpíadas, desbloqueia automaticamente a 光環 Dourada
    if ((state.isHero || state.heroStatus?.isHero) && !state.cosmetics.unlockedAuras.includes('aura_hero_golden')) {
      state.cosmetics.unlockedAuras.push('aura_hero_golden');
    }
  }

  /**
   * Retorna a aura atualmente equipada.
   */
  static getActiveAura(state) {
    this.ensureState(state);
    const auraId = state.cosmetics.activeAura;
    // Se for Herói e não tiver aura explícita selecionada diferente de none, usa a dourada
    if (auraId === 'aura_none' && (state.isHero || state.heroStatus?.isHero)) {
      return AURAS_CATALOG.aura_hero_golden;
    }
    return AURAS_CATALOG[auraId] || AURAS_CATALOG.aura_none;
  }

  /**
   * Retorna a moldura de equipamento ativa.
   */
  static getActiveFrame(state) {
    this.ensureState(state);
    const frameId = state.cosmetics.activeFrame;
    return ITEM_FRAMES_CATALOG[frameId] || ITEM_FRAMES_CATALOG.frame_default;
  }

  /**
   * Retorna o título cosmético ativo.
   */
  static getActiveTitle(state) {
    this.ensureState(state);
    const titleId = state.cosmetics.activeTitle;
    return TITLES_CATALOG[titleId] || TITLES_CATALOG.title_none;
  }

  /**
   * Compra um cosmético (光環, 邊框 ou 稱號) com Adena.
   */
  static buyCosmetic(state, category, itemId, callbacks = {}) {
    this.ensureState(state);
    const { log = console.log, save = () => {}, updateAllUI = () => {} } = callbacks;

    let catalog = null;
    let unlockedList = null;

    if (category === 'aura') {
      catalog = AURAS_CATALOG;
      unlockedList = state.cosmetics.unlockedAuras;
    } else if (category === 'frame') {
      catalog = ITEM_FRAMES_CATALOG;
      unlockedList = state.cosmetics.unlockedFrames;
    } else if (category === 'title') {
      catalog = TITLES_CATALOG;
      unlockedList = state.cosmetics.unlockedTitles;
    }

    if (!catalog || !catalog[itemId]) {
      log('外觀物品無效。', 'error');
      return { success: false, reason: 'invalid_item' };
    }

    const def = catalog[itemId];

    if (unlockedList.includes(itemId)) {
      log(`你已擁有外觀「${def.name}」。`, 'info');
      return { success: false, reason: 'already_owned' };
    }

    if (def.reqHero && !state.isHero && !state.heroStatus?.isHero) {
      log('此光環只有大奧林匹亞加冕英雄才能使用！', 'warning');
      return { success: false, reason: 'hero_required' };
    }

    const cost = def.costAdena || 0;
    if ((state.gold || 0) < cost) {
      log(`金幣不足！價格：${cost.toLocaleString()} 金幣（你有 ${(state.gold || 0).toLocaleString()}）。`, 'error');
      return { success: false, reason: 'insufficient_funds' };
    }

    state.gold -= cost;
    unlockedList.push(itemId);

    log(`✨ 你以 ${cost.toLocaleString()} 金幣購買了外觀「${def.name}」！`, 'system');

    // Equipa automaticamente ao comprar
    this.equipCosmetic(state, category, itemId, { log: () => {}, save, updateAllUI });

    if (typeof save === 'function') save();
    if (typeof updateAllUI === 'function') updateAllUI();

    return { success: true, item: def };
  }

  /**
   * Equipa um cosmético já desbloqueado.
   */
  static equipCosmetic(state, category, itemId, callbacks = {}) {
    this.ensureState(state);
    const { log = console.log, save = () => {}, updateAllUI = () => {} } = callbacks;

    let catalog = null;
    let unlockedList = null;

    if (category === 'aura') {
      catalog = AURAS_CATALOG;
      unlockedList = state.cosmetics.unlockedAuras;
      if (!unlockedList.includes(itemId) && itemId !== 'aura_none') {
        log('你必須先解鎖此光環。', 'error');
        return { success: false, reason: 'locked' };
      }
      state.cosmetics.activeAura = itemId;
      log(`光環已變更為「${catalog[itemId]?.name || '無'}」。`, 'system');
    } else if (category === 'frame') {
      catalog = ITEM_FRAMES_CATALOG;
      unlockedList = state.cosmetics.unlockedFrames;
      if (!unlockedList.includes(itemId) && itemId !== 'frame_default') {
        log('你必須先解鎖此邊框。', 'error');
        return { success: false, reason: 'locked' };
      }
      state.cosmetics.activeFrame = itemId;
      log(`邊框已變更為「${catalog[itemId]?.name || '預設'}」。`, 'system');
    } else if (category === 'title') {
      catalog = TITLES_CATALOG;
      unlockedList = state.cosmetics.unlockedTitles;
      if (!unlockedList.includes(itemId) && itemId !== 'title_none') {
        log('你必須先解鎖此稱號。', 'error');
        return { success: false, reason: 'locked' };
      }
      state.cosmetics.activeTitle = itemId;
      log(`稱號已變更為「${catalog[itemId]?.titleText || '無'}」。`, 'system');
    }

    if (typeof save === 'function') save();
    if (typeof updateAllUI === 'function') updateAllUI();

    return { success: true };
  }
}
