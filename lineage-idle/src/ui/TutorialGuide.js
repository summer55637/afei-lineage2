/**
 * TutorialGuide.js — 指南 e Tutorial para Jogadores Iniciantes
 *
 * Exibe automaticamente uma tela explicativa interativa na PRIMEIRA VEZ que o jogador abre qualquer aba.
 * Mantém um botão permanente ("❓ 指南 da Aba") no canto de cada painel para tirar dúvidas a qualquer momento.
 */

import { RESONANCE_DEFINITIONS } from '../services/WeaponResonanceService.js';

function formatPassiveLabel(statKey, val) {
  const map = {
    pDefPct: `+${val}% P.Def`,
    pAtkPct: `+${val}% P.Atk`,
    mAtkPct: `+${val}% M.Atk`,
    mDefPct: `+${val}% M.Def`,
    critChance: `+${val}% Crit`,
    critDmgPct: `+${val}% Crit Dmg`,
    atkSpd: `+${val}% Atk.Spd`,
    castSpd: `+${val}% Cast.Spd`,
    eva: `+${val} 迴避`,
    staggerDmgPct: `+${val}% Stagger`,
    bossDmgPct: `+${val}% Boss Dmg`,
    lifeDrain: `+${val}% Life Drain`,
    healBoostPct: `+${val}% Cura`,
    damageReductionPct: `-${val}% 受到傷害`,
    mCrit: `+${val}% M.Crit`
  };
  return map[statKey] || `+${val} ${statKey}`;
}

