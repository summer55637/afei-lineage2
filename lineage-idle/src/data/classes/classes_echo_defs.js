// ============================================================
// LINEAGE 2 ESSENCE 547 - ECHO OF ELEMENTS
// classes_echo.js - VERSÃO COMPLETA
// Regra: Skills aprendidas nas classes anteriores PERMANECEM
// ============================================================

const RACES_ECHO = {
  human:    { name: '人類',     desc: '多才多藝，在戰鬥與魔法方面表現均衡。',       stats: { atk: 0,  def: 0,  eva: 0,  matk: 0,  mdef: 0  }, startZone: 'talkingIsland' },
  elf:      { name: '精靈',       desc: '優雅靈巧，擁有高迴避與攻擊速度。',    stats: { atk: 0,  def:-2,  eva: 8,  matk: 0,  mdef: 0  }, startZone: 'talkingIsland' },
  darkelf:  { name: '黑暗精靈',  desc: '擅長暴擊與強大的黑暗魔法。', stats: { atk: 2,  def:-2,  eva: 4,  matk: 6,  mdef: 2  }, startZone: 'talkingIsland' },
  orc:      { name: '半獸人',       desc: '體魄強韌，擁有強大力量與高 HP。',             stats: { atk: 4,  def: 6,  eva:-4,  matk:-2,  mdef:-2 }, startZone: 'talkingIsland' },
  dwarf:    { name: '矮人',     desc: '工藝大師，擁有額外掉落與製作加成。',        stats: { atk: 0,  def: 4,  eva:-2,  matk: 0,  mdef: 0, lootBonus: 0.15 }, startZone: 'talkingIsland' },
  kamael:   { name: '闇天使',    desc: '敏捷而致命，擅長靈魂力量與劍術。',   stats: { atk: 6,  def:-2,  eva: 6,  matk: 0,  mdef: 0  }, startZone: 'talkingIsland' },
  sylph:    { name: '風精靈',     desc: '操控風之元素、使用槍械的射手。', stats: { atk: 4,  def:-2,  eva:12,  matk: 2,  mdef: 0  }, startZone: 'talkingIsland' },
  highelf:  { name: '高等精靈',  desc: '擅長神聖魔法與神聖防禦的至高精靈。', stats: { atk: 0,  def: 2,  eva: 4,  matk: 8,  mdef: 4  }, startZone: 'talkingIsland' },
  ertheia:  { name: '艾爾提亞',   desc: '擁有高度魔法潛力的風之戰士。',    stats: { atk: 2,  def: 0,  eva:10,  matk: 4,  mdef: 0  }, startZone: 'talkingIsland' }
};

// ============================================================
//  FORMATO DE SKILL:
//  { name, type, rarity, effect, duration, cooldown, desc }
//  type: "Ativo" | "Passivo" | "Toggle" | "Self-Buff" | "Party-Buff"
//  rarity: "1★" | "2★" | "3★" | "4★"
//  Regra: Skills aprendidas em classes anteriores PERMANECEM
// ============================================================

