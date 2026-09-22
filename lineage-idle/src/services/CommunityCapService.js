/**
 * CommunityCapService.js — Gerenciador de Metas Comunitárias e Sistema de CAP Global Dinâmico.
 * 
 * Regra da Temporada 1:
 * - O CAP inicial do servidor é Nível 40.
 * - Para liberar o CAP 45 para todo o servidor, a comunidade deve derrotar o Raidboss da Black Citadel
 *   (Flaming Demon Lord) 100 vezes globalmente.
 */

const LOCAL_STORAGE_KEY = 'aden_community_cap_goal_v1';

export const DEFAULT_COMMUNITY_GOAL = {
  id: 'cap_45_black_citadel',
  baseCap: 40,
  targetCap: 45,
  bossId: 'flamingDemonLord',
  bossName: 'Flaming Demon Lord (Black Citadel)',
  targetKills: 100,
  currentKills: 0,
  unlocked: false,
  unlockedAt: null
};

let currentGoal = { ...DEFAULT_COMMUNITY_GOAL };
let listenerUnsubscribe = null;

export class CommunityCapService {
  /**
   * Obtém os dados locais ou em memória da meta comunitária
   */
  static getGoal() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        currentGoal = { ...DEFAULT_COMMUNITY_GOAL, ...parsed };
      }
    } catch (e) {}
    return currentGoal;
  }

  /**
   * Retorna o CAP de nível ativo do servidor
   */
  static getActiveServerCap() {
    if (typeof window !== 'undefined' && (window.__adminUnlockedAll || (typeof localStorage !== 'undefined' && localStorage.getItem('aden_admin_unlock_all') === 'true'))) {
      return 120;
    }
    if (typeof localStorage !== 'undefined') {
      const adminCap = Number(localStorage.getItem('aden_server_cap'));
      if (adminCap >= 40) return adminCap;
    }
    const goal = this.getGoal();
    return goal.unlocked ? goal.targetCap : goal.baseCap;
  }

  /**
   * Inicializa o sincronismo em tempo real com o Firestore ou fallback local
   */
  static init(callbacks = {}) {
    this.getGoal();
    if (typeof window !== 'undefined') {
      window.globalServerCap = this.getActiveServerCap();
      window.communityCapGoal = currentGoal;
    }

    // Tenta conectar ao Firestore se o SDK estiver disponível no bundle ou window
    if (typeof window !== 'undefined' && window.firebaseFirestore) {
      try {
        const { doc, onSnapshot } = window.firebaseFirestore;
        const db = window.firebaseDb;
        if (doc && onSnapshot && db) {
          const docRef = doc(db, 'server_meta', 'community_goals');
          listenerUnsubscribe = onSnapshot(docRef, (snap) => {
            if (snap.exists()) {
              const data = snap.data();
              if (data && data[DEFAULT_COMMUNITY_GOAL.id]) {
                this.updateLocalState(data[DEFAULT_COMMUNITY_GOAL.id], callbacks);
              }
            }
          }, (err) => {
            console.debug('[CommunityCapService] Firestore realtime listener offline:', err);
          });
        }
      } catch (err) {
        console.debug('[CommunityCapService] Init listener fallback:', err);
      }
    }
  }

  /**
   * Atualiza o estado local e dispara reações de interface
   */
  static updateLocalState(newGoalData, callbacks = {}) {
    const prevUnlocked = currentGoal.unlocked;
    currentGoal = { ...currentGoal, ...newGoalData };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentGoal));
    } catch (e) {}

    if (typeof window !== 'undefined') {
      window.globalServerCap = this.getActiveServerCap();
      window.communityCapGoal = currentGoal;
    }

    if (!prevUnlocked && currentGoal.unlocked) {
      if (callbacks.log) {
        callbacks.log('🌟 **COMUNIDADE DE ADEN VENCEU!** O Raidboss da Black Citadel foi derrotado 100 vezes! O Level CAP 45 foi liberado para todo o servidor!', 'rarity-legendary');
      }
      if (callbacks.updateAllUI) callbacks.updateAllUI();
    }
  }

  /**
   * Registra a derrota de um Raidboss e avança o progresso global se for o alvo
   */
  static async recordBossKill(monster, state, callbacks = {}) {
    if (!monster) return;
    const mId = String(monster.id || monster.key || monster.name || '').toLowerCase();
    const isTargetBoss = mId.includes('flamingdemon') || mId.includes('demonlord') || (monster.boss && state?.zone === 'blackCitadel');

    if (!isTargetBoss) return;

    const goal = this.getGoal();
    if (goal.unlocked) return;

    goal.currentKills = (goal.currentKills || 0) + 1;
    if (goal.currentKills >= goal.targetKills) {
      goal.unlocked = true;
      goal.unlockedAt = Date.now();
    }

    this.updateLocalState(goal, callbacks);

    if (callbacks.log) {
      callbacks.log(`🌍 **[全服目標]** 已記錄擊敗 ${monster.name}！伺服器進度：**${goal.currentKills}/${goal.targetKills}**，解鎖等級上限 45！`, 'rarity-epic');
    }

    // Tenta persistir no Firestore para compartilhar com todos os jogadores
    if (typeof window !== 'undefined' && window.firebaseFirestore) {
      try {
        const { doc, setDoc, increment } = window.firebaseFirestore;
        const db = window.firebaseDb;
        if (doc && setDoc && db) {
          const docRef = doc(db, 'server_meta', 'community_goals');
          await setDoc(docRef, {
            [DEFAULT_COMMUNITY_GOAL.id]: {
              ...goal,
              currentKills: increment ? increment(1) : goal.currentKills,
              lastKillBy: state?.name || '亞丁英雄',
              updatedAt: Date.now()
            }
          }, { merge: true });
        }
      } catch (err) {
        console.debug('[CommunityCapService] Firestore write fallback:', err);
      }
    }
  }

  /**
   * Renderiza o Widget de Meta Comunitária de CAP
   */
  static renderWidget(container) {
    if (!container) return;
    const goal = this.getGoal();
    const pct = Math.min(100, Math.round((goal.currentKills / goal.targetKills) * 100));

    container.innerHTML = `
      <div style="background:linear-gradient(135deg, rgba(20,15,30,0.95), rgba(10,12,20,0.95)); border:1px solid ${goal.unlocked ? 'rgba(34,197,94,0.6)' : 'rgba(212,175,55,0.4)'}; border-radius:10px; padding:12px 14px; margin-bottom:12px; box-shadow:0 4px 15px rgba(0,0,0,0.5);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:16px;">${goal.unlocked ? '🏆' : '🌍'}</span>
            <span style="font-family:'Cinzel',serif; font-weight:bold; font-size:12px; color:${goal.unlocked ? '#4ade80' : 'var(--gilt-bright)'};">
              ${goal.unlocked ? '社群目標完成：等級上限 45 已解鎖！' : '全服目標：解鎖等級上限 45'}
            </span>
          </div>
          <span style="font-size:11px; padding:2px 8px; border-radius:12px; font-weight:bold; ${goal.unlocked ? 'background:rgba(34,197,94,0.2); color:#4ade80; border:1px solid rgba(34,197,94,0.4);' : 'background:rgba(212,175,55,0.15); color:#fde047; border:1px solid rgba(212,175,55,0.3);'}">
            ${goal.unlocked ? 'CAP 45 ATIVO' : `CAP ATUAL: ${goal.baseCap}`}
          </span>
        </div>

        <p style="font-size:11px; color:#94a3b8; margin:0 0 8px 0; line-height:1.3;">
          ${goal.unlocked 
            ? `社群已擊敗團隊首領 <strong>${goal.bossName}</strong> 100 次！所有玩家現在都可提升至 <strong>等級 45</strong>。`
            : `全服共同擊敗團隊首領 <strong>${goal.bossName}</strong> 100 次，即可解鎖等級 45 與新的狩獵區。`}
        </p>

        <!-- Barra de Progresso Global -->
        <div style="background:rgba(0,0,0,0.6); border:1px solid rgba(255,255,255,0.1); border-radius:8px; height:18px; position:relative; overflow:hidden;">
          <div style="width:${pct}%; height:100%; background:${goal.unlocked ? 'linear-gradient(90deg,#10b981,#34d399)' : 'linear-gradient(90deg,#eab308,#f59e0b)'}; transition:width 0.4s ease; box-shadow:0 0 10px rgba(234,179,8,0.5);"></div>
          <div style="position:absolute; inset:0; display:flex; justify-content:space-between; align-items:center; padding:0 8px; font-size:10px; font-weight:bold; color:#fff; text-shadow:0 1px 2px #000;">
            <span>${goal.currentKills} / ${goal.targetKills} Abates Globais</span>
            <span>${pct}%</span>
          </div>
        </div>
      </div>
    `;
  }
}