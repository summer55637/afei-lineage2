/**
 * cash_shop_catalog.js — Catálogo Oficial da Loja Comercial de Aden.
 * 
 * Contém as 5 abas da loja:
 * 1. Starter Packs (Pacotes Iniciais com Itens de Herança)
 * 2. Trajes & Skins (Armas e Trajes Cosméticos)
 * 3. Títulos & Efeitos (Títulos Coloridos, Molduras e Auras)
 * 4. Utilitários & Passes (Passe VIP, Blessed Scrolls, Tomos 4★)
 * 5. Obter Aden Coins (Pacotes de Doação Pix / Moeda AC)
 */

export const CASH_SHOP_CATALOG = {
  // ─── 1. STARTER PACKS (PACOTES INICIAIS) ──────────────────────────────────
  starter_packs: [
    {
      id: 'starter_pack_tier1',
      name: '新手冒險者禮包（第 1 階）',
      priceAC: 100,
      brlEquivalent: '7.50 巴西雷亞爾',
      badge: '熱門',
      icon: 'gradec/weapons/weapon_berserker_blade.png',
      desc: '適合從等級 1 開始的基礎禮包，不受裝備階級懲罰。內含傳承防具套裝（重甲、輕甲或法袍）＋職業傳承武器（可隨 等級 1～40 成長）＋2,000 發彈藥與藥水。',
      contents: {
        gearTier: '動態傳承裝備（等級 1～40，自動適配）',
        isHeirloomSet: true,
        items: [
          { id: 'armor_heirloom_chest', name: '傳承防具套裝（5 件）', count: 1, isHeirloom: true },
          { id: 'weapon_heirloom_sword', name: '職業傳承武器（等級 1～40）', count: 1, isHeirloom: true }
        ],
        consumables: [
          { id: 'soulshot_d', name: '2,000 發職業魂彈（魂彈／魔靈彈）', count: 2000 },
          { id: 'hp_potion_l', name: '50 瓶大型生命藥水', count: 50 },
          { id: 'scroll_teleport', name: '5 張傳送卷軸', count: 5 }
        ]
      }
    },
    {
      id: 'starter_pack_tier2',
      name: '亞丁冠軍禮包（第 2 階）',
      priceAC: 250,
      brlEquivalent: '15.00 巴西雷亞爾',
      badge: '推薦',
      icon: 'gradec/weapons/weapon_samurai_longsword.png',
      desc: '高性價比禮包。內含傳承防具套裝（5 件）、職業傳承武器、5 件完整傳承飾品套組（等級 1 即可裝備）、5,000 發彈藥與［先鋒］稱號。',
      contents: {
        gearTier: '動態傳承裝備＋傳承珠寶（等級 1～40）',
        isHeirloomSet: true,
        title: { id: 'title_pioneiro', name: '先鋒', color: '#38bdf8', glow: true },
        items: [
          { id: 'armor_heirloom_chest', name: '傳承防具套裝（5 件）', count: 1, isHeirloom: true },
          { id: 'weapon_heirloom_sword', name: '職業傳承武器（等級 1～40）', count: 1, isHeirloom: true },
          { id: 'jewelry_heirloom_necklace', name: '完整 5 件傳承飾品套組', count: 1, isHeirloom: true }
        ],
        consumables: [
          { id: 'soulshot_d', name: '5,000 發職業魂彈（魂彈／魔靈彈）', count: 5000 },
          { id: 'hp_potion_xl', name: '100 瓶特大型生命藥水', count: 100 },
          { id: 'potion_haste', name: '15 瓶加速藥水', count: 15 },
          { id: 'scroll_teleport', name: '10 張傳送卷軸', count: 10 }
        ]
      }
    },
    {
      id: 'starter_pack_tier3',
      name: '至尊領主禮包（第 3 階－傳承）',
      priceAC: 500,
      brlEquivalent: '29.90 巴西雷亞爾',
      badge: '至尊',
      icon: 'acessories/noble_gold_crown.png',
      desc: '最高階傳承禮包。內含依職業配置的完整傳承裝備（5 件防具＋武器＋5 件飾品＋皇家披風＋腰帶＋翼冠＋神盾），可啟動至尊加成 +60% 經驗值／金幣，另含黃金龍阿加西翁、15,000 發彈藥、30 天 貴賓通行證與金色［至尊領主］稱號。',
      contents: {
        gearTier: '至尊領主全套（12 件以上 等級 1～40 傳承裝備）',
        isHeirloomSet: true,
        title: { id: 'title_lorde_soberano', name: '至尊領主', color: '#ffd700', glow: true, animated: true },
        agathion: { id: 'agathion_golden_dragon', name: '黃金龍阿加西翁', desc: '神秘夥伴，提供 +5% 金幣收益與華麗外觀。' },
        items: [
          { id: 'armor_heirloom_chest', name: '傳承防具套裝（5 件）', count: 1, isHeirloom: true },
          { id: 'weapon_heirloom_sword', name: '職業傳承武器', count: 1, isHeirloom: true },
          { id: 'jewelry_heirloom_necklace', name: '完整 5 件傳承飾品套組', count: 1, isHeirloom: true },
          { id: 'cloak_heirloom_royal', name: '皇家披風＋冠軍腰帶＋翼冠＋神盾', count: 1, isHeirloom: true }
        ],
        consumables: [
          { id: 'soulshot_c', name: '15,000× C 級魂彈（魂彈／魔靈彈）', count: 15000 },
          { id: 'hp_potion_xl', name: '200 瓶特大型生命藥水', count: 200 },
          { id: 'elixir_vigor_1h', name: '20 瓶活力靈藥（1 小時）', count: 20 },
          { id: 'pass_vip_teleport_30d', name: '貴賓傳送通行證（30 天）', count: 1 }
        ]
      }
    }
  ],

  // ─── 2. TRAJES & SKINS (APARÊNCIAS VISUAIS) ───────────────────────────────
  costumes_and_skins: [
    {
      id: 'skin_weapon_frost_lord',
      category: 'weapon_skin',
      name: '武器外觀：霜之領主',
      priceAC: 200,
      icon: 'gradespecial/weapons/weapon_frost_lord_sword.png',
      desc: '讓武器環繞冰霧與永恆寒冰的閃耀粒子。',
      visualEffect: 'frost_aura'
    },
    {
      id: 'skin_weapon_infernal_dragon',
      category: 'weapon_skin',
      name: '武器外觀：煉獄巨龍',
      priceAC: 200,
      icon: 'gradec/weapons/weapon_samurai_longsword.png',
      desc: '讓刀刃燃起烈焰與火山火花。',
      visualEffect: 'fire_aura'
    },
    {
      id: 'skin_weapon_celestial_holy',
      category: 'weapon_skin',
      name: '武器外觀：天界神聖',
      priceAC: 200,
      icon: 'gradec/weapons/weapon_crystal_staff.png',
      desc: '散發金色神聖光芒與漂浮聖紋。',
      visualEffect: 'holy_aura'
    },
    {
      id: 'costume_royal_gala',
      category: 'costume',
      name: '亞丁皇家禮服',
      priceAC: 350,
      icon: 'gradec/armors/armor_full_plate_heavy_armor.png',
      desc: '為亞丁城堡帝國舞會製作的貴族典禮服飾。',
      visualEffect: 'royal_suit'
    },
    {
      id: 'costume_death_knight',
      category: 'costume',
      name: '死亡騎士鎧甲',
      priceAC: 350,
      icon: 'gradec/armors/armor_full_plate_heavy_helmet.png',
      desc: '黑色板甲搭配幽藍發光雙眼，散發陰暗威嚴。',
      visualEffect: 'death_knight_suit'
    },
    {
      id: 'costume_elven_spring',
      category: 'costume',
      name: '精靈春日法袍',
      priceAC: 300,
      icon: 'gradec/armors/armor_full_plate_cloack.png',
      desc: '以魔法葉片與花瓣點綴的精靈長袍。',
      visualEffect: 'elven_spring_suit'
    }
  ],

  // ─── 3. TÍTULOS & EFEITOS (PRESTÍGIO & IDENTIDADE) ─────────────────────────
  titles_and_effects: [
    {
      id: 'title_imperador',
      category: 'title',
      name: '稱號：[皇帝]',
      priceAC: 150,
      color: '#ef4444',
      prefixIcon: '👑',
      desc: '在聊天與角色頭像顯示帶紅色王冠與閃耀效果的［皇帝］榮譽稱號。'
    },
    {
      id: 'title_imortal',
      category: 'title',
      name: '稱號：[不朽者]',
      priceAC: 150,
      color: '#a855f7',
      prefixIcon: '⚡',
      desc: '以神秘紫色與柔和奧術脈動效果顯示［不朽者］稱號。'
    },
    {
      id: 'title_cacador_lendario',
      category: 'title',
      name: '稱號：[傳說獵人]',
      priceAC: 120,
      color: '#10b981',
      prefixIcon: '🏹',
      desc: '以翡翠綠顯示［傳說獵人］稱號，獻給真正的狩獵高手。'
    },
    {
      id: 'title_mestre_forja',
      category: 'title',
      name: '稱號：[鍛造大師]',
      priceAC: 120,
      color: '#f97316',
      prefixIcon: '🔨',
      desc: '以烈焰橘顯示［鍛造大師］稱號，獻給強化與鍛造高手。'
    },
    {
      id: 'frame_imperial_gold',
      category: 'avatar_frame',
      name: '頭像邊框：帝國黃金',
      priceAC: 100,
      desc: '帶翼雕刻的金色邊框，永久裝飾英雄頭像。'
    },
    {
      id: 'aura_battle_fire',
      category: 'combat_aura',
      name: '戰鬥光環：吞噬烈焰',
      priceAC: 180,
      desc: '戰鬥時在角色腳下旋轉的火焰符文光環。'
    }
  ],

  // ─── 4. UTILITÁRIOS & PASSES (CONVENIÊNCIA SAUDÁVEL) ───────────────────────
  utility_and_passes: [
    {
      id: 'pass_vip_teleport_30d',
      name: '貴賓傳送通行證（30 天）',
      priceAC: 150,
      icon: 'gradec/jewels/jewel_blessed_necklace.png',
      desc: '30 天內可不限次數瞬間傳送至亞丁各狩獵區，免除金幣傳送費。'
    },
    {
      id: 'scroll_blessed_weapon',
      name: '祝福武器強化卷軸（通用）',
      priceAC: 80,
      icon: 'scrolls/scroll_of_enchant_weapon_.png',
      desc: '可使任何武器強化 +1。失敗時裝備 100% 受到保護，不會降級或破壞。'
    },
    {
      id: 'scroll_blessed_armor',
      name: '祝福防具強化卷軸（通用）',
      priceAC: 50,
      icon: 'scrolls/scroll_of_enchant_armor.png',
      desc: '可使任何防具、盾牌或飾品強化 +1。失敗時裝備 100% 受到保護，不會降級或破壞。'
    },
    {
      id: 'pack_inventory_expand_30',
      name: '背包擴充器（+30 格）',
      priceAC: 120,
      icon: 'materials/material_pouch.png',
      desc: '神秘次元皮袋，可永久增加背包上限 30 格。'
    },
    {
      id: 'elixir_vigor_bundle_5',
      name: '5 瓶活力靈藥禮包（1 小時）',
      priceAC: 25,
      icon: 'consumables/berserker_elixir.png',
      desc: '每瓶持續 1 小時，提供 +30% 經驗與 +30% 金幣收益。'
    }
  ],

  // ─── 5. OBTER ADEN COINS (TABELA DE DOAÇÃO PIX) ───────────────────────────
  donation_tiers: [
    {
      id: 'ac_pack_100',
      amountAC: 100,
      bonusAC: 0,
      firstPurchaseBonusAC: 100,
      priceBRL: '7.50 巴西雷亞爾',
      label: '小型禮包',
      desc: '適合購買 第 1 階新手禮包或實用通行證。🎁 首次儲值：額外 +100 亞丁幣！'
    },
    {
      id: 'ac_pack_250',
      amountAC: 250,
      bonusAC: 0,
      firstPurchaseBonusAC: 250,
      priceBRL: '15.00 巴西雷亞爾',
      label: '中型禮包',
      desc: '適合購買 第 2 階冠軍禮包或武器外觀。🎁 首次儲值：額外 +250 亞丁幣！'
    },
    {
      id: 'ac_pack_550',
      amountAC: 500,
      bonusAC: 50,
      firstPurchaseBonusAC: 500,
      totalAC: 550,
      priceBRL: '30.00 巴西雷亞爾',
      label: '領主禮包（+10% 加成）',
      popular: true,
      desc: '可購買 第 3 階完整傳承新手禮包＋稱號＋阿加西翁。🎁 首次儲值：額外 +500 亞丁幣！'
    },
    {
      id: 'ac_pack_1200',
      amountAC: 1000,
      bonusAC: 200,
      firstPurchaseBonusAC: 1000,
      totalAC: 1200,
      priceBRL: '60.00 巴西雷亞爾',
      label: '皇家寶庫（+20% 加成）',
      desc: '提供更高額度與額外加成，適合解鎖服裝與光環。🎁 首次儲值：額外 +1,000 亞丁幣！'
    }
  ]
};
