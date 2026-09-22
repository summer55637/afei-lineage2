/**
 * WeaponResonanceService.js — Sistema de Ressonância de Armas e Combos de Habilidades Cruzadas.
 *
 * Analisa as armas equipadas no Slot 1 (weapon) e Slot 2 (weapon2) + Escudo,
 * ativando passivas únicas e procs de combate para todas as combinações de armas do Aden Arena.
 */

import { D } from '../core/GameConfig.js';
import { detectItemWeaponType } from '../engine/SkillEngine.js';

export const RESONANCE_STATES = {
  LOCKED: 'LOCKED',
  INACTIVE: 'INACTIVE',
  READY: 'READY',
  ACTIVE: 'ACTIVE',
  ARMED: 'ARMED',
  COOLDOWN: 'COOLDOWN'
};

export const RESONANCE_DEFINITIONS = {
  // 1. Arco + Adaga
  shadow_stalker: {
    id: 'shadow_stalker',
    name: '暗影獵手',
    pairName: '弓 + 匕首',
    icon: '🏹🗡️',
    color: '#a855f7',
    desc: '弓系技能會附加【暗影標記】。匕首攻擊造成 +25% 致命暴擊傷害並持續流血。暴擊有 15% 機率在 4 秒內無視 20% 物理防禦。',
    weap1: 'bow',
    weap2: 'dagger',
    passives: { critChance: 6, eva: 6 }
  },

  // 2. 弓 + 長槍
  dragon_lancer: {
    id: 'dragon_lancer',
    name: '龍族哨兵',
    pairName: '弓 + 長槍',
    icon: '🏹🔱',
    color: '#0284c7',
    desc: '弓箭命中會施加緩速（目標攻擊速度 -15%，持續 5 秒）。對緩速目標使用長槍時觸發穿刺突擊（傷害 +20%、破勢傷害 +25%）。',
    weap1: 'bow',
    weap2: 'spear',
    passives: { staggerDmgPct: 15, atkSpd: 5 }
  },

  // 3. Arco + Cajado
  arcane_ranger: {
    id: 'arcane_ranger',
    name: '奧術弓手',
    pairName: '弓 + 法杖',
    icon: '🏹🔮',
    color: '#38bdf8',
    desc: '灌注箭矢：弓箭造成混合傷害（元素魔法傷害 +15%），並獲得 施法速度 +12%、魔法暴擊率 +6%。',
    weap1: 'bow',
    weap2: 'staff',
    passives: { castSpd: 12, mCrit: 6, mAtkPct: 8 }
  },

  // 4. 弓 + 鈍器
  siege_sentinel: {
    id: 'siege_sentinel',
    name: '攻城獵手',
    pairName: '弓 + 鈍器',
    icon: '🏹🔨',
    color: '#d97706',
    desc: '破甲者：對首領與菁英傷害 +15%。鈍器攻擊額外造成 +25% 破勢傷害。',
    weap1: 'bow',
    weap2: 'blunt',
    passives: { bossDmgPct: 15, staggerDmgPct: 20 }
  },

  // 5. Arco + Garras/Punhos
  wild_hunter: {
    id: 'wild_hunter',
    name: '野性獵手',
    pairName: '弓 + 利爪／拳套',
    icon: '🏹🥊',
    color: '#10b981',
    desc: '掠食本能：弓箭會施加流血。對流血目標使用爪攻擊時，每次攻擊恢復角色最大 HP 的 1%。',
    weap1: 'bow',
    weap2: 'fist',
    passives: { atkSpd: 10, lifeDrain: 5 }
  },

  // 6. Arco + Espada 1H
  agile_skirmisher: {
    id: 'agile_skirmisher',
    name: '敏捷斥候',
    pairName: '弓 + 單手劍',
    icon: '🏹⚔️',
    color: '#34d399',
    desc: '戰術機動：單體戰鬥期間永久獲得攻擊速度 +12%、迴避 +10。',
    weap1: 'bow',
    weap2: 'sword',
    passives: { atkSpd: 12, eva: 10 }
  },

  // 7. Arco + Espada 2H
  dragon_slayer: {
    id: 'dragon_slayer',
    name: '重裝射手',
    pairName: '弓 + 雙手劍',
    icon: '🏹🗡️',
    color: '#b91c1c',
    desc: '集中瞄準：弓箭使目標受到的暴擊傷害 +15%；雙手劍重擊可無視目標 20% 物理防禦。',
    weap1: 'bow',
    weap2: ['twohand', 'ancientsword'],
    passives: { critDmgPct: 15, pAtkPct: 8 }
  },

  // 8. Arco + Dual Swords
  storm_ranger: {
    id: 'storm_ranger',
    name: '箭矢風暴',
    pairName: '弓 + 雙劍',
    icon: '🏹⚔️',
    color: '#06b6d4',
    desc: '快速連擊：弓箭與雙刀連續攻擊時獲得 攻擊速度 +15%、暴擊率 +6%。',
    weap1: 'bow',
    weap2: 'dual',
    passives: { atkSpd: 15, critChance: 6 }
  },

  // 9. 長槍 + 匕首
  viper_skirmisher: {
    id: 'viper_skirmisher',
    name: '劇毒潛伏者',
    pairName: '長槍 + 匕首',
    icon: '🔱🗡️',
    color: '#84cc16',
    desc: '麻痺毒素：匕首可疊加毒素（每層攻擊速度 -5%，最多 3 層）。長槍攻擊會引爆毒素並觸發出血突刺（每層傷害 +10%，最多 +30%）。',
    weap1: 'spear',
    weap2: 'dagger',
    passives: { atkSpd: 8, critChance: 6 }
  },

  // 10. 長槍 + 單手劍
  phalanx_warlord: {
    id: 'phalanx_warlord',
    name: '方陣指揮官',
    pairName: '長槍 + 單手劍',
    icon: '🔱⚔️',
    color: '#eab308',
    desc: '方陣姿態：物理防禦 +20%。單手劍施加戰術破綻，使下一次長槍集中攻擊觸發穿刺突擊，傷害 +45%。',
    description: '方陣姿態：物理防禦 +20%。單手劍施加戰術破綻，使下一次長槍集中攻擊觸發穿刺突擊，傷害 +45%。',
    weap1: 'spear',
    weap2: 'sword',
    requirements: ['spear', 'sword'],
    activationRule: '在武器欄裝備長槍與單手劍',
    passives: { pDefPct: 20, pAtkPct: 8 },
    passiveEffects: { pDefPct: 20, pAtkPct: 8 },
    triggerEffects: [
      { trigger: 'sword_hit', effect: 'ARM_TACTICAL_FRACTURE', description: '戰術破甲' },
      { trigger: 'spear_hit', effect: 'CLEAVE_BONUS_45', description: '集中戰術突刺，造成 +45% 傷害（+45% 基礎長槍傷害）。' }
    ],
    cooldowns: { tacticalFracture: 0 },
    visual: { icon: '🔱⚔️', color: '#eab308', badge: 'Falange' }
  },

  // 11. 長槍 + 雙劍
  bladestorm_warlord: {
    id: 'bladestorm_warlord',
    name: '暴風領主',
    pairName: '長槍 + 雙劍',
    icon: '🔱⚔️',
    color: '#38bdf8',
    desc: '暴風狂怒：長槍攻擊累積氣勢（最多 3 層）。雙劍技能消耗層數施展集中斬擊（每層 +8% 傷害，最多 +24%，並降低怪物 10% 物理防禦）。被動 +15% 失衡傷害。',
    weap1: 'spear',
    weap2: 'dual',
    passives: { staggerDmgPct: 15, pAtkPct: 8 }
  },

  // 12. 長槍 + 鈍器
  titan_colossus: {
    id: 'titan_colossus',
    name: '泰坦巨像',
    pairName: '長槍 + 鈍器',
    icon: '🔱🔨',
    color: '#f97316',
    desc: '地震衝擊：鈍器可破壞護甲穩定（怪物物理攻擊 -10%）。長槍技能集中衝擊（+20% 姿態傷害），並使失衡時間延長 1.5 秒。',
    weap1: 'spear',
    weap2: 'blunt',
    passives: { staggerDmgPct: 20, pDefPct: 8 }
  },

  // 13. 長槍 + 雙手劍
  dreadnought: {
    id: 'dreadnought',
    name: '狂戰將軍',
    pairName: '長槍 + 雙手劍',
    icon: '🔱🗡️',
    color: '#dc2626',
    desc: '泰坦打擊：+12% 物理攻擊、+15% 姿態傷害。怪物進入失衡狀態時，額外造成 +15% 集中傷害。',
    weap1: 'spear',
    weap2: ['twohand', 'ancientsword'],
    passives: { pAtkPct: 12, staggerDmgPct: 15 }
  },

  // 14. 長槍 + 法杖
  storm_arbiter: {
    id: 'storm_arbiter',
    name: '暴風仲裁者',
    pairName: '長槍 + 法杖',
    icon: '🔱🔮',
    color: '#6366f1',
    desc: '元素引導：長槍將法術力量集中於目標（+15% 元素魔法傷害、+15% 施法速度）。',
    weap1: 'spear',
    weap2: 'staff',
    passives: { castSpd: 15, mAtkPct: 10 }
  },

  // 15. 長槍 + 利爪／拳套
  asura_striker: {
    id: 'asura_striker',
    name: '武僧大師',
    pairName: '長槍 + 利爪／拳套',
    icon: '🔱🥊',
    color: '#14b8a6',
    desc: '武鬥氣流：拳擊使戰鬥節奏加快（每層 +2% 攻擊速度，最多 +12%）。長槍攻擊會消耗氣流，施展無視 18% 物理防禦的集中突刺。',
    weap1: 'spear',
    weap2: 'fist',
    passives: { atkSpd: 10, pAtkPct: 8 }
  },

  // 16. Adaga + Espada 1H
  shadow_duelist: {
    id: 'shadow_duelist',
    name: '暗影決鬥者',
    pairName: '匕首 + 單手劍',
    icon: '🗡️⚔️',
    color: '#ec4899',
    desc: '劍刃之舞：+15% 攻擊速度、+8% 暴擊率。匕首攻擊有 20% 機率突破怪物防守，使正在冷卻的技能減少 0.5 秒。',
    weap1: 'dagger',
    weap2: 'sword',
    passives: { atkSpd: 15, critChance: 8 }
  },

  // 17. 匕首 + 鈍器
  iron_inquisitor: {
    id: 'iron_inquisitor',
    name: '鋼鐵審判者',
    pairName: '匕首 + 鈍器',
    icon: '🗡️🔨',
    color: '#78716c',
    desc: '弱點暴露：鈍器攻擊使怪物失衡 3 秒。失衡期間的匕首攻擊無視 20% 物理防禦並造成 +18% 集中傷害。',
    weap1: 'dagger',
    weap2: 'blunt',
    passives: { critDmgPct: 12, staggerDmgPct: 12 }
  },

  // 18. Adaga + Garras/Punhos
  ghost_phantom: {
    id: 'ghost_phantom',
    name: '修羅幻影',
    pairName: '匕首 + 利爪／拳套',
    icon: '🗡️🥊',
    color: '#8b5cf6',
    desc: '暗影撕裂：爪類暴擊可擾亂怪物。對該目標的匕首攻擊會強化流血（+25% 集中流血傷害），並獲得 +12% 攻擊速度。',
    weap1: 'dagger',
    weap2: 'fist',
    passives: { atkSpd: 12, critChance: 8 }
  },

  // 19. Adaga + Dual Swords
  blade_dancer: {
    id: 'blade_dancer',
    name: '幻影舞者',
    pairName: '匕首 + 雙劍',
    icon: '🗡️⚔️',
    color: '#f43f5e',
    desc: '暗影之舞：對同一目標連續攻擊時，每次提高 +3% 暴擊傷害（最多 +15%）。另獲得 +10 迴避與 +8% 暴擊率。',
    weap1: 'dagger',
    weap2: 'dual',
    passives: { eva: 10, critChance: 8 }
  },

  // 20. Espada 2H + 1H/Escudo
  avenging_paladin: {
    id: 'avenging_paladin',
    name: '復仇聖騎士',
    pairName: '雙手劍 + 單手劍／盾牌',
    icon: '🛡️⚔️',
    color: '#fbbf24',
    desc: '神聖制裁：盾牌攻擊準備制裁效果（+12% 物理防禦）。下一次雙手劍攻擊觸發正義打擊（+20% 集中傷害、+15% 姿態傷害）。',
    weap1: 'sword',
    weap2: ['twohand', 'ancientsword'],
    reqShield: true,
    passives: { pDefPct: 12, staggerDmgPct: 15 }
  },

  // 21. 雙手劍 + 鈍器
  skullbreaker: {
    id: 'skullbreaker',
    name: '碎顱者',
    pairName: '雙手劍 + 鈍器',
    icon: '🗡️🔨',
    color: '#991b1b',
    desc: '破甲：鈍器削弱目標防守（+25% 失衡傷害）。雙手劍對 BREAK 狀態怪物造成 +20% 重擊傷害。',
    weap1: ['twohand', 'ancientsword'],
    weap2: 'blunt',
    passives: { staggerDmgPct: 25, pAtkPct: 10 }
  },

  // 22. 法杖 + 劍／刀刃
  spellblade_arcanist: {
    id: 'spellblade_arcanist',
    name: '魔刃術士',
    pairName: '法杖 + 劍／刀刃',
    icon: '🔮🗡️',
    color: '#c084fc',
    desc: '奧術之刃：施法可累積符文能量。刀刃攻擊造成混合傷害（+15% 集中傷害），恢復最大 MP 的 3%，並使魔法技能冷卻減少 1 秒。',
    weap1: 'staff',
    weap2: ['sword', 'dagger', 'blunt'],
    passives: { castSpd: 12, mAtkPct: 8 }
  },

  // 23. 法杖 + 鈍器
  battle_hierophant: {
    id: 'battle_hierophant',
    name: '戰鬥祭司',
    pairName: '法杖 + 鈍器',
    icon: '🔮🔨',
    color: '#fde047',
    desc: '戰爭祈禱：治癒與續戰效率 +15%。鈍器攻擊灌注神聖力量（對目標 +12% 神聖魔法傷害，並獲得 +12% 魔法防禦）。',
    weap1: 'staff',
    weap2: 'blunt',
    passives: { healBoostPct: 15, mDefPct: 12 }
  },

  // 24. Cajado + Garras/Punhos
  mystic_brawler: {
    id: 'mystic_brawler',
    name: '元素武僧',
    pairName: '法杖 + 利爪／拳套',
    icon: '🔮🥊',
    color: '#a855f7',
    desc: '神秘和諧：拳擊恢復 1% MP，並降低怪物 10% 魔法防禦。累積 5 層拳勁後，下一個攻擊魔法造成 +18% 集中傷害。',
    weap1: 'staff',
    weap2: 'fist',
    passives: { atkSpd: 10, castSpd: 12 }
  },

  // 25. Garras + Espada/Dual
  soul_monk: {
    id: 'soul_monk',
    name: '靈魂武僧',
    pairName: '利爪 + 劍／雙劍',
    icon: '🥊⚔️',
    color: '#14b8a6',
    desc: '戰士之魂：獲得中等生命吸取（+4% 吸血）與單體戰鬥永久 +12% 攻擊速度。',
    weap1: 'fist',
    weap2: ['sword', 'dual'],
    passives: { lifeDrain: 4, atkSpd: 12 }
  },

  // 26. Cajado + Escudo
  grand_archon: {
    id: 'grand_archon',
    name: '守護大法師',
    pairName: '法杖 + 盾牌',
    icon: '🔮🛡️',
    color: '#60a5fa',
    desc: '奧術壁壘：防護屏障可吸收來自怪物的 10% 傷害，並提供 +15% 施法速度。',
    weap1: 'staff',
    weap2: 'any',
    reqShield: true,
    passives: { castSpd: 15, damageReductionPct: 10 }
  },

  // 27. Espada + Espada (Sinfonia das Lâminas)
  blade_symphony: {
    id: 'blade_symphony',
    name: '劍刃交響曲',
    pairName: '劍 + 劍',
    icon: '⚔️⚔️',
    color: '#3b82f6',
    desc: '劍刃交響曲：對單一目標維持同步節奏，獲得 +12% 攻擊速度與 +8% 暴擊率。',
    weap1: 'sword',
    weap2: 'sword',
    passives: { atkSpd: 12, critChance: 8 }
  }
};

