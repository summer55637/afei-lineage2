/**
 * broochJewels.js — Definição Canônica de Broches e Joias de Broche (Lineage II Essence Style).
 * 
 * Joias de Broche:
 * - Ruby: P.Atk e bônus de dano de Soulshots.
 * - Sapphire: M.Atk e bônus de dano de Spiritshots.
 * - Diamond: P.Def e resistência a acertos críticos físicos.
 * - Pearl: M.Def e resistência a acertos críticos mágicos.
 * - Opal: Atributos gerais e 技能威力s.
 */

export const BROOCHES = {
  brooch_d: {
    id: 'brooch_d',
    itemId: 'brooch_d',
    name: '青銅胸針［D 級］',
    slot: 'brooch',
    tier: 2,
    grade: 'D',
    slots: 2,
    price: 35000,
    icon: 'acessories/brooch_bronze.png',
    desc: '青銅胸針，具有 2 個魔法寶石鑲嵌槽。'
  },
  brooch_c: {
    id: 'brooch_c',
    itemId: 'brooch_c',
    name: '白銀胸針［C 級］',
    slot: 'brooch',
    tier: 3,
    grade: 'C',
    slots: 3,
    price: 90000,
    icon: 'acessories/brooch_silver.png',
    desc: '精製白銀胸針，具有 3 個魔法寶石鑲嵌槽。'
  }
};

