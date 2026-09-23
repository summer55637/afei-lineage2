// instances.js — Instâncias Solo Diárias: Kamaloka & Pailaka
export const SOLO_INSTANCES = {
  kamaloka_25: {
    id: 'kamaloka_25',
    name: '古魯丁卡瑪洛卡（深淵大廳）',
    type: 'kamaloka',
    minLvl: 25,
    maxLvl: 35,
    icon: '🌀⚔️',
    minimumCP: 3000,
    recommendedCP: 4500,
    bossName: '卡諾爾，深淵劊子手',
    bossHp: 8500,
    bossAtk: 180,
    bossDef: 40,
    bossMdef: 55,
    desc: '古魯丁被暗影侵蝕的次元裂縫，劊子手卡諾爾守護著珍貴的 D 級珠寶。',
    rewards: {
      xp: 45000,
      gold: 30000,
      sp: 150,
      items: ['scroll_enchant_weapon_d', 'scroll_enchant_armor_d'],
      guaranteedRewardText: 'D 級禮包 + D 級強化卷軸'
    }
  },
  pailaka_36: {
    id: 'pailaka_36',
    name: '派拉卡：冰與火之歌（被遺忘的神殿）',
    type: 'pailaka',
    minLvl: 36,
    maxLvl: 48,
    icon: '🔥❄️',
    minimumCP: 6000,
    recommendedCP: 9000,
    bossName: '石像鬼領主與火精靈王',
    bossHp: 22000,
    bossAtk: 350,
    bossDef: 60,
    bossMdef: 80,
    desc: '元素互相衝突的被遺忘神殿，擊敗精靈之王以解放此地。',
    rewards: {
      xp: 120000,
      gold: 60000,
      sp: 300,
      items: ['pailaka_ring', 'magic_lamp'],
      guaranteedRewardText: '派拉卡神聖戒指 + 1x 魔法神燈'
    }
  },
  kamaloka_49: {
    id: 'kamaloka_49',
    name: '狄恩卡瑪洛卡（深淵迷宮）',
    type: 'kamaloka',
    minLvl: 49,
    maxLvl: 57,
    icon: '🌀🐊',
    minimumCP: 12000,
    recommendedCP: 17000,
    bossName: '白化鱷魚領主（沼澤之王）',
    bossHp: 55000,
    bossAtk: 620,
    bossDef: 90,
    bossMdef: 120,
    desc: '位於克魯瑪沼澤下方的沉沒迷宮，巨大白化鱷魚守護著 C 級寶藏。',
    rewards: {
      xp: 280000,
      gold: 120000,
      sp: 500,
      items: ['scroll_enchant_weapon_c', 'scroll_enchant_armor_c'],
      guaranteedRewardText: 'C 級珠寶 + C 級強化卷軸'
    }
  },
  pailaka_58: {
    id: 'pailaka_58',
    name: "派拉卡：惡魔遺產（龍之谷）",
    type: 'pailaka',
    minLvl: 58,
    maxLvl: 65,
    icon: '🐉⚡',
    minimumCP: 22000,
    recommendedCP: 32000,
    bossName: '幼龍領主（火龍之王）',
    bossHp: 110000,
    bossAtk: 980,
    bossDef: 130,
    bossMdef: 170,
    desc: '龍之谷深處的巢穴，幼龍受到惡魔裂縫力量影響而甦醒。',
    rewards: {
      xp: 600000,
      gold: 250000,
      sp: 800,
      items: ['pailaka_bracelet', 'magic_lamp'],
      guaranteedRewardText: '派拉卡龍之手鐲 + 2x 魔法神燈 + B 級獎勵'
    }
  }
};