export class WeaponResonanceService {
  /**
   * Identifica os tipos das armas equipadas no Slot 1 e Slot 2.
   * @param {Object} state
   * @returns {{ weap1: string|null, weap2: string|null, hasShield: boolean }}
   */
  static getEquippedWeaponTypes(state) {
    if (!state?.equipment) return { weap1: null, weap2: null, hasShield: false };
    const gData = D();
    const allItems = gData?.ALL_ITEMS || {};

    const resolveType = (slotKey) => {
      const uid = state.equipment[slotKey];
      if (!uid) return null;
      const item = (typeof uid === 'object') ? uid : state.inventory?.find(i => i.uid === uid);
      if (!item) return null;
      const def = (item.itemId && allItems[item.itemId]) || item;
      return detectItemWeaponType(def);
    };

    const weap1 = resolveType('weapon');
    const weap2 = resolveType('weapon2');
    const hasShield = !!state.equipment.shield;

    return { weap1, weap2, hasShield };
  }

  /**
   * Determina a Ressonância Ativa para o par de armas atual.
   * @param {Object} state
   * @returns {Object|null}
   */
  static getActiveResonance(state) {
    const { weap1, weap2, hasShield } = this.getEquippedWeaponTypes(state);
    if (!weap1 && !weap2) return null;

    for (const resKey of Object.keys(RESONANCE_DEFINITIONS)) {
      const def = RESONANCE_DEFINITIONS[resKey];
      if (def.reqShield && !hasShield) continue;

      const checkMatch = (req, type) => {
        if (!type) return false;
        if (req === 'any') return true;
        if (Array.isArray(req)) return req.includes(type);
        return req === type;
      };

      const matchesPair = 
        (checkMatch(def.weap1, weap1) && checkMatch(def.weap2, weap2)) ||
        (checkMatch(def.weap2, weap1) && checkMatch(def.weap1, weap2));

      if (matchesPair) {
        return def;
      }
    }

    return null;
  }

