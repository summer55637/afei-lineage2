/**
 * TutorialGuide.js — Guia e Tutorial para Jogadores Iniciantes
 *
 * Exibe automaticamente uma tela explicativa interativa na PRIMEIRA VEZ que o jogador abre qualquer aba.
 * Mantém um botão permanente ("❓ Guia da Aba") no canto de cada painel para tirar dúvidas a qualquer momento.
 */

import { RESONANCE_DEFINITIONS } from '../services/WeaponResonanceService.js';

function formatPassiveLabel(statKey, val) {
  const map = {
    pDefPct: `+${val}% 物防`,
    pAtkPct: `+${val}% 物攻`,
    mAtkPct: `+${val}% 魔攻`,
    mDefPct: `+${val}% 魔防`,
    critChance: `+${val}% 暴擊`,
    critDmgPct: `+${val}% 暴擊傷害`,
    atkSpd: `+${val}% 攻速`,
    castSpd: `+${val}% 施法速度`,
    eva: `+${val} 迴避`,
    staggerDmgPct: `+${val}% Stagger`,
    bossDmgPct: `+${val}% 首領傷害`,
    lifeDrain: `+${val}% 吸血`,
    healBoostPct: `+${val}% 治療`,
    damageReductionPct: `-${val}% 受到傷害`,
    m暴擊: `+${val}% M.暴擊`
  };
  return map[statKey] || `+${val} ${statKey}`;
}

