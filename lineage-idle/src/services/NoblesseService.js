/**
 * 貴族Service.js — Gerenciamento da 任務line de 貴族 (Possessor of a Precious Soul).
 *
 * Responsável por:
 * 1. Controle das 4 etapas canônicas da saga de 貴族 (Lv. 75+).
 * 2. Rastreamento de abates em Valley of Saints, Swamp of Screams e confronto contra Barakiel.
 * 3. Consagração como 貴族 (`state.is貴族 = true`).
 * 4. Entrega da 貴族 Tiara e validação do requisito Nível 76+ 貴族 para a Grand Olympiad.
 */

import { NOBLESSE_QUEST_DEFS } from '../data/quests.js';

export class 貴族Service {
  /**
   * Retorna o status de nobreza e progresso atual da questline do jogador.
   * @param {Object} state
   * @returns {{is貴族: boolean, currentStep: number, progress: Object, canJoinOlympiad: boolean, reason?: string}}
   */
  static get貴族Status(state) {
    if (!state) return { is貴族: false, currentStep: 1, progress: {}, canJoinOlympiad: false };

    const is貴族 = Boolean(state.is貴族);
    const currentStep = state.noblesseStep || 1;
    const progress = state.noblesseProgress || { part1Kills: 0, part2Kills: 0, barakielKilled: false };

    const level = state.level || 1;
    const isLevelOk = level >= 76;

    let reason = '';
    if (!is貴族 && !isLevelOk) reason = '需要等級 76+ 並完成貴族任務。';
    else if (!is貴族) reason = '需要完成貴族傳奇（珍貴靈魂的擁有者）。';
    else if (!isLevelOk) reason = '需要等級 76+ 才能參加大奧林匹亞。';

    return {
      is貴族,
      currentStep,
      progress,
      canJoinOlympiad: is貴族 && isLevelOk,
      reason
    };
  }

  /**
   * Valida se o herói pode iniciar/avançar uma determinada etapa da saga de 貴族.
   * @param {Object} state
   * @param {number} step
   * @returns {{ok: boolean, reason?: string}}
   */
  static canAdvanceStep(state, step) {
    const level = state.level || 1;
    if (level < 75) {
      return { ok: false, reason: '需要等級 75 以上才能進行貴族任務。' };
    }

    const currentStep = state.noblesseStep || 1;
    if (state.is貴族) {
      return { ok: false, reason: '你已經取得最高貴族身分！' };
    }

    if (step > currentStep) {
      return { ok: false, reason: `請先完成第 ${currentStep} 部分，才能進行第 ${step} 部分。` };
    }

    const prog = state.noblesseProgress || {};
    if (step === 1 && (prog.part1Kills || 0) < 25) {
      return { ok: false, reason: `在聖者之谷擊敗 25 隻怪物（${prog.part1Kills || 0}/25）。` };
    }
    if (step === 2 && (prog.part2Kills || 0) < 30) {
      return { ok: false, reason: `在悲鳴沼澤淨化 30 個靈魂（${prog.part2Kills || 0}/30）。` };
    }
    if (step === 3 && !prog.barakielKilled) {
      return { ok: false, reason: '擊敗團隊首領「光輝之炎巴拉基爾」，取回女神權杖！' };
    }

    return { ok: true };
  }

  /**
   * Registra abates de monstros de caça ou bosses nas zonas de quest.
   * @param {Object} state
   * @param {Object} monster
   * @param {Object} callbacks
   */
  static recordKill(state, monster, callbacks = {}) {
    if (!state || state.is貴族) return;
    state.noblesseProgress = state.noblesseProgress || { part1Kills: 0, part2Kills: 0, barakielKilled: false };
    const step = state.noblesseStep || 1;

    // 部分 1: Valley of Saints
    if (step === 1 && state.zone === 'valleyOfSaints') {
      if (state.noblesseProgress.part1Kills < 25) {
        state.noblesseProgress.part1Kills++;
        if (callbacks.log && state.noblesseProgress.part1Kills % 5 === 0) {
          callbacks.log(`📜 [貴族] 已找回伊娃詩篇：${state.noblesseProgress.part1Kills}/25`, 'system');
        }
      }
    }
    // 部分 2: Swamp of Screams
    else if (step === 2 && state.zone === 'swampOfScreams') {
      if (state.noblesseProgress.part2Kills < 30) {
        state.noblesseProgress.part2Kills++;
        if (callbacks.log && state.noblesseProgress.part2Kills % 5 === 0) {
          callbacks.log(`🔮 [貴族] 悲鳴沼澤已淨化靈魂：${state.noblesseProgress.part2Kills}/30`, 'system');
        }
      }
    }
    // 部分 3: Barakiel
    else if (step === 3 && (monster.id === 'barakiel' || monster.name?.toLowerCase().includes('barakiel') || monster.isBarakiel)) {
      state.noblesseProgress.barakielKilled = true;
      if (callbacks.log) {
        callbacks.log('⚡ [貴族] **光輝火焰巴拉基艾爾已擊敗！** 你取回了 [女神法杖：雨之歌]！', 'rarity-legendary');
      }
    }
  }

  /**
   * Conclui a etapa atual e entrega as recompensas de XP/SP e status.
   * @param {Object} state
   * @param {number} step
   * @param {Object} callbacks
   * @returns {boolean}
   */
  static completeStep(state, step, callbacks = {}) {
    const check = this.canAdvanceStep(state, step);
    if (!check.ok) {
      if (callbacks.log) callbacks.log(`❌ ${check.reason}`, 'system');
      return false;
    }

    const questKey = `part${step}`;
    const def = NOBLESSE_QUEST_DEFS[questKey];
    if (!def) return false;

    // Entrega recompensas da etapa
    if (def.reward) {
      if (def.reward.xp) state.xp = (state.xp || 0) + def.reward.xp;
      if (def.reward.sp) state.sp = (state.sp || 0) + def.reward.sp;
      if (def.reward.gold) state.gold = (state.gold || 0) + def.reward.gold;
    }

    if (step < 4) {
      state.noblesseStep = step + 1;
      if (callbacks.log) {
        callbacks.log(`🎉 **${def.name} 已完成！** 已進入第 ${state.noblesseStep} 部分！`, 'rarity-epic');
      }
    } else {
      // Conclusão Final: Consagração como 貴族!
      state.noblesseStep = 5;
      state.is貴族 = true;

      // Entrega a 貴族 Tiara
      state.inventory = state.inventory || [];
      const uid = 'tiara_' + Date.now();
      state.inventory.push({
        uid,
        itemId: 'accessory_noblesse_tiara',
        enchant: 0,
        count: 1
      });

      // Concede Habilidade Blessing of Noble
      state.skills = state.skills || {};
      state.skills['blessing_of_noble'] = 1;

      if (callbacks.log) {
        callbacks.log('👑✨ **貴族神聖祝聖完成！**', 'rarity-legendary');
        callbacks.log('你完成了傳奇任務 *珍貴靈魂的擁有者*，獲得 **貴族頭冠**、**貴族祝福**，並取得參加 **大奧林匹亞（Lv.76+）** 的資格！', 'rarity-legendary');
      }
    }

    if (callbacks.onUpdate) callbacks.onUpdate();
    return true;
  }
}
