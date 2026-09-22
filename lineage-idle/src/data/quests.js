/**
 * quests.js — Definições de Quests Diárias/Semanais e Battle Pass do Lineage Idle.
 * Extraído de lineage-idle/main.js (linhas 2904-2929, 2961)
 */

/**
 * Definições das quests diárias e semanais com injeção balanceada de SP.
 * Cada quest tem: id, name, desc, target, type, reward, icon
 */
export const DAILY_COMPLETION_BONUS = {
  name: '亞丁冒險者公會寶箱',
  desc: '完成目前等級可接取的所有每日任務，即可獲得公會最高獎勵。',
  reward: { gold: 50000, sp: 500, magicLamps: 2, passXp: 250 },
  icon: '🎁'
};

export const QUEST_DEFS = {
  daily: [
    { id: 'd_kills',  name: '怪物獵人',      desc: '在狩獵區擊敗 50 隻怪物',          target: 50,     type: 'kill',   unlockLevel: 1,  reward: { gold: 15000, sp: 150, passXp: 100 },               icon: '⚔️' },
    { id: 'd_boss',   name: '菁英挑戰者',      desc: '擊敗 2 隻首領或菁英怪物',          target: 2,      type: 'boss',   unlockLevel: 1,  reward: { gold: 30000, sp: 250, magicLamps: 1, passXp: 150 }, icon: '🐉' },
    { id: 'd_craft',  name: '鍛造大師',           desc: '在鍛造系統完成 2 次製作或回收',     target: 2,      type: 'craft',  unlockLevel: 10, reward: { gold: 10000, sp: 100, craftPoints: 25, passXp: 100 }, icon: '🔨' },
    { id: 'd_codex',  name: '亞丁遺物',          desc: '在圖鑑登錄 1 件物品或吸收 1 張卡片',   target: 1,      type: 'codex',  unlockLevel: 1,  reward: { gold: 15000, sp: 150, magicLamps: 1, passXp: 100 }, icon: '📜' },
    { id: 'd_tower',  name: '高塔征服者',     desc: '挑戰高塔或進行一次高塔掃蕩',           target: 1,      type: 'tower',  unlockLevel: 40, reward: { gold: 25000, sp: 200, passXp: 100 },               icon: '🏰' }
  ],
  weekly: [
    { id: 'w_kills',  name: '亞丁殲滅者',      desc: '在狩獵區擊敗 500 隻怪物',         target: 500,    type: 'kill',   reward: { gold: 150000, sp: 1500, passXp: 500 },              icon: '☠️' },
    { id: 'w_bosses', name: '傳說獵人',          desc: '擊敗 10 隻團隊首領或菁英怪物', target: 10,     type: 'boss',   reward: { gold: 250000, sp: 2500, magicLamps: 3, passXp: 600 }, icon: '👑' },
    { id: 'w_gold',   name: '財富累積者',     desc: '透過狩獵累積 250,000 金幣',     target: 250000, type: 'gold',   reward: { gold: 100000, sp: 1000, magicLamps: 5, passXp: 500 }, icon: '💰' },
    { id: 'w_craft',  name: '鍛造宗師',      desc: '在皇家鍛造系統製作或回收 10 件物品',         target: 10,     type: 'craft',  reward: { gold: 100000, sp: 1000, craftPoints: 100, passXp: 500 }, icon: '⚒️' }
  ]
};

/**
 * Tiers do Battle Pass.
 * Cada tier tem: level, reqXp, free (recompensa grátis), premium (recompensa premium)
 */
export const BATTLE_PASS_TIERS = [
  { level: 1,  reqXp: 100,  free: { gold: 5000 },               premium: { magicLamps: 2 }                           },
  { level: 2,  reqXp: 250,  free: { sp: 50 },                   premium: { gold: 20000 }                             },
  { level: 3,  reqXp: 450,  free: { craftPoints: 20 },          premium: { magicLamps: 3 }                           },
  { level: 4,  reqXp: 700,  free: { gold: 15000 },              premium: { sp: 150 }                                 },
  { level: 5,  reqXp: 1000, free: { magicLamps: 2 },            premium: { gold: 50000, title: '亞丁男爵' }    },
  { level: 6,  reqXp: 1350, free: { sp: 100 },                  premium: { magicLamps: 3 }                           },
  { level: 7,  reqXp: 1750, free: { gold: 25000 },              premium: { craftPoints: 100 }                        },
  { level: 8,  reqXp: 2200, free: { magicLamps: 3 },            premium: { gold: 100000 }                            },
  { level: 9,  reqXp: 2700, free: { sp: 250 },                  premium: { magicLamps: 5 }                           },
  { level: 10, reqXp: 3300, free: { gold: 50000, magicLamps: 5 }, premium: { title: '亞丁領主', gold: 200000 } }
];

/**
 * Alias de BATTLE_PASS_TIERS para compatibilidade com código legado que usa PASS_DEFS.
 * @deprecated Use BATTLE_PASS_TIERS
 */
export const PASS_DEFS = BATTLE_PASS_TIERS;

/**
 * Definições da Saga de Quests de Noblesse: Possessor of a Precious Soul (Partes 1 a 4).
 */
export const NOBLESSE_QUEST_DEFS = {
  part1: {
    id: 'quest_noblesse_part1',
    name: '珍貴靈魂的擁有者－第 1 部分',
    step: 1,
    reqLvl: 75,
    npc: '塔里安（奇岩）',
    desc: '與奇岩的塔里安調查古代英雄的遺產，並在聖者之谷找回伊娃詩篇。',
    targetKills: 25,
    targetZone: 'valleyOfSaints',
    reward: { xp: 500000, sp: 25000, gold: 100000, itemName: "維吉爾的信" }
  },
  part2: {
    id: 'quest_noblesse_part2',
    name: '珍貴靈魂的擁有者－第 2 部分',
    step: 2,
    reqLvl: 75,
    npc: '維吉爾（魯因村莊）',
    desc: '把信交給魯因的維吉爾，並在悲鳴沼澤淨化受污染的靈魂。',
    targetKills: 30,
    targetZone: 'swampOfScreams',
    reward: { xp: 800000, sp: 40000, gold: 150000, itemName: '卡拉丁的信' }
  },
  part3: {
    id: 'quest_noblesse_part3',
    name: '珍貴靈魂的擁有者－第 3 部分',
    step: 3,
    reqLvl: 75,
    npc: '卡拉丁（高達特）',
    desc: '協助阿爾戈斯之壁的卡拉丁，並挑戰傳說團隊首領光輝火焰巴拉基艾爾，取回女神法杖：雨之歌。',
    targetBoss: 'barakiel',
    reward: { xp: 1200000, sp: 60000, gold: 250000, itemName: '女神法杖：雨之歌' }
  },
  part4: {
    id: 'quest_noblesse_part4',
    name: '珍貴靈魂的擁有者－第 4 部分',
    step: 4,
    reqLvl: 75,
    npc: '湖之女神（競技場／神聖方尖碑）',
    desc: '向湖之女神獻上神聖法杖，接受伊娃女神的神聖祝福與貴族頭冠，正式成為亞丁貴族！',
    reward: { xp: 2000000, sp: 100000, gold: 500000, isNoblesse: true, tiara: 'accessory_noblesse_tiara', skill: 'blessing_of_noble' }
  }
};

