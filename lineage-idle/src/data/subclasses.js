/**
 * Módulo de dados autêntico do Subclass System MasterWork
 */

export const FATE_WHISPER_MIN_LEVEL = 52;
export const SUBCLASS_MAX_LEVEL = 85;

export { SUBCLASS_ARCHETYPES, EMERGENT_ABILITIES, MASTER_ABILITIES_BY_ARCHETYPE } from '../services/SubclassCertificationService.js';

export const EMERGENT_SKILLS = {
  physAtk: { name: '副職業能力：物理攻擊', levels: [18, 36, 63], desc: '提升物理攻擊' },
  magAtk: { name: '副職業能力：魔法攻擊', levels: [12, 24, 42], desc: '提升魔法攻擊' },
  physDef: { name: '副職業能力：物理防禦', heavy: [18, 36, 63], light: [13, 26, 46], robe: [9, 18, 32], desc: '提升由防具提供的物理防禦' },
  magDef: { name: '副職業能力：魔法防禦', levels: [15, 30, 53], desc: '提升魔法防禦' },
  castSpd: { name: '副職業能力：施法速度', levels: [8, 16, 28], desc: '提升施法速度' },
  critRate: { name: '副職業能力：物理暴擊率', levels: [7, 14, 25], desc: '提升物理暴擊率' },
  moveSpeed: { name: '副職業能力：移動速度', levels: [1, 2, 4], desc: '提升移動速度' }
};

export const MASTER_ABILITIES = {
  boostHp: { id: 'boostHp', name: '強化生命值', icon: '❤️', desc: '最大 生命值 +8%、生命值 恢復 +20%' },
  boostMp: { id: 'boostMp', name: '強化魔力', icon: '💙', desc: '最大 魔力 +12%、魔力 恢復 +20%' },
  evasion: { id: 'evasion', name: '迴避', icon: '👟', desc: '迴避 +5、技能迴避 +5%' },
  longShot: { id: 'longShot', name: '遠射', icon: '🏹', desc: '弓射程 +100／弩射程 +50' },
  prayer: { id: 'prayer', name: '祈禱', icon: '✨', desc: '受到治療效果 +15%' },
  resistTrait: { id: 'resistTrait', name: '異常抗性', icon: '🛡️', desc: '減益與解除抗性 +10%' },
  haste: { id: 'haste', name: '急速觸發', icon: '⚡', desc: '攻擊時有 2% 機率獲得 攻擊速度 +32%' },
  defence: { id: 'defence', name: '防禦觸發', icon: '🛡️', desc: '受到攻擊時有 2% 機率獲得 物理防禦／魔法防禦 +24%' },
  criticalChance: { id: 'criticalChance', name: '暴擊觸發', icon: '💥', desc: '攻擊時有 2% 機率獲得暴擊率 +32%' },
  barrier: { id: 'barrier', name: '屏障（天界護盾）', icon: '🌟', desc: '受到攻擊時有 2% 機率獲得無敵天界護盾' },
  boostCp: { id: 'boostCp', name: '強化戰鬥力', icon: '🛡️', desc: '最大戰鬥力 +20%、戰鬥力恢復 +35%' },
  divineProtection: { id: 'divineProtection', name: '神聖防護', icon: '✝️', desc: '神聖與黑暗抗性 +30' },
  resistCritical: { id: 'resistCritical', name: '暴擊抗性', icon: '🛑', desc: '受到暴擊傷害 -10%' },
  resistAttribute: { id: 'resistAttribute', name: '元素抗性', icon: '🔥', desc: '元素抗性（火／水／風／地）+20' },
  spirit: { id: 'spirit', name: '精神觸發', icon: '👻', desc: '受到攻擊時有 2% 機率獲得 物理攻擊、魔法攻擊、攻擊速度 +8%' }
};

export const DIVINE_TRANSFORMATIONS = {
  divineWarrior: {
    id: 'divineWarrior',
    name: '變身：神聖戰士',
    icon: '⚔️',
    desc: '神聖戰士擁有戰吼（物理攻擊 +25%）、音速爆破與戰士犧牲（物理攻擊 +20%）。',
    buffs: { atkMult: 0.25, critDmgMult: 0.15 }
  },
  divineKnight: {
    id: 'divineKnight',
    name: '變身：神聖騎士',
    icon: '🛡️',
    desc: '神聖騎士擁有極限防禦（防禦 +100%）、仇恨光環與騎士犧牲。',
    buffs: { defMult: 0.50, mdefMult: 0.50 }
  },
  divineRogue: {
    id: 'divineRogue',
    name: '變身：神聖刺客',
    icon: '🗡️',
    desc: '神聖刺客擁有暈眩射擊、雙重射擊、敏捷（迴避 +4）與戰鬥力汲取。',
    buffs: { critRateAdd: 40, evaAdd: 6 }
  },
  divineWizard: {
    id: 'divineWizard',
    name: '變身：神聖法師',
    icon: '🔮',
    desc: '神聖法師擁有神聖閃焰、神聖打擊與範圍睡眠（神聖之雲）。',
    buffs: { matkMult: 0.30, castSpdAdd: 50 }
  },
  divineSummoner: {
    id: 'divineSummoner',
    name: '變身：神聖召喚師',
    icon: '🦄',
    desc: '神聖召喚師擁有傷害轉移、終極召喚獸與神聖召喚。',
    buffs: { hpMult: 0.20, lifestealAdd: 0.05 }
  },
  divineHealer: {
    id: 'divineHealer',
    name: '變身：神聖治療者',
    icon: '🕊️',
    desc: '神聖治療者擁有強效治療、淨化、70% 復活與範圍治療。',
    buffs: { regenHpAdd: 0.05, mdefMult: 0.25 }
  },
  divineEnchanter: {
    id: 'divineEnchanter',
    name: '變身：神聖輔助者',
    icon: '📜',
    desc: '神聖輔助者擁有火／水／風預言與勝利之歌（屬性 +10%、暴擊 +20%）。',
    buffs: { atkMult: 0.15, matkMult: 0.15, speedMult: 0.15, castSpdAdd: 30 }
  }
};
