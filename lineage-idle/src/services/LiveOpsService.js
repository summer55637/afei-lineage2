/**
 * LiveOpsService.js — Gestão de Eventos Semanais, Fim de Semana Dourado e Modificadores Globais
 * 
 * Regula eventos comemorativos em tempo real baseados em data UTC:
 * - Fim de Semana Dourado (Sex/Sáb/Dom): +25% Adena, +20% EXP
 * - Quarta Arcana: +30% SP, +15% MP Regen
 * - Segunda da Forja: +5% Sucesso em Encantamento e Síntese
 * - Dias Padrão: Bênção Imperial de Aden (+10% EXP)
 */

export const LIVE_OPS_EVENTS = {
  weekend_gold: {
    id: 'weekend_gold',
    days: [0, 5, 6], // Sexta, Sábado, Domingo
    title: '🌟 亞丁黃金週末',
    desc: '所有狩獵區金幣掉落 +25%、經驗值 +20%！',
    badge: '黃金週末',
    icon: '🌟',
    color: '#eab308',
    modifiers: {
      goldMult: 1.25,
      xpMult: 1.20,
      spMult: 1.0,
      enchantBonus: 0,
      fusionBonus: 0,
      mpRegenMult: 1.0
    }
  },
  arcane_wednesday: {
    id: 'arcane_wednesday',
    days: [3], // Quarta-feira
    title: '🔮 席琳奧術之夜',
    desc: '技能點獲得量 +30%、魔力恢復 +15%！',
    badge: '奧術星期三',
    icon: '🔮',
    color: '#a855f7',
    modifiers: {
      goldMult: 1.0,
      xpMult: 1.0,
      spMult: 1.30,
      enchantBonus: 0,
      fusionBonus: 0,
      mpRegenMult: 1.15
    }
  },
  blacksmith_monday: {
    id: 'blacksmith_monday',
    days: [1], // Segunda-feira
    title: '🔨 鐵匠大師熱潮',
    desc: '帝國鍛造的強化與合成成功率 +5%！',
    badge: '鍛造星期一',
    icon: '🔨',
    color: '#f97316',
    modifiers: {
      goldMult: 1.0,
      xpMult: 1.0,
      spMult: 1.0,
      enchantBonus: 0.05,
      fusionBonus: 0.05,
      mpRegenMult: 1.0
    }
  },
  imperial_blessing: {
    id: 'imperial_blessing',
    days: [2, 4], // Terça e Quinta
    title: '🕊️ 伊娃女神的帝國祝福',
    desc: '王國正享受天界的和平與繁榮（+10% EXP）。',
    badge: '帝國祝福',
    icon: '🕊️',
    color: '#38bdf8',
    modifiers: {
      goldMult: 1.0,
      xpMult: 1.10,
      spMult: 1.0,
      enchantBonus: 0,
      fusionBonus: 0,
      mpRegenMult: 1.0
    }
  }
};

export const LiveOpsService = {
  /**
   * Retorna o evento Live-Ops atualmente ativo no servidor
   */
  getActiveEvent() {
    const now = new Date();
    const dayOfWeek = now.getUTCDay(); // 0 (Domingo) a 6 (Sábado)

    for (const evt of Object.values(LIVE_OPS_EVENTS)) {
      if (evt.days.includes(dayOfWeek)) {
        return evt;
      }
    }
    return LIVE_OPS_EVENTS.imperial_blessing;
  },

  /**
   * Retorna os multiplicadores agregados do evento ativo
   */
  getLiveOpsBonuses() {
    const evt = this.getActiveEvent();
    return evt ? evt.modifiers : {
      goldMult: 1.0,
      xpMult: 1.0,
      spMult: 1.0,
      enchantBonus: 0,
      fusionBonus: 0,
      mpRegenMult: 1.0
    };
  }
};
