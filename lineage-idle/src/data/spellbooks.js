// spellbooks.js — Catálogo de Livros de Habilidade (1★ a 4★) e Cristais de Grau
export const SPELLBOOK_ITEMS = {
  book_1star: {
    id: 'book_1star',
    name: '神聖魔法書：1★（普通）',
    slot: 'consumable',
    category: 'spellbook',
    grade: 'D',
    stars: 1,
    level: 40,
    req: { level: 40 },
    icon: 'spellbooks/spellbook_1star.png',
    desc: '基礎神聖魔法書，用於解鎖與強化二轉初期技能（等級 40+）。',
    price: 25000,
    stackable: true
  },
  book_2star: {
    id: 'book_2star',
    name: '神聖魔法書：2★（稀有）',
    slot: 'consumable',
    category: 'spellbook',
    grade: 'C',
    stars: 2,
    level: 48,
    req: { level: 48 },
    icon: 'spellbooks/spellbook_2star.png',
    desc: '精煉古代魔法書，用於二轉高階技能與增益（等級 48+）。',
    price: 75000,
    stackable: true
  },
  book_3star: {
    id: 'book_3star',
    name: '神聖魔法書：3★（史詩）',
    slot: 'consumable',
    category: 'spellbook',
    grade: 'B',
    stars: 3,
    level: 56,
    req: { level: 56 },
    icon: 'spellbooks/spellbook_3star.png',
    desc: '記載亞丁傳說的史詩魔法書，用於 B 級代表技能（等級 56+）。',
    price: 250000,
    stackable: true
  },
  book_4star: {
    id: 'book_4star',
    name: '神聖魔法書：4★（神聖傳說）',
    slot: 'consumable',
    category: 'spellbook',
    grade: 'A',
    stars: 4,
    level: 76,
    req: { level: 76 },
    icon: 'spellbooks/spellbook_4star.png',
    desc: '殷海薩與格蘭肯古神之書，用於第三、第四次轉職的終極技能。',
    price: 1000000,
    stackable: true
  },
  book_5star: {
    id: 'book_5star',
    name: '神聖魔法書：5★（原初超越）',
    slot: 'consumable',
    category: 'spellbook',
    grade: 'S',
    stars: 5,
    level: 90,
    req: { level: 90 },
    icon: 'spellbooks/spellbook_4star.png',
    desc: '蘊含原初宇宙力量的至尊魔法書，用於覺醒大師終極技能（Lv.90）。',
    price: 5000000,
    stackable: true
  }
};

export const CRYSTAL_ITEMS = {
  crystal_d: {
    id: 'crystal_d',
    name: '水晶：D 級',
    slot: 'material',
    category: 'material',
    grade: 'D',
    icon: 'materials/crystal_blue_d.png',
    desc: '分解 D 級物品取得的純淨水晶，用於製作 D 級靈魂彈與 1★ 魔法書。',
    price: 600,
    stackable: true
  },
  crystal_c: {
    id: 'crystal_c',
    name: '水晶：C 級',
    slot: 'material',
    category: 'material',
    grade: 'C',
    icon: 'materials/crystal_green_c.png',
    desc: '分解 C 級物品取得的純淨水晶，用於製作 C 級靈魂彈與 2★ 魔法書。',
    price: 2500,
    stackable: true
  },
  crystal_b: {
    id: 'crystal_b',
    name: '水晶：B 級',
    slot: 'material',
    category: 'material',
    grade: 'B',
    icon: 'materials/crystal_red_b.png',
    desc: '分解 B 級物品取得的純淨水晶，用於製作 B 級靈魂彈與 3★ 魔法書。',
    price: 7500,
    stackable: true
  },
  crystal_a: {
    id: 'crystal_a',
    name: '水晶：A 級',
    slot: 'material',
    category: 'material',
    grade: 'A',
    icon: 'materials/crystal_silver_a.png',
    desc: '分解 A 級物品取得的高級水晶，用於製作 A 級靈魂彈與 4★ 魔法書。',
    price: 25000,
    stackable: true
  },
  crystal_s: {
    id: 'crystal_s',
    name: '水晶：S 級',
    slot: 'material',
    category: 'material',
    grade: 'S',
    icon: 'materials/crystal_gold_s.png',
    desc: '分解 S 級物品取得的神聖水晶，用於鍛造神聖武器與至尊遺物。',
    price: 75000,
    stackable: true
  }
};
