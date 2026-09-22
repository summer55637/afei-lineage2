/**
 * CosmeticService.js — Sistema de 外觀s VFX (100% Visual / Idle).
 * 
 * REGRA RIGOROSA: Nenhum cosmético fornece status de combate, HP, dano ou defesa.
 * São 100% visuais e cosméticos, servindo como prestige/sumidouro de Adena.
 */

export const AURAS_CATALOG = {
  aura_none: {
    id: 'aura_none',
    name: 'Sem 光環',
    desc: '隱藏角色目前啟用的所有光環。',
    cssClass: '',
    icon: '🚫',
    color: 'transparent',
    costAdena: 0,
    reqHero: false
  },
  aura_hero_golden: {
    id: 'aura_hero_golden',
    name: '光環 Dourada do Herói',
    desc: 'O resplendor canônico dourado dos campeões das Olimpíadas de Aden.',
    cssClass: 'hero-aura-golden',
    icon: '👑',
    color: '#ffd700',
    costAdena: 0,
    reqHero: true
  },
  aura_crimson_warlord: {
    id: 'aura_crimson_warlord',
    name: '光環 Escarlate da Guerra',
    desc: 'Chamas carmesim emanadas pelo fervor e sede de mil batalhas.',
    cssClass: 'hero-aura-crimson',
    icon: '🔥',
    color: '#ef4444',
    costAdena: 1000000,
    reqHero: false
  },
  aura_abyssal_shadow: {
    id: 'aura_abyssal_shadow',
    name: '光環 Abissal das Sombras',
    desc: 'Vórtices de éter escuro e violeta das profundezas das Catacumbas.',
    cssClass: 'hero-aura-abyssal',
    icon: '🌑',
    color: '#a855f7',
    costAdena: 1500000,
    reqHero: false
  },
  aura_divine_seraph: {
    id: 'aura_divine_seraph',
    name: '光環 Serafim Divina',
    desc: 'Clarão radiante celestial dos anjos guardiões do Templo de Einhasad.',
    cssClass: 'hero-aura-divine',
    icon: '✨',
    color: '#38bdf8',
    costAdena: 2000000,
    reqHero: false
  },
  aura_frost_monarch: {
    id: 'aura_frost_monarch',
    name: '光環 Monarca Glacial',
    desc: 'Cristais de geada perpétua que congelam o ar ao redor do campeão.',
    cssClass: 'hero-aura-frost',
    icon: '❄️',
    color: '#67e8f9',
    costAdena: 1500000,
    reqHero: false
  },
  aura_emerald_nature: {
    id: 'aura_emerald_nature',
    name: '光環 Esmeralda Silvestre',
    desc: 'Radiação esmeralda ancestral abençoada pelos espíritos da Deusa Eva.',
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
    name: '邊框 預設',
    desc: '邊框 de ferro rústico de Aden.',
    cssClass: 'cosmetic-frame-default',
    icon: '🔲',
    costAdena: 0
  },
  frame_bronze: {
    id: 'frame_bronze',
    name: '邊框 Bronze Antigo',
    desc: 'Borda clássica de bronze lapidado para os slots de equipamento.',
    cssClass: 'cosmetic-frame-bronze',
    icon: '🥉',
    costAdena: 250000
  },
  frame_silver: {
    id: 'frame_silver',
    name: '邊框 Prata Épica',
    desc: 'Filetes prateados nobres com runas místicas gravadas.',
    cssClass: 'cosmetic-frame-silver',
    icon: '🥈',
    costAdena: 750000
  },
  frame_gold: {
    id: 'frame_gold',
    name: '邊框 Dourada Real',
    desc: 'Bordas de ouro puro dignas da realeza e nobreza de Aden.',
    cssClass: 'cosmetic-frame-gold',
    icon: '🥇',
    costAdena: 2000000
  },
  frame_obsidian: {
    id: 'frame_obsidian',
    name: '邊框 Obsidiana Mística',
    desc: 'Pedra vulcânica negra banhada em éter arcano violeta.',
    cssClass: 'cosmetic-frame-obsidian',
    icon: '🔮',
    costAdena: 3500000
  },
  frame_celestial: {
    id: 'frame_celestial',
    name: '邊框 Celestial dos Deuses',
    desc: 'Resplendor divino pulsante forjado com as lágrimas de Shilen e Einhasad.',
    cssClass: 'cosmetic-frame-celestial',
    icon: '🌟',
    costAdena: 5000000
  }
};

export const TITLES_CATALOG = {
  title_none: {
    id: 'title_none',
    name: 'Sem 稱號',
    titleText: '',
    desc: 'Nenhum título honorífico exibido.',
    color: '#94a3b8',
    costAdena: 0
  },
  title_lenda: {
    id: 'title_lenda',
    name: 'Lenda de Aden',
    titleText: 'Lenda de Aden',
    desc: 'Cantado pelos bardos de todas as tavernas do continente.',
    color: '#ffd700',
    costAdena: 500000
  },
  title_dragonslayer: {
    id: 'title_dragonslayer',
    name: 'Matador de Dragões',
    titleText: 'Matador de Dragões',
    desc: 'Guerreiro que desafiou as garras e o fogo dos dragões ancestrais.',
    color: '#ef4444',
    costAdena: 1000000
  },
  title_shadowlord: {
    id: 'title_shadowlord',
    name: 'Senhor das Sombras',
    titleText: 'Senhor das Sombras',
    desc: 'Mestre indiscutível dos mistérios sombrios e das catacumbas.',
    color: '#a855f7',
    costAdena: 1200000
  },
  title_aurora: {
    id: 'title_aurora',
    name: 'Arauto da Alvorada',
    titleText: 'Arauto da Alvorada',
    desc: 'Campeão guardião da luz do Selo da Alvorada.',
    color: '#38bdf8',
    costAdena: 1200000
  },
  title_gladiator: {
    id: 'title_gladiator',
    name: 'Gladiador Eterno',
    titleText: 'Gladiador Eterno',
    desc: 'Veterano invicto cujos passos estremecem as arenas de Aden.',
    color: '#f97316',
    costAdena: 1500000
  },
  title_immortal: {
    id: 'title_immortal',
    name: 'O Imortal',
    titleText: 'O Imortal',
    desc: 'Aquele que superou a fragilidade terrena e conquistou a eternidade.',
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
      log(`光環 alterada para "${catalog[itemId]?.name || 'Nenhuma'}".`, 'system');
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
      log(`稱號 alterado para "${catalog[itemId]?.titleText || 'Nenhum'}".`, 'system');
    }

    if (typeof save === 'function') save();
    if (typeof updateAllUI === 'function') updateAllUI();

    return { success: true };
  }
}
