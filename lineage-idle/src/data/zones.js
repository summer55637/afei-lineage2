/**
 * zones.js — Definições de Zonas, Sagas e Backgrounds do Lineage Idle.
 * Extraído de lineage-idle/main.js (linhas 57-88, 3778-3808)
 */

/**
 * Capítulos de progressão da história.
 * Cada Saga desbloqueia um conjunto de zonas quando o jogador atingir `unlocksAt`.
 */
export const SAGAS = [
  { id: 'interlude', name: '間奏曲', level: 0, unlocksAt: 0, zones: ['talkingIsland', 'elvenForest', 'darkForest', 'orcVillage', 'dwarvenMine', 'kamaelLair', 'ruinedOutpost', 'howlingMoor'] },
  { id: 'prelude', name: '戰爭序曲', level: 1, unlocksAt: 20, zones: ['giranOutskirts', 'orcenRuins', 'forsakenCrypt', 'blackCitadel'] },
  { id: 'saga1', name: '第一章：覺醒', level: 2, unlocksAt: 40, zones: ['gludioCastle', 'wolfMountain', 'riftOfTheVoid', 'emeraldGrove', 'underworldGate', 'valleyOfSaints', 'swampOfScreams'] },
  { id: 'sevensigns', name: '七封印：地下墓穴與死靈墓地', level: 3, unlocksAt: 30, zones: ['necro_sacrifice', 'necro_pilgrim', 'necro_worship', 'necro_patriot', 'necro_ascetics', 'necro_martyrs', 'necro_apostles', 'necro_disciple'] },
  { id: 'saga2', name: '第二章：暗影', level: 4, unlocksAt: 76, zones: ['adenCity', 'dragonValley'] },
  { id: 'saga3', name: '第三章：諸神領域', level: 5, unlocksAt: 85, zones: ['imperialTomb', 'antharasLair', 'forgeOfGods'] }
];

export function getSagaDef(idOrIndex) {
  if (idOrIndex === undefined || idOrIndex === null) return SAGAS[0];
  if (typeof idOrIndex === 'number') return SAGAS[idOrIndex] || SAGAS[0];
  const sStr = String(idOrIndex).toLowerCase();
  return SAGAS.find(s => s.id === sStr || s.name.toLowerCase() === sStr) || SAGAS[0];
}

/**
 * Mapa de zonas de caça.
 * Cada zona define: nome, nível mínimo, monstros, boss, shop e se é town.
 */