  /**
   * Retorna os bônus passivos concedidos pela ressonância ativa.
   * @param {Object} state
   * @returns {Object}
   */
  static getPassiveStats(state) {
    const res = this.getActiveResonance(state);
    return res?.passives || {};
  }

  /**
   * Determina o estado atual do ciclo de vida da Ressonância Ativa.
   * Estados canônicos: LOCKED | INACTIVE | READY | ACTIVE | ARMED | COOLDOWN
   * @param {Object} state
   * @returns {string}
   */
  static getResonanceState(state) {
    const resonance = this.getActiveResonance(state);
    if (!resonance) return RESONANCE_STATES.LOCKED;

    const rState = state?.resonanceState || {};
    if (resonance.id === 'phalanx_warlord') {
      if (rState.tacticalFracture === 'ARMED') {
        return RESONANCE_STATES.ARMED;
      }
      return RESONANCE_STATES.ACTIVE;
    }

    if ((rState.holyVengeanceUntil && rState.holyVengeanceUntil > Date.now()) ||
        (rState.stormFury && rState.stormFury > 0) ||
        rState.arcaneBlade) {
      return RESONANCE_STATES.ARMED;
    }

    return RESONANCE_STATES.ACTIVE;
  }

  /**
   * Retorna o contrato completo e enriquecido da ressonância com estado atual.
   * @param {Object} state
   * @returns {Object}
   */
  static getResonanceContract(state) {
    const resonance = this.getActiveResonance(state);
    if (!resonance) {
      return {
        id: null,
        name: '無共鳴',
        state: RESONANCE_STATES.LOCKED,
        requirements: [],
        activationRule: '在武器欄位 1、2 裝備互補武器',
        passiveEffects: {},
        triggerEffects: [],
        cooldowns: {},
        visual: { icon: '⚔️', color: '#64748b', badge: '未解鎖' },
        description: '裝備具有協同效果的武器即可解鎖戰鬥共鳴。'
      };
    }

    const currentLifecycleState = this.getResonanceState(state);
    return {
      ...resonance,
      state: currentLifecycleState,
      requirements: resonance.requirements || [resonance.weap1, resonance.weap2].flat(),
      activationRule: resonance.activationRule || `裝備 ${resonance.pairName}`,
      passiveEffects: resonance.passiveEffects || resonance.passives || {},
      triggerEffects: resonance.triggerEffects || [],
      cooldowns: resonance.cooldowns || {},
      visual: resonance.visual || { icon: resonance.icon || '⚔️', color: resonance.color || '#eab308', badge: resonance.name },
      description: resonance.description || resonance.desc || ''
    };
  }

