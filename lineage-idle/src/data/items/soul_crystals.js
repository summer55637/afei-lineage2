/**
 * soul_crystals.js — Catálogo de Itens de Soul Crystals (Estágios 1 a 15).
 */

export const SOUL_CRYSTAL_ITEMS = {};

const colors = [
  { key: 'red', name: '紅色', icon: 'gradespecial/jewels/jewel_necklace_of_valakas.png' },
  { key: 'green', name: '綠色', icon: 'gradespecial/jewels/jewel_ring_queen_ant.png' },
  { key: 'blue', name: '藍色', icon: 'gradespecial/jewels/jewel_ring_core.png' }
];

for (const c of colors) {
  for (let st = 1; st <= 15; st++) {
    const itemId = `soul_crystal_${c.key}_stage${st}`;
    SOUL_CRYSTAL_ITEMS[itemId] = {
      id: itemId,
      name: `靈魂水晶 ${c.name}－階段 ${st}${st === 15 ? '（傳說）' : ''}`,
      slot: 'crystal',
      type: 'soul_crystal',
      isSoulCrystal: true,
      stage: st,
      crystalLevel: st,
      color: c.key,
      tier: st >= 14 ? 6 : st >= 10 ? 5 : st >= 5 ? 4 : 3,
      rarity: st === 15 ? 'sovereign' : st === 14 ? 'primordial' : st >= 10 ? 'legendary' : st >= 5 ? 'epic' : 'rare',
      price: st * 50000,
      icon: c.icon,
      desc: `靈魂水晶 ${c.name} 等級 ${st}。吸收怪物靈魂可成長至階段 15，並可鑲嵌於武器上解鎖特殊能力（SA）！`
    };
  }
}

// Alias padrão
SOUL_CRYSTAL_ITEMS['soul_crystal_initial'] = SOUL_CRYSTAL_ITEMS['soul_crystal_red_stage1'];
