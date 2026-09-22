// The idle game's DOM, injected verbatim into a Shadow Root so its styles
// and IDs cannot collide with the 3D arena that shares the page.
export const IDLE_MARKUP = `
  <div id="game">
    <div class="ambient-layer" aria-hidden="true"></div>
    <div id="float-layer" class="float-layer" aria-hidden="true"></div>
    <!-- Top Bar -->
    <header class="top-bar">
      <!-- Hidden elements for JS compatibility -->
      <span id="zone-name" style="display:none;">Talking Island</span>
      <span id="zone-kill-progress" style="display:none;">0/50</span>

      <div class="tb-left">
        <span class="tb-brand">ADEN ARENA<span class="tb-brand-sub">IDLE CHRONICLES</span></span>
        <div id="cloud-save-slot" class="tb-cloud-slot" style="width: 78px; height: 26px; flex-shrink: 0;" aria-hidden="true"></div>
        <span id="save-status-badge" style="display:none;">已儲存</span>
      </div>

      <div class="tb-center">
        <span id="season-badge" class="tb-pill tb-pill--season" title="第 1 賽季：亞丁覺醒（等級上限 60）">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z"/></svg> Temp 1: Cap Lv 60
        </span>
        <span id="liveops-event-badge" class="tb-pill tb-pill--event" onclick="window.openLiveOpsModal && window.openLiveOpsModal()" title="點擊查看目前進行中的 Live-Ops 活動">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> Evento
        </span>
        <span id="worldboss-top-badge" class="tb-pill tb-pill--boss" onclick="window.openWorldBossModal && window.openWorldBossModal()" title="全球世界首領突襲（安塔瑞斯、巴拉卡斯、巴溫）">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12L2.1 14.8"/><path d="M12 12l7.1 7.1"/></svg> 世界首領：--:--:--
        </span>
      </div>

      <div class="tb-right">
        <div id="top-bar-guide-container" style="display:inline-flex;">
          <button id="top-bar-guide-btn" class="tb-btn" onclick="window.openCurrentTabGuide && window.openCurrentTabGuide()" title="指南">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> <span>Guia</span>
          </button>
        </div>
        
        <button id="admin-top-btn" class="tb-btn tb-btn--admin" style="display:none;" onclick="window.openAdminModal && window.openAdminModal()" title="管理員">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18v2H3z"/></svg> <span>管理員</span>
        </button>

        <button id="top-referral-btn" class="tb-btn tb-btn--referral" onclick="window.openContactsModal ? window.openContactsModal() : (window.openReferralModal && window.openReferralModal())" title="聯絡人、好友清單與導師系統">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> <span>聯絡人</span>
        </button>

        <button id="starter-journey-btn" class="tb-btn tb-btn--journey" onclick="window.openStarterJourneyModal && window.openStarterJourneyModal()" title="先鋒之旅（7 步新手引導）">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> <span>新手旅程</span>
          <span id="starter-journey-dot" class="tb-dot tb-dot--green"></span>
        </button>

        <button id="top-market-btn" class="tb-btn tb-btn--market" onclick="window.openMarketTab ? window.openMarketTab() : (window.openPanel && window.openPanel('market'))" title="市場">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.29 5.17c-.22.5.15 1.13.71 1.13h13.14c.55 0 .91-.6.71-1.1L17 13M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM15 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg> <span>市場</span>
        </button>

        <button id="cash-shop-btn" class="tb-btn tb-btn--shop" onclick="window.openCashShopModal && window.openCashShopModal()" title="商店">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> <span id="top-ac-amount">0 AC</span> <span>商店</span>
        </button>

        <button id="daily-reward-btn" class="tb-btn" onclick="window.openDailyRewardModal && window.openDailyRewardModal()" title="每日簽到">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> <span>每日簽到</span>
          <span id="daily-reward-dot" class="tb-dot tb-dot--red"></span>
        </button>

        <a href="https://discord.gg/R7rwB5uCc" target="_blank" rel="noopener noreferrer" id="top-discord-btn" class="tb-btn tb-btn--discord" title="加入 Discord">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> <span>Discord</span>
        </a>

        <div class="tb-util">
          <button id="audio-mute-btn" class="tb-btn tb-btn--audio" onclick="window.toggleMuteAudio && window.toggleMuteAudio()" title="靜音">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg> <span>音效</span>
          </button>
          
          <span class="tb-clock"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> <span id="clock">00:00:00</span></span>
        </div>
      </div>
    </header>

    <!-- Main Layout -->
    <main class="main-grid">
      <!-- Left: Character Stats -->
      <aside class="panel stats-panel l2-gold-frame">
        <!-- Mobile Navigation Return Header -->
        <div class="mobile-top-nav-bar">
          <button type="button" class="mobile-back-to-battle-btn" onclick="window.setMobileView && window.setMobileView('battle')" title="返回戰鬥">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            <span>⚔️ 返回戰鬥</span>
          </button>
          <div class="mobile-mini-combat-status" onclick="window.setMobileView && window.setMobileView('battle')" title="點擊查看戰鬥">
            <span class="mini-target-name">⚔️ 戰鬥中</span>
            <div class="mini-target-bar-wrap">
              <div class="mini-target-bar-fill" style="width: 100%;"></div>
            </div>
          </div>
          <span class="mobile-current-tab-badge">角色</span>
        </div>

        <!-- Header Nobre -->
        <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid rgba(212,169,78,0.35); padding-bottom:6px; margin-bottom:8px;">
          <h2 style="font-family:'Cinzel',serif; font-size:12px; font-weight:900; color:#f5df93; margin:0; letter-spacing:0.12em; text-transform:uppercase; text-shadow:0 0 8px rgba(212,167,68,0.3);">⚔️ 亞丁狀態</h2>
          <span id="char-combat-power" style="font-family:'Cinzel',serif; font-size:10px; color:#60a5fa; font-weight:bold; background:rgba(30,58,138,0.4); border:1px solid rgba(96,165,250,0.4); padding:1px 6px; border-radius:4px;">CP: 120</span>
        </div>

        <!-- Identidade Resumida do 角色 -->
        <div id="hero-identity-card" style="background:rgba(0,0,0,0.45); border:1px solid rgba(212,167,68,0.2); border-radius:6px; padding:6px 8px; margin-bottom:6px; display:flex; flex-direction:column; gap:2px; position:relative;">
          <div id="hero-card-aura" class="hero-card-aura" style="display:none; position:absolute; inset:-2px; border-radius:8px; pointer-events:none; border:2px solid #ffd700; box-shadow:0 0 15px rgba(255,215,0,0.8), inset 0 0 12px rgba(255,215,0,0.4); animation: heroAuraGlow 2s infinite alternate;"></div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:10px; color:#94a3b8; font-family:'Cinzel',serif;">等級</span>
              <span id="hero-title-badge" style="display:none; color:#ffd700; font-size:10px; font-weight:bold; background:rgba(255,215,0,0.15); border:1px solid rgba(255,215,0,0.4); padding:1px 5px; border-radius:4px;">👑 角色</span>
              <span id="hero-custom-title-badge" style="display:none; font-size:10px; font-weight:bold; padding:1px 5px; border-radius:4px; border:1px solid currentColor;"></span>
            </div>
            <span id="level-text" class="stat-value" style="color:#ffd700; font-weight:bold; font-size:13px;">1</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
            <span id="race-text" class="stat-value" style="color:#e2e8f0; font-weight:600;">人類</span>
            <span id="class-text" class="stat-value" style="color:#c5a059; font-weight:600;">戰士</span>
          </div>
          <button id="stats-class-adv-btn" class="class-adv-action-btn" style="display:none; width:100%; margin-top:5px; font-size:10px; padding:5px 8px; animation: banner-pulse 1.5s infinite alternate; cursor:pointer;" onclick="window.openClassTransferModal && window.openClassTransferModal()">
            ⚡ 變更職業
          </button>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; color:#64748b; border-top:1px dashed rgba(255,255,255,0.06); padding-top:2px; margin-top:2px;">
            <span>編年史</span>
            <span id="saga-text" class="stat-value" style="color:#94a3b8;">Interlude</span>
          </div>
        </div>

        <!-- Medidores Nobres (HP / MP / XP) -->
        <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(212,167,68,0.15); border-radius:6px; padding:6px 8px; margin-bottom:6px; display:flex; flex-direction:column; gap:5px;">
          <div class="stat-row l2-gauge-slot" style="padding:0; margin:0;">
            <label style="color:#ef4444; font-weight:bold; font-family:'Cinzel',serif; font-size:10px; width:22px;">HP</label>
            <div class="bar-container l2-gauge-bezel">
              <div id="hp-bar" class="bar hp l2-gauge-hp-fill" style="width:100%"></div>
              <span id="hp-text" style="font-weight:700; text-shadow:1px 1px 2px #000; font-size:9px;">100 / 100</span>
            </div>
          </div>
          <div class="stat-row l2-gauge-slot" style="padding:0; margin:0;">
            <label style="color:#3b82f6; font-weight:bold; font-family:'Cinzel',serif; font-size:10px; width:22px;">MP</label>
            <div class="bar-container l2-gauge-bezel">
              <div id="mp-bar" class="bar mp l2-gauge-mp-fill" style="width:100%"></div>
              <span id="mp-text" style="font-weight:700; text-shadow:1px 1px 2px #000; font-size:9px;">50 / 50</span>
            </div>
          </div>
          <div class="stat-row l2-gauge-slot" style="padding:0; margin:0;">
            <label style="color:#c084fc; font-weight:bold; font-family:'Cinzel',serif; font-size:10px; width:22px;">XP</label>
            <div class="bar-container l2-gauge-bezel">
              <div id="xp-bar" class="bar xp l2-gauge-xp-fill" style="width:0%"></div>
              <span id="xp-text" style="font-weight:700; text-shadow:1px 1px 2px #000; font-size:9px;">0 / 100</span>
            </div>
          </div>
        </div>

        <!-- Bloco de 戰鬥 Físico -->
        <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(212,167,68,0.15); border-radius:6px; padding:6px 8px; margin-bottom:6px;">
          <div style="font-size:9px; font-weight:bold; color:#d4a744; font-family:'Cinzel',serif; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:4px;">⚔️ 物理戰鬥</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
            <div class="stat-row" style="padding:2px 4px;"><label style="font-size:9px;">ATK</label><span id="atk-text" class="stat-value" style="color:#f87171; font-weight:bold;">10</span></div>
            <div class="stat-row" style="padding:2px 4px;"><label style="font-size:9px;">DEF</label><span id="def-text" class="stat-value" style="color:#60a5fa; font-weight:bold;">5</span></div>
            <div class="stat-row" style="padding:2px 4px;"><label style="font-size:9px;">CRIT</label><span id="crit-text" class="stat-value" style="color:#fde047; font-weight:bold;">0%</span></div>
            <div class="stat-row" style="padding:2px 4px;"><label style="font-size:9px;">EVA</label><span id="eva-text" class="stat-value" style="color:#a7f3d0; font-weight:bold;">0</span></div>
          </div>
        </div>

        <!-- Bloco de Poder Mágico & Sorte -->
        <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(212,167,68,0.15); border-radius:6px; padding:6px 8px; margin-bottom:6px;">
          <div style="font-size:9px; font-weight:bold; color:#d4a744; font-family:'Cinzel',serif; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:4px;">🔮 魔法與鍛造</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
            <div class="stat-row" style="padding:2px 4px;"><label style="font-size:9px;">M.ATK</label><span id="matk-text" class="stat-value" style="color:#c084fc; font-weight:bold;">0</span></div>
            <div class="stat-row" style="padding:2px 4px;"><label style="font-size:9px;">M.DEF</label><span id="mdef-text" class="stat-value" style="color:#818cf8; font-weight:bold;">0</span></div>
            <div class="stat-row" style="padding:2px 4px;"><label style="font-size:9px;">掉落</label><span id="loot-text" class="stat-value" style="color:#34d399; font-weight:bold;">100%</span></div>
            <div class="stat-row" style="padding:2px 4px;"><label style="font-size:9px;">鍛造</label><span id="craft-level-stat" class="stat-value" style="color:#fbbf24; font-weight:bold;">Lv. 1</span></div>
          </div>
        </div>

        <!-- Bloco de Tesouro & Recursos -->
        <div style="background:rgba(0,0,0,0.45); border:1px solid rgba(212,167,68,0.25); border-radius:6px; padding:6px 8px; margin-bottom:6px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:10px; color:#ffd700; font-family:'Cinzel',serif; font-weight:bold;">🪙 金幣</span>
            <span id="gold-text-stat" class="stat-value gold" style="color:#f59e0b; font-weight:bold; font-size:13px;">0</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; margin-top:2px;">
            <span style="color:#64748b;">Renda/s:</span>
            <span id="gps-text" class="stat-value gold-dim" style="font-size:10px;">—</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; margin-top:2px; border-top:1px dashed rgba(255,255,255,0.06); padding-top:2px;">
            <span style="color:#67e8f9;">✦ SP:</span>
            <span id="sp-text" class="stat-value" style="color:#67e8f9; font-weight:bold;">0</span>
          </div>
        </div>

        <!-- Efeitos & Bênçãos Ativas -->
        <div style="margin-top:auto;">
          <div style="font-size:9px; font-weight:bold; color:#94a3b8; font-family:'Cinzel',serif; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:3px;">✨ 啟用中的祝福</div>
          <div class="active-buffs" id="active-buffs"><span class="ab-empty">目前沒有增益效果</span></div>
        </div>
      </aside>

      <div class="grid-resizer grid-resizer-v" id="resizer-col-1" title="拖曳調整屬性面板大小"></div>

      <!-- Center: live battle stage + combat ticker (compact & centered) -->
      <section class="panel log-panel center-panel l2-gold-frame" id="center-panel">
        <div class="stage" id="stage" data-state="idle">
          <div class="stage-bg stage-bg-a" id="stage-bg-a"></div>
          <div class="stage-bg stage-bg-b" id="stage-bg-b"></div>
          <div class="stage-header-bar">
            <div class="stage-zone" id="stage-zone">—</div>
            <div class="combat-controls-bar">
              <button id="combat-toggle-btn" class="combat-ctrl-btn active" title="暫停或開始自動狩獵（P 鍵）"><span class="combat-stance-gem"></span> <span>⚔️ 狩獵中</span></button>
              <button id="soulshot-toggle-btn" class="combat-ctrl-btn" title="戰鬥中啟用魂彈（傷害 +100%）"><span>⚡ SS</span> <span style="font-size:9px; color:#ffd877;">(OFF)</span></button>
              <button id="autopotion-toggle-btn" class="combat-ctrl-btn" title="HP 低於 50% 時自動使用 HP 藥水"><span>🧪 自動補血</span> <span style="font-size:9px; color:#ffd877;">(OFF)</span></button>
              <button id="speed-toggle-btn" class="combat-ctrl-btn" title="戰鬥速度（1x 一般／2x 加速）"><span>⏩ 1x</span></button>
              <button id="macro-settings-btn" class="combat-ctrl-btn" onclick="window.openMacroSettingsModal && window.openMacroSettingsModal()" title="放置巨集設定：HP／MP 觸發、技能循環與自動回收"><span>⚙️ 巨集</span></button>
              <label class="combat-ctrl-btn combat-ctrl-vfx" style="display:inline-flex; align-items:center; gap:4px; cursor:pointer;" title="視覺效果品質">
                <span>VFX</span>
                <select id="vfx-quality-select" title="視覺效果品質">
                  <option value="low">Baixo</option>
                  <option value="medium" selected>中等</option>
                  <option value="high">Alto</option>
                </select>
              </label>
            </div>
          </div>
          <div class="stage-vs" aria-hidden="true">&#9876;</div>
          <div class="stage-hero" id="stage-hero">
            <div class="stage-entity-name stage-hero-name" id="hero-name">Tristan</div>
            <div class="stage-entity-level stage-hero-level" id="hero-level">等級 1</div>
            <div class="stage-hp-bar stage-hp-bar-hero" id="hero-hp-bar">
              <div class="stage-hp-fill stage-hp-fill-hero" id="hero-hp-fill"></div>
              <span class="stage-hp-text stage-hp-text-hero" id="hero-hp-text">HP: 100 / 100</span>
            </div>
            <div class="stage-mp-bar stage-mp-bar-hero" id="hero-mp-bar">
              <div class="stage-mp-fill stage-mp-fill-hero" id="hero-mp-fill"></div>
              <span class="stage-mp-text stage-mp-text-hero" id="hero-mp-text">MP: 50 / 50</span>
            </div>
            <div class="hero-sprite-host" id="hero-sprite-container"></div>
          </div>
          <div class="stage-monster" id="stage-monster">
            <div class="stage-entity-name" id="monster-name">搜尋敵人中...</div>
            <div class="stage-entity-level stage-monster-level" id="monster-level">等級 1</div>
            <div class="stage-hp-bar" id="monster-hp-bar">
              <div class="stage-hp-fill" id="monster-hp-fill"></div>
              <span class="stage-hp-text" id="monster-hp-text">HP: 0 / 0</span>
            </div>
            <div class="stage-stagger-bar" id="monster-stagger-bar" style="display:none;">
              <div class="stage-stagger-fill" id="monster-stagger-fill"></div>
              <span class="stage-stagger-text" id="monster-stagger-text">姿態：100%</span>
            </div>
            <div class="monster-sprite-host" id="monster-sprite-container"></div>
          </div>
          <div class="stage-floats" id="stage-floats"></div>
        </div>
        <div class="grid-resizer grid-resizer-h" id="resizer-row-stage" title="拖曳調整戰鬥視窗大小"></div>
        <div class="log-controls-bar">
          <div class="log-filters">
            <button class="log-filter-btn active" data-logfilter="all">✨ 全部</button>
            <button class="log-filter-btn" data-logfilter="loot">📦 掉落與物品</button>
            <button class="log-filter-btn" data-logfilter="gold_xp">💰 XP 與金幣</button>
            <button class="log-filter-btn" data-logfilter="combat">⚔️ 戰鬥</button>
            <button class="log-filter-btn" data-logfilter="system">⚙️ 系統</button>
          </div>
          <button id="clear-log-btn" class="log-clear-btn" title="清除日誌紀錄">🧹 清除</button>
        </div>
        <div style="position:relative; height:100%; min-height:0; display:flex; flex-direction:column; overflow:hidden;">
          <div id="log" class="log">
            <p class="log-entry system"><span class="log-time">[00:00:00]</span> <span class="log-badge badge-sys">系統</span> 歡迎來到亞丁競技場。</p>
            <p class="log-entry system"><span class="log-time">[00:00:00]</span> <span class="log-badge badge-sys">系統</span> 選擇種族與職業，開始你的旅程。</p>
          </div>
          <button id="log-scroll-down-btn" style="display:none; position:absolute; bottom:12px; left:50%; transform:translateX(-50%); background:rgba(30,35,45,0.92); border:1px solid rgba(212,167,68,0.6); color:#fef08a; font-family:'Cinzel',serif; font-size:11px; font-weight:bold; padding:4px 14px; border-radius:20px; cursor:pointer; box-shadow:0 4px 14px rgba(0,0,0,0.6); z-index:10; animation:bounce 1.5s infinite;" onclick="window.scrollLogToBottom && window.scrollLogToBottom()">
            ⬇️ Novas Mensagens
          </button>
        </div>
        <form id="chat-form" class="chat-input-bar">
          <label for="chat-input" class="sr-only" style="display:none;">聊天訊息</label>
          <input type="text" id="chat-input" name="chatInput" class="chat-input" placeholder="輸入訊息..." autocomplete="off" aria-label="輸入聊天訊息" />
          <button type="submit" class="chat-send-btn">送出</button>
        </form>
      </section>

      <div class="grid-resizer grid-resizer-v" id="resizer-col-2" title="拖曳調整背包與分頁大小"></div>

      <!-- Right: Main Menu Workspace (Expanded with Master 4-Pillar Dock) -->
      <aside class="panel tabs-panel l2-gold-frame">
        <!-- Mobile Navigation Return Header -->
        <div class="mobile-top-nav-bar">
          <button type="button" class="mobile-back-to-battle-btn" onclick="window.setMobileView && window.setMobileView('battle')" title="返回戰鬥">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            <span>⚔️ 返回戰鬥</span>
          </button>
          <div class="mobile-mini-combat-status" onclick="window.setMobileView && window.setMobileView('battle')" title="點擊查看戰鬥">
            <span class="mini-target-name">⚔️ 戰鬥中</span>
            <div class="mini-target-bar-wrap">
              <div class="mini-target-bar-fill" style="width: 100%;"></div>
            </div>
          </div>
          <span class="mobile-current-tab-badge" id="mobile-tabs-current-badge">選單</span>
        </div>

        <!-- Master Navigation Dock: 4 Pillars of Aden -->
        <div class="pillar-dock-container" id="pillar-dock-container">
          <div class="pillar-master-tabs">
            <button type="button" class="pillar-tab-btn active" data-pillar="combat" onclick="window.switchPillar && window.switchPillar('combat')">
              <span class="pillar-icon">⚔️</span>
              <span class="pillar-title">戰鬥</span>
            </button>
            <button type="button" class="pillar-tab-btn" data-pillar="character" onclick="window.switchPillar && window.switchPillar('character')">
              <span class="pillar-icon">🛡️</span>
              <span class="pillar-title">角色</span>
            </button>
            <button type="button" class="pillar-tab-btn" data-pillar="economy" onclick="window.switchPillar && window.switchPillar('economy')">
              <span class="pillar-icon">🏛️</span>
              <span class="pillar-title">帝國</span>
            </button>
            <button type="button" class="pillar-tab-btn" data-pillar="glory" onclick="window.switchPillar && window.switchPillar('glory')">
              <span class="pillar-icon">👑</span>
              <span class="pillar-title">榮耀</span>
            </button>
          </div>

          <!-- Pillar 1 Subtabs: 戰鬥 -->
          <div class="pillar-subtabs-strip active" id="pillar-strip-combat">
            <button class="tab-btn active subtab-pill-btn" data-tab="zones">⚔ 戰鬥與區域</button>
            <button class="tab-btn subtab-pill-btn" data-tab="raids">🐉 Raid 與首領</button>
            <button class="tab-btn subtab-pill-btn" data-tab="tower">🏰 傲慢之塔</button>
            <button class="tab-btn subtab-pill-btn" data-tab="colosseum">⚔ PvP 競技場</button>
            <button class="tab-btn subtab-pill-btn" data-tab="expeditions">🏰 遠征</button>
            <button class="tab-btn subtab-pill-btn" data-tab="fishing">🎣 釣魚</button>
            <button class="tab-btn subtab-pill-btn" data-tab="hunting">🐾 野外狩獵</button>
            <button class="tab-btn subtab-pill-btn" data-tab="gathering">🌿 採集</button>
            <button class="tab-btn subtab-pill-btn" data-tab="mining">⛏️ 採礦</button>
          </div>

          <!-- Pillar 2 Subtabs: 角色 -->
          <div class="pillar-subtabs-strip collapsed" id="pillar-strip-character" style="display:none;">
            <button class="tab-btn subtab-pill-btn" data-tab="character">🛡 角色</button>
            <button class="tab-btn subtab-pill-btn" data-tab="inventory">🎒 背包 <span id="tab-badge-inventory" class="tab-badge" style="display:none">!</span></button>
            <button class="tab-btn subtab-pill-btn" data-tab="skills">✦ 技能 <span id="tab-badge-skills" class="tab-badge" style="display:none">!</span></button>
            <button class="tab-btn subtab-pill-btn" data-tab="astral">★ 精通</button>
            <button class="tab-btn subtab-pill-btn" data-tab="dolls">🧸 娃娃與寵物</button>
            <button class="tab-btn subtab-pill-btn" data-tab="cosmetics">✨ 外觀</button>
            <button class="tab-btn subtab-pill-btn" data-tab="quests">🎯 任務 <span id="tab-badge-quests" class="tab-badge" style="display:none">!</span></button>
          </div>

          <!-- Pillar 3 Subtabs: 帝國 & Economia -->
          <div class="pillar-subtabs-strip collapsed" id="pillar-strip-economy" style="display:none;">
            <button class="tab-btn subtab-pill-btn" data-tab="market" data-min-level="1" style="border-color:#ffd700; color:#fde047; font-weight:bold;">🏛 奇岩市場（P2P）</button>
            <button class="tab-btn subtab-pill-btn" data-tab="shop" data-min-level="1">⚜ 商店</button>
            <button class="tab-btn subtab-pill-btn" data-tab="craft" data-min-level="10">⚒ 亞丁鍛造 <span id="tab-badge-craft" class="tab-badge" style="display:none">!</span></button>
            <button class="tab-btn subtab-pill-btn" data-tab="warehouse" data-min-level="15">📦 私人倉庫</button>
            <button class="tab-btn subtab-pill-btn" data-tab="magiclamp" data-min-level="20">🪔 魔法神燈</button>
            <button class="tab-btn subtab-pill-btn" data-tab="alchemy" data-min-level="40">🧪 鍊金術</button>
          </div>

          <!-- Pillar 4 Subtabs: 榮耀 & Sociedade -->
          <div class="pillar-subtabs-strip collapsed" id="pillar-strip-glory" style="display:none;">
            <button class="tab-btn subtab-pill-btn" data-tab="clan">🛡 血盟與城堡</button>
            <button class="tab-btn subtab-pill-btn" data-tab="olympiad">🏆 奧林匹亞</button>
            <button class="tab-btn subtab-pill-btn" data-tab="rankings">🏆 世界排名</button>
            <button class="tab-btn subtab-pill-btn" data-tab="sevensigns">🏛 七封印</button>
            <button class="tab-btn subtab-pill-btn" data-tab="fortress">⚔ 要塞</button>
            <button class="tab-btn subtab-pill-btn" data-tab="enchant">✦ 強化</button>
            <button class="tab-btn subtab-pill-btn" data-tab="codex">📜 圖鑑</button>
            <button class="tab-btn subtab-pill-btn" id="pillar-contacts-btn" onclick="window.openContactsModal ? window.openContactsModal() : (window.openReferralModal && window.openReferralModal())" style="border-color:rgba(52,211,153,0.4); color:#6ee7b7; font-weight:bold;">👥 聯絡人與導師</button>
          </div>

          <!-- Imperial Economy Resource Ribbon (Contextual HUD for Economy Pillar) -->
          <div class="imperial-pillar-header" id="imperial-pillar-header" style="display:none;">
            <div class="imp-resource-ribbon">
              <span class="imp-res-chip imp-res-chip--gold" title="目前金幣"><span class="chip-icon">🪙</span> <span id="imp-res-gold" class="res-val">0</span> 金幣</span>
              <span class="imp-res-chip imp-res-chip--ac" title="Aden Coins"><span class="chip-icon">💎</span> <span id="imp-res-ac" class="res-val">0</span> AC</span>
              <span class="imp-res-chip imp-res-chip--aa" title="古代金幣（七封印）"><span class="chip-icon">🏛️</span> <span id="imp-res-aa" class="res-val">0</span> AA</span>
              <span class="imp-res-chip imp-res-chip--sp" title="技能點數"><span class="chip-icon">✦</span> <span id="imp-res-sp" class="res-val">0</span> SP</span>
              <span class="imp-res-chip imp-res-chip--forge" title="帝國鍛造等級"><span class="chip-icon">🔨</span> 鍛造： <span id="imp-res-forge" class="res-val">Lv. 1</span></span>
              <span class="imp-res-chip imp-res-chip--charges" title="帝國輪盤充能"><span class="chip-icon">🎲</span> 輪盤： <span id="imp-res-charges" class="res-val">0 次充能</span></span>
            </div>
          </div>
        </div>
        <div class="tab-content">
          <!-- Character Tab — Ficha Real de Aden & Power Progression Hub -->
          <div id="tab-character" class="tab-pane">
            
            <!-- 1. HERO IDENTITY HEADER -->
            <div class="l2-hero-dossier" id="portrait">
              <!-- Retrato Real com Moldura Nobre -->
              <div class="l2-hero-avatar-frame">
                <div class="portrait-aura" id="portrait-aura"></div>
                <div class="l2-hero-avatar-viewport">
                  <div class="portrait-art" id="portrait-art"></div>
                </div>
                <div class="l2-hero-avatar-shade"></div>
              </div>

              <!-- Identidade, Combat Power Hero Card, Breakdown & Vitals -->
              <div class="l2-hero-identity-box">
                <div class="l2-hero-header-row">
                  <div>
                    <div class="l2-hero-title-group">
                      <h2 class="l2-hero-name" id="portrait-name">Tristan</h2>
                      <span class="l2-hero-level-tag">Nv. <span id="hero-sheet-level">1</span></span>
                    </div>
                    <div class="l2-hero-lineage" style="margin-top: 4px;">
                      <span id="hero-race-class-display">人類 · 戰士</span>
                      <span class="l2-hero-tier-badge" id="hero-tier-badge">階級 1 · 已開始</span>
                    </div>
                  </div>
                </div>

                <!-- CP Hero Card Premium (Única Fonte da Verdade para Combat Power) -->
                <div class="l2-cp-plaque">
                  <div class="l2-cp-main">
                    <span class="l2-cp-rune">⚡</span>
                    <div class="l2-cp-data">
                      <span class="l2-cp-caption">標準戰鬥力</span>
                      <span class="l2-cp-num" id="hero-cp-val">0 CP</span>
                    </div>
                  </div>
                  <div id="hero-cp-badge-wrap" class="l2-cp-badge-wrap">
                    <span id="portrait-sub" class="portrait-sub"></span>
                  </div>
                </div>

                <!-- CP Power Breakdown (Composição Proporcional Auditada) -->
                <div class="l2-cp-breakdown-card" id="hero-cp-breakdown-wrap">
                  <div class="l2-cp-breakdown-head">
                    <span class="l2-breakdown-title">戰力來源：</span>
                    <span class="l2-breakdown-subtitle" id="hero-cp-breakdown-summary">武裝、屬性與天賦</span>
                  </div>
                  <div class="l2-cp-breakdown-bar">
                    <div id="hero-cp-bar-equip" class="l2-cp-seg seg-equip" style="width: 40%;" title="裝備"></div>
                    <div id="hero-cp-bar-attrs" class="l2-cp-seg seg-attrs" style="width: 30%;" title="屬性"></div>
                    <div id="hero-cp-bar-skills" class="l2-cp-seg seg-skills" style="width: 20%;" title="技能"></div>
                    <div id="hero-cp-bar-specials" class="l2-cp-seg seg-specials" style="width: 10%;" title="特殊"></div>
                  </div>
                  <div class="l2-cp-breakdown-legend" id="hero-cp-breakdown-legend"></div>
                </div>

                <!-- Medidores Vitais Reais (HP / MP apenas — CP é poder, não reserva de vida) -->
                <div class="l2-vitals-container">
                  <div class="l2-vital-meter">
                    <div class="l2-vital-head">
                      <span class="l2-vital-title hp">❤️ HP（生命值）</span>
                      <span class="l2-vital-val" id="hero-vital-hp">0 / 0</span>
                    </div>
                    <div class="l2-vital-track">
                      <div class="l2-vital-bar hp" id="hero-vital-bar-hp" style="width: 100%;"></div>
                    </div>
                  </div>
                  <div class="l2-vital-meter">
                    <div class="l2-vital-head">
                      <span class="l2-vital-title mp">💙 MP（魔力）</span>
                      <span class="l2-vital-val" id="hero-vital-mp">0 / 0</span>
                    </div>
                    <div class="l2-vital-track">
                      <div class="l2-vital-bar mp" id="hero-vital-bar-mp" style="width: 100%;"></div>
                    </div>
                  </div>
                </div>

                <!-- Banner Contextual de Avanço de Classe -->
                <div id="class-advancement-banner" class="class-advancement-banner" style="display:none;">
                  <span class="banner-icon">📜</span>
                  <div class="banner-info">
                    <h4 id="class-advancement-title">⚡ 第一次轉職已開放！</h4>
                    <p id="class-advancement-sub">選擇你的成長路線。</p>
                  </div>
                  <button id="class-advancement-btn" class="class-adv-action-btn">職業晉升</button>
                </div>
              </div>
            </div>

            <!-- Commercial Player Journey & Next Action Advisor Widget -->
            <div id="next-action-advisor-char" class="next-action-advisor-container" style="display:none; margin: 12px 0;"></div>

            <!-- 2. POWER SUMMARY & COMBAT PERFORMANCE -->
            <div class="l2-char-section" id="char-performance-section">
              <div class="l2-section-header">
                <span class="l2-section-icon">⚡</span>
                <h3>戰鬥表現與戰力總覽</h3>
                <span class="l2-section-tag">實際數據</span>
              </div>
              <div id="char-performance-grid" class="l2-performance-grid">
                <div class="l2-perf-card">
                  <div class="l2-perf-label">⚔️ 持續 DPS</div>
                  <div class="l2-perf-val val-dps" id="perf-dps-sustained">0</div>
                  <div class="l2-perf-sub">平均傷害／秒</div>
                </div>
                <div class="l2-perf-card">
                  <div class="l2-perf-label">💥 爆發 DPS</div>
                  <div class="l2-perf-val val-burst" id="perf-dps-burst">0</div>
                  <div class="l2-perf-sub">暴擊峰值</div>
                </div>
                <div class="l2-perf-card">
                  <div class="l2-perf-label">🛡️ 有效生命值（EHP）</div>
                  <div class="l2-perf-val val-ehp" id="perf-ehp">0</div>
                  <div class="l2-perf-sub">考慮防禦與迴避後的 HP</div>
                </div>
                <div class="l2-perf-card">
                  <div class="l2-perf-label">🩸 持續恢復（HPS）</div>
                  <div class="l2-perf-val val-hps" id="perf-hps">+0/s</div>
                  <div class="l2-perf-sub">恢復 + 吸血</div>
                </div>
                <div class="l2-perf-card">
                  <div class="l2-perf-label">💧 MP 續航</div>
                  <div class="l2-perf-val val-mps" id="perf-mp-sustain">+0/s</div>
                  <div class="l2-perf-sub">恢復／秒</div>
                </div>
                <div class="l2-perf-card">
                  <div class="l2-perf-label">👟 實際迴避</div>
                  <div class="l2-perf-val val-eva" id="perf-dodge-rate">0%</div>
                  <div class="l2-perf-sub">實際迴避機率</div>
                </div>
              </div>
            </div>

            <!-- 3. CORE ATTRIBUTES (Os Seis Pilares Raciais: 基礎 + 加成 = 最終) -->
            <div class="l2-char-section">
              <div class="l2-section-header">
                <span class="l2-section-icon">🏛️</span>
                <h3>亞丁主要屬性（血統、裝備與染料）</h3>
                <span class="l2-section-tag">基礎 + 加成 = 最終</span>
              </div>
              <div id="char-primary-stats-grid" class="l2-primary-stats-grid"></div>
            </div>

            <!-- 4. COMBAT STATS MATRIX (Ofensiva, Defensiva & Sustentação) -->
            <div class="l2-char-section">
              <div class="l2-section-header">
                <span class="l2-section-icon">⚔️</span>
                <h3>戰鬥戰術矩陣</h3>
                <span class="l2-section-tag">即時狀態</span>
              </div>
              <div id="char-tab-stats-summary" class="l2-combat-matrix-grid"></div>
            </div>

            <!-- 5. EQUIPMENT POWER (Poder e Contribuição de Equipamentos) -->
            <div class="l2-char-section" id="char-equipment-power-section">
              <div class="l2-section-header">
                <span class="l2-section-icon">🛡️</span>
                <h3>裝備戰力與貢獻</h3>
                <span class="l2-section-tag">Arsenal Auditado</span>
              </div>
              <p class="l2-section-desc">每件已裝備物品的品級、強化（+0 至 +16）與套裝加成對戰鬥力的影響。</p>
              <div id="char-equipped-power-list" class="l2-equip-power-grid"></div>
              <div id="char-set-bonuses-container" style="margin-top: 10px;"></div>
            </div>

            <!-- 6. POWER INSIGHTS (Assistente Tático de Build) -->
            <div class="l2-char-section" id="char-power-insights-section">
              <div class="l2-section-header">
                <span class="l2-section-icon">💡</span>
                <h3>戰力分析與配裝診斷</h3>
                <span class="l2-section-tag">動態分析</span>
              </div>
              <div id="char-power-insights-list" class="l2-insights-container"></div>
            </div>

            <!-- 7. PROGRESSION (Próximo Marco de Poder & Recomendações) -->
            <div class="l2-char-section" id="char-progression-section">
              <div class="l2-section-header">
                <span class="l2-section-icon">🎯</span>
                <h3>戰力成長與下一個里程碑</h3>
                <span class="l2-section-tag">亞丁目標</span>
              </div>
              <div id="char-next-milestone-card" class="l2-milestone-card"></div>
            </div>

            <!-- 8. SUBCLASSES & CERTIFICAÇÕES DE ADEN -->
            <div class="l2-char-section subclass-section">
              <div class="l2-section-header">
                <span class="l2-section-icon">📜</span>
                <h3>亞丁副職業與認證</h3>
                <span id="subclass-count-badge" class="l2-section-tag">Lv. 52+ Requerido</span>
              </div>
              <p class="l2-section-desc">最多培養 3 個高階副職業，解鎖可永久套用於主職業的被動認證能力。</p>
              
              <div id="subclass-list-container" class="subclass-list-container" style="display:flex; flex-direction:column; gap:8px;"></div>
              
              <div style="display:flex; gap:8px; margin-top:10px;">
                <button id="add-subclass-btn" class="action-btn action-btn--primary" style="flex:1; font-size:11px;">➕ 新增副職業</button>
              </div>

              <!-- Certificações -->
              <div class="l2-certifications-card">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <h4 style="margin:0 0 4px 0; font-size:12px; color:#f5df93; font-family:'Cinzel',serif;">✨ 已取得的被動認證</h4>
                  <span id="cert-total-cp-badge" style="font-size:11px; font-weight:bold; color:#fde047;">+0 CP</span>
                </div>
                <div id="certifications-summary" style="font-size:11px; color:#94a3b8;">尚未學習任何認證。將副職業提升至 65、70、75、80 級！</div>
              </div>
            </div>

            <!-- 9. AÇÕES DO RODAPÉ -->
            <div class="char-actions" style="margin-top: 20px;">
              <button id="save-btn" class="action-btn">💾 儲存進度</button>
              <button id="start-btn" class="action-btn action-btn--primary">⚔️ 開始狩獵</button>
              <button id="reset-btn" class="action-btn action-btn--danger">⚠️ Reiniciar 角色</button>
            </div>
          </div>

          <!-- Skills Tab -->
          <div id="tab-skills" class="tab-pane">
            <div class="skills-head">
              <h3>技能與天賦樹</h3>
              <div style="display:flex; gap:10px; align-items:center;">
                <span class="sp-pill"><span class="sp-icon">✦</span> <span id="sp-available">0</span> 可用 SP</span>
                <button id="reset-sp-btn" class="inv-batch-btn" title="重置所有已投入的技能點">🔄 重置 SP</button>
              </div>
            </div>
            <!-- Banner de Troca de Classe na Aba de Habilidades -->
            <div id="skills-class-adv-banner" class="class-advancement-banner" style="display:none; margin: 8px 0 12px 0;">
              <span class="banner-icon">⚡</span>
              <div class="banner-info">
                <h4 id="skills-class-adv-title">第一次轉職已開放！</h4>
                <p id="skills-class-adv-sub">提升職業階段以解鎖新的力量與天賦樹。</p>
              </div>
              <button id="skills-class-adv-btn" class="class-adv-action-btn" onclick="window.openClassTransferModal && window.openClassTransferModal()">職業晉升</button>
            </div>
            <!-- Passivas de Linhagem de Classes Passadas -->
            <div id="legacy-passives-container" style="display:none; background:rgba(0,0,0,0.4); border:1px solid rgba(212,175,55,0.25); border-radius:8px; padding:10px 14px; margin-bottom:10px;"></div>
            <!-- Habilidades Gerais Compartilhadas (Lv. 1–39) -->
            <div id="shared-skills-container" class="shared-skills-container" style="margin-bottom:12px;"></div>
            <div class="skills-body">
              <div class="skill-tree-scroll">
                <div class="skill-tree" id="skill-tree"></div>
              </div>
              <aside class="skill-info-panel" id="skill-info-panel"></aside>
            </div>
          </div>

          <!-- Authentic Lineage 2 Inventory & Equipment Window Tab -->
          <div id="tab-inventory" class="tab-pane">
            <!-- Window Header matching L2 frame -->
            <div class="l2inv-header-frame">
              <div class="l2inv-title-group">
                <span class="l2inv-window-icon">🎒</span>
                <span class="l2inv-window-title">Inventory</span>
                <span class="l2inv-counter" id="l2inv-counter">(<span id="inv-slots-count">0</span>/<span id="max-inv-slots">150</span>)</span>
              </div>
              <div class="inv-capacity-pressure-widget" id="inv-capacity-pressure-widget" style="display:flex; align-items:center; gap:8px; margin-left:auto; margin-right:12px;" title="背包容量壓力">
                <div class="inv-pressure-bar-track" style="width:110px; height:8px; background:rgba(0,0,0,0.7); border:1px solid rgba(212,167,68,0.3); border-radius:4px; overflow:hidden; position:relative;">
                  <div class="inv-pressure-bar-fill" id="inv-capacity-pressure-bar" style="width:0%; height:100%; background:#c8aa6e; transition:width 0.3s ease, background 0.3s ease;"></div>
                </div>
                <span class="inv-pressure-bar-label" id="inv-capacity-pressure-label" style="font-size:10px; font-weight:bold; color:#cbd5e1; min-width:80px;">0% Normal</span>
              </div>
              <div class="l2inv-window-controls">
                <button class="l2inv-win-btn forge-shortcut-btn" id="btn-inv-open-forge" title="開啟亞丁鍛造（武器與防具製作）" style="background:rgba(212,167,68,0.2); color:#ffd700; border:1px solid rgba(212,167,68,0.4); font-size:11px; padding:2px 8px; border-radius:4px; cursor:pointer; font-weight:bold;">⚒ 鍛造</button>
                <button class="l2inv-win-btn" title="說明">?</button>
                <button class="l2inv-win-btn" title="性別">♂</button>
                <button class="l2inv-win-btn" title="最小化">_</button>
                <button class="l2inv-win-btn close" title="關閉">✕</button>
              </div>
            </div>

            <!-- Full Inventory Alert Banner (100% capacity) -->
            <div class="inv-full-alert-banner" id="inv-full-alert-banner" style="display:none; background:linear-gradient(90deg, #7f1d1d, #991b1b, #7f1d1d); color:#fecaca; border:1px solid #ef4444; padding:6px 12px; font-size:11px; font-weight:bold; text-align:center; box-shadow:0 0 12px rgba(239,68,68,0.4); animation:l2-pulse-alert 2s infinite;">
              ⚠️ 背包已滿！負重容量已達 100%。在騰出空間前無法拾取新物品。
            </div>

            <!-- Commercial Player Journey & Next Action Advisor Widget (Inventory View) -->
            <div id="next-action-advisor-inv" class="next-action-advisor-container" style="display:none; margin: 8px 0;"></div>

            <!-- Two-panel layout -->
            <div class="l2inv-main-container">
              <!-- Left Panel: 3-column Paperdoll Equipment Grid + Stats -->
              <div class="l2inv-left-paperdoll">
                <div class="l2inv-paperdoll-grid">
                  <!-- Column 1 (Left - 7 slots) -->
                  <div class="l2inv-doll-col">
                    <div class="l2inv-pd-slot equip-slot" data-slot="hair1" title="飾品／髮飾 1">
                      <span class="l2inv-pd-icon">👒</span>
                      <span class="l2inv-pd-item" id="pd-item-hair1"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="earring1" title="Brinco 1">
                      <span class="l2inv-pd-icon">💎</span>
                      <span class="l2inv-pd-item" id="pd-item-earring1"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="necklace" title="Colar">
                      <span class="l2inv-pd-icon">📿</span>
                      <span class="l2inv-pd-item" id="pd-item-necklace"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="weapon" title="主武器">
                      <span class="l2inv-pd-icon">⚔️</span>
                      <span class="l2inv-pd-item" id="pd-item-weapon"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="ring1" title="Anel 1">
                      <span class="l2inv-pd-icon">💍</span>
                      <span class="l2inv-pd-item" id="pd-item-ring1"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="belt" title="Cinto">
                      <span class="l2inv-pd-icon">🪢</span>
                      <span class="l2inv-pd-item" id="pd-item-belt"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="brooch" title="胸針（珠寶盒）">
                      <span class="l2inv-pd-icon">❇️</span>
                      <span class="l2inv-pd-item" id="pd-item-brooch"></span>
                    </div>
                  </div>

                  <!-- Column 2 (Center - 6 slots) -->
                  <div class="l2inv-doll-col">
                    <div class="l2inv-pd-slot equip-slot" data-slot="helmet" title="Capacete">
                      <span class="l2inv-pd-icon">⛑️</span>
                      <span class="l2inv-pd-item" id="pd-item-helmet"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="chest" data-slot-alias="armor" title="防具／胸甲">
                      <span class="l2inv-pd-icon">🛡️</span>
                      <span class="l2inv-pd-item" id="pd-item-chest"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="legs" title="褲子／腿甲">
                      <span class="l2inv-pd-icon">👖</span>
                      <span class="l2inv-pd-item" id="pd-item-legs"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="gloves" title="Luvas">
                      <span class="l2inv-pd-icon">🧤</span>
                      <span class="l2inv-pd-item" id="pd-item-gloves"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="boots" title="Botas">
                      <span class="l2inv-pd-icon">👢</span>
                      <span class="l2inv-pd-item" id="pd-item-boots"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="agathion_bracelet" title="阿加西翁手鐲">
                      <span class="l2inv-pd-icon">🧚‍♂️</span>
                      <span class="l2inv-pd-item" id="pd-item-agathion_bracelet"></span>
                    </div>
                  </div>

                  <!-- Column 3 (Right - 6 slots) -->
                  <div class="l2inv-doll-col">
                    <div class="l2inv-pd-slot equip-slot" data-slot="hair2" title="飾品／髮飾 2">
                      <span class="l2inv-pd-icon">🎭</span>
                      <span class="l2inv-pd-item" id="pd-item-hair2"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="earring2" title="Brinco 2">
                      <span class="l2inv-pd-icon">💎</span>
                      <span class="l2inv-pd-item" id="pd-item-earring2"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="cloak" title="Capa">
                      <span class="l2inv-pd-icon">🧥</span>
                      <span class="l2inv-pd-item" id="pd-item-cloak"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="shield" title="盾牌／副手">
                      <span class="l2inv-pd-icon">🛡️</span>
                      <span class="l2inv-pd-item" id="pd-item-shield"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="weapon2" title="武器 2（雙武器庫／副武器欄）">
                      <span class="l2inv-pd-icon">🗡️</span>
                      <span class="l2inv-pd-item" id="pd-item-weapon2"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="ring2" title="Anel 2">
                      <span class="l2inv-pd-icon">💍</span>
                      <span class="l2inv-pd-item" id="pd-item-ring2"></span>
                    </div>
                    <div class="l2inv-pd-slot equip-slot" data-slot="talisman_bracelet" title="護符手鐲">
                      <span class="l2inv-pd-icon">🔮</span>
                      <span class="l2inv-pd-item" id="pd-item-talisman_bracelet"></span>
                    </div>
                  </div>
                </div>

                <!-- Paperdoll Stats Summary -->
                <div class="l2inv-stats-box">
                  <div class="l2inv-stat-row">
                    <span>P.Atk: <strong id="l2stat-atk">0</strong></span>
                    <span>P.Def: <strong id="l2stat-def">0</strong></span>
                  </div>
                  <div class="l2inv-stat-row">
                    <span>M.Atk: <strong id="l2stat-matk">0</strong></span>
                    <span>M.Def: <strong id="l2stat-mdef">0</strong></span>
                  </div>
                  <div class="l2inv-stat-row">
                    <span>Crit: <strong id="l2stat-crit">0%</strong></span>
                    <span>Speed: <strong id="l2stat-speed">0</strong></span>
                  </div>
                  <button class="l2inv-unequip-all" id="unequip-all-btn" title="卸下所有裝備">全部卸下</button>
                </div>

                <!-- Primary Attributes Section (STR/DEX/CON/INT/WIT/MEN) -->
                <div class="l2inv-primary-box" id="l2inv-primary-box" style="margin-top:6px; padding:6px 8px; background:rgba(0,0,0,0.5); border:1px solid rgba(212,167,68,0.3); border-radius:4px;">
                  <div style="font-size:10px; font-weight:bold; color:var(--gilt-bright); text-transform:uppercase; margin-bottom:4px; letter-spacing:0.5px;">主要屬性</div>
                  <div class="l2inv-stat-row" style="font-size:10px;">
                    <span>STR: <strong id="l2stat-str" style="color:#10b981;">0</strong></span>
                    <span>DEX: <strong id="l2stat-dex" style="color:#10b981;">0</strong></span>
                    <span>CON: <strong id="l2stat-con" style="color:#10b981;">0</strong></span>
                  </div>
                  <div class="l2inv-stat-row" style="font-size:10px; margin-top:2px;">
                    <span>INT: <strong id="l2stat-int" style="color:#3b82f6;">0</strong></span>
                    <span>WIT: <strong id="l2stat-wit" style="color:#3b82f6;">0</strong></span>
                    <span>MEN: <strong id="l2stat-men" style="color:#3b82f6;">0</strong></span>
                  </div>
                </div>
              </div>

              <!-- Right Panel: Items Grid and Tabs -->
              <div class="l2inv-right-grid-area">
                <!-- L2 Metallic Filter Tabs -->
                <!-- L2 Metallic Filter Tabs (4 Abas Nobres) -->
                <div class="l2inv-tabs-header">
                  <button class="l2inv-tab-btn filter-btn active" data-filter="all">✨ 全部</button>
                  <button class="l2inv-tab-btn filter-btn" data-filter="gear">⚔️ 裝備</button>
                  <button class="l2inv-tab-btn filter-btn" data-filter="consumable">🧪 消耗品</button>
                  <button class="l2inv-tab-btn filter-btn" data-filter="material">💎 材料</button>
                </div>

                <!-- Subbar Reestruturada em 2 Linhas Elegantes sem Sobreposição -->
                <div class="l2inv-subbar" style="display:flex; flex-direction:column; gap:6px; padding:8px; background:rgba(10,12,18,0.95); border:1px solid rgba(212,167,68,0.25); border-radius:6px; margin-bottom:8px;">
                  <!-- Linha 1: Busca em Destaque + Ordenação + Auto-Venda + Filtro AFK -->
                  <div style="display:flex; align-items:center; gap:8px; width:100%; flex-wrap:wrap;">
                    <div style="flex:1; min-width:140px; position:relative;">
                      <label for="inv-search-input" class="sr-only" style="display:none;">搜尋背包</label>
                      <input type="text" id="inv-search-input" name="invSearch" aria-label="依物品名稱篩選背包" placeholder="🔍 搜尋背包..." style="width:100%; background:#090c12; color:#ece4d3; border:1px solid rgba(212,167,68,0.4); border-radius:4px; padding:5px 8px; font-size:11px; box-sizing:border-box;" title="依物品名稱篩選" />
                    </div>
                    <div style="display:flex; align-items:center; gap:4px; font-size:10px; color:#cbd5e1; flex-shrink:0;">
                      <label for="inv-sort-select" style="font-weight:600; cursor:pointer; color:var(--gilt);">排序：</label>
                      <select id="inv-sort-select" name="invSort" aria-label="背包排序" style="background:#090b10; color:#fff; border:1px solid rgba(212,167,68,0.3); border-radius:4px; padding:3px 6px; font-size:10px; cursor:pointer;">
                        <option value="recommended">✨ 推薦</option>
                        <option value="cp">⚡ CP 由高到低</option>
                        <option value="grade">🎖️ 等級（S→NG）</option>
                        <option value="rarity">🌟 稀有度</option>
                        <option value="enchant">✨ 強化值</option>
                        <option value="name">🔤 名稱（A-Z）</option>
                        <option value="count">🔢 數量</option>
                      </select>
                    </div>
                    <div style="display:flex; align-items:center; gap:4px; font-size:10px; color:#fde047; flex-shrink:0;">
                      <label for="auto-sell-rarity-select" style="font-weight:600; cursor:pointer;">自動出售：</label>
                      <select id="auto-sell-rarity-select" name="autoSellRarity" aria-label="依稀有度設定自動出售" style="background:#090b10; color:#fff; border:1px solid rgba(212,167,68,0.3); border-radius:4px; padding:3px 6px; font-size:10px; cursor:pointer;">
                        <option value="off">OFF</option>
                        <option value="common">≤ 一般</option>
                        <option value="uncommon">≤ 非凡</option>
                        <option value="rare">≤ 稀有</option>
                      </select>
                    </div>
                    <button id="open-auto-recycle-btn" class="l2inv-pill-btn" style="background:rgba(212,167,68,0.2); border-color:#fde047; color:#fef08a; font-weight:bold; flex-shrink:0; padding:4px 8px;" title="設定 AFK 掉落與自動回收過濾器">⚙️ AFK 過濾</button>
                  </div>

                  <!-- Linha 2: Raridades + Seleção em Massa -->
                  <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; flex-wrap:wrap;">
                    <div class="l2inv-rarity-pills" style="display:flex; gap:3px;">
                      <button class="rarity-filter-btn active" data-rarity="all">全部</button>
                      <button class="rarity-filter-btn r-common" data-rarity="common">C</button>
                      <button class="rarity-filter-btn r-uncommon" data-rarity="uncommon">I</button>
                      <button class="rarity-filter-btn r-rare" data-rarity="rare">R</button>
                      <button class="rarity-filter-btn r-epic" data-rarity="epic">É</button>
                      <button class="rarity-filter-btn r-legendary" data-rarity="legendary">L</button>
                    </div>
                    <div class="l2inv-batch-pills" style="display:flex; gap:3px;">
                      <button id="select-commons-btn" class="l2inv-pill-btn" title="選擇一般品質">✓ 一般</button>
                      <button id="select-uncommons-btn" class="l2inv-pill-btn" title="選擇非凡品質">✓ 非凡</button>
                      <button id="select-all-btn" class="l2inv-pill-btn" title="全部選取">✓ 全部</button>
                      <button id="clear-selection-btn" class="l2inv-pill-btn" title="清除選擇">✕</button>
                    </div>
                  </div>

                  <!-- Linha 3: Filtro por Grau (NG, D, C, B, A, S) -->
                  <div class="l2inv-grade-pills" style="display:flex; align-items:center; gap:3px; padding-top:2px; border-top:1px solid rgba(212,167,68,0.15); flex-wrap:wrap;">
                    <span style="font-size:10px; color:var(--gilt); font-weight:600; margin-right:4px;">等級：</span>
                    <button class="grade-filter-btn active" data-grade="all" style="padding:2px 7px; font-size:10px; border-radius:3px; cursor:pointer; background:#1e293b; color:#cbd5e1; border:1px solid rgba(212,167,68,0.3);">全部</button>
                    <button class="grade-filter-btn" data-grade="ng" style="padding:2px 7px; font-size:10px; border-radius:3px; cursor:pointer; background:#0f172a; color:#94a3b8; border:1px solid rgba(148,163,184,0.3);">NG</button>
                    <button class="grade-filter-btn" data-grade="d" style="padding:2px 7px; font-size:10px; border-radius:3px; cursor:pointer; background:#0f172a; color:#38bdf8; border:1px solid rgba(56,189,248,0.3);">D</button>
                    <button class="grade-filter-btn" data-grade="c" style="padding:2px 7px; font-size:10px; border-radius:3px; cursor:pointer; background:#0f172a; color:#4ade80; border:1px solid rgba(74,222,128,0.3);">C</button>
                    <button class="grade-filter-btn" data-grade="b" style="padding:2px 7px; font-size:10px; border-radius:3px; cursor:pointer; background:#0f172a; color:#f87171; border:1px solid rgba(248,113,113,0.3);">B</button>
                    <button class="grade-filter-btn" data-grade="a" style="padding:2px 7px; font-size:10px; border-radius:3px; cursor:pointer; background:#0f172a; color:#e2e8f0; border:1px solid rgba(226,232,240,0.4);">A</button>
                    <button class="grade-filter-btn" data-grade="s" style="padding:2px 7px; font-size:10px; border-radius:3px; cursor:pointer; background:#0f172a; color:#facc15; border:1px solid rgba(250,204,21,0.5); font-weight:bold;">S</button>
                  </div>
                </div>

                <!-- Item Slots Grid (8 columns x 7 rows dark reddish-brown slots) -->
                <div class="l2inv-slots-grid" id="inventory-grid"></div>

                <div class="l2inv-trash-actions" style="display:flex; gap:6px; flex-wrap:wrap;">
                  <button id="sell-selected-btn" class="l2inv-trash-btn sell" disabled title="出售已選取物品">💰 出售</button>
                  <button id="salvage-selected-btn" class="l2inv-trash-btn salvage" disabled title="分解已選取物品">🔨 分解</button>
                  <button id="crystallize-selected-btn" class="l2inv-trash-btn crystallize" style="background:linear-gradient(135deg, #1e3a8a, #2563eb); border:1px solid #60a5fa; color:#fff; border-radius:4px; padding:4px 10px; font-size:11px; cursor:pointer; font-weight:600;" title="將已選取的 D～S 級裝備結晶化">💎 批次結晶化</button>
                </div>

                <!-- Intelligent Comparison Dock: Detail & Side-by-Side Comparison -->
                <div class="l2inv-detail-panel" id="l2inv-detail-panel" style="display:none; margin-top:10px; background:rgba(8,12,18,0.95); border:1px solid rgba(212,167,68,0.35); border-radius:6px; padding:10px; box-shadow:0 4px 20px rgba(0,0,0,0.8);">
                  <!-- Populated dynamically by GameUI.js -->
                </div>
              </div>
            </div>

            <!-- Bottom Bar matching L2 UI -->
            <div class="l2inv-bottom-bar">
              <div class="l2inv-bottom-left-actions">
                <button class="l2inv-icon-btn" id="nav-craft-btn" title="開啟鍛造／製作">⚒️</button>
                <button class="l2inv-icon-btn" id="auto-equip-btn" title="裝備最佳物品">⚡</button>
                <button class="l2inv-icon-btn" id="organize-inv-btn" title="整理背包（合併堆疊並排序）">🧹</button>
                <button class="l2inv-icon-btn" id="open-compound-btn" onclick="window.openCompoundModal()" title="🔮 珠寶與護符合成" style="color:#c084fc;">🔮</button>
                <button class="l2inv-icon-btn" id="open-symbol-maker-btn" onclick="window.openSymbolMakerModal()" title="🎭 符號與染料紋身" style="color:#fde047;">🎭</button>
                <button class="l2inv-icon-btn" id="open-pet-btn" onclick="window.openPetModal()" title="🐾 夥伴與戰鬥寵物" style="color:#6ee7b7;">🐾</button>
                <button class="l2inv-icon-btn" id="open-manor-btn" onclick="window.openManorModal()" title="🌾 莊園管理與農作收成" style="color:#86efac;">🌾</button>
              </div>

              <div class="l2inv-bottom-right-info">
                <div class="l2inv-gold-counter">
                  <span class="l2inv-gold-icon">🪙</span>
                  <span class="l2inv-gold-val" id="gold-text">0</span>
                </div>
                <div class="l2inv-weight-gauge" title="背包容量">
                  <span class="l2inv-weight-icon">🎒</span>
                  <span id="inv-slots">0/150</span>
                </div>
              </div>
            </div>

            <!-- Modal de Prévia e Confirmação de Ações da Mochila -->
            <div class="inv-preview-modal-overlay" id="inv-preview-modal-overlay" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:99999; align-items:center; justify-content:center; padding:16px;">
              <div class="inv-preview-modal-card" id="inv-preview-modal-card" style="background:linear-gradient(180deg, #161c28, #0b0f16); border:1px solid rgba(212,167,68,0.5); border-radius:8px; width:100%; max-width:540px; max-height:85vh; display:flex; flex-direction:column; box-shadow:0 0 30px rgba(0,0,0,0.9), 0 0 15px rgba(212,167,68,0.2);">
                <div class="inv-modal-header" id="inv-modal-header" style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-bottom:1px solid rgba(212,167,68,0.3); background:rgba(0,0,0,0.4);">
                  <h4 id="inv-modal-title" style="margin:0; font-size:13px; color:var(--gilt-bright); font-family:'Cinzel',serif; letter-spacing:0.5px;">操作預覽</h4>
                  <button id="inv-modal-close-btn" style="background:none; border:none; color:#94a3b8; font-size:16px; cursor:pointer; padding:2px 6px;">✕</button>
                </div>
                <div class="inv-modal-body" id="inv-modal-body" style="padding:14px; overflow-y:auto; flex:1; font-size:12px; color:#e2e8f0;">
                  <!-- Conteúdo dinâmico -->
                </div>
                <div class="inv-modal-footer" id="inv-modal-footer" style="display:flex; justify-content:flex-end; gap:8px; padding:10px 14px; border-top:1px solid rgba(212,167,68,0.25); background:rgba(0,0,0,0.3);">
                  <button id="inv-modal-cancel-btn" style="background:#1e293b; border:1px solid #475569; color:#cbd5e1; border-radius:4px; padding:6px 12px; font-size:11px; cursor:pointer;">取消</button>
                  <button id="inv-modal-confirm-btn" style="background:linear-gradient(180deg, #b45309, #78350f); border:1px solid #d97706; color:#fef3c7; border-radius:4px; padding:6px 14px; font-size:11px; font-weight:bold; cursor:pointer;">確認</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Authentic Lineage 2 Shop Tab -->
          <div id="tab-shop" class="tab-pane">
            <!-- Global Shop Header (Compact) -->
            <div class="shop-head" style="margin-bottom: 8px;">
              <div>
                <h3 style="margin:0; font-family:'Cinzel',serif; color:var(--gilt-bright);">亞丁商人公會</h3>
                <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-muted);">亞丁帝國武器、防具、消耗品與遺物交易</p>
              </div>
              <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                <span class="shop-gold-pill">🪙 <span id="shop-gold">0</span> 金幣</span>
                <span id="mystic-shop-timer" class="mystic-timer-pill" style="display:none;">⏳ 神秘補貨： <strong id="mystic-timer-countdown">03:00:00</strong></span>
              </div>
            </div>

            <!-- ═══════════════════════════════════════════════════════════════════════════ -->
            <!-- STAGE 1: JANELA DE DIÁLOGO / CHAT NPC (IMAGEM 1 DE REFERÊNCIA)           -->
            <!-- ═══════════════════════════════════════════════════════════════════════════ -->
            <div id="shop-dialogue-view" class="l2chat-window-frame">
              <div class="l2chat-window-header">
                <span class="l2chat-title">Chat</span>
                <button class="l2chat-close-btn" id="shop-dialogue-close-btn" title="關閉" onclick="window.switchTab ? window.switchTab('inventory') : null">✕</button>
              </div>
              <div class="l2chat-inner-panel">
                <div class="l2chat-npc-speech">
                  <div class="l2chat-npc-name" id="shop-npc-name">Trader Woodrow:</div>
                  <div class="l2chat-npc-text" id="shop-npc-text">Can I show you anything in particular? We are sure to have something for everyone.</div>
                </div>
                <div class="l2chat-options-container" id="shop-dialogue-options">
                  <!-- Dynamic dialogue options rendered by GameUI.js -->
                </div>
              </div>
            </div>

            <!-- ═══════════════════════════════════════════════════════════════════════════ -->
            <!-- STAGE 2: JANELA STORE CLÁSSICA DO LINEAGE 2 (IMAGEM 2 DE REFERÊNCIA)      -->
            <!-- ═══════════════════════════════════════════════════════════════════════════ -->
            <div id="shop-store-view" class="l2store-window-frame" style="display:none;">
              <!-- Store Window Header -->
              <div class="l2store-window-header">
                <div class="l2store-header-left">
                  <button class="l2store-back-btn" id="shop-back-to-dialogue-btn" title="返回對話">
                    ← 對話
                  </button>
                  <span class="l2store-window-title" id="shop-window-title">Store</span>
                </div>
                
                <!-- Central Search Bar with clear button (Image 2) -->
                <div class="l2store-search-bar">
                  <input type="text" id="shop-search-input" placeholder="依名稱搜尋（例如：弓、藥水、裝備）..." autocomplete="off" />
                  <button id="shop-clear-search-btn" class="l2store-clear-search" style="display:none;">✕</button>
                </div>

                <!-- Window Right Controls -->
                <div class="l2store-header-right">
                  <button class="l2store-icon-btn" id="shop-view-toggle-btn" title="Alternar Modo Grade/Lista">🔲</button>
                  <button class="l2store-icon-btn close" id="shop-store-close-btn" title="返回對話">✕</button>
                </div>
              </div>

              <!-- Store Primary Tabs: Buy / Sell / Refund + Slot Gauge -->
              <div class="l2store-tabs-bar">
                <div class="l2store-tabs">
                  <button class="l2store-tab active" data-shoptab="buy">Buy</button>
                  <button class="l2store-tab" data-shoptab="sell">Sell</button>
                  <button class="l2store-tab" data-shoptab="refund">Refund</button>
                </div>
                <div class="l2store-slot-counter" id="shop-slot-counter">
                  (<span id="shop-inv-used">0</span>/<span id="shop-inv-max">150</span>)
                </div>
              </div>

              <!-- Subcategory & Grade Filter Toolbar -->
              <div class="l2store-filter-toolbar" id="shop-filter-toolbar">
                <!-- Subcategory quick pill selector -->
                <div class="l2store-subcat-strip" id="shop-subcat-strip">
                  <!-- Gerado dinamicamente: Todos, Arcos, Espadas, etc. -->
                </div>

                <!-- Grade Filter Row: NG, D, C, B, A, S -->
                <div class="l2store-grade-strip" id="shop-grade-strip">
                  <button class="l2store-grade-btn active" data-shopgrade="all">全部</button>
                  <button class="l2store-grade-btn grade-ng" data-shopgrade="ng">NG</button>
                  <button class="l2store-grade-btn grade-d" data-shopgrade="d">D</button>
                  <button class="l2store-grade-btn grade-c" data-shopgrade="c">C</button>
                  <button class="l2store-grade-btn grade-b" data-shopgrade="b">B</button>
                  <button class="l2store-grade-btn grade-a" data-shopgrade="a">A</button>
                  <button class="l2store-grade-btn grade-s" data-shopgrade="s">S</button>
                </div>
              </div>

              <!-- Mystic Emporium Special Header (Banner) -->
              <div id="shop-mystic-banner" style="display:none; padding: 6px 12px; margin-bottom: 8px;"></div>

              <!-- Store Two-Column Layout (Signature Lineage 2 Store) -->
              <div class="l2store-main-body">
                <!-- Left Column: Shop Catalog -->
                <div class="l2store-col l2store-left-col">
                  <div class="l2store-col-header">
                    <span id="shop-left-col-title">Shop List</span>
                    <span class="l2store-count-badge" id="shop-left-count-badge">0 件物品</span>
                  </div>
                  <div class="l2store-grid-scroll" id="shop-items-container">
                    <!-- Itens da loja preenchidos dinamicamente -->
                  </div>
                </div>

                <!-- Center Transfer Indicator Arrow -->
                <div class="l2store-transfer-arrow" title="將物品加入購買清單">
                  <span>▶</span>
                </div>

                <!-- Right Column: Purchase List / Cart -->
                <div class="l2store-col l2store-right-col">
                  <div class="l2store-col-header">
                    <span id="shop-right-col-title">Purchase List</span>
                    <button class="l2store-clear-cart-btn" id="shop-clear-cart-btn" title="清空清單">清空</button>
                  </div>
                  <div class="l2store-grid-scroll" id="shop-purchase-list">
                    <!-- Itens no carrinho / selecionados para compra ou venda -->
                  </div>
                </div>
              </div>

              <!-- Store Bottom Status & Actions Bar (Identical to Image 2) -->
              <div class="l2store-bottom-bar">
                <div class="l2store-status-left">
                  <!-- 金幣 Row -->
                  <div class="l2store-status-row">
                    <span class="l2store-label">金幣</span>
                    <span class="l2store-coin-icon">🪙</span>
                    <div class="l2store-val-box">
                      <span id="shop-bottom-adena">0</span>
                    </div>
                  </div>
                  <!-- Weight Row -->
                  <div class="l2store-status-row">
                    <span class="l2store-label">Weight</span>
                    <span class="l2store-scale-icon">⚖️</span>
                    <div class="l2store-weight-box">
                      <div class="l2store-weight-track">
                        <div class="l2store-weight-fill" id="shop-bottom-weight-bar" style="width:0%;"></div>
                      </div>
                      <span class="l2store-weight-text" id="shop-bottom-weight-text">0,00%</span>
                    </div>
                  </div>
                </div>

                <div class="l2store-status-right">
                  <!-- Price Row -->
                  <div class="l2store-status-row">
                    <span class="l2store-label">Price</span>
                    <span class="l2store-coin-icon">🪙</span>
                    <div class="l2store-val-box">
                      <span id="shop-bottom-price">0</span>
                    </div>
                  </div>
                  <!-- Action Buttons -->
                  <div class="l2store-actions-row">
                    <button class="l2store-action-btn primary" id="shop-action-confirm-btn">Buy</button>
                    <button class="l2store-action-btn" id="shop-action-cancel-btn">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Market Tab (市場 de Giran) -->
          <div id="tab-market" class="tab-pane"></div>

          <!-- Craft Tab -->
          <div id="tab-craft" class="tab-pane">
            <!-- ═══════════════════════════════════════════════════════════════════════════ -->
            <!-- STAGE 1: JANELA DE DIÁLOGO / CHAT NPC BLACKSMITH WILBERT (IMAGEM 5)       -->
            <!-- ═══════════════════════════════════════════════════════════════════════════ -->
            <div id="forge-dialogue-view" class="l2chat-window-frame">
              <!-- NPC Dialogue Window Header -->
              <div class="l2chat-window-header">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:16px;">💬</span>
                  <span class="l2chat-title">Chat</span>
                </div>
                <button class="l2chat-close-btn" id="forge-dialogue-close-btn" title="關閉對話">✕</button>
              </div>

              <!-- NPC Speech Box & Story Lore (Wilbert from Image 5) -->
              <div class="l2chat-inner-panel">
                <div class="l2chat-npc-speech">
                  <div class="l2chat-npc-name" id="forge-npc-name">Blacksmith Wilbert:</div>
                  <div class="l2chat-npc-text" id="forge-npc-text">
                    哈哈！鐵匠可不只是打造盔甲、長矛和斧頭而已。沒有我們黑色鐵砧公會，亞丁城可不會有今天！<br><br>
                    對了，雖然只是傳聞……我聽說那些曾被用來驅逐人類的魔像，也是我們公會打造的。除了我們，還有誰能發明這種了不起的技術呢？
                  </div>
                </div>

                <!-- NPC Options Strip with speech bubbles (Image 5) -->
                <div class="l2chat-options-container" id="forge-dialogue-options">
                  <!-- Gerado dinamicamente via renderForgeDialogueView() -->
                </div>
              </div>
            </div>

            <!-- ═══════════════════════════════════════════════════════════════════════════ -->
            <!-- STAGE 2: WORKSPACE DA FORJA IMPERIAL (SUBFERRAMENTAS)                     -->
            <!-- ═══════════════════════════════════════════════════════════════════════════ -->
            <div id="forge-workspace-view" class="l2store-window-frame" style="display:none;">
              <!-- Workspace Top Header with Back to Dialogue Button -->
              <div class="l2store-window-header">
                <div class="l2store-header-left">
                  <button class="l2store-back-btn" id="forge-back-to-dialogue-btn" title="返回對話 com Wilbert">
                    ← 對話
                  </button>
                  <span class="l2store-window-title" id="forge-window-title">亞丁帝國鍛造</span>
                </div>

                <div class="l2store-header-right">
                  <button class="l2store-icon-btn close" id="forge-workspace-close-btn" title="返回對話">✕</button>
                </div>
              </div>

              <div class="craft-head" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px; background:radial-gradient(circle at 50% 0%, #1c2333 0%, #0c0f16 100%); border:1px solid #5a4625; border-radius:10px; padding:14px 16px; box-shadow:inset 0 1px 0 rgba(255,215,0,0.15), 0 4px 16px rgba(0,0,0,0.6);">
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:22px;">⚒️</span>
                    <h3 style="margin:0; font-family:'Cinzel',serif; font-size:17px; font-weight:800; color:#f5df93; letter-spacing:0.06em;">亞丁帝國鐵砧</h3>
                  </div>
                  <p style="margin:4px 0 0 0; font-size:11px; color:#94a3b8;">古代武器工坊、靈魂強化與神秘鑲嵌。</p>
                </div>
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                  <div class="stat-value" style="font-size:12px; font-family:'Cinzel',serif; background:rgba(18,24,36,0.9); border:1px solid #8a6d3b; padding:6px 14px; border-radius:6px; box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);">
                    🔨 鍛造： <strong id="craft-level" style="color:#ffd877;">1</strong>
                    <div style="width:110px; height:5px; background:rgba(0,0,0,0.6); border-radius:3px; margin-top:4px; overflow:hidden; border:1px solid rgba(212,167,68,0.3);">
                      <div id="craft-forge-exp-bar" style="height:100%; width:0%; background:linear-gradient(90deg, #d4a744, #10b981); transition:width 0.3s;"></div>
                    </div>
                  </div>
                  <button onclick="window.openMarketTab ? window.openMarketTab() : (window.openPanel && window.openPanel('market'))" style="font-size:11px; font-weight:bold; padding:7px 14px; border-radius:6px; background:linear-gradient(180deg, #261f10 0%, #141008 100%); border:1px solid #d4a744; color:#fde047; cursor:pointer; font-family:'Cinzel',serif; display:flex; align-items:center; gap:6px; box-shadow:0 0 10px rgba(212,167,68,0.25);">
                    🏛️ 市場 P2P ➔
                  </button>
                </div>

                <div style="display:flex; gap:5px; flex-wrap:wrap; margin-top:10px; width:100%; border-top:1px solid rgba(212,167,68,0.2); padding-top:10px;" id="forge-subtab-buttons">
                  <button onclick="window.setForgeSubTab('craft')" class="inv-batch-btn forge-subtab-btn" data-forge-tab="craft" style="font-family:'Cinzel',serif; font-weight:700; font-size:11px;">⚒️ 一般製作</button>
                  <button onclick="window.setForgeSubTab('refinery')" class="inv-batch-btn forge-subtab-btn" data-forge-tab="refinery" style="font-family:'Cinzel',serif; font-weight:700; font-size:11px; color:#a7f3d0; border-color:rgba(52,211,153,0.4);">⚗️ 精煉工作台</button>
                  <button onclick="window.setForgeSubTab('soulcrystal')" class="inv-batch-btn forge-subtab-btn" data-forge-tab="soulcrystal" style="font-family:'Cinzel',serif; font-weight:700; font-size:11px;">🔮 Soul Crystals (SA)</button>
                  <button onclick="window.setForgeSubTab('elemental')" class="inv-batch-btn forge-subtab-btn" data-forge-tab="elemental" style="font-family:'Cinzel',serif; font-weight:700; font-size:11px; color:#fdba74;">🔥 元素屬性</button>
                  <button onclick="window.setForgeSubTab('masterwork')" class="inv-batch-btn forge-subtab-btn" data-forge-tab="masterwork" style="font-family:'Cinzel',serif; font-weight:700; font-size:11px;">✨ Pushkin MW</button>
                  <button onclick="window.setForgeSubTab('tattoos')" class="inv-batch-btn forge-subtab-btn" data-forge-tab="tattoos" style="font-family:'Cinzel',serif; font-weight:700; font-size:11px;">🖊️ Tatuagens &amp; Dyes</button>
                  <button onclick="window.setForgeSubTab('synthesis')" class="inv-batch-btn forge-subtab-btn" data-forge-tab="synthesis" style="font-family:'Cinzel',serif; font-weight:700; font-size:11px;">🔨 帝國合成</button>
                  <button onclick="window.setForgeSubTab('lifestones')" class="inv-batch-btn forge-subtab-btn" data-forge-tab="lifestones" style="font-family:'Cinzel',serif; font-weight:700; font-size:11px;">💎 Life Stones</button>
                  <button onclick="window.setForgeSubTab('randomcraft')" class="inv-batch-btn forge-subtab-btn" data-forge-tab="randomcraft" style="font-family:'Cinzel',serif; font-weight:700; font-size:11px; color:#e9d5ff;">🎲 Random Craft</button>
                </div>
              </div>

              <div class="craft-filters-bar" id="craft-filters-bar" style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px; align-items:center;">
                <input type="text" id="craft-search-input" placeholder="🔍 依名稱或等級搜尋配方..." style="flex:1; min-width:200px; padding:7px 12px; border-radius:6px; border:1px solid rgba(212,167,68,0.35); background:#0c0f16; color:#ece4d3; font-size:12px; font-family:'Cinzel',serif;" />
                <div style="display:flex; gap:5px; flex-wrap:wrap;" id="craft-category-filters">
                  <button class="inv-batch-btn active" data-craft-cat="all">🌟 全部</button>
                  <button class="inv-batch-btn" data-craft-cat="weapon">⚔ 武器</button>
                  <button class="inv-batch-btn" data-craft-cat="armor">🛡 防具</button>
                  <button class="inv-batch-btn" data-craft-cat="jewel">💍 飾品</button>
                  <button class="inv-batch-btn" data-craft-cat="relic">🧚 Agathions</button>
                  <button class="inv-batch-btn" data-craft-cat="consumable">🧪 消耗品</button>
                </div>
              </div>

              <div id="craft-subcategory-filters" style="display:flex; gap:5px; flex-wrap:wrap; margin-bottom:12px; padding:6px 10px; background:rgba(12,15,22,0.85); border-radius:6px; border:1px solid rgba(212,167,68,0.15);"></div>

              <div id="craft-recipes-view" class="craft-view active">
                <div class="craft-list" id="craft-list"></div>
              </div>
            </div>
          </div>

          <!-- Alchemy Tab -->
          <div id="tab-alchemy" class="tab-pane"></div>

          <!-- Astral Mastery Tab -->
          <div id="tab-astral" class="tab-pane"></div>

          <!-- Expeditions & Manor Tab -->
          <div id="tab-expeditions" class="tab-pane"></div>

          <!-- Fishing & Aquatic Life Tab -->
          <div id="tab-fishing" class="tab-pane"></div>

          <!-- Hunting & Wildlife Life Tab -->
          <div id="tab-hunting" class="tab-pane"></div>

          <!-- Gathering & Flora Life Tab -->
          <div id="tab-gathering" class="tab-pane"></div>

          <!-- Mining & Ores Life Tab -->
          <div id="tab-mining" class="tab-pane"></div>

          <!-- Raids & Bosses Tab -->
          <div id="tab-raids" class="tab-pane"></div>

          <!-- Grand Olympiad & Heroes Tab -->
          <div id="tab-olympiad" class="tab-pane"></div>

          <!-- Clan, Castles & Siege Tab -->
          <div id="tab-clan" class="tab-pane"></div>

          <!-- Seven Signs Tab -->
          <div id="tab-sevensigns" class="tab-pane"></div>

          <!-- Fortresses & Talismans Tab -->
          <div id="tab-fortress" class="tab-pane"></div>

          <!-- Colosseum & Duels Tab -->
          <div id="tab-colosseum" class="tab-pane"></div>

          <!-- Global Rankings & Leaderboards Tab -->
          <div id="tab-rankings" class="tab-pane"></div>

          <!-- Cosmetics Tab — Guarda-Roupa Real & Auras -->
          <div id="tab-cosmetics" class="tab-pane"></div>

          <!-- Dedicated Enchantment Tab -->
          <div id="tab-enchant" class="tab-pane">
            <div class="craft-head">
              <h3>強化工坊（+1 至 +16）</h3>
              <p class="stat-value">使用古代卷軸強化</p>
            </div>
            <p class="shop-info">使用強化卷軸強化裝備（每個強化等級額外 +10% 屬性）。</p>
            <div class="enchant-workspace" id="enchant-workspace-dedicated"></div>
          </div>

          <!-- Hunting Zones Tab -->
          <div id="tab-zones" class="tab-pane active">
            <div class="zone-head-tabs" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:8px; padding-bottom:6px; border-bottom:1px solid rgba(212,167,68,0.2);">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-family:'Cinzel',serif; font-size:13px; font-weight:bold; color:#ffd700; letter-spacing:0.06em; text-shadow:0 0 8px rgba(255,215,0,0.3);">🗺️ 亞丁狩獵區</span>
                <span class="z-badge" style="background:rgba(212,167,68,0.15); color:#f5df93; border:1px solid rgba(212,167,68,0.3); padding:2px 8px; border-radius:4px; font-size:11px;">開放世界</span>
              </div>
              <button class="action-btn" onclick="window.openInstancesModal()" style="padding:6px 14px; font-size:11px; background:linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border:1px solid #818cf8; color:#e0e7ff; font-weight:bold; border-radius:6px; box-shadow:0 0 10px rgba(129,140,248,0.3); cursor:pointer; display:flex; align-items:center; gap:6px; transition:all 0.2s;" onmouseover="this.style.filter='brightness(1.15)'" onmouseout="this.style.filter='none'">
                <span>🌀</span> <span>專屬選單：Kamaloka 與 Pailaka</span>
              </button>
            </div>

            <div id="zone-map-view" class="zone-view active">
              <div class="zone-list" id="zone-list"></div>
              <div class="zone-info-card" id="zone-info-card"></div>
            </div>
          </div>

          <!-- Codex Tab -->
          <div id="tab-codex" class="tab-pane">
            <div class="codex-header">
              <h3>📜 亞丁收藏圖鑑</h3>
              <p class="shop-info">登錄並消耗指定物品，可為帳號解鎖永久屬性加成！</p>
              <div class="codex-summary" id="codex-summary"></div>
            </div>
            <div class="codex-grid" id="codex-grid"></div>
          </div>

          <!-- Dolls Tab -->
          <div id="tab-dolls" class="tab-pane">
            <div class="dolls-header">
              <h3>🧸 首領娃娃收藏與合成</h3>
              <p class="shop-info">收藏首領娃娃可獲得大量加成。合成 2 個相同等級的相同娃娃，可嘗試提升娃娃等級！</p>
              <div class="dolls-summary" id="dolls-summary"></div>
            </div>
            <div class="dolls-synthesis-box">
              <h4>🔮 娃娃合成祭壇</h4>
              <div class="synthesis-slots" style="display: flex; gap: 12px; align-items: center; justify-content: center; margin: 12px 0;">
                <div class="synth-slot" id="synth-slot-1" style="border: 2px dashed var(--border-gilt); padding: 12px; border-radius: 8px; min-width: 140px; text-align: center; background: rgba(0,0,0,0.3);">Doll Base</div>
                <span class="synth-plus" style="font-size: 20px; color: var(--gilt-bright);">+</span>
                <div class="synth-slot" id="synth-slot-2" style="border: 2px dashed var(--border-gilt); padding: 12px; border-radius: 8px; min-width: 140px; text-align: center; background: rgba(0,0,0,0.3);">Doll Material</div>
              </div>
              <button class="action-btn action-btn--primary" id="start-doll-synth-btn">Combinar &amp; Sintetizar ✨</button>
            </div>
            <div class="dolls-grid" id="dolls-grid" style="margin-top: 16px;"></div>
            <div id="dolls-encyclopedia" style="margin-top: 20px;"></div>
          </div>

          <!-- Magic Lamp Tab (Imperial Genie Altar) -->
          <div id="tab-magiclamp" class="tab-pane">
            <div class="imp-lamp-altar" style="max-width: 900px; margin: 0 auto;">
              <div class="imp-lamp-centerpiece">
                <div class="imp-lamp-vessel">🪔</div>
                <h3 style="margin: 0; font-family: 'Cinzel', serif; font-size: 20px; color: var(--imp-text-gold-bright, #f5df93); letter-spacing: 0.08em; text-shadow: 0 0 12px rgba(212,167,68,0.4);">
                  亞丁魔法神燈
                </h3>
                <p style="margin: 0; font-size: 12px; color: var(--imp-text-muted, #94a3b8); max-width: 520px; line-height: 1.5;">
                  角色在放置戰鬥中擊敗怪物時，魔法神燈會累積秘法能量。抽取魔法卡牌即可依等級獲得大量 EXP 與 SP！
                </p>
              </div>

              <div style="max-width: 480px; margin: 16px auto; background: rgba(8,11,18,0.7); border: 1px solid var(--imp-border-subtle, rgba(212,167,68,0.25)); border-radius: 8px; padding: 12px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px; font-family: 'Cinzel', serif; font-weight: 700;">
                  <span style="color: #ffd877;">神秘充能</span>
                  <span id="lamp-count-label" style="color: #67e8f9; font-family: 'IBM Plex Mono', monospace;">0 個神燈可用</span>
                </div>
                <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.6); border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06);">
                  <div class="lamp-progress-bar" id="lamp-progress-bar" style="height: 100%; background: linear-gradient(90deg, #3b82f6, #a855f7, #f59e0b); width: 0%; border-radius: 4px; transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);"></div>
                </div>
              </div>

              <div style="margin: 16px 0;">
                <button class="imp-btn-primary" id="use-magic-lamp-btn" style="font-size: 14px; padding: 10px 28px; box-shadow: 0 4px 18px rgba(212,167,68,0.3);">
                  🪔 召喚魔法卡牌
                </button>
              </div>

              <div class="imp-lamp-card-reveal-area" id="lamp-result-card"></div>
            </div>
          </div>

          <!-- Quests & Battle Pass Tab -->
          <div id="tab-quests" class="tab-pane">
            <div class="quests-header-frame">
              <div class="quests-title-group">
                <span class="quests-window-icon">🎯</span>
                <span class="quests-window-title">任務看板與金幣通行證</span>
              </div>
              <div class="quests-reset-info">
                <span id="daily-quest-timer" class="reset-badge">⏰ 每日更新</span>
              </div>
            </div>

            <!-- Battle Pass Banner & XP Bar -->
            <div class="pass-banner-container">
              <div class="pass-header-info">
                <div class="pass-level-badge">
                  <span class="pass-lvl-num" id="pass-level-text">等級 1</span>
                  <span class="pass-title" id="pass-status-text">免費戰鬥通行證</span>
                </div>
                <div class="pass-xp-info">
                  <span id="pass-xp-text">0 / 100 通行證 XP</span>
                  <button id="unlock-premium-pass-btn" class="inv-batch-btn gold-glow-btn" title="購買本賽季官方高級通行證">👑 取得高級通行證（R$ 15,00）</button>
                </div>
              </div>
              <div class="bar-container pass-bar-container">
                <div id="pass-xp-bar" class="bar xp" style="width:0%"></div>
              </div>
            </div>

            <!-- Battle Pass Rewards Track -->
            <div class="pane-section" style="margin-top: 10px;">
              <h3>🎟️ 賽季獎勵軌道</h3>
              <div id="pass-track-list" class="pass-track-list"></div>
            </div>

            <!-- Daily Quests Section -->
            <div class="pane-section">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3>📜 每日任務（每 24 小時更新）</h3>
                <span id="daily-progress-badge" class="sp-pill" style="font-size:11px;">0/4 已完成</span>
              </div>
              <div id="daily-quests-list" class="quests-list" style="margin-top:10px;"></div>
            </div>

            <!-- Weekly Quests Section -->
            <div class="pane-section">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3>📅 每週任務（每週一更新）</h3>
                <span id="weekly-progress-badge" class="sp-pill" style="font-size:11px;">0/3 已完成</span>
              </div>
              <div id="weekly-quests-list" class="quests-list" style="margin-top:10px;"></div>
            </div>
          </div>

          <!-- Tower of Insolence Tab -->
          <div id="tab-tower" class="tab-pane">
            <div class="tower-header-frame">
              <div class="tower-title-group">
                <span class="tower-window-icon">🏰</span>
                <span class="tower-window-title">傲慢之塔</span>
              </div>
              <div class="tower-reset-info">
                <button id="tower-sweep-btn" class="inv-batch-btn gold-glow-btn" title="領取已攻略樓層全部獎勵的 50%">🧹 每日掃蕩</button>
              </div>
            </div>

            <!-- Tower Stats & Passive Bonus Banner -->
            <div class="tower-banner-container">
              <div class="tower-header-info">
                <div class="tower-level-badge">
                  <span class="tower-lvl-num" id="tower-highest-floor-text">目前樓層：0 / 100</span>
                  <span class="tower-title" id="tower-bonus-text">被動加成：+0% ATK、DEF 與 MATK</span>
                </div>
                <div class="tower-action-group">
                  <button id="tower-challenge-btn" class="action-btn action-btn--primary" style="font-size:12px; font-weight:bold;">⚔️ 挑戰樓層 <span id="tower-next-floor-num">1</span></button>
                </div>
              </div>
            </div>

            <!-- Current Floor Challenge Preview Card -->
            <div class="pane-section">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3>🗡️ 下一場挑戰詳情</h3>
                <span id="tower-floor-recommend" class="sp-pill" style="font-size:11px;">需求等級：10</span>
              </div>
              <div id="tower-floor-details-card" class="tower-details-card" style="margin-top:10px;"></div>
            </div>

            <!-- Floors Map Grid (1 to 100) -->
            <div class="pane-section" style="margin-top: 10px;">
              <h3>🏰 攻塔進度（1～100 樓）</h3>
              <div id="tower-floors-grid" class="tower-floors-grid" style="margin-top:10px;"></div>
            </div>
          </div>

          <!-- Warehouse Tab Pane (Imperial Vault 50/50 Split View: Mochila ↔ Baú) -->
          <div id="tab-warehouse" class="tab-pane">
            <div class="imp-vault-split" style="max-width: 1200px; margin: 0 auto;">
              <!-- Left Side: Inventory (Mochila) -->
              <div class="imp-vault-panel">
                <div class="imp-vault-panel-header">
                  <div style="flex: 1; margin-right: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <h4 style="margin: 0; font-family: 'Cinzel', serif; color: var(--imp-text-gold-bright, #ffd877); font-size: 14px; font-weight: bold; display: flex; align-items: center; gap: 6px;">
                        🎒 背包
                      </h4>
                      <span id="wh-inv-count" style="font-size: 11px; color: var(--imp-text-muted, #94a3b8); font-family: 'IBM Plex Mono', monospace;">0/150 格</span>
                    </div>
                    <div class="imp-slot-gauge-bar">
                      <div id="wh-inv-gauge-fill" class="imp-slot-gauge-fill" style="width: 0%;"></div>
                    </div>
                  </div>
                  <button id="deposit-all-btn" class="imp-btn-primary" style="font-size: 11px; padding: 6px 14px; font-weight: bold; white-space: nowrap;" onclick="depositAllToWarehouse()">📥 全部存入</button>
                </div>
                <div id="wh-inventory-grid" class="l2inv-slots-grid" style="flex: 1; max-height: 480px; min-height: 320px; overflow-y: auto; background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; border: 1px solid rgba(255,255,255,0.04);"></div>
              </div>

              <!-- Right Side: Warehouse (Baú) -->
              <div class="imp-vault-panel">
                <div class="imp-vault-panel-header">
                  <div style="flex: 1; margin-right: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <h4 style="margin: 0; font-family: 'Cinzel', serif; color: var(--imp-text-gold-bright, #ffd877); font-size: 14px; font-weight: bold; display: flex; align-items: center; gap: 6px;">
                        📦 角色倉庫
                      </h4>
                      <span id="wh-storage-count" style="font-size: 11px; color: var(--imp-text-muted, #94a3b8); font-family: 'IBM Plex Mono', monospace;">0/100 格</span>
                    </div>
                    <div class="imp-slot-gauge-bar">
                      <div id="wh-storage-gauge-fill" class="imp-slot-gauge-fill" style="width: 0%;"></div>
                    </div>
                  </div>
                  <button id="withdraw-all-btn" class="imp-btn-primary" style="font-size: 11px; padding: 6px 14px; font-weight: bold; white-space: nowrap;" onclick="withdrawAllFromWarehouse()">📤 全部取出</button>
                </div>
                <div id="wh-storage-grid" class="l2inv-slots-grid" style="flex: 1; max-height: 480px; min-height: 320px; overflow-y: auto; background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; border: 1px solid rgba(255,255,255,0.04);"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </main>

    <!-- Death Modal -->
    <div id="death-modal" class="modal">
      <div class="modal-content">
        <h2>你在戰鬥中被擊敗了！</h2>
        <p id="death-penalty">你將損失 <span id="xp-loss">0</span> XP。</p>
        <div class="modal-actions">
          <button id="res-free" class="action-btn">復活（免費，-20% XP）</button>
          <button id="res-scroll" class="action-btn">使用卷軸（-10% XP）</button>
        </div>
      </div>
    </div>

    <!-- Saga Unlock Modal -->
    <div id="saga-modal" class="modal">
      <div class="modal-content">
        <h2 id="saga-title">新的篇章已解鎖！</h2>
        <p id="saga-desc">新的區域與危險正等著你。</p>
        <button id="saga-ok" class="action-btn">繼續</button>
      </div>
    </div>

    <!-- Offline Progress Modal -->
    <div id="offline-modal" class="modal">
      <div class="modal-content">
        <h2 id="offline-title">⌛ 歡迎回來！</h2>
        <p id="offline-desc">離線期間，你的角色仍持續在亞丁訓練。</p>
        <div id="offline-rewards" style="margin: 14px 0; font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--gilt-bright);"></div>
        <button id="offline-ok" class="action-btn action-btn--primary" onclick="window.closeOfflineModal && window.closeOfflineModal()">領取獎勵 ⚔️</button>
      </div>
    </div>

    <!-- Daily Check-in Rewards Modal (28 Days) -->
    <div id="daily-reward-modal" class="modal">
      <div class="modal-content" style="max-width:720px; width:95%; max-height:90vh; overflow-y:auto; background:linear-gradient(180deg, #181410 0%, #0d0a08 100%); border:2px solid rgba(212, 167, 68, 0.4); box-shadow:0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(212,167,68,0.15); border-radius:12px; padding:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; border-bottom:1px solid rgba(212,167,68,0.2); padding-bottom:10px;">
          <div>
            <h2 style="margin:0; font-family:'Cinzel',serif; color:#fef08a; font-size:20px; display:flex; align-items:center; gap:8px;">
              🎁 簽到日曆 — 每日獎勵
            </h2>
            <p style="margin:4px 0 0 0; font-size:12px; color:#d1d5db;">每天登入即可取得卷軸、首領物品與亞丁財富！</p>
          </div>
          <button id="close-daily-reward-btn" style="background:transparent; border:none; color:#9ca3af; font-size:20px; cursor:pointer; padding:0 6px;" onclick="window.closeDailyRewardModal && window.closeDailyRewardModal()">✕</button>
        </div>

        <!-- Streak & Milestone Info Bar -->
        <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(212,167,68,0.3); border-radius:8px; padding:10px 14px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:18px;">🔥</span>
            <div>
              <div style="font-size:11px; color:#9ca3af; text-transform:uppercase; font-weight:bold;">連續紀錄</div>
              <div id="daily-streak-text" style="font-size:14px; font-weight:bold; color:#f59e0b;">1 Dia de 榮耀</div>
            </div>
          </div>
          <div id="daily-status-badge" style="font-size:12px; font-weight:bold; padding:4px 12px; border-radius:12px; background:rgba(34,197,94,0.2); border:1px solid rgba(34,197,94,0.5); color:#4ade80;">
            ✨ 今日獎勵可領取！
          </div>
        </div>

        <!-- 28-Day Grid -->
        <div id="daily-rewards-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(85px, 1fr)); gap:8px; margin-bottom:16px;">
          <!-- Rendered dynamically -->
        </div>

        <!-- Modal Footer Actions -->
        <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid rgba(212,167,68,0.2); padding-top:14px;">
          <button id="daily-claim-btn" class="action-btn action-btn--primary" style="font-family:'Cinzel',serif; font-size:13px; font-weight:bold; padding:8px 24px;" onclick="window.claimDailyRewardAction && window.claimDailyRewardAction()">
            ✨ 領取今日禮物
          </button>
        </div>
      </div>
    </div>

    <!-- Contacts, Friends & Mentorship Modal -->
    <div id="referral-modal" class="modal"></div>

    <!-- Starter Journey Modal (Jornada dos Pioneiros - 7 Passos) -->
    <div id="starter-journey-modal" class="modal">
      <div class="modal-content" style="max-width:760px; width:95%; max-height:90vh; overflow-y:auto; background:linear-gradient(180deg, #181410 0%, #0d0a08 100%); border:2px solid rgba(212, 167, 68, 0.5); box-shadow:0 10px 40px rgba(0,0,0,0.8), 0 0 24px rgba(212,167,68,0.2); border-radius:12px; padding:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; border-bottom:1px solid rgba(212,167,68,0.25); padding-bottom:10px;">
          <div>
            <h2 style="margin:0; font-family:'Cinzel',serif; color:#fef08a; font-size:20px; display:flex; align-items:center; gap:8px;">
              🧭 亞丁先驅者之旅
            </h2>
            <p style="margin:4px 0 0 0; font-size:12px; color:#d1d5db;">完成戰士的 7 個基礎步驟，鍛造命運並取得傳說獎勵！</p>
          </div>
          <button style="background:transparent; border:none; color:#9ca3af; font-size:20px; cursor:pointer; padding:0 6px;" onclick="window.closeStarterJourneyModal && window.closeStarterJourneyModal()">✕</button>
        </div>

        <!-- Progress Overview Banner -->
        <div id="starter-journey-overview" style="background:rgba(0,0,0,0.4); border:1px solid rgba(212,167,68,0.3); border-radius:8px; padding:12px 16px; margin-bottom:16px;">
          <!-- Rendered dynamically -->
        </div>

        <!-- 7 Steps List -->
        <div id="starter-journey-list" style="display:flex; flex-direction:column; gap:10px; margin-bottom:14px;">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </div>

    <!-- LiveOps Active Event Modal -->
    <div id="liveops-event-modal" class="modal">
      <div class="modal-content" style="max-width:600px; width:95%; max-height:85vh; overflow-y:auto; background:linear-gradient(180deg, #16121e 0%, #0b0912 100%); border:2px solid rgba(234, 179, 8, 0.5); box-shadow:0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(234,179,8,0.25); border-radius:12px; padding:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; border-bottom:1px solid rgba(234,179,8,0.2); padding-bottom:10px;">
          <div>
            <h2 id="liveops-modal-title" style="margin:0; font-family:'Cinzel',serif; color:#fde047; font-size:18px; display:flex; align-items:center; gap:8px;">
              🌟 伺服器特別活動
            </h2>
            <p id="liveops-modal-subtitle" style="margin:4px 0 0 0; font-size:12px; color:#cbd5e1;">亞丁目前有活動加成與倍率生效！</p>
          </div>
          <button style="background:transparent; border:none; color:#9ca3af; font-size:20px; cursor:pointer; padding:0 6px;" onclick="window.closeLiveOpsModal && window.closeLiveOpsModal()">✕</button>
        </div>

        <div id="liveops-modal-content" style="font-size:13px; line-height:1.6; color:#e2e8f0;">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </div>

        <!-- Macro Idle & Automation Settings Modal -->
    <div id="macro-settings-modal" class="modal">
      <div class="modal-content" style="max-width:740px; width:95%; max-height:88vh; overflow-y:auto; background:linear-gradient(180deg, #181512 0%, #0d0a08 100%); border:2px solid rgba(212, 167, 68, 0.5); box-shadow:0 10px 40px rgba(0,0,0,0.8), 0 0 24px rgba(212,167,68,0.2); border-radius:12px; padding:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; border-bottom:1px solid rgba(212,167,68,0.25); padding-bottom:10px;">
          <div>
            <h2 style="margin:0; font-family:'Cinzel',serif; color:#fef08a; font-size:19px; display:flex; align-items:center; gap:8px;">
              ⚙️ 放置巨集與自動化中心
            </h2>
            <p style="margin:4px 0 0 0; font-size:12px; color:#94a3b8;">調整藥水（HP／MP）觸發條件、設定技能施放順序，並配置 AFK 自動回收過濾器。</p>
          </div>
          <button style="background:transparent; border:none; color:#9ca3af; font-size:20px; cursor:pointer; padding:0 6px;" onclick="window.closeMacroSettingsModal && window.closeMacroSettingsModal()">✕</button>
        </div>

        <div id="macro-settings-content" style="display:flex; flex-direction:column; gap:16px;">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </div>

        <!-- World Boss Global Incursion Modal -->
    <div id="worldboss-modal" class="modal">
      <div class="modal-content" style="max-width:760px; width:95%; max-height:88vh; overflow-y:auto; background:linear-gradient(180deg, #1b0e0e 0%, #0c0606 100%); border:2px solid rgba(239, 68, 68, 0.6); box-shadow:0 10px 40px rgba(0,0,0,0.85), 0 0 25px rgba(239,68,68,0.3); border-radius:12px; padding:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; border-bottom:1px solid rgba(239,68,68,0.3); padding-bottom:10px;">
          <div>
            <h2 id="worldboss-modal-title" style="margin:0; font-family:'Cinzel',serif; color:#fca5a5; font-size:20px; display:flex; align-items:center; gap:8px;">
              🚨 世界首領全球突襲
            </h2>
            <p id="worldboss-modal-subtitle" style="margin:4px 0 0 0; font-size:12px; color:#cbd5e1;">與亞丁的巨龍及千年霸主展開大型合作戰鬥。</p>
          </div>
          <button style="background:transparent; border:none; color:#9ca3af; font-size:20px; cursor:pointer; padding:0 6px;" onclick="window.closeWorldBossModal && window.closeWorldBossModal()">✕</button>
        </div>

        <div id="worldboss-modal-content" style="display:flex; flex-direction:column; gap:14px;">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </div>

    <!-- Game Progression & Systems Guide Modal -->
    <div id="guide-modal" class="modal">
      <div class="modal-content guide-modal-box" style="max-width:780px; max-height:85vh; overflow-y:auto; background:#0f1219; border:1px solid #d4a744; border-radius:12px; padding:20px; box-shadow:0 0 30px rgba(0,0,0,0.85); color:#f8fafc; font-family:'Cinzel',serif;">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(212,175,55,0.3); padding-bottom:12px;">
          <h2 style="margin:0; color:#ffd700; font-size:18px; display:flex; align-items:center; gap:8px;">
            <span>📖 冒險者與亞丁成長指南</span>
          </h2>
          <button id="close-guide-modal-btn" class="modal-close-x" style="background:transparent; border:none; color:#94a3b8; font-size:20px; cursor:pointer;" onclick="window.closeGuideModal && window.closeGuideModal()">✕</button>
        </div>
        
        <!-- Guide Tabs -->
        <div style="display:flex; gap:8px; margin:14px 0; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px; flex-wrap:wrap;">
          <button class="inv-batch-btn active" id="guide-tab-btn-journey" onclick="window.switchGuideTab('journey')">🗺️ 等級旅程</button>
          <button class="inv-batch-btn" id="guide-tab-btn-forge" onclick="window.switchGuideTab('forge')">🔨 鍛造與市場</button>
          <button class="inv-batch-btn" id="guide-tab-btn-codex" onclick="window.switchGuideTab('codex')">🃏 卡片與娃娃</button>
          <button class="inv-batch-btn" id="guide-tab-btn-combat" onclick="window.switchGuideTab('combat')">⚔️ 戰鬥配置與 4★</button>
          <button class="inv-batch-btn" id="guide-tab-btn-sevensigns" onclick="window.switchGuideTab('sevensigns')">🏛️ 七封印與貴族</button>
        </div>

        <div id="guide-content" style="font-size:13px; line-height:1.6; color:#cbd5e1;"></div>

        <div class="modal-actions" style="margin-top:20px; text-align:right; border-top:1px solid rgba(255,255,255,0.1); padding-top:12px;">
          <button class="action-btn action-btn--primary" onclick="window.closeGuideModal && window.closeGuideModal()">Entendido! ⚔️</button>
        </div>
      </div>
    </div>

    <!-- Class Transfer Modal -->
    <div id="class-transfer-modal" class="modal">
      <div class="modal-content class-transfer-box">
        <h2 id="class-modal-heading">📜 轉職儀式</h2>
        <p class="modal-sub">選擇你在亞丁的最終成長路線。晉升後可獲得新屬性、被動加成並解鎖高階技能！</p>
        <div id="class-options-container" class="class-options-container"></div>
        <div class="modal-actions" style="margin-top: 16px;">
          <button id="close-class-modal-btn" class="action-btn">關閉</button>
        </div>
      </div>
    </div>

    <!-- Symbol Maker (Dyes & Henna Tattoos) Modal -->
    <div id="symbol-maker-modal" class="modal">
      <div class="modal-content" style="max-width: 680px; background: linear-gradient(180deg, #140e0a 0%, #0a0705 100%); border: 2px solid var(--border-gilt); border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.85); padding: 20px;">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(212,175,55,0.3); padding-bottom:12px; margin-bottom:16px;">
          <h2 style="margin:0; font-family:'Cinzel',serif; color:#ffd877; font-size:18px; display:flex; align-items:center; gap:8px;">
            <span>🎭 符號與染料紋身</span>
          </h2>
          <button id="close-symbol-modal-btn" class="modal-close-x" style="background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer;">✕</button>
        </div>
        <p style="font-size:12px; color:#cbd5e1; margin-bottom:14px; line-height:1.4;">
          最多可在角色身上刻印 <strong>3 個神聖染料符號</strong>，用來調整主要屬性（STR、DEX、CON、INT、WIT、MEN）。<em>亞丁規則：任何單一屬性的淨加成不得超過 +5。</em>
        </p>

        <!-- Current Tattoos Slots -->
        <div style="font-family:'Cinzel',serif; font-size:13px; font-weight:bold; color:#fde047; margin-bottom:8px;">✨ Seus Símbolos Gravados (Slots de Linhagem)</div>
        <div id="symbol-slots-container" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(190px, 1fr)); gap:10px; margin-bottom:16px;"></div>

        <!-- Net Modifiers Summary Bar -->
        <div id="symbol-net-summary" style="background:rgba(0,0,0,0.6); border:1px solid rgba(212,175,55,0.3); border-radius:8px; padding:10px 14px; margin-bottom:16px; font-size:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;"></div>

        <!-- Available Hennas for Inscription -->
        <div style="font-family:'Cinzel',serif; font-size:13px; font-weight:bold; color:#93c5fd; margin-bottom:8px;">📜 背包／市場可用的高階染料</div>
        <div id="symbol-hennas-list" style="display:flex; flex-direction:column; gap:8px; max-height:220px; overflow-y:auto; padding-right:4px;"></div>
      </div>
    </div>

    <!-- Pet Manager Modal -->
    <div id="pet-manager-modal" class="modal">
      <div class="modal-content" style="max-width: 680px; background: linear-gradient(180deg, #140e0a 0%, #0a0705 100%); border: 2px solid var(--border-gilt); border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.85); padding: 20px;">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(212,175,55,0.3); padding-bottom:12px; margin-bottom:16px;">
          <h2 style="margin:0; font-family:'Cinzel',serif; color:#ffd877; font-size:18px; display:flex; align-items:center; gap:8px;">
            <span>🐾 亞丁夥伴與寵物聖所</span>
          </h2>
          <button id="close-pet-modal-btn" class="modal-close-x" style="background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer;">✕</button>
        </div>
        <p style="font-size:12px; color:#cbd5e1; margin-bottom:14px; line-height:1.4;">
          收服並召喚忠實夥伴與你並肩作戰！寵物會隨角色一起成長（Lv. 1～60），在戰鬥回合中攻擊，並提供被動加成與專屬支援技能。
        </p>

        <!-- Active Pet Overview -->
        <div id="pet-active-container" style="margin-bottom:16px;"></div>

        <!-- Available / Owned Pets List -->
        <div style="font-family:'Cinzel',serif; font-size:13px; font-weight:bold; color:#93c5fd; margin-bottom:8px;">📜 亞丁夥伴圖鑑</div>
        <div id="pet-list-container" style="display:flex; flex-direction:column; gap:10px; max-height:260px; overflow-y:auto; padding-right:4px;"></div>
      </div>
    </div>

    <!-- Solo Instances (Kamaloka & Pailaka) Modal -->
    <div id="solo-instances-modal" class="modal">
      <div class="modal-content" style="max-width: 720px; background: linear-gradient(180deg, #0e121e 0%, #060913 100%); border: 2px solid #6366f1; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.85); padding: 20px;">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(99,102,241,0.3); padding-bottom:12px; margin-bottom:16px;">
          <h2 style="margin:0; font-family:'Cinzel',serif; color:#a5b4fc; font-size:18px; display:flex; align-items:center; gap:8px;">
            <span>🌀 Fendas Dimensionais: Kamaloka &amp; Pailaka</span>
          </h2>
          <button id="close-instances-modal-btn" class="modal-close-x" style="background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer;">✕</button>
        </div>
        <p style="font-size:12px; color:#cbd5e1; margin-bottom:14px; line-height:1.4;">
          每天挑戰單人次元首領地城。每道裂隙提供 <strong>每日 1 次免費入場</strong>，可快速獲得 XP、大量金幣、SP，以及保證等級的裝備獎勵！
        </p>

        <div id="instances-list-container" style="display:flex; flex-direction:column; gap:10px; max-height:360px; overflow-y:auto; padding-right:4px;"></div>
      </div>
    </div>

    <!-- Manor Manager Modal -->
    <div id="manor-manager-modal" class="modal">
      <div class="modal-content" style="max-width: 680px; background: linear-gradient(180deg, #101c13 0%, #07100a 100%); border: 2px solid #22c55e; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.85); padding: 20px;">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(34,197,94,0.3); padding-bottom:12px; margin-bottom:16px;">
          <h2 style="margin:0; font-family:'Cinzel',serif; color:#86efac; font-size:18px; display:flex; align-items:center; gap:8px;">
            <span>🌾 莊園管理與農作收成</span>
          </h2>
          <button id="close-manor-modal-btn" class="modal-close-x" style="background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer;">✕</button>
        </div>
        <p style="font-size:12px; color:#cbd5e1; margin-bottom:14px; line-height:1.4;">
          在亞丁各領地（古魯丁、狄恩、奇岩）購買種子。於當地狩獵怪物時，角色會播種並收成作物，可在城堡兌換 <strong>稀有鍛造材料（恩尼亞、米索莉合金、純化研磨劑）</strong>！
        </p>

        <div id="manor-provinces-list" style="display:flex; flex-direction:column; gap:12px; max-height:360px; overflow-y:auto; padding-right:4px;"></div>
      </div>
    </div>

    <!-- GM Admin Control Panel Modal -->
    <div id="admin-modal" class="modal">
      <div class="modal-content admin-modal-box">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(212,167,68,0.4); padding-bottom:8px; margin-bottom:10px;">
          <div>
            <h2 style="margin:0; font-family:'Cinzel',serif; font-size:16px; color:#ffd700; display:flex; align-items:center; gap:8px;">
              👑 GM 管理指揮中心
            </h2>
            <div id="admin-live-rates-summary" style="font-size:11px; color:#38bdf8; font-weight:600; margin-top:3px;">
              目前倍率：XP x1.0 · SP x1.0 · 金幣 x1.0 · 掉落 x1.0 · 掃蕩 x1.0 · 強化 x1.0
            </div>
          </div>
          <button id="close-admin-modal-btn" class="modal-close-x">✕</button>
        </div>

        <!-- Admin Navigation Tabs -->
        <nav class="admin-nav-tabs" style="display:flex; gap:4px; margin-bottom:12px; border-bottom:1px solid rgba(212,167,68,0.2); padding-bottom:6px; overflow-x:auto; -webkit-overflow-scrolling:touch;">
          <button class="admin-tab-btn active" data-admin-tab="rates">⚡ 伺服器倍率</button>
          <button class="admin-tab-btn" data-admin-tab="cap">⏳ 等級上限與賽季</button>
          <button class="admin-tab-btn" data-admin-tab="spawner">🎁 物品產生器</button>
          <button class="admin-tab-btn" data-admin-tab="player">📊 資源與等級</button>
          <button class="admin-tab-btn" data-admin-tab="cheats">⚔️ 測試與戰鬥</button>
        </nav>

        <div class="admin-tabs-container">
          <!-- TAB 1: SERVER RATES CONTROLLER -->
          <div id="admin-tab-rates" class="admin-tab-panel active">
            <!-- Quick Rate Presets -->
            <div style="background:rgba(20,24,35,0.7); border:1px solid rgba(212,167,68,0.3); border-radius:6px; padding:10px; margin-bottom:12px;">
              <div style="font-size:12px; font-weight:bold; color:#ffd877; margin-bottom:8px; font-family:'Cinzel',serif;">
                🚀 伺服器快速倍率預設（一鍵）
              </div>
              <div class="admin-btn-group" style="display:flex; flex-wrap:wrap; gap:6px;">
                <button class="admin-preset-btn" data-rate-preset="classic">🛡️ 經典原始倍率（1x）</button>
                <button class="admin-preset-btn" data-rate-preset="aden">⚔️ 亞丁動態倍率（3x）</button>
                <button class="admin-preset-btn" data-rate-preset="mid">🔥 中倍率（10x）</button>
                <button class="admin-preset-btn" data-rate-preset="high">👑 高倍率（50x）</button>
                <button class="admin-preset-btn" data-rate-preset="turbo">⚡ 極速 PvP（100x）</button>
                <button class="admin-preset-btn danger" data-rate-preset="reset" style="margin-left:auto;">🔄 重設（1x）</button>
              </div>
            </div>

            <!-- Detailed Rates Grid -->
            <div class="admin-rates-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:10px;">
              <!-- 1. XP Rate -->
              <div class="admin-rate-card" data-rate-key="xp">
                <div class="rate-card-header">
                  <span class="rate-title">🌟 Rate de Experiência (XP)</span>
                  <span id="rate-val-xp" class="rate-badge">x1.0</span>
                </div>
                <div class="rate-btn-row">
                  <button class="rate-pill-btn" data-rate-set="xp:1">1x</button>
                  <button class="rate-pill-btn" data-rate-set="xp:2">2x</button>
                  <button class="rate-pill-btn" data-rate-set="xp:5">5x</button>
                  <button class="rate-pill-btn" data-rate-set="xp:10">10x</button>
                  <button class="rate-pill-btn" data-rate-set="xp:20">20x</button>
                  <button class="rate-pill-btn" data-rate-set="xp:50">50x</button>
                  <button class="rate-pill-btn" data-rate-set="xp:100">100x</button>
                </div>
                <div class="rate-custom-row">
                  <input type="number" id="admin-rate-inp-xp" class="admin-num-input" placeholder="倍率（例如：15）" min="0.1" max="1000" step="0.5" />
                  <button class="admin-apply-btn" data-rate-apply="xp">套用</button>
                </div>
              </div>

              <!-- 2. SP Rate -->
              <div class="admin-rate-card" data-rate-key="sp">
                <div class="rate-card-header">
                  <span class="rate-title">✦ 技能點數倍率（SP）</span>
                  <span id="rate-val-sp" class="rate-badge">x1.0</span>
                </div>
                <div class="rate-btn-row">
                  <button class="rate-pill-btn" data-rate-set="sp:1">1x</button>
                  <button class="rate-pill-btn" data-rate-set="sp:2">2x</button>
                  <button class="rate-pill-btn" data-rate-set="sp:5">5x</button>
                  <button class="rate-pill-btn" data-rate-set="sp:10">10x</button>
                  <button class="rate-pill-btn" data-rate-set="sp:20">20x</button>
                  <button class="rate-pill-btn" data-rate-set="sp:50">50x</button>
                  <button class="rate-pill-btn" data-rate-set="sp:100">100x</button>
                </div>
                <div class="rate-custom-row">
                  <input type="number" id="admin-rate-inp-sp" class="admin-num-input" placeholder="倍率（例如：15）" min="0.1" max="1000" step="0.5" />
                  <button class="admin-apply-btn" data-rate-apply="sp">套用</button>
                </div>
              </div>

              <!-- 3. 金幣 Rate -->
              <div class="admin-rate-card" data-rate-key="adena">
                <div class="rate-card-header">
                  <span class="rate-title">🪙 Rate de 金幣 (Gold)</span>
                  <span id="rate-val-adena" class="rate-badge">x1.0</span>
                </div>
                <div class="rate-btn-row">
                  <button class="rate-pill-btn" data-rate-set="adena:1">1x</button>
                  <button class="rate-pill-btn" data-rate-set="adena:2">2x</button>
                  <button class="rate-pill-btn" data-rate-set="adena:5">5x</button>
                  <button class="rate-pill-btn" data-rate-set="adena:10">10x</button>
                  <button class="rate-pill-btn" data-rate-set="adena:25">25x</button>
                  <button class="rate-pill-btn" data-rate-set="adena:50">50x</button>
                  <button class="rate-pill-btn" data-rate-set="adena:100">100x</button>
                </div>
                <div class="rate-custom-row">
                  <input type="number" id="admin-rate-inp-adena" class="admin-num-input" placeholder="倍率（例如：20）" min="0.1" max="1000" step="0.5" />
                  <button class="admin-apply-btn" data-rate-apply="adena">套用</button>
                </div>
              </div>

              <!-- 4. Drop Rate -->
              <div class="admin-rate-card" data-rate-key="drop">
                <div class="rate-card-header">
                  <span class="rate-title">📦 掉落倍率（物品與裝備）</span>
                  <span id="rate-val-drop" class="rate-badge">x1.0</span>
                </div>
                <div class="rate-btn-row">
                  <button class="rate-pill-btn" data-rate-set="drop:1">1x</button>
                  <button class="rate-pill-btn" data-rate-set="drop:2">2x</button>
                  <button class="rate-pill-btn" data-rate-set="drop:3">3x</button>
                  <button class="rate-pill-btn" data-rate-set="drop:5">5x</button>
                  <button class="rate-pill-btn" data-rate-set="drop:10">10x</button>
                  <button class="rate-pill-btn" data-rate-set="drop:20">20x</button>
                  <button class="rate-pill-btn" data-rate-set="drop:50">50x</button>
                </div>
                <div class="rate-custom-row">
                  <input type="number" id="admin-rate-inp-drop" class="admin-num-input" placeholder="倍率（例如：5）" min="0.1" max="1000" step="0.5" />
                  <button class="admin-apply-btn" data-rate-apply="drop">套用</button>
                </div>
              </div>

              <!-- 5. Spoil & Craft Rate -->
              <div class="admin-rate-card" data-rate-key="spoil">
                <div class="rate-card-header">
                  <span class="rate-title">⚒️ Rate de Spoil &amp; Craft Points</span>
                  <span id="rate-val-spoil" class="rate-badge">x1.0</span>
                </div>
                <div class="rate-btn-row">
                  <button class="rate-pill-btn" data-rate-set="spoil:1">1x</button>
                  <button class="rate-pill-btn" data-rate-set="spoil:2">2x</button>
                  <button class="rate-pill-btn" data-rate-set="spoil:3">3x</button>
                  <button class="rate-pill-btn" data-rate-set="spoil:5">5x</button>
                  <button class="rate-pill-btn" data-rate-set="spoil:10">10x</button>
                  <button class="rate-pill-btn" data-rate-set="spoil:20">20x</button>
                </div>
                <div class="rate-custom-row">
                  <input type="number" id="admin-rate-inp-spoil" class="admin-num-input" placeholder="倍率（例如：5）" min="0.1" max="1000" step="0.5" />
                  <button class="admin-apply-btn" data-rate-apply="spoil">套用</button>
                </div>
              </div>

              <!-- 6. Enchant Success Rate -->
              <div class="admin-rate-card" data-rate-key="enchant">
                <div class="rate-card-header">
                  <span class="rate-title">✨ 強化成功率（Enchant）</span>
                  <span id="rate-val-enchant" class="rate-badge">x1.0</span>
                </div>
                <div class="rate-btn-row">
                  <button class="rate-pill-btn" data-rate-set="enchant:1">1.0x（標準）</button>
                  <button class="rate-pill-btn" data-rate-set="enchant:1.2">1.2x (+20%)</button>
                  <button class="rate-pill-btn" data-rate-set="enchant:1.5">1.5x (+50%)</button>
                  <button class="rate-pill-btn" data-rate-set="enchant:2">2.0x (2x)</button>
                  <button class="rate-pill-btn" data-rate-set="enchant:3">3.0x（極高）</button>
                </div>
                <div class="rate-custom-row">
                  <input type="number" id="admin-rate-inp-enchant" class="admin-num-input" placeholder="倍率（例如：1.5）" min="0.1" max="10" step="0.1" />
                  <button class="admin-apply-btn" data-rate-apply="enchant">套用</button>
                </div>
              </div>

              <!-- 7. Spellbooks Drop Rate -->
              <div class="admin-rate-card" data-rate-key="book">
                <div class="rate-card-header">
                  <span class="rate-title">📖 技能書掉落倍率（1★～4★）</span>
                  <span id="rate-val-book" class="rate-badge">x1.0</span>
                </div>
                <div class="rate-btn-row">
                  <button class="rate-pill-btn" data-rate-set="book:1">1x</button>
                  <button class="rate-pill-btn" data-rate-set="book:2">2x</button>
                  <button class="rate-pill-btn" data-rate-set="book:5">5x</button>
                  <button class="rate-pill-btn" data-rate-set="book:10">10x</button>
                  <button class="rate-pill-btn" data-rate-set="book:20">20x</button>
                </div>
                <div class="rate-custom-row">
                  <input type="number" id="admin-rate-inp-book" class="admin-num-input" placeholder="倍率（例如：5）" min="0.1" max="100" step="0.5" />
                  <button class="admin-apply-btn" data-rate-apply="book">套用</button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2: LEVEL CAP & SEASONS -->
          <div id="admin-tab-cap" class="admin-tab-panel">
            <!-- Part A: 編年史s & Temporadas -->
            <div class="admin-section" style="background: rgba(15, 23, 42, 0.7); border: 1px solid #38bdf8; border-radius: 8px; padding: 14px; margin-bottom: 12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <h3 style="margin:0; color:#38bdf8; font-family:'Cinzel',serif; font-size:14px;">📜 正式編年史與賽季解鎖</h3>
                <span id="admin-current-season-badge" style="font-size:11px; padding:3px 8px; border-radius:4px; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; color:#38bdf8; font-weight:bold;">目前編年史：編年史 I（覺醒）</span>
              </div>
              <p style="font-size:11px; color:#cbd5e1; margin-bottom:10px; line-height:1.4;">
                切換伺服器編年史，以正式且永久的方式解鎖分頁、系統與限制：
              </p>
              <div class="admin-btn-group" style="display:flex; flex-wrap:wrap; gap:8px;">
                <button class="admin-btn" data-admin-cmd="setseason1">📜 編年史 1：覺醒（Lv.40）</button>
                <button class="admin-btn" data-admin-cmd="setseason2">🏰 編年史 2：血盟與城堡（Lv.75）</button>
                <button class="admin-btn" data-admin-cmd="setseason3">🏛️ 編年史 3：七封印（Lv.85）</button>
                <button class="admin-btn" data-admin-cmd="setseason4">🐉 編年史 4：High Five 與巨龍（Lv.120）</button>
              </div>
              <div style="margin-top:10px;">
                <button class="admin-btn primary" data-admin-cmd="unlockallseasons" style="width:100%; background:linear-gradient(135deg, #065f46, #047857); border-color:#34d399; color:#ecfdf5; font-size:12px; font-weight:bold; padding:9px 12px; cursor:pointer;">
                  🔓 解鎖全部編年史與分頁（100% 開放／測試模式）
                </button>
              </div>
            </div>

            <!-- Part B: Gestão de Level Cap -->
            <div class="admin-section" style="background: rgba(30, 20, 10, 0.6); border: 1px solid var(--border-gilt); border-radius: 8px; padding: 14px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <h3 style="margin:0; color:#ffd877; font-family:'Cinzel',serif; font-size:14px;">⏳ 伺服器等級上限管理</h3>
                <span id="admin-current-cap-badge" style="font-size:11px; padding:3px 8px; border-radius:4px; background:rgba(212,167,68,0.2); border:1px solid var(--border-gilt); color:#ffd877; font-weight:bold;">目前上限：等級 60</span>
              </div>
              <p style="font-size:11px; color:#cbd5e1; margin-bottom:10px;">設定伺服器所有玩家可達到的最高等級上限：</p>
              <div class="admin-btn-group" style="display:flex; flex-wrap:wrap; gap:8px;">
                <button class="admin-btn" data-admin-cmd="setcap40">上限 Lv.40（序章）</button>
                <button class="admin-btn" data-admin-cmd="setcap60">上限 Lv.60（階段 1）</button>
                <button class="admin-btn" data-admin-cmd="setcap75">上限 Lv.75（階段 2）</button>
                <button class="admin-btn" data-admin-cmd="setcap85">上限 Lv.85（階段 3－貴族）</button>
                <button class="admin-btn" data-admin-cmd="setcap100">上限 Lv.100（階段 4－帝國）</button>
                <button class="admin-btn" data-admin-cmd="setcap120" style="background:#7c2d12; border-color:#f59e0b; color:#fbbf24; font-weight:bold;">👑 上限 Lv.120（最高）</button>
              </div>
              <div class="admin-input-row" style="margin-top:10px; display:flex; gap:6px; align-items:center;">
                <input type="number" id="admin-cap-custom" class="admin-num-input" placeholder="自訂等級上限（例如：80）" min="1" max="120" style="flex:1;" />
                <button id="admin-apply-cap-btn" class="admin-btn primary">套用上限</button>
              </div>
            </div>
          </div>

          <!-- TAB 3: ITEM SPAWNER -->
          <div id="admin-tab-spawner" class="admin-tab-panel">
            <div class="admin-section admin-spawner">
              <h3>🎁 物品與遺物產生器</h3>
              <div class="spawner-fields">
                <div class="admin-search-wrapper" style="margin-bottom:8px; display:flex; gap:6px;">
                  <input 
                    type="text" 
                    id="admin-item-search" 
                    class="admin-num-input" 
                    placeholder="🔍 依物品名稱、類型或欄位搜尋（例如：bow、katana、dagger、ring）..." 
                    style="flex:1; padding:8px 12px; font-size:13px; border-radius:6px; background:rgba(0,0,0,0.5); border:1px solid #4a5568; color:#f8fafc;" 
                  />
                  <button type="button" id="admin-item-search-clear" class="admin-btn" style="padding:4px 10px; font-size:12px;" title="清除搜尋">清除</button>
                </div>
                <label for="admin-item-select" class="sr-only" style="display:none;">要產生的物品</label>
                <select id="admin-item-select" name="adminItemSelect" class="admin-select" aria-label="要產生的物品" style="width:100%; margin-bottom:8px;"></select>
                <div class="spawner-row">
                  <label for="admin-item-qty">數量： <input type="number" id="admin-item-qty" name="adminItemQty" value="1" min="1" max="999" class="admin-num-input" aria-label="數量" style="width:65px;" /></label>
                  <label for="admin-item-rarity">稀有度： 
                    <select id="admin-item-rarity" name="adminItemRarity" class="admin-select" aria-label="物品稀有度">
                      <option value="common">一般</option>
                      <option value="uncommon">非凡</option>
                      <option value="rare">稀有</option>
                      <option value="epic">史詩（紫色）</option>
                      <option value="legendary">傳說（金色）</option>
                      <option value="mythic">神話（紅色）</option>
                      <option value="s">S 級神聖</option>
                    </select>
                  </label>
                  <label for="admin-item-enchant">強化： 
                    <select id="admin-item-enchant" name="adminItemEnchant" class="admin-select" aria-label="強化等級">
                      <option value="0">+0</option>
                      <option value="3">+3</option>
                      <option value="7">+7</option>
                      <option value="10">+10</option>
                      <option value="16">+16（L2 經典）</option>
                      <option value="20">+20</option>
                      <option value="30">+30（神級）</option>
                    </select>
                  </label>
                  <label for="admin-item-affix">詞綴： 
                    <select id="admin-item-affix" name="adminItemAffix" class="admin-select" aria-label="物品詞綴">
                      <option value="roll">🎲 隨機稀有度</option>
                      <option value="none">無詞綴</option>
                      <option value="crit_boost">✦ +% 暴擊</option>
                      <option value="eva_boost">✦ +% 迴避</option>
                      <option value="lifesteal_boost">✦ +% 吸血</option>
                      <option value="atk_boost">✦ +% 攻擊</option>
                      <option value="speed_boost">✦ +% 攻擊速度</option>
                      <option value="boss_dmg">✦ +% 對首領傷害</option>
                      <option value="on_kill_heal">✦ +% 擊殺恢復</option>
                      <option value="stun_chance">✦ % 暈眩機率</option>
                    </select>
                  </label>
                </div>
                <div class="spawner-check-row" style="margin-top:6px; display:flex; align-items:center; gap:8px;">
                  <label style="font-size:12px; color:var(--gilt-bright); cursor:pointer; display:flex; align-items:center; gap:6px;">
                    <input type="checkbox" id="admin-item-foundation" style="accent-color:#d4a744; width:15px; height:15px; cursor:pointer;" />
                    ✨ <strong>物品基底</strong>（稀有度神秘加成與專屬詞綴）
                  </label>
                </div>
                <button id="admin-spawn-btn" class="admin-btn primary" style="margin-top:10px; width:100%; padding:10px; font-weight:bold;">✨ 產生物品到背包</button>
              </div>
            </div>
          </div>

          <!-- TAB 4: PLAYER RESOURCES & LEVEL -->
          <div id="admin-tab-player" class="admin-tab-panel">
            <div class="admin-grid">
              <!-- Section 1: Level & XP Controls -->
              <div class="admin-section">
                <h3>📊 等級與經驗值（XP）</h3>
                <div class="admin-btn-group">
                  <button class="admin-btn" data-admin-cmd="level20">設為 Lv.20</button>
                  <button class="admin-btn" data-admin-cmd="level40">設為 Lv.40</button>
                  <button class="admin-btn" data-admin-cmd="level76">設為 Lv.76</button>
                  <button class="admin-btn" data-admin-cmd="level85">設為 Lv.85</button>
                  <button class="admin-btn" data-admin-cmd="level120" style="background:#7c2d12; border-color:#f59e0b; color:#fbbf24; font-weight:bold;">👑 設為 Lv.120</button>
                  <button class="admin-btn" data-admin-cmd="add1level">+1 等級</button>
                  <button class="admin-btn" data-admin-cmd="add5levels">+5 等級</button>
                </div>
                <div class="admin-input-row" style="margin-top:8px; display:flex; gap:6px;">
                  <input type="number" id="admin-xp-custom" class="admin-num-input" placeholder="XP 數量（例如：100000）" style="flex:1;" />
                  <button id="admin-add-xp-btn" class="admin-btn primary">+ 給予 XP</button>
                </div>
              </div>

              <!-- Section 2: Currency & Skill Points -->
              <div class="admin-section">
                <h3>🪙 經濟（金幣、SP 與 Aden Coins）</h3>
                <div class="admin-btn-group">
                  <button class="admin-btn" data-admin-cmd="gold1m">+1M 金幣</button>
                  <button class="admin-btn" data-admin-cmd="gold10m">+10M 金幣</button>
                  <button class="admin-btn" data-admin-cmd="sp5k">+5K SP</button>
                  <button class="admin-btn" data-admin-cmd="sp50k">+50K SP</button>
                  <button class="admin-btn" data-admin-cmd="ac500" style="background:#7c2d12; border-color:#f59e0b; color:#fbbf24;">+500 AC</button>
                  <button class="admin-btn" data-admin-cmd="ac2000" style="background:#7c2d12; border-color:#f59e0b; color:#fbbf24;">+2.000 AC</button>
                </div>
                <div class="admin-input-row" style="margin-top:8px; display:flex; gap:6px;">
                  <input type="number" id="admin-gold-custom" class="admin-num-input" placeholder="金幣數量（例如：5000000）" style="flex:1;" />
                  <button id="admin-add-gold-btn" class="admin-btn primary">+ 金幣</button>
                </div>
                <div class="admin-input-row" style="margin-top:6px; display:flex; gap:6px;">
                  <input type="number" id="admin-sp-custom" class="admin-num-input" placeholder="SP 數量（例如：25000）" style="flex:1;" />
                  <button id="admin-add-sp-btn" class="admin-btn primary">+ SP</button>
                </div>
                <div class="admin-input-row" style="margin-top:6px; display:flex; gap:6px;">
                  <input type="number" id="admin-ac-custom" class="admin-num-input" placeholder="Aden Coins 數量（例如：1000）" style="flex:1;" />
                  <button id="admin-add-ac-btn" class="admin-btn primary" style="background:linear-gradient(135deg,#b45309,#d97706); border-color:#f59e0b;">+ Aden Coins</button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 5: CHEATS & PROGRESSION -->
          <div id="admin-tab-cheats" class="admin-tab-panel">
            <div class="admin-section">
              <h3>⚡ 遊戲測試與快速進度</h3>
              <div class="admin-btn-group">
                <button class="admin-btn" data-admin-cmd="godmode">🛡️ 無敵模式（God Mode）</button>
                <button class="admin-btn" data-admin-cmd="healfull">❤️ 完全恢復 HP／MP</button>
                <button class="admin-btn" data-admin-cmd="unlocksagas">📜 解鎖全部篇章</button>
                <button class="admin-btn" data-admin-cmd="completequest">✅ 完成任務</button>
                <button class="admin-btn" data-admin-cmd="maxcraft">⚒️ 最高等級製作</button>
                <button class="admin-btn" data-admin-cmd="maxskills">📖 技能全滿</button>
                <button class="admin-btn" data-admin-cmd="killmonster">⚡ 擊敗怪物</button>
                <button class="admin-btn" data-admin-cmd="autoequip">⚔️ 自動裝備</button>
                <button class="admin-btn danger" data-admin-cmd="resetsave">🗑️ 重置進度</button>
              </div>
            </div>

            <!-- Danger Zone: Database & Server Zero Wipe -->
            <div class="admin-section" style="margin-top: 14px; border: 1px solid rgba(239, 68, 68, 0.5); background: rgba(127, 29, 29, 0.2); border-radius: 6px; padding: 12px;">
              <h3 style="color: #f87171; display:flex; align-items:center; gap:6px; margin-top:0;">
                🔥 危險區：伺服器重置與 Firestore 雲端資料
              </h3>
              <p style="font-size: 11px; color: #fca5a5; line-height: 1.4; margin: 4px 0 10px 0;">
                將 Cloud Firestore 中全部 17 個正式集合（帳號、角色、血盟、市場、排行榜）完全清除，並強制全體玩家回到角色建立流程。此操作僅限官方管理員（<code>duuh.alaminos@gmail.com</code>）。
              </p>
              <button id="admin-wipe-database-btn" class="admin-preset-btn danger" style="background:rgba(220,38,38,0.4); border-color:#ef4444; color:#fee2e2; font-weight:bold; width:100%; padding:10px; font-size:12px; cursor:pointer;">
                🔥 完整清空資料庫（伺服器歸零）
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Criação da Forja -->
    <div id="craft-modal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.75); backdrop-filter:blur(6px); z-index:9999; justify-content:center; align-items:center;">
      <div class="craft-modal-content" style="background:linear-gradient(145deg, rgba(26,20,15,0.98), rgba(12,8,6,0.99)); border:1px solid rgba(212,175,55,0.5); border-radius:12px; width:92%; max-width:480px; padding:20px; box-shadow:0 10px 30px rgba(0,0,0,0.8); position:relative;">
        <button id="craft-modal-close" style="position:absolute; top:12px; right:14px; background:none; border:none; color:#aaa; font-size:20px; cursor:pointer;">✖</button>
        <div id="craft-modal-body"></div>
      </div>
    </div>

    <!-- Modal de Certificação de Subclasses -->
    <div id="cert-modal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.75); backdrop-filter:blur(6px); z-index:9999; justify-content:center; align-items:center;">
      <div class="craft-modal-content" style="background:linear-gradient(145deg, rgba(20,24,35,0.98), rgba(10,12,18,0.99)); border:1px solid rgba(212,175,55,0.6); border-radius:12px; width:92%; max-width:520px; padding:20px; box-shadow:0 10px 35px rgba(0,0,0,0.85); position:relative;">
        <button id="cert-modal-close" style="position:absolute; top:12px; right:14px; background:none; border:none; color:#aaa; font-size:20px; cursor:pointer;">✖</button>
        <div id="cert-modal-body"></div>
      </div>
    </div>

    <!-- Modal de Filtro de Loot AFK & Auto-Recycle -->
    <div id="auto-recycle-modal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.8); backdrop-filter:blur(6px); z-index:99999; justify-content:center; align-items:center;">
      <div class="craft-modal-content" style="background:linear-gradient(145deg, rgba(20,24,35,0.98), rgba(10,12,18,0.99)); border:1px solid #d4a744; border-radius:12px; width:92%; max-width:540px; padding:22px; box-shadow:0 10px 40px rgba(0,0,0,0.9); position:relative; font-family:'Cinzel',serif; color:#f8fafc;">
        <button id="close-auto-recycle-modal-btn" style="position:absolute; top:12px; right:14px; background:none; border:none; color:#aaa; font-size:20px; cursor:pointer;" onclick="const m=document.getElementById('auto-recycle-modal'); if(m) m.style.display='none';">✖</button>
        <div id="auto-recycle-modal-body"></div>
      </div>
    </div>

    <!-- Modal Canônico de Encantamento de Equipamento -->
    <div id="enchant-flow-modal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); z-index:99999; justify-content:center; align-items:center;">
      <div class="enchant-flow-modal-content" style="background:linear-gradient(145deg, rgba(18,22,34,0.98), rgba(10,12,18,0.99)); border:1px solid rgba(212,167,68,0.6); border-radius:12px; width:94%; max-width:560px; padding:22px; box-shadow:0 12px 48px rgba(0,0,0,0.9); position:relative; font-family:'Cinzel',serif; color:#f8fafc;">
        <button id="enchant-modal-close-btn" style="position:absolute; top:12px; right:14px; background:none; border:none; color:#94a3b8; font-size:20px; cursor:pointer; transition:color 0.2s;">✕</button>
        <div class="enchant-flow-header" style="margin-bottom:16px; border-bottom:1px solid rgba(212,167,68,0.25); padding-bottom:10px;">
          <h3 style="margin:0; font-size:16px; color:#ffd700; display:flex; align-items:center; gap:8px;">
            <span>✦</span> <span>古代裝備強化</span>
          </h3>
          <span style="font-size:11px; color:#94a3b8; font-family:sans-serif;">標準流程：選擇 → 目標 → 預覽 → 原子交易</span>
        </div>
        <div id="enchant-modal-body"></div>
      </div>
    </div>

    <!-- Item Tooltip -->
    <div id="item-tooltip" class="item-tooltip"></div>

    <!-- Floating Return to Combat Button for Mobile -->
    <button id="mobile-combat-fab" class="mobile-combat-fab" onclick="window.setMobileView && window.setMobileView('battle')" title="返回戰鬥競技場">
      <span class="mobile-combat-fab-icon">⚔️</span>
      <span class="mobile-combat-fab-text">戰鬥</span>
    </button>

    <!-- Mobile Bottom Dock Navigation -->
    <nav class="mobile-bottom-nav">
      <button class="mobile-nav-btn active" data-tab="battle"><span class="icon">⚔️</span><span>戰鬥</span></button>
      <button class="mobile-nav-btn" data-tab="inventory"><span class="icon">🎒</span><span>背包</span></button>
      <button class="mobile-nav-btn" data-tab="hero"><span class="icon">👤</span><span>角色</span></button>
      <button class="mobile-nav-btn" data-tab="skills"><span class="icon">✦</span><span>Skills</span></button>
      <button class="mobile-nav-btn" data-tab="codex"><span class="icon">📜</span><span>圖鑑</span></button>
      <button class="mobile-nav-btn" data-tab="shop"><span class="icon">🛒</span><span>商店</span></button>
    </nav>
  </div>
`;