export const ZONES = {
  talkingIsland:   { name: '說話之島', level: 1, monsters: ['goblin', 'goblinThief', 'armoredGoblin', 'goblinMage', 'talkingIslandWerewolf'], boss: 'goblinKing', shop: 'talkingIsland', town: true },
  elvenForest:     { name: '精靈森林', level: 3, monsters: ['wolf', 'grayWolf', 'rootWitch', 'greenDryad', 'sporeFungus', 'kabooOrcFighter'], boss: 'deathTrent', shop: 'talkingIsland' },
  darkForest:      { name: '黑暗森林', level: 5, monsters: ['spider', 'swampWalker', 'lesserDarkHorror', 'marshStalker', 'shadowFangWolf'], boss: 'darkForestMatriarch', shop: 'talkingIsland' },
  orcVillage:      { name: '半獸人村莊', level: 7, monsters: ['orc', 'kashaWolf', 'kashaBear', 'kashaOrcArcher', 'kashaOrcBerserker'], boss: 'kashaOrcOverlord', shop: 'talkingIsland' },
  dwarvenMine:     { name: '矮人礦坑', level: 9, monsters: ['kobold', 'goblinBrigand', 'mineCaveBat', 'mithrilGolem', 'koboldLeader'], boss: 'dwarvenEarthLord', shop: 'talkingIsland' },
  kamaelLair:      { name: '闇天使巢穴', level: 11, monsters: ['kamaelScout', 'soullessScout', 'spitefulGhost', 'crimsonWarder', 'kamaelInfiltrator'], boss: 'darkInquisitorKamael', shop: 'talkingIsland' },
  ruinedOutpost:   { name: '廢墟前哨站', level: 15, monsters: ['ruinedGoblinThief', 'ruinedOrc', 'outpostMarksman', 'ruinedDeserter', 'shadowMercenary'], boss: 'outpostFallenCaptain', shop: 'talkingIsland', town: false },
  howlingMoor:     { name: '咆哮荒原', level: 20, monsters: ['direWolf', 'babyTiamat', 'crimsonBabyDragon', 'ancientSatyr', 'satyrWarlord'], boss: 'alphaWolf', shop: 'gludioCastle', town: false },
  giranOutskirts:  { name: '奇岩近郊', level: 25, monsters: ['skeleton', 'skeletonArcher', 'deathRider', 'giranGargoyle', 'giranGladiator'], boss: 'minotaurKnight', shop: 'giranOutskirts', town: true },
  orcenRuins:      { name: '歐瑞遺跡', level: 30, monsters: ['orcenRuinsOrc', 'cursedWarrior', 'ruinShamanOrc', 'tombLooterOrc', 'ancientOrcExecutioner'], boss: 'orcenOverlord', shop: 'giranOutskirts' },
  forsakenCrypt:   { name: '被遺忘的墓穴', level: 35, monsters: ['darkMage', 'corpseWorm', 'furiousSouls', 'cryptVampire', 'devilBone'], boss: 'cryptLord', shop: 'gludioCastle', town: false },
  blackCitadel:    { name: '黑色城塞', level: 40, monsters: ['deathKnight', 'deathWizard', 'citadelDarkPriest', 'blackDragonWhelp', 'blackDragon'], boss: 'flamingDemonLord', shop: 'dragonValley', town: true },
  gludioCastle:    { name: '古魯丁城堡', level: 45, monsters: ['knight', 'cursedKnight', 'gludioRoyalArcher', 'gludioSorcerer', 'gludioShieldMaster'], boss: 'gludioCommander', shop: 'gludioCastle', town: true },
  wolfMountain:    { name: '狼之山脈', level: 48, monsters: ['mountainWolf', 'mountainDireWolf', 'frostStalkerWolf', 'mountainSnowBear', 'frostFangBehemoth'], boss: 'mountainAlphaWolf', shop: 'gludioCastle' },
  riftOfTheVoid:   { name: '虛空裂縫', level: 50, monsters: ['voidCreature', 'voidBrute', 'voidStalker', 'beholder', 'voidArchonEntity'], boss: 'voidDragonLord', shop: 'dragonValley', town: false },
  emeraldGrove:    { name: '翡翠森林', level: 60, monsters: ['emeraldSnake', 'emeraldDrake', 'jadeGolem', 'groveSpiritMage', 'emeraldDragon'], boss: 'fafurion', shop: 'dragonValley', town: false },
  underworldGate:  { name: '冥界之門', level: 70, monsters: ['blazingWerewolf', 'swiftBlaze', 'infernalHound', 'lavaFiend', 'flameOverlordDemon'], boss: 'cerberus', shop: 'dragonValley', town: false },
  valleyOfSaints:  { name: '聖者之谷', level: 72, monsters: ['saintEye', 'saintGuardian', 'splendorLight', 'celestialArchon', 'divineSeraphim'], boss: 'splendorKnight', shop: 'adenCity', town: false },
  swampOfScreams:  { name: '悲鳴沼澤', level: 74, monsters: ['swampStrikers', 'corruptedSpiders', 'screamingSouls', 'stakatoWarrior', 'stakatoQueenBrood'], boss: 'swampAbomination', shop: 'adenCity', town: false },
  adenCity:        { name: '亞丁城', level: 76, monsters: ['royalKnight', 'highMage', 'adenCrossbowman', 'adenPaladin', 'adenHighJusticiar'], boss: 'adenCommander', shop: 'adenCity', town: true },
  dragonValley:    { name: '龍之谷', level: 80, monsters: ['dragon', 'dragonKnight', 'frostKnight', 'frostLordDragon', 'dragonValleyOverlord'], boss: 'lindvior', shop: 'dragonValley', town: true },
  imperialTomb:    { name: '帝國陵墓', level: 85, monsters: ['tombGuardian', 'sepulcherArchon', 'undeadKnight', 'imperialGhostMage', 'lichLord'], boss: 'deathKing', shop: 'adenCity', town: false },
  antharasLair:    { name: "安塔瑞斯巢穴", level: 90, monsters: ['caveDrake', 'magmaBeast', 'earthDrake', 'caveWyrmBehemoth', 'antharasBehemoth'], boss: 'antharas', shop: 'dragonValley', town: false },
  forgeOfGods:     { name: '諸神熔爐', level: 95, monsters: ['valakasMinion', 'lavaGolem', 'flameArchon', 'flameGiantDragon', 'vulcanLord'], boss: 'valakas', shop: 'dragonValley', town: false },

  // ═══════════════════════════════════════════════════════════════════════
  // SEVEN SIGNS: NECROPOLIS & CATACOMBS (Drops Canônicos de Seal Stones)
  // ═══════════════════════════════════════════════════════════════════════
  necro_sacrifice: { name: '祭品死靈墓地', level: 32, monsters: ['necro_lilim_butcher', 'necro_nephilim_sentinel', 'necro_tomb_priest'], boss: 'necro_sacrifice_boss', shop: 'giranOutskirts', town: false },
  necro_pilgrim:   { name: '巡禮者死靈墓地', level: 42, monsters: ['necro_lilim_assassin', 'necro_nephilim_guard', 'necro_crypt_shaman'], boss: 'necro_pilgrim_boss', shop: 'gludioCastle', town: false },
  necro_worship:   { name: '禮拜者死靈墓地', level: 52, monsters: ['necro_gargoyle_watcher', 'necro_lilim_magus', 'necro_dusk_templar'], boss: 'necro_worship_boss', shop: 'gludioCastle', town: false },
  necro_patriot:   { name: '愛國者死靈墓地', level: 62, monsters: ['necro_patriot_berserker', 'necro_patriot_bishop', 'necro_patriot_drake'], boss: 'necro_patriot_boss', shop: 'dragonValley', town: false },
  necro_ascetics:  { name: '禁慾者地下墓穴', level: 72, monsters: ['necro_ascetic_slayer', 'necro_ascetic_crusader', 'necro_ascetic_seer'], boss: 'necro_ascetic_boss', shop: 'adenCity', town: false },
  necro_martyrs:   { name: '殉教者地下墓穴', level: 76, monsters: ['necro_martyr_dreadnought', 'necro_martyr_sorcerer', 'necro_martyr_gargoyle'], boss: 'necro_martyr_boss', shop: 'adenCity', town: false },
  necro_apostles:  { name: '使徒地下墓穴', level: 80, monsters: ['necro_apostle_vanguard', 'necro_apostle_hierophant', 'necro_apostle_behemoth'], boss: 'necro_apostle_boss', shop: 'adenCity', town: false },
  necro_disciple:  { name: '門徒死靈墓地', level: 84, monsters: ['necro_disciple_knight', 'necro_disciple_sorceress', 'necro_disciple_executioner'], boss: 'necro_disciple_boss', shop: 'adenCity', town: false }
};

