/**
 * clan.js — Definições e Regras de Clãs do Lineage Idle.
 *
 * Contém a progressão de Nível de Clã (1 a 5), Habilidades de Clã (Clan Skills),
 * custos de evolução e requisitos para participação em Siege de Castelos.
 */

export const CLAN_LEVEL_DATA = {
  1: {
    level: 1,
    title: '初級血盟',
    reqCharLevel: 20,
    costAdena: 100000,
    costSp: 10000,
    reqItem: null,
    maxMembers: 15,
    unlockedSkills: ['clan_imperium'],
    desc: '血盟創立階段。解鎖盟徽與血盟帝國技能（+HP／CP）。'
  },
  2: {
    level: 2,
    title: '資深血盟',
    reqCharLevel: 40,
    costAdena: 500000,
    costSp: 50000,
    reqItem: null,
    maxMembers: 30,
    unlockedSkills: ['clan_might'],
    desc: '提升軍事力量，解鎖血盟力量（+P.Atk）。'
  },
  3: {
    level: 3,
    title: '騎士血盟',
    reqCharLevel: 55,
    costAdena: 2000000,
    costSp: 200000,
    reqItem: { id: 'blood_mark', name: '血之印記（Blood Mark）', count: 1 },
    maxMembers: 60,
    unlockedSkills: ['clan_shield'],
    desc: '受到貴族認可的血盟，解鎖血盟護盾（+P.Def）。'
  },
  4: {
    level: 4,
    title: '戰爭同盟',
    reqCharLevel: 70,
    costAdena: 10000000,
    costSp: 500000,
    reqItem: { id: 'alliance_manifesto', name: '同盟宣言', count: 1 },
    maxMembers: 100,
    unlockedSkills: ['clan_empower', 'clan_magic_barrier'],
    desc: '擁有更高階的魔法與軍事力量，解鎖血盟增幅（+M.Atk）與血盟魔法屏障（+M.Def）。'
  },
  5: {
    level: 5,
    title: '王國帝國騎士團',
    reqCharLevel: 76,
    costAdena: 25000000,
    costSp: 1500000,
    reqItem: { id: 'seal_of_aspiration', name: '志向封印', count: 1 },
    maxMembers: 150,
    unlockedSkills: ['clan_vitality'],
    desc: '血盟貴族的頂點。解鎖血盟活力（恢復／速度）並取得宣告城堡攻城戰的資格！'
  }
};

export const CLAN_SKILLS = {
  clan_imperium: {
    id: 'clan_imperium',
    name: '血盟帝國 🛡️',
    levelReq: 1,
    icon: 'gradespecial/scrolls/scroll_blessed_armor_s.png',
    desc: '成員最大 HP +10%、最大 CP +15%。',
    stats: { hpPercent: 0.10, cpPercent: 0.15 }
  },
  clan_might: {
    id: 'clan_might',
    name: '血盟力量 ⚔️',
    levelReq: 2,
    icon: 'gradespecial/scrolls/scroll_enchant_weapon_a.png',
    desc: '物理 P.Atk +8%。',
    stats: { pAtkPercent: 0.08 }
  },
  clan_shield: {
    id: 'clan_shield',
    name: '血盟護盾 🛡️',
    levelReq: 3,
    icon: 'gradespecial/scrolls/scroll_enchant_armor_a.png',
    desc: '物理 P.Def +10%。',
    stats: { pDefPercent: 0.10 }
  },
  clan_empower: {
    id: 'clan_empower',
    name: '血盟增幅 🔮',
    levelReq: 4,
    icon: 'gradespecial/scrolls/scroll_enchant_weapon_s.png',
    desc: '魔法 M.Atk +10%。',
    stats: { mAtkPercent: 0.10 }
  },
  clan_magic_barrier: {
    id: 'clan_magic_barrier',
    name: '血盟魔法屏障 🌌',
    levelReq: 4,
    icon: 'gradespecial/scrolls/scroll_blessed_armor_s.png',
    desc: '魔法 M.Def +12%。',
    stats: { mDefPercent: 0.12 }
  },
  clan_vitality: {
    id: 'clan_vitality',
    name: '血盟活力 💚',
    levelReq: 5,
    icon: 'gradespecial/potions/potion_mana_xl.png',
    desc: 'HP／MP 恢復速度 +20%，移動速度 +5。',
    stats: { regenPercent: 0.20, speedBonus: 5 }
  }
};