const CLASSES_ECHO = {

  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  //  HUMAN FIGHTER
  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

  fighter: {
    name: '人類戰士', archetype: 'fighter', race: 'human', stage: 0,
    desc: '人類的基礎戰鬥職業。',
    base: { atk: 12, def: 10, hp: 100, mp: 30, eva: 5, crit: 5, matk: 0, mdef: 5 },
    skills: [
      { name: "強力打擊",       type: "Ativo",    rarity: "1★", effect: "物理傷害 150%",              cooldown: "8s",     desc: "對目標施展集中打擊。" },
      { name: "致命一擊",         type: "Ativo",    rarity: "1★", effect: "傷害 170% + 暴擊率 20%",   cooldown: "10s",    desc: "具有較高暴擊機率的攻擊。" },
      { name: "強力射擊",          type: "Ativo",    rarity: "1★", effect: "遠距傷害 140%",         cooldown: "9s",     desc: "集中力量進行射擊。" },
      { name: "突進",                type: "Ativo",    rarity: "1★", effect: "衝向目標 + 傷害 120%",    cooldown: "15s",    desc: "快速衝向敵人。" },
      { name: "包紮",             type: "Ativo",    rarity: "1★", effect: "治癒 15% HP",                   cooldown: "30s",    desc: "進行緊急治療。" },
      { name: "戰士意志",      type: "Self-Buff",rarity: "1★", effect: "+10% ATK 並 +10% DEF 持續 15 分鐘",cooldown: "30 min", desc: "戰士堅定的意志。" },
      { name: "HP 提升 Lv1",     type: "Passivo",  rarity: "1★", effect: "+5% 最大 HP",                    cooldown: "N/A",    desc: "強化體質。" },
      { name: "輕甲精通", type: "Passivo",  rarity: "1★", effect: "+8% DEF 裝備輕甲時",     cooldown: "N/A",    desc: "精通輕型防具。" }
    ]
  },

  // ─── WARRIOR (1ª classe) ───
  warrior: {
    name: '戰士', parent: 'fighter', race: 'human', archetype: 'fighter', stage: 1,
    desc: '專精劍與長柄武器的近戰戰士。保留先前學會的技能。',
    base: { atk: 28, def: 18, hp: 180, mp: 45, eva: 6, crit: 8, mdef: 8 },
    skills: [
      { name: "強力粉碎",           type: "Ativo",    rarity: "1★", effect: "傷害 190% + 擊退",               cooldown: "10s",    desc: "施展粉碎性重擊。" },
      { name: "旋轉斬",        type: "Ativo",    rarity: "1★", effect: "傷害 範圍 160% 周圍",              cooldown: "12s",    desc: "旋轉並斬擊周圍敵人。" },
      { name: "暈眩攻擊",           type: "Ativo",    rarity: "2★", effect: "傷害 175% + 暈眩 2 秒",                 cooldown: "18s",    desc: "可使敵人暈眩的打擊。" },
      { name: "鋼鐵意志",             type: "Ativo",    rarity: "2★", effect: "+30% DEF 持續 30 秒",                    cooldown: "45s",    desc: "暫時獲得鋼鐵般的意志。" },
      { name: "戰吼",               type: "Ativo",    rarity: "2★", effect: "+20% ATK 自身 持續 60 秒",            cooldown: "60s",    desc: "激發力量的戰鬥吶喊。" },
      { name: "戰鬥咆哮",           type: "Self-Buff",rarity: "2★", effect: "+25% ATK 並 +15% HP 持續 20 分鐘",       cooldown: "45 min", desc: "發出戰鬥咆哮。" },
      { name: "劍／鈍器精通",   type: "Passivo",  rarity: "1★", effect: "+12% ATK 使用劍／鈍器時",           cooldown: "N/A",    desc: "精通劍與鈍器。" },
      { name: "長柄武器精通",       type: "Passivo",  rarity: "1★", effect: "+12% ATK 使用長柄武器時",                cooldown: "N/A",    desc: "精通長槍與長柄武器。" },
      { name: "重甲精通",   type: "Passivo",  rarity: "1★", effect: "+12% DEF 裝備重甲時",        cooldown: "N/A",    desc: "精通重型防具。" },
      { name: "HP 提升 Lv2",       type: "Passivo",  rarity: "1★", effect: "+10% 最大 HP",                         cooldown: "N/A",    desc: "強化戰士體質。" },
      { name: "負重上限",          type: "Passivo",  rarity: "1★", effect: "+15% 負重上限",            cooldown: "N/A",    desc: "經過鍛鍊的身體可承受更多負重。" }
    ]
  },

  // ─── GLADIATOR (2ª classe) ───
  gladiator: {
    name: '角鬥士', parent: 'warrior', stage: 2,
    desc: '精通雙武器與強力連段。保留先前學會的技能。',
    base: { atk: 58, def: 28, hp: 320, mp: 65, eva: 8, crit: 18, mdef: 12 },
    skills: [
      { name: "三連斬",           type: "Ativo",    rarity: "2★", effect: "3 次打擊, 總傷害 300%",           cooldown: "14s",    desc: "快速連續斬擊三次。" },
      { name: "音速砲",          type: "Ativo",    rarity: "2★", effect: "傷害 240% + 暈眩 2 秒",                cooldown: "16s",    desc: "以音速衝擊使敵人暈眩。" },
      { name: "音速風暴",            type: "Ativo",    rarity: "3★", effect: "傷害 範圍 320% (8 目標)",            cooldown: "25s",    desc: "施展強大的音速風暴。" },
      { name: "音速爆裂",           type: "Ativo",    rarity: "2★", effect: "傷害 260% + 擊退",               cooldown: "18s",    desc: "向前方釋放音速爆炸。" },
      { name: "雙重音速斬",     type: "Ativo",    rarity: "3★", effect: "傷害 350%於2 次命中",                cooldown: "22s",    desc: "施展雙重音速斬擊。" },
      { name: "戰鎚粉碎",           type: "Ativo",    rarity: "2★", effect: "傷害 230% + 暈眩 3 秒",                cooldown: "20s",    desc: "以戰鎚施展粉碎攻擊。" },
      { name: "音速移動",             type: "Ativo",    rarity: "2★", effect: "短距離傳送 + 180% 傷害",        cooldown: "20s",    desc: "瞬間進行音速移動。" },
      { name: "獅子之心",              type: "Ativo",    rarity: "3★", effect: "免疫恐懼／暈眩 持續 15 秒",          cooldown: "120s",   desc: "獅子般的勇氣，意志不可動搖。" },
      { name: "戰鬥狂熱",             type: "Self-Buff",rarity: "2★", effect: "+20% 攻擊速度 持續 60 秒",             cooldown: "90s",    desc: "進入狂熱戰鬥狀態。" },
      { name: "兇猛姿態",         type: "Toggle",   rarity: "2★", effect: "+25% 暴擊率, -10% DEF",           cooldown: "N/A",    desc: "持續維持積極進攻姿態。" },
      { name: "角鬥士和諧",    type: "Self-Buff",rarity: "3★", effect: "+35% ATK 並 +20% 暴擊 持續 25 分鐘",    cooldown: "60 min", desc: "角鬥士的戰鬥和諧。" },
      { name: "雙武器精通",    type: "Passivo",  rarity: "2★", effect: "+18% ATK 使用雙持武器時",          cooldown: "N/A",    desc: "精通雙持武器。" },
      { name: "專注",                  type: "Passivo",  rarity: "1★", effect: "+8% 暴擊率",                      cooldown: "N/A",    desc: "集中攻擊敵人的要害。" },
      { name: "暴擊威力",         type: "Passivo",  rarity: "2★", effect: "+15% 暴擊傷害",                   cooldown: "N/A",    desc: "提高暴擊威力。" },
      { name: "HP 強化",               type: "Passivo",  rarity: "1★", effect: "+12% 最大 HP",                        cooldown: "N/A",    desc: "強化角鬥士的 HP。" }
    ]
  },

  // ─── DUELIST (3ª classe) ───
  duelist: {
    name: '決鬥者', parent: 'gladiator', stage: 3,
    desc: '至高決鬥者，精通雙武器戰鬥。保留先前學會的技能。',
    base: { atk: 105, def: 42, hp: 580, mp: 95, eva: 12, crit: 30, mdef: 18 },
    skills: [
      { name: "音速聚氣",               type: "Ativo",    rarity: "3★", effect: "傷害 380% + 無視 30% DEF",           cooldown: "28s",    desc: "凝聚毀滅性的音速力量。" },
      { name: "氣勁砲",             type: "Ativo",    rarity: "3★", effect: "傷害 340% 遠距",                cooldown: "20s",    desc: "發射音速氣勁彈。" },
      { name: "雙重打擊",                 type: "Ativo",    rarity: "3★", effect: "傷害 400% + 流血 8 秒",                 cooldown: "24s",    desc: "施展帶有流血效果的雙重攻擊。" },
      { name: "突進氣勁",             type: "Ativo",    rarity: "3★", effect: "突進 + 320% 傷害 + 暈眩 2 秒",           cooldown: "22s",    desc: "以強勁力量向前突進。" },
      { name: "長距打擊",                 type: "Ativo",    rarity: "2★", effect: "傷害 280% 延伸射程",          cooldown: "16s",    desc: "施展延伸距離的打擊。" },
      { name: "氣勁爆裂",              type: "Ativo",    rarity: "3★", effect: "傷害 範圍 360% 前方",               cooldown: "26s",    desc: "向前方釋放氣勁爆炸。" },
      { name: "地震",                type: "Ativo",    rarity: "3★", effect: "傷害 範圍 420% + 擊倒 3 秒",         cooldown: "35s",    desc: "引發毀滅性地震。" },
      { name: "真實目標",               type: "Ativo",    rarity: "2★", effect: "標記目標: +30% 傷害 對該目標 10 秒", cooldown: "30s",    desc: "辨識並鎖定敵人的弱點。" },
      { name: "戰鬥激情",              type: "Ativo",    rarity: "3★", effect: "+40% ATK 持續 30 秒 當 HP < 30%",     cooldown: "120s",   desc: "在危急狀態下激發腎上腺素。" },
      { name: "音速狂怒",                type: "Ativo",    rarity: "3★", effect: "傷害 450% + 範圍 5 目標",             cooldown: "30s",    desc: "釋放失控的音速狂怒。" },
      { name: "超越雙重打擊",    type: "Ativo",    rarity: "4★", effect: "傷害 620% + 流血 12 秒 + 無視 DEF",   cooldown: "150s",   desc: "施展超越極限的雙重打擊。" },
      { name: "決鬥者",         type: "Self-Buff",rarity: "4★", effect: "+55% ATK, +40% 暴擊, +20% 速度 30 分鐘",cooldown: "90 min", desc: "決鬥者的至高戰鬥和諧。" },
      { name: "戰鬥大師",          type: "Passivo",  rarity: "3★", effect: "+10% ATK, +10% 暴擊, +5% 對怪物 傷害",    cooldown: "N/A",    desc: "精通各式戰鬥技巧。" },
      { name: "決鬥者之魂",            type: "Passivo",  rarity: "3★", effect: "+15% 雙持武器攻擊",                 cooldown: "N/A",    desc: "決鬥者的戰鬥精神。" },
      { name: "決鬥者之刃",      type: "Passivo",  rarity: "3★", effect: "+12% 物理技能威力",                   cooldown: "N/A",    desc: "灌注強大力量的刀刃。" }
    ]
  },

  // ─── WARLORD (2ª classe) ───
  warlord: {
    name: '戰爭領主', parent: 'warrior', stage: 2,
    desc: '使用長柄武器施展大範圍毀滅攻擊。保留先前學會的技能。',
    base: { atk: 52, def: 38, hp: 380, mp: 60, eva: 5, crit: 10, mdef: 18 },
    skills: [
      { name: "旋風",              type: "Ativo",    rarity: "2★", effect: "傷害 範圍 280% (10 目標)",           cooldown: "18s",    desc: "以長槍掀起旋風攻擊。" },
      { name: "雷霆風暴",          type: "Ativo",    rarity: "3★", effect: "傷害 範圍 340% + 暈眩 2 秒",           cooldown: "25s",    desc: "召喚雷霆般的風暴攻擊。" },
      { name: "咆哮",                   type: "Ativo",    rarity: "2★", effect: "範圍 嘲諷 + -15% ATK 敵人 10 秒",  cooldown: "20s",    desc: "發出具有威嚇效果的咆哮。" },
      { name: "挑釁",               type: "Ativo",    rarity: "1★", effect: "嘲諷單一目標並造成 120% 傷害",           cooldown: "10s",    desc: "直接挑釁目標。" },
      { name: "橫掃",             type: "Ativo",    rarity: "2★", effect: "傷害 250% + 擊倒 2 秒",            cooldown: "20s",    desc: "施展強力橫掃攻擊。" },
      { name: "冰凍打擊",       type: "Ativo",    rarity: "2★", effect: "傷害 220% + 緩速 30% 持續 8 秒",         cooldown: "18s",    desc: "施展冰凍屬性打擊。" },
      { name: "燃燒劈砍",          type: "Ativo",    rarity: "2★", effect: "傷害 240% + 燃燒 8 秒",                 cooldown: "18s",    desc: "施展燃燒的劈砍攻擊。" },
      { name: "震擊踐踏",           type: "Ativo",    rarity: "2★", effect: "範圍 200% + 暈眩 2 秒 (近距離)",          cooldown: "22s",    desc: "以踐踏引發震擊。" },
      { name: "戰吼",               type: "Self-Buff",rarity: "2★", effect: "+25% ATK 持續 60 秒",                    cooldown: "90s",    desc: "戰爭領主的戰鬥吶喊。" },
      { name: "戰爭領主和諧",     type: "Self-Buff",rarity: "3★", effect: "+30% ATK, +25% HP 持續 25 分鐘",        cooldown: "60 min", desc: "戰爭領主的戰鬥和諧。" },
      { name: "生命之力",           type: "Passivo",  rarity: "1★", effect: "+10% HP 恢復",                       cooldown: "N/A",    desc: "強化生命恢復能力。" },
      { name: "專注",                 type: "Passivo",  rarity: "1★", effect: "+8% 暴擊率",                       cooldown: "N/A",    desc: "提升專注力。" },
      { name: "HP 強化",              type: "Passivo",  rarity: "1★", effect: "+15% 最大 HP",                         cooldown: "N/A",    desc: "強化 HP。" }
    ]
  },

  // ─── DREADNOUGHT (3ª classe) ───
  dreadnought: {
    name: '恐懼戰艦', parent: 'warlord', stage: 3,
    desc: '以長柄武器施展大範圍攻擊的重裝戰士。保留先前學會的技能。',
    base: { atk: 95, def: 62, hp: 650, mp: 85, eva: 6, crit: 14, mdef: 32 },
    skills: [
      { name: "突進衝擊",               type: "Ativo",    rarity: "3★", effect: "突進 + 350% 傷害 + 暈眩 3 秒",              cooldown: "25s",    desc: "施展毀滅性的突進攻擊。" },
      { name: "恐懼領域",                type: "Ativo",    rarity: "3★", effect: "範圍 持續 200%/s 持續 5 秒 (8 目標)",    cooldown: "35s",    desc: "創造恐懼區域。" },
      { name: "刺擊",                     type: "Ativo",    rarity: "3★", effect: "傷害 380% + 穿透 DEF 40%",             cooldown: "28s",    desc: "施展具有穿透力的刺擊。" },
      { name: "抗魔護甲",          type: "Ativo",    rarity: "3★", effect: "+50% 魔法防禦 持續 20 秒",                      cooldown: "60s",    desc: "提高對魔法的防禦能力。" },
      { name: "武器封鎖",           type: "Ativo",    rarity: "3★", effect: "解除武裝 敵人 持續 5 秒",                  cooldown: "45s",    desc: "封鎖敵人的武器。" },
      { name: "獅子之心",                 type: "Ativo",    rarity: "3★", effect: "免疫恐懼／暈眩 15 秒",                   cooldown: "120s",   desc: "獲得獅子般的勇氣。" },
      { name: "戰鬥狂熱",                type: "Self-Buff",rarity: "3★", effect: "+30% 攻擊速度 持續 45 秒",                  cooldown: "90s",    desc: "進入完全狂熱狀態。" },
      { name: "超越旋風",    type: "Ativo",    rarity: "4★", effect: "傷害 範圍 600% + 擊倒 (12 目標)",    cooldown: "160s",   desc: "施展超越極限的旋風攻擊。" },
      { name: "恐懼戰艦和諧",     type: "Self-Buff",rarity: "4★", effect: "+50% ATK, +35% HP, +20% DEF 30 分鐘",      cooldown: "90 min", desc: "恐懼戰艦的戰鬥和諧。" },
      { name: "戰鬥大師",          type: "Passivo",  rarity: "3★", effect: "+10% ATK, +10% 範圍 傷害, +5% 對怪物",        cooldown: "N/A",    desc: "精通各式戰鬥技巧。" },
      { name: "恐懼戰艦之魂",        type: "Passivo",  rarity: "3★", effect: "+15% 長柄武器攻擊",                        cooldown: "N/A",    desc: "恐懼戰艦的戰鬥精神。" },
      { name: "恐懼戰艦之軀",   type: "Passivo",  rarity: "3★", effect: "+10% 最大 HP, +10% DEF",                  cooldown: "N/A",    desc: "獲得近乎無法摧毀的身軀。" }
    ]
  },

  // ─── KNIGHT (1ª classe) ───
  knight: {
    name: '騎士', parent: 'fighter', race: 'human', archetype: 'tank', stage: 1,
    desc: '使用盾牌承受傷害的防禦型騎士。保留先前學會的技能。',
    base: { atk: 18, def: 32, hp: 250, mp: 50, eva: 4, crit: 4, mdef: 18 },
    skills: [
      { name: "盾牌打擊",         type: "Ativo",    rarity: "1★", effect: "傷害 170% + 嘲諷 5 秒",             cooldown: "10s",    desc: "以盾牌攻擊敵人。" },
      { name: "仇恨",                  type: "Ativo",    rarity: "1★", effect: "嘲諷 目標 + 最高仇恨",        cooldown: "8s",     desc: "激起目標對自己的仇恨。" },
      { name: "仇恨光環",          type: "Ativo",    rarity: "2★", effect: "範圍 嘲諷 (5 目標) 8 秒",           cooldown: "18s",    desc: "釋放吸引敵人的仇恨光環。" },
      { name: "力量削弱",           type: "Ativo",    rarity: "1★", effect: "傷害 150% + -20% ATK 敵人 8 秒",  cooldown: "14s",    desc: "削弱敵人的力量。" },
      { name: "神聖治癒",           type: "Ativo",    rarity: "2★", effect: "治癒 20% HP 自身",              cooldown: "25s",    desc: "以神聖力量治療自己。" },
      { name: "騎士和諧",      type: "Self-Buff",rarity: "2★", effect: "+25% DEF 並 +20% HP 持續 20 分鐘",    cooldown: "45 min", desc: "騎士的戰鬥和諧。" },
      { name: "重甲精通",   type: "Passivo",  rarity: "1★", effect: "+15% DEF 裝備重甲時",     cooldown: "N/A",    desc: "精通重型防具。" },
      { name: "盾牌精通",        type: "Passivo",  rarity: "1★", effect: "+15% 格擋率",                  cooldown: "N/A",    desc: "精通盾牌防禦。" },
      { name: "劍／鈍器精通",   type: "Passivo",  rarity: "1★", effect: "+10% ATK 劍／鈍器",            cooldown: "N/A",    desc: "精通劍類武器。" },
      { name: "HP 提升 Lv2",       type: "Passivo",  rarity: "1★", effect: "+12% 最大 HP",                      cooldown: "N/A",    desc: "進一步強化體質。" },
      { name: "箭矢偏轉",         type: "Passivo",  rarity: "1★", effect: "+10% 機率 閃避投射物",    cooldown: "N/A",    desc: "提高對投射物的閃避能力。" }
    ]
  },

  // ─── PALADIN (2ª classe) ───
  paladin: {
    name: '聖騎士', parent: 'knight', stage: 2,
    desc: '兼具治療與守護能力的神聖騎士。保留先前學會的技能。',
    base: { atk: 38, def: 65, hp: 520, mp: 100, eva: 5, crit: 6, mdef: 42 },
    skills: [
      { name: "盾牌暈擊",           type: "Ativo",    rarity: "2★", effect: "傷害 210% + 暈眩 3 秒",             cooldown: "18s",    desc: "以盾牌重擊使敵人暈眩。" },
      { name: "神聖之刃",            type: "Ativo",    rarity: "2★", effect: "傷害 神聖 260%",               cooldown: "16s",    desc: "以神聖力量強化刀刃。" },
      { name: "神聖打擊",           type: "Ativo",    rarity: "3★", effect: "傷害 神聖 320% + 不死族 2x",   cooldown: "20s",    desc: "施展強力神聖打擊。" },
      { name: "威嚴",               type: "Ativo",    rarity: "3★", effect: "7 秒內不會死亡（HP 最低保留 1）",cooldown: "180s",  desc: "獲得神聖威嚴。" },
      { name: "天使聖像",          type: "Self-Buff",rarity: "3★", effect: "+30% DEF, +30% 魔法防禦 持續 30 秒",    cooldown: "120s",   desc: "召喚天使般的神聖力量。" },
      { name: "犧牲",             type: "Ativo",    rarity: "2★", effect: "治癒盟友 30% HP (消耗 10% 自身)",cooldown: "25s",desc: "犧牲自身力量守護盟友。" },
      { name: "神盾",                 type: "Ativo",    rarity: "2★", effect: "+60% 格擋率 持續 15 秒",         cooldown: "45s",    desc: "展開強力防禦。" },
      { name: "復仇",             type: "Ativo",    rarity: "3★", effect: "反射 30% 傷害 受到的 持續 15 秒",cooldown: "60s",   desc: "以神聖力量反擊敵人。" },
      { name: "終極防禦",      type: "Ativo",    rarity: "3★", effect: "+80% DEF, -50% ATK 持續 15 秒",      cooldown: "120s",   desc: "進入近乎絕對的防禦狀態。" },
      { name: "神聖祝福",         type: "Ativo",    rarity: "2★", effect: "移除 2 個減益效果",                cooldown: "30s",    desc: "施放具有淨化效果的祝福。" },
      { name: "召喚風暴晶體",    type: "Ativo",    rarity: "2★", effect: "召喚 晶體的傷害 雷電",   cooldown: "60s",    desc: "召喚風暴晶體協助戰鬥。" },
      { name: "挑釁",               type: "Ativo",    rarity: "1★", effect: "嘲諷 + 高仇恨",             cooldown: "8s",     desc: "挑釁敵人並吸引其注意。" },
      { name: "聖騎士和諧",     type: "Self-Buff",rarity: "3★", effect: "+40% DEF, +30% HP, +20% 魔法防禦 25 分鐘",cooldown: "60 min",desc: "聖騎士的戰鬥和諧。" },
      { name: "神聖／黑暗抗性",      type: "Passivo",  rarity: "2★", effect: "+15% 抗性 神聖/黑暗",           cooldown: "N/A",    desc: "提高神聖與黑暗屬性抗性。" },
      { name: "HP 強化",              type: "Passivo",  rarity: "2★", effect: "+18% 最大 HP",                     cooldown: "N/A",    desc: "擴充最大 HP。" }
    ]
  },

  // ─── PHOENIX KNIGHT (3ª classe) ───
  phoenixKnight: {
    name: '鳳凰騎士', parent: 'paladin', stage: 3,
    desc: '擁有復活力量的至高防禦騎士。保留先前學會的技能。',
    base: { atk: 72, def: 105, hp: 850, mp: 140, eva: 6, crit: 8, mdef: 68 },
    skills: [
      { name: "生命之觸",                type: "Ativo",    rarity: "3★", effect: "治癒 範圍 25% HP (隊伍)",               cooldown: "35s",    desc: "施展鳳凰的生命之觸。" },
      { name: "鳳凰光環",                 type: "Self-Buff",rarity: "3★", effect: "+45% DEF, +HP 恢復 3%/s 持續 25 分鐘",    cooldown: "60 min", desc: "釋放鳳凰之力形成光環。" },
      { name: "信仰之盾",              type: "Ativo",    rarity: "3★", effect: "吸收 5000 傷害 持續 15 秒",             cooldown: "90s",    desc: "以信仰之力展開護盾。" },
      { name: "烈焰聖像",                   type: "Ativo",    rarity: "3★", effect: "隊伍 ATK +35%，持續 30 秒",           cooldown: "120s",   desc: "召喚烈焰之力。" },
      { name: "天界之盾",             type: "Ativo",    rarity: "4★", effect: "隊伍 免疫 a 傷害 持續 5 秒",             cooldown: "300s",   desc: "展開強大的天界護盾。" },
      { name: "召喚帝國鳳凰",      type: "Ativo",    rarity: "4★", effect: "召喚 鳳凰 (傷害+治癒 持續 30 秒)", cooldown: "180s",   desc: "召喚帝國鳳凰協助戰鬥。" },
      { name: "超越盾牌衝鋒",   type: "Ativo",    rarity: "4★", effect: "突進 + 500% 傷害 + 範圍 嘲諷 10 秒",     cooldown: "160s",   desc: "施展超越極限的盾牌突進。" },
      { name: "鳳凰騎士和諧",     type: "Self-Buff",rarity: "4★", effect: "+60% DEF, +40% HP, +30% 魔法防禦 30 分鐘",  cooldown: "90 min", desc: "鳳凰騎士的至高戰鬥和諧。" },
      { name: "鳳凰之魂",            type: "Passivo",  rarity: "4★", effect: "死亡時以 30% HP 復活（每 30 分鐘 1 次）",cooldown: "N/A",   desc: "鳳凰之魂可賦予自動復活能力。" },
      { name: "戰鬥大師",             type: "Passivo",  rarity: "3★", effect: "+10% ATK, +15% 仇恨, +5% 對怪物",        cooldown: "N/A",    desc: "精通各式戰鬥技巧。" },
      { name: "信仰守護",          type: "Passivo",  rarity: "3★", effect: "+12% 抗性 全",                      cooldown: "N/A",    desc: "以信仰之力獲得守護。" },
      { name: "鳳凰之軀",          type: "Passivo",  rarity: "3★", effect: "+15% 最大 HP, +10% DEF",                cooldown: "N/A",    desc: "獲得鳳凰般強韌的身軀。" }
    ]
  },

  // ─── DARK AVENGER (2ª classe) ───
  darkAvenger: {
    name: '黑暗復仇者', parent: 'knight', stage: 2,
    desc: '與黑暗豹並肩作戰並汲取生命的黑暗騎士。保留先前學會的技能。',
    base: { atk: 45, def: 55, hp: 480, mp: 90, eva: 5, crit: 8, mdef: 35 },
    skills: [
      { name: "召喚黑暗豹",    type: "Ativo",    rarity: "3★", effect: "召喚 黑豹 (ATK 60% 主人)",    cooldown: "90s",    desc: "召喚黑暗豹協助戰鬥。" },
      { name: "生命吸取",           type: "Ativo",    rarity: "2★", effect: "傷害 220% + 吸取 30%為 HP",      cooldown: "15s",    desc: "吸取敵人的生命力。" },
      { name: "恐懼",                 type: "Ativo",    rarity: "2★", effect: "恐懼在目標 持續 5 秒",                cooldown: "30s",    desc: "以黑暗力量使敵人陷入恐懼。" },
      { name: "盾牌暈擊",            type: "Ativo",    rarity: "2★", effect: "傷害 200% + 暈眩 3 秒",               cooldown: "18s",    desc: "以盾牌重擊使敵人暈眩。" },
      { name: "審判",               type: "Ativo",    rarity: "3★", effect: "傷害 黑暗 300% + -20% DEF 10 秒",     cooldown: "22s",    desc: "施展黑暗審判。" },
      { name: "死亡之觸",         type: "Ativo",    rarity: "3★", effect: "傷害 280% + 中毒 10 秒",            cooldown: "20s",    desc: "以死亡力量侵蝕敵人。" },
      { name: "黑暗火焰",             type: "Ativo",    rarity: "2★", effect: "傷害 範圍 黑暗 240%",                cooldown: "18s",    desc: "釋放黑暗火焰。" },
      { name: "末日之盾",            type: "Ativo",    rarity: "3★", effect: "吸收 3000 傷害 + 反射 15%",   cooldown: "60s",    desc: "展開末日之盾。" },
      { name: "復仇種子",        type: "Ativo",    rarity: "2★", effect: "標記：對死亡 造成 500% 傷害",  cooldown: "120s",   desc: "種下復仇之力。" },
      { name: "黑暗復仇者和諧", type: "Self-Buff",rarity: "3★", effect: "+35% ATK, +30% DEF, +20% 吸取 25 分鐘",cooldown: "60 min",desc: "黑暗復仇者的戰鬥和諧。" },
      { name: "傷害反射",         type: "Passivo",  rarity: "2★", effect: "反射 8% 傷害 受到的",          cooldown: "N/A",    desc: "反射受到的部分傷害。" },
      { name: "HP 強化",               type: "Passivo",  rarity: "2★", effect: "+16% 最大 HP",                       cooldown: "N/A",    desc: "強化 HP。" }
    ]
  },

  // ─── HELL KNIGHT (3ª classe) ───
  hellKnight: {
    name: '地獄騎士', parent: 'darkAvenger', stage: 3,
    desc: '操控黑暗光環的地獄騎士。保留先前學會的技能。',
    base: { atk: 82, def: 88, hp: 780, mp: 130, eva: 6, crit: 12, mdef: 55 },
    skills: [
      { name: "瘋狂粉碎",               type: "Ativo",    rarity: "3★", effect: "傷害 420% + 暈眩 4 秒",                    cooldown: "28s",    desc: "施展狂暴的粉碎攻擊。" },
      { name: "黑豹爆破",               type: "Ativo",    rarity: "3★", effect: "黑豹 爆炸: 範圍 350% + 恐懼 3 秒",    cooldown: "60s",    desc: "引爆黑暗豹的力量。" },
      { name: "地獄頌歌",               type: "Self-Buff",rarity: "3★", effect: "+40% ATK, +20% 吸取 HP 持續 30 秒",        cooldown: "90s",    desc: "吟唱地獄的戰鬥頌歌。" },
      { name: "煉獄",                      type: "Ativo",    rarity: "4★", effect: "範圍 黑暗 500% + -30% 治癒 受到的 10 秒", cooldown: "120s",   desc: "開啟通往地獄的力量。" },
      { name: "黑暗之觸",            type: "Ativo",    rarity: "3★", effect: "傷害 380% + 沉默 5 秒",                 cooldown: "30s",    desc: "以黑暗力量侵蝕敵人。" },
      { name: "召喚強化黑暗豹",  type: "Ativo",    rarity: "4★", effect: "黑豹 強化 (ATK 80% 主人)",   cooldown: "120s",   desc: "召喚經過強化的黑暗豹。" },
      { name: "超越黑暗打擊",     type: "Ativo",    rarity: "4★", effect: "傷害 580% 黑暗 + 吸取 40%為 HP",     cooldown: "150s",   desc: "施展超越極限的黑暗打擊。" },
      { name: "地獄騎士和諧",        type: "Self-Buff",rarity: "4★", effect: "+55% ATK, +40% DEF, +30% 吸取 30 分鐘",   cooldown: "90 min", desc: "地獄騎士的戰鬥和諧。" },
      { name: "戰鬥大師",             type: "Passivo",  rarity: "3★", effect: "+10% ATK, +10% 吸取, +5% 對怪物",         cooldown: "N/A",    desc: "精通各式戰鬥技巧。" },
      { name: "地獄騎士之魂",           type: "Passivo",  rarity: "3★", effect: "+15% 黑暗 ATK",                          cooldown: "N/A",    desc: "地獄騎士的戰鬥精神。" },
      { name: "地獄騎士之軀",      type: "Passivo",  rarity: "3★", effect: "+12% 最大 HP, +10% DEF",                 cooldown: "N/A",    desc: "獲得地獄騎士般強韌的身軀。" },
      { name: "黑暗守護",       type: "Passivo",  rarity: "3★", effect: "+15% 黑暗 抗性",                       cooldown: "N/A",    desc: "提高對黑暗力量的抗性。" }
    ]
  },

  // ─── ROGUE (1ª classe) ───
  rogue: {
    name: '盜賊', parent: 'fighter', race: 'human', archetype: 'assassin', stage: 1,
    desc: '敏捷的盜賊，擅長匕首與弓。保留先前學會的技能。',
    base: { atk: 22, def: 12, hp: 150, mp: 40, eva: 15, crit: 12, mdef: 8 },
    skills: [
      { name: "雙重射擊",          type: "Ativo",    rarity: "1★", effect: "2 次射擊, 總傷害 200%",      cooldown: "10s",    desc: "連續射擊兩次。" },
      { name: "背刺",             type: "Ativo",    rarity: "2★", effect: "傷害 250% 從背後 + 必定暴擊",cooldown: "14s",  desc: "從背後施展致命一擊。" },
      { name: "疾走",                 type: "Ativo",    rarity: "1★", effect: "+50% 速度 持續 8 秒",                cooldown: "20s",    desc: "短時間大幅提高移動速度。" },
      { name: "開鎖",               type: "Ativo",    rarity: "1★", effect: "開啟寶箱／門",                 cooldown: "5s",     desc: "開啟寶箱與門鎖。" },
      { name: "盜賊和諧",      type: "Self-Buff",rarity: "2★", effect: "+20% 迴避, +15% 暴擊 持續 20 分鐘",   cooldown: "45 min", desc: "盜賊的戰鬥和諧。" },
      { name: "輕甲精通",  type: "Passivo",  rarity: "1★", effect: "+12% 迴避 裝備輕甲時",       cooldown: "N/A",    desc: "精通輕型防具。" },
      { name: "匕首精通",       type: "Passivo",  rarity: "1★", effect: "+12% ATK 使用匕首時",              cooldown: "N/A",    desc: "精通匕首武器。" },
      { name: "弓精通",          type: "Passivo",  rarity: "1★", effect: "+12% ATK 使用弓時",                cooldown: "N/A",    desc: "精通弓類武器。" },
      { name: "暴擊機率",      type: "Passivo",  rarity: "1★", effect: "+8% 暴擊率",                    cooldown: "N/A",    desc: "提高命中要害的能力。" }
    ]
  },

  // ─── TREASURE HUNTER (2ª classe) ───
  treasureHunter: {
    name: '寶藏獵人', parent: 'rogue', stage: 2,
    desc: '精通匕首技巧的寶藏獵人。保留先前學會的技能。',
    base: { atk: 55, def: 20, hp: 300, mp: 60, eva: 28, crit: 24, mdef: 14 },
    skills: [
      { name: "致命打擊",           type: "Ativo",    rarity: "2★", effect: "傷害 280% + 必定暴擊",          cooldown: "14s",    desc: "施展強力致命攻擊。" },
      { name: "致死打擊",           type: "Ativo",    rarity: "3★", effect: "傷害 350% + 即死機率 5%",          cooldown: "22s",    desc: "施展具有致死可能的打擊。" },
      { name: "沙塵炸彈",             type: "Ativo",    rarity: "2★", effect: "範圍 致盲 5 秒 + 傷害 150%",            cooldown: "20s",    desc: "投擲沙塵炸彈使敵人失明。" },
      { name: "致盲打擊",         type: "Ativo",    rarity: "2★", effect: "傷害 240% + 致盲 4 秒",                cooldown: "18s",    desc: "施展可使敵人失明的攻擊。" },
      { name: "暗影步伐",           type: "Ativo",    rarity: "2★", effect: "傳送到目標背後",             cooldown: "15s",    desc: "瞬間移動到目標身後。" },
      { name: "位置交換",                type: "Ativo",    rarity: "2★", effect: "與目標交換位置",              cooldown: "25s",    desc: "與目標交換位置。" },
      { name: "假死",            type: "Ativo",    rarity: "2★", effect: "裝死, 失去 仇恨",            cooldown: "60s",    desc: "偽裝死亡以解除敵人仇恨。" },
      { name: "詭計",                 type: "Ativo",    rarity: "2★", effect: "使敵人失去目前目標",              cooldown: "20s",    desc: "以詭計擾亂敵人的鎖定。" },
      { name: "幻影",                type: "Ativo",    rarity: "3★", effect: "+80% 迴避 持續 8 秒",                     cooldown: "45s",    desc: "製造鏡像幻影提高迴避。" },
      { name: "偵測／解除陷阱",    type: "Ativo",    rarity: "1★", effect: "偵測 和 移除 陷阱",         cooldown: "10s",    desc: "偵測並解除陷阱。" },
      { name: "寶藏獵人和諧",          type: "Self-Buff",rarity: "3★", effect: "+35% 暴擊, +25% 迴避, +20% ATK 25 分鐘", cooldown: "60 min", desc: "寶藏獵人的戰鬥和諧。" },
      { name: "迴避",               type: "Passivo",  rarity: "2★", effect: "+12% 迴避",                            cooldown: "N/A",    desc: "進一步提高迴避能力。" },
      { name: "暴擊威力",        type: "Passivo",  rarity: "2★", effect: "+18% 暴擊傷害",                    cooldown: "N/A",    desc: "提高暴擊威力。" },
      { name: "專注",                 type: "Passivo",  rarity: "1★", effect: "+10% 暴擊率",                      cooldown: "N/A",    desc: "集中攻擊敵人的要害。" }
    ]
  },

  // ─── ADVENTURER (3ª classe) ───
  adventurer: {
    name: '冒險家', parent: 'treasureHunter', stage: 3,
    desc: '精通迴避與偷襲傷害的至高冒險家。保留先前學會的技能。',
    base: { atk: 98, def: 32, hp: 500, mp: 85, eva: 52, crit: 42, mdef: 22 },
    skills: [
      { name: "刺激冒險",          type: "Self-Buff",rarity: "3★", effect: "+45% 迴避, +30% 暴擊, +20% ATK 20 分鐘",  cooldown: "55 min", desc: "進入充滿刺激感的戰鬥狀態。" },
      { name: "御風",                 type: "Ativo",    rarity: "3★", effect: "+80% 速度 + 隱形 持續 10 秒",        cooldown: "60s",    desc: "乘風高速移動。" },
      { name: "幸運打擊",                type: "Ativo",    rarity: "3★", effect: "傷害 420% + 2 倍掉落機率",            cooldown: "30s",    desc: "施展帶來額外收穫的幸運攻擊。" },
      { name: "偵測",                   type: "Ativo",    rarity: "2★", effect: "顯示 隱形目標於區域",             cooldown: "20s",    desc: "偵測隱藏中的敵人。" },
      { name: "超越致命打擊",    type: "Ativo",    rarity: "4★", effect: "傷害 650% + 無視 迴避 + 流血 12 秒",    cooldown: "150s",   desc: "施展超越極限的致命攻擊。" },
      { name: "冒險家和諧",        type: "Self-Buff",rarity: "4★", effect: "+55% 暴擊, +45% 迴避, +35% ATK 30 分鐘",  cooldown: "90 min", desc: "冒險家的至高戰鬥和諧。" },
      { name: "戰鬥大師",            type: "Passivo",  rarity: "3★", effect: "+10% ATK, +10% 暴擊, +5% 對怪物",         cooldown: "N/A",    desc: "精通各式戰鬥技巧。" },
      { name: "暗影感知",                type: "Passivo",  rarity: "3★", effect: "+15% 迴避 夜間 / 地城",            cooldown: "N/A",    desc: "感知暗影中的動靜。" },
      { name: "冒險家之魂",           type: "Passivo",  rarity: "3★", effect: "+12% 匕首攻擊",                       cooldown: "N/A",    desc: "冒險家的戰鬥精神。" },
      { name: "冒險家之軀",      type: "Passivo",  rarity: "3★", effect: "+10% 最大 HP, +8% 迴避",                 cooldown: "N/A",    desc: "獲得靈活敏捷的身軀。" },
      { name: "最終狂熱",                type: "Passivo",  rarity: "3★", effect: "+25% ATK 當 HP < 30%",              cooldown: "N/A",    desc: "在危急狀態下進入最終狂熱。" }
    ]
  },

  // ─── HAWKEYE (2ª classe) ───
  hawkeye: {
    name: '鷹眼', parent: 'rogue', stage: 2,
    desc: '擅長遠距離傷害的菁英弓箭手。保留先前學會的技能。',
    base: { atk: 60, def: 18, hp: 280, mp: 65, eva: 20, crit: 22, mdef: 12 },
    skills: [
      { name: "雙重射擊",           type: "Ativo",    rarity: "2★", effect: "2 次射擊, 總傷害 260%",         cooldown: "10s",    desc: "施展強化的雙重射擊。" },
      { name: "爆裂射擊",            type: "Ativo",    rarity: "2★", effect: "傷害 280% + 擊退",               cooldown: "14s",    desc: "發射具有爆炸威力的箭矢。" },
      { name: "暈眩射擊",             type: "Ativo",    rarity: "2★", effect: "傷害 220% + 暈眩 3 秒",                cooldown: "18s",    desc: "發射可使敵人暈眩的箭矢。" },
      { name: "箭雨",            type: "Ativo",    rarity: "3★", effect: "傷害 範圍 320% (8 目標)",            cooldown: "22s",    desc: "向範圍內降下大量箭矢。" },
      { name: "快速射擊",            type: "Ativo",    rarity: "2★", effect: "+50% 攻擊速度 弓 持續 15 秒",        cooldown: "45s",    desc: "短時間提高射擊速度。" },
      { name: "卑劣射擊",            type: "Ativo",    rarity: "2★", effect: "傷害 200% + 緩速 30% 持續 8 秒",        cooldown: "16s",    desc: "以干擾性射擊削弱敵人。" },
      { name: "鷹眼和諧",     type: "Self-Buff",rarity: "3★", effect: "+35% ATK, +25% 暴擊, +15% 射程 25 分鐘",cooldown: "60 min",desc: "鷹眼的戰鬥和諧。" },
      { name: "弓精通",           type: "Passivo",  rarity: "2★", effect: "+18% ATK 使用弓時",                  cooldown: "N/A",    desc: "精通弓類武器。" },
      { name: "遠距射擊",             type: "Passivo",  rarity: "2★", effect: "+30% 射程",                          cooldown: "N/A",    desc: "提高射擊距離。" },
      { name: "專注",                 type: "Passivo",  rarity: "1★", effect: "+10% 暴擊率",                      cooldown: "N/A",    desc: "提升專注力。" },
      { name: "暴擊威力",        type: "Passivo",  rarity: "2★", effect: "+18% 暴擊傷害",                    cooldown: "N/A",    desc: "提高暴擊威力。" },
      { name: "迴避",               type: "Passivo",  rarity: "1★", effect: "+10% 迴避",                            cooldown: "N/A",    desc: "提高迴避能力。" }
    ]
  },

  // ─── SAGITTARIUS (3ª classe) ───
  sagittarius: {
    name: '射手座', parent: 'hawkeye', stage: 3,
    desc: '傳說級弓箭手，精通弓術。保留先前學會的技能。',
    base: { atk: 112, def: 25, hp: 460, mp: 95, eva: 35, crit: 45, mdef: 18 },
    skills: [
      { name: "七連矢",                  type: "Ativo",    rarity: "3★", effect: "7 箭矢, 總傷害 480%",              cooldown: "25s",    desc: "連續射出七支箭矢。" },
      { name: "箭矢爆裂",                  type: "Ativo",    rarity: "3★", effect: "傷害 範圍 380% + 燃燒 8 秒",                cooldown: "22s",    desc: "引爆箭矢造成範圍傷害。" },
      { name: "死亡之眼",                     type: "Self-Buff",rarity: "3★", effect: "+50% ATK, +40% 射程 持續 20 分鐘",         cooldown: "55 min", desc: "進入完美瞄準狀態。" },
      { name: "精準射擊",                type: "Ativo",    rarity: "3★", effect: "傷害 400% + 無視 50% DEF",             cooldown: "28s",    desc: "對要害施展精準射擊。" },
      { name: "三重射擊",                  type: "Ativo",    rarity: "3★", effect: "3 次射擊, 總傷害 360%",             cooldown: "14s",    desc: "連續射擊三次。" },
      { name: "荊棘射擊",                   type: "Ativo",    rarity: "2★", effect: "傷害 260% + 流血 10 秒",                  cooldown: "12s",    desc: "發射帶有荊棘力量的箭矢。" },
      { name: "束縛射擊",                 type: "Ativo",    rarity: "2★", effect: "傷害 220% + 定身 4 秒",                    cooldown: "18s",    desc: "發射可束縛敵人的箭矢。" },
      { name: "燃燒射擊",              type: "Ativo",    rarity: "2★", effect: "傷害 火 280% + 燃燒 8 秒",               cooldown: "16s",    desc: "發射燃燒箭矢。" },
      { name: "冰凍射擊",                type: "Ativo",    rarity: "2★", effect: "傷害 冰 260% + 緩速 40% 6 秒",           cooldown: "16s",    desc: "發射冰凍箭矢。" },
      { name: "風之射擊",                    type: "Ativo",    rarity: "2★", effect: "傷害 風 270% + 擊退",            cooldown: "16s",    desc: "發射風屬性箭矢。" },
      { name: "烈焰箭雨",             type: "Ativo",    rarity: "3★", effect: "範圍 火 380% (10 目標) + 燃燒",        cooldown: "28s",    desc: "降下燃燒的箭雨。" },
      { name: "寒冰箭雨",             type: "Ativo",    rarity: "3★", effect: "範圍 冰 360% (10 目標) + 緩速",        cooldown: "28s",    desc: "降下冰冷的箭雨。" },
      { name: "暴風箭雨",             type: "Ativo",    rarity: "3★", effect: "範圍 風 370% (10 目標) + 暈眩 2 秒",    cooldown: "28s",    desc: "降下暴風般的箭雨。" },
      { name: "螺旋射擊",                  type: "Ativo",    rarity: "3★", effect: "傷害 420% + 穿透 多個 目標",    cooldown: "24s",    desc: "發射具有穿透力的螺旋箭矢。" },
      { name: "目標鎖定",                  type: "Ativo",    rarity: "3★", effect: "標記目標: +40% 傷害 對該目標 12 秒",   cooldown: "30s",    desc: "鎖定目標以提高對其造成的傷害。" },
      { name: "超越七連矢",     type: "Ativo",    rarity: "4★", effect: "傷害 700% + 元素 + 無視 DEF",     cooldown: "180s",   desc: "施展超越極限的七連箭攻擊。" },
      { name: "射手座和諧",         type: "Self-Buff",rarity: "4★", effect: "+60% ATK, +50% 暴擊, +40% 射程 30 分鐘",  cooldown: "90 min", desc: "射手座的戰鬥和諧。" },
      { name: "戰鬥大師",             type: "Passivo",  rarity: "3★", effect: "+10% ATK, +10% 射程, +5% 對怪物",         cooldown: "N/A",    desc: "精通各式戰鬥技巧。" },
      { name: "射手之魂",            type: "Passivo",  rarity: "3★", effect: "+15% 弓攻擊",                           cooldown: "N/A",    desc: "射手座的戰鬥精神。" },
      { name: "射手之軀",       type: "Passivo",  rarity: "3★", effect: "+10% 最大 HP, +8% 迴避",                  cooldown: "N/A",    desc: "獲得射手般靈活的身軀。" }
    ]
  },

  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  //  HUMAN MAGE (skills DISTINTAS por subclasse)
  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

  mage: {
    name: '人類法師', archetype: 'mage', race: 'human', stage: 0,
    desc: '人類的基礎魔法職業。',
    base: { atk: 5, def: 6, hp: 70, mp: 80, eva: 4, crit: 3, matk: 15, mdef: 12 },
    skills: [
      { name: "風之打擊",       type: "Ativo",    rarity: "1★", effect: "傷害 風 160%",              cooldown: "8s",     desc: "釋放風之衝擊。" },
      { name: "火焰打擊",      type: "Ativo",    rarity: "1★", effect: "傷害 火 170%",               cooldown: "9s",     desc: "釋放熾熱火焰。" },
      { name: "冰箭",          type: "Ativo",    rarity: "1★", effect: "傷害 冰 155% + 緩速 15% 4 秒", cooldown: "8s",     desc: "發射冰之彈體。" },
      { name: "自我治癒",         type: "Ativo",    rarity: "1★", effect: "治癒 20% HP",                  cooldown: "25s",    desc: "進行基礎自我治療。" },
      { name: "睡眠",             type: "Ativo",    rarity: "1★", effect: "使其睡眠 目標 8 秒 (取消 傷害)",cooldown: "30s",   desc: "以魔法使目標陷入睡眠。" },
      { name: "法師意志",       type: "Self-Buff",rarity: "1★", effect: "+10% 魔法攻擊, +10% 魔法防禦 15 分鐘", cooldown: "30 min", desc: "法師堅定的意志。" },
      { name: "法袍精通",      type: "Passivo",  rarity: "1★", effect: "裝備法袍時魔法防禦 +10%、施法速度 +8%",cooldown: "N/A",desc: "精通法袍裝備。" },
      { name: "MP 提升",       type: "Passivo",  rarity: "1★", effect: "+8% 最大 MP",                   cooldown: "N/A",    desc: "提高魔力儲備。" }
    ]
  },

  // ─── WIZARD (1ª classe) ───
  wizard: {
    name: '巫師', parent: 'mage', race: 'human', archetype: 'mage', stage: 1,
    desc: '擅長多種元素魔法的施法者。保留先前學會的技能。',
    base: { atk: 6, def: 8, hp: 100, mp: 140, eva: 4, crit: 4, matk: 35, mdef: 22 },
    skills: [
      { name: "烈焰",                 type: "Ativo",    rarity: "1★", effect: "傷害 火 210%",                    cooldown: "10s",    desc: "釋放熾熱火焰。" },
      { name: "水之漩渦",            type: "Ativo",    rarity: "1★", effect: "傷害 水 200% + 緩速 20% 5 秒",      cooldown: "10s",    desc: "召喚水流漩渦。" },
      { name: "龍捲",               type: "Ativo",    rarity: "1★", effect: "傷害 風 195%",                   cooldown: "10s",    desc: "召喚小型龍捲風。" },
      { name: "光環燃燒",             type: "Ativo",    rarity: "2★", effect: "範圍 火 180% 周圍",            cooldown: "14s",    desc: "以魔力燃燒周圍敵人。" },
      { name: "生命吸取",            type: "Ativo",    rarity: "2★", effect: "傷害 黑暗 190% + 吸取 25%為 HP",cooldown: "15s",    desc: "吸取目標生命力。" },
      { name: "火焰弱化",     type: "Ativo",    rarity: "2★", effect: "-20% 火抗性在目標 15 秒",      cooldown: "25s",    desc: "降低目標對火屬性的抗性。" },
      { name: "水之弱化",    type: "Ativo",    rarity: "2★", effect: "-20% 水抗性在目標 15 秒",     cooldown: "25s",    desc: "降低目標對水屬性的抗性。" },
      { name: "風之弱化",     type: "Ativo",    rarity: "2★", effect: "-20% 風抗性在目標 15 秒",      cooldown: "25s",    desc: "降低目標對風屬性的抗性。" },
      { name: "巫師和諧",      type: "Self-Buff",rarity: "2★", effect: "+25% 魔法攻擊, +15% 施法速度 20 分鐘", cooldown: "45 min", desc: "巫師的戰鬥和諧。" },
      { name: "MP 強化",            type: "Passivo",  rarity: "1★", effect: "+12% 最大 MP",                       cooldown: "N/A",    desc: "進一步強化魔力儲備。" }
    ]
  },

  // ─── SORCERER (2ª classe — FOGO+GELO+VENTO) ───
  sorcerer: {
    name: '術士', parent: 'wizard', stage: 2,
    desc: '精通攻擊型元素魔法。保留先前學會的技能。',
    base: { atk: 8, def: 14, hp: 180, mp: 260, eva: 5, crit: 6, matk: 75, mdef: 45 },
    skills: [
      { name: "烈焰柱",            type: "Ativo",    rarity: "2★", effect: "傷害 火 300%",                      cooldown: "16s",    desc: "召喚火焰之柱。" },
      { name: "暴風雪",              type: "Ativo",    rarity: "3★", effect: "傷害 冰 範圍 340% + 緩速 30% 6 秒",    cooldown: "22s",    desc: "召喚毀滅性的暴風雪。" },
      { name: "颶風",             type: "Ativo",    rarity: "2★", effect: "傷害 風 290%",                     cooldown: "16s",    desc: "施展毀滅性的颶風。" },
      { name: "水流爆裂",           type: "Ativo",    rarity: "2★", effect: "傷害 水 280% + 擊退",          cooldown: "15s",    desc: "釋放強力水流爆炸。" },
      { name: "太陽耀斑",           type: "Ativo",    rarity: "3★", effect: "傷害 火 360% + 致盲 4 秒",           cooldown: "25s",    desc: "釋放太陽能量爆炸。" },
      { name: "元素風暴",               type: "Ativo",    rarity: "3★", effect: "傷害 風 範圍 350% (8 目標)",       cooldown: "25s",    desc: "召喚元素風暴。" },
      { name: "光環閃光",            type: "Ativo",    rarity: "2★", effect: "範圍 240% + 擊退 周圍",       cooldown: "18s",    desc: "釋放瞬間光環閃擊。" },
      { name: "奧術之力",          type: "Self-Buff",rarity: "3★", effect: "+40% 魔法攻擊 持續 30 秒",                  cooldown: "90s",    desc: "凝聚奧術力量。" },
      { name: "冰凍皮膚",         type: "Self-Buff",rarity: "2★", effect: "攻擊者受到 緩速 20% 持續 15 秒",  cooldown: "45s",    desc: "以冰霜強化皮膚。" },
      { name: "解除",                type: "Ativo",    rarity: "3★", effect: "移除目標 3 個增益效果",              cooldown: "40s",    desc: "解除魔法效果。" },
      { name: "身心轉換",          type: "Ativo",    rarity: "2★", effect: "將 15% HP 轉換為 30% MP",           cooldown: "30s",    desc: "將生命力轉換為魔力。" },
      { name: "抗魔",            type: "Ativo",    rarity: "3★", effect: "使目標沉默 8 秒",              cooldown: "45s",    desc: "提高對魔法的抗性。" },
      { name: "術士和諧",    type: "Self-Buff",rarity: "3★", effect: "+35% 魔法攻擊, +20% 施法速度 25 分鐘",   cooldown: "60 min", desc: "術士的戰鬥和諧。" },
      { name: "元素突擊",     type: "Passivo",  rarity: "2★", effect: "+12% 元素 傷害",               cooldown: "N/A",    desc: "發動元素突擊。" }
    ]
  },

  // ─── ARCHMAGE (3ª classe — FOCO EM FOGO) ───
  archmage: {
    name: '大法師', parent: 'sorcerer', stage: 3,
    desc: '精通火焰的高階法師，擅長大範圍高傷害。保留先前學會的技能。定位：火。',
    base: { atk: 10, def: 20, hp: 300, mp: 450, eva: 6, crit: 8, matk: 135, mdef: 72 },
    skills: [
      { name: "隕石",                       type: "Ativo",    rarity: "4★", effect: "傷害 火 範圍 750% + 燃燒 12 秒 + 擊倒",  cooldown: "180s",   desc: "召喚隕石造成毀滅性傷害。" },
      { name: "地獄煉獄",                  type: "Ativo",    rarity: "3★", effect: "傷害 火 450% + 燃燒 10 秒",                 cooldown: "30s",    desc: "召喚熊熊燃燒的煉獄。" },
      { name: "火焰爆炸",               type: "Ativo",    rarity: "3★", effect: "傷害 火 420% + 2 次命中",                  cooldown: "25s",    desc: "造成兩段火焰爆炸傷害。" },
      { name: "火焰螺旋",                   type: "Ativo",    rarity: "3★", effect: "傷害 火 380% + 穿透 目標",           cooldown: "22s",    desc: "釋放具有穿透力的火焰螺旋。" },
      { name: "烈焰之環",                type: "Ativo",    rarity: "3★", effect: "範圍 火 400% 周圍 (10 目標)",        cooldown: "28s",    desc: "創造燃燒的火焰圓環。" },
      { name: "火之種子",                  type: "Ativo",    rarity: "2★", effect: "種下種子: 爆炸 300% 後 5 秒",     cooldown: "20s",    desc: "凝聚火元素種子。" },
      { name: "元素爆發",               type: "Ativo",    rarity: "3★", effect: "引爆種子: 傷害 500%",                 cooldown: "18s",    desc: "引爆元素力量，可與種子效果連動。" },
      { name: "元素風暴",               type: "Ativo",    rarity: "3★", effect: "範圍 多元素 440% (8 目標)",         cooldown: "30s",    desc: "召喚元素風暴。" },
      { name: "魔力燃燒",                     type: "Ativo",    rarity: "2★", effect: "吸取目標 30% MP，並造成等同吸取 MP 的傷害", cooldown: "25s",    desc: "燃燒目標的魔力。" },
      { name: "神秘免疫",               type: "Ativo",    rarity: "4★", effect: "免疫魔法 持續 8 秒, 無法攻擊",    cooldown: "180s",   desc: "獲得神秘力量保護。" },
      { name: "強化迴響",               type: "Ativo",    rarity: "3★", effect: "下一個技能: +50% 傷害",                 cooldown: "45s",    desc: "以迴響強化自身力量。" },
      { name: "超越地獄煉獄",     type: "Ativo",    rarity: "4★", effect: "傷害 火 800% + 無視 魔法防禦 + 燃燒 15 秒", cooldown: "200s",   desc: "施展超越極限的煉獄攻擊。" },
      { name: "大法師和諧",            type: "Self-Buff",rarity: "4★", effect: "+55% 魔法攻擊, +35% 施法速度, +20% MP 30 分鐘",cooldown: "90 min",desc: "大法師的戰鬥和諧。" },
      { name: "魔法大師",               type: "Passivo",  rarity: "3★", effect: "+10% 魔法攻擊, +10% 火 傷害, +5% 對怪物",      cooldown: "N/A",    desc: "精通各式魔法。" },
      { name: "法術精通",                  type: "Passivo",  rarity: "3★", effect: "+12% 魔法技能威力",                     cooldown: "N/A",    desc: "精通法術施放。" },
      { name: "魔法專注",                    type: "Passivo",  rarity: "3★", effect: "+8% 魔法暴擊率",                        cooldown: "N/A",    desc: "提高魔法專注力。" },
      { name: "大法師之魂",                type: "Passivo",  rarity: "3★", effect: "火屬性魔法攻擊 +15%",                     cooldown: "N/A",    desc: "大法師的魔法精神。" },
      { name: "大法師之軀",           type: "Passivo",  rarity: "3★", effect: "+10% 最大 MP, +8% 魔法防禦",                 cooldown: "N/A",    desc: "以奧術力量強化身軀。" }
    ]
  },

  // ─── NECROMANCER (2ª classe — DARK/UNHOLY — skills DIFERENTES do Sorcerer) ───
  necromancer: {
    name: '死靈法師', parent: 'wizard', stage: 2,
    desc: '操控黑暗與不死生物的法師。保留先前學會的技能。定位：黑暗／不死。',
    base: { atk: 8, def: 16, hp: 200, mp: 240, eva: 4, crit: 5, matk: 68, mdef: 40 },
    skills: [
      { name: "死亡尖刺",           type: "Ativo",    rarity: "2★", effect: "傷害 黑暗 260% + 吸取 25% HP",       cooldown: "12s",    desc: "召喚致命尖刺攻擊敵人。" },
      { name: "屍體瘟疫",          type: "Ativo",    rarity: "2★", effect: "範圍 黑暗 280% + 中毒 10 秒",          cooldown: "20s",    desc: "以屍體散播瘟疫。" },
      { name: "吸血鬼之爪",         type: "Ativo",    rarity: "2★", effect: "傷害 240% + 吸取 35% HP",            cooldown: "14s",    desc: "以吸血鬼之爪汲取生命。" },
      { name: "黑暗束縛",                type: "Ativo",    rarity: "2★", effect: "定身在目標 6 秒 + 傷害 180%",         cooldown: "22s",    desc: "以黑暗力量束縛目標。" },
      { name: "詛咒：幽暗",          type: "Ativo",    rarity: "2★", effect: "-25% ATK 和 魔法攻擊 do 目標 12 秒",        cooldown: "25s",    desc: "施加幽暗詛咒。" },
      { name: "屍爆",          type: "Ativo",    rarity: "3★", effect: "引爆屍體: 範圍 350% 黑暗",      cooldown: "25s",    desc: "引爆屍體造成傷害。" },
      { name: "召喚復生者", type: "Ativo",    rarity: "2★", effect: "召喚 不死生物 (ATK 50% 主人)", cooldown: "60s",    desc: "召喚復生的不死生物。" },
      { name: "召喚詛咒骨骸",    type: "Ativo",    rarity: "2★", effect: "召喚 骷髏 (ATK 40% 主人)",  cooldown: "45s",    desc: "召喚被詛咒的骨骸。" },
      { name: "黑暗火焰",            type: "Ativo",    rarity: "2★", effect: "範圍 黑暗 250% 周圍",              cooldown: "18s",    desc: "釋放黑暗火焰。" },
      { name: "不潔弱化",   type: "Ativo",    rarity: "2★", effect: "-25% 黑暗 抗性在目標 15 秒",        cooldown: "25s",    desc: "降低目標對黑暗／不潔屬性的抗性。" },
      { name: "恐懼詛咒",            type: "Ativo",    rarity: "3★", effect: "恐懼 範圍 5 秒 (3 目標)",               cooldown: "40s",    desc: "以詛咒使敵人陷入恐懼。" },
      { name: "死靈法師和諧",       type: "Self-Buff",rarity: "3★", effect: "+30% 魔法攻擊, +20% 吸取, +15% HP 25 分鐘",cooldown: "60 min",desc: "死靈法師的戰鬥和諧。" },
      { name: "骨之鎧甲",            type: "Passivo",  rarity: "2★", effect: "+15% DEF, +10% 黑暗 抗性",          cooldown: "N/A",    desc: "以骨骼形成護甲。" }
    ]
  },

  // ─── SOULTAKER (3ª classe — DARK MEGA NUKE) ───
  soultaker: {
    name: '奪魂者', parent: 'necromancer', stage: 3,
    desc: '收割靈魂並造成大量黑暗傷害。保留先前學會的技能。定位：黑暗。',
    base: { atk: 10, def: 22, hp: 320, mp: 420, eva: 5, crit: 7, matk: 125, mdef: 62 },
    skills: [
      { name: "靈魂漩渦",                  type: "Ativo",    rarity: "3★", effect: "傷害 黑暗 420% + 靈魂 吸取",               cooldown: "25s",    desc: "召喚靈魂漩渦。" },
      { name: "靈魂漩渦毀滅",       type: "Ativo",    rarity: "4★", effect: "傷害 黑暗 範圍 650% + 吸取 30% HP",        cooldown: "160s",   desc: "引爆靈魂漩渦造成毀滅傷害。" },
      { name: "虛空爆炸",                type: "Ativo",    rarity: "4★", effect: "傷害 黑暗 700% + 2 次命中 + 沉默 5 秒",     cooldown: "180s",   desc: "引發虛空能量爆炸。" },
      { name: "群體詛咒：幽暗",             type: "Ativo",    rarity: "3★", effect: "範圍 -30% ATK/魔法攻擊 (8 目標) 12 秒",         cooldown: "35s",    desc: "對範圍敵人施加幽暗詛咒。" },
      { name: "靈魂吸收",               type: "Ativo",    rarity: "3★", effect: "吸取目標 40% MP 並轉為自身 MP",     cooldown: "30s",    desc: "吸收敵人的靈魂力量。" },
      { name: "召喚黑暗詛咒",             type: "Ativo",    rarity: "3★", effect: "召喚 實體 黑暗 (ATK 70% 主人)",    cooldown: "90s",    desc: "召喚具有生命的黑暗詛咒。" },
      { name: "黑暗負擔",                   type: "Ativo",    rarity: "3★", effect: "-40% 速度在目標 10 秒 + 傷害 300%",       cooldown: "28s",    desc: "使目標承受黑暗負擔。" },
      { name: "超越靈魂漩渦",      type: "Ativo",    rarity: "4★", effect: "黑暗傷害 850% + 吸取全部 MP + 暈眩 4 秒", cooldown: "200s",   desc: "施展超越極限的靈魂漩渦。" },
      { name: "奪魂者和諧",           type: "Self-Buff",rarity: "4★", effect: "+55% 魔法攻擊, +40% 吸取, +25% HP 30 分鐘",    cooldown: "90 min", desc: "奪魂者的戰鬥和諧。" },
      { name: "黑暗魔法大師",          type: "Passivo",  rarity: "3★", effect: "+10% 魔法攻擊, +10% 黑暗 傷害, +5% 對怪物",      cooldown: "N/A",    desc: "精通黑暗魔法。" },
      { name: "法術精通",                  type: "Passivo",  rarity: "3★", effect: "+12% 魔法技能威力",                     cooldown: "N/A",    desc: "精通法術施放。" },
      { name: "奪魂者之魂",              type: "Passivo",  rarity: "3★", effect: "黑暗屬性魔法攻擊 +15%",                      cooldown: "N/A",    desc: "奪魂者的戰鬥精神。" },
      { name: "奪魂者之軀",         type: "Passivo",  rarity: "3★", effect: "+12% 最大 MP, +10% HP",                    cooldown: "N/A",    desc: "強化奪魂者的身軀。" }
    ]
  },

  // ─── WARLOCK (2ª classe — SUMMONER — skills DIFERENTES) ───
  warlock: {
    name: '召喚術士', parent: 'wizard', stage: 2,
    desc: '召喚黑暗生物作戰。保留先前學會的技能。定位：召喚。',
    base: { atk: 7, def: 15, hp: 190, mp: 250, eva: 4, crit: 4, matk: 62, mdef: 42 },
    skills: [
      { name: "召喚暗影",          type: "Ativo",    rarity: "2★", effect: "召喚 暗影 (ATK 45% 主人)",     cooldown: "60s",    desc: "召喚戰鬥型暗影。" },
      { name: "召喚魅影",      type: "Ativo",    rarity: "2★", effect: "召喚幻影（坦克型，DEF 60%）",     cooldown: "60s",    desc: "召喚防禦型魅影。" },
      { name: "召喚無魂者",        type: "Ativo",    rarity: "3★", effect: "召喚 無魂者 (ATK 65% 主人)",   cooldown: "90s",    desc: "召喚強力的無魂生物。" },
      { name: "召喚獸治癒",          type: "Ativo",    rarity: "2★", effect: "治癒召喚物 35% HP",                  cooldown: "12s",    desc: "治療召喚獸。" },
      { name: "召喚獸回復",      type: "Ativo",    rarity: "2★", effect: "恢復 30% MP do 召喚物",           cooldown: "15s",    desc: "恢復召喚獸的魔力。" },
      { name: "痛苦轉移",          type: "Toggle",   rarity: "2★", effect: "50% 傷害 受到的 轉移給 召喚物",    cooldown: "N/A",    desc: "將部分受到的傷害轉移給召喚獸。" },
      { name: "召喚束縛晶體",   type: "Ativo",    rarity: "2★", effect: "晶體 造成 定身於敵人",    cooldown: "45s",    desc: "召喚具有束縛能力的晶體。" },
      { name: "召喚幻影晶體",   type: "Ativo",    rarity: "2★", effect: "晶體 造成 傷害 黑暗 持續",  cooldown: "45s",    desc: "召喚幻影晶體協助戰鬥。" },
      { name: "生命晶體",             type: "Ativo",    rarity: "2★", effect: "晶體 會 治癒 主人 5%/5 秒",           cooldown: "45s",    desc: "召喚具有生命恢復能力的晶體。" },
      { name: "召喚術士和諧",      type: "Self-Buff",rarity: "3★", effect: "+30% 魔法攻擊, +25% 召喚物 ATK 25 分鐘",   cooldown: "60 min", desc: "召喚術士的戰鬥和諧。" },
      { name: "召喚獸物理攻擊",  type: "Passivo",  rarity: "2★", effect: "+15% 召喚物 ATK",                     cooldown: "N/A",    desc: "提高召喚獸的物理攻擊能力。" }
    ]
  },

  // ─── ARCANA LORD (3ª classe — MEGA SUMMONER) ───
  arcanaLord: {
    name: '奧術領主', parent: 'warlock', stage: 3,
    desc: '召喚師中的奧術領主。保留先前學會的技能。定位：召喚。',
    base: { atk: 10, def: 22, hp: 310, mp: 430, eva: 5, crit: 5, matk: 118, mdef: 65 },
    skills: [
      { name: "召喚貓王",            type: "Ativo",    rarity: "4★", effect: "召喚貓王（ATK 為主人 90%）",       cooldown: "120s",   desc: "召喚至高的貓族之王。" },
      { name: "召喚馬格努斯",                 type: "Ativo",    rarity: "3★", effect: "召喚 Magnus (範圍 ATK 70% 主人)",       cooldown: "90s",    desc: "召喚元素生物馬格努斯。" },
      { name: "召喚獸屏障",              type: "Ativo",    rarity: "3★", effect: "召喚物 獲得護盾 5000 HP 持續 15 秒",       cooldown: "60s",    desc: "為召喚獸展開防護屏障。" },
      { name: "群體召喚獸治癒",            type: "Ativo",    rarity: "3★", effect: "治癒所有召喚物 40% HP",                cooldown: "25s",    desc: "治療多個召喚獸。" },
      { name: "召喚獸強化",          type: "Self-Buff",rarity: "3★", effect: "+50% 召喚物 ATK/DEF 持續 30 秒",               cooldown: "90s",    desc: "強化召喚獸的戰鬥能力。" },
      { name: "最終召喚獸",                type: "Ativo",    rarity: "4★", effect: "召喚物 犧牲: 範圍 600% + 治癒 50% HP",  cooldown: "180s",   desc: "犧牲召喚獸釋放最後力量。" },
      { name: "超越召喚爆發",     type: "Ativo",    rarity: "4★", effect: "所有 召喚物 攻擊: 傷害 800% 完全",     cooldown: "200s",   desc: "引爆多重召喚力量。" },
      { name: "奧術領主和諧",         type: "Self-Buff",rarity: "4★", effect: "+50% 魔法攻擊, +60% 召喚物 威力 30 分鐘",       cooldown: "90 min", desc: "奧術領主的戰鬥和諧。" },
      { name: "召喚大師",           type: "Passivo",  rarity: "3★", effect: "+15% 召喚物 ATK/DEF, +5% 對怪物",             cooldown: "N/A",    desc: "精通召喚術。" },
      { name: "奧術領主之魂",            type: "Passivo",  rarity: "3★", effect: "+12% 魔法攻擊, +10% 召喚物 HP",                cooldown: "N/A",    desc: "奧術領主的戰鬥精神。" },
      { name: "奧術領主之軀",       type: "Passivo",  rarity: "3★", effect: "+10% 最大 MP, +8% 最大 HP",                  cooldown: "N/A",    desc: "以奧術力量強化身軀。" }
    ]
  },

  // ─── CLERIC (1ª classe) ───
  cleric: {
    name: '牧師', parent: 'mage', race: 'human', archetype: 'healer', stage: 1,
    desc: '擅長治療與支援的牧師。保留先前學會的技能。',
    base: { atk: 8, def: 15, hp: 130, mp: 120, eva: 4, crit: 3, matk: 22, mdef: 28 },
    skills: [
      { name: "治癒",             type: "Ativo",    rarity: "1★", effect: "治癒 25% HP 目標",                 cooldown: "8s",     desc: "進行基礎治療。" },
      { name: "戰鬥治癒",      type: "Ativo",    rarity: "1★", effect: "治癒 20% HP + 移除 1 減益",    cooldown: "10s",    desc: "在戰鬥中快速治療。" },
      { name: "力量",            type: "Party-Buff",rarity: "1★", effect: "隊伍 ATK +15%，持續 10 分鐘",      cooldown: "25 min", desc: "賦予提升力量的祝福。" },
      { name: "盾牌祝福",    type: "Party-Buff",rarity: "1★", effect: "隊伍 DEF +15%，持續 10 分鐘",      cooldown: "25 min", desc: "賦予防護祝福。" },
      { name: "風之疾走",        type: "Party-Buff",rarity: "1★", effect: "+20% 速度給隊伍 10 分鐘",    cooldown: "25 min", desc: "提高移動速度。" },
      { name: "解毒",      type: "Ativo",    rarity: "1★", effect: "移除 中毒",                    cooldown: "5s",     desc: "解除中毒狀態。" },
      { name: "止血",       type: "Ativo",    rarity: "1★", effect: "移除 流血",                     cooldown: "5s",     desc: "解除流血狀態。" },
      { name: "驅散不死生物",      type: "Ativo",    rarity: "2★", effect: "對不死族造成 200% 神聖傷害",         cooldown: "12s",    desc: "驅逐不死系敵人。" },
      { name: "魔力回復",         type: "Ativo",    rarity: "1★", effect: "恢復 20% MP do 目標",          cooldown: "12s",    desc: "恢復目標的 MP。" },
      { name: "牧師和諧", type: "Self-Buff",rarity: "2★", effect: "+20% 魔法攻擊, +20% 治癒威力 20 分鐘",cooldown: "45 min", desc: "牧師的戰鬥和諧。" }
    ]
  },

  // ─── BISHOP (2ª classe — HEALER) ───
  bishop: {
    name: '主教', parent: 'cleric', stage: 2,
    desc: '擁有強大治療能力的主教。保留先前學會的技能。',
    base: { atk: 10, def: 28, hp: 250, mp: 220, eva: 4, crit: 4, matk: 50, mdef: 60 },
    skills: [
      { name: "高級治癒",          type: "Ativo",      rarity: "2★", effect: "治癒 40% HP 目標",                    cooldown: "10s",    desc: "施展更強力的治療。" },
      { name: "高級群體治癒",    type: "Ativo",      rarity: "3★", effect: "治癒 30% HP 隊伍",                   cooldown: "18s",    desc: "治療隊伍成員。" },
      { name: "復活",          type: "Ativo",      rarity: "3★", effect: "以 30% HP 復活盟友",        cooldown: "120s",   desc: "使倒下的目標復活。" },
      { name: "高級力量",         type: "Party-Buff", rarity: "2★", effect: "+25% ATK 隊伍 12 分鐘",               cooldown: "30 min", desc: "賦予更強大的力量祝福。" },
      { name: "高級盾牌",        type: "Party-Buff", rarity: "2★", effect: "+25% DEF 隊伍 12 分鐘",               cooldown: "30 min", desc: "賦予更強大的防護祝福。" },
      { name: "祝福之軀",          type: "Party-Buff", rarity: "2★", effect: "+20% 最大 HP 隊伍 12 分鐘",            cooldown: "30 min", desc: "以祝福強化身體。" },
      { name: "祝福之魂",          type: "Party-Buff", rarity: "2★", effect: "+20% 最大 MP 隊伍 12 分鐘",            cooldown: "30 min", desc: "以祝福強化靈魂。" },
      { name: "神聖武器",           type: "Party-Buff", rarity: "2★", effect: "+15% 神聖 ATK 隊伍 12 分鐘",          cooldown: "30 min", desc: "賦予武器神聖力量。" },
      { name: "淨化",                type: "Ativo",      rarity: "2★", effect: "移除 3 de增益 do 目標",            cooldown: "20s",    desc: "淨化負面狀態。" },
      { name: "潔淨",               type: "Ativo",      rarity: "3★", effect: "移除所有減益效果 do 目標",        cooldown: "45s",    desc: "徹底清除異常狀態。" },
      { name: "精神之盾",         type: "Party-Buff", rarity: "2★", effect: "+20% 魔法防禦 隊伍 12 分鐘",             cooldown: "30 min", desc: "提高精神異常抗性。" },
      { name: "審判者",            type: "Ativo",      rarity: "2★", effect: "傷害 神聖 250%",                      cooldown: "14s",    desc: "獲得審判者的神聖力量。" },
      { name: "神聖打擊",           type: "Ativo",      rarity: "3★", effect: "傷害 神聖 320% + 不死族 2x",          cooldown: "18s",    desc: "施展神聖屬性攻擊。" },
      { name: "神聖懲罰",     type: "Ativo",      rarity: "3★", effect: "傷害 神聖 360% + 暈眩 3 秒",            cooldown: "22s",    desc: "以神聖力量懲罰敵人。" },
      { name: "大型治癒",            type: "Ativo",      rarity: "3★", effect: "治癒 55% HP 目標",                    cooldown: "15s",    desc: "施展強力治療。" },
      { name: "隊伍召回",          type: "Ativo",      rarity: "2★", effect: "將隊伍傳送至城鎮",         cooldown: "300s",   desc: "將隊伍成員傳送回安全地點。" },
      { name: "主教和諧",      type: "Self-Buff",  rarity: "3★", effect: "+35% 治癒, +25% 魔法攻擊, +20% 魔法防禦 25 分鐘",cooldown: "60 min",desc: "主教的戰鬥和諧。" },
      { name: "魔力再生",     type: "Passivo",    rarity: "2★", effect: "+15% MP 恢復",                       cooldown: "N/A",    desc: "提高 MP 自然恢復。" }
    ]
  },

  // ─── CARDINAL (3ª classe — MEGA HEALER + DARK SIDE) ───
  cardinal: {
    name: '樞機主教', parent: 'bishop', stage: 3,
    desc: '至高治療者，同時能以黑暗面姿態施展神聖傷害。保留先前學會的技能。',
    base: { atk: 12, def: 42, hp: 420, mp: 480, eva: 5, crit: 5, matk: 95, mdef: 98 },
    skills: [
      { name: "奇蹟",                      type: "Ativo",      rarity: "4★", effect: "治癒隊伍 80% HP + 復活死亡成員",      cooldown: "300s",   desc: "施展至高治療並可復活盟友。" },
      { name: "崇高自我犧牲",        type: "Ativo",      rarity: "4★", effect: "死亡時使隊伍恢復 100% HP／MP",       cooldown: "300s",   desc: "以自身力量進行崇高犧牲。" },
      { name: "生命平衡",                  type: "Ativo",      rarity: "3★", effect: "平均 HP的所有 隊伍",                cooldown: "60s",    desc: "重新平衡生命值。" },
      { name: "群體復活",             type: "Ativo",      rarity: "4★", effect: "使所有隊伍成員以 40% HP 復活",        cooldown: "300s",   desc: "使多名倒下的盟友復活。" },
      { name: "吸血鬼領主",               type: "Party-Buff", rarity: "3★", effect: "+10% 吸血給隊伍 12 分鐘",        cooldown: "30 min", desc: "獲得吸血鬼領主之力。" },
      { name: "伊娃祝福",               type: "Party-Buff", rarity: "3★", effect: "+25% 魔法防禦 和 抗性 減益 隊伍 12 分鐘",  cooldown: "30 min", desc: "獲得伊娃的祝福。" },
      { name: "恍惚",                        type: "Ativo",      rarity: "3★", effect: "引導施法：每秒治療 8%，持續 10 秒",           cooldown: "45s",    desc: "進入治療恍惚狀態。" },
      { name: "黑暗面",                     type: "Toggle",     rarity: "3★", effect: "切換： -60% 治癒, +80% 魔法攻擊 神聖",       cooldown: "N/A",    desc: "切換黑暗面姿態，讓治療者轉為輸出型態。" },
      { name: "神聖爆發",                    type: "Ativo",      rarity: "3★", effect: "神聖範圍傷害 400%（僅限黑暗側）",     cooldown: "20s",    desc: "在黑暗面姿態下釋放神聖爆炸。" },
      { name: "神聖新星",                   type: "Ativo",      rarity: "3★", effect: "傷害 神聖 範圍 450% + 致盲 5 秒",           cooldown: "25s",    desc: "釋放神聖新星，黑暗面姿態下效果更強。" },
      { name: "超越神聖打擊",      type: "Ativo",      rarity: "4★", effect: "傷害 神聖 750% + 暈眩 5 秒",                cooldown: "180s",   desc: "施展超越極限的神聖打擊。" },
      { name: "樞機主教和諧",            type: "Self-Buff",  rarity: "4★", effect: "+55% 治癒, +40% 魔法攻擊, +30% 魔法防禦 30 分鐘",cooldown: "90 min", desc: "樞機主教的戰鬥和諧。" },
      { name: "治癒大師",             type: "Passivo",    rarity: "3★", effect: "+15% 治癒威力, +5% 對怪物",               cooldown: "N/A",    desc: "精通各式治療術。" },
      { name: "樞機主教之魂",               type: "Passivo",    rarity: "3★", effect: "神聖屬性魔法攻擊 +12%",                     cooldown: "N/A",    desc: "樞機主教的神聖精神。" },
      { name: "樞機主教之軀",          type: "Passivo",    rarity: "3★", effect: "+12% 最大 MP, +10% 魔法防禦",                cooldown: "N/A",    desc: "獲得神聖強化的身軀。" }
    ]
  },

  // ─── PROPHET (2ª classe — BUFFER) ───
  prophet: {
    name: '先知', parent: 'cleric', stage: 2,
    desc: '精通各式增益魔法的先知。保留先前學會的技能。',
    base: { atk: 12, def: 25, hp: 280, mp: 200, eva: 4, crit: 4, matk: 42, mdef: 52 },
    skills: [
      { name: "加速",              type: "Self-Buff",  rarity: "2★", effect: "+30% 攻擊速度 持續 20 分鐘",            cooldown: "50 min", desc: "提高行動與攻擊速度。" },
      { name: "狂戰士之魂",    type: "Self-Buff",  rarity: "2★", effect: "+20% ATK, +20% 魔法攻擊, -10% DEF 20 分鐘",cooldown: "50 min", desc: "喚醒狂戰士之魂。" },
      { name: "吸血狂怒",      type: "Self-Buff",  rarity: "2★", effect: "+10% 吸血 持續 20 分鐘",            cooldown: "50 min", desc: "賦予吸血效果。" },
      { name: "魔力強化",            type: "Self-Buff",  rarity: "2★", effect: "+25% 魔法攻擊 持續 20 分鐘",                cooldown: "50 min", desc: "提高魔法攻擊力。" },
      { name: "靈活思緒",             type: "Self-Buff",  rarity: "2★", effect: "+25% 施法速度 持續 20 分鐘",           cooldown: "50 min", desc: "提高施法效率。" },
      { name: "專注",      type: "Self-Buff",  rarity: "2★", effect: "+20% 魔法防禦 持續 20 分鐘",                cooldown: "50 min", desc: "提高魔法專注力。" },
      { name: "死亡低語",      type: "Self-Buff",  rarity: "2★", effect: "+20% 暴擊傷害 持續 20 分鐘",          cooldown: "50 min", desc: "以死亡之力強化暴擊。" },
      { name: "引導",           type: "Self-Buff",  rarity: "2★", effect: "+15% 命中，持續 20 分鐘",             cooldown: "50 min", desc: "獲得神聖引導。" },
      { name: "專注",              type: "Self-Buff",  rarity: "2★", effect: "+15% 暴擊率 持續 20 分鐘",            cooldown: "50 min", desc: "提升戰鬥專注力。" },
      { name: "祝福之盾",       type: "Self-Buff",  rarity: "2★", effect: "+25% 格擋率 持續 20 分鐘",           cooldown: "50 min", desc: "賦予盾牌祝福。" },
      { name: "火焰抗性",        type: "Self-Buff",  rarity: "2★", effect: "+20% 火抗性 持續 20 分鐘",          cooldown: "50 min", desc: "提高火屬性抗性。" },
      { name: "水屬性抗性",       type: "Self-Buff",  rarity: "2★", effect: "+20% 水抗性 持續 20 分鐘",         cooldown: "50 min", desc: "提高水屬性抗性。" },
      { name: "風屬性抗性",        type: "Self-Buff",  rarity: "2★", effect: "+20% 風抗性 持續 20 分鐘",          cooldown: "50 min", desc: "提高風屬性抗性。" },
      { name: "神聖打擊",        type: "Ativo",      rarity: "2★", effect: "傷害 神聖 280%",                       cooldown: "14s",    desc: "施展神聖攻擊。" },
      { name: "先知和諧",  type: "Self-Buff",  rarity: "3★", effect: "+30% ATK, +25% 魔法攻擊, +20% DEF 25 分鐘", cooldown: "60 min", desc: "先知的戰鬥和諧。" }
    ]
  },

  // ─── HIEROPHANT (3ª classe — MEGA BUFFER + DPS) ───
  hierophant: {
    name: '聖言者', parent: 'prophet', stage: 3,
    desc: '掌握預言與攻擊魔法的至高先知。保留先前學會的技能。',
    base: { atk: 15, def: 38, hp: 420, mp: 380, eva: 5, crit: 5, matk: 82, mdef: 82 },
    skills: [
      { name: "火之預言",             type: "Party-Buff", rarity: "3★", effect: "+30% ATK, +15% 暴擊 隊伍 12 分鐘",        cooldown: "30 min", desc: "施放火之預言。" },
      { name: "風之預言",             type: "Party-Buff", rarity: "3★", effect: "+25% 速度, +20% 迴避 隊伍 12 分鐘",       cooldown: "30 min", desc: "施放風之預言。" },
      { name: "水之預言",            type: "Party-Buff", rarity: "3★", effect: "+30% 魔法攻擊, +20% 魔法防禦 隊伍 12 分鐘",     cooldown: "30 min", desc: "施放水之預言。" },
      { name: "群體預言",                type: "Party-Buff", rarity: "4★", effect: "所有 預言的一次 8 分鐘",        cooldown: "60 min", desc: "對隊伍施放群體預言。" },
      { name: "神聖懲罰",              type: "Ativo",      rarity: "3★", effect: "傷害 神聖 400% + 沉默 5 秒",              cooldown: "22s",    desc: "以神聖力量懲罰敵人。" },
      { name: "神秘免疫",              type: "Ativo",      rarity: "4★", effect: "免疫魔法 8 秒, 無法攻擊",        cooldown: "180s",   desc: "獲得神秘力量保護。" },
      { name: "貴族祝福",         type: "Party-Buff", rarity: "3★", effect: "+15% 全屬性 隊伍 10 分鐘",             cooldown: "30 min", desc: "獲得貴族的祝福。" },
      { name: "超越神聖爆發",      type: "Ativo",      rarity: "4★", effect: "神聖範圍傷害 650% + 暈眩 4 秒 + 驅散",    cooldown: "180s",   desc: "施展超越極限的神聖爆發。" },
      { name: "聖言者和諧",         type: "Self-Buff",  rarity: "4★", effect: "+50% ATK, +45% 魔法攻擊, +35% DEF 30 分鐘",    cooldown: "90 min", desc: "聖言者的戰鬥和諧。" },
      { name: "預言大師",           type: "Passivo",    rarity: "3★", effect: "+15% 增益 持續時間, +5% 對怪物",             cooldown: "N/A",    desc: "精通各式預言。" },
      { name: "聖言者之魂",            type: "Passivo",    rarity: "3★", effect: "+12% 神聖 ATK, +8% 治癒",                  cooldown: "N/A",    desc: "聖言者的戰鬥精神。" },
      { name: "聖言者之軀",       type: "Passivo",    rarity: "3★", effect: "+10% 最大 HP, +10% 最大 MP",                cooldown: "N/A",    desc: "強化聖言者的身軀。" }
    ]
  },

  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  //  ELF FIGHTER
  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

  elfFighter: {
    name: '精靈戰士', archetype: 'fighter', race: 'elf', stage: 0,
    desc: '敏捷的精靈戰士。',
    base: { atk: 10, def: 8, hp: 90, mp: 35, eva: 10, crit: 6, matk: 0, mdef: 6 },
    skills: [
      { name: "強力打擊",       type: "Ativo",    rarity: "1★", effect: "物理傷害 150%",               cooldown: "8s",     desc: "對目標施展集中打擊。" },
      { name: "致命一擊",         type: "Ativo",    rarity: "1★", effect: "傷害 170% + 暴擊率 20%",    cooldown: "10s",    desc: "施展致命攻擊。" },
      { name: "強力射擊",          type: "Ativo",    rarity: "1★", effect: "遠距傷害 140%",          cooldown: "9s",     desc: "進行集中射擊。" },
      { name: "精靈之魂",        type: "Self-Buff",rarity: "1★", effect: "+10% 迴避, +10% 速度 持續 15 分鐘",cooldown: "30 min", desc: "獲得精靈之魂的力量。" },
      { name: "HP 提升 Lv1",     type: "Passivo",  rarity: "1★", effect: "+5% 最大 HP",                     cooldown: "N/A",    desc: "強化精靈體質。" },
      { name: "輕甲精通", type: "Passivo",  rarity: "1★", effect: "+8% DEF 裝備輕甲時",      cooldown: "N/A",    desc: "精通輕型防具。" }
    ]
  },

  // ─── ELVEN KNIGHT (1ª classe) ───
  elvenKnight: {
    name: '精靈騎士', parent: 'elfFighter', race: 'elf', archetype: 'tank', stage: 1,
    desc: '使用盾牌作戰的精靈騎士。保留先前學會的技能。',
    base: { atk: 16, def: 30, hp: 230, mp: 55, eva: 8, crit: 4, mdef: 18 },
    skills: [
      { name: "盾牌打擊",         type: "Ativo",    rarity: "1★", effect: "傷害 160% + 嘲諷 5 秒",         cooldown: "10s",    desc: "以盾牌攻擊敵人。" },
      { name: "仇恨",                  type: "Ativo",    rarity: "1★", effect: "嘲諷 + 高仇恨",          cooldown: "8s",     desc: "激起敵人的仇恨。" },
      { name: "力量削弱",           type: "Ativo",    rarity: "1★", effect: "傷害 150% + -20% ATK 8 秒",      cooldown: "14s",    desc: "削弱敵人的力量。" },
      { name: "重甲精通",   type: "Passivo",  rarity: "1★", effect: "+15% DEF 重甲",     cooldown: "N/A",    desc: "精通重型防具。" },
      { name: "盾牌精通",        type: "Passivo",  rarity: "1★", effect: "+15% 格擋率",              cooldown: "N/A",    desc: "精通盾牌防禦。" },
      { name: "劍／鈍器精通",   type: "Passivo",  rarity: "1★", effect: "+10% ATK 劍／鈍器",        cooldown: "N/A",    desc: "精通劍與鈍器。" },
      { name: "HP 提升 Lv2",       type: "Passivo",  rarity: "1★", effect: "+10% 最大 HP",                  cooldown: "N/A",    desc: "進一步強化體質。" },
      { name: "箭矢偏轉",         type: "Passivo",  rarity: "1★", effect: "+10% 閃避投射物",       cooldown: "N/A",    desc: "提高對投射物的閃避能力。" }
    ]
  },

  // ─── TEMPLE KNIGHT (2ª classe) ───
  templeKnight: {
    name: '聖殿騎士', parent: 'elvenKnight', stage: 2,
    desc: '侍奉伊娃神殿的騎士。保留先前學會的技能。',
    base: { atk: 35, def: 62, hp: 500, mp: 100, eva: 8, crit: 5, mdef: 40 },
    skills: [
      { name: "盾牌暈擊",           type: "Ativo",    rarity: "2★", effect: "傷害 200% + 暈眩 3 秒",           cooldown: "18s",    desc: "以盾牌重擊使敵人暈眩。" },
      { name: "審判",              type: "Ativo",    rarity: "2★", effect: "傷害 240% + -20% DEF 10 秒",      cooldown: "20s",    desc: "施展神殿的審判。" },
      { name: "伊娃意志",            type: "Ativo",    rarity: "3★", effect: "+30% 水抗性 + 治癒 15% HP",cooldown: "45s",   desc: "獲得伊娃的意志。" },
      { name: "犧牲",             type: "Ativo",    rarity: "2★", effect: "治癒盟友 30% (消耗 10%)",    cooldown: "25s",    desc: "犧牲自身力量守護盟友。" },
      { name: "神盾",                 type: "Ativo",    rarity: "2★", effect: "+60% 格擋率 持續 15 秒",        cooldown: "45s",    desc: "展開強力防禦。" },
      { name: "神聖之刃",            type: "Ativo",    rarity: "2★", effect: "傷害 神聖 250%",              cooldown: "16s",    desc: "以神聖力量強化刀刃。" },
      { name: "終極防禦",      type: "Ativo",    rarity: "3★", effect: "+80% DEF, -50% ATK 持續 15 秒",     cooldown: "120s",   desc: "進入近乎絕對的防禦狀態。" },
      { name: "挑釁",               type: "Ativo",    rarity: "1★", effect: "嘲諷 + 仇恨",                  cooldown: "8s",     desc: "挑釁敵人並吸引其注意。" },
      { name: "召喚生命晶體",     type: "Ativo",    rarity: "2★", effect: "晶體 會 治癒 5%/5 秒",           cooldown: "45s",    desc: "召喚具有生命恢復能力的晶體。" },
      { name: "召喚風暴晶體",    type: "Ativo",    rarity: "2★", effect: "晶體的傷害 雷電",        cooldown: "45s",    desc: "召喚風暴晶體協助戰鬥。" },
      { name: "聖殿騎士和諧",          type: "Self-Buff",rarity: "3★", effect: "+35% DEF, +25% HP, +15% 迴避 25 分鐘",cooldown: "60 min",desc: "聖殿騎士的戰鬥和諧。" },
      { name: "HP 強化",              type: "Passivo",  rarity: "2★", effect: "+15% 最大 HP",                    cooldown: "N/A",    desc: "強化 HP。" },
      { name: "水屬性抗性",           type: "Passivo",  rarity: "1★", effect: "+10% 水抗性",              cooldown: "N/A",    desc: "提高水屬性抗性。" }
    ]
  },

  // ─── EVA'S TEMPLAR (3ª classe) ───
  evaTemplar: {
    name: "伊娃聖殿騎士", parent: 'templeKnight', stage: 3,
    desc: '伊娃的神聖水系防禦騎士。保留先前學會的技能。',
    base: { atk: 68, def: 100, hp: 820, mp: 145, eva: 10, crit: 6, mdef: 65 },
    skills: [
      { name: "伊娃之觸",                  type: "Ativo",    rarity: "3★", effect: "範圍治療隊伍 25% HP + 淨化 1 個減益效果", cooldown: "35s",    desc: "施展伊娃之觸。" },
      { name: "伊娃之盾",                 type: "Ativo",    rarity: "3★", effect: "吸收 5000 傷害 持續 15 秒",               cooldown: "90s",    desc: "展開伊娃之盾。" },
      { name: "天界之盾",              type: "Ativo",    rarity: "4★", effect: "隊伍 免疫 a 傷害 持續 5 秒",               cooldown: "300s",   desc: "展開天界護盾。" },
      { name: "水之打擊",                   type: "Ativo",    rarity: "3★", effect: "傷害 水 380% + 緩速 40% 6 秒",           cooldown: "22s",    desc: "施展水屬性攻擊。" },
      { name: "召喚守護亞加西翁",       type: "Ativo",    rarity: "3★", effect: "召喚 守護亞加西翁 (+15% DEF)",     cooldown: "120s",   desc: "召喚守護型亞加西翁。" },
      { name: "超越盾牌衝鋒",    type: "Ativo",    rarity: "4★", effect: "突進 + 480% 傷害 + 範圍 嘲諷 10 秒",        cooldown: "160s",   desc: "施展超越極限的盾牌突進。" },
      { name: "伊娃聖殿騎士和諧",         type: "Self-Buff",rarity: "4★", effect: "+55% DEF, +40% HP, +25% 魔法防禦 30 分鐘",     cooldown: "90 min", desc: "伊娃聖殿騎士的至高戰鬥和諧。" },
      { name: "戰鬥大師",              type: "Passivo",  rarity: "3★", effect: "+10% ATK, +15% 仇恨, +5% 對怪物",           cooldown: "N/A",    desc: "精通各式戰鬥技巧。" },
      { name: "伊娃聖殿騎士之魂",          type: "Passivo",  rarity: "3★", effect: "水屬性 ATK +15%、格擋率 +10%",              cooldown: "N/A",    desc: "伊娃聖殿騎士的戰鬥精神。" },
      { name: "伊娃聖殿騎士之軀",         type: "Passivo",  rarity: "3★", effect: "+15% 最大 HP, +10% DEF",                  cooldown: "N/A",    desc: "強化伊娃聖殿騎士的身軀。" },
      { name: "伊娃守護",             type: "Passivo",  rarity: "3★", effect: "+15% 水抗性",                       cooldown: "N/A",    desc: "獲得伊娃的守護。" },
      { name: "伊娃援助",                    type: "Passivo",  rarity: "3★", effect: "10% 機率對ser 受到攻擊: 治癒 5% HP",   cooldown: "N/A",    desc: "觸發伊娃的援助效果。" }
    ]
  },

  // ─── SWORD SINGER (2ª classe — BARD) ───
  swordSinger: {
    name: '劍歌者', parent: 'elvenKnight', stage: 2,
    desc: '以歌聲強化隊伍的精靈吟遊詩人。保留先前學會的技能。',
    base: { atk: 38, def: 45, hp: 400, mp: 120, eva: 10, crit: 8, mdef: 35 },
    skills: [
      { name: "大地之歌",         type: "Self-Buff", rarity: "2★", effect: "+20% DEF 持續 20 分鐘",            cooldown: "50 min", desc: "吟唱大地之歌。" },
      { name: "生命之歌",          type: "Self-Buff", rarity: "2★", effect: "+15% HP 恢復 持續 20 分鐘",       cooldown: "50 min", desc: "吟唱生命之歌。" },
      { name: "水之歌",         type: "Self-Buff", rarity: "2★", effect: "+20% 水抗性 持續 20 分鐘",   cooldown: "50 min", desc: "吟唱水之歌。" },
      { name: "守護之歌",       type: "Self-Buff", rarity: "2★", effect: "+20% 魔法防禦 持續 20 分鐘",          cooldown: "50 min", desc: "吟唱守護之歌。" },
      { name: "風之歌",          type: "Self-Buff", rarity: "2★", effect: "+20% 攻擊速度 持續 20 分鐘",      cooldown: "50 min", desc: "吟唱風之歌。" },
      { name: "獵人之歌",        type: "Self-Buff", rarity: "2★", effect: "+15% 暴擊率 持續 20 分鐘",      cooldown: "50 min", desc: "吟唱獵人之歌。" },
      { name: "召喚之歌",    type: "Self-Buff", rarity: "2★", effect: "+15% MP 恢復 持續 20 分鐘",       cooldown: "50 min", desc: "吟唱召喚之歌。" },
      { name: "活力之歌",      type: "Self-Buff", rarity: "2★", effect: "+15% 最大 HP 持續 20 分鐘",         cooldown: "50 min", desc: "吟唱活力之歌。" },
      { name: "復仇之歌",     type: "Self-Buff", rarity: "2★", effect: "+8% 反射傷害 持續 20 分鐘",  cooldown: "50 min", desc: "吟唱復仇之歌。" },
      { name: "火焰守護之歌",   type: "Self-Buff", rarity: "2★", effect: "+20% 火抗性 持續 20 分鐘",    cooldown: "50 min", desc: "吟唱火焰守護之歌。" },
      { name: "冠軍之歌",      type: "Self-Buff", rarity: "3★", effect: "+20% ATK 持續 20 分鐘",            cooldown: "50 min", desc: "吟唱冠軍之歌。" },
      { name: "更新之歌",       type: "Self-Buff", rarity: "3★", effect: "+10% HP+MP 恢復 持續 20 分鐘",    cooldown: "50 min", desc: "吟唱更新之歌。" },
      { name: "劍歌者和諧",          type: "Self-Buff", rarity: "3★", effect: "+30% ATK, +20% DEF, +15% 速度 25 分鐘",cooldown: "60 min",desc: "劍歌者的戰鬥和諧。" },
      { name: "重甲精通",   type: "Passivo",  rarity: "1★", effect: "+12% DEF 重甲",        cooldown: "N/A",    desc: "精通重型防具。" },
      { name: "HP 強化",              type: "Passivo",  rarity: "1★", effect: "+12% 最大 HP",                     cooldown: "N/A",    desc: "強化 HP。" }
    ]
  },

  // ─── SWORD MUSE (3ª classe — MEGA BARD + DPS) ───
  swordMuse: {
    name: '劍之繆思', parent: 'swordSinger', stage: 3,
    desc: '兼具強力增益與輸出能力的至高劍歌者。保留先前學會的技能。',
    base: { atk: 72, def: 58, hp: 580, mp: 160, eva: 14, crit: 12, mdef: 48 },
    skills: [
      { name: "淨化之歌",    type: "Self-Buff", rarity: "3★", effect: "+25% 減益 抗性 持續 20 分鐘",     cooldown: "50 min", desc: "吟唱淨化之歌。" },
      { name: "元素之歌",       type: "Self-Buff", rarity: "3★", effect: "+20% 全 元素 ATK 持續 20 分鐘", cooldown: "50 min", desc: "吟唱元素之歌。" },
      { name: "暴風守護之歌",     type: "Self-Buff", rarity: "3★", effect: "+20% 風抗性 持續 20 分鐘",       cooldown: "50 min", desc: "吟唱暴風守護之歌。" },
      { name: "群體之歌",               type: "Party-Buff",rarity: "3★", effect: "對隊伍施加所有歌曲效果，持續 8 分鐘", cooldown: "60 min", desc: "對隊伍吟唱群體強化之歌。" },
      { name: "終焉之歌",              type: "Ativo",     rarity: "4★", effect: "隊伍 +50% 全屬性 持續 20 秒",       cooldown: "300s",   desc: "吟唱至高的終焉之歌。" },
      { name: "音速斬",             type: "Ativo",     rarity: "3★", effect: "傷害 380% + 範圍 5 目標",           cooldown: "20s",    desc: "施展音速斬擊。" },
      { name: "旋律打擊",           type: "Ativo",     rarity: "3★", effect: "傷害 350% + 暈眩 2 秒",               cooldown: "18s",    desc: "以旋律之力攻擊敵人。" },
      { name: "超越旋律",     type: "Ativo",     rarity: "4★", effect: "傷害 範圍 550% + 全 歌曲效果刷新",cooldown: "180s",  desc: "施展超越極限的旋律。" },
      { name: "劍之繆思和諧",      type: "Self-Buff", rarity: "4★", effect: "+50% ATK、+40% DEF、+30% 歌曲效果，持續 30 分鐘",cooldown: "90 min",desc: "劍之繆思的戰鬥和諧。" },
      { name: "劍之繆思之魂",       type: "Passivo",   rarity: "3★", effect: "+15% 歌曲效果",           cooldown: "N/A",    desc: "劍之繆思的戰鬥精神。" },
      { name: "劍之繆思之軀",      type: "Passivo",   rarity: "3★", effect: "+10% 最大 HP, +10% 最大 MP",         cooldown: "N/A",    desc: "強化劍之繆思的身軀。" }
    ]
  },

  // ─── SCOUT (1ª classe — Elf) ───
  elfScout: {
    name: '斥候', parent: 'elfFighter', race: 'elf', archetype: 'assassin', stage: 1,
    desc: '使用匕首與弓的精靈斥候。保留先前學會的技能。',
    base: { atk: 20, def: 10, hp: 140, mp: 40, eva: 18, crit: 12, mdef: 8 },
    skills: [
      { name: "雙重射擊",          type: "Ativo",    rarity: "1★", effect: "2 次射擊, 總傷害 200%",   cooldown: "10s",    desc: "連續射擊兩次。" },
      { name: "背刺",             type: "Ativo",    rarity: "2★", effect: "傷害 250% 從背後 + 暴擊",     cooldown: "14s",    desc: "從背後施展致命一擊。" },
      { name: "疾走",                 type: "Ativo",    rarity: "1★", effect: "+50% 速度 持續 8 秒",             cooldown: "20s",    desc: "短時間快速移動。" },
      { name: "輕甲精通",  type: "Passivo",  rarity: "1★", effect: "+12% 迴避 裝備輕甲時",    cooldown: "N/A",    desc: "精通輕型防具。" },
      { name: "匕首精通",       type: "Passivo",  rarity: "1★", effect: "+12% ATK 使用匕首時",           cooldown: "N/A",    desc: "精通匕首武器。" },
      { name: "弓精通",          type: "Passivo",  rarity: "1★", effect: "+12% ATK 使用弓時",             cooldown: "N/A",    desc: "精通弓類武器。" },
      { name: "暴擊機率",      type: "Passivo",  rarity: "1★", effect: "+8% 暴擊率",                 cooldown: "N/A",    desc: "提高暴擊感知能力。" }
    ]
  },

  // ─── PLAINS WALKER (2ª classe — dagger) ───
  plainsWalker: {
    name: '平原行者', parent: 'elfScout', stage: 2,
    desc: '擅長匕首與潛行的平原行者。保留先前學會的技能。',
    base: { atk: 52, def: 18, hp: 290, mp: 60, eva: 30, crit: 26, mdef: 14 },
    skills: [
      { name: "致命打擊",       type: "Ativo",    rarity: "2★", effect: "傷害 280% + 必定暴擊",       cooldown: "14s",    desc: "施展強力致命攻擊。" },
      { name: "致死打擊",       type: "Ativo",    rarity: "3★", effect: "傷害 350% + 即死機率 5%",       cooldown: "22s",    desc: "施展具有致死可能的打擊。" },
      { name: "沙塵炸彈",         type: "Ativo",    rarity: "2★", effect: "範圍 致盲 5 秒 + 傷害 150%",         cooldown: "20s",    desc: "投擲沙塵炸彈。" },
      { name: "致盲打擊",     type: "Ativo",    rarity: "2★", effect: "傷害 240% + 致盲 4 秒",             cooldown: "18s",    desc: "施展可使敵人失明的攻擊。" },
      { name: "暗影步伐",       type: "Ativo",    rarity: "2★", effect: "傳送到目標背後",          cooldown: "15s",    desc: "瞬間移動到目標身後。" },
      { name: "位置交換",            type: "Ativo",    rarity: "2★", effect: "與目標交換位置",           cooldown: "25s",    desc: "與目標交換位置。" },
      { name: "假死",        type: "Ativo",    rarity: "2★", effect: "裝死, 失去 仇恨",         cooldown: "60s",    desc: "偽裝死亡以解除敵人仇恨。" },
      { name: "詭計",             type: "Ativo",    rarity: "2★", effect: "使敵人失去目前目標",           cooldown: "20s",    desc: "以詭計擾亂敵人。" },
      { name: "平原行者和諧",      type: "Self-Buff",rarity: "3★", effect: "+35% 暴擊, +25% 迴避, +20% ATK 25 分鐘",cooldown: "60 min",desc: "平原行者的戰鬥和諧。" },
      { name: "迴避",           type: "Passivo",  rarity: "2★", effect: "+12% 迴避",                         cooldown: "N/A",    desc: "進一步提高迴避能力。" },
      { name: "暴擊威力",    type: "Passivo",  rarity: "2★", effect: "+18% 暴擊傷害",                 cooldown: "N/A",    desc: "提高暴擊威力。" },
      { name: "專注",             type: "Passivo",  rarity: "1★", effect: "+10% 暴擊率",                   cooldown: "N/A",    desc: "提升專注力。" }
    ]
  },

  // ─── WIND RIDER (3ª classe) ───
  windRider: {
    name: '風騎士', parent: 'plainsWalker', stage: 3,
    desc: '精通匕首的至高風之戰士。保留先前學會的技能。',
    base: { atk: 95, def: 30, hp: 480, mp: 85, eva: 55, crit: 44, mdef: 20 },
    skills: [
      { name: "御風",                type: "Ativo",    rarity: "3★", effect: "+80% 速度 + 隱形 10 秒",         cooldown: "60s",    desc: "乘風高速移動。" },
      { name: "刺激冒險",          type: "Self-Buff",rarity: "3★", effect: "+45% 迴避, +30% 暴擊, +20% ATK 20 分鐘",cooldown: "55 min",desc: "進入精靈式的冒險戰鬥狀態。" },
      { name: "幸運打擊",               type: "Ativo",    rarity: "3★", effect: "傷害 420% + 2 倍掉落機率",         cooldown: "30s",    desc: "施展帶來額外收穫的幸運攻擊。" },
      { name: "超越致命打擊",    type: "Ativo",    rarity: "4★", effect: "傷害 650% + 無視 迴避 + 流血 12 秒", cooldown: "150s",   desc: "施展超越極限的致命攻擊。" },
      { name: "風騎士和諧",          type: "Self-Buff",rarity: "4★", effect: "+55% 暴擊, +45% 迴避, +35% ATK 30 分鐘",cooldown: "90 min",desc: "風騎士的至高戰鬥和諧。" },
      { name: "戰鬥大師",            type: "Passivo",  rarity: "3★", effect: "+10% ATK, +10% 暴擊, +5% 對怪物",      cooldown: "N/A",    desc: "精通各式戰鬥技巧。" },
      { name: "暗影感知",                type: "Passivo",  rarity: "3★", effect: "+15% 迴避 夜間/地城",           cooldown: "N/A",    desc: "感知暗影中的動靜。" },
      { name: "風騎士之魂",           type: "Passivo",  rarity: "3★", effect: "+12% 匕首攻擊",                    cooldown: "N/A",    desc: "風騎士的戰鬥精神。" },
      { name: "風騎士之軀",          type: "Passivo",  rarity: "3★", effect: "+10% 最大 HP, +8% 迴避",              cooldown: "N/A",    desc: "獲得風一般靈活的身軀。" },
      { name: "最終狂熱",                type: "Passivo",  rarity: "3★", effect: "+25% ATK 當 HP < 30%",           cooldown: "N/A",    desc: "在危急狀態下進入最終狂熱。" }
    ]
  },

  // ─── SILVER RANGER (2ª classe — archer) ───
  silverRanger: {
    name: '銀月遊俠', parent: 'elfScout', stage: 2,
    desc: '精靈族的銀色弓箭手。保留先前學會的技能。',
    base: { atk: 58, def: 16, hp: 270, mp: 60, eva: 22, crit: 24, mdef: 12 },
    skills: [
      { name: "雙重射擊",       type: "Ativo",    rarity: "2★", effect: "2 次射擊, 總傷害 260%",     cooldown: "10s",    desc: "施展強化的雙重射擊。" },
      { name: "爆裂射擊",        type: "Ativo",    rarity: "2★", effect: "傷害 280% + 擊退",           cooldown: "14s",    desc: "發射具有爆炸威力的箭矢。" },
      { name: "暈眩射擊",         type: "Ativo",    rarity: "2★", effect: "傷害 220% + 暈眩 3 秒",            cooldown: "18s",    desc: "發射可使敵人暈眩的箭矢。" },
      { name: "箭雨",        type: "Ativo",    rarity: "3★", effect: "範圍 320% (8 目標)",             cooldown: "22s",    desc: "向範圍內降下大量箭矢。" },
      { name: "快速射擊",        type: "Ativo",    rarity: "2★", effect: "+50% 攻擊速度 弓 15 秒",        cooldown: "45s",    desc: "短時間提高射擊速度。" },
      { name: "銀月遊俠和諧",      type: "Self-Buff",rarity: "3★", effect: "+35% ATK, +25% 暴擊, +15% 射程 25 分鐘",cooldown: "60 min",desc: "銀月遊俠的戰鬥和諧。" },
      { name: "弓精通",       type: "Passivo",  rarity: "2★", effect: "+18% ATK 使用弓時",              cooldown: "N/A",    desc: "精通弓類武器。" },
      { name: "遠距射擊",         type: "Passivo",  rarity: "2★", effect: "+30% 射程",                      cooldown: "N/A",    desc: "提高射擊距離。" },
      { name: "專注",             type: "Passivo",  rarity: "1★", effect: "+10% 暴擊率",                  cooldown: "N/A",    desc: "提升專注力。" },
      { name: "暴擊威力",    type: "Passivo",  rarity: "2★", effect: "+18% 暴擊傷害",                cooldown: "N/A",    desc: "提高暴擊威力。" },
      { name: "迴避",           type: "Passivo",  rarity: "1★", effect: "+10% 迴避",                        cooldown: "N/A",    desc: "提高迴避能力。" }
    ]
  },

  // ─── MOONLIGHT SENTINEL (3ª classe) ───
  moonlightSentinel: {
    name: '月光守衛', parent: 'silverRanger', stage: 3,
    desc: '精靈族的至高弓箭手月光守衛。保留先前學會的技能。',
    base: { atk: 108, def: 24, hp: 450, mp: 95, eva: 38, crit: 46, mdef: 18 },
    skills: [
      { name: "七連矢",                  type: "Ativo",    rarity: "3★", effect: "7 箭矢, 總傷害 480%",               cooldown: "25s",    desc: "連續射出七支箭矢。" },
      { name: "死亡之眼",                     type: "Self-Buff",rarity: "3★", effect: "+50% ATK, +40% 射程 20 分鐘",              cooldown: "55 min", desc: "進入致命瞄準狀態。" },
      { name: "精準射擊",                type: "Ativo",    rarity: "3★", effect: "傷害 400% + 無視 50% DEF",              cooldown: "28s",    desc: "對要害施展精準射擊。" },
      { name: "三重射擊",                  type: "Ativo",    rarity: "3★", effect: "3 次射擊, 總傷害 360%",              cooldown: "14s",    desc: "連續射擊三次。" },
      { name: "荊棘射擊",                   type: "Ativo",    rarity: "2★", effect: "傷害 260% + 流血 10 秒",                   cooldown: "12s",    desc: "發射帶有荊棘力量的箭矢。" },
      { name: "束縛射擊",                 type: "Ativo",    rarity: "2★", effect: "傷害 220% + 定身 4 秒",                     cooldown: "18s",    desc: "發射可束縛敵人的箭矢。" },
      { name: "冰凍射擊",                type: "Ativo",    rarity: "2★", effect: "傷害 冰 260% + 緩速 40% 6 秒",            cooldown: "16s",    desc: "發射冰凍箭矢。" },
      { name: "寒冰箭雨",             type: "Ativo",    rarity: "3★", effect: "範圍 冰 380% (10 目標) + 凍結",         cooldown: "28s",    desc: "凝聚周圍冷氣，讓箭矢結冰後降下寒冰箭雨。" },
      { name: "螺旋射擊",                  type: "Ativo",    rarity: "3★", effect: "傷害 420% + 穿透 目標",               cooldown: "24s",    desc: "發射螺旋箭矢。" },
      { name: "目標鎖定",                  type: "Ativo",    rarity: "3★", effect: "標記目標: +40% 傷害 12 秒",                cooldown: "30s",    desc: "鎖定目標以提高命中與傷害。" },
      { name: "超越七連矢",     type: "Ativo",    rarity: "4★", effect: "傷害 700% + 元素 + 無視 DEF",      cooldown: "180s",   desc: "施展超越極限的七連箭攻擊。" },
      { name: "月光守衛和諧",            type: "Self-Buff",rarity: "4★", effect: "+60% ATK, +50% 暴擊, +40% 射程 30 分鐘",   cooldown: "90 min", desc: "月光守衛的戰鬥和諧。" },
      { name: "戰鬥大師",             type: "Passivo",  rarity: "3★", effect: "+10% ATK, +10% 射程, +5% 對怪物",          cooldown: "N/A",    desc: "精通各式戰鬥技巧。" },
      { name: "月光守衛之魂",    type: "Passivo",  rarity: "3★", effect: "+15% 弓攻擊",                            cooldown: "N/A",    desc: "月光守衛的戰鬥精神。" },
      { name: "月光守衛之軀",   type: "Passivo",  rarity: "3★", effect: "+10% 最大 HP, +8% 迴避",                   cooldown: "N/A",    desc: "強化月光守衛的身軀。" }
    ]
  },

  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  //  ELF MAGE
  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

  elfMage: {
    name: '精靈法師', archetype: 'mage', race: 'elf', stage: 0,
    desc: '操控自然力量的精靈法師。',
    base: { atk: 4, def: 5, hp: 65, mp: 85, eva: 8, crit: 3, matk: 14, mdef: 10 },
    skills: [
      { name: "風之打擊",   type: "Ativo",    rarity: "1★", effect: "傷害 風 160%",             cooldown: "8s",     desc: "釋放風之衝擊。" },
      { name: "冰箭",      type: "Ativo",    rarity: "1★", effect: "傷害 冰 155% + 緩速 15% 4 秒",cooldown: "8s",     desc: "發射冰之彈體。" },
      { name: "自我治癒",     type: "Ativo",    rarity: "1★", effect: "治癒 20% HP",                 cooldown: "25s",    desc: "進行基礎自我治療。" },
      { name: "睡眠",         type: "Ativo",    rarity: "1★", effect: "使其睡眠 目標 8 秒",             cooldown: "30s",    desc: "以魔法使目標陷入睡眠。" },
      { name: "法袍精通",  type: "Passivo",  rarity: "1★", effect: "+10% 魔法防禦, +8% 施法速度",   cooldown: "N/A",    desc: "精通法袍裝備。" },
      { name: "MP 提升",   type: "Passivo",  rarity: "1★", effect: "+8% 最大 MP",                   cooldown: "N/A",    desc: "提高魔力儲備。" }
    ]
  },

  // ─── ELVEN WIZARD (1ª classe) ───
  elvenWizard: {
    name: '精靈巫師', parent: 'elfMage', race: 'elf', archetype: 'mage', stage: 1,
    desc: '精通元素魔法的精靈巫師。保留先前學會的技能。',
    base: { atk: 5, def: 7, hp: 95, mp: 135, eva: 6, crit: 4, matk: 33, mdef: 20 },
    skills: [
      { name: "烈焰",              type: "Ativo",    rarity: "1★", effect: "傷害 火 210%",                 cooldown: "10s",    desc: "釋放熾熱火焰。" },
      { name: "水之漩渦",         type: "Ativo",    rarity: "1★", effect: "傷害 水 200% + 緩速 20% 5 秒",   cooldown: "10s",    desc: "召喚水流漩渦。" },
      { name: "光環燃燒",          type: "Ativo",    rarity: "2★", effect: "範圍 火 180% 周圍",         cooldown: "14s",    desc: "以魔力燃燒周圍敵人。" },
      { name: "生命吸取",         type: "Ativo",    rarity: "2★", effect: "傷害 190% + 吸取 25% HP",       cooldown: "15s",    desc: "吸取目標生命力。" },
      { name: "精靈巫師和諧",   type: "Self-Buff",rarity: "2★", effect: "+25% 魔法攻擊, +15% 施法速度 20 分鐘",cooldown: "45 min",desc: "精靈巫師的戰鬥和諧。" },
      { name: "MP 強化",         type: "Passivo",  rarity: "1★", effect: "+12% 最大 MP",                    cooldown: "N/A",    desc: "強化魔力儲備。" }
    ]
  },

  // ─── SPELLSINGER (2ª classe — WATER/WIND) ───
  spellsinger: {
    name: '咒術詩人', parent: 'elvenWizard', stage: 2,
    desc: '以水與風魔法為主的咒術詩人。保留先前學會的技能。',
    base: { atk: 7, def: 13, hp: 170, mp: 250, eva: 7, crit: 5, matk: 72, mdef: 42 },
    skills: [
      { name: "水流爆裂",          type: "Ativo",    rarity: "2★", effect: "傷害 水 300% + 擊退",       cooldown: "15s",    desc: "釋放強力水流爆炸。" },
      { name: "暴風雪",             type: "Ativo",    rarity: "3★", effect: "範圍 冰 340% + 緩速 30% 6 秒",      cooldown: "22s",    desc: "召喚暴風雪。" },
      { name: "太陽耀斑",          type: "Ativo",    rarity: "3★", effect: "傷害 火 360% + 致盲 4 秒",        cooldown: "25s",    desc: "釋放太陽能量爆炸。" },
      { name: "元素交響曲",   type: "Ativo",    rarity: "3★", effect: "傷害 多元素 380%",          cooldown: "24s",    desc: "以多重元素奏出交響攻擊。" },
      { name: "奧術之力",         type: "Self-Buff",rarity: "3★", effect: "+40% 魔法攻擊 持續 30 秒",               cooldown: "90s",    desc: "凝聚奧術力量。" },
      { name: "冰凍皮膚",        type: "Self-Buff",rarity: "2★", effect: "攻擊者受到 20% 緩速，持續 15 秒",   cooldown: "45s",    desc: "以冰霜強化皮膚。" },
      { name: "解除",               type: "Ativo",    rarity: "3★", effect: "移除目標 3 個增益效果",           cooldown: "40s",    desc: "解除魔法效果。" },
      { name: "身心轉換",         type: "Ativo",    rarity: "2★", effect: "將 15% HP 轉換為 30% MP",        cooldown: "30s",    desc: "將生命力轉換為魔力。" },
      { name: "咒術詩人和諧",         type: "Self-Buff",rarity: "3★", effect: "+35% 魔法攻擊, +20% 施法速度 25 分鐘",cooldown: "60 min", desc: "咒術詩人的戰鬥和諧。" },
      { name: "元素突擊",    type: "Passivo",  rarity: "2★", effect: "+12% 元素 傷害",            cooldown: "N/A",    desc: "發動元素突擊。" }
    ]
  },

  // ─── MYSTIC MUSE (3ª classe — FOCO WATER) ───
  mysticMuse: {
    name: '神秘繆思', parent: 'spellsinger', stage: 3,
    desc: '精通水系魔法的神秘繆思。保留先前學會的技能。定位：水。',
    base: { atk: 9, def: 18, hp: 280, mp: 440, eva: 8, crit: 7, matk: 130, mdef: 68 },
    skills: [
      { name: "水花爆發",                  type: "Ativo",    rarity: "3★", effect: "水屬性傷害 420% + 範圍濺射",             cooldown: "22s",    desc: "釋放大範圍水流衝擊。" },
      { name: "水之螺旋",                  type: "Ativo",    rarity: "3★", effect: "傷害 水 400% + 穿透 目標",         cooldown: "20s",    desc: "釋放具有穿透力的水流螺旋。" },
      { name: "水流爆炸",                type: "Ativo",    rarity: "4★", effect: "傷害 水 範圍 680% + 凍結 4 秒",         cooldown: "160s",   desc: "引發毀滅性的水元素爆炸。" },
      { name: "水之種子",                 type: "Ativo",    rarity: "2★", effect: "種下種子: 爆炸 300% 水 後 5 秒",cooldown: "20s",   desc: "凝聚水元素種子。" },
      { name: "元素爆發",               type: "Ativo",    rarity: "3★", effect: "引爆種子: 傷害 500%",                cooldown: "18s",    desc: "引爆元素力量，可與種子效果連動。" },
      { name: "元素風暴",               type: "Ativo",    rarity: "3★", effect: "範圍 多元素 440% (8 目標)",        cooldown: "30s",    desc: "召喚元素風暴。" },
      { name: "神秘免疫",               type: "Ativo",    rarity: "4★", effect: "免疫魔法 8 秒",                        cooldown: "180s",   desc: "獲得神秘力量保護。" },
      { name: "強化迴響",               type: "Ativo",    rarity: "3★", effect: "下一個技能: +50% 傷害",                cooldown: "45s",    desc: "以迴響強化自身力量。" },
      { name: "超越水流爆炸",   type: "Ativo",    rarity: "4★", effect: "傷害 水 850% + 凍結 6 秒 + 範圍",       cooldown: "200s",   desc: "施展超越極限的水元素爆炸。" },
      { name: "神秘繆思和諧",           type: "Self-Buff",rarity: "4★", effect: "+55% 魔法攻擊, +35% 施法速度, +20% MP 30 分鐘",cooldown: "90 min",desc: "神秘繆思的戰鬥和諧。" },
      { name: "魔法大師",               type: "Passivo",  rarity: "3★", effect: "+10% 魔法攻擊, +10% 水 傷害, +5% 對怪物",    cooldown: "N/A",    desc: "精通各式魔法。" },
      { name: "法術精通",                  type: "Passivo",  rarity: "3★", effect: "+12% 魔法技能威力",                    cooldown: "N/A",    desc: "精通法術施放。" },
      { name: "魔法專注",                    type: "Passivo",  rarity: "3★", effect: "+8% 魔法暴擊率",                       cooldown: "N/A",    desc: "提高魔法專注力。" },
      { name: "神秘繆思之魂",            type: "Passivo",  rarity: "3★", effect: "+15% 水 magic ATK",                    cooldown: "N/A",    desc: "神秘繆思的戰鬥精神。" },
      { name: "神秘繆思之軀",       type: "Passivo",  rarity: "3★", effect: "+10% 最大 MP, +8% 魔法防禦",                 cooldown: "N/A",    desc: "強化神秘繆思的身軀。" }
    ]
  },

  // ─── ELEMENTAL SUMMONER → ELEMENTAL MASTER ───
  elementalSummoner: {
    name: '元素召喚師', parent: 'elvenWizard', stage: 2,
    desc: '精靈族的元素召喚師。保留先前學會的技能。定位：召喚。',
    base: { atk: 6, def: 14, hp: 185, mp: 245, eva: 6, crit: 4, matk: 60, mdef: 40 },
    skills: [
      { name: "召喚拳鬥獨角獸",   type: "Ativo",    rarity: "2★", effect: "召喚 戰鬥獨角獸 (ATK 50%)",  cooldown: "60s",    desc: "召喚擅長近戰的獨角獸。" },
      { name: "召喚幻影獨角獸",  type: "Ativo",    rarity: "2★", effect: "召喚 魔法獨角獸 (魔法攻擊 50%)",  cooldown: "60s",    desc: "召喚具有幻影能力的獨角獸。" },
      { name: "召喚梅洛獨角獸",  type: "Ativo",    rarity: "3★", effect: "召喚 merrow (ATK 65%, tank)",      cooldown: "90s",    desc: "召喚水元素獨角獸梅洛。" },
      { name: "召喚獸治癒",          type: "Ativo",    rarity: "2★", effect: "治癒召喚物 35% HP",                 cooldown: "12s",    desc: "治療召喚獸。" },
      { name: "召喚獸回復",      type: "Ativo",    rarity: "2★", effect: "恢復 30% MP do 召喚物",          cooldown: "15s",    desc: "恢復召喚獸的魔力。" },
      { name: "痛苦轉移",          type: "Toggle",   rarity: "2★", effect: "50% 傷害 受到的 轉移給 召喚物",   cooldown: "N/A",    desc: "將部分受到的傷害轉移給召喚獸。" },
      { name: "召喚生命晶體",      type: "Ativo",    rarity: "2★", effect: "晶體 會 治癒 5%/5 秒",               cooldown: "45s",    desc: "召喚具有生命恢復能力的晶體。" },
      { name: "元素召喚師和諧",           type: "Self-Buff",rarity: "3★", effect: "+30% 魔法攻擊, +25% 召喚物 ATK 25 分鐘",  cooldown: "60 min", desc: "元素召喚師的戰鬥和諧。" },
      { name: "召喚獸物理攻擊",  type: "Passivo",  rarity: "2★", effect: "+15% 召喚物 ATK",                    cooldown: "N/A",    desc: "提高召喚獸的物理攻擊能力。" }
    ]
  },

  elementalMaster: {
    name: '元素大師', parent: 'elementalSummoner', stage: 3,
    desc: '精靈族的至高元素召喚大師。保留先前學會的技能。',
    base: { atk: 9, def: 20, hp: 300, mp: 420, eva: 7, crit: 5, matk: 115, mdef: 62 },
    skills: [
      { name: "召喚熾天使",                type: "Ativo",    rarity: "3★", effect: "召喚熾天使（治療／輔助效果 60%）",        cooldown: "90s",    desc: "召喚天界熾天使。" },
      { name: "召喚獸屏障",               type: "Ativo",    rarity: "3★", effect: "召喚物 獲得護盾 5000 HP 15 秒",          cooldown: "60s",    desc: "為召喚獸展開防護屏障。" },
      { name: "群體召喚獸治癒",             type: "Ativo",    rarity: "3★", effect: "治癒所有召喚物 40% HP",               cooldown: "25s",    desc: "治療多個召喚獸。" },
      { name: "最終召喚獸",                 type: "Ativo",    rarity: "4★", effect: "召喚物 犧牲: 範圍 600% + 治癒 50%",    cooldown: "180s",   desc: "犧牲召喚獸釋放最後力量。" },
      { name: "超越召喚爆發",      type: "Ativo",    rarity: "4★", effect: "所有 召喚物 攻擊: 800% 完全",        cooldown: "200s",   desc: "引爆多重召喚力量。" },
      { name: "元素大師和諧",       type: "Self-Buff",rarity: "4★", effect: "+50% 魔法攻擊, +60% 召喚物 威力 30 分鐘",     cooldown: "90 min", desc: "風騎士的至高戰鬥和諧。" },
      { name: "獨角獸友誼",           type: "Passivo",  rarity: "3★", effect: "+20% 召喚物 ATK/DEF",                     cooldown: "N/A",    desc: "獨角獸之間的友誼。" },
      { name: "元素專注",        type: "Passivo",  rarity: "3★", effect: "+10% 魔法攻擊, +10% 召喚物 HP",              cooldown: "N/A",    desc: "提高元素專注力。" },
      { name: "元素大師之魂",        type: "Passivo",  rarity: "3★", effect: "+12% 魔法攻擊, +8% 召喚物 速度",            cooldown: "N/A",    desc: "元素大師的戰鬥精神。" },
      { name: "元素大師之軀",   type: "Passivo",  rarity: "3★", effect: "+10% 最大 MP, +8% 最大 HP",                cooldown: "N/A",    desc: "強化元素大師的身軀。" }
    ]
  },

  // ─── ORACLE → ELDER → EVA'S SAINT ───
  elfOracle: {
    name: '神使', parent: 'elfMage', race: 'elf', archetype: 'healer', stage: 1,
    desc: '精靈族的治癒神使。保留先前學會的技能。',
    base: { atk: 6, def: 12, hp: 110, mp: 115, eva: 5, crit: 3, matk: 20, mdef: 25 },
    skills: [
      { name: "治癒",          type: "Ativo",      rarity: "1★", effect: "治癒 25% HP 目標",              cooldown: "8s",     desc: "進行基礎治療。" },
      { name: "戰鬥治癒",   type: "Ativo",      rarity: "1★", effect: "治癒 20% HP + 移除 1 減益", cooldown: "10s",    desc: "在戰鬥中快速治療。" },
      { name: "力量",         type: "Party-Buff", rarity: "1★", effect: "+15% ATK 隊伍 10 分鐘",         cooldown: "25 min", desc: "賦予提升力量的祝福。" },
      { name: "盾牌祝福", type: "Party-Buff", rarity: "1★", effect: "+15% DEF 隊伍 10 分鐘",         cooldown: "25 min", desc: "賦予防護祝福。" },
      { name: "解毒",   type: "Ativo",      rarity: "1★", effect: "移除 中毒",                 cooldown: "5s",     desc: "解除中毒狀態。" },
      { name: "止血",    type: "Ativo",      rarity: "1★", effect: "移除 流血",                  cooldown: "5s",     desc: "解除流血狀態。" },
      { name: "魔力回復",      type: "Ativo",      rarity: "1★", effect: "恢復 20% MP 目標",          cooldown: "12s",    desc: "恢復魔力。" }
    ]
  },

  elfElder: {
    name: '長老', parent: 'elfOracle', stage: 2,
    desc: '精靈族的治療與增益職業長老。保留先前學會的技能。',
    base: { atk: 8, def: 25, hp: 240, mp: 210, eva: 5, crit: 3, matk: 45, mdef: 55 },
    skills: [
      { name: "高級治癒",       type: "Ativo",      rarity: "2★", effect: "治癒 40% HP 目標",                    cooldown: "10s",    desc: "施展更強力的治療。" },
      { name: "高級群體治癒", type: "Ativo",      rarity: "3★", effect: "治癒 30% HP 隊伍",                   cooldown: "18s",    desc: "治療隊伍成員。" },
      { name: "復活",       type: "Ativo",      rarity: "3★", effect: "復活 盟友 30% HP",            cooldown: "120s",   desc: "使倒下的目標復活。" },
      { name: "淨化",             type: "Ativo",      rarity: "2★", effect: "移除 3 de增益",                    cooldown: "20s",    desc: "淨化負面狀態。" },
      { name: "潔淨",            type: "Ativo",      rarity: "3★", effect: "移除所有減益效果",                cooldown: "45s",    desc: "徹底清除異常狀態。" },
      { name: "魔力強化",            type: "Self-Buff",  rarity: "2★", effect: "+25% 魔法攻擊 持續 20 分鐘",               cooldown: "50 min", desc: "提高魔法力量。" },
      { name: "靈活思緒",             type: "Self-Buff",  rarity: "2★", effect: "+25% 施法速度 持續 20 分鐘",          cooldown: "50 min", desc: "提高施法效率。" },
      { name: "加速",              type: "Self-Buff",  rarity: "2★", effect: "+30% 攻擊速度 持續 20 分鐘",           cooldown: "50 min", desc: "提高行動與攻擊速度。" },
      { name: "清澈思緒",            type: "Self-Buff",  rarity: "2★", effect: "+20% MP 恢復 持續 20 分鐘",            cooldown: "50 min", desc: "提高魔法運用效率。" },
      { name: "水之預言",  type: "Party-Buff", rarity: "3★", effect: "+30% 魔法攻擊, +20% 魔法防禦 隊伍 12 分鐘",  cooldown: "30 min", desc: "施放水之預言。" },
      { name: "精神之盾",      type: "Party-Buff", rarity: "2★", effect: "+20% 魔法防禦 隊伍 12 分鐘",            cooldown: "30 min", desc: "提高精神異常抗性。" },
      { name: "長老和諧",    type: "Self-Buff",  rarity: "3★", effect: "+35% 治癒, +25% 魔法攻擊 25 分鐘",        cooldown: "60 min", desc: "長老的戰鬥和諧。" },
      { name: "水屬性抗性",        type: "Passivo",    rarity: "1★", effect: "+10% 水抗性",                   cooldown: "N/A",    desc: "提高水屬性抗性。" }
    ]
  },

  evaSaint: {
    name: "伊娃聖者", parent: 'elfElder', stage: 3,
    desc: '伊娃的至高聖者，精靈族最高階治癒職業。保留先前學會的技能。',
    base: { atk: 10, def: 40, hp: 400, mp: 470, eva: 6, crit: 4, matk: 90, mdef: 95 },
    skills: [
      { name: "崇高自我犧牲",        type: "Ativo",      rarity: "4★", effect: "死亡時使隊伍恢復 100% HP／MP",    cooldown: "300s",   desc: "進行自我犧牲。" },
      { name: "生命平衡",                  type: "Ativo",      rarity: "3★", effect: "平均 HP的所有 隊伍",             cooldown: "60s",    desc: "重新平衡生命值。" },
      { name: "群體復活",             type: "Ativo",      rarity: "4★", effect: "復活 所有 隊伍 40% HP",         cooldown: "300s",   desc: "使多名倒下的盟友復活。" },
      { name: "奇蹟",                       type: "Ativo",      rarity: "4★", effect: "治癒隊伍 80% HP + 復活死亡成員",  cooldown: "300s",   desc: "施展奇蹟之力。" },
      { name: "伊娃祝福",               type: "Party-Buff", rarity: "3★", effect: "+25% 魔法防禦 + 抗性 減益 12 分鐘",     cooldown: "30 min", desc: "獲得伊娃的祝福。" },
      { name: "黑暗面",                     type: "Toggle",     rarity: "3★", effect: "切換： -60% 治癒, +80% 魔法攻擊 神聖",    cooldown: "N/A",    desc: "切換黑暗面姿態。" },
      { name: "水之打擊",                   type: "Ativo",      rarity: "3★", effect: "傷害 水 380% + 緩速 40% 6 秒",        cooldown: "22s",    desc: "施展水屬性攻擊。" },
      { name: "神聖新星",                   type: "Ativo",      rarity: "3★", effect: "傷害 神聖 範圍 450% + 致盲 5 秒",        cooldown: "25s",    desc: "釋放神聖新星。" },
      { name: "伊娃聖者和諧",           type: "Self-Buff",  rarity: "4★", effect: "+55% 治癒, +40% 魔法攻擊, +30% 魔法防禦 30 分鐘",cooldown: "90 min",desc: "風騎士的至高戰鬥和諧。" },
      { name: "治癒大師",             type: "Passivo",    rarity: "3★", effect: "+15% 治癒威力, +5% 對怪物",            cooldown: "N/A",    desc: "精通各式治療術。" },
      { name: "伊娃聖者之魂",            type: "Passivo",    rarity: "3★", effect: "神聖屬性魔法攻擊 +12%",                  cooldown: "N/A",    desc: "伊娃聖者的神聖精神。" },
      { name: "伊娃聖者之軀",           type: "Passivo",    rarity: "3★", effect: "+12% 最大 MP, +10% 魔法防禦",             cooldown: "N/A",    desc: "強化伊娃聖者的身軀。" },
      { name: "伊娃援助",                    type: "Passivo",    rarity: "3★", effect: "10% 機率對ser 受到攻擊: 治癒 5% HP",cooldown: "N/A",    desc: "觸發伊娃的援助效果。" }
    ]
  },


  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  //  DARK ELF FIGHTER
  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
darkElfFighter: {
name: '黑暗精靈戰士', race: 'darkelf', archetype: 'fighter', stage: 0,
desc: '天生擅長暴擊傷害的黑暗精靈戰士。',
base: { atk: 11, def: 6, hp: 85, mp: 32, eva: 8, crit: 8, mdef: 5 },
skills: [
{ name: "強力打擊", type: "Ativo", rarity: "1★", effect: "物理傷害 150%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
{ name: "致命一擊", type: "Ativo", rarity: "1★", effect: "傷害 130% + 20% 暴擊 加成", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
{ name: "強力射擊", type: "Ativo", rarity: "1★", effect: "遠距傷害 140%", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
{ name: "包紮", type: "Ativo", rarity: "1★", effect: "恢復 15% HP", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
{ name: "HP 提升", type: "Passivo", rarity: "1★", effect: "+10% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
{ name: "輕甲精通", type: "Passivo", rarity: "1★", effect: "+8% DEF 裝備輕甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
{ name: "黑暗之魂", type: "Self-Buff", rarity: "1★", effect: "+10% ATK 並 +8% 暴擊 持續 15 分鐘", cooldown: "30 min", duration: "15 min", note: "轉職後技能仍會保留" }
]
},

// ─── PALUS KNIGHT (1ª classe) ───
palusKnight: {
name: '帕魯斯騎士', parent: 'darkElfFighter', race: 'darkelf', archetype: 'tank', stage: 1,
desc: '使用盾牌並操控黑暗力量的騎士。',
base: { atk: 18, def: 26, hp: 210, mp: 52, eva: 10, crit: 6, mdef: 14 },
skills: [
{ name: "盾牌打擊", type: "Ativo", rarity: "1★", effect: "傷害 160% + 嘲諷 8 秒", cooldown: "12s", duration: "8s", note: "轉職後技能仍會保留" },
{ name: "仇恨", type: "Ativo", rarity: "1★", effect: "嘲諷 目標 + 最高仇恨", cooldown: "10s", duration: "10s", note: "轉職後技能仍會保留" },
{ name: "力量削弱", type: "Ativo", rarity: "1★", effect: "傷害 140% + 降低 ATK 15%", cooldown: "14s", duration: "8s", note: "轉職後技能仍會保留" },
{ name: "盾牌精通", type: "Passivo", rarity: "1★", effect: "裝備盾牌時 DEF +15%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
{ name: "重甲精通", type: "Passivo", rarity: "1★", effect: "+15% DEF 裝備重甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
{ name: "劍／鈍器精通", type: "Passivo", rarity: "1★", effect: "+12% ATK 使用劍／鈍器時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
{ name: "箭矢偏轉", type: "Passivo", rarity: "1★", effect: "+15% 機率 閃避投射物", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
]
},

// ─── SHILLIEN KNIGHT (2ª classe) ───
shillienKnight: {
name: '席琳騎士', parent: 'palusKnight', race: 'darkelf', archetype: 'tank', stage: 2,
desc: '侍奉席琳、擅長吸取與恐懼能力的騎士。',
base: { atk: 38, def: 58, hp: 430, mp: 82, eva: 12, crit: 8, mdef: 36 },
skills: [
{ name: "盾牌暈擊", type: "Ativo", rarity: "2★", effect: "傷害 200% + 暈眩 3 秒", cooldown: "20s", duration: "3s stun", note: "轉職後技能仍會保留" },
{ name: "審判", type: "Ativo", rarity: "3★", effect: "傷害 黑暗 300% + 降低 治癒 50%", cooldown: "28s", duration: "8s", note: "轉職後技能仍會保留" },
{ name: "黑暗火焰", type: "Ativo", rarity: "2★", effect: "傷害 範圍 黑暗 260%", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
{ name: "生命吸取", type: "Ativo", rarity: "2★", effect: "傷害 220% + 吸取 30% HP", cooldown: "16s", duration: null, note: "轉職後技能仍會保留" },
{ name: "恐懼", type: "Ativo", rarity: "2★", effect: "恐懼 目標 4 秒", cooldown: "30s", duration: "4s", note: "轉職後技能仍會保留" },
{ name: "雷電打擊", type: "Ativo", rarity: "2★", effect: "傷害 雷電 240% + 暈眩 1 秒", cooldown: "16s", duration: "1s stun", note: "轉職後技能仍會保留" },
{ name: "死亡之觸", type: "Ativo", rarity: "2★", effect: "傷害 黑暗 240% + 中毒", cooldown: "18s", duration: "6s poison", note: "轉職後技能仍會保留" },
{ name: "犧牲", type: "Ativo", rarity: "2★", effect: "將自身 30% HP 轉移給盟友", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
{ name: "神盾", type: "Ativo", rarity: "2★", effect: "+50% 格擋率 持續 15 秒", cooldown: "45s", duration: "15s", note: "轉職後技能仍會保留" },
{ name: "終極防禦", type: "Ativo", rarity: "3★", effect: "+80% DEF, 無法移動, 10 秒", cooldown: "120s", duration: "10s", note: "轉職後技能仍會保留" },
{ name: "挑釁", type: "Ativo", rarity: "1★", effect: "嘲諷 10 秒", cooldown: "15s", duration: "10s", note: "轉職後技能仍會保留" },
{ name: "召喚黑暗晶體", type: "Ativo", rarity: "2★", effect: "黑暗晶體每 6 秒造成 130% 傷害", cooldown: "45s", duration: "120s", note: "轉職後技能仍會保留" },
{ name: "HP 強化", type: "Passivo", rarity: "1★", effect: "+15% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
{ name: "席琳騎士和諧", type: "Self-Buff", rarity: "3★", effect: "+35% DEF, +25% ATK, +20% 黑暗 傷害 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
]
},

// ─── SHILLIEN TEMPLAR (3ª classe) ───
shillienTemplar: {
name: '席琳聖殿騎士', parent: 'shillienKnight', race: 'darkelf', archetype: 'tank', stage: 3,
desc: '席琳的黑暗聖殿騎士，擅長強力範圍攻擊。',
base: { atk: 70, def: 92, hp: 720, mp: 120, eva: 16, crit: 10, mdef: 60 },
skills: [
{ name: "席琳之觸", type: "Ativo", rarity: "3★", effect: "傷害 黑暗 350% + 吸取 35% HP", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
{ name: "席琳之盾", type: "Ativo", rarity: "3★", effect: "吸收 5000 傷害 + 反射 20% 黑暗 持續 15 秒", cooldown: "60s", duration: "15s", note: "轉職後技能仍會保留" },
{ name: "天界之盾", type: "Ativo", rarity: "4★", effect: "完全免疫 7 秒 + 嘲諷 範圍", cooldown: "180s", duration: "7s", note: "轉職後技能仍會保留" },
{ name: "深淵打擊", type: "Ativo", rarity: "3★", effect: "傷害 黑暗 範圍 400% + 緩速 40%", cooldown: "25s", duration: "5s slow", note: "轉職後技能仍會保留" },
{ name: "席琳詛咒", type: "Ativo", rarity: "3★", effect: "傷害 黑暗 範圍 360% + 降低 DEF 20%", cooldown: "28s", duration: "8s", note: "轉職後技能仍會保留" },
{ name: "召喚守護亞加西翁", type: "Ativo", rarity: "3★", effect: "守護亞加西翁 (+15% DEF 隊伍)", cooldown: "90s", duration: "120s", note: "轉職後技能仍會保留" },
{ name: "超越深淵打擊", type: "Ativo", rarity: "4★", effect: "傷害 黑暗 範圍 600% + 恐懼 3 秒 + 吸取 30%", cooldown: "160s", duration: "3s fear", note: "轉職後技能仍會保留" },
{ name: "席琳援助", type: "Passivo", rarity: "3★", effect: "格擋時: 20% 機率 反擊 黑暗 200%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
{ name: "席琳聖殿騎士之魂", type: "Passivo", rarity: "3★", effect: "+25% DEF, +20% 最大 HP, +15% 黑暗 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
{ name: "席琳聖殿騎士之軀", type: "Passivo", rarity: "3★", effect: "+20% 黑暗 抗性, +15% HP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
{ name: "席琳守護", type: "Passivo", rarity: "3★", effect: "+15% 全 抗性", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
{ name: "戰鬥大師", type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
{ name: "席琳聖殿騎士和諧", type: "Self-Buff", rarity: "4★", effect: "+55% DEF, +40% 最大 HP, +30% 黑暗 傷害 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
]
},

  // ─── BLADE DANCER (2ª classe) ───
  bladeDancer: {
    name: '劍舞者', parent: 'palusKnight', race: 'darkelf', archetype: 'bard', stage: 2,
    desc: '以舞蹈強化盟友的劍舞者。',
    base: { atk: 42, def: 38, hp: 340, mp: 115, eva: 14, crit: 10, mdef: 28 },
    skills: [
      { name: "火焰之舞",          type: "Party-Buff", rarity: "2★", effect: "隊伍 ATK +20%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "狂怒之舞",          type: "Party-Buff", rarity: "2★", effect: "隊伍攻擊速度 +20%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "專注之舞", type: "Party-Buff", rarity: "2★", effect: "隊伍施法速度 +20%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "光明之舞",         type: "Party-Buff", rarity: "2★", effect: "隊伍暴擊率 +15%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "神秘之舞",        type: "Party-Buff", rarity: "2★", effect: "隊伍魔法攻擊 +20%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "戰士之舞",       type: "Party-Buff", rarity: "2★", effect: "隊伍 P.ATK 與 DEF +15%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "水之守護舞",    type: "Party-Buff", rarity: "2★", effect: "隊伍水屬性抗性 +20%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "靈感之舞",   type: "Party-Buff", rarity: "3★", effect: "隊伍全屬性 +15%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "吸血鬼之舞",       type: "Party-Buff", rarity: "3★", effect: "隊伍將造成傷害的 8% 轉化為 HP", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "守護之舞",    type: "Party-Buff", rarity: "2★", effect: "隊伍 DEF +15%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "暗影之舞",        type: "Party-Buff", rarity: "3★", effect: "隊伍迴避 +15%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "海妖之舞",         type: "Party-Buff", rarity: "3★", effect: "隊伍 MP 恢復 +20%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "雙武器精通",    type: "Passivo",    rarity: "1★", effect: "裝備雙劍時 ATK +15%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "重甲精通",    type: "Passivo",    rarity: "1★", effect: "+15% DEF 裝備重甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "HP 強化",               type: "Passivo",    rarity: "1★", effect: "+15% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "劍舞者和諧", type: "Self-Buff",  rarity: "3★", effect: "+30% ATK, +20% 攻擊速度, +15% 迴避 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── SPECTRAL DANCER (3ª classe) ───
  spectralDancer: {
    name: '幽靈舞者', parent: 'bladeDancer', race: 'darkelf', archetype: 'bard', stage: 3,
    desc: '施展至高舞蹈與毀滅攻擊的幽靈舞者。',
    base: { atk: 78, def: 55, hp: 520, mp: 180, eva: 22, crit: 16, mdef: 42 },
    skills: [
      { name: "狂戰士之舞",          type: "Party-Buff", rarity: "3★", effect: "隊伍 ATK +25%、攻擊速度 +20%、DEF -10%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "劍刃風暴之舞",        type: "Party-Buff", rarity: "3★", effect: "隊伍暴擊威力 +20%", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "群體之舞",                  type: "Ativo",      rarity: "3★", effect: "啟用 所有 舞蹈效果 啟用s 持續 60 秒", cooldown: "120s", duration: "60s", note: "轉職後技能仍會保留" },
      { name: "終焉之舞",                 type: "Ativo",      rarity: "4★", effect: "所有 舞蹈效果於最大威力 持續 30 秒 + 免疫 減益", cooldown: "300s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "暗影斬",                type: "Ativo",      rarity: "3★", effect: "傷害 黑暗 380% + 流血 6 秒", cooldown: "18s", duration: "6s bleed", note: "轉職後技能仍會保留" },
      { name: "黑暗舞擊",           type: "Ativo",      rarity: "3★", effect: "傷害 範圍 黑暗 420% + 緩速 40% 5 秒", cooldown: "25s", duration: "5s slow", note: "轉職後技能仍會保留" },
      { name: "超越之舞",          type: "Ativo",      rarity: "4★", effect: "傷害 範圍 黑暗 580% + 沉默 4 秒", cooldown: "160s", duration: "4s silence", note: "轉職後技能仍會保留" },
      { name: "幽靈舞者之魂",      type: "Passivo",    rarity: "3★", effect: "+20% ATK, +15% 迴避, +15% 黑暗 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈舞者之軀",     type: "Passivo",    rarity: "3★", effect: "+15% 暴擊率, +10% HP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",            type: "Passivo",    rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈舞者和諧",     type: "Self-Buff",  rarity: "4★", effect: "+50% ATK, +35% 攻擊速度, +30% 迴避 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── ASSASSIN DE (1ª classe — Dark Elf) ───
  assassinDE: {
    name: '刺客', parent: 'darkElfFighter', race: 'darkelf', archetype: 'dagger', stage: 1,
    desc: '精通伏擊與毒術的暗影刺客。',
    base: { atk: 24, def: 10, hp: 140, mp: 42, eva: 18, crit: 14, mdef: 6 },
    skills: [
      { name: "雙重打擊",           type: "Ativo",   rarity: "1★", effect: "雙重傷害 170%（2 次命中）", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "背刺",              type: "Ativo",   rarity: "1★", effect: "傷害 200% 從背後 + 必定暴擊", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "疾走",                  type: "Ativo",   rarity: "1★", effect: "+60% 移動速度 持續 6 秒", cooldown: "20s", duration: "6s", note: "轉職後技能仍會保留" },
      { name: "輕甲精通",   type: "Passivo", rarity: "1★", effect: "+10% 迴避 裝備輕甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "匕首精通",        type: "Passivo", rarity: "1★", effect: "裝備匕首時 ATK +12%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "暴擊機率",       type: "Passivo", rarity: "1★", effect: "+10% 暴擊率", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── ABYSS WALKER (2ª classe) ───
  abyssWalker: {
    name: '深淵行者', parent: 'assassinDE', race: 'darkelf', archetype: 'dagger', stage: 2,
    desc: '在暗影中施展致命打擊的深淵行者。',
    base: { atk: 52, def: 18, hp: 260, mp: 68, eva: 32, crit: 26, mdef: 14 },
    skills: [
      { name: "致命打擊",      type: "Ativo",   rarity: "2★", effect: "傷害 280% + 必定暴擊 從背後", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "致死打擊",      type: "Ativo",   rarity: "3★", effect: "傷害 350% + 10% 即死機率 立即 (對怪物)", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "沙塵炸彈",        type: "Ativo",   rarity: "2★", effect: "致盲 範圍 5 秒", cooldown: "25s", duration: "5s", note: "轉職後技能仍會保留" },
      { name: "致盲打擊",    type: "Ativo",   rarity: "2★", effect: "傷害 240% + 致盲 4 秒", cooldown: "18s", duration: "4s", note: "轉職後技能仍會保留" },
      { name: "位置交換",           type: "Ativo",   rarity: "2★", effect: "傳送到目標背後", cooldown: "20s", duration: null, note: "轉職後技能仍會保留" },
      { name: "暗影步伐",      type: "Ativo",   rarity: "2★", effect: "傳送至目標 + 傷害 180%", cooldown: "15s", duration: null, note: "轉職後技能仍會保留" },
      { name: "詭計",            type: "Ativo",   rarity: "2★", effect: "移除 目標的mob + 降低 仇恨", cooldown: "20s", duration: null, note: "轉職後技能仍會保留" },
      { name: "無聲移動",      type: "Toggle",  rarity: "2★", effect: "隱形 (移動緩慢), 取消對atacar", cooldown: "5s", duration: "Toggle", note: "轉職後技能仍會保留" },
      { name: "迴避",          type: "Passivo", rarity: "1★", effect: "+12% 迴避", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "暴擊威力",   type: "Passivo", rarity: "2★", effect: "+20% 暴擊威力", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "專注",            type: "Passivo", rarity: "1★", effect: "+10% 暴擊率", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "深淵行者和諧", type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +25% 暴擊, +20% 迴避 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── GHOST HUNTER (3ª classe) ───
  ghostHunter: {
    name: '幽靈獵人', parent: 'abyssWalker', race: 'darkelf', archetype: 'dagger', stage: 3,
    desc: '暗影中的至高刺客幽靈獵人。',
    base: { atk: 98, def: 28, hp: 420, mp: 105, eva: 52, crit: 42, mdef: 22 },
    skills: [
      { name: "刺激冒險",       type: "Ativo",    rarity: "3★", effect: "傷害 380% + reset cooldown的Deadly Blow", cooldown: "28s", duration: null, note: "轉職後技能仍會保留" },
      { name: "御風",              type: "Ativo",    rarity: "3★", effect: "+80% 移動速度 + 隱形 8 秒", cooldown: "60s", duration: "8s", note: "轉職後技能仍會保留" },
      { name: "幸運打擊",             type: "Ativo",    rarity: "3★", effect: "傷害 420% + 20% 機率 drop extra", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
      { name: "超越致命打擊",  type: "Ativo",    rarity: "4★", effect: "傷害 620% + 無視 DEF + 流血 8 秒", cooldown: "160s", duration: "8s bleed", note: "轉職後技能仍會保留" },
      { name: "暗影感知",             type: "Passivo",  rarity: "3★", effect: "+25% 暴擊率 夜間 ou於地城", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "最終狂熱",             type: "Passivo",  rarity: "3★", effect: "+30% ATK 當 HP < 30%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈獵人之魂",      type: "Passivo",  rarity: "3★", effect: "+20% ATK, +20% 暴擊威力, +15% 迴避", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈獵人之軀",     type: "Passivo",  rarity: "3★", effect: "+15% 最大 HP, +10% HP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",         type: "Passivo",  rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈獵人和諧",     type: "Self-Buff", rarity: "4★", effect: "+55% ATK, +45% 暴擊, +35% 迴避 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── PHANTOM RANGER (2ª classe — Archer) ───
  phantomRanger: {
    name: '幽靈遊俠', parent: 'assassinDE', race: 'darkelf', archetype: 'archer', stage: 2,
    desc: '使用精準毒箭的幽靈遊俠。',
    base: { atk: 58, def: 15, hp: 230, mp: 62, eva: 22, crit: 22, mdef: 10 },
    skills: [
      { name: "雙重射擊",      type: "Ativo",   rarity: "2★", effect: "傷害 220% (2 次命中)", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "爆裂射擊",       type: "Ativo",   rarity: "2★", effect: "傷害 260% + 擊退", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "暈眩射擊",        type: "Ativo",   rarity: "2★", effect: "傷害 200% + 暈眩 2 秒", cooldown: "18s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "快速射擊",       type: "Ativo",   rarity: "2★", effect: "+50% 攻擊速度 持續 15 秒", cooldown: "45s", duration: "15s", note: "轉職後技能仍會保留" },
      { name: "箭雨",       type: "Ativo",   rarity: "3★", effect: "傷害 範圍 300%", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "詛咒射擊",         type: "Ativo",   rarity: "2★", effect: "傷害 220% + curse (降低 DEF 20%)", cooldown: "16s", duration: "8s", note: "轉職後技能仍會保留" },
      { name: "弓精通",      type: "Passivo", rarity: "1★", effect: "+15% ATK 使用弓時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "遠距射擊",        type: "Passivo", rarity: "2★", effect: "+30% 射程", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "專注",            type: "Passivo", rarity: "1★", effect: "+10% 暴擊率", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "暴擊威力",   type: "Passivo", rarity: "2★", effect: "+20% 暴擊威力", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "迴避",          type: "Passivo", rarity: "1★", effect: "+12% 迴避", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈遊俠和諧", type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +25% 暴擊, +20% 射程 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── GHOST SENTINEL (3ª classe) ───
  ghostSentinel: {
    name: '幽靈守衛', parent: 'phantomRanger', race: 'darkelf', archetype: 'archer', stage: 3,
    desc: '使用元素箭矢的菁英射手幽靈守衛。',
    base: { atk: 108, def: 22, hp: 380, mp: 95, eva: 38, crit: 45, mdef: 18 },
    skills: [
      { name: "七連矢",                   type: "Ativo",   rarity: "3★", effect: "傷害 420% (7 次命中)", cooldown: "28s", duration: null, note: "轉職後技能仍會保留" },
      { name: "死亡之眼",                      type: "Self-Buff", rarity: "3★", effect: "+50% ATK, +40% 射程 持續 18 分鐘", cooldown: "55 min", duration: "18 min", note: "轉職後技能仍會保留" },
      { name: "精準射擊",                 type: "Ativo",   rarity: "3★", effect: "傷害 380% + 無視 DEF", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "三重射擊",                   type: "Ativo",   rarity: "3★", effect: "傷害 340% (3 次命中 快速)", cooldown: "15s", duration: null, note: "轉職後技能仍會保留" },
      { name: "荊棘射擊",                    type: "Ativo",   rarity: "2★", effect: "傷害 260% + 流血 6 秒", cooldown: "12s", duration: "6s bleed", note: "轉職後技能仍會保留" },
      { name: "束縛射擊",                  type: "Ativo",   rarity: "2★", effect: "傷害 220% + 定身 4 秒", cooldown: "18s", duration: "4s root", note: "轉職後技能仍會保留" },
      { name: "風之射擊",                     type: "Ativo",   rarity: "2★", effect: "傷害 風 280% + 擊退", cooldown: "15s", duration: null, note: "轉職後技能仍會保留" },
      { name: "螺旋射擊",                   type: "Ativo",   rarity: "3★", effect: "傷害 400% + 穿透 多個 目標", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "目標鎖定",                   type: "Ativo",   rarity: "3★", effect: "標記目標: +30% 傷害 對該目標 持續 10 秒", cooldown: "35s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "超越七連矢",      type: "Ativo",   rarity: "4★", effect: "傷害 650% (7 次命中) + 元素 範圍", cooldown: "160s", duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈守衛之魂",         type: "Passivo", rarity: "3★", effect: "+20% ATK, +20% 暴擊威力, +15% 射程", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈守衛之軀",        type: "Passivo", rarity: "3★", effect: "+15% 最大 HP, +10% 迴避", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",              type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈守衛和諧",        type: "Self-Buff", rarity: "4★", effect: "+55% ATK, +45% 暴擊, +35% 射程 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  //  DARK ELF MAGE
  // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  darkElfMage: {
    name: '黑暗精靈法師', race: 'darkelf', archetype: 'mage', stage: 0,
    desc: '擁有強大黑暗魔法的黑暗精靈法師。',
    base: { atk: 5, def: 5, hp: 65, mp: 95, matk: 14, mdef: 8, eva: 4, crit: 4 },
    skills: [
      { name: "風之打擊",    type: "Ativo",   rarity: "1★", effect: "傷害 風 魔法 150%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "自我治癒",      type: "Ativo",   rarity: "1★", effect: "恢復 20% HP", cooldown: "15s", duration: null, note: "轉職後技能仍會保留" },
      { name: "冰箭",       type: "Ativo",   rarity: "1★", effect: "傷害 冰 140% + 緩速 15% 3 秒", cooldown: "10s", duration: "3s", note: "轉職後技能仍會保留" },
      { name: "睡眠",          type: "Ativo",   rarity: "1★", effect: "使其睡眠 目標 8 秒 (取消對tomar 傷害)", cooldown: "25s", duration: "8s", note: "轉職後技能仍會保留" },
      { name: "法袍精通",   type: "Passivo", rarity: "1★", effect: "裝備法袍時魔法攻擊 +10%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "MP 提升",    type: "Passivo", rarity: "1★", effect: "+10% 最大 MP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "黑暗法師意志", type: "Self-Buff", rarity: "1★", effect: "+10% 魔法攻擊 並 +8% 施法速度 持續 15 分鐘", cooldown: "30 min", duration: "15 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── DARK WIZARD (1ª classe) ───
  darkWizard: {
    name: '黑暗巫師', parent: 'darkElfMage', race: 'darkelf', archetype: 'mage', stage: 1,
    desc: '擅長元素魔法與生命吸取的黑暗巫師。',
    base: { atk: 6, def: 8, hp: 95, mp: 145, matk: 28, mdef: 16, eva: 5, crit: 4 },
    skills: [
      { name: "龍捲",          type: "Ativo",   rarity: "1★", effect: "傷害 風 190%", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "火焰打擊",     type: "Ativo",   rarity: "2★", effect: "傷害 火 240%", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "生命吸取",       type: "Ativo",   rarity: "2★", effect: "傷害 黑暗 200% + 吸取 25%為 HP", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "MP 強化",       type: "Passivo", rarity: "1★", effect: "+15% 最大 MP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "黑暗巫師和諧", type: "Self-Buff", rarity: "2★", effect: "+20% 魔法攻擊, +15% 施法速度 持續 20 分鐘", cooldown: "50 min", duration: "20 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── SPELLHOWLER (2ª classe) ───
  spellhowler: {
    name: '狂咒術士', parent: 'darkWizard', race: 'darkelf', archetype: 'mage', stage: 2,
    desc: '以風元素造成毀滅傷害的黑暗法師。',
    base: { atk: 8, def: 14, hp: 160, mp: 260, matk: 68, mdef: 38, eva: 8, crit: 6 },
    skills: [
      { name: "元素風暴",          type: "Ativo",   rarity: "3★", effect: "傷害 風 範圍 320%", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "颶風",        type: "Ativo",   rarity: "2★", effect: "傷害 風 280%", cooldown: "18s", duration: null, note: "轉職後技能仍會保留" },
      { name: "奧術之力",     type: "Self-Buff", rarity: "3★", effect: "+30% 魔法攻擊, -15% Cast Time 持續 60 秒", cooldown: "120s", duration: "60s", note: "轉職後技能仍會保留" },
      { name: "解除",           type: "Ativo",   rarity: "3★", effect: "移除目標 3 個增益效果", cooldown: "45s", duration: null, note: "轉職後技能仍會保留" },
      { name: "身心轉換",     type: "Ativo",   rarity: "2★", effect: "轉換 20% HP於MP", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
      { name: "元素突擊",type: "Passivo", rarity: "2★", effect: "+15% 元素 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "狂咒術士和諧", type: "Self-Buff", rarity: "3★", effect: "+35% 魔法攻擊, +25% 施法速度, +15% 風 傷害 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── STORM SCREAMER (3ª classe) ───
  stormScreamer: {
    name: '暴風狂嘯者', parent: 'spellhowler', race: 'darkelf', archetype: 'mage', stage: 3,
    desc: '以風與雷霆造成毀滅傷害的暴風狂嘯者。',
    base: { atk: 12, def: 22, hp: 280, mp: 420, matk: 122, mdef: 62, eva: 12, crit: 8 },
    skills: [
      { name: "惡魔之風",                  type: "Ativo",   rarity: "3★", effect: "傷害 風 400% + 擊退", cooldown: "28s", duration: null, note: "轉職後技能仍會保留" },
      { name: "元素爆發",              type: "Ativo",   rarity: "3★", effect: "傷害 元素 380% + 爆炸 seed", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "元素風暴",              type: "Ativo",   rarity: "4★", effect: "傷害 範圍 480% + 全元素", cooldown: "45s", duration: null, note: "轉職後技能仍會保留" },
      { name: "風之種子",                 type: "Ativo",   rarity: "3★", effect: "標記目標: +25% 風 傷害 受到的 10 秒", cooldown: "20s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "風之螺旋",                  type: "Ativo",   rarity: "3★", effect: "傷害 風 360% + 穿透 目標於linha", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "雷霆爆炸",            type: "Ativo",   rarity: "4★", effect: "傷害 雷電 範圍 520% (2 次命中) + 暈眩 2 秒", cooldown: "35s", duration: "2s stun", note: "轉職後技能仍會保留" },
      { name: "神秘免疫",              type: "Ativo",   rarity: "4★", effect: "免疫魔法 8 秒", cooldown: "180s", duration: "8s", note: "轉職後技能仍會保留" },
      { name: "強化迴響",              type: "Ativo",   rarity: "3★", effect: "+40% 魔法攻擊 持續 20 秒 後 kill", cooldown: "60s", duration: "20s", note: "轉職後技能仍會保留" },
      { name: "超越雷霆爆炸", type: "Ativo", rarity: "4★", effect: "傷害 雷電 範圍 720% (3 次命中) + 麻痺 3 秒", cooldown: "180s", duration: "3s paralysis", note: "轉職後技能仍會保留" },
      { name: "法術精通",                type: "Passivo", rarity: "3★", effect: "+15% 魔法攻擊, +10% 魔法暴擊率", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "魔法專注",                  type: "Passivo", rarity: "3★", effect: "+5% M.技能威力, +10% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "精通（稀有）",               type: "Passivo", rarity: "4★", effect: "+10% M.技能威力, +15% 對怪物 傷害, +15% 最大 MP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "暴風狂嘯者之魂",        type: "Passivo", rarity: "3★", effect: "+20% 魔法攻擊, +15% 風 傷害, +10% 施法速度", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "暴風狂嘯者之軀",       type: "Passivo", rarity: "3★", effect: "+15% 最大 MP, +10% MP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "暴風狂嘯者和諧",       type: "Self-Buff", rarity: "4★", effect: "+55% 魔法攻擊, +40% 施法速度, +30% 風 傷害 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── PHANTOM SUMMONER (2ª classe) ───
  phantomSummoner: {
    name: '幽靈召喚師', parent: 'darkWizard', race: 'darkelf', archetype: 'summoner', stage: 2,
    desc: '召喚黑暗生物作戰的幽靈召喚師。',
    base: { atk: 8, def: 16, hp: 180, mp: 240, matk: 58, mdef: 35, eva: 6, crit: 4 },
    skills: [
      { name: "召喚夢魘",       type: "Ativo",   rarity: "2★", effect: "召喚 夢魘 (ATK 高, 坦克 中)", cooldown: "45s", duration: "Permanente", note: "轉職後技能仍會保留" },
      { name: "召喚怨靈",          type: "Ativo",   rarity: "2★", effect: "召喚 怨靈 (ATK 中, 吸取 HP)", cooldown: "45s", duration: "Permanente", note: "轉職後技能仍會保留" },
      { name: "召喚幽靈領主",   type: "Ativo",   rarity: "3★", effect: "召喚 幽靈領主 (範圍 + 坦克)", cooldown: "60s", duration: "Permanente", note: "轉職後技能仍會保留" },
      { name: "召喚獸治癒",          type: "Ativo",   rarity: "1★", effect: "治癒召喚物 30% HP", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "召喚獸回復",      type: "Ativo",   rarity: "1★", effect: "恢復 MP do 召喚物", cooldown: "15s", duration: null, note: "轉職後技能仍會保留" },
      { name: "痛苦轉移",          type: "Toggle",  rarity: "2★", effect: "受到傷害的 50% 轉移給召喚物", cooldown: "5s", duration: "Toggle", note: "轉職後技能仍會保留" },
      { name: "召喚束縛晶體",   type: "Ativo",   rarity: "2★", effect: "晶體每 10 秒施加 3 秒定身", cooldown: "45s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "召喚幻影晶體",   type: "Ativo",   rarity: "2★", effect: "黑暗晶體每 8 秒造成 150% 傷害", cooldown: "45s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "召喚獸物理攻擊", type: "Passivo", rarity: "2★", effect: "+20% ATK dos 召喚物", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈召喚師和諧", type: "Self-Buff", rarity: "3★", effect: "+35% 召喚物 威力, +20% 魔法攻擊 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── SPECTRAL MASTER (3ª classe) ───
  spectralMaster: {
    name: '幽靈大師', parent: 'phantomSummoner', race: 'darkelf', archetype: 'summoner', stage: 3,
    desc: '操控至高黑暗召喚獸的幽靈大師。',
    base: { atk: 12, def: 24, hp: 300, mp: 380, matk: 105, mdef: 58, eva: 10, crit: 6 },
    skills: [
      { name: "召喚強化幽靈領主", type: "Ativo", rarity: "3★", effect: "幽靈領主 強化 (+50% ATK/HP)", cooldown: "90s", duration: "Permanente", note: "轉職後技能仍會保留" },
      { name: "召喚獸屏障",            type: "Ativo",    rarity: "3★", effect: "護盾在召喚物: 吸收 3000 傷害", cooldown: "45s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "群體召喚獸治癒",          type: "Ativo",    rarity: "3★", effect: "治癒 所有 召喚物 40%", cooldown: "18s", duration: null, note: "轉職後技能仍會保留" },
      { name: "最終召喚獸",              type: "Ativo",    rarity: "4★", effect: "召喚物 犧牲: 傷害 範圍 600% + 治癒 主人 50%", cooldown: "180s", duration: null, note: "轉職後技能仍會保留" },
      { name: "超越召喚爆發",   type: "Ativo",    rarity: "4★", effect: "所有 召喚物 一同攻擊: 傷害 700% 範圍", cooldown: "180s", duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈大師之魂",      type: "Passivo",  rarity: "3★", effect: "+25% 召喚物 威力, +15% 魔法攻擊", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈大師之軀", type: "Passivo",  rarity: "3★", effect: "+15% 最大 HP/MP, +10% MP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",            type: "Passivo",  rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "幽靈大師和諧",     type: "Self-Buff", rarity: "4★", effect: "+60% 召喚物 威力, +40% 魔法攻擊 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── SHILLIEN ORACLE (1ª classe) ───
  shillienOracle: {
    name: '席琳神使', parent: 'darkElfMage', race: 'darkelf', archetype: 'healer', stage: 1,
    desc: '提供治癒與黑暗守護的席琳神使。',
    base: { atk: 6, def: 12, hp: 110, mp: 130, matk: 22, mdef: 22, eva: 5, crit: 4 },
    skills: [
      { name: "治癒",            type: "Ativo",   rarity: "1★", effect: "治癒 250% 魔法攻擊", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥治癒",     type: "Ativo",   rarity: "1★", effect: "快速治癒 180% 魔法攻擊", cooldown: "5s", duration: null, note: "轉職後技能仍會保留" },
      { name: "力量",           type: "Party-Buff", rarity: "1★", effect: "隊伍 ATK +10%", cooldown: "20s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "盾牌",          type: "Party-Buff", rarity: "1★", effect: "隊伍 DEF +10%", cooldown: "20s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "解毒",     type: "Ativo",   rarity: "1★", effect: "移除 中毒", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "止血",      type: "Ativo",   rarity: "1★", effect: "移除 流血", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "魔力回復",        type: "Ativo",   rarity: "1★", effect: "恢復 20% MP do 目標", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── SHILLIEN ELDER (2ª classe) ───
  shillienElder: {
    name: '席琳長老', parent: 'shillienOracle', race: 'darkelf', archetype: 'healer', stage: 2,
    desc: '兼具治療、增益與黑暗攻擊魔法的席琳長老。',
    base: { atk: 8, def: 22, hp: 200, mp: 260, matk: 48, mdef: 50, eva: 8, crit: 4 },
    skills: [
      { name: "高級治癒",     type: "Ativo",     rarity: "2★", effect: "強力治療：恢復量為魔法攻擊的 400%", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "高級群體治癒", type: "Ativo",   rarity: "3★", effect: "治癒 隊伍 300% 魔法攻擊", cooldown: "15s", duration: null, note: "轉職後技能仍會保留" },
      { name: "復活",     type: "Ativo",     rarity: "3★", effect: "以 30% HP／MP 復活盟友", cooldown: "120s", duration: null, note: "轉職後技能仍會保留" },
      { name: "淨化",           type: "Ativo",     rarity: "2★", effect: "移除 2 個減益效果", cooldown: "15s", duration: null, note: "轉職後技能仍會保留" },
      { name: "潔淨",          type: "Ativo",     rarity: "3★", effect: "移除所有減益效果", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
      { name: "魔力強化",          type: "Party-Buff", rarity: "2★", effect: "隊伍魔法攻擊 +20%", cooldown: "30s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "靈活思緒",           type: "Party-Buff", rarity: "2★", effect: "隊伍施法速度 +20%", cooldown: "30s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "吸血狂怒",    type: "Party-Buff", rarity: "2★", effect: "隊伍將造成傷害的 8% 轉化為 HP", cooldown: "30s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "祝福之盾",     type: "Party-Buff", rarity: "2★", effect: "隊伍格擋率 +15%", cooldown: "30s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "精神之盾",    type: "Party-Buff", rarity: "2★", effect: "隊伍魔法防禦 +15%", cooldown: "30s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "席琳烙印", type: "Ativo",   rarity: "3★", effect: "標記目標：受到的傷害 +25%，持續 10 秒", cooldown: "30s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "水之預言", type: "Party-Buff", rarity: "3★", effect: "隊伍魔法攻擊 +15%、施法速度 +10%、魔法防禦 +10%", cooldown: "60s", duration: "600s", note: "轉職後技能仍會保留" },
      { name: "席琳長老和諧", type: "Self-Buff", rarity: "3★", effect: "+30% 治癒威力, +25% 魔法攻擊, +20% 魔法防禦 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── SHILLIEN SAINT (3ª classe) ───
  shillienSaint: {
    name: '席琳聖者', parent: 'shillienElder', race: 'darkelf', archetype: 'healer', stage: 3,
    desc: '席琳的至高聖者，兼具最高階治療與黑暗面攻擊模式。',
    base: { atk: 14, def: 38, hp: 340, mp: 420, matk: 88, mdef: 92, eva: 12, crit: 6 },
    skills: [
      { name: "崇高自我犧牲",      type: "Ativo",    rarity: "4★", effect: "犧牲自身 90% HP：完全治療全隊並移除所有減益效果", cooldown: "300s", duration: null, note: "轉職後技能仍會保留" },
      { name: "生命平衡",                type: "Ativo",    rarity: "3★", effect: "將隊伍 HP 平均化", cooldown: "60s", duration: null, note: "轉職後技能仍會保留" },
      { name: "群體復活",           type: "Ativo",    rarity: "4★", effect: "使所有倒下的盟友以 40% HP／MP 復活", cooldown: "300s", duration: null, note: "轉職後技能仍會保留" },
      { name: "席琳祝福",        type: "Party-Buff", rarity: "3★", effect: "隊伍全屬性 +25%，持續 10 分鐘", cooldown: "60s", duration: "600s", note: "轉職後技能仍會保留" },
      { name: "吸血鬼領主",             type: "Party-Buff", rarity: "3★", effect: "隊伍將造成傷害的 12% 轉化為 HP", cooldown: "60s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "奇蹟",                     type: "Ativo",    rarity: "4★", effect: "隊伍無敵 7 秒 + 治療 30%", cooldown: "300s", duration: "7s", note: "轉職後技能仍會保留" },
      { name: "黑暗面",                   type: "Toggle",   rarity: "3★", effect: "開啟：治療 -50%、黑暗魔法攻擊 +80%，技能切換為攻擊型", cooldown: "10s toggle", duration: "Toggle", note: "轉職後技能仍會保留" },
      { name: "黑暗擾亂",             type: "Ativo",    rarity: "3★", effect: "黑暗傷害 360%（僅限黑暗側）", cooldown: "15s", duration: null, note: "轉職後技能仍會保留" },
      { name: "席琳援助",             type: "Passivo",  rarity: "3★", effect: "治療時：15% 機率使受治療目標獲得 ATK +10%，持續 10 秒", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "神聖新星",                 type: "Ativo",    rarity: "3★", effect: "傷害 黑暗 範圍 320% + 治癒 盟友 15%", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "席琳聖者之魂",       type: "Passivo",  rarity: "3★", effect: "+25% 治癒威力, +20% 魔法攻擊, +15% 魔法防禦", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "席琳聖者之軀",      type: "Passivo",  rarity: "3★", effect: "+20% 最大 MP, +15% MP 恢復, +10% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "席琳聖者和諧",      type: "Self-Buff", rarity: "4★", effect: "+50% 治癒威力, +40% 魔法攻擊, +30% 魔法防禦 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },
    // ═══════════════════════════════════════════
  // ORC FIGHTER — CLASSE BASE
  // ═══════════════════════════════════════════
  orcFighter: {
    name: '半獸人戰士', race: 'orc', archetype: 'fighter', stage: 0,
    desc: '擁有強大力量與高 HP 的半獸人戰士。',
    base: { atk: 14, def: 10, hp: 110, mp: 28, eva: 3, crit: 6, mdef: 4 },
    skills: [
      { name: "強力打擊",   type: "Ativo",   rarity: "1★", effect: "物理傷害 150%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "鐵拳",     type: "Ativo",   rarity: "1★", effect: "傷害 140% + 暈眩 1 秒", cooldown: "10s", duration: "1s", note: "轉職後技能仍會保留" },
      { name: "包紮",        type: "Ativo",   rarity: "1★", effect: "恢復 15% HP", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
      { name: "HP 提升",    type: "Passivo", rarity: "1★", effect: "+12% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "輕甲精通", type: "Passivo", rarity: "1★", effect: "+8% DEF 裝備輕甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "半獸人之魂",     type: "Self-Buff", rarity: "1★", effect: "+12% ATK 和 +10% HP 持續 15 分鐘", cooldown: "30 min", duration: "15 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── RAIDER (1ª classe) ───
  raider: {
    name: '掠奪者', parent: 'orcFighter', race: 'orc', archetype: 'fighter', stage: 1,
    desc: '使用重型武器施展毀滅攻擊的半獸人掠奪者。',
    base: { atk: 28, def: 16, hp: 190, mp: 38, eva: 4, crit: 8, mdef: 6 },
    skills: [
      { name: "強力粉碎",         type: "Ativo",   rarity: "1★", effect: "傷害 180%", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "旋轉斬",      type: "Ativo",   rarity: "1★", effect: "範圍傷害 160%", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "暈眩攻擊",         type: "Ativo",   rarity: "1★", effect: "傷害 160% + 暈眩 2 秒", cooldown: "14s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "鋼鐵意志",           type: "Ativo",   rarity: "1★", effect: "+30% 魔法防禦 持續 30 秒", cooldown: "45s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "長柄武器精通",     type: "Passivo", rarity: "1★", effect: "+12% ATK 使用長柄武器時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "劍／鈍器精通", type: "Passivo", rarity: "1★", effect: "+12% ATK 使用劍／鈍器時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "重甲精通", type: "Passivo", rarity: "1★", effect: "+15% DEF 裝備重甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── DESTROYER (2ª classe) ───
  destroyer: {
    name: '破壞者', parent: 'raider', race: 'orc', archetype: 'fighter', stage: 2,
    desc: '以失控狂怒造成大量傷害的破壞者。',
    base: { atk: 58, def: 32, hp: 420, mp: 55, eva: 5, crit: 12, mdef: 15 },
    skills: [
      { name: "狂暴",            type: "Ativo",   rarity: "3★", effect: "+100% ATK 當 HP < 30%, 持續 30 秒", cooldown: "120s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "毅力",              type: "Ativo",   rarity: "3★", effect: "以 1 HP 存活 10 秒（期間不會死亡）", cooldown: "180s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "旋風",        type: "Ativo",   rarity: "2★", effect: "範圍傷害 260%", cooldown: "18s", duration: null, note: "轉職後技能仍會保留" },
      { name: "狂信者",           type: "Ativo",   rarity: "3★", effect: "+50% 攻擊速度 持續 15 秒, -20% DEF", cooldown: "60s", duration: "15s", note: "轉職後技能仍會保留" },
      { name: "戰吼",          type: "Self-Buff", rarity: "2★", effect: "+25% ATK 持續 120 秒", cooldown: "60s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "戰鎚粉碎",     type: "Ativo",   rarity: "2★", effect: "傷害 280% + 暈眩 3 秒", cooldown: "20s", duration: "3s", note: "轉職後技能仍會保留" },
      { name: "突進",             type: "Ativo",   rarity: "1★", effect: "突進 給目標 + 傷害 150%", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "雷霆風暴",    type: "Ativo",   rarity: "2★", effect: "範圍傷害 240% + 擊倒", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "咆哮",             type: "Ativo",   rarity: "2★", effect: "降低 DEF 敵人 範圍 -20% 10 秒", cooldown: "25s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "燃燒劈砍",     type: "Ativo",   rarity: "2★", effect: "火屬性傷害 240% + 燃燒 5 秒", cooldown: "16s", duration: "5s", note: "轉職後技能仍會保留" },
      { name: "專注",            type: "Passivo", rarity: "1★", effect: "+10% 暴擊率", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "HP 強化",         type: "Passivo", rarity: "1★", effect: "+15% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "破壞者和諧", type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +20% HP, +15% 攻擊速度 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── TITAN (3ª classe) ───
  titan: {
    name: '泰坦', parent: 'destroyer', race: 'orc', archetype: 'fighter', stage: 3,
    desc: '以無可阻擋的狂怒造成絕對毀滅的泰坦。',
    base: { atk: 108, def: 52, hp: 720, mp: 82, eva: 8, crit: 18, mdef: 28 },
    skills: [
      { name: "地震",                 type: "Ativo",   rarity: "3★", effect: "範圍傷害 400% + 擊退 + 暈眩 2 秒", cooldown: "35s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "真實目標",                type: "Ativo",   rarity: "3★", effect: "傷害 380% + 無視 DEF", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "狂怒之拳",              type: "Ativo",   rarity: "3★", effect: "傷害 350% (5 次命中 快速)", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
      { name: "靈魂破壞者",               type: "Ativo",   rarity: "3★", effect: "傷害 360% + 吸取 MP 目標", cooldown: "28s", duration: null, note: "轉職後技能仍會保留" },
      { name: "烈焰打擊",             type: "Ativo",   rarity: "3★", effect: "火屬性傷害 420% 單一目標", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "抗魔護甲",           type: "Ativo",   rarity: "3★", effect: "+80% 魔法防禦 持續 15 秒", cooldown: "60s", duration: "15s", note: "轉職後技能仍會保留" },
      { name: "超越地震",    type: "Ativo",   rarity: "4★", effect: "範圍傷害 680% + 擊倒 + 暈眩 4 秒", cooldown: "180s", duration: "4s", note: "轉職後技能仍會保留" },
      { name: "泰坦榮耀",             type: "Passivo", rarity: "3★", effect: "+20% ATK, +15% 最大 HP, +100% 暴擊威力 使用雙手劍時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "泰坦之魂",               type: "Passivo", rarity: "3★", effect: "+25% ATK, +20% HP, +10% 攻擊速度", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "泰坦之軀",          type: "Passivo", rarity: "3★", effect: "+20% 最大 HP, +15% HP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師：半獸人",      type: "Passivo", rarity: "4★", effect: "+12% 全屬性, +18% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "泰坦和諧",            type: "Self-Buff", rarity: "4★", effect: "+60% ATK, +40% HP, +30% 攻擊速度 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── MONK (1ª classe) ───
  monk: {
    name: '武僧', parent: 'orcFighter', race: 'orc', archetype: 'fighter', stage: 1,
    desc: '精通徒手戰鬥的半獸人武僧。',
    base: { atk: 24, def: 12, hp: 165, mp: 35, eva: 8, crit: 12, mdef: 6 },
    skills: [
      { name: "末日之拳",    type: "Ativo",   rarity: "1★", effect: "傷害 190% + 暈眩 2 秒", cooldown: "14s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "鐵拳",       type: "Ativo",   rarity: "1★", effect: "傷害 170% + 擊退", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "拳套精通",     type: "Passivo", rarity: "1★", effect: "+15% ATK 使用拳套時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "輕甲精通", type: "Passivo", rarity: "1★", effect: "+10% 迴避 裝備輕甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "專注",            type: "Passivo", rarity: "1★", effect: "+10% 暴擊率", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── TYRANT (2ª classe) ───
  tyrant: {
    name: '暴君', parent: 'monk', race: 'orc', archetype: 'fighter', stage: 2,
    desc: '以元素狂怒進行徒手戰鬥的暴君。',
    base: { atk: 55, def: 22, hp: 350, mp: 65, eva: 16, crit: 22, mdef: 14 },
    skills: [
      { name: "氣勁砲",     type: "Ativo",   rarity: "2★", effect: "傷害 260% + 擊退", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "氣勁爆裂",      type: "Ativo",   rarity: "2★", effect: "傷害 280%", cooldown: "16s", duration: null, note: "轉職後技能仍會保留" },
      { name: "氣勁風暴",       type: "Ativo",   rarity: "3★", effect: "範圍傷害 320%", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "燃燒之拳",      type: "Ativo",   rarity: "2★", effect: "火屬性傷害 250% + 燃燒 5 秒", cooldown: "14s", duration: "5s", note: "轉職後技能仍會保留" },
      { name: "颶風突擊", type: "Ativo",   rarity: "3★", effect: "傷害 340% (連擊 4 次命中)", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "衰弱",           type: "Ativo",   rarity: "2★", effect: "傷害 220% + 緩速 40% 6 秒", cooldown: "18s", duration: "6s", note: "轉職後技能仍會保留" },
      { name: "圖騰之魂",      type: "Self-Buff", rarity: "2★", effect: "+20% ATK, +15% 攻擊速度 持續 120 秒", cooldown: "60s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "拳鬥狂怒",         type: "Ativo",   rarity: "2★", effect: "傷害 240% + 解除目標鎖定", cooldown: "20s", duration: null, note: "轉職後技能仍會保留" },
      { name: "狂信者",            type: "Ativo",   rarity: "3★", effect: "+50% 攻擊速度 持續 15 秒, -20% DEF", cooldown: "60s", duration: "15s", note: "轉職後技能仍會保留" },
      { name: "狂暴",            type: "Ativo",   rarity: "3★", effect: "+100% ATK 當 HP < 30%, 持續 30 秒", cooldown: "120s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "暴君和諧",  type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +25% 暴擊, +20% 攻擊速度 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── GRAND KHAVATARI (3ª classe) ───
  grandKhavatari: {
    name: '大卡巴塔里', parent: 'tyrant', race: 'orc', archetype: 'fighter', stage: 3,
    desc: '徒手戰鬥的至高大師大卡巴塔里。',
    base: { atk: 102, def: 38, hp: 580, mp: 95, eva: 28, crit: 38, mdef: 25 },
    skills: [
      { name: "氣勁專注",                  type: "Ativo",   rarity: "3★", effect: "傷害 400% + 必定暴擊", cooldown: "28s", duration: null, note: "轉職後技能仍會保留" },
      { name: "鳳凰之魂",          type: "Ativo",   rarity: "4★", effect: "死亡時以 50% HP 復活（1 次）", cooldown: "300s", duration: "300s (1 uso)", note: "轉職後技能仍會保留" },
      { name: "迅捷攻擊",                 type: "Ativo",   rarity: "3★", effect: "5 次命中 快速 80% 每次", cooldown: "20s", duration: null, note: "轉職後技能仍會保留" },
      { name: "食人魔精華",               type: "Self-Buff", rarity: "3★", effect: "+40% ATK, +30% 最大 HP 持續 60 秒", cooldown: "120s", duration: "60s", note: "轉職後技能仍會保留" },
      { name: "兔之魂圖騰",          type: "Self-Buff", rarity: "3★", effect: "+60% 攻擊速度 持續 30 秒", cooldown: "90s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "超越颶風",       type: "Ativo",   rarity: "4★", effect: "傷害 650% (8 次命中) + 擊倒", cooldown: "180s", duration: null, note: "轉職後技能仍會保留" },
      { name: "大卡巴塔里之魂",       type: "Passivo", rarity: "3★", effect: "+20% ATK, +15% 暴擊率, +15% 攻擊速度", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "大卡巴塔里之軀",      type: "Passivo", rarity: "3★", effect: "+20% 最大 HP, +15% HP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "最終狂熱",                 type: "Passivo", rarity: "3★", effect: "+30% ATK 當 HP < 30%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師：半獸人",        type: "Passivo", rarity: "4★", effect: "+12% 全屬性, +18% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "大卡巴塔里和諧",      type: "Self-Buff", rarity: "4★", effect: "+55% ATK, +40% 暴擊, +35% 攻擊速度 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── RIDER (Classe Base — Vanguard Rider line — Lv. 1) ───
  rider: {
    name: '騎乘戰士', parent: null, race: 'orc', archetype: 'rider', stage: 0,
    desc: '以長槍進行騎乘戰鬥的半獸人騎士。',
    base: { atk: 12, def: 8, hp: 110, mp: 35, eva: 5, crit: 8, mdef: 6 },
    skills: [
      { name: "長槍衝鋒",         type: "Ativo",   rarity: "1★", effect: "傷害 160% + 騎乘突進", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "騎乘突刺",       type: "Ativo",   rarity: "1★", effect: "傷害 140%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "長槍精通",        type: "Passivo", rarity: "1★", effect: "+10% ATK 使用長槍時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥坐騎",         type: "Toggle",  rarity: "1★", effect: "騎乘生物 (+15% 移動速度)", cooldown: "10s", duration: "Toggle", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── DRAGOON (1ª classe — Lv. 20+) ───
  dragoon: {
    name: '龍騎兵', parent: 'rider', race: 'orc', archetype: 'rider', stage: 1,
    desc: '擅長毀滅性騎乘攻擊的龍騎兵。',
    base: { atk: 28, def: 18, hp: 220, mp: 48, eva: 7, crit: 10, mdef: 12 },
    skills: [
      { name: "踐踏",              type: "Ativo",   rarity: "1★", effect: "範圍傷害 騎乘時 220%", cooldown: "16s", duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥突進",          type: "Ativo",   rarity: "2★", effect: "衝鋒 200% + 暈眩 2 秒", cooldown: "14s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "騎乘旋風",    type: "Ativo",   rarity: "1★", effect: "範圍傷害 240%", cooldown: "18s", duration: null, note: "轉職後技能仍會保留" },
      { name: "野獸咆哮",           type: "Ativo",   rarity: "2★", effect: "降低 ATK 敵人 範圍 -15% 8 秒 + 嘲諷", cooldown: "22s", duration: "8s", note: "轉職後技能仍會保留" },
      { name: "龍騎兵和諧",    type: "Self-Buff", rarity: "2★", effect: "+20% ATK, +15% DEF, +10% HP 持續 20 分鐘", cooldown: "45 min", duration: "20 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── VANGUARD RIDER (2ª classe — Lv. 40+) ───
  vanguardRider: {
    name: '先鋒騎士', parent: 'dragoon', race: 'orc', archetype: 'rider', stage: 2,
    desc: '運用巨龍力量進行騎乘毀滅攻擊的先鋒騎士。',
    base: { atk: 58, def: 38, hp: 420, mp: 75, eva: 10, crit: 14, mdef: 22 },
    skills: [
      { name: "毀滅衝鋒",           type: "Ativo",   rarity: "2★", effect: "傷害 320% + 擊倒", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "雷霆衝擊",                type: "Ativo",   rarity: "3★", effect: "範圍傷害 380% + 暈眩 3 秒", cooldown: "28s", duration: "3s", note: "轉職後技能仍會保留" },
      { name: "騎乘猛擊",                 type: "Ativo",   rarity: "2★", effect: "傷害 340% + 擊倒 + 流血 6 秒", cooldown: "22s", duration: "6s bleed", note: "轉職後技能仍會保留" },
      { name: "戰旗",                   type: "Party-Buff", rarity: "3★", effect: "+20% ATK 和 DEF 給隊伍 持續 120 秒", cooldown: "60s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "騎乘精通",              type: "Passivo", rarity: "2★", effect: "+20% ATK 騎乘時, +15% DEF 騎乘時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "騎乘戰鬥",               type: "Passivo", rarity: "2★", effect: "+15% 攻擊速度 騎乘期間", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── GRAND VANGUARD (3ª classe — Lv. 76+) ───
  grandVanguard: {
    name: '大先鋒', parent: 'vanguardRider', race: 'orc', archetype: 'rider', stage: 3,
    desc: '至高騎乘龍之領主大先鋒。',
    base: { atk: 102, def: 65, hp: 700, mp: 110, eva: 14, crit: 18, mdef: 35 },
    skills: [
      { name: "龍息",              type: "Ativo",   rarity: "4★", effect: "火屬性傷害 範圍 550% + 燃燒 8 秒", cooldown: "60s", duration: "8s", note: "轉職後技能仍會保留" },
      { name: "超越衝鋒",          type: "Ativo",   rarity: "4★", effect: "衝鋒傷害 680% + 擊退 + 暈眩 4 秒", cooldown: "180s", duration: "4s", note: "轉職後技能仍會保留" },
      { name: "BP 精通",                   type: "Passivo", rarity: "3★", effect: "產生戰鬥點數 攻擊時, +5% ATK 每 BP (最多 5)", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "先鋒之魂",              type: "Passivo", rarity: "3★", effect: "+25% ATK, +20% DEF, +15% HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "先鋒之軀",         type: "Passivo", rarity: "3★", effect: "+20% 最大 HP, +15% HP 恢復, +10% 移動速度", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師：半獸人",        type: "Passivo", rarity: "4★", effect: "+12% 全屬性, +18% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "先鋒和諧",           type: "Self-Buff", rarity: "4★", effect: "+55% ATK, +45% DEF, +35% HP 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" },
      { name: "騎乘者意志",                 type: "Self-Buff", rarity: "3★", effect: "+30% 攻擊速度 騎乘時, +20% 移動速度 持續 20 分鐘", cooldown: "55 min", duration: "20 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ═══════════════════════════════════════════
  // ORC MAGE — CLASSE BASE
  // ═══════════════════════════════════════════
  orcMage: {
    name: '半獸人法師', race: 'orc', archetype: 'mage', stage: 0,
    desc: '擅長部族魔法與支援的半獸人法師。',
    base: { atk: 8, def: 6, hp: 85, mp: 80, matk: 10, mdef: 6, eva: 3, crit: 3 },
    skills: [
      { name: "風之打擊",  type: "Ativo",   rarity: "1★", effect: "風屬性傷害 魔法 150%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "自我治癒",    type: "Ativo",   rarity: "1★", effect: "恢復 20% HP", cooldown: "15s", duration: null, note: "轉職後技能仍會保留" },
      { name: "法袍精通", type: "Passivo", rarity: "1★", effect: "+10% 魔法攻擊 裝備法袍時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "MP 提升",  type: "Passivo", rarity: "1★", effect: "+10% 最大 MP", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── SHAMAN (1ª classe) ───
  shaman: {
    name: '薩滿', parent: 'orcMage', race: 'orc', archetype: 'support', stage: 1,
    desc: '提供治療與部族增益的半獸人薩滿。',
    base: { atk: 10, def: 10, hp: 125, mp: 120, matk: 22, mdef: 18, eva: 4, crit: 4 },
    skills: [
      { name: "治癒",         type: "Ativo",     rarity: "1★", effect: "治癒 250% 魔法攻擊", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "力量",        type: "Party-Buff", rarity: "1★", effect: "+10% ATK 給隊伍", cooldown: "20s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "盾牌",       type: "Party-Buff", rarity: "1★", effect: "+10% DEF 給隊伍", cooldown: "20s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "解毒",  type: "Ativo",     rarity: "1★", effect: "移除 中毒", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "止血",   type: "Ativo",     rarity: "1★", effect: "移除 流血", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "火焰打擊", type: "Ativo",     rarity: "1★", effect: "火屬性傷害 200%", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "MP 強化",   type: "Passivo",   rarity: "1★", effect: "+15% 最大 MP", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── OVERLORD (2ª classe) ───
  overlord: {
    name: '霸主', parent: 'shaman', race: 'orc', archetype: 'support', stage: 2,
    desc: '擅長血盟增益與大範圍弱化的霸主。',
    base: { atk: 18, def: 28, hp: 300, mp: 220, matk: 48, mdef: 42, eva: 6, crit: 6 },
    skills: [
      { name: "血盟力量",            type: "Party-Buff", rarity: "2★", effect: "+15% ATK 給隊伍", cooldown: "30s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "血盟盾牌",           type: "Party-Buff", rarity: "2★", effect: "+15% DEF 給隊伍", cooldown: "30s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "血盟之軀",             type: "Party-Buff", rarity: "2★", effect: "+15% 最大 HP 給隊伍", cooldown: "30s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "血盟之魂",             type: "Party-Buff", rarity: "2★", effect: "+15% 最大 MP 給隊伍", cooldown: "30s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "血盟精神",           type: "Party-Buff", rarity: "2★", effect: "+15% 魔法攻擊 給隊伍", cooldown: "30s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "寒冬封印",        type: "Ativo",      rarity: "2★", effect: "降低 攻擊速度 目標 -30% 10 秒", cooldown: "20s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "火焰封印",         type: "Ativo",      rarity: "2★", effect: "火屬性傷害 220% + 燃燒 8 秒", cooldown: "15s", duration: "8s", note: "轉職後技能仍會保留" },
      { name: "幽暗封印",         type: "Ativo",      rarity: "2★", effect: "降低 魔法防禦 目標 -25% 10 秒", cooldown: "20s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "沉默封印",       type: "Ativo",      rarity: "3★", effect: "沉默 目標 5 秒", cooldown: "30s", duration: "5s", note: "轉職後技能仍會保留" },
      { name: "緩速封印",          type: "Ativo",      rarity: "2★", effect: "緩速 目標 -40% 8 秒", cooldown: "18s", duration: "8s", note: "轉職後技能仍會保留" },
      { name: "挑釁",               type: "Ativo",      rarity: "1★", effect: "嘲諷 10 秒", cooldown: "15s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "HP 強化",              type: "Passivo",    rarity: "1★", effect: "+15% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "霸主和諧",    type: "Self-Buff",  rarity: "3★", effect: "+30% 魔法攻擊, +25% HP, +20% 魔法防禦 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── DOMINATOR (3ª classe) ───
  dominator: {
    name: '支配者', parent: 'overlord', race: 'orc', archetype: 'support', stage: 3,
    desc: '擁有至高增益與攻擊能力的絕對領袖支配者。',
    base: { atk: 32, def: 48, hp: 480, mp: 380, matk: 85, mdef: 72, eva: 10, crit: 8 },
    skills: [
      { name: "限制封印",              type: "Ativo",      rarity: "3★", effect: "降低 全屬性 目標 -15% 12 秒", cooldown: "35s", duration: "12s", note: "轉職後技能仍會保留" },
      { name: "血盟帝國",              type: "Ativo",      rarity: "4★", effect: "增益 終極: +25% 全屬性 給隊伍 120 秒", cooldown: "120s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "帕格立歐勝利",       type: "Party-Buff", rarity: "3★", effect: "+20% ATK 和 +15% 暴擊 給隊伍", cooldown: "60s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "帕格立歐榮耀",          type: "Party-Buff", rarity: "3★", effect: "+20% DEF 和 +15% 魔法防禦 給隊伍", cooldown: "60s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "帕格立歐祝福",       type: "Party-Buff", rarity: "3★", effect: "+15% 最大 HP/MP 給隊伍", cooldown: "60s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "群體幽暗封印",         type: "Ativo",      rarity: "3★", effect: "降低 魔法防禦 敵人 範圍 -25% 10 秒", cooldown: "35s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "火焰爆發",                type: "Ativo",      rarity: "3★", effect: "火屬性傷害 範圍 380% + 燃燒 6 秒", cooldown: "22s", duration: "6s", note: "轉職後技能仍會保留" },
      { name: "帕格立歐預言",       type: "Self-Buff",  rarity: "3★", effect: "+30% ATK, +25% 魔法攻擊, +20% 對怪物 傷害 持續 20 分鐘", cooldown: "55 min", duration: "20 min", note: "轉職後技能仍會保留" },
      { name: "超越火焰爆發",   type: "Ativo",      rarity: "4★", effect: "火屬性傷害 範圍 620% (10 目標) + 燃燒 10 秒", cooldown: "160s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "支配者之魂",           type: "Passivo",    rarity: "3★", effect: "+20% 魔法攻擊, +15% HP, +10% 全抗性", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "支配者之軀",      type: "Passivo",    rarity: "3★", effect: "+15% 最大 MP, +15% HP 恢復, +10% MP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "支配者和諧",          type: "Self-Buff",  rarity: "4★", effect: "+50% 魔法攻擊, +40% HP, +30% 全抗性 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── WARCRYER (2ª classe) ───
  warcryer: {
    name: '戰狂', parent: 'shaman', race: 'orc', archetype: 'bard', stage: 2,
    desc: '以頌歌強化盟友的戰狂。',
    base: { atk: 14, def: 22, hp: 280, mp: 200, matk: 42, mdef: 38, eva: 5, crit: 5 },
    skills: [
      { name: "火焰頌歌",       type: "Party-Buff", rarity: "2★", effect: "+15% ATK 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "戰鬥頌歌",     type: "Party-Buff", rarity: "2★", effect: "+15% 攻擊速度 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "防護頌歌",  type: "Party-Buff", rarity: "2★", effect: "+15% DEF 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "吸血鬼頌歌",    type: "Party-Buff", rarity: "3★", effect: "吸取 8% 傷害轉為 HP 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "狂怒頌歌",       type: "Party-Buff", rarity: "2★", effect: "+15% 暴擊率 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "迴避頌歌",    type: "Party-Buff", rarity: "2★", effect: "+15% 迴避 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "狂暴頌歌",       type: "Party-Buff", rarity: "3★", effect: "+20% 暴擊威力 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "捕食者頌歌",   type: "Party-Buff", rarity: "2★", effect: "+10% ATK 和 命中 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "鷹之頌歌",      type: "Party-Buff", rarity: "2★", effect: "+15% 暴擊率 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "勝利頌歌",    type: "Party-Buff", rarity: "3★", effect: "+15% 全屬性 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "復仇頌歌",    type: "Party-Buff", rarity: "2★", effect: "+10% 反射傷害 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "戰狂和諧",  type: "Self-Buff",  rarity: "3★", effect: "+30% 魔法攻擊, +25% HP, +20% 魔法防禦 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── DOOMCRYER (3ª classe) ───
  doomcryer: {
    name: '末日戰狂', parent: 'warcryer', race: 'orc', archetype: 'bard', stage: 3,
    desc: '施展至高頌歌與戰爭傷害的末日戰狂。',
    base: { atk: 22, def: 38, hp: 440, mp: 340, matk: 75, mdef: 65, eva: 8, crit: 8 },
    skills: [
      { name: "馬格努斯頌歌",            type: "Party-Buff", rarity: "3★", effect: "+20% 魔法攻擊 和 +15% 施法速度 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "狂戰士頌歌",         type: "Party-Buff", rarity: "3★", effect: "+25% ATK, +20% 攻擊速度, -10% DEF 給隊伍", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "群體頌歌",                 type: "Ativo",      rarity: "3★", effect: "啟用 所有頌歌 持續 60 秒", cooldown: "120s", duration: "60s", note: "轉職後技能仍會保留" },
      { name: "終焉頌歌",                type: "Ativo",      rarity: "4★", effect: "所有頌歌 於 最大威力 持續 30 秒 + 免疫 減益", cooldown: "300s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "戰爭頌歌",                  type: "Ativo",      rarity: "3★", effect: "範圍傷害 340% + 嘲諷 範圍", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "血之羈絆",                 type: "Ativo",      rarity: "3★", effect: "範圍傷害 黑暗 380% + 吸取 HP 給隊伍", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "勝利預言",        type: "Self-Buff",  rarity: "3★", effect: "+30% ATK, +25% 暴擊, +20% 對怪物 傷害 持續 20 分鐘", cooldown: "55 min", duration: "20 min", note: "轉職後技能仍會保留" },
      { name: "戰爭狂響",           type: "Ativo",      rarity: "3★", effect: "範圍傷害 320% + 降低 HP/MP 敵人 -15%", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
      { name: "末日戰狂之魂",           type: "Passivo",    rarity: "3★", effect: "+20% 魔法攻擊, +15% HP, +10% 全抗性", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "末日戰狂之軀",      type: "Passivo",    rarity: "3★", effect: "+15% 最大 MP, +15% HP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "末日戰狂和諧",          type: "Self-Buff",  rarity: "4★", effect: "+50% 魔法攻擊, +40% HP, +30% 全抗性 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },
    // ═══════════════════════════════════════════
  // DWARF FIGHTER — CLASSE BASE
  // ═══════════════════════════════════════════
  dwarfFighter: {
    name: '矮人戰士', race: 'dwarf', archetype: 'fighter', stage: 0,
    desc: '強韌耐打且具有額外掉落加成的矮人戰士。',
    base: { atk: 12, def: 10, hp: 100, mp: 30, eva: 3, crit: 6, mdef: 5 },
    skills: [
      { name: "強力打擊",   type: "Ativo",   rarity: "1★", effect: "物理傷害 150%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "搜刮",           type: "Ativo",   rarity: "1★", effect: "標記目標以獲得額外掉落", cooldown: "10s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "包紮",         type: "Ativo",   rarity: "1★", effect: "恢復 15% HP", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
      { name: "HP 提升",     type: "Passivo", rarity: "1★", effect: "+10% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "輕甲精通", type: "Passivo", rarity: "1★", effect: "+8% DEF 裝備輕甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── SCAVENGER (1ª classe) ───
  scavenger: {
    name: '收集者', parent: 'dwarfFighter', race: 'dwarf', archetype: 'dagger', stage: 1,
    desc: '擅長從敵人取得額外戰利品的收集者。',
    base: { atk: 22, def: 14, hp: 160, mp: 38, eva: 10, crit: 10, mdef: 6 },
    skills: [
      { name: "搜刮",            type: "Ativo",   rarity: "1★", effect: "標記目標，使其死亡時提供額外掉落", cooldown: "8s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "掃蕩",          type: "Ativo",   rarity: "1★", effect: "收集已使用搜刮標記目標的掉落", cooldown: "3s", duration: null, note: "轉職後技能仍會保留" },
      { name: "掠奪",          type: "Ativo",   rarity: "2★", effect: "傷害 160% + 直接掉落機率", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "暈眩攻擊",      type: "Ativo",   rarity: "1★", effect: "傷害 160% + 暈眩 2 秒", cooldown: "14s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "匕首精通",   type: "Passivo", rarity: "1★", effect: "+12% ATK 使用匕首時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "迴避",          type: "Passivo", rarity: "1★", effect: "+10% 迴避", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── BOUNTY HUNTER (2ª classe) ───
  bountyHunter: {
    name: '賞金獵人', parent: 'scavenger', race: 'dwarf', archetype: 'dagger', stage: 2,
    desc: '兼具戰鬥與高效搜刮能力的賞金獵人。',
    base: { atk: 48, def: 28, hp: 320, mp: 55, eva: 18, crit: 18, mdef: 14 },
    skills: [
      { name: "搜刮祭典",    type: "Ativo",   rarity: "2★", effect: "範圍標記所有敵人以獲得額外掉落", cooldown: "25s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "搜刮重擊",       type: "Ativo",   rarity: "2★", effect: "傷害 240% + 搜刮 + 自動回收", cooldown: "18s", duration: null, note: "轉職後技能仍會保留" },
      { name: "背刺",          type: "Ativo",   rarity: "2★", effect: "傷害 260% 從背後 + 必定暴擊", cooldown: "16s", duration: null, note: "轉職後技能仍會保留" },
      { name: "致盲打擊",     type: "Ativo",   rarity: "2★", effect: "傷害 220% + 致盲 4 秒", cooldown: "18s", duration: "4s", note: "轉職後技能仍會保留" },
      { name: "沙塵炸彈",         type: "Ativo",   rarity: "2★", effect: "致盲 範圍 5 秒", cooldown: "25s", duration: "5s", note: "轉職後技能仍會保留" },
      { name: "位置交換",            type: "Ativo",   rarity: "2★", effect: "傳送 背後 目標的", cooldown: "20s", duration: null, note: "轉職後技能仍會保留" },
      { name: "假死",        type: "Ativo",   rarity: "2★", effect: "裝死, 清除仇恨", cooldown: "60s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "暴擊威力",    type: "Passivo", rarity: "2★", effect: "+20% 暴擊威力", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "專注",             type: "Passivo", rarity: "1★", effect: "+10% 暴擊率", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "HP 強化",          type: "Passivo", rarity: "1★", effect: "+15% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "賞金獵人和諧", type: "Self-Buff", rarity: "3★", effect: "+30% ATK, +25% 暴擊, +20% 掉落加成 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── FORTUNE SEEKER (3ª classe) ───
  fortuneSeeker: {
    name: '財富獵人', parent: 'bountyHunter', race: 'dwarf', archetype: 'dagger', stage: 3,
    desc: '追求最高戰利品效率並兼具戰鬥力的財富獵人。',
    base: { atk: 88, def: 42, hp: 520, mp: 85, eva: 30, crit: 32, mdef: 22 },
    skills: [
      { name: "群體搜刮",                  type: "Ativo",   rarity: "3★", effect: "標記畫面內所有敵人以獲得額外掉落", cooldown: "35s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "幸運光環",             type: "Self-Buff", rarity: "3★", effect: "+30% 掉落 機率, +20% 金幣 掉落 持續 30 分鐘", cooldown: "60 min", duration: "30 min", note: "轉職後技能仍會保留" },
      { name: "工匠魔像",             type: "Ativo",   rarity: "3★", effect: "召喚 魔像 會 戰鬥 (ATK 200%)", cooldown: "60s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "超越搜刮重擊",    type: "Ativo",   rarity: "4★", effect: "範圍傷害 500% + 搜刮 + 回收 所有", cooldown: "160s", duration: null, note: "轉職後技能仍會保留" },
      { name: "幸運",                       type: "Passivo", rarity: "4★", effect: "+15% 稀有掉落機率, +10% 史詩掉落機率", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "財富獵人之魂",       type: "Passivo", rarity: "3★", effect: "+20% ATK, +15% 暴擊, +20% 掉落加成", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "財富獵人之軀",      type: "Passivo", rarity: "3★", effect: "+15% 最大 HP, +10% 迴避", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",            type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "財富獵人和諧",      type: "Self-Buff", rarity: "4★", effect: "+50% ATK, +40% 暴擊, +35% 掉落加成 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── ARTISAN (1ª classe — Craft line) ───
  artisanDwarf: {
    name: '工匠', parent: 'dwarfFighter', race: 'dwarf', archetype: 'crafter', stage: 1,
    desc: '精通物品製作與魔像技術的矮人工匠。',
    base: { atk: 20, def: 16, hp: 175, mp: 42, eva: 4, crit: 6, mdef: 8 },
    skills: [
      { name: "製作物品",          type: "Ativo",   rarity: "1★", effect: "製作 物品 的 配方", cooldown: "5s", duration: null, note: "轉職後技能仍會保留" },
      { name: "召喚魔像",         type: "Ativo",   rarity: "1★", effect: "召喚 魔像 的 戰鬥 基礎", cooldown: "30s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "暈眩攻擊",          type: "Ativo",   rarity: "1★", effect: "傷害 160% + 暈眩 2 秒", cooldown: "14s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "劍／鈍器精通",  type: "Passivo", rarity: "1★", effect: "+12% ATK 使用劍／鈍器時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "重甲精通",  type: "Passivo", rarity: "1★", effect: "+15% DEF 裝備重甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── WARSMITH (2ª classe) ───
  warsmith: {
    name: '戰爭工匠', parent: 'artisanDwarf', race: 'dwarf', archetype: 'crafter', stage: 2,
    desc: '精通強力魔像與高階製作的戰爭工匠。',
    base: { atk: 40, def: 35, hp: 340, mp: 65, eva: 6, crit: 8, mdef: 18 },
    skills: [
      { name: "製作物品 Lv2-7",        type: "Ativo",   rarity: "2★", effect: "製作 物品 進階", cooldown: "5s", duration: null, note: "轉職後技能仍會保留" },
      { name: "召喚攻城魔像",        type: "Ativo",   rarity: "2★", effect: "魔像 強力 (ATK 250%, HP 高)", cooldown: "60s", duration: "180s", note: "轉職後技能仍會保留" },
      { name: "召喚機械魔像",     type: "Ativo",   rarity: "2★", effect: "魔像 機械 (ATK 遠距 200%)", cooldown: "60s", duration: "180s", note: "轉職後技能仍會保留" },
      { name: "召喚野豬加農砲",    type: "Ativo",   rarity: "3★", effect: "火砲 範圍 (傷害 300%/10 秒)", cooldown: "90s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "共享製作",              type: "Ativo",   rarity: "2★", effect: "允許 製作 給 其他 玩家", cooldown: "5s", duration: null, note: "轉職後技能仍會保留" },
      { name: "水晶精通",          type: "Passivo", rarity: "2★", effect: "+20% 結晶化成功率", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "魔像護甲",              type: "Ativo",   rarity: "2★", effect: "+30% DEF 的 魔像 持續 60 秒", cooldown: "60s", duration: "60s", note: "轉職後技能仍會保留" },
      { name: "戰爭工匠和諧",       type: "Self-Buff", rarity: "3★", effect: "+30% ATK, +25% 魔像 威力, +20% 製作 成功 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── MAESTRO (3ª classe) ───
  maestro: {
    name: '巨匠', parent: 'warsmith', race: 'dwarf', archetype: 'crafter', stage: 3,
    desc: '鍛造與魔像技術的至高大師巨匠。',
    base: { atk: 72, def: 58, hp: 560, mp: 98, eva: 10, crit: 12, mdef: 30 },
    skills: [
      { name: "召喚強化魔像",      type: "Ativo",   rarity: "3★", effect: "魔像 強化 (ATK 400%, 範圍)", cooldown: "90s", duration: "180s", note: "轉職後技能仍會保留" },
      { name: "召喚大爆炸",            type: "Ativo",   rarity: "4★", effect: "爆炸物: 範圍傷害 550%", cooldown: "120s", duration: null, note: "轉職後技能仍會保留" },
      { name: "群體水晶",               type: "Ativo",   rarity: "3★", effect: "結晶化 多個 物品 一次", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
      { name: "最終形態",                 type: "Ativo",   rarity: "4★", effect: "魔像 進化: +100% ATK/HP 持續 60 秒", cooldown: "180s", duration: "60s", note: "轉職後技能仍會保留" },
      { name: "製作精通",              type: "Passivo", rarity: "3★", effect: "+30% 製作 成功 機率", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "巨匠之魂",             type: "Passivo", rarity: "3★", effect: "+20% ATK, +15% 魔像 威力, +15% DEF", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "巨匠之軀",        type: "Passivo", rarity: "3★", effect: "+15% 最大 HP, +10% HP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",           type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "巨匠和諧",            type: "Self-Buff", rarity: "4★", effect: "+50% ATK, +40% 魔像 威力, +30% 製作 成功 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },
    // ═══════════════════════════════════════════
  // KAMAEL — CLASSE BASE
  // ═══════════════════════════════════════════
  kamaelSoldier: {
    name: '闇天使士兵', race: 'kamael', archetype: 'fighter', stage: 0,
    desc: '運用靈魂力量戰鬥的闇天使士兵。',
    base: { atk: 13, def: 7, hp: 90, mp: 40, eva: 8, crit: 8, mdef: 5 },
    skills: [
      { name: "靈魂打擊",        type: "Ativo",   rarity: "1★", effect: "傷害 靈魂 160%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "能量爆發",       type: "Ativo",   rarity: "1★", effect: "範圍傷害 靈魂 140%", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "竊取神性",     type: "Ativo",   rarity: "1★", effect: "吸收 增益 敵人", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
      { name: "輕甲精通", type: "Passivo", rarity: "1★", effect: "+8% 迴避 裝備輕甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "古代劍精通", type: "Passivo", rarity: "1★", effect: "裝備古代劍時 ATK +12%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "靈魂精通",       type: "Passivo", rarity: "1★", effect: "+10% 靈魂 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── TROOPER (1ª classe) ───
  trooper: {
    name: '闇天使戰士', parent: 'kamaelSoldier', race: 'kamael', archetype: 'fighter', stage: 1,
    desc: '使用古代劍與靈魂力量的前線闇天使戰士。',
    base: { atk: 26, def: 14, hp: 170, mp: 52, eva: 10, crit: 10, mdef: 8 },
    skills: [
      { name: "靈魂充能",         type: "Ativo",   rarity: "1★", effect: "累積靈魂點數 (+1 SP)", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "雷電震擊",     type: "Ativo",   rarity: "1★", effect: "傷害 雷電 190% + 暈眩 1 秒", cooldown: "12s", duration: "1s", note: "轉職後技能仍會保留" },
      { name: "突進",                type: "Ativo",   rarity: "1★", effect: "突進 給目標 + 傷害 150%", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "三重突刺",       type: "Ativo",   rarity: "1★", effect: "傷害 180% (3 次命中)", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "重甲精通", type: "Passivo", rarity: "1★", effect: "+15% DEF 裝備重甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "HP 強化",            type: "Passivo", rarity: "1★", effect: "+12% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // ─── BERSERKER (2ª classe) ───
  berserker: {
    name: '狂戰士', parent: 'trooper', race: 'kamael', archetype: 'fighter', stage: 2,
    desc: '以靈魂狂怒造成毀滅傷害的闇天使狂戰士。',
    base: { atk: 55, def: 28, hp: 380, mp: 72, eva: 14, crit: 16, mdef: 16 },
    skills: [
      { name: "靈魂破壞者",       type: "Ativo",   rarity: "2★", effect: "傷害 靈魂 280% + 吸取 MP", cooldown: "16s", duration: null, note: "轉職後技能仍會保留" },
      { name: "靈魂狂怒",          type: "Ativo",   rarity: "3★", effect: "+60% ATK 持續 20 秒, 消耗 靈魂點數", cooldown: "60s", duration: "20s", note: "轉職後技能仍會保留" },
      { name: "突進衝擊",        type: "Ativo",   rarity: "2★", effect: "衝鋒 240% + 暈眩 2 秒", cooldown: "18s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "殲滅",           type: "Ativo",   rarity: "2★", effect: "範圍傷害 260%", cooldown: "18s", duration: null, note: "轉職後技能仍會保留" },
      { name: "颶風突進",     type: "Ativo",   rarity: "3★", effect: "範圍傷害 320% + 擊退", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "靈魂穿刺",      type: "Ativo",   rarity: "2★", effect: "傷害 250% + 無視 DEF", cooldown: "16s", duration: null, note: "轉職後技能仍會保留" },
      { name: "狂暴",             type: "Ativo",   rarity: "3★", effect: "+100% ATK 當 HP < 30%, 持續 30 秒", cooldown: "120s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "毅力",               type: "Ativo",   rarity: "3★", effect: "以 1 HP 存活 10 秒", cooldown: "180s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "專注",              type: "Passivo", rarity: "1★", effect: "+10% 暴擊率", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "狂戰士和諧", type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +25% 暴擊, +20% 靈魂 傷害 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── DOOMBRINGER (3ª classe) ───
  doombringer: {
    name: '末日使者', parent: 'berserker', race: 'kamael', archetype: 'fighter', stage: 3,
    desc: '以靈魂力量帶來絕對毀滅的末日使者。',
    base: { atk: 102, def: 45, hp: 620, mp: 105, eva: 20, crit: 28, mdef: 28 },
    skills: [
      { name: "末日之刃",                 type: "Ativo",   rarity: "3★", effect: "傷害 靈魂 420% + 流血 8 秒", cooldown: "25s", duration: "8s", note: "轉職後技能仍會保留" },
      { name: "靈魂爆炸",             type: "Ativo",   rarity: "4★", effect: "範圍傷害 靈魂 550% + 消耗 所有 靈魂點數", cooldown: "90s", duration: null, note: "轉職後技能仍會保留" },
      { name: "不協和",                 type: "Ativo",   rarity: "3★", effect: "沉默 範圍 5 秒", cooldown: "40s", duration: "5s", note: "轉職後技能仍會保留" },
      { name: "背叛印記",              type: "Ativo",   rarity: "3★", effect: "標記 目標: +30% 傷害 對 該目標 12 秒", cooldown: "35s", duration: "12s", note: "轉職後技能仍會保留" },
      { name: "強化靈魂狂怒",       type: "Ativo",   rarity: "4★", effect: "+80% ATK 持續 25 秒", cooldown: "90s", duration: "25s", note: "轉職後技能仍會保留" },
      { name: "超越末日之刃",    type: "Ativo",   rarity: "4★", effect: "傷害 靈魂 680% + 無視 DEF + 吸取 靈魂", cooldown: "180s", duration: null, note: "轉職後技能仍會保留" },
      { name: "卡麥爾榮耀",            type: "Passivo", rarity: "3★", effect: "+20% ATK, +15% 靈魂 傷害, +10% 暴擊率", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "末日使者之魂",         type: "Passivo", rarity: "3★", effect: "+25% ATK, +20% 暴擊威力", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "末日使者之軀",        type: "Passivo", rarity: "3★", effect: "+20% 最大 HP, +15% HP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",           type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "末日使者和諧",        type: "Self-Buff", rarity: "4★", effect: "+55% ATK, +45% 暴擊, +35% 靈魂 傷害 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── SOUL FINDER → SOUL BREAKER → SOUL HOUND ───
  soulFinder: {
    name: '靈魂探尋者', parent: 'kamaelSoldier', race: 'kamael', archetype: 'hybrid', stage: 1,
    desc: '兼具物理與魔法戰鬥能力的靈魂探尋者。',
    base: { atk: 18, def: 10, hp: 130, mp: 65, eva: 10, crit: 10, matk: 15, mdef: 10 },
    skills: [
      { name: "強化靈魂打擊", type: "Ativo", rarity: "1★", effect: "傷害 靈魂 180%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "雙重突刺",         type: "Ativo", rarity: "1★", effect: "傷害 170% (2 次命中)", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "細劍精通",        type: "Passivo", rarity: "1★", effect: "裝備細劍時 ATK +12%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "MP 強化",            type: "Passivo", rarity: "1★", effect: "+12% 最大 MP", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  soulBreakerKamael: {
    name: '靈魂破壞者', parent: 'soulFinder', race: 'kamael', archetype: 'hybrid', stage: 2,
    desc: '融合近戰與靈魂魔法的靈魂破壞者。',
    base: { atk: 42, def: 18, hp: 250, mp: 120, eva: 16, crit: 16, matk: 38, mdef: 22 },
    skills: [
      { name: "靈魂漩渦",       type: "Ativo",   rarity: "2★", effect: "傷害 靈魂 魔法 280%", cooldown: "16s", duration: null, note: "轉職後技能仍會保留" },
      { name: "黑暗詛咒",        type: "Ativo",   rarity: "2★", effect: "傷害 黑暗 240% + 降低 魔法防禦 20%", cooldown: "18s", duration: "8s", note: "轉職後技能仍會保留" },
      { name: "瘋狂粉碎",    type: "Ativo",   rarity: "2★", effect: "物理傷害 260% + 暈眩 2 秒", cooldown: "18s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "靈魂破壞者和諧", type: "Self-Buff", rarity: "3★", effect: "+30% ATK, +25% 魔法攻擊, +20% 靈魂 傷害 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  soulHound: {
    name: '靈魂獵犬', parent: 'soulBreakerKamael', race: 'kamael', archetype: 'hybrid', stage: 3,
    desc: '精通混合型戰鬥的靈魂獵犬。',
    base: { atk: 82, def: 32, hp: 420, mp: 200, eva: 26, crit: 28, matk: 72, mdef: 38 },
    skills: [
      { name: "雷電屏障",            type: "Ativo",   rarity: "3★", effect: "護盾 雷電: 吸收 3000 + 反射 25%", cooldown: "60s", duration: "15s", note: "轉職後技能仍會保留" },
      { name: "靈魂漩渦毀滅",      type: "Ativo",   rarity: "4★", effect: "傷害 靈魂 範圍 520%", cooldown: "45s", duration: null, note: "轉職後技能仍會保留" },
      { name: "靈魂點燃",                type: "Ativo",   rarity: "3★", effect: "+50% ATK 和 魔法攻擊 持續 20 秒 (吸取 HP 3%/s)", cooldown: "90s", duration: "20s", note: "轉職後技能仍會保留" },
      { name: "黑暗粉碎",                   type: "Ativo",   rarity: "3★", effect: "傷害 黑暗 380% + 沉默 3 秒", cooldown: "22s", duration: "3s", note: "轉職後技能仍會保留" },
      { name: "超越靈魂漩渦",     type: "Ativo",   rarity: "4★", effect: "傷害 靈魂 範圍 700% + 吸取 靈魂", cooldown: "180s", duration: null, note: "轉職後技能仍會保留" },
      { name: "靈魂獵犬之魂",            type: "Passivo", rarity: "3★", effect: "+20% ATK, +20% 魔法攻擊, +15% 靈魂 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "靈魂獵犬之軀",           type: "Passivo", rarity: "3★", effect: "+15% 最大 HP/MP, +10% 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",             type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "靈魂獵犬和諧",           type: "Self-Buff", rarity: "4★", effect: "+50% ATK, +45% 魔法攻擊, +35% 靈魂 傷害 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── WARDER → SOUL RANGER → TRICKSTER ───
  warder: {
    name: '闇天使守衛', parent: 'kamaelSoldier', race: 'kamael', archetype: 'archer', stage: 1,
    desc: '擅長弩武器的闇天使守衛。',
    base: { atk: 22, def: 10, hp: 130, mp: 45, eva: 12, crit: 12, mdef: 6 },
    skills: [
      { name: "快速射擊",         type: "Ativo",   rarity: "1★", effect: "傷害 170% 快速", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "弩精通",   type: "Passivo", rarity: "1★", effect: "裝備弩時 ATK +12%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "HP 強化",           type: "Passivo", rarity: "1★", effect: "+10% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  soulRanger: {
    name: '靈魂遊俠', parent: 'warder', race: 'kamael', archetype: 'archer', stage: 2,
    desc: '以靈魂力量強化弩攻擊的靈魂遊俠。',
    base: { atk: 52, def: 18, hp: 250, mp: 65, eva: 20, crit: 22, mdef: 12 },
    skills: [
      { name: "雙重射擊",      type: "Ativo",   rarity: "2★", effect: "傷害 220% (2 次命中)", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "爆裂射擊",       type: "Ativo",   rarity: "2★", effect: "傷害 260% + 擊退", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "暈眩射擊",        type: "Ativo",   rarity: "2★", effect: "傷害 200% + 暈眩 2 秒", cooldown: "18s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "箭雨",       type: "Ativo",   rarity: "3★", effect: "範圍傷害 300%", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "快速射擊",       type: "Ativo",   rarity: "2★", effect: "+50% 攻擊速度 持續 15 秒", cooldown: "45s", duration: "15s", note: "轉職後技能仍會保留" },
      { name: "靈魂充能",      type: "Ativo",   rarity: "1★", effect: "累積靈魂點數 (+1 SP)", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "遠距射擊",        type: "Passivo", rarity: "2★", effect: "+30% 射程", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "專注",            type: "Passivo", rarity: "1★", effect: "+10% 暴擊率", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "暴擊威力",   type: "Passivo", rarity: "2★", effect: "+20% 暴擊威力", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "靈魂遊俠和諧", type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +25% 暴擊, +20% 射程 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  trickster: {
    name: '詭術師', parent: 'soulRanger', race: 'kamael', archetype: 'archer', stage: 3,
    desc: '結合弩、陷阱與詭計作戰的詭術師。',
    base: { atk: 98, def: 25, hp: 400, mp: 98, eva: 35, crit: 42, mdef: 20 },
    skills: [
      { name: "七連矢（弩）",     type: "Ativo",   rarity: "3★", effect: "傷害 420% (7 次命中 弩)", cooldown: "28s", duration: null, note: "轉職後技能仍會保留" },
      { name: "設置陷阱",               type: "Ativo",   rarity: "3★", effect: "設置 陷阱: 範圍傷害 300% + 暈眩 3 秒 當 觸發時", cooldown: "30s", duration: "60s ou ativação", note: "轉職後技能仍會保留" },
      { name: "死亡之眼",                   type: "Self-Buff", rarity: "3★", effect: "+50% ATK, +40% 射程 持續 18 分鐘", cooldown: "55 min", duration: "18 min", note: "轉職後技能仍會保留" },
      { name: "精準射擊",              type: "Ativo",   rarity: "3★", effect: "傷害 380% + 無視 DEF", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "詭術師靈魂",      type: "Ativo",   rarity: "4★", effect: "+40% 迴避 和 隱形 8 秒", cooldown: "90s", duration: "8s", note: "轉職後技能仍會保留" },
      { name: "超越七連矢",   type: "Ativo",   rarity: "4★", effect: "傷害 650% (7 次命中) + 元素 範圍", cooldown: "160s", duration: null, note: "轉職後技能仍會保留" },
      { name: "詭術師之魂",           type: "Passivo", rarity: "3★", effect: "+20% ATK, +20% 暴擊, +15% 射程", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "詭術師之軀",          type: "Passivo", rarity: "3★", effect: "+15% 最大 HP, +10% 迴避", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",           type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "詭術師和諧",          type: "Self-Buff", rarity: "4★", effect: "+55% ATK, +45% 暴擊, +35% 射程 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ─── SAMURAI BASE → HATAMOTO → RONIN → SAMURAI (Kamael Kenjutsu) ───
  samuraiBase: {
    name: '武士學徒', parent: null, race: 'kamael', archetype: 'samurai', stage: 0,
    desc: '修習刀之道與武士刀技巧的武士學徒。',
    base: { atk: 14, def: 8, hp: 100, mp: 35, eva: 8, crit: 8, mdef: 6 },
    skills: [
      { name: "居合斬",       type: "Ativo",   rarity: "1★", effect: "物理傷害 快速 160% 對 拔刀 劍", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "新月之刃",       type: "Ativo",   rarity: "1★", effect: "傷害 的 斬擊 140% + 流血 4 秒", cooldown: "10s", duration: "4s", note: "轉職後技能仍會保留" },
      { name: "武士刀精通",       type: "Passivo", rarity: "1★", effect: "裝備武士刀／劍時 P.ATK +15%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "武士道精神",       type: "Passivo", rarity: "1★", effect: "+10% 暴擊率 和 +8% 迴避", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "武士和諧",    type: "Self-Buff", rarity: "1★", effect: "+20% P.ATK, +15% 暴擊率 持續 30 分鐘", cooldown: "30 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  hatamoto: {
    name: '旗本', parent: 'samuraiBase', race: 'kamael', archetype: 'samurai', stage: 1,
    desc: '具備嚴格武藝修練的菁英刀劍戰士旗本。',
    base: { atk: 28, def: 14, hp: 170, mp: 52, eva: 12, crit: 14, mdef: 10 },
    skills: [
      { name: "旋風斬",        type: "Ativo",   rarity: "1★", effect: "迴旋傷害 範圍 210%", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "專注打擊",       type: "Ativo",   rarity: "2★", effect: "集中突刺: 傷害 250% + 30% 加成 的 傷害 暴擊", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "武士道姿態",       type: "Toggle",  rarity: "2★", effect: "+20% P.ATK, +15% 暴擊率, -10% 物理防禦", cooldown: "5s", duration: "Toggle", note: "轉職後技能仍會保留" },
      { name: "武士刀專注",         type: "Passivo", rarity: "2★", effect: "裝備武士刀時暴擊率 +18%", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  ronin: {
    name: '浪人', parent: 'hatamoto', race: 'kamael', archetype: 'samurai', stage: 2,
    desc: '以毀滅性斬擊技巧獨自行走的浪人。',
    base: { atk: 58, def: 24, hp: 340, mp: 78, eva: 20, crit: 25, mdef: 18 },
    skills: [
      { name: "櫻花風暴",         type: "Ativo",   rarity: "3★", effect: "範圍傷害 利刃花瓣 360% + 流血 持續 6 秒", cooldown: "18s", duration: "6s", note: "轉職後技能仍會保留" },
      { name: "昇龍",        type: "Ativo",   rarity: "3★", effect: "昇龍斬: 傷害 340% + 擊飛 2 秒", cooldown: "16s", duration: null, note: "轉職後技能仍會保留" },
      { name: "反擊斬",        type: "Ativo",   rarity: "3★", effect: "反擊 致命: 傷害 380% 和 吸收 20% 的 傷害 受到的", cooldown: "20s", duration: null, note: "轉職後技能仍會保留" },
      { name: "榮譽準則",           type: "Self-Buff", rarity: "3★", effect: "+30% P.ATK, +25% 暴擊威力, +15% 攻擊速度 持續 120 秒", cooldown: "120s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "刀之道",      type: "Passivo", rarity: "3★", effect: "裝備刀刃武器時 P.ATK +20%、暴擊威力 +15%", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  samurai: {
    name: '武士', parent: 'ronin', race: 'kamael', archetype: 'samurai', stage: 3,
    desc: '精通傳說劍術的至高刀劍大師武士。',
    base: { atk: 110, def: 40, hp: 580, mp: 115, eva: 32, crit: 40, mdef: 28 },
    skills: [
      { name: "終極斬",                    type: "Ativo",   rarity: "4★", effect: "處決打擊：傷害 580%（目標 HP 低於 30% 時傷害加倍）", cooldown: "45s", duration: null, note: "轉職後技能仍會保留" },
      { name: "超越居合術",        type: "Ativo",   rarity: "4★", effect: "終極次元斬 750% + 無視 40% 的 防禦 目標的 + 流血 10 秒", cooldown: "120s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "武士之魂",               type: "Passivo", rarity: "3★", effect: "+25% P.ATK, +20% 暴擊威力, +15% 迴避", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "武士之軀",          type: "Passivo", rarity: "3★", effect: "+20% 最大 HP, +25% HP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",             type: "Passivo", rarity: "4★", effect: "+15% 所有 屬性, +20% 整體暴擊傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "武士終極和諧",   type: "Self-Buff", rarity: "4★", effect: "+60% P.ATK, +50% 暴擊率, +35% 攻擊速度 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },
    // ═══════════════════════════════════════════
  // DEATH KNIGHT (Human / Dark Elf)
  // ═══════════════════════════════════════════
  deathPilgrim: {
    name: '死亡朝聖者', race: 'human', archetype: 'deathknight', stage: 0,
    desc: '死亡朝聖者——黑暗旅程的起點。',
    base: { atk: 12, def: 8, hp: 90, mp: 45, eva: 5, crit: 6, mdef: 6 },
    skills: [
      { name: "死亡尖刺",     type: "Ativo",   rarity: "1★", effect: "傷害 黑暗 160%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "靈魂吸取",      type: "Ativo",   rarity: "1★", effect: "傷害 140% + 吸取 20% HP", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "DP 精通",      type: "Passivo", rarity: "1★", effect: "產生 死亡點數 攻擊時/擊殺", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  deathBlade: {
    name: '死亡之刃', parent: 'deathPilgrim', archetype: 'deathknight', stage: 1,
    desc: '死亡之刃——以侵略性的黑暗力量作戰。',
    base: { atk: 26, def: 14, hp: 165, mp: 62, eva: 8, crit: 10, mdef: 10 },
    skills: [
      { name: "死亡突襲",       type: "Ativo",   rarity: "1★", effect: "傷害 黑暗 200% + 擊退", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "黑暗之盾",      type: "Ativo",   rarity: "2★", effect: "吸收 2000 傷害 黑暗 持續 12 秒", cooldown: "30s", duration: "12s", note: "轉職後技能仍會保留" },
      { name: "黑暗武器",      type: "Self-Buff", rarity: "2★", effect: "+20% 黑暗傷害 持續 20 分鐘", cooldown: "45 min", duration: "20 min", note: "轉職後技能仍會保留" }
    ]
  },

  deathMessenger: {
    name: '死亡使者', parent: 'deathBlade', archetype: 'deathknight', stage: 2,
    desc: '死亡使者——施展毀滅性的黑暗攻擊。',
    base: { atk: 55, def: 30, hp: 380, mp: 95, eva: 12, crit: 16, mdef: 22 },
    skills: [
      { name: "黑暗爆炸",    type: "Ativo",   rarity: "2★", effect: "範圍傷害 黑暗 300% + 中毒 6 秒", cooldown: "22s", duration: "6s", note: "轉職後技能仍會保留" },
      { name: "死亡印記",        type: "Ativo",   rarity: "3★", effect: "標記 目標: +30% 黑暗傷害 受到的 10 秒", cooldown: "30s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "深淵凝視",        type: "Ativo",   rarity: "2★", effect: "傷害 黑暗 260% + 恐懼 3 秒", cooldown: "25s", duration: "3s", note: "轉職後技能仍會保留" },
      { name: "黑暗護甲",        type: "Self-Buff", rarity: "2★", effect: "+25% DEF 和 +15% 黑暗 抗性 持續 20 分鐘", cooldown: "50 min", duration: "20 min", note: "轉職後技能仍會保留" },
      { name: "死亡使者和諧", type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +25% 黑暗傷害, +20% DEF 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  deathKnight: {
    name: '死亡騎士', parent: 'deathMessenger', archetype: 'deathknight', stage: 3,
    desc: '死亡騎士——運用 Death Points 發動絕對的黑暗毀滅。',
    base: { atk: 105, def: 52, hp: 650, mp: 140, eva: 18, crit: 22, mdef: 38 },
    skills: [
      { name: "死亡風暴",                 type: "Ativo",   rarity: "3★", effect: "範圍傷害 黑暗 450% + 吸取 HP 範圍 20%", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
      { name: "致命反擊",              type: "Ativo",   rarity: "3★", effect: "反擊 黑暗 400% 被格擋時", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "終極死亡騎士",        type: "Ativo",   rarity: "4★", effect: "+80% ATK 和 黑暗傷害 持續 30 秒 (消耗 所有 DP)", cooldown: "120s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "超越死亡尖刺",     type: "Ativo",   rarity: "4★", effect: "傷害 黑暗 720% + 無視 DEF + 吸取 40% HP", cooldown: "180s", duration: null, note: "轉職後技能仍會保留" },
      { name: "死亡騎士意志",          type: "Passivo", rarity: "3★", effect: "+25% ATK, +20% 黑暗傷害, +15% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",             type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "死亡騎士和諧",         type: "Self-Buff", rarity: "4★", effect: "+60% ATK, +50% 黑暗傷害, +35% DEF 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ═══════════════════════════════════════════
  // WARG (Human Male)
  // ═══════════════════════════════════════════
  wargS0: {
    name: '戰狼', race: 'human', archetype: 'warg', stage: 0,
    desc: '能變身為狼形的原始戰士。',
    base: { atk: 12, def: 8, hp: 95, mp: 35, eva: 8, crit: 8, mdef: 4 },
    skills: [
      { name: "上挑打擊",      type: "Ativo",   rarity: "1★", effect: "傷害 160% + 擊飛", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "拳套精通",        type: "Passivo", rarity: "1★", effect: "+12% ATK 使用拳套時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "輕甲精通", type: "Passivo", rarity: "1★", effect: "+8% 迴避 裝備輕甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  wargS1: {
    name: '戰狼', parent: 'wargS0', archetype: 'warg', stage: 1,
    base: { atk: 26, def: 14, hp: 170, mp: 48, eva: 14, crit: 14, mdef: 8 },
    skills: [
      { name: "毀滅突擊", type: "Ativo",   rarity: "1★", effect: "傷害 200% (2 次命中)", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "強力雙拳",      type: "Ativo",   rarity: "2★", effect: "傷害 240% + 暈眩 2 秒", cooldown: "16s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "戰狼意志",         type: "Self-Buff", rarity: "2★", effect: "+20% ATK 和 +15% 暴擊 持續 20 分鐘", cooldown: "50 min", duration: "20 min", note: "轉職後技能仍會保留" }
    ]
  },

  wargS2: {
    name: '戰狼', parent: 'wargS1', archetype: 'warg', stage: 2,
    desc: '已解鎖狼形變身的戰狼。',
    base: { atk: 55, def: 25, hp: 360, mp: 72, eva: 22, crit: 22, mdef: 16 },
    skills: [
      { name: "狼形變身",        type: "Toggle",  rarity: "3★", effect: "變身 於 狼: 切換 技能, +30% ATK/速度", cooldown: "10s", duration: "60s max", note: "轉職後技能仍會保留" },
      { name: "雙爪打擊",         type: "Ativo",   rarity: "2★", effect: "傷害 280% (狼) (2 利爪)", cooldown: "12s", duration: null, note: "狼形態。轉職後技能仍會保留" },
      { name: "爪擊漩渦",            type: "Ativo",   rarity: "3★", effect: "範圍傷害 340% + 拉向 敵人 (狼)", cooldown: "22s", duration: null, note: "狼形態。轉職後技能仍會保留" },
      { name: "野性突進",                  type: "Ativo",   rarity: "2★", effect: "衝鋒 220% + 暈眩 2 秒 (狼)", cooldown: "15s", duration: "2s", note: "狼形態。轉職後技能仍會保留" },
      { name: "原始咆哮",                type: "Ativo",   rarity: "2★", effect: "降低 DEF 敵人 範圍 -25% 8 秒 (狼)", cooldown: "25s", duration: "8s", note: "狼形態。轉職後技能仍會保留" },
      { name: "月之恩典",               type: "Self-Buff", rarity: "2★", effect: "+15% 全屬性 持續 120 秒", cooldown: "120s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "混亂心智",              type: "Ativo",   rarity: "2★", effect: "啟用 變身 即時", cooldown: "30s", duration: null, note: "轉職後技能仍會保留" },
      { name: "堅韌皮膚",                 type: "Passivo", rarity: "2★", effect: "+20% 減益 抗性", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰狼和諧（階段 2）",     type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +25% 暴擊, +20% 迴避 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  wargS3: {
    name: '戰狼', parent: 'wargS2', archetype: 'warg', stage: 3,
    desc: '完整戰狼形態，以月之力量強化狼形變身。',
    base: { atk: 105, def: 42, hp: 580, mp: 108, eva: 38, crit: 38, mdef: 28 },
    skills: [
      { name: "超越雙爪打擊", type: "Ativo", rarity: "4★", effect: "傷害 620% (狼) + 流血 8 秒", cooldown: "160s", duration: "8s", note: "狼形態。轉職後技能仍會保留" },
      { name: "滿月",                       type: "Self-Buff", rarity: "4★", effect: "+50% 全屬性 狼形態下 持續 30 秒", cooldown: "180s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "遠古力量",                   type: "Self-Buff", rarity: "3★", effect: "+40% ATK 和 DEF 持續 60 秒", cooldown: "120s", duration: "60s", note: "轉職後技能仍會保留" },
      { name: "戰狼之魂",                     type: "Passivo", rarity: "3★", effect: "+25% ATK, +20% 暴擊, +15% 迴避", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰狼精通",                    type: "Passivo", rarity: "3★", effect: "+20% ATK 狼形態下, +15% 變身持續時間", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",                type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰狼和諧",                    type: "Self-Buff", rarity: "4★", effect: "+55% ATK, +45% 暴擊, +35% 迴避 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ═══════════════════════════════════════════
  // ASSASSIN (Human Male / Dark Elf Female)
  // ═══════════════════════════════════════════
  assassinS0: {
    name: '刺客', race: 'human', archetype: 'assassin', stage: 0,
    desc: '使用匕首狩獵暗影中的敵人。',
    base: { atk: 13, def: 6, hp: 80, mp: 40, eva: 12, crit: 12, mdef: 4 },
    skills: [
      { name: "暗殺",      type: "Ativo",   rarity: "1★", effect: "傷害 170% + 產生 1 刺客 匕首", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "暗影突進",        type: "Ativo",   rarity: "1★", effect: "傳送 短距離 + 隱形 2 秒", cooldown: "15s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "匕首精通",     type: "Passivo", rarity: "1★", effect: "+12% ATK 使用匕首時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "輕甲精通", type: "Passivo", rarity: "1★", effect: "+8% 迴避 裝備輕甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  assassinS1: {
    name: '刺客', parent: 'assassinS0', archetype: 'assassin', stage: 1,
    base: { atk: 26, def: 10, hp: 140, mp: 55, eva: 20, crit: 18, mdef: 6 },
    skills: [
      { name: "暗影打擊",      type: "Ativo",   rarity: "2★", effect: "傷害 240% 從背後 + 必定暴擊", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "刀刃突進",         type: "Ativo",   rarity: "1★", effect: "突進 200% + 產生 1 刺客 匕首", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "刺客之道", type: "Passivo", rarity: "2★", effect: "產生 刺客 匕首 對 擊殺 (最多 5)", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "刺客專注",   type: "Passivo", rarity: "1★", effect: "+10% 暴擊率, +10% 暴擊威力", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  assassinS2: {
    name: '刺客', parent: 'assassinS1', archetype: 'assassin', stage: 2,
    desc: '解鎖暗影系統的刺客。',
    base: { atk: 55, def: 18, hp: 280, mp: 82, eva: 35, crit: 30, mdef: 14 },
    skills: [
      { name: "幻影打擊",     type: "Ativo",   rarity: "2★", effect: "傷害 280% + 在目標位置召喚暗影", cooldown: "16s", duration: null, note: "轉職後技能仍會保留" },
      { name: "致命暗影",      type: "Ativo",   rarity: "3★", effect: "傷害 340% + 暗影 攻擊 一起 (340%)", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "殺意決心",    type: "Self-Buff", rarity: "3★", effect: "啟用 殘暴: +40% ATK 持續 20 秒 (需要 3 匕首)", cooldown: "60s", duration: "20s", note: "轉職後技能仍會保留" },
      { name: "連鎖擊殺",         type: "Ativo",   rarity: "2★", effect: "傷害 260% + 擊殺時重置暗殺技能冷卻", cooldown: "18s", duration: null, note: "轉職後技能仍會保留" },
      { name: "暗影步伐",        type: "Ativo",   rarity: "2★", effect: "傳送 背後 目標的", cooldown: "20s", duration: null, note: "轉職後技能仍會保留" },
      { name: "刺客印記",    type: "Ativo",   rarity: "2★", effect: "標記 目標: +25% 傷害 對 該目標 10 秒", cooldown: "25s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "殘暴",          type: "Passivo", rarity: "2★", effect: "持有 5 把匕首時自動獲得 ATK +15%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "刺客迴避", type: "Passivo", rarity: "2★", effect: "+15% 迴避, +10% 減益 抗性", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "刺客和諧（階段 2）", type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +30% 暴擊, +25% 迴避 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  assassinS3: {
    name: '刺客', parent: 'assassinS2', archetype: 'assassin', stage: 3,
    desc: '至高刺客——以致命暗影進行瞬間處決。',
    base: { atk: 108, def: 28, hp: 440, mp: 120, eva: 55, crit: 48, mdef: 22 },
    skills: [
      { name: "暗影爆發",                type: "Ativo",   rarity: "3★", effect: "所有 暗影 爆炸: 範圍傷害 450% 每次", cooldown: "35s", duration: null, note: "轉職後技能仍會保留" },
      { name: "超越暗殺",  type: "Ativo",   rarity: "4★", effect: "傷害 700% + 召喚 3 暗影 + 必定暴擊", cooldown: "180s", duration: null, note: "轉職後技能仍會保留" },
      { name: "變更外觀",           type: "Ativo",   rarity: "3★", effect: "專屬視覺 + 隱形 10 秒", cooldown: "120s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "暗影大師",           type: "Passivo", rarity: "4★", effect: "+25% ATK, +20% 暴擊, 暗影 獲得 +50% 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",            type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "刺客和諧",          type: "Self-Buff", rarity: "4★", effect: "+60% ATK, +50% 暴擊, +40% 迴避 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ═══════════════════════════════════════════
  // STORM BLASTER (Sylph)
  // ═══════════════════════════════════════════
  sylphGunner: {
    name: '風精靈槍手', race: 'sylph', archetype: 'gunner', stage: 0,
    desc: '操控元素力量的風精靈槍手。',
    base: { atk: 12, def: 5, hp: 75, mp: 45, eva: 14, crit: 10, mdef: 4 },
    skills: [
      { name: "快速射擊",          type: "Ativo",   rarity: "1★", effect: "傷害 150% 快速", cooldown: "6s", duration: null, note: "轉職後技能仍會保留" },
      { name: "槍械精通",         type: "Passivo", rarity: "1★", effect: "裝備火器時 ATK +12%", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "輕甲精通", type: "Passivo", rarity: "1★", effect: "+8% 迴避 裝備輕甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  sharpshooter: {
    name: '神射手', parent: 'sylphGunner', race: 'sylph', archetype: 'gunner', stage: 1,
    base: { atk: 26, def: 10, hp: 130, mp: 58, eva: 20, crit: 16, mdef: 6 },
    skills: [
      { name: "爆發射擊",         type: "Ativo",   rarity: "1★", effect: "傷害 200% (3 射擊 快速)", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "穿透射擊",      type: "Ativo",   rarity: "2★", effect: "傷害 220% + 穿透 目標 於 直線", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "迴避射擊",       type: "Ativo",   rarity: "1★", effect: "傷害 170% + 向後迴避", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "風行者",        type: "Passivo", rarity: "1★", effect: "+15% 移動速度", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  windSniper: {
    name: '風之狙擊手', parent: 'sharpshooter', race: 'sylph', archetype: 'gunner', stage: 2,
    base: { atk: 58, def: 18, hp: 260, mp: 85, eva: 32, crit: 28, mdef: 14 },
    skills: [
      { name: "狙擊",              type: "Ativo",   rarity: "3★", effect: "傷害 380% 遠距 + 暴擊 加成", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "快速射擊",         type: "Ativo",   rarity: "2★", effect: "+50% 攻擊速度 持續 15 秒", cooldown: "45s", duration: "15s", note: "轉職後技能仍會保留" },
      { name: "爆裂射擊",     type: "Ativo",   rarity: "2★", effect: "範圍傷害 280%", cooldown: "18s", duration: null, note: "轉職後技能仍會保留" },
      { name: "連鎖射擊",         type: "Ativo",   rarity: "2★", effect: "傷害 260% + 重置 快速射擊 CD", cooldown: "16s", duration: null, note: "轉職後技能仍會保留" },
      { name: "瞄準射擊",         type: "Ativo",   rarity: "3★", effect: "傷害 340% + 無視 DEF", cooldown: "20s", duration: null, note: "轉職後技能仍會保留" },
      { name: "風精靈恩典",      type: "Passivo", rarity: "2★", effect: "+15% 迴避, +10% 移動速度", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "風之狙擊手和諧", type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +25% 暴擊, +20% 射程 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  stormBlaster: {
    name: '暴風砲手', parent: 'windSniper', race: 'sylph', archetype: 'gunner', stage: 3,
    desc: '風暴射手——以槍械從遠距離造成毀滅性打擊。',
    base: { atk: 110, def: 28, hp: 420, mp: 125, eva: 48, crit: 48, mdef: 22 },
    skills: [
      { name: "暴風射擊",                  type: "Ativo",   rarity: "3★", effect: "風屬性傷害 420% + 擊退", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "風之彈幕",                type: "Ativo",   rarity: "3★", effect: "範圍傷害 風 380%", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "超越暴風射擊",     type: "Ativo",   rarity: "4★", effect: "風屬性傷害 680% + 暈眩 3 秒 + 範圍", cooldown: "180s", duration: "3s", note: "轉職後技能仍會保留" },
      { name: "暴風砲手之魂",        type: "Passivo", rarity: "3★", effect: "+25% ATK, +20% 暴擊, +15% 風屬性傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "暴風砲手之軀",   type: "Passivo", rarity: "3★", effect: "+15% 最大 HP, +10% 迴避, +10% 移動速度", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",            type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "暴風砲手和諧",       type: "Self-Buff", rarity: "4★", effect: "+60% ATK, +50% 暴擊, +35% 風屬性傷害 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ═══════════════════════════════════════════
  // HIGH ELF — DIVINE TEMPLAR / ELEMENT WEAVER / SHINEMAKER
  // ═══════════════════════════════════════════
  highElfBase: {
    name: '高等精靈', race: 'highelf', archetype: 'highelf', stage: 0,
    desc: '高等精靈——初步掌握神聖與元素力量。',
    base: { atk: 10, def: 10, hp: 90, mp: 75, matk: 12, mdef: 10, eva: 6, crit: 4 },
    skills: [
      { name: "神聖之光",         type: "Ativo",   rarity: "1★", effect: "神聖傷害 150%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "元素編織",    type: "Ativo",   rarity: "1★", effect: "傷害 元素 140%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "高等精靈精通",   type: "Passivo", rarity: "1★", effect: "+10% P.ATK 和 魔法攻擊", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "MP 提升",        type: "Passivo", rarity: "1★", effect: "+10% 最大 MP", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  divineTemplarBase: {
    name: '神聖聖騎士', parent: null, race: 'highelf', archetype: 'tank', stage: 0,
    desc: '初階神聖聖騎士——以盾牌與聖光守護盟友。',
    base: { atk: 12, def: 14, hp: 105, mp: 45, eva: 6, crit: 4, mdef: 10 },
    skills: [
      { name: "神聖打擊",        type: "Ativo",   rarity: "1★", effect: "神聖傷害 160%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "神聖之光",         type: "Ativo",   rarity: "1★", effect: "神聖傷害 140%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "神聖盾牌精通", type: "Passivo", rarity: "1★", effect: "+12% DEF 裝備盾牌時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "重甲精通", type: "Passivo", rarity: "1★", effect: "+10% DEF 裝備重甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  elementWeaverBase: {
    name: '元素編織者', parent: null, race: 'highelf', archetype: 'mage', stage: 0,
    desc: '初階元素編織者——引導火、冰與風之力。',
    base: { atk: 8, def: 8, hp: 80, mp: 85, matk: 16, mdef: 10, eva: 6, crit: 4 },
    skills: [
      { name: "火焰編織",    type: "Ativo", rarity: "1★", effect: "火屬性傷害 160%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "冰霜編織",     type: "Ativo", rarity: "1★", effect: "傷害 冰 150% + 緩速 15% 3 秒", cooldown: "8s", duration: "3s", note: "轉職後技能仍會保留" },
      { name: "風之編織",    type: "Ativo", rarity: "1★", effect: "風屬性傷害 150%", cooldown: "8s", duration: null, note: "轉職後技能仍會保留" },
      { name: "法袍精通",  type: "Passivo", rarity: "1★", effect: "+10% 魔法攻擊 裝備法袍時", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // Light Templar (Stage 1 - Lv 20)
  divineTemplarS1: {
    name: '光之聖殿騎士', parent: 'highElfBase', race: 'highelf', archetype: 'tank', stage: 1,
    base: { atk: 18, def: 28, hp: 200, mp: 65, eva: 6, crit: 4, mdef: 18 },
    skills: [
      { name: "神聖打擊",        type: "Ativo",   rarity: "1★", effect: "神聖傷害 190%", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "光之盾",    type: "Ativo",   rarity: "2★", effect: "吸收 2500 傷害 + 反射 神聖", cooldown: "30s", duration: "12s", note: "轉職後技能仍會保留" },
      { name: "神聖盾牌精通", type: "Passivo", rarity: "1★", effect: "+15% DEF 裝備盾牌時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "重甲精通", type: "Passivo", rarity: "1★", effect: "+15% DEF 裝備重甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },
  lightTemplar: {
    name: '光之聖殿騎士', parent: 'highElfBase', race: 'highelf', archetype: 'tank', stage: 1,
    base: { atk: 18, def: 28, hp: 200, mp: 65, eva: 6, crit: 4, mdef: 18 },
    skills: [
      { name: "神聖打擊",        type: "Ativo",   rarity: "1★", effect: "神聖傷害 190%", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "光之盾",    type: "Ativo",   rarity: "2★", effect: "吸收 2500 傷害 + 反射 神聖", cooldown: "30s", duration: "12s", note: "轉職後技能仍會保留" },
      { name: "神聖盾牌精通", type: "Passivo", rarity: "1★", effect: "+15% DEF 裝備盾牌時", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "重甲精通", type: "Passivo", rarity: "1★", effect: "+15% DEF 裝備重甲時", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  // Holy Templar (Stage 2 - Lv 40)
  divineTemplarS2: {
    name: '神聖聖殿騎士', parent: 'divineTemplarS1', race: 'highelf', archetype: 'tank', stage: 2,
    base: { atk: 38, def: 62, hp: 450, mp: 98, eva: 10, crit: 6, mdef: 38 },
    skills: [
      { name: "神聖衝鋒",           type: "Ativo",   rarity: "2★", effect: "衝鋒 260% + 嘲諷 範圍", cooldown: "18s", duration: null, note: "轉職後技能仍會保留" },
      { name: "神聖庇護",            type: "Ativo",   rarity: "3★", effect: "+60% 格擋率 + 反射 神聖 15 秒", cooldown: "60s", duration: "15s", note: "轉職後技能仍會保留" },
      { name: "天界懲戒",    type: "Ativo",   rarity: "2★", effect: "神聖傷害 280% + 沉默 3 秒", cooldown: "20s", duration: "3s", note: "轉職後技能仍會保留" },
      { name: "神聖鎖鏈",              type: "Ativo",   rarity: "2★", effect: "嘲諷 + 定身 目標 4 秒", cooldown: "22s", duration: "4s", note: "轉職後技能仍會保留" },
      { name: "神聖聖騎士和諧（S2）", type: "Self-Buff", rarity: "3★", effect: "+35% DEF, +25% ATK, +20% 魔法防禦 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },
  holyTemplar: {
    name: '神聖聖殿騎士', parent: 'lightTemplar', race: 'highelf', archetype: 'tank', stage: 2,
    base: { atk: 38, def: 62, hp: 450, mp: 98, eva: 10, crit: 6, mdef: 38 },
    skills: [
      { name: "神聖衝鋒",           type: "Ativo",   rarity: "2★", effect: "衝鋒 260% + 嘲諷 範圍", cooldown: "18s", duration: null, note: "轉職後技能仍會保留" },
      { name: "神聖庇護",            type: "Ativo",   rarity: "3★", effect: "+60% 格擋率 + 反射 神聖 15 秒", cooldown: "60s", duration: "15s", note: "轉職後技能仍會保留" },
      { name: "天界懲戒",    type: "Ativo",   rarity: "2★", effect: "神聖傷害 280% + 沉默 3 秒", cooldown: "20s", duration: "3s", note: "轉職後技能仍會保留" },
      { name: "神聖鎖鏈",              type: "Ativo",   rarity: "2★", effect: "嘲諷 + 定身 目標 4 秒", cooldown: "22s", duration: "4s", note: "轉職後技能仍會保留" },
      { name: "神聖聖騎士和諧（S2）", type: "Self-Buff", rarity: "3★", effect: "+35% DEF, +25% ATK, +20% 魔法防禦 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  // Divine Templar (Stage 3 - Lv 76)
  divineTemplarS3: {
    name: '神聖聖騎士', parent: 'divineTemplarS2', race: 'highelf', archetype: 'tank', stage: 3,
    desc: '神聖聖騎士——兼具神聖攻擊力與至高防禦力的坦克。',
    base: { atk: 72, def: 98, hp: 750, mp: 145, eva: 14, crit: 8, mdef: 68 },
    skills: [
      { name: "領主騎士",                   type: "Ativo",   rarity: "4★", effect: "神聖形態: +50% DEF 和 ATK 持續 30 秒 + 恢復 MP", cooldown: "120s", duration: "30s", note: "轉職後技能仍會保留" },
      { name: "神聖護盾",                 type: "Ativo",   rarity: "3★", effect: "吸收 8000 傷害 + 治癒 20% 對 結束", cooldown: "60s", duration: "15s", note: "轉職後技能仍會保留" },
      { name: "終極神聖防禦",       type: "Ativo",   rarity: "4★", effect: "完全免疫 10 秒 + 嘲諷 範圍 大量", cooldown: "300s", duration: "10s", note: "轉職後技能仍會保留" },
      { name: "超越神聖衝鋒",      type: "Ativo",   rarity: "4★", effect: "衝鋒 神聖傷害 650% + 暈眩 4 秒 + 範圍", cooldown: "180s", duration: "4s", note: "轉職後技能仍會保留" },
      { name: "領主騎士光環",            type: "Self-Buff", rarity: "3★", effect: "+30% DEF 和 +20% ATK 給隊伍 持續 120 秒", cooldown: "120s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "神聖聖騎士之魂",         type: "Passivo", rarity: "3★", effect: "+25% DEF, +20% 最大 HP, +15% 神聖傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "神聖聖騎士之軀",        type: "Passivo", rarity: "3★", effect: "+20% 最大 HP, +15% 魔法防禦, +15% HP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",              type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "神聖聖騎士和諧",        type: "Self-Buff", rarity: "4★", effect: "+60% DEF, +45% 最大 HP, +35% 神聖傷害 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // Element Weaver (stages 1-3)
  elementWeaverS1: {
    name: '元素編織者', parent: 'highElfBase', race: 'highelf', archetype: 'mage', stage: 1,
    base: { atk: 6, def: 8, hp: 100, mp: 120, matk: 28, mdef: 16, eva: 5, crit: 4 },
    skills: [
      { name: "火焰編織",    type: "Ativo", rarity: "1★", effect: "火屬性傷害 200%", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "冰霜編織",     type: "Ativo", rarity: "1★", effect: "傷害 冰 190% + 緩速 20% 3 秒", cooldown: "10s", duration: "3s", note: "轉職後技能仍會保留" },
      { name: "風之編織",    type: "Ativo", rarity: "1★", effect: "風屬性傷害 190%", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "法袍精通",  type: "Passivo", rarity: "1★", effect: "+10% 魔法攻擊 裝備法袍時", cooldown: null, duration: null, note: "轉職後技能仍會保留" }
    ]
  },

  elementWeaverS2: {
    name: '元素編織者', parent: 'elementWeaverS1', race: 'highelf', archetype: 'mage', stage: 2,
    base: { atk: 8, def: 14, hp: 170, mp: 260, matk: 68, mdef: 38, eva: 8, crit: 6 },
    skills: [
      { name: "元素爆發",        type: "Ativo",   rarity: "2★", effect: "傷害 元素 280%", cooldown: "16s", duration: null, note: "轉職後技能仍會保留" },
      { name: "元素匯聚",  type: "Ativo",   rarity: "3★", effect: "範圍傷害 全-元素 340%", cooldown: "25s", duration: null, note: "轉職後技能仍會保留" },
      { name: "終極驅散",        type: "Ativo",   rarity: "3★", effect: "移除 所有 增益 目標的", cooldown: "60s", duration: null, note: "轉職後技能仍會保留" },
      { name: "元素精通",      type: "Passivo", rarity: "2★", effect: "+15% 全 元素傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "元素編織者和諧（S2）", type: "Self-Buff", rarity: "3★", effect: "+35% 魔法攻擊, +25% 施法速度, +20% 元素傷害 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  elementWeaverS3: {
    name: '元素編織者', parent: 'elementWeaverS2', race: 'highelf', archetype: 'mage', stage: 3,
    desc: '元素編織者——至高的元素大師。',
    base: { atk: 12, def: 22, hp: 290, mp: 440, matk: 128, mdef: 65, eva: 12, crit: 8 },
    skills: [
      { name: "元素超載",          type: "Ativo",   rarity: "4★", effect: "範圍傷害 全-元素 580% + 燃燒/凍結/震擊 6 秒", cooldown: "60s", duration: "6s", note: "轉職後技能仍會保留" },
      { name: "三元素風暴",           type: "Ativo",   rarity: "4★", effect: "範圍傷害 650% (火+冰+風 連擊)", cooldown: "120s", duration: null, note: "轉職後技能仍會保留" },
      { name: "超越元素爆發", type: "Ativo",  rarity: "4★", effect: "範圍傷害 750% + 全 減益 元素", cooldown: "180s", duration: null, note: "轉職後技能仍會保留" },
      { name: "元素編織者之魂",       type: "Passivo", rarity: "3★", effect: "+25% 魔法攻擊, +20% 全 元素傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "元素編織者之軀",      type: "Passivo", rarity: "3★", effect: "+15% 最大 MP, +15% MP 恢復", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",            type: "Passivo", rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "元素編織者和諧",      type: "Self-Buff", rarity: "4★", effect: "+60% 魔法攻擊, +50% 元素傷害, +35% 施法速度 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },

  // ShineMaker (stages 1-3)
  shineMakerS1: {
    name: '光耀創造者', parent: 'highElfBase', race: 'highelf', archetype: 'support', stage: 1,
    base: { atk: 8, def: 10, hp: 110, mp: 110, matk: 24, mdef: 18, eva: 6, crit: 4 },
    skills: [
      { name: "光芒爆發",        type: "Ativo",     rarity: "1★", effect: "神聖傷害 190%", cooldown: "10s", duration: null, note: "轉職後技能仍會保留" },
      { name: "光輝打擊",     type: "Ativo",     rarity: "1★", effect: "神聖傷害 170% + 致盲 2 秒", cooldown: "12s", duration: "2s", note: "轉職後技能仍會保留" },
      { name: "淨化之光",    type: "Ativo",     rarity: "1★", effect: "移除 1 減益 的 盟友", cooldown: "12s", duration: null, note: "轉職後技能仍會保留" },
      { name: "光耀屏障",    type: "Self-Buff", rarity: "2★", effect: "+15% DEF 和 魔法防禦 持續 120 秒", cooldown: "60s", duration: "120s", note: "轉職後技能仍會保留" }
    ]
  },

  shineMakerS2: {
    name: '光耀創造者', parent: 'shineMakerS1', race: 'highelf', archetype: 'support', stage: 2,
    base: { atk: 14, def: 22, hp: 210, mp: 220, matk: 52, mdef: 42, eva: 10, crit: 6 },
    skills: [
      { name: "稜鏡射線",       type: "Ativo",     rarity: "2★", effect: "神聖傷害 280% + 緩速 30% 4 秒", cooldown: "16s", duration: "4s", note: "轉職後技能仍會保留" },
      { name: "光耀新星",        type: "Ativo",     rarity: "3★", effect: "範圍傷害 神聖 320% + 治癒 盟友 10%", cooldown: "22s", duration: null, note: "轉職後技能仍會保留" },
      { name: "水晶箭",       type: "Ativo",     rarity: "2★", effect: "神聖傷害 260%", cooldown: "14s", duration: null, note: "轉職後技能仍會保留" },
      { name: "創造之光",   type: "Self-Buff", rarity: "3★", effect: "+25% 魔法攻擊, +15% 治癒威力 持續 120 秒", cooldown: "120s", duration: "120s", note: "轉職後技能仍會保留" },
      { name: "璀璨光環",      type: "Party-Buff", rarity: "3★", effect: "+15% 全屬性 給隊伍 持續 300 秒", cooldown: "60s", duration: "300s", note: "轉職後技能仍會保留" },
      { name: "光耀創造者和諧（S2）", type: "Self-Buff", rarity: "3★", effect: "+35% 魔法攻擊, +25% 治癒威力, +20% 魔法防禦 持續 25 分鐘", cooldown: "60 min", duration: "25 min", note: "轉職後技能仍會保留" }
    ]
  },

  shineMakerS3: {
    name: '光耀創造者', parent: 'shineMakerS2', race: 'highelf', archetype: 'support', stage: 3,
    desc: '光之創造者——兼具神聖支援與攻擊能力。',
    base: { atk: 22, def: 38, hp: 350, mp: 400, matk: 98, mdef: 78, eva: 14, crit: 8 },
    skills: [
      { name: "光明波動",               type: "Ativo",     rarity: "3★", effect: "範圍傷害 神聖 400% + 治癒 盟友 20%", cooldown: "28s", duration: null, note: "轉職後技能仍會保留" },
      { name: "星辰墜落",                    type: "Ativo",     rarity: "4★", effect: "範圍傷害 神聖 580% + 暈眩 3 秒", cooldown: "60s", duration: "3s", note: "轉職後技能仍會保留" },
      { name: "超越星辰墜落",       type: "Ativo",     rarity: "4★", effect: "範圍傷害 神聖 750% + 致盲 5 秒 + 治癒 隊伍 30%", cooldown: "180s", duration: "5s", note: "轉職後技能仍會保留" },
      { name: "光耀創造者之魂",            type: "Passivo",   rarity: "3★", effect: "+25% 魔法攻擊, +20% 治癒威力, +15% 神聖傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "光耀創造者之軀",       type: "Passivo",   rarity: "3★", effect: "+15% 最大 MP, +15% MP 恢復, +10% 最大 HP", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "戰鬥大師",             type: "Passivo",   rarity: "4★", effect: "+10% 全屬性, +15% 對怪物 傷害", cooldown: null, duration: null, note: "轉職後技能仍會保留" },
      { name: "光耀創造者和諧", type: "Self-Buff", rarity: "4★", effect: "+55% 魔法攻擊, +45% 治癒威力, +35% 神聖傷害 持續 30 分鐘", cooldown: "90 min", duration: "30 min", note: "轉職後技能仍會保留" }
    ]
  },
  divineTemplar: {
    name: '神聖聖騎士', parent: 'holyTemplar', race: 'highelf', archetype: 'tank', stage: 3,
    desc: '神聖聖騎士——兼具神聖攻擊力與至高防禦力的坦克。',
    base: { atk: 72, def: 98, hp: 750, mp: 145, eva: 14, crit: 8, mdef: 68 },
    skills: [
      { name: "領主騎士",                   type: "Ativo",   rarity: "4★", effect: "神聖形態: +50% DEF 和 ATK 持續 30 秒 + 恢復 MP", cooldown: "120s", duration: "30s" },
      { name: "神聖庇護",            type: "Ativo",   rarity: "3★", effect: "+60% 格擋率 + 反射 神聖 15 秒", cooldown: "60s", duration: "15s" },
      { name: "終極神聖防禦",       type: "Ativo",   rarity: "4★", effect: "完全免疫 10 秒 + 嘲諷 範圍 大量", cooldown: "300s", duration: "10s" },
      { name: "神聖聖騎士和諧",        type: "Self-Buff", rarity: "4★", effect: "+60% DEF, +45% 最大 HP, +35% 神聖傷害 持續 30 分鐘", cooldown: "90 min", duration: "30 min" }
    ]
  },
  elementWeaver: {
    name: '元素編織者', parent: 'elementWeaverS2', race: 'highelf', archetype: 'mage', stage: 3,
    desc: '元素編織者——至高的元素大師。',
    base: { atk: 12, def: 22, hp: 290, mp: 440, matk: 128, mdef: 65, eva: 12, crit: 8 },
    skills: [
      { name: "元素超載",          type: "Ativo",   rarity: "4★", effect: "範圍傷害 全-元素 580%", cooldown: "60s", duration: "6s" },
      { name: "三元素風暴",           type: "Ativo",   rarity: "4★", effect: "範圍傷害 650%", cooldown: "120s", duration: null },
      { name: "元素編織者和諧",      type: "Self-Buff", rarity: "4★", effect: "+60% 魔法攻擊, +50% 元素傷害 持續 30 分鐘", cooldown: "90 min", duration: "30 min" }
    ]
  },

  // Warg (Human Beast Fighter)
  wargBase: {
    name: '座狼戰士', parent: null, race: 'human', archetype: 'fighter', stage: 0,
    base: { atk: 26, def: 12, hp: 120, mp: 40, eva: 8, crit: 8, mdef: 8 },
    skills: [
      { name: "野獸利爪",                 type: "Ativo",     rarity: "1★", effect: "造成 150% 物理傷害的猛烈爪擊", cooldown: "6s" },
      { name: "野性打擊",               type: "Ativo",     rarity: "1★", effect: "物理傷害 190% + 流血 3 秒", cooldown: "8s" },
      { name: "野獸咆哮",                 type: "Self-Buff", rarity: "1★", effect: "+15% ATK, +10% 攻擊速度 60 秒", cooldown: "45s" },
      { name: "狼之反射",              type: "Passivo",   rarity: "1★", effect: "+10% 移動速度 和 +8% 迴避", cooldown: null }
    ]
  },
  wargS1: {
    name: '座狼戰士', parent: 'wargBase', race: 'human', archetype: 'fighter', stage: 1,
    base: { atk: 34, def: 18, hp: 220, mp: 60, eva: 12, crit: 12, mdef: 14 },
    skills: [
      { name: "野獸利爪",                 type: "Ativo",     rarity: "1★", effect: "造成 170% 物理傷害的猛烈爪擊", cooldown: "6s" },
      { name: "野性打擊",               type: "Ativo",     rarity: "1★", effect: "物理傷害 210% + 流血 3 秒", cooldown: "8s" },
      { name: "野獸咆哮",                 type: "Self-Buff", rarity: "2★", effect: "+25% ATK, +20% 攻擊速度 60 秒", cooldown: "45s" },
      { name: "祖狼變身", type: "Self-Buff", rarity: "4★", effect: "變身: +50% ATK, +40% 暴擊傷害 持續 60 秒", cooldown: "90s" },
      { name: "吸血野性撕咬",        type: "Ativo",     rarity: "3★", effect: "吸血撕咬 240% + 恢復 40% 傷害轉為 HP", cooldown: "14s" }
    ]
  },
  wargS2: {
    name: '座狼戰士', parent: 'wargS1', race: 'human', archetype: 'fighter', stage: 2,
    base: { atk: 68, def: 32, hp: 440, mp: 90, eva: 18, crit: 18, mdef: 28 },
    skills: [
      { name: "野獸利爪",                 type: "Ativo",     rarity: "2★", effect: "造成 220% 物理傷害的銳利爪擊", cooldown: "6s" },
      { name: "狼群突襲",             type: "Ativo",     rarity: "2★", effect: "物理傷害 280% + 暈眩 3 秒", cooldown: "12s" },
      { name: "野獸咆哮",                 type: "Self-Buff", rarity: "2★", effect: "+30% ATK, +20% 攻擊速度 60 秒", cooldown: "45s" },
      { name: "祖狼變身", type: "Self-Buff", rarity: "4★", effect: "變身: +55% ATK, +40% 暴擊傷害 持續 60 秒", cooldown: "90s" },
      { name: "吸血野性撕咬",        type: "Ativo",     rarity: "3★", effect: "吸血撕咬 260% + 恢復 40% 傷害轉為 HP", cooldown: "14s" }
    ]
  },
  wargS3: {
    name: '座狼戰士', parent: 'wargS2', race: 'human', archetype: 'fighter', stage: 3,
    desc: '座狼戰士——能變身祖狼的野性戰士。',
    base: { atk: 138, def: 64, hp: 850, mp: 130, eva: 28, crit: 30, mdef: 55 },
    skills: [
      { name: "野獸利爪",                 type: "Ativo",     rarity: "2★", effect: "物理傷害 260% 使用祖傳利爪時", cooldown: "6s" },
      { name: "狼群突襲",             type: "Ativo",     rarity: "3★", effect: "猛烈突進 360% + 暈眩 持續 3 秒", cooldown: "12s" },
      { name: "野獸咆哮",                 type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +25% 攻擊速度 持續 120 秒", cooldown: "45s" },
      { name: "祖狼變身", type: "Self-Buff", rarity: "4★", effect: "變身為祖狼: +60% ATK, +45% 暴擊傷害 持續 60 秒", cooldown: "90s" },
      { name: "吸血野性撕咬",        type: "Ativo",     rarity: "4★", effect: "吸血撕咬 320% + 恢復 50% 傷害轉為 HP", cooldown: "14s" }
    ]
  },
  warg: {
    name: '座狼戰士', parent: null, race: 'human', archetype: 'fighter', stage: 3,
    desc: '座狼戰士——能變身祖狼並具備野性吸血能力的戰士。',
    base: { atk: 138, def: 64, hp: 850, mp: 130, eva: 28, crit: 30, mdef: 55 },
    skills: [
      { name: "野獸利爪",                 type: "Ativo",     rarity: "2★", effect: "物理傷害 260% 使用祖傳利爪時", cooldown: "6s" },
      { name: "狼群突襲",             type: "Ativo",     rarity: "3★", effect: "猛烈突進 360% + 暈眩 持續 3 秒", cooldown: "12s" },
      { name: "野獸咆哮",                 type: "Self-Buff", rarity: "3★", effect: "+35% ATK, +25% 攻擊速度 持續 120 秒", cooldown: "45s" },
      { name: "祖狼變身", type: "Self-Buff", rarity: "4★", effect: "變身為祖狼: +60% ATK, +45% 暴擊傷害 持續 60 秒", cooldown: "90s" },
      { name: "吸血野性撕咬",        type: "Ativo",     rarity: "4★", effect: "吸血撕咬 320% + 恢復 50% 傷害轉為 HP", cooldown: "14s" }
    ]
  },

  // ─── SHINEMAKER (Dwarf Exclusive) ───
  shineMakerBase: {
    name: '光耀創造者', parent: 'dwarfFighter', race: 'dwarf', archetype: 'support', stage: 0,
    desc: '光耀創造者——操控光能與水晶支援的矮人工匠。',
    base: { atk: 12, def: 18, hp: 120, mp: 90, matk: 18, mdef: 16, eva: 6, crit: 6 },
    skills: [
      { name: "光之火花",                  type: "Ativo",     rarity: "1★", effect: "以光輝戰鎚造成 160% 神聖傷害", cooldown: "8s" },
      { name: "光耀輝光",                type: "Self-Buff", rarity: "1★", effect: "+15% 魔法攻擊 和 +10% 物理防禦", cooldown: "60s" },
      { name: "水晶武器精通",       type: "Passivo",   rarity: "1★", effect: "裝備戰鎚／鈍器時 ATK +15%", cooldown: null },
      { name: "光耀創造者和諧",         type: "Self-Buff", rarity: "1★", effect: "+20% 魔法攻擊, +20% 物理防禦 持續 30 分鐘", cooldown: "30 min" }
    ]
  },
  shinemaker: {
    name: '光耀創造者', parent: 'shineMakerS2', race: 'dwarf', archetype: 'support', stage: 3,
    desc: '光之創造者——具備天界力量與光屬性攻擊的矮人神聖支援職。',
    base: { atk: 26, def: 42, hp: 420, mp: 420, matk: 110, mdef: 86, eva: 16, crit: 10 },
    skills: [
      { name: "星辰墜落",                    type: "Ativo",     rarity: "4★", effect: "範圍傷害 神聖 580% + 暈眩 3 秒", cooldown: "45s" },
      { name: "超越星辰墜落",       type: "Ativo",     rarity: "4★", effect: "範圍傷害 神聖 750% + 致盲 5 秒", cooldown: "120s" },
      { name: "神聖水晶庇護",         type: "Ativo",     rarity: "4★", effect: "神聖防護屏障 會 吸收 35% 的 傷害 最大", cooldown: "60s" },
      { name: "光耀創造者終極和諧", type: "Self-Buff", rarity: "4★", effect: "+60% 魔法攻擊, +50% 物理防禦, +40% 治癒 持續 30 分鐘", cooldown: "90 min" }
    ]
  },
  shinemakerS1: {
    name: '光耀創造者', parent: 'dwarfFighter', race: 'dwarf', archetype: 'support', stage: 1,
    base: { atk: 18, def: 24, hp: 190, mp: 180, matk: 45, mdef: 32, eva: 10, crit: 8 },
    skills: [
      { name: "光之火花",                  type: "Ativo",     rarity: "1★", effect: "神聖傷害 190%", cooldown: "8s" },
      { name: "光耀輝光",                type: "Self-Buff", rarity: "2★", effect: "+20% 魔法攻擊 和 +15% 施法速度", cooldown: "60s" },
      { name: "水晶祝福",             type: "Passivo",   rarity: "1★", effect: "+15% 最大 MP 和 +12% MP 恢復", cooldown: null }
    ]
  },
  shinemakerS2: {
    name: '光耀創造者', parent: 'shinemakerS1', race: 'dwarf', archetype: 'support', stage: 2,
    base: { atk: 28, def: 36, hp: 320, mp: 300, matk: 82, mdef: 60, eva: 14, crit: 10 },
    skills: [
      { name: "稜鏡爆發",                  type: "Ativo",     rarity: "2★", effect: "範圍傷害 神聖 280%", cooldown: "14s" },
      { name: "光耀屏障",                type: "Ativo",     rarity: "3★", effect: "護盾 神聖 的 25% 最大 HP 持續 20 秒", cooldown: "35s" },
      { name: "光輝戰鎚打擊",        type: "Ativo",     rarity: "3★", effect: "物理傷害/神聖 320% + 降低防禦 目標的 20%", cooldown: "18s" }
    ]
  },
  shinemakerS3: {
    name: '光耀創造者', parent: 'shinemakerS2', race: 'dwarf', archetype: 'support', stage: 3,
    base: { atk: 38, def: 52, hp: 580, mp: 520, matk: 145, mdef: 98, eva: 20, crit: 14 },
    skills: [
      { name: "星辰墜落",                    type: "Ativo",     rarity: "4★", effect: "範圍傷害 神聖 580% + 暈眩 3 秒", cooldown: "45s" },
      { name: "超越星辰墜落",       type: "Ativo",     rarity: "4★", effect: "範圍傷害 神聖 750% + 致盲 5 秒", cooldown: "120s" },
      { name: "光耀創造者和諧",         type: "Self-Buff", rarity: "4★", effect: "+55% 魔法攻擊, +45% 治癒威力 持續 30 分鐘", cooldown: "90 min" }
    ]
  },

  // ─── BLOOD ROSE (Dark Elf Exclusive — Espinhos Sombrios & Magia de Sangue) ───
  bloodRoseBase: {
    name: '血玫瑰', parent: null, race: 'darkelf', archetype: 'mage', stage: 0,
    desc: '血玫瑰——侍奉席琳的黑暗精靈秘術師，精通黑暗荊棘與生命汲取。',
    base: { atk: 12, def: 10, hp: 110, mp: 130, matk: 30, mdef: 18, eva: 8, crit: 8 },
    skills: [
      { name: "玫瑰花瓣打擊",            type: "Ativo",     rarity: "1★", effect: "黑暗傷害 160% 發射 利刃花瓣", cooldown: "6s" },
      { name: "黑暗荊棘護盾",            type: "Passivo",   rarity: "1★", effect: "+15% 魔法防禦 和 反射 10% 的 物理傷害 於 荊棘", cooldown: null },
      { name: "血色脈動",               type: "Ativo",     rarity: "1★", effect: "脈動 的 血: 傷害 140% + 吸取 30% 於 HP", cooldown: "8s" },
      { name: "血玫瑰和諧",           type: "Self-Buff", rarity: "1★", effect: "+20% 魔法攻擊, +15% 吸血 持續 30 分鐘", cooldown: "30 min" }
    ]
  },
  bloodRoseS1: {
    name: '血玫瑰', parent: 'bloodRoseBase', race: 'darkelf', archetype: 'mage', stage: 1,
    desc: '血玫瑰——操控血色荊棘的黑暗祭司。',
    base: { atk: 16, def: 18, hp: 190, mp: 230, matk: 60, mdef: 36, eva: 12, crit: 10 },
    skills: [
      { name: "緋紅荊棘",               type: "Ativo",     rarity: "1★", effect: "爆發 的 荊棘: 魔法傷害 210% + 流血 5 秒", cooldown: "8s" },
      { name: "血色汲取",               type: "Ativo",     rarity: "2★", effect: "傷害 暗影 200% + 吸收 50% 傷害轉為 HP", cooldown: "10s" },
      { name: "荊棘護甲精通",          type: "Passivo",   rarity: "1★", effect: "+15% 魔法攻擊 的 黑暗 和 +10% 迴避", cooldown: null },
      { name: "席琳詛咒",            type: "Ativo",     rarity: "2★", effect: "黑暗詛咒: 降低 物理防禦 和 魔法防禦 目標的 於 20%", cooldown: "16s" }
    ]
  },
  bloodRoseS2: {
    name: '血玫瑰', parent: 'bloodRoseS1', race: 'darkelf', archetype: 'mage', stage: 2,
    desc: '血玫瑰——支配席琳褻瀆花園的主人。',
    base: { atk: 25, def: 30, hp: 340, mp: 380, matk: 105, mdef: 65, eva: 18, crit: 15 },
    skills: [
      { name: "黑玫瑰花瓣之舞",       type: "Ativo",     rarity: "3★", effect: "以黑玫瑰風暴造成 360% 褻瀆範圍傷害", cooldown: "18s" },
      { name: "荊棘擁抱",                type: "Ativo",     rarity: "3★", effect: "囚禁 目標 於 荊棘 黑暗: 傷害 320% + 定身 3 秒", cooldown: "16s" },
      { name: "吸血之花",             type: "Ativo",     rarity: "3★", effect: "綻放 吸血: 傷害 300% + 吸血 大量 的 60%", cooldown: "15s" },
      { name: "流血荊棘精通",       type: "Passivo",   rarity: "3★", effect: "+20% 魔法暴擊傷害 和 +15% 效果 的 流血", cooldown: null }
    ]
  },
  bloodRoseS3: {
    name: '血玫瑰', parent: 'bloodRoseS2', race: 'darkelf', archetype: 'mage', stage: 3,
    desc: '血玫瑰——席琳荊棘的至高女王。',
    base: { atk: 42, def: 52, hp: 620, mp: 620, matk: 180, mdef: 105, eva: 25, crit: 20 },
    skills: [
      { name: "玫瑰花園爆發",            type: "Ativo",     rarity: "4★", effect: "黑色花園爆發: 範圍傷害 680% + 吸取 35% 總傷害 給 治癒英雄", cooldown: "60s" },
      { name: "血荊棘風暴",            type: "Ativo",     rarity: "4★", effect: "血荊棘浩劫風暴 820% + 深度流血 10 秒", cooldown: "120s" },
      { name: "荊棘女王光環",         type: "Passivo",   rarity: "4★", effect: "+25% 黑暗魔法傷害, +20% 永久吸血", cooldown: null },
      { name: "血玫瑰終極和諧",  type: "Self-Buff", rarity: "4★", effect: "+65% 魔法攻擊, +40% 吸血, +30% 施法速度 持續 30 分鐘", cooldown: "90 min" }
    ]
  },
  bloodRose: {
    name: '血玫瑰', parent: 'bloodRoseS2', race: 'darkelf', archetype: 'mage', stage: 3,
    desc: '血玫瑰——席琳荊棘的至高女王。',
    base: { atk: 42, def: 52, hp: 620, mp: 620, matk: 180, mdef: 105, eva: 25, crit: 20 },
    skills: [
      { name: "玫瑰花園爆發",            type: "Ativo",     rarity: "4★", effect: "黑色花園爆發: 範圍傷害 680% + 吸取 35% 總傷害 給 治癒英雄", cooldown: "60s" },
      { name: "血荊棘風暴",            type: "Ativo",     rarity: "4★", effect: "血荊棘浩劫風暴 820% + 深度流血 10 秒", cooldown: "120s" },
      { name: "荊棘女王光環",         type: "Passivo",   rarity: "4★", effect: "+25% 黑暗魔法傷害, +20% 永久吸血", cooldown: null },
      { name: "血玫瑰終極和諧",  type: "Self-Buff", rarity: "4★", effect: "+65% 魔法攻擊, +40% 吸血, +30% 施法速度 持續 30 分鐘", cooldown: "90 min" }
    ]
  },

  // ─── ERTHEIA MARAUDER & EVISCERATOR (Ertheia Martial Brawler) ───
  marauderBase: {
    name: '艾爾提亞戰士', parent: null, race: 'ertheia', archetype: 'fighter', stage: 0,
    desc: '艾爾提亞戰士——駕馭賽哈之風、擅長高速近身戰鬥的武鬥家。',
    base: { atk: 16, def: 10, hp: 120, mp: 40, eva: 12, crit: 10, mdef: 8 },
    skills: [
      { name: "猛擊",                type: "Ativo",     rarity: "1★", effect: "快速拳擊: 物理傷害 160%", cooldown: "6s" },
      { name: "賽哈風步",              type: "Self-Buff", rarity: "1★", effect: "+15% 迴避 和 +15% 移動速度", cooldown: "45s" },
      { name: "拳術精通",                 type: "Passivo",   rarity: "1★", effect: "裝備利爪／拳套時 P.ATK +15%", cooldown: null },
      { name: "賽哈和諧",              type: "Self-Buff", rarity: "1★", effect: "+20% P.ATK, +15% 攻擊速度 持續 30 分鐘", cooldown: "30 min" }
    ]
  },
  marauder: {
    name: '掠襲者', parent: 'marauderBase', race: 'ertheia', archetype: 'fighter', stage: 1,
    desc: '掠襲者——擅長高速風系連擊與空中攻擊。',
    base: { atk: 34, def: 18, hp: 210, mp: 65, eva: 18, crit: 15, mdef: 14 },
    skills: [
      { name: "扭曲拳",             type: "Ativo",     rarity: "1★", effect: "扭曲拳: 傷害 220% + 暈眩 1.5 秒", cooldown: "8s" },
      { name: "融風打擊",            type: "Ativo",     rarity: "2★", effect: "風屬性突進：傷害 240%，暴擊率 +30%", cooldown: "10s" },
      { name: "空中連擊",                 type: "Ativo",     rarity: "2★", effect: "空中連擊: 傷害 260% + 擊飛 敵人 對 空中", cooldown: "12s" },
      { name: "報復反擊",          type: "Passivo",   rarity: "1★", effect: "+15% 迴避；成功閃避時以 100% 傷害反擊", cooldown: null }
    ]
  },
  ertheiaWarrior: {
    name: '裂空者', parent: 'marauder', race: 'ertheia', archetype: 'fighter', stage: 2,
    desc: '裂空者——能撕裂氣流並摧毀防禦的致命武鬥家。',
    base: { atk: 70, def: 32, hp: 440, mp: 95, eva: 28, crit: 24, mdef: 28 },
    skills: [
      { name: "重力震波",            type: "Ativo",     rarity: "3★", effect: "重力震波: 範圍傷害 360% + 擊退", cooldown: "16s" },
      { name: "裂空斬",             type: "Ativo",     rarity: "3★", effect: "裂空斬：物理傷害 380%，附帶高額暴擊加成", cooldown: "14s" },
      { name: "颶風迴旋踢",          type: "Ativo",     rarity: "3★", effect: "颶風踢 360º: 傷害 340% 於 範圍", cooldown: "15s" },
      { name: "風之戰士精通",         type: "Passivo",   rarity: "3★", effect: "+20% P.ATK, +20% 暴擊率 和 +15% 攻擊速度", cooldown: null }
    ]
  },
  eviscerator: {
    name: '裂空者', parent: 'ertheiaWarrior', race: 'ertheia', archetype: 'fighter', stage: 3,
    desc: '帝國裂空者——掌握賽哈次元力量的至高近戰大師。',
    base: { atk: 140, def: 60, hp: 860, mp: 140, eva: 42, crit: 35, mdef: 56 },
    skills: [
      { name: "終極裂空連擊",    type: "Ativo",     rarity: "4★", effect: "10 段終極武鬥連擊：傷害 800% + 暴擊率 100%", cooldown: "60s" },
      { name: "時空湮滅",       type: "Ativo",     rarity: "4★", effect: "毀滅性次元扭曲: 範圍傷害 880% + 破防 30%", cooldown: "120s" },
      { name: "賽哈神聖守護",    type: "Passivo",   rarity: "4★", effect: "+25% 迴避, +20% 減免 的 物理傷害 受到的", cooldown: null },
      { name: "裂空者終極和諧", type: "Self-Buff", rarity: "4★", effect: "+60% P.ATK, +40% 暴擊威力, +35% 攻擊速度 持續 30 分鐘", cooldown: "90 min" }
    ]
  },

  // ─── SAYHA SEEKER & SEER (Ertheia Wind Mage) ───
  sayhaMageBase: {
    name: '賽哈法師', parent: null, race: 'ertheia', archetype: 'mage', stage: 0,
    desc: '艾爾提亞秘法師——召喚賽哈狂風的元素施法者。',
    base: { atk: 10, def: 10, hp: 100, mp: 130, matk: 26, mdef: 18, eva: 10, crit: 6 },
    skills: [
      { name: "賽哈之風",                 type: "Ativo",     rarity: "1★", effect: "爆發 的 風 切割: 魔法傷害 160%", cooldown: "6s" },
      { name: "風之帷幕",                    type: "Self-Buff", rarity: "1★", effect: "+15% 魔法攻擊 和 +12% 迴避 持續 60 秒", cooldown: "45s" },
      { name: "艾爾提亞魔法精通",        type: "Passivo",   rarity: "1★", effect: "裝備法杖時魔法攻擊 +15%", cooldown: null },
      { name: "賽哈先知和諧",         type: "Self-Buff", rarity: "1★", effect: "+20% 魔法攻擊, +20% 傷害 的 風 持續 30 分鐘", cooldown: "30 min" }
    ]
  },
  sayhaSeer: {
    name: '賽哈追尋者', parent: 'sayhaMageBase', race: 'ertheia', archetype: 'mage', stage: 1,
    desc: '賽哈追尋者——引導氣流與暴風的施法者。',
    base: { atk: 14, def: 16, hp: 170, mp: 210, matk: 55, mdef: 32, eva: 16, crit: 8 },
    skills: [
      { name: "賽哈風擊",          type: "Ativo",     rarity: "1★", effect: "集中風屬性傷害 210%", cooldown: "7s" },
      { name: "烈風爆發",                   type: "Ativo",     rarity: "2★", effect: "空氣爆發：傷害 240% + 使敵人緩速 3 秒", cooldown: "10s" },
      { name: "風暴之眼",             type: "Passivo",   rarity: "1★", effect: "+15% 施法速度 和 +10% 魔法防禦", cooldown: null }
    ]
  },
  windRiderErth: {
    name: '賽哈追尋者', parent: 'sayhaSeer', race: 'ertheia', archetype: 'mage', stage: 2,
    desc: '御風者——能駕馭毀滅性颱風的法師。',
    base: { atk: 22, def: 28, hp: 320, mp: 360, matk: 98, mdef: 60, eva: 24, crit: 12 },
    skills: [
      { name: "颱風打擊",               type: "Ativo",     rarity: "3★", effect: "切割颱風: 範圍傷害 的 風 360%", cooldown: "16s" },
      { name: "旋風爆裂",                type: "Ativo",     rarity: "3★", effect: "上升氣旋：傷害 340% + 擊飛 2 秒", cooldown: "14s" },
      { name: "風之領域",                  type: "Passivo",   rarity: "3★", effect: "+20% 風屬性傷害 和 +15% 魔法暴擊率", cooldown: null }
    ]
  },
  sayhaSeeker: {
    name: '賽哈追尋者', parent: 'windRiderErth', race: 'ertheia', archetype: 'mage', stage: 3,
    desc: '賽哈至高大師——統御亞丁狂風與暴雨的風暴支配者。',
    base: { atk: 38, def: 48, hp: 580, mp: 580, matk: 175, mdef: 100, eva: 34, crit: 18 },
    skills: [
      { name: "賽哈終極風暴",       type: "Ativo",     rarity: "4★", effect: "賽哈終極風暴: 範圍傷害 820% + 驅散 和 緩速 於 群體", cooldown: "60s" },
      { name: "時空漩渦",             type: "Ativo",     rarity: "4★", effect: "風之次元漩渦：傷害 860%，附帶高額魔法穿透", cooldown: "120s" },
      { name: "風之精靈超越",    type: "Passivo",   rarity: "4★", effect: "+25% 魔法攻擊, +20% 魔法暴擊傷害, +20% 迴避 永久", cooldown: null },
      { name: "賽哈追尋者終極和諧", type: "Self-Buff", rarity: "4★", effect: "+65% 魔法攻擊, +45% 傷害 的 風, +35% 施法速度 持續 30 分鐘", cooldown: "90 min" }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.EchoData = { RACES_ECHO, CLASSES_ECHO };
  window.GameData = window.GameData || {};
  window.GameData.RACES_ECHO = RACES_ECHO;
  window.GameData.CLASSES_ECHO = CLASSES_ECHO;
}

export { RACES_ECHO, CLASSES_ECHO };


