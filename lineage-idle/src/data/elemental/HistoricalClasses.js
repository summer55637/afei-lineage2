/**
 * HistoricalClasses.js — Game Data Contract 3.2: Canonical Historical Lineage Classes
 * 
 * Defines the 72 canonical historical classes representing the progression hierarchy
 * derived from classic Lineage II advancement trees (Human, Elf, Dark Elf, Orc).
 * 
 * Invariants:
 * - EXPECTED_HISTORICAL_CLASSES = 72
 * - Breakdown:
 *   - BASE_CLASS: 1 (human_mystic)
 *   - FIRST_CLASS_TRANSFER: 14
 *   - SECOND_CLASS_TRANSFER: 28
 *   - THIRD_CLASS_AWAKENING: 29
 *   - Total: 1 + 14 + 28 + 29 = 72
 * - Semantic deduplication note: 'orc_mage' is resolved as a semantic alias of active class 'orc_shaman'.
 */

export const HISTORICAL_CLASSES = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ─── Human Lineage (27 classes) ───────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════

  // Human Warrior Branch
  {
    id: 'human_warrior',
    name: '戰士',
    race: 'Human',
    lineage: 'Human Warrior',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'human_fighter',
    successors: ['human_gladiator', 'human_warlord'],
    sourceClassId: 'warrior',
    status: 'historical'
  },
  {
    id: 'human_gladiator',
    name: '角鬥士',
    race: 'Human',
    lineage: 'Human Warrior',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'human_warrior',
    successors: ['human_duelist'],
    sourceClassId: 'gladiator',
    status: 'historical'
  },
  {
    id: 'human_duelist',
    name: '決鬥者',
    race: 'Human',
    lineage: 'Human Warrior',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'human_gladiator',
    successors: [],
    sourceClassId: 'duelist',
    status: 'historical'
  },
  {
    id: 'human_warlord',
    name: '戰爭領主',
    race: 'Human',
    lineage: 'Human Warrior',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'human_warrior',
    successors: ['human_dreadnought'],
    sourceClassId: 'warlord',
    status: 'historical'
  },
  {
    id: 'human_dreadnought',
    name: '恐懼戰艦',
    race: 'Human',
    lineage: 'Human Warrior',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'human_warlord',
    successors: [],
    sourceClassId: 'dreadnought',
    status: 'historical'
  },

  // Human Knight Branch
  {
    id: 'human_knight',
    name: '騎士',
    race: 'Human',
    lineage: 'Human Knight',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'human_fighter',
    successors: ['human_paladin', 'human_dark_avenger'],
    sourceClassId: 'knight',
    status: 'historical'
  },
  {
    id: 'human_paladin',
    name: '聖騎士',
    race: 'Human',
    lineage: 'Human Knight',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'human_knight',
    successors: ['human_phoenix_knight'],
    sourceClassId: 'paladin',
    status: 'historical'
  },
  {
    id: 'human_phoenix_knight',
    name: '鳳凰騎士',
    race: 'Human',
    lineage: 'Human Knight',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'human_paladin',
    successors: [],
    sourceClassId: 'phoenixKnight',
    status: 'historical'
  },
  {
    id: 'human_dark_avenger',
    name: '黑暗復仇者',
    race: 'Human',
    lineage: 'Human Knight',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'human_knight',
    successors: ['human_hell_knight'],
    sourceClassId: 'darkAvenger',
    status: 'historical'
  },
  {
    id: 'human_hell_knight',
    name: '地獄騎士',
    race: 'Human',
    lineage: 'Human Knight',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'human_dark_avenger',
    successors: [],
    sourceClassId: 'hellKnight',
    status: 'historical'
  },

  // Human Rogue Branch
  {
    id: 'human_rogue',
    name: '盜賊',
    race: 'Human',
    lineage: 'Human Rogue',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'human_fighter',
    successors: ['human_treasure_hunter', 'human_hawkeye'],
    sourceClassId: 'rogue',
    status: 'historical'
  },
  {
    id: 'human_treasure_hunter',
    name: '寶藏獵人',
    race: 'Human',
    lineage: 'Human Rogue',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'human_rogue',
    successors: ['human_adventurer'],
    sourceClassId: 'treasureHunter',
    status: 'historical'
  },
  {
    id: 'human_adventurer',
    name: '冒險家',
    race: 'Human',
    lineage: 'Human Rogue',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'human_treasure_hunter',
    successors: [],
    sourceClassId: 'adventurer',
    status: 'historical'
  },
  {
    id: 'human_hawkeye',
    name: '鷹眼',
    race: 'Human',
    lineage: 'Human Rogue',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'human_rogue',
    successors: ['human_sagittarius'],
    sourceClassId: 'hawkeye',
    status: 'historical'
  },
  {
    id: 'human_sagittarius',
    name: '射手座',
    race: 'Human',
    lineage: 'Human Rogue',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'human_hawkeye',
    successors: [],
    sourceClassId: 'sagittarius',
    status: 'historical'
  },

  // Human Mystic Branch
  {
    id: 'human_mystic',
    name: 'Human Mystic',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'BASE_CLASS',
    requiredLevel: 1,
    predecessor: null,
    successors: ['human_wizard', 'human_cleric'],
    sourceClassId: 'mystic',
    status: 'historical'
  },
  {
    id: 'human_wizard',
    name: '巫師',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'human_mystic',
    successors: ['human_necromancer', 'human_warlock'],
    sourceClassId: 'wizard',
    status: 'historical'
  },
  {
    id: 'human_archmage',
    name: '大法師',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'human_sorcerer',
    successors: [],
    sourceClassId: 'archmage',
    status: 'historical'
  },
  {
    id: 'human_necromancer',
    name: '死靈法師',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'human_wizard',
    successors: ['human_soultaker'],
    sourceClassId: 'necromancer',
    status: 'historical'
  },
  {
    id: 'human_soultaker',
    name: '奪魂者',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'human_necromancer',
    successors: [],
    sourceClassId: 'soultaker',
    status: 'historical'
  },
  {
    id: 'human_warlock',
    name: '召喚術士',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'human_wizard',
    successors: ['human_arcana_lord'],
    sourceClassId: 'warlock',
    status: 'historical'
  },
  {
    id: 'human_arcana_lord',
    name: '奧術領主',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'human_warlock',
    successors: [],
    sourceClassId: 'arcanaLord',
    status: 'historical'
  },
  {
    id: 'human_cleric',
    name: '牧師',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'human_mystic',
    successors: ['human_bishop', 'human_prophet'],
    sourceClassId: 'cleric',
    status: 'historical'
  },
  {
    id: 'human_bishop',
    name: '主教',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'human_cleric',
    successors: ['human_cardinal'],
    sourceClassId: 'bishop',
    status: 'historical'
  },
  {
    id: 'human_cardinal',
    name: '樞機主教',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'human_bishop',
    successors: [],
    sourceClassId: 'cardinal',
    status: 'historical'
  },
  {
    id: 'human_prophet',
    name: '先知',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'human_cleric',
    successors: ['human_hierophant'],
    sourceClassId: 'prophet',
    status: 'historical'
  },
  {
    id: 'human_hierophant',
    name: '聖言者',
    race: 'Human',
    lineage: 'Human Mystic',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'human_prophet',
    successors: [],
    sourceClassId: 'hierophant',
    status: 'historical'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── Elf Lineage (18 classes) ─────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════

  // Elven Knight Branch
  {
    id: 'elf_knight',
    name: '精靈騎士',
    race: 'Elf',
    lineage: 'Elven Knight',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'elf_fighter',
    successors: ['elf_temple_knight', 'elf_swordsinger'],
    sourceClassId: 'elvenKnight',
    status: 'historical'
  },
  {
    id: 'elf_temple_knight',
    name: '聖殿騎士',
    race: 'Elf',
    lineage: 'Elven Knight',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'elf_knight',
    successors: ['elf_evas_templar'],
    sourceClassId: 'templeKnight',
    status: 'historical'
  },
  {
    id: 'elf_evas_templar',
    name: "Eva's Templar",
    race: 'Elf',
    lineage: 'Elven Knight',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'elf_temple_knight',
    successors: [],
    sourceClassId: 'evasTemplar',
    status: 'historical'
  },
  {
    id: 'elf_swordsinger',
    name: '劍歌者',
    race: 'Elf',
    lineage: 'Elven Knight',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'elf_knight',
    successors: ['elf_sword_muse'],
    sourceClassId: 'swordsinger',
    status: 'historical'
  },
  {
    id: 'elf_sword_muse',
    name: '劍之繆思',
    race: 'Elf',
    lineage: 'Elven Knight',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'elf_swordsinger',
    successors: [],
    sourceClassId: 'swordMuse',
    status: 'historical'
  },

  // Elven Scout Branch
  {
    id: 'elf_scout',
    name: '斥候',
    race: 'Elf',
    lineage: 'Elven Scout',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'elf_fighter',
    successors: ['elf_plainswalker', 'elf_silver_ranger'],
    sourceClassId: 'elvenScout',
    status: 'historical'
  },
  {
    id: 'elf_plainswalker',
    name: 'Plainswalker',
    race: 'Elf',
    lineage: 'Elven Scout',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'elf_scout',
    successors: ['elf_wind_rider'],
    sourceClassId: 'plainsWalker',
    status: 'historical'
  },
  {
    id: 'elf_wind_rider',
    name: '風騎士',
    race: 'Elf',
    lineage: 'Elven Scout',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'elf_plainswalker',
    successors: [],
    sourceClassId: 'windRider',
    status: 'historical'
  },
  {
    id: 'elf_silver_ranger',
    name: '銀月遊俠',
    race: 'Elf',
    lineage: 'Elven Scout',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'elf_scout',
    successors: ['elf_moonlight_sentinel'],
    sourceClassId: 'silverRanger',
    status: 'historical'
  },
  {
    id: 'elf_moonlight_sentinel',
    name: '月光守衛',
    race: 'Elf',
    lineage: 'Elven Scout',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'elf_silver_ranger',
    successors: [],
    sourceClassId: 'moonlightSentinel',
    status: 'historical'
  },

  // Elven Wizard Branch
  {
    id: 'elf_wizard',
    name: '精靈巫師',
    race: 'Elf',
    lineage: 'Elven Mystic',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'elf_mage',
    successors: ['elf_spellsinger', 'elf_elemental_summoner'],
    sourceClassId: 'elvenWizard',
    status: 'historical'
  },
  {
    id: 'elf_spellsinger',
    name: '咒術詩人',
    race: 'Elf',
    lineage: 'Elven Mystic',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'elf_wizard',
    successors: ['elf_mystic_muse'],
    sourceClassId: 'spellsinger',
    status: 'historical'
  },
  {
    id: 'elf_mystic_muse',
    name: '神秘繆思',
    race: 'Elf',
    lineage: 'Elven Mystic',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'elf_spellsinger',
    successors: [],
    sourceClassId: 'mysticMuse',
    status: 'historical'
  },
  {
    id: 'elf_elemental_summoner',
    name: '元素召喚師',
    race: 'Elf',
    lineage: 'Elven Mystic',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'elf_wizard',
    successors: ['elf_elemental_master'],
    sourceClassId: 'elementalSummoner',
    status: 'historical'
  },
  {
    id: 'elf_elemental_master',
    name: '元素大師',
    race: 'Elf',
    lineage: 'Elven Mystic',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'elf_elemental_summoner',
    successors: [],
    sourceClassId: 'elementalMaster',
    status: 'historical'
  },

  // Elven Oracle Branch
  {
    id: 'elf_oracle',
    name: 'Elven Oracle',
    race: 'Elf',
    lineage: 'Elven Cleric',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'elf_mage',
    successors: ['elf_elder'],
    sourceClassId: 'elvenOracle',
    status: 'historical'
  },
  {
    id: 'elf_elder',
    name: 'Elven Elder',
    race: 'Elf',
    lineage: 'Elven Cleric',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'elf_oracle',
    successors: ['elf_evas_saint'],
    sourceClassId: 'elvenElder',
    status: 'historical'
  },
  {
    id: 'elf_evas_saint',
    name: "Eva's Saint",
    race: 'Elf',
    lineage: 'Elven Cleric',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'elf_elder',
    successors: [],
    sourceClassId: 'evasSaint',
    status: 'historical'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── Dark Elf Lineage (17 classes) ────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════

  // Palus Knight Branch
  {
    id: 'dark_elf_palus_knight',
    name: '帕魯斯騎士',
    race: 'Dark Elf',
    lineage: 'Palus Knight',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'dark_elf_fighter',
    successors: ['dark_elf_shillien_knight'],
    sourceClassId: 'palusKnight',
    status: 'historical'
  },
  {
    id: 'dark_elf_shillien_knight',
    name: '席琳騎士',
    race: 'Dark Elf',
    lineage: 'Palus Knight',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'dark_elf_palus_knight',
    successors: ['dark_elf_shillien_templar'],
    sourceClassId: 'shillienKnight',
    status: 'historical'
  },
  {
    id: 'dark_elf_shillien_templar',
    name: '席琳聖殿騎士',
    race: 'Dark Elf',
    lineage: 'Palus Knight',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'dark_elf_shillien_knight',
    successors: [],
    sourceClassId: 'shillienTemplar',
    status: 'historical'
  },

  // Dark Elf Assassin / Rogue Branch (branches from active dark_elf_assassin)
  {
    id: 'dark_elf_abyss_walker',
    name: '深淵行者',
    race: 'Dark Elf',
    lineage: 'Dark Elf Assassin',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'dark_elf_assassin',
    successors: ['dark_elf_ghost_hunter'],
    sourceClassId: 'abyssWalker',
    status: 'historical'
  },
  {
    id: 'dark_elf_ghost_hunter',
    name: '幽靈獵人',
    race: 'Dark Elf',
    lineage: 'Dark Elf Assassin',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'dark_elf_abyss_walker',
    successors: [],
    sourceClassId: 'ghostHunter',
    status: 'historical'
  },
  {
    id: 'dark_elf_phantom_ranger',
    name: '幽靈遊俠',
    race: 'Dark Elf',
    lineage: 'Dark Elf Assassin',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'dark_elf_assassin',
    successors: ['dark_elf_ghost_sentinel'],
    sourceClassId: 'phantomRanger',
    status: 'historical'
  },
  {
    id: 'dark_elf_ghost_sentinel',
    name: '幽靈守衛',
    race: 'Dark Elf',
    lineage: 'Dark Elf Assassin',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'dark_elf_phantom_ranger',
    successors: [],
    sourceClassId: 'ghostSentinel',
    status: 'historical'
  },
  {
    id: 'dark_elf_bladedancer',
    name: '劍舞者',
    race: 'Dark Elf',
    lineage: 'Dark Elf Assassin',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'dark_elf_assassin',
    successors: ['dark_elf_spectral_dancer'],
    sourceClassId: 'bladeDancer',
    status: 'historical'
  },
  {
    id: 'dark_elf_spectral_dancer',
    name: '幽靈舞者',
    race: 'Dark Elf',
    lineage: 'Dark Elf Assassin',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'dark_elf_bladedancer',
    successors: [],
    sourceClassId: 'spectralDancer',
    status: 'historical'
  },

  // Dark Wizard Branch
  {
    id: 'dark_elf_wizard',
    name: '黑暗巫師',
    race: 'Dark Elf',
    lineage: 'Dark Mystic',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'dark_elf_mage',
    successors: ['dark_elf_spellhowler', 'dark_elf_phantom_summoner'],
    sourceClassId: 'darkWizard',
    status: 'historical'
  },
  {
    id: 'dark_elf_spellhowler',
    name: '狂咒術士',
    race: 'Dark Elf',
    lineage: 'Dark Mystic',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'dark_elf_wizard',
    successors: ['dark_elf_storm_screamer'],
    sourceClassId: 'spellhowler',
    status: 'historical'
  },
  {
    id: 'dark_elf_storm_screamer',
    name: '暴風狂嘯者',
    race: 'Dark Elf',
    lineage: 'Dark Mystic',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'dark_elf_spellhowler',
    successors: [],
    sourceClassId: 'stormScreamer',
    status: 'historical'
  },
  {
    id: 'dark_elf_phantom_summoner',
    name: '幽靈召喚師',
    race: 'Dark Elf',
    lineage: 'Dark Mystic',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'dark_elf_wizard',
    successors: ['dark_elf_spectral_master'],
    sourceClassId: 'phantomSummoner',
    status: 'historical'
  },
  {
    id: 'dark_elf_spectral_master',
    name: '幽靈大師',
    race: 'Dark Elf',
    lineage: 'Dark Mystic',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'dark_elf_phantom_summoner',
    successors: [],
    sourceClassId: 'spectralMaster',
    status: 'historical'
  },

  // Shillien Oracle Branch
  {
    id: 'dark_elf_shillien_oracle',
    name: '席琳神使',
    race: 'Dark Elf',
    lineage: 'Shillien Cleric',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'dark_elf_mage',
    successors: ['dark_elf_shillien_elder'],
    sourceClassId: 'shillienOracle',
    status: 'historical'
  },
  {
    id: 'dark_elf_shillien_elder',
    name: '席琳長老',
    race: 'Dark Elf',
    lineage: 'Shillien Cleric',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'dark_elf_shillien_oracle',
    successors: ['dark_elf_shillien_saint'],
    sourceClassId: 'shillienElder',
    status: 'historical'
  },
  {
    id: 'dark_elf_shillien_saint',
    name: '席琳聖者',
    race: 'Dark Elf',
    lineage: 'Shillien Cleric',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'dark_elf_shillien_elder',
    successors: [],
    sourceClassId: 'shillienSaint',
    status: 'historical'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── Orc Lineage (11 classes) ─────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════

  // Orc Mystic Base
  {
    id: 'orc_mage',
    name: '半獸人法師',
    race: 'Orc',
    lineage: 'Orc Mystic',
    lineageType: 'BASE_CLASS',
    requiredLevel: 1,
    predecessor: null,
    successors: ['orc_shaman'],
    sourceClassId: 'orcMage',
    status: 'historical'
  },

  // Orc Raider Branch
  {
    id: 'orc_raider',
    name: '掠奪者',
    race: 'Orc',
    lineage: 'Orc Raider',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'orc_fighter',
    successors: ['orc_destroyer'],
    sourceClassId: 'orcRaider',
    status: 'historical'
  },
  {
    id: 'orc_destroyer',
    name: '破壞者',
    race: 'Orc',
    lineage: 'Orc Raider',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'orc_raider',
    successors: ['orc_titan'],
    sourceClassId: 'destroyer',
    status: 'historical'
  },
  {
    id: 'orc_titan',
    name: '泰坦',
    race: 'Orc',
    lineage: 'Orc Raider',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'orc_destroyer',
    successors: [],
    sourceClassId: 'titan',
    status: 'historical'
  },

  // Orc Monk Branch
  {
    id: 'orc_monk',
    name: '武僧',
    race: 'Orc',
    lineage: 'Orc Monk',
    lineageType: 'FIRST_CLASS_TRANSFER',
    requiredLevel: 20,
    predecessor: 'orc_fighter',
    successors: ['orc_tyrant'],
    sourceClassId: 'orcMonk',
    status: 'historical'
  },
  {
    id: 'orc_tyrant',
    name: '暴君',
    race: 'Orc',
    lineage: 'Orc Monk',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'orc_monk',
    successors: ['orc_grand_khavatari'],
    sourceClassId: 'tyrant',
    status: 'historical'
  },
  {
    id: 'orc_grand_khavatari',
    name: '大卡巴塔里',
    race: 'Orc',
    lineage: 'Orc Monk',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'orc_tyrant',
    successors: [],
    sourceClassId: 'grandKhavatari',
    status: 'historical'
  },

  // Orc Shaman Branch (branches from active orc_shaman)
  {
    id: 'orc_overlord',
    name: '霸主',
    race: 'Orc',
    lineage: 'Orc Shaman',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'orc_shaman',
    successors: ['orc_dominator'],
    sourceClassId: 'overlord',
    status: 'historical'
  },
  {
    id: 'orc_dominator',
    name: '支配者',
    race: 'Orc',
    lineage: 'Orc Shaman',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'orc_overlord',
    successors: [],
    sourceClassId: 'dominator',
    status: 'historical'
  },
  {
    id: 'orc_warcryer',
    name: '戰狂',
    race: 'Orc',
    lineage: 'Orc Shaman',
    lineageType: 'SECOND_CLASS_TRANSFER',
    requiredLevel: 40,
    predecessor: 'orc_shaman',
    successors: ['orc_doomcryer'],
    sourceClassId: 'warcryer',
    status: 'historical'
  },
  {
    id: 'orc_doomcryer',
    name: '末日戰狂',
    race: 'Orc',
    lineage: 'Orc Shaman',
    lineageType: 'THIRD_CLASS_AWAKENING',
    requiredLevel: 76,
    predecessor: 'orc_warcryer',
    successors: [],
    sourceClassId: 'doomcryer',
    status: 'historical'
  }
];

/**
 * Fast lookup map from historical class ID -> class definition.
 */
export const HISTORICAL_CLASS_MAP = new Map(HISTORICAL_CLASSES.map(c => [c.id, c]));

/**
 * Retrieves a historical class definition by its ID.
 * @param {string} id
 * @returns {object|null}
 */
export function getHistoricalClass(id) {
  return HISTORICAL_CLASS_MAP.get(id) || null;
}

/**
 * Checks if a class ID belongs to the historical class registry.
 * @param {string} id
 * @returns {boolean}
 */
export function isHistoricalClass(id) {
  return HISTORICAL_CLASS_MAP.has(id);
}
