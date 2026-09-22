// manor.js — Sistema Manor de Sementes, Colheita Agrícola & Troca de Materiais
export const MANOR_PROVINCES = {
  gludio: {
    id: 'gludio',
    name: '古魯丁領地',
    minLvl: 1,
    maxLvl: 30,
    icon: '🌾🏰',
    seed: {
      id: 'seed_gludio',
      name: '冰霜小麥種子（古魯丁）',
      cost: 150,
      cropId: 'crop_gludio',
      cropName: '收成的冰霜小麥',
      rewardItem: 'var_of_purity',
      rewardItemName: '純化研磨劑',
      exchangeRate: 5 // 5 colheitas = 1 Varnish of Purity
    }
  },
  dion: {
    id: 'dion',
    name: '狄恩領地',
    minLvl: 30,
    maxLvl: 50,
    icon: '🎃🏰',
    seed: {
      id: 'seed_dion',
      name: '狄恩南瓜種子',
      cost: 350,
      cropId: 'crop_dion',
      cropName: '收成的魔法南瓜',
      rewardItem: 'mithril_alloy',
      rewardItemName: '米索莉合金',
      exchangeRate: 6 // 6 colheitas = 1 Mithril Alloy
    }
  },
  giran: {
    id: 'giran',
    name: '奇岩領地',
    minLvl: 50,
    maxLvl: 70,
    icon: '🍇🏰',
    seed: {
      id: 'seed_giran',
      name: '黃金葡萄種子（奇岩）',
      cost: 750,
      cropId: 'crop_giran',
      cropName: '收成的黃金葡萄',
      rewardItem: 'enria',
      rewardItemName: '恩尼亞',
      exchangeRate: 8 // 8 colheitas = 1 Enria
    }
  }
};