/**
 * Mapa de imagens de background para cada zona e boss de raid.
 * Usado por updateZoneBackground() ao entrar em uma nova zona.
 */
export const ZONE_BACKGROUNDS = {
  // Vilas e bases iniciais
  talkingIsland:  '/img/Maps/talkingIsland.png',
  elvenForest:    '/img/Maps/elvenForest.png',
  darkForest:     '/img/Maps/DarkElvenForest.png',
  orcVillage:     '/img/Maps/orcVillage.png',
  dwarvenMine:    '/img/Maps/dwarvenMine.png',
  kamaelLair:     '/img/Maps/kamaellair.jpg',
  ruinedOutpost:  '/img/ruinedOutpost.png',
  howlingMoor:    '/img/Maps/howlingmoor.jpg',

  // Zonas de caça e castelos
  giranOutskirts: '/img/Maps/giraoutskirts.jpg',
  orcenRuins:     '/img/Maps/orcenRuins.png',
  forsakenCrypt:  '/img/Maps/forsakencrypt.jpg',
  blackCitadel:   '/img/Maps/blackcitaddel.jpg',
  gludioCastle:   '/img/Maps/gludiocastle.jpg',
  wolfMountain:   '/img/Maps/wolfMountain.jpg',
  riftOfTheVoid:  '/img/Maps/riftofthevoid.jpg',
  emeraldGrove:   '/img/Maps/emeraldgrove.jpg',
  underworldGate: '/img/Maps/gatesoftheunderworld.jpg',
  valleyOfSaints: '/img/Maps/valleyofsaints.jpg',
  swampOfScreams: '/img/Maps/swampofscreams.jpg',
  adenCity:       '/img/Maps/adencity.jpg',
  dragonValley:   '/img/Maps/dragonvalley.jpg',
  imperialTomb:   '/img/Maps/imperialtomb.jpg',
  antharasLair:   '/img/Maps/antharaslair.jpg',
  forgeOfGods:    '/img/Maps/forgeofgods.jpg',

  // Zonas dos Sete Selos (Necrópoles e Catacumbas)
  necro_sacrifice: '/img/Maps/forsakencrypt.jpg',
  necro_pilgrim:   '/img/Maps/riftofthevoid.jpg',
  necro_worship:   '/img/Maps/orcenRuins.png',
  necro_patriot:   '/img/Maps/blackcitaddel.jpg',
  necro_ascetics:  '/img/Maps/imperialtomb.jpg',
  necro_martyrs:   '/img/Maps/imperialtomb.jpg',
  necro_apostles:  '/img/Maps/gatesoftheunderworld.jpg',
  necro_disciple:  '/img/Maps/antharaslair.jpg',

  // Raid Bosses e Arenas Épicas
  queen_ant:      '/img/Maps/queenant.jpg',
  zaken:          '/img/Maps/zaken.jpg',
  frintezza:      '/img/Maps/frintezza.jpg',
  baium:          '/img/Maps/baium.jpg',
  antharas:       '/img/Maps/antharaslair.jpg',
  valakas:        '/img/Maps/forgeofgods.jpg',
  barakiel:       '/img/Maps/valleyofsaints.jpg'
};