  /**
   * Retorna um ícone ou SVG seguro para ressonância, garantindo que nunca quebre.
   * @param {Object} resDef
   * @returns {string}
   */
  static getResonanceIcon(resDef) {
    if (!resDef) return '⚔️';
    if (resDef.visual?.icon) return resDef.visual.icon;
    if (resDef.icon) return resDef.icon;
    return '✨';
  }

  /**
   * Processa o disparo de habilidades com efeitos de ressonância cruzada.
   * @param {Object} state
   * @param {Object} skillDef
   * @param {Object} monster
   * @param {Object} callbacks — { log, floatText, playVFX }
   */
  static onSkillCast(state, skillDef, monster, callbacks = {}) {
    const resonance = this.getActiveResonance(state);
    if (!resonance || !monster) return;

    state.resonanceState = state.resonanceState || {};
    const skillNameLower = (skillDef.name || '').toLowerCase();
    const reqWeapon = skillDef.weaponType || skillDef.requiredWeapon || '';
    const realNow = Date.now();

    // 1. 暗影獵手: Tiro de Arco aplica Marca das Sombras
    if (resonance.id === 'shadow_stalker') {
      if (reqWeapon === 'bow' || skillNameLower.includes('shot') || skillNameLower.includes('arrow') || skillNameLower.includes('snipe')) {
        monster._shadowMarkUntil = realNow + 8000;
        if (callbacks.floatText) callbacks.floatText('🎯 暗影標記！', 'float-epic');
        if (callbacks.log) callbacks.log('🎯 暗影獵手：目標已標記！下一次匕首攻擊將造成 +25% 致命暴擊傷害並附加流血！', 'combat');
      }
    }

    // 2. 龍族哨兵: Tiros de Arco aplicam Lentidão
    if (resonance.id === 'dragon_lancer') {
      if (reqWeapon === 'bow' || skillNameLower.includes('shot') || skillNameLower.includes('arrow')) {
        monster._slowUntil = realNow + 6000;
        if (callbacks.floatText) callbacks.floatText('❄️ 龍之緩速！', 'float-gold');
      }
    }

    // 3. Senhor da Tempestade: Lança gera Fúria da Tempestade
    if (resonance.id === 'bladestorm_warlord') {
      if (reqWeapon === 'spear' || skillNameLower.includes('whirlwind') || skillNameLower.includes('storm') || skillNameLower.includes('sweep')) {
        state.resonanceState.stormFury = Math.min(3, (state.resonanceState.stormFury || 0) + 1);
        const stacks = state.resonanceState.stormFury;
        if (callbacks.floatText) callbacks.floatText(`⚡ 狂怒（${stacks}/3）`, 'float-gold');
        if (callbacks.log) callbacks.log(`⚡ 暴風狂怒累積（${stacks}/3 層）！`, 'combat');
      }
    }

    // 4. Paladino Vingador: Escudo gera Vingança Sagrada
    if (resonance.id === 'avenging_paladin') {
      if (skillDef.requiredShield || skillNameLower.includes('shield') || skillNameLower.includes('stun')) {
        state.resonanceState.holyVengeanceUntil = realNow + 7000;
        if (callbacks.floatText) callbacks.floatText('🛡️ 神聖復仇！', 'float-jackpot');
        if (callbacks.log) callbacks.log('🛡️ 神聖復仇已啟動！下一次雙手劍攻擊將無視目標 20% 物理防禦（+20% 傷害）！', 'rarity-legendary');
      }
    }

    // 5. Feiticeiro da Lâmina: Magias acumulam Lâmina Arcana e aceleram recarga
    if (resonance.id === 'spellblade_arcanist') {
      if (reqWeapon === 'staff' || skillDef.effect === 'spell' || skillNameLower.includes('hydro') || skillNameLower.includes('prominence') || skillNameLower.includes('hurricane') || skillNameLower.includes('flare')) {
        state.resonanceState.arcaneBlade = true;
        if (Math.random() < 0.25 && state._cds) {
          for (const k of Object.keys(state._cds)) {
            if (state._cds[k] > realNow) {
              state._cds[k] = Math.max(realNow, state._cds[k] - 1000);
            }
          }
          if (callbacks.floatText) callbacks.floatText('⚡ 奧術加速（CD -1 秒）', 'float-jackpot');
          if (callbacks.log) callbacks.log('⚡ 魔刃術士：奧術脈衝使法術冷卻時間縮短 1 秒！', 'rarity-legendary');
        } else {
          if (callbacks.floatText) callbacks.floatText('🔮 奧術之刃！', 'float-epic');
        }
      }
    }

    // 6. Espreitador Venenoso: Adaga empilha Toxina
    if (resonance.id === 'viper_skirmisher' && (reqWeapon === 'dagger' || skillNameLower.includes('stab') || skillNameLower.includes('blow'))) {
      state.resonanceState.viperToxin = Math.min(3, (state.resonanceState.viperToxin || 0) + 1);
      const toks = state.resonanceState.viperToxin;
      if (callbacks.floatText) callbacks.floatText(`🧪 毒素（${toks}/3）`, 'float-gold');
    }

    // 7. Monge Elemental: Punhos acumulam cargas arcanas
    if (resonance.id === 'mystic_brawler' && (reqWeapon === 'fist' || skillNameLower.includes('punch') || skillNameLower.includes('fist') || skillNameLower.includes('force'))) {
      state.resonanceState.brawlerChi = Math.min(5, (state.resonanceState.brawlerChi || 0) + 1);
    }

    // 8. Comandante de Falange: Habilidade de Espada arma Fratura Tática
    if (resonance.id === 'phalanx_warlord') {
      if (reqWeapon === 'sword' || skillNameLower.includes('slash') || skillNameLower.includes('strike') || skillNameLower.includes('triple') || skillNameLower.includes('sonic')) {
        state.resonanceState.tacticalFracture = 'ARMED';
        state.resonanceState.state = 'ARMED';
        state.resonanceState.phalanxCleave = true;
        if (callbacks.floatText) callbacks.floatText('⚔ 戰術破甲（已準備）', 'float-epic');
        if (callbacks.log) callbacks.log('⚔ 戰術破甲已準備！下一次長槍攻擊將觸發戰術突刺，傷害 +45%！', 'combat');
      }
    }
  }

