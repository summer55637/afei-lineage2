// pets.js — Sistema de Companheiros e Mascotes de Batalha de Aden
export const PET_CATALOG = {
  pet_wolf: {
    id: 'pet_wolf',
    name: '戰鬥巨狼',
    archetype: 'fighter',
    icon: '🐺',
    unlockLvl: 15,
    cost: 50000,
    desc: '專精物理戰鬥的兇猛巨狼，能施展致命撕咬並提供狼之狂怒（+P.Atk、+暴擊）。',
    baseAtk: 45,
    atkPerLvl: 4,
    buff: {
      stat: 'patkMult',
      baseVal: 0.05,
      valPerLvl: 0.002, // +5% a +17% P.Atk
      desc: '狼之狂怒：提升物理攻擊力'
    },
    skillName: '撕裂獠牙',
    skillDesc: '戰鬥中追加造成流血的物理攻擊。'
  },
  pet_kookaburra: {
    id: 'pet_kookaburra',
    name: '幼年庫卡布拉',
    archetype: 'mage_support',
    icon: '🦉',
    unlockLvl: 25,
    cost: 100000,
    desc: '法師的神秘鳥類夥伴，會持續恢復 MP 並提供奧術智慧（+M.Atk）。',
    baseAtk: 25,
    atkPerLvl: 2,
    buff: {
      stat: 'matkMult',
      baseVal: 0.06,
      valPerLvl: 0.0025, // +6% a +21% M.Atk
      desc: '奧術智慧：提升魔法攻擊力'
    },
    skillName: '乙太恢復',
    skillDesc: '戰鬥中定期恢復 20～100 MP。'
  },
  pet_buffalo: {
    id: 'pet_buffalo',
    name: '幼年水牛',
    archetype: 'tank_support',
    icon: '🐂',
    unlockLvl: 25,
    cost: 100000,
    desc: '專精生存支援的強壯水牛，會以療癒草藥恢復 HP 並提升最大生命力。',
    baseAtk: 30,
    atkPerLvl: 3,
    buff: {
      stat: 'hpMult',
      baseVal: 0.08,
      valPerLvl: 0.003, // +8% a +26% HP
      desc: '野性生命力：提升最大 HP 與防禦'
    },
    skillName: '獸群祝福',
    skillDesc: '定期恢復最大 HP 的 5%。'
  },
  pet_hatchling: {
    id: 'pet_hatchling',
    name: '幼龍（史泰德）',
    archetype: 'draconic',
    icon: '🐉',
    unlockLvl: 35,
    cost: 250000,
    desc: '古代幼龍，可施放範圍火焰吐息，並提升攻擊與探索速度。',
    baseAtk: 60,
    atkPerLvl: 5,
    buff: {
      stat: 'speedBoost',
      baseVal: 0.05,
      valPerLvl: 0.002, // +5% a +17% Spd & AtkSpd
      desc: '龍之吐息：提升移動與攻擊速度'
    },
    skillName: '古代烈焰',
    skillDesc: '造成大量火焰傷害並灼燒目前怪物。'
  }
};
