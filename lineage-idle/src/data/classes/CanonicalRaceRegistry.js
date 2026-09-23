/**
 * CanonicalRaceRegistry.js — Single Source of Truth for Lineage II Essence Races
 * 
 * Auto-generated from authoritative source: scraped_data_wiki/classes_tree_canonical.json
 * Total Canonical Races: 9
 */

export const CANONICAL_RACES = Object.freeze({
  "human": Object.freeze({
    "id": "human",
    "name": "人類",
    "branchesCount": 14,
    "baseClassIds": [
        "fighter",
        "mage",
        "human_deathknight_0",
        "secret_assassin_male_0",
        "werewolf_0"
    ],
    "lineageIds": [
        "duelist",
        "dreadnought",
        "phoenix_knight",
        "hell_knight",
        "adventurer",
        "sagittarius",
        "archmage",
        "soultaker",
        "arcana_lord",
        "cardinal",
        "hierophant",
        "human_deathknight_3",
        "secret_assassin_male_3",
        "werewolf_3"
    ]
}),
  "elf": Object.freeze({
    "id": "elf",
    "name": "精靈",
    "branchesCount": 8,
    "baseClassIds": [
        "elven_fighter",
        "elven_mage",
        "elf_deathknight_0"
    ],
    "lineageIds": [
        "evas_templar",
        "sword_muse",
        "wind_rider",
        "moonlight_sentinel",
        "mystic_muse",
        "elemental_master",
        "evas_saint",
        "elf_deathknight_3"
    ]
}),
  "darkelf": Object.freeze({
    "id": "darkelf",
    "name": "黑暗精靈",
    "branchesCount": 10,
    "baseClassIds": [
        "dark_fighter",
        "dark_mage",
        "delf_deathknight_0",
        "secret_assassin_female_0",
        "rose_vain_0"
    ],
    "lineageIds": [
        "shillien_templar",
        "spectral_dancer",
        "ghost_hunter",
        "ghost_sentinel",
        "storm_screamer",
        "spectral_master",
        "shillien_saint",
        "delf_deathknight_3",
        "secret_assassin_female_3",
        "rose_vain_3"
    ]
}),
  "orc": Object.freeze({
    "id": "orc",
    "name": "半獸人",
    "branchesCount": 5,
    "baseClassIds": [
        "orc_fighter",
        "orc_mage",
        "orc_rider_0"
    ],
    "lineageIds": [
        "titan",
        "grand_khavatari",
        "dominator",
        "doomcryer",
        "orc_rider_3"
    ]
}),
  "dwarf": Object.freeze({
    "id": "dwarf",
    "name": "矮人",
    "branchesCount": 3,
    "baseClassIds": [
        "dwarven_fighter",
        "shineMakerBase"
    ],
    "lineageIds": [
        "fortune_seeker",
        "maestro",
        "shinemaker"
    ]
}),
  "kamael": Object.freeze({
    "id": "kamael",
    "name": "闇天使",
    "branchesCount": 4,
    "baseClassIds": [
        "jin_kamael_soldier",
        "crow_0"
    ],
    "lineageIds": [
        "doombringer",
        "soul_hound",
        "trickster",
        "crow_3"
    ]
}),
  "sylph": Object.freeze({
    "id": "sylph",
    "name": "風精靈",
    "branchesCount": 1,
    "baseClassIds": [
        "sylphid"
    ],
    "lineageIds": [
        "storm_blaster"
    ]
}),
  "highelf": Object.freeze({
    "id": "highelf",
    "name": "高等精靈",
    "branchesCount": 2,
    "baseClassIds": [
        "sacred_templar_0",
        "spirit_0"
    ],
    "lineageIds": [
        "sacred_templar_3",
        "spirit_3"
    ]
}),
  "ertheia": Object.freeze({
    "id": "ertheia",
    "name": "艾爾提亞",
    "branchesCount": 2,
    "baseClassIds": [
        "marauderBase",
        "sayhaMageBase"
    ],
    "lineageIds": [
        "eviscerator",
        "sayhaSeeker"
    ]
}),
});

export const ALL_CANONICAL_RACE_IDS = Object.freeze(Object.keys(CANONICAL_RACES));

export const CanonicalRaceRegistry = {
  getRace(raceId) {
    if (!raceId) return null;
    return CANONICAL_RACES[raceId] || CANONICAL_RACES[String(raceId).toLowerCase()] || null;
  },
  getAllRaces() {
    return Object.values(CANONICAL_RACES);
  },
  hasRace(raceId) {
    if (!raceId) return false;
    return Boolean(CANONICAL_RACES[raceId] || CANONICAL_RACES[String(raceId).toLowerCase()]);
  }
};

export default CANONICAL_RACES;