  /**
   * Processa o cálculo e amplificação de dano resultante de ressonâncias ativas no impacto.
   * @param {Object} state
   * @param {Object} monster
   * @param {string} weaponTypeUsed
   * @param {number} baseDamage
   * @param {Object} callbacks
   * @returns {{ finalDamage: number, extraEffects: Array }}
   */
  static processAttackImpact(state, monster, weaponTypeUsed, baseDamage, callbacks = {}) {
    let finalDamage = baseDamage;
    const extraEffects = [];
    const resonance = this.getActiveResonance(state);
    if (!resonance || !monster) return { finalDamage, extraEffects };

    const realNow = Date.now();
    state.resonanceState = state.resonanceState || {};

    // 1. 暗影獵手: Consome Marca com Golpe de Adaga
    if (resonance.id === 'shadow_stalker' && weaponTypeUsed === 'dagger') {
      if (monster._shadowMarkUntil && monster._shadowMarkUntil > realNow) {
        monster._shadowMarkUntil = 0;
        finalDamage = Math.floor(finalDamage * 1.25); // +25% de Dano Crítico Fatal
        monster._bleedTicks = 4;
        monster._bleedDamage = Math.max(10, Math.floor(finalDamage * 0.08));
        extraEffects.push('shadow_crit_bleed');

        if (callbacks.floatText) callbacks.floatText('🗡️ 致命打擊＋流血！（+25%）', 'float-jackpot');
        if (callbacks.log) callbacks.log(`🗡️ 處決之影！匕首攻擊消耗印記：造成 ${finalDamage.toLocaleString()} 致命傷害（+25%），並附加流血！`, 'rarity-legendary');
      }
    }

    // 2. 龍族哨兵: Lança atinge alvo lento com perfuração amplificada
    if (resonance.id === 'dragon_lancer' && weaponTypeUsed === 'spear') {
      if (monster._slowUntil && monster._slowUntil > realNow) {
        finalDamage = Math.floor(finalDamage * 1.20); // +20% de dano perfurante
        extraEffects.push('dragon_pierce');
        if (callbacks.floatText) callbacks.floatText('🔱 穿刺！（+20%）', 'float-jackpot');
      }
    }

    // 3. Senhor da Tempestade: Consome Cargas com Dual Swords
    if (resonance.id === 'bladestorm_warlord' && weaponTypeUsed === 'dual') {
      const stacks = state.resonanceState.stormFury || 0;
      if (stacks > 0) {
        state.resonanceState.stormFury = 0;
        const bonusMult = 1 + (stacks * 0.08); // Até +24% dano extra
        finalDamage = Math.floor(finalDamage * bonusMult);
        monster._tempPdefReductionUntil = realNow + 5000; // -10% P.Def
        extraEffects.push('vacuum_wave');

        if (callbacks.floatText) callbacks.floatText(`🌪️ 真空斬（+${stacks * 8}%）！`, 'float-jackpot');
        if (callbacks.log) callbacks.log(`🌪️ 斬擊爆發（${stacks} 層）：造成 ${finalDamage.toLocaleString()} 傷害，並使護甲削弱（P.Def -10%）！`, 'rarity-rare');
      }
    }

    // 4. Espreitador Venenoso: Lança detona Toxina de Adaga
    if (resonance.id === 'viper_skirmisher' && weaponTypeUsed === 'spear') {
      const toks = state.resonanceState.viperToxin || 0;
      if (toks > 0) {
        state.resonanceState.viperToxin = 0;
        const toxinMult = 1 + (toks * 0.10); // Até +30% dano
        finalDamage = Math.floor(finalDamage * toxinMult);
        extraEffects.push('viper_detonation');
        if (callbacks.floatText) callbacks.floatText(`💥 劇毒突刺（+${toks * 10}%）！`, 'float-jackpot');
        if (callbacks.log) callbacks.log(`💥 長槍引爆毒素：造成 ${finalDamage.toLocaleString()} 流血傷害（+${toks * 10}%）！`, 'rarity-legendary');
      }
    }

    // 5. Comandante de Falange: Espada 1H arma Fratura Tática, Lança detona Cleave (+45% BaseSpearDamage)
    if (resonance.id === 'phalanx_warlord') {
      if (weaponTypeUsed === 'sword') {
        state.resonanceState.tacticalFracture = 'ARMED';
        state.resonanceState.state = 'ARMED';
        state.resonanceState.phalanxCleave = true;
        extraEffects.push('tactical_fracture_armed');
        if (callbacks.floatText) callbacks.floatText('⚔ 戰術破甲（已準備）', 'float-epic');
        if (callbacks.log) callbacks.log('⚔ 方陣指揮官：劍已啟動戰術破甲！下一次長槍攻擊將施展戰術突刺（+45%）！', 'combat');
      } else if (weaponTypeUsed === 'spear') {
        if (state.resonanceState.tacticalFracture === 'ARMED' || state.resonanceState.phalanxCleave) {
          state.resonanceState.tacticalFracture = 'INACTIVE';
          state.resonanceState.state = 'ACTIVE';
          state.resonanceState.phalanxCleave = false;
          const BaseSpearDamage = baseDamage;
          const CleaveDamage = Math.floor(BaseSpearDamage * 1.45);
          finalDamage = CleaveDamage;
          extraEffects.push('phalanx_cleave');
          if (callbacks.floatText) callbacks.floatText('🔱 戰術突刺（+45%）', 'float-jackpot');
          if (callbacks.log) callbacks.log(`🔱 戰術破甲引爆！長槍突刺造成 ${CleaveDamage.toLocaleString()} 傷害（+45%）！`, 'rarity-legendary');
        }
      }
    }

    // 6. Paladino Vingador: Consome Vingança Sagrada com 2H Greatsword
    if (resonance.id === 'avenging_paladin' && (weaponTypeUsed === 'twohand' || weaponTypeUsed === 'ancientsword')) {
      if (state.resonanceState.holyVengeanceUntil && state.resonanceState.holyVengeanceUntil > realNow) {
        state.resonanceState.holyVengeanceUntil = 0;
        finalDamage = Math.floor(finalDamage * 1.20);
        extraEffects.push('holy_penetration');

        if (callbacks.floatText) callbacks.floatText('💥 神聖懲戒！（+20%）', 'float-jackpot');
        if (callbacks.log) callbacks.log(`💥 雙手劍施放神聖懲戒：造成 ${finalDamage.toLocaleString()} 集中傷害！`, 'rarity-legendary');
      }
    }

    // 7. Feiticeiro da Lâmina: Consome Lâmina Arcana
    if (resonance.id === 'spellblade_arcanist' && (weaponTypeUsed === 'sword' || weaponTypeUsed === 'dagger' || weaponTypeUsed === 'blunt')) {
      if (state.resonanceState.arcaneBlade) {
        state.resonanceState.arcaneBlade = false;
        finalDamage = Math.floor(finalDamage * 1.15);
        const mpRestored = Math.max(5, Math.floor((state.maxMp || 100) * 0.03));
        state.mp = Math.min(state.maxMp || 100, (state.mp || 0) + mpRestored);
        extraEffects.push('mana_restored');

        if (callbacks.floatText) callbacks.floatText(`🔮 奧術之刃（+${mpRestored} MP）`, 'float-gold');
        if (callbacks.log) callbacks.log(`🔮 奧術之刃以混合傷害命中目標（恢復 +${mpRestored} MP）！`, 'heal');
      }
    }

    // 8. Esmagador de Crânios: Espada 2H causa dano aumentado se monstro estiver em Stagger/Break
    if (resonance.id === 'skullbreaker' && (weaponTypeUsed === 'twohand' || weaponTypeUsed === 'ancientsword')) {
      if (monster.isBreak || (monster.staggerCurrent && monster.staggerCurrent <= 0)) {
        finalDamage = Math.floor(finalDamage * 1.20);
        extraEffects.push('skull_crush');
        if (callbacks.floatText) callbacks.floatText('🔨 粉碎重擊！（+20%）', 'float-jackpot');
      }
    }

    // 9. Inquisidor de Ferro: Adaga com penetração em alvo desestabilizado
    if (resonance.id === 'iron_inquisitor' && weaponTypeUsed === 'dagger') {
      if (monster._inquisitorStunUntil && monster._inquisitorStunUntil > realNow) {
        finalDamage = Math.floor(finalDamage * 1.18);
        extraEffects.push('iron_execute');
        if (callbacks.floatText) callbacks.floatText('🗡️ 穿透打擊！（+18%）', 'float-jackpot');
      }
    } else if (resonance.id === 'iron_inquisitor' && weaponTypeUsed === 'blunt') {
      monster._inquisitorStunUntil = realNow + 3000;
    }

    // 10. General Berserker: Amplifica dano de Break
    if (resonance.id === 'dreadnought' && monster.isBreak) {
      finalDamage = Math.floor(finalDamage * 1.15);
    }

    // 11. Danseur Fantasma: Acúmulo de dano crítico consecutivo
    if (resonance.id === 'blade_dancer') {
      state.resonanceState.danceCombo = Math.min(5, (state.resonanceState.danceCombo || 0) + 1);
      const critBonus = state.resonanceState.danceCombo * 0.03;
      finalDamage = Math.floor(finalDamage * (1 + critBonus));
    }

    // 12. Monge Elemental: Consome Chi para disparo focado
    if (resonance.id === 'mystic_brawler' && (weaponTypeUsed === 'fist')) {
      const chi = state.resonanceState.brawlerChi || 0;
      if (chi >= 5) {
        state.resonanceState.brawlerChi = 0;
        finalDamage = Math.floor(finalDamage * 1.18);
        extraEffects.push('chi_burst');
        if (callbacks.floatText) callbacks.floatText('💥 氣勁爆發！（+18%）', 'float-jackpot');
      }
    }

    return { finalDamage, extraEffects };
  }
}
