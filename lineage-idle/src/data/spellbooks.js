// spellbooks.js — Catálogo de Livros de Habilidade (1★ a 4★) e Cristais de Grau
export const SPELLBOOK_ITEMS = {
  book_1star: {
    id: 'book_1star',
    name: '神聖技能書：1★（普通）',
    slot: 'consumable',
    category: 'spellbook',
    grade: 'D',
    stars: 1,
    level: 40,
    req: { level: 40 },
    icon: 'spellbooks/spellbook_1star.png',
    desc: '基礎魔法神聖技能書，用於解鎖與提升第二職業初階技能（等級 40+）。',
    price: 25000,
    stackable: true
  },
  book_2star: {
    id: 'book_2star',
    name: '神聖技能書：2★（稀有）',
    slot: 'consumable',
    category: 'spellbook',
    grade: 'C',
    stars: 2,
    level: 48,
    req: { level: 48 },
    icon: 'spellbooks/spellbook_2star.png',
    desc: '精煉古代魔法技能書，用於第二職業高階技能與增益（等級 48+）。',
    price: 75000,
    stackable: true
  },
  book_3star: {
    id: 'book_3star',
    name: '神聖技能書：3★（史詩）',
    slot: 'consumable',
    category: 'spellbook',
    grade: 'B',
    stars: 3,
    level: 56,
    req: { level: 56 },
    icon: 'spellbooks/spellbook_3star.png',
    desc: '亞丁偉大傳說流傳的技能書，用於 B 級招牌技能（等級 56+）。',
    price: 250000,
    stackable: true
  },
  book_4star: {
    id: 'book_4star',
    name: '神聖技能書：4★（神聖傳說）',
    slot: 'consumable',
    category: 'spellbook',
    grade: 'A',
    stars: 4,
    level: 76,
    req: { level: 76 },
    icon: 'spellbooks/spellbook_4star.png',
    desc: '殷海薩與格蘭肯古神技能書，用於第三、第四職業最高階技能。',
    price: 1000000,
    stackable: true
  },
  book_5star: {
    id: 'book_5star',
    name: '神聖技能書：5★（太古超越）',
    slot: 'consumable',
    category: 'spellbook',
    grade: 'S',
    stars: 5,
    level: 90,
    req: { level: 90 },
    icon: 'spellbooks/spellbook_4star.png',
    desc: '蘊含太古與宇宙之力的最高技能書，用於覺醒大師終極技能（等級 90）。',
    price: 5000000,
    stackable: true
  }
};

export const CRYSTAL_ITEMS = {
  crystal_d: {
    id: 'crystal_d',
    name: 'D 級水晶',
    slot: 'material',
    category: 'material',
    grade: 'D',
    icon: 'materials/crystal_blue_d.png',
    desc: '由 D 級物品分解取得的純淨水晶，用於製作 D 級魂彈與 1★ 技能書。',
    price: 600,
    stackable: true
  },
  crystal_c: {
    id: 'crystal_c',
    name: 'C 級水晶',
    slot: 'material',
    category: 'material',
    grade: 'C',
    icon: 'materials/crystal_green_c.png',
    desc: '由 C 級物品分解取得的純淨水晶，用於製作 C 級魂彈與 2★ 技能書。',
    price: 2500,
    stackable: true
  },
  crystal_b: {
    id: 'crystal_b',
    name: 'B 級水晶',
    slot: 'material',
    category: 'material',
    grade: 'B',
    icon: 'materials/crystal_red_b.png',
    desc: '由 B 級物品分解取得的純淨水晶，用於製作 B 級魂彈與 3★ 技能書。',
    price: 7500,
    stackable: true
  },
  crystal_a: {
    id: 'crystal_a',
    name: 'A 級水晶',
    slot: 'material',
    category: 'material',
    grade: 'A',
    icon: 'materials/crystal_silver_a.png',
    desc: '由 A 級物品分解取得的高級水晶，用於製作 A 級魂彈與 4★ 技能書。',
    price: 25000,
    stackable: true
  },
  crystal_s: {
    id: 'crystal_s',
    name: 'S 級水晶',
    slot: 'material',
    category: 'material',
    grade: 'S',
    icon: 'materials/crystal_gold_s.png',
    desc: '由 S 級物品分解取得的神聖水晶，用於鍛造神聖武器與最高級遺物。',
    price: 75000,
    stackable: true
  }
};
