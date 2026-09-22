// expeditions.js — Catálogo de Destinos, 危險s e Fases de Expedição (Exploration 2.0)
export const RISK_DIRECTIVES = {
  cautious: { id: 'cautious', name: '謹慎', hazardDamage: -0.25, loyaltyBonus: 1, lootMult: -0.15 },
  balanced: { id: 'balanced', name: '均衡', hazardDamage: 0, loyaltyBonus: 0, lootMult: 0 },
  reckless: { id: 'reckless', name: '大膽', hazardDamage: 0.60, loyaltyBonus: -5, lootMult: 0.45 }
};

export const EXPEDITION_DILEMMAS = {
  dilemma_altar: {
    id: 'dilemma_altar',
    name: '席琳褻瀆祭壇',
    desc: '一座散發腐化魔力的黑石祭壇。要怎麼處理？',
    options: {
      saquear: { name: '掠奪祭壇', reqTrait: 'greedy', desc: '+金幣，但會受到傷害', result: 'gold' },
      purificar: { name: '淨化祭壇', reqSpecs: ['veteran', 'medic'], desc: '+小隊 EXP', result: 'xp' },
      evitar: { name: '避開', reqDirective: 'cautious', desc: '不互動直接通過', result: 'skip' }
    }
  },
  dilemma_chest: {
    id: 'dilemma_chest',
    name: '上鎖的古代寶箱',
    desc: '一只沉重的橡木鐵製寶箱，明顯設有陷阱。',
    options: {
      forcar: { name: '強行撬鎖', reqSpec: 'striker', desc: '65% 成功率', result: 'force' },
      destrancar: { name: '使用開鎖工具', reqSpec: 'scout', desc: '90% 成功率', result: 'pick' },
      ignorar: { name: '忽略陷阱', reqDirective: 'cautious', desc: '不承擔風險', result: 'skip' }
    }
  }
};
export const EXPEDITION_DESTINATIONS = {
  gludio_ruins: {
    id: 'gludio_ruins',
    name: '古魯丁荒廢遺跡',
    minLevel: 15,
    duration: 1800000, // 30 minutos
    cost: 2500,
    minGold: 8000,
    maxGold: 16000,
    shards: 2,
    recommendedSpecs: ['tracker', 'guardian'],
    threat: '豺狼人伏擊與火焰陷阱',
    rewardDesc: '基礎材料（皮革、骨頭）、金幣與 D 級卷軸',
    desc: '被豺狼人與掠奪者占據的廢墟，非常適合訓練年輕傭兵。',
    materialRewards: [
      { matId: 'leather', min: 2, max: 6 },
      { matId: 'bone', min: 2, max: 5 },
      { matId: 'iron_ore', min: 2, max: 4 }
    ],
    scrollReward: 'scroll_of_enchant_armor',
    phases: [
      { name: '潛入', desc: '沿著殘破城牆進行無聲偵察。' },
      { name: '危險', desc: '一隊豺狼人先鋒正在東門巡邏。' },
      { name: '寶藏', desc: '豺狼人藏在倉庫廢墟中的寶箱。' }
    ]
  },
  branded: {
    id: 'branded',
    name: '烙印地下墓穴',
    minLevel: 20,
    duration: 3600000, // 1 hora
    cost: 6000,
    minGold: 22000,
    maxGold: 38000,
    shards: 4,
    recommendedSpecs: ['healer', 'thief'],
    threat: '不死生物與古代陷阱',
    rewardDesc: '粗骨粉、通用卷軸與星界碎片',
    desc: '充斥不死生物的地下墓穴，盜賊負責拆除陷阱，治療者負責驅散詛咒。',
    materialRewards: [
      { matId: 'coarse_bone_powder', min: 1, max: 3 },
      { matId: 'cotton_thread', min: 3, max: 8 },
      { matId: 'bone', min: 4, max: 10 }
    ],
    scrollReward: 'scroll_of_enchant_weapon',
    phases: [
      { name: '潛入', desc: '沿著覆滿泥濘的石階謹慎下降。' },
      { name: '危險', desc: '古代刀刃機關與復仇幽靈構成的陷阱。' },
      { name: '寶藏', desc: '以死靈符文封印的墓室。' }
    ]
  },
  dwarven_mines: {
    id: 'dwarven_mines',
    name: '矮人遺忘礦坑',
    minLevel: 28,
    duration: 7200000, // 2 horas
    cost: 15000,
    minGold: 65000,
    maxGold: 105000,
    shards: 6,
    recommendedSpecs: ['guardian', 'tracker'],
    threat: '坍塌與石魔像',
    rewardDesc: '鋼鐵、米索莉礦石、煤炭與通用卷軸',
    desc: '數百年前開鑿的深層坑道，失控魔像守護著富含鋼與米索莉的礦脈。',
    materialRewards: [
      { matId: 'steel', min: 1, max: 4 },
      { matId: 'mithril_ore', min: 2, max: 6 },
      { matId: 'coal', min: 4, max: 10 }
    ],
    scrollReward: 'scroll_of_enchant_armor',
    phases: [
      { name: '潛入', desc: '穿越狹窄坑道與通風井。' },
      { name: '危險', desc: '地層震動與玄武岩魔像的突襲。' },
      { name: '寶藏', desc: '廢棄的大師鐵匠工坊，仍留有完整金屬錠。' }
    ]
  },
  martyrs: {
    id: 'martyrs',
    name: '殉教者死靈墓地',
    minLevel: 32,
    duration: 10800000, // 3 horas
    cost: 30000,
    minGold: 110000,
    maxGold: 175000,
    shards: 9,
    recommendedSpecs: ['healer', 'mage'],
    threat: '暗影迷宮與詛咒回音',
    rewardDesc: '精製皮革、編織線、碎片與通用卷軸',
    desc: '曾獻祭狂熱祭司的黑暗聖域，需要神聖與秘法力量應對。',
    materialRewards: [
      { matId: 'crafted_leather', min: 1, max: 3 },
      { matId: 'braided_hemp', min: 2, max: 6 },
      { matId: 'silver_nugget', min: 3, max: 8 }
    ],
    scrollReward: 'scroll_of_enchant_weapon',
    phases: [
      { name: '潛入', desc: '穿越被邪霧籠罩的墓柱迷宮。' },
      { name: '危險', desc: '哀號亡魂正在吸取隊伍的生命能量。' },
      { name: '寶藏', desc: '保存著珍貴供品的儀式祭壇。' }
    ]
  },
  dragon_valley: {
    id: 'dragon_valley',
    name: '幼龍峽谷',
    minLevel: 38,
    duration: 14400000, // 4 horas
    cost: 60000,
    minGold: 280000,
    maxGold: 420000,
    shards: 14,
    recommendedSpecs: ['mage', 'guardian'],
    threat: '血龍與硫磺雨',
    rewardDesc: '恩尼亞、合成焦炭、星界碎片與通用卷軸',
    desc: '由安塔瑞斯幼龍盤踞的灼熱峽谷，守護者抵擋火焰，法師負責擊破龍鱗。',
    materialRewards: [
      { matId: 'enria', min: 1, max: 3 },
      { matId: 'synthetic_cokes', min: 1, max: 4 },
      { matId: 'iron_ore', min: 6, max: 14 }
    ],
    scrollReward: 'scroll_of_enchant_weapon',
    phases: [
      { name: '潛入', desc: '沿著硫磺裂縫攀升，進入飛龍領空。' },
      { name: '危險', desc: '硫磺火焰吐息與翼龍伏擊。' },
      { name: '寶藏', desc: '充滿龍族礦物的古代化石巢穴。' }
    ]
  },
  shilen_temple: {
    id: 'shilen_temple',
    name: '席琳褻瀆聖域',
    minLevel: 40,
    duration: 21600000, // 6 horas
    cost: 100000,
    minGold: 650000,
    maxGold: 980000,
    shards: 22,
    recommendedSpecs: ['mage', 'healer', 'thief'],
    threat: '血魔法、上位惡魔與封印屏障',
    rewardDesc: '金屬纖維、恩尼亞、祝福卷軸與星界遺物',
    desc: '第 1 賽季探索的最高難度區域，埋藏著亞丁最珍貴遺物的褻瀆要塞。',
    materialRewards: [
      { matId: 'metallic_fiber', min: 2, max: 5 },
      { matId: 'enria', min: 2, max: 5 },
      { matId: 'crafted_leather', min: 2, max: 5 }
    ],
    scrollReward: 'scroll_blessed_weapon',
    phases: [
      { name: '潛入', desc: '破解神殿入口的三道血之秘法封印。' },
      { name: '危險', desc: '狂怒的席琳大惡魔現身。' },
      { name: '寶藏', desc: '女神封印數百年的秘密房間。' }
    ]
  }
};
