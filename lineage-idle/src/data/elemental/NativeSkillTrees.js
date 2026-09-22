/**
 * NativeSkillTrees.js — Game Data Contract 3.2.1 / Deploy 3.1: Native Skill Trees & Endgame Ultimates
 * 
 * Defines the initial canonical 100 baseline skills across 25 active classes (4 slots each),
 * plus the 25 Lv80 Ultimates (★★★★) and 25 Lv90 Master Ultimates (★★★★★).
 * 
 * Every skill explicitly declares:
 * - nativeClasses: [classId]
 * - availableTo: [classId, ...]
 * - inheritedBy: [...]
 * - progressionStage: GENERALIST | SPECIALIZATION | MASTERY | ULTIMATE | MASTER_ULTIMATE
 * - requiredLevel: 1 | 40 | 76 | 80 | 90
 * - role: normalized canonical role
 * - elements: structured elemental tags
 * - vfxId: unique registered visual identity
 */

import { normalizeRole } from './SkillProgression.js';

export const NATIVE_SKILL_TREES = {
  // ─── Human (5 classes = 20 skills) ─────────────────────────────────────────
  human_fighter: [
    { id: 'shield_bash', classId: 'human_fighter', slot: 1, name: '盾牌猛擊', tier: 1, role: 'crowd_control', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_fighter'], availableTo: ['human_fighter'], inheritedBy: [], vfxId: 'vfx_shield_bash' },
    { id: 'cleave_strike', classId: 'human_fighter', slot: 2, name: '劈砍打擊', tier: 1, role: 'aoe_damage', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_fighter'], availableTo: ['human_fighter'], inheritedBy: [], vfxId: 'vfx_cleave_strike' },
    { id: 'iron_stance', classId: 'human_fighter', slot: 3, name: '鋼鐵姿態', tier: 1, role: 'defensive_shield', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_fighter'], availableTo: ['human_fighter'], inheritedBy: [], vfxId: 'vfx_iron_stance' },
    { id: 'concussive_stun', classId: 'human_fighter', slot: 4, name: '震盪暈擊', tier: 1, role: 'finisher', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_fighter'], availableTo: ['human_fighter'], inheritedBy: [], vfxId: 'vfx_concussive_stun' }
  ],
  human_sorcerer: [
    { id: 'fireball', classId: 'human_sorcerer', slot: 1, name: '火球術', tier: 1, role: 'burst_damage', tags: ['Fire'], elements: ['Fire'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_sorcerer'], availableTo: ['human_sorcerer', 'human_archmage'], inheritedBy: ['human_archmage'], vfxId: 'vfx_fireball' },
    { id: 'magma_spike', classId: 'human_sorcerer', slot: 2, name: '岩漿尖刺', tier: 1, role: 'aoe_damage', tags: ['Magma'], elements: ['Magma'], requiredLevel: 76, progressionStage: 'MASTERY', nativeClasses: ['human_sorcerer'], availableTo: ['human_sorcerer', 'human_archmage'], inheritedBy: ['human_archmage'], vfxId: 'vfx_magma_spike' },
    { id: 'holy_bolt', classId: 'human_sorcerer', slot: 3, name: '神聖箭', tier: 1, role: 'burst_damage', tags: ['Holy'], elements: ['Holy'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_sorcerer'], availableTo: ['human_sorcerer', 'human_archmage'], inheritedBy: ['human_archmage'], vfxId: 'vfx_holy_bolt' },
    { id: 'flame_nova', classId: 'human_sorcerer', slot: 4, name: '火焰新星', tier: 1, role: 'aoe_damage', tags: ['Fire'], elements: ['Fire'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_sorcerer'], availableTo: ['human_sorcerer', 'human_archmage'], inheritedBy: ['human_archmage'], vfxId: 'vfx_flame_nova' }
  ],
  human_death_knight: [
    { id: 'cinderblade', classId: 'human_death_knight', slot: 1, name: '灰燼之刃', tier: 1, role: 'burst_damage', tags: ['Fire', 'Dark'], elements: ['Fire', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_death_knight'], availableTo: ['human_death_knight'], inheritedBy: [], vfxId: 'vfx_cinderblade' },
    { id: 'hellfire_grasp', classId: 'human_death_knight', slot: 2, name: '地獄火之爪', tier: 1, role: 'crowd_control', tags: ['Fire', 'Dark'], elements: ['Fire', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_death_knight'], availableTo: ['human_death_knight'], inheritedBy: [], vfxId: 'vfx_hellfire_grasp' },
    { id: 'ashen_shroud', classId: 'human_death_knight', slot: 3, name: '灰燼帷幕', tier: 1, role: 'defensive_shield', tags: ['Dark'], elements: ['Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_death_knight'], availableTo: ['human_death_knight'], inheritedBy: [], vfxId: 'vfx_ashen_shroud' },
    { id: 'infernal_judgment', classId: 'human_death_knight', slot: 4, name: '煉獄審判', tier: 1, role: 'finisher', tags: ['Fire', 'Dark'], elements: ['Fire', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_death_knight'], availableTo: ['human_death_knight'], inheritedBy: [], vfxId: 'vfx_infernal_judgment' }
  ],
  human_warg: [
    { id: 'savage_bite', classId: 'human_warg', slot: 1, name: '野性撕咬', tier: 1, role: 'burst_damage', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_warg'], availableTo: ['human_warg'], inheritedBy: [], vfxId: 'vfx_savage_bite' },
    { id: 'pack_howl', classId: 'human_warg', slot: 2, name: '狼群嚎叫', tier: 1, role: 'buff_support', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_warg'], availableTo: ['human_warg'], inheritedBy: [], vfxId: 'vfx_pack_howl' },
    { id: 'feral_pounce', classId: 'human_warg', slot: 3, name: '野性撲擊', tier: 1, role: 'mobility', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_warg'], availableTo: ['human_warg'], inheritedBy: [], vfxId: 'vfx_feral_pounce' },
    { id: 'beast_form', classId: 'human_warg', slot: 4, name: '野獸形態', tier: 1, role: 'buff_support', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_warg'], availableTo: ['human_warg'], inheritedBy: [], vfxId: 'vfx_beast_form' }
  ],
  human_assassin: [
    { id: 'shadow_clone', classId: 'human_assassin', slot: 1, name: '暗影分身', tier: 1, role: 'buff_support', tags: ['Dark'], elements: ['Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_assassin'], availableTo: ['human_assassin'], inheritedBy: [], vfxId: 'vfx_shadow_clone' },
    { id: 'gloom_strike', classId: 'human_assassin', slot: 2, name: '幽暗打擊', tier: 1, role: 'burst_damage', tags: ['Dark', 'Physical'], elements: ['Dark', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_assassin'], availableTo: ['human_assassin'], inheritedBy: [], vfxId: 'vfx_gloom_strike' },
    { id: 'veil_step', classId: 'human_assassin', slot: 3, name: '帷幕步伐', tier: 1, role: 'mobility', tags: ['Dark'], elements: ['Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_assassin'], availableTo: ['human_assassin'], inheritedBy: [], vfxId: 'vfx_veil_step' },
    { id: 'night_execution', classId: 'human_assassin', slot: 4, name: '夜襲處決', tier: 1, role: 'finisher', tags: ['Dark', 'Physical'], elements: ['Dark', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['human_assassin'], availableTo: ['human_assassin'], inheritedBy: [], vfxId: 'vfx_night_execution' }
  ],

  // ─── Elf (3 classes = 12 skills) ───────────────────────────────────────────
  elf_fighter: [
    { id: 'aqua_arrow', classId: 'elf_fighter', slot: 1, name: '水之箭', tier: 1, role: 'burst_damage', tags: ['Water', 'Physical'], elements: ['Water', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['elf_fighter'], availableTo: ['elf_fighter'], inheritedBy: [], vfxId: 'vfx_aqua_arrow' },
    { id: 'tide_step', classId: 'elf_fighter', slot: 2, name: '潮汐步伐', tier: 1, role: 'mobility', tags: ['Water'], elements: ['Water'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['elf_fighter'], availableTo: ['elf_fighter'], inheritedBy: [], vfxId: 'vfx_tide_step' },
    { id: 'mist_guard', classId: 'elf_fighter', slot: 3, name: '霧之守護', tier: 1, role: 'defensive_shield', tags: ['Water'], elements: ['Water'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['elf_fighter'], availableTo: ['elf_fighter'], inheritedBy: [], vfxId: 'vfx_mist_guard' },
    { id: 'riptide_volley', classId: 'elf_fighter', slot: 4, name: '激流齊射', tier: 1, role: 'aoe_damage', tags: ['Water', 'Physical'], elements: ['Water', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['elf_fighter'], availableTo: ['elf_fighter'], inheritedBy: [], vfxId: 'vfx_riptide_volley' }
  ],
  elf_mage: [
    { id: 'hydro_blast', classId: 'elf_mage', slot: 1, name: '水流爆破', tier: 1, role: 'burst_damage', tags: ['Water'], elements: ['Water'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['elf_mage'], availableTo: ['elf_mage'], inheritedBy: [], vfxId: 'vfx_hydro_blast' },
    { id: 'blizzard', classId: 'elf_mage', slot: 2, name: '暴風雪', tier: 2, role: 'aoe_damage', tags: ['Ice'], elements: ['Ice'], requiredLevel: 76, progressionStage: 'MASTERY', nativeClasses: ['elf_mage'], availableTo: ['elf_mage'], inheritedBy: [], vfxId: 'vfx_blizzard' },
    { id: 'healing_wave', classId: 'elf_mage', slot: 3, name: '治癒波', tier: 1, role: 'sustain_heal', tags: ['Holy', 'Water'], elements: ['Holy', 'Water'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['elf_mage'], availableTo: ['elf_mage'], inheritedBy: [], vfxId: 'vfx_healing_wave' },
    { id: 'tidal_surge', classId: 'elf_mage', slot: 4, name: '潮汐奔湧', tier: 1, role: 'finisher', tags: ['Water'], elements: ['Water'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['elf_mage'], availableTo: ['elf_mage'], inheritedBy: [], vfxId: 'vfx_tidal_surge' }
  ],
  elf_death_knight: [
    { id: 'frost_edge', classId: 'elf_death_knight', slot: 1, name: '冰霜之刃', tier: 1, role: 'burst_damage', tags: ['Ice', 'Dark'], elements: ['Ice', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['elf_death_knight'], availableTo: ['elf_death_knight'], inheritedBy: [], vfxId: 'vfx_frost_edge' },
    { id: 'shattering_gaze', classId: 'elf_death_knight', slot: 2, name: '碎裂凝視', tier: 1, role: 'crowd_control', tags: ['Ice', 'Dark'], elements: ['Ice', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['elf_death_knight'], availableTo: ['elf_death_knight'], inheritedBy: [], vfxId: 'vfx_shattering_gaze' },
    { id: 'cursed_frost_veil', classId: 'elf_death_knight', slot: 3, name: '詛咒冰霜帷幕', tier: 1, role: 'defensive_shield', tags: ['Ice', 'Dark'], elements: ['Ice', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['elf_death_knight'], availableTo: ['elf_death_knight'], inheritedBy: [], vfxId: 'vfx_cursed_frost_veil' },
    { id: 'glacial_judgment', classId: 'elf_death_knight', slot: 4, name: '冰川審判', tier: 1, role: 'finisher', tags: ['Ice', 'Dark'], elements: ['Ice', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['elf_death_knight'], availableTo: ['elf_death_knight'], inheritedBy: [], vfxId: 'vfx_glacial_judgment' }
  ],

  // ─── Dark Elf (5 classes = 20 skills) ──────────────────────────────────────
  dark_elf_fighter: [
    { id: 'venom_edge', classId: 'dark_elf_fighter', slot: 1, name: '毒刃', tier: 1, role: 'burst_damage', tags: ['Dark', 'Poison'], elements: ['Dark', 'Poison'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_fighter'], availableTo: ['dark_elf_fighter'], inheritedBy: [], vfxId: 'vfx_venom_edge' },
    { id: 'life_siphon', classId: 'dark_elf_fighter', slot: 2, name: '生命汲取', tier: 1, role: 'sustain_heal', tags: ['Dark'], elements: ['Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_fighter'], availableTo: ['dark_elf_fighter'], inheritedBy: [], vfxId: 'vfx_life_siphon' },
    { id: 'umbral_dash', classId: 'dark_elf_fighter', slot: 3, name: '暗影突進', tier: 1, role: 'mobility', tags: ['Dark'], elements: ['Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_fighter'], availableTo: ['dark_elf_fighter'], inheritedBy: [], vfxId: 'vfx_umbral_dash' },
    { id: 'crippling_slash', classId: 'dark_elf_fighter', slot: 4, name: '殘廢斬擊', tier: 1, role: 'debuff_hex', tags: ['Dark', 'Physical'], elements: ['Dark', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_fighter'], availableTo: ['dark_elf_fighter'], inheritedBy: [], vfxId: 'vfx_crippling_slash' }
  ],
  dark_elf_mage: [
    { id: 'hurricane', classId: 'dark_elf_mage', slot: 1, name: '颶風', tier: 1, role: 'aoe_damage', tags: ['Wind'], elements: ['Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_mage'], availableTo: ['dark_elf_mage'], inheritedBy: [], vfxId: 'vfx_hurricane' },
    { id: 'chain_lightning', classId: 'dark_elf_mage', slot: 2, name: '連鎖閃電', tier: 2, role: 'burst_damage', tags: ['Lightning'], elements: ['Lightning'], requiredLevel: 76, progressionStage: 'MASTERY', nativeClasses: ['dark_elf_mage'], availableTo: ['dark_elf_mage'], inheritedBy: [], vfxId: 'vfx_chain_lightning' },
    { id: 'curse_of_shadow', classId: 'dark_elf_mage', slot: 3, name: '暗影詛咒', tier: 1, role: 'debuff_hex', tags: ['Dark'], elements: ['Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_mage'], availableTo: ['dark_elf_mage'], inheritedBy: [], vfxId: 'vfx_curse_of_shadow' },
    { id: 'gale_slash', classId: 'dark_elf_mage', slot: 4, name: '烈風斬', tier: 1, role: 'burst_damage', tags: ['Wind'], elements: ['Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_mage'], availableTo: ['dark_elf_mage'], inheritedBy: [], vfxId: 'vfx_gale_slash' }
  ],
  dark_elf_death_knight: [
    { id: 'voltaic_edge', classId: 'dark_elf_death_knight', slot: 1, name: '雷電之刃', tier: 1, role: 'burst_damage', tags: ['Lightning', 'Dark'], elements: ['Lightning', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_death_knight'], availableTo: ['dark_elf_death_knight'], inheritedBy: [], vfxId: 'vfx_voltaic_edge' },
    { id: 'storm_judgment', classId: 'dark_elf_death_knight', slot: 2, name: '暴風審判', tier: 1, role: 'finisher', tags: ['Lightning', 'Dark'], elements: ['Lightning', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_death_knight'], availableTo: ['dark_elf_death_knight'], inheritedBy: [], vfxId: 'vfx_storm_judgment' },
    { id: 'thunder_veil', classId: 'dark_elf_death_knight', slot: 3, name: '雷霆帷幕', tier: 1, role: 'defensive_shield', tags: ['Lightning', 'Dark'], elements: ['Lightning', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_death_knight'], availableTo: ['dark_elf_death_knight'], inheritedBy: [], vfxId: 'vfx_thunder_veil' },
    { id: 'shocking_grasp', classId: 'dark_elf_death_knight', slot: 4, name: '電擊之爪', tier: 1, role: 'crowd_control', tags: ['Lightning', 'Dark'], elements: ['Lightning', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_death_knight'], availableTo: ['dark_elf_death_knight'], inheritedBy: [], vfxId: 'vfx_shocking_grasp' }
  ],
  dark_elf_assassin: [
    { id: 'toxic_flurry', classId: 'dark_elf_assassin', slot: 1, name: '毒素亂舞', tier: 1, role: 'aoe_damage', tags: ['Poison', 'Dark'], elements: ['Poison', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_assassin'], availableTo: ['dark_elf_assassin'], inheritedBy: [], vfxId: 'vfx_toxic_flurry' },
    { id: 'venom_fang', classId: 'dark_elf_assassin', slot: 2, name: '毒牙', tier: 1, role: 'burst_damage', tags: ['Poison'], elements: ['Poison'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_assassin'], availableTo: ['dark_elf_assassin'], inheritedBy: [], vfxId: 'vfx_venom_fang' },
    { id: 'shadow_toxin', classId: 'dark_elf_assassin', slot: 3, name: '暗影毒素', tier: 1, role: 'debuff_hex', tags: ['Dark', 'Poison'], elements: ['Dark', 'Poison'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_assassin'], availableTo: ['dark_elf_assassin'], inheritedBy: [], vfxId: 'vfx_shadow_toxin' },
    { id: 'lethal_dose', classId: 'dark_elf_assassin', slot: 4, name: '致命劑量', tier: 1, role: 'finisher', tags: ['Poison', 'Dark'], elements: ['Poison', 'Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_assassin'], availableTo: ['dark_elf_assassin'], inheritedBy: [], vfxId: 'vfx_lethal_dose' }
  ],
  dark_elf_blood_rose: [
    { id: 'thorned_hex', classId: 'dark_elf_blood_rose', slot: 1, name: '荊棘詛咒', tier: 1, role: 'debuff_hex', tags: ['Dark', 'Blood'], elements: ['Dark', 'Blood'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_blood_rose'], availableTo: ['dark_elf_blood_rose'], inheritedBy: [], vfxId: 'vfx_thorned_hex' },
    { id: 'crimson_drain', classId: 'dark_elf_blood_rose', slot: 2, name: '緋紅汲取', tier: 1, role: 'sustain_heal', tags: ['Blood'], elements: ['Blood'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_blood_rose'], availableTo: ['dark_elf_blood_rose'], inheritedBy: [], vfxId: 'vfx_crimson_drain' },
    { id: 'wilting_touch', classId: 'dark_elf_blood_rose', slot: 3, name: '凋零之觸', tier: 1, role: 'debuff_hex', tags: ['Dark', 'Blood'], elements: ['Dark', 'Blood'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_blood_rose'], availableTo: ['dark_elf_blood_rose'], inheritedBy: [], vfxId: 'vfx_wilting_touch' },
    { id: 'rose_requiem', classId: 'dark_elf_blood_rose', slot: 4, name: '玫瑰安魂曲', tier: 1, role: 'finisher', tags: ['Dark', 'Blood'], elements: ['Dark', 'Blood'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dark_elf_blood_rose'], availableTo: ['dark_elf_blood_rose'], inheritedBy: [], vfxId: 'vfx_rose_requiem' }
  ],

  // ─── Orc (3 classes = 12 skills) ───────────────────────────────────────────
  orc_fighter: [
    { id: 'totem_rage', classId: 'orc_fighter', slot: 1, name: '圖騰狂怒', tier: 1, role: 'buff_support', tags: ['Fire', 'Physical'], elements: ['Fire', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_fighter'], availableTo: ['orc_fighter'], inheritedBy: [], vfxId: 'vfx_totem_rage' },
    { id: 'brutal_cleave', classId: 'orc_fighter', slot: 2, name: '殘暴劈砍', tier: 1, role: 'aoe_damage', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_fighter'], availableTo: ['orc_fighter'], inheritedBy: [], vfxId: 'vfx_brutal_cleave' },
    { id: 'war_stomp', classId: 'orc_fighter', slot: 3, name: '戰爭踐踏', tier: 1, role: 'crowd_control', tags: ['Physical', 'Fire'], elements: ['Physical', 'Fire'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_fighter'], availableTo: ['orc_fighter'], inheritedBy: [], vfxId: 'vfx_war_stomp' },
    { id: 'blood_frenzy', classId: 'orc_fighter', slot: 4, name: '血之狂亂', tier: 1, role: 'buff_support', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_fighter'], availableTo: ['orc_fighter'], inheritedBy: [], vfxId: 'vfx_blood_frenzy' }
  ],
  orc_shaman: [
    { id: 'flame_totem', classId: 'orc_shaman', slot: 1, name: '火焰圖騰', tier: 1, role: 'buff_support', tags: ['Fire'], elements: ['Fire'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_shaman'], availableTo: ['orc_shaman'], inheritedBy: [], vfxId: 'vfx_flame_totem' },
    { id: 'war_chant', classId: 'orc_shaman', slot: 2, name: '戰爭頌歌', tier: 1, role: 'buff_support', tags: ['Fire'], elements: ['Fire'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_shaman'], availableTo: ['orc_shaman'], inheritedBy: [], vfxId: 'vfx_war_chant' },
    { id: 'ember_bolt', classId: 'orc_shaman', slot: 3, name: '餘燼箭', tier: 1, role: 'burst_damage', tags: ['Fire'], elements: ['Fire'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_shaman'], availableTo: ['orc_shaman'], inheritedBy: [], vfxId: 'vfx_ember_bolt' },
    { id: 'scorching_ground', classId: 'orc_shaman', slot: 4, name: '灼熱大地', tier: 1, role: 'aoe_damage', tags: ['Fire'], elements: ['Fire'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_shaman'], availableTo: ['orc_shaman'], inheritedBy: [], vfxId: 'vfx_scorching_ground' }
  ],
  orc_vanguard_rider: [
    { id: 'flaming_charge', classId: 'orc_vanguard_rider', slot: 1, name: '烈焰衝鋒', tier: 1, role: 'mobility', tags: ['Physical', 'Fire'], elements: ['Physical', 'Fire'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_vanguard_rider'], availableTo: ['orc_vanguard_rider'], inheritedBy: [], vfxId: 'vfx_flaming_charge' },
    { id: 'spear_of_embers', classId: 'orc_vanguard_rider', slot: 2, name: '餘燼長矛', tier: 1, role: 'burst_damage', tags: ['Physical', 'Fire'], elements: ['Physical', 'Fire'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_vanguard_rider'], availableTo: ['orc_vanguard_rider'], inheritedBy: [], vfxId: 'vfx_spear_of_embers' },
    { id: 'trample', classId: 'orc_vanguard_rider', slot: 3, name: '踐踏', tier: 1, role: 'crowd_control', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_vanguard_rider'], availableTo: ['orc_vanguard_rider'], inheritedBy: [], vfxId: 'vfx_trample' },
    { id: 'wildfire_lance', classId: 'orc_vanguard_rider', slot: 4, name: '野火長槍', tier: 1, role: 'finisher', tags: ['Fire', 'Physical'], elements: ['Fire', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['orc_vanguard_rider'], availableTo: ['orc_vanguard_rider'], inheritedBy: [], vfxId: 'vfx_wildfire_lance' }
  ],

  // ─── Dwarf (3 classes = 12 skills) ─────────────────────────────────────────
  dwarf_artisan: [
    { id: 'hammer_slam', classId: 'dwarf_artisan', slot: 1, name: '戰鎚猛擊', tier: 1, role: 'burst_damage', tags: ['Earth', 'Physical'], elements: ['Earth', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_artisan'], availableTo: ['dwarf_artisan'], inheritedBy: [], vfxId: 'vfx_hammer_slam' },
    { id: 'construct_summon', classId: 'dwarf_artisan', slot: 2, name: '召喚構裝體', tier: 1, role: 'buff_support', tags: ['Earth', 'Metal'], elements: ['Earth', 'Metal'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_artisan'], availableTo: ['dwarf_artisan'], inheritedBy: [], vfxId: 'vfx_construct_summon' },
    { id: 'reinforced_plating', classId: 'dwarf_artisan', slot: 3, name: '強化裝甲', tier: 1, role: 'defensive_shield', tags: ['Metal'], elements: ['Metal'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_artisan'], availableTo: ['dwarf_artisan'], inheritedBy: [], vfxId: 'vfx_reinforced_plating' },
    { id: 'seismic_stun', classId: 'dwarf_artisan', slot: 4, name: '地震暈擊', tier: 1, role: 'crowd_control', tags: ['Earth', 'Physical'], elements: ['Earth', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_artisan'], availableTo: ['dwarf_artisan'], inheritedBy: [], vfxId: 'vfx_seismic_stun' }
  ],
  dwarf_mage: [
    { id: 'terremoto', classId: 'dwarf_mage', slot: 1, name: '地震', tier: 1, role: 'aoe_damage', tags: ['Earth'], elements: ['Earth'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_mage'], availableTo: ['dwarf_mage'], inheritedBy: [], vfxId: 'vfx_terremoto' },
    { id: 'rochedo', classId: 'dwarf_mage', slot: 2, name: '巨岩', tier: 1, role: 'burst_damage', tags: ['Earth'], elements: ['Earth'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_mage'], availableTo: ['dwarf_mage'], inheritedBy: [], vfxId: 'vfx_rochedo' },
    { id: 'golem_de_metal', classId: 'dwarf_mage', slot: 3, name: '金屬魔像', tier: 1, role: 'buff_support', tags: ['Metal'], elements: ['Metal'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_mage'], availableTo: ['dwarf_mage'], inheritedBy: [], vfxId: 'vfx_golem_de_metal' },
    { id: 'garra_metalica', classId: 'dwarf_mage', slot: 4, name: '金屬之爪', tier: 1, role: 'burst_damage', tags: ['Metal'], elements: ['Metal'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_mage'], availableTo: ['dwarf_mage'], inheritedBy: [], vfxId: 'vfx_garra_metalica' }
  ],
  dwarf_shinemaker: [
    { id: 'radiant_hammer', classId: 'dwarf_shinemaker', slot: 1, name: '光輝戰鎚', tier: 1, role: 'burst_damage', tags: ['Holy'], elements: ['Holy'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_shinemaker'], availableTo: ['dwarf_shinemaker'], inheritedBy: [], vfxId: 'vfx_radiant_hammer' },
    { id: 'guiding_light', classId: 'dwarf_shinemaker', slot: 2, name: '引導之光', tier: 1, role: 'buff_support', tags: ['Holy'], elements: ['Holy'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_shinemaker'], availableTo: ['dwarf_shinemaker'], inheritedBy: [], vfxId: 'vfx_guiding_light' },
    { id: 'celestial_forge', classId: 'dwarf_shinemaker', slot: 3, name: '天界鍛爐', tier: 1, role: 'buff_support', tags: ['Holy'], elements: ['Holy'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_shinemaker'], availableTo: ['dwarf_shinemaker'], inheritedBy: [], vfxId: 'vfx_celestial_forge' },
    { id: 'sunfall_smash', classId: 'dwarf_shinemaker', slot: 4, name: '落日猛擊', tier: 1, role: 'finisher', tags: ['Holy'], elements: ['Holy'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['dwarf_shinemaker'], availableTo: ['dwarf_shinemaker'], inheritedBy: [], vfxId: 'vfx_sunfall_smash' }
  ],

  // ─── Kamael (2 classes = 8 skills) ─────────────────────────────────────────
  kamael_soulbreaker: [
    { id: 'soul_rend', classId: 'kamael_soulbreaker', slot: 1, name: '靈魂撕裂', tier: 1, role: 'burst_damage', tags: ['Dark'], elements: ['Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['kamael_soulbreaker'], availableTo: ['kamael_soulbreaker'], inheritedBy: [], vfxId: 'vfx_soul_rend' },
    { id: 'abyssal_pierce', classId: 'kamael_soulbreaker', slot: 2, name: '深淵穿刺', tier: 1, role: 'burst_damage', tags: ['Dark', 'Physical'], elements: ['Dark', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['kamael_soulbreaker'], availableTo: ['kamael_soulbreaker'], inheritedBy: [], vfxId: 'vfx_abyssal_pierce' },
    { id: 'essence_drain', classId: 'kamael_soulbreaker', slot: 3, name: '精華汲取', tier: 1, role: 'sustain_heal', tags: ['Dark'], elements: ['Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['kamael_soulbreaker'], availableTo: ['kamael_soulbreaker'], inheritedBy: [], vfxId: 'vfx_essence_drain' },
    { id: 'shadowmark', classId: 'kamael_soulbreaker', slot: 4, name: '暗影印記', tier: 1, role: 'debuff_hex', tags: ['Dark'], elements: ['Dark'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['kamael_soulbreaker'], availableTo: ['kamael_soulbreaker'], inheritedBy: [], vfxId: 'vfx_shadowmark' }
  ],
  kamael_samurai: [
    { id: 'iaijutsu_strike', classId: 'kamael_samurai', slot: 1, name: '居合斬', tier: 1, role: 'burst_damage', tags: ['Physical', 'Wind'], elements: ['Physical', 'Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['kamael_samurai'], availableTo: ['kamael_samurai'], inheritedBy: [], vfxId: 'vfx_iaijutsu_strike' },
    { id: 'gale_step', classId: 'kamael_samurai', slot: 2, name: '烈風步', tier: 1, role: 'mobility', tags: ['Wind', 'Physical'], elements: ['Wind', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['kamael_samurai'], availableTo: ['kamael_samurai'], inheritedBy: [], vfxId: 'vfx_gale_step' },
    { id: 'silent_edge', classId: 'kamael_samurai', slot: 3, name: '無聲之刃', tier: 1, role: 'burst_damage', tags: ['Physical'], elements: ['Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['kamael_samurai'], availableTo: ['kamael_samurai'], inheritedBy: [], vfxId: 'vfx_silent_edge' },
    { id: 'tempest_form', classId: 'kamael_samurai', slot: 4, name: '暴風形態', tier: 1, role: 'buff_support', tags: ['Wind', 'Physical'], elements: ['Wind', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['kamael_samurai'], availableTo: ['kamael_samurai'], inheritedBy: [], vfxId: 'vfx_tempest_form' }
  ],

  // ─── Ertheia / Sylph (2 classes = 8 skills) ────────────────────────────────
  ertheia_storm_blaster: [
    { id: 'gale_shot', classId: 'ertheia_storm_blaster', slot: 1, name: '烈風射擊', tier: 1, role: 'burst_damage', tags: ['Wind'], elements: ['Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['ertheia_storm_blaster'], availableTo: ['ertheia_storm_blaster'], inheritedBy: [], vfxId: 'vfx_gale_shot' },
    { id: 'cyclone_trap', classId: 'ertheia_storm_blaster', slot: 2, name: '旋風陷阱', tier: 1, role: 'crowd_control', tags: ['Wind'], elements: ['Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['ertheia_storm_blaster'], availableTo: ['ertheia_storm_blaster'], inheritedBy: [], vfxId: 'vfx_cyclone_trap' },
    { id: 'sky_dance', classId: 'ertheia_storm_blaster', slot: 3, name: '天空之舞', tier: 1, role: 'mobility', tags: ['Wind'], elements: ['Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['ertheia_storm_blaster'], availableTo: ['ertheia_storm_blaster'], inheritedBy: [], vfxId: 'vfx_sky_dance' },
    { id: 'tempest_barrage', classId: 'ertheia_storm_blaster', slot: 4, name: '暴風彈幕', tier: 1, role: 'aoe_damage', tags: ['Wind'], elements: ['Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['ertheia_storm_blaster'], availableTo: ['ertheia_storm_blaster'], inheritedBy: [], vfxId: 'vfx_tempest_barrage' }
  ],
  ertheia_marauder: [
    { id: 'whirlwind_dash', classId: 'ertheia_marauder', slot: 1, name: '旋風突進', tier: 1, role: 'mobility', tags: ['Wind', 'Physical'], elements: ['Wind', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['ertheia_marauder'], availableTo: ['ertheia_marauder'], inheritedBy: [], vfxId: 'vfx_whirlwind_dash' },
    { id: 'spirit_gale', classId: 'ertheia_marauder', slot: 2, name: '靈魂烈風', tier: 1, role: 'burst_damage', tags: ['Wind'], elements: ['Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['ertheia_marauder'], availableTo: ['ertheia_marauder'], inheritedBy: [], vfxId: 'vfx_spirit_gale' },
    { id: 'twin_gust_slash', classId: 'ertheia_marauder', slot: 3, name: '雙重烈風斬', tier: 1, role: 'burst_damage', tags: ['Wind', 'Physical'], elements: ['Wind', 'Physical'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['ertheia_marauder'], availableTo: ['ertheia_marauder'], inheritedBy: [], vfxId: 'vfx_twin_gust_slash' },
    { id: 'tempest_veil', classId: 'ertheia_marauder', slot: 4, name: '暴風帷幕', tier: 1, role: 'buff_support', tags: ['Wind'], elements: ['Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['ertheia_marauder'], availableTo: ['ertheia_marauder'], inheritedBy: [], vfxId: 'vfx_tempest_veil' }
  ],

  // ─── High Elf (2 classes = 8 skills) ───────────────────────────────────────
  high_elf_divine_templar: [
    { id: 'divine_bulwark', classId: 'high_elf_divine_templar', slot: 1, name: '神聖堡壘', tier: 1, role: 'defensive_shield', tags: ['Holy'], elements: ['Holy'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['high_elf_divine_templar'], availableTo: ['high_elf_divine_templar'], inheritedBy: [], vfxId: 'vfx_divine_bulwark' },
    { id: 'retribution_flare', classId: 'high_elf_divine_templar', slot: 2, name: '懲戒烈焰', tier: 1, role: 'burst_damage', tags: ['Holy'], elements: ['Holy'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['high_elf_divine_templar'], availableTo: ['high_elf_divine_templar'], inheritedBy: [], vfxId: 'vfx_retribution_flare' },
    { id: 'sacred_ward', classId: 'high_elf_divine_templar', slot: 3, name: '神聖守護', tier: 1, role: 'defensive_shield', tags: ['Holy'], elements: ['Holy'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['high_elf_divine_templar'], availableTo: ['high_elf_divine_templar'], inheritedBy: [], vfxId: 'vfx_sacred_ward' },
    { id: 'light_point_judgment', classId: 'high_elf_divine_templar', slot: 4, name: '光點審判', tier: 1, role: 'finisher', tags: ['Holy'], elements: ['Holy'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['high_elf_divine_templar'], availableTo: ['high_elf_divine_templar'], inheritedBy: [], vfxId: 'vfx_light_point_judgment' }
  ],
  high_elf_element_weaver: [
    { id: 'triad_combo', classId: 'high_elf_element_weaver', slot: 1, name: '三元素連擊', tier: 1, role: 'burst_damage', tags: ['Fire', 'Water', 'Wind'], elements: ['Fire', 'Water', 'Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['high_elf_element_weaver'], availableTo: ['high_elf_element_weaver'], inheritedBy: [], isException: true, vfxId: 'vfx_triad_combo' },
    { id: 'elemental_fusion', classId: 'high_elf_element_weaver', slot: 2, name: '元素融合', tier: 1, role: 'aoe_damage', tags: ['Fire', 'Water', 'Wind'], elements: ['Fire', 'Water', 'Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['high_elf_element_weaver'], availableTo: ['high_elf_element_weaver'], inheritedBy: [], isException: true, vfxId: 'vfx_elemental_fusion' },
    { id: 'cascading_storm', classId: 'high_elf_element_weaver', slot: 3, name: '連鎖風暴', tier: 1, role: 'aoe_damage', tags: ['Water', 'Wind'], elements: ['Water', 'Wind'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['high_elf_element_weaver'], availableTo: ['high_elf_element_weaver'], inheritedBy: [], isException: true, vfxId: 'vfx_cascading_storm' },
    { id: 'phoenix_tide', classId: 'high_elf_element_weaver', slot: 4, name: '鳳凰潮汐', tier: 1, role: 'finisher', tags: ['Fire', 'Water'], elements: ['Fire', 'Water'], requiredLevel: 40, progressionStage: 'SPECIALIZATION', nativeClasses: ['high_elf_element_weaver'], availableTo: ['high_elf_element_weaver'], inheritedBy: [], isException: true, vfxId: 'vfx_phoenix_tide' }
  ]
};

// ─── 25 Lv80 Ultimates (★★★★) ────────────────────────────────────────────────
export const ULTIMATE_SKILLS = [
  { id: 'titanbreaker', classId: 'human_fighter', name: '泰坦粉碎', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'burst_damage', elements: ['Physical'], nativeClasses: ['human_fighter'], availableTo: ['human_fighter'], inheritedBy: [], vfxId: 'vfx_titanbreaker', masterUpgrade: { skillId: 'master_titanbreaker', requiredLevel: 90 } },
  { id: 'meteor', classId: 'human_sorcerer', name: '隕石術', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'burst_damage', elements: ['Fire', 'Magma'], nativeClasses: ['human_sorcerer'], availableTo: ['human_sorcerer', 'human_archmage'], inheritedBy: ['human_archmage'], vfxId: 'vfx_meteor', masterUpgrade: { skillId: 'master_meteor', requiredLevel: 90 } },
  { id: 'infernal_apocalypse', classId: 'human_death_knight', name: '煉獄末日', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'finisher', elements: ['Fire', 'Dark'], nativeClasses: ['human_death_knight'], availableTo: ['human_death_knight'], inheritedBy: [], vfxId: 'vfx_infernal_apocalypse', masterUpgrade: { skillId: 'master_infernal_apocalypse', requiredLevel: 90 } },
  { id: 'primal_overrun', classId: 'human_warg', name: '原始踐踏', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'mobility', elements: ['Physical'], nativeClasses: ['human_warg'], availableTo: ['human_warg'], inheritedBy: [], vfxId: 'vfx_primal_overrun', masterUpgrade: { skillId: 'master_primal_overrun', requiredLevel: 90 } },
  { id: 'nightfall_execution', classId: 'human_assassin', name: '暮夜處決', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'finisher', elements: ['Dark', 'Physical'], nativeClasses: ['human_assassin'], availableTo: ['human_assassin'], inheritedBy: [], vfxId: 'vfx_nightfall_execution', masterUpgrade: { skillId: 'master_nightfall_execution', requiredLevel: 90 } },
  { id: 'tidal_ascension', classId: 'elf_fighter', name: '潮汐昇華', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'mobility', elements: ['Water', 'Physical'], nativeClasses: ['elf_fighter'], availableTo: ['elf_fighter'], inheritedBy: [], vfxId: 'vfx_tidal_ascension', masterUpgrade: { skillId: 'master_tidal_ascension', requiredLevel: 90 } },
  { id: 'glacial_cataclysm', classId: 'elf_mage', name: '冰川浩劫', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'aoe_damage', elements: ['Water', 'Ice'], nativeClasses: ['elf_mage'], availableTo: ['elf_mage'], inheritedBy: [], vfxId: 'vfx_glacial_cataclysm', masterUpgrade: { skillId: 'master_glacial_cataclysm', requiredLevel: 90 } },
  { id: 'frostmourne_judgment', classId: 'elf_death_knight', name: '霜悲審判', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'finisher', elements: ['Ice', 'Dark'], nativeClasses: ['elf_death_knight'], availableTo: ['elf_death_knight'], inheritedBy: [], vfxId: 'vfx_frostmourne_judgment', masterUpgrade: { skillId: 'master_frostmourne_judgment', requiredLevel: 90 } },
  { id: 'abyssal_rupture', classId: 'dark_elf_fighter', name: '深淵破裂', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'dot', elements: ['Dark', 'Poison'], nativeClasses: ['dark_elf_fighter'], availableTo: ['dark_elf_fighter'], inheritedBy: [], vfxId: 'vfx_abyssal_rupture', masterUpgrade: { skillId: 'master_abyssal_rupture', requiredLevel: 90 } },
  { id: 'tempest_of_the_abyss', classId: 'dark_elf_mage', name: '深淵風暴', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'aoe_damage', elements: ['Wind', 'Lightning', 'Dark'], nativeClasses: ['dark_elf_mage'], availableTo: ['dark_elf_mage'], inheritedBy: [], vfxId: 'vfx_tempest_of_the_abyss', masterUpgrade: { skillId: 'master_tempest_of_the_abyss', requiredLevel: 90 } },
  { id: 'voltaic_requiem', classId: 'dark_elf_death_knight', name: '雷電安魂曲', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'burst_damage', elements: ['Lightning', 'Dark'], nativeClasses: ['dark_elf_death_knight'], availableTo: ['dark_elf_death_knight'], inheritedBy: [], vfxId: 'vfx_voltaic_requiem', masterUpgrade: { skillId: 'master_voltaic_requiem', requiredLevel: 90 } },
  { id: 'venomous_eclipse', classId: 'dark_elf_assassin', name: '毒蝕日蝕', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'dot', elements: ['Dark', 'Poison'], nativeClasses: ['dark_elf_assassin'], availableTo: ['dark_elf_assassin'], inheritedBy: [], vfxId: 'vfx_venomous_eclipse', masterUpgrade: { skillId: 'master_venomous_eclipse', requiredLevel: 90 } },
  { id: 'crimson_requiem', classId: 'dark_elf_blood_rose', name: '緋紅安魂曲', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'debuff_hex', elements: ['Dark', 'Blood'], nativeClasses: ['dark_elf_blood_rose'], availableTo: ['dark_elf_blood_rose'], inheritedBy: [], vfxId: 'vfx_crimson_requiem', masterUpgrade: { skillId: 'master_crimson_requiem', requiredLevel: 90 } },
  { id: 'worldbreaker_roar', classId: 'orc_fighter', name: '撼世咆哮', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'finisher', elements: ['Physical', 'Fire'], nativeClasses: ['orc_fighter'], availableTo: ['orc_fighter'], inheritedBy: [], vfxId: 'vfx_worldbreaker_roar', masterUpgrade: { skillId: 'master_worldbreaker_roar', requiredLevel: 90 } },
  { id: 'apocalypse_totem', classId: 'orc_shaman', name: '末日圖騰', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'buff_support', elements: ['Fire'], nativeClasses: ['orc_shaman'], availableTo: ['orc_shaman'], inheritedBy: [], vfxId: 'vfx_apocalypse_totem', masterUpgrade: { skillId: 'master_apocalypse_totem', requiredLevel: 90 } },
  { id: 'inferno_charge', classId: 'orc_vanguard_rider', name: '煉獄衝鋒', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'mobility', elements: ['Physical', 'Fire'], nativeClasses: ['orc_vanguard_rider'], availableTo: ['orc_vanguard_rider'], inheritedBy: [], vfxId: 'vfx_inferno_charge', masterUpgrade: { skillId: 'master_inferno_charge', requiredLevel: 90 } },
  { id: 'forge_colossus', classId: 'dwarf_artisan', name: '鍛造巨像', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'utility', elements: ['Earth', 'Metal', 'Physical'], nativeClasses: ['dwarf_artisan'], availableTo: ['dwarf_artisan'], inheritedBy: [], vfxId: 'vfx_forge_colossus', masterUpgrade: { skillId: 'master_forge_colossus', requiredLevel: 90 } },
  { id: 'earthforge_cataclysm', classId: 'dwarf_mage', name: '大地鍛爐浩劫', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'aoe_damage', elements: ['Earth', 'Metal', 'Crystal'], nativeClasses: ['dwarf_mage'], availableTo: ['dwarf_mage'], inheritedBy: [], vfxId: 'vfx_earthforge_cataclysm', masterUpgrade: { skillId: 'master_earthforge_cataclysm', requiredLevel: 90 } },
  { id: 'divine_forge', classId: 'dwarf_shinemaker', name: '神聖鍛爐', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'buff_support', elements: ['Holy'], nativeClasses: ['dwarf_shinemaker'], availableTo: ['dwarf_shinemaker'], inheritedBy: [], vfxId: 'vfx_divine_forge', masterUpgrade: { skillId: 'master_divine_forge', requiredLevel: 90 } },
  { id: 'soul_devastation', classId: 'kamael_soulbreaker', name: '靈魂毀滅', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'sustain_heal', elements: ['Dark', 'Physical'], nativeClasses: ['kamael_soulbreaker'], availableTo: ['kamael_soulbreaker'], inheritedBy: [], vfxId: 'vfx_soul_devastation', masterUpgrade: { skillId: 'master_soul_devastation', requiredLevel: 90 } },
  { id: 'heaven_cutting_tempest', classId: 'kamael_samurai', name: '斬天風暴', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'burst_damage', elements: ['Physical', 'Wind'], nativeClasses: ['kamael_samurai'], availableTo: ['kamael_samurai'], inheritedBy: [], vfxId: 'vfx_heaven_cutting_tempest', masterUpgrade: { skillId: 'master_heaven_cutting_tempest', requiredLevel: 90 } },
  { id: 'cyclone_barrage', classId: 'ertheia_storm_blaster', name: '旋風彈幕', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'aoe_damage', elements: ['Wind'], nativeClasses: ['ertheia_storm_blaster'], availableTo: ['ertheia_storm_blaster'], inheritedBy: [], vfxId: 'vfx_cyclone_barrage', masterUpgrade: { skillId: 'master_cyclone_barrage', requiredLevel: 90 } },
  { id: 'tempest_breaker', classId: 'ertheia_marauder', name: '暴風粉碎', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'mobility', elements: ['Wind', 'Physical'], nativeClasses: ['ertheia_marauder'], availableTo: ['ertheia_marauder'], inheritedBy: [], vfxId: 'vfx_tempest_breaker', masterUpgrade: { skillId: 'master_tempest_breaker', requiredLevel: 90 } },
  { id: 'heavens_aegis', classId: 'high_elf_divine_templar', name: "Heaven's Aegis", rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'defensive_shield', elements: ['Holy'], nativeClasses: ['high_elf_divine_templar'], availableTo: ['high_elf_divine_templar'], inheritedBy: [], vfxId: 'vfx_heavens_aegis', masterUpgrade: { skillId: 'master_heavens_aegis', requiredLevel: 90 } },
  { id: 'prismatic_genesis', classId: 'high_elf_element_weaver', name: '稜光創生', rarity: 4, progressionStage: 'ULTIMATE', requiredLevel: 80, bookRequirement: 'ULTIMATE_BOOK_4', role: 'aoe_damage', elements: ['Fire', 'Water', 'Wind'], nativeClasses: ['high_elf_element_weaver'], availableTo: ['high_elf_element_weaver'], inheritedBy: [], isException: true, vfxId: 'vfx_prismatic_genesis', masterUpgrade: { skillId: 'master_prismatic_genesis', requiredLevel: 90 } }
];

// ─── 25 Lv90 Master Ultimates (★★★★★) ─────────────────────────────────────────
export const MASTER_ULTIMATE_SKILLS = [
  { id: 'master_titanbreaker', classId: 'human_fighter', name: '大師：泰坦粉碎', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'titanbreaker', role: 'burst_damage', elements: ['Physical'], nativeClasses: ['human_fighter'], availableTo: ['human_fighter'], inheritedBy: [], vfxId: 'vfx_master_titanbreaker' },
  { id: 'master_meteor', classId: 'human_sorcerer', name: '大師：隕石術', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'meteor', role: 'burst_damage', elements: ['Fire', 'Magma'], nativeClasses: ['human_sorcerer'], availableTo: ['human_sorcerer', 'human_archmage'], inheritedBy: ['human_archmage'], vfxId: 'vfx_master_meteor' },
  { id: 'master_infernal_apocalypse', classId: 'human_death_knight', name: '大師：煉獄末日', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'infernal_apocalypse', role: 'finisher', elements: ['Fire', 'Dark'], nativeClasses: ['human_death_knight'], availableTo: ['human_death_knight'], inheritedBy: [], vfxId: 'vfx_master_infernal_apocalypse' },
  { id: 'master_primal_overrun', classId: 'human_warg', name: '大師：原始踐踏', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'primal_overrun', role: 'mobility', elements: ['Physical'], nativeClasses: ['human_warg'], availableTo: ['human_warg'], inheritedBy: [], vfxId: 'vfx_master_primal_overrun' },
  { id: 'master_nightfall_execution', classId: 'human_assassin', name: '大師：暮夜處決', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'nightfall_execution', role: 'finisher', elements: ['Dark', 'Physical'], nativeClasses: ['human_assassin'], availableTo: ['human_assassin'], inheritedBy: [], vfxId: 'vfx_master_nightfall_execution' },
  { id: 'master_tidal_ascension', classId: 'elf_fighter', name: '大師：潮汐昇華', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'tidal_ascension', role: 'mobility', elements: ['Water', 'Physical'], nativeClasses: ['elf_fighter'], availableTo: ['elf_fighter'], inheritedBy: [], vfxId: 'vfx_master_tidal_ascension' },
  { id: 'master_glacial_cataclysm', classId: 'elf_mage', name: '大師：冰川浩劫', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'glacial_cataclysm', role: 'aoe_damage', elements: ['Water', 'Ice'], nativeClasses: ['elf_mage'], availableTo: ['elf_mage'], inheritedBy: [], vfxId: 'vfx_master_glacial_cataclysm' },
  { id: 'master_frostmourne_judgment', classId: 'elf_death_knight', name: '大師：霜悲審判', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'frostmourne_judgment', role: 'finisher', elements: ['Ice', 'Dark'], nativeClasses: ['elf_death_knight'], availableTo: ['elf_death_knight'], inheritedBy: [], vfxId: 'vfx_master_frostmourne_judgment' },
  { id: 'master_abyssal_rupture', classId: 'dark_elf_fighter', name: '大師：深淵破裂', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'abyssal_rupture', role: 'dot', elements: ['Dark', 'Poison'], nativeClasses: ['dark_elf_fighter'], availableTo: ['dark_elf_fighter'], inheritedBy: [], vfxId: 'vfx_master_abyssal_rupture' },
  { id: 'master_tempest_of_the_abyss', classId: 'dark_elf_mage', name: '大師：深淵風暴', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'tempest_of_the_abyss', role: 'aoe_damage', elements: ['Wind', 'Lightning', 'Dark'], nativeClasses: ['dark_elf_mage'], availableTo: ['dark_elf_mage'], inheritedBy: [], vfxId: 'vfx_master_tempest_of_the_abyss' },
  { id: 'master_voltaic_requiem', classId: 'dark_elf_death_knight', name: '大師：雷電安魂曲', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'voltaic_requiem', role: 'burst_damage', elements: ['Lightning', 'Dark'], nativeClasses: ['dark_elf_death_knight'], availableTo: ['dark_elf_death_knight'], inheritedBy: [], vfxId: 'vfx_master_voltaic_requiem' },
  { id: 'master_venomous_eclipse', classId: 'dark_elf_assassin', name: '大師：毒蝕日蝕', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'venomous_eclipse', role: 'dot', elements: ['Dark', 'Poison'], nativeClasses: ['dark_elf_assassin'], availableTo: ['dark_elf_assassin'], inheritedBy: [], vfxId: 'vfx_master_venomous_eclipse' },
  { id: 'master_crimson_requiem', classId: 'dark_elf_blood_rose', name: '大師：緋紅安魂曲', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'crimson_requiem', role: 'debuff_hex', elements: ['Dark', 'Blood'], nativeClasses: ['dark_elf_blood_rose'], availableTo: ['dark_elf_blood_rose'], inheritedBy: [], vfxId: 'vfx_master_crimson_requiem' },
  { id: 'master_worldbreaker_roar', classId: 'orc_fighter', name: '大師：撼世咆哮', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'worldbreaker_roar', role: 'finisher', elements: ['Physical', 'Fire'], nativeClasses: ['orc_fighter'], availableTo: ['orc_fighter'], inheritedBy: [], vfxId: 'vfx_master_worldbreaker_roar' },
  { id: 'master_apocalypse_totem', classId: 'orc_shaman', name: '大師：末日圖騰', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'apocalypse_totem', role: 'buff_support', elements: ['Fire'], nativeClasses: ['orc_shaman'], availableTo: ['orc_shaman'], inheritedBy: [], vfxId: 'vfx_master_apocalypse_totem' },
  { id: 'master_inferno_charge', classId: 'orc_vanguard_rider', name: '大師：煉獄衝鋒', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'inferno_charge', role: 'mobility', elements: ['Physical', 'Fire'], nativeClasses: ['orc_vanguard_rider'], availableTo: ['orc_vanguard_rider'], inheritedBy: [], vfxId: 'vfx_master_inferno_charge' },
  { id: 'master_forge_colossus', classId: 'dwarf_artisan', name: '大師：鍛造巨像', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'forge_colossus', role: 'utility', elements: ['Earth', 'Metal', 'Physical'], nativeClasses: ['dwarf_artisan'], availableTo: ['dwarf_artisan'], inheritedBy: [], vfxId: 'vfx_master_forge_colossus' },
  { id: 'master_earthforge_cataclysm', classId: 'dwarf_mage', name: '大師：大地鍛爐浩劫', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'earthforge_cataclysm', role: 'aoe_damage', elements: ['Earth', 'Metal', 'Crystal'], nativeClasses: ['dwarf_mage'], availableTo: ['dwarf_mage'], inheritedBy: [], vfxId: 'vfx_master_earthforge_cataclysm' },
  { id: 'master_divine_forge', classId: 'dwarf_shinemaker', name: '大師：神聖鍛爐', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'divine_forge', role: 'buff_support', elements: ['Holy'], nativeClasses: ['dwarf_shinemaker'], availableTo: ['dwarf_shinemaker'], inheritedBy: [], vfxId: 'vfx_master_divine_forge' },
  { id: 'master_soul_devastation', classId: 'kamael_soulbreaker', name: '大師：靈魂毀滅', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'soul_devastation', role: 'sustain_heal', elements: ['Dark', 'Physical'], nativeClasses: ['kamael_soulbreaker'], availableTo: ['kamael_soulbreaker'], inheritedBy: [], vfxId: 'vfx_master_soul_devastation' },
  { id: 'master_heaven_cutting_tempest', classId: 'kamael_samurai', name: '大師：斬天風暴', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'heaven_cutting_tempest', role: 'burst_damage', elements: ['Physical', 'Wind'], nativeClasses: ['kamael_samurai'], availableTo: ['kamael_samurai'], inheritedBy: [], vfxId: 'vfx_master_heaven_cutting_tempest' },
  { id: 'master_cyclone_barrage', classId: 'ertheia_storm_blaster', name: '大師：旋風彈幕', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'cyclone_barrage', role: 'aoe_damage', elements: ['Wind'], nativeClasses: ['ertheia_storm_blaster'], availableTo: ['ertheia_storm_blaster'], inheritedBy: [], vfxId: 'vfx_master_cyclone_barrage' },
  { id: 'master_tempest_breaker', classId: 'ertheia_marauder', name: '大師：暴風粉碎', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'tempest_breaker', role: 'mobility', elements: ['Wind', 'Physical'], nativeClasses: ['ertheia_marauder'], availableTo: ['ertheia_marauder'], inheritedBy: [], vfxId: 'vfx_master_tempest_breaker' },
  { id: 'master_heavens_aegis', classId: 'high_elf_divine_templar', name: "Master: Heaven's Aegis", rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'heavens_aegis', role: 'defensive_shield', elements: ['Holy'], nativeClasses: ['high_elf_divine_templar'], availableTo: ['high_elf_divine_templar'], inheritedBy: [], vfxId: 'vfx_master_heavens_aegis' },
  { id: 'master_prismatic_genesis', classId: 'high_elf_element_weaver', name: '大師：稜光創生', rarity: 5, progressionStage: 'MASTER_ULTIMATE', requiredLevel: 90, upgradeOf: 'prismatic_genesis', role: 'aoe_damage', elements: ['Fire', 'Water', 'Wind'], nativeClasses: ['high_elf_element_weaver'], availableTo: ['high_elf_element_weaver'], inheritedBy: [], isException: true, vfxId: 'vfx_master_prismatic_genesis' }
];

/**
 * Baseline 100 native skills.
 */
export const ALL_NATIVE_SKILLS = Object.values(NATIVE_SKILL_TREES).flat();

/**
 * Endgame skills: 25 Ultimates + 25 Master Ultimates = 50 skills.
 */
export const ALL_ENDGAME_SKILLS = [...ULTIMATE_SKILLS, ...MASTER_ULTIMATE_SKILLS];

/**
 * Universal active skill pool: 100 baseline + 50 endgame = 150 skills.
 */
export const ALL_CANONICAL_ACTIVE_SKILLS = [...ALL_NATIVE_SKILLS, ...ALL_ENDGAME_SKILLS];

/**
 * Fast lookup map from skillId -> SkillDefinition (covers all baseline and endgame skills).
 */
export const NATIVE_SKILLS_BY_ID = new Map(ALL_CANONICAL_ACTIVE_SKILLS.map(s => [s.id, s]));

/**
 * Retrieves native baseline skills for a given class ID.
 * @param {string} classId
 * @returns {object[]}
 */
export function getNativeSkillsByClass(classId) {
  return NATIVE_SKILL_TREES[classId] || [];
}

/**
 * Retrieves all skills available to a class (baseline + endgame).
 * @param {string} classId
 * @returns {object[]}
 */
export function getAllSkillsForClass(classId) {
  const baseline = getNativeSkillsByClass(classId);
  const ult = ULTIMATE_SKILLS.filter(s => s.classId === classId || s.availableTo.includes(classId));
  const master = MASTER_ULTIMATE_SKILLS.filter(s => s.classId === classId || s.availableTo.includes(classId));
  return [...baseline, ...ult, ...master];
}

/**
 * Retrieves a single skill definition by ID.
 * @param {string} skillId
 * @returns {object|null}
 */
export function getNativeSkillById(skillId) {
  return NATIVE_SKILLS_BY_ID.get(skillId) || null;
}

/**
 * Preserved canonical roles taxonomy for backwards compatibility.
 */
export const CANONICAL_SKILL_ROLES = [
  'burst_damage',
  'aoe_damage',
  'crowd_control',
  'defensive_shield',
  'finisher',
  'buff_support',
  'mobility',
  'sustain_heal',
  'debuff_hex',
  'dot'
];

/**
 * Checks if a skill natively belongs to a given active class.
 * @param {string} skillId
 * @param {string} classId
 * @returns {boolean}
 */
export function isNativeToClass(skillId, classId) {
  const skill = getNativeSkillById(skillId);
  if (!skill) return false;
  if (Array.isArray(skill.nativeClasses)) {
    return skill.nativeClasses.includes(classId);
  }
  return skill.classId === classId;
}
