/**
 * codex.js — Definições do Codex de Coleções e Boss Dolls do Lineage Idle.
 * Extraído de lineage-idle/main.js (linhas 4748-4791, 4894-4935)
 */

/**
 * Sets do Codex de Coleções.
 * Cada set exige que o jogador registre todos os `items` para ganhar o `bonus`.
 */
export const CODEX_SETS = {
  // ─── COLEÇÕES INICIAIS (NO-GRADE) ───
  novice_weapons: {
    name:  '⚔️ 新兵武裝',
    desc:  '登錄新手使用的初期狩獵武器。',
    items: ['knight_sword', 'crucifix_of_blessing_magicblunt', 'hunting_bow'],
    bonus: { atk: 25, matk: 25 },
    label: '+25 物理攻擊 與 +25 魔法攻擊'
  },
  novice_armors: {
    name:  '🛡️ 布甲與皮甲',
    desc:  '登錄基礎訓練用防具。',
    items: ['bone_breastplate', 'leather_vest_light', 'devotion_armor_robe'],
    bonus: { def: 30, mdef: 30 },
    label: '+30 P.防禦 與 +30 M.防禦'
  },
  novice_heavy: {
    name:  '🛡️ 古魯丁基礎步兵',
    desc:  '早期戰士使用的重型防具。',
    items: ['bone_breastplate', 'bronze_breastplate_heavy'],
    bonus: { def: 20, hp: 50 },
    label: '+20 P.防禦 與 +50 最大 HP'
  },
  novice_light: {
    name:  '🥋 森林獵人',
    desc:  '新手獵人的輕裝與簡易斧頭。',
    items: ['leather_vest_light', 'tomahawk_axe'],
    bonus: { def: 15, eva: 6 },
    label: '+15 P.防禦 與 +6 迴避'
  },
  novice_robe: {
    name:  '🔮 艾因霍凡特門徒',
    desc:  '神殿新人的法袍與神聖鈍器。',
    items: ['devotion_armor_robe', 'crucifix_of_blessing_magicblunt'],
    bonus: { mdef: 25, mp: 60 },
    label: '+25 M.防禦 與 +60 最大 MP'
  },
  novice_jewels: {
    name:  '📿 亞丁華麗珠寶',
    desc:  '登錄具有神秘力量的訓練珠寶。',
    items: ['blue_coral_ring', 'magic_ring'],
    bonus: { hp: 100, mp: 50 },
    label: '+100 最大 HP 與 +50 最大 MP'
  },

  // ─── COLEÇÕES D-GRADE (Season 1 Core) ───
  d_grade_infantry: {
    name:  '🛡️ 鎖子甲鋼鐵軍團',
    desc:  '狄恩守軍使用的完整重甲套裝。',
    items: ['brigandine_armor_heavy', 'brigandine_pants_heavy', 'brigandine_helmet_heavy'],
    bonus: { def: 45, hp: 120 },
    label: '+45 P.防禦 與 +120 最大 HP'
  },
  d_grade_scouts: {
    name:  '🏹 曼陀羅巡守隊',
    desc:  '適合敏捷斥候的強化皮甲。',
    items: ['manticore_armor_light', 'manticore_pants_light'],
    bonus: { def: 30, eva: 10, crit: 4 },
    label: '+30 P.防禦、+10 迴避與 +4% 暴擊'
  },
  d_grade_scholars: {
    name:  '✨ 米索莉秘法環',
    desc:  '以米索莉與銀絲編織的魔法服裝。',
    items: ['mithril_tunic_robe', 'mithril_pants_robe'],
    bonus: { mdef: 40, matk: 25, mp: 100 },
    label: '+40 M.防禦、+25 魔法攻擊 與 +100 最大 MP'
  },
  d_grade_swords: {
    name:  '⚔️ D 級劍術大師',
    desc:  '古魯丁騎士的祝聖刀劍。',
    items: ['crimson_sword', 'saber_sword', 'dual_bastard_sword'],
    bonus: { atk: 50, crit: 6 },
    label: '+50 物理攻擊 與 +6% 暴擊率'
  },
  d_grade_archery: {
    name:  '🎯 荒野精靈弓術',
    desc:  '說話之島巡邏隊使用的高級弓。',
    items: ['elven_bow', 'bow_of_silence'],
    bonus: { atk: 45, crit: 8 },
    label: '+45 物理攻擊 與 +8% 遠程暴擊'
  },
  d_grade_mystic: {
    name:  '🔮 元素力量法杖',
    desc:  '狄恩法師與祭司使用的武器。',
    items: ['mystic_staff', 'staff_of_magic', 'bronze_mace'],
    bonus: { matk: 55, mp: 80 },
    label: '+55 魔法攻擊 與 +80 最大 MP'
  },
  d_grade_blunt: {
    name:  '🔨 矮人戰鎚',
    desc:  '在米索莉洞窟鍛造的重型打擊武器。',
    items: ['warhammer', 'titan_hammer', 'wepoan_war_mace'],
    bonus: { atk: 45, hp: 140 },
    label: '+45 物理攻擊 與 +140 最大 HP'
  },
  d_grade_jewelry: {
    name:  '💎 精靈珠寶套裝',
    desc:  '能提升魔法抗性的華麗護身符。',
    items: ['jewel_elven_ring', 'jewel_elven_earring', 'jewel_elven_necklace'],
    bonus: { mdef: 50, hp: 100, mp: 60 },
    label: '+50 M.防禦、+100 最大 HP 與 +60 最大 MP'
  },
  d_grade_champions: {
    name:  '🗡️ D 級菁英勇士',
    desc:  '登錄身經百戰勇士使用的刀劍與防具。',
    items: ['crimson_sword', 'elven_bow', 'brigandine_armor_heavy'],
    bonus: { atk: 50, crit: 5 },
    label: '+50 物理攻擊 與 +5% 物理暴擊率'
  },

  // ─── COLEÇÕES C-GRADE (Season 1 Pinnacle) ───
  c_grade_guardians: {
    name:  '🛡️ 全身板甲守護者',
    desc:  '頂級 C 級重甲與祝福珠寶。',
    items: ['full_plate_heavy_armor', 'jewel_blessed_ring'],
    bonus: { def: 60, hp: 200 },
    label: '+60 P.防禦 與 +200 最大 HP'
  },
  c_grade_assassins: {
    name:  '🩸 Theca 暗影利刃',
    desc:  '兼具高機動與致命斬擊能力的裝備。',
    items: ['theca_light_armor', 'darkelven_dagger'],
    bonus: { def: 40, crit: 8, eva: 12 },
    label: '+40 P.防禦、+8% 暴擊與 +12 迴避'
  },
  c_grade_magisters: {
    name:  '🌟 狄恩緋紅魔導',
    desc:  'Karmian 奧術法袍與 Homunculus 魔法劍的組合。',
    items: ['karmian_robe_armor', 'homunkuluss_magic_sword'],
    bonus: { matk: 70, mdef: 45, mp: 150 },
    label: '+70 魔法攻擊、+45 M.防禦 與 +150 最大 MP'
  },
  c_grade_arsenal: {
    name:  '⚡ 克魯瑪老兵武庫',
    desc:  '老兵使用的高級長劍與遠射弓。',
    items: ['samurai_longsword', 'katana', 'eminence_bow'],
    bonus: { atk: 75, crit: 10 },
    label: '+75 物理攻擊 與 +10% 暴擊率'
  },
  c_grade_legion: {
    name:  '🛡️ C 級鋼鐵軍團',
    desc:  '登錄古魯丁老兵使用的武器與防具。',
    items: ['battle_axe', 'full_plate_heavy_armor', 'eminence_bow'],
    bonus: { atk: 75, def: 50, hp: 200 },
    label: '+75 物理攻擊, +50 防禦, +200 HP'
  },

  // ─── COLEÇÕES ESPECIAIS & META ───
  crystal_masters: {
    name:  '💎 亞丁元素寶石',
    desc:  '登錄從神秘洞窟採集的元素寶石。',
    items: ['fire_stone', 'water_stone', 'earth_stone'],
    bonus: { atk: 60, matk: 60, hp: 150 },
    label: '+60 物理攻擊, +60 魔法攻擊, +150 HP'
  },
  spellbook_codex: {
    name:  '📖 星辰神聖技能書',
    desc:  '登錄亞丁星辰系列神聖技能書。',
    items: ['spellbook_1star', 'spellbook_2star', 'spellbook_3star', 'spellbook_4star'],
    bonus: { atk: 100, matk: 100, hp: 300, def: 50 },
    label: '+100 物理攻擊, +100 魔法攻擊, +300 HP, +50 防禦'
  }
};