function renderResonancesCatalogHtml() {
  const entries = Object.values(RESONANCE_DEFINITIONS || {});
  if (!entries.length) return '<p style="color:#aaa;">尚未登錄任何共鳴。</p>';

  const cards = entries.map((res, idx) => {
    const passives = res.passives || {};
    const passivePills = Object.entries(passives).map(([k, v]) => `
      <span style="background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); color: #38bdf8; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center;">
        ${formatPassiveLabel(k, v)}
      </span>
    `).join('');

    const color = res.color || '#eab308';

    return `
      <div class="res-guide-card" style="background: rgba(15, 20, 32, 0.88); border: 1px solid ${color}55; border-left: 4px solid ${color}; border-radius: 8px; padding: 10px 12px; margin-bottom: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.5);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px; filter: drop-shadow(0 0 4px ${color}88);">${res.icon || '⚔️'}</span>
            <strong style="font-family: 'Cinzel', serif; font-size: 13px; color: ${color}; letter-spacing: 0.03em;">
              ${idx + 1}. ${res.name}
            </strong>
          </div>
          <span style="background: rgba(212, 167, 68, 0.15); border: 1px solid rgba(212, 167, 68, 0.4); color: #ffd877; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; font-family: 'Cinzel', serif;">
            ${res.pairName}
          </span>
        </div>

        ${passivePills ? `
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px; align-items: center;">
            <span style="font-size: 10px; color: #94a3b8; font-weight: 600; margin-right: 2px;">Passivas:</span>
            ${passivePills}
          </div>
        ` : ''}

        <div style="font-size: 11.5px; color: #e2e8f0; line-height: 1.45; background: rgba(0, 0, 0, 0.25); padding: 7px 9px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.05);">
          ${res.desc}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div style="margin-top: 4px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; padding: 6px 10px; background: rgba(212,167,68,0.1); border: 1px solid rgba(212,167,68,0.25); border-radius: 6px; flex-wrap: wrap; gap: 6px;">
        <span style="font-size: 11px; color: #f5df93; font-weight: 600;">
          總計： <strong>27 武器組合</strong> 針對 1 對 1 戰鬥平衡
        </span>
        <span style="font-size: 10px; color: #38bdf8; background: rgba(56,189,248,0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(56,189,248,0.25);">
          +1.240 每組啟用組合的標準 CP
        </span>
      </div>
      <input type="text" placeholder="🔍 依共鳴或武器名稱篩選（例如：弓、法杖、長槍、匕首）..." oninput="const q = this.value.toLowerCase(); this.parentElement.querySelectorAll('.res-guide-card').forEach(c => { c.style.display = c.textContent.toLowerCase().includes(q) ? 'block' : 'none'; });" style="width: 100%; box-sizing: border-box; padding: 7px 10px; font-size: 11px; background: rgba(0,0,0,0.5); border: 1px solid rgba(212,167,68,0.3); border-radius: 6px; color: #fff; margin-bottom: 8px; font-family: sans-serif; outline: none;" />
      <div style="max-height: 480px; overflow-y: auto; padding-right: 4px; scrollbar-width: thin;">
        ${cards}
      </div>
    </div>
  `;
}

export const GUIDES_DATA = {
  zones: {
    id: 'zones',
    title: '⚔️ 狩獵區與自動戰鬥',
    subtitle: '了解如何培養角色並管理亞丁競技場：放置編年史中的狩獵。',
    icon: '⚔️',
    color: '#e8c39a',
    sections: [
      {
        heading: '🎯 選擇狩獵區',
        text: '從地圖或區域列表選擇狩獵地點。每個區域都有建議等級；挑戰等級過高的怪物會降低命中並提高受到的傷害。',
        tip: '提示：綠色標示的區域能提供最高 XP 效率，風險也較低！'
      },
      {
        heading: '⚡ 標準戰鬥力（CP）與門檻',
        text: '每個狩獵區都有建議戰鬥力（CP）。若低於建議值，戰鬥風險會大幅提高。可透過提升武器、防具套裝、靈魂水晶與靈藥來增加 CP。',
        tip: 'CP 會綜合角色 15 個戰力面向，反映實際戰鬥能力。'
      },
      {
        heading: '🧪 自動藥水與魂彈',
        text: '可在戰鬥畫面上方啟用 HP／MP 自動藥水與魂彈／魔靈彈。魂彈可強化 P.Atk，魔靈彈可強化 M.Atk。',
        tip: '挑戰首領與團隊副本時保持彈藥啟用，可發揮更高傷害！'
      },
      {
        heading: '🎁 狩獵掉落與連殺',
        text: '擊敗怪物可獲得 XP、SP、金幣，並有機會掉落消耗品、材料與稀有裝備。連續擊殺怪物可啟動連殺加成！',
        tip: '裝備掉落率較低（0.3%～0.6%）；菁英怪與首領的掉落率會提高！'
      }
    ]
  },

  character: {
    id: 'character',
    title: '👤 角色、屬性與副職業',
    subtitle: '了解主要屬性、職業晉升與副職業認證的運作方式。',
    icon: '👤',
    color: '#ffd877',
    sections: [
      {
        heading: '📊 主要屬性（染料與 L2 屬性）',
        text: '• **STR**：提升物理攻擊（P.Atk）。\n• **DEX**：提升暴擊率、攻擊速度與迴避。\n• **CON**：提升最大 HP 與物理防禦。\n• **INT**：提升魔法攻擊（M.Atk）。\n• **WIT**：提升施法速度與魔法暴擊率。\n• **MEN**：提升最大 MP 與魔法防禦。',
        tip: '你可以在鍛造介面使用染料紋身，最多將單一屬性提高 +5！'
      },
      {
        heading: '⚡ 標準職業晉升',
        text: '• **第一次轉職**：等級 20（解鎖新技能與 D 級裝備）\n• **第二次轉職**：等級 40（進階專精與 C 級裝備）\n• **第三職業與覺醒**：等級 76+（完整大師能力與 S 級武器）\n• **副職業（Lv.75+）**：最多解鎖 3 個額外副職業！',
        tip: '將副職業提升至 65、75、80 級可取得副職業認證，並把永久屬性加成套用到主職業！'
      },
      {
        heading: '💎 標準戰鬥力（CP）',
        text: '英雄 CP 會忠實反映以下總和：\n1. 種族／職業基礎屬性\n2. 英雄等級\n3. 武器物理與魔法攻擊力\n4. 套裝物理與魔法防禦\n5. 強化等級（+1～+16）\n6. 靈魂水晶（SA－Focus、Health、Acumen）\n7. 史詩首領飾品（蟻后、巴溫、瓦拉卡斯）\n8. 武器與防具元素屬性\n9. 被動技能與武器精通\n10. 星界精通（龍與鳳凰）\n11. 煉金永久靈藥\n12. 血盟技能（Imperium、Might、Shield）\n13. 圖鑑完整收藏\n14. 已裝備與合成的首領娃娃\n15. 副職業認證',
        tip: '均衡提升 15 個戰力面向，即可逐步達到白銀、黃金、白金與鑽石階級！'
      }
    ]
  },

  inventory: {
    id: 'inventory',
    title: '🎒 背包、篩選與合成系統',
    subtitle: '管理裝備、藥水與物品合成。',
    icon: '🎒',
    color: '#a855f7',
    sections: [
      {
        heading: '🗡️ 裝備 & Graus (Grades)',
        text: '物品會依角色等級分為不同階級：\n• **No-Grade**：等級 1～19\n• **D 級**：等級 20～39\n• **C 級**：等級 40～51\n• **B 級**：等級 52～61\n• **A 級**：等級 62～75\n• **S 級／Frost Lord**：等級 76～85+',
        tip: '盡量裝備目前等級可使用的最高品級，以取得更好的套裝加成！'
      },
      {
        heading: '🧪 裝備合成系統',
        text: '點擊背包上方的 **🧪 合成**，可將 2 件相同且同等級的裝備融合。成功後物品會升級（Lv.1 ➔ Lv.2），每級獲得 **+15% 屬性加成**。',
        tip: '合成失敗時主物品不會損壞，只會消耗素材物品！'
      },
      {
        heading: '🧹 自動出售與分解',
        text: '使用底部批次選取按鈕，可一次勾選普通與優良物品進行出售或分解成製作材料。',
        tip: '啟用上方的自動出售，可自動賣掉狩獵取得的普通裝備。'
      },
      {
        heading: '⚡ 雙武器庫與武器共鳴',
        text: '裝備兩把具有協同效果的武器可啟動 **武器共鳴**，獲得 **+1,240 CP**、被動加成與戰鬥觸發效果。\n\n可在此視窗上方的 **⚡ 共鳴** 分頁查看全部 27 種組合！',
        tip: '背包頂部的金色橫幅會顯示目前啟用的武器共鳴。'
      }
    ]
  },

  resonance: {
    id: 'resonance',
    title: '⚡ 雙武器庫共鳴（27 種組合）',
    subtitle: '在欄位 1 與欄位 2 裝備具有協同效果的武器，可解鎖獨特被動與戰鬥觸發效果。',
    icon: '⚡',
    color: '#eab308',
    sections: [
      {
        heading: '⚔️ 武器共鳴如何運作？',
        text: '**雙武裝系統**允許英雄在 **欄位 1（主武器）** 裝備主要武器，並在 **欄位 2（副武器／盾牌）** 裝備副武器或盾牌。\n\n當兩把裝備形成相容組合時，會立即啟動共鳴：\n• 正式角色計算中增加 **+1,240 戰力（CP）**。\n• 提供 **被動屬性加成**（+20% P.Def、+15% Atk.Spd、+12% Cast.Spd、迴避、暴擊率等）。\n• 對怪物即時套用 **戰術戰鬥效果**（戰術破甲、穿刺、緩速、毒素引爆、降防與混合元素傷害）。\n• **1v1 平衡設計**：全部 27 種共鳴皆針對單體戰鬥校準，不使用過強的範圍技能（AoE）。',
        tip: '可在背包頂部的金色橫幅查看目前啟用的共鳴！'
      },
      {
        heading: '📜 27 種武器共鳴圖鑑',
        customHtml: renderResonancesCatalogHtml(),
        tip: '可以嘗試更換副武器：使用盾牌提升防禦，或使用匕首／雙刀追求高速暴擊！'
      },
      {
        heading: '🛡️ Regras de Compatibilidade & Dicas Táticas',
        text: '• **雙手武器與弓**：弓、雙手劍與長槍對輕型副手有特殊相容規則，可解鎖獨特共鳴。\n• **武器階級**：共鳴不受階級限制（No-Grade～S 級），任何階級武器都能啟動協同效果。\n• **即時切換**：卸下或更換武器時，加成與 CP 會由 StatsEngine 立即重新計算。',
        tip: '帶有靈魂水晶（SA）、元素屬性與附魔改造的武器，其加成都會完整計入目前共鳴！'
      }
    ]
  },

  warehouse: {
    id: 'warehouse',
    title: '📦 個人倉庫與儲存',
    subtitle: '保存重要物品，並在副職業之間共享使用。',
    icon: '📦',
    color: '#caa06a',
    sections: [
      {
        heading: '🔒 安全儲存',
        text: '將金幣與貴重物品存入個人倉庫。此倉庫會在同一角色的所有副職業之間共用。',
        tip: '使用「存入材料」按鈕，可快速將所有製作素材送進倉庫。'
      }
    ]
  },

  skills: {
    id: 'skills',
    title: '⚡ 技能, Cargas & Almas Kamael',
    subtitle: '掌握主動、被動技能、技能充能與戰鬥靈魂。',
    icon: '⚡',
    color: '#38bdf8',
    sections: [
      {
        heading: '📖 Árvore de 技能',
        text: '消耗技能點數（SP）學習並升級職業的主動與被動技能。被動技能會提供永久加成。',
        tip: '技能 de dano utilizam a autêntica fórmula de dano físico de RPG clássico (Multiplicador de constante 77/70).'
      },
      {
        heading: '⚡ 技能充能（Charge Lv.1～8）',
        text: '戰鬥職業在攻擊時會累積技能充能。每層充能使下一次技能傷害提高 **+20%**，最多累積至充能等級 8。',
        tip: '先累積到 8 層充能，再使用最強技能，可以打出更高爆發傷害！'
      },
      {
        heading: '👻 Almas Kamael (1-5 Almas)',
        text: 'Personagens Kamael absorvem almas dos monstros derrotados. Cada alma acumulada concede **+5% de Dano de Skill** adicional.',
        tip: '卡麥爾靈魂可消耗來啟動特殊技能與變身！'
      }
    ]
  },

  shop: {
    id: 'shop',
    title: '🛍️ 市場r & 市場 da Cidade',
    subtitle: '購買藥水、Soulshots、製作素材與飾品。',
    icon: '🛍️',
    color: '#facc15',
    sections: [
      {
        heading: '🧪 Consumíveis de Sobrevivência',
        text: '補充 HP 藥水（P、M、G、XL）、MP 藥水與 Soulshots／Spiritshots，避免自動戰鬥因補給不足而中斷。',
        tip: 'Poções de tamanho XL restauram uma grande quantidade de HP de forma instantânea durante Raids!'
      },
      {
        heading: '🔮 市場 Místico Rotativo',
        text: '神秘市場會定時刷新特殊商品，包括首領飾品與稀有材料。',
        tip: 'Fique atento aos estoques limitados do 市場 Místico para adquirir fragmentos de joias épicas!'
      }
    ]
  },

  craft: {
    id: 'craft',
    title: '⚒️ 亞丁帝國鍛造與通用製作',
    subtitle: '探索鍛造系統的所有分頁：製作、靈魂水晶、Pushkin MW、染料、元素、腰帶與生命石。',
    icon: '⚒️',
    color: '#f59e0b',
    sections: [
      {
        heading: '⚒️ 裝備製作',
        text: '使用鐵礦石、奧里哈魯根、精金與皮革等素材製作武器、防具、斗篷、腰帶與飾品。',
        tip: '提升鍛造等級可以解鎖更高等級的配方（A 級與 S 級）。'
      },
      {
        heading: '🔮 靈魂水晶（SA）',
        text: '鍛造並在武器上鑲嵌紅、綠、藍靈魂水晶，可解鎖特殊能力（SA），例如 Health（+25% HP）、Focus（+80 暴擊）或 Acumen（+15% 施法）。',
        tip: '你可以融合 2 顆相同等級的靈魂水晶來提升階級。'
      },
      {
        heading: '✨ Mestre Pushkin MW (Masterwork)',
        text: '將一般裝備交給 Pushkin 大師，可鍛造成 **Masterwork（MW）** 版本，獲得額外屬性加成與閃耀特效。',
        tip: 'Itens Masterwork possuem multiplicadores superiores aos itens base!'
      },
      {
        heading: '🔥 元素屬性（最高 +300）',
        text: '將元素石（火、水、地、風、黑暗、神聖）注入武器與胸甲，對弱點怪物在 PvE 中最多可增加 +70% 傷害。',
        tip: 'O primeiro engaste concede +20 de Atributo e engastes seguintes concedem +5.'
      },
      {
        heading: '🎗️ Síntese de Cintos [S]',
        text: '可花費 500k 金幣，以 70% 成功率合成傳說級 **Blessed Top-Grade Magic Ornament Belt [S]**，提供 **+7.2% PvE 防禦** 與 **+6% 傷害**。',
        tip: 'O cinto abençoado é uma das melhores peças defensivas do jogo!'
      },
      {
        heading: '💎 附魔改造／生命石',
        text: '在武器與史詩飾品（蟻后、巴溫、瓦拉卡斯、札肯、安塔瑞斯）上使用高級生命石，可解鎖被動物品技能（Might、Empower、Shield、Focus、Celestial）。',
        tip: 'Celestial Shield 技能可提供 7 秒完全無敵！'
      }
    ]
  },

  alchemy: {
    id: 'alchemy',
    title: '🧪 Laboratório de Alquimia',
    subtitle: '蒸餾屬性靈藥與魔法試劑。',
    icon: '🧪',
    color: '#10b981',
    sections: [
      {
        heading: '🍷 Elixires de Status Permanentes',
        text: '組合精華與水晶可製作 STR、DEX、CON、INT、WIT、MEN 靈藥。每使用一瓶，都會永久提升角色的基礎屬性。',
        tip: '每個等級可使用的靈藥數量有限，請優先強化主職業最重要的屬性！'
      }
    ]
  },

  astral: {
    id: 'astral',
    title: '✨ Maestria Astral & Constelações',
    subtitle: 'Canalize o poder das estrelas nas Constelações do Dragão e da Fênix.',
    icon: '✨',
    color: '#ec4899',
    sections: [
      {
        heading: '🐉 龍之星座（攻擊）',
        text: 'Gaste Fragmentos Astrais para evoluir nós de Fúria Titânica (+P.Atk), Chama Arcana (+M.Atk), Golpe Mortal (+Crit Chance) e Lâmina Suprema (+Crit Dmg).',
        tip: '如果想加快狩獵速度，可以優先投資龍之星座！'
      },
      {
        heading: '🦅 鳳凰星座（防禦）',
        text: 'Evolua Sangue da Fênix (+HP%), Mente Iluminada (+MP%), Éter Sagrado (+Regen MP) e Escudo Divino (+P.Def/M.Def).',
        tip: '面對高強度團隊首領時，鳳凰星座是重要的生存來源。'
      }
    ]
  },

  expeditions: {
    id: 'expeditions',
    title: '🏰 遠征、莊園與亞丁城堡',
    subtitle: '在莊園播種、征服城堡，並派遣傭兵進行遠征。',
    icon: '🏰',
    color: '#8b5cf6',
    sections: [
      {
        heading: '🌱 Sistema de Manor (Sementes & Colheita)',
        text: '購買莊園種子，在狩獵區播種並於擊敗怪物後收成，再到城鎮兌換稀有製作材料。',
        tip: 'O Manor é uma das formas mais baratas de conseguir minérios e tecidos raros!'
      },
      {
        heading: '👑 城堡（古魯丁、奇岩、亞丁）',
        text: '挑戰古魯丁、奇岩與亞丁城堡的守衛。成功佔領城堡後，可從全伺服器獲得 **每日金幣稅收**！',
        tip: '記得每天到城堡面板領取稅收！'
      },
      {
        heading: '⛵ 傭兵遠征',
        text: '派遣傭兵小隊執行定時任務（1 小時、4 小時、8 小時），他們會帶回補給箱、配方與金幣。',
        tip: '盡量讓遠征持續在背景運作，累積更多收益！'
      }
    ]
  },

  codex: {
    id: 'codex',
    title: '📜 圖鑑與物品收藏',
    subtitle: '完成裝備與首領娃娃收藏，可解鎖帳號加成。',
    icon: '📜',
    color: '#34d399',
    sections: [
      {
        heading: '📚 裝備收藏',
        text: '取得重複的裝備與飾品後，可登錄至圖鑑。完成一組收藏會獲得永久加成，例如 +P.Atk、+M.Atk、+HP 或 +Def。',
        tip: '即使是 No-Grade 物品，完成收藏後也能提供有價值的加成！'
      }
    ]
  },

  dolls: {
    id: 'dolls',
    title: '🎎 首領娃娃與合成器',
    subtitle: '裝備傳說首領收藏品，並進行娃娃融合。',
    icon: '🎎',
    color: '#f43f5e',
    sections: [
      {
        heading: '👑 首領娃娃（蟻后、巴溫、札肯、安塔瑞斯）',
        text: '首領娃娃能提供非常高的屬性加成，並可直接從背包中裝備。',
        tip: '高階娃娃還能提供減傷與吸血效果！'
      },
      {
        heading: '🔮 娃娃合成器',
        text: '將 3 個相同且同階級的娃娃放入合成器，可嘗試進化到下一個稀有度。',
        tip: '合成成功後，娃娃會獲得更亮眼的特效與更高屬性。'
      }
    ]
  },

  quests: {
    id: 'quests',
    title: '📜 任務、懸賞與戰鬥通行證',
    subtitle: '完成每日目標，取得金幣、SP 與專屬物品。',
    icon: '📜',
    color: '#fbbf24',
    sections: [
      {
        heading: '🎯 任務 Diárias & Caçadas',
        text: '每天擊敗指定數量的怪物或首領，可領取補給箱與傳送券。',
        tip: '每日重置前記得領完所有每日獎勵！'
      },
      {
        heading: '🎫 戰鬥通行證（Adena Pass）',
        text: '遊玩時累積通行證點數即可提升等級，解鎖免費獎勵；升級為高級通行證後可獲得更稀有的獎勵。',
        tip: '高級通行證可獲得祝福強化卷軸！'
      }
    ]
  },

  tower: {
    id: 'tower',
    title: '🏰 Torre da Insolência (Tower of Insolence)',
    subtitle: '挑戰傲慢之塔 100 層，並每天掃蕩已通關樓層的獎勵。',
    icon: '🏰',
    color: '#c084fc',
    sections: [
      {
        heading: '🧗 Escalada dos 100 Andares',
        text: '隨樓層上升，守衛與首領會越來越強。每通過一層都能獲得獨特獎勵，並逐步解鎖每日掃蕩。',
        tip: '如果挑戰失敗，可以先到鍛造系統強化裝備再重新挑戰！'
      },
      {
        heading: '🧹 Varredura Diária (Sweep)',
        text: '每天可使用一次「每日掃蕩」，立即領取所有已通關樓層的獎勵！',
        tip: '爬得越高，每天可獲得的金幣與 SP 就越多！'
      }
    ]
  },

  raids: {
    id: 'raids',
    title: '🏰 每日地城與史詩 Raid Boss',
    subtitle: '挑戰亞丁最強大的敵人，利用 Break 機制取得傳說掉落。',
    icon: '🏰',
    color: '#ef4444',
    sections: [
      {
        heading: '👹 Chefes Épicos Clássicos (Queen Ant, Baium, Valakas...)',
        text: 'Desafie chefes lendários como Queen Ant, Core, Orfen, Zaken, Baium, Antharas e Valakas. Cada chefe possui atributos elementais e resistências próprias.',
        tip: '首領會掉落史詩飾品、祝福卷軸、生命石與大量 SP！'
      },
      {
        heading: '⚡ Mecânica de Postura & Janela de BREAK',
        text: '持續攻擊與元素技能會削減首領姿態值。姿態條歸零時，首領進入 **BREAK**：暈眩 4 秒，並承受 **+50% 額外傷害**！',
        tip: '把最強技能與 Soulshots 留到 BREAK 期間一次爆發！'
      },
      {
        heading: '🎫 每日 Raid 入場券',
        text: '每日重置會獲得 3 張 Raid 入場券；額外入場券可從先鋒之旅、每日任務或戰鬥通行證取得。',
        tip: '盡量持續使用入場券，以最大化首領飾品碎片收益！'
      }
    ]
  },

  colosseum: {
    id: 'colosseum',
    title: '👑 Coliseu, Duelos & Grande Olimpíada',
    subtitle: '與其他冒險者較量，爭取亞丁貴族英雄稱號。',
    icon: '👑',
    color: '#f59e0b',
    sections: [
      {
        heading: '⚔️ Duelos 1v1 do Coliseu',
        text: 'Enfrente cópias em tempo real de outros jogadores baseadas em Combat Power (CP) e Ranking. Vencer duelos concede Pontos de Honra e melhora seu posicionamento.',
        tip: 'Ajuste seus equipamentos e ative auto-shots antes de iniciar qualquer combate na arena!'
      },
      {
        heading: '🏛️ A Grande Olimpíada (Ciclos Mensais)',
        text: '只有 Noblesse 與菁英戰士才能參加排名對戰，每場勝利都會增加職業排名積分。',
        tip: '每個週期結束時，各職業第 1 名會成為亞丁英雄，獲得黃金光環、發光稱號與英雄武器！'
      }
    ]
  },

  clan: {
    id: 'clan',
    title: '🛡️ 血盟、聯盟與血盟技能',
    subtitle: '加入血盟共同稱霸亞丁，並解鎖團隊被動加成。',
    icon: '🛡️',
    color: '#3b82f6',
    sections: [
      {
        heading: '🏰 Níveis de 血盟 & 技能 Passivas',
        text: '隨著成員捐獻金幣與 SP，血盟會從 Lv.1 提升至 Lv.5，為所有成員解鎖技能：\n• **Lv.1 Clan Imperium**：+10% 最大 HP\n• **Lv.2 Clan Might**：+8% P.Atk\n• **Lv.3 Clan Shield**：+10% P.Def\n• **Lv.4 Clan Empower**：+10% M.Atk、+12% M.Def\n• **Lv.5 Clan Vitality**：+20% MP 恢復、+5 速度',
        tip: 'Participar de um 血盟 ativo é um dos maiores saltos de poder para o seu Combat Power (CP)!'
      },
      {
        heading: '💎 每日捐獻與聲望',
        text: '每天向血盟倉庫捐獻金幣或 SP 可累積聲望點數；聲望是維持加成與提升血盟的重要資源。',
        tip: '捐獻也能完成先鋒之旅與戰鬥通行證的相關目標！'
      }
    ]
  },

  referral: {
    id: 'referral',
    title: '👥 聯絡人、好友、導師與推薦',
    subtitle: '管理好友網路、綁定導師、傳送密語，並領取推薦獎勵！',
    icon: '👥',
    color: '#34d399',
    sections: [
      {
        heading: '👥 聯絡人與好友清單',
        text: '聯絡人選單可管理完整社交網路：\n• **新增好友（+ 新增）：** 最多登錄 128 位好友，可查看等級、職業與在線／離線狀態。\n• **直接通訊：** 傳送即時密語（💬 訊息）或使用郵件（✉️ Mail）寄信。\n• **隊伍與血盟快捷操作：** 快速邀請好友加入狩獵隊伍或血盟。\n• **封鎖名單：** 最多封鎖 64 位玩家。',
        tip: '你可以隨時點擊上方的「👥 聯絡人」按鈕，或從「榮耀與社交」分頁開啟此功能。'
      },
      {
        heading: '🎓 導師系統（等級 20 以下新手）',
        text: '導師系統能連結資深玩家與新手：\n• **我是新手（Lv.20 以下）：** 綁定資深導師後立即獲得 **永久 +10% EXP**、**1,000 Soulshots／Spiritshots No-Grade** 與 **10 瓶生命藥水**。\n• **成長里程碑（Lv.40）：** 完成二轉後，學員與導師都會獲得 **50 Aden Coins（AC）** 與 **5 張祝福武器卷軸**。\n• **快速綁定：** 從好友清單選人並點擊 **「🎓 設為導師」** 即可。',
        tip: '導師綁定必須在等級 20 前完成，善用這項加成可以更快度過前期。'
      },
      {
        heading: '🎁 專屬連結、WhatsApp 與 Discord 社群',
        text: '邀請好友直接用瀏覽器加入遊戲，一起取得獎勵：\n• **專屬連結：** 複製個人推薦連結（`?ref=你的名稱`），或一鍵分享到 WhatsApp。\n• **領取獎勵：** 當學員達到 Lv.40 時，使用 **「檢查並領取獎勵」** 取得獎品。\n• **官方 Discord：** 加入社群交易物品、參加活動與交流問題。\n\n🔗 官方連結：**https://discord.gg/R7rwB5uCc**',
        tip: '記得留意 Discord 公告頻道，可能會有可兌換專屬加成的禮物序號！'
      }
    ]
  }
};

// Aliases: mapeia chaves de abas alternativas para as chaves primárias de guia
GUIDES_DATA['forge'] = GUIDES_DATA['craft'];       // forge → craft
GUIDES_DATA['equipment'] = GUIDES_DATA['inventory']; // equipment → inventory
GUIDES_DATA['bosses'] = GUIDES_DATA['raids'];
GUIDES_DATA['raid'] = GUIDES_DATA['raids'];
GUIDES_DATA['olympiad'] = GUIDES_DATA['colosseum'];
GUIDES_DATA['pvp'] = GUIDES_DATA['colosseum'];
GUIDES_DATA['clans'] = GUIDES_DATA['clan'];
GUIDES_DATA['community'] = GUIDES_DATA['referral'];
GUIDES_DATA['contacts'] = GUIDES_DATA['referral'];
GUIDES_DATA['friends'] = GUIDES_DATA['referral'];
GUIDES_DATA['mentorship'] = GUIDES_DATA['referral'];
GUIDES_DATA['mentoria'] = GUIDES_DATA['referral'];
GUIDES_DATA['amigos'] = GUIDES_DATA['referral'];
GUIDES_DATA['resonances'] = GUIDES_DATA['resonance'];
GUIDES_DATA['dual_resonance'] = GUIDES_DATA['resonance'];

// Tabela de resolução de chaves (tab-name → guide-key)
const TAB_TO_GUIDE = {};
Object.keys(GUIDES_DATA).forEach(k => { TAB_TO_GUIDE[k] = k; });

function getShadowRoot() {
  return document.getElementById('idle-host')?.shadowRoot || document;
}

/**
 * Verifica se a aba já foi vista. Se for a 1ª vez, abre o modal de tutorial automaticamente.
 */
export function checkTabGuide(tabKey, state, saveStateFn) {
  if (!tabKey || tabKey === 'close') return;
  const guideKey = TAB_TO_GUIDE[tabKey];
  if (!guideKey || !GUIDES_DATA[guideKey]) return;

  // Atualiza/injeta o botão flutuante de ajuda na aba ativa
  try { renderPersistentHelpButton(tabKey, guideKey); } catch(_) {}

  if (!state) return;
  if (!state.seenGuides) state.seenGuides = {};

  if (!state.seenGuides[guideKey]) {
    state.seenGuides[guideKey] = true;
    if (typeof saveStateFn === 'function') saveStateFn();
    // Pequeno delay para permitir o DOM atualizar antes do modal
    setTimeout(() => openTabGuideModal(guideKey), 150);
  }
}

/**
 * Abre a janela Modal com o 指南 da Aba informada
 */
export function openTabGuideModal(guideKey) {
  const data = GUIDES_DATA[guideKey] || GUIDES_DATA.zones;
  if (!data) return;

  const root = getShadowRoot();
  let overlay = root.querySelector('#tutorial-guide-modal');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'tutorial-guide-modal';
    overlay.className = 'modal-overlay active';
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85);
      z-index: 999999; display: flex; align-items: center; justify-content: center;
      padding: 16px; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease-out;
    `;
    if (root.body) root.body.appendChild(overlay);
    else root.appendChild(overlay);
  }

  const sectionsHtml = data.sections.map(s => `
    <div style="background: rgba(18, 22, 34, 0.9); border: 1px solid rgba(212, 167, 68, 0.3); border-radius: 10px; padding: 14px; margin-bottom: 12px;">
      <h4 style="margin: 0 0 6px 0; font-family: 'Cinzel', serif; color: ${data.color || '#f4d58a'}; font-size: 15px; display: flex; align-items: center; gap: 6px;">
        ${s.heading}
      </h4>
      ${s.customHtml ? s.customHtml : `
        <p style="margin: 0; font-size: 12px; color: #ddd; line-height: 1.6; whitespace: pre-line;">
          ${(s.text || '').replace(/\n/g, '<br/>')}
        </p>
      `}
      ${s.tip ? `
        <div style="margin-top: 8px; font-size: 11px; color: #34d399; background: rgba(52, 211, 153, 0.1); border-left: 3px solid #34d399; padding: 6px 10px; border-radius: 0 6px 6px 0;">
          💡 <strong>Dica Estratégica:</strong> ${s.tip}
        </div>
      ` : ''}
    </div>
  `).join('');

  overlay.innerHTML = `
    <div style="background: linear-gradient(180deg, rgba(20, 24, 36, 0.98), rgba(10, 12, 18, 0.98)); border: 1px solid rgba(212, 167, 68, 0.6); border-radius: 14px; max-width: 580px; width: 100%; max-height: 85vh; display: flex; flex-direction: column; color: #fff; font-family: sans-serif; box-shadow: 0 10px 40px rgba(0,0,0,0.9);">
      
      <!-- Header -->
      <div style="padding: 16px 20px; border-bottom: 1px solid rgba(212, 167, 68, 0.3); display: flex; justify-content: space-between; align-items: center; background: rgba(0, 0, 0, 0.3); border-radius: 14px 14px 0 0;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 24px; filter: drop-shadow(0 0 6px ${data.color});">${data.icon}</span>
          <div>
            <h3 style="margin: 0; font-family: 'Cinzel', serif; color: #f4d58a; font-size: 18px; font-weight: bold;">
              ${data.title}
            </h3>
            <div style="font-size: 11px; color: #aaa; margin-top: 2px;">
              ${data.subtitle}
            </div>
          </div>
        </div>
        <button onclick="window.closeTabGuideModal()" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #ccc; font-size: 16px; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">✕</button>
      </div>

      <!-- Category Selector Tabs -->
      <div style="padding: 8px 16px; background: rgba(0, 0, 0, 0.4); border-bottom: 1px solid rgba(212, 167, 68, 0.25); display: flex; gap: 6px; overflow-x: auto; scrollbar-width: thin;">
        ${[
          'zones', 'character', 'inventory', 'resonance', 'skills', 'craft',
          'raids', 'colosseum', 'clan', 'alchemy', 'astral',
          'codex', 'dolls', 'shop', 'quests', 'tower', 'referral'
        ].map(k => {
          const g = GUIDES_DATA[k];
          if (!g) return '';
          const isSel = (k === (data.id || guideKey));
          const shortTitle = (k === 'resonance') ? 'Ressonâncias' : g.title.split('&')[0].split('(')[0].replace(/[^\w\sÀ-ú]/g, '').trim();
          return `
            <button onclick="window.openTabGuideModal('${k}')" style="padding: 4px 10px; font-size: 11px; font-family: 'Cinzel', serif; font-weight: bold; border-radius: 12px; white-space: nowrap; cursor: pointer; transition: all 0.2s; border: 1px solid ${isSel ? (g.color || '#d4a744') : 'rgba(255,255,255,0.15)'}; background: ${isSel ? 'rgba(212, 167, 68, 0.25)' : 'rgba(20,24,36,0.6)'}; color: ${isSel ? (g.color || '#f4d58a') : '#aaa'};">
              ${g.icon} ${shortTitle}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Body Content -->
      <div style="padding: 16px 20px; overflow-y: auto; flex: 1;">
        ${sectionsHtml}
      </div>

      <!-- Footer -->
      <div style="padding: 12px 20px; border-top: 1px solid rgba(212, 167, 68, 0.2); background: rgba(0, 0, 0, 0.4); border-radius: 0 0 14px 14px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 11px; color: #888;">
          ❓ 你可以隨時點擊分頁中的 <strong>指南</strong> 按鈕，或從畫面頂部重新開啟這份教學。
        </span>
        <button onclick="window.closeTabGuideModal()" style="padding: 8px 20px; font-family: 'Cinzel', serif; font-weight: bold; font-size: 12px; background: linear-gradient(180deg, #d4a744, #8a641c); border: 1px solid #ffe699; color: #000; border-radius: 6px; cursor: pointer; box-shadow: 0 2px 10px rgba(212, 167, 68, 0.3);">
          ENTENDI, CONTINUAR JOGO!
        </button>
      </div>
    </div>
  `;

  overlay.style.display = 'flex';
}

if (typeof window !== 'undefined') {
  window.openTabGuideModal = openTabGuideModal;
  window.closeTabGuideModal = closeTabGuideModal;
}

/**
 * Fecha o modal de tutorial
 */
export function closeTabGuideModal() {
  const root = getShadowRoot();
  const overlay = root.querySelector('#tutorial-guide-modal');
  if (overlay) overlay.style.display = 'none';
}

/**
 * Renderiza/atualiza o botão flutuante "❓ 指南 da Aba" no canto do painel ativo.
 * @param {string} tabKey - chave da aba (ex: 'craft')
 * @param {string} [resolvedGuideKey] - chave resolvida do guia (ex: 'craft'); usa tabKey se omitido
 */
export function renderPersistentHelpButton(tabKey, resolvedGuideKey) {
  const guideKey = resolvedGuideKey || tabKey;
  if (!guideKey || !GUIDES_DATA[guideKey]) return;

  if (typeof window !== 'undefined') {
    window._currentActiveGuideKey = guideKey;
    window.openCurrentTabGuide = () => openTabGuideModal(window._currentActiveGuideKey || guideKey);
  }

  const root = getShadowRoot();

  // Clean up any legacy position:absolute help buttons inside tab panes
  root.querySelectorAll('.tab-help-btn').forEach(b => b.remove());

  const topGuideBtn = root.querySelector('#top-bar-guide-btn') || document.getElementById('top-bar-guide-btn');
  if (topGuideBtn) {
    const guideData = GUIDES_DATA[guideKey];
    topGuideBtn.style.display = 'inline-flex';
    topGuideBtn.title = `指南: ${guideData?.title || tabKey}`;
    topGuideBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      openTabGuideModal(guideKey);
    };
  }
}