function renderResonancesCatalogHtml() {
  const entries = Object.values(RESONANCE_DEFINITIONS || {});
  if (!entries.length) return '<p style="color:#aaa;">目前沒有已登錄的武器共鳴。</p>';

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
            <span style="font-size: 10px; color: #94a3b8; font-weight: 600; margin-right: 2px;">被動：</span>
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
          總計：<strong>27 種武器組合</strong>，已針對 1 對 1 戰鬥平衡
        </span>
        <span style="font-size: 10px; color: #38bdf8; background: rgba(56,189,248,0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(56,189,248,0.25);">
          每組啟用的共鳴 +1,240 標準戰鬥力
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
    subtitle: '了解如何培養角色並管理《亞丁競技場：放置編年史》的狩獵流程。',
    icon: '⚔️',
    color: '#e8c39a',
    sections: [
      {
        heading: '🎯 選擇狩獵區',
        text: '可透過地圖或狩獵區清單選擇地點。每個區域都有建議等級；挑戰高出太多等級的怪物會降低命中並提高受到的傷害。',
        tip: '提示：綠色標示的區域能提供完整經驗效率，風險也較低。'
      },
      {
        heading: '⚡ 標準戰鬥力（CP）與進入門檻',
        text: '每個狩獵區都有建議戰鬥力（CP）。若你的 CP 低於建議值，戰鬥會明顯更危險。可透過強化武器、防具套裝、靈魂水晶與藥劑提升 CP。',
        tip: 'CP 會綜合角色的 15 個主要成長系統，以反映實際戰鬥能力。'
      },
      {
        heading: '🧪 自動藥水與靈魂彈',
        text: 'No topo da tela de combate, ative Poções Automáticas de HP/MP e Soulshots/Spiritshots. Soulshots dobram seu 物攻 e Spiritshots dobram seu 魔攻 em cada golpe.',
        tip: '挑戰首領與團隊首領時，建議保持靈魂彈／魔靈彈啟用，以維持最大輸出。'
      },
      {
        heading: '🎁 狩獵掉落與連續擊殺',
        text: '擊敗怪物可獲得經驗值、SP、金幣，也可能掉落消耗品、材料與稀有裝備。連續擊殺多隻怪物可啟用連殺加成。',
        tip: '裝備的基礎掉落率較低（0.3%～0.6%）；精英怪與首領會有較高的掉落倍率。'
      }
    ]
  },

  character: {
    id: 'character',
    title: '👤 角色、屬性與副職業',
    subtitle: '了解主要屬性、轉職與副職業認證的運作方式。',
    icon: '👤',
    color: '#ffd877',
    sections: [
      {
        heading: '📊 主要屬性（染料與角色能力）',
        text: '• **STR**: Aumenta o Ataque Físico (物攻).\n• **DEX**: Aumenta Chance Crítica, Velocidade de Ataque e Esquiva.\n• **CON**: Aumenta HP Máximo e Defesa Física.\n• **INT**: Aumenta o Ataque Mágico (魔攻).\n• **WIT**: Aumenta Velocidade de Cast e Chance Crítica Mágica.\n• **MEN**: Aumenta MP Máximo e Defesa Mágica.',
        tip: '可在鍛造系統使用染料調整屬性，單項最多可增加 +5 點。'
      },
      {
        heading: '⚡ 標準轉職進程',
        text: '• **第一次轉職**：等級 20（解鎖新技能與 D 級裝備）\n• **第二次轉職**：等級 40（進階專精與 C 級裝備）\n• **第三次轉職／覺醒**：等級 76+（大師級能力與 S 級武器）\n• **副職業（Lv. 75+）**：最多可解鎖 3 個額外副職業。',
        tip: '將副職業提升至 65、75、80 級，可取得副職業認證，為主職業提供永久屬性加成。'
      },
      {
        heading: '💎 標準戰鬥力（CP）',
        text: '角色 CP 會綜合下列系統：\n1. 種族／職業基礎屬性\n2. 角色等級\n3. 武器的物理與魔法攻擊\n4. 套裝的物理與魔法防禦\n5. 強化等級（+1～+16）\n6. 靈魂水晶（特殊能力）\n7. 首領史詩飾品（蟻后、巴溫、巴拉卡斯）\n8. 武器與防具元素屬性\n9. 被動技能與武器精通\n10. 星界精通（巨龍與鳳凰）\n11. 鍊金永久藥劑\n12. 血盟技能\n13. 圖鑑完整收藏\n14. 已裝備與合成的首領娃娃\n15. 副職業認證',
        tip: '均衡提升這 15 個系統，可逐步晉升銀、金、白金與鑽石戰力階級。'
      }
    ]
  },

  inventory: {
    id: 'inventory',
    title: '🎒 背包、篩選與裝備合成',
    subtitle: '管理裝備、藥水與物品合成。',
    icon: '🎒',
    color: '#a855f7',
    sections: [
      {
        heading: '🗡️ 裝備與品級',
        text: '物品會依等級分為不同品級：\n• **無等級**：等級 1～19\n• **D 級**：等級 20～39\n• **C 級**：等級 40～51\n• **B 級**：等級 52～61\n• **A 級**：等級 62～75\n• **S 級／冰霜領主**：等級 76～85+',
        tip: '盡量裝備目前等級可使用的最高品級裝備，以取得套裝加成。'
      },
      {
        heading: '🧪 裝備合成系統',
        text: '點擊背包上方的 **🧪 合成**，可合成 2 件相同且同等級的裝備。成功後物品等級提升（Lv.1 ➔ Lv.2），每級獲得 **+15% 屬性加成**。',
        tip: '合成失敗時主物品不會消失，只會消耗作為材料的另一件裝備。'
      },
      {
        heading: '🧹 自動出售與分解',
        text: '可使用底部批次選擇功能，將普通與不常見物品一次出售或分解成製作材料。',
        tip: '可在上方啟用自動出售，自動賣掉狩獵取得的普通裝備。'
      },
      {
        heading: '⚡ 雙武器與武器共鳴',
        text: '裝備兩把具有相性的武器會啟用**武器共鳴**，提供 **+1,240 CP**、被動加成與戰鬥觸發效果。\n\n可查看此視窗上方的 **⚡ 共鳴** 分頁，瀏覽完整 27 種組合。',
        tip: '背包上方的金色橫幅會顯示目前啟用的武器共鳴。'
      }
    ]
  },

  resonance: {
    id: 'resonance',
    title: '⚡ 雙武器共鳴（27 種組合）',
    subtitle: '在武器欄 1 與欄 2 裝備相性武器，即可解鎖獨特被動與戰鬥觸發效果。',
    icon: '⚡',
    color: '#eab308',
    sections: [
      {
        heading: '⚔️ 武器共鳴如何運作？',
        text: 'O sistema de **Dual Arsenal** permite que o herói equipe uma arma primária no **Slot 1 (Arma)** e uma arma secundária ou escudo no **Slot 2 (Secundária / Escudo)**.\n\nQuando as armas equipadas formam uma combinação compatível, a Ressonância é ativada instantaneamente:\n• **+1.240 Pontos de Combat Power (CP)** no cálculo canônico do personagem.\n• **Bônus de Atributos Passivos** (+20% 物防, +15% 攻速, +12% 施法速度, 迴避, Chance Crítica, etc.).\n• **Procs Táticos de Combate** aplicados no monstro em tempo real (Fratura Tática, Estocada Perfurante, Lentidão, Detonação de Toxinas, Redução de Armadura e Dano Elemental Híbrido).\n• **Balanceamento Focado 1v1**: Todas as 27 ressonâncias foram calibradas para combate individual focado, sem habilidades de área (AoE) quebradas.',
        tip: '可在背包上方的金色橫幅查看目前啟用的共鳴。'
      },
      {
        heading: '📜 27 種武器共鳴圖鑑',
        customHtml: renderResonancesCatalogHtml(),
        tip: '可嘗試更換副武器：盾牌偏向防禦，匕首／雙刀偏向快速暴擊。'
      },
      {
        heading: '🛡️ 相容規則與戰術提示',
        text: '• **雙手武器與弓**：弓、雙手劍與長槍對輕型副武器有特殊相容規則，可解鎖獨特共鳴。\n• **武器品級**：共鳴不受品級限制，無等級到 S 級武器皆可啟用相性。\n• **即時切換**：卸下或更換武器後，加成與 CP 會立即重新計算。',
        tip: '具有靈魂水晶、元素屬性與精煉效果的武器，其加成會完整計入目前啟用的共鳴。'
      }
    ]
  },

  warehouse: {
    id: 'warehouse',
    title: '📦 倉庫與儲存',
    subtitle: '保存珍貴物品，並在副職業之間共用。',
    icon: '📦',
    color: '#caa06a',
    sections: [
      {
        heading: '🔒 安全儲存',
        text: '可將金幣與貴重物品存入個人倉庫；同一角色的所有副職業共用此倉庫。',
        tip: '使用「存入材料」可快速將製作材料全部送入倉庫。'
      }
    ]
  },

  skills: {
    id: 'skills',
    title: '⚡ 技能、蓄力與闇天使靈魂',
    subtitle: '熟悉主動技能、被動技能、蓄力與戰鬥靈魂。',
    icon: '⚡',
    color: '#38bdf8',
    sections: [
      {
        heading: '📖 技能樹',
        text: '消耗技能點數（SP）學習並升級職業的主動與被動技能；被動技能會提供永久加成。',
        tip: '傷害技能使用遊戲既有的經典 RPG 傷害公式。'
      },
      {
        heading: '⚡ 技能蓄力（Lv. 1～8）',
        text: '戰鬥職業在攻擊時會累積技能蓄力。每層蓄力可使下一個技能傷害提高 **+20%**，最高 8 層。',
        tip: '可先累積至 8 層，再施放最強技能以取得最大爆發傷害。'
      },
      {
        heading: '👻 闇天使靈魂（1～5）',
        text: '闇天使角色會吸收被擊敗怪物的靈魂；每個靈魂額外提供 **+5% 技能傷害**。',
        tip: '闇天使靈魂可用於啟用特殊技能與變身。'
      }
    ]
  },

  shop: {
    id: 'shop',
    title: '🛍️ 城鎮商人與市場',
    subtitle: '購買藥水、靈魂彈、製作材料與飾品。',
    icon: '🛍️',
    color: '#facc15',
    sections: [
      {
        heading: '🧪 生存消耗品',
        text: '補充 HP 藥水、MP 藥水與靈魂彈／魔靈彈，避免自動戰鬥因消耗品不足而中斷。',
        tip: 'XL 藥水可在團隊首領戰中立即恢復大量 HP。'
      },
      {
        heading: '🔮 輪替神秘市場',
        text: '神秘市場會定期刷新特殊商品，包括首領飾品與稀有材料。',
        tip: '留意神秘市場的限量庫存，可取得史詩飾品碎片。'
      }
    ]
  },

  craft: {
    id: 'craft',
    title: '⚒️ 帝國鍛造與通用製作',
    subtitle: '探索鍛造的各項功能：製作、靈魂水晶、普希金名匠、染料、元素、腰帶與生命石。',
    icon: '⚒️',
    color: '#f59e0b',
    sections: [
      {
        heading: '⚒️ 裝備製作',
        text: '使用鐵礦石、奧里哈魯根、精金與皮革等材料製作武器、防具、披風、腰帶與飾品。',
        tip: '提升鍛造等級可解鎖更高品級（A 級與 S 級）的配方。'
      },
      {
        heading: '🔮 靈魂水晶（特殊能力）',
        text: 'Forje e engaste Soul Crystals (Red, Green, Blue) em armas para liberar Special Abilities (SA) como Health (+25% HP), Focus (+80 暴擊) ou Acumen (+15% Cast).',
        tip: '可合成 2 顆同等級靈魂水晶以提升階段。'
      },
      {
        heading: '✨ 普希金大師名匠製作（MW）',
        text: '將一般裝備交給普希金大師，可打造為**名匠（MW）**版本，獲得額外屬性與特殊光效。',
        tip: '名匠裝備的加成高於一般基礎裝備。'
      },
      {
        heading: '🔥 元素屬性（最高 +300）',
        text: '可將火、水、地、風、闇、神聖元素石注入武器與胸甲；對弱點怪物最高可增加 70% PvE 傷害。',
        tip: '第一次鑲嵌提供 +20 元素值，之後每次 +5。'
      },
      {
        heading: '🎗️ S 級腰帶合成',
        text: '可花費 500,000 金幣，以 70% 成功率合成傳說級**祝福頂級魔法飾品腰帶 [S]**，提供 **+7.2% PvE 防禦**與 **+6% 傷害**。',
        tip: '祝福腰帶是遊戲中非常強力的防禦裝備之一。'
      },
      {
        heading: '💎 精煉／生命石',
        text: '可在武器與史詩首領飾品（蟻后、巴溫、巴拉卡斯、札肯、安塔瑞斯）上使用高級生命石，解鎖力量、賦能、護盾、專注、天界等被動物品技能。',
        tip: '天界護盾可提供 7 秒完全無敵。'
      }
    ]
  },

  alchemy: {
    id: 'alchemy',
    title: '🧪 鍊金實驗室',
    subtitle: '提煉屬性藥劑與魔法試劑。',
    icon: '🧪',
    color: '#10b981',
    sections: [
      {
        heading: '🍷 永久屬性藥劑',
        text: '將精華與水晶合成 STR、DEX、CON、INT、WIT、MEN 藥劑；每次使用都會永久提高角色的基礎屬性。',
        tip: '每個等級可使用的藥劑數量有限，建議優先提升主職業最需要的屬性。'
      }
    ]
  },

  astral: {
    id: 'astral',
    title: '✨ 星界精通與星座',
    subtitle: '將星辰之力注入巨龍與鳳凰星座。',
    icon: '✨',
    color: '#ec4899',
    sections: [
      {
        heading: '🐉 巨龍星座（攻擊）',
        text: 'Gaste Fragmentos Astrais para evoluir nós de Fúria Titânica (+物攻), Chama Arcana (+魔攻), Golpe Mortal (+暴擊 Chance) e Lâmina Suprema (+暴擊傷害).',
        tip: '想提高狩獵效率時，可優先投資巨龍星座。'
      },
      {
        heading: '🦅 鳳凰星座（防禦）',
        text: 'Evolua Sangue da Fênix (+HP%), Mente Iluminada (+MP%), Éter Sagrado (+Regen MP) e Escudo Divino (+物防/魔防).',
        tip: '面對強力團隊首領時，這些防禦能力非常重要。'
      }
    ]
  },

  expeditions: {
    id: 'expeditions',
    title: '🏰 遠征、莊園與亞丁城堡',
    subtitle: '在莊園播種、攻佔城堡，並派遣傭兵遠征。',
    icon: '🏰',
    color: '#8b5cf6',
    sections: [
      {
        heading: '🌱 莊園系統（種子與收成）',
        text: '購買莊園種子，在狩獵區播種並於擊敗怪物時取得收成；可在城鎮交換稀有製作材料。',
        tip: '莊園是取得稀有礦石與布料的低成本方式之一。'
      },
      {
        heading: '👑 城堡（古魯丁、奇岩、亞丁）',
        text: '挑戰古魯丁、奇岩與亞丁城堡守衛。攻佔城堡後可獲得全伺服器累積的**每日金幣稅收**。',
        tip: '記得每天到城堡面板領取稅收。'
      },
      {
        heading: '⛵ 傭兵遠征',
        text: '派遣傭兵小隊執行 1、4、8 小時遠征；完成後會帶回補給箱、配方與金幣。',
        tip: '可讓遠征持續在背景進行，以穩定取得資源。'
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
        text: 'Ao obter equipamentos e joias repetidas, registre-os no Codex. Completar um conjunto de coleção concede bônus permanentes como +物攻, +魔攻, +HP ou +Def.',
        tip: '即使是無等級物品，完成收藏後也能提供實用的永久加成。'
      }
    ]
  },

  dolls: {
    id: 'dolls',
    title: '🎎 首領娃娃與合成器',
    subtitle: '裝備傳說首領收藏品並進行合成。',
    icon: '🎎',
    color: '#f43f5e',
    sections: [
      {
        heading: '👑 首領娃娃（蟻后、巴溫、札肯、安塔瑞斯）',
        text: '首領娃娃可提供大量屬性加成，並可從背包中裝備。',
        tip: '高階娃娃可提供減傷與吸血效果。'
      },
      {
        heading: '🔮 娃娃合成器',
        text: '在合成器中放入 3 個相同且同品級的娃娃，可嘗試提升至下一稀有度。',
        tip: '合成成功後，娃娃會獲得更明顯的視覺效果與更高屬性。'
      }
    ]
  },

  quests: {
    id: 'quests',
    title: '📜 任務、懸賞與戰鬥通行證',
    subtitle: '完成每日目標可獲得金幣、SP 與限定物品。',
    icon: '📜',
    color: '#fbbf24',
    sections: [
      {
        heading: '🎯 每日任務與狩獵',
        text: '每天擊敗指定數量的怪物或首領，可領取補給箱與傳送券。',
        tip: '請在每日重置前領取所有每日獎勵。'
      },
      {
        heading: '🎫 戰鬥通行證（亞丁通行證）',
        text: '遊玩時累積通行證點數以提升等級，可領取免費獎勵；升級高級通行證可取得傳說獎勵。',
        tip: '高級通行證可獲得祝福強化卷軸。'
      }
    ]
  },

  tower: {
    id: 'tower',
    title: '🏰 傲慢之塔',
    subtitle: '挑戰 100 層高塔並領取每日掃蕩獎勵。',
    icon: '🏰',
    color: '#c084fc',
    sections: [
      {
        heading: '🧗 挑戰 100 層',
        text: '樓層越高，守衛與首領越強。每通過一層都能獲得獨特獎勵，並提高每日掃蕩收益。',
        tip: '若挑戰失敗，可先到鍛造系統強化裝備再重新挑戰。'
      },
      {
        heading: '🧹 每日掃蕩',
        text: '每天可使用一次「每日掃蕩」，立即領取所有已通關樓層的掃蕩獎勵。',
        tip: '通關樓層越高，每天可取得的金幣與 SP 越多。'
      }
    ]
  },

  raids: {
    id: 'raids',
    title: '🏰 每日副本與史詩團隊首領',
    subtitle: '挑戰亞丁最強大的敵人，運用破防機制取得傳說掉落。',
    icon: '🏰',
    color: '#ef4444',
    sections: [
      {
        heading: '👹 經典史詩首領（蟻后、巴溫、巴拉卡斯等）',
        text: '挑戰蟻后、核心、歐瑞芬、札肯、巴溫、安塔瑞斯與巴拉卡斯等傳說首領；每個首領都有不同元素屬性與抗性。',
        tip: '首領可掉落史詩飾品、祝福卷軸、生命石與大量 SP。'
      },
      {
        heading: '⚡ 韌性與破防機制',
        text: '持續攻擊與元素技能會降低首領韌性。韌性歸零後首領會進入**破防**狀態：暈眩 4 秒並受到 **+50% 額外傷害**。',
        tip: '可保留高傷害技能與靈魂彈，在破防期間集中爆發。'
      },
      {
        heading: '🎫 每日團隊副本券',
        text: '每次每日重置會獲得 3 張團隊副本券；額外票券可從先驅者之旅、每日任務或戰鬥通行證取得。',
        tip: '盡量使用每日票券，以穩定取得首領飾品碎片。'
      }
    ]
  },

  colosseum: {
    id: 'colosseum',
    title: '👑 競技場、決鬥與大奧林匹亞',
    subtitle: '與其他冒險者競爭，爭取亞丁貴族英雄稱號。',
    icon: '👑',
    color: '#f59e0b',
    sections: [
      {
        heading: '⚔️ 競技場 1 對 1 決鬥',
        text: '根據戰鬥力（CP）與排名挑戰其他玩家的即時資料鏡像。勝利可獲得榮譽點數並提升排名。',
        tip: '進入競技場前，建議先調整裝備並啟用自動靈魂彈。'
      },
      {
        heading: '🏛️ 大奧林匹亞（每月週期）',
        text: '僅限貴族與精英戰士參加的排名競賽；每場勝利都會增加職業積分。',
        tip: '每個週期結束時，各職業第 1 名會成為亞丁英雄，獲得金色光環、特殊稱號與英雄武器。'
      }
    ]
  },

  clan: {
    id: 'clan',
    title: '🛡️ 血盟、聯盟與血盟技能',
    subtitle: '加入血盟與夥伴共同征戰亞丁，並解鎖團隊被動加成。',
    icon: '🛡️',
    color: '#3b82f6',
    sections: [
      {
        heading: '🏰 血盟等級與被動技能',
        text: 'Conforme os membros doam Adena e SP, o nível do Clã sobe (Nv. 1 ao Nv. 5), desbloqueando habilidades para TODOS os membros:\n• **Nv. 1 Clan Imperium**: +10% Max HP\n• **Nv. 2 Clan Might**: +8% 物攻\n• **Nv. 3 Clan Shield**: +10% 物防\n• **Nv. 4 Clan Empower**: +10% 魔攻 e +12% 魔防\n• **Nv. 5 Clan Vitality**: +20% Regen MP e +5 Velocidade',
        tip: '加入活躍血盟能為角色戰鬥力帶來可觀提升。'
      },
      {
        heading: '💎 每日捐獻與聲望',
        text: '每天可向血盟金庫捐獻金幣或 SP 以累積聲望；聲望是維持加成與升級血盟的重要資源。',
        tip: '捐獻也會推進先驅者之旅與戰鬥通行證目標。'
      }
    ]
  },

  referral: {
    id: 'referral',
    title: '👥 聯絡人、好友、師徒與推薦',
    subtitle: '管理好友、綁定導師、發送密語並領取推薦獎勵。',
    icon: '👥',
    color: '#34d399',
    sections: [
      {
        heading: '👥 聯絡人管理與好友清單',
        text: '聯絡人選單可管理遊戲中的社交關係：\n• **新增好友**：依角色名稱最多登錄 128 名好友，查看等級、職業與在線狀態。\n• **直接聯絡**：發送即時密語或使用郵件。\n• **隊伍與血盟邀請**：快速邀請好友加入狩獵隊伍或血盟。\n• **封鎖清單**：最多可封鎖 64 名玩家。',
        tip: '可隨時透過上方「👥 聯絡人」或「榮耀與社交」分頁開啟此功能。'
      },
      {
        heading: '🎓 師徒系統（新手至等級 20）',
        text: '師徒系統讓老手與新手共同成長：\n• **新手（Lv. 20 以下）**：綁定導師後立即獲得**永久 +10% 經驗值**、**1,000 發無等級靈魂彈／魔靈彈**與**10 瓶生命藥水**。\n• **成長里程碑（等級 40）**：完成第二次轉職後，徒弟與導師都可獲得 **50 亞丁幣（AC）**與 **5 張祝福武器強化卷軸**。\n• **快速綁定**：在好友清單選擇玩家並點擊「🎓 設為導師」即可綁定。',
        tip: '導師綁定必須在等級 20 前完成，可利用新手加成加快前期成長。'
      },
      {
        heading: '🎁 專屬連結、WhatsApp 與 Discord 社群',
        text: '邀請朋友一起使用瀏覽器遊玩並共同取得獎勵：\n• **專屬連結**：複製個人推薦連結（`?ref=你的名稱`），或一鍵分享到 WhatsApp。\n• **領取獎勵**：當受邀玩家達到等級 40 時，使用「檢查並領取獎勵」取得獎品。\n• **官方 Discord**：可加入社群交易物品、參加活動與交流。\n\n🔗 官方連結：**https://discord.gg/R7rwB5uCc**',
        tip: '可留意 Discord 公告頻道，以取得活動禮物碼與限定獎勵。'
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
 * Abre a janela Modal com o Guia da Aba informada
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
          💡 <strong>戰術提示：</strong> ${s.tip}
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
          const shortTitle = (k === 'resonance') ? '武器共鳴' : g.title.split('&')[0].split('(')[0].replace(/[^\w\sÀ-ú]/g, '').trim();
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
          ❓ 你可以隨時使用<strong>分頁指南</strong>按鈕或畫面上方的指南按鈕重新開啟本指南。
        </span>
        <button onclick="window.closeTabGuideModal()" style="padding: 8px 20px; font-family: 'Cinzel', serif; font-weight: bold; font-size: 12px; background: linear-gradient(180deg, #d4a744, #8a641c); border: 1px solid #ffe699; color: #000; border-radius: 6px; cursor: pointer; box-shadow: 0 2px 10px rgba(212, 167, 68, 0.3);">
          了解，繼續遊戲！
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
 * Renderiza/atualiza o botão flutuante "❓ Guia da Aba" no canto do painel ativo.
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
    topGuideBtn.title = `指南： ${guideData?.title || tabKey}`;
    topGuideBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      openTabGuideModal(guideKey);
    };
  }
}
