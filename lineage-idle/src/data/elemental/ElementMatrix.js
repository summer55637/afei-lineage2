/**
 * ElementMatrix.js — Game Data Contract 3.2: Canonical Active Classes & Element Matrix
 * 
 * Defines exactly the 25 active combat classes, their canonical IDs, display names,
 * racial identity, archetype lineage, tier, and permitted elemental affinities.
 */

import { validateElementalTags } from './ElementHierarchy.js';

export const ELEMENT_MATRIX = {
  // ─── Human (5) ─────────────────────────────────────────────────────────────
  human_fighter: {
    id: 'human_fighter',
    name: '人類戰士',
    race: 'Human',
    lineage: 'Warrior',
    tier: 1,
    allowedElements: ['Physical'],
    isException: false
  },
  human_sorcerer: {
    id: 'human_sorcerer',
    name: '人類術士',
    race: 'Human',
    lineage: 'Mystic',
    tier: 1,
    allowedElements: ['Fire', 'Magma', 'Holy'],
    isException: false
  },
  human_death_knight: {
    id: 'human_death_knight',
    name: '人類死亡騎士',
    race: 'Human',
    lineage: 'Death Knight',
    tier: 1,
    allowedElements: ['Physical', 'Fire', 'Dark'],
    isException: false
  },
  human_warg: {
    id: 'human_warg',
    name: '人類座狼戰士',
    race: 'Human',
    lineage: 'Beast Warrior',
    tier: 1,
    allowedElements: ['Physical'],
    isException: false
  },
  human_assassin: {
    id: 'human_assassin',
    name: '人類刺客',
    race: 'Human',
    lineage: 'Rogue',
    tier: 1,
    allowedElements: ['Physical', 'Dark'],
    isException: false
  },

  // ─── Elf (3) ───────────────────────────────────────────────────────────────
  elf_fighter: {
    id: 'elf_fighter',
    name: '精靈戰士',
    race: 'Elf',
    lineage: 'Warrior',
    tier: 1,
    allowedElements: ['Physical', 'Water'],
    isException: false
  },
  elf_mage: {
    id: 'elf_mage',
    name: '精靈法師',
    race: 'Elf',
    lineage: 'Mystic',
    tier: 1,
    allowedElements: ['Water', 'Ice', 'Holy'],
    isException: false
  },
  elf_death_knight: {
    id: 'elf_death_knight',
    name: '精靈死亡騎士',
    race: 'Elf',
    lineage: 'Death Knight',
    tier: 1,
    allowedElements: ['Physical', 'Water', 'Ice', 'Dark'],
    isException: false
  },

  // ─── Dark Elf (5) ──────────────────────────────────────────────────────────
  dark_elf_fighter: {
    id: 'dark_elf_fighter',
    name: '黑暗精靈戰士',
    race: 'Dark Elf',
    lineage: 'Warrior',
    tier: 1,
    allowedElements: ['Physical', 'Dark', 'Poison'],
    isException: false
  },
  dark_elf_mage: {
    id: 'dark_elf_mage',
    name: '黑暗精靈法師',
    race: 'Dark Elf',
    lineage: 'Mystic',
    tier: 1,
    allowedElements: ['Wind', 'Lightning', 'Dark'],
    isException: false
  },
  dark_elf_death_knight: {
    id: 'dark_elf_death_knight',
    name: '黑暗精靈死亡騎士',
    race: 'Dark Elf',
    lineage: 'Death Knight',
    tier: 1,
    allowedElements: ['Physical', 'Wind', 'Lightning', 'Dark'],
    isException: false
  },
  dark_elf_assassin: {
    id: 'dark_elf_assassin',
    name: '黑暗精靈刺客',
    race: 'Dark Elf',
    lineage: 'Rogue',
    tier: 1,
    allowedElements: ['Physical', 'Dark', 'Poison'],
    isException: false
  },
  dark_elf_blood_rose: {
    id: 'dark_elf_blood_rose',
    name: '黑暗精靈血玫瑰',
    race: 'Dark Elf',
    lineage: 'Mystic Rogue',
    tier: 1,
    allowedElements: ['Physical', 'Dark', 'Blood'],
    isException: false
  },

  // ─── Orc (3) ───────────────────────────────────────────────────────────────
  orc_fighter: {
    id: 'orc_fighter',
    name: '獸人戰士',
    race: 'Orc',
    lineage: 'Warrior',
    tier: 1,
    allowedElements: ['Physical', 'Fire'],
    isException: false
  },
  orc_shaman: {
    id: 'orc_shaman',
    name: '獸人薩滿',
    race: 'Orc',
    lineage: 'Mystic',
    tier: 1,
    allowedElements: ['Physical', 'Fire'],
    isException: false
  },
  orc_vanguard_rider: {
    id: 'orc_vanguard_rider',
    name: '獸人先鋒騎士',
    race: 'Orc',
    lineage: 'Mounted Warrior',
    tier: 1,
    allowedElements: ['Physical', 'Fire'],
    isException: false
  },

  // ─── Dwarf (3) ─────────────────────────────────────────────────────────────
  dwarf_artisan: {
    id: 'dwarf_artisan',
    name: '矮人工匠',
    race: 'Dwarf',
    lineage: 'Crafter',
    tier: 1,
    allowedElements: ['Physical', 'Earth', 'Metal'],
    isException: false
  },
  dwarf_mage: {
    id: 'dwarf_mage',
    name: '矮人法師',
    race: 'Dwarf',
    lineage: 'Earth Mystic',
    tier: 1,
    allowedElements: ['Earth', 'Metal', 'Crystal'],
    isException: false
  },
  dwarf_shinemaker: {
    id: 'dwarf_shinemaker',
    name: '矮人光耀創造者',
    race: 'Dwarf',
    lineage: 'Divine Craftsman',
    tier: 1,
    allowedElements: ['Physical', 'Holy', 'Light'],
    isException: false
  },

  // ─── Kamael (2) ────────────────────────────────────────────────────────────
  kamael_soulbreaker: {
    id: 'kamael_soulbreaker',
    name: '闇天使靈魂破壞者',
    race: 'Kamael',
    lineage: 'Soul Warrior',
    tier: 1,
    allowedElements: ['Physical', 'Dark'],
    isException: false
  },
  kamael_samurai: {
    id: 'kamael_samurai',
    name: '闇天使武士',
    race: 'Kamael',
    lineage: 'Blade Master',
    tier: 1,
    allowedElements: ['Physical', 'Wind'],
    isException: false
  },

  // ─── Ertheia / Sylph (2) ───────────────────────────────────────────────────
  ertheia_storm_blaster: {
    id: 'ertheia_storm_blaster',
    name: '賽爾芙暴風砲手',
    race: 'Sylph',
    lineage: 'Gunner / Blaster',
    tier: 1,
    allowedElements: ['Wind'],
    isException: false
  },
  ertheia_marauder: {
    id: 'ertheia_marauder',
    name: '艾爾提亞掠襲者',
    race: 'Ertheia',
    lineage: 'Fighter / Seeker',
    tier: 1,
    allowedElements: ['Physical', 'Wind'],
    isException: false
  },

  // ─── High Elf (2) ──────────────────────────────────────────────────────────
  high_elf_divine_templar: {
    id: 'high_elf_divine_templar',
    name: '高等精靈神聖聖騎士',
    race: 'High Elf',
    lineage: 'Holy Knight',
    tier: 1,
    allowedElements: ['Physical', 'Holy', 'Light'],
    isException: false
  },
  high_elf_element_weaver: {
    id: 'high_elf_element_weaver',
    name: '高等精靈元素編織者',
    race: 'High Elf',
    lineage: 'Prismatic Mystic',
    tier: 1,
    allowedElements: ['Fire', 'Water', 'Wind', 'Earth'],
    isException: true // Section 14: Formal multi-element exception
  }
};

/**
 * Array of the 25 canonical active classes.
 */
export const ACTIVE_CLASSES = Object.values(ELEMENT_MATRIX);

/**
 * Retrieves the active class entity by canonical ID.
 * @param {string} classId
 * @returns {object|null}
 */
export function getActiveClass(classId) {
  return ELEMENT_MATRIX[classId] || null;
}

/**
 * Checks whether a given class ID is one of the 25 canonical active classes.
 * @param {string} classId
 * @returns {boolean}
 */
export function isActiveClass(classId) {
  return Boolean(ELEMENT_MATRIX[classId]);
}

/**
 * Validates a skill's elemental tags against a class's permitted affinities.
 * Uses strict .every() semantics (Section 13).
 * @param {string} classId
 * @param {string[]} skillElements
 * @returns {boolean}
 */
export function validateClassElements(classId, skillElements) {
  const classDef = getActiveClass(classId);
  if (!classDef) return false;
  return validateElementalTags(skillElements, classDef.allowedElements);
}