export const BROOCH_JEWELS = {
  // ─── RUBY (Rubi: Dano Físico e Soulshots) ───
  jewel_ruby_1: { id: 'jewel_ruby_1', itemId: 'jewel_ruby_1', name: '胸針紅寶石・等級 1', jewelType: 'ruby', level: 1, slot: 'jewel', atk: 15, ssBonusPct: 3, price: 15000, icon: 'acessories/jewel_ruby.png', desc: '+15 P.Atk e +3% 靈魂彈傷害加成.' },
  jewel_ruby_2: { id: 'jewel_ruby_2', itemId: 'jewel_ruby_2', name: '胸針紅寶石・等級 2', jewelType: 'ruby', level: 2, slot: 'jewel', atk: 30, ssBonusPct: 6, price: 35000, icon: 'acessories/jewel_ruby.png', desc: '+30 P.Atk e +6% 靈魂彈傷害加成.' },
  jewel_ruby_3: { id: 'jewel_ruby_3', itemId: 'jewel_ruby_3', name: '胸針紅寶石・等級 3', jewelType: 'ruby', level: 3, slot: 'jewel', atk: 55, ssBonusPct: 10, price: 80000, icon: 'acessories/jewel_ruby.png', desc: '+55 P.Atk e +10% 靈魂彈傷害加成.' },
  jewel_ruby_4: { id: 'jewel_ruby_4', itemId: 'jewel_ruby_4', name: '胸針紅寶石・等級 4', jewelType: 'ruby', level: 4, slot: 'jewel', atk: 90, ssBonusPct: 15, price: 180000, icon: 'acessories/jewel_ruby.png', desc: '+90 P.Atk e +15% 靈魂彈傷害加成.' },
  jewel_ruby_5: { id: 'jewel_ruby_5', itemId: 'jewel_ruby_5', name: '胸針紅寶石・等級 5（最高）', jewelType: 'ruby', level: 5, slot: 'jewel', atk: 140, ssBonusPct: 22, price: 450000, icon: 'acessories/jewel_ruby.png', desc: '+140 P.Atk e +22% 靈魂彈傷害加成.' },

  // ─── SAPPHIRE (Safira: Dano Mágico e Spiritshots) ───
  jewel_sapphire_1: { id: 'jewel_sapphire_1', itemId: 'jewel_sapphire_1', name: '胸針藍寶石・等級 1', jewelType: 'sapphire', level: 1, slot: 'jewel', matk: 20, spsBonusPct: 3, price: 15000, icon: 'acessories/jewel_sapphire.png', desc: '+20 M.Atk e +3% 魔靈彈傷害加成.' },
  jewel_sapphire_2: { id: 'jewel_sapphire_2', itemId: 'jewel_sapphire_2', name: '胸針藍寶石・等級 2', jewelType: 'sapphire', level: 2, slot: 'jewel', matk: 40, spsBonusPct: 6, price: 35000, icon: 'acessories/jewel_sapphire.png', desc: '+40 M.Atk e +6% 魔靈彈傷害加成.' },
  jewel_sapphire_3: { id: 'jewel_sapphire_3', itemId: 'jewel_sapphire_3', name: '胸針藍寶石・等級 3', jewelType: 'sapphire', level: 3, slot: 'jewel', matk: 75, spsBonusPct: 10, price: 80000, icon: 'acessories/jewel_sapphire.png', desc: '+75 M.Atk e +10% 魔靈彈傷害加成.' },
  jewel_sapphire_4: { id: 'jewel_sapphire_4', itemId: 'jewel_sapphire_4', name: '胸針藍寶石・等級 4', jewelType: 'sapphire', level: 4, slot: 'jewel', matk: 120, spsBonusPct: 15, price: 180000, icon: 'acessories/jewel_sapphire.png', desc: '+120 M.Atk e +15% 魔靈彈傷害加成.' },
  jewel_sapphire_5: { id: 'jewel_sapphire_5', itemId: 'jewel_sapphire_5', name: '胸針藍寶石・等級 5（最高）', jewelType: 'sapphire', level: 5, slot: 'jewel', matk: 180, spsBonusPct: 22, price: 450000, icon: 'acessories/jewel_sapphire.png', desc: '+180 M.Atk e +22% 魔靈彈傷害加成.' },

  // ─── DIAMOND (Diamante: Defesa Física) ───
  jewel_diamond_1: { id: 'jewel_diamond_1', itemId: 'jewel_diamond_1', name: '胸針鑽石・等級 1', jewelType: 'diamond', level: 1, slot: 'jewel', def: 15, price: 15000, icon: 'acessories/jewel_diamond.png', desc: '+15 P.Def e 衝擊防護.' },
  jewel_diamond_2: { id: 'jewel_diamond_2', itemId: 'jewel_diamond_2', name: '胸針鑽石・等級 2', jewelType: 'diamond', level: 2, slot: 'jewel', def: 30, price: 35000, icon: 'acessories/jewel_diamond.png', desc: '+30 P.Def e 衝擊防護.' },
  jewel_diamond_3: { id: 'jewel_diamond_3', itemId: 'jewel_diamond_3', name: '胸針鑽石・等級 3', jewelType: 'diamond', level: 3, slot: 'jewel', def: 55, price: 80000, icon: 'acessories/jewel_diamond.png', desc: '+55 P.Def e 衝擊防護.' },
  jewel_diamond_4: { id: 'jewel_diamond_4', itemId: 'jewel_diamond_4', name: '胸針鑽石・等級 4', jewelType: 'diamond', level: 4, slot: 'jewel', def: 90, price: 180000, icon: 'acessories/jewel_diamond.png', desc: '+90 P.Def e 衝擊防護.' },
  jewel_diamond_5: { id: 'jewel_diamond_5', itemId: 'jewel_diamond_5', name: '胸針鑽石・等級 5（最高）', jewelType: 'diamond', level: 5, slot: 'jewel', def: 140, price: 450000, icon: 'acessories/jewel_diamond.png', desc: '+140 P.Def e 最高衝擊防護.' },

  // ─── PEARL (Pérola: Defesa Mágica) ───
  jewel_pearl_1: { id: 'jewel_pearl_1', itemId: 'jewel_pearl_1', name: '胸針珍珠・等級 1', jewelType: 'pearl', level: 1, slot: 'jewel', mdef: 18, price: 15000, icon: 'acessories/jewel_pearl.png', desc: '+18 M.Def e 魔法消散.' },
  jewel_pearl_2: { id: 'jewel_pearl_2', itemId: 'jewel_pearl_2', name: '胸針珍珠・等級 2', jewelType: 'pearl', level: 2, slot: 'jewel', mdef: 35, price: 35000, icon: 'acessories/jewel_pearl.png', desc: '+35 M.Def e 魔法消散.' },
  jewel_pearl_3: { id: 'jewel_pearl_3', itemId: 'jewel_pearl_3', name: '胸針珍珠・等級 3', jewelType: 'pearl', level: 3, slot: 'jewel', mdef: 65, price: 80000, icon: 'acessories/jewel_pearl.png', desc: '+65 M.Def e 魔法消散.' },
  jewel_pearl_4: { id: 'jewel_pearl_4', itemId: 'jewel_pearl_4', name: '胸針珍珠・等級 4', jewelType: 'pearl', level: 4, slot: 'jewel', mdef: 105, price: 180000, icon: 'acessories/jewel_pearl.png', desc: '+105 M.Def e 魔法消散.' },
  jewel_pearl_5: { id: 'jewel_pearl_5', itemId: 'jewel_pearl_5', name: '胸針珍珠・等級 5（最高）', jewelType: 'pearl', level: 5, slot: 'jewel', mdef: 160, price: 450000, icon: 'acessories/jewel_pearl.png', desc: '+160 M.Def e 最高魔法消散.' },

  // ─── OPAL (Opala: Atributos Gerais e Poder de Habilidades) ───
  jewel_opal_1: { id: 'jewel_opal_1', itemId: 'jewel_opal_1', name: '胸針蛋白石・等級 1', jewelType: 'opal', level: 1, slot: 'jewel', atk: 8, matk: 8, def: 8, mdef: 8, price: 20000, icon: 'acessories/jewel_opal.png', desc: '+8 全屬性，另加 +2% 技能威力.' },
  jewel_opal_2: { id: 'jewel_opal_2', itemId: 'jewel_opal_2', name: '胸針蛋白石・等級 2', jewelType: 'opal', level: 2, slot: 'jewel', atk: 18, matk: 18, def: 18, mdef: 18, price: 45000, icon: 'acessories/jewel_opal.png', desc: '+18 全屬性，另加 +4% 技能威力.' },
  jewel_opal_3: { id: 'jewel_opal_3', itemId: 'jewel_opal_3', name: '胸針蛋白石・等級 3', jewelType: 'opal', level: 3, slot: 'jewel', atk: 32, matk: 32, def: 32, mdef: 32, price: 100000, icon: 'acessories/jewel_opal.png', desc: '+32 全屬性，另加 +7% 技能威力.' },
  jewel_opal_4: { id: 'jewel_opal_4', itemId: 'jewel_opal_4', name: '胸針蛋白石・等級 4', jewelType: 'opal', level: 4, slot: 'jewel', atk: 52, matk: 52, def: 52, mdef: 52, price: 220000, icon: 'acessories/jewel_opal.png', desc: '+52 全屬性，另加 +11% 技能威力.' },
  jewel_opal_5: { id: 'jewel_opal_5', itemId: 'jewel_opal_5', name: '胸針蛋白石・等級 5（最高）', jewelType: 'opal', level: 5, slot: 'jewel', atk: 80, matk: 80, def: 80, mdef: 80, price: 500000, icon: 'acessories/jewel_opal.png', desc: '+80 全屬性，另加 +16% 技能威力.' }
};