/**
 * Boss Dolls — Bonificações por nível e fontes de obtenção.
 */
export const BOSS_DOLLS = {
  doll_goblin: {
    name: '👺 哥布林娃娃', icon: '👺', rarity: 'common',
    source: '🌲 說話之島狩獵掉落（0.8%）· 🎲 合成祭壇',
    desc: '哥布林雕刻的粗獷圖騰，提供初期 P.Atk 與生命值加成。',
    statsByLvl: {
      1: { atk: 5,  hp: 30,  label: '+5 物理攻擊, +30 最大 HP'   },
      2: { atk: 12, hp: 70,  label: '+12 物理攻擊, +70 最大 HP'  },
      3: { atk: 22, hp: 130, label: '+22 物理攻擊, +130 最大 HP' },
      4: { atk: 35, hp: 220, label: '+35 物理攻擊, +220 最大 HP' },
      5: { atk: 55, hp: 350, label: '+55 物理攻擊, +350 最大 HP' }
    }
  },
  doll_wolf: {
    name: '🐺 巨狼娃娃', icon: '🐺', rarity: 'common',
    source: '🌲 精靈森林與古魯丁狩獵掉落（0.8%）· 🎲 合成祭壇',
    desc: '以阿爾法狼獠牙雕製的護身符，提升暴擊率與移動速度。',
    statsByLvl: {
      1: { crit: 2, speed: 2,  label: '+2% 暴擊, +2% 速度'   },
      2: { crit: 4, speed: 4,  label: '+4% 暴擊, +4% 速度'   },
      3: { crit: 7, speed: 6,  label: '+7% 暴擊, +6% 速度'   },
      4: { crit: 11, speed: 9, label: '+11% 暴擊, +9% 速度'  },
      5: { crit: 16, speed: 12, label: '+16% 暴擊, +12% 速度' }
    }
  },
  doll_skeleton: {
    name: '💀 骷髏弓箭手娃娃', icon: '💀', rarity: 'common',
    source: '🌲 絕望廢墟狩獵掉落（0.8%）· 🎲 合成祭壇',
    desc: '注入邪能的骷髏頭，可提升命中、攻擊與迴避。',
    statsByLvl: {
      1: { atk: 6,  eva: 2,  label: '+6 物理攻擊, +2 迴避'   },
      2: { atk: 14, eva: 4,  label: '+14 物理攻擊, +4 迴避'  },
      3: { atk: 25, eva: 7,  label: '+25 物理攻擊, +7 迴避'  },
      4: { atk: 40, eva: 11, label: '+40 物理攻擊, +11 迴避' },
      5: { atk: 60, eva: 16, label: '+60 物理攻擊, +16 迴避' }
    }
  },
  doll_orc: {
    name: '🧌 半獸人襲擊者娃娃', icon: '🧌', rarity: 'common',
    source: '🌲 半獸人村莊與古魯丁狩獵掉落（0.8%）· 🎲 合成祭壇',
    desc: '半獸人部族戰爭雕像，可提升防禦與生命力。',
    statsByLvl: {
      1: { def: 8,  hp: 40,  label: '+8 防禦, +40 最大 HP'   },
      2: { def: 18, hp: 90,  label: '+18 防禦, +90 最大 HP'  },
      3: { def: 32, hp: 170, label: '+32 防禦, +170 最大 HP' },
      4: { def: 50, hp: 280, label: '+50 防禦, +280 最大 HP' },
      5: { def: 75, hp: 420, label: '+75 防禦, +420 最大 HP' }
    }
  },
  doll_dryad: {
    name: '🌿 森林樹精娃娃', icon: '🌿', rarity: 'common',
    source: '🌲 森林與沼澤狩獵掉落（0.8%）· 🎲 合成祭壇',
    desc: '千年樹精的活枝，可提升魔法力量與 MP 上限。',
    statsByLvl: {
      1: { matk: 8,  mp: 30,  label: '+8 魔法攻擊, +30 MP'   },
      2: { matk: 18, mp: 70,  label: '+18 魔法攻擊, +70 MP'  },
      3: { matk: 32, mp: 130, label: '+32 魔法攻擊, +130 MP' },
      4: { matk: 50, mp: 210, label: '+50 魔法攻擊, +210 MP' },
      5: { matk: 75, mp: 320, label: '+75 魔法攻擊, +320 MP' }
    }
  },
  doll_queen_ant: {
    name: '🐜 巨蟻女王娃娃', icon: '🐜', rarity: 'rare',
    source: '👑 巨蟻女王首領掉落（5%）· 🎲 製作輪盤',
    desc: '巨蟻女王的古老靈魂，可提升物理攻擊與暴擊。',
    statsByLvl: {
      1: { atk: 15,  crit: 3,  label: '+15 物理攻擊, +3% 暴擊'   },
      2: { atk: 35,  crit: 6,  label: '+35 物理攻擊, +6% 暴擊'   },
      3: { atk: 60,  crit: 10, label: '+60 物理攻擊, +10% 暴擊'  },
      4: { atk: 100, crit: 15, label: '+100 物理攻擊, +15% 暴擊' },
      5: { atk: 160, crit: 25, label: '+160 物理攻擊, +25% 暴擊' }
    }
  },
  doll_core: {
    name: '🔮 核心娃娃', icon: '🔮', rarity: 'rare',
    source: '👑 克魯瑪核心首領掉落（5%）· 🎲 煉金祭壇',
    desc: '克魯瑪凝聚核心，可提升魔法力量與施法速度。',
    statsByLvl: {
      1: { matk: 20, mp: 50,  label: '+20 魔法攻擊, +50 MP'   },
      2: { matk: 45, mp: 100, label: '+45 魔法攻擊, +100 MP'  },
      3: { matk: 80, mp: 180, label: '+80 魔法攻擊, +180 MP'  },
      4: { matk: 130, mp: 300, label: '+130 魔法攻擊, +300 MP' },
      5: { matk: 200, mp: 500, label: '+200 魔法攻擊, +500 MP' }
    }
  },
  doll_orfen: {
    name: '🦋 奧爾芬娃娃', icon: '🦋', rarity: 'rare',
    source: '👑 奧爾芬首領掉落（5%）· 🎲 煉金祭壇',
    desc: '奧爾芬的神秘霧氣，可提升魔法攻擊與魔法暴擊。',
    statsByLvl: {
      1: { matk: 20,  crit: 3,  label: '+20 魔法攻擊, +3% 魔法暴擊'   },
      2: { matk: 45,  crit: 6,  label: '+45 魔法攻擊, +6% 魔法暴擊'   },
      3: { matk: 80,  crit: 10, label: '+80 魔法攻擊, +10% 魔法暴擊'  },
      4: { matk: 120, crit: 15, label: '+120 魔法攻擊, +15% 魔法暴擊' },
      5: { matk: 180, crit: 25, label: '+180 魔法攻擊, +25% 魔法暴擊' }
    }
  },
  doll_zaken: {
    name: '🏴‍☠️ 札肯娃娃', icon: '🏴‍☠️', rarity: 'epic',
    source: '👑 札肯船長掉落（4%）· 🎲 製作輪盤',
    desc: '海賊船長札肯之魂，可提供防禦與吸血能力。',
    statsByLvl: {
      1: { def: 25,  lifesteal: 3,  label: '+25 防禦, +3% 吸血'   },
      2: { def: 50,  lifesteal: 5,  label: '+50 防禦, +5% 吸血'   },
      3: { def: 85,  lifesteal: 8,  label: '+85 防禦, +8% 吸血'   },
      4: { def: 130, lifesteal: 12, label: '+130 防禦, +12% 吸血' },
      5: { def: 200, lifesteal: 18, label: '+200 防禦, +18% 吸血' }
    }
  },
  doll_baium: {
    name: '⚡ 巴溫娃娃', icon: '⚡', rarity: 'legendary',
    source: '👑 傲慢之塔 Raid 首領巴溫掉落（3%）',
    desc: '巴溫皇帝精華，可提升戰鬥速度。',
    statsByLvl: {
      1: { speed: 5,  label: '+5% 速度'  },
      2: { speed: 10, label: '+10% 速度' },
      3: { speed: 15, label: '+15% 速度' },
      4: { speed: 22, label: '+22% 速度' },
      5: { speed: 30, label: '+30% 速度' }
    }
  },
  doll_antharas: {
    name: '🐉 安塔瑞斯娃娃', icon: '🐉', rarity: 'legendary',
    source: '👑 地龍安塔瑞斯掉落（2%）· 🏆 篇章獎勵',
    desc: '安塔瑞斯神聖龍鱗，可大幅提升生命與防禦。',
    statsByLvl: {
      1: { hp: 200, def: 40,  label: '+200 最大 HP, +40 防禦' },
      2: { hp: 450, def: 80,  label: '+450 最大 HP, +80 防禦' },
      3: { hp: 800, def: 140, label: '+800 最大 HP, +140 防禦' },
      4: { hp: 1300, def: 220, label: '+1300 最大 HP, +220 防禦' },
      5: { hp: 2000, def: 350, label: '+2000 最大 HP, +350 防禦' }
    }
  },
  doll_valakas: {
    name: '🔥 巴拉卡斯娃娃', icon: '🔥', rarity: 'legendary',
    source: '👑 火龍巴拉卡斯掉落（1%）· 🏆 最高獎勵',
    desc: '巴拉卡斯燃燒之心，可大幅提升攻擊力與暴擊。',
    statsByLvl: {
      1: { atk: 80,  matk: 80,  crit: 5,  label: '+80 物理／魔法攻擊, +5% 暴擊' },
      2: { atk: 180, matk: 180, crit: 10, label: '+180 物理／魔法攻擊, +10% 暴擊' },
      3: { atk: 320, matk: 320, crit: 18, label: '+320 物理／魔法攻擊, +18% 暴擊' },
      4: { atk: 500, matk: 500, crit: 25, label: '+500 物理／魔法攻擊, +25% 暴擊' },
      5: { atk: 800, matk: 800, crit: 40, label: '+800 物理／魔法攻擊, +40% 暴擊' }
    }
  }
};
