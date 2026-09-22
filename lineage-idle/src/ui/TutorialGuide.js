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
        text: 'O CP do herói reflete fielmente a soma de:\n1. Atributos Base por Raça/Classe\n2. Nível do Herói\n3. Poder de Ataque & Magia das Armas\n4. Defesa Física & Mágica do Set\n5. Níveis de Encantamento (+1 a +16)\n6. Soul Crystals (SA - Focus, Health, Acumen)\n7. Joias Épicas de Boss (Queen Ant, Baium, Valakas)\n8. Atributos Elementais de Arma e Armadura\n9. 技能 Passivas e Mestrias de Arma\n10. Maestria Astral (Dragão & Fênix)\n11. Elixires Permanentes de Alquimia\n12. 技能 de 血盟 (Imperium, Might, Shield)\n13. Coleções Completas no Codex\n14. Boss Dolls Equipadas & Sintetizadas\n15. Certificações de Subclasse',
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
        text: 'Os itens são divididos em Graus pelo seu Nível:\n• **No-Grade**: Nível 1 ao 19\n• **D-Grade**: Nível 20 ao 39\n• **C-Grade**: Nível 40 ao 51\n• **B-Grade**: Nível 52 ao 61\n• **A-Grade**: Nível 62 ao 75\n• **S-Grade / Frost Lord**: Nível 76 ao 85+',
        tip: '盡量裝備目前等級可使用的最高品級，以取得更好的套裝加成！'
      },
      {
        heading: '🧪 裝備合成系統',
        text: '點擊背包上方的 **🧪 合成**，可將 2 件相同且同等級的裝備融合。成功後物品會升級（Lv.1 ➔ Lv.2），每級獲得 **+15% 屬性加成**。',
        tip: '合成失敗時主物品不會損壞，只會消耗素材物品！'
      },
      {
        heading: '🧹 Auto-Venda & Desmontar',
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
        text: 'O sistema de **Dual Arsenal** permite que o herói equipe uma arma primária no **Slot 1 (Arma)** e uma arma secundária ou escudo no **Slot 2 (Secundária / Escudo)**.\n\nQuando as armas equipadas formam uma combinação compatível, a Ressonância é ativada instantaneamente:\n• **+1.240 Pontos de Combat Power (CP)** no cálculo canônico do personagem.\n• **Bônus de Atributos Passivos** (+20% P.Def, +15% Atk.Spd, +12% Cast.Spd, Evasão, Chance Crítica, etc.).\n• **Procs Táticos de 戰鬥** aplicados no monstro em tempo real (Fratura Tática, Estocada Perfurante, Lentidão, Detonação de Toxinas, Redução de Armadura e Dano Elemental Híbrido).\n• **Balanceamento Focado 1v1**: Todas as 27 ressonâncias foram calibradas para combate individual focado, sem habilidades de área (AoE) quebradas.',
        tip: '可在背包頂部的金色橫幅查看目前啟用的共鳴！'
      },
      {
        heading: '📜 27 種武器共鳴圖鑑',
        customHtml: renderResonancesCatalogHtml(),
        tip: '可以嘗試更換副武器：使用盾牌提升防禦，或使用匕首／雙刀追求高速暴擊！'
      },
      {
        heading: '🛡️ Regras de Compatibilidade & Dicas Táticas',
        text: '• **Armas de 2 Mãos e Arco**: Arcos, Espadas de 2 Mãos e Lanças têm regras especiais de compatibilidade com secundárias leves para liberar ressonâncias únicas.\n• **Grau das Armas**: A ressonância independe do grau (No-Grade ao S-Grade). Qualquer nível de arma ativa a sinergia.\n• **Troca Instantânea**: Ao desequipar ou trocar de arma, os bônus e o CP são recalculados imediatamente no StatsEngine.',
        tip: 'Armas com Soul Crystals (SA), Atributos Elementais e Augmentations somam seus bônus integralmente à ressonância ativa!'
      }
    ]
  },

  warehouse: {
    id: 'warehouse',
    title: '📦 Baú do Banco & Armazenamento',
    subtitle: 'Guarde seus tesouros e transfira itens entre suas subclasses.',
    icon: '📦',
    color: '#caa06a',
    sections: [
      {
        heading: '🔒 Armazenamento Seguro',
        text: 'Deposite Adena e itens valiosos no seu Baú Pessoal. O baú é compartilhado entre todas as suas subclasses do personagem.',
        tip: 'Use o botão "Depositar Materiais" para enviar rapidamente todos os insumos de criação ao banco.'
      }
    ]
  },

  skills: {
    id: 'skills',
    title: '⚡ 技能, Cargas & Almas Kamael',
    subtitle: 'Domine suas habilidades ativas, passivas, cargas e almas de combate.',
    icon: '⚡',
    color: '#38bdf8',
    sections: [
      {
        heading: '📖 Árvore de 技能',
        text: 'Gaste seus Pontos de Habilidade (SP) para aprender e evoluir habilidades ativas e passivas da sua classe. 技能 passivas concedem bônus permanentes.',
        tip: '技能 de dano utilizam a autêntica fórmula de dano físico de RPG clássico (Multiplicador de constante 77/70).'
      },
      {
        heading: '⚡ Cargas de Habilidade (Charge Lv. 1-8)',
        text: 'Classes de combate acumulam Cargas de Habilidade durante o ataque. Cada nível de Carga aumenta o dano da sua próxima habilidade em **+20%** (até o limite de Carga Nível 8).',
        tip: 'Acumule 8 cargas antes de soltar sua habilidade mais forte para causar um dano devastador!'
      },
      {
        heading: '👻 Almas Kamael (1-5 Almas)',
        text: 'Personagens Kamael absorvem almas dos monstros derrotados. Cada alma acumulada concede **+5% de Dano de Skill** adicional.',
        tip: 'Almas Kamael podem ser consumidas para ativar habilidades especiais e transformações!'
      }
    ]
  },

  shop: {
    id: 'shop',
    title: '🛍️ 市場r & 市場 da Cidade',
    subtitle: 'Compre poções, soulshots, insumos de criação e joias.',
    icon: '🛍️',
    color: '#facc15',
    sections: [
      {
        heading: '🧪 Consumíveis de Sobrevivência',
        text: 'Abasteça seu estoque de Poções de HP (P, M, G, XL), Poções de MP e Soulshots/Spiritshots. O abastecimento garante que seu auto-combate não seja interrompido.',
        tip: 'Poções de tamanho XL restauram uma grande quantidade de HP de forma instantânea durante Raids!'
      },
      {
        heading: '🔮 市場 Místico Rotativo',
        text: 'O 市場 Místico atualiza ofertas especiais contendo Joias de Boss e materiais raros em intervalos de tempo.',
        tip: 'Fique atento aos estoques limitados do 市場 Místico para adquirir fragmentos de joias épicas!'
      }
    ]
  },

  craft: {
    id: 'craft',
    title: '⚒️ Forja Imperial & Criação Universal',
    subtitle: 'Explore todas as subabas da Forja: Crafting, Soul Crystals, Pushkin MW, Dyes, Elementos, Cintos e Life Stones.',
    icon: '⚒️',
    color: '#f59e0b',
    sections: [
      {
        heading: '⚒️ Crafting de 裝備',
        text: 'Crie armas, armaduras, capas, cintos e joias utilizando matérias-primas como Iron Ore, Oriharukon, Adamantite e Leather.',
        tip: 'Subir seu Nível de Forja desbloqueia receitas de Graus mais elevados (Grade A e S).'
      },
      {
        heading: '🔮 Soul Crystals (SA)',
        text: 'Forje e engaste Soul Crystals (Red, Green, Blue) em armas para liberar Special Abilities (SA) como Health (+25% HP), Focus (+80 Crit) ou Acumen (+15% Cast).',
        tip: 'Você pode fundir 2 Soul Crystals do mesmo nível para subir seu grau.'
      },
      {
        heading: '✨ Mestre Pushkin MW (Masterwork)',
        text: 'Leve equipamentos comuns ao Mestre Pushkin para forjar a versão **Masterwork (MW)**, garantindo bônus adicionais de status e aura cintilante.',
        tip: 'Itens Masterwork possuem multiplicadores superiores aos itens base!'
      },
      {
        heading: '🔥 Atributos Elementais (+300 Element)',
        text: 'Incuta Pedras Elementais (*Fogo, Água, Terra, Vento, Escuridão, Sagrado*) em Armas e Peitorais. Garante até +70% de dano extra PvE contra monstros vulneráveis.',
        tip: 'O primeiro engaste concede +20 de Atributo e engastes seguintes concedem +5.'
      },
      {
        heading: '🎗️ Síntese de Cintos [S]',
        text: 'Sintetize o lendário **Blessed Top-Grade Magic Ornament Belt [S]** com 70% de chance de sucesso por 500k Adena. Concede **+7.2% Defesa PvE** e **+6% Dano**.',
        tip: 'O cinto abençoado é uma das melhores peças defensivas do jogo!'
      },
      {
        heading: '💎 Augmentation / Life Stones',
        text: 'Utilize Superior Life Stones em Armas e Joias Épicas (*Queen Ant, Baium, Valakas, Zaken, Antharas*) para liberar Item Skills passivas (Might, Empower, Shield, Focus, Celestial).',
        tip: 'A habilidade Celestial Shield concede 7 segundos de invencibilidade completa!'
      }
    ]
  },

  alchemy: {
    id: 'alchemy',
    title: '🧪 Laboratório de Alquimia',
    subtitle: 'Destile Elixires de Atributos e reagentes mágicos.',
    icon: '🧪',
    color: '#10b981',
    sections: [
      {
        heading: '🍷 Elixires de Status Permanentes',
        text: 'Combine essências e cristais para criar Elixires de STR, DEX, CON, INT, WIT e MEN. Cada elixir consumido aumenta permanentemente o atributo base do seu personagem.',
        tip: 'Há um limite de elixires por nível. Elabore primeiro os atributos focados na sua classe principal!'
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
        heading: '🐉 Constelação do Dragão (Ofensiva)',
        text: 'Gaste Fragmentos Astrais para evoluir nós de Fúria Titânica (+P.Atk), Chama Arcana (+M.Atk), Golpe Mortal (+Crit Chance) e Lâmina Suprema (+Crit Dmg).',
        tip: 'Foque na Constelação do Dragão se quiser acelerar o tempo de caça dos monstros!'
      },
      {
        heading: '🦅 Constelação da Fênix (Defensiva)',
        text: 'Evolua Sangue da Fênix (+HP%), Mente Iluminada (+MP%), Éter Sagrado (+Regen MP) e Escudo Divino (+P.Def/M.Def).',
        tip: 'Essencial para resistir aos golpes dos Raid Bosses mais poderosos.'
      }
    ]
  },

  expeditions: {
    id: 'expeditions',
    title: '🏰 Expedições, Manor & Castelos de Aden',
    subtitle: 'Plante sementes no Manor, conquiste Castelos e envie Expedições de Mercenários.',
    icon: '🏰',
    color: '#8b5cf6',
    sections: [
      {
        heading: '🌱 Sistema de Manor (Sementes & Colheita)',
        text: 'Compre Sementes do Manor, plante em zonas de caça e colha frutos ao derrotar monstros. Troque sua colheita na cidade por materiais raros de criação.',
        tip: 'O Manor é uma das formas mais baratas de conseguir minérios e tecidos raros!'
      },
      {
        heading: '👑 Castelos (Gludio, Giran, Aden)',
        text: 'Desafie os guardiões dos Castelos de Gludio, Giran e Aden. Conquistar um castelo garante **Impostos Diários em Adena** coletados de todo o servidor!',
        tip: 'Colete seus impostos diariamente no painel do Castelo!'
      },
      {
        heading: '⛵ Expedições de Mercenários',
        text: 'Envie esquadrões de mercenários em missões temporizadas (1h, 4h, 8h). Eles retornarão com caixas de suprimentos, receitas e Adena.',
        tip: 'Mantenha suas expedições sempre rodando em segundo plano!'
      }
    ]
  },

  codex: {
    id: 'codex',
    title: '📜 Codex & Coleção de Itens',
    subtitle: 'Complete coleções de equipamentos e Boss Dolls para desbloquear bônus na conta.',
    icon: '📜',
    color: '#34d399',
    sections: [
      {
        heading: '📚 Coleções de 裝備',
        text: 'Ao obter equipamentos e joias repetidas, registre-os no Codex. Completar um conjunto de coleção concede bônus permanentes como +P.Atk, +M.Atk, +HP ou +Def.',
        tip: 'Mesmo itens de No-Grade concedem bônus valiosos quando a coleção é completada!'
      }
    ]
  },

  dolls: {
    id: 'dolls',
    title: '🎎 Boss Dolls & Sintetizador',
    subtitle: 'Equipe colecionáveis de chefes lendários e faça fusões.',
    icon: '🎎',
    color: '#f43f5e',
    sections: [
      {
        heading: '👑 Boss Dolls (Queen Ant, Baium, Zaken, Antharas)',
        text: 'Dolls de Chefes concedem bônus massivos de atributos atipicamente altos. Você pode equipar Dolls no seu inventário.',
        tip: 'Dolls de grau elevado concedem redução de dano e vampirismo de vida!'
      },
      {
        heading: '🔮 Sintetizador de Dolls',
        text: 'Combine 3 Dolls idênticas do mesmo grau no Sintetizador para tentar evoluir para o próximo nível de raridade.',
        tip: 'Em caso de sucesso, a Doll ganha efeitos visuais brilhantes e atributos duplicados.'
      }
    ]
  },

  quests: {
    id: 'quests',
    title: '📜 任務, Bounties & Passe de Batalha',
    subtitle: 'Cumpra objetivos diários para ganhar Adena, SP e itens exclusivos.',
    icon: '📜',
    color: '#fbbf24',
    sections: [
      {
        heading: '🎯 任務 Diárias & Caçadas',
        text: 'Derrote uma quantidade estipulada de monstros ou chefes diariamente para resgatar baús de suprimentos e cupons de teleporte.',
        tip: 'Reivindique todas as recompensas diárias antes do reset da meia-noite!'
      },
      {
        heading: '🎫 Passe de Batalha (Adena Pass)',
        text: 'Acumule pontos de passe ao jogar para subir de nível no Passe. Desbloqueie recompensas gratuitas e aprimore para o Passe Premium para prêmios lendários.',
        tip: 'O Passe Premium concede pergaminhos de enchant abençoados!'
      }
    ]
  },

  tower: {
    id: 'tower',
    title: '🏰 Torre da Insolência (Tower of Insolence)',
    subtitle: 'Desafie os 100 andares da torre e varra recompensas diárias.',
    icon: '🏰',
    color: '#c084fc',
    sections: [
      {
        heading: '🧗 Escalada dos 100 Andares',
        text: 'Enfrente guardiões e chefes em andares progressivamente mais difíceis. Cada andar superado concede recompensas únicas e desbloqueia o Sweep Diário.',
        tip: 'Se falhar em um andar, fortaleça seus equipamentos na Forja antes de tentar novamente!'
      },
      {
        heading: '🧹 Varredura Diária (Sweep)',
        text: 'Uma vez por dia, utilize o botão "Varredura Diária" para coletar instantaneamente as recompensas de todos os andares já superados!',
        tip: 'Quanto mais alto você subir na torre, maior será a quantidade diária de Adena e SP coletada!'
      }
    ]
  },

  raids: {
    id: 'raids',
    title: '🏰 Masmorras Diárias & Epic Raid Bosses',
    subtitle: 'Enfrente os maiores terrores de Aden em batalhas com mecânicas de Break e drops lendários.',
    icon: '🏰',
    color: '#ef4444',
    sections: [
      {
        heading: '👹 Chefes Épicos Clássicos (Queen Ant, Baium, Valakas...)',
        text: 'Desafie chefes lendários como Queen Ant, Core, Orfen, Zaken, Baium, Antharas e Valakas. Cada chefe possui atributos elementais e resistências próprias.',
        tip: 'Bosses concedem Joias Épicas, Pergaminhos Abençoados, Life Stones e SP massivo!'
      },
      {
        heading: '⚡ Mecânica de Postura & Janela de BREAK',
        text: 'Ataques contínuos e habilidades com atributos elementais reduzem a postura do Boss. Ao esvaziar a barra de postura, o Boss entra em **BREAK**: fica atordoado por 4 segundos e recebe **+50% de dano amplificado**!',
        tip: 'Guarde suas habilidades mais destrutivas e Soulshots para descarregar durante o BREAK!'
      },
      {
        heading: '🎫 Ingressos Diários de Raid',
        text: 'Você recebe 3 Ingressos Diários de Raid a cada reset diário. Ingressos extras podem ser obtidos na Jornada dos Pioneiros, 任務 Diárias ou no Passe de Batalha.',
        tip: 'Mantenha os ingressos sempre em uso para maximizar seus fragmentos de Joias de Boss!'
      }
    ]
  },

  colosseum: {
    id: 'colosseum',
    title: '👑 Coliseu, Duelos & Grande Olimpíada',
    subtitle: 'Prove seu valor contra outros aventureiros e busque o título de Herói Nobre de Aden.',
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
        text: 'Disputas ranqueadas exclusivas para Noblesses e Guerreiros de elite. Cada vitória soma pontos ao seu Rank de Classe.',
        tip: 'No final de cada ciclo, o 1º colocado de cada classe torna-se o HERÓI DE ADEN, recebendo Aura Dourada, Título Luminoso e Armas Heroicas!'
      }
    ]
  },

  clan: {
    id: 'clan',
    title: '🛡️ 血盟s, Alianças & 技能 de 血盟',
    subtitle: 'Junte-se a uma irmandade para dominar Aden e desbloquear bônus passivos de equipe.',
    icon: '🛡️',
    color: '#3b82f6',
    sections: [
      {
        heading: '🏰 Níveis de 血盟 & 技能 Passivas',
        text: 'Conforme os membros doam Adena e SP, o nível do 血盟 sobe (Nv. 1 ao Nv. 5), desbloqueando habilidades para TODOS os membros:\n• **Nv. 1 Clan Imperium**: +10% Max HP\n• **Nv. 2 Clan Might**: +8% P.Atk\n• **Nv. 3 Clan Shield**: +10% P.Def\n• **Nv. 4 Clan Empower**: +10% M.Atk e +12% M.Def\n• **Nv. 5 Clan Vitality**: +20% Regen MP e +5 Velocidade',
        tip: 'Participar de um 血盟 ativo é um dos maiores saltos de poder para o seu Combat Power (CP)!'
      },
      {
        heading: '💎 Doações Diárias & Reputação',
        text: 'Faça doações de Adena ou SP para o cofre do clã todos os dias para acumular Pontos de Reputação. A reputação é necessária para manter bônus e evoluir o clã.',
        tip: 'Doar também completa passos da Jornada dos Pioneiros e do Passe de Batalha!'
      }
    ]
  },

  referral: {
    id: 'referral',
    title: '👥 Contatos, Amigos, Mentoria & Indicação',
    subtitle: 'Gerencie sua rede de contatos, vincule mentores, envie sussurros e receba recompensas épicas!',
    icon: '👥',
    color: '#34d399',
    sections: [
      {
        heading: '👥 Gerenciador de Contatos & Lista de Amigos',
        text: 'O menu de Contatos permite gerenciar sua rede social completa dentro do Aden Arena:\n• **Adicionar Amigos (+ Adicionar):** Registre até 128 amigos pelo nome de personagem para acompanhar seu nível, classe e status (Online/Offline).\n• **Comunicação Direta:** Envie **Sussurros instantâneos (💬 Msg)** ou envie cartas via **Correio Expresso (✉️ Mail)**.\n• **Ações Rápidas de Grupo e 血盟:** Convide facilmente seus companheiros para seu **Grupo (Party)** de caça ou para o seu **血盟**.\n• **Lista de Bloqueados:** Bloqueie até 64 jogadores indesejados para manter seu foco e tranquilidade nas batalhas.',
        tip: 'Acesse o menu a qualquer momento clicando no botão "👥 Contatos" na barra superior ou na aba "Glória & Sociedade"!'
      },
      {
        heading: '🎓 Sistema de Mentoria (Iniciantes até o Nível 20)',
        text: 'A mentoria fortalece os laços entre guerreiros veteranos e novatos:\n• **Sou Novato (Até Nv. 20):** Vincule um mentor experiente para receber imediatamente **+10% EXP permanente**, **1.000 Soulshots/Spiritshots No-Grade** e **10 Poções de Vida**!\n• **Marco de Evolução (Nível 40):** Ao atingir a 2ª Troca de Classe (Nv. 40), o Pupilo e o Mentor são recompensados com **50 Aden Coins (AC)** + **5x Pergaminhos Abençoados de Arma (Blessed Scrolls)**!\n• **Vínculo Rápido:** Selecione qualquer amigo na sua lista e clique em **"🎓 Tornar Mentor"** para vinculá-lo instantaneamente.',
        tip: 'O vínculo de mentor deve ser realizado antes do Nível 20. Aproveite esse impulso inicial para acelerar sua jornada!'
      },
      {
        heading: '🎁 Link Exclusivo, WhatsApp & Comunidade Discord',
        text: 'Traga amigos para jogar no navegador e ganhem recompensas juntos:\n• **Link Exclusivo:** Copie seu link pessoal (`?ref=SeuNome`) ou use o botão de **Compartilhar no WhatsApp** com 1 clique.\n• **Resgate de Recompensas:** Use o botão **"Verificar & Resgatar Recompensas"** para coletar os prêmios conforme seus pupilos alcançam o Nível 40.\n• **Discord Oficial:** Junte-se à comunidade oficial para negociar itens, participar de eventos e tirar dúvidas!\n\n🔗 Link Oficial: **https://discord.gg/R7rwB5uCc**',
        tip: 'Fique atento aos canais de avisos no Discord para resgatar Cupons de Presente com bônus exclusivos!'
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
          ❓ Você pode reabrir este guia a qualquer momento no botão <strong>指南 da Aba</strong> ou no topo da tela.
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
