/**
 * CashShopService.js — Serviço de Gestão e Processamento da 商城 Comercial de Aden.
 *
 * Gerencia a moeda oficial de doação Aden Coins (AC), a compra e desempacotamento
 * inteligente dos 3 Starter Packs (adaptados por arquétipo Heavy / Light / Robe),
 * Equipamentos de Herança, Cosméticos, Títulos e Utilitários.
 */

import { CASH_SHOP_CATALOG } from '../data/shop/cash_shop_catalog.js';
import { HEIRLOOM_ITEMS } from '../data/items/heirloom_items.js';

export class CashShopService {
  /**
   * Retorna o saldo atual de Aden Coins (AC) do jogador.
   * @param {Object} state
   * @returns {number}
   */
  static getBalance(state) {
    return Number(state?.adenCoins) || 0;
  }

  /**
   * Identifica o arquétipo de armadura da classe (heavy, light ou robe).
   * @param {string} classId
   * @returns {'heavy'|'light'|'robe'}
   */
  static getArmorArchetype(classId = '') {
    const cls = String(classId).toLowerCase();
    if (
      cls.includes('mage') || cls.includes('wizard') || cls.includes('sorcerer') ||
      cls.includes('spellsinger') || cls.includes('spellhowler') || cls.includes('cleric') ||
      cls.includes('bishop') || cls.includes('prophet') || cls.includes('elder') ||
      cls.includes('shillien_e') || cls.includes('shillien_o') || cls.includes('oracle') ||
      cls.includes('warlock') || cls.includes('summoner') || cls.includes('elemental_s') ||
      cls.includes('phantom_s') || cls.includes('necromancer')
    ) {
      return 'robe';
    } else if (
      cls.includes('archer') || cls.includes('hawkeye') || cls.includes('ranger') ||
      cls.includes('silver_ran') || cls.includes('phantom_ran') || cls.includes('assassin') ||
      cls.includes('rogue') || cls.includes('dagger') || cls.includes('abyss_w') ||
      cls.includes('treasure_h') || cls.includes('plainswalker') || cls.includes('kamael') ||
      cls.includes('trooper') || cls.includes('soul_br') || cls.includes('trickster')
    ) {
      return 'light';
    }
    return 'heavy';
  }

  /**
   * Adiciona Aden Coins (AC) ao saldo do jogador (ex: após doação Pix / recarga).
   * @param {Object} state
   * @param {number} amount
   * @param {Object} callbacks
   */
  static addAdenCoins(state, amount, callbacks = {}) {
    const qty = Math.max(0, parseInt(amount, 10) || 0);
    state.adenCoins = (Number(state.adenCoins) || 0) + qty;
    if (callbacks.log) {
      callbacks.log(`🪙 **+${qty.toLocaleString()} 亞丁幣** 已成功加入帳號！`, 'system');
    }
    if (callbacks.onUpdate) callbacks.onUpdate();
    return state.adenCoins;
  }

