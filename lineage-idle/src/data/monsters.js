/**
 * monsters.js — Definições de monstros do Lineage Idle.
 * Bestiário Expandido: Mínimo 4 monstros comuns + 1 elite + 1 chefe por zona.
 *
 * Campos por monstro:
 *   name     — Nome exibido
 *   hp/atk/def/eva/matk/mdef — Atributos base
 *   xp/sp    — Recompensas de experiência
 *   gold     — [min, max] ouro dropado
 *   boss     — (opcional) true se for chefe de zona
 *   elite    — (opcional) true se for elite
 *   element  — (opcional) elemento do monstro
 *   resist   — (opcional) { elemento: multiplicador }
 *   traits   — (opcional) array de traits especiais
 *   magic    — (opcional) true se for atacante mágico
 *   atkSpd   — (opcional) multiplicador de velocidade de ataque
 */
export const MONSTERS = {
  // ──────────────────────────────────────────────────────────────────────────
  // 1. TALKING ISLAND (Level 1-5)
  // ──────────────────────────────────────────────────────────────────────────
  goblin: { name: '哥布林', lvl: 1, hp: 140, atk: 6, def: 6, eva: 2, matk: 0, mdef: 3, xp: 14, sp: 0, gold: [5, 12] },
  goblinThief: { name: '哥布林盜賊', lvl: 2, hp: 180, atk: 9, def: 8, eva: 10, matk: 0, mdef: 4, xp: 20, sp: 0, gold: [8, 20], element: 'none', traits: ['ambush'], stealsGold: 0.15, skill: { name: '偷襲', type: 'physical', mult: 1.3, cd: 4, vfx: 'energy_slash' } },
  armoredGoblin: { name: '裝甲哥布林', lvl: 3, hp: 240, atk: 11, def: 14, eva: 2, matk: 0, mdef: 6, xp: 26, sp: 0, gold: [10, 24], traits: ['block'], skill: { name: '防禦姿態', type: 'buff', effect: 'def_boost', val: 0.3, cd: 6 } },
  goblinMage: { name: '哥布林法師', lvl: 4, hp: 210, atk: 8, def: 9, eva: 3, matk: 16, mdef: 12, xp: 30, sp: 0, gold: [12, 28], element: 'fire', magic: true, skill: { name: '火焰箭', type: 'magical', mult: 1.4, cd: 4, vfx: 'fireball' } },
  talkingIslandWerewolf: { name: '說話之島狼人首領', lvl: 5, hp: 550, atk: 17, def: 18, eva: 8, matk: 0, mdef: 10, xp: 75, sp: 6, gold: [30, 70], traits: ['bleed'], elite: true, skill: { name: '撕裂咆哮', type: 'physical', effect: 'bleed', mult: 1.4, cd: 5, vfx: 'slash' } },
  goblinKing: { name: '哥布林王', lvl: 5, hp: 1100, atk: 22, def: 25, eva: 4, matk: 0, mdef: 15, xp: 160, sp: 25, gold: [60, 140], boss: true, skill: { name: '哥布林王之怒', type: 'physical', effect: 'stun', mult: 1.6, cd: 6, vfx: 'spiral_spear' } },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. ELVEN FOREST (Level 3-10)
  // ──────────────────────────────────────────────────────────────────────────
  wolf: { name: '野狼', lvl: 3, hp: 220, atk: 10, def: 8, eva: 6, matk: 0, mdef: 4, xp: 24, sp: 0, gold: [9, 22] },
  grayWolf: { name: '灰狼', lvl: 4, hp: 280, atk: 12, def: 10, eva: 7, matk: 0, mdef: 5, xp: 30, sp: 0, gold: [11, 25], traits: ['bleed'], skill: { name: '兇猛撕咬', type: 'physical', effect: 'bleed', mult: 1.3, cd: 4 } },
  rootWitch: { name: '樹根女巫', lvl: 5, hp: 320, atk: 14, def: 11, eva: 5, matk: 20, mdef: 16, xp: 38, sp: 0, gold: [15, 32], magic: true, skill: { name: '束縛之根', type: 'magical', effect: 'root', mult: 1.35, cd: 5, vfx: 'earth_spike' } },
  greenDryad: { name: '綠色樹精', lvl: 8, hp: 460, atk: 22, def: 16, eva: 9, matk: 28, mdef: 22, xp: 65, sp: 0, gold: [24, 52], magic: true, traits: ['entangle'], skill: { name: '森林荊棘', type: 'magical', mult: 1.4, cd: 4, vfx: 'nature_blast' } },
  sporeFungus: { name: '孢子菌', lvl: 9, hp: 520, atk: 25, def: 18, eva: 5, matk: 35, mdef: 24, xp: 78, sp: 0, gold: [30, 65], element: 'earth', traits: ['poison'], skill: { name: '孢子雲', type: 'magical', effect: 'poison', mult: 1.3, cd: 5 } },
  kabooOrcFighter: { name: '卡布半獸人勇士', lvl: 10, hp: 980, atk: 35, def: 26, eva: 7, matk: 0, mdef: 16, xp: 160, sp: 8, gold: [55, 120], traits: ['enrage'], elite: true, skill: { name: '裂地斧擊', type: 'physical', effect: 'stun', mult: 1.5, cd: 5, vfx: 'energy_slash' } },
  deathTrent: { name: '死亡樹精', lvl: 10, hp: 1950, atk: 42, def: 35, eva: 4, matk: 25, mdef: 28, xp: 320, sp: 35, gold: [120, 280], boss: true, skill: { name: '古代自然之怒', type: 'magical', effect: 'root', mult: 1.7, cd: 6 } },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. DARK FOREST (Level 5-12)
  // ──────────────────────────────────────────────────────────────────────────
  spider: { name: '洞穴蜘蛛', lvl: 5, hp: 320, atk: 13, def: 10, eva: 9, matk: 0, mdef: 6, xp: 32, sp: 0, gold: [12, 28], traits: ['poison'], skill: { name: '劇毒刺擊', type: 'physical', effect: 'poison', mult: 1.3, cd: 4 } },
  swampWalker: { name: '沼澤行者', lvl: 7, hp: 440, atk: 18, def: 14, eva: 6, matk: 10, mdef: 14, xp: 48, sp: 0, gold: [18, 40] },
  lesserDarkHorror: { name: '小型黑暗恐魔', lvl: 9, hp: 550, atk: 26, def: 18, eva: 8, matk: 32, mdef: 22, xp: 75, sp: 0, gold: [28, 60], element: 'dark', magic: true, skill: { name: '暗影箭', type: 'magical', mult: 1.45, cd: 4, vfx: 'dark_missile' } },
  marshStalker: { name: '濕地潛伏者', lvl: 11, hp: 680, atk: 33, def: 22, eva: 13, matk: 0, mdef: 14, xp: 95, sp: 0, gold: [36, 75], traits: ['ambush'], skill: { name: '偷襲', type: 'physical', mult: 1.5, cd: 4 } },
  shadowFangWolf: { name: '暗牙巨狼', lvl: 12, hp: 1250, atk: 45, def: 30, eva: 12, matk: 0, mdef: 18, xp: 210, sp: 10, gold: [75, 160], traits: ['bleed'], elite: true, skill: { name: '暗影撕裂', type: 'physical', effect: 'bleed', mult: 1.55, cd: 5 } },
  darkForestMatriarch: { name: '黑暗森林女王', lvl: 12, hp: 2400, atk: 52, def: 40, eva: 10, matk: 30, mdef: 32, xp: 400, sp: 45, gold: [150, 320], boss: true, skill: { name: '女王致命蛛網', type: 'magical', effect: 'poison', mult: 1.8, cd: 6 } },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. ORC VILLAGE (Level 7-15)
  // ──────────────────────────────────────────────────────────────────────────
  orc: { name: '半獸人戰士', lvl: 7, hp: 480, atk: 22, def: 16, eva: 5, matk: 0, mdef: 8, xp: 58, sp: 0, gold: [22, 48], traits: ['enrage'] },
  kashaWolf: { name: '卡夏狼', lvl: 9, hp: 560, atk: 27, def: 18, eva: 10, matk: 0, mdef: 10, xp: 75, sp: 0, gold: [30, 62], traits: ['bleed'] },
  kashaBear: { name: '卡夏熊', lvl: 11, hp: 750, atk: 34, def: 24, eva: 5, matk: 0, mdef: 12, xp: 105, sp: 0, gold: [38, 82], skill: { name: '粉碎熊掌', type: 'physical', effect: 'stun', mult: 1.4, cd: 5 } },
  kashaOrcArcher: { name: '卡夏半獸人弓手', lvl: 13, hp: 620, atk: 42, def: 20, eva: 10, matk: 0, mdef: 14, xp: 125, sp: 0, gold: [45, 95], skill: { name: '卡夏雙重射擊', type: 'physical', mult: 1.5, cd: 4, vfx: 'arrow' } },
  kashaOrcBerserker: { name: '卡夏半獸人狂戰士', lvl: 14, hp: 1550, atk: 55, def: 34, eva: 8, matk: 0, mdef: 18, xp: 280, sp: 12, gold: [100, 210], traits: ['enrage'], elite: true, skill: { name: '狂暴猛擊', type: 'physical', mult: 1.65, cd: 5 } },
  kashaOrcOverlord: { name: '卡夏部族霸主', lvl: 15, hp: 3100, atk: 65, def: 45, eva: 8, matk: 20, mdef: 28, xp: 520, sp: 60, gold: [180, 380], boss: true, skill: { name: '霸主部族咆哮', type: 'physical', effect: 'stun', mult: 1.85, cd: 6 } },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. DWARVEN MINE (Level 9-16)
  // ──────────────────────────────────────────────────────────────────────────
  kobold: { name: '狗頭人礦工', lvl: 9, hp: 180, atk: 26, def: 11, eva: 4, matk: 0, mdef: 5, xp: 65, sp: 2, gold: [28, 60] },
  goblinBrigand: { name: '礦坑哥布林強盜', lvl: 11, hp: 230, atk: 32, def: 13, eva: 8, matk: 0, mdef: 6, xp: 85, sp: 3, gold: [35, 75] },
  mineCaveBat: { name: '米索莉洞穴蝙蝠', lvl: 13, hp: 250, atk: 38, def: 12, eva: 16, matk: 0, mdef: 8, xp: 110, sp: 3, gold: [42, 90], traits: ['lifesteal'] },
  mithrilGolem: { name: '米索莉魔像', lvl: 15, hp: 420, atk: 48, def: 25, eva: 2, matk: 0, mdef: 14, xp: 160, sp: 4, gold: [60, 130], element: 'earth' },
  koboldLeader: { name: '狗頭人工頭', lvl: 16, hp: 680, atk: 60, def: 28, eva: 8, matk: 0, mdef: 14, xp: 280, sp: 7, gold: [120, 260], traits: ['packLeader'], elite: true },
  dwarvenEarthLord: { name: '矮人礦坑守護者', lvl: 16, hp: 1100, atk: 75, def: 35, eva: 4, matk: 0, mdef: 20, xp: 480, sp: 12, gold: [220, 460], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. KAMAEL LAIR (Level 11-18)
  // ──────────────────────────────────────────────────────────────────────────
  kamaelScout: { name: '闇天使斥候', lvl: 11, hp: 240, atk: 34, def: 13, eva: 9, matk: 0, mdef: 6, xp: 85, sp: 2, gold: [35, 75] },
  soullessScout: { name: '無魂斥候', lvl: 13, hp: 290, atk: 40, def: 15, eva: 10, matk: 0, mdef: 8, xp: 115, sp: 3, gold: [46, 96] },
  spitefulGhost: { name: '怨恨靈魂', lvl: 15, hp: 340, atk: 30, def: 14, eva: 14, matk: 55, mdef: 18, xp: 155, sp: 4, gold: [58, 125], element: 'dark', magic: true },
  crimsonWarder: { name: '緋紅守衛', lvl: 17, hp: 450, atk: 56, def: 22, eva: 8, matk: 0, mdef: 12, xp: 210, sp: 5, gold: [80, 170] },
  kamaelInfiltrator: { name: '闇天使滲透者', lvl: 18, hp: 780, atk: 70, def: 27, eva: 15, matk: 0, mdef: 16, xp: 340, sp: 8, gold: [140, 290], traits: ['ambush'], elite: true },
  darkInquisitorKamael: { name: '闇天使黑暗審判官', lvl: 18, hp: 1350, atk: 88, def: 36, eva: 10, matk: 40, mdef: 24, xp: 600, sp: 15, gold: [280, 580], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. RUINED OUTPOST (Level 15-20)
  // ──────────────────────────────────────────────────────────────────────────
  ruinedGoblinThief: { name: '前哨站盜賊', lvl: 15, hp: 320, atk: 42, def: 16, eva: 12, xp: 130, sp: 3, gold: [50, 110] },
  ruinedOrc: { name: '前哨站半獸人', lvl: 16, hp: 420, atk: 50, def: 20, eva: 5, xp: 160, sp: 3, gold: [60, 130] },
  outpostMarksman: { name: '前哨站神射手', lvl: 17, hp: 380, atk: 58, def: 18, eva: 10, xp: 185, sp: 4, gold: [70, 150] },
  ruinedDeserter: { name: '廢墟逃兵騎士', lvl: 19, hp: 560, atk: 68, def: 26, eva: 6, xp: 250, sp: 5, gold: [95, 200] },
  shadowMercenary: { name: '暗影傭兵', lvl: 20, hp: 950, atk: 82, def: 32, eva: 12, xp: 420, sp: 9, gold: [160, 340], elite: true },
  outpostFallenCaptain: { name: '墮落前哨站隊長', lvl: 20, hp: 1600, atk: 105, def: 42, eva: 8, xp: 750, sp: 16, gold: [320, 680], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 8. HOWLING MOOR (Level 20-24)
  // ──────────────────────────────────────────────────────────────────────────
  direWolf: { name: '巨狼', lvl: 20, hp: 650, atk: 78, def: 30, eva: 14, xp: 380, sp: 4, gold: [130, 280], element: 'none', traits: ['bleed'], atkSpd: 1.2 },
  babyTiamat: { name: '幼年提亞馬特', lvl: 21, hp: 750, atk: 85, def: 34, eva: 10, matk: 50, mdef: 20, xp: 440, sp: 4, gold: [150, 320] },
  crimsonBabyDragon: { name: '緋紅幼龍', lvl: 22, hp: 900, atk: 96, def: 38, eva: 10, xp: 520, sp: 5, gold: [180, 380], element: 'fire', resist: { fire: 0.75 } },
  ancientSatyr: { name: '古代薩堤爾', lvl: 23, hp: 1050, atk: 108, def: 42, eva: 12, xp: 600, sp: 5, gold: [200, 420] },
  satyrWarlord: { name: '薩堤爾戰爭領主', lvl: 24, hp: 1550, atk: 128, def: 50, eva: 14, xp: 850, sp: 7, gold: [300, 650], traits: ['bleed'], elite: true },
  alphaWolf: { name: '狼王', lvl: 24, hp: 2200, atk: 145, def: 58, eva: 16, xp: 1200, sp: 8, gold: [450, 950], element: 'none', traits: ['packLeader', 'bleed'], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 9. GIRAN OUTSKIRTS (Level 25-29)
  // ──────────────────────────────────────────────────────────────────────────
  skeleton: { name: '骷髏士兵', lvl: 25, hp: 1200, atk: 120, def: 48, eva: 5, matk: 0, mdef: 18, xp: 700, sp: 6, gold: [240, 500] },
  skeletonArcher: { name: '骷髏神射手', lvl: 26, hp: 1100, atk: 135, def: 44, eva: 8, matk: 0, mdef: 20, xp: 780, sp: 6, gold: [260, 550] },
  deathRider: { name: '死亡騎士', lvl: 27, hp: 1600, atk: 145, def: 56, eva: 10, xp: 920, sp: 7, gold: [300, 650] },
  giranGargoyle: { name: '奇岩石像鬼', lvl: 28, hp: 1900, atk: 160, def: 68, eva: 6, matk: 0, mdef: 26, xp: 1050, sp: 8, gold: [340, 720], element: 'earth' },
  giranGladiator: { name: '受詛咒的奇岩鬥士', lvl: 29, hp: 2700, atk: 185, def: 74, eva: 8, xp: 1500, sp: 10, gold: [550, 1150], elite: true },
  minotaurKnight: { name: '牛頭人騎士', lvl: 29, hp: 3800, atk: 210, def: 85, eva: 6, xp: 2200, sp: 12, gold: [850, 1800], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 10. ORCEN RUINS (Level 30-34)
  // ──────────────────────────────────────────────────────────────────────────
  orcenRuinsOrc: { name: '遺跡半獸人狂戰士', lvl: 30, hp: 2000, atk: 170, def: 65, eva: 6, xp: 1100, sp: 8, gold: [380, 800] },
  cursedWarrior: { name: '受詛咒的戰士', lvl: 31, hp: 2400, atk: 195, def: 75, eva: 8, xp: 1350, sp: 9, gold: [450, 950] },
  ruinShamanOrc: { name: '遺跡半獸人薩滿', lvl: 32, hp: 2200, atk: 140, def: 68, eva: 6, matk: 240, mdef: 70, xp: 1450, sp: 10, gold: [480, 1000], element: 'fire', magic: true },
  tombLooterOrc: { name: '盜墓半獸人', lvl: 33, hp: 2600, atk: 215, def: 82, eva: 10, xp: 1650, sp: 11, gold: [550, 1150] },
  ancientOrcExecutioner: { name: '古代半獸人處刑者', lvl: 34, hp: 3900, atk: 245, def: 95, eva: 7, xp: 2300, sp: 13, gold: [800, 1700], traits: ['enrage'], elite: true },
  orcenOverlord: { name: '歐肯遺跡霸主', lvl: 34, hp: 5500, atk: 270, def: 110, eva: 8, xp: 3200, sp: 15, gold: [1200, 2600], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 11. FORSAKEN CRYPT (Level 35-40)
  // ──────────────────────────────────────────────────────────────────────────
  darkMage: { name: '墓穴黑暗法師', lvl: 35, hp: 2600, atk: 140, def: 60, eva: 12, matk: 220, mdef: 80, xp: 1500, sp: 10, gold: [500, 1100], element: 'dark', magic: true },
  corpseWorm: { name: '屍蟲', lvl: 36, hp: 3000, atk: 210, def: 90, eva: 4, xp: 1750, sp: 10, gold: [550, 1200] },
  furiousSouls: { name: '狂怒靈魂', lvl: 37, hp: 2800, atk: 230, def: 70, eva: 16, matk: 140, mdef: 65, xp: 1850, sp: 11, gold: [600, 1300] },
  cryptVampire: { name: '墓穴吸血鬼', lvl: 38, hp: 3600, atk: 260, def: 85, eva: 18, xp: 2300, sp: 12, gold: [750, 1600], traits: ['lifesteal'] },
  devilBone: { name: '惡魔骸骨', lvl: 39, hp: 4200, atk: 280, def: 115, eva: 3, xp: 2700, sp: 13, gold: [850, 1800], element: 'dark', traits: ['boneArmor'], elite: true },
  cryptLord: { name: '至高墓穴領主', lvl: 40, hp: 9500, atk: 380, def: 150, eva: 8, xp: 6000, sp: 20, gold: [2200, 4800], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 12. BLACK CITADEL (Level 40-44)
  // ──────────────────────────────────────────────────────────────────────────
  deathKnight: { name: '死亡騎士守護者', lvl: 40, hp: 4800, atk: 310, def: 125, eva: 10, xp: 3100, sp: 14, gold: [1000, 2200], element: 'dark' },
  deathWizard: { name: '死亡巫師執政官', lvl: 41, hp: 4400, atk: 180, def: 95, eva: 10, matk: 340, mdef: 145, xp: 3500, sp: 15, gold: [1150, 2500], magic: true },
  citadelDarkPriest: { name: '要塞黑暗祭司', lvl: 42, hp: 4600, atk: 190, def: 105, eva: 8, matk: 360, mdef: 155, xp: 3900, sp: 16, gold: [1250, 2700], element: 'dark', magic: true },
  blackDragonWhelp: { name: '黑龍幼獸', lvl: 43, hp: 6200, atk: 360, def: 140, eva: 10, xp: 4800, sp: 18, gold: [1500, 3300], element: 'dark' },
  blackDragon: { name: '黑龍霸主', lvl: 44, hp: 12000, atk: 450, def: 180, eva: 10, xp: 8500, sp: 25, gold: [3200, 7000], elite: true },
  flamingDemonLord: { name: '烈焰惡魔領主', lvl: 44, hp: 16000, atk: 540, def: 210, eva: 12, xp: 11000, sp: 30, gold: [4500, 9500], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 13. GLUDIO CASTLE (Level 45-48)
  // ──────────────────────────────────────────────────────────────────────────
  knight: { name: '古魯丁守衛騎士', lvl: 45, hp: 5500, atk: 340, def: 140, eva: 6, xp: 3800, sp: 16, gold: [1200, 2600] },
  cursedKnight: { name: '受詛咒的古魯丁騎士', lvl: 46, hp: 6800, atk: 400, def: 165, eva: 6, xp: 4800, sp: 18, gold: [1500, 3200] },
  gludioRoyalArcher: { name: '古魯丁皇家弓手', lvl: 47, hp: 5800, atk: 420, def: 135, eva: 14, xp: 4900, sp: 18, gold: [1600, 3400] },
  gludioSorcerer: { name: '古魯丁墮落巫師', lvl: 47, hp: 5400, atk: 220, def: 130, eva: 8, matk: 460, mdef: 185, xp: 5100, sp: 19, gold: [1700, 3600], magic: true },
  gludioShieldMaster: { name: '古魯丁盾牌大師', lvl: 48, hp: 11500, atk: 460, def: 210, eva: 6, xp: 7500, sp: 24, gold: [2600, 5600], elite: true },
  gludioCommander: { name: '古魯丁墮落指揮官', lvl: 48, hp: 18000, atk: 580, def: 230, eva: 8, xp: 12500, sp: 32, gold: [5000, 11000], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 14. WOLF MOUNTAIN (Level 48-50)
  // ──────────────────────────────────────────────────────────────────────────
  mountainWolf: { name: '山狼', lvl: 48, hp: 6200, atk: 380, def: 150, eva: 15, xp: 4200, sp: 18, gold: [1400, 3000] },
  mountainDireWolf: { name: '山岳巨狼', lvl: 49, hp: 7400, atk: 430, def: 170, eva: 18, xp: 5200, sp: 20, gold: [1700, 3600], traits: ['bleed'] },
  frostStalkerWolf: { name: '冰霜潛獵狼', lvl: 49, hp: 6800, atk: 450, def: 160, eva: 22, xp: 5400, sp: 20, gold: [1800, 3800], element: 'water' },
  mountainSnowBear: { name: '山岳雪熊', lvl: 50, hp: 9200, atk: 490, def: 195, eva: 8, xp: 6500, sp: 22, gold: [2200, 4600] },
  frostFangBehemoth: { name: '霜牙巨獸', lvl: 50, hp: 14000, atk: 540, def: 225, eva: 12, xp: 9000, sp: 28, gold: [3400, 7200], elite: true },
  mountainAlphaWolf: { name: '山岳狼王', lvl: 50, hp: 20000, atk: 620, def: 250, eva: 20, xp: 14000, sp: 35, gold: [5500, 12000], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 15. RIFT OF THE VOID (Level 50-59)
  // ──────────────────────────────────────────────────────────────────────────
  voidCreature: { name: '虛空生物', lvl: 50, hp: 7800, atk: 440, def: 175, eva: 25, xp: 5500, sp: 85, gold: [1800, 3800], element: 'void' },
  voidBrute: { name: '虛空暴徒', lvl: 52, hp: 9200, atk: 490, def: 200, eva: 10, xp: 6800, sp: 95, gold: [2200, 4600] },
  voidStalker: { name: '虛空潛伏者', lvl: 54, hp: 8500, atk: 540, def: 160, eva: 30, xp: 7400, sp: 100, gold: [2400, 5000] },
  beholder: { name: '虛空凝視者', lvl: 56, hp: 9800, atk: 260, def: 180, eva: 15, matk: 580, mdef: 220, xp: 8500, sp: 110, gold: [2800, 5800], magic: true },
  voidArchonEntity: { name: '虛空執政官', lvl: 58, hp: 18000, atk: 660, def: 260, eva: 20, matk: 650, mdef: 260, xp: 13000, sp: 160, gold: [4800, 10000], elite: true },
  voidDragonLord: { name: '虛空龍王', lvl: 59, hp: 28000, atk: 780, def: 310, eva: 15, xp: 18000, sp: 220, gold: [7500, 16000], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 16. EMERALD GROVE (Level 60-69)
  // ──────────────────────────────────────────────────────────────────────────
  emeraldSnake: { name: '翡翠巨蛇', lvl: 60, hp: 11500, atk: 600, def: 230, eva: 22, xp: 10500, sp: 125, gold: [3400, 7000], traits: ['poison'] },
  emeraldDrake: { name: '翡翠飛龍', lvl: 63, hp: 14500, atk: 680, def: 270, eva: 12, xp: 13500, sp: 145, gold: [4200, 8800], element: 'earth' },
  jadeGolem: { name: '翠玉石魔像', lvl: 65, hp: 18000, atk: 740, def: 320, eva: 5, xp: 16500, sp: 170, gold: [5200, 11000], element: 'earth' },
  groveSpiritMage: { name: '林地精靈女巫', lvl: 67, hp: 13000, atk: 320, def: 220, eva: 15, matk: 780, mdef: 320, xp: 18500, sp: 190, gold: [6000, 12500], magic: true },
  emeraldDragon: { name: '古代翡翠龍', lvl: 68, hp: 28000, atk: 900, def: 370, eva: 10, xp: 24000, sp: 260, gold: [9000, 18000], element: 'earth', elite: true },
  fafurion: { name: '水龍法利昂', lvl: 69, hp: 45000, atk: 1100, def: 440, eva: 12, xp: 32000, sp: 350, gold: [14000, 28000], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 17. GATES OF THE UNDERWORLD (Level 70-75)
  // ──────────────────────────────────────────────────────────────────────────
  blazingWerewolf: { name: '烈焰狼人', lvl: 70, hp: 18000, atk: 820, def: 330, eva: 20, xp: 18000, sp: 190, gold: [5500, 11500], element: 'fire', traits: ['bleed'] },
  swiftBlaze: { name: '迅捷烈焰魔', lvl: 71, hp: 16500, atk: 910, def: 300, eva: 28, xp: 20000, sp: 210, gold: [6200, 13000], element: 'fire' },
  infernalHound: { name: '煉獄地獄犬', lvl: 72, hp: 19500, atk: 880, def: 350, eva: 18, xp: 21500, sp: 225, gold: [6800, 14000], element: 'fire' },
  lavaFiend: { name: '熔岩惡魔', lvl: 74, hp: 23000, atk: 980, def: 390, eva: 10, matk: 850, mdef: 380, xp: 25500, sp: 250, gold: [8000, 16500], element: 'fire', magic: true },
  flameOverlordDemon: { name: '冥界烈焰霸主', lvl: 75, hp: 38000, atk: 1180, def: 460, eva: 12, xp: 33000, sp: 340, gold: [12000, 25000], element: 'fire', elite: true },
  cerberus: { name: '地獄守護犬刻耳柏洛斯', lvl: 75, hp: 58000, atk: 1350, def: 520, eva: 14, xp: 42000, sp: 450, gold: [18000, 36000], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 18. VALLEY OF SAINTS (Level 72-75)
  // ──────────────────────────────────────────────────────────────────────────
  saintEye: { name: '光輝之眼', lvl: 72, hp: 19500, atk: 880, def: 340, eva: 15, matk: 950, mdef: 420, xp: 21000, sp: 220, gold: [6500, 13500], element: 'holy', magic: true },
  saintGuardian: { name: '光輝守護者', lvl: 73, hp: 23000, atk: 950, def: 370, eva: 10, xp: 23500, sp: 240, gold: [7200, 14500], element: 'holy' },
  splendorLight: { name: '光輝之主', lvl: 74, hp: 25000, atk: 1020, def: 390, eva: 14, xp: 26000, sp: 260, gold: [8000, 16000], element: 'holy' },
  celestialArchon: { name: '天界光之執政官', lvl: 74, hp: 22500, atk: 600, def: 360, eva: 16, matk: 1100, mdef: 470, xp: 27000, sp: 270, gold: [8500, 17000], element: 'holy', magic: true },
  divineSeraphim: { name: '白金神聖熾天使', lvl: 75, hp: 42000, atk: 1250, def: 490, eva: 15, matk: 1200, mdef: 510, xp: 36000, sp: 380, gold: [13500, 28000], element: 'holy', elite: true },
  splendorKnight: { name: '光輝高階聖騎士', lvl: 75, hp: 62000, atk: 1450, def: 560, eva: 12, xp: 48000, sp: 480, gold: [20000, 40000], element: 'holy', boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 19. SWAMP OF SCREAMS (Level 74-76)
  // ──────────────────────────────────────────────────────────────────────────
  swampStrikers: { name: '史塔卡拓尖嘯者', lvl: 74, hp: 24000, atk: 990, def: 380, eva: 18, xp: 25000, sp: 250, gold: [7800, 15500], element: 'water' },
  corruptedSpiders: { name: '沼澤蜘蛛女王', lvl: 75, hp: 26500, atk: 1050, def: 400, eva: 20, xp: 27500, sp: 270, gold: [8500, 17000], element: 'dark', traits: ['poison'] },
  screamingSouls: { name: '受折磨的尖叫靈魂', lvl: 75, hp: 22000, atk: 600, def: 350, eva: 22, matk: 1200, mdef: 500, xp: 28000, sp: 280, gold: [8800, 17500], element: 'dark', magic: true },
  stakatoWarrior: { name: '史塔卡拓裝甲戰士', lvl: 75, hp: 29000, atk: 1120, def: 440, eva: 12, xp: 29500, sp: 290, gold: [9200, 18500] },
  stakatoQueenBrood: { name: '史塔卡拓蟲后', lvl: 76, hp: 46000, atk: 1300, def: 520, eva: 14, matk: 1100, mdef: 480, xp: 39000, sp: 420, gold: [15000, 31000], elite: true },
  swampAbomination: { name: '沼澤憎惡泰坦', lvl: 76, hp: 68000, atk: 1550, def: 590, eva: 14, xp: 52000, sp: 520, gold: [22000, 44000], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 20. ADEN CITY (Level 76-79)
  // ──────────────────────────────────────────────────────────────────────────
  royalKnight: { name: '亞丁皇家守衛', lvl: 76, hp: 22000, atk: 980, def: 380, eva: 8, xp: 24000, sp: 240, gold: [7500, 15000] },
  highMage: { name: '亞丁高階織法者', lvl: 77, hp: 19000, atk: 450, def: 320, eva: 10, matk: 1150, mdef: 450, xp: 28000, sp: 270, gold: [8800, 18000], magic: true },
  adenCrossbowman: { name: '亞丁菁英弩手', lvl: 78, hp: 24000, atk: 1150, def: 360, eva: 18, xp: 31000, sp: 290, gold: [9600, 19500] },
  adenPaladin: { name: '亞丁先鋒聖騎士', lvl: 78, hp: 32000, atk: 1100, def: 480, eva: 8, xp: 33500, sp: 310, gold: [10500, 21500] },
  adenHighJusticiar: { name: '亞丁大審判官', lvl: 79, hp: 48000, atk: 1380, def: 540, eva: 10, xp: 42000, sp: 410, gold: [16000, 33000], elite: true },
  adenCommander: { name: '亞丁高階指揮官', lvl: 79, hp: 68000, atk: 1550, def: 600, eva: 10, xp: 52000, sp: 520, gold: [22000, 45000], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 21. DRAGON VALLEY (Level 80-84)
  // ──────────────────────────────────────────────────────────────────────────
  dragon: { name: '龍之谷飛龍', lvl: 80, hp: 28000, atk: 1150, def: 440, eva: 10, matk: 400, mdef: 300, xp: 32000, sp: 300, gold: [10000, 21000] },
  dragonKnight: { name: '菁英龍騎士', lvl: 81, hp: 32000, atk: 1280, def: 490, eva: 10, xp: 37000, sp: 330, gold: [11500, 24000] },
  frostKnight: { name: '冰霜騎士', lvl: 82, hp: 36000, atk: 1400, def: 540, eva: 10, xp: 43000, sp: 370, gold: [13500, 28000], element: 'water' },
  frostLordDragon: { name: '冰霜領主龍', lvl: 83, hp: 52000, atk: 1700, def: 640, eva: 12, xp: 65000, sp: 500, gold: [20000, 42000], element: 'water' },
  dragonValleyOverlord: { name: '龍之谷高階霸主', lvl: 84, hp: 68000, atk: 1850, def: 720, eva: 14, xp: 82000, sp: 620, gold: [26000, 52000], elite: true },
  lindvior: { name: '風龍林德拜爾', lvl: 84, hp: 95000, atk: 2100, def: 820, eva: 20, xp: 110000, sp: 800, gold: [35000, 70000], element: 'wind', boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 22. IMPERIAL TOMB (Level 85-89)
  // ──────────────────────────────────────────────────────────────────────────
  tombGuardian: { name: '帝國陵墓守護者', lvl: 85, hp: 40000, atk: 1500, def: 580, eva: 10, xp: 50000, sp: 420, gold: [15000, 30000], element: 'dark' },
  sepulcherArchon: { name: '陵墓執政官', lvl: 86, hp: 44000, atk: 700, def: 500, eva: 12, matk: 1850, mdef: 750, xp: 58000, sp: 470, gold: [17500, 35000], element: 'dark', magic: true },
  undeadKnight: { name: '帝國不死騎士', lvl: 87, hp: 52000, atk: 1750, def: 680, eva: 8, xp: 70000, sp: 550, gold: [21000, 42000], element: 'dark' },
  imperialGhostMage: { name: '帝國幽靈法師', lvl: 88, hp: 48000, atk: 800, def: 560, eva: 14, matk: 2100, mdef: 880, xp: 82000, sp: 620, gold: [25000, 50000], element: 'dark', magic: true },
  lichLord: { name: '巫妖領主大法師', lvl: 88, hp: 78000, atk: 900, def: 620, eva: 15, matk: 2400, mdef: 1100, xp: 110000, sp: 800, gold: [32000, 65000], elite: true },
  deathKing: { name: '至高死亡之王', lvl: 89, hp: 130000, atk: 2600, def: 1050, eva: 15, xp: 180000, sp: 1200, gold: [55000, 110000], boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 23. ANTHARAS' LAIR (Level 90-94)
  // ──────────────────────────────────────────────────────────────────────────
  caveDrake: { name: '洞穴飛龍', lvl: 90, hp: 65000, atk: 2100, def: 820, eva: 12, xp: 95000, sp: 700, gold: [28000, 56000], element: 'earth' },
  magmaBeast: { name: '岩漿巨獸', lvl: 91, hp: 75000, atk: 2350, def: 900, eva: 10, xp: 115000, sp: 820, gold: [34000, 68000], element: 'fire' },
  earthDrake: { name: '地之飛龍', lvl: 92, hp: 95000, atk: 2700, def: 1080, eva: 12, xp: 150000, sp: 1000, gold: [45000, 90000], element: 'earth' },
  caveWyrmBehemoth: { name: '洞穴巨龍獸', lvl: 93, hp: 115000, atk: 2900, def: 1180, eva: 10, xp: 175000, sp: 1150, gold: [52000, 105000], element: 'earth' },
  antharasBehemoth: { name: '安塔瑞斯守護巨獸', lvl: 94, hp: 160000, atk: 3300, def: 1320, eva: 12, xp: 230000, sp: 1500, gold: [70000, 140000], element: 'earth', elite: true },
  antharas: { name: '地龍安塔瑞斯', lvl: 94, hp: 250000, atk: 3800, def: 1500, eva: 15, xp: 350000, sp: 2200, gold: [100000, 200000], element: 'earth', boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 24. FORGE OF THE GODS (Level 95-100)
  // ──────────────────────────────────────────────────────────────────────────
  valakasMinion: { name: '巴拉卡斯僕從', lvl: 95, hp: 85000, atk: 2600, def: 1000, eva: 12, matk: 1800, mdef: 900, xp: 130000, sp: 900, gold: [38000, 76000], element: 'fire' },
  lavaGolem: { name: '熔岩魔像', lvl: 96, hp: 110000, atk: 2950, def: 1250, eva: 5, xp: 175000, sp: 1150, gold: [50000, 100000], element: 'fire' },
  flameArchon: { name: '烈焰執政官', lvl: 97, hp: 125000, atk: 1300, def: 1100, eva: 14, matk: 3600, mdef: 1500, xp: 210000, sp: 1350, gold: [60000, 120000], element: 'fire', magic: true },
  flameGiantDragon: { name: '烈焰巨龍', lvl: 98, hp: 180000, atk: 3800, def: 1550, eva: 15, xp: 320000, sp: 1900, gold: [90000, 180000], element: 'fire' },
  vulcanLord: { name: '火山領主', lvl: 99, hp: 220000, atk: 4200, def: 1700, eva: 18, xp: 420000, sp: 2400, gold: [120000, 240000], element: 'fire', elite: true },
  valakas: { name: '火龍巴拉卡斯', lvl: 100, hp: 450000, atk: 5500, def: 2200, eva: 20, xp: 800000, sp: 4500, gold: [250000, 500000], element: 'fire', boss: true },

  // ──────────────────────────────────────────────────────────────────────────
  // 25. SEVEN SIGNS: NECROPOLIS & CATACOMBS
  // ──────────────────────────────────────────────────────────────────────────
  // Necropolis of Sacrifice (Lv 32)
  necro_lilim_butcher: { name: '莉莉姆屠夫', lvl: 31, hp: 1250, atk: 45, def: 38, eva: 8, matk: 0, mdef: 25, xp: 260, sp: 20, gold: [80, 160], traits: ['bleed'], element: 'dark' },
  necro_nephilim_sentinel: { name: '奈菲林哨兵', lvl: 32, hp: 1350, atk: 48, def: 44, eva: 6, matk: 0, mdef: 28, xp: 290, sp: 22, gold: [90, 180], traits: ['block'], element: 'holy' },
  necro_tomb_priest: { name: '墓穴審判祭司', lvl: 33, hp: 1100, atk: 35, def: 32, eva: 7, matk: 60, mdef: 45, xp: 310, sp: 25, gold: [100, 200], magic: true, element: 'dark' },
  necro_sacrifice_boss: { name: '祭品執政官', lvl: 35, hp: 6500, atk: 85, def: 75, eva: 8, matk: 80, mdef: 65, xp: 1800, sp: 150, gold: [400, 900], boss: true, element: 'dark' },

  // Necropolis of Pilgrims (Lv 42)
  necro_lilim_assassin: { name: '莉莉姆刺客', lvl: 41, hp: 2200, atk: 95, def: 72, eva: 18, matk: 0, mdef: 55, xp: 620, sp: 45, gold: [180, 350], traits: ['ambush'], element: 'dark' },
  necro_nephilim_guard: { name: '奈菲林皇家守衛', lvl: 42, hp: 2500, atk: 105, def: 90, eva: 10, matk: 0, mdef: 65, xp: 680, sp: 50, gold: [200, 400], traits: ['block'], element: 'holy' },
  necro_crypt_shaman: { name: '朝聖者墓穴薩滿', lvl: 43, hp: 2000, atk: 70, def: 68, eva: 12, matk: 120, mdef: 85, xp: 720, sp: 55, gold: [220, 450], magic: true, element: 'dark' },
  necro_pilgrim_boss: { name: '朝聖者暗影領主', lvl: 45, hp: 12000, atk: 160, def: 140, eva: 12, matk: 150, mdef: 120, xp: 4500, sp: 400, gold: [800, 1800], boss: true, element: 'dark' },

  // Necropolis of Worship (Lv 52)
  necro_gargoyle_watcher: { name: '地下墓穴石像鬼守望者', lvl: 51, hp: 3800, atk: 160, def: 130, eva: 14, matk: 0, mdef: 95, xp: 1200, sp: 90, gold: [350, 700], element: 'earth' },
  necro_lilim_magus: { name: '莉莉姆大魔導士', lvl: 52, hp: 3400, atk: 110, def: 115, eva: 15, matk: 220, mdef: 150, xp: 1350, sp: 100, gold: [400, 800], magic: true, element: 'dark' },
  necro_dusk_templar: { name: '黃昏掠奪聖殿騎士', lvl: 53, hp: 4200, atk: 185, def: 165, eva: 12, matk: 0, mdef: 120, xp: 1450, sp: 110, gold: [420, 850], elite: true, element: 'dark' },
  necro_worship_boss: { name: '禮拜高階審判官', lvl: 55, hp: 24000, atk: 280, def: 230, eva: 15, matk: 290, mdef: 210, xp: 9500, sp: 850, gold: [1600, 3500], boss: true, element: 'dark' },

  // Necropolis of Patriots (Lv 62)
  necro_patriot_berserker: { name: '莉莉姆愛國狂戰士', lvl: 61, hp: 5800, atk: 260, def: 210, eva: 15, matk: 0, mdef: 160, xp: 2200, sp: 180, gold: [600, 1200], traits: ['enrage'], element: 'dark' },
  necro_patriot_bishop: { name: '奈菲林大主教', lvl: 62, hp: 5200, atk: 180, def: 190, eva: 16, matk: 340, mdef: 240, xp: 2400, sp: 200, gold: [650, 1300], magic: true, element: 'holy' },
  necro_patriot_drake: { name: '深淵地下墓穴飛龍', lvl: 63, hp: 6800, atk: 290, def: 240, eva: 14, matk: 150, mdef: 190, xp: 2700, sp: 220, gold: [750, 1500], element: 'dark' },
  necro_patriot_boss: { name: '黃昏愛國將軍', lvl: 65, hp: 42000, atk: 420, def: 350, eva: 18, matk: 380, mdef: 320, xp: 18000, sp: 1600, gold: [3000, 7000], boss: true, element: 'dark' },

  // Catacomb of the Ascetics (Lv 72)
  necro_ascetic_slayer: { name: '莉莉姆暗影殺手', lvl: 71, hp: 8500, atk: 390, def: 310, eva: 24, matk: 0, mdef: 240, xp: 4200, sp: 350, gold: [1100, 2200], traits: ['bleed', 'ambush'], element: 'dark' },
  necro_ascetic_crusader: { name: '奈菲林神聖十字軍', lvl: 72, hp: 9500, atk: 420, def: 370, eva: 16, matk: 0, mdef: 280, xp: 4600, sp: 390, gold: [1200, 2400], traits: ['block'], element: 'holy' },
  necro_ascetic_seer: { name: '苦行者虛空先知', lvl: 73, hp: 7800, atk: 250, def: 280, eva: 18, matk: 520, mdef: 380, xp: 4900, sp: 420, gold: [1300, 2600], magic: true, element: 'dark' },
  necro_ascetic_boss: { name: '苦行者大師', lvl: 74, hp: 65000, atk: 620, def: 520, eva: 20, matk: 580, mdef: 480, xp: 32000, sp: 2800, gold: [5500, 12000], boss: true, element: 'dark' },

  // Catacomb of the Martyrs (Lv 76)
  necro_martyr_dreadnought: { name: '殉教者無畏戰士', lvl: 76, hp: 12500, atk: 540, def: 460, eva: 18, matk: 0, mdef: 360, xp: 6800, sp: 580, gold: [1800, 3600], traits: ['enrage'], element: 'dark' },
  necro_martyr_sorcerer: { name: '殉教者靈魂巫師', lvl: 77, hp: 10500, atk: 320, def: 380, eva: 20, matk: 690, mdef: 490, xp: 7400, sp: 640, gold: [2000, 4000], magic: true, element: 'dark' },
  necro_martyr_gargoyle: { name: '古代死靈石像鬼', lvl: 78, hp: 14000, atk: 590, def: 510, eva: 16, matk: 200, mdef: 420, xp: 8200, sp: 700, gold: [2200, 4500], element: 'earth' },
  necro_martyr_boss: { name: '殉教者之主', lvl: 78, hp: 95000, atk: 850, def: 720, eva: 22, matk: 780, mdef: 680, xp: 55000, sp: 4800, gold: [9000, 20000], boss: true, element: 'dark' },

  // Catacomb of the Apostles (Lv 80)
  necro_apostle_vanguard: { name: '使徒黎明先鋒', lvl: 80, hp: 16500, atk: 690, def: 590, eva: 22, matk: 0, mdef: 480, xp: 11000, sp: 950, gold: [2800, 5600], traits: ['block'], element: 'holy' },
  necro_apostle_hierophant: { name: '使徒大祭司', lvl: 81, hp: 14000, atk: 410, def: 490, eva: 24, matk: 880, mdef: 650, xp: 12500, sp: 1100, gold: [3200, 6400], magic: true, element: 'holy' },
  necro_apostle_behemoth: { name: '使徒墓穴巨獸', lvl: 82, hp: 22000, atk: 780, def: 680, eva: 14, matk: 0, mdef: 540, xp: 14500, sp: 1250, gold: [3800, 7500], elite: true, element: 'dark' },
  necro_apostle_boss: { name: '使徒高階聖殿騎士', lvl: 83, hp: 140000, atk: 1100, def: 940, eva: 25, matk: 990, mdef: 860, xp: 90000, sp: 7800, gold: [15000, 32000], boss: true, element: 'holy' },

  // Disciples Necropolis (Lv 84)
  necro_disciple_knight: { name: '席琳的莉莉姆騎士', lvl: 84, hp: 22000, atk: 880, def: 750, eva: 26, matk: 0, mdef: 620, xp: 18000, sp: 1600, gold: [4500, 9000], traits: ['bleed'], element: 'dark' },
  necro_disciple_sorceress: { name: '門徒深淵女巫', lvl: 84, hp: 18500, atk: 520, def: 620, eva: 28, matk: 1150, mdef: 840, xp: 21000, sp: 1850, gold: [5000, 10000], magic: true, element: 'dark' },
  necro_disciple_executioner: { name: '席琳死亡處刑者', lvl: 85, hp: 28000, atk: 990, def: 860, eva: 22, matk: 0, mdef: 720, xp: 26000, sp: 2300, gold: [6000, 12000], elite: true, element: 'dark' },
  necro_disciple_boss: { name: '門徒守門者阿奈斯', lvl: 85, hp: 220000, atk: 1450, def: 1200, eva: 30, matk: 1350, mdef: 1100, xp: 150000, sp: 13000, gold: [25000, 55000], boss: true, element: 'dark' }
};

/* ─── Normalização automática ────────────────────────────────────────────
   Injeta `id` (a própria chave) e `level` em todos os monstros.
   Resolve arte, drops, codex e tooltips de uma vez só.               */
for (const [key, m] of Object.entries(MONSTERS)) {
  m.id    = key;
  m.level = m.level ?? m.lvl ?? 1;
}

/** Índice reverso: 'goblin mage' -> 'goblinMage' */
export const MONSTER_BY_NAME = Object.freeze(
  Object.fromEntries(
    Object.entries(MONSTERS).flatMap(([k, v]) => [
      [k.toLowerCase(), k],
      [String(v.name).toLowerCase(), k],
    ])
  )
);