  /**
   * Processa a compra de um Starter Pack adaptando os itens ao arquétipo do herói.
   * @param {Object} state
   * @param {string} packId
   * @param {Object} callbacks
   * @returns {boolean}
   */
  static buyStarterPack(state, packId, callbacks = {}) {
    const pack = CASH_SHOP_CATALOG.starter_packs.find(p => p.id === packId);
    if (!pack) {
      if (callbacks.log) callbacks.log('❌ 商城中找不到此禮包。', 'system');
      return false;
    }

    const currentBalance = this.getBalance(state);
    if (currentBalance < pack.priceAC) {
      if (callbacks.log) {
        callbacks.log(`❌ 餘額不足！你有 **${currentBalance} 亞丁幣**，此禮包需要 **${pack.priceAC} 亞丁幣**。`, 'system');
      }
      return false;
    }

    // Debita o valor em AC
    state.adenCoins -= pack.priceAC;
    state.inventory = state.inventory || [];

    const archetype = this.getArmorArchetype(state.class);
    const isMage = archetype === 'robe';

    // Helper para adicionar item com UID único
    const addItem = (itemId, count = 1, enchant = 0, isHeirloom = false) => {
      for (let i = 0; i < count; i++) {
        state.inventory.push({
          uid: `shop_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          itemId: itemId,
          enchant: enchant,
          isHeirloom: isHeirloom,
          count: (itemId.includes('shot') || itemId.includes('potion') || itemId.includes('elixir')) ? count : 1
        });
        if (itemId.includes('shot') || itemId.includes('potion') || itemId.includes('elixir')) break;
      }
    };

    // 1. Pack Tier 1 (Iniciante - Herança Lv. 1-40)
    if (packId === 'starter_pack_tier1') {
      const heirloomArmor = this.getHeirloomArmorSet(archetype);
      heirloomArmor.forEach(id => addItem(id, 1, 0, true));

      const heirloomWeapon = this.getHeirloomWeaponForClass(state.class);
      addItem(heirloomWeapon, 1, 0, true);

      // Shots inteligentes: Spiritshots para magos, Soulshots para físicos
      const shotId = isMage ? 'spiritshot_d' : 'soulshot_d';
      addItem(shotId, 2000);
      addItem('hp_potion_l', 50);
      addItem('scroll_teleport', 5);

      if (callbacks.log) {
        callbacks.log(`🎉 已領取 **${pack.name}**！你獲得 ${archetype === 'heavy' ? '重甲' : archetype === 'light' ? '輕甲' : archetype === 'robe' ? '法袍' : archetype} 傳承套裝（等級 1～40）、職業傳承武器與 2,000 發彈藥！`, 'system');
      }
    }

    // 2. Pack Tier 2 (Campeão - Herança Lv. 1-40 + Joias de Herança)
    else if (packId === 'starter_pack_tier2') {
      const heirloomArmor = this.getHeirloomArmorSet(archetype);
      heirloomArmor.forEach(id => addItem(id, 1, 0, true));

      const heirloomWeapon = this.getHeirloomWeaponForClass(state.class);
      addItem(heirloomWeapon, 1, 0, true);

      // Joias de Herança (Lv. 1 ao 40)
      addItem('jewelry_heirloom_necklace', 1, 0, true);
      addItem('jewelry_heirloom_earring_1', 1, 0, true);
      addItem('jewelry_heirloom_earring_2', 1, 0, true);
      addItem('jewelry_heirloom_ring_1', 1, 0, true);
      addItem('jewelry_heirloom_ring_2', 1, 0, true);

      // Shots inteligentes
      const shotId = isMage ? 'spiritshot_d' : 'soulshot_d';
      addItem(shotId, 5000);
      addItem('hp_potion_xl', 100);
      addItem('potion_haste', 15);
      addItem('scroll_teleport', 10);
      
      // Concede Título [Pioneiro]
      state.unlockedTitles = state.unlockedTitles || [];
      if (!state.unlockedTitles.includes('先驅者')) state.unlockedTitles.push('先驅者');
      state.title = '先驅者';

      if (callbacks.log) {
        callbacks.log(`👑 **${pack.name}** 已啟用！獲得 ${archetype === 'heavy' ? '重甲' : archetype === 'light' ? '輕甲' : archetype === 'robe' ? '法袍' : archetype} 傳承套裝、傳承武器、5 件傳承珠寶、5,000 發彈藥與稱號 **[先驅者]**！`, 'system');
      }
    }

    // 3. Pack Tier 3 (Lorde Soberano - Full Herança Scaling Lv 1-40)
    else if (packId === 'starter_pack_tier3') {
      // Entrega o Conjunto de Armadura de Herança específico do arquétipo
      const heirloomArmor = this.getHeirloomArmorSet(archetype);
      heirloomArmor.forEach(id => addItem(id, 1, 0, true));
      
      // Entrega a Arma de Herança correspondente à classe
      const heirloomWeapon = this.getHeirloomWeaponForClass(state.class);
      addItem(heirloomWeapon, 1, 0, true);

      // Escudo Aegis de Herança para classes de escudo
      if (['paladin', 'dark_avenger', 'temple_knight', 'shillien_knight', 'knight', 'vanguard_rider'].includes(state.class)) {
        addItem('shield_heirloom_aegis', 1, 0, true);
      }

      // Joias de Herança
      addItem('jewelry_heirloom_necklace', 1, 0, true);
      addItem('jewelry_heirloom_earring_1', 1, 0, true);
      addItem('jewelry_heirloom_earring_2', 1, 0, true);
      addItem('jewelry_heirloom_ring_1', 1, 0, true);
      addItem('jewelry_heirloom_ring_2', 1, 0, true);

      // Capa, Cinto e Coroa Alada
      addItem('cloak_heirloom_royal', 1, 0, true);
      addItem('belt_heirloom_champion', 1, 0, true);
      addItem('hair_heirloom_crown', 1, 0, true);

      // Shots inteligentes C-Grade
      const shotId = isMage ? 'spiritshot_c' : 'soulshot_c';
      addItem(shotId, 15000);
      addItem('hp_potion_xl', 200);
      addItem('elixir_vigor_1h', 20);

      // Passe VIP 30 Dias
      state.vipTeleportUntil = Math.max(Date.now(), state.vipTeleportUntil || 0) + (30 * 24 * 3600 * 1000);

      // Título Dourado [Lorde Soberano]
      state.unlockedTitles = state.unlockedTitles || [];
      if (!state.unlockedTitles.includes('君主至尊')) state.unlockedTitles.push('君主至尊');
      state.title = '君主至尊';

      // Agathion Bebê Dragão Dourado
      state.activeAgathion = 'agathion_golden_dragon';

      if (callbacks.log) {
        callbacks.log(`✨ **君主至尊套組已啟用！**你獲得完整的 ${archetype === 'heavy' ? '重甲' : archetype === 'light' ? '輕甲' : archetype === 'robe' ? '法袍' : archetype} 動態傳承套裝（等級 1～40）、職業傳承武器、飾品、披風、腰帶、王冠、15,000 發彈藥、30 天貴賓通行證、黃金巨龍亞加西翁，以及稱號 **【君主至尊】**！`, 'system');
      }
    }

    state.starterPacksClaimed = state.starterPacksClaimed || [];
    state.starterPacksClaimed.push(packId);

    if (callbacks.onUpdate) callbacks.onUpdate();
    return true;
  }

  /**
   * Retorna os IDs das 5 peças de armadura D-Grade por arquétipo.
   * @param {'heavy'|'light'|'robe'} archetype
   * @returns {string[]}
   */
  static getDGradeArmorSet(archetype = 'heavy') {
    if (archetype === 'robe') {
      return [
        'armor_mithril_tunic_robe',
        'armor_mithril_pants_robe',
        'armor_mithril_helmet_robe',
        'armor_mithril_gloves_robe',
        'armor_mithril_boots_robe'
      ];
    } else if (archetype === 'light') {
      return [
        'armor_manticore_armor_light',
        'armor_manticore_pants_light',
        'armor_manticore_helmet_light',
        'armor_manticore_gloves_light',
        'armor_manticore_boots_light'
      ];
    }
    return [
      'armor_brigandine_armor_heavy',
      'armor_brigandine_pants_heavy',
      'armor_brigandine_helmet_heavy',
      'armor_brigandine_gloves_heavy',
      'armor_brigandine_boots_heavy'
    ];
  }

  /**
   * Retorna os IDs das 5 peças de Armadura de Herança por arquétipo.
   * @param {'heavy'|'light'|'robe'} archetype
   * @returns {string[]}
   */
  static getHeirloomArmorSet(archetype = 'heavy') {
    if (archetype === 'robe') {
      return [
        'armor_heirloom_chest_robe',
        'armor_heirloom_legs_robe',
        'armor_heirloom_helmet_robe',
        'armor_heirloom_gloves_robe',
        'armor_heirloom_boots_robe'
      ];
    } else if (archetype === 'light') {
      return [
        'armor_heirloom_chest_light',
        'armor_heirloom_legs_light',
        'armor_heirloom_helmet_light',
        'armor_heirloom_gloves_light',
        'armor_heirloom_boots_light'
      ];
    }
    return [
      'armor_heirloom_chest_heavy',
      'armor_heirloom_legs_heavy',
      'armor_heirloom_helmet_heavy',
      'armor_heirloom_gloves_heavy',
      'armor_heirloom_boots_heavy'
    ];
  }

  /**
   * Retorna o ID da arma de herança apropriada para a classe do jogador.
   * @param {string} classId
   * @returns {string}
   */
  static getHeirloomWeaponForClass(classId = '') {
    const cls = String(classId).toLowerCase();
    if (cls.includes('vanguard') || cls.includes('rider') || cls.includes('spear') || cls.includes('warlord')) {
      return 'weapon_heirloom_spear';
    } else if (cls.includes('assassin') || cls.includes('rogue') || cls.includes('dagger') || cls.includes('abyss') || cls.includes('treasure')) {
      return 'weapon_heirloom_dagger';
    } else if (cls.includes('archer') || cls.includes('hawkeye') || cls.includes('phantom') || cls.includes('ranger') || cls.includes('silver')) {
      return 'weapon_heirloom_bow';
    } else if (cls.includes('mage') || cls.includes('wizard') || cls.includes('sorcerer') || cls.includes('spellsinger') || cls.includes('spellhowler') || cls.includes('cleric') || cls.includes('bishop') || cls.includes('elder') || cls.includes('shillien')) {
      return 'weapon_heirloom_staff';
    } else if (cls.includes('gladiator') || cls.includes('duelist') || cls.includes('tyrant') || cls.includes('warg')) {
      return 'weapon_heirloom_duals';
    } else if (cls.includes('artisan') || cls.includes('scavenger') || cls.includes('warsmith') || cls.includes('bounty')) {
      return 'weapon_heirloom_blunt';
    }
    return 'weapon_heirloom_sword';
  }

  /**
   * Retorna arma inicial D-Grade para os packs Tier 1 e 2.
   * @param {string} classId
   * @returns {string}
   */
  static getStarterWeaponForClass(classId = '') {
    const cls = String(classId).toLowerCase();
    if (cls.includes('vanguard') || cls.includes('spear') || cls.includes('warlord')) return 'weapon_winged_spear';
    if (cls.includes('dagger') || cls.includes('assassin') || cls.includes('rogue') || cls.includes('abyss') || cls.includes('treasure')) return 'weapon_crimson_sword';
    if (cls.includes('archer') || cls.includes('bow') || cls.includes('ranger') || cls.includes('hawkeye') || cls.includes('phantom') || cls.includes('silver')) return 'weapon_elven_bow';
    if (cls.includes('mage') || cls.includes('wizard') || cls.includes('sorcerer') || cls.includes('spellsinger') || cls.includes('spellhowler') || cls.includes('cleric') || cls.includes('bishop') || cls.includes('elder') || cls.includes('shillien')) return 'weapon_mystic_staff';
    if (cls.includes('gladiator') || cls.includes('duelist') || cls.includes('tyrant') || cls.includes('warg')) return 'weapon_dual_bastard_sword';
    if (cls.includes('dwarf') || cls.includes('artisan') || cls.includes('scavenger') || cls.includes('warsmith') || cls.includes('bounty')) return 'weapon_warhammer';
    return 'weapon_crimson_sword';
  }

  /**
   * Compra cosmético (Skin de Arma ou Traje).
   * @param {Object} state
   * @param {string} skinId
   * @param {Object} callbacks
   */
  static buyCostumeOrSkin(state, skinId, callbacks = {}) {
    const item = CASH_SHOP_CATALOG.costumes_and_skins.find(c => c.id === skinId);
    if (!item) return false;

    const currentBalance = this.getBalance(state);
    if (currentBalance < item.priceAC) {
      if (callbacks.log) callbacks.log(`❌ 餘額不足，無法購買 ${item.name}！`, 'system');
      return false;
    }

    state.adenCoins -= item.priceAC;
    state.unlockedCosmetics = state.unlockedCosmetics || [];
    if (!state.unlockedCosmetics.includes(skinId)) {
      state.unlockedCosmetics.push(skinId);
    }
    state.activeSkin = skinId;

    // Adiciona o item físico na mochila para o jogador gerenciar e ver seu colecionável
    state.inventory = state.inventory || [];
    const alreadyHas = state.inventory.some(i => i.itemId === skinId);
    if (!alreadyHas) {
      state.inventory.push({
        uid: `cosm_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        itemId: skinId,
        name: item.name,
        icon: item.icon,
        count: 1
      });
    }

    if (callbacks.log) {
      callbacks.log(`🎨 **${item.name}** 已購買、放入背包並成功裝備！`, 'system');
    }
    if (callbacks.onUpdate) callbacks.onUpdate();
    return true;
  }

  /**
   * Compra e equipa título honorário ou moldura.
   * @param {Object} state
   * @param {string} titleId
   * @param {Object} callbacks
   */
  static buyTitleOrEffect(state, titleId, callbacks = {}) {
    const item = CASH_SHOP_CATALOG.titles_and_effects.find(t => t.id === titleId);
    if (!item) return false;

    const currentBalance = this.getBalance(state);
    if (currentBalance < item.priceAC) {
      if (callbacks.log) callbacks.log(`❌ 購買 ${item.name} 的餘額不足！`, 'system');
      return false;
    }

    state.adenCoins -= item.priceAC;
    state.unlockedTitles = state.unlockedTitles || [];

    if (item.category === 'title') {
      const titleClean = item.name.replace('稱號： ', '').replace(/[\[\]]/g, '');
      if (!state.unlockedTitles.includes(titleClean)) state.unlockedTitles.push(titleClean);
      state.title = titleClean;
      state.titleColor = item.color;
    } else if (item.category === 'avatar_frame') {
      state.activeAvatarFrame = item.id;
    } else if (item.category === 'combat_aura') {
      state.activeCombatAura = item.id;
    }

    // Entrega o certificado/item físico na mochila
    state.inventory = state.inventory || [];
    const alreadyHas = state.inventory.some(i => i.itemId === titleId);
    if (!alreadyHas) {
      state.inventory.push({
        uid: `title_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        itemId: titleId,
        name: item.name,
        icon: item.icon || 'spellbooks/spellbook_4star.png',
        count: 1
      });
    }

    if (callbacks.log) {
      callbacks.log(`🏷️ **${item.name}** 已啟用並加入背包！`, 'system');
    }
    if (callbacks.onUpdate) callbacks.onUpdate();
    return true;
  }

  /**
   * Compra item utilitário (Passe VIP, Blessed Scrolls, Elixires, Expansor de Mochila).
   * @param {Object} state
   * @param {string} utilityId
   * @param {Object} callbacks
   */
  static buyUtility(state, utilityId, callbacks = {}) {
    const item = CASH_SHOP_CATALOG.utility_and_passes.find(u => u.id === utilityId);
    if (!item) return false;

    const currentBalance = this.getBalance(state);
    if (currentBalance < item.priceAC) {
      if (callbacks.log) callbacks.log(`❌ 購買 ${item.name} 的餘額不足！`, 'system');
      return false;
    }

    state.adenCoins -= item.priceAC;
    state.inventory = state.inventory || [];

    if (utilityId === 'pass_vip_teleport_30d') {
      state.vipTeleportUntil = Math.max(Date.now(), state.vipTeleportUntil || 0) + (30 * 24 * 3600 * 1000);
      const existing = state.inventory.find(i => i.itemId === 'pass_vip_teleport_30d');
      if (existing) {
        existing.count = (existing.count || 1) + 1;
      } else {
        state.inventory.push({
          uid: `vip_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          itemId: 'pass_vip_teleport_30d',
          count: 1
        });
      }
      if (callbacks.log) callbacks.log('🌟 **貴賓傳送通行證（30 天）** 已放入背包並啟用！已開啟免費傳送。', 'system');
    } else if (utilityId === 'elixir_vigor_bundle_5') {
      const existing = state.inventory.find(i => i.itemId === 'elixir_vigor_1h');
      if (existing) {
        existing.count = (existing.count || 1) + 5;
      } else {
        state.inventory.push({
          uid: `util_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          itemId: 'elixir_vigor_1h',
          count: 5
        });
      }
      if (callbacks.log) callbacks.log('🧪 **5× 活力靈藥** 已送入背包！', 'system');
    } else {
      const targetId = utilityId;
      const isStackable = targetId.startsWith('scroll_') || targetId.startsWith('elixir_') || targetId.startsWith('pack_');
      const existing = isStackable ? state.inventory.find(i => i.itemId === targetId) : null;
      if (existing) {
        existing.count = (existing.count || 1) + 1;
      } else {
        state.inventory.push({
          uid: `util_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          itemId: targetId,
          count: 1
        });
      }
      if (callbacks.log) callbacks.log(`📦 **${item.name}** 已成功加入背包！`, 'system');
    }

    if (callbacks.onUpdate) callbacks.onUpdate();
    return true;
  }
}
