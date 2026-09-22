import * as ART from "./art.js";
// echo-adapter garante que SKILL_DEFS_ECHO, CLASS_SKILLS_ECHO e SKILL_TREE_LAYOUT_ECHO
// existam em window.EchoData antes das constantes globais serem lidas abaixo.
import { isMagicSkill } from "./data/echo-adapter.js";
import "./src/data/items/index.js";
import { RARITY, ALL_ITEMS, rollDrop, rollRarity } from './src/data/items/index.js';
import { getArmorType, getWeaponType, canEquipByType, ARMOR_TYPE_LABEL, WEAPON_TYPE_LABEL } from './src/data/items/item_class_rules.js';
import { AFFIX_MAP as AFFIX_MAP_IMPORT } from './data/affixes.js';
import { getSkillIcon, getSkillSemanticData } from './src/services/SkillIconRegistry.js';



// ─── Sprint 1: Importa módulos de dados extraídos ───────────────────────────
import { RACE_BASE_ATTRIBUTES, RACES, CLASSES, DWARF_CLASS, KAMAEL_CLASS } from './src/data/races.js';
import { resolveCanonicalClassId, resolveCanonicalDagClassId, getCanonicalCharacterClass } from './src/data/classes/class_aliases.js';
import { ClassValidationService } from './src/services/ClassValidationService.js';
import { ClassProgressionEngine } from './src/engine/ClassProgressionEngine.js';
import { CanonicalClassGraph } from './src/data/classes/CanonicalClassGraph.js';
import { getClassEntity } from './src/data/elemental/ClassLineage.js';
import { HISTORICAL_CLASS_MAP } from './src/data/elemental/HistoricalClasses.js';
import { CLASS_IDENTITIES } from './src/data/elemental/ClassIdentity.js';
import { SAGAS, ZONES, ZONE_BACKGROUNDS, getSagaDef }                          from './src/data/zones.js';
import { MONSTERS }                                                          from './src/data/monsters.js';
import { RAID_BOSSES }                                                       from './src/data/raids.js';
import { QUEST_DEFS, BATTLE_PASS_TIERS, PASS_DEFS, DAILY_COMPLETION_BONUS } from './src/data/quests.js';
import { CODEX_SETS, BOSS_DOLLS }                                           from './src/data/codex.js';
import { MONSTER_CARDS, CardCodexService }                                    from './src/services/CardCodexService.js';
import { DYES_CATALOG }                                                       from './src/data/dyes.js';
import { DyeService }                                                         from './src/services/DyeService.js';
import { PET_CATALOG }                                                        from './src/data/pets.js';
import { PetService }                                                         from './src/services/PetService.js';
import { SOLO_INSTANCES }                                                     from './src/data/instances.js';
import { InstanceService }                                                    from './src/services/InstanceService.js';
import { MANOR_PROVINCES }                                                    from './src/data/manor.js';
import { ManorService }                                                       from './src/services/ManorService.js';
import { FishingService }                                                     from './src/services/FishingService.js';
import { HuntingService }                                                     from './src/services/HuntingService.js';
import { GatheringService }                                                   from './src/services/lifeActivities/GatheringService.js';
import { MiningService }                                                      from './src/services/lifeActivities/MiningService.js';
import { MercenaryService }                                                   from './src/services/MercenaryService.js';
import { MERCENARY_RARITIES, MERCENARY_SPECIALIZATIONS, MERCENARY_TRAITS }           from './src/data/mercenaries.js';
import { ExpeditionService, EXPEDITION_DESTINATIONS as CANONICAL_EXPEDITION_DESTINATIONS, EXPEDITION_DILEMMAS, RISK_DIRECTIVES } from './src/services/ExpeditionService.js';
import { renderFishingUI }                                                    from './src/ui/FishingUI.js';
import { renderHuntingUI }                                                    from './src/ui/HuntingUI.js';
import { renderGatheringUI }                                                  from './src/ui/GatheringUI.js';
import { renderMiningUI }                                                     from './src/ui/MiningUI.js';
import { RefineryService }                                                    from './src/services/lifeActivities/RefineryService.js';
import { setRefineryCategory }                                                from './src/ui/RefineryUI.js';
// ─── Sprint 2: Importa motores de Stats e Nível ────────────────────────────
import {
  getStats as engineGetStats,
  getBaseAttributes,
  getEquipBonus as engineGetEquipBonus,
  getTotalEquipBonuses as engineGetTotalEquipBonuses,
  getCertificationsBonuses as engineGetCertificationsBonuses,
  getActiveSetBonuses as engineGetActiveSetBonuses,
  applyPrimaryStats,
  getClass,
  getZoneDropTier,
  getEquippedSetCount,
  ASTRAL_NODES
} from './src/engine/StatsEngine.js';

import {
  getXPForLevel,
  getTotalXP,
  calcSpForLevel,
  checkLevelUp as engineCheckLevelUp
} from './src/engine/LevelEngine.js';

import {
  checkGradePenalty,
  getPlayerTotalGradePenalty,
  rollChampionMonster,
  ZONE_GRADE_MULTIPLIERS,
  getLevelGapModifiers,
  getWealthTaxMultiplier
} from './src/engine/BalanceEngine.js';

import {
  MonsterAIEngine,
  ARCHETYPE_INFO,
  HUNTING_DIFFICULTIES
} from './src/engine/MonsterAIEngine.js';

import {
  validateOfflineTime,
  sanitizeGameState
} from './src/engine/SecurityEngine.js';
// ─── Sprint 3: Importa serviços de Inventário, Equipamentos, Loja e Craft ──
import {
  getMaxInventorySlots,
  getMaxWarehouseSlots,
  isHighValueItem,
  isProtectedFromAutoSell,
  getItemGrade,
  getInventoryCount as serviceGetInventoryCount,
  addToInventory as serviceAddToInventory,
  removeFromInventory as serviceRemoveFromInventory,
  removeFromInventoryByItemId as serviceRemoveFromInventoryByItemId,
  getWarehouseCount as serviceGetWarehouseCount,
  depositToWarehouse as serviceDepositToWarehouse,
  withdrawFromWarehouse as serviceWithdrawFromWarehouse,
  getSelectedSet as serviceGetSelectedSet,
  toggleSelectItem as serviceToggleSelectItem,
  selectItemsByFilter as serviceSelectItemsByFilter,
  clearItemSelection as serviceClearItemSelection,
  consolidateInventoryStacks,
  organizeInventory,
  calculateInventoryPressure,
  isItemProtected
} from './src/services/InventoryService.js';

import {
  DAILY_REWARDS_TABLE,
  getDailyRewardStatus,
  claimDailyReward
} from './src/services/DailyRewardService.js';

import {
  resolveEquipSlot as serviceResolveEquipSlot,
  equipItem as serviceEquipItem,
  unequipItem as serviceUnequipItem,
  generateAutoEquipProposal,
  commitAutoEquipProposal
} from './src/services/EquipmentService.js';
import * as EnchantmentService from './src/services/EnchantmentService.js';
import { parseEnchantScroll } from './src/services/ItemClassificationService.js';

import {
  buyItem as serviceBuyItem,
  buyMysticItem as serviceBuyMysticItem,
  sellItem as serviceSellItem,
  sellAllJunk as serviceSellAllJunk,
  buybackItem as serviceBuybackItem,
  rerollMysticStock as serviceRerollMysticStock,
  getSellValue
} from './src/services/ShopService.js';
import { ALL_EQUIP_SLOTS, CANONICAL_PAPERDOLL_20_SLOTS } from './src/core/GameConfig.js';

import {
  getCraftLevelReq,
  getRecipeDef,
  getRecipeMaterials,
  calculateMaxCraftableQty,
  canCraft as serviceCanCraft,
  canCraftRecipe as serviceCanCraftRecipe,
  craftItem as serviceCraftItem,
  getMaterialDropSources,
  applySoulCrystal as serviceApplySoulCrystal,
  processSoulDrainOnKill as serviceProcessSoulDrainOnKill,
  unsealItem as serviceUnsealItem,
  polishMasterwork as servicePolishMasterwork,
  swapWeaponSameGrade as serviceSwapWeaponSameGrade,
  applyDyeSymbol as serviceApplyDyeSymbol,
  upgradeDyeSymbol as serviceUpgradeDyeSymbol,
  removeDyeSymbol as serviceRemoveDyeSymbol,
  applyElementalStone as serviceApplyElementalStone,
  compoundBeltsWithDuplicates as serviceCompoundBeltsWithDuplicates,
  applyLifeStone as serviceApplyLifeStone,
  removeAugment as serviceRemoveAugment,
  chargeRandomCraft as serviceChargeRandomCraft,
  chargeRandomCraftWithAdena as serviceChargeRandomCraftWithAdena,
  chargeRandomCraftWithItem as serviceChargeRandomCraftWithItem,
  rollRandomCraftSlots as serviceRollRandomCraftSlots,
  refreshRandomCraftSlots as serviceRefreshRandomCraftSlots,
  spinRandomCraft as serviceSpinRandomCraft,
  claimRandomCraft as serviceClaimRandomCraft
} from './src/services/CraftService.js';
import { rollMagicLampCard } from './src/data/economy/magicLampBalance.js';
import {
  ALCHEMY_RECIPES,
  dissolveItem as serviceDissolveItem,
  dissolveItemsByGrade as serviceDissolveItemsByGrade,
  dissolveAllJunkEquipment as serviceDissolveAllJunkEquipment,
  craftElixir as serviceCraftElixir,
  useChaosBossSummonStone as serviceUseChaosBossSummonStone,
  processChaosBossLoot as serviceProcessChaosBossLoot
} from './src/services/AlchemyService.js';
// ─── Sprint 4: Importa motores de Combate e Habilidades ────────────────────
import {
  startCombat as engineStartCombat,
  stopCombat as engineStopCombat,
  pickRandomMonster as enginePickRandomMonster,
  selectZone as engineSelectZone,
  updateSagaProgress as engineUpdateSagaProgress,
  playerDeath as enginePlayerDeath,
  resurrect as engineResurrect,
  getNearestTown,
  toggleSoulshot as engineToggleSoulshot,
  toggleAutoPotion as engineToggleAutoPotion
} from './src/engine/CombatEngine.js';

import {
  getSkillCost,
  spendSP as engineSpendSP,
  resetSP as engineResetSP,
  getStarterSkillForClass,
  canCastSkillWeapon,
  detectItemWeaponType
} from './src/engine/SkillEngine.js';

import { WeaponResonanceService } from './src/services/WeaponResonanceService.js';
import { StaggerEngine } from './src/engine/StaggerEngine.js';
import {
  COMBAT_CONFIG,
  calculateDefenseMitigation,
  calculatePhysicalDamage,
  calculateMagicDamage,
  calculateHealAmount,
  calculateVampiricHeal,
  canCastSkill,
  consumeSkillMp,
  getSkillMpCost,
  calculateCombatPower,
  getZoneProgression,
  ZONE_CP_REQUIREMENTS
} from './src/data/balance/index.js';
// ─── Sprint 5: Importa serviços de Personagem, Quests, Torre e Raids ────────
import {
  classSatisfies as serviceClassSatisfies,
  getSkillTreeKey as serviceGetSkillTreeKey,
  getClassSkills as serviceGetClassSkills,
  checkClassAdvancement as serviceCheckClassAdvancement,
  promoteClass as servicePromoteClass,
  SHARED_SKILL_IDS,
  isSkillAllowedForClass,
  isMageClass,
  getSharedSkillIdsForClass,
  normalizeAndValidateSkills,
  getCharacterProgressionState,
  isSkillAvailableForCharacter,
  getVisibleSkillsForCharacter,
  SKILL_VISIBILITY_STATES,
  validateAndFixCharacterClass as serviceValidateAndFixCharacterClass
} from './src/services/CharacterService.js';

import { getLoadoutForCombat, getLoadout, autoEquipLoadout, shouldCastSkill } from './src/services/SkillLoadoutService.js';
import { isPurgedSkill } from './src/services/SkillTagService.js';
import { SLOT_PRIORITY_ORDER } from './src/data/balance/SkillUnlockSchedule.js';

import {
  checkQuestResets as serviceCheckQuestResets,
  triggerQuestEvent as serviceTriggerQuestEvent,
  claimQuestReward as serviceClaimQuestReward,
  claimDailyBonusChest as serviceClaimDailyBonusChest,
  unlockPremiumPass as serviceUnlockPremiumPass,
  claimPassReward as serviceClaimPassReward
} from './src/services/QuestService.js';

import {
  getTowerFloorDef,
  getTowerFloorDef as serviceGetTowerFloorDef,
  challengeTowerFloor as serviceChallengeTowerFloor,
  completeTowerFloor as serviceCompleteTowerFloor,
  sweepTowerDaily as serviceSweepTowerDaily
} from './src/services/TowerService.js';

import {
  startRaidBoss as serviceStartRaidBoss,
  getRaidStatus as serviceGetRaidStatus,
  canEnterRaid as serviceCanEnterRaid,
  handleRaidVictory as serviceHandleRaidVictory,
  processRaidBossMechanics as serviceProcessRaidBossMechanics,
  checkAndResetDailyRaidTickets as serviceCheckAndResetDailyRaidTickets
} from './src/services/RaidService.js';
import {
  formatItemDisplayName as uiFormatItemDisplayName,
  showItemTooltip as uiShowItemTooltip,
  hideItemTooltip as uiHideItemTooltip,
  updateInventoryUI as uiUpdateInventoryUI,
  updateWarehouseUI as uiUpdateWarehouseUI,
  updateEquipmentUI as uiUpdateEquipmentUI,
  updateSkillUI as uiUpdateSkillUI,
  updateSkillInfoPanel as uiUpdateSkillInfoPanel,
  renderStageHero as uiRenderStageHero,
  renderStageMonster as uiRenderStageMonster,
  updateZoneUI as uiUpdateZoneUI,
  renderZoneMap as uiRenderZoneMap,
  updateShopUI as uiUpdateShopUI,
  updateCraftUI as uiUpdateCraftUI,
  openCraftModal as uiOpenCraftModal,
  closeCraftModal as uiCloseCraftModal,
  updateCharacterUI as uiUpdateCharacterUI,
  updateImperialEconomyHeader,
  renderAlchemyUI as uiRenderAlchemyUI,
  renderAstralMasteryUI as uiRenderAstralMasteryUI,
  renderExpeditionsUI as uiRenderExpeditionsUI,
  renderRaidsTab as uiRenderRaidsTab,
  renderOlympiadTab as uiRenderOlympiadTab,
  renderClanTab as uiRenderClanTab,
  renderSevenSignsTab as uiRenderSevenSignsTab,
  renderFortressTab as uiRenderFortressTab,
  renderColosseumTab as uiRenderColosseumTab,
  renderCosmeticsTab as uiRenderCosmeticsTab,
  renderRankingTab as uiRenderRankingTab,
  setActiveRankingTab as uiSetActiveRankingTab,
  renderMarketTab as uiRenderMarketTab,
  setActiveMarketTab as uiSetActiveMarketTab,
  openSkillEnchantModal,
  openAugmentModal,
  initTooltipEvents as uiInitTooltipEvents,
  openAutoRecycleModal,
  closeAutoRecycleModal,
  renderAutoRecycleModal,
  openCompoundModal,
  closeCompoundModal,
  renderCompoundModal,
  openCashShopModal,
  closeCashShopModal,
  renderCashShopModal,
  showDropLocatorModal,
  uiOpenPixCheckoutModal,
  uiOpenReferralModal,
  closeContactsModal,
  openAutoEquipPreviewModal,
  openBatchSellModal,
  openBatchSalvageModal,
  openBatchCrystallizeModal,
  closeInventoryPreviewModal,
  renderItemDetailAndComparison
} from './src/ui/GameUI.js';
import { CashShopService } from './src/services/CashShopService.js';
import { NoblesseService } from './src/services/NoblesseService.js';
import { OlympiadService } from './src/services/OlympiadService.js';
import { ClanService } from './src/services/ClanService.js';
import { SkillEnchantService } from './src/services/SkillEnchantService.js';
import { AugmentationService } from './src/services/AugmentationService.js';
import { SevenSignsService } from './src/services/SevenSignsService.js';
import { SEAL_STONES, NECROPOLIS_ZONES } from './src/data/seven_signs.js';
import { FortressService } from './src/services/FortressService.js';
import { ColosseumService } from './src/services/ColosseumService.js';
import { CombatPowerService } from './src/services/CombatPowerService.js';
import { RankingService } from './src/services/RankingService.js';
import { MarketService } from './src/services/MarketService.js';
import { CosmeticService } from './src/services/CosmeticService.js';
import { AchievementService } from './src/services/AchievementService.js';
import { WorldBossService } from './src/services/WorldBossService.js';
import { SynthesisService } from './src/services/SynthesisService.js';
import { ElementalService } from './src/services/ElementalService.js';
import { StarterJourneyService } from './src/services/StarterJourneyService.js';
import { LiveOpsService } from './src/services/LiveOpsService.js';
import { SubclassCertificationService, EMERGENT_ABILITIES, MASTER_ABILITIES_BY_ARCHETYPE, DIVINE_TRANSFORMATIONS } from './src/services/SubclassCertificationService.js';
import { CommunityCapService } from './src/services/CommunityCapService.js';
import { ensureAppLayout, showMenuPanel, updateTabVisibilityByLevel, TAB_UNLOCK_LEVELS } from './src/ui/AppLayout.js';
import { checkTabGuide, closeTabGuideModal, openTabGuideModal } from './src/ui/TutorialGuide.js';
import { isFeatureUnlocked, getCurrentSeason, getSeasonForFeature } from './src/core/SeasonConfig.js';
import { renderSeasonLockedPanel, updateSeasonTabBadges } from './src/ui/SeasonUI.js';
import { VFX, initializeVFX } from './vfx.js';
import { globalVFXOrchestrator } from './src/vfx/VFXOrchestrator.js';
import { combatEvents, CombatEventType } from './src/vfx/CombatEvent.js';
// ─── Sprint 7: Importa EventBus e StateManager (Wiring & State) ───────────
import EventBus from './src/core/EventBus.js';
import {
  getState,
  setState,
  setState as managerSetState,
  saveState as managerSaveState,
  loadState as managerLoadState,
  resetState as managerResetState,
  DEFAULT_STATE,
  applyStarterKit
} from './src/core/StateManager.js';
// ────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

// ── Tutorial Guide: expõe funções do modal ao escopo global (onclick inline) ──
window.closeTabGuideModal = closeTabGuideModal;
window.openTabGuideModal = openTabGuideModal;
// ─────────────────────────────────────────────────────────────────────────────

// Carregamento síncrono de icon_index.json antes de qualquer renderização de itens
try {
  const _res = await fetch("./img/icons/icon_index.json", { cache: "no-cache" });
  if (_res.ok) {
    window.IconIndex = await _res.json();
  }
} catch (e) {
  console.warn("[main] 無法載入 icon_index.json，改用備用 ICON_MAP：", e?.message || e);
}
// ========================================
// Lineage Idle - Main Game Logic
// ========================================

const D = () => {
  const gd = (typeof window !== 'undefined') ? window.GameData : null;
  if (gd && gd.RARITY && gd.ALL_ITEMS && typeof gd.rollDrop === 'function') {
    return gd;
  }
  return {
    ...(gd || {}),
    RARITY: (gd && gd.RARITY) || RARITY,
    ALL_ITEMS: (gd && gd.ALL_ITEMS) || ALL_ITEMS,
    rollDrop: (gd && typeof gd.rollDrop === 'function') ? gd.rollDrop : rollDrop,
    rollRarity: (gd && typeof gd.rollRarity === 'function') ? gd.rollRarity : rollRarity
  };
};

// ========== ECHO OF ELEMENTS — Skill bridges ==========
const SKILL_DEFS = new Proxy({}, {
  get: (_, prop) => (window.EchoData?.SKILL_DEFS_ECHO || {})[prop],
  has: (_, prop) => prop in (window.EchoData?.SKILL_DEFS_ECHO || {}),
  ownKeys: () => Reflect.ownKeys(window.EchoData?.SKILL_DEFS_ECHO || {}),
  getOwnPropertyDescriptor: (_, prop) => Reflect.getOwnPropertyDescriptor(window.EchoData?.SKILL_DEFS_ECHO || {}, prop)
});

const SKILL_REQS = new Proxy({}, {
  get: (_, prop) => (window.EchoData?.SKILL_REQS_ECHO || {})[prop],
  has: (_, prop) => prop in (window.EchoData?.SKILL_REQS_ECHO || {}),
  ownKeys: () => Reflect.ownKeys(window.EchoData?.SKILL_REQS_ECHO || {}),
  getOwnPropertyDescriptor: (_, prop) => Reflect.getOwnPropertyDescriptor(window.EchoData?.SKILL_REQS_ECHO || {}, prop)
});

const SKILL_TREE_LAYOUT = new Proxy({}, {
  get: (_, prop) => (window.EchoData?.SKILL_TREE_LAYOUT_ECHO || {})[prop],
  has: (_, prop) => prop in (window.EchoData?.SKILL_TREE_LAYOUT_ECHO || {}),
  ownKeys: () => Reflect.ownKeys(window.EchoData?.SKILL_TREE_LAYOUT_ECHO || {}),
  getOwnPropertyDescriptor: (_, prop) => Reflect.getOwnPropertyDescriptor(window.EchoData?.SKILL_TREE_LAYOUT_ECHO || {}, prop)
});

const TIER_NAMES = ['基礎', '修練', '精通', '昇華', '傳奇'];
// ======================================================

// --------------------------- STATE ---------------------------
let state = getState();
// Whitelist canônica de administradores autorizados para testes e operações GM
const AUTHORIZED_ADMIN_EMAILS = ['duuh.alaminos@gmail.com', 'eduardol.alaminos@gmail.com'];

function isAuthorizedAdmin() {
  if (typeof window === 'undefined') return false;

  // 1. Verificação direta do status autenticado pelo Firebase Auth no shell React
  if (window.currentUserIsAdmin === true) return true;

  // 2. Verificação de e-mail na whitelist autorizada
  const email = (
    window.currentUserEmail ||
    window.FirebaseBridge?.getCurrentUserEmail?.() ||
    window.lineageIdleCloud?.getCurrentUserEmail?.() ||
    ''
  ).toLowerCase().trim();

  if (email && AUTHORIZED_ADMIN_EMAILS.includes(email)) {
    window.currentUserIsAdmin = true;
    return true;
  }

  // 3. Opt-in de desenvolvimento local (se configurado explicitamente)
  if (typeof import.meta !== 'undefined' && import.meta.env?.DEV && import.meta.env?.VITE_ENABLE_DEV_ADMIN === 'true') {
    return true;
  }

  return false;
}

const ADMIN_CONSOLE_ENABLED = import.meta.env.DEV && import.meta.env.VITE_ENABLE_DEV_ADMIN === 'true';

let _saveTimeout = null;
function save(immediate = false, forceCloud = false) {
  if (immediate) {
    if (_saveTimeout) { clearTimeout(_saveTimeout); _saveTimeout = null; }
    managerSaveState(true, forceCloud);
    try { RankingService.syncToCloud(state, true); } catch (e) {}
    if (typeof window !== 'undefined' && typeof window.saveCloudNow === 'function') {
      try { window.saveCloudNow(state, true); } catch (e) {}
    }
    return;
  }
  if (_saveTimeout) return;
  _saveTimeout = setTimeout(() => {
    _saveTimeout = null;
    managerSaveState(false, forceCloud);
    try { RankingService.syncToCloud(state, false); } catch (e) {}
    if (typeof window !== 'undefined' && typeof window.saveCloudNow === 'function') {
      try { window.saveCloudNow(state, false); } catch (e) {}
    }
  }, 1000);
}

function load() {
  const loaded = managerLoadState();
  if (loaded) {
    state = getState();
    if (state.level && state.level > 1) {
      const minXp = getTotalXP(state.level - 1);
      if (state.xp == null || state.xp < minXp) {
        state.xp = minXp;
      }
    }
    consolidateInventoryStacks(state);
    checkQuestResets();
    updateSagaProgress(true);
    // Restaura o stage da temporada e caps salvos com autoridade absoluta
    const savedSeason = (typeof localStorage !== 'undefined' && Number(localStorage.getItem('aden_server_season'))) || Number(state.serverSeason) || 1;
    state.serverSeason = savedSeason;
    window.__serverSeason = savedSeason;

    const savedCap = (typeof localStorage !== 'undefined' && Number(localStorage.getItem('aden_server_cap'))) || Number(state.serverMaxLevel) || Number(state.levelCap) || 60;
    state.serverMaxLevel = savedCap;
    state.levelCap = savedCap;
    state.serverCap = savedCap;
    window.globalServerCap = savedCap;

    if ((typeof localStorage !== 'undefined' && localStorage.getItem('aden_admin_unlock_all') === 'true') || state.adminUnlockedAll) {
      state.adminUnlockedAll = true;
      window.__adminUnlockedAll = true;
    }

    try {
      updateSeasonTabBadges(ROOT);
      updateTabVisibilityByLevel(state);
    } catch (_) {}
    log('✨ 版本更新載入成功！你的進度與物品已完整保留。', 'rarity-legendary');
    if (state.godMode) {
      log('🛡️ [管理員提醒] 此存檔已啟用無敵模式！在聊天輸入 //god 可關閉。', 'warning');
    }
    if (state.lastSaveTime) {
      setTimeout(() => checkOfflineProgress(state.lastSaveTime), 600);
    }
  }
  return loaded;
}


function resetSave() {
  if (confirm('確定要完整重置角色嗎？所有進度都會歸零，之後可以重新選擇種族與職業。')) {
    managerResetState();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('aden_pending_char_creation', '1');
    }
    if (typeof window !== 'undefined' && typeof window.resetCloudSave === 'function') {
      window.resetCloudSave();
    }
    location.reload();
  }
}


// --------------------------- STATS CALC (Sprint 2: Delegado para StatsEngine.js) ---------------------------
function getEquipBonus(slot) { return engineGetEquipBonus(state, slot); }
function getTotalEquipBonuses() { return engineGetTotalEquipBonuses(state); }
function getCertificationsBonuses() { return engineGetCertificationsBonuses(state); }
function getActiveSetBonuses() { return engineGetActiveSetBonuses(state); }
function getStats() { return engineGetStats(state); }


// Delegados para StatsEngine.js (Sprint 2)
// (getBaseAttributes, getZoneDropTier, getClass estão importados no topo)


function classSatisfies(playerClass, reqClass) { return serviceClassSatisfies(playerClass, reqClass); }
function getSkillTreeKey(classId) { return serviceGetSkillTreeKey(classId); }
function getClassSkills(classId) { return serviceGetClassSkills(classId); }
function validateAndFixCharacterClass(targetState = null) {
  return serviceValidateAndFixCharacterClass(targetState || state);
}
if (typeof window !== 'undefined') {
  window.validateAndFixCharacterClass = validateAndFixCharacterClass;
}

// Opens the Class Transfer modal — declared before checkClassAdvancement uses it
function openClassTransferModal(classInfo) {
  validateAndFixCharacterClass();
  const modal = el('class-transfer-modal');
  if (!modal) return;

  const closeBtn = el('close-class-modal-btn');
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.remove('active');
    };
  }
  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove('active');
  };

  const currentClassDef = getClass(state.class);
  const currentStage = currentClassDef?.stage || 0;
  const targetStage = currentStage + 1;

  const titleEl = el('class-modal-heading');
  if (titleEl) {
    const stageNames = ['第一次轉職', '第二次轉職', '第三次轉職'];
    titleEl.textContent = `📜 ${stageNames[currentStage] || '轉職儀式'}`;
  }

  const echoClasses = (typeof window !== 'undefined' && window.EchoData)
    ? window.EchoData.CLASSES_ECHO
    : {};
  const allClasses = Object.keys(echoClasses).length ? echoClasses : (D()?.CLASSES || {});
  const canonStateClass = resolveCanonicalClassId(state.class);
  const seenClassIds = new Set();

  const progState = getCharacterProgressionState(state);
  const eligibleAdvancements = progState.availableAdvancements || [];

  const candidates = [];

  // 1. Prioridade Canônica: Avalia pelo Grafo Oficial e Motor de Progressão
  const canonicalPromotions = ClassProgressionEngine.getPromotionOptions(state.class, state.level, state.race);
  if (canonicalPromotions && canonicalPromotions.length > 0) {
    for (const opt of canonicalPromotions) {
      const target = opt.targetClass;
      if (!seenClassIds.has(target.id)) {
        seenClassIds.add(target.id);
        candidates.push({
          id: target.id,
          def: target,
          isEligible: opt.isEligible,
          isSeasonGated: opt.isSeasonGated,
          reasons: opt.reasons
        });
      }
    }
  }

  // 2. Fallback Secundário: Histórico de Progressão legado se candidatos vazios
  if (candidates.length === 0) {
    for (const succ of eligibleAdvancements) {
      const succId = succ.id || succ.sourceClassId;
      const succDef = getClass(succId) || getClass(succ.sourceClassId) || succ;
      const canonId = resolveCanonicalClassId(succId) || succId;
      if (!seenClassIds.has(canonId)) {
        seenClassIds.add(canonId);
        candidates.push({ id: succId, def: succDef });
      }
    }
  }

  // Fallback para classes ainda não mapeadas no DAG histórico
  if (candidates.length === 0) {
    for (const [clsId, clsDef] of Object.entries(allClasses)) {
      if (!clsDef || clsDef.stage !== targetStage) continue;
      if (clsDef.race && clsDef.race !== state.race) continue;
      const parentCanon = resolveCanonicalClassId(clsDef.parent);
      const clsCanon = resolveCanonicalClassId(clsId);
      const matchesParent = (clsDef.parent === state.class)
        || (clsDef.parent === canonStateClass)
        || (parentCanon === canonStateClass)
        || (parentCanon === state.class);
      if (matchesParent && !seenClassIds.has(clsCanon)) {
        seenClassIds.add(clsCanon);
        candidates.push({ id: clsCanon, def: clsDef });
      }
    }
  }

  const container = el('class-options-container');
  if (container) {
    renderClassStep1();
  }

  function renderClassStep1() {
    container.innerHTML = '';
    const closeBtn = el('close-class-modal-btn');
    if (closeBtn) closeBtn.style.display = '';
    const titleEl = el('class-modal-heading');
    if (titleEl) {
      const stageNames = ['第一次轉職', '第二次轉職', '第三次轉職'];
      titleEl.textContent = `📜 ${stageNames[currentStage] || '轉職儀式'}`;
    }

    if (!candidates.length) {
      container.innerHTML = `
        <div style="padding:24px; text-align:center; color:var(--text-muted); font-size:13px; background:rgba(0,0,0,0.4); border:1px solid rgba(212,175,55,0.2); border-radius:8px;">
          ⚠️ <strong>${currentClassDef?.name || '未知職業'}</strong> 在階段 ${targetStage} 沒有可用的進階選項。
        </div>
      `;
      return;
    }

    for (const { id: clsId, def: clsDef } of candidates) {
      const card = mkEl('div');
      card.className = 'class-option-card';
      card.style.cssText = `
        background: linear-gradient(180deg, rgba(24, 18, 12, 0.98), rgba(12, 9, 5, 0.99));
        border: 1px solid var(--border-gilt);
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 12px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.6);
        display: flex;
        flex-direction: column;
        gap: 8px;
      `;

      const statsStr = Object.entries(clsDef.base || {})
        .filter(([, v]) => v > 0)
        .map(([k, v]) => `+${v} ${({ str: '力量', dex: '敏捷', con: '體質', int: '智力', wit: '智慧', men: '精神', atk: '物理攻擊', patk: '物理攻擊', def: '物理防禦', pdef: '物理防禦', matk: '魔法攻擊', mdef: '魔法防禦', hp: '生命值', maxHp: '最大生命值', mp: '魔力', maxMp: '最大魔力', eva: '迴避', crit: '暴擊', speed: '速度', spd: '速度', accuracy: '命中', hit: '命中', critDmg: '暴擊傷害', hpRegen: '生命恢復', mpRegen: '魔力恢復' })[k] || '其他屬性'}`)
        .join(' · ');

      const archetypeIcons = {
        fighter: '⚔️ 戰士',
        tank: '🛡️ 守護坦克',
        mage: '🔮 元素法師',
        healer: '✨ 牧師／治療',
        bard: '🎵 舞者／吟遊詩人',
        assassin: '🗡️ 致命刺客',
        archer: '🏹 射手',
        artisan: '⚒️ 工匠大師',
        soulbreaker: '⚡ 靈魂破壞者'
      };
      const archLabel = archetypeIcons[clsDef.archetype] || clsDef.archetype || '專家';

      const avatarHtml = (ART && typeof ART.heroSVG === 'function')
        ? ART.heroSVG({
            race: clsDef.race || state.race || 'human',
            class: clsId,
            gender: state.gender || state.charGender || 'M',
            mode: 'bust'
          })
        : '';

      card.innerHTML = `
        <div style="display:flex; gap:14px; align-items:center;">
          <div style="width:72px; height:72px; min-width:72px; min-height:72px; border-radius:50%; border:2px solid var(--border-gilt); overflow:hidden; background:radial-gradient(circle, #2a1f14 0%, #0d0a06 100%); box-shadow:0 4px 12px rgba(0,0,0,0.8); position:relative; flex-shrink:0;">
            ${avatarHtml}
          </div>
          <div style="flex:1; min-width:0;">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px;">
              <h3 style="margin:0; font-family:'Cinzel',serif; color:var(--gilt-bright); font-size:17px; display:flex; align-items:center; gap:8px;">
                ${clsDef.name}
              </h3>
              <span style="padding:3px 10px; background:rgba(212,167,68,0.15); border:1px solid var(--border-gilt); border-radius:4px; font-size:11px; color:var(--gilt-bright); font-weight:bold;">
                ${archLabel}
              </span>
            </div>
            <p style="margin:4px 0; font-size:12px; color:var(--text-muted); line-height:1.4;">${clsDef.desc || '高階職業晉升。'}</p>
            ${statsStr ? `<div style="font-size:11px; color:#6ee7b7; font-weight:bold; background:rgba(110,231,183,0.1); padding:4px 8px; border-radius:4px; border:1px solid rgba(110,231,183,0.2); margin-top:4px;">✨ 屬性加成： ${statsStr}</div>` : ''}
          </div>
        </div>
        <button class="action-btn action-btn--primary promote-btn" data-class-id="${clsId}" style="margin-top:8px; padding:10px; width:100%; font-weight:bold; font-family:'Cinzel',serif; font-size:13px; cursor:pointer;">
          ⚔️ 選擇並晉升為 ${clsDef.name}
        </button>
      `;

      const btn = card.querySelector('.promote-btn');
      if (btn) {
        btn.onclick = () => onSelectClassOption(clsId, clsDef);
      }

      container.appendChild(card);
    }
  }

  function onSelectClassOption(clsId, clsDef) {
    const echoDefs = (typeof window !== 'undefined' && window.EchoData) ? window.EchoData.SKILL_DEFS_ECHO : {};
    const skillDefs = echoDefs || D()?.SKILL_DEFS || {};
    
    // Lista de habilidades aprendidas na classe anterior
    const learnedSkills = Object.entries(state.skills || {})
      .filter(([, lvl]) => lvl > 0)
      .map(([sId, lvl]) => ({ id: sId, lvl, def: skillDefs[sId] || { name: sId } }));

    if (learnedSkills.length === 0) {
      // Se não aprendeu nenhuma habilidade, avança diretamente
      promoteClass(clsId, []);
      return;
    }

    renderLegacySelectionStep(clsId, clsDef, learnedSkills);
  }

  function renderLegacySelectionStep(clsId, clsDef, learnedSkills) {
    const titleEl = el('class-modal-heading');
    if (titleEl) {
      titleEl.textContent = `🧬 血統傳承： ${clsDef.name}`;
    }

    // Oculta o botão '關閉' genérico do rodapé para não duplicar ações com Voltar/Consagrar
    const closeBtn = el('close-class-modal-btn');
    if (closeBtn) closeBtn.style.display = 'none';

    const avatarHtml = (ART && typeof ART.heroSVG === 'function')
      ? ART.heroSVG({
          race: clsDef.race || state.race || 'human',
          class: clsId,
          gender: state.gender || state.charGender || 'M',
          mode: 'bust'
        })
      : '';

    container.innerHTML = `
      <div style="display:flex; align-items:center; gap:14px; background:linear-gradient(135deg, rgba(32,24,18,0.95), rgba(15,12,8,0.98)); border:1px solid var(--border-gilt); border-radius:10px; padding:12px 16px; margin-bottom:12px; box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);">
        <div style="width:58px; height:58px; min-width:58px; min-height:58px; border-radius:50%; border:2px solid var(--border-gilt); overflow:hidden; background:radial-gradient(circle, #2a1f14 0%, #0d0a06 100%); flex-shrink:0; box-shadow:0 4px 10px rgba(0,0,0,0.6);">
          ${avatarHtml}
        </div>
        <div style="flex:1; min-width:0;">
          <h3 style="margin:0; font-family:'Cinzel',serif; color:var(--gilt-bright); font-size:17px; letter-spacing:0.04em;">${clsDef.name}</h3>
          <p style="margin:3px 0 0 0; font-size:11px; color:#cbd5e1; line-height:1.4;">${clsDef.desc || '新的亞丁高階職業。'}</p>
        </div>
      </div>
      <div style="background:rgba(212,167,68,0.08); border:1px solid rgba(212,167,68,0.25); border-radius:8px; padding:10px 14px; margin-bottom:14px; font-size:12px; color:#e2e8f0; line-height:1.45;">
        <div style="font-weight:bold; color:#fde047; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
          <span>✨</span> <span>最多選擇 2 個技能作為永久血統被動技能（效果 20%）。</span>
        </div>
        <div style="font-size:11px; color:#94a3b8;">🔄 前一職業的主動技能會被清除，已投入的技能點將 100% 返還。</div>
      </div>
      <div id="legacy-skills-grid" style="display:flex; flex-direction:column; gap:10px; margin-bottom:14px; min-height:140px; max-height:360px; overflow-y:auto; padding-right:4px;"></div>
      <div style="font-size:11px; color:#a1a1aa; text-align:center; margin-bottom:12px; line-height:1.4;">
        📖 <em>提醒：第二職業（等級 40+）技能需要技能書（1★–4★）與技能點才能解鎖。</em>
      </div>
      <div style="display:flex; gap:12px; justify-content:space-between; margin-top:6px;">
        <button id="legacy-back-btn" class="action-btn" style="flex:1; padding:10px; font-weight:bold;">⬅️ 返回</button>
        <button id="legacy-confirm-btn" class="action-btn action-btn--primary" style="flex:2; padding:10px; font-weight:bold; font-family:'Cinzel',serif; font-size:14px;">✨ 昇華血統並進化</button>
      </div>
    `;

    const grid = el('legacy-skills-grid');
    const selected = new Set();

    // Auto-seleciona até 2 se forem buffs
    learnedSkills.forEach(s => {
      const def = s.def;
      const isBuff = def.type === 'buff' || def.type === 'toggle' || def.effect === 'warcry' || (def.name || '').includes('Harmony') || (def.name || '').includes('Will') || (def.name || '').includes('Roar') || (def.name || '').includes('Aura');
      if (isBuff && selected.size < 2) selected.add(s.id);
    });
    if (selected.size === 0 && learnedSkills.length > 0) {
      selected.add(learnedSkills[0].id);
      if (learnedSkills.length > 1) selected.add(learnedSkills[1].id);
    }

    learnedSkills.forEach(s => {
      const def = s.def;
      const lvl = s.lvl;
      const baseEffectVal = 0.15 + (lvl * 0.03);
      const passiveVal = +(baseEffectVal * 0.20).toFixed(4);

      let statKey = '物理攻擊';
      const sName = (def.name || '').toLowerCase();
      if (sName.includes('def') || sName.includes('shield') || sName.includes('aegis') || sName.includes('iron') || sName.includes('will') || sName.includes('armor')) statKey = '物理防禦';
      else if (sName.includes('magic') || sName.includes('mage') || sName.includes('mystic') || sName.includes('elem') || sName.includes('fire') || sName.includes('water') || sName.includes('wind') || sName.includes('mana')) statKey = '魔法攻擊';
      else if (sName.includes('crit') || sName.includes('fury') || sName.includes('stance') || sName.includes('focus')) statKey = '暴擊';
      else if (sName.includes('speed') || sName.includes('wind') || sName.includes('dash') || sName.includes('step') || sName.includes('haste') || sName.includes('agility')) statKey = '速度';

      const row = mkEl('div');
      row.className = 'legacy-skill-select-row';
      row.dataset.skillId = s.id;
      row.style.cssText = `
        background: ${selected.has(s.id) ? 'linear-gradient(90deg, rgba(212,167,68,0.22), rgba(28,20,14,0.92))' : 'rgba(16,20,28,0.85)'};
        border: 1px solid ${selected.has(s.id) ? '#d4a744' : 'rgba(255,255,255,0.12)'};
        border-radius: 8px;
        padding: 10px 14px;
        min-height: 52px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: ${selected.has(s.id) ? '0 0 10px rgba(212,167,68,0.2)' : 'none'};
      `;

      row.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
          <input type="checkbox" ${selected.has(s.id) ? 'checked' : ''} style="cursor:pointer; width:18px; height:18px; accent-color:#f5df93;" />
          <div>
            <div style="font-weight:bold; color:#ffd877; font-size:13px; font-family:'Cinzel',serif;">${def.name || '未知技能'} <span style="font-size:11px; color:#94a3b8; font-family:sans-serif; font-weight:normal;">（等級 ${lvl}）</span></div>
            <div style="font-size:12px; color:#86efac; font-weight:600; margin-top:2px;">🧬 血統被動：+${(passiveVal * 100).toFixed(1)}% ${statKey}</div>
          </div>
        </div>
        <span style="font-size:11px; font-weight:bold; color:${selected.has(s.id) ? '#fde047' : '#64748b'};">${selected.has(s.id) ? '✅ 已選擇' : '點擊選擇'}</span>
      `;

      row.onclick = (e) => {
        if (e.target.tagName !== 'INPUT') {
          const chk = row.querySelector('input');
          chk.checked = !chk.checked;
        }
        const isChecked = row.querySelector('input').checked;
        if (isChecked) {
          if (selected.size >= 2) {
            row.querySelector('input').checked = false;
            if (typeof log === 'function') log('最多只能選擇 2 個血統被動技能！', 'warning');
            return;
          }
          selected.add(s.id);
        } else {
          selected.delete(s.id);
        }
        updateGridSelection();
      };

      grid.appendChild(row);
    });

    function updateGridSelection() {
      const rows = grid.querySelectorAll('.legacy-skill-select-row');
      rows.forEach(r => {
        const sid = r.dataset.skillId;
        const isSel = selected.has(sid);
        r.style.background = isSel ? 'linear-gradient(90deg, rgba(212,167,68,0.22), rgba(28,20,14,0.92))' : 'rgba(16,20,28,0.85)';
        r.style.borderColor = isSel ? '#d4a744' : 'rgba(255,255,255,0.12)';
        r.style.boxShadow = isSel ? '0 0 10px rgba(212,167,68,0.2)' : 'none';
        const chk = r.querySelector('input');
        if (chk) chk.checked = isSel;
        const statusSpan = r.querySelector('span:last-child');
        if (statusSpan) {
          statusSpan.textContent = isSel ? '✅ 已選擇' : '點擊選擇';
          statusSpan.style.color = isSel ? '#fde047' : '#64748b';
        }
      });
    }

    const backBtn = el('legacy-back-btn');
    if (backBtn) backBtn.onclick = () => {
      renderClassStep1();
      const cb = el('close-class-modal-btn');
      if (cb) cb.style.display = '';
    };

    const confirmBtn = el('legacy-confirm-btn');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        promoteClass(clsId, Array.from(selected));
      };
    }
  }

  modal.classList.add('active');
}

function checkClassAdvancement() { return serviceCheckClassAdvancement(state, { el, openClassTransferModal }); }
export function promoteClass(newClassId, selectedIds = null) { return servicePromoteClass(state, newClassId, selectedIds, { log, floatText, el, updateAllUI, save }); }
if (typeof window !== 'undefined') {
  window.openClassTransferModal = openClassTransferModal;
  window.promoteClass = promoteClass;
}


// --------------------------- INVENTORY / SALVAGE (Sprint 3: Delegados) ---------------------------
function getInventoryCount(itemId) { return serviceGetInventoryCount(state, itemId); }
function addToInventory(itemId, amount = 1, rarity = null, foundation = false) {
  return serviceAddToInventory(state, itemId, amount, rarity, foundation, { log });
}
function removeFromInventory(uid, amount = 1) { return serviceRemoveFromInventory(state, uid, amount); }


function getWarehouseCount(itemId) {
  if (!state.warehouse || !Array.isArray(state.warehouse)) return 0;
  return state.warehouse
    .filter(i => (i.itemId === itemId || getItemDef(i.itemId)?.id === itemId))
    .reduce((acc, i) => acc + (i.count || 1), 0);
}

function depositToWarehouse(uid, amount = 1) {
  const invIdx = state.inventory.findIndex(i => i.uid === uid);
  if (invIdx < 0) return false;
  const item = state.inventory[invIdx];
  if (item.equipped) {
    log('請先卸下裝備，再放入倉庫。', 'system');
    return false;
  }

  const def = getItemDef(item.itemId);
  if (!def) return false;

  state.warehouse = state.warehouse || [];
  const maxSlots = getMaxWarehouseSlots();

  const isStackable = def.stack || ['consumable','material','scroll','powerup'].includes(def.slot);
  if (isStackable) {
    let remaining = Math.min(amount, item.count || 1);
    const maxStack = def.stack || 9999;
    while (remaining > 0) {
      const existing = state.warehouse.find(i => i.itemId === item.itemId && (i.count || 1) < maxStack);
      if (existing) {
        const space = maxStack - (existing.count || 1);
        const add = Math.min(space, remaining);
        existing.count = (existing.count || 1) + add;
        remaining -= add;
      } else {
        if (state.warehouse.length >= maxSlots) {
          log('倉庫已滿！', 'system');
          return false;
        }
        const add = Math.min(maxStack, remaining);
        state.warehouse.push({ ...item, uid: Date.now() + '_' + Math.random().toString(36).slice(2, 8), count: add, equipped: false });
        remaining -= add;
      }
    }
    if ((item.count || 1) > amount) {
      item.count -= amount;
    } else {
      state.inventory.splice(invIdx, 1);
    }
  } else {
    if (state.warehouse.length >= maxSlots) {
      log('倉庫已滿！', 'system');
      return false;
    }
    state.inventory.splice(invIdx, 1);
    state.warehouse.push({ ...item, equipped: false });
  }

  const formattedName = uiFormatItemDisplayName(item, def);
  log(`📦 已將 ${formattedName} 放入倉庫。`, 'loot');
  hideItemTooltip();
  updateInventoryUI();
  updateWarehouseUI();
  updateAllUI(); save();
  return true;
}

function withdrawFromWarehouse(uid, amount = 1) {
  state.warehouse = state.warehouse || [];
  const whIdx = state.warehouse.findIndex(i => i.uid === uid);
  if (whIdx < 0) return false;
  const item = state.warehouse[whIdx];

  const def = getItemDef(item.itemId);
  if (!def) return false;

  const maxInvSlots = getMaxInventorySlots();

  const isStackable = def.stack || ['consumable','material','scroll','powerup'].includes(def.slot);
  if (isStackable) {
    let remaining = Math.min(amount, item.count || 1);
    const maxStack = def.stack || 9999;
    while (remaining > 0) {
      const existing = state.inventory.find(i => i.itemId === item.itemId && (i.count || 1) < maxStack);
      if (existing) {
        const space = maxStack - (existing.count || 1);
        const add = Math.min(space, remaining);
        existing.count = (existing.count || 1) + add;
        remaining -= add;
      } else {
        if (state.inventory.length >= maxInvSlots) {
          log('背包已滿！', 'system');
          return false;
        }
        const add = Math.min(maxStack, remaining);
        state.inventory.push({ ...item, uid: Date.now() + '_' + Math.random().toString(36).slice(2, 8), count: add, equipped: false });
        remaining -= add;
      }
    }
    if ((item.count || 1) > amount) {
      item.count -= amount;
    } else {
      state.warehouse.splice(whIdx, 1);
    }
  } else {
    if (state.inventory.length >= maxInvSlots) {
      log('背包已滿！', 'system');
      return false;
    }
    state.warehouse.splice(whIdx, 1);
    state.inventory.push({ ...item, equipped: false });
  }

  const formattedName = uiFormatItemDisplayName(item, def);
  log(`🎒 已從倉庫取出 ${formattedName}。`, 'loot');
  hideItemTooltip();
  updateInventoryUI();
  updateWarehouseUI();
  updateAllUI(); save();
  return true;
}

function resolveEquipSlot(slot) { return serviceResolveEquipSlot(slot, state.equipment); }
export function equipItem(a, b, c = null, silent = false) {
  if (typeof hideItemTooltip === 'function') hideItemTooltip();
  const uid = (typeof a === 'string' && a) ? a : (typeof b === 'string' ? b : null);
  const targetSlot = (typeof b === 'string' && (b === 'weapon' || b === 'weapon2' || ALL_EQUIP_SLOTS.includes(b))) ? b : (typeof c === 'string' ? c : null);
  if (!uid) return;
  const callbacks = silent
    ? { log, classSatisfies, getClass }
    : { log, updateAllUI, save, classSatisfies, getClass };
  const res = serviceEquipItem(state, uid, targetSlot, callbacks);
  if (res && !silent) {
    // 5.4 VFX de Equipar — Pulsação instantânea do slot e brilho áureo
    try {
      const equipSlot = targetSlot || (state.inventory?.find(i => i.uid === uid)?.slot);
      const slotEl = equipSlot ? (document.querySelector(`.equip-slot[data-slot="${equipSlot}"]`) || document.querySelector(`#slot-${equipSlot}`)) : null;
      if (slotEl) {
        slotEl.classList.remove('slot-equip-pulse');
        void slotEl.offsetWidth;
        slotEl.classList.add('slot-equip-pulse');
      }
      playCombatVFX('buff_aura', { color: '#ffd700', duration: 550 });
    } catch (_) {}
  }
  return res;
}
function unequipItem(a, b, silent = false) {
  if (typeof hideItemTooltip === 'function') hideItemTooltip();
  const slotOrUid = (typeof a === 'string' && a) ? a : ((typeof b === 'string' && b) ? b : (a?.uid || null));
  if (!slotOrUid) return;
  const callbacks = silent
    ? { log }
    : { log, updateAllUI, save };
  return serviceUnequipItem(state, slotOrUid, callbacks);
}


// isHighValueItem e getItemGrade importados do InventoryService.js (Sprint 3)


function salvageItem(uid) {
  const idx = state.inventory.findIndex(i => String(i.uid) === String(uid));
  if (idx < 0) return;
  const item = state.inventory[idx];
  if (item.equipped) { log('請先卸下物品再進行拆解！', 'system'); return; }
  const def = D().ALL_ITEMS[item.itemId];
  if (!def) return;
  const targetSlot = resolveEquipSlot(def.slot);
  const isEquip = (def.slot && def.slot !== 'consumable' && def.slot !== 'material' && def.slot !== 'scroll' && def.slot !== 'powerup') || ALL_EQUIP_SLOTS.includes(targetSlot);
  if (!isEquip) {
    log('只有裝備可以拆解。', 'system');
    return;
  }

  if (isHighValueItem(item)) {
    const rarityName = D().RARITY?.[item.rarity]?.name || ({ common: '一般', uncommon: '非凡', rare: '稀有', epic: '史詩', legendary: '傳說', mythic: '神話', primordial: '太古', sovereign: '君王' })[String(item.rarity || 'common').toLowerCase()] || '一般';
    if (!confirm(`⚠️ 確定要拆解珍貴物品「${def.name}」[${rarityName}] 嗎？`)) {
      return;
    }
  }

  const reqLvl = def.req ? def.req.level : 1;
  const grade = getItemGrade(reqLvl);
  const rarityMult = item.rarity ? (D().RARITY?.[item.rarity]?.mult || 1) : 1;

  let matId = 'iron_ore';
  if (grade === 'S 級' || def.tier === 6) matId = 'crystal_s';
  else if (grade === 'A 級') matId = 'crystal_a';
  else if (grade === 'B 級') matId = 'crystal_b';
  else if (grade === 'C 級') matId = 'crystal_c';
  else if (grade === 'D 級') matId = 'crystal_d';
  else matId = (def.slot === 'weapon') ? 'iron_ore' : 'cloth';

  const amount = Math.max(1, Math.floor((reqLvl / 5 + 1) * rarityMult));
  state.inventory.splice(idx, 1);
  addToInventory(matId, amount);
  log(`🔨 已將 ${def.name} 拆解為 ${amount}× ${D().ALL_ITEMS[matId]?.name || '未知材料'}！`, 'loot');
  hideItemTooltip();
  updateAllUI(); save();
}

function getSelectedSet() {
  if (!(state.selectedUids instanceof Set)) {
    if (Array.isArray(state.selectedUids)) {
      state.selectedUids = new Set(state.selectedUids);
    } else {
      state.selectedUids = new Set();
    }
  }
  return state.selectedUids;
}

function toggleSelectItem(uid) {
  const set = getSelectedSet();
  const found = state.inventory.find(i => String(i.uid) === String(uid));
  if (!found) return;
  const realUid = found.uid;
  if (set.has(realUid) || set.has(String(realUid))) {
    set.delete(realUid);
    set.delete(String(realUid));
  } else {
    set.add(realUid);
  }
  updateInventoryUI();
}

function selectItemsByFilter(filterFn) {
  const set = getSelectedSet();
  for (const item of state.inventory) {
    if (item && !item.equipped && filterFn(item)) {
      set.add(item.uid);
    }
  }
  updateInventoryUI();
}

function selectJunkItems() {
  const set = getSelectedSet();
  for (const item of state.inventory) {
    if (item && !item.equipped) {
      const def = D().ALL_ITEMS[item.itemId];
      if (def && isProtectedFromAutoSell(item, def)) continue;
      const r = (item.rarity || 'common').toLowerCase();
      if (r === 'common' || r === 'uncommon') {
        set.add(item.uid);
      }
    }
  }
  updateInventoryUI();
}

function clearItemSelection() {
  const set = getSelectedSet();
  set.clear();
  updateInventoryUI();
}

function sellSelectedItems() {
  const set = getSelectedSet();
  if (set.size === 0) { log('尚未選擇要出售的物品。', 'system'); return; }
  const toDelete = Array.from(set);
  
  const hasHighValue = toDelete.some(uid => {
    const item = state.inventory.find(i => String(i.uid) === String(uid));
    return isHighValueItem(item);
  });
  if (hasHighValue) {
    if (!confirm(`⚠️ 選取內容包含高稀有度物品（稀有以上）。確定要出售嗎？`)) {
      return;
    }
  }

  let totalGold = 0, count = 0;
  for (const uid of toDelete) {
    const item = state.inventory.find(i => String(i.uid) === String(uid));
    if (!item || item.equipped) continue;
    const def = D().ALL_ITEMS[item.itemId];
    if (!def) continue;
    if (isProtectedFromAutoSell(item, def)) continue;
    const itemQty = item.count || 1;
    const goldEarned = getSellValue(item) * itemQty;
    
    totalGold += goldEarned;
    count += itemQty;
    removeFromInventory(item.uid, itemQty);
  }
  
  set.clear();
  state.gold += totalGold;
  log(`💰 已出售 ${count} 件所選物品，獲得 ${totalGold.toLocaleString()} 金幣！`, 'loot');
  updateAllUI();
  save();
}

function salvageSelectedItems() {
  const set = getSelectedSet();
  if (set.size === 0) { log('尚未選擇要分解的物品。', 'system'); return; }
  const toDelete = Array.from(set);

  const hasHighValue = toDelete.some(uid => {
    const item = state.inventory.find(i => String(i.uid) === String(uid));
    return isHighValueItem(item);
  });
  if (hasHighValue) {
    if (!confirm(`⚠️ 選取內容包含高稀有度物品（稀有以上）。確定要分解嗎？`)) {
      return;
    }
  }
  
  let count = 0;
  const yieldSummary = {};

  for (const uid of toDelete) {
    const item = state.inventory.find(i => String(i.uid) === String(uid));
    if (!item || item.equipped) continue;
    const def = D().ALL_ITEMS[item.itemId];
    if (!def) continue;
    
    const targetSlot = resolveEquipSlot(def.slot);
    const isEquip = (def.slot && def.slot !== 'consumable' && def.slot !== 'material' && def.slot !== 'scroll' && def.slot !== 'powerup') || ALL_EQUIP_SLOTS.includes(targetSlot);
    if (!isEquip) continue;
    
    const reqLvl = def.req ? def.req.level : 1;
    const grade = getItemGrade(reqLvl);
    const rarityMult = item.rarity ? (D().RARITY?.[item.rarity]?.mult || 1) : 1;

    let matId = 'iron_ore';
    if (grade === 'S 級' || def.tier === 6) matId = 'crystal_s';
    else if (grade === 'A 級') matId = 'crystal_a';
    else if (grade === 'B 級') matId = 'crystal_b';
    else if (grade === 'C 級') matId = 'crystal_c';
    else if (grade === 'D 級') matId = 'crystal_d';
    else matId = (def.slot === 'weapon') ? 'iron_ore' : 'cloth';

    const amount = Math.max(1, Math.floor((reqLvl / 5 + 1) * rarityMult));
    removeFromInventory(item.uid, 1);
    addToInventory(matId, amount);

    yieldSummary[matId] = (yieldSummary[matId] || 0) + amount;
    count++;
  }

  set.clear();
  const summaryStr = Object.entries(yieldSummary)
    .map(([mId, amt]) => `${amt}× ${D().ALL_ITEMS[mId]?.name || '未知材料'}`)
    .join(', ');

  if (count > 0) {
    log(`🔨 已分解 ${count} 件裝備並取得：${summaryStr || '材料'}！`, 'loot');
  } else {
    log('尚未選擇可分解的有效裝備。', 'system');
  }
  updateAllUI();
  save();
}

function crystallizeSelectedItems() {
  const set = getSelectedSet();
  let itemsToCrystallize = [];
  if (set.size > 0) {
    itemsToCrystallize = Array.from(set)
      .map(uid => state.inventory?.find(i => String(i.uid) === String(uid)))
      .filter(Boolean);
  } else {
    // Se nenhum item foi marcado via checkbox, seleciona itens de Grau D a S desequipados respeitando o filtro de grau atual
    const currentGrade = (typeof window !== 'undefined' && window.currentGradeFilter) || state.gradeFilter || 'all';
    itemsToCrystallize = (state.inventory || []).filter(item => {
      if (!item || item.equipped) return false;
      const def = D().ALL_ITEMS[item.itemId];
      if (!def) return false;
      const targetSlot = resolveEquipSlot(def.slot);
      const isEquip = (def.slot && def.slot !== 'consumable' && def.slot !== 'material' && def.slot !== 'scroll' && def.slot !== 'powerup') || ALL_EQUIP_SLOTS.includes(targetSlot);
      if (!isEquip) return false;
      const reqLvl = def.req ? def.req.level : 1;
      const gName = (def.grade || getItemGrade(reqLvl)).toUpperCase();
      if (gName === 'NG' || gName.includes('NO-GRADE')) return false;
      if (currentGrade !== 'all' && !gName.toLowerCase().includes(currentGrade.toLowerCase())) return false;
      return true;
    });
  }

  if (itemsToCrystallize.length === 0) {
    log('目前沒有可結晶化的 D～S 級裝備。', 'system');
    return;
  }

  const hasHighValue = itemsToCrystallize.some(i => isHighValueItem(i));
  if (hasHighValue) {
    if (!confirm(`💎 選取內容包含 ${itemsToCrystallize.length} 件裝備，其中有高稀有度物品（稀有以上）。確定要結晶化為元素水晶嗎？`)) {
      return;
    }
  }

  let count = 0;
  const yieldSummary = {};

  for (const item of itemsToCrystallize) {
    if (!item || item.equipped) continue;
    const def = D().ALL_ITEMS[item.itemId];
    if (!def) continue;

    const reqLvl = def.req ? def.req.level : 1;
    const gName = (def.grade || getItemGrade(reqLvl)).toUpperCase();
    const rarityMult = item.rarity ? (D().RARITY?.[item.rarity]?.mult || 1) : 1;
    const enchant = item.enchant || 0;

    let cId = null;
    let baseCrystals = 15;
    if (gName.includes('S') || def.tier === 6) { cId = 'crystal_s'; baseCrystals = 70 + enchant * 15; }
    else if (gName.includes('A') || def.tier === 5) { cId = 'crystal_a'; baseCrystals = 45 + enchant * 10; }
    else if (gName.includes('B') || def.tier === 4) { cId = 'crystal_b'; baseCrystals = 30 + enchant * 8; }
    else if (gName.includes('C') || def.tier === 3) { cId = 'crystal_c'; baseCrystals = 20 + enchant * 6; }
    else if (gName.includes('D') || def.tier === 2) { cId = 'crystal_d'; baseCrystals = 15 + enchant * 4; }

    if (!cId) continue; // Pula itens sem grau cristalizável

    const finalAmount = Math.max(5, Math.floor(baseCrystals * rarityMult));
    removeFromInventory(item.uid, 1);
    addToInventory(cId, finalAmount);

    yieldSummary[cId] = (yieldSummary[cId] || 0) + finalAmount;
    count++;
  }

  set.clear();
  const summaryStr = Object.entries(yieldSummary)
    .map(([mId, amt]) => `${amt}× ${D().ALL_ITEMS[mId]?.name || '未知材料'}`)
    .join(', ');

  if (count > 0) {
    log(`💎 已成功結晶化 ${count} 件裝備並取得：**${summaryStr}**！`, 'rarity-legendary');
    if (typeof floatText === 'function') floatText(`💎 已結晶（+${count}×）`, 'float-jackpot');
  } else {
    log('沒有可結晶化的有效物品。', 'system');
  }
  updateAllUI();
  save();
}
window.crystallizeSelectedItems = crystallizeSelectedItems;

function useItem(uid) {
  if (typeof hideItemTooltip === 'function') hideItemTooltip();
  const idx = state.inventory.findIndex(i => i.uid === uid);
  if (idx < 0) return;
  const item = state.inventory[idx];
  const def = D().ALL_ITEMS[item.itemId];
  if (!def) return;

  // Intercepta Pergaminhos de Encantamento (Normal / Blessed) para abertura canônica de modal
  const scrollMeta = parseEnchantScroll(def);
  if (scrollMeta && scrollMeta.isScroll) {
    const liveState = (typeof getState === 'function' ? getState() : state) || state;
    if (typeof window !== 'undefined' && typeof window.openEnchantFlowModal === 'function') {
      window.openEnchantFlowModal(null, uid, liveState, {
        updateAllUI,
        save,
        log,
        floatText: typeof floatText === 'function' ? floatText : null
      });
    } else if (typeof window !== 'undefined' && typeof window.openEnchantModalWithScroll === 'function') {
      window.openEnchantModalWithScroll(uid);
    } else {
      log('請開啟強化選單來使用這張卷軸。', 'system');
    }
    return;
  }
  const usable = def.slot === 'consumable' || def.slot === 'scroll' || def.slot === 'powerup';
  if (!usable) { if (ALL_EQUIP_SLOTS.includes(resolveEquipSlot(def.slot))) equipItem(uid); return; }
  
  state.buffs = state.buffs || {};
  const applyBuff = (key, amt, dur) => {
    const existing = state.buffs[key];
    const newUntil = Date.now() + dur * 1000;
    if (existing && existing.until > Date.now()) {
      existing.until = Math.min(existing.until + dur * 1000, Date.now() + 8 * 3600 * 1000); 
      existing.amount = Math.max(existing.amount, amt);
    } else { state.buffs[key] = { amount: amt, until: newUntil }; }
  };
  const fmtDur = (s) => s >= 3600 ? `${(s/3600).toFixed(s%3600?1:0)} 小時` : s >= 60 ? `${Math.round(s/60)} 分鐘` : `${s} 秒`;
  
  // ── HP Potions ─────────────────────────────────────────────────────────────
  if (def.type === 'heal' || item.itemId.startsWith('hp_potion')) {
    const potNow = Date.now();
    if (state._lastHpPotTime && (potNow - state._lastHpPotTime) < 1500) {
      return false; // Respeita GCD de 1.5s
    }
    state._lastHpPotTime = potNow;
    const healAmt = def.amount || def.healAmt || 100;
    state.hp = Math.min(state.maxHp, state.hp + healAmt);
    log(`✨ 使用 ${def.name}：+${healAmt} 生命值`, 'heal');
    if (typeof floatText === 'function') floatText(`+${healAmt} 生命值`, 'sf-heal');
  }
  // ── MP Potions ─────────────────────────────────────────────────────────────
  else if (def.type === 'mana' || item.itemId.startsWith('mp_potion')) {
    const potNow = Date.now();
    if (state._lastMpPotTime && (potNow - state._lastMpPotTime) < 1500) {
      return false; // Respeita GCD de 1.5s
    }
    state._lastMpPotTime = potNow;
    const manaAmt = def.amount || def.healAmt || 80;
    state.mp = Math.min(state.maxMp, state.mp + manaAmt);
    log(`💧 使用 ${def.name}：+${manaAmt} 魔力`, 'heal');
    if (typeof floatText === 'function') floatText(`+${manaAmt} 魔力`, 'sf-heal');
  }
  // ── Buff Potions ───────────────────────────────────────────────────────────
  else if (def.type === 'buff') {
    applyBuff(def.stat, def.amount, def.duration || 1800);
    log(`⚡ 使用 ${def.name}：+${def.amount} ${({ str: '力量', dex: '敏捷', con: '體質', int: '智力', wit: '智慧', men: '精神', atk: '物理攻擊', patk: '物理攻擊', def: '物理防禦', pdef: '物理防禦', matk: '魔法攻擊', mdef: '魔法防禦', hp: '生命值', maxHp: '最大生命值', mp: '魔力', maxMp: '最大魔力', eva: '迴避', crit: '暴擊', speed: '速度', spd: '速度', accuracy: '命中', hit: '命中', critDmg: '暴擊傷害', hpRegen: '生命恢復', mpRegen: '魔力恢復' })[def.stat] || '其他屬性'}，持續 ${fmtDur(def.duration || 1800)}`, 'heal');
    if (typeof floatText === 'function') floatText(`⚡ +${def.amount} ${({ str: '力量', dex: '敏捷', con: '體質', int: '智力', wit: '智慧', men: '精神', atk: '物理攻擊', patk: '物理攻擊', def: '物理防禦', pdef: '物理防禦', matk: '魔法攻擊', mdef: '魔法防禦', hp: '生命值', maxHp: '最大生命值', mp: '魔力', maxMp: '最大魔力', eva: '迴避', crit: '暴擊', speed: '速度', spd: '速度', accuracy: '命中', hit: '命中', critDmg: '暴擊傷害', hpRegen: '生命恢復', mpRegen: '魔力恢復' })[def.stat] || '其他屬性'}`, 'sf-heal');
  }
  else if (item.itemId === 'attack_potion') {
    applyBuff('atk', 0.20, 1800); log(`⚡ 使用 ${def.name}：+20% 攻擊，持續 30 分鐘`, 'heal');
    if (typeof floatText === 'function') floatText('⚡ +20% 攻擊（30 分鐘）', 'sf-heal');
  }
  else if (item.itemId === 'defense_potion') {
    applyBuff('def', 0.20, 1800); log(`🛡️ 使用 ${def.name}：+20% 防禦，持續 30 分鐘`, 'heal');
    if (typeof floatText === 'function') floatText('🛡️ +20% 防禦（30 分鐘）', 'sf-heal');
  }
  else if (item.itemId === 'speed_potion') {
    applyBuff('spd', 0.15, 1800); log(`💨 使用 ${def.name}：+15% 速度，持續 30 分鐘`, 'heal');
    if (typeof floatText === 'function') floatText('💨 +15% 速度（30 分鐘）', 'sf-heal');
  }
  else if (item.itemId === 'potion_haste') {
    applyBuff('atkSpd', 0.15, 1800); applyBuff('spd', 0.15, 1800);
    log(`⚡ 使用 ${def.name}：+15% 攻擊速度／移動速度，持續 30 分鐘`, 'heal');
    if (typeof floatText === 'function') floatText('⚡ 急速 +15%（30 分鐘）', 'sf-heal');
  }
  else if (item.itemId === 'aegis_draught') {
    applyBuff('def', 0.25, 3600); applyBuff('magicRes', 0.20, 3600);
    log(`🛡️ 使用 ${def.name}：防禦 +25%、魔法抗性 +20%，持續 1 小時`, 'heal');
    if (typeof floatText === 'function') floatText('🛡️ 神盾：防禦 +25%（1 小時）', 'sf-heal');
  }
  else if (item.itemId === 'berserker_elixir') {
    applyBuff('atk', 0.30, 3600); applyBuff('critRate', 0.15, 3600);
    log(`🔥 使用 ${def.name}：+30% 攻擊、+15% 暴擊率，持續 1 小時`, 'heal');
    if (typeof floatText === 'function') floatText('🔥 狂戰士：攻擊 +30%（1 小時）', 'float-crit');
  }
  else if (item.itemId === 'sages_tea') {
    applyBuff('mpRegen', 5, 3600);
    log(`🍵 使用 ${def.name}：每次回復 +5 魔力，持續 1 小時`, 'heal');
    if (typeof floatText === 'function') floatText('🍵 賢者茶：魔力回復（1 小時）', 'sf-heal');
  }
  else if (item.itemId === 'antidote') {
    state.poisoned = false; state.bled = false;
    state.poisonTicks = 0; state.bleedTicks = 0;
    log(`🧪 使用 ${def.name}：已解除中毒與流血！`, 'heal');
    if (typeof floatText === 'function') floatText('🧪 解毒劑', 'sf-heal');
  }
  // ── Boosts ─────────────────────────────────────────────────────────────────
  else if (def.type === 'xpBoost' || item.itemId === 'xp_boost_1h' || item.itemId === 'exp_boost_1h') {
    const pct = def.amount || 0.50; const dur = def.duration || 3600;
    applyBuff('xpBoost', pct, dur);
    log(`📖 使用 ${def.name}：+${Math.round(pct*100)}% 經驗值，持續 ${fmtDur(dur)}`, 'xp');
    if (typeof floatText === 'function') floatText(`📖 +${Math.round(pct*100)}% 經驗值（${fmtDur(dur)}）`, 'float-jackpot');
  }
  else if (def.type === 'goldBoost' || item.itemId === 'gold_boost_1h' || item.itemId === 'gold_boost_4h') {
    const pct = def.amount || 0.50; const dur = def.duration || (item.itemId === 'gold_boost_4h' ? 14400 : 3600);
    applyBuff('goldBoost', pct, dur);
    log(`💰 使用 ${def.name}：金幣 +${Math.round(pct*100)}%，持續 ${fmtDur(dur)}`, 'loot');
    if (typeof floatText === 'function') floatText(`💰 金幣 +${Math.round(pct*100)}%（${fmtDur(dur)}）`, 'float-jackpot');
  }
  else if (def.type === 'luckBoost' || item.itemId === 'luck_boost_1h') {
    const pct = def.amount || 0.50; const dur = def.duration || 3600;
    applyBuff('luckBoost', pct, dur);
    log(`🍀 使用 ${def.name}：幸運 +${Math.round(pct*100)}%，持續 ${fmtDur(dur)}`, 'loot');
    if (typeof floatText === 'function') floatText(`🍀 幸運 +${Math.round(pct*100)}%（${fmtDur(dur)}）`, 'float-jackpot');
  }
  else if (def.type === 'autoPotion') { applyBuff('autoPotion', 1, def.duration); log(`使用 ${def.name}：自動藥水已啟用，持續 ${fmtDur(def.duration)}`, 'heal'); }
  // ── EXP Scroll ────────────────────────────────────────────────────────────
  else if (item.itemId === 'exp_scroll') {
    const xpGain = def.amount || (state.level * 2500);
    state.xp = (state.xp || 0) + xpGain;
    log(`📜 使用 ${def.name}：+${xpGain.toLocaleString()} 經驗值`, 'xp');
    if (typeof floatText === 'function') floatText(`+${xpGain.toLocaleString()} 經驗值`, 'float-jackpot');
    if (typeof checkLevelUp === 'function') checkLevelUp();
  }
  // ── Elixirs ───────────────────────────────────────────────────────────────
  else if (item.itemId === 'elixir_berserker') {
    applyBuff('atk', 0.15, 3600); applyBuff('atkSpd', 0.15, 3600);
    log(`🧪 使用 ${def.name}：+15% 物理攻擊、+15% 攻擊速度，持續 1 小時`, 'heal');
    if (typeof floatText === 'function') floatText('🧪 狂戰士靈藥（1 小時）', 'float-crit');
  }
  else if (item.itemId === 'elixir_arcanist') {
    applyBuff('matk', 0.20, 3600); applyBuff('mpRegen', 3, 3600);
    log(`🧪 使用 ${def.name}：+20% 魔法攻擊、提升魔力回復，持續 1 小時`, 'heal');
    if (typeof floatText === 'function') floatText('🧪 奧術師靈藥（1 小時）', 'sf-heal');
  }
  else if (item.itemId === 'elixir_fortune') {
    applyBuff('goldBoost', 0.25, 3600); applyBuff('luckBoost', 0.25, 3600);
    log(`🧪 使用 ${def.name}：金幣 +25%、幸運 +25%，持續 1 小時`, 'loot');
    if (typeof floatText === 'function') floatText('🧪 幸運靈藥（1 小時）', 'float-jackpot');
  }
  else if (item.itemId === 'elixir_titan') {
    applyBuff('maxHpBonus', 0.25, 3600); applyBuff('def', 0.25, 3600);
    log(`🧪 使用 ${def.name}：+25% 最大生命值、+25% 防禦，持續 1 小時`, 'heal');
    if (typeof floatText === 'function') floatText('🧪 泰坦靈藥（1 小時）', 'sf-heal');
  }
  else if (item.itemId === 'elixir_transcendence') {
    applyBuff('xpBoost', 0.20, 3600); applyBuff('spBoost', 0.20, 3600);
    log(`🧪 使用 ${def.name}：+20% 經驗值、+20% 技能點，持續 1 小時`, 'xp');
    if (typeof floatText === 'function') floatText('🧪 超越靈藥（1 小時）', 'float-jackpot');
  } 
  else if (def.type === 'teleport') {
    state.hp = state.maxHp; state.mp = state.maxMp;
    const town = getNearestTown(state.zone, state);
    if (state.zone !== town) {
      state.zone = town;
      state.currentZone = town;
      state.lastHuntingZone = town;
      const zn = el('zone-name');
      if (zn) zn.textContent = ZONES[state.zone]?.name || town;
      stopCombat();
      setTimeout(startCombat, 300);
    }
    log(`使用 ${def.name}：已返回 ${ZONES[town]?.name || town}，生命值與魔力完全恢復。`, 'heal');
    updateAllUI();
  } else if (def.type === 'elixir_vigor' || item.itemId === 'elixir_vigor_1h') {
    applyBuff('xpBoost', 0.30, 3600);
    applyBuff('goldBoost', 0.30, 3600);
    log(`🧪 使用 ${def.name}：經驗值 +30%、金幣 +30%，持續 1 小時！`, 'heal');
    if (typeof floatText === 'function') floatText('🧪 活力：經驗值 +30%、金幣 +30%（1 小時）', 'float-crit');
  } else if (def.type === 'inventory_expand' || item.itemId === 'pack_inventory_expand_30') {
    state.bonusInventorySlots = (state.bonusInventorySlots || 0) + 30;
    const totalSlots = getMaxInventorySlots(state);
    log(`🎒 背包已擴充！永久增加 30 個欄位（最大容量：${totalSlots} 格）！`, 'loot');
    if (typeof floatText === 'function') floatText(`🎒 背包 +30 格（${totalSlots}）`, 'float-jackpot');
  } else if (def.type === 'vip_pass' || item.itemId === 'pass_vip_teleport_30d') {
    state.vipTeleportUntil = Math.max(Date.now(), state.vipTeleportUntil || 0) + (30 * 24 * 3600 * 1000);
    log('🌟 貴賓傳送通行證已啟用！30 天內可免費傳送。', 'system');
    if (typeof floatText === 'function') floatText('🌟 貴賓通行證 30 天已啟用！', 'float-jackpot');
  } else if (item.itemId === 'scroll_blessed_weapon' || item.itemId === 'scroll_blessed_armor') {
    const isWpn = item.itemId.includes('weapon');
    log(`📜 已選擇祝福的${isWpn ? '武器' : '防具'}強化卷軸！正在開啟具完全保護效果的鍛造介面。`, 'system');
    if (typeof openPanel === 'function') openPanel('forge');
    if (typeof window.switchForgeSubtab === 'function') window.switchForgeSubtab('enchant');
    return;
  } else if (def.type === 'skin_weapon' || item.itemId.startsWith('skin_weapon_')) {
    state.activeSkin = (state.activeSkin === item.itemId) ? null : item.itemId;
    log(`🎨 ${state.activeSkin ? '已裝備' : '已卸下'} ${def.name}！`, 'system');
    if (state.activeSkin) {
      const auraColor = state.activeSkin === 'skin_weapon_frost_lord' ? '140,225,255' : (state.activeSkin === 'skin_weapon_infernal_dragon' ? '255,120,40' : '255,235,140');
      playCombatVFX('hero_skin_aura', { color: auraColor, duration: 1200 });
      if (typeof floatText === 'function') floatText(`✨ ${def.name}`, 'float-jackpot');
    }
    updateAllUI(); save();
    return;
  } else if (def.type === 'costume' || item.itemId.startsWith('costume_')) {
    state.activeCostume = (state.activeCostume === item.itemId) ? null : item.itemId;
    log(`🥋 ${state.activeCostume ? '已裝備' : '已卸下'} ${def.name}！`, 'system');
    updateAllUI(); save();
    return;
  } else if (def.type === 'title_token' || item.itemId.startsWith('title_')) {
    const titleName = def.titleName || def.name.replace(/Certificado de Título: |Título: /g, '').replace(/[\[\]]/g, '');
    state.title = titleName;
    state.titleColor = def.titleColor || '#ffd700';
    state.unlockedTitles = state.unlockedTitles || [];
    if (!state.unlockedTitles.includes(titleName)) state.unlockedTitles.push(titleName);
    log(`👑 稱號 [${titleName}] 已套用到個人資料與聊天！`, 'system');
    updateAllUI(); save();
    return;
  } else if (def.type === 'avatar_frame' || item.itemId.startsWith('frame_')) {
    state.activeAvatarFrame = (state.activeAvatarFrame === item.itemId) ? null : item.itemId;
    log(`🖼️ 頭像框已更新！`, 'system');
    updateAllUI(); save();
    return;
  } else if (def.type === 'combat_aura' || item.itemId.startsWith('aura_')) {
    state.activeCombatAura = (state.activeCombatAura === item.itemId) ? null : item.itemId;
    log(`🔥 戰鬥光環已更新！`, 'system');
    updateAllUI(); save();
    return;
  } else if (def.type === 'raceClassChange' || item.itemId === 'scroll_race_class_change') {
    if (typeof window !== 'undefined' && typeof window.onOpenRaceClassChangeModal === 'function') {
      window.onOpenRaceClassChangeModal({
        scrollUid: uid,
        charName: state.charName || '冒險者',
        race: state.race || 'human',
        class: state.class || 'fighter'
      });
    } else {
      log('請開啟重新專精選單以使用種族／職業變更卷軸。', 'system');
    }
    return;
  } else if (def.type === 'resurrect') { log('復活卷軸會在死亡時自動使用。', 'system'); return; } 
  else { log(`使用 ${def.name}`, 'heal'); }
  
  // Robust stack deduction — handles both item.count and item.qty
  const currentQty = (item.count != null ? item.count : item.qty) ?? 1;
  if (currentQty > 1) {
    if (item.count != null) item.count--;
    if (item.qty != null) item.qty--;
  } else {
    state.inventory.splice(idx, 1);
  }
  updateAllUI(); save();
}

window.executeRaceClassChange = (scrollUid, newRace, newClass) => {
  if (scrollUid) {
    const idx = state.inventory.findIndex(i => i.uid === scrollUid);
    if (idx >= 0) {
      if (state.inventory[idx].count > 1) state.inventory[idx].count--;
      else state.inventory.splice(idx, 1);
    }
  }

  // 1. Unequip all equipped items safely back to inventory
  const ALL_SLOTS = ['weapon', 'shield', 'helmet', 'armor', 'legs', 'gloves', 'boots', 'necklace', 'earring1', 'earring2', 'ring', 'ring2', 'belt', 'cloak', 'talisman', 'agathion', 'hair', 'hair2'];
  if (state.equipment) {
    for (const slot of ALL_SLOTS) {
      state.equipment[slot] = null;
    }
  }

  // 2. Refund all spent SP
  let refundedSp = 0;
  if (state.skills) {
    for (const [skillId, lvl] of Object.entries(state.skills)) {
      const level = Number(lvl) || 0;
      for (let l = 1; l <= level; l++) {
        const sDef = (typeof SKILL_DEFS !== 'undefined') ? SKILL_DEFS[skillId] : null;
        const cost = sDef ? (sDef.cost * l) : (5 * l);
        refundedSp += cost;
      }
    }
  }
  state.sp = (Number(state.sp) || 0) + refundedSp;

  // 3. Reset all skills
  const resetSkills = {};
  if (typeof SKILL_DEFS !== 'undefined') {
    for (const k of Object.keys(SKILL_DEFS)) {
      resetSkills[k] = 0;
    }
  }
  state.skills = resetSkills;

  // 4. Update Race and Class
  state.race = newRace;
  state.class = newClass;

  // 5. Grant initial class skill
  const starterSkill = getStarterSkillForClass(newClass);
  state.skills[starterSkill] = 1;
  state.selectedSkill = starterSkill;

  // 6. Recalculate base stats
  const raceObj = RACES[newRace] || RACES.human;
  state.base = { ...(raceObj.stats || {}) };
  if (clsObj && clsObj.base) {
    for (const k of ['atk', 'def', 'eva', 'matk', 'mdef']) {
      state.base[k] = (state.base[k] || 0) + (clsObj.base[k] || 0);
    }
  }

  // 7. Save & Update UI
  updateAllUI();
  save();
  log(`✨ 種族與職業已成功變更為 ${raceObj.name || '未知種族'} ${clsObj?.name || '未知職業'}！返還 ${refundedSp} 技能點，裝備已存回背包。`, 'rarity-legendary');
};

window.onCharacterCreated = (data) => {
  if (!data || !data.race || !data.className) return;
  applyStarterKit(state, data.race, data.className, data.charName, data.gender);
  updateAllUI();
  save(true, true);
  if (typeof window !== 'undefined' && typeof window.saveCloudNow === 'function') {
    window.saveCloudNow(state, true);
  }
  log(`🎉 角色建立成功：${data.charName || state.charName}（${RACES?.[data.race]?.name || '未知種族'} · ${getClass(data.className)?.name || '未知職業'}）！已裝備初始無等級套裝！`, 'rarity-legendary');
};

// --------------------------- LEVEL UP wrapper ---------------------------
// engineCheckLevelUp is imported from LevelEngine.js — provide local wrapper that other code can call
function checkLevelUp() {
  const leveled = engineCheckLevelUp(state, { log, floatText, updateAllUI, checkClassAdvancement, updateSkillUI, updateRaceClassUI, getStats });
  if (state.level >= 40 && state.referredBy && !state.referralRewardClaimed) {
    state.referralRewardClaimed = true;
    CashShopService.addAdenCoins(state, 50, { log });
    state.inventory = state.inventory || [];
    const bScroll = state.inventory.find(i => i.itemId === 'scroll_blessed_weapon');
    if (bScroll) {
      bScroll.count = (bScroll.count || 1) + 5;
    } else {
      state.inventory.push({
        uid: `ref_${Date.now()}`,
        itemId: 'scroll_blessed_weapon',
        name: '祝福的武器強化卷軸（通用）',
        count: 5
      });
    }
    if (typeof window !== 'undefined' && window.lineageIdleCloud?.recordReferral) {
      try {
        window.lineageIdleCloud.recordReferral(state.referredBy, state.name || state.charName, state.level);
      } catch (e) {
        console.debug('Record referral level 40 error:', e);
      }
    }
    log(`🎉 **恭喜升到 40 級！** 透過 [${state.referredBy}] 推薦連結加入的特殊獎勵已領取：**+50 亞丁幣** 與 **5 張祝福武器強化卷軸**！`, 'loot');
    if (typeof floatText === 'function') floatText('🎁 推薦獎勵（50 亞丁幣）！', 'float-jackpot');
    updateAllUI();
    save();
  }
  return leveled;
}

// --------------------------- SELL ITEM ---------------------------
export function sellItem(uid) {
  if (typeof window !== 'undefined') window.sellItem = sellItem;
  const idx = state.inventory.findIndex(i => i.uid === uid);
  if (idx < 0) return;
  const item = state.inventory[idx];
  if (item.equipped) { log('請先卸下裝備，再出售。', 'system'); return; }
  const def = D()?.ALL_ITEMS?.[item.itemId];
  if (!def) return;

  if (isHighValueItem(item)) {
    const rarityName = D().RARITY?.[item.rarity]?.name || ({ common: '一般', uncommon: '非凡', rare: '稀有', epic: '史詩', legendary: '傳說', mythic: '神話', primordial: '太古', sovereign: '君王' })[String(item.rarity || 'common').toLowerCase()] || '一般';
    if (!confirm(`⚠️ 確定要出售這件高價值物品「${def.name}」[${rarityName}]？`)) return;
  }

  const qty = item.count || 1;
  const goldEarned = getSellValue(item) * qty;

  // Registrar na fila de Buyback (Canônico)
  state.buybackQueue = state.buybackQueue || [];
  state.buybackQueue.unshift({
    itemCopy: { ...item, count: qty },
    sellPrice: goldEarned,
    soldAt: Date.now()
  });
  if (state.buybackQueue.length > 10) {
    state.buybackQueue.pop();
  }

  state.inventory.splice(idx, 1);
  state.gold += goldEarned;
  const name = uiFormatItemDisplayName(item, def);
  log(`💰 已出售 ${name}，獲得 ${goldEarned.toLocaleString()} 金幣！`, 'loot');
  hideItemTooltip();
  updateAllUI();
  save();
}

// --------------------------- CRAFTING (Sprint 3: Delegados) ---------------------------
function canCraft(recipeId, qty = 1) { return serviceCanCraft(state, recipeId, qty); }
function canCraftRecipe(id, qty = 1) { return serviceCanCraftRecipe(state, id, qty); }
function craftItem(recipeId, qty = 1) {
  return serviceCraftItem(state, recipeId, qty, { log, floatText, getItemDef, formatItemDisplayName: uiFormatItemDisplayName, updateAllUI, save });
}


// --------------------------- UI HELPERS ---------------------------
let ROOT = document; let _intervals = []; let _listeners = [];
export function setRoot(r) {
  ROOT = r || document;
  initializeVFX(ROOT);
  try {
    const stageEl = el('stage');
    if (stageEl) {
      globalVFXOrchestrator.mount(stageEl);
    }
  } catch (err) {
    console.debug('VFXOrchestrator setRoot mount notice:', err);
  }
}
export function addTrackedListener(target, event, handler, opts) {
  if (target && target.addEventListener) {
    target.addEventListener(event, handler, opts);
    _listeners.push({ target, event, handler, opts });
  }
}
export function destroy() {
  try { stopCombat(); } catch (e) {}
  _intervals.forEach(id => clearInterval(id));
  _intervals = [];
  _listeners.forEach(({ target, event, handler, opts }) => {
    try { target.removeEventListener(event, handler, opts); } catch(e) {}
  });
  _listeners = [];
  try {
    globalVFXOrchestrator.unmount();
  } catch (e) {}
}

function playSfx(type, arg, extra) {
  try {
    if (typeof window !== 'undefined' && window.idleAudio) {
      if (type === 'click') window.idleAudio.playClick();
      else if (type === 'upgrade') window.idleAudio.playUpgrade();
      else if (type === 'hit') window.idleAudio.playHit();
      else if (type === 'critical') window.idleAudio.playCritical();
      else if (type === 'drop') window.idleAudio.playDrop(arg);
      else if (type === 'levelUp') window.idleAudio.playLevelUp();
      else if (type === 'staggerBreak') window.idleAudio.playStaggerBreak?.();
      else if (type === 'bossRoar') window.idleAudio.playBossRoar?.();
      else if (type === 'elementalImpact') window.idleAudio.playElementalImpact?.(arg, extra);
      else if (type === 'windup') window.idleAudio.playWindup?.(arg, extra);
      else if (type === 'ultimate') window.idleAudio.playUltimateFanfare?.(arg);
    }
  } catch(e) {}
}
const el = id => (ROOT && ROOT.getElementById ? ROOT.getElementById(id) : null) || (ROOT && ROOT.querySelector ? ROOT.querySelector('#' + id) : null) || (document.getElementById(id));
const qs = sel => (ROOT && ROOT.querySelector ? ROOT.querySelector(sel) : null) || (document.querySelector(sel));
const qsa = sel => (ROOT && ROOT.querySelectorAll ? ROOT.querySelectorAll(sel) : []) || (document.querySelectorAll(sel));
// Always create elements in the same document as ROOT so Shadow DOM styles apply.
const doc = () => (ROOT && ROOT.ownerDocument) ? ROOT.ownerDocument : document;
const mkEl = tag => doc().createElement(tag);
const mkNS = (ns, tag) => doc().createElementNS(ns, tag);

function updateBar(id, cur, max) {
  const bar = el(id); const text = el(id.replace('-bar', '-text'));
  if (bar) bar.style.width = `${Math.max(0, (cur / max) * 100)}%`;
  if (text) text.textContent = `${Math.floor(cur)} / ${Math.floor(max)}`;
}
function getLogTime() {
  const d = new Date();
  return `[${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}]`;
}

function resolveLogCategory(type, msg) {
  // Spawn de Boss/Elite, Sagas e Avisos do Servidor pertencem à aba Sistema
  if (type === 'boss' || type === 'system' || msg.includes('surgiu') || msg.includes('apareceu') || msg.includes('DESPERTADO') || msg.includes('desbloqueada') || msg.includes('DESBLOQUEADA') || msg.includes('Salvo') || msg.includes('carregado') || msg.includes('菁英') || msg.includes('首領') || msg.includes('Miniboss')) {
    return 'system';
  }
  if (type === 'xp' || type === 'gold' || msg.includes('XP') || msg.includes('SP') || msg.includes('Adena') || msg.includes('JACKPOT') || msg.includes('Level Up')) {
    return 'gold_xp';
  }
  if (type === 'loot' || type.startsWith('rarity-') || msg.includes('Drop') || msg.includes('Obteve') || msg.includes('✦')) {
    return 'loot';
  }
  if (type === 'combat' || type === 'damage' || type === 'heal' || msg.includes('hit') || msg.includes('missed') || msg.includes('DODGE') || msg.includes('Curou') || msg.includes('dano')) {
    return 'combat';
  }
  return 'system';
}

function getLogBadgeHtml(type, category, msg = '') {
  if (type === 'boss' || msg.includes('首領') || msg.includes('菁英') || msg.includes('Miniboss')) {
    return '<span class="log-badge badge-boss">首領</span>';
  }
  if (category === 'loot') {
    if (type === 'rarity-legendary') return '<span class="log-badge badge-legendary">傳說</span>';
    if (type === 'rarity-epic') return '<span class="log-badge badge-rare">史詩</span>';
    if (type === 'rarity-rare') return '<span class="log-badge badge-rare">稀有</span>';
    return '<span class="log-badge badge-loot">掉落</span>';
  }
  if (category === 'gold_xp') {
    if (type === 'xp') return '<span class="log-badge badge-xp">經驗</span>';
    return '<span class="log-badge badge-gold">金幣</span>';
  }
  if (category === 'combat') {
    if (type === 'heal') return '<span class="log-badge badge-loot">治療</span>';
    return '<span class="log-badge badge-combat">戰鬥</span>';
  }
  return '<span class="log-badge badge-sys">系統</span>';
}

function log(msg, type = 'system', explicitCategory = null) {
  const logEl = el('log');
  if (!logEl) return;

  logEl.style.overflowAnchor = 'none';

  const category = explicitCategory || resolveLogCategory(type, msg);
  const entry = mkEl('p');
  entry.className = `log-entry ${type}`;
  entry.dataset.category = category;

  const timeStr = getLogTime();
  const badgeHtml = getLogBadgeHtml(type, category, msg);
  entry.innerHTML = `<span class="log-time">${timeStr}</span> ${badgeHtml} ${msg}`;

  const currentFilter = state.logFilter || 'all';
  if (currentFilter !== 'all' && currentFilter !== category) {
    entry.style.display = 'none';
  }

  // Se o log estiver oculto (jogador navegando em outra aba no mobile), apenas adiciona o elemento
  const isLogVisible = logEl.offsetParent !== null;
  const scrollThreshold = 60;
  const isNearBottom = isLogVisible && (logEl.scrollHeight - logEl.scrollTop - logEl.clientHeight) <= scrollThreshold;

  logEl.appendChild(entry);

  const scrollBtn = el('log-scroll-down-btn');
  if (isLogVisible) {
    if (isNearBottom) {
      logEl.scrollTop = logEl.scrollHeight;
      if (scrollBtn) scrollBtn.style.display = 'none';
    } else {
      if (scrollBtn) scrollBtn.style.display = 'block';
    }
  }

  // Mantém até 250 mensagens no histórico
  while (logEl.children.length > 250) {
    logEl.removeChild(logEl.firstChild);
  }
}

function scrollLogToBottom() {
  const logEl = el('log');
  const scrollBtn = el('log-scroll-down-btn');
  if (logEl) {
    logEl.scrollTo({ top: logEl.scrollHeight, behavior: 'smooth' });
  }
  if (scrollBtn) scrollBtn.style.display = 'none';
}

function safeUiUpdate(label, fn) {
  try {
    fn();
  } catch (err) {
    console.warn(`UI update failed (${label}):`, err);
  }
}

function updateStatsUI() {
  const stats = getStats();
  updateBar('hp-bar', state.hp, stats.maxHp); updateBar('mp-bar', state.mp, stats.maxMp);
  state.maxHp = stats.maxHp; state.maxMp = stats.maxMp;
  const xpForLevel = getXPForLevel(state.level);
  const baseXP = state.level <= 1 ? 0 : getTotalXP(state.level - 1);
  const curXP = Math.max(0, (state.xp || 0) - baseXP);
  updateBar('xp-bar', curXP, xpForLevel);
  const _xtEl = el('xp-text');
  if (_xtEl) {
    const pct = xpForLevel > 0 ? Math.min(100, (curXP / xpForLevel) * 100) : 100;
    _xtEl.textContent = `${curXP.toLocaleString()} / ${xpForLevel.toLocaleString()} (${pct.toFixed(0)}%)`;
  }
  const _spEl = el('sp-text'); if (_spEl) _spEl.textContent = state.sp;
  const _lvEl = el('level-text'); if (_lvEl) _lvEl.textContent = state.level;
  const _atkEl = el('atk-text'); if (_atkEl) _atkEl.textContent = stats.atk;
  const _defEl = el('def-text'); if (_defEl) _defEl.textContent = stats.def;
  const _evaEl = el('eva-text'); if (_evaEl) _evaEl.textContent = stats.eva;
  const _matkEl = el('matk-text'); if (_matkEl) _matkEl.textContent = stats.matk;
  const _mdefEl = el('mdef-text'); if (_mdefEl) _mdefEl.textContent = stats.mdef;
  const _critEl = el('crit-text'); if (_critEl) _critEl.textContent = `${stats.crit}%`;
  const _lootEl = el('loot-text'); if (_lootEl) _lootEl.textContent = `${Math.round(stats.loot * 100)}%`;
  
  const _gEl = el('gold-text-stat');
  if (_gEl) { _gEl.textContent = state.gold.toLocaleString(); if (_gEl._lastGold != null && state.gold > _gEl._lastGold) { _gEl.classList.remove('pulse'); void _gEl.offsetWidth; _gEl.classList.add('pulse'); } _gEl._lastGold = state.gold; }
  const _acEl = el('top-ac-amount');
  if (_acEl) _acEl.textContent = `${(state.adenCoins || 0).toLocaleString()} 亞丁幣`;
  const gps = getGoldPerSec();
  const gpsEl = el('gps-text'); if (gpsEl) gpsEl.textContent = gps > 0 ? `${gps.toFixed(1)}/秒` : '—';
  
  const _clEl = el('craft-level-stat'); if (_clEl) _clEl.textContent = state.craftLevel;
  const _rcEl = el('race-text'); if (_rcEl) _rcEl.textContent = (state.race && RACES?.[state.race]?.name) || state.race || '-';
  const _clsEl = el('class-text'); if (_clsEl) _clsEl.textContent = (getClass(state.class)?.name) || state.class || '-';
  // 5.1 & 5.3 Cosméticos — Auras & Títulos Honoríficos
  CosmeticService.ensureState(state);
  const activeAura = CosmeticService.getActiveAura(state);
  const _heroAura = el('hero-card-aura');
  if (_heroAura) {
    _heroAura.className = `hero-card-aura ${activeAura.cssClass || ''}`;
    _heroAura.style.display = (activeAura.id !== 'aura_none') ? 'block' : 'none';
  }
  const _heroBadge = el('hero-title-badge');
  if (_heroBadge) _heroBadge.style.display = (state.isHero || state.heroStatus?.isHero) ? 'inline-block' : 'none';
  const _customTitleBadge = el('hero-custom-title-badge');
  const activeTitle = CosmeticService.getActiveTitle(state);
  if (_customTitleBadge) {
    if (activeTitle && activeTitle.id !== 'title_none') {
      _customTitleBadge.style.display = 'inline-block';
      _customTitleBadge.textContent = activeTitle.titleText;
      _customTitleBadge.style.color = activeTitle.color || '#ffd700';
      _customTitleBadge.style.borderColor = activeTitle.color || '#ffd700';
      _customTitleBadge.style.background = 'rgba(0,0,0,0.55)';
    } else {
      _customTitleBadge.style.display = 'none';
    }
  }
  const _sgEl = el('saga-text'); if (_sgEl) _sgEl.textContent = (state.currentSaga ? (getSagaDef(state.currentSaga)?.name || state.currentSaga) : '-');
  const _sz = el('stage-zone');
  if (_sz) { const _t = (state.zone && ZONES?.[state.zone]) ? ZONES[state.zone].name + (ZONES[state.zone].town ? ' · 城鎮' : '') : '—'; if (_sz.textContent !== _t) _sz.textContent = _t; }
  const _zn = el('zone-name');
  if (_zn) { const _tzn = (state.zone && ZONES?.[state.zone]) ? ZONES[state.zone].name : '—'; if (_zn.textContent !== _tzn) _zn.textContent = _tzn; }
  const _spaEl = el('sp-available'); if (_spaEl) _spaEl.textContent = state.sp;
  const _gtEl = el('gold-text'); if (_gtEl) _gtEl.textContent = state.gold.toLocaleString();
  const _sgdEl = el('shop-gold'); if (_sgdEl) _sgdEl.textContent = state.gold.toLocaleString();
  const _maxInvSlots = getMaxInventorySlots(state);
  const _isEl = el('inv-slots'); if (_isEl) _isEl.textContent = `${state.inventory.length}/${_maxInvSlots}`;
  const _invSlotsCnt = el('inv-slots-count'); if (_invSlotsCnt) _invSlotsCnt.textContent = `${state.inventory.length}`;
  const _maxInvCnt = el('max-inv-slots'); if (_maxInvCnt) _maxInvCnt.textContent = `${_maxInvSlots}`;
  const _l2InvCounter = el('l2inv-counter'); if (_l2InvCounter) _l2InvCounter.textContent = `(${state.inventory.length}/${_maxInvSlots})`;

  const abEl = el('active-buffs');
  if (abEl) {
    const now = Date.now();
    // Sincroniza elixires ativos no state.buffs se necessário
    if (state.activeElixirs && typeof state.activeElixirs === 'object') {
      state.buffs = state.buffs || {};
      for (const [eId, exp] of Object.entries(state.activeElixirs)) {
        if (exp > now && !state.buffs[eId]) {
          const rec = (typeof ALCHEMY_RECIPES !== 'undefined' ? ALCHEMY_RECIPES[eId] : null);
          state.buffs[eId] = {
            name: rec ? rec.name : eId,
            icon: rec ? rec.icon : '🧪',
            desc: rec ? rec.desc : '啟用中的鍊金靈藥',
            amount: 1,
            until: exp,
            isElixir: true
          };
        }
      }
    }

    const items = Object.entries(state.buffs || {}).filter(([,b]) => b && typeof b.until === 'number' && b.until > now).map(([k,b]) => {
      const map = {
        xpBoost: ['📘', `+${Math.round((b.amount||0)*100)}% 經驗值`],
        goldBoost: ['🪙', `+${Math.round((b.amount||0)*100)}% 金幣`],
        luckBoost: ['🍀', `+${Math.round((b.amount||0)*100)}% 幸運`],
        autoPotion: ['🧪', '自動治療'],
        atk: ['⚔', `+${b.amount} 物理攻擊`],
        def: ['🛡', `+${b.amount} 物理防禦`],
        matk: ['✦', `+${b.amount} 魔法攻擊`],
        speed: ['⚡', `+${b.amount} 速度`],
        warcry: ['🗣', `+${(b.amount||0)*100}% 物理攻擊`],
        elixir_berserker: ['⚔️', '狂戰士靈藥（+15% 攻擊、+10 速度）'],
        elixir_arcanist: ['🔮', '奧術師靈藥（魔法攻擊 +20%、魔力 +50%）'],
        elixir_fortune: ['💰', '幸運靈藥（掉落 +25%、金幣 +30%）'],
        elixir_titan: ['🛡️', '泰坦靈藥（生命值 +25%、防禦 +20%）'],
        elixir_transcendence: ['✨', '超越靈藥（經驗值／技能點 +20%）']
      };
      const e = map[k] || (b.icon ? [b.icon, b.desc || b.name || k] : ['🧪', b.name || k]);
      return `<span class="ab-chip" title="${e[1]} · ${fmtCountdown(b.until-now)}">${e[0]}<em>${fmtCountdown(b.until-now)}</em></span>`;
    }).filter(Boolean);
    abEl.innerHTML = items.length ? items.join('') : '<span class="ab-empty">目前沒有啟用中的增益效果</span>';
  }
}

function updateDetailedEquipStatsUI() {


  const stats = getStats();
  const atkEl = el('l2stat-atk'); if (atkEl) atkEl.textContent = stats.atk;
  const defEl = el('l2stat-def'); if (defEl) defEl.textContent = stats.def;
  const matkEl = el('l2stat-matk'); if (matkEl) matkEl.textContent = stats.matk;
  const mdefEl = el('l2stat-mdef'); if (mdefEl) mdefEl.textContent = stats.mdef;
  const critEl = el('l2stat-crit'); if (critEl) critEl.textContent = `${stats.crit}%`;
  const spdEl = el('l2stat-speed'); if (spdEl) spdEl.textContent = stats.speed;

  const pStats = state.primaryStats || {};
  const primBox = el('l2inv-primary-box');
  if (primBox) {
    primBox.style.display = 'block';
    const strEl = el('l2stat-str'); if (strEl) strEl.textContent = pStats.str || 0;
    const dexEl = el('l2stat-dex'); if (dexEl) dexEl.textContent = pStats.dex || 0;
    const conEl = el('l2stat-con'); if (conEl) conEl.textContent = pStats.con || 0;
    const intEl = el('l2stat-int'); if (intEl) intEl.textContent = pStats.int || 0;
    const witEl = el('l2stat-wit'); if (witEl) witEl.textContent = pStats.wit || 0;
    const menEl = el('l2stat-men'); if (menEl) menEl.textContent = pStats.men || 0;
  }

  const defaultSlotIcons = {
    hair: '👒', gloves: '🧤', weapon: '⚔️', weapon2: '🗡️', necklace: '📿', ring: '💍', belt: '🪢',
    helmet: '⛑️', armor: '🛡️', chest: '🛡️', legs: '👖', shield: '🛡️', boots: '👢',
    hair2: '🎭', earring1: '💎', earring2: '💎', ring2: '💍', cloak: '🧥', talisman: '🔮', agathion: '🧚‍♂️', brooch: '❇️', talisman_bracelet: '🔮', agathion_bracelet: '🧚‍♂️'
  };
  const defaultSlotLabels = {
    hair: '頭飾 1', hair2: '頭飾 2', helmet: '頭盔', necklace: '項鍊',
    earring1: '耳環 1', earring2: '耳環 2', armor: '防具', chest: '防具',
    gloves: '手套', belt: '腰帶', legs: '褲子', boots: '靴子',
    weapon: '主手武器', weapon2: '副手武器', shield: '盾牌',
    ring: '戒指 1', ring2: '戒指 2', cloak: '披風', talisman: '護符',
    agathion: '阿加希翁', brooch: '胸針', talisman_bracelet: '護符手鐲',
    agathion_bracelet: '阿加希翁手鐲'
  };

  for (const slot of ALL_EQUIP_SLOTS) {
    if (slot === 'armor') continue; // chest é o slot canônico do paperdoll
    const uid = state.equipment[slot] || (slot === 'chest' ? state.equipment.armor : null);
    const pdSlots = (slot === 'chest')
      ? qsa('.l2inv-pd-slot[data-slot="chest"], .l2inv-pd-slot[data-slot="armor"]')
      : qsa(`.l2inv-pd-slot[data-slot="${slot}"]`);
    const pdSlot = pdSlots && pdSlots.length ? pdSlots[0] : null;
    const elem = el(`equip-${slot}`);
    const wrap = elem && elem.closest ? elem.closest('.equip-slot') : null;
    const defaultEmoji = defaultSlotIcons[slot] || '📦';
    
    if (!uid) {
      if (pdSlot) { 
        pdSlot.className = `l2inv-pd-slot equip-slot`; 
        pdSlot.title = `${defaultSlotLabels[slot] || '未知欄位'} · 空`; 
        pdSlot.innerHTML = `<span class="l2inv-pd-icon">${defaultEmoji}</span><span class="l2inv-pd-item" id="pd-item-${slot}"></span>`;
      }
      if (elem) { elem.textContent = '空'; elem.style.color = ''; elem.title = ''; }
      if (wrap) { wrap.style.borderColor = ''; wrap.title = (defaultSlotLabels[slot] || '未知欄位') + ' · 空'; }
      continue;
    }

    const item = state.inventory.find(i => i.uid === uid);
    if (!item) {
      state.equipment[slot] = null;
      if (pdSlot) { 
        pdSlot.className = `l2inv-pd-slot equip-slot`; 
        pdSlot.title = `${defaultSlotLabels[slot] || '未知欄位'} · 空`; 
        pdSlot.innerHTML = `<span class="l2inv-pd-icon">${defaultEmoji}</span><span class="l2inv-pd-item" id="pd-item-${slot}"></span>`;
      }
      if (elem) { elem.textContent = '空'; elem.style.color = ''; elem.title = ''; }
      if (wrap) { wrap.style.borderColor = ''; wrap.title = (defaultSlotLabels[slot] || '未知欄位') + ' · 空'; }
      continue;
    }

    const def = D().ALL_ITEMS[item.itemId]; if (!def) continue;
    const rarity = item.rarity || 'common';
    const enchantStr = item.enchant ? `+${item.enchant}` : '';
    const full = uiFormatItemDisplayName(item, def);
    const col = item.rarity ? (D().RARITY?.[rarity]?.color || 'var(--gilt)') : 'var(--gilt)';

    if (pdSlot) {
      pdSlot.className = `l2inv-pd-slot equip-slot has-item rarity-${rarity}`;
      pdSlot.title = `${enchantStr ? enchantStr + ' ' : ''}${def.name}（${defaultSlotLabels[slot] || '未知欄位'}）`;
      pdSlot.innerHTML = `${getItemIcon(def)}<span class="l2inv-pd-item" id="pd-item-${slot}">${enchantStr}</span>`;
      pdSlot.onmouseenter = (e) => { cancelHideTooltip(); showItemTooltip(item, e); };
      pdSlot.onmouseleave = scheduleHideTooltip;
      pdSlot.onclick = (e) => { e.stopPropagation(); cancelHideTooltip(); showItemTooltip(item, e); };
      pdSlot.ondblclick = (e) => { e.stopPropagation(); unequipItem(slot); };
    }
    if (elem) {
      elem.textContent = (enchantStr ? enchantStr + ' ' : '') + def.name;
      elem.style.color = col;
      elem.title = full;
    }
    if (wrap) {
      wrap.style.borderColor = col;
      wrap.title = full;
    }
  }

  const eb = getTotalEquipBonuses(); const list = el('bonus-list');
  if (list) {
    list.innerHTML = '';
    const labels = { atk: '物理攻擊', def: '物理防禦', matk: '魔法攻擊', mdef: '魔法防禦', hp: '生命值', mp: '魔力', eva: '迴避', crit: '暴擊', speed: '速度', lifesteal: '吸血' };
    for (const [k, label] of Object.entries(labels)) { if (eb[k]) { const div = mkEl('div'); div.innerHTML = `<span>${label}</span><span class="bonus-val">+${eb[k]}${k==='crit'?'%':''}</span>`; list.appendChild(div); } }
    if (!list.children.length) list.innerHTML = '<div style="color:var(--text-muted)">目前沒有裝備</div>';
  }
  renderStageHero();
}

const TREE_NODE_W = 110; const TREE_NODE_H = 78; const TREE_PAD_X = 14; const TREE_PAD_Y = 14;

function updateSkillUI() {
  return uiUpdateSkillUI(state, { spendSP, showSkillTooltip, hideSkillTooltip });
}
function updateSkillInfoPanel() {
  return uiUpdateSkillInfoPanel(state, { spendSP });
}


function updateInventoryUI() {
  consolidateInventoryStacks(state);
  updateDetailedEquipStatsUI();
  return uiUpdateInventoryUI(state, {
    equipItem,
    unequipItem,
    sellItem,
    salvageItem,
    useItem,
    toggleSelectItem,
    sellSelectedItems,
    salvageSelectedItems,
    selectJunkItems,
    clearItemSelection,
    depositToWarehouse,
    save,
    log
  });
}
function updateWarehouseUI() {
  return uiUpdateWarehouseUI(state, { withdrawFromWarehouse });
}
function updateEquipmentUI() {
  updateDetailedEquipStatsUI();
  return uiUpdateEquipmentUI(state, { unequipItem });
}
function updateCharacterUI() {
  return uiUpdateCharacterUI(state);
}




function getAssetUrl(p) {
  if (!p) return '';
  p = String(p).replace(/\\/g, '/');
  if (p.includes('water_wave.jpg')) p = '/assets/2d/icons/shields-amulets/PNG/Background/Icon15.png';
  else if (p.includes('fire_strike.jpg')) p = '/assets/skills/icons/flame_strike.png';
  else if (p.includes('wind_blade.jpg')) p = '/assets/skills/icons/tornado_vortex.png';
  else if (p.includes('holy_shield.jpg')) p = '/assets/skills/icons/shield_of_light.png';
  else if (p.includes('vampiric_blood.jpg')) p = '/assets/skills/icons/vampiric_pulse.png';

  if (!p.includes('/') && (p.endsWith('.png') || p.endsWith('.jpg'))) {
    p = `/assets/skills/icons/${p}`;
  }

  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('data:')) return p;
  const cleanPath = p.replace(/^\//, '');
  let baseUrl = '';
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) {
    baseUrl = import.meta.env.BASE_URL;
  } else if (typeof window !== 'undefined' && window.__BASE_URL__) {
    baseUrl = window.__BASE_URL__;
  }
  if (baseUrl) {
    if (!baseUrl.endsWith('/')) baseUrl += '/';
    return baseUrl + cleanPath;
  }
  return '/' + cleanPath;
}

function getItemDef(itemId) {
  if (!itemId) return null;
  const all = (typeof window !== 'undefined' && window.GameData && window.GameData.ALL_ITEMS) ? window.GameData.ALL_ITEMS : ((typeof D === 'function' && D()) ? D().ALL_ITEMS : {});
  if (!all) return null;
  if (all[itemId]) return all[itemId];
  const s = String(itemId);
  if (all['armor_' + s]) return all['armor_' + s];
  if (all['jewel_' + s]) return all['jewel_' + s];
  if (all['weapon_' + s]) return all['weapon_' + s];
  const stripped = s.replace(/^(armor_|jewel_|weapon_|shield_|wepoan_)/, '');
  if (all[stripped]) return all[stripped];
  if (all['armor_' + stripped]) return all['armor_' + stripped];
  if (all['jewel_' + stripped]) return all['jewel_' + stripped];
  if (all['weapon_' + stripped]) return all['weapon_' + stripped];
  return null;
}

const HEIRLOOM_ICON_MAP_MAIN = {
  weapon_heirloom_sword: 'gradec/weapons/weapon_samurai_longsword.png',
  weapon_heirloom_spear: 'gradec/weapons/weapon_spiked_spear.png',
  weapon_heirloom_dagger: 'gradec/weapons/weapon_darkelven_dagger.png',
  weapon_heirloom_bow: 'gradec/weapons/weapon_eminence_bow.png',
  weapon_heirloom_staff: 'gradec/weapons/weapon_crystal_staff.png',
  weapon_heirloom_duals: 'gradec/weapons/weapon_dual_revolution_sword.png',
  weapon_heirloom_blunt: 'gradec/weapons/weapon_big_hammer.png',
  armor_heirloom_chest_heavy: 'gradec/armors/armor_full_plate_heavy_armor.png',
  armor_heirloom_legs_heavy: 'gradec/armors/armor_plated_leather_light_pants.png',
  armor_heirloom_helmet_heavy: 'gradec/armors/armor_full_plate_heavy_helmet.png',
  armor_heirloom_gloves_heavy: 'gradec/armors/armor_full_plate_heavy_gloves.png',
  armor_heirloom_boots_heavy: 'gradec/armors/armor_full_plate_heavy_boots.png',
  armor_heirloom_chest_light: 'gradec/armors/armor_theca_light_armor.png',
  armor_heirloom_legs_light: 'gradec/armors/armor_theca_light_pants.png',
  armor_heirloom_helmet_light: 'gradec/armors/armor_theca_light_helmet.png',
  armor_heirloom_gloves_light: 'gradec/armors/armor_theca_light_gloves.png',
  armor_heirloom_boots_light: 'gradec/armors/armor_theca_light_boots.png',
  armor_heirloom_chest_robe: 'gradec/armors/armor_karmian_robe_armor.png',
  armor_heirloom_legs_robe: 'gradec/armors/armor_karmian_robe_pants.png',
  armor_heirloom_helmet_robe: 'gradec/armors/armor_karmian_helmet.png',
  armor_heirloom_gloves_robe: 'gradec/armors/armor_karmian_robe_gloves.png',
  armor_heirloom_boots_robe: 'gradec/armors/armor_karmian_robe_boots.png',
  armor_heirloom_chest: 'gradec/armors/armor_full_plate_heavy_armor.png',
  armor_heirloom_legs: 'gradec/armors/armor_plated_leather_light_pants.png',
  armor_heirloom_helmet: 'gradec/armors/armor_full_plate_heavy_helmet.png',
  armor_heirloom_gloves: 'gradec/armors/armor_full_plate_heavy_gloves.png',
  armor_heirloom_boots: 'gradec/armors/armor_full_plate_heavy_boots.png',
  shield_heirloom_aegis: 'gradec/armors/armor_full_plate_shield.png',
  jewelry_heirloom_necklace: 'gradec/jewels/jewel_blessed_necklace.png',
  jewelry_heirloom_earring_1: 'gradec/jewels/jewel_blessed_earing.png',
  jewelry_heirloom_earring_2: 'gradec/jewels/jewel_blessed_earing.png',
  jewelry_heirloom_ring_1: 'gradec/jewels/jewel_blessed_ring.png',
  jewelry_heirloom_ring_2: 'gradec/jewels/jewel_blessed_ring.png',
  cloak_heirloom_royal: 'gradec/armors/armor_full_plate_cloack.png',
  belt_heirloom_champion: 'gradec/armors/armor_full_plate_belt.png',
  hair_heirloom_crown: 'acessories/noble_gold_crown.png',
  book_1star: 'spellbooks/spellbook_1star.png',
  book_2star: 'spellbooks/spellbook_2star.png',
  book_3star: 'spellbooks/spellbook_3star.png',
  book_4star: 'spellbooks/spellbook_4star.png',
  spellbook_1star: 'spellbooks/spellbook_1star.png',
  spellbook_2star: 'spellbooks/spellbook_2star.png',
  spellbook_3star: 'spellbooks/spellbook_3star.png',
  spellbook_4star: 'spellbooks/spellbook_4star.png'
};

function isEmojiIconMain(icon) {
  if (!icon || typeof icon !== 'string') return false;
  if (/\.(png|jpg|jpeg|webp|svg|gif)$/i.test(icon) || icon.includes('/')) return false;
  return /\p{Extended_Pictographic}/u.test(icon) || !/[a-zA-Z0-9]/.test(icon);
}

function getItemIcon(defOrId) { 
  if (!defOrId) return '📦';
  const def = (typeof defOrId === 'string') ? getItemDef(defOrId) : (defOrId.itemId ? getItemDef(defOrId.itemId) : defOrId);
  const slot = def?.slot || (typeof defOrId === 'object' ? defOrId.slot : '') || '';
  const fallbackIcons = { weapon: '⚔️', armor: '🛡️', helmet: '⛑️', gloves: '🧤', boots: '👢', ring: '💍', earring: '💎', necklace: '📿', consumable: '🧪', material: '💎', scroll: '📜', cloak: '🧣', belt: '🎗️', hair: '👑', hair1: '👑', agathion: '🐾' }; 
  const emoji = (def?.icon && isEmojiIconMain(def.icon)) ? def.icon : (fallbackIcons[slot] || '📦'); 

  const itemId = typeof defOrId === 'string' ? defOrId : (def?.id || defOrId.itemId || '');
  if (HEIRLOOM_ICON_MAP_MAIN[itemId] || HEIRLOOM_ICON_MAP_MAIN[def?.id]) {
    const iconUrl = getAssetUrl(`img/icons/${HEIRLOOM_ICON_MAP_MAIN[itemId] || HEIRLOOM_ICON_MAP_MAIN[def?.id]}`);
    return `<img src="${iconUrl}" alt="${def?.name || ''}" class="item-icon-img" onerror="this.style.display='none';if(this.nextElementSibling)this.nextElementSibling.style.display='inline-block';" style="width:28px; height:28px; object-fit:contain; vertical-align:middle;" /><span class="item-icon-fallback" style="display:none; font-size:18px;">${emoji}</span>`;
  }

  let iconPath = def?.icon || '';
  if (iconPath && isEmojiIconMain(iconPath)) {
    return `<span class="item-icon-fallback" style="font-size:18px; line-height:1; vertical-align:middle;">${iconPath}</span>`;
  }

  if (!iconPath) {
    const iconIndex = (typeof window !== 'undefined' && window.IconIndex) ? window.IconIndex : ((D() && D().ICON_MAP) ? D().ICON_MAP : {});
    iconPath = iconIndex[itemId] || iconIndex['armor_' + itemId] || iconIndex['jewel_' + itemId] || iconIndex['weapon_' + itemId] || iconIndex[String(itemId).replace(/^(armor_|jewel_|weapon_|shield_|wepoan_)/, '')] || '';
  }
  if (!iconPath || isEmojiIconMain(iconPath)) return `<span class="item-icon-fallback" style="font-size:18px;">${emoji}</span>`;

  let p = String(iconPath).replace(/\\/g, '/').replace(/^\//, '');
  if (!p.endsWith('.png') && !p.endsWith('.jpg') && !p.endsWith('.webp') && !p.endsWith('.svg')) p += '.png';
  if (!p.startsWith('img/icons/') && !p.startsWith('img/') && !p.startsWith('assets/')) {
    p = `img/icons/${p}`;
  }
  const iconUrl = getAssetUrl(p);
  return `<img src="${iconUrl}" alt="${def?.name || ''}" class="item-icon-img" onerror="this.style.display='none';if(this.nextElementSibling)this.nextElementSibling.style.display='inline-block';" style="width:28px; height:28px; object-fit:contain; vertical-align:middle;" /><span class="item-icon-fallback" style="display:none; font-size:18px;">${emoji}</span>`; 
}


let tooltipTimer = null;

function scheduleHideTooltip() {
  if (tooltipTimer) clearTimeout(tooltipTimer);
  tooltipTimer = setTimeout(() => {
    hideItemTooltip();
  }, 220);
}

function cancelHideTooltip() {
  if (tooltipTimer) {
    clearTimeout(tooltipTimer);
    tooltipTimer = null;
  }
}

function showItemTooltip(arg1, arg2) {
  cancelHideTooltip();
  uiShowItemTooltip(arg1, arg2, state, {
    equipItem: (uid) => equipItem(uid),
    unequipItem: (slot) => unequipItem(slot),
    sellItem: (uid) => sellItem(uid),
    salvageItem: (uid) => salvageItem(uid),
    useItem: (uid) => useItem(uid),
    depositToWarehouse: (uid) => depositToWarehouse(uid),
    withdrawFromWarehouse: (uid) => withdrawFromWarehouse(uid)
  });
}

function hideItemTooltip() { 
  cancelHideTooltip();
  const tt = el('item-tooltip');
  if (tt) tt.style.display = 'none'; 
}

function hideSkillTooltip() {
  hideItemTooltip();
}

function showSkillTooltip(skillId, e) {
  state.selectedSkill = skillId;
  updateSkillInfoPanel();
  cancelHideTooltip();
  const def = SKILL_DEFS[skillId];
  if (!def) return;
  
  const tt = el('item-tooltip');
  if (!tt) return;

  const lvl = state.skills[skillId] || 0;
  const max = def.max || def.maxLevel || 5;
  const reqs = SKILL_REQS[skillId];
  const reqText = reqs ? Object.entries(reqs).map(([s, v]) => `${SKILL_DEFS[s]?.name || s} ${v}`).join(', ') : '無';
  const tier = TIER_NAMES[def.tier] || '';

  const iconData = getSkillIcon(skillId, def);
  const semantic = getSkillSemanticData(skillId);
  const iconPath = iconData?.iconPath || (def.icon ? getAssetUrl(def.icon) : '');

  const iconHtml = iconPath
    ? `<img src="${getAssetUrl(iconPath)}" class="skill-icon-img" alt="${def.name}" style="width:36px; height:36px; object-fit:cover; border-radius:6px; border:1px solid rgba(255,255,255,0.2); vertical-align:middle;" onerror="this.style.display='none'" />`
    : `<span class="tt-icon">${def.icon || '✦'}</span>`;

  const elemBadge = semantic?.element
    ? `<span class="tt-elem-pill elem-${semantic.element.toLowerCase()}">${({ fire: '火', water: '水', wind: '風', earth: '地', holy: '神聖', dark: '黑暗', physical: '物理', none: '無屬性' })[String(semantic.element).toLowerCase()] || '其他屬性'}</span>`
    : '';
  const roleBadge = semantic?.role
    ? `<span class="tt-role-pill">${({ physical: '物理', magic: '魔法', buff: '增益', debuff: '減益', heal: '治療', healing: '治療', control: '控制', passive: '被動', active: '主動', summon: '召喚', aoe: '範圍', utility: '輔助' })[String(semantic.role).toLowerCase()] || '技能'}</span>`
    : '';
  const starBadge = (def.starRank >= 4 || def.tier >= 4)
    ? `<span class="tt-star-pill">${def.starRank || (def.tier === 5 ? 5 : 4)}★</span>`
    : '';
  const cdText = (def.baseCd || def.gameplay?.cooldown)
    ? `<span class="tt-cd-badge">⏱️ ${((def.baseCd || def.gameplay?.cooldown) / 1000).toFixed(1)} 秒</span>`
    : '';

  tt.innerHTML = `
    <div class="tt-header rarity-epic">
      <span class="tt-icon">${iconHtml}</span>
      <div class="tt-title">
        <div class="tt-name" style="color:var(--gilt); font-weight:700; display:flex; align-items:center; gap:6px;">
          <span>${def.name}</span>
          ${starBadge}
        </div>
        <div class="tt-slot" style="display:flex; align-items:center; gap:6px; margin-top:2px;">
          <span>${tier} · 等級 ${lvl}/${max}</span>
          ${elemBadge}
          ${roleBadge}
          ${cdText}
        </div>
      </div>
    </div>
    <div class="tt-body" style="padding-top:6px;">
      <p class="tt-desc">${def.desc || def.info || ''}</p>
      <div class="tt-effect" style="margin-top:6px; color:#f0d080; font-weight:600;">${window.SkillScaling ? window.SkillScaling.buildSkillEffectText(def, lvl) : (def.info || '')}</div>
      <div style="margin-top:6px; font-size:10px; color:#888;">需求：${reqText}（等級 ${def.reqLvl || def.requiredLevel || 1}）</div>
    </div>
  `;

  tt.style.display = 'block';
  tt.style.zIndex = '999999';
  tt.onmouseenter = cancelHideTooltip;
  tt.onmouseleave = scheduleHideTooltip;
}

function updateShopUI() {
  return uiUpdateShopUI(state, {
    buyItem,
    buyMysticItem,
    sellItem: (uid, qty) => serviceSellItem(state, uid, qty, { log, updateAllUI, save }),
    sellAllJunk: () => serviceSellAllJunk(state, { log, updateAllUI, save }),
    buybackItem: (idx) => serviceBuybackItem(state, idx, { log, updateAllUI, save }),
    rerollMysticStock: (rollStockFn) => serviceRerollMysticStock(state, rollStockFn, { log, updateAllUI, save }),
    switchTab: (tabId) => {
      const tabBtn = (ROOT || document).querySelector(`.menu-btn[data-tab="${tabId}"]`);
      if (tabBtn) tabBtn.click();
    }
  });
}
function updateCraftUI() {
  return uiUpdateCraftUI(state, { craftItem });
}


function shopRow(def, id, price, extra = '') {
  const canAfford = state.gold >= price; 
  const statsLine = buildStatLine(def);
  const lockLvl = def.req && def.req.level > state.level; 
  const lockCls = def.classReq && def.classReq !== state.class;
  const lockReason = lockLvl ? `等級 ${def.req.level}` : lockCls ? `需要 ${getClass(def.classReq)?.name}` : '';
  const row = mkEl('div'); 
  row.className = 'shop-item' + (lockLvl || lockCls ? ' locked' : '');

  const isStackable = def.slot === 'consumable' || def.slot === 'scroll' || def.slot === 'powerup' || def.stack;

  let buyActionHtml = '';
  if (isStackable && !lockLvl && !lockCls) {
    buyActionHtml = `
      <div class="shop-bulk-actions">
        <button class="item-action" data-buy="${id}" data-qty="1" ${state.gold < price ? 'disabled' : ''}>1×（${price} 金幣）</button>
        <button class="item-action" data-buy="${id}" data-qty="10" ${state.gold < price * 10 ? 'disabled' : ''}>10×（${(price * 10).toLocaleString()} 金幣）</button>
        <button class="item-action" data-buy="${id}" data-qty="100" ${state.gold < price * 100 ? 'disabled' : ''}>100×（${(price * 100).toLocaleString()} 金幣）</button>
        <button class="item-action" data-buy="${id}" data-qty="1000" ${state.gold < price * 1000 ? 'disabled' : ''}>1000×（${(price * 1000).toLocaleString()} 金幣）</button>
      </div>
    `;
  } else {
    buyActionHtml = `<button class="item-action" data-buy="${id}" data-qty="1" ${(!canAfford || lockLvl || lockCls) ? 'disabled' : ''}>${price.toLocaleString()} 金幣</button>`;
  }

  row.innerHTML = `<div class="item-info"><div class="item-name">${def.name}${def.tier ? ' <span class="tier-tag">第 '+def.tier+' 階</span>' : ''}</div><div class="item-desc">${def.desc || ''}</div>${statsLine ? `<div class="item-stats">${statsLine}</div>` : ''}${lockReason ? `<div class="lock-reason">🔒 ${lockReason}</div>` : ''}</div>${buyActionHtml}${extra}`;
  return row;
}

function buildStatLine(def) {
  const parts = [];
  if (def.atk) parts.push(`⚔${def.atk}`); if (def.matk) parts.push(`✦${def.matk}`); if (def.def) parts.push(`🛡${def.def}`); if (def.mdef) parts.push(`🔷${def.mdef}`); if (def.hp) parts.push(`❤${def.hp}`); if (def.mp) parts.push(`💧${def.mp}`); if (def.eva) parts.push(`🏃${def.eva}`); if (def.crit) parts.push(`💥${def.crit}%`); if (def.lifesteal) parts.push(`🩸${def.lifesteal}%`); if (def.speed) parts.push(`⚡${def.speed}`); if (def.craftBonus) parts.push(`🔨+${Math.round(def.craftBonus*100)}%`); if (def.lootBonus) parts.push(`💰+${Math.round(def.lootBonus*100)}%`);
  return parts.join(' · ');
}

function renderShopGear(list) {
  const zone = ZONES[state.zone], shopId = zone?.shop, items = shopId ? D().SHOP_INVENTORY[shopId] : null;
  if (!items) { list.innerHTML = '<p class="shop-empty">此區域沒有裝備商人。</p>'; return; }
  let count = 0;
  for (const shopItem of items) { 
    const def = D().ALL_ITEMS[shopItem.id]; 
    if (!def || def.slot === 'consumable' || def.slot === 'scroll' || def.slot === 'powerup' || def.classReq) continue; 
    list.appendChild(shopRow(def, shopItem.id, def.price)); 
    count++; 
  }
  if (!count) list.innerHTML = '<p class="shop-empty">商人目前沒有適合你的裝備。</p>';
}
function renderShopPotions(list) {
  const zone = ZONES[state.zone], shopId = zone?.shop, items = shopId ? D().SHOP_INVENTORY[shopId] : null;
  const base = ['soulshot_ng','spiritshot_ng','hp_potion_s','hp_potion_m','hp_potion_l','hp_potion_xl','mp_potion_s','mp_potion_m','mp_potion_l','mp_potion_xl','antidote','scroll_of_resurrection','scroll_of_rebirth','spellbook_1star','spellbook_2star','spellbook_3star','spellbook_4star'];
  const shown = new Set(), list2 = [...base, ...(items || []).map(i => i.id)]; let count = 0;
  for (const id of list2) { if (shown.has(id)) continue; const def = D().ALL_ITEMS[id]; if (!def || (def.slot !== 'consumable' && def.slot !== 'scroll') || (def.req && def.req.level > state.level)) continue; shown.add(id); list.appendChild(shopRow(def, id, def.price)); count++; }
  if (!count) list.innerHTML = '<p class="shop-empty">目前沒有藥水庫存。</p>';
}
function renderShopPowerups(list) {
  const powerupIds = ['xp_boost_1h','xp_boost_4h','gold_boost_1h','gold_boost_4h','luck_boost_1h','auto_potion_1h','teleport_scroll','berserker_elixir','aegis_draught','sages_tea'];
  const activeBuffs = Object.entries(state.buffs || {}).filter(([k,b]) => ['xpBoost','goldBoost','luckBoost','autoPotion'].includes(k) && b.until > Date.now());
  if (activeBuffs.length) {
    const hdr = mkEl('div'); hdr.className = 'shop-header'; hdr.innerHTML = '<h4>啟用中的增益效果</h4>'; list.appendChild(hdr);
    for (const [k, b] of activeBuffs) { const remaining = Math.max(0, b.until - Date.now()); const names = { xpBoost: '📘 經驗值加成', goldBoost: '🪙 金幣加成', luckBoost: '🍀 幸運加成', autoPotion: '🧪 自動藥水' }; const row = mkEl('div'); row.className = 'shop-item active-buff'; row.innerHTML = `<div class="item-info"><div class="item-name">${names[k] || '增益效果'}</div><div class="item-desc">+${Math.round(b.amount*100)}% · ${fmtCountdown(remaining)}</div></div><div class="buff-pulse"></div>`; list.appendChild(row); }
    const sep = mkEl('div'); sep.className = 'shop-header'; sep.innerHTML = '<h4>購買更多</h4>'; list.appendChild(sep);
  }
  for (const id of powerupIds) { const def = D().ALL_ITEMS[id]; if (def) list.appendChild(shopRow(def, id, def.price)); }
}
function renderShopClass(list) {
  const clsName = state.class ? (getClass(state.class)?.name || '冒險者') : '冒險者';
  const hdr = mkEl('div'); hdr.className = 'shop-header';
  hdr.innerHTML = `<h4>🎖️ ${clsName} 專屬裝備與階級晉升</h4><p>大師級裝備與職業徽章。</p>`;
  list.appendChild(hdr);
  
  let count = 0;
  for (const id of Object.keys(D().ALL_ITEMS)) {
    const def = D().ALL_ITEMS[id];
    if (!def) continue;
    if (def.classReq && def.classReq === state.class) {
      list.appendChild(shopRow(def, id, def.price));
      count++;
    }
  }
  
  // Show high-level class weapons if none available
  if (count === 0) {
    const fallbackClassItems = ['arcane_wand', 'council_staff', 'starfall_staff', 'shadow_fangs', 'wraith_reavers', 'void_talons', 'warlords_plate', 'arcane_vestments'];
    for (const id of fallbackClassItems) {
      const def = D().ALL_ITEMS[id];
      if (def) { list.appendChild(shopRow(def, id, def.price)); count++; }
    }
  }
}

function renderShopMystic(list) {
  const rot = D().getMysticRotation(), hdr = mkEl('div'); hdr.className = 'shop-header mystic-header';
  hdr.innerHTML = `<h4>✦ 神秘遺物與寶藏 ✦</h4><p>稀有商品與古代強化物。刷新倒數：<span id="mystic-timer">${fmtCountdown(rot[0]?.msLeft || 0)}</span></p>`;
  list.appendChild(hdr);
  
  for (const pick of rot) {
    const rMult = D().RARITY?.[pick.rarity]?.mult || 1;
    const price = Math.floor((def.price || 500) * rMult * 2);
    const cloned = D().rollItemWithRarity(pick.id, pick.rarity);
    const canAfford = state.gold >= price;
    const lockLvl = def.req && def.req.level > state.level;
    const lockCls = def.classReq && def.classReq !== state.class;
    const row = mkEl('div');
    row.className = `shop-item rarity-${pick.rarity}` + (lockLvl || lockCls ? ' locked' : '');
    const statsLine = buildStatLine(cloned);
    const rLabel = D().RARITY?.[pick.rarity]?.name || ({ common: '一般', uncommon: '非凡', rare: '稀有', epic: '史詩', legendary: '傳說', mythic: '神話', primordial: '太古', sovereign: '君王' })[String(pick.rarity || 'common').toLowerCase()] || '一般';
    row.innerHTML = `<div class="item-info"><div class="item-name rarity-${pick.rarity}">${def.name} <span class="rarity-tag">${rLabel}</span></div><div class="item-desc">${def.desc || ''}</div>${statsLine ? `<div class="item-stats">${statsLine}</div>` : ''}</div><button class="item-action mystic-buy" data-buy-rarity="${pick.id}" data-rarity="${pick.rarity}" ${(!canAfford || lockLvl || lockCls) ? 'disabled' : ''}>${price.toLocaleString()} 金幣</button>`;
    list.appendChild(row);
  }

  // Mystic Enchant Scrolls & Artifacts
  const mysticArtifacts = ['scroll_of_enchant_weapon_', 'scroll_of_enchant_armor', 'scroll_of_resurrection', 'teleport_scroll'];
  const sep = mkEl('div'); sep.className = 'shop-header'; sep.innerHTML = '<h4>✦ 古代神秘卷軸</h4>'; list.appendChild(sep);
  for (const id of mysticArtifacts) {
    const def = D().ALL_ITEMS[id]; if (def) list.appendChild(shopRow(def, id, Math.floor(def.price * 1.2)));
  }
}

function fmtCountdown(ms) { const s = Math.max(0, Math.floor(ms / 1000)), m = Math.floor(s / 60), ss = s % 60; return `${m}:${ss.toString().padStart(2,'0')}`; }

function buyItem(itemId, qty = 1, rarity = 'common') {
  return serviceBuyItem(state, itemId, qty, rarity, { log, updateAllUI, save, classSatisfies });
}

function buyMysticItem(itemId, rarity) {
  return serviceBuyMysticItem(state, itemId, rarity, { log, updateAllUI, save, classSatisfies });
}


// RAID_BOSSES foi movido para src/data/raids.js (Sprint 1)
// Os imports estão no topo do arquivo.


function toggleSoulshot() {
  state.soulshotActive = !state.soulshotActive;
  updateCombatControlsUI();
  log(`魂彈${state.soulshotActive ? '已啟用（消耗魂彈，傷害 +100%）' : '已停用'}。`, 'system');
  save();
}

function toggleAutoPotion() {
  state.autoPotionActive = !state.autoPotionActive;
  updateCombatControlsUI();
  const hpPct = Math.round((state.autoPotionSettings?.hpThreshold || 0.6) * 100);
  const mpPct = Math.round((state.autoPotionSettings?.mpThreshold || 0.4) * 100);
  log(`自動藥水${state.autoPotionActive ? `已啟用（生命值 < ${hpPct}%、魔力 < ${mpPct}% 時觸發）` : '已停用'}。`, 'system');
  save();
}

function toggleCombatSpeed() {
  state.combatSpeed = state.combatSpeed === 1 ? 2 : 1;
  updateCombatControlsUI();
  if (state.combatActive) {
    if (combatInterval) clearInterval(combatInterval);
    combatInterval = setInterval(attackMonster, Math.round(200 / state.combatSpeed));
  }
  log(`戰鬥速度：${state.combatSpeed}× ${state.combatSpeed === 2 ? '加速 ⏩' : '一般'}。`, 'system');
  save();
}

function toggleCombatState() {
  state.isCombatActive = state.isCombatActive === false ? true : false;
  state.combatActive = state.isCombatActive;
  if (state.isCombatActive) {
    startCombat();
  } else {
    stopCombat();
  }
  updateCombatControlsUI();
  const isActive = state.isCombatActive !== false;
  log(`自動狩獵**${isActive ? '已繼續 ▶️' : '已暫停 🛑'}**。`, 'system');
  if (typeof window !== 'undefined' && window.floatText) {
    window.floatText(isActive ? '▶️ 已繼續狩獵' : '🛑 狩獵已暫停', 'float-gold');
  }
  save();
}

function updateCombatControlsUI() {
  const combatBtn = el('combat-toggle-btn');
  if (combatBtn) {
    const isActive = state.isCombatActive !== false;
    combatBtn.classList.toggle('active', isActive);
    combatBtn.innerHTML = `<span class="combat-stance-gem"></span> <span>${isActive ? '⚔️ 狩獵中' : '⏸️ 停止'}</span>`;
    combatBtn.style.removeProperty('background');
    combatBtn.style.removeProperty('borderColor');
    combatBtn.style.removeProperty('color');
  }
  const ssBtn = el('soulshot-toggle-btn');
  if (ssBtn) {
    const isSsActive = !!state.soulshotActive;
    ssBtn.classList.toggle('active', isSsActive);
    ssBtn.classList.toggle('autoshot-active', isSsActive);
    const isMage = ClassValidationService.isMageClass(state.class);
    
    // Contagem total de tiros no inventário (universais + legado por grau)
    let shotCount = 0;
    if (state.inventory && Array.isArray(state.inventory)) {
      for (const item of state.inventory) {
        if (!item || (item.count || 1) <= 0) continue;
        const id = String(item.itemId || '');
        if (isMage) {
          if (id === 'blessed_spiritshot_universal' || id === 'spiritshot_universal' || id.startsWith('spiritshot')) {
            shotCount += (item.count || 1);
          }
        } else {
          if (id === 'soulshot_universal' || id.startsWith('soulshot')) {
            shotCount += (item.count || 1);
          }
        }
      }
    }
    
    const shotLabel = isMage ? '✨ 魔靈彈' : '⚡ 靈魂彈';
    ssBtn.innerHTML = `<span>${shotLabel}</span> <span style="font-size:9px; color:${isSsActive ? '#fef08a' : '#94a3b8'};">(${shotCount})</span>`;
    ssBtn.title = `${isMage ? '魔靈彈' : '靈魂彈'}：${isSsActive ? '開啟' : '關閉'}（庫存：${shotCount}）`;
  }
  const apBtn = el('autopotion-toggle-btn');
  if (apBtn) {
    const isApActive = !!state.autoPotionActive;
    apBtn.classList.toggle('active', isApActive);
    const hpCount = getInventoryCount('hp_potion_s') + getInventoryCount('hp_potion_m') + getInventoryCount('hp_potion_l') + getInventoryCount('hp_potion_xl');
    const mpCount = getInventoryCount('mp_potion_s') + getInventoryCount('mp_potion_m') + getInventoryCount('mp_potion_l') + getInventoryCount('mp_potion_xl');
    const hpPct = Math.round((state.autoPotionSettings?.hpThreshold || 0.6) * 100);
    apBtn.innerHTML = `<span>🧪 自動藥水</span> <span style="font-size:9px; color:${isApActive ? '#ffd877' : '#94a3b8'};">（生命藥水 ${hpCount}／魔力藥水 ${mpCount}）</span>`;
    apBtn.title = `自動藥水：${isApActive ? '開啟' : '關閉'}（生命值 < ${hpPct}%）－點擊切換，或在巨集按鈕中設定 ⚙️`;
  }
  const spdBtn = el('speed-toggle-btn');
  if (spdBtn) {
    const isFast = state.combatSpeed === 2;
    spdBtn.classList.toggle('active', isFast);
    spdBtn.innerHTML = `<span>⏩ ${state.combatSpeed || 1}×</span>`;
  }
}

function clearLog() {
  const logEl = el('log');
  if (logEl) {
    logEl.innerHTML = '<p class="log-entry system">日誌紀錄已清除。</p>';
  }
}

function setLogFilter(filterType) {
  state.logFilter = filterType;
  qsa('.log-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.logfilter === filterType);
  });
  const entries = qsa('#log .log-entry');
  entries.forEach(entry => {
    if (filterType === 'all') {
      entry.style.display = 'block';
    } else {
      const cat = entry.dataset.category || resolveLogCategory(entry.className, entry.textContent || '');
      entry.style.display = (cat === filterType) ? 'block' : 'none';
    }
  });

  const logEl = el('log');
  if (logEl) {
    logEl.scrollTop = logEl.scrollHeight;
  }
}

function checkOfflineProgress(lastTime) {
  if (!lastTime) return;
  const val = validateOfflineTime(lastTime);
  if (!val.valid || val.minutesOffline < 1) return;
  
  const minutesOffline = val.minutesOffline;
  const OFFLINE_EFFICIENCY = 0.30; // Auto-Hunt Offline limit de 30%
  const rawKills = minutesOffline * 10;
  const kills = Math.floor(rawKills * OFFLINE_EFFICIENCY);
  const goldEarned = Math.floor(kills * (state.level * 6 + 10));
  const xpEarned = Math.floor(kills * (state.level * 12 + 15));
  // SP Offline baseado exclusivamente na taxa de aparição de Elites (~5% dos abates)
  const spEarned = Math.floor(kills * 0.05 * (state.level * 2 + 5));
  
  state.gold = Math.max(0, (state.gold || 0) + goldEarned);
  state.xp = Math.max(0, (state.xp || 0) + xpEarned);
  if (spEarned > 0) state.sp = Math.max(0, (state.sp || 0) + spEarned);
  
  // Bônus de Retorno para jogadores ausentes há mais de 24 horas (Retenção & Onboarding NÍVEL 7)
  const isReturnPlayer = minutesOffline >= 1440;
  if (isReturnPlayer) {
    state.buffs = state.buffs || {};
    state.buffs['rested_warrior'] = {
      until: Date.now() + (2 * 3600 * 1000),
      name: '回歸戰士祝福（經驗值 +50%）',
      amount: 1
    };
    state.gold = (state.gold || 0) + 250000;
    serviceAddToInventory(state, 'soulshot_ng', 1000);
    serviceAddToInventory(state, 'hp_potion_xl', 100);
    log('👑 **[回歸禮讚]** 歡迎回到亞丁！獲得 2 小時經驗值 +50% 祝福與帝國補給！', 'rarity-legendary');
  }

  checkLevelUp();

  let fishOfflineResult = null;
  if (FishingService && state.fishing?.autoFishing) {
    try {
      fishOfflineResult = FishingService.processOfflineFish(state, minutesOffline, { log, updateAllUI: () => {}, save: () => {} });
    } catch (e) {}
  }

  let huntOfflineResult = null;
  if (HuntingService && state.hunting?.autoHunting) {
    try {
      huntOfflineResult = HuntingService.processOfflineHunting(state, minutesOffline, { log, updateAllUI: () => {}, save: () => {} });
    } catch (e) {}
  }

  let gatherOfflineResult = null;
  if (GatheringService && state.gathering?.autoGathering) {
    try {
      gatherOfflineResult = GatheringService.processOfflineGathering(state, minutesOffline, { log, updateAllUI: () => {}, save: () => {} });
    } catch (e) {}
  }

  let mineOfflineResult = null;
  if (MiningService && state.mining?.autoMining) {
    try {
      mineOfflineResult = MiningService.processOfflineMining(state, minutesOffline, { log, updateAllUI: () => {}, save: () => {} });
    } catch (e) {}
  }
  
  const rewardsEl = el('offline-rewards');
  const modalEl = el('offline-modal');
  if (rewardsEl && modalEl) {
    rewardsEl.innerHTML = `
      <div style="color:var(--rarity-epic); font-weight:bold; margin-bottom:8px;">🌙 離線自動狩獵效率：30%（線上為 100%）</div>
      <div>⏱️ 離線時間：<strong>${minutesOffline} 分鐘</strong></div>
      <div>⚔️ 擊敗怪物（30% 效率）：<strong>約 ${kills}</strong></div>
      <div>💰 獲得金幣： <strong style="color:var(--gilt-bright);">+${goldEarned.toLocaleString()} 金幣</strong></div>
      <div>📘 獲得經驗值：<strong style="color:#60a5fa;">+${xpEarned.toLocaleString()}</strong></div>
      <div>✨ 獲得技能點：<strong style="color:#a855f7;">+${spEarned.toLocaleString()}</strong></div>
      ${fishOfflineResult && fishOfflineResult.totalCaught > 0 ? `
        <div style="color:#38bdf8; margin-top:4px; font-weight:bold;">🎣 離線釣魚收益：<strong>+${fishOfflineResult.totalCaught} 條魚（+${fishOfflineResult.xpGained} 釣魚經驗值）</strong></div>
      ` : ''}
      ${huntOfflineResult && huntOfflineResult.actualHunts > 0 ? `
        <div style="color:#34d399; margin-top:4px; font-weight:bold;">🐾 毛皮與皮革（離線狩獵）：<strong>+${huntOfflineResult.actualHunts} 份獵物（+${huntOfflineResult.totalXp} 狩獵經驗值）</strong></div>
      ` : ''}
      ${gatherOfflineResult && gatherOfflineResult.actualHarvests > 0 ? `
        <div style="color:#a3e635; margin-top:4px; font-weight:bold;">🌿 草藥與木材（離線採集）：<strong>+${gatherOfflineResult.actualHarvests} 次採集（+${gatherOfflineResult.totalXp} 採集經驗值）</strong></div>
      ` : ''}
      ${mineOfflineResult && mineOfflineResult.actualMines > 0 ? `
        <div style="color:#fbbf24; margin-top:4px; font-weight:bold;">⛏️ 礦石與寶石（離線採礦）：<strong>+${mineOfflineResult.actualMines} 次採掘（+${mineOfflineResult.totalXp} 採礦經驗值）</strong></div>
      ` : ''}
      ${isReturnPlayer ? `
        <div style="background:linear-gradient(135deg,rgba(234,179,8,0.2),rgba(0,0,0,0.5)); border:1px solid #fde047; border-radius:8px; padding:10px; margin-top:10px; text-align:center;">
          <div style="font-family:'Cinzel',serif; font-size:13px; font-weight:bold; color:#fde047; margin-bottom:4px;">
            👑 回歸勇士禮讚！
          </div>
          <div style="font-size:11.5px; color:#e2e8f0; margin-bottom:6px;">
            你已離線超過 24 小時！亞丁眾神賜予你回歸補給：
          </div>
          <div style="font-size:11px; color:#a3e635; font-weight:bold;">
            ✨ 經驗值 +50% 持續 2 小時 · 💰 +250,000 金幣 · ⚡ 1,000× 魂彈 · 🧪 100× XL 藥水
          </div>
        </div>
      ` : ''}
    `;
    modalEl.style.display = 'flex';
    modalEl.classList.add('active');

    const okBtn = el('offline-ok');
    if (okBtn) {
      okBtn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        closeOfflineModal();
      };
    }
  }
}

function closeOfflineModal() {
  const modalEl = el('offline-modal');
  if (modalEl) {
    modalEl.classList.remove('active');
    modalEl.style.display = 'none';
  }
  updateAllUI();
  save();
}




function renderCraftRecipes() {
  return updateCraftUI();
}

function isEnchantScroll(itemId, isWeapon, isBlessed = false, grade = null) {
  if (!itemId) return false;
  const id = String(itemId).toLowerCase();

  // Pergaminhos universais absolutos (arma ou armadura)
  if (id === 'scroll_universal' && !isBlessed) return true;
  if (id === 'scroll_blessed_universal' && isBlessed) return true;

  const matchesBlessed = id.includes('blessed');
  if (isBlessed !== matchesBlessed) return false;

  const matchesType = isWeapon 
    ? (id.includes('weapon') || id.includes('armas'))
    : (id.includes('armor') || id.includes('shield') || id.includes('armadura'));
  if (!matchesType) return false;

  const isScroll = id.includes('enchant') || id.includes('scroll') || id.includes('blessed');
  if (!isScroll) return false;

  // Se o pergaminho tiver um sufixo explícito de grau (_d, _c, etc.), valida. Se for universal, aceita qualquer grau!
  if (grade && grade !== 'NG') {
    const gLower = grade.toLowerCase();
    const hasGradeSuffix = ['_d', '_c', '_b', '_a', '_s'].some(s => id.includes(s));
    if (hasGradeSuffix && !id.includes('_' + gLower)) {
      return false;
    }
  }

  return true;
}

function getEnchantSuccessChance(grade, currentEnchant, safeLimit) {
  if (currentEnchant < safeLimit) return 1.0;
  const g = (grade || 'NG').toUpperCase();
  // Taxas balanceadas do Plano Mestre v5 (Nível 14):
  if (g === 'D' || g === 'C' || g === 'NG') {
    if (currentEnchant <= 3) return 0.90;
    if (currentEnchant <= 6) return 0.70;
    return 0.50;
  } else if (g === 'B' || g === 'A') {
    if (currentEnchant <= 3) return 0.80;
    if (currentEnchant <= 6) return 0.60;
    return 0.40;
  } else if (g === 'S') {
    if (currentEnchant <= 3) return 0.70;
    if (currentEnchant <= 6) return 0.50;
    return 0.30;
  }
  return Math.max(0.3, 1.0 - (currentEnchant - safeLimit) * 0.1);
}

function getEnchantScrollCount(isWeapon, isBlessed = false, grade = null) {
  if (!state.inventory) return 0;
  return state.inventory.reduce((sum, item) => {
    if (isEnchantScroll(item.itemId, isWeapon, isBlessed, grade)) {
      return sum + (item.count || 1);
    }
    return sum;
  }, 0);
}

function findEnchantScrollItem(isWeapon, isBlessed = false, grade = null) {
  if (!state.inventory) return null;
  return state.inventory.find(item => isEnchantScroll(item.itemId, isWeapon, isBlessed, grade) && (item.count || 1) > 0);
}

function updateEnchantUI() {
  const wsList = [el('enchant-workspace'), el('enchant-workspace-dedicated')].filter(Boolean);
  if (!wsList.length) return;
  
  for (const ws of wsList) {
    ws.innerHTML = '';
    const equippable = state.inventory.filter(i => {
      const def = D().ALL_ITEMS[i.itemId];
      return def && ['weapon','armor','helmet','gloves','boots','shield','legs','ring','necklace','earring','belt','cloak'].includes(def.slot);
    });
    
    if (!equippable.length) {
      ws.innerHTML = '<p class="shop-empty">背包中沒有可強化的裝備。</p>';
      continue;
    }

    for (const item of equippable) {
      const def = D().ALL_ITEMS[item.itemId];
      const isWeapon = def.slot === 'weapon';
      const grade = (def.grade || 'NG').toUpperCase();
      const normalCount = getEnchantScrollCount(isWeapon, false, grade);
      const blessedCount = getEnchantScrollCount(isWeapon, true, grade);
      const enchant = item.enchant || 0;
      const rarityColor = item.rarity ? (D().RARITY?.[item.rarity]?.color || 'var(--gilt)') : 'var(--gilt)';
      const isFullBody = def.slot === 'fullbody' || (def.slot === 'chest' && (def.isOnePiece || def.name?.toLowerCase().includes('full body') || def.name?.toLowerCase().includes('robe')));
      const safeLimit = isFullBody ? 4 : 3;
      const baseProb = getEnchantSuccessChance(grade, enchant, safeLimit);
      const safeMsg = enchant < safeLimit ? `100% 安全（安全至 +${safeLimit}）` : `成功率：${Math.round(baseProb * 100)}%（品級 ${grade}）`;
      
      const card = mkEl('div'); card.className = 'enchant-card';
      const title = (enchant > 0 ? `+${enchant} ` : '') + def.name + (item.rarity ? ` [${D().RARITY?.[item.rarity]?.name || ({ common: '一般', uncommon: '非凡', rare: '稀有', epic: '史詩', legendary: '傳說', mythic: '神話', primordial: '太古', sovereign: '君王' })[String(item.rarity || 'common').toLowerCase()] || '一般'}]` : '');
      
      card.innerHTML = `
        <div class="enchant-card-info">
          <div class="enchant-item-title" style="color:${rarityColor}">${title} ${item.equipped ? '⚡（已裝備）' : ''}</div>
          <div class="enchant-item-sub">一般卷軸：${normalCount}× · 祝福卷軸：${blessedCount}× · ${safeMsg}</div>
        </div>
        <div class="enchant-card-actions" style="display:flex; gap:6px; align-items:center;">
          <button class="item-action" data-enchant="${item.uid}" data-blessed="false" ${normalCount < 1 ? 'disabled title="沒有一般強化卷軸"' : ''}>⚡ 一般強化</button>
          <button class="item-action blessed-btn" data-enchant="${item.uid}" data-blessed="true" style="background:linear-gradient(135deg, #7e22ce, #b45309); color:#fff; border:1px solid #f59e0b; font-weight:bold;" ${blessedCount < 1 ? 'disabled title="沒有祝福強化卷軸"' : ''}>✨ 祝福強化</button>
        </div>
      `;
      ws.appendChild(card);
    }

    ws.querySelectorAll('[data-enchant]').forEach(btn => {
      btn.onclick = () => enchantItem(btn.dataset.enchant, btn.dataset.blessed === 'true');
    });
  }
}

function enchantItem(uid, useBlessed = false) {
  const item = state.inventory.find(i => i.uid === uid); if (!item) return;
  const def = D().ALL_ITEMS[item.itemId]; if (!def) return;
  const isWeapon = def.slot === 'weapon';
  const grade = (def.grade || 'NG').toUpperCase();
  const scrollItem = findEnchantScrollItem(isWeapon, useBlessed, grade);
  if (!scrollItem) { 
    log(useBlessed ? `需要祝福強化卷軸（${grade}）！` : `需要 ${grade} 級強化卷軸！`, 'system'); 
    return; 
  }
  
  EnchantmentService.executeAtomicEnchant(state, item.uid, scrollItem.uid, {
    log,
    floatText: typeof floatText === 'function' ? floatText : null,
    updateAllUI,
    save
  });
  updateAllUI(); save();
}

// canCraftRecipe importado do CraftService.js (Sprint 3)


function updateZoneUI() {
  return uiUpdateZoneUI(state, { selectZone });
}
function renderZoneMap() {
  uiRenderZoneMap(state, { selectZone });
  renderZoneInfoCard();
}

function renderZoneInfoCard() {
  const container = el('zone-info-card');
  if (!container) return;
  const zoneId = state.zone || 'talkingIsland';
  const z = ZONES[zoneId];
  if (!z) { container.innerHTML = ''; return; }

  const currentKills = (state.zoneKills && state.zoneKills[zoneId]) || 0;
  const monsterIds = [...(z.monsters || [])];
  if (z.boss && !monsterIds.includes(z.boss)) monsterIds.push(z.boss);

  const curDiff = MonsterAIEngine.getDifficulty(state) || { color: '#10b981', icon: '🟢', name: '一般', xpMult: 1, dropMult: 1 };
  const monsterHtml = monsterIds.map(mId => {
    const mon = MONSTERS[mId];
    if (!mon) return '';
    const badge = mon.boss ? '<span class="z-badge boss">★ 首領</span>' : (mon.elite ? '<span class="z-badge elite">⚔ 菁英</span>' : '');
    const mLvl = mon.lvl || z.level || 1;
    const archKey = mon.archetype || MonsterAIEngine.getMonsterArchetype(mon);
    const arch = ARCHETYPE_INFO[archKey] || ARCHETYPE_INFO.berserker;
    const archBadge = `<span class="z-badge arch" style="background:${arch.bg}; color:${arch.color}; border:1px solid ${arch.border}; padding:1px 5px; border-radius:3px; font-size:10px; margin-left:4px;" title="${arch.desc}">${arch.icon} ${arch.label}</span>`;
    return `
      <div class="z-mon-item">
        <span class="z-mon-name"><span class="z-mon-lvl">等級 ${mLvl}</span> ${mon.name || '未知怪物'} ${badge} ${archBadge}</span>
        <span class="z-mon-stats">❤️ 生命值 ${(mon.hp || 0).toLocaleString()}｜⚔️ 攻擊 ${mon.atk || 0}</span>
      </div>
    `;
  }).filter(Boolean).join('');

  // Drop Items preview
  const equipDrops = (D().MONSTER_DROPS && D().MONSTER_DROPS[zoneId]) || [];
  const matDrops = (D().ZONE_CONSUMABLES && D().ZONE_CONSUMABLES[zoneId]) || [];
  const allDropIds = [...new Set([...equipDrops, ...matDrops])];

  const dropsHtml = allDropIds.map(id => {
    const def = (typeof getItemDef === 'function' ? getItemDef(id) : null) || (D().ALL_ITEMS ? D().ALL_ITEMS[id] : null);
    const name = def?.name || id;
    const icon = def ? getItemIcon(def) : '📦';
    return `<div class="z-drop-pill" title="${name}">${icon} <span>${name}</span></div>`;
  }).filter(Boolean).join('');

  container.innerHTML = `
    <div class="z-card-header">
      <div class="z-card-title">
        <h3>🗺️ ${z.name}</h3>
        <span class="z-card-req">需求：等級 ${z.level}</span>
        <div style="margin-top:4px; font-size:11px; color:${curDiff.color || '#10b981'}; font-weight:bold;">
          ${curDiff.icon || '🟢'} 難度：<strong>${curDiff.name || '一般'}</strong>（${curDiff.xpMult || 1} 倍經驗值／金幣 · ${curDiff.dropMult || 1} 倍掉落）
        </div>
      </div>
      <div class="z-card-kills">⚔️ 狩獵：${currentKills}/50（首領）</div>
    </div>

    <div class="z-card-body">
      <div class="z-card-sec">
        <h4>👹 區域怪物</h4>
        <div class="z-mon-list">${monsterHtml || '<p class="z-empty">尚未登錄任何怪物。</p>'}</div>
      </div>

      <div class="z-card-sec">
        <h4>🎁 可能掉落</h4>
        <div class="z-drops-grid">${dropsHtml || '<p class="z-empty">目前沒有掉落預覽。</p>'}</div>
      </div>
    </div>
  `;
}




function updateRaidUI() {
  updateRaidsUI();
}

function startRaidBoss(raidId) {
  return serviceStartRaidBoss(state, raidId, { log, el, renderStageMonster, attackMonster });
}


function updateRaceClassUI() {
  const display = el('hero-race-class-display');
  const raceObj = RACES[state.race];
  const clsObj = getClass(state.class);
  const rName = raceObj ? raceObj.name : (state.race || '人類');
  const cName = clsObj ? clsObj.name : (state.class || '戰士');
  if (display) {
    display.textContent = `${rName} · ${cName}（等級 ${state.level}）`;
  }
  const _rcEl = el('race-text'); if (_rcEl) _rcEl.textContent = rName;
  const _clsEl = el('class-text'); if (_clsEl) _clsEl.textContent = cName;
  renderStageHero(); updateSkillUI(); checkClassAdvancement();
}

function updateClock() {
  const now = Date.now();
  const startTime = Number(state.startTime) || now;
  const totalPlaytime = Number(state.totalPlaytime) || 0;
  const elapsed = Math.max(0, Math.floor((now - startTime + totalPlaytime) / 1000));
  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;
  const _ck = el('clock');
  if (_ck) _ck.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function updateGameModeUI() {
  const switchEl = el('game-mode-switch');
  const currentEl = el('game-mode-current');
  const gameEl = el('game');
  const currentMode = state.gameMode === 'arena' ? 'arena' : state.gameMode === 'pixel2d' ? 'pixel2d' : 'idle';
  if (currentEl) currentEl.textContent = currentMode === 'arena' ? '3D 競技場' : currentMode === 'pixel2d' ? '亞丁像素 2D' : '放置模式';
  if (switchEl) switchEl.classList.toggle('arena', currentMode === 'arena');
  if (gameEl) {
    gameEl.classList.remove('mode-idle', 'mode-arena', 'mode-pixel2d');
    gameEl.classList.add(`mode-${currentMode}`);
  }
  qsa('.mode-option').forEach(btn => {
    const active = btn.dataset.mode === currentMode;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function setGameMode(mode) {
  const nextMode = mode === 'arena' ? 'arena' : mode === 'pixel2d' ? 'pixel2d' : 'idle';
  state.gameMode = nextMode;
  updateGameModeUI();
  const label = nextMode === 'arena' ? '⚔ 3D 競技場' : nextMode === 'pixel2d' ? '👾 亞丁像素 2D' : '📜 放置編年史';
  log(`遊戲模式已切換為 ${label}。`, 'system');
  save();
  if (typeof window !== 'undefined' && typeof window.onReactSetMode === 'function') {
    window.onReactSetMode(nextMode);
  }
}

function closeGameModeMenu() {
  const switchEl = el('game-mode-switch');
  if (switchEl) {
    switchEl.classList.remove('open');
    switchEl.setAttribute('aria-expanded', 'false');
  }
}

function toggleGameModeMenu() {
  const switchEl = el('game-mode-switch');
  if (!switchEl) return;
  const willOpen = !switchEl.classList.contains('open');
  switchEl.classList.toggle('open', willOpen);
  switchEl.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
}

// Inicializa listeners do Seletor de Modo 3D / Idle (uma única vez no carregamento)
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const switchEl = el('game-mode-switch');
    if (switchEl) {
      switchEl.onclick = (e) => {
        e.stopPropagation();
        toggleGameModeMenu();
      };
    }

    qsa('.mode-option').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const targetMode = btn.dataset.mode || 'idle';
        setGameMode(targetMode);
        closeGameModeMenu();
      };
    });

    document.addEventListener('click', (e) => {
      const switchEl = el('game-mode-switch');
      if (switchEl && switchEl.classList.contains('open') && !switchEl.contains(e.target)) {
        closeGameModeMenu();
      }
    });

    // PWA Install Prompt Listener
    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      const installBtn = document.getElementById('btn-pwa-install');
      if (installBtn) installBtn.style.display = 'inline-flex';
    });

    window.installPwaApp = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('[PWA] Escolha de instalação:', outcome);
        deferredPrompt = null;
        const installBtn = document.getElementById('btn-pwa-install');
        if (installBtn) installBtn.style.display = 'none';
      } else {
        alert('要在手機安裝亞丁競技場：\n\n• Chrome（Android）：點右上角三個點，選擇「安裝應用程式」\n• Safari（iOS）：點「分享」按鈕，再選擇「加入主畫面」📲');
      }
    };
  });
}

// QUEST_DEFS, BATTLE_PASS_TIERS e PASS_DEFS foram movidos para src/data/quests.js (Sprint 1)
// Os imports estão no topo do arquivo.


function checkQuestResets() {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const ONE_WEEK = 7 * ONE_DAY;

  if (!state.quests) {
    state.quests = { progress: {}, claimed: [], lastDailyReset: now, lastWeeklyReset: now };
  }
  if (!state.quests.progress || typeof state.quests.progress !== 'object') state.quests.progress = {};
  if (!Array.isArray(state.quests.claimed)) state.quests.claimed = [];
  if (state.quests.dailyBonusClaimed === undefined) state.quests.dailyBonusClaimed = false;

  if (!state.quests.lastDailyReset || (now - state.quests.lastDailyReset) >= ONE_DAY) {
    state.quests.lastDailyReset = now;
    QUEST_DEFS.daily.forEach(q => {
      delete state.quests.progress[q.id];
      state.quests.claimed = state.quests.claimed.filter(id => id !== q.id);
    });
    log('📜 每日任務已更新！', 'rarity-legendary');
  }

  if (!state.quests.lastWeeklyReset || (now - state.quests.lastWeeklyReset) >= ONE_WEEK) {
    state.quests.lastWeeklyReset = now;
    QUEST_DEFS.weekly.forEach(q => {
      delete state.quests.progress[q.id];
      state.quests.claimed = state.quests.claimed.filter(id => id !== q.id);
    });
    log('📅 每週任務已更新！', 'rarity-legendary');
  }
}

// PASS_DEFS imported from src/data/quests.js

function checkDailyReset() { checkQuestResets(); }
function checkQuestProgress(type, count = 1) { triggerQuestEvent(type, count); }

function triggerQuestEvent(type, amount = 1) {
  serviceTriggerQuestEvent(state, type, amount);
  safeUiUpdate('quests', updateQuestsUI);
}
function claimQuestReward(questId) {
  return serviceClaimQuestReward(state, questId, { log, floatText, updateAllUI, save });
}
function claimPassReward(level, type = 'free') {
  return serviceClaimPassReward(state, level, type, { log, floatText, updateAllUI, save });
}
function unlockPremiumPass() {
  window.open('https://pay.cakto.com.br/36g8n4b_1054492', '_blank');
}


function updateQuestsUI() {
  checkQuestResets();

  if (!state.quests) state.quests = { progress: {}, claimed: [] };
  if (!state.quests.progress || typeof state.quests.progress !== 'object') state.quests.progress = {};
  if (!Array.isArray(state.quests.claimed)) state.quests.claimed = [];
  if (state.quests.dailyBonusClaimed === undefined) state.quests.dailyBonusClaimed = false;

  const dailyContainer = el('daily-quests-list');
  const weeklyContainer = el('weekly-quests-list');
  const dailyBadge = el('daily-progress-badge');
  const weeklyBadge = el('weekly-progress-badge');

  if (dailyContainer) {
    let dailyClaimedCount = 0;
    const currentLvl = state.level || 1;
    const availableDaily = QUEST_DEFS.daily.filter(q => !q.unlockLevel || q.unlockLevel <= currentLvl);
    const allDailyDone = availableDaily.length > 0 && availableDaily.every(q => Array.isArray(state.quests.claimed) && state.quests.claimed.includes(q.id));
    const isDailyBonusClaimed = Boolean(state.quests.dailyBonusClaimed);

    const cardsHtml = QUEST_DEFS.daily.map(q => {
      const isLocked = q.unlockLevel && currentLvl < q.unlockLevel;
      const rewardsText = [];
      if (q.reward.gold) rewardsText.push(`💰 +${q.reward.gold.toLocaleString()} 金幣`);
      if (q.reward.sp) rewardsText.push(`✦ +${q.reward.sp} 技能點`);
      if (q.reward.craftPoints) rewardsText.push(`⚒️ +${q.reward.craftPoints} 鍛造點數`);
      if (q.reward.magicLamps) rewardsText.push(`🪔 +${q.reward.magicLamps} 神燈`);
      if (q.reward.passXp) rewardsText.push(`🎫 +${q.reward.passXp} 通行證經驗值`);

      if (isLocked) {
        return `
          <div class="quest-card locked" style="opacity:0.6; filter:grayscale(0.5); border:1px dashed rgba(255,255,255,0.15);">
            <div class="quest-info-group">
              <span class="quest-icon">🔒</span>
              <div class="quest-details">
                <span class="quest-name" style="color:#94a3b8;">${q.name} <span style="font-size:10px; color:#f87171; font-weight:bold;">(需要等級 ${q.unlockLevel})</span></span>
                <span class="quest-desc" style="color:#64748b;">${q.desc}</span>
                <div class="quest-rewards-line" style="opacity:0.7;">${rewardsText.join(' · ')}</div>
              </div>
            </div>
            <div class="quest-action-group">
              <span class="quest-progress-num" style="color:#f87171;">已鎖定</span>
              <button class="claim-quest-btn" disabled style="opacity:0.4; cursor:not-allowed;">🔒 等級 ${q.unlockLevel}</button>
            </div>
          </div>
        `;
      }

      const progress = Math.min(q.target, state.quests.progress[q.id] || 0);
      const isCompleted = progress >= q.target;
      const isClaimed = Array.isArray(state.quests.claimed) && state.quests.claimed.includes(q.id);
      if (isClaimed) dailyClaimedCount++;

      const pct = Math.floor((progress / q.target) * 100);
      const cardClass = isClaimed ? 'quest-card completed' : (isCompleted ? 'quest-card can-claim' : 'quest-card');

      const btnLabel = isClaimed ? '✓ 已領取' : (isCompleted ? '🎁 領取' : '進行中');
      const btnDisabled = !isCompleted || isClaimed ? 'disabled' : '';

      return `
        <div class="${cardClass}">
          <div class="quest-info-group">
            <span class="quest-icon">${q.icon}</span>
            <div class="quest-details">
              <span class="quest-name">${q.name}</span>
              <span class="quest-desc">${q.desc}</span>
              <div class="quest-rewards-line">${rewardsText.join(' · ')}</div>
            </div>
          </div>
          <div class="quest-action-group">
            <span class="quest-progress-num">${progress.toLocaleString()} / ${q.target.toLocaleString()} (${pct}%)</span>
            <button class="claim-quest-btn" data-quest="${q.id}" ${btnDisabled}>${btnLabel}</button>
          </div>
        </div>
      `;
    }).join('');

    const grandBonusHtml = `
      <div class="grand-daily-card" style="background:linear-gradient(135deg, rgba(35,25,12,0.95), rgba(18,12,6,0.98)); border:1px solid ${isDailyBonusClaimed ? '#10b981' : (allDailyDone ? '#facc15' : 'rgba(212,167,68,0.3)')}; border-radius:10px; padding:14px 16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; box-shadow:0 4px 15px rgba(0,0,0,0.5);">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="font-size:32px; background:rgba(0,0,0,0.4); border-radius:8px; padding:6px 10px; border:1px solid rgba(212,167,68,0.3);">🎁</div>
          <div>
            <div style="font-family:'Cinzel',serif; font-weight:bold; font-size:14px; color:#ffd877;">
              ${DAILY_COMPLETION_BONUS.name}
            </div>
            <div style="font-size:11px; color:#94a3b8; margin:2px 0 4px 0;">
              完成目前每日狩獵任務（${dailyClaimedCount}/${availableDaily.length}）即可領取最高獎勵。
            </div>
            <div style="font-size:11px; color:#86efac; font-weight:bold;">
              ✦ 額外 +500 技能點 · 💰 +50,000 金幣 · 🪔 +2 魔法神燈 · 🎫 通行證經驗值 +250
            </div>
          </div>
        </div>
        <div>
          ${isDailyBonusClaimed ? `
            <span style="font-size:11px; color:#10b981; font-weight:bold; padding:6px 14px; border:1px solid #10b981; border-radius:6px; background:rgba(16,185,129,0.15);">✓ 今日已領取</span>
          ` : `
            <button id="claim-grand-daily-btn" class="action-btn action-btn--primary" style="padding:8px 18px; font-weight:bold; font-size:12px; ${allDailyDone ? 'background:linear-gradient(180deg,#d4a744,#8a641c); border:1px solid #ffe699; color:#000; box-shadow:0 0 12px rgba(234,179,8,0.5); cursor:pointer;' : 'opacity:0.5; cursor:not-allowed;'}" ${!allDailyDone ? 'disabled' : ''}>
              ${allDailyDone ? '🎁 領取寶箱（+500 技能點）' : `${dailyClaimedCount}/${availableDaily.length} 每日任務`}
            </button>
          `}
        </div>
      </div>
    `;

    dailyContainer.innerHTML = grandBonusHtml + cardsHtml;

    if (dailyBadge) dailyBadge.textContent = `${dailyClaimedCount}/${availableDaily.length} 已完成`;

    dailyContainer.querySelectorAll('[data-quest]').forEach(btn => {
      btn.onclick = () => claimQuestReward(btn.dataset.quest);
    });

    const grandBtn = dailyContainer.querySelector('#claim-grand-daily-btn');
    if (grandBtn && allDailyDone && !isDailyBonusClaimed) {
      grandBtn.onclick = () => {
        serviceClaimDailyBonusChest(state, { log, floatText, updateAllUI, save });
      };
    }
  }

  if (weeklyContainer) {
    let weeklyClaimedCount = 0;
    weeklyContainer.innerHTML = QUEST_DEFS.weekly.map(q => {
      const progress = Math.min(q.target, state.quests.progress[q.id] || 0);
      const isCompleted = progress >= q.target;
      const isClaimed = Array.isArray(state.quests.claimed) && state.quests.claimed.includes(q.id);
      if (isClaimed) weeklyClaimedCount++;

      const pct = Math.floor((progress / q.target) * 100);
      const cardClass = isClaimed ? 'quest-card completed' : (isCompleted ? 'quest-card can-claim' : 'quest-card');

      const rewardsText = [];
      if (q.reward.gold) rewardsText.push(`💰 +${q.reward.gold.toLocaleString()} 金幣`);
      if (q.reward.sp) rewardsText.push(`✦ +${q.reward.sp} 技能點`);
      if (q.reward.magicLamps) rewardsText.push(`🪔 +${q.reward.magicLamps} 魔法神燈`);
      if (q.reward.passXp) rewardsText.push(`🎫 +${q.reward.passXp} 通行證經驗值`);

      const btnLabel = isClaimed ? '✓ 已領取' : (isCompleted ? '🎁 領取' : '進行中');
      const btnDisabled = !isCompleted || isClaimed ? 'disabled' : '';

      return `
        <div class="${cardClass}">
          <div class="quest-info-group">
            <span class="quest-icon">${q.icon}</span>
            <div class="quest-details">
              <span class="quest-name">${q.name}</span>
              <span class="quest-desc">${q.desc}</span>
              <div class="quest-rewards-line">${rewardsText.join(' · ')}</div>
            </div>
          </div>
          <div class="quest-action-group">
            <span class="quest-progress-num">${progress.toLocaleString()} / ${q.target.toLocaleString()} (${pct}%)</span>
            <button class="claim-quest-btn" data-quest="${q.id}" ${btnDisabled}>${btnLabel}</button>
          </div>
        </div>
      `;
    }).join('');

    if (weeklyBadge) weeklyBadge.textContent = `${weeklyClaimedCount}/${QUEST_DEFS.weekly.length} 已完成`;

    weeklyContainer.querySelectorAll('[data-quest]').forEach(btn => {
      btn.onclick = () => claimQuestReward(btn.dataset.quest);
    });
  }

  renderBattlePassUI();
}

function renderBattlePassUI() {
  if (!state.battlePass || typeof state.battlePass !== 'object') state.battlePass = {};
  if (!Array.isArray(state.battlePass.claimedFree)) state.battlePass.claimedFree = [];
  if (!Array.isArray(state.battlePass.claimedPremium)) state.battlePass.claimedPremium = [];
  if (state.battlePass.unlockedPremium === undefined) state.battlePass.unlockedPremium = false;
  if (typeof state.battlePass.xp !== 'number') state.battlePass.xp = 0;

  const currentXp = state.battlePass.xp || 0;
  let currentLvl = 1;
  let currentTier = BATTLE_PASS_TIERS[0];
  for (let i = BATTLE_PASS_TIERS.length - 1; i >= 0; i--) {
    if (currentXp >= BATTLE_PASS_TIERS[i].reqXp) {
      currentLvl = BATTLE_PASS_TIERS[i].level;
      currentTier = BATTLE_PASS_TIERS[i];
      break;
    }
  }

  const nextTierIndex = BATTLE_PASS_TIERS.findIndex(t => t.level === currentLvl + 1);
  const nextReqXp = nextTierIndex !== -1 ? BATTLE_PASS_TIERS[nextTierIndex].reqXp : currentTier.reqXp;
  const prevReqXp = currentTier.reqXp;
  const pct = nextTierIndex !== -1 ? Math.min(100, Math.floor(((currentXp - prevReqXp) / Math.max(1, nextReqXp - prevReqXp)) * 100)) : 100;

  const lvlText = el('pass-level-text');
  if (lvlText) lvlText.textContent = `等級 ${currentLvl}`;

  const statusText = el('pass-status-text');
  if (statusText) statusText.textContent = state.battlePass.unlockedPremium ? '👑 高級通行證已啟用' : '戰鬥通行證免費獎勵';

  const xpText = el('pass-xp-text');
  if (xpText) xpText.textContent = `${currentXp.toLocaleString()} / ${nextReqXp.toLocaleString()} 通行證經驗值`;

  const xpBar = el('pass-xp-bar');
  if (xpBar) xpBar.style.width = `${pct}%`;

  const unlockBtn = el('unlock-premium-pass-btn');
  if (unlockBtn) {
    if (state.battlePass.unlockedPremium) {
      unlockBtn.textContent = '👑 高級通行證已啟用';
      unlockBtn.disabled = true;
      unlockBtn.style.opacity = '0.7';
    } else {
      unlockBtn.textContent = '👑 取得高級通行證（R$ 15.00）';
      unlockBtn.disabled = false;
      unlockBtn.onclick = () => {
        window.open('https://pay.cakto.com.br/36g8n4b_1054492', '_blank');
      };
    }
  }

  const trackList = el('pass-track-list');
  if (trackList) {
    trackList.innerHTML = BATTLE_PASS_TIERS.map(tier => {
      const isUnlocked = currentXp >= tier.reqXp;
      const freeClaimed = Array.isArray(state.battlePass.claimedFree) && state.battlePass.claimedFree.includes(tier.level);
      const premClaimed = Array.isArray(state.battlePass.claimedPremium) && state.battlePass.claimedPremium.includes(tier.level);

      const freeLabel = freeClaimed ? '✓' : (isUnlocked ? '領取' : '已鎖定');
      const premLabel = premClaimed ? '✓' : (isUnlocked && state.battlePass.unlockedPremium ? '領取' : (state.battlePass.unlockedPremium ? '已鎖定' : '👑 R$ 15'));

      const freeRewardStr = Object.entries(tier.free).map(([k, v]) => `${k === 'gold' ? '💰 ' + v : k === 'sp' ? '✦ ' + v : v}`).join(', ');
      const premRewardStr = Object.entries(tier.premium).map(([k, v]) => `${k === 'gold' ? '💰 ' + v : k === 'title' ? '🏷️ ' + v : v}`).join(', ');

      return `
        <div class="pass-tier-card ${isUnlocked ? 'unlocked' : ''}">
          <span class="pass-tier-lvl">等級 ${tier.level}</span>
          <div class="pass-reward-box">
            <span style="font-weight:bold;color:var(--gilt);">免費</span><br/>
            <span>${freeRewardStr}</span><br/>
            <button class="inv-batch-btn" data-pass-free="${tier.level}" ${!isUnlocked || freeClaimed ? 'disabled' : ''} style="margin-top:4px;font-size:9px;">${freeLabel}</button>
          </div>
          <div class="pass-reward-box premium">
            <span style="font-weight:bold;color:#fef08a;">👑 高級</span><br/>
            <span>${premRewardStr}</span><br/>
            <button class="inv-batch-btn gold-glow-btn" data-pass-prem="${tier.level}" ${premClaimed ? 'disabled' : ''} style="margin-top:4px;font-size:9px;">${premLabel}</button>
          </div>
        </div>
      `;
    }).join('');

    trackList.querySelectorAll('[data-pass-free]').forEach(btn => {
      btn.onclick = () => claimPassReward(Number(btn.dataset.passFree), 'free');
    });
    trackList.querySelectorAll('[data-pass-prem]').forEach(btn => {
      btn.onclick = () => {
        if (!state.battlePass.unlockedPremium) {
          window.open('https://pay.cakto.com.br/36g8n4b_1054492', '_blank');
          return;
        }
        claimPassReward(Number(btn.dataset.passPrem), 'premium');
      };
    });
  }
}

// --------------------------- TOWER OF INSOLENCE ---------------------------
function challengeTowerFloor() {
  triggerQuestEvent('tower', 1);
  return serviceChallengeTowerFloor(state, { log, floatText, el, renderStageMonster, attackMonster });
}
function onTowerFloorVictory(floorNum) {
  triggerQuestEvent('tower', 1);
  return serviceCompleteTowerFloor(state, floorNum, { log, floatText, updateAllUI, save });
}
function sweepTowerDaily() {
  triggerQuestEvent('tower', 1);
  return serviceSweepTowerDaily(state, { log, floatText, updateAllUI, save });
}


function updateTowerUI() {
  if (!state.tower) state.tower = { highestFloor: 0, currentFloor: 1, lastSweepTime: 0 };
  const highest = state.tower.highestFloor || 0;
  const nextFloor = Math.min(100, highest + 1);

  const highestText = el('tower-highest-floor-text');
  if (highestText) highestText.textContent = `目前樓層：${highest} / 100`;

  const bonusText = el('tower-bonus-text');
  if (bonusText) bonusText.textContent = `啟用中的被動加成：+${highest}% 攻擊、防禦與魔法攻擊`;

  const nextNumText = el('tower-next-floor-num');
  if (nextNumText) nextNumText.textContent = `${nextFloor}`;

  const challengeBtn = el('tower-challenge-btn');
  if (challengeBtn) {
    if (highest >= 100) {
      challengeBtn.textContent = '🏆 高塔 100% 完成';
      challengeBtn.disabled = true;
    } else {
      challengeBtn.textContent = `⚔️ 挑戰第 ${nextFloor} 層`;
      challengeBtn.disabled = false;
      challengeBtn.onclick = () => challengeTowerFloor();
    }
  }

  const sweepBtn = el('tower-sweep-btn');
  if (sweepBtn) {
    const now = Date.now();
    const isSweepAvailable = highest >= 1 && (!state.tower.lastSweepTime || (now - state.tower.lastSweepTime) >= (24 * 60 * 60 * 1000));
    sweepBtn.disabled = !isSweepAvailable;
    sweepBtn.onclick = () => sweepTowerDaily();
  }

  const nextDef = getTowerFloorDef(nextFloor);
  const recommendEl = el('tower-floor-recommend');
  if (recommendEl) recommendEl.textContent = `需求等級：${nextDef.reqLvl}`;

  const detailsCard = el('tower-floor-details-card');
  if (detailsCard) {
    const rewardsStr = [];
    rewardsStr.push(`💰 +${nextDef.gold.toLocaleString()} 金幣`);
    rewardsStr.push(`✦ +${nextDef.sp} 技能點`);
    if (nextDef.rewardLamps > 0) rewardsStr.push(`🪔 +${nextDef.rewardLamps} 魔法神燈`);
    if (nextDef.rewardCrystals) rewardsStr.push(`✨ +3× ${D().ALL_ITEMS[nextDef.rewardCrystals]?.name || nextDef.rewardCrystals}`);

    detailsCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-weight:bold; font-size:13px; color:var(--gilt-bright);">${nextDef.name}</span>
        <span style="font-size:11px; color:#fb7185;">生命值：${nextDef.hp.toLocaleString()} · 攻擊：${nextDef.atk.toLocaleString()}</span>
      </div>
      <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">首次擊殺獎勵：${rewardsStr.join(' · ')}</div>
    `;
  }

  const grid = el('tower-floors-grid');
  if (grid) {
    let html = '';
    for (let f = 1; f <= 100; f++) {
      const isCleared = f <= highest;
      const isCurrent = f === nextFloor;
      const isBoss = f % 10 === 0;

      let cls = 'tower-floor-pill';
      if (isCleared) cls += ' cleared';
      else if (isCurrent) cls += ' current';
      if (isBoss) cls += ' boss-floor';

      html += `<div class="${cls}"><span>${isBoss ? '👑' : '🏰'} 第 ${f} 層</span><span style="font-size:9px;opacity:0.8;">${isCleared ? '✓ 已通關' : (isCurrent ? '★ 挑戰' : `等級 ${getTowerFloorDef(f).reqLvl}`)}</span></div>`;
    }
    grid.innerHTML = html;
  }
}

function hasEquipmentUpgradeAvailable() {
  if (!state.inventory) return false;
  for (const item of state.inventory) {
    if (item.equipped) continue;
    const def = D().ALL_ITEMS[item.itemId];
    if (!def) continue;
    const slot = resolveEquipSlot(def.slot);
    if (!slot || !ALL_EQUIP_SLOTS.includes(slot)) continue;
    const equippedUid = state.equipment[slot];
    const equippedItem = equippedUid ? state.inventory.find(i => i.uid === equippedUid) : null;
    const equippedDef = equippedItem ? D().ALL_ITEMS[equippedItem.itemId] : null;
    const itemPower = (def.stats?.atk || 0) + (def.stats?.def || 0) + (def.stats?.matk || 0) + (def.stats?.mdef || 0);
    const eqPower = equippedDef ? ((equippedDef.stats?.atk || 0) + (equippedDef.stats?.def || 0) + (equippedDef.stats?.matk || 0) + (equippedDef.stats?.mdef || 0)) : 0;
    if (itemPower > eqPower) return true;
  }
  return false;
}

function hasSkillUpgradeAvailable() {
  if (state.sp < 10) return false;
  for (const [sId, def] of Object.entries(SKILL_DEFS)) {
    if (!classSatisfies(state.class, def.classReq)) continue;
    const lvl = state.skills[sId] || 0;
    const maxLvl = def.max || 10;
    if (lvl >= maxLvl) continue;
    const cost = getSkillCost(sId, lvl);
    if (state.sp >= cost) return true;
  }
  return false;
}

function hasCraftAvailable() {
  const recipesData = D().CRAFTING_RECIPES;
  if (!recipesData) return false;
  const recipesList = Array.isArray(recipesData) ? recipesData : Object.values(recipesData);
  for (const recipe of recipesList) {
    if (!recipe) continue;
    const mats = getRecipeMaterials(recipe);
    if (mats.length === 0) continue;
    let canCraftThis = true;
    for (const { matId, qty } of mats) {
      if (getInventoryCount(matId) < qty) {
        canCraftThis = false;
        break;
      }
    }
    if (canCraftThis) return true;
  }
  return false;
}

function hasQuestsClaimable() {
  if (!state.quests || !state.quests.progress) return false;
  if (typeof QUEST_DEFS === 'undefined') return false;
  const allQuests = [...(QUEST_DEFS.daily || []), ...(QUEST_DEFS.weekly || [])];
  for (const qDef of allQuests) {
    if (state.quests.claimed && state.quests.claimed.includes(qDef.id)) continue;
    const current = state.quests.progress[qDef.id] || 0;
    if (current >= qDef.target) return true;
  }
  return false;
}

function updateTabBadgesUI() {
  const invBadge = el('tab-badge-inventory');
  if (invBadge) invBadge.style.display = hasEquipmentUpgradeAvailable() ? 'inline-flex' : 'none';
  
  const skillBadge = el('tab-badge-skills');
  if (skillBadge) skillBadge.style.display = hasSkillUpgradeAvailable() ? 'inline-flex' : 'none';
  
  const craftBadge = el('tab-badge-craft');
  if (craftBadge) craftBadge.style.display = hasCraftAvailable() ? 'inline-flex' : 'none';
  
  const questBadge = el('tab-badge-quests');
  if (questBadge) questBadge.style.display = hasQuestsClaimable() ? 'inline-flex' : 'none';

  updateSeasonTabBadges(ROOT);
}

function updateAlchemyUI() {
  uiRenderAlchemyUI(state);
}

function updateAstralUI() {
  uiRenderAstralMasteryUI(state);
}

function updateExpeditionsUI() {
  uiRenderExpeditionsUI(state);
}

function updateFishingUI() {
  renderFishingUI(state);
}

function updateHuntingUI() {
  renderHuntingUI(state);
}

function updateGatheringUI() {
  renderGatheringUI(state);
}

function updateMiningUI() {
  renderMiningUI(state);
}

function updateRaidsUI() {
  const pane = el('tab-raids');
  if (pane) uiRenderRaidsTab(pane, state);
}

function updateOlympiadUI() {
  const pane = el('tab-olympiad');
  if (pane) uiRenderOlympiadTab(pane, state);
}

function updateClanUI() {
  const pane = el('tab-clan');
  if (pane) uiRenderClanTab(pane, state);
}

function updateSevenSignsUI() {
  const pane = el('tab-sevensigns');
  if (pane) uiRenderSevenSignsTab(pane, state);
}

function updateFortressUI() {
  const pane = el('tab-fortress');
  if (pane) uiRenderFortressTab(pane, state);
}

function updateColosseumUI() {
  const pane = el('tab-colosseum');
  if (pane) uiRenderColosseumTab(pane, state);
}

function updateMarketUI() {
  const pane = el('tab-market');
  if (pane && !pane.hidden) {
    uiRenderMarketTab(pane, state, { log, updateAllUI, save });
  }
}

function updateRankingsUI() {
  const pane = el('tab-rankings');
  if (pane) uiRenderRankingTab(pane, state);
}

function updateCosmeticsUI() {
  const pane = el('tab-cosmetics');
  if (pane) uiRenderCosmeticsTab(pane, state);
}
window.updateCosmeticsUI = updateCosmeticsUI;

let _uiUpdateRafId = null;
function updateAllUI(immediate = false) {
  // 1. Atualizações instantâneas e leves de números para feedback imediato ao clique
  try {
    const root = ROOT || (typeof document !== 'undefined' ? document : null);
    if (root) {
      const g1 = root.querySelector('#gold-count'); if (g1) g1.textContent = (state.gold || 0).toLocaleString();
      const g2 = root.querySelector('#shop-gold'); if (g2) g2.textContent = (state.gold || 0).toLocaleString();
      const spEl = root.querySelector('#sp-count'); if (spEl) spEl.textContent = (state.sp || 0).toLocaleString();
    }
  } catch (e) {}

  // 2. Se for update imediato (ex: troca de aba ou inicialização), executa agora
  if (immediate) {
    if (_uiUpdateRafId) {
      if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(_uiUpdateRafId);
      _uiUpdateRafId = null;
    }
    _performFullUIUpdate();
    return;
  }

  // 3. Batching via requestAnimationFrame: se já há uma renderização agendada, não enfileira outra
  if (_uiUpdateRafId) return;

  const scheduleFn = (typeof requestAnimationFrame === 'function')
    ? requestAnimationFrame
    : (cb) => setTimeout(cb, 16);

  _uiUpdateRafId = scheduleFn(() => {
    _uiUpdateRafId = null;
    _performFullUIUpdate();
  });
}



function updateWorldBossBadgeUI() {
  try {
    const badge = el('worldboss-top-badge');
    if (badge && WorldBossService) {
      const status = WorldBossService.getStatus();
      if (status.isActive) {
        badge.innerHTML = `🚨 <strong>${status.currentBoss.name}</strong> (${status.timeFormatted})`;
        badge.style.background = 'rgba(220,38,38,0.5)';
        badge.style.borderColor = '#ef4444';
        badge.style.color = '#fee2e2';
      } else {
        badge.innerHTML = `⏳ 世界首領：${status.timeFormatted}`;
        badge.style.background = 'rgba(30,41,59,0.5)';
        badge.style.borderColor = 'rgba(255,255,255,0.2)';
        badge.style.color = '#94a3b8';
      }
    }
  } catch (e) {}
}

function updateLiveOpsUI() {
  try {
    const badge = el('liveops-event-badge');
    if (badge && LiveOpsService) {
      const evt = LiveOpsService.getActiveEvent();
      badge.textContent = `${evt.icon} ${evt.badge}`;
      badge.title = evt.desc;
    }
    const dot = el('starter-journey-dot');
    if (dot && StarterJourneyService) {
      const status = StarterJourneyService.getJourneyStatus(state);
      const hasClaimable = status.steps.some(s => s.canClaim);
      dot.style.display = hasClaimable ? 'block' : 'none';
    }
  } catch (e) {}
}

function _performFullUIUpdate() {
  state = getState();
  uiInitTooltipEvents();
  updateGameModeUI();
  try { FortressService.updateProductionTick(state); } catch (e) {}
  try { if (FishingService && state.fishing?.autoFishing) FishingService.processAutoFish(state, { log, updateAllUI: () => {}, save, floatText }); } catch (e) {}
  try { if (HuntingService && state.hunting?.autoHunting) HuntingService.processAutoHunt(state, { log, updateAllUI: () => {}, save, floatText }); } catch (e) {}
  try { if (GatheringService && state.gathering?.autoGathering) GatheringService.processAutoGather(state, { log, updateAllUI: () => {}, save, floatText }); } catch (e) {}
  try { if (MiningService && state.mining?.autoMining) MiningService.processAutoMine(state, { log, updateAllUI: () => {}, save, floatText }); } catch (e) {}

  // Fast core components (always update on action)
  safeUiUpdate('stats', updateStatsUI);
  safeUiUpdate('equipment', updateEquipmentUI);
  safeUiUpdate('inventory', updateInventoryUI);
  safeUiUpdate('equip-stats', updateDetailedEquipStatsUI);
  safeUiUpdate('character', updateCharacterUI);
  safeUiUpdate('combat-controls', updateCombatControlsUI);
  safeUiUpdate('tab-badges', updateTabBadgesUI);
  safeUiUpdate('tab-caps', () => updateTabVisibilityByLevel(state));
  safeUiUpdate('class-advancement', checkClassAdvancement);

  // Sync Admin Top Button visibility - STRICTLY restricted to authorized admins
  const adminBtn = el('admin-top-btn');
  if (adminBtn) {
    adminBtn.style.display = isAuthorizedAdmin() ? 'inline-flex' : 'none';
  }

  // Tab-specific heavy updates (only rendered if tab is currently active/visible)
  const isTabVisible = (panelId) => {
    const root = ROOT || (typeof document !== 'undefined' ? document : null);
    if (!root) return false;
    const pane = root.querySelector(`#tab-${panelId}, [data-menu-panel="${panelId}"], .tab-${panelId}, [data-tab-content="${panelId}"]`);
    if (!pane) return false;
    return pane.classList.contains('active') || pane.classList.contains('is-active') || (!pane.hidden && pane.offsetWidth > 0);
  };

  if (isTabVisible('skills')) safeUiUpdate('skills', updateSkillUI);
  if (isTabVisible('shop')) safeUiUpdate('shop', updateShopUI);
  if (isTabVisible('craft')) safeUiUpdate('craft', updateCraftUI);
  if (isTabVisible('alchemy')) safeUiUpdate('alchemy', updateAlchemyUI);
  if (isTabVisible('astral')) safeUiUpdate('astral', updateAstralUI);
  if (isTabVisible('expeditions')) safeUiUpdate('expeditions', updateExpeditionsUI);
  if (isTabVisible('fishing')) safeUiUpdate('fishing', updateFishingUI);
  if (isTabVisible('hunting')) safeUiUpdate('hunting', updateHuntingUI);
  if (isTabVisible('gathering')) safeUiUpdate('gathering', updateGatheringUI);
  if (isTabVisible('mining')) safeUiUpdate('mining', updateMiningUI);
  if (isTabVisible('raids')) safeUiUpdate('raids', updateRaidsUI);
  if (isTabVisible('olympiad')) safeUiUpdate('olympiad', updateOlympiadUI);
  if (isTabVisible('clan')) safeUiUpdate('clan', updateClanUI);
  if (isTabVisible('sevensigns')) safeUiUpdate('sevensigns', updateSevenSignsUI);
  if (isTabVisible('fortress')) safeUiUpdate('fortress', updateFortressUI);
  if (isTabVisible('colosseum')) safeUiUpdate('colosseum', updateColosseumUI);
  if (isTabVisible('market')) safeUiUpdate('market', updateMarketUI);
  if (isTabVisible('rankings')) safeUiUpdate('rankings', updateRankingsUI);
  if (isTabVisible('cosmetics')) safeUiUpdate('cosmetics', updateCosmeticsUI);
  safeUiUpdate('liveops', updateLiveOpsUI);
  safeUiUpdate('worldboss', updateWorldBossBadgeUI);
  safeUiUpdate('zone-bg', updateZoneBackground);
  safeUiUpdate('zone', updateZoneUI);
  if (isTabVisible('zone') || isTabVisible('zones')) {
    safeUiUpdate('zone-map', renderZoneMap);
  }
  if (isTabVisible('race-class')) safeUiUpdate('race-class', updateRaceClassUI);
  if (isTabVisible('subclasses')) safeUiUpdate('subclasses', renderSubclassesUI);
  if (isTabVisible('quests')) safeUiUpdate('quests', updateQuestsUI);
  if (isTabVisible('tower')) safeUiUpdate('tower', updateTowerUI);
  if (isTabVisible('warehouse')) safeUiUpdate('warehouse', updateWarehouseUI);
  if (isTabVisible('magiclamp')) safeUiUpdate('magiclamp', updateMagicLampUI);

  setupVfxQualityControl();
}

function completeFateWhisperQuest() {
  const activeMainLevel = state.activeSubclassIndex === null ? state.level : (state.mainClassData?.level || 1);
  if (activeMainLevel < 52) {
    log('⚠️ 主職業需要達到 52 級才能完成「命運的低語」任務！', 'warning');
    return false;
  }
  state.fateWhisperQuest = true;
  log('📜 「命運的低語」任務完成！副職業已解鎖！', 'rarity-legendary');
  floatText('副職業已解鎖！', 'float-gold');
  updateAllUI(); save();
  return true;
}

function selectMasterAbilityModal() {
  const abilities = [
    { key: 'boostHp', name: '❤️ 生命值強化（+8% 生命值、+20% 生命值回復）' },
    { key: 'boostMp', name: '💙 魔力強化（+12% 魔力、+20% 魔力回復）' },
    { key: 'evasion', name: '👟 迴避（+5 迴避）' },
    { key: 'haste', name: '⚡ 急速觸發（+32% 攻擊速度）' },
    { key: 'barrier', name: '🌟 屏障（無敵天界護盾）' },
    { key: 'boostCp', name: '🛡️ 戰鬥力強化（+20% 戰鬥力）' },
    { key: 'resistAttribute', name: '🔥 屬性抗性（+20 元素抗性）' }
  ];

  const choice = prompt(`選擇你的大師技能（等級 75）：\n\n${abilities.map((a, i) => `${i + 1}. ${a.name}`).join('\n')}\n\n請輸入選項編號：`);
  if (!choice) return;
  const idx = parseInt(choice, 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= abilities.length) return;

  const selectedKey = abilities[idx].key;
  if (!state.masterAbilities) state.masterAbilities = [];
  if (!state.masterAbilities.includes(selectedKey)) {
    state.masterAbilities.push(selectedKey);
  }
  log(`🏆 已學會大師技能 **${abilities[idx].name.toUpperCase()}**！`, 'rarity-legendary');
  floatText('大師能力已學習！', 'float-gold');
  updateAllUI(); save();
}

function selectDivineTransformationModal() {
  const transList = [
    { key: 'divineWarrior', name: '⚔️ 神聖戰士（戰吼：物理攻擊 +25%、音速爆擊）' },
    { key: 'divineKnight', name: '🛡️ 神聖騎士（終極防禦：防禦 +100%、仇恨光環）' },
    { key: 'divineRogue', name: '🗡️ 神聖遊俠（暈眩射擊、雙重射擊、迴避 +4）' },
    { key: 'divineWizard', name: '🔮 神聖巫師（神聖閃焰、神聖打擊、範圍睡眠）' },
    { key: 'divineSummoner', name: '🦄 神聖召喚師（傷害轉移、終極召喚獸）' },
    { key: 'divineHealer', name: '🕊️ 神聖治癒師（強效治癒、淨化、70% 復活）' },
    { key: 'divineEnchanter', name: '📜 神聖賦予師（勝利頌歌：全屬性 +10%）' }
  ];

  const choice = prompt(`選擇你的神聖變身（等級 80）：\n\n${transList.map((t, i) => `${i + 1}. ${t.name}`).join('\n')}\n\n請輸入選項編號：`);
  if (!choice) return;
  const idx = parseInt(choice, 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= transList.length) return;

  const selectedKey = transList[idx].key;
  state.activeTransformation = (state.activeTransformation === selectedKey) ? null : selectedKey;

  log(`👼 神聖變身 **${transList[idx].name}** ${state.activeTransformation ? '已啟用' : '已停用'}！`, 'rarity-legendary');
  floatText('神聖變身！', 'float-gold');
  updateAllUI(); save();
}

export function renderSubclassesUI() {
  const container = el('subclass-list-container'); if (!container) return;
  const summaryEl = el('certifications-summary');
  const countBadge = el('subclass-count-badge');
  const addBtn = el('add-subclass-btn');
  const cpBadge = el('cert-total-cp-badge');

  const activeMainLevel = state.activeSubclassIndex === null ? state.level : (state.mainClassData?.level || 1);
  const isSeasonUnlocked = isFeatureUnlocked('subclasses');
  const isUnlocked = isSeasonUnlocked && (state.fateWhisperQuest || activeMainLevel >= 52);

  if (countBadge) {
    countBadge.textContent = !isSeasonUnlocked ? '副職業（第 1／2 季尚未解鎖）' : `副職業（${(state.subclasses || []).length}/3）`;
  }

  if (addBtn) {
    const isMax = (state.subclasses || []).length >= 3;
    addBtn.disabled = isMax || !isSeasonUnlocked || !isUnlocked;
    addBtn.textContent = isMax
      ? '🔒 已達副職業上限（3/3）'
      : (!isSeasonUnlocked
        ? '🔒 未開放：第 3 賽季（第三編年史－七封印）'
        : (!isUnlocked ? '🔒 完成「命運的低語」任務（等級 52）' : '➕ 新增副職業（無種族限制）'));
    addBtn.onclick = () => {
      if (!isSeasonUnlocked) {
        log('副職業系統需要第 3 賽季（第三編年史－七封印）。', 'warning');
      } else if (!state.fateWhisperQuest && activeMainLevel < 52) {
        log('需要等級 52 以上才能開始副職業旅程。', 'system');
      } else if (!state.fateWhisperQuest) {
        completeFateWhisperQuest();
      } else {
        openAddSubclassModal();
      }
    };
  }

  container.innerHTML = '';

  // 1. Card da Classe Principal (Main Class)
  const mainClassId = state.activeSubclassIndex === null ? state.class : (state.mainClassData?.class || 'fighter');
  const isMainActive = state.activeSubclassIndex === null;
  const mainClassDef = getClass(mainClassId);

  const mainCard = mkEl('div');
  mainCard.style.cssText = `border: 1px solid ${isMainActive ? 'var(--gilt-bright)' : 'var(--line)'}; padding: 12px; border-radius: 8px; background: ${isMainActive ? 'rgba(138,106,36,0.25)' : 'rgba(15,20,30,0.8)'}; display:flex; justify-content:space-between; align-items:center; box-shadow:0 2px 8px rgba(0,0,0,0.5);`;
  mainCard.innerHTML = `
    <div>
      <div style="font-weight:bold; color:${isMainActive ? 'var(--gilt-bright)' : 'var(--bone)'}; font-size:13px; display:flex; align-items:center; gap:6px;">
        <span>👑 主職業：</span>
        <span style="color:#fde047;">${mainClassDef?.name || '未知職業'}</span>
        <span style="color:#60a5fa; font-size:11px; background:rgba(96,165,250,0.15); padding:1px 6px; border-radius:4px;">等級 ${activeMainLevel}</span>
      </div>
      <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">主要職業來源－所有副職業認證的永久加成都會累積在此。</div>
    </div>
    <button class="action-btn" style="padding:6px 12px; font-size:11px;" ${isMainActive ? 'disabled' : ''} onclick="switchSubclass(null)">
      ${isMainActive ? '✓ 使用中' : '切換 👑'}
    </button>
  `;
  container.appendChild(mainCard);

  // 2. Cards das Subclasses do Jogador
  (state.subclasses || []).forEach((sub, idx) => {
    const isSubActive = state.activeSubclassIndex === idx;
    const subClassDef = getClass(sub.classId);
    const archetype = SubclassCertificationService.getArchetypeForClass(sub.classId);
    const milestones = SubclassCertificationService.getSubclassMilestones(state, sub.id);

    const card = mkEl('div');
    card.style.cssText = `border: 1px solid ${isSubActive ? '#10b981' : 'var(--line)'}; padding: 12px; border-radius: 8px; background: ${isSubActive ? 'rgba(16,185,129,0.15)' : 'rgba(15,20,30,0.85)'}; display:flex; flex-direction:column; gap:8px; box-shadow:0 2px 8px rgba(0,0,0,0.5);`;

    let milestoneSlotsHtml = '';
    milestones.forEach(m => {
      if (m.isLearned) {
        let optDef = EMERGENT_ABILITIES[m.learnedId];
        if (!optDef) {
          optDef = (MASTER_ABILITIES_BY_ARCHETYPE[archetype] || []).find(a => a.id === m.learnedId);
        }
        if (!optDef) {
          optDef = Object.values(DIVINE_TRANSFORMATIONS).find(d => d.id === m.learnedId);
        }

        const icon = optDef?.icon || '✨';
        const name = optDef?.name || '未知認證';
        milestoneSlotsHtml += `
          <div style="flex:1; min-width:110px; background:rgba(212,175,55,0.15); border:1px solid rgba(212,175,55,0.4); border-radius:6px; padding:6px; font-size:10px; display:flex; flex-direction:column; gap:2px;" title="${optDef?.desc || ''}">
            <div style="color:#fde047; font-weight:bold; display:flex; align-items:center; gap:4px;">
              <span>${icon}</span>
              <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${name}</span>
            </div>
            <div style="color:#94a3b8; font-size:9px;">${m.badge} · <strong style="color:#38bdf8;">+${optDef?.cp || 1500} 戰鬥力</strong></div>
          </div>
        `;
      } else if (m.isUnlocked) {
        milestoneSlotsHtml += `
          <div style="flex:1; min-width:110px; background:rgba(16,185,129,0.15); border:1px dashed #10b981; border-radius:6px; padding:6px; font-size:10px; display:flex; flex-direction:column; justify-content:space-between; gap:4px;">
            <div style="color:#10b981; font-weight:bold;">✨ ${m.badge}</div>
            <button class="action-btn action-btn--primary" style="padding:3px 6px; font-size:9px; font-weight:bold;" onclick="window.openCertificationModal('${sub.id}', '${m.milestoneKey}')">學習 📜</button>
          </div>
        `;
      } else {
        milestoneSlotsHtml += `
          <div style="flex:1; min-width:110px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:6px; font-size:10px; display:flex; flex-direction:column; gap:2px; opacity:0.6;">
            <div style="color:#64748b; font-weight:bold;">🔒 ${m.badge}</div>
            <div style="color:#475569; font-size:9px;">需要等級 ${m.requiredLevel}</div>
          </div>
        `;
      }
    });

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
        <div>
          <div style="font-weight:bold; color:${isSubActive ? '#34d399' : 'var(--bone)'}; font-size:13px; display:flex; align-items:center; gap:6px;">
            <span>⚔️ 副職業 ${idx + 1}：</span>
            <span style="color:#fde047;">${subClassDef?.name || '未知職業'}</span>
            <span style="color:#60a5fa; font-size:11px; background:rgba(96,165,250,0.15); padding:1px 6px; border-radius:4px;">等級 ${sub.level}/85</span>
            <span style="color:#a855f7; font-size:10px; background:rgba(168,85,247,0.15); padding:1px 5px; border-radius:4px; text-transform:uppercase;">${({ warrior: '戰士', knight: '騎士', rogue: '盜賊', wizard: '法師', summoner: '召喚師', healer: '治療師', enchanter: '輔助師' })[archetype] || '戰士'}</span>
          </div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">名匠認證可於等級 65、70、75、80 取得。</div>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="inv-batch-btn" style="padding:4px 8px; font-size:10px;" onclick="window.openResetCertificationsModal('${sub.id}')" title="重新分配此副職業的認證">🔄 重置（1,000,000 金幣）</button>
          <button class="action-btn" style="padding:6px 12px; font-size:11px;" ${isSubActive ? 'disabled' : ''} onclick="switchSubclass(${idx})">
            ${isSubActive ? '✓ 使用中' : '切換 ⚔️'}
          </button>
        </div>
      </div>

      <!-- Grid de 4 Marcos de Certificação -->
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap:6px; margin-top:4px;">
        ${milestoneSlotsHtml}
      </div>
    `;
    container.appendChild(card);
  });

  // 3. Atualização do Resumo de Certificações e CP
  const certBonuses = SubclassCertificationService.calculateTotalCertificationBonuses(state);
  const totalCertCp = SubclassCertificationService.calculateCertificationCP(state);

  if (cpBadge) {
    cpBadge.textContent = `+${totalCertCp.toLocaleString('zh-TW')} 戰鬥力`;
  }

  if (summaryEl) {
    const activeTransStr = state.activeTransformation ? `<div style="margin-top:4px; color:#fde047; font-weight:bold;">👼 神聖變身已啟用：${Object.values(DIVINE_TRANSFORMATIONS).find(d => d.id === state.activeTransformation)?.name || ({ divineWarrior: '神聖戰士', divineKnight: '神聖騎士', divineRogue: '神聖遊俠', divineWizard: '神聖巫師', divineSummoner: '神聖召喚師', divineHealer: '神聖治癒師', divineEnchanter: '神聖賦予師' })[state.activeTransformation] || state.activeTransformation}</div>` : '';
    
    if (certBonuses.totalCertCount === 0) {
      summaryEl.innerHTML = `目前尚未學習任何認證。將副職業提升至等級 65、70、75、80 即可累積永久加成！`;
    } else {
      const parts = [];
      if (certBonuses.pAtk) parts.push(`+${certBonuses.pAtk} 物理攻擊`);
      if (certBonuses.pDef) parts.push(`+${certBonuses.pDef} 物理防禦`);
      if (certBonuses.mAtk) parts.push(`+${certBonuses.mAtk} 魔法攻擊`);
      if (certBonuses.mDef) parts.push(`+${certBonuses.mDef} 魔法防禦`);
      if (certBonuses.pAtkPercent) parts.push(`+${Math.round(certBonuses.pAtkPercent * 100)}% 物理攻擊`);
      if (certBonuses.pDefPercent) parts.push(`+${Math.round(certBonuses.pDefPercent * 100)}% 物理防禦`);
      if (certBonuses.mAtkPercent) parts.push(`+${Math.round(certBonuses.mAtkPercent * 100)}% 魔法攻擊`);
      if (certBonuses.mDefPercent) parts.push(`+${Math.round(certBonuses.mDefPercent * 100)}% 魔法防禦`);
      if (certBonuses.maxHpPercent) parts.push(`+${Math.round(certBonuses.maxHpPercent * 100)}% 最大生命值`);
      if (certBonuses.maxMpPercent) parts.push(`+${Math.round(certBonuses.maxMpPercent * 100)}% 最大魔力`);
      if (certBonuses.maxCpPercent) parts.push(`+${Math.round(certBonuses.maxCpPercent * 100)}% 最大戰鬥力`);
      if (certBonuses.critRate) parts.push(`+${certBonuses.critRate} 暴擊率`);
      if (certBonuses.castSpd) parts.push(`+${certBonuses.castSpd} 施法速度`);
      if (certBonuses.evasion) parts.push(`+${certBonuses.evasion} 迴避`);
      if (certBonuses.celestialProc) parts.push(`🌟 天界護盾（觸發）`);
      if (certBonuses.hasteProc) parts.push(`⚡ 急速觸發機率`);
      if (certBonuses.defenceProc) parts.push(`🛡️ 反擊防禦（觸發）`);
      if (certBonuses.spiritProc) parts.push(`👻 反擊之魂（觸發）`);
      if (certBonuses.critProc) parts.push(`💥 暴擊觸發機率`);

      summaryEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span style="color:#fde047; font-weight:bold;">已啟用認證：${certBonuses.totalCertCount}/12</span>
          <button class="inv-batch-btn" style="padding:2px 8px; font-size:9px;" onclick="window.openDivineTransformationToggleModal()">👼 管理變身</button>
        </div>
        <div style="line-height:1.5; color:var(--bone); font-size:11px;">
          ${parts.join(' · ')}
        </div>
        ${activeTransStr}
      `;
    }
  }
}

// --------------------------- MODAL DE CERTIFICAÇÃO ---------------------------

function openCertificationModal(subId, milestoneKey) {
  const modal = el('cert-modal');
  const body = el('cert-modal-body');
  if (!modal || !body) return;

  const sub = (state.subclasses || []).find(s => s.id === subId);
  if (!sub) return;

  const milestones = SubclassCertificationService.getSubclassMilestones(state, subId);
  const milestone = milestones.find(m => m.milestoneKey === milestoneKey);
  if (!milestone) return;

  const subClassDef = getClass(sub.classId);
  const archetype = SubclassCertificationService.getArchetypeForClass(sub.classId);

  let optionsHtml = '';
  milestone.options.forEach(opt => {
    optionsHtml += `
      <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(212,175,55,0.3); border-radius:8px; padding:12px; display:flex; justify-content:space-between; align-items:center; gap:10px;">
        <div style="flex:1;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:18px;">${opt.icon || '✨'}</span>
            <strong style="color:#fde047; font-size:13px;">${opt.name}</strong>
            ${opt.badge ? `<span style="font-size:10px; background:rgba(212,175,55,0.2); color:#ffd700; padding:1px 6px; border-radius:4px;">${opt.badge}</span>` : ''}
          </div>
          <div style="font-size:11px; color:#d1d5db; margin-top:4px; line-height:1.4;">${opt.desc}</div>
          <div style="font-size:10px; color:#38bdf8; margin-top:4px;">戰鬥力貢獻： <strong>+${(opt.cp || 1500).toLocaleString('zh-TW')} 戰鬥力</strong></div>
        </div>
        <button class="action-btn action-btn--primary" style="padding:8px 14px; font-size:11px; white-space:nowrap;" onclick="window.confirmLearnCertification('${subId}', '${milestoneKey}', '${opt.id}')">
          學習 📜
        </button>
      </div>
    `;
  });

  body.innerHTML = `
    <div style="margin-bottom:14px;">
      <h3 style="margin:0; color:#fde047; font-family:'Cinzel',serif; font-size:16px;">📜 ${milestone.title}</h3>
      <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-muted);">副職業：<strong>${subClassDef?.name || '未知職業'}</strong>（定位： <span style="text-transform:uppercase; color:#a855f7;">${({ warrior: '戰士', knight: '騎士', rogue: '盜賊', wizard: '法師', summoner: '召喚師', healer: '治療師', enchanter: '輔助師' })[archetype] || '戰士'}</span>）</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:8px; max-height:360px; overflow-y:auto; padding-right:4px;">
      ${optionsHtml}
    </div>
  `;

  const closeBtn = el('cert-modal-close');
  if (closeBtn) closeBtn.onclick = closeCertificationModal;

  modal.style.display = 'flex';
}

function closeCertificationModal() {
  const modal = el('cert-modal');
  if (modal) modal.style.display = 'none';
}

function confirmLearnCertification(subId, milestoneKey, abilityId) {
  const success = SubclassCertificationService.learnCertification(state, subId, milestoneKey, abilityId, {
    log: (msg, type) => log(msg, type),
    onUpdate: () => {
      floatText('✨ 已取得認證！', 'float-jackpot');
      updateAllUI();
      save();
    }
  });

  if (success) {
    closeCertificationModal();
  }
}

function openResetCertificationsModal(subId) {
  const sub = (state.subclasses || []).find(s => s.id === subId);
  if (!sub) return;

  const subClassDef = getClass(sub.classId);
  const costAdena = 1000000;
  const hasAdena = (state.gold || 0) >= costAdena;

  const modal = el('cert-modal');
  const body = el('cert-modal-body');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="margin-bottom:14px;">
      <h3 style="margin:0; color:#ef4444; font-family:'Cinzel',serif; font-size:16px;">🔄 重置認證</h3>
      <p style="margin:4px 0 0 0; font-size:12px; color:var(--bone);">確定要重置並重新分配所有認證： <strong>${subClassDef?.name || '未知職業'}</strong>？</p>
    </div>
    <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:12px; font-size:11px; color:#d1d5db; line-height:1.4;">
      <p style="margin:0 0 6px 0;">確認後，此副職業已學習的所有認證將退還，讓你可以重新選擇等級 65、70、75、80 的技能。</p>
      <p style="margin:0; color:${hasAdena ? '#fde047' : '#ef4444'}; font-weight:bold;">重置費用：1,000,000 金幣（目前持有 ${(state.gold || 0).toLocaleString('zh-TW')} 金幣）</p>
    </div>
    <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:14px;">
      <button class="action-btn" onclick="window.closeCertificationModal()">取消</button>
      <button class="action-btn action-btn--danger" ${!hasAdena ? 'disabled' : ''} onclick="window.confirmResetCertifications('${subId}')">確認重置（-1,000,000 金幣）</button>
    </div>
  `;

  const closeBtn = el('cert-modal-close');
  if (closeBtn) closeBtn.onclick = closeCertificationModal;

  modal.style.display = 'flex';
}

function confirmResetCertifications(subId) {
  const success = SubclassCertificationService.resetSubclassCertifications(state, subId, {
    log: (msg, type) => log(msg, type),
    onUpdate: () => {
      updateAllUI();
      save();
    }
  });

  if (success) {
    closeCertificationModal();
  }
}

function openDivineTransformationToggleModal() {
  const modal = el('cert-modal');
  const body = el('cert-modal-body');
  if (!modal || !body) return;

  const certBonuses = SubclassCertificationService.calculateTotalCertificationBonuses(state);
  const learnedDivines = [];

  for (const subId in (state.subclassCertifications || {})) {
    const dId = state.subclassCertifications[subId]?.lv80;
    if (dId) {
      const def = Object.values(DIVINE_TRANSFORMATIONS).find(d => d.id === dId);
      if (def && !learnedDivines.some(ld => ld.id === def.id)) {
        learnedDivines.push(def);
      }
    }
  }

  if (learnedDivines.length === 0) {
    body.innerHTML = `
      <div style="text-align:center; padding:20px 10px;">
        <div style="font-size:32px; margin-bottom:8px;">🔒</div>
        <h3 style="color:#fde047; margin:0 0 6px 0;">尚未解鎖神聖變身</h3>
        <p style="font-size:12px; color:var(--text-muted); margin:0;">任一副職業達到等級 80，即可解鎖對應的神聖變身！</p>
        <button class="action-btn" style="margin-top:14px;" onclick="window.closeCertificationModal()">關閉</button>
      </div>
    `;
  } else {
    let listHtml = '';
    learnedDivines.forEach(dt => {
      const isActive = state.activeTransformation === dt.id;
      listHtml += `
        <div style="background:rgba(0,0,0,0.4); border:1px solid ${isActive ? '#ffd700' : 'rgba(212,175,55,0.3)'}; border-radius:8px; padding:12px; display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div>
            <div style="font-weight:bold; color:#fde047; font-size:13px; display:flex; align-items:center; gap:6px;">
              <span>${dt.icon}</span>
              <span>${dt.name}</span>
              ${isActive ? '<span style="font-size:10px; background:#ffd700; color:#000; font-weight:bold; padding:1px 6px; border-radius:4px;">啟用中</span>' : ''}
            </div>
            <div style="font-size:11px; color:#d1d5db; margin-top:2px;">${dt.desc}</div>
          </div>
          <button class="action-btn ${isActive ? 'action-btn--danger' : 'action-btn--primary'}" style="padding:6px 12px; font-size:11px; white-space:nowrap;" onclick="window.toggleDivineTransformation('${dt.id}')">
            ${isActive ? '停用 ❌' : '啟用 👼'}
          </button>
        </div>
      `;
    });

    body.innerHTML = `
      <div style="margin-bottom:14px;">
        <h3 style="margin:0; color:#fde047; font-family:'Cinzel',serif; font-size:16px;">👼 可用神聖變身</h3>
        <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-muted);">啟用神聖形態即可在戰鬥與攻城中獲得強力加成。</p>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px; max-height:360px; overflow-y:auto;">
        ${listHtml}
      </div>
    `;
  }

  const closeBtn = el('cert-modal-close');
  if (closeBtn) closeBtn.onclick = closeCertificationModal;

  modal.style.display = 'flex';
}

function toggleDivineTransformation(transId) {
  if (state.activeTransformation === transId) {
    state.activeTransformation = null;
    log('👼 神聖變身已停用。', 'system');
  } else {
    state.activeTransformation = transId;
    log(`👼 **神聖變身已啟用！** （${Object.values(DIVINE_TRANSFORMATIONS).find(d => d.id === transId)?.name || '未知變身'}）`, 'rarity-legendary');
    floatText('神聖變身！', 'float-jackpot');
  }

  closeCertificationModal();
  updateAllUI();
  save();
}

function openAddSubclassModal() {
  const currentClass = state.class;
  // MasterWork: Todas as classes disponíveis sem restrição racial!
  const availableClasses = Object.keys(CLASSES).filter(cId => cId !== currentClass && !(state.subclasses || []).some(s => s.classId === cId));

  if (availableClasses.length === 0) {
    log('所有可用職業都已學習為副職業。', 'system');
    return;
  }

  const modal = el('cert-modal');
  const body = el('cert-modal-body');
  if (!modal || !body) return;

  let classOptionsHtml = '';
  availableClasses.forEach(cId => {
    const cDef = CLASSES[cId];
    const arch = SubclassCertificationService.getArchetypeForClass(cId);
    classOptionsHtml += `
      <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:10px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <div>
          <div style="font-weight:bold; color:#fde047; font-size:12px;">${cDef?.name || '未知職業'}</div>
          <div style="font-size:10px; color:#a855f7; text-transform:uppercase;">定位：${({ warrior: '戰士', knight: '騎士', rogue: '盜賊', wizard: '法師', summoner: '召喚師', healer: '治療師', enchanter: '輔助師' })[arch] || '戰士'}</div>
        </div>
        <button class="action-btn action-btn--primary" style="padding:6px 12px; font-size:11px;" onclick="window.confirmAddSubclass('${cId}')">
          新增 ⚔️
        </button>
      </div>
    `;
  });

  body.innerHTML = `
    <div style="margin-bottom:14px;">
      <h3 style="margin:0; color:#fde047; font-family:'Cinzel',serif; font-size:16px;">➕ 新增副職業</h3>
      <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-muted);">名匠版本－無種族限制，從等級 40 開始。</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:6px; max-height:340px; overflow-y:auto; padding-right:4px;">
      ${classOptionsHtml}
    </div>
  `;

  const closeBtn = el('cert-modal-close');
  if (closeBtn) closeBtn.onclick = closeCertificationModal;

  modal.style.display = 'flex';
}

function confirmAddSubclass(chosenClassId) {
  state.subclasses = state.subclasses || [];
  if (state.subclasses.length >= 3) {
    log('已達 3 個副職業上限。', 'system');
    closeCertificationModal();
    return;
  }

  const subId = 'sub_' + Date.now();
  state.subclasses.push({
    id: subId,
    classId: chosenClassId,
    level: 40,
    xp: 0,
    sp: 50,
    skills: {}
  });

  log(`🌟 恭喜！你已學會副職業 **${CLASSES[chosenClassId]?.name || '未知職業'}**（等級 40）！`, 'rarity-legendary');
  floatText(`🌟 已學會副職業！`, 'float-jackpot');

  closeCertificationModal();
  updateAllUI();
  save();
}

export function switchSubclass(targetIndex) {
  if (typeof window !== 'undefined') {
    window.switchSubclass = switchSubclass;
  }
  // Normaliza targetIndex e verifica se uma subclasse é válida
  const subCount = Array.isArray(state.subclasses) ? state.subclasses.length : 0;
  const isTargetValidSub = typeof targetIndex === 'number'
    && Number.isInteger(targetIndex)
    && targetIndex >= 0
    && targetIndex < subCount;

  const resolvedTarget = isTargetValidSub ? targetIndex : null;

  // Season gating: subclasses are locked in Seasons prior to Season 3
  const isSeasonUnlocked = isFeatureUnlocked('subclasses');
  if (!isSeasonUnlocked && resolvedTarget !== null && state.activeSubclassIndex === null) {
    log('目前賽季尚未開放副職業系統（第 3 賽季開放）。', 'warning');
    return false;
  }

  // Se já está na classe alvo, não faz nada
  const isCurrentSubActive = typeof state.activeSubclassIndex === 'number'
    && Number.isInteger(state.activeSubclassIndex)
    && state.activeSubclassIndex >= 0
    && state.activeSubclassIndex < subCount;

  const currentEffectiveIndex = isCurrentSubActive ? state.activeSubclassIndex : null;
  if (currentEffectiveIndex === resolvedTarget) return;

  // 1. Salva snapshot da classe atual (sem referências compartilhadas)
  const outgoingSnapshot = {
    level: state.level,
    xp: state.xp,
    sp: state.sp,
    class: state.class,
    skills: JSON.parse(JSON.stringify(state.skills || {})),
    legacyPassives: JSON.parse(JSON.stringify(state.legacyPassives || {})),
    skillLoadout: JSON.parse(JSON.stringify(state.skillLoadout || { basic: null, core1: null, core2: null, special1: null, special2: null, signature: null, ultimate: null })),
    equipment: { ...(state.equipment || {}) }
  };

  if (currentEffectiveIndex === null) {
    state.mainClassData = outgoingSnapshot;
  } else {
    const activeSub = state.subclasses[currentEffectiveIndex];
    if (activeSub) {
      activeSub.level = outgoingSnapshot.level;
      activeSub.xp = outgoingSnapshot.xp;
      activeSub.sp = outgoingSnapshot.sp;
      activeSub.skills = outgoingSnapshot.skills;
      activeSub.legacyPassives = outgoingSnapshot.legacyPassives;
      activeSub.skillLoadout = outgoingSnapshot.skillLoadout;
      activeSub.equipment = outgoingSnapshot.equipment;
    }
  }

  // 2. Restaura snapshot da classe de destino
  if (resolvedTarget === null) {
    state.activeSubclassIndex = null;
    const main = state.mainClassData || {
      level: 75,
      xp: 0,
      sp: 50,
      class: 'fighter',
      skills: {},
      legacyPassives: {},
      skillLoadout: { basic: null, core1: null, core2: null, special1: null, special2: null, signature: null, ultimate: null },
      equipment: {}
    };
    state.level = main.level;
    state.xp = main.xp;
    state.sp = main.sp;
    state.class = main.class;
    state.skills = JSON.parse(JSON.stringify(main.skills || {}));
    state.legacyPassives = JSON.parse(JSON.stringify(main.legacyPassives || {}));
    state.skillLoadout = JSON.parse(JSON.stringify(main.skillLoadout || { basic: null, core1: null, core2: null, special1: null, special2: null, signature: null, ultimate: null }));

    // Valida itens de equipamento contra o inventário único (sem reviver itens vendidos/destruídos)
    if (main.equipment) {
      const invUids = new Set((state.inventory || []).map(i => i.uid));
      const restoredEquip = {};
      for (const slot of Object.keys(main.equipment)) {
        const u = main.equipment[slot];
        restoredEquip[slot] = (u && invUids.has(u)) ? u : null;
      }
      state.equipment = restoredEquip;
    }

    log(`👑 已切換至主職業（**${getClass(state.class).name}**）！`, 'system');
  } else {
    const targetSub = state.subclasses[resolvedTarget];
    if (targetSub) {
      state.activeSubclassIndex = resolvedTarget;
      state.level = targetSub.level;
      state.xp = targetSub.xp;
      state.sp = targetSub.sp;
      state.class = targetSub.classId || targetSub.class;
      state.skills = JSON.parse(JSON.stringify(targetSub.skills || {}));
      state.legacyPassives = JSON.parse(JSON.stringify(targetSub.legacyPassives || {}));
      state.skillLoadout = JSON.parse(JSON.stringify(targetSub.skillLoadout || { basic: null, core1: null, core2: null, special1: null, special2: null, signature: null, ultimate: null }));

      if (targetSub.equipment) {
        const invUids = new Set((state.inventory || []).map(i => i.uid));
        const restoredEquip = {};
        for (const slot of Object.keys(targetSub.equipment)) {
          const u = targetSub.equipment[slot];
          restoredEquip[slot] = (u && invUids.has(u)) ? u : null;
        }
        state.equipment = restoredEquip;
      }

      const clsObj = getClass(state.class);
      log(`⚔️ 已切換至副職業 **${clsObj?.name || '未知職業'}**（等級 ${state.level}）！`, 'rarity-rare');
    }
  }

  // Sincroniza flag item.equipped no inventário compartilhado para refletir os itens da classe ativa
  const equippedUids = new Set(Object.values(state.equipment || {}).filter(Boolean));
  for (const it of (state.inventory || [])) {
    it.equipped = equippedUids.has(it.uid);
    if (!it.equipped) delete it.equippedSlot;
  }

  const race = state.race ? RACES[state.race] : RACES.human;
  const cls = getClass(state.class);
  state.base = { atk: 0, def: 0, eva: 0, matk: 0, mdef: 0 };
  for (const k of ['atk','def','eva','matk','mdef']) {
    state.base[k] = (race?.stats[k] || 0) + (cls?.base[k] || 0);
  }

  updateAllUI(); save();
  return true;
}

// --------------------------- VISUALS / STAGE ---------------------------
// ZONE_BACKGROUNDS é importado de ./src/data/zones.js

let currentBgPath = '';
let activeBgLayer = 'a';

function updateZoneBackground() {
  const isRaid = state.isRaidActive && state.target && RAID_BOSSES[state.target];
  const currentKey = isRaid ? state.target : (state.zone || 'talkingIsland');
  const bgPath = ZONE_BACKGROUNDS[currentKey] || '/img/' + currentKey + '.png';

  const logEl = el('log');
  const stageZone = el('stage-zone');
  const zoneNameEl = el('zone-name');
  const bgA = el('stage-bg-a');
  const bgB = el('stage-bg-b');
  const stageEl = el('stage');

  if (bgPath !== currentBgPath) {
    currentBgPath = bgPath;
    const bgUrl = `linear-gradient(180deg, rgba(8,10,16,0.15) 0%, rgba(8,10,16,0.60) 100%), url('${bgPath}')`;
    if (bgA && bgB) {
      if (activeBgLayer === 'a') {
        bgB.style.backgroundImage = bgUrl;
        bgB.classList.add('active');
        bgA.classList.remove('active');
        activeBgLayer = 'b';
      } else {
        bgA.style.backgroundImage = bgUrl;
        bgA.classList.add('active');
        bgB.classList.remove('active');
        activeBgLayer = 'a';
      }
    } else if (stageEl) {
      stageEl.style.backgroundImage = bgUrl;
      stageEl.style.backgroundSize = 'cover';
      stageEl.style.backgroundPosition = 'center';
    }
  }

  if (logEl) {
    logEl.style.backgroundImage = `linear-gradient(180deg, rgba(10,13,20,0.85), rgba(10,13,20,0.95)), url('${bgPath}')`;
  }

  let name = '';
  if (isRaid) {
    name = RAID_BOSSES[state.target].name;
  } else if (state.zone && ZONES[state.zone]) {
    name = ZONES[state.zone].name;
  }

  if (stageZone && name) {
    const isTown = state.zone && ZONES[state.zone]?.town;
    stageZone.textContent = name.toUpperCase() + (isTown ? ' · 城鎮' : '');
  }

  if (zoneNameEl && name) {
    zoneNameEl.textContent = name;
  }
}

function topEquipRarityColor() { const rank = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 }; let best = -1, col = ''; for (const s of Object.keys(state.equipment || {})) { const uid = state.equipment[s]; if (!uid) continue; const it = (state.inventory || []).find(i => i.uid === uid); if (!it || !it.rarity) continue; const r = rank[it.rarity] ?? -1; if (r > best) { best = r; col = D().RARITY?.[it.rarity]?.color || ''; } } return col; }
function renderStageHero() {
  return uiRenderStageHero(state);
}
function renderStageMonster() {
  try {
    if (globalVFXOrchestrator && typeof globalVFXOrchestrator.clear === 'function') {
      globalVFXOrchestrator.clear();
    }
    if (VFX && typeof VFX.clear === 'function') {
      VFX.clear();
    }
  } catch (_) {}
  return uiRenderStageMonster(state);
}

function updateMonsterHP() {
  const mon = state.activeMonster;
  const fill = el('monster-hp-fill') || el('m-hp-fill') || document.querySelector('#monster-hp-fill, .stage-hp-fill');
  const text = el('monster-hp-text') || el('m-hp-text') || document.querySelector('#monster-hp-text, .stage-hp-text');
  if (!mon) {
    if (fill) fill.style.width = '100%';
    return;
  }
  const maxHp = Math.max(1, Math.round(mon._maxHp || mon.maxHp || 100));
  const curHp = Math.max(0, Math.min(maxHp, Math.round(mon.hp !== undefined ? mon.hp : maxHp)));
  const pct = Math.max(0, Math.min(100, (curHp / maxHp) * 100));
  if (fill) fill.style.width = `${pct}%`;
  if (text) text.textContent = `生命值：${curHp.toLocaleString()} / ${maxHp.toLocaleString()}`;
}

function reflow(n) { /* non-blocking no-op to eliminate layout thrashing */ }
function stageHeroAttack() {
  const st = el('stage');
  if (!st) return;
  st.classList.remove('is-hero-atk');
  requestAnimationFrame(() => {
    if (st) st.classList.add('is-hero-atk');
  });
}
function stageMonsterHurt(dmg, crit, reaction = null, reactionDuration = 450) { 
  updateMonsterHP(); 
  const m = el('stage-monster'); 
  if (m) { 
    m.classList.remove('hurt'); 
    if (reaction) m.classList.remove(reaction);
    requestAnimationFrame(() => {
      if (!m) return;
      m.classList.add('hurt'); 
      if (reaction) {
        m.classList.add(reaction);
        setTimeout(() => m.classList.remove(reaction), reactionDuration);
      }
      setTimeout(() => m.classList.remove('hurt'), 420); 
    });
  } 
  const floatClass = crit ? 'sf-crit crit-hit-text' : 'sf-dmg';
  stageFloat((crit ? '💥 暴擊！ ' : '') + Math.round(dmg), floatClass, 'right'); 
}
function stageMonsterDie() { 
  const fill = el('monster-hp-fill') || el('m-hp-fill') || document.querySelector('#monster-hp-fill, .stage-hp-fill');
  const text = el('monster-hp-text') || el('m-hp-text') || document.querySelector('#monster-hp-text, .stage-hp-text');
  if (fill) fill.style.width = '0%'; 
  if (text && state.activeMonster) {
    const maxHp = Math.max(1, Math.round(state.activeMonster._maxHp || state.activeMonster.maxHp || 100));
    text.textContent = `生命值：0 / ${maxHp.toLocaleString()}`;
  }
  const m = el('stage-monster'); 
  if (m) { 
    m.classList.remove('is-dying'); 
    requestAnimationFrame(() => {
      if (!m) return;
      m.classList.add('is-dying'); 
      setTimeout(() => m.classList.remove('is-dying'), 350); 
    });
  } 
  stageFloat('擊殺', 'sf-slain', 'right'); 
  try {
    if (globalVFXOrchestrator && typeof globalVFXOrchestrator.clear === 'function') {
      globalVFXOrchestrator.clear();
    }
    if (VFX && typeof VFX.clear === 'function') {
      VFX.clear();
    }
  } catch (err) {
    console.debug('VFX cleanup on monster death notice:', err);
  }
}
function stageMonsterLunge() {
  const m = el('stage-monster');
  if (!m) return;
  m.classList.remove('lunge');
  requestAnimationFrame(() => {
    if (!m) return;
    m.classList.add('lunge');
    setTimeout(() => m.classList.remove('lunge'), 440);
  });
}
function stageHeroHurt(dmg) {
  const h = el('stage-hero');
  if (h) {
    h.classList.remove('hurt');
    requestAnimationFrame(() => {
      if (!h) return;
      h.classList.add('hurt');
      setTimeout(() => h.classList.remove('hurt'), 420);
    });
  }
  stageFloat('-' + Math.round(dmg), 'sf-hurt', 'left');
}
function stageHeroBlock() { stageFloat('格擋', 'sf-block', 'left'); }
const MAX_FLOAT_ITEMS = 12;
function stageFloat(text, cls, side) {
  const c = el('stage-floats');
  if (!c) return;
  while (c.children.length >= MAX_FLOAT_ITEMS) { c.removeChild(c.firstChild); }
  const s = mkEl('span');
  s.className = 'sf ' + cls;
  s.textContent = text;
  s.style.left = (side === 'left' ? (16 + Math.random() * 8) : (68 + Math.random() * 12)) + '%';
  c.appendChild(s);
  setTimeout(() => { if (s.parentNode === c) c.removeChild(s); }, 1100);
}

// --------------------------- COMBAT ---------------------------
let combatInterval = null; let combatTick = 0; let monsterAttackTimeout = null;

let _cachedHeroCenter = null;
let _cachedHeroBase = null;
let _cachedMonsterCenter = null;
let _cachedMonsterBase = null;
let _lastCoordCacheTime = 0;

function invalidateCombatCoordinates() {
  _cachedHeroCenter = null;
  _cachedHeroBase = null;
  _cachedMonsterCenter = null;
  _cachedMonsterBase = null;
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', invalidateCombatCoordinates);
}

function getStagePositionRelative(side) {
  const now = Date.now();
  if (side === 'hero' && _cachedHeroCenter && (now - _lastCoordCacheTime) < 1500) return _cachedHeroCenter;
  if (side !== 'hero' && _cachedMonsterCenter && (now - _lastCoordCacheTime) < 1500) return _cachedMonsterCenter;

  const stage = el('stage');
  if (!stage) return { x: 0, y: 0 };
  const rect = stage.getBoundingClientRect();
  const host = el(side === 'hero' ? 'stage-hero' : 'stage-monster');
  if (!host) return { x: rect.width * 0.5, y: rect.height * 0.5 };
  const box = host.getBoundingClientRect();
  const pt = {
    x: box.left - rect.left + box.width * 0.5,
    y: box.top - rect.top + box.height * 0.5
  };
  _lastCoordCacheTime = now;
  if (side === 'hero') _cachedHeroCenter = pt;
  else _cachedMonsterCenter = pt;
  return pt;
}

function getHeroBasePoint() {
  const now = Date.now();
  if (_cachedHeroBase && (now - _lastCoordCacheTime) < 1500) return _cachedHeroBase;
  const stage = el('stage');
  if (!stage) return { x: 0, y: 0 };
  const rect = stage.getBoundingClientRect();
  const hero = el('stage-hero');
  if (hero) {
    const box = hero.getBoundingClientRect();
    _cachedHeroBase = { x: box.left - rect.left + box.width * 0.5, y: box.bottom - rect.top - 4 };
    _lastCoordCacheTime = now;
    return _cachedHeroBase;
  }
  return { x: rect.width * 0.28, y: rect.height * 0.75 };
}

const MONSTER_FEET_EFFECTS = new Set([
  'flame_strike',
  'magic_prominence',
  'magic_meteor',
  'magic_hydro_blast',
  'magic_hurricane',
  'magic_lightning_surge',
  'magic_dark_mire',
  'magic_solar_flare',
  'magic_holy_sanctuary',
  'warrior_earth_tremor',
  'warrior_spear_whirlwind',
  'warrior_sonic_storm',
  'monster_inferno_pillar',
  'monster_frost_freeze',
  'celestial_strike',
  'holy_beam',
  'arrow_rain',
  'dark_vortex'
]);

function getCombatTargetPoint() {
  const now = Date.now();
  if (_cachedMonsterCenter && (now - _lastCoordCacheTime) < 1500) return _cachedMonsterCenter;
  const stage = el('stage');
  if (!stage) return { x: 0, y: 0 };
  const rect = stage.getBoundingClientRect();
  const monster = el('stage-monster');
  if (monster) {
    const box = monster.getBoundingClientRect();
    _cachedMonsterCenter = { x: box.left - rect.left + box.width * 0.5, y: box.top - rect.top + box.height * 0.48 };
    _lastCoordCacheTime = now;
    return _cachedMonsterCenter;
  }
  return { x: rect.width * 0.72, y: rect.height * 0.48 };
}

function getCombatTargetBasePoint() {
  const now = Date.now();
  if (_cachedMonsterBase && (now - _lastCoordCacheTime) < 1500) return _cachedMonsterBase;
  const stage = el('stage');
  if (!stage) return { x: 0, y: 0 };
  const rect = stage.getBoundingClientRect();
  const monster = el('stage-monster');
  if (monster) {
    const box = monster.getBoundingClientRect();
    _cachedMonsterBase = { x: box.left - rect.left + box.width * 0.5, y: box.bottom - rect.top - 2 };
    _lastCoordCacheTime = now;
    return _cachedMonsterBase;
  }
  return { x: rect.width * 0.72, y: rect.height * 0.78 };
}

function playCombatVFX(type, options = {}) {
  if (!VFX || typeof VFX.play !== 'function') return null;
  const resolved = { ...options };
  const isHeroFeetEffect = ['holy_heal', 'buff_aura', 'hero_skin_aura'].includes(type);
  const isMonsterFeetEffect = MONSTER_FEET_EFFECTS.has(type);
  if (!resolved.source) {
    resolved.source = isHeroFeetEffect ? getHeroBasePoint() : getStagePositionRelative('hero');
  }
  if (!resolved.target) {
    if (isHeroFeetEffect) {
      resolved.target = getHeroBasePoint();
    } else if (isMonsterFeetEffect) {
      resolved.target = getCombatTargetBasePoint();
    } else {
      resolved.target = getCombatTargetPoint();
    }
  }
  return VFX.play(type, resolved);
}

function setupVfxQualityControl() {
  const select = el('vfx-quality-select');
  if (!select || !VFX || typeof VFX.setQuality !== 'function') return;
  const saved = (typeof window !== 'undefined' && window.localStorage) ? window.localStorage.getItem('lineage-idle-vfx-quality') : null;
  const initial = saved || 'high';
  select.value = initial;
  VFX.setQuality(initial);
  select.addEventListener('change', () => {
    const value = select.value || 'high';
    VFX.setQuality(value);
    if (typeof window !== 'undefined' && window.localStorage) {
      try { window.localStorage.setItem('lineage-idle-vfx-quality', value); } catch (_) {}
    }
  });
}

function getSkillVfxData(skillId, skillDef = null) {
  const name = String(skillDef?.name || '').toLowerCase();
  const id = String(skillId || skillDef?.id || '').toLowerCase();
  const desc = String(skillDef?.desc || skillDef?.info || '').toLowerCase();
  const combined = `${id} ${name} ${desc}`;

  // ─── 0. MAGOS / NECRO: VAMPIRISMO & DRENO DE VIDA (PRIORIDADE TOTAL PARA NUNCA COLIDIR COM 'rain' EM 'drain') ───
  if (combined.includes('drain') || combined.includes('vampir') || combined.includes('sanguine') || combined.includes('lifesteal') || combined.includes('soul absorption') || combined.includes('drain health') || combined.includes('life drain')) {
    return { id: 'magic_vampiric_drain', groundVfx: null, color: '#f43f5e', duration: 1000 };
  }

  // ─── 1. ARQUEIROS / ATIRADORES (DIFERENCIAÇÃO TOTAL) ───
  // Arrow Rain e saraivadas em área (do céu ao solo)
  if (combined.includes('arrow_rain') || (/\brain\b/i.test(combined) && !combined.includes('drain')) || combined.includes('shower') || combined.includes('arrow rain') || combined.includes('storm arrow rain') || combined.includes('flame arrow rain') || combined.includes('water arrow rain')) {
    return { id: 'arrow_rain', groundVfx: null, color: '#ffd700', duration: 1200 };
  }
  // Seven Arrow (7 flechas estelares convergentes)
  if (combined.includes('seven_arrow') || combined.includes('seven arrow')) {
    return { id: 'seven_arrow', groundVfx: null, color: '#fef08a', duration: 950 };
  }
  // Snipe / Lethal Shot / Pinpoint Shot (Tiro hipersônico em linha direta com anéis)
  if (combined.includes('snipe') || combined.includes('lethal_shot') || combined.includes('lethal shot') || combined.includes('pinpoint') || combined.includes('aimed shot') || combined.includes('piercing shot')) {
    return { id: 'snipe_shot', groundVfx: null, color: '#fef08a', duration: 550 };
  }
  // Burst Fire / Sharpshooter / Rapid Shot / Quick Shot (Rajada tripla veloz de tiros de pólvora)
  if (combined.includes('burst_fire') || combined.includes('burst') || combined.includes('rapid_shot') || combined.includes('rapid shot') || combined.includes('quick shot') || combined.includes('chain shot')) {
    return { id: 'burst_fire', groundVfx: null, color: '#fb923c', duration: 700 };
  }
  // Double Shot padrão
  if (combined.includes('double_shot') || combined.includes('double shot') || combined.includes('power_shot') || combined.includes('power shot') || combined.includes('arrow') || combined.includes('shot') || combined.includes('gun') || combined.includes('bullet')) {
    return { id: 'double_shot', groundVfx: null, color: '#fef08a', duration: 800 };
  }

  // ─── 2. MAGOS: FOGO & METEOROS ───
  // Flame Strike (Chama ardente e erupção vulcânica clássica)
  if (combined.includes('flame strike') || combined.includes('flame_strike') || id.includes('flame_strike')) {
    return { id: 'flame_strike', groundVfx: null, color: '#ff7722', duration: 1050 };
  }
  // Meteoro massivo do céu abrindo cratera incandescente
  if (combined.includes('meteor') || combined.includes('star fall') || combined.includes('starfall') || combined.includes('hell inferno') || combined.includes('flame explosion')) {
    return { id: 'magic_meteor', groundVfx: null, color: '#ff6610', duration: 1200 };
  }
  // Prominence e erupções vulcânicas de solo
  if (combined.includes('prominence') || combined.includes('blaze') || combined.includes('fire spiral') || combined.includes('blazing circle') || combined.includes('flame burst') || combined.includes('fire weave')) {
    return { id: 'magic_prominence', groundVfx: null, color: '#ff7722', duration: 1050 };
  }
  // Fireball clássica
  if (combined.includes('fire') || combined.includes('flame') || combined.includes('ignite') || combined.includes('burn') || combined.includes('magma') || combined.includes('lava') || combined.includes('pyro')) {
    return { id: 'fireball', groundVfx: null, color: '#ff7a45', duration: 900 };
  }

  // ─── 3. MAGOS: ÁGUA & GELO ───
  // Hydro Blast / Aqua Swirl / Torrente gélida de alta pressão
  if (combined.includes('hydro') || combined.includes('aqua') || combined.includes('water') || combined.includes('surge')) {
    return { id: 'magic_hydro_blast', groundVfx: null, color: '#67e8f9', duration: 850 };
  }
  // Blizzard e congelamento total com espinhos no solo
  if (combined.includes('blizzard') || combined.includes('ice') || combined.includes('frost') || combined.includes('freeze') || combined.includes('cold') || combined.includes('glacier')) {
    return { id: 'frost_blizzard', groundVfx: null, color: '#a5f3fc', duration: 1000 };
  }

  // ─── 4. MAGOS: VENTO & TEMPESTADE ───
  // Wind Strike (Lâmina mágica cortante de vento de alta velocidade)
  if (combined.includes('wind strike') || combined.includes('wind_strike') || id.includes('wind_strike')) {
    return { id: 'wind_strike', groundVfx: null, color: '#72f3ca', duration: 750 };
  }
  // Hurricane / Tempest Cyclone / Tufão cônico vertical
  if (combined.includes('hurricane') || combined.includes('tempest') || combined.includes('cyclone') || combined.includes('typhoon') || combined.includes('gale burst')) {
    return { id: 'magic_hurricane', groundVfx: null, color: '#5eead4', duration: 1100 };
  }
  // Wind Blast / Twister / Rajada de ar
  if (combined.includes('wind') || combined.includes('gale') || combined.includes('breeze') || combined.includes('twister') || combined.includes('aeroblaster')) {
    return { id: 'wind_blast', groundVfx: null, color: '#72f3ca', duration: 850 };
  }

  // ─── 5. MAGOS: RAIO & TROVÃO ───
  // Thunder Storm / Surto elétrico no chão
  if (combined.includes('thunder') || combined.includes('shock') || combined.includes('surge') || combined.includes('volt') || combined.includes('plasma')) {
    return { id: 'magic_lightning_surge', groundVfx: null, color: '#7dd3fc', duration: 950 };
  }
  if (combined.includes('lightning')) {
    return { id: 'lightning', groundVfx: null, color: '#91f3ff', duration: 650 };
  }

  // ─── 6. MAGOS: TREVAS, NECROMANCIA & DRENO ───
  // Death Spike (Estaca óssea sombria)
  if (combined.includes('death_spike') || combined.includes('death spike') || combined.includes('bone') || combined.includes('spike')) {
    return { id: 'magic_death_spike', groundVfx: null, color: '#c084fc', duration: 750 };
  }
  // Vampirismo / Life Drain / Dreno de almas
  if (combined.includes('drain') || combined.includes('vampir') || combined.includes('sanguine') || combined.includes('blood') || combined.includes('bite') || combined.includes('soul absorption')) {
    return { id: 'magic_vampiric_drain', groundVfx: null, color: '#f43f5e', duration: 950 };
  }
  // Dark Vortex / Maldições / Charco Abissal
  if (combined.includes('curse') || combined.includes('shadow') || combined.includes('abyss') || combined.includes('corpse') || combined.includes('void') || combined.includes('dark') || combined.includes('necro') || combined.includes('chaos')) {
    return { id: 'dark_vortex', groundVfx: null, color: '#c084fc', duration: 850 };
  }

  // ─── 7. MAGOS: SAGRADO & LUZ ───
  // Solar Flare / Raio solar divino
  if (combined.includes('solar') || combined.includes('solar_flare') || combined.includes('radiant') || combined.includes('light burst') || combined.includes('prismatic ray')) {
    return { id: 'magic_solar_flare', groundVfx: null, color: '#fde047', duration: 750 };
  }
  // Sanctuary / Holy Strike / Julgamento
  if (combined.includes('holy') || combined.includes('divine') || combined.includes('judgment') || combined.includes('sanctuary') || combined.includes('angel') || combined.includes('purifying')) {
    return { id: 'holy_beam', groundVfx: null, color: '#fef08a', duration: 700 };
  }

  // ─── 8. GUERREIROS: ADAGAS & ASSASSINOS ───
  // Backstab (Corte crítico sombrio em cruz)
  if (combined.includes('backstab') || combined.includes('shadow step') || combined.includes('lethal shadow') || combined.includes('assassination') || combined.includes('chain kill')) {
    return { id: 'warrior_backstab', groundVfx: null, color: '#e11d48', duration: 600 };
  }
  // Deadly Blow / Mortal Blow (Estocada frontal letal)
  if (combined.includes('deadly blow') || combined.includes('deadly_blow') || combined.includes('mortal blow') || combined.includes('mortal_blow') || combined.includes('blinding blow') || combined.includes('dagger')) {
    return { id: 'warrior_deadly_blow', groundVfx: null, color: '#fef08a', duration: 550 };
  }

  // ─── 9. GUERREIROS: ESPADAS DUPLAS & DUELISTAS ───
  // Sonic Storm / Sonic Buster (Vácuo sônico que rasga o chão)
  if (combined.includes('sonic storm') || combined.includes('sonic buster') || combined.includes('sonic_buster') || combined.includes('double sonic') || combined.includes('sonic rage') || combined.includes('dual blow')) {
    return { id: 'warrior_sonic_storm', groundVfx: null, color: '#93c5fd', duration: 750 };
  }
  // Triple Slash / Cortes múltiplos
  if (combined.includes('triple slash') || combined.includes('triple_slash') || combined.includes('blade dance') || combined.includes('crescent blade') || combined.includes('iaijutsu')) {
    return { id: 'warrior_triple_slash', groundVfx: null, color: '#e2e8f0', duration: 650 };
  }

  // ─── 10. GUERREIROS: ARMAS PESADAS, MARTELOS & ESMAGAMENTO ───
  // Earth Tremor / Earthquake / Fenda sísmica com pedregulhos aos pés
  if (combined.includes('earthquake') || combined.includes('earth tremor') || combined.includes('earth') || combined.includes('tremor') || combined.includes('shock stomp') || combined.includes('crater')) {
    return { id: 'warrior_earth_tremor', groundVfx: null, color: '#d97706', duration: 1050 };
  }
  // Power Smash / Hammer Crush / Impacto pesado
  if (combined.includes('crush') || combined.includes('hammer') || combined.includes('smash') || combined.includes('slam') || combined.includes('stun') || combined.includes('shield') || combined.includes('bash') || combined.includes('impact') || combined.includes('blunt')) {
    return { id: 'power_smash', groundVfx: null, color: '#f59e0b', duration: 650 };
  }

  // ─── 11. GUERREIROS: MONGE / TYRANT (PUNHOS & CHI) ───
  if (combined.includes('fist') || combined.includes('punch') || combined.includes('force blaster') || combined.includes('force storm') || combined.includes('force buster') || combined.includes('hurricane assault') || combined.includes('burning fist') || combined.includes('pummel') || combined.includes('claw')) {
    return { id: 'warrior_force_burst', groundVfx: null, color: '#fb923c', duration: 800 };
  }

  // ─── 12. GUERREIROS: LANÇAS & POLARMS ───
  if (combined.includes('whirlwind') || combined.includes('wild sweep') || combined.includes('wrath') || combined.includes('spin')) {
    return { id: 'whirlwind', groundVfx: null, color: '#93c5fd', duration: 650 };
  }
  if (combined.includes('spear') || combined.includes('lance') || combined.includes('thrust') || combined.includes('drill') || combined.includes('fellswoop')) {
    return { id: 'warrior_spear_whirlwind', groundVfx: null, color: '#fdba74', duration: 750 };
  }

  // ─── 13. CORTE GERAL / ESPADA ───
  if (combined.includes('slash') || combined.includes('blade') || combined.includes('strike') || combined.includes('sword') || combined.includes('cleave')) {
    return { id: 'cross_slash', groundVfx: null, color: '#e2e8f0', duration: 600 };
  }

  // ─── 14. FALLBACK MÁGICO OU FÍSICO ───
  if (skillDef?.type === 'magic' || combined.includes('magic') || combined.includes('mana') || combined.includes('energy') || combined.includes('wave')) {
    return { id: 'arcane_missile', groundVfx: null, color: '#c084fc', duration: 800 };
  }

  return { id: 'energy_slash', groundVfx: null, color: '#93c5fd', duration: 700 };
}

function getSkillVfxId(skillId, skillDef = null) {
  const data = getSkillVfxData(skillId, skillDef);
  return data ? data.id : null;
}

function getWeaponAttackVfx(isCrit = false, useMagic = false, weaponType = 'melee') {
  const skin = state.activeSkin;
  if (skin === 'skin_weapon_frost_lord') {
    return isCrit
      ? { id: 'frost_blizzard', color: '#bbf2ff', duration: 900, reaction: 'is-frozen', reactionDuration: 600 }
      : { id: 'frost_slash', color: '#7dd3fc', duration: 650, reaction: 'is-frozen', reactionDuration: 350 };
  }
  if (skin === 'skin_weapon_infernal_dragon') {
    return isCrit
      ? { id: 'inferno_dragon_breath', color: '#ff7722', duration: 950, reaction: 'is-ignited', reactionDuration: 650 }
      : { id: 'inferno_slash', color: '#fb923c', duration: 700, reaction: 'is-ignited', reactionDuration: 450 };
  }
  if (skin === 'skin_weapon_celestial_holy') {
    return { id: 'celestial_strike', color: '#fef08a', duration: 800, reaction: 'is-consecrated', reactionDuration: 500 };
  }

  // Fallback para atributo elemental da arma equipada
  const equippedWpnUid = state.equipment?.weapon;
  const equippedWpn = equippedWpnUid ? state.inventory?.find(i => i.uid === equippedWpnUid) : null;
  const elem = equippedWpn?.elementalAttribute?.element;
  if (elem === 'water') {
    return { id: 'frost_slash', color: '#7dd3fc', duration: 650, reaction: 'is-frozen', reactionDuration: 350 };
  }
  if (elem === 'fire') {
    return { id: 'inferno_slash', color: '#fb923c', duration: 700, reaction: 'is-ignited', reactionDuration: 450 };
  }
  if (elem === 'holy') {
    return { id: 'celestial_strike', color: '#fef08a', duration: 800, reaction: 'is-consecrated', reactionDuration: 450 };
  }

  // 1. Magos & Usuários de Magia / Cajados / Maças Mágicas
  if (useMagic || weaponType === 'staff') {
    return isCrit
      ? { id: 'arcane_missile', color: '#c084fc', duration: 650, power: 2 }
      : { id: 'arcane_missile', color: '#818cf8', duration: 520, power: 1 };
  }

  // 2. Arqueiros e Pistoleiros (Armas de disparo à distância)
  if (weaponType === 'bow' || weaponType === 'gun') {
    return isCrit
      ? { id: 'snipe_shot', color: '#fde047', duration: 500, power: 2 }
      : { id: 'snipe_shot', color: '#f59e0b', duration: 420, power: 1 };
  }

  // 3. Guerreiros / Corpo a corpo (Espadas, Adagas, Martelos, Lanças, Machados)
  // Ataque físico direto: faíscas cortantes autênticas no alvo, e corte cruzado no crítico
  return isCrit
    ? { id: 'cross_slash', color: '#ffffff', duration: 500 }
    : { id: 'particles', color: '#fde68a', duration: 350 };
}

function getMonsterCategory(monster) {
  if (!monster) return 'humanoid';
  if (monster.category) return monster.category.toLowerCase();
  const id = String(monster.id || '').toLowerCase();
  if (id.includes('skeleton') || id.includes('death') || id.includes('crypt') || id.includes('vampire') || id.includes('lich') || id.includes('bone') || id.includes('cursed') || id.includes('corpse') || id.includes('soul')) return 'undead';
  if (id.includes('dragon') || id.includes('fafurion') || id.includes('tiamat') || id.includes('lindvior')) return 'dragon';
  if (id.includes('wolf') || id.includes('spider') || id.includes('satyr') || id.includes('snake') || id.includes('werewolf') || id.includes('cerberus') || id.includes('beast') || id.includes('trent') || id.includes('swamp')) return 'beast';
  if (id.includes('demon') || id.includes('void') || id.includes('beholder') || id.includes('devil')) return 'demon';
  return 'humanoid';
}

function getEquippedProcBonuses() {
  const procs = {
    boss_dmg: 0,
    on_kill_heal: 0,
    stun_chance: 0,
    type_dmg: { undead: 0, dragon: 0, beast: 0, demon: 0, humanoid: 0 }
  };

  if (!state.equipment) return procs;

  for (const slot of Object.keys(state.equipment)) {
    const uid = state.equipment[slot];
    if (!uid) continue;
    const inv = state.inventory.find(i => i.uid === uid);
    if (!inv || !Array.isArray(inv.affixes)) continue;

    inv.affixes.forEach(aff => {
      const defAff = D().AFFIX_MAP ? D().AFFIX_MAP[aff.id] : null;
      if (defAff && defAff.type === 'proc') {
        if (defAff.proc === 'boss_dmg') procs.boss_dmg += Number(aff.value) || 0;
        if (defAff.proc === 'on_kill_heal') procs.on_kill_heal += Number(aff.value) || 0;
        if (defAff.proc === 'stun_chance') procs.stun_chance += Number(aff.value) || 0;
        if (defAff.proc === 'type_dmg' && defAff.category && procs.type_dmg[defAff.category] !== undefined) {
          procs.type_dmg[defAff.category] += Number(aff.value) || 0;
        }
      }
    });
  }

  return procs;
}

function dealDamage(target, amount, type = 'physical') { 
  const rawAmount = Number(amount) || 0;
  const isMagic = type === 'magic';
  const def = isMagic ? (Number(target.mdef) || 0) : (Number(target.def) || 0); 
  return calculateDefenseMitigation(rawAmount, def, isMagic);
}

const goldEvents = []; 
function trackGold(amount) { goldEvents.push({ t: Date.now(), v: amount }); }
function getGoldPerSec() { const now = Date.now(); while (goldEvents.length && now - goldEvents[0].t > 30000) goldEvents.shift(); if (!goldEvents.length) return 0; return goldEvents.reduce((s, e) => s + e.v, 0) / 30; }
function floatText(text, cls = 'float-gold') {
  const layer = el('float-layer');
  if (!layer) return;
  while (layer.children.length >= MAX_FLOAT_ITEMS) { layer.removeChild(layer.firstChild); }
  const span = mkEl('span');
  span.className = 'float-text ' + cls;
  span.textContent = text;
  const rect = layer.getBoundingClientRect();
  span.style.left = (rect.width * (0.35 + Math.random() * 0.3)) + 'px';
  span.style.top = (rect.height * 0.55 + (Math.random() * 60 - 30)) + 'px';
  layer.appendChild(span);
  setTimeout(() => { if (span.parentNode === layer) layer.removeChild(span); }, 1400);
}

function checkBuffsExpire() {
  if (!state.buffs) return;
  const now = Date.now();
  for (const k of Object.keys(state.buffs)) {
    if (state.buffs[k].until < now) delete state.buffs[k];
  }
}

/**
 * Processa a derrota do monstro, cálculo de recompensas (XP/SP, Over-Hit, Drops, Quests)
 * e o surgimento do próximo alvo.
 * @param {Object} monster
 * @param {Object|null} killingSkill
 */
function processMonsterDefeat(monster, killingSkill = null) {
  stageMonsterDie();

  // Evolução de XP do Mascote
  PetService.addPetXp(state, monster.xp || 100, { log, floatText });

  // Colheita Agrícola do Manor
  ManorService.processHarvest(state, monster, { log });

  // Conclusão de Instância Solo (Kamaloka / Pailaka)
  if (monster.isInstanceBoss && monster.instanceId) {
    InstanceService.onInstanceBossVictory(state, monster.instanceId, { log, floatText, updateAllUI, save });
  }

  const procBonuses = getEquippedProcBonuses();
  if (procBonuses.on_kill_heal > 0) {
    const killHeal = Math.floor(state.maxHp * (procBonuses.on_kill_heal / 100));
    if (killHeal > 0) {
      state.hp = Math.min(state.maxHp, state.hp + killHeal);
      log(`🩸 處決！擊敗 ${monster.name} 後恢復 ${killHeal} 生命值`, 'heal');
      floatText(`+${killHeal} 生命值`, 'sf-heal');
    }
  }
  if (!monster.boss && !monster.isTower && state.zone) {
    state.zoneKills = state.zoneKills || {};
    state.zoneKills[state.zone] = (state.zoneKills[state.zone] || 0) + 1;
    updateZoneKillProgressUI();
  }

  state.killStreak = (state.killStreak || 0) + 1;
  if (state.killStreak % 5 === 0 && state.killStreak >= 5) {
    stageFloat(`🔥 連殺 x${state.killStreak}！`, 'sf-crit', 'right');
  }

  const sRates = state.serverRates || { xp: 1, sp: 1, adena: 1, drop: 1, spoil: 1, enchant: 1, book: 1 };
  const xpRate = Math.max(0.1, Number(sRates.xp) || 1);
  const spRate = Math.max(0.1, Number(sRates.sp) || 1);
  const adenaRate = Math.max(0.1, Number(sRates.adena) || 1);
  const dropRate = Math.max(0.1, Number(sRates.drop) || 1);
  const spoilRate = Math.max(0.1, Number(sRates.spoil) || 1);
  const bookRate = Math.max(0.1, Number(sRates.book) || 1);

  const zoneLevel = ZONES[state.zone]?.level || 1;
  const zoneTier = getZoneDropTier(zoneLevel);
  const zoneMult = (D().ZONE_GOLD_MULT && D().ZONE_GOLD_MULT[zoneTier]) || 1;
  const stats = getStats();

  const mLevel = monster.lvl || monster.level || zoneLevel || 1;
  const pLevel = state.level || 1;
  const gapMods = getLevelGapModifiers(pLevel, mLevel);

  // OVER-HIT: Concede bônus de +25% a +50% de EXP/SP se derrotado por skill de impacto/finalização
  let overhitBonusPct = 0;
  const isOverhit = killingSkill && (killingSkill.def?.overhit || killingSkill.overhit);
  if (isOverhit) {
    const maxHp = monster._maxHp || monster.maxHp || monster.hp || 100;
    const overkillDmg = monster._overkillDmg || (monster.hp < 0 ? Math.abs(monster.hp) : 10);
    const overkillRatio = Math.min(1.0, overkillDmg / maxHp);
    overhitBonusPct = Math.round(25 + (overkillRatio * 25)); // +25% a +50%
  }

  const liveOpsBonuses = LiveOpsService.getLiveOpsBonuses();
  const overhitMult = 1 + (overhitBonusPct / 100);
  const xpMult = (1 + (stats.xpBoost || 0)) * xpRate * overhitMult * gapMods.xpMultiplier * (liveOpsBonuses.xpMult || 1.0);
  const xpGain = Math.max(1, Math.floor(monster.xp * xpMult));

  // SP é concedido exclusivamente por Elites, Chefes de Área, Raidbosses e Missões
  let baseSp = 0;
  if (monster.isRaid) {
    baseSp = Math.max(50, Math.floor((monster.lvl || 40) * 4));
  } else if (monster.boss || monster.isBoss) {
    baseSp = Math.max(25, Math.floor((monster.lvl || 10) * 2.5));
  } else if (monster.elite || monster.isElite) {
    baseSp = Math.max(5, Math.floor((monster.lvl || 5) * 0.8) + 4);
  } else {
    baseSp = 0; // Monstros comuns NÃO dropam SP (Economia clássica)
  }
  const spGain = Math.floor(baseSp * spRate * overhitMult * gapMods.xpMultiplier * (liveOpsBonuses.spMult || 1.0));
  state.xp += xpGain;
  if (spGain > 0) state.sp += spGain;
  state.stats = state.stats || {};
  state.stats.monstersKilled = (state.stats.monstersKilled || 0) + 1;

  if (overhitBonusPct > 0) {
    log(`💥 **過量傷害！** 使用 **${killingSkill.def?.name || killingSkill.name}** 完成致命一擊！獲得 **+${overhitBonusPct}% 經驗值／技能點** 額外獎勵！`, 'rarity-legendary', 'gold_xp');
    if (typeof floatText === 'function') {
      floatText(`💥 過量傷害！（+${overhitBonusPct}% 經驗值）`, 'float-jackpot');
    }
  }

  log(`擊敗 **${monster.name}**！獲得 **+${xpGain.toLocaleString()} 經驗值**${spGain > 0 ? ` 與 **+${spGain} 技能點**` : ''}${gapMods.isTough ? '（🔥 高風險挑戰）' : ''}`, 'xp', 'gold_xp');

  // Drenagem de Alma para Soul Crystals (Níveis 1 a 15 e Epic Bosses)
  try {
    serviceProcessSoulDrainOnKill(state, monster, { log, floatText, updateAllUI, save });
  } catch (e) {
    console.warn('Erro na drenagem de almas:', e);
  }

  // Registra abates para a Meta Comunitária Global de Nível (Cap 40 -> 45)
  try {
    CommunityCapService.recordBossKill(monster, state, { log, updateAllUI });
  } catch (e) {
    console.warn('Erro ao registrar meta de cap comunitária:', e);
  }

  // Drops Especiais de Chefe do Caos (Chaos Boss)
  if (monster.isChaosBoss) {
    try {
      serviceProcessChaosBossLoot(state, monster, { log, floatText, updateAllUI, save });
    } catch (e) {
      console.warn('Erro ao processar loot do Chaos Boss:', e);
    }
  }

  // Acúmulo de 神燈 Mágica & Craft Points por Abate
  state.magicLampExp = (state.magicLampExp || 0) + Math.floor(xpGain * 0.4);
  state.craftPoints = (state.craftPoints || 0) + Math.floor((monster.boss ? 50 : 10) * spoilRate);

  if (state.magicLampExp >= 50000) {
    state.magicLampExp -= 50000;
    state.magicLamps = (state.magicLamps || 0) + 1;
    log(`🪔 新的魔法神燈已累積！（總數：${state.magicLamps}）`, 'rarity-legendary');
    if (typeof window !== 'undefined' && window.floatText) {
      window.floatText('🪔 魔法神燈 +1！', 'float-jackpot');
    }
  }

  if (state.craftPoints >= 1000) {
    state.craftPoints -= 1000;
    state.craftCharges = Math.min(100, (state.craftCharges || 0) + 1);
    log(`🛠️ 已累積製作充能！（總計：${state.craftCharges}）`, 'rarity-rare');
  }

  const baseGold = monster.gold[0] + Math.random() * (monster.gold[1] - monster.gold[0]), jackpot = Math.random() < (monster.boss ? 0.08 : 0.015);
  const goldMult = zoneMult * (1 + (stats.goldBoost || 0)) * (jackpot ? 10 : 1) * adenaRate * (liveOpsBonuses.goldMult || 1.0);
  let gold = Math.floor(baseGold * stats.loot * goldMult * gapMods.adenaMultiplier);
  if (gapMods.isGrey) gold = 0; // Monstro cinza: zero adena
  else if (gold < 1) gold = 1;
  state.gold += gold;
  if (gold > 0) trackGold(gold);
  if (gapMods.isGrey) {
    log(`⚠️ [等級懲罰] 怪物等級過低（${gapMods.reason}），無法獲得金幣。`, 'warning', 'gold_xp');
  } else if (jackpot) { 
    log(`🪙 大獎！獲得 **+${gold.toLocaleString()} 金幣**（×10）！`, 'rarity-legendary', 'gold_xp'); 
    floatText(`🪙 +${gold} 金幣`, 'float-jackpot'); 
  } else { 
    log(`從 ${monster.name} 獲得 **+${gold.toLocaleString()} 金幣**`, 'gold', 'gold_xp'); 
    if (gold >= 20) floatText(`+${gold} 金幣`, 'float-gold'); 
  }

  // Penalidade de Nível Canônica para Drop + Bônus de Dificuldade de Caça (15.5)
  const huntingDiff = MonsterAIEngine.getDifficulty(state);
  const diffDropMult = (huntingDiff && huntingDiff.dropMult) || 1.0;
  const levelGapPenalty = gapMods.dropMultiplier;
  const effectiveLootRate = (stats.loot || 1) * levelGapPenalty * dropRate * diffDropMult;
  const dropRollFn = (typeof D === 'function' && typeof D()?.rollDrop === 'function') ? D().rollDrop : rollDrop;
  const rawDrop = dropRollFn(zoneTier, effectiveLootRate, !!(monster.boss || monster.elite));
  const drops = Array.isArray(rawDrop) ? rawDrop : (rawDrop && rawDrop.itemId ? [ { id: rawDrop.itemId, itemId: rawDrop.itemId, rarity: rawDrop.rarity, isEquipment: true, amount: 1 } ] : []);
  for (const drop of drops) {
    const dropId = drop.id || drop.itemId;
    const allDict = (typeof D === 'function' && D()?.ALL_ITEMS) ? D().ALL_ITEMS : ALL_ITEMS;
    const def = allDict ? allDict[dropId] : null;
    if (dropId && def) {
      const isEquip = drop.isEquipment || !['material', 'potion', 'consumable', 'scroll', 'gem'].includes(def.slot);
      if (isEquip) {
        addToInventory(dropId, 1, drop.rarity || 'common');
        const rName = D()?.RARITY?.[drop.rarity || 'common']?.name || ({ common: '一般', uncommon: '非凡', rare: '稀有', epic: '史詩', legendary: '傳說', mythic: '神話', primordial: '太古', sovereign: '君王' })[String(drop.rarity || 'common').toLowerCase()] || '一般';
        log(`✦ 獲得 **${def.name}** [${rName}]！`, 'rarity-' + (drop.rarity || 'common'), 'loot');
        floatText(`✦ ${rName}！`, 'float-' + (drop.rarity || 'common'));
      } else {
        addToInventory(dropId, drop.amount || 1);
        log(`📦 獲得 **${drop.amount || 1}× ${def.name}**`, 'loot', 'loot');
      }
    }
  }

  // Drop de Livros de Magia (Spellbooks 1★, 2★, 3★, 4★)
  if (mLevel >= 38) {
    const bookChance = (monster.isRaid ? 0.30 : (monster.boss ? 0.08 : 0.005)) * levelGapPenalty * bookRate;
    if (Math.random() < bookChance) {
      let droppedBookId = 'book_1star';
      // Tomo 4★ é EXCLUSIVO de Epic Bosses, Raids e Chefes de Dungeon Lv 70+
      if (monster.isRaid || (monster.boss && mLevel >= 70)) droppedBookId = 'book_4star';
      else if (mLevel >= 56) droppedBookId = 'book_3star';
      else if (mLevel >= 48) droppedBookId = 'book_2star';

      const bookDef = D().ALL_ITEMS[droppedBookId];
      if (bookDef) {
        addToInventory(droppedBookId, 1);
        log(`📖 魔法書掉落！從 ${monster.name} 獲得 **${bookDef.name}**！`, 'rarity-legendary', 'loot');
        floatText(`📖 ${bookDef.name}！`, 'float-jackpot');
      }
    }
  }

  // Drop de Carta de Monstro Colecionável (0.05% comum, 0.15% elite, 0.8% boss)
  const monKey = monster.id || monster.monsterId || monster.originalId;
  const cardId = `card_${monKey}`;
  const cardDef = MONSTER_CARDS[cardId] || MONSTER_CARDS[`card_${String(monKey).toLowerCase()}`];
  if (cardDef) {
    const dropChance = (cardDef.dropChance || (monster.isRaid ? 0.015 : (monster.boss ? 0.008 : 0.0005))) * levelGapPenalty;
    if (Math.random() < dropChance) {
      addToInventory(cardId, 1);
      log(`🃏 稀有掉落！獲得 **${cardDef.name}** [${D()?.RARITY?.[cardDef.rarity || 'rare']?.name || ({ common: '一般', uncommon: '非凡', rare: '稀有', epic: '史詩', legendary: '傳說', mythic: '神話', primordial: '太古', sovereign: '君王' })[String(cardDef.rarity || 'rare').toLowerCase()] || '稀有'}]！`, 'rarity-' + (cardDef.rarity || 'rare'), 'loot');
      floatText(`🃏 怪物卡片！`, 'float-jackpot');
    }
  }

  // Drop de Monster Dolls Colecionáveis (Lv 1+)
  const monNameLower = String(monster.name || monKey || '').toLowerCase();
  let candidateDollId = null;
  if (monNameLower.includes('goblin')) candidateDollId = 'doll_goblin';
  else if (monNameLower.includes('wolf')) candidateDollId = 'doll_wolf';
  else if (monNameLower.includes('skeleton')) candidateDollId = 'doll_skeleton';
  else if (monNameLower.includes('orc')) candidateDollId = 'doll_orc';
  else if (monNameLower.includes('dryad') || monNameLower.includes('fungus') || monNameLower.includes('spore')) candidateDollId = 'doll_dryad';

  if (candidateDollId && BOSS_DOLLS[candidateDollId]) {
    const dollChance = (monster.isRaid ? 0.08 : (monster.boss ? 0.04 : (monster.elite ? 0.015 : 0.003))) * levelGapPenalty;
    if (Math.random() < dollChance) {
      state.dolls = state.dolls || [];
      const dollDef = BOSS_DOLLS[candidateDollId];
      state.dolls.push({ uid: 'doll_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4), dollId: candidateDollId, level: 1 });
      log(`🧸 娃娃掉落！獲得 **${dollDef.name}** [等級 1]！`, 'rarity-rare', 'loot');
      floatText(`🧸 ${dollDef.name}！`, 'float-jackpot');
      if (typeof updateDollsUI === 'function') updateDollsUI();
    }
  }

  // Drop Canônico de Seal Stones (Seven Signs) em Zonas de Necrópole e Catacumbas
  const isNecroZone = state.zone && (state.zone.startsWith('necro_') || state.zone.includes('necropolis') || state.zone.includes('catacomb'));
  if (isNecroZone) {
    const necroDef = NECROPOLIS_ZONES.find(nz => nz.id === state.zone);
    const eligibleStones = necroDef?.stones || (mLevel >= 75 ? ['seal_stone_red'] : (mLevel >= 50 ? ['seal_stone_green'] : ['seal_stone_blue']));
    const stoneChance = (monster.boss ? 0.90 : (monster.elite ? 0.60 : 0.35)) * levelGapPenalty * dropRate;
    if (Math.random() < stoneChance) {
      const pickedStone = eligibleStones[Math.floor(Math.random() * eligibleStones.length)];
      const stoneDef = SEAL_STONES[pickedStone];
      const count = monster.boss ? (Math.floor(Math.random() * 4) + 3) : (monster.elite ? 2 : 1);
      if (stoneDef) {
        addToInventory(pickedStone, count);
        log(`🔷 [七封印] 獲得 **${count}× ${stoneDef.name}**！`, 'gain', 'loot');
        floatText(`🔷 +${count} ${stoneDef.name}`, 'float-jackpot');
      }
    }
  }

  triggerQuestEvent('kill', 1);
  if (monster.boss || monster.elite) triggerQuestEvent('boss', 1);
  triggerQuestEvent('gold', gold);
  NoblesseService.recordKill(state, monster, { log });

  if (monster.isTower) {
    onTowerFloorVictory(monster.towerFloor);
  }

  if (monster.isRaid) {
    serviceHandleRaidVictory(state, state.activeRaidId || state.target, {
      log,
      onUpdate: () => { updateAllUI(); save(); }
    });
    state.isRaidActive = false;
    state.activeRaidId = null;
    state.zone = state.lastHuntingZone || state.lastSafeZone || (state.race ? (RACES[state.race]?.startZone || 'talkingIsland') : 'talkingIsland');
    state.target = null;
    state.activeMonster = null;
  }

  checkLevelUp();
  if (state.isCombatActive !== false) {
    if (monster.isTower && state.lastHuntingZone) {
      state.zone = state.lastHuntingZone;
    }
    pickRandomMonster();
  }
}

/**
 * Determina o tipo canônico de dano da habilidade (mágico vs físico).
 * O tipo canônico da habilidade governa o dispatch (elimina stats.matk > stats.atk).
 */
export function isMagicSkillDef(def, skillId) {
  if (def) {
    if (def.damageType === 'magic') return true;
    if (def.damageType === 'physical') return false;
    if (typeof def.isMagic === 'boolean') return def.isMagic;
  }
  return isMagicSkill(def?.name || skillId, def, null, state?.class);
}

export function attackMonster() {
  if (typeof window !== 'undefined') window.attackMonster = attackMonster;
  if (state.isCombatActive === false) return;
  if ((!state.zone && !state.isRaidActive) || !state.target) return;

  if (state.towerCombatActive) {
    const elapsed = Date.now() - (state.towerStartTime || Date.now());
    if (elapsed > 60000) {
      state.towerCombatActive = false;
      log('⏱️ 副本時間已結束（60 秒）！高塔挑戰失敗！', 'warning');
      if (typeof window !== 'undefined' && window.floatText) window.floatText('⏱️ 時間已到！', 'float-warning');
      state.activeMonster = null;
      if (state.lastHuntingZone) state.zone = state.lastHuntingZone;
      pickRandomMonster();
      updateAllUI();
      return;
    }
  }

  checkBuffsExpire();
  const stats = getStats(), monster = state.activeMonster || MONSTERS[state.target]; if (!monster) return;
  if (monster.isRaid) {
    serviceProcessRaidBossMechanics(state, {
      log,
      floatText,
      onFatalImpact: (dmg) => {
        stageHeroHurt(dmg, true);
        if (state.hp <= 0) {
          state.hp = 0;
          playerDeath(monster);
        }
        updateStatsUI();
      }
    });
  }
  combatTick++;

  // Processamento de Sangramento Contínuo (Bleed - Caçador das Sombras)
  if (monster._bleedTicks && monster._bleedTicks > 0) {
    monster._bleedTicks--;
    const bDmg = monster._bleedDamage || 20;
    monster.hp -= bDmg;
    log(`🩸 深度流血：${monster.name} 持續受到 ${bDmg} 傷害！`, 'combat');
    if (typeof stageFloat === 'function') stageFloat(`-${bDmg} 流血`, 'sf-crit', 'right');
  }

  if (stats.regenHp > 0) {
    state._regenAcc = (state._regenAcc || 0) + 0.2; 
    if (state._regenAcc >= 10) { state._regenAcc = 0; const heal = Math.max(1, Math.floor(state.maxHp * stats.regenHp)); if (state.hp < state.maxHp) { state.hp = Math.min(state.maxHp, state.hp + heal); log(`聖光：+${heal} 生命值`, 'heal'); } }
  }
  if (stats.mpRegen > 0) {
    state._mpRegenAcc = (state._mpRegenAcc || 0) + 0.2;
    if (state._mpRegenAcc >= 5) { state._mpRegenAcc = 0; if (state.mp < state.maxMp) { state.mp = Math.min(state.maxMp, state.mp + stats.mpRegen); } }
  }
  const apSettings = state.autoPotionSettings = state.autoPotionSettings || {
    hpThreshold: 0.6,
    mpThreshold: 0.4,
    autoHp: true,
    autoMp: true
  };
  const shouldAutoPot = stats.autoPotion || state.autoPotionActive;
  if (shouldAutoPot) {
    const potNow = Date.now();
    if (apSettings.autoHp !== false && state.hp < state.maxHp * (apSettings.hpThreshold || 0.6)) {
      if (!state._lastHpPotTime || (potNow - state._lastHpPotTime) >= 1500) {
        const potIds = ['hp_potion_xl','hp_potion_l','hp_potion_m','hp_potion_s'];
        for (const pid of potIds) {
          const it = state.inventory.find(i => i.itemId === pid && ((i.count ?? i.qty ?? 1) > 0));
          if (it) { useItem(it.uid); break; }
        }
      }
    }
    if (apSettings.autoMp !== false && state.mp < state.maxMp * (apSettings.mpThreshold || 0.4)) {
      if (!state._lastMpPotTime || (potNow - state._lastMpPotTime) >= 1500) {
        const mpPotIds = ['mp_potion_xl','mp_potion_l','mp_potion_m','mp_potion_s'];
        for (const pid of mpPotIds) {
          const it = state.inventory.find(i => i.itemId === pid && ((i.count ?? i.qty ?? 1) > 0));
          if (it) { useItem(it.uid); break; }
        }
      }
    }
  }

  // 3. Ação Autônoma Periódica do Monstro (Cadência própria de ataque desacoplada do jogador)
  if (monster && monster.hp > 0 && !monster.isRaid) {
    const enemyAtkInterval = Math.max(400, Math.round(1500 / (monster.atkSpd || 1.0)));
    const enemyAtkTicks = Math.max(1, Math.round(enemyAtkInterval / 200));
    if (combatTick % enemyAtkTicks === 0) {
      monsterAttack(monster);
      if (state.hp <= 0) return;
    }
  }

  if (!state._cds) state._cds = {};
  const now = combatTick * 200;

  const activeSkills = [];
  const autoCastSettings = state.skillAutoCast || {};

  // Skill Loadout 2.0: iterate only equipped skills in slot priority order
  const loadout = state.skillLoadout || {};
  const hasLoadout = Object.values(loadout).some(v => v != null);

  if (hasLoadout) {
    // Loadout path: only equipped skills, in priority order (ultimate → basic)
    for (const slotName of SLOT_PRIORITY_ORDER) {
      const sId = loadout[slotName];
      if (!sId) continue;
      const lvl = state.skills[sId];
      const def = SKILL_DEFS[sId];
      if (!def || !lvl || lvl <= 0) continue;
      const isPassive = def.type === 'passive' || def.type === 'stat';
      if (isPassive) continue;
      if (autoCastSettings[sId] === false) continue;
      if (!isSkillAllowedForClass(state.class, sId)) continue;
      if ((Number(def.requiredLevel || def.reqLvl) || 1) > state.level) continue;
      activeSkills.push({ id: sId, lvl, def, slot: slotName });
    }
  } else {
    // Legacy fallback: iterate all learned skills (for saves before migration completes)
    const priorityOrder = state.skillPriorityOrder || [];
    for (const [sId, lvl] of Object.entries(state.skills)) {
      const def = SKILL_DEFS[sId];
      if (lvl > 0 && def) {
        const isPassive = def.type === 'passive' || def.type === 'stat';
        if (!isPassive) {
          if (autoCastSettings[sId] === false) continue;
          const belongsToClass = isSkillAllowedForClass(state.class, sId) && (Number(def.requiredLevel || def.reqLvl) || 1) <= state.level;
          if (belongsToClass) {
            activeSkills.push({ id: sId, lvl, def });
          }
        }
      }
    }
    activeSkills.sort((a, b) => {
      const pA = priorityOrder.indexOf(a.id);
      const pB = priorityOrder.indexOf(b.id);
      if (pA !== -1 && pB !== -1) return pA - pB;
      if (pA !== -1) return -1;
      if (pB !== -1) return 1;
      return (b.def.tier || 0) - (a.def.tier || 0);
    });
  }


  const realNow = Date.now();
  let castedSkillThisTick = false;
  for(const skill of activeSkills) {
    // 0. Validação de Arma e Escudo para a Habilidade
    const wpnCheck = (typeof canCastSkillWeapon === 'function') ? canCastSkillWeapon(state, skill.def) : { ok: true };
    if (!wpnCheck.ok) {
      continue; // Arma ou Escudo incompatível com o requisito da skill
    }

    // 0.1 Validação de Condições Táticas de Auto-Battle (HP%, Inimigos Mínimos, Alvo Boss)
    if (!shouldCastSkill(state, skill.id, skill.slot, monster)) {
      continue;
    }

    const isBuff = skill.def.type === 'buff' || skill.def.type === 'harmony' || skill.def.type === 'toggle' || skill.def.effect === 'warcry';
    const isHeal = skill.def.effect === 'heal' || skill.def.type === 'heal' || skill.id.includes('heal') || skill.id.includes('curation');

    // 1. Se a habilidade é um Buff/Warcry, verifica se o efeito ainda está ativo!
    if (isBuff) {
      const activeBuff = state.buffs && (state.buffs[skill.id] || state.buffs['warcry']);
      if (activeBuff && activeBuff.until > realNow) {
        // Buff ainda ativo no personagem, não re-convoque nem solte novamente!
        continue;
      }
    }

    state.stats = stats;
    const canCast = canCastSkill(state, skill.def, realNow, state._cds);
    if (!canCast.canCast) {
      continue;
    }

    const consumed = consumeSkillMp(state, skill.def, realNow, state._cds);
    if (!consumed.success) {
      continue;
    }
      
    if (isBuff) {
        state.buffs = state.buffs || {};
        const buffDuration = 60000; // 60 segundos de efeito
        const buffAmt = window.SkillScaling ? window.SkillScaling.getSkillBuffAtLevel(skill.lvl) : (0.20 + (skill.lvl * 0.05));
        const buffObj = { amount: buffAmt, until: realNow + buffDuration, effect: 'warcry' };
        state.buffs[skill.id] = buffObj;
        state.buffs['warcry'] = buffObj;
        log(`🗣 ${skill.def.name}！${skill.def.info || '增益效果持續 60 秒'}`, 'rarity-rare');
        floatText(skill.def.name, 'float-epic');

        // Dispara VFX Premium de Aura de Buff (ancorado aos pés do herói)
        const source = getHeroBasePoint();
        let buffColor = '#ffd700'; // Ouro / Âmbar padrão
        const lowerName = String(skill.def.name || skill.id).toLowerCase();
        if (lowerName.includes('berserk') || lowerName.includes('frenzy') || lowerName.includes('rage') || lowerName.includes('guts')) buffColor = '#ef4444';
        else if (lowerName.includes('shield') || lowerName.includes('protect') || lowerName.includes('guard') || lowerName.includes('barrier')) buffColor = '#3b82f6';
        else if (lowerName.includes('death') || lowerName.includes('whisper') || lowerName.includes('vampir') || lowerName.includes('shadow')) buffColor = '#a855f7';
        else if (lowerName.includes('haste') || lowerName.includes('wind') || lowerName.includes('agility') || lowerName.includes('speed')) buffColor = '#22c55e';
        else if (lowerName.includes('acumen') || lowerName.includes('empower') || lowerName.includes('clarity') || lowerName.includes('mana')) buffColor = '#06b6d4';

        if (!globalVFXOrchestrator.hasSkill(skill.id)) {
          playCombatVFX('buff_aura', {
            source,
            target: source,
            color: buffColor,
            power: Math.max(1, skill.lvl || 1),
            duration: 1100
          });
        }

        const orchestratorDef = globalVFXOrchestrator._skillDefRegistry.get(skill.id);
        const skillDefForVfx = orchestratorDef || skill.def;

        combatEvents.emit(CombatEventType.SKILL_CAST, {
          skillId: skill.id,
          skillName: skillDefForVfx.identity?.name || skill.def.name,
          caster: 'hero',
          target: 'hero',
          sourcePos: source,
          targetPos: source,
          def: skillDefForVfx
        });
      } else if (isHeal) {
        const healAmt = window.SkillScaling ? window.SkillScaling.getSkillHealAtLevel(stats.maxHp, skill.lvl, stats.matk) : Math.floor(stats.maxHp * (0.25 + skill.lvl * 0.05));
        state.hp = Math.min(stats.maxHp, state.hp + healAmt);
        log(`✨ ${skill.def.name}！恢復 ${healAmt} 生命值`, 'heal');
        floatText(`+${healAmt} 生命值`, 'sf-heal');

        // Dispara VFX Premium de Cura Sagrada (ancorado aos pés do herói)
        const source = getHeroBasePoint();
        if (!globalVFXOrchestrator.hasSkill(skill.id)) {
          playCombatVFX('holy_heal', {
            source,
            target: source,
            color: '#4ade80',
            power: Math.max(1, skill.lvl || 1),
            duration: 950
          });
        }

        const orchestratorDef = globalVFXOrchestrator._skillDefRegistry.get(skill.id);
        const skillDefForVfx = orchestratorDef || skill.def;

        combatEvents.emit(CombatEventType.SKILL_CAST, {
          skillId: skill.id,
          skillName: skillDefForVfx.identity?.name || skill.def.name,
          caster: 'hero',
          target: 'hero',
          sourcePos: source,
          targetPos: source,
          def: skillDefForVfx
        });
      } else {
        const useMagicSkill = isMagicSkillDef(skill.def, skill.id);
        const type = useMagicSkill ? 'magic' : 'physical';
        const baseSkillDmg = useMagicSkill ? stats.matk : stats.atk;
        const skillPwr = window.SkillScaling ? window.SkillScaling.getSkillPwrAtLevel(skill.def, skill.lvl) : (Number(skill.def.pwr) || 30);
        let rawSDmg = dealDamage(monster, baseSkillDmg * (skillPwr / 10), type);
        
        // Trigger de Ressonância de Habilidades
        WeaponResonanceService.onSkillCast(state, skill.def, monster, { log, floatText });

        const skillWeaponType = skill.def.weaponType || skill.def.requiredWeapon || (useMagicSkill ? 'staff' : 'sword');

        // Aplica Dano de Postura e obtém Multiplicador de Break (2.0x se vulnerável)
        const staggerResult = StaggerEngine.applyStaggerDamage(monster, rawSDmg, skillWeaponType, true, false, { log, floatText });
        if (staggerResult.mult > 1.0) {
          rawSDmg = Math.floor(rawSDmg * staggerResult.mult);
        }
        if (staggerResult && staggerResult.isBreak) {
          combatEvents.emit(CombatEventType.SKILL_STAGGER, {
            target: 'monster',
            targetPos: getCombatTargetPoint(),
            isBreak: true
          });
        }

        // Aplica Amplificação de Ressonância Cruzada (ex: Adaga consumindo Marca de Arco)
        const resonanceResult = WeaponResonanceService.processAttackImpact(state, monster, skillWeaponType, rawSDmg, { log, floatText });
        let sDmg = (resonanceResult && typeof resonanceResult.finalDamage === 'number') ? resonanceResult.finalDamage : rawSDmg;
        const elemSkillRes = ElementalService.calculatePlayerElementalDamage(state, monster, sDmg);
        sDmg = elemSkillRes.finalDamage;

        // IA do Monstro: Reações defensivas (Bloqueio, Esquiva Ladina, Barreira, Enrage)
        const aiSkillReaction = MonsterAIEngine.processIncomingDamage(monster, sDmg, !useMagicSkill, state);
        sDmg = aiSkillReaction.finalDamage;
        if (aiSkillReaction.reflectedDamage > 0) {
          state.hp = Math.max(0, state.hp - aiSkillReaction.reflectedDamage);
          stageHeroHurt(aiSkillReaction.reflectedDamage);
        }
        for (const ev of (aiSkillReaction.events || [])) {
          if (ev.floatText && typeof stageFloat === 'function') stageFloat(ev.floatText, ev.floatStyle || 'sf-crit', 'right');
          if (ev.log) log(ev.log, 'warning');
        }
        if (aiSkillReaction.wasDodged) {
          stageMonsterHurt(0, false, null, 200);
          return;
        }

        // Penalidade de CP / Equipamento Insuficiente contra monstros de alta graduação
        const zoneProg = state.zone ? getZoneProgression(state.zone) : null;
        const targetMinCp = zoneProg?.minCp || monster.minCp || 0;
        const currentCp = stats.combatPower || state.combatPower || 0;
        if (targetMinCp > 0 && currentCp < targetMinCp) {
          const cpRatio = Math.max(0.05, currentCp / targetMinCp);
          sDmg = Math.max(1, Math.floor(sDmg * cpRatio));
        }
        
        monster.hp -= sDmg;
        const killedBySkill = monster.hp <= 0;
        if (killedBySkill) {
          monster._killingSkill = skill;
          monster._overkillDmg = Math.abs(monster.hp);
        }
        const vfxData = getSkillVfxData(skill.id, skill.def);
        if (skill.def.effect === 'vampiric' || skill.def.effect === 'drain' || skill.id.includes('vampir') || skill.id.includes('drain') || (vfxData && vfxData.id === 'magic_vampiric_drain')) {
          const vHeal = calculateVampiricHeal(sDmg, stats.maxHp || state.maxHp, COMBAT_CONFIG.lifestealRatioDefault);
          if (vHeal > 0) {
            state.hp = Math.min(stats.maxHp || state.maxHp, state.hp + vHeal);
            if (typeof floatText === 'function') floatText(`+${vHeal} 生命值`, 'sf-heal');
            log(`🦇 吸血！吸收 ${vHeal} 生命值`, 'heal');
          }
        }
        const skinReaction = state.activeSkin === 'skin_weapon_frost_lord' ? 'is-frozen' : (state.activeSkin === 'skin_weapon_infernal_dragon' ? 'is-ignited' : (state.activeSkin === 'skin_weapon_celestial_holy' ? 'is-consecrated' : null));
        stageHeroAttack();
        stageMonsterHurt(sDmg, false, skinReaction, 400);
        
        const sourcePt = getStagePositionRelative('hero');
        const isGroundFeet = MONSTER_FEET_EFFECTS.has(skill.id) || (vfxData && MONSTER_FEET_EFFECTS.has(vfxData.id));
        const targetPt = isGroundFeet ? getCombatTargetBasePoint() : getCombatTargetPoint();
        const orchestratorDef = globalVFXOrchestrator._skillDefRegistry.get(skill.id);
        const skillDefForVfx = orchestratorDef || skill.def;

        combatEvents.emit(CombatEventType.SKILL_CAST, {
          skillId: skill.id,
          skillName: skillDefForVfx.identity?.name || skill.def.name,
          caster: 'hero',
          target: 'monster',
          sourcePos: sourcePt,
          targetPos: targetPt,
          def: skillDefForVfx
        });

        combatEvents.emit(CombatEventType.SKILL_HIT, {
          skillId: skill.id,
          target: 'monster',
          targetPos: targetPt,
          isCrit: false,
          damage: sDmg
        });

        combatEvents.emit(CombatEventType.SKILL_DAMAGE, {
          skillId: skill.id,
          target: 'monster',
          targetPos: targetPt,
          damage: sDmg,
          isCrit: false,
          element: elemSkillRes?.element || null
        });

        if (staggerResult && staggerResult.isBreak) {
          combatEvents.emit(CombatEventType.SKILL_STAGGER, {
            target: 'monster',
            targetPos: targetPt,
            isBreak: true
          });
        }
        
        if (vfxData && vfxData.id && !globalVFXOrchestrator.hasSkill(skill.id)) {
          const source = sourcePt;
          const target = targetPt;
          playCombatVFX(vfxData.id, {
            source,
            target,
            color: vfxData.color || '#ffd700',
            power: Math.max(1, skill.lvl || 1),
            duration: vfxData.duration || 800,
            arrowCount: vfxData.id === 'arrow_rain' ? 16 : undefined,
            targetArea: vfxData.id === 'arrow_rain' ? { x: target.x - 90, y: getCombatTargetBasePoint().y - 40, width: 180, height: 70 } : undefined
          });

          const baseTarget = getCombatTargetBasePoint();

          // Dispara o efeito realista de solo ancorado na borda inferior do monstro
          if (vfxData.groundVfx) {
            playCombatVFX(vfxData.groundVfx, {
              source,
              target: baseTarget,
              color: vfxData.color || '#ffd700',
              power: Math.max(1, skill.lvl || 1),
              duration: vfxData.duration || 900
            });
          }
        }

        log(`💥 ${skill.def.name}！造成 ${sDmg} ${type === 'magic' ? '魔法' : '物理'}傷害`, 'rarity-epic');
        if (skill.def.effect === 'stun' && !killedBySkill) {
           monster._stunnedUntil = realNow + 3500;
           log(`💫 ${monster.name} 被暈眩了！`, 'rarity-rare');
        }

        if (killedBySkill) {
          combatEvents.emit(CombatEventType.SKILL_KILL, {
            skillId: skill.id,
            target: 'monster',
            targetPos: targetPt,
            overkill: monster._overkillDmg || 0
          });
          processMonsterDefeat(monster, skill);
          updateStatsUI();
          return;
        }
      }
      
      castedSkillThisTick = true;
      break; 
    }

  if (castedSkillThisTick) return;

  const atkInterval = Math.max(200, 1000 - stats.atkSpd * 600);
  if (combatTick % Math.max(1, Math.round(atkInterval / 200)) !== 0) return;

  // Level Gap Miss Penalty: se o monstro é muito superior (+3 níveis), aumenta a chance de Miss do jogador
  const monLvl = monster.lvl || 1;
  const pLvl = state.level || 1;
  const gap = monLvl - pLvl;
  if (gap >= 3) {
    const missChance = gap >= 10 ? 0.70 : (gap >= 5 ? 0.35 : 0.15);
    if (Math.random() < missChance) {
      log(`❌ 未命中！${monster.name} 閃避了你的攻擊（等級差 +${gap}）！`, 'warning');
      if (typeof stageFloat === 'function') stageFloat('未命中', 'sf-miss', 'right');
      return;
    }
  }

  stageHeroAttack();

  const useMagic = stats.matk > stats.atk;
  const atkVal = useMagic ? stats.matk : stats.atk;
  const atkType = useMagic ? 'magic' : 'physical';
  
  let damage = dealDamage(monster, atkVal, atkType);
  let wasCrit = false;

  // Bônus de Atributo Elemental das Armas Equipadas (Primária + Arsenal Secundário via ElementalService)
  const elemAtkRes = ElementalService.calculatePlayerElementalDamage(state, monster, damage);
  damage = elemAtkRes.finalDamage;
  if (elemAtkRes.bonusText && typeof stageFloat === 'function') {
    stageFloat(elemAtkRes.bonusText, 'sf-crit', 'right');
  }
  
  let soulshotCritBonus = 0;
  if (state.soulshotActive) {
    const isMageClass = ClassValidationService.isMageClass(state.class);
    // Detecta a Grade da Arma equipada
    let weaponGrade = 'NG';
    let wpnDef = null;
    if (state.equipment?.weapon) {
      const wpnItem = state.inventory?.find(i => i.uid === state.equipment.weapon);
      wpnDef = wpnItem ? D().ALL_ITEMS[wpnItem.itemId] : null;
      if (wpnDef?.grade) weaponGrade = String(wpnDef.grade).toUpperCase();
      else if (wpnDef?.tier) {
        const TIER_GRADE = { 1: 'NG', 2: 'D', 3: 'C', 4: 'B', 5: 'A', 6: 'S' };
        weaponGrade = TIER_GRADE[wpnDef.tier] || 'NG';
      }
    }

    const gradeSuffix = weaponGrade.toLowerCase();
    const targetDedicatedId = isMageClass 
      ? `spiritshot_${gradeSuffix}` 
      : `soulshot_${gradeSuffix}`;

    // 1. Prioridade Máxima: Tiro dedicado da Grade correta da arma (+100% de dano)
    let shotItem = state.inventory?.find(i => i && (i.count || 1) > 0 && i.itemId === targetDedicatedId);
    let isUniversal = false;

    // 2. Fallback: Tiro Universal como curinga automático para qualquer grau (+30% de dano)
    if (!shotItem) {
      shotItem = state.inventory?.find(i => {
        if (!i || (i.count || 1) <= 0) return false;
        const iId = String(i.itemId || '');
        if (isMageClass) {
          return iId === 'blessed_spiritshot_universal' || iId === 'spiritshot_universal';
        } else {
          return iId === 'soulshot_universal';
        }
      });
      if (shotItem) isUniversal = true;
    }

    // Se não tiver o tiro da grade correta nem o universal (ex: arma D com tiro NG), o tiro não é ativado
    if (shotItem) {
      // Consumo universal justo: exatamente 1 tiro por ataque para todas as armas (sem penalidades artificiais)
      if ((shotItem.count || 1) > 1) {
        shotItem.count--;
      } else {
        removeFromInventory(shotItem.uid, 1);
      }

      // O tiro dedicado da grade correta dá +100% de dano (2.0x).
      // O tiro universal curinga dá +30% de dano (1.30x).
      const shotMult = isUniversal ? 1.30 : 2.0;
      damage = Math.floor(damage * shotMult);

      if (isMageClass) {
        if (shotItem.itemId === 'blessed_spiritshot_universal') soulshotCritBonus = 5;
        const label = isUniversal ? '通用魔靈彈（+30%）' : '魔靈彈（+100%）';
        stageFloat(`✨ ${label}`, 'sf-crit', 'left');
      } else {
        const label = isUniversal ? '通用魂彈（+30%）' : '魂彈（+100%）';
        stageFloat(`⚡ ${label}`, 'sf-crit', 'left');
      }
      updateCombatControlsUI();
    }
  }

  if (Math.random() < (stats.crit + soulshotCritBonus) / 100) { 
    damage = Math.floor(damage * 1.5 * stats.critDmg); 
    wasCrit = true; 
    log(`暴擊！對 ${monster.name} 造成 ${damage} 傷害`, 'combat'); 
  } else { 
    log(`對 ${monster.name} 造成 ${damage} 基礎傷害`, 'damage'); 
  }
  
  if (stats.lifeDrain > 0) {
    const rawHeal = Math.floor(damage * stats.lifeDrain);
    const maxHeal = Math.floor((stats.maxHp || state.maxHp || 100) * 0.30);
    const heal = Math.min(rawHeal, maxHeal);
    if (heal > 0) { state.hp = Math.min(state.maxHp, state.hp + heal); }
  }
  
  const procBonuses = getEquippedProcBonuses();
  let affixDmgMult = 1.0;
  if (monster.boss && procBonuses.boss_dmg > 0) {
    affixDmgMult += procBonuses.boss_dmg / 100;
  }
  const monCat = getMonsterCategory(monster);
  if (procBonuses.type_dmg[monCat] > 0) {
    affixDmgMult += procBonuses.type_dmg[monCat] / 100;
  }

  damage = Math.floor(damage * affixDmgMult);

  const primaryWeaponType = WeaponResonanceService.getEquippedWeaponTypes(state).weap1 || (useMagic ? 'staff' : 'sword');

  const staggerResult = StaggerEngine.applyStaggerDamage(monster, damage, primaryWeaponType, false, wasCrit, { log, floatText });
  if (staggerResult.mult > 1.0) {
    damage = Math.floor(damage * staggerResult.mult);
  }
  if (staggerResult && staggerResult.isBreak) {
    combatEvents.emit(CombatEventType.SKILL_STAGGER, {
      target: 'monster',
      targetPos: getCombatTargetPoint(),
      isBreak: true
    });
  }

  // Aplica Amplificação de Ressonância Cruzada
  const resonanceResult = WeaponResonanceService.processAttackImpact(state, monster, primaryWeaponType, damage, { log, floatText });
  damage = resonanceResult.finalDamage;

  if (procBonuses.stun_chance > 0 && Math.random() * 100 < procBonuses.stun_chance) {
    monster._stunnedUntil = realNowAttack + 1500;
    log(`💫 暈眩觸發！${monster.name} 被暈眩 1.5 秒`, 'rarity-rare');
    floatText('暈眩！', 'float-epic');
  }

  // Procs de Certificação de Subclasse ao Atacar (Warrior: Counter Haste, Rogue: Chance Critical)
  const realNowAttack = Date.now();
  if (stats.hasteProc && Math.random() < 0.06) {
    state.buffs = state.buffs || {};
    state.buffs['counter_haste'] = { amount: 32, until: realNowAttack + 10000 };
    log(`⚡ **[副職業] 反擊急速觸發！** +32% 攻擊速度，持續 10 秒！`, 'rarity-legendary');
    if (typeof stageFloat === 'function') stageFloat('⚡ 急速！', 'sf-crit', 'left');
    else if (typeof floatText === 'function') floatText('⚡ 急速！', 'float-jackpot');
  }
  if (stats.critProc && Math.random() < 0.06) {
    state.buffs = state.buffs || {};
    state.buffs['chance_critical'] = { amount: 35, until: realNowAttack + 10000 };
    log(`💥 **[副職業] 暴擊觸發！** +35 暴擊率、+10% 暴擊傷害，持續 10 秒！`, 'rarity-legendary');
    if (typeof stageFloat === 'function') stageFloat('💥 暴擊！', 'sf-crit', 'left');
    else if (typeof floatText === 'function') floatText('💥 暴擊！', 'float-jackpot');
  }

  // IA do Monstro: Reações defensivas (Bloqueio, Esquiva Ladina, Barreira, Enrage)
  const aiAutoReaction = MonsterAIEngine.processIncomingDamage(monster, damage, !useMagic, state);
  damage = aiAutoReaction.finalDamage;
  if (aiAutoReaction.reflectedDamage > 0) {
    state.hp = Math.max(0, state.hp - aiAutoReaction.reflectedDamage);
    stageHeroHurt(aiAutoReaction.reflectedDamage);
  }
  for (const ev of (aiAutoReaction.events || [])) {
    if (ev.floatText && typeof stageFloat === 'function') stageFloat(ev.floatText, ev.floatStyle || 'sf-crit', 'right');
    if (ev.log) log(ev.log, 'warning');
  }
  if (aiAutoReaction.wasDodged) {
    stageMonsterHurt(0, false, null, 200);
    return;
  }

  // Penalidade de CP / Equipamento Insuficiente contra monstros de alta graduação
  const zoneProg = state.zone ? getZoneProgression(state.zone) : null;
  const targetMinCp = zoneProg?.minCp || monster.minCp || 0;
  const currentCp = stats.combatPower || state.combatPower || 0;
  if (targetMinCp > 0 && currentCp < targetMinCp) {
    const cpRatio = Math.max(0.05, currentCp / targetMinCp);
    damage = Math.max(1, Math.floor(damage * cpRatio));
  }

  monster.hp -= damage;

  // Ataque Conjunto do Mascote de Batalha (Pet)
  const activePetBonus = PetService.getActivePetBonus(state);
  if (activePetBonus && activePetBonus.atk > 0 && combatTick % 2 === 0 && monster.hp > 0) {
    const petDmg = Math.max(1, Math.floor(dealDamage(monster, activePetBonus.atk, 'physical') * 1.2));
    monster.hp -= petDmg;
    log(`🐾 [${activePetBonus.name}] 寵物攻擊！造成 ${petDmg} 點物理傷害`, 'damage');
  }

  const attackVfx = getWeaponAttackVfx(wasCrit, useMagic, primaryWeaponType);
  if (attackVfx && attackVfx.id) {
    const source = getStagePositionRelative('hero');
    const target = getCombatTargetPoint();
    playCombatVFX(attackVfx.id, {
      source,
      target,
      color: attackVfx.color,
      power: wasCrit ? 2 : 1,
      duration: attackVfx.duration
    });

    // Efeitos Realistas Contínuos no Monstro (Fogo nos Pés / Envoltório de Gelo)
    const baseTarget = getCombatTargetBasePoint();
    if (attackVfx.reaction === 'is-ignited') {
      playCombatVFX('monster_inferno_pillar', {
        source,
        target: baseTarget,
        color: '#ff7722',
        duration: wasCrit ? 1300 : 900
      });
    } else if (attackVfx.reaction === 'is-frozen') {
      playCombatVFX('monster_frost_freeze', {
        source,
        target: baseTarget,
        color: '#a5f3fc',
        duration: wasCrit ? 1300 : 900
      });
    }
  }

  const autoTargetPt = getCombatTargetPoint();
  if (wasCrit) {
    let critTier = 'normal';
    if (damage >= (stats.atk || stats.matk || 100) * 4) critTier = 'colossal';
    else if (damage >= (stats.atk || stats.matk || 100) * 2.5) critTier = 'heavy';
    combatEvents.emit(CombatEventType.SKILL_CRIT, {
      critTier,
      target: 'monster',
      targetPos: autoTargetPt,
      damage
    });
  } else {
    combatEvents.emit(CombatEventType.SKILL_HIT, {
      target: 'monster',
      targetPos: autoTargetPt,
      isCrit: false,
      damage
    });
  }
  combatEvents.emit(CombatEventType.SKILL_DAMAGE, {
    target: 'monster',
    targetPos: autoTargetPt,
    damage,
    isCrit: wasCrit,
    element: elemAtkRes?.element || null
  });

  if (monster.hp <= 0) {
    combatEvents.emit(CombatEventType.SKILL_KILL, {
      target: 'monster',
      targetPos: autoTargetPt,
      overkill: Math.abs(monster.hp)
    });
    processMonsterDefeat(monster, monster._killingSkill || null);
    updateStatsUI();
    return;
  } else {
    stageMonsterHurt(damage, wasCrit, attackVfx?.reaction, attackVfx?.reactionDuration);
  }
  updateStatsUI();
}

function monsterAttack(monster) {
  if (state.isCombatActive === false || !state.target || state.hp <= 0) return;
  const now = combatTick * 200;
  const realNow = Date.now();
  if (monster._stunnedUntil && monster._stunnedUntil > realNow) return; 
  if (monster.breakUntil && monster.breakUntil > realNow) return; // Chefe paralisado durante o BREAK!
  
  // Se o Chefe estiver canalizando Golpe Fatal, não desfere ataques normais!
  if (monster.isChannelingFatal) {
    if (realNow >= monster.fatalCastUntil) {
      serviceProcessRaidBossMechanics(state, {
        log,
        floatText,
        onFatalImpact: (dmg) => {
          stageHeroHurt(dmg, true);
          if (state.hp <= 0) {
            state.hp = 0;
            playerDeath(monster);
          }
          updateStatsUI();
        }
      });
    }
    return;
  }
  
  const stats = getStats();
  stageMonsterLunge();

  // Avaliação Canônica de Esquiva: Precisão do Monstro vs Evasão do Jogador
  const zoneProg = state.zone ? getZoneProgression(state.zone) : null;
  const targetMinCp = zoneProg?.minCp || monster.minCp || 0;
  const currentCp = stats.combatPower || state.combatPower || 0;
  const cpRatio = (targetMinCp > 0) ? Math.min(1.0, currentCp / targetMinCp) : 1.0;

  const mobLvl = monster.lvl || 1;
  const mobAccuracy = mobLvl * 1.5 + (monster.acc || 40);
  // Se o jogador estiver em déficit severo de CP (ex: No-Grade em Lv96+), a esquiva sofre atenuação quadrática
  const effectiveEva = (stats.eva || 10) * Math.pow(cpRatio, 2);
  const evaDiff = effectiveEva - mobAccuracy;
  // Chance de esquiva: se CP < 60% do requerido, chance de esquiva é praticamente zero (2% teto)
  const dodgeChance = (cpRatio < 0.6) ? 0.02 : Math.max(0.02, Math.min(0.65, 0.15 + (evaDiff * 0.01)));

  if (Math.random() < dodgeChance) {
    log(`${monster.name} 的攻擊未命中！`, 'combat');
    stageFloat('閃避', 'sf-miss', 'left');
    return;
  }
  
  let type = (monster.atkType === 'magical' || monster.isMage === true || monster.magic === true) ? 'magical' : 'physical';
  let atkVal = type === 'magical' ? (monster.matk || monster.atk) : monster.atk;
  let isSkillCast = false;
  let skillName = null;

  // Monster Skill AI: executa habilidade se disponível e fora de recarga
  if (monster.skill && (!monster._skillCooldownUntil || monster._skillCooldownUntil <= now)) {
    if (Math.random() < 0.40 || monster.boss || monster.elite) {
      isSkillCast = true;
      const sk = monster.skill;
      skillName = sk.name;
      type = sk.type || type;
      atkVal = Math.floor(atkVal * (sk.mult || 1.35));
      monster._skillCooldownUntil = now + ((sk.cd || 4) * 1000);

      // Efeitos secundários de skills de monstros
      if (sk.effect === 'stun') {
        stageFloat('💫 暈眩', 'sf-crit', 'left');
        log(`💫 **${monster.name}** 使用 [${skillName}] 使你暈眩！`, 'warning');
      } else if (sk.effect === 'root') {
        stageFloat('🌿 定身', 'sf-block', 'left');
        log(`🌿 **${monster.name}** 使用 [${skillName}] 使你定身！`, 'warning');
      } else if (sk.effect === 'bleed') {
        stageFloat('🩸 流血', 'sf-hurt', 'left');
        log(`🩸 **${monster.name}** 使用 [${skillName}] 造成流血！`, 'warning');
      } else if (sk.effect === 'poison') {
        stageFloat('🧪 中毒', 'sf-hurt', 'left');
        log(`🧪 **${monster.name}** 使用 [${skillName}] 造成中毒！`, 'warning');
      }
    }
  }

  let damage = dealDamage({ def: stats.def, mdef: stats.mdef }, atkVal, type);

  // IA do Monstro: Modificadores de Ataque por Archetype e Traços de Campeão (NÍVEL 15.1 e 15.2)
  const aiAttack = MonsterAIEngine.processMonsterAttack(monster, stats, state);
  if (aiAttack.spellName && !isSkillCast) {
    isSkillCast = true;
    skillName = aiAttack.spellName;
    type = aiAttack.atkType;
    atkVal = aiAttack.baseAtk;
    damage = dealDamage({ def: stats.def, mdef: stats.mdef }, atkVal, type);
  }
  if (aiAttack.isCrit) {
    damage = Math.floor(damage * aiAttack.critMultiplier);
    stageFloat('💥 暴擊！', 'sf-crit', 'left');
  }
  if (aiAttack.manaBurnAmt > 0 && state.mp > 0) {
    state.mp = Math.max(0, state.mp - aiAttack.manaBurnAmt);
    log(`🔥 [魔力燃燒] **${monster.name}** 燃燒了你 ${aiAttack.manaBurnAmt} 點魔力！`, 'warning');
    stageFloat(`-${aiAttack.manaBurnAmt} 魔力`, 'sf-hurt', 'left');
  }
  if (aiAttack.appliedDebuff) {
    log(`🔮 [詛咒] **${monster.name}** 施放了 ${aiAttack.appliedDebuff.name}！`, 'warning');
    stageFloat(aiAttack.appliedDebuff.name, 'sf-block', 'left');
  }

  // Redução por Atributo Elemental das Armaduras Equipadas (via ElementalService mitigação canônica)
  damage = ElementalService.calculateArmorElementalMitigation(state, monster, damage);

  // Level Gap Penalty: se o monstro tem nível muito superior ao jogador (+5 níveis), o dano recebido aumenta
  const levelDiff = (monster.lvl || 1) - (state.level || 1);
  if (levelDiff > 5) {
    const extraDmgMult = 1 + Math.min(1.5, (levelDiff - 5) * 0.15);
    damage = Math.floor(damage * extraDmgMult);
  }

  // Under-geared / CP Deficit Penalty: Se o jogador estiver abaixo do CP Mínimo da zona/conteúdo
  let isCrushingHit = false;
  if (targetMinCp > 0 && currentCp < targetMinCp) {
    const rawCpRatio = Math.max(0.05, currentCp / targetMinCp);
    const crushMult = 1.0 + (1.0 - rawCpRatio) * 2.5;
    damage = Math.max(1, Math.floor(damage * crushMult));
    isCrushingHit = true;
    log(`⚠️ [裝備落後] **${monster.name}** 施展粉碎重擊！造成 **${damage}** 傷害（衝擊倍率 ${Math.round(crushMult * 100)}%）！`, 'warning');
    if (typeof stageFloat === 'function') stageFloat('粉碎！', 'sf-crit', 'left');
  }

  if (state.godMode) {
    log(`🛡️ [無敵模式已啟用] ${monster.name} 原本會造成 ${damage} 傷害，但已被管理員無敵狀態抵消！輸入 //god 可停用。`, 'warning');
    damage = 0;
  }

  // Counter Barrier (Celestial Shield - Invulnerabilidade Total L2)
  if (state.buffs?.['counter_barrier'] && state.buffs['counter_barrier'].until > realNow) {
    damage = 0;
    if (typeof stageFloat === 'function') stageFloat('🌟 無敵', 'sf-block', 'left');
    else if (typeof floatText === 'function') floatText('🌟 無敵', 'float-jackpot');
    log('🌟 [天界護盾] 神聖護盾吸收了全部傷害！', 'rarity-legendary');
  }

  if (damage > 0) {
    // Procs de Certificação de Subclasse ao Receber Dano
    if (stats.celestial && Math.random() < 0.05) {
      state.buffs = state.buffs || {};
      state.buffs['counter_barrier'] = { until: realNow + 5000 };
      log('🌟 **[副職業] 反擊屏障觸發！** 完全免疫傷害 5 秒！', 'rarity-legendary');
      if (typeof stageFloat === 'function') stageFloat('🌟 天界護盾！', 'sf-heal', 'left');
      else if (typeof floatText === 'function') floatText('🌟 天界護盾！', 'float-jackpot');
    }
    if (stats.defenceProc && Math.random() < 0.06) {
      state.buffs = state.buffs || {};
      state.buffs['counter_defense'] = { amount: 25, until: realNow + 10000 };
      log('🛡️ **[副職業] 反擊防禦觸發！** +25% 物理防禦、+25% 魔法防禦，持續 10 秒！', 'rarity-epic');
      if (typeof stageFloat === 'function') stageFloat('🛡️ 反擊防禦！', 'sf-block', 'left');
      else if (typeof floatText === 'function') floatText('🛡️ 反擊防禦！', 'float-epic');
    }
    if (stats.spiritProc && Math.random() < 0.05) {
      state.buffs = state.buffs || {};
      state.buffs['counter_spirit'] = { amount: 10, until: realNow + 10000 };
      log('👻 **[副職業] 反擊之魂觸發！** +10% 物理攻擊、魔法攻擊與攻擊速度，持續 10 秒！', 'rarity-epic');
      if (typeof stageFloat === 'function') stageFloat('👻 反擊之魂！', 'sf-crit', 'left');
      else if (typeof floatText === 'function') floatText('👻 反擊之魂！', 'float-epic');
    }

    state.hp -= damage;
    if (isSkillCast && skillName) {
      log(`⚡ **${monster.name}** 使用 [${skillName}] 命中你，造成 **${damage}** 傷害！`, 'combat');
    } else if (!isCrushingHit) {
      log(`${monster.name} 對你造成 ${damage} 傷害`, 'damage');
    }
    stageHeroHurt(damage);
    if (aiAttack.vampiricHeal > 0) {
      const vHeal = Math.max(1, Math.floor(damage * aiAttack.vampiricHeal));
      monster.hp = Math.min(monster._maxHp, monster.hp + vHeal);
      log(`🦇 [吸血] **${monster.name}** 從你身上吸收了 ${vHeal} 生命值！`, 'warning');
      stageFloat(`+${vHeal} 生命值`, 'sf-heal', 'right');
    }
  }
  if (state.hp <= 0) {
    state.hp = 0;
    playerDeath(monster);
  }
  updateStatsUI();
}

// --------------------------- GM ADMIN & CHAT CONSOLE ---------------------------
function generateUid() { return 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9); }

function spawnAdminItem(itemId, qty = 1, rarity = 'common', enchant = 0, affixChoice = 'roll', isFoundation = false) {
  if (!isAuthorizedAdmin()) {
    console.warn('[Admin Security] Acesso negado a spawnAdminItem.');
    return;
  }
  const def = getItemDef(itemId);
  if (!def) { log(`[管理員] 找不到物品「${itemId}」。`, 'system'); return; }
  const realId = def.id || itemId;
  
  if (def.stack && (def.slot === 'consumable' || def.slot === 'material' || def.slot === 'scroll' || def.slot === 'powerup') && rarity === 'common' && !isFoundation) {
    addToInventory(realId, qty, null, false, {}, true);
  } else {
    for (let i = 0; i < qty; i++) {
      const isEquip = def.slot && def.slot !== 'consumable' && def.slot !== 'material' && def.slot !== 'scroll' && def.slot !== 'powerup';
      let affixes = [];
      if (isEquip) {
        if (affixChoice === 'roll' || !affixChoice) {
          affixes = D().rollAffixes ? D().rollAffixes(rarity) : [];
        } else if (affixChoice && affixChoice !== 'none') {
          const defAff = D().AFFIX_MAP ? D().AFFIX_MAP[affixChoice] : null;
          if (defAff) {
            const val = defAff.min + Math.floor(Math.random() * (defAff.max - defAff.min + 1));
            affixes = [{ id: affixChoice, value: val }];
          }
        }
      }
      state.inventory.push({
        uid: generateUid(),
        itemId: realId,
        rarity: rarity,
        enchant: enchant,
        affixes: affixes,
        foundation: !!isFoundation,
        equipped: false,
        count: 1
      });
    }
  }

  const enchantStr = enchant > 0 ? `+${enchant} ` : '';
  const foundationStr = isFoundation ? '✨ [基底] ' : '';
  log(`🎁 [管理員] 已在背包生成 ${qty}× ${foundationStr}${enchantStr}${def.name} [${({ common: '一般', uncommon: '非凡', rare: '稀有', epic: '史詩', legendary: '傳說', mythic: '神話', primordial: '太古', sovereign: '君王' })[String(rarity).toLowerCase()] || '一般'}]！`, 'rarity-legendary');
  floatText('🎁 物品已生成！', 'float-jackpot');
  updateAllUI();
  save(true, true);
}

// calcSpForLevel importado do LevelEngine.js (Sprint 2)


function applyAdminLevelChange(targetLevel) {
  if (!isAuthorizedAdmin()) {
    console.warn('[Admin Security] Acesso negado a applyAdminLevelChange.');
    return;
  }
  const newLvl = Math.max(1, Math.min(120, targetLevel));
  state.level = newLvl;
  state.xp = getTotalXP(newLvl - 1);

  if (newLvl > (state.serverMaxLevel || 40)) {
    state.serverMaxLevel = Math.max(newLvl, 60);
    state.levelCap = state.serverMaxLevel;
    state.serverCap = state.serverMaxLevel;
    window.globalServerCap = state.serverMaxLevel;
    if (typeof localStorage !== 'undefined') localStorage.setItem('aden_server_cap', String(state.serverMaxLevel));
  }

  // 1. Concede SP proporcional ao nível + 1000 SP de bônus para testes de habilidades
  const cumulativeSp = calcSpForLevel(newLvl);
  state.sp = Math.max(state.sp || 0, cumulativeSp + 1000);

  // 2. Recalcula vida/mana e restaura ao máximo
  const stats = getStats();
  state.maxHp = stats.maxHp;
  state.maxMp = stats.maxMp;
  state.hp = state.maxHp;
  state.mp = state.maxMp;

  // 3. Atualiza Sagas e Zonas do Mapa
  let highestSaga = 0;
  for (let i = 0; i < SAGAS.length; i++) {
    if (state.level >= SAGAS[i].unlocksAt) {
      highestSaga = i;
    }
  }
  state.currentSaga = highestSaga;

  // 4. Log e feedback visual do nível
  playSfx('levelUp');
  log(`⚡ [管理員] 等級已調整為 ${newLvl}！技能點（+${cumulativeSp + 1000}）、生命值／魔力、史詩任務、狩獵地圖與技能已同步。`, 'rarity-legendary');
  floatText(`⚡ 等級 ${newLvl}！`, 'float-jackpot');

  // 5. Atualiza todos os módulos visuais (Troca de classe, Árvore de Skills, Mapa, Subclasses, Raids, Missões)
  checkClassAdvancement();
  renderZoneMap();
  updateSkillUI();
  renderSubclassesUI();
  updateRaidUI();
  updateQuestsUI();
  renderBattlePassUI();
  updateAllUI();
  save(true, true);
}

function handleChatSubmit(inputStr) {
  if (!inputStr || !inputStr.trim()) return;
  const raw = inputStr.trim();
  const lower = raw.toLowerCase();

  const isAdminCmd = lower.startsWith('//') || lower === '/admin' || lower === 'admin' || lower === 'gm' || lower === '//gm';
  if (isAdminCmd) {
    if (!isAuthorizedAdmin()) {
      log('⛔ 存取遭拒：管理員指令僅限授權管理員使用。', 'system');
      return;
    }
    state.privilegeLevel = 1;
    if (typeof window !== 'undefined') window.currentUserPrivilege = 1;
  }

  // Open Admin Console secret commands
  if (isAuthorizedAdmin() && (lower === '//admin' || lower === '/admin' || lower === '//gm' || lower === 'admin' || lower === 'gm')) {
    openAdminModal();
    log('🛡️ [GM 控制台] 已授權存取！管理員面板已解鎖。', 'rarity-legendary');
    return;
  }

  // Direct Admin Cheats
  if (lower.startsWith('//level ')) {
    const lvl = parseInt(lower.replace('//level ', '').trim());
    if (!isNaN(lvl) && lvl > 0 && lvl <= 120) {
      applyAdminLevelChange(lvl);
    }
    return;
  }

  if (lower.startsWith('//season ')) {
    const s = parseInt(lower.replace('//season ', '').trim());
    if (!isNaN(s) && s >= 1 && s <= 4) {
      setServerSeason(s);
    }
    return;
  }

  if (lower === '//unlockall' || lower === '//allseasons' || lower === '//unlockallseasons') {
    unlockAllSeasons();
    return;
  }

  if (lower.startsWith('//cap ')) {
    const c = parseInt(lower.replace('//cap ', '').trim());
    if (!isNaN(c) && c >= 1 && c <= 120) {
      setServerLevelCap(c);
    }
    return;
  }

  if (lower.startsWith('//gold ')) {
    const amt = parseInt(lower.replace('//gold ', '').trim());
    if (!isNaN(amt)) {
      state.gold += amt;
      triggerQuestEvent('gold', amt);
      log(`🪙 [管理員] 已增加 ${amt.toLocaleString()} 金幣！`, 'rarity-legendary');
      updateAllUI();
      save(true, true);
    }
    return;
  }

  if (lower.startsWith('//sp ')) {
    const amt = parseInt(lower.replace('//sp ', '').trim());
    if (!isNaN(amt)) {
      state.sp += amt;
      log(`✦ [管理員] 已增加 ${amt.toLocaleString()} 技能點！`, 'rarity-legendary');
      updateSkillUI();
      updateAllUI();
      save(true, true);
    }
    return;
  }

  if (lower.startsWith('//ac ')) {
    const amt = parseInt(lower.replace('//ac ', '').trim());
    if (!isNaN(amt)) {
      addAdminAC(amt);
    }
    return;
  }

  if (lower === '//god') {
    state.godMode = !state.godMode;
    log(`🛡️ [管理員] 無敵模式：${state.godMode ? '已啟用' : '已停用'}`, 'rarity-legendary');
    if (typeof floatText === 'function') floatText(`🛡️ 無敵模式：${state.godMode ? '開啟' : '關閉'}`, 'float-jackpot');
    updateAllUI();
    save(true, true);
    return;
  }

  if (lower.startsWith('//item ')) {
    const parts = raw.split(' ');
    const itemId = parts[1];
    const qty = parseInt(parts[2]) || 1;
    if (itemId) {
      spawnAdminItem(itemId, qty, 'epic', 7);
    }
    return;
  }

  // Normal Player Chat Message
  const heroName = (RACES[state.race]?.name || '英雄') + ' ' + (getClass(state.class)?.name || '冒險者');
  log(`💬 [世界] ${heroName}：${raw}`, 'system');
}

const RATE_PRESETS = {
  classic: { name: '🛡️ 經典原倍率（1×）', rates: { xp: 1, sp: 1, adena: 1, drop: 1, spoil: 1, enchant: 1, book: 1 } },
  aden: { name: '⚔️ 亞丁動態倍率（3×）', rates: { xp: 3, sp: 3, adena: 2, drop: 2, spoil: 2, enchant: 1.2, book: 2 } },
  mid: { name: '🔥 官方中倍率（10×）', rates: { xp: 10, sp: 10, adena: 8, drop: 5, spoil: 5, enchant: 1.5, book: 5 } },
  high: { name: '👑 高倍率／活動（50×）', rates: { xp: 50, sp: 50, adena: 25, drop: 15, spoil: 10, enchant: 2.0, book: 10 } },
  turbo: { name: '⚡ 極速玩家對戰（100 倍）', rates: { xp: 100, sp: 100, adena: 50, drop: 30, spoil: 20, enchant: 2.5, book: 20 } },
  reset: { name: '🔄 標準（1×）', rates: { xp: 1, sp: 1, adena: 1, drop: 1, spoil: 1, enchant: 1, book: 1 } }
};

function ensureServerRates() {
  state.serverRates = state.serverRates || { xp: 1, sp: 1, adena: 1, drop: 1, spoil: 1, enchant: 1, book: 1 };
  const keys = ['xp', 'sp', 'adena', 'drop', 'spoil', 'enchant', 'book'];
  keys.forEach(k => {
    if (state.serverRates[k] === undefined || isNaN(Number(state.serverRates[k]))) {
      state.serverRates[k] = 1;
    }
  });
}

function setServerRate(key, val, silent = false) {
  if (!isAuthorizedAdmin()) return;
  ensureServerRates();
  const num = Math.max(0.1, parseFloat(val) || 1);
  state.serverRates[key] = num;
  if (!silent) {
    const labels = {
      xp: '經驗值倍率',
      sp: '技能點倍率',
      adena: '金幣倍率',
      drop: '物品掉落倍率',
      spoil: '搜刮與製作倍率',
      enchant: '強化倍率',
      book: '魔法書倍率'
    };
    const title = labels[key] || key.toUpperCase();
    log(`⚡ [管理員] ${title} 已更新為 **×${num}**！效果立即生效。`, 'rarity-legendary');
    if (typeof floatText === 'function') floatText(`⚡ ${title.toUpperCase()}：×${num}！`, 'float-jackpot');
  }
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('aden_server_rates', JSON.stringify(state.serverRates));
    }
  } catch (_) {}
  syncAdminRatesUI();
  updateAllUI();
  save(true, true);
}

function applyServerRatePreset(presetKey) {
  if (!isAuthorizedAdmin()) return;
  ensureServerRates();
  const preset = RATE_PRESETS[presetKey];
  if (!preset) return;
  
  Object.entries(preset.rates).forEach(([k, v]) => {
    state.serverRates[k] = v;
  });
  
  log(`🚀 [管理員] 已套用預設：**${preset.name}**！所有倍率已即時更新。`, 'rarity-legendary');
  if (typeof floatText === 'function') floatText(`🚀 預設 ${preset.name} 已啟用！`, 'float-jackpot');
  
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('aden_server_rates', JSON.stringify(state.serverRates));
    }
  } catch (_) {}
  syncAdminRatesUI();
  updateAllUI();
  save(true, true);
}

function syncAdminRatesUI() {
  ensureServerRates();
  const r = state.serverRates;
  
  // Update header live summary
  const summaryEl = el('admin-live-rates-summary');
  if (summaryEl) {
    summaryEl.textContent = `目前倍率：經驗值 ×${r.xp} · 技能點 ×${r.sp} · 金幣 ×${r.adena} · 掉落 ×${r.drop} · 搜刮 ×${r.spoil} · 強化 ×${r.enchant} · 魔法書 ×${r.book}`;
  }
  
  // Update badges on rate cards
  ['xp', 'sp', 'adena', 'drop', 'spoil', 'enchant', 'book'].forEach(k => {
    const badge = el(`rate-val-${k}`);
    if (badge) badge.textContent = `×${r[k]}`;
    
    // Highlight matching pill buttons
    qsa(`[data-rate-set^="${k}:"]`).forEach(btn => {
      const targetVal = parseFloat(btn.dataset.rateSet.split(':')[1]);
      if (Math.abs(targetVal - r[k]) < 0.01) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  });
}

function switchAdminTab(tabName) {
  qsa('.admin-tab-btn').forEach(btn => {
    if (btn.dataset.adminTab === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  qsa('.admin-tab-panel').forEach(panel => {
    if (panel.id === `admin-tab-${tabName}`) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });
}

function openAdminModal() {
  if (!isAuthorizedAdmin()) {
    console.warn('[Admin Security] Acesso negado ao painel administrativo.');
    return;
  }
  state.privilegeLevel = 1;
  if (typeof window !== 'undefined') window.currentUserPrivilege = 1;
  const modal = el('admin-modal');
  if (!modal) return;
  const searchInput = el('admin-item-search');
  if (searchInput) searchInput.value = '';
  populateAdminItemSelect('');
  syncAdminRatesUI();

  // Restaura o stage salvo com prioridade absoluta
  const savedSeason = (typeof localStorage !== 'undefined' && Number(localStorage.getItem('aden_server_season'))) || Number(state.serverSeason) || 1;
  state.serverSeason = savedSeason;
  window.__serverSeason = savedSeason;
  if ((typeof localStorage !== 'undefined' && localStorage.getItem('aden_admin_unlock_all') === 'true') || state.adminUnlockedAll) {
    state.adminUnlockedAll = true;
    window.__adminUnlockedAll = true;
  }
  updateSeasonTabBadges(ROOT);
  updateTabVisibilityByLevel(state);

  syncAdminSeasonAndCapUI();
  modal.classList.add('active');
}


function populateAdminItemSelect(query = '') {
  const sel = el('admin-item-select');
  if (!sel) return;
  sel.innerHTML = '';
  
  const seen = new Set();
  const list = [];
  const all = D().ALL_ITEMS || {};
  const rawQ = String(query || '').trim().toLowerCase();
  const queryTerms = rawQ.split(/\s+/).filter(Boolean);
  
  for (const [id, def] of Object.entries(all)) {
    if (!def || !def.name) continue;
    const primaryId = def.id || id;
    if (seen.has(primaryId)) continue;
    seen.add(primaryId);

    if (queryTerms.length > 0) {
      const grade = getItemGrade(def.req?.level || 1).toLowerCase();
      const searchableText = [
        def.name,
        primaryId,
        def.slot || '',
        def.type || '',
        def.weaponType || '',
        grade,
        `品級 ${grade}`,
        `等級 ${def.req?.level || 1}`
      ].join(' ').toLowerCase();

      const matchesAllTerms = queryTerms.every(term => searchableText.includes(term));
      if (!matchesAllTerms) continue;
    }

    list.push({ id: primaryId, def });
  }
  
  list.sort((a, b) => (b.def.tier || 1) - (a.def.tier || 1) || a.def.name.localeCompare(b.def.name));
  
  if (list.length === 0) {
    const opt = mkEl('option');
    opt.value = '';
    opt.textContent = `⚠️ 找不到「${query}」相關物品`;
    opt.disabled = true;
    sel.appendChild(opt);
    return;
  }

  for (const { id, def } of list) {
    const opt = mkEl('option');
    opt.value = id;
    const grade = getItemGrade(def.req?.level || 1);
    opt.textContent = `${def.name} [${grade}]（${({ weapon: '武器', weapon2: '副武器', shield: '盾牌', helmet: '頭盔', armor: '胸甲', chest: '胸甲', fullbody: '全身甲', legs: '褲子', gloves: '手套', boots: '靴子', cloak: '披風', belt: '腰帶', necklace: '項鍊', earring: '耳環', earring1: '耳環 1', earring2: '耳環 2', ring: '戒指', ring1: '戒指 1', ring2: '戒指 2', hair: '頭飾', consumable: '消耗品', material: '材料', scroll: '卷軸', crystal: '水晶' })[def.slot] || '物品'} · 等級 ${def.req?.level || 1}）`;
    sel.appendChild(opt);
  }
}

function addAdminXP(amount) {
  if (!isAuthorizedAdmin()) return;
  const amt = parseInt(amount) || 0;
  if (amt <= 0) return;
  state.xp = (state.xp || 0) + amt;
  checkLevelUp();
  checkClassAdvancement();
  updateSkillUI();
  updateRaceClassUI();
  log(`🌟 [管理員] 已增加 ${amt.toLocaleString()} 經驗值！（目前等級：${state.level}）`, 'rarity-legendary');
  floatText(`🌟 +${amt.toLocaleString()} 經驗值！`, 'float-jackpot');
  updateAllUI();
  save(true, true);
}

function addAdminGold(amount) {
  if (!isAuthorizedAdmin()) return;
  const amt = parseInt(amount) || 0;
  if (amt <= 0) return;
  state.gold = (state.gold || 0) + amt;
  triggerQuestEvent('gold', amt);
  log(`🪙 [管理員] 已增加 ${amt.toLocaleString()} 金幣！`, 'rarity-legendary');
  floatText(`🪙 +${amt.toLocaleString()} 金幣！`, 'float-gold');
  updateAllUI();
  save(true, true);
}

function addAdminSP(amount) {
  if (!isAuthorizedAdmin()) return;
  const amt = parseInt(amount) || 0;
  if (amt <= 0) return;
  state.sp = (state.sp || 0) + amt;
  log(`✦ [管理員] 已增加 ${amt.toLocaleString()} 技能點！`, 'rarity-legendary');
  floatText(`✦ +${amt.toLocaleString()} 技能點！`, 'float-jackpot');
  updateSkillUI();
  updateAllUI();
  save(true, true);
}

function addAdminAC(amount) {
  if (!isAuthorizedAdmin()) return;
  const amt = parseInt(amount) || 0;
  if (amt <= 0) return;
  state.adenCoins = (state.adenCoins || 0) + amt;
  log(`🪙 [管理員] 已增加 ${amt.toLocaleString()} 亞丁幣！`, 'rarity-legendary');
  floatText(`🪙 +${amt.toLocaleString()} 亞丁幣！`, 'float-gold');
  updateAllUI();
  save(true, true);
}

function adminUnlockSagas() {
  if (!isAuthorizedAdmin()) return;
  const sagas = D().SAGAS || {};
  state.unlockedSagas = state.unlockedSagas || {};
  for (const sagaId of Object.keys(sagas)) {
    state.unlockedSagas[sagaId] = true;
  }
  log('📜 [管理員] 所有史詩任務已解鎖！', 'rarity-legendary');
  floatText('📜 史詩任務已解鎖', 'float-jackpot');
  updateAllUI();
  save(true, true);
}

function adminCompleteQuest() {
  if (!isAuthorizedAdmin()) return;
  if (state.quests && state.quests.length > 0) {
    for (const q of state.quests) {
      q.progress = q.target;
      q.completed = true;
    }
    log('✅ [管理員] 所有進行中的任務都已完成！', 'rarity-legendary');
    floatText('✅ 任務已完成', 'float-jackpot');
    updateQuestUI();
    updateAllUI();
    save(true, true);
  } else {
    log('目前沒有可完成的進行中任務。', 'system');
  }
}

function adminMaxCraft() {
  if (!isAuthorizedAdmin()) return;
  state.craftLevel = 50;
  state.craftXp = 0;
  state.craftCharges = 100;
  state.craftPoints = 0;
  log('⚒️ [管理員] 鍛造已提升至最高等級 50，並增加 100 次隨機製作充能！', 'rarity-legendary');
  floatText('⚒️ 製作等級最高', 'float-jackpot');
  updateAllUI();
  save(true, true);
}

function adminMaxSkills() {
  if (!isAuthorizedAdmin()) return;
  const skillDefs = D().SKILL_DEFS || {};
  for (const [skillId, def] of Object.entries(skillDefs)) {
    if (!skillId || isPurgedSkill(skillId) || def?.disabled) continue;
    if (def && classSatisfies(state.class, def.classReq)) {
      state.skills[skillId] = def.max || 5;
    }
  }
  // Sanitize any previously learned purged skills
  for (const sid of Object.keys(state.skills || {})) {
    if (isPurgedSkill(sid)) delete state.skills[sid];
  }
  if (state.skillLoadout) {
    for (const [slot, sid] of Object.entries(state.skillLoadout)) {
      if (sid && (isPurgedSkill(sid) || !state.skills[sid])) state.skillLoadout[slot] = null;
    }
  }
  log('📖 [管理員] 所有職業技能已提升至最高！', 'rarity-legendary');
  floatText('📖 技能已全滿', 'float-jackpot');
  updateSkillUI();
  updateAllUI();
  save(true, true);
}

function adminKillMonster() {
  if (!isAuthorizedAdmin()) return;
  const monster = state.currentMonster;
  if (monster) {
    log(`⚡ [管理員] 已立即擊殺怪物 ${monster.name}！`, 'rarity-legendary');
    monster.hp = 0;
    onMonsterDefeated(monster);
  } else {
    log('目前沒有正在戰鬥的怪物。', 'system');
  }
}

function syncAdminSeasonAndCapUI() {
  const isUnlockedAll = typeof window !== 'undefined' && (window.__adminUnlockedAll || (typeof localStorage !== 'undefined' && localStorage.getItem('aden_admin_unlock_all') === 'true') || state.adminUnlockedAll);
  const curSeason = isUnlockedAll ? 4 : (Number(state.serverSeason) || 1);
  const curCap = Number(state.serverMaxLevel) || Number(state.levelCap) || 60;

  const seasonBadge = el('admin-current-season-badge');
  if (seasonBadge) {
    if (isUnlockedAll) {
      seasonBadge.textContent = '編年史：全部解鎖（無敵模式）';
      seasonBadge.style.color = '#34d399';
      seasonBadge.style.borderColor = '#34d399';
      seasonBadge.style.background = 'rgba(16,185,129,0.2)';
    } else {
      const titles = {
        1: '編年史 I：覺醒（等級 40）',
        2: '編年史 II：血盟與城堡（等級 75）',
        3: '編年史 III：七封印（等級 85）',
        4: '編年史 IV：High Five（等級 120）'
      };
      seasonBadge.textContent = `目前編年史：${titles[curSeason] || '階段 ' + curSeason}`;
      seasonBadge.style.color = '#38bdf8';
      seasonBadge.style.borderColor = '#38bdf8';
      seasonBadge.style.background = 'rgba(56,189,248,0.2)';
    }
  }

  const capBadge = el('admin-current-cap-badge');
  if (capBadge) {
    capBadge.textContent = `目前等級上限：${curCap}`;
  }

  // Atualiza destaque visual dos botões de temporada
  qsa('[data-admin-cmd^="setseason"]').forEach(btn => {
    const sNum = parseInt(btn.dataset.adminCmd.replace('setseason', ''));
    if (!isUnlockedAll && sNum === curSeason) {
      btn.classList.add('primary');
      btn.style.boxShadow = '0 0 8px rgba(56,189,248,0.5)';
    } else {
      btn.classList.remove('primary');
      btn.style.boxShadow = '';
    }
  });

  const unlockAllBtn = qs('[data-admin-cmd="unlockallseasons"]');
  if (unlockAllBtn) {
    if (isUnlockedAll) {
      unlockAllBtn.style.boxShadow = '0 0 12px rgba(52,211,153,0.8)';
      unlockAllBtn.textContent = '🌟 所有編年史與分頁皆已解鎖（啟用中）';
    } else {
      unlockAllBtn.style.boxShadow = '';
      unlockAllBtn.textContent = '🔓 解鎖所有編年史與分頁（100% 開放／測試模式）';
    }
  }

  // Atualiza destaque visual dos botões de cap
  qsa('[data-admin-cmd^="setcap"]').forEach(btn => {
    const cNum = parseInt(btn.dataset.adminCmd.replace('setcap', ''));
    if (cNum === curCap) {
      btn.classList.add('primary');
    } else {
      btn.classList.remove('primary');
    }
  });
}

function setServerSeason(seasonId) {
  if (!isAuthorizedAdmin()) return;
  const sid = Number(seasonId) || 1;
  state.serverSeason = sid;
  state.adminUnlockedAll = false;
  window.__serverSeason = sid;
  window.__adminUnlockedAll = false;

  const SEASON_CAPS = { 1: 60, 2: 75, 3: 85, 4: 120 };
  const targetCap = SEASON_CAPS[sid] || 60;
  if (!state.serverMaxLevel || state.serverMaxLevel < targetCap) {
    state.serverMaxLevel = targetCap;
    state.levelCap = targetCap;
    state.serverCap = targetCap;
    window.globalServerCap = targetCap;
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('aden_server_season', String(sid));
    localStorage.setItem('aden_admin_season', String(sid));
    localStorage.setItem('aden_server_cap', String(state.serverMaxLevel));
    localStorage.removeItem('aden_admin_unlock_all');
  }

  // Atualiza visibilidade e estado das abas imediatamente
  updateSeasonTabBadges(ROOT);
  updateTabVisibilityByLevel(state);

  const seasonNames = {
    1: '編年史 I：亞丁覺醒',
    2: '編年史 II：血盟與城堡時代',
    3: '編年史 III：七封印與奧林匹亞',
    4: '編年史 IV：巨龍之怒與多重世界'
  };

  log(`📜 [皇家編年史] ${seasonNames[sid] || '階段 ' + sid} 已啟用！所有分頁與系統已永久同步。`, 'rarity-legendary');
  if (typeof floatText === 'function') floatText(`📜 編年史 ${sid} 已解鎖！`, 'float-jackpot');

  syncAdminSeasonAndCapUI();
  updateAllUI();
  save(true, true);
}

function unlockAllSeasons() {
  if (!isAuthorizedAdmin()) return;
  state.serverSeason = 4;
  state.adminUnlockedAll = true;
  window.__serverSeason = 4;
  window.__adminUnlockedAll = true;

  state.serverMaxLevel = 120;
  state.levelCap = 120;
  state.serverCap = 120;
  window.globalServerCap = 120;

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('aden_server_season', '4');
    localStorage.setItem('aden_admin_season', '4');
    localStorage.setItem('aden_server_cap', '120');
    localStorage.setItem('aden_admin_unlock_all', 'true');
  }

  updateSeasonTabBadges(ROOT);
  updateTabVisibilityByLevel(state);

  log('🌟 [管理員] 所有季節、編年史與分頁已 100% 解鎖！現在可自由存取全部遊戲內容。', 'rarity-legendary');
  if (typeof floatText === 'function') floatText('🌟 所有分頁已解鎖！', 'float-jackpot');

  syncAdminSeasonAndCapUI();
  updateAllUI();
  save(true, true);
}

function setServerLevelCap(cap) {
  if (!isAuthorizedAdmin()) return;
  const nCap = Math.max(1, Math.min(120, Number(cap) || 60));
  state.serverMaxLevel = nCap;
  state.levelCap = nCap;
  state.serverCap = nCap;
  window.globalServerCap = nCap;

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('aden_server_cap', String(nCap));
  }

  log(`📢 [皇家敕令] 亞丁至尊領主已將伺服器最高等級上限設定為 **${nCap} 級**！`, 'rarity-legendary');
  if (typeof floatText === 'function') floatText(`👑 伺服器等級上限：${nCap}！`, 'float-jackpot');
  
  // Sincroniza o stage da temporada com o cap escolhido
  const CAP_TO_SEASON = { 40: 1, 60: 1, 75: 2, 85: 3, 100: 3, 120: 4 };
  const targetSeason = CAP_TO_SEASON[nCap] || (nCap >= 100 ? 4 : (nCap >= 80 ? 3 : (nCap >= 65 ? 2 : 1)));
  state.serverSeason = targetSeason;
  window.__serverSeason = targetSeason;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('aden_server_season', String(targetSeason));
  }

  updateSeasonTabBadges(ROOT);
  updateTabVisibilityByLevel(state);
  
  engineCheckLevelUp(state, { getStats, log, floatText, updateAllUI, save: (imm, force) => save(imm, force) });
  syncAdminSeasonAndCapUI();
  updateAllUI();
  save(true, true);
}


function executeAdminCmd(cmd) {
  if (!isAuthorizedAdmin()) return;
  if (cmd === 'setseason1') { setServerSeason(1); }
  else if (cmd === 'setseason2') { setServerSeason(2); }
  else if (cmd === 'setseason3') { setServerSeason(3); }
  else if (cmd === 'setseason4') { setServerSeason(4); }
  else if (cmd === 'unlockallseasons') { unlockAllSeasons(); }
  else if (cmd === 'setcap40') { setServerLevelCap(40); }
  else if (cmd === 'setcap60') { setServerLevelCap(60); }
  else if (cmd === 'setcap75') { setServerLevelCap(75); }
  else if (cmd === 'setcap85') { setServerLevelCap(85); }
  else if (cmd === 'setcap100') { setServerLevelCap(100); }
  else if (cmd === 'setcap120') { setServerLevelCap(120); }
  else if (cmd === 'level20') { applyAdminLevelChange(20); }
  else if (cmd === 'level40') { applyAdminLevelChange(40); }
  else if (cmd === 'level76') { applyAdminLevelChange(76); }
  else if (cmd === 'level85') { applyAdminLevelChange(85); }
  else if (cmd === 'level120') { applyAdminLevelChange(120); }
  else if (cmd === 'add1level') { applyAdminLevelChange((state.level || 1) + 1); }
  else if (cmd === 'add5levels') { applyAdminLevelChange((state.level || 1) + 5); }
  else if (cmd === 'gold1m') { addAdminGold(1000000); }
  else if (cmd === 'gold10m') { addAdminGold(10000000); }
  else if (cmd === 'sp5k') { addAdminSP(5000); }
  else if (cmd === 'sp50k') { addAdminSP(50000); }
  else if (cmd === 'ac500') { addAdminAC(500); }
  else if (cmd === 'ac2000') { addAdminAC(2000); }
  else if (cmd === 'godmode') { 
    state.godMode = !state.godMode; 
    log(`🛡️ [管理員] 無敵狀態：${state.godMode ? '已啟用' : '已停用'}！`, 'rarity-legendary'); 
    if (typeof floatText === 'function') floatText(`🛡️ 無敵模式：${state.godMode ? '開啟' : '關閉'}`, 'float-jackpot');
  }
  else if (cmd === 'healfull') { 
    const stats = getStats(); 
    state.hp = stats.maxHp; 
    state.mp = stats.maxMp; 
    log('❤️ [管理員] 生命值／魔力已恢復 100%！', 'rarity-legendary'); 
    if (typeof floatText === 'function') floatText('❤️ 生命值／魔力全滿！', 'float-jackpot');
  }
  else if (cmd === 'unlocksagas') { adminUnlockSagas(); }
  else if (cmd === 'completequest') { adminCompleteQuest(); }
  else if (cmd === 'maxcraft') { adminMaxCraft(); }
  else if (cmd === 'maxskills') { adminMaxSkills(); }
  else if (cmd === 'killmonster') { adminKillMonster(); }
  else if (cmd === 'autoequip') { autoEquipBest(); }
  else if (cmd === 'resetsave') { resetSave(); }

  updateAllUI();
  save(true, true);
}

function updateZoneKillProgressUI() {
  const killEl = el('zone-kill-progress');
  if (killEl && state.zone) {
    state.zoneKills = state.zoneKills || {};
    const count = state.zoneKills[state.zone] || 0;
    const req = 50;
    killEl.textContent = `⚔️ 已擊殺 ${count}/${req}`;
    if (count >= req) {
      killEl.style.color = '#ef4444';
      killEl.style.borderColor = 'rgba(239,68,68,0.5)';
      killEl.textContent = `🚨 首領可挑戰！`;
    } else {
      killEl.style.color = '#f59e0b';
      killEl.style.borderColor = 'rgba(245,158,11,0.3)';
    }
  }
}

function startCombat() { return engineStartCombat(state, { log, attackMonster, updateAllUI, save }); }
function stopCombat() {
  try {
    if (globalVFXOrchestrator && typeof globalVFXOrchestrator.clear === 'function') globalVFXOrchestrator.clear();
    if (VFX && typeof VFX.clear === 'function') VFX.clear();
  } catch (_) {}
  return engineStopCombat(state);
}
function pickRandomMonster() {
  invalidateCombatCoordinates();
  try {
    if (globalVFXOrchestrator && typeof globalVFXOrchestrator.clear === 'function') globalVFXOrchestrator.clear();
    if (VFX && typeof VFX.clear === 'function') VFX.clear();
  } catch (_) {}
  return enginePickRandomMonster(state, { log, floatText, renderStageMonster, updateZoneKillProgressUI });
}
function selectZone(zoneId) {
  invalidateCombatCoordinates();
  try {
    if (globalVFXOrchestrator && typeof globalVFXOrchestrator.clear === 'function') globalVFXOrchestrator.clear();
    if (VFX && typeof VFX.clear === 'function') VFX.clear();
  } catch (_) {}
  return engineSelectZone(state, zoneId, { log, updateAllUI, save, attackMonster });
}
// Shows the Saga Unlock modal with saga name/description
function showSagaModal(saga) {
  const modal = el('saga-modal');
  if (!modal) return;
  const titleEl = el('saga-title');
  const descEl  = el('saga-desc');
  if (titleEl) titleEl.textContent = saga?.name || '新的史詩任務已解鎖！';
  if (descEl)  descEl.textContent  = saga?.desc || '新的區域正在等待你探索。';
  modal.classList.add('active');
}

function updateSagaProgress(silent = true) { return engineUpdateSagaProgress(state, silent, { log, floatText, showSagaModal }); }
function playerDeath(monster) {
  try {
    if (globalVFXOrchestrator && typeof globalVFXOrchestrator.clear === 'function') globalVFXOrchestrator.clear();
    if (VFX && typeof VFX.clear === 'function') VFX.clear();
  } catch (_) {}
  return enginePlayerDeath(state, monster, { log, el });
}
function resurrect(useScroll = false) { return engineResurrect(state, useScroll, { log, el, updateAllUI, save, attackMonster }); }

export function spendSP(skillId) { return engineSpendSP(state, skillId, { log, floatText, classSatisfies, removeFromInventory, updateAllUI, save }); }
if (typeof window !== 'undefined') {
  window.spendSP = spendSP;
}
function resetSP() { return engineResetSP(state, { log, floatText, updateAllUI, save }); }


function autoEquipBest() {
  const proposal = generateAutoEquipProposal(state);
  if (!proposal || !proposal.changes || proposal.changes.length === 0) {
    log('你目前已經穿著背包中最好的裝備！', 'system');
    return;
  }
  const res = commitAutoEquipProposal(state, proposal, {
    onStatsChanged: () => {
      if (typeof updateStats === 'function') updateStats();
      if (typeof calculateCombatPower === 'function') state.combatPower = calculateCombatPower(state);
    },
    updateAllUI,
    save,
    log,
    floatText: typeof floatText === 'function' ? floatText : null
  });
  if (res.success) {
    log(`⚡ 自動裝備完成：已更新 ${res.appliedChanges} 件裝備！（戰鬥力：${proposal.deltas.cpDelta >= 0 ? '+' : ''}${proposal.deltas.cpDelta}）`, 'rarity-legendary');
    updateAllUI();
    save();
  } else {
    log(`自動裝備失敗：${res.reason}`, 'system');
  }
}

function unequipAll() {
  let count = 0;
  const equipObj = state.equipment || {};
  for (const slot of Object.keys(equipObj)) {
    if (equipObj[slot]) {
      unequipItem(slot, null, true);
      count++;
    }
  }
  if (count > 0) {
    log(`🛡️ 已卸下全部 ${count} 件防具。`, 'system');
    floatText('🛡️ 已卸下！', 'sf-heal');
    updateAllUI();
    save();
  } else {
    log('目前沒有可卸下的已裝備物品。', 'system');
  }
}

function setRace(raceId) {
  state.race = raceId;
  const raceMap = {
    human: 'fighter',
    elf: 'elfFighter',
    darkelf: 'darkElfFighter',
    orc: 'orcBase',
    dwarf: 'artisan',
    kamael: 'soulbreaker',
    sylph: 'sylphGunner',
    highelf: 'highElfBase',
    ertheia: 'bloodRoseBase'
  };
  state.class = raceMap[raceId] || 'fighter';
  const race = RACES[raceId];
  state.base = { ...race.stats };
  const cls = getClass(state.class);
  if (cls) {
    for (const k of ['atk','def','eva','matk','mdef']) {
      state.base[k] = (state.base[k] || 0) + (cls.base[k] || 0);
    }
  }
  const starterSkill = getStarterSkillForClass(state.class);
  if (starterSkill) { state.skills[starterSkill] = Math.max(1, state.skills[starterSkill] || 0); }
  updateRaceClassUI();
  updateStatsUI();
}

function setClass(classId) {
  if (state.race === 'dwarf' || state.race === 'kamael') return;
  state.class = classId;
  const race = RACES[state.race];
  if (race) state.base = { ...race.stats };
  const cls = getClass(classId);
  if (cls && race) {
    for (const k of ['atk','def','eva','matk','mdef']) {
      state.base[k] = (state.base[k] || 0) + (cls.base[k] || 0);
    }
  }
  const starterSkill = getStarterSkillForClass(classId);
  if (starterSkill) { state.skills[starterSkill] = Math.max(1, state.skills[starterSkill] || 0); }
  updateRaceClassUI();
  updateStatsUI();
}
function startGame() {
  if (!state.race || !state.class) {
    log('開始冒險前，請先選擇種族與職業。', 'system');
    return;
  }
  state.zone = RACES[state.race]?.startZone || 'talkingIsland';
  const zoneEl = el('zone-name');
  if (zoneEl) zoneEl.textContent = ZONES[state.zone]?.name || '說話之島';
  updateAllUI();
  startCombat();
  save();
  qsa('.tab-btn').forEach(b => b.classList.remove('active'));
  const zoneTab = qs('.tab-btn[data-tab="zones"]');
  if (zoneTab) zoneTab.classList.add('active');
  qsa('.tab-pane').forEach(p => p.classList.remove('active'));
  const zonesPane = el('tab-zones');
  if (zonesPane) zonesPane.classList.add('active');
}

// CODEX_SETS foi movido para src/data/codex.js (Sprint 1)
// Os imports estão no topo do arquivo.


function getCodexBonuses() {
  const totals = { atk: 0, def: 0, matk: 0, mdef: 0, hp: 0, mp: 0, eva: 0, crit: 0 };
  state.codex = state.codex || {};
  for (const [setId, setDef] of Object.entries(CODEX_SETS)) {
    const regList = state.codex[setId] || [];
    if (setDef.items.every(itemId => regList.includes(itemId))) {
      for (const [k, val] of Object.entries(setDef.bonus)) {
        totals[k] = (totals[k] || 0) + val;
      }
    }
  }

  if (typeof CardCodexService !== 'undefined' && CardCodexService.getCodexPassiveBonuses) {
    const cardB = CardCodexService.getCodexPassiveBonuses(state);
    totals.atk += Math.floor(cardB.pAtk || 0);
    totals.def += Math.floor(cardB.pDef || 0);
    totals.matk += Math.floor(cardB.mAtk || 0);
    totals.mdef += Math.floor(cardB.mDef || 0);
    totals.hp += Math.floor(cardB.maxHp || 0);
    totals.mp += Math.floor(cardB.maxMp || 0);
    totals.crit += Math.floor(cardB.critRate || 0);
  }

  return totals;
}

function updateCodexUI() {
  const grid = el('codex-grid'); if (!grid) return;
  const summaryEl = el('codex-summary');
  grid.innerHTML = '';
  state.codex = state.codex || {};
  state.cardCodex = state.cardCodex || {};

  const subTab = window._codexSubTab || 'sets';

  // Sub-abas do Codex
  const tabsNav = mkEl('div');
  tabsNav.style.cssText = 'display:flex; gap:8px; margin-bottom:14px; border-bottom:1px solid rgba(212,175,55,0.25); padding-bottom:8px;';
  tabsNav.innerHTML = `
    <button class="inv-batch-btn ${subTab === 'sets' ? 'active' : ''}" style="font-family:\'Cinzel\',serif; font-weight:bold; ${subTab === 'sets' ? 'background:linear-gradient(180deg,#d4a744,#8a641c); color:#000;' : ''}" onclick="window.setCodexSubTab('sets')">📜 裝備收藏</button>
    <button class="inv-batch-btn ${subTab === 'cards' ? 'active' : ''}" style="font-family:\'Cinzel\',serif; font-weight:bold; ${subTab === 'cards' ? 'background:linear-gradient(180deg,#d4a744,#8a641c); color:#000;' : ''}" onclick="window.setCodexSubTab('cards')">🃏 怪物卡片與娃娃圖鑑</button>
  `;
  grid.appendChild(tabsNav);

  if (subTab === 'cards') {
    renderMonsterCardsCodex(grid, summaryEl);
    return;
  }

  let totalSets = Object.keys(CODEX_SETS).length, completedSets = 0;

  for (const [setId, setDef] of Object.entries(CODEX_SETS)) {
    const regList = state.codex[setId] || [];
    const isComplete = setDef.items.every(i => regList.includes(i));
    if (isComplete) completedSets++;

    const card = mkEl('div');
    card.className = 'codex-card' + (isComplete ? ' completed' : '');
    card.style.cssText = 'border: 1px solid var(--border-gilt); padding: 12px; border-radius: 8px; background: rgba(15,18,25,0.8); margin-bottom: 12px;';

    const itemsHtml = setDef.items.map(itemId => {
      const itemDef = D().ALL_ITEMS[itemId] || { name: itemId };
      const isReg = regList.includes(itemId);
      const inInv = getInventoryCount(itemId) > 0 || getWarehouseCount(itemId) > 0;
      let btn = '';
      if (isReg) btn = '<span style="color:#10b981; font-weight:bold;">✓ 已登錄</span>';
      else if (inInv) btn = `<button class="action-btn action-btn--primary codex-reg-btn" style="padding: 2px 8px; font-size: 11px;" data-set="${setId}" data-item="${itemId}" onclick="registerCodexItem('${setId}', '${itemId}')">登錄 📥</button>`;
      else btn = '<span style="color:var(--text-muted); font-size: 11px;">未持有</span>';

      return `<div style="display:flex; justify-content:space-between; align-items:center; margin: 4px 0; font-size: 12px;"><span>${itemDef.name}</span>${btn}</div>`;
    }).join('');

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h4 style="margin:0; color:${isComplete ? '#10b981' : 'var(--gilt-bright)'}">${setDef.name} ${isComplete ? '🏆（已完成）' : ''}</h4>
        <span style="font-size:11px; background:rgba(0,0,0,0.5); padding:2px 8px; border-radius:10px; color:#f59e0b;">${setDef.label}</span>
      </div>
      <p style="font-size:11px; color:var(--text-muted); margin: 4px 0 8px 0;">${setDef.desc}</p>
      <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;">${itemsHtml}</div>
    `;

    card.querySelectorAll('.codex-reg-btn').forEach(b => {
      b.onclick = () => registerCodexItem(b.dataset.set, b.dataset.item);
    });
    grid.appendChild(card);
  }

  if (summaryEl) {
    const b = getCodexBonuses();
    summaryEl.innerHTML = `<span style="color:var(--gilt-bright); font-weight:bold;">已完成收藏：${completedSets}/${totalSets}</span> · 總加成：+${b.atk} 攻擊、+${b.def} 防禦、+${b.matk} 魔法攻擊、+${b.hp} 生命值`;
  }
}

function renderMonsterCardsCodex(container, summaryEl) {
  const allCards = MONSTER_CARDS || {};
  let totalCards = Object.keys(allCards).length;
  let absorbedCards = 0;

  const searchQuery = (window._cardSearchQuery || '').toLowerCase().trim();
  const rarityFilter = window._cardRarityFilter || 'all';

  // Barra de Filtros e Pesquisa
  const filterBar = mkEl('div');
  filterBar.style.cssText = 'background:rgba(0,0,0,0.4); border:1px solid rgba(212,175,55,0.25); border-radius:10px; padding:10px 14px; margin-bottom:14px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:10px;';
  
  filterBar.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px; flex:1; min-width:200px;">
      <input 
        type="text" 
        id="card-search-input" 
        placeholder="🔍 依怪物或卡片名稱搜尋..." 
        value="${window._cardSearchQuery || ''}"
        style="width:100%; background:#090b10; color:#fff; border:1px solid rgba(212,167,68,0.3); border-radius:6px; padding:6px 10px; font-size:12px; font-family:sans-serif;"
      />
    </div>
    <div style="display:flex; flex-wrap:wrap; gap:4px;">
      ${['all', 'common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'].map(r => {
        const labels = { all: '全部', common: '一般', uncommon: '非凡', rare: '稀有', epic: '史詩', legendary: '傳說', mythic: '神話以上' };
        const isActive = rarityFilter === r;
        return `
          <button 
            class="inv-batch-btn" 
            style="padding:4px 10px; font-size:11px; font-weight:bold; ${isActive ? 'background:linear-gradient(180deg,#d4a744,#8a641c); border:1px solid #ffe699; color:#000;' : 'background:rgba(255,255,255,0.05); color:#94a3b8;'}"
            onclick="window.setCardRarityFilter('${r}')"
          >
            ${labels[r] || r}
          </button>
        `;
      }).join('')}
    </div>
  `;
  container.appendChild(filterBar);

  const searchInput = filterBar.querySelector('#card-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      window._cardSearchQuery = e.target.value;
      updateCodexUI();
    };
  }

  const cardsContainer = mkEl('div');
  cardsContainer.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:12px;';

  const RARITY_COLORS = {
    common: { border: 'rgba(148,163,184,0.4)', glow: 'rgba(148,163,184,0.15)', text: '#94a3b8', bg: 'rgba(15,20,30,0.85)' },
    uncommon: { border: 'rgba(34,197,94,0.5)', glow: 'rgba(34,197,94,0.2)', text: '#4ade80', bg: 'rgba(10,25,18,0.85)' },
    rare: { border: 'rgba(59,130,246,0.6)', glow: 'rgba(59,130,246,0.25)', text: '#60a5fa', bg: 'rgba(12,20,35,0.85)' },
    epic: { border: 'rgba(168,85,247,0.7)', glow: 'rgba(168,85,247,0.3)', text: '#c084fc', bg: 'rgba(25,12,35,0.85)' },
    legendary: { border: 'rgba(245,158,11,0.8)', glow: 'rgba(245,158,11,0.4)', text: '#f59e0b', bg: 'rgba(35,20,8,0.85)' },
    mythic: { border: 'rgba(239,68,68,0.9)', glow: 'rgba(239,68,68,0.5)', text: '#ef4444', bg: 'rgba(35,10,10,0.85)' },
    primordial: { border: 'rgba(244,63,94,1)', glow: 'rgba(244,63,94,0.6)', text: '#fb7185', bg: 'rgba(40,10,20,0.85)' },
    sovereign: { border: '#facc15', glow: 'rgba(250,204,21,0.7)', text: '#fde047', bg: 'rgba(40,25,10,0.9)' }
  };

  let matchingCardsCount = 0;

  for (const [cardId, cardDef] of Object.entries(allCards)) {
    const current = state.cardCodex?.[cardId] || { rank: 0, count: 0 };
    const isAbsorbed = current.rank > 0;
    if (isAbsorbed) absorbedCards++;

    // Filtros de busca e raridade
    const rKey = (cardDef.rarity || 'common').toLowerCase();
    if (rarityFilter !== 'all') {
      if (rarityFilter === 'mythic') {
        if (!['mythic', 'primordial', 'sovereign'].includes(rKey)) continue;
      } else if (rKey !== rarityFilter) {
        continue;
      }
    }

    if (searchQuery) {
      const matchName = String(cardDef.name || '').toLowerCase().includes(searchQuery);
      const matchMon = String(cardDef.monster || '').toLowerCase().includes(searchQuery);
      if (!matchName && !matchMon) continue;
    }

    matchingCardsCount++;
    const rStyle = RARITY_COLORS[rKey] || RARITY_COLORS.common;
    const invCount = getInventoryCount(cardId) + getWarehouseCount(cardId);

    const rankMult = isAbsorbed ? CardCodexService.getRankMultiplier(current.rank) : 1.0;
    const bonusLabel = Object.entries(cardDef.codexBonus || {})
      .map(([stat, val]) => {
        const multipliedVal = isAbsorbed ? Math.round(val * rankMult) : val;
        return `+${typeof val === 'number' && val < 1 ? (val * 100).toFixed(0) + '%' : multipliedVal} ${({ str: '力量', dex: '敏捷', con: '體質', int: '智力', wit: '智慧', men: '精神', atk: '物理攻擊', patk: '物理攻擊', def: '物理防禦', pdef: '物理防禦', matk: '魔法攻擊', mdef: '魔法防禦', hp: '生命值', maxHp: '最大生命值', mp: '魔力', maxMp: '最大魔力', eva: '迴避', crit: '暴擊', speed: '速度', spd: '速度', accuracy: '命中', hit: '命中', critDmg: '暴擊傷害', hpRegen: '生命恢復', mpRegen: '魔力恢復' })[stat] || '其他屬性'}`;
      })
      .join(', ');

    const nextRankReq = CardCodexService.getNextRankRequirement(current.rank);
    const dropPct = (Number(cardDef.dropChance || 0.0005) * 100).toFixed(2);

    const cardBox = mkEl('div');
    cardBox.style.cssText = `border:1px solid ${isAbsorbed ? rStyle.border : 'rgba(212,175,55,0.2)'}; padding:14px; border-radius:10px; background:${rStyle.bg}; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 15px ${isAbsorbed ? rStyle.glow : 'rgba(0,0,0,0.5)'}; transition:transform 0.2s;`;

    cardBox.innerHTML = `
      <div>
        <div style="display:flex; gap:12px; align-items:flex-start;">
          <!-- Monster Portrait / Card Frame -->
          <div style="width:54px; height:54px; min-width:54px; border-radius:10px; border:2px solid ${rStyle.border}; background:#090d16; display:flex; align-items:center; justify-content:center; overflow:hidden; box-shadow:0 0 12px ${rStyle.glow}; position:relative;">
            <img src="${cardDef.image || cardDef.icon || 'icons/general/card.png'}" alt="${cardDef.name}" style="width:100%; height:100%; object-fit:cover; object-position:center top; border-radius:8px;" onerror="this.src='${cardDef.icon || 'icons/general/card.png'}'; this.style.objectFit='contain'; this.onerror=null;" />
          </div>

          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <h4 style="margin:0; font-size:13px; font-family:'Cinzel',serif; color:${isAbsorbed ? '#fff' : '#cbd5e1'}; line-height:1.2;">
                ${cardDef.name}
              </h4>
            </div>
            <div style="display:flex; gap:6px; align-items:center; margin-top:4px;">
              <span style="font-size:9px; padding:1px 6px; border-radius:4px; background:rgba(0,0,0,0.6); color:${rStyle.text}; text-transform:uppercase; font-weight:bold; border:1px solid ${rStyle.border};">
                ${({ common: '一般', uncommon: '非凡', rare: '稀有', epic: '史詩', legendary: '傳說', mythic: '神話', primordial: '太古', sovereign: '君王' })[rKey] || '一般'}
              </span>
              <span style="font-size:10px; color:#94a3b8;">
                掉落率：<strong>${dropPct}%</strong>
              </span>
            </div>
          </div>
        </div>

        <!-- Bônus Passivo da Coleção -->
        <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.08); padding:8px 10px; border-radius:6px; margin:10px 0 8px 0; font-size:11px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
            <span style="color:${rStyle.text}; font-weight:bold;">帳號永久被動加成：</span>
            ${isAbsorbed ? `<span style="color:#fde047; font-size:10px;">(×${rankMult.toFixed(2)})</span>` : ''}
          </div>
          <div style="color:#e2e8f0; font-family:sans-serif;">${bonusLabel || '無'}</div>
        </div>

        <!-- Rank e Progresso -->
        <div style="margin-bottom:8px;">
          <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:3px;">
            <span style="color:${isAbsorbed ? '#86efac' : '#94a3b8'}; font-weight:bold;">
              ${isAbsorbed ? `⭐ 階級 ${current.rank}/5（已吸收 ${current.count} 張）` : '⚪ 尚未吸收'}
            </span>
            <span style="font-size:10px; color:#94a3b8;">
              ${current.rank >= 5 ? '最高階級' : `下一階級：${current.count}/${nextRankReq}`}
            </span>
          </div>
          <div style="width:100%; height:6px; background:rgba(0,0,0,0.6); border-radius:3px; overflow:hidden; border:1px solid rgba(255,255,255,0.1);">
            <div style="height:100%; width:${Math.min(100, Math.floor((current.count / (nextRankReq || 1)) * 100))}%; background:${isAbsorbed ? 'linear-gradient(90deg,#22c55e,#86efac)' : 'linear-gradient(90deg,#64748b,#94a3b8)'}; transition:width 0.3s;"></div>
          </div>
        </div>
      </div>

      <!-- Ações -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.08); padding-top:8px; margin-top:4px;">
        <span style="font-size:11px; color:${invCount > 0 ? '#86efac' : '#64748b'}; font-weight:bold;">
          ${invCount > 0 ? `📦 持有：${invCount}×` : '背包中沒有卡片'}
        </span>
        <div style="display:flex; gap:6px;">
          ${invCount > 0 ? `
            <button class="action-btn action-btn--primary" style="padding:4px 10px; font-size:11px; font-weight:bold;" onclick="window.absorbCardAction('${cardId}', false)">吸收 📥</button>
            ${invCount > 1 ? `
              <button class="action-btn" style="padding:4px 8px; font-size:11px; font-weight:bold; background:rgba(212,167,68,0.2); border-color:#d4a744; color:#fde047;" onclick="window.absorbCardAction('${cardId}', true)">全部（${invCount}）</button>
            ` : ''}
          ` : ''}
        </div>
      </div>
    `;

    cardsContainer.appendChild(cardBox);
  }

  if (matchingCardsCount === 0) {
    const emptyBox = mkEl('div');
    emptyBox.style.cssText = 'grid-column:1/-1; text-align:center; padding:30px; color:#94a3b8; font-size:13px; background:rgba(0,0,0,0.3); border-radius:8px;';
    emptyBox.textContent = '依目前篩選條件找不到怪物卡片。';
    cardsContainer.appendChild(emptyBox);
  }

  container.appendChild(cardsContainer);

  if (summaryEl) {
    summaryEl.innerHTML = `<span style="color:var(--gilt-bright); font-weight:bold;">卡片圖鑑：${absorbedCards}/${totalCards} 已吸收</span> · 帳號永久加成已生效`;
  }
}

function registerCodexItem(setId, itemId) {
  const invIdx = state.inventory.findIndex(i => i.itemId === itemId && !i.equipped);
  let foundInWarehouse = false;
  let whIdx = -1;

  if (invIdx >= 0) {
    state.inventory.splice(invIdx, 1);
  } else {
    whIdx = (state.warehouse || []).findIndex(i => i.itemId === itemId && !i.equipped);
    if (whIdx >= 0) {
      state.warehouse.splice(whIdx, 1);
      foundInWarehouse = true;
    } else {
      log('你沒有可登錄到圖鑑的這件物品。', 'system');
      return;
    }
  }

  state.codex = state.codex || {};
  state.codex[setId] = state.codex[setId] || [];
  if (!state.codex[setId].includes(itemId)) state.codex[setId].push(itemId);

  const itemDef = D().ALL_ITEMS[itemId];
  log(`📜 物品 **${itemDef?.name || '未知物品'}** 已成功登錄圖鑑！${foundInWarehouse ? '（已從倉庫取出）' : ''}`, 'rarity-rare');
  floatText('📜 圖鑑登錄完成！', 'float-jackpot');
  triggerQuestEvent('codex', 1);

  const setDef = CODEX_SETS[setId];
  if (setDef && setDef.items.every(i => state.codex[setId].includes(i))) {
    log(`🏆 恭喜！收藏 **${setDef.name}** 已 100% 完成！永久加成已啟用：${setDef.label}`, 'rarity-legendary');
    floatText('🏆 收藏完成！', 'float-jackpot');
  }

  updateAllUI(); save();
}

// BOSS_DOLLS foi movido para src/data/codex.js (Sprint 1)
// Os imports estão no topo do arquivo.


function getDollsBonuses() {
  const totals = { atk: 0, def: 0, matk: 0, mdef: 0, hp: 0, mp: 0, eva: 0, crit: 0, speed: 0, lifesteal: 0 };
  state.dolls = state.dolls || [];
  for (const d of state.dolls) {
    const dollDef = BOSS_DOLLS[d.dollId];
    if (!dollDef) continue;
    const lvlInfo = dollDef.statsByLvl[d.level || 1];
    if (!lvlInfo) continue;
    for (const [k, v] of Object.entries(lvlInfo)) {
      if (k !== 'label') totals[k] = (totals[k] || 0) + v;
    }
  }
  return totals;
}

function updateDollsUI() {
  const grid = el('dolls-grid'); if (!grid) return;
  const summaryEl = el('dolls-summary');
  grid.innerHTML = '';
  state.dolls = state.dolls || [];
  state.synthSelected = state.synthSelected || [null, null];

  const slot1El = el('synth-slot-1');
  const slot2El = el('synth-slot-2');
  const d1 = state.dolls.find(i => i.uid === state.synthSelected[0]);
  const d2 = state.dolls.find(i => i.uid === state.synthSelected[1]);

  if (slot1El) slot1El.textContent = d1 ? `${BOSS_DOLLS[d1.dollId]?.name} 等級 ${d1.level}` : '基底娃娃';
  if (slot2El) slot2El.textContent = d2 ? `${BOSS_DOLLS[d2.dollId]?.name} 等級 ${d2.level}` : '材料娃娃';

  const synthBtn = el('start-doll-synth-btn');
  if (synthBtn) synthBtn.onclick = synthesizeDolls;

  for (const d of state.dolls) {
    const def = BOSS_DOLLS[d.dollId]; if (!def) continue;
    const lvlInfo = def.statsByLvl[d.level || 1];
    const isSel1 = state.synthSelected[0] === d.uid;
    const isSel2 = state.synthSelected[1] === d.uid;

    const item = mkEl('div');
    item.className = 'doll-card' + (isSel1 || isSel2 ? ' selected' : '');
    item.style.cssText = `border: 2px solid ${isSel1 || isSel2 ? 'var(--gilt-bright)' : 'var(--border-gilt)'}; padding: 10px; border-radius: 8px; background: rgba(20,25,35,0.9); display: flex; align-items: center; justify-content: space-between;`;
    item.innerHTML = `
      <div style="display:flex; align-items:center; gap: 10px;">
        <span style="font-size: 24px;">${def.icon}</span>
        <div>
          <div style="font-weight:bold; color:var(--gilt-bright);">${def.name} <span style="color:#60a5fa;">等級 ${d.level || 1}</span></div>
          <div style="font-size:11px; color:#10b981;">${lvlInfo?.label || ''}</div>
        </div>
      </div>
      <button class="action-btn synth-doll-btn" style="padding: 4px 8px; font-size: 11px;" data-uid="${d.uid}" onclick="selectDollForSynth('${d.uid}')">${isSel1 ? '欄位 1' : isSel2 ? '欄位 2' : '選擇 🔮'}</button>
    `;
    item.querySelectorAll('.synth-doll-btn').forEach(b => {
      b.onclick = () => selectDollForSynth(b.dataset.uid);
    });
    grid.appendChild(item);
  }

  if (summaryEl) {
    const b = getDollsBonuses();
    summaryEl.innerHTML = `收藏娃娃：<strong>${state.dolls.length}</strong> · 總加成：+${b.atk} 攻擊、+${b.def} 防禦、+${b.matk} 魔法攻擊`;
  }

  // Render Enciclopédia de Boss Dolls & Fontes de Obtenção
  const encyclopediaEl = el('dolls-encyclopedia');
  if (encyclopediaEl) {
    let encHtml = `
      <div style="background:rgba(12,16,26,0.95); border:1px solid rgba(212,167,68,0.4); border-radius:12px; padding:14px;">
        <h4 style="margin:0 0 12px 0; font-family:'Cinzel',serif; color:#f4d58a; font-size:15px; display:flex; align-items:center; gap:8px;">
          📚 首領娃娃圖鑑與掉落來源
        </h4>
    `;

    for (const [dId, def] of Object.entries(BOSS_DOLLS)) {
      const ownedDolls = state.dolls.filter(i => i.dollId === dId);
      const maxOwnedLvl = ownedDolls.reduce((max, d) => Math.max(max, d.level || 1), 0);
      const isUnlocked = ownedDolls.length > 0;

      let lvlBadgesHtml = '';
      for (let lvl = 1; lvl <= 5; lvl++) {
        const info = def.statsByLvl[lvl];
        if (!info) continue;
        const isThisLvl = maxOwnedLvl === lvl;
        lvlBadgesHtml += `
          <div style="font-size:11px; padding:5px 8px; border-radius:6px; background:${isThisLvl ? 'rgba(52,211,153,0.2)' : 'rgba(0,0,0,0.4)'}; border:1px solid ${isThisLvl ? '#34d399' : 'rgba(255,255,255,0.08)'}; color:${isThisLvl ? '#34d399' : '#aaa'}; display:flex; justify-content:space-between; align-items:center;">
            <span><strong>等級 ${lvl}：</strong> ${info.label}</span>
            ${isThisLvl ? '<span style="color:#34d399; font-weight:bold;">[啟用中]</span>' : ''}
          </div>
        `;
      }

      encHtml += `
        <div style="background:rgba(18,24,36,0.9); border:1px solid ${isUnlocked ? 'rgba(212,167,68,0.5)' : 'rgba(255,255,255,0.08)'}; border-radius:10px; padding:12px; margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:26px;">${def.icon}</span>
              <div>
                <h4 style="margin:0; font-family:'Cinzel',serif; color:${isUnlocked ? '#f4d58a' : '#aaa'}; font-size:14px; display:flex; align-items:center; gap:6px;">
                  ${def.name} ${isUnlocked ? `<span style="font-size:10px; background:rgba(52,211,153,0.2); border:1px solid #34d399; color:#34d399; padding:1px 6px; border-radius:4px;">目前生效等級：${maxOwnedLvl}</span>` : '<span style="font-size:10px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; padding:1px 6px; border-radius:4px;">🔒 尚未解鎖</span>'}
                </h4>
                <p style="margin:2px 0 0 0; font-size:11px; color:#94a3b8;">${def.desc}</p>
              </div>
            </div>
            <div style="font-size:11px; background:rgba(0,0,0,0.5); border:1px solid rgba(212,167,68,0.3); padding:4px 10px; border-radius:8px; color:#ffd877; font-weight:bold;">
              📍 Drop: ${def.source}
            </div>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:6px; margin-top:8px;">
            ${lvlBadgesHtml}
          </div>
        </div>
      `;
    }
    encHtml += `</div>`;
    encyclopediaEl.innerHTML = encHtml;
  }
}

function selectDollForSynth(uid) {
  state.synthSelected = state.synthSelected || [null, null];
  if (state.synthSelected[0] === uid) state.synthSelected[0] = null;
  else if (state.synthSelected[1] === uid) state.synthSelected[1] = null;
  else if (!state.synthSelected[0]) state.synthSelected[0] = uid;
  else if (!state.synthSelected[1]) state.synthSelected[1] = uid;
  else state.synthSelected[0] = uid;
  updateDollsUI();
}

function synthesizeDolls() {
  state.synthSelected = state.synthSelected || [null, null];
  const u1 = state.synthSelected[0], u2 = state.synthSelected[1];
  if (!u1 || !u2 || u1 === u2) { log('請在合成祭壇選擇 2 隻相同娃娃。', 'system'); return; }

  const idx1 = state.dolls.findIndex(d => d.uid === u1);
  const idx2 = state.dolls.findIndex(d => d.uid === u2);
  if (idx1 < 0 || idx2 < 0) return;

  const d1 = state.dolls[idx1], d2 = state.dolls[idx2];
  if (d1.dollId !== d2.dollId || d1.level !== d2.level) { log('兩隻娃娃必須是相同種類且相同等級！', 'system'); return; }
  if (d1.level >= 5) { log('你的娃娃已達最高等級（等級 5）！', 'system'); return; }

  const rates = { 1: 0.70, 2: 0.55, 3: 0.40, 4: 0.25 };
  const chance = rates[d1.level] || 0.30;
  const roll = Math.random();

  state.dolls.splice(idx2, 1);
  state.synthSelected = [null, null];

  if (roll < chance) {
    d1.level += 1;
    log(`🎉 合成成功！你的 **${BOSS_DOLLS[d1.dollId]?.name}** 已提升至 **等級 ${d1.level}**！`, 'rarity-legendary');
    floatText('✨ 合成成功！', 'float-jackpot');
  } else {
    log(`💔 合成失敗！材料娃娃已消耗，但基底娃娃保留。`, 'system');
    floatText('💔 失敗', 'float-gold');
  }

  updateAllUI(); save();
}

// --------------------------- MAGIC LAMP ---------------------------
function updateMagicLampUI() {
  updateImperialEconomyHeader(state);
  const bar = el('lamp-progress-bar');
  const countLabel = el('lamp-count-label');
  const pct = Math.min(100, Math.floor(((state.magicLampExp || 0) / 50000) * 100));
  if (bar) bar.style.width = pct + '%';
  if (countLabel) {
    countLabel.textContent = `${state.magicLamps || 0} 個神燈可用（下一個進度 ${pct}%）`;
  }

  const btn = el('use-magic-lamp-btn');
  if (btn) {
    btn.onclick = useMagicLamp;
    btn.disabled = (!state.magicLamps || state.magicLamps < 1);
  }
}

function useMagicLamp() {
  if (!state.magicLamps || state.magicLamps < 1) {
    log('你沒有可使用的魔法神燈！', 'system');
    return;
  }

  state.magicLamps -= 1;
  const result = rollMagicLampCard(state.level || 1);

  state.xp += result.expWon;
  state.sp += result.spWon;
  checkLevelUp();

  const cardRes = el('lamp-result-card');
  if (cardRes) {
    const cardClass = result.cardType === 'red' ? 'card-red' : (result.cardType === 'purple' ? 'card-purple' : 'card-blue');
    const badgeText = result.cardType === 'red' ? '🔥 大獎揭曉！' : (result.cardType === 'purple' ? '✨ 稀有卡牌' : '🌟 魔法卡牌');
    const badgeColor = result.cardType === 'red' ? '#ef4444' : (result.cardType === 'purple' ? '#a855f7' : '#3b82f6');

    cardRes.innerHTML = `
      <div class="imp-magic-card ${cardClass}">
        <div style="font-size:11px; font-weight:800; letter-spacing:0.12em; color:${badgeColor}; text-transform:uppercase; margin-bottom:8px; font-family:'Cinzel',serif;">
          ${badgeText}
        </div>
        <h4 style="margin:0; font-size:18px; font-family:'Cinzel',serif; color:#ffd877;">${result.cardName}</h4>
        <div style="font-size:16px; font-family:'IBM Plex Mono',monospace; font-weight:bold; color:#67e8f9; margin:10px 0 6px 0;">
          +${result.expWon.toLocaleString()} 經驗值 &bull; +${result.spWon.toLocaleString()} 技能點
        </div>
        <span style="font-size:11px; color:#94a3b8; font-family:'IBM Plex Mono',monospace;">等級區間：${result.bracket}</span>
      </div>
    `;
  }

  log(`🪔 已使用魔法神燈！抽中 **${result.cardName}**（+${result.expWon.toLocaleString()} 經驗值、+${result.spWon.toLocaleString()} 技能點）[${result.bracket}]！`, 'rarity-legendary');
  floatText(`🪔 +${result.expWon.toLocaleString()} 經驗值！`, 'float-jackpot');

  updateAllUI();
  save();
}

function updateCraftGaugeUI() {
  // Desacoplado da 神燈: Random Craft unificado na Forja Imperial (#tab-craft)
}

function refreshRandomCraftWheel() {
  return serviceRefreshRandomCraftSlots(state, { log, updateAllUI, save });
}

function renderRandomCraftWheelUI() {
  // Desacoplado da 神燈: Renderizado na Forja Imperial
}

function spinRandomCraft() {
  return serviceSpinRandomCraft(state, { log, updateAllUI, save, floatText });
}

function renderSpecialCraftRecipes() {
  const grid = el('special-craft-grid'); if (!grid) return;
  grid.innerHTML = '';

  const recipes = [
    { id: 'spellbook_selector', name: '📖 4★ 技能書選擇箱', costCharges: 5, crystalId: 'crystal_s', crystalQty: 10, resultId: 'spellbook_4star' },
    { id: 'boss_doll_box', name: '📦 首領娃娃箱（蟻后／巴溫／札肯）', costCharges: 3, crystalId: 'crystal_a', crystalQty: 5, resultDoll: 'doll_queen_ant' },
    { id: 's_weapon_chest', name: '⚔️ S 級武器寶箱', costCharges: 4, crystalId: 'crystal_a', crystalQty: 10, resultId: 'dragon_slayer' },
    { id: 'enchant_scroll_s', name: '📜 S 級強化卷軸', costCharges: 1, crystalId: 'crystal_b', crystalQty: 5, resultId: 'crystal_s' }
  ];

  recipes.forEach(r => {
    const card = mkEl('div');
    card.style.cssText = 'border:1px solid var(--border-gilt); padding:10px; border-radius:8px; background:rgba(15,20,30,0.8);';
    card.innerHTML = `
      <div style="font-weight:bold; color:var(--gilt-bright); font-size:12px;">${r.name}</div>
      <div style="font-size:11px; color:var(--text-muted); margin:4px 0;">費用：${r.costCharges} 次充能 + ${r.crystalQty}× ${D().ALL_ITEMS[r.crystalId]?.name || '未知水晶'}</div>
      <button class="action-btn action-btn--primary special-craft-btn" style="padding:2px 8px; font-size:11px; width:100%; margin-top:6px;" data-recipe="${r.id}" onclick="craftSpecialRecipe('${r.id}')">鍛造 ✨</button>
    `;
    card.querySelectorAll('.special-craft-btn').forEach(b => {
      b.onclick = () => craftSpecialRecipe(b.dataset.recipe);
    });
    grid.appendChild(card);
  });
}

function removeFromInventoryByItemId(itemId, count = 1) {
  let remaining = count;
  for (let i = state.inventory.length - 1; i >= 0; i--) {
    const item = state.inventory[i];
    if (item.itemId === itemId && !item.equipped) {
      const take = Math.min(remaining, item.count || 1);
      item.count = (item.count || 1) - take;
      remaining -= take;
      if (item.count <= 0) state.inventory.splice(i, 1);
      if (remaining <= 0) break;
    }
  }
}

function craftSpecialRecipe(recipeId) {
  if (recipeId === 'spellbook_selector') {
    if ((state.craftCharges || 0) < 5 || getInventoryCount('crystal_s') < 10) { log('資源不足！需要 5 次製作充能與 10 個 S 級水晶。', 'system'); return; }
    state.craftCharges -= 5; removeFromInventoryByItemId('crystal_s', 10);
    addToInventory('spellbook_4star', 1);
    log('✨ 特殊製作成功！製作 1 本 4★ 魔法書 ⭐！', 'rarity-legendary');
  } else if (recipeId === 'boss_doll_box') {
    if ((state.craftCharges || 0) < 3 || getInventoryCount('crystal_a') < 5) { log('資源不足！需要 3 次製作充能與 5 個 A 級水晶。', 'system'); return; }
    state.craftCharges -= 3; removeFromInventoryByItemId('crystal_a', 5);
    const dollKeys = ['doll_queen_ant', 'doll_baium', 'doll_orfen', 'doll_zaken'];
    const chosen = dollKeys[Math.floor(Math.random() * dollKeys.length)];
    state.dolls = state.dolls || [];
    state.dolls.push({ uid: 'doll_' + Date.now(), dollId: chosen, level: 1 });
    log(`✨ 特殊製作成功！打開箱子並獲得：**${BOSS_DOLLS[chosen]?.name}**！`, 'rarity-legendary');
  } else if (recipeId === 's_weapon_chest') {
    if ((state.craftCharges || 0) < 4 || getInventoryCount('crystal_a') < 10) { log('資源不足！需要 4 次製作充能與 10 個 A 級水晶。', 'system'); return; }
    state.craftCharges -= 4; removeFromInventoryByItemId('crystal_a', 10);
    addToInventory('dragon_slayer', 1, 'epic');
    log('✨ 特殊製作成功！製作 1 把屠龍者（S 級）！', 'rarity-legendary');
  } else if (recipeId === 'enchant_scroll_s') {
    if ((state.craftCharges || 0) < 1 || getInventoryCount('crystal_b') < 5) { log('資源不足！需要 1 次製作充能與 5 個 B 級水晶。', 'system'); return; }
    state.craftCharges -= 1; removeFromInventoryByItemId('crystal_b', 5);
    addToInventory('crystal_s', 2);
    log('✨ 特殊製作成功！鍛造 2 個 S 級水晶！', 'rarity-rare');
  }
  triggerQuestEvent('craft', 1);
  updateAllUI(); save();
}

function attachGlobalErrorHandlers() {
  addTrackedListener(window, 'error', (event) => {
    console.warn('Global runtime notice:', event.error || event.message);
  });
  addTrackedListener(window, 'unhandledrejection', (event) => {
    console.warn('Unhandled promise rejection:', event.reason);
    event.preventDefault();
  });
}

const tabScrollMap = {};

export const PILLAR_TABS_MAP = {
  combat: ['zones', 'raids', 'tower', 'colosseum', 'expeditions', 'fishing'],
  character: ['character', 'inventory', 'skills', 'astral', 'dolls', 'cosmetics', 'quests'],
  economy: ['market', 'shop', 'craft', 'alchemy', 'warehouse', 'magiclamp'],
  glory: ['clan', 'olympiad', 'rankings', 'sevensigns', 'fortress', 'enchant', 'codex']
};

export const TAB_TO_PILLAR = {};
Object.entries(PILLAR_TABS_MAP).forEach(([pillar, tabs]) => {
  tabs.forEach(tab => { TAB_TO_PILLAR[tab] = pillar; });
});

export const TAB_NAMES_MAP = {
  battle: '戰鬥',
  hero: '英雄',
  character: '角色',
  inventory: '背包',
  skills: '技能',
  astral: '專精',
  dolls: '娃娃與寵物',
  cosmetics: '外觀',
  quests: '任務',
  zones: '狩獵與區域',
  raids: '團隊首領與首領',
  tower: '傲慢之塔',
  colosseum: '玩家對戰競技場',
  expeditions: '遠征',
  fishing: '釣魚',
  market: '奇岩市場',
  shop: '商人',
  craft: '帝國鍛造',
  alchemy: '鍊金',
  warehouse: '私人倉庫',
  magiclamp: '魔法神燈',
  clan: '血盟與城堡',
  olympiad: '奧林匹亞',
  rankings: '世界排行榜',
  sevensigns: '七封印',
  fortress: '要塞',
  enchant: '強化',
  codex: '圖鑑'
};

export function switchPillar(pillarKey) {
  const root = document.getElementById('idle-host')?.shadowRoot || document;
  const pillars = ['combat', 'character', 'economy', 'glory'];
  pillars.forEach(p => {
    const strip = root.getElementById ? root.getElementById(`pillar-strip-${p}`) : el(`pillar-strip-${p}`);
    if (strip) {
      const isTarget = (p === pillarKey);
      strip.style.display = isTarget ? 'flex' : 'none';
      strip.classList.toggle('active', isTarget);
      strip.classList.toggle('collapsed', !isTarget);
    }
  });
  const pillarBtns = root.querySelectorAll ? root.querySelectorAll('.pillar-tab-btn') : qsa('.pillar-tab-btn');
  pillarBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.pillar === pillarKey);
  });
  const impHeader = root.getElementById ? root.getElementById('imperial-pillar-header') : el('imperial-pillar-header');
  if (impHeader) {
    impHeader.style.display = (pillarKey === 'economy') ? 'flex' : 'none';
  }
  const currentStrip = root.getElementById ? root.getElementById(`pillar-strip-${pillarKey}`) : el(`pillar-strip-${pillarKey}`);
  if (currentStrip) {
    const activeBtn = currentStrip.querySelector('.tab-btn.active');
    if (activeBtn) {
      const tabId = activeBtn.dataset?.tab;
      if (tabId) openPanel(tabId);
      else activeBtn.click();
    } else {
      const firstTabBtn = currentStrip.querySelector('.tab-btn');
      if (firstTabBtn) firstTabBtn.click();
    }
  }
}
if (typeof window !== 'undefined') {
  window.switchPillar = switchPillar;
}

export function openPanel(tabName) {
  state = getState();
  const targetTab = (!tabName || tabName === 'zones' || tabName === 'combat' || tabName === 'close') ? 'zones' : tabName;

  // Level Lock & Season Cap Guard
  const isBypass = typeof window !== 'undefined' && (window.__adminUnlockedAll || (typeof localStorage !== 'undefined' && localStorage.getItem('aden_admin_unlock_all') === 'true') || state?.adminUnlockedAll);
  const currentLvl = Number(state?.level) || 1;
  const globalCap = Number(typeof window !== 'undefined' && window.globalServerCap) || Number(state?.serverCap) || Number(state?.serverMaxLevel) || (typeof localStorage !== 'undefined' && Number(localStorage.getItem('aden_server_cap'))) || 120;
  const reqLvl = TAB_UNLOCK_LEVELS[targetTab] || 1;
  if (!isBypass && targetTab !== 'zones' && (currentLvl < reqLvl || reqLvl > globalCap)) {
    const tabLabel = TAB_NAMES_MAP[targetTab] || targetTab;
    const msg = currentLvl < reqLvl 
      ? `🔒 分頁 [${tabLabel}] 將於等級 ${reqLvl} 解鎖！` 
      : `🔒 分頁 [${tabLabel}] 受到目前季節等級上限限制（等級 ${globalCap}）！`;
    if (typeof showToast === 'function') showToast(msg, 'warning');
    else if (typeof log === 'function') log(`❌ ${msg}`, 'system');
    return;
  }

  const root = document.getElementById('idle-host')?.shadowRoot || document;

  // Auto-switch to corresponding pillar dock strip
  const targetPillar = TAB_TO_PILLAR[targetTab] || (typeof PILLAR_MAP !== 'undefined' ? PILLAR_MAP[targetTab] : null) || 'combat';
  if (targetPillar) {
    const pillars = ['combat', 'character', 'economy', 'glory'];
    pillars.forEach(p => {
      const strip = root.getElementById ? root.getElementById(`pillar-strip-${p}`) : el(`pillar-strip-${p}`);
      if (strip) {
        const isTarget = (p === targetPillar);
        strip.style.display = isTarget ? 'flex' : 'none';
        strip.classList.toggle('active', isTarget);
        strip.classList.toggle('collapsed', !isTarget);
      }
    });
    const pillarBtns = root.querySelectorAll ? root.querySelectorAll('.pillar-tab-btn') : qsa('.pillar-tab-btn');
    pillarBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.pillar === targetPillar);
    });
    const impHeader = root.getElementById ? root.getElementById('imperial-pillar-header') : el('imperial-pillar-header');
    if (impHeader) {
      impHeader.style.display = (targetPillar === 'economy') ? 'flex' : 'none';
    }
  }

  // Update mobile tab title badge
  const tabTitle = TAB_NAMES_MAP[targetTab] || targetTab;
  qsa('.mobile-current-tab-badge, #mobile-tabs-current-badge').forEach(b => {
    b.textContent = tabTitle;
  });

  const game = root.getElementById ? root.getElementById('game') : root.querySelector?.('#game');
  if (game && (game.classList.contains('device-mobile') || window.innerWidth <= 768)) {
    game.dataset.mobileView = targetTab;
    const mobileBtns = root.querySelectorAll ? root.querySelectorAll('.mobile-nav-btn') : [];
    mobileBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.tab === targetTab);
    });
  }

  const currentActivePane = root.querySelector('.tab-pane.active');
  if (currentActivePane) {
    tabScrollMap[currentActivePane.id] = currentActivePane.scrollTop;
  }

  ensureAppLayout();
  showMenuPanel(targetTab);

  const pane = root.querySelector(`#tab-${targetTab}`);
  if (pane && tabScrollMap[pane.id] !== undefined) {
    pane.scrollTop = tabScrollMap[pane.id];
  }

  // Verifica se o recurso pertence a uma temporada futura
  if (!isFeatureUnlocked(targetTab)) {
    if (pane) renderSeasonLockedPanel(pane, targetTab);
    return;
  }

  if (targetTab === 'inventory') safeUiUpdate('inventory', updateInventoryUI);
  else if (targetTab === 'character') safeUiUpdate('character', updateCharacterUI);
  else if (targetTab === 'skills') safeUiUpdate('skills', updateSkillUI);
  else if (targetTab === 'shop') safeUiUpdate('shop', updateShopUI);
  else if (targetTab === 'market') safeUiUpdate('market', updateMarketUI);
  else if (targetTab === 'craft') safeUiUpdate('craft', updateCraftUI);
  else if (targetTab === 'alchemy') safeUiUpdate('alchemy', updateAlchemyUI);
  else if (targetTab === 'astral') safeUiUpdate('astral', updateAstralUI);
  else if (targetTab === 'expeditions') safeUiUpdate('expeditions', updateExpeditionsUI);
  else if (targetTab === 'fishing') safeUiUpdate('fishing', updateFishingUI);
  else if (targetTab === 'hunting') safeUiUpdate('hunting', updateHuntingUI);
  else if (targetTab === 'gathering') safeUiUpdate('gathering', updateGatheringUI);
  else if (targetTab === 'mining') safeUiUpdate('mining', updateMiningUI);
  else if (targetTab === 'raids') safeUiUpdate('raids', updateRaidsUI);
  else if (targetTab === 'olympiad') safeUiUpdate('olympiad', updateOlympiadUI);
  else if (targetTab === 'clan') safeUiUpdate('clan', updateClanUI);
  else if (targetTab === 'sevensigns') safeUiUpdate('sevensigns', updateSevenSignsUI);
  else if (targetTab === 'fortress') safeUiUpdate('fortress', updateFortressUI);
  else if (targetTab === 'colosseum') safeUiUpdate('colosseum', updateColosseumUI);
  else if (targetTab === 'rankings') safeUiUpdate('rankings', updateRankingsUI);
  else if (targetTab === 'enchant') safeUiUpdate('enchant', updateEnchantUI);
  else if (targetTab === 'zones') safeUiUpdate('zones', updateZoneUI);
  else if (targetTab === 'codex') safeUiUpdate('codex', updateCodexUI);
  else if (targetTab === 'dolls') safeUiUpdate('dolls', updateDollsUI);
  else if (targetTab === 'cosmetics') safeUiUpdate('cosmetics', updateCosmeticsUI);
  else if (targetTab === 'magiclamp') safeUiUpdate('magiclamp', updateMagicLampUI);
  else if (targetTab === 'quests') safeUiUpdate('quests', updateQuestsUI);
  else if (targetTab === 'tower') safeUiUpdate('tower', updateTowerUI);
  else if (targetTab === 'warehouse') safeUiUpdate('warehouse', updateWarehouseUI);

  try {
    checkTabGuide(targetTab, state, save);
  } catch(e) { /* silently fail — tutorial não bloqueia o jogo */ }
}

function depositAllToWarehouse() {
  const unequipped = state.inventory.filter(i => !i.equipped);
  if (unequipped.length === 0) {
    log('背包中沒有可存入倉庫的未裝備物品。', 'system');
    return;
  }
  let movedCount = 0;
  for (const item of [...unequipped]) {
    if (depositToWarehouse(item.uid, item.count || 1)) {
      movedCount++;
    } else {
      break;
    }
  }
  if (movedCount > 0) {
    log(`📦 已將 ${movedCount} 件物品存入倉庫。`, 'loot');
    updateAllUI(); save();
  }
}

function depositSelectedToWarehouse() {
  const selectedSet = getSelectedSet(state);
  if (!selectedSet || selectedSet.size === 0) {
    log('背包中沒有選取物品，請先勾選要存入倉庫的物品。', 'system');
    return;
  }
  let movedCount = 0;
  for (const uid of Array.from(selectedSet)) {
    const item = state.inventory.find(i => i.uid === uid && !i.equipped);
    if (item && depositToWarehouse(item.uid, item.count || 1)) {
      movedCount++;
      selectedSet.delete(uid);
    }
  }
  if (movedCount > 0) {
    log(`📦 已將選取的 ${movedCount} 件物品存入倉庫。`, 'loot');
    updateAllUI(); save();
  }
}

function depositMaterialsToWarehouse() {
  const unequipped = state.inventory.filter(i => {
    if (!i || i.equipped) return false;
    const def = (typeof window !== 'undefined' && window.GameData) ? window.GameData?.ALL_ITEMS?.[i.itemId] : null;
    if (!def) return false;
    const slot = (def.slot || '').toLowerCase();
    return ['consumable', 'material', 'scroll', 'powerup', 'potion', 'food', 'spellbook'].includes(slot) || !!def.stack;
  });
  if (unequipped.length === 0) {
    log('沒有可存入倉庫的未裝備材料或消耗品。', 'system');
    return;
  }
  let movedCount = 0;
  for (const item of [...unequipped]) {
    if (depositToWarehouse(item.uid, item.count || 1)) {
      movedCount++;
    } else {
      break;
    }
  }
  if (movedCount > 0) {
    log(`📥 已將 ${movedCount} 件材料／消耗品存入倉庫。`, 'loot');
    updateAllUI(); save();
  }
}

function withdrawAllFromWarehouse() {
  if (!state.warehouse || state.warehouse.length === 0) {
    log('倉庫是空的。', 'system');
    return;
  }
  let movedCount = 0;
  for (const item of [...state.warehouse]) {
    if (withdrawFromWarehouse(item.uid, item.count || 1)) {
      movedCount++;
    } else {
      break;
    }
  }
  if (movedCount > 0) {
    log(`🎒 已從倉庫取出 ${movedCount} 件物品。`, 'loot');
    updateAllUI(); save();
  }
}

function withdrawSelectedFromWarehouse() {
  const selectedSet = getSelectedSet(state);
  if (!selectedSet || selectedSet.size === 0) {
    log('倉庫中沒有選取物品，請先勾選要取出的物品。', 'system');
    return;
  }
  let movedCount = 0;
  for (const uid of Array.from(selectedSet)) {
    const item = (state.warehouse || []).find(i => i.uid === uid);
    if (item && withdrawFromWarehouse(item.uid, item.count || 1)) {
      movedCount++;
      selectedSet.delete(uid);
    }
  }
  if (movedCount > 0) {
    log(`🎒 已從倉庫取出選取的 ${movedCount} 件物品。`, 'loot');
    updateAllUI(); save();
  }
}




export function bindEvents() {
  try {
    if (ROOT && ROOT.addEventListener) {
      addTrackedListener(ROOT, 'click', hideItemTooltip);
      addTrackedListener(ROOT, 'click', () => closeGameModeMenu());
    }

    // Keyboard shortcuts (1-9: Tab switch, Space: Speed, S: Save)
    addTrackedListener(window, 'keydown', (e) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }

      const tabs = ['character', 'inventory', 'skills', 'shop', 'craft', 'enchant', 'zones', 'quests', 'tower'];
      if (e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key) - 1;
        if (tabs[idx]) {
          const tabBtn = qs(`.tab-btn[data-tab="${tabs[idx]}"]`);
          if (tabBtn) tabBtn.click();
        }
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        state.combatSpeed = state.combatSpeed === 1 ? 2 : (state.combatSpeed === 2 ? 4 : 1);
        log(`⚡ 戰鬥速度：${state.combatSpeed}×`, 'system');
        updateAllUI();
      } else if (e.key === 's' || e.key === 'S') {
        if (e.ctrlKey || e.metaKey) e.preventDefault();
        save(true);
      }
    });

    qsa('.tab-btn').forEach(btn => {
      btn.onclick = () => {
        const tabName = btn.dataset.tab;
        const isBypass = typeof window !== 'undefined' && (window.__adminUnlockedAll || (typeof localStorage !== 'undefined' && localStorage.getItem('aden_admin_unlock_all') === 'true') || state?.adminUnlockedAll);
        if (!isBypass && btn.classList.contains('tab-locked-by-level')) {
          const reqLvl = TAB_UNLOCK_LEVELS[tabName] || 1;
          const globalCap = Number(window.globalServerCap) || Number(state?.serverCap) || Number(state?.serverMaxLevel) || 40;
          const msg = (state.level || 1) < reqLvl
            ? `🔒 此分頁需要等級 ${reqLvl} 才能解鎖。`
            : `🔒 此內容受目前季節限制（等級上限 ${globalCap}）。`;
          if (typeof showToast === 'function') showToast(msg, 'warning');
          else log(`❌ ${msg}`, 'system');
          return;
        }

        const isCurrentlyActive = btn.classList.contains('active');
        const isFullWindowActive = qs('.tabs-panel')?.classList.contains('full-window-active');

        if (isCurrentlyActive && isFullWindowActive && tabName !== 'zones') {
          openPanel('zones');
          return;
        }

        openPanel(tabName);
      };
    });

    function setMobileView(viewName) {
      const game = el('game');
      if (!game) return;

      const target = viewName || 'battle';
      state.mobileView = target;
      game.dataset.mobileView = state.mobileView;

      qsa('.mobile-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === state.mobileView);
      });

      // Update mobile title badges in top return bar
      const badgeTitle = TAB_NAMES_MAP[state.mobileView] || (state.mobileView === 'hero' ? '英雄' : '選單');
      qsa('.mobile-current-tab-badge, #mobile-tabs-current-badge').forEach(b => {
        b.textContent = badgeTitle;
      });

      if (state.mobileView === 'battle') {
        // Close any active blocking modals and overlays so screen is completely clear for combat
        qsa('.modal.active').forEach(m => m.classList.remove('active'));
        qsa('.modal-overlay').forEach(m => { if (m) m.style.display = 'none'; });

        // Scroll window to top smoothly so combat stage is in full view
        if (typeof window !== 'undefined' && window.scrollTo) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        updateCombatControlsUI();
      } else if (state.mobileView === 'hero') {
        updateStatsUI();
      } else {
        const desktopTabBtn = qs(`.tab-btn[data-tab="${state.mobileView}"]`);
        if (desktopTabBtn) {
          desktopTabBtn.click();
        } else {
          openPanel(state.mobileView);
        }
      }
    }
    window.setMobileView = setMobileView;

    const gameEl = el('game');
    if (gameEl && !gameEl.dataset.mobileView) {
      gameEl.dataset.mobileView = 'battle';
    }

    qsa('.mobile-nav-btn').forEach(btn => {
      btn.onclick = () => {
        const tabName = btn.dataset.tab || 'battle';
        setMobileView(tabName);
      };
    });

    qsa('.race-btn').forEach(btn => btn.onclick = () => setRace(btn.dataset.race));
    qsa('.class-btn').forEach(btn => btn.onclick = () => setClass(btn.dataset.class));
    qsa('.filter-btn').forEach(btn => { btn.onclick = () => { state.filter = btn.dataset.filter; qsa('.filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); updateInventoryUI(); }; });
    qsa('.rarity-filter-btn').forEach(btn => { btn.onclick = () => { state.rarityFilter = btn.dataset.rarity; qsa('.rarity-filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); updateInventoryUI(); }; });
    qsa('.grade-filter-btn').forEach(btn => { btn.onclick = () => { state.gradeFilter = btn.dataset.grade; window.currentGradeFilter = btn.dataset.grade; qsa('.grade-filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); updateInventoryUI(); }; });
    qsa('.equip-filter-btn').forEach(btn => { btn.onclick = () => { state.equipFilter = btn.dataset.equipfilter; qsa('.equip-filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); updateInventoryUI(); }; });
    
    qsa('.zone-subtab').forEach(btn => {
      btn.onclick = () => {
        qsa('.zone-subtab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.zonetab;
        qsa('.zone-view').forEach(v => v.classList.remove('active'));
        const view = el(`zone-${target}-view`);
        if (view) view.classList.add('active');
      };
    });

    qsa('.shop-subtab').forEach(btn => {
      btn.onclick = () => {
        qsa('.shop-subtab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.shopCategory = btn.dataset.shoptab;
        updateShopUI();
      };
    });

    const towerChallengeBtn = el('tower-challenge-btn');
    if (towerChallengeBtn) towerChallengeBtn.onclick = challengeTowerFloor;

    const towerSweepBtn = el('tower-sweep-btn');
    if (towerSweepBtn) towerSweepBtn.onclick = sweepTowerDaily;
    
    const autoRecycleBtn = el('open-auto-recycle-btn'); if (autoRecycleBtn) autoRecycleBtn.onclick = () => openAutoRecycleModal(state, { save, log, addToInventory });
    const selCommonsBtn = el('select-commons-btn'); if (selCommonsBtn) selCommonsBtn.onclick = () => selectItemsByFilter(i => (i.rarity || 'common') === 'common');
    const selUncommonsBtn = el('select-uncommons-btn'); if (selUncommonsBtn) selUncommonsBtn.onclick = () => selectItemsByFilter(i => i.rarity === 'uncommon');
    const selAllBtn = el('select-all-btn'); if (selAllBtn) selAllBtn.onclick = () => selectItemsByFilter(() => true);
    const clearSelBtn = el('clear-selection-btn'); if (clearSelBtn) clearSelBtn.onclick = clearItemSelection;
    const sellSelBtn = el('sell-selected-btn'); if (sellSelBtn) sellSelBtn.onclick = () => { if (typeof openBatchSellModal === 'function') openBatchSellModal(state, { updateAllUI, save, log }); else sellSelectedItems(); };
    const salvSelBtn = el('salvage-selected-btn'); if (salvSelBtn) salvSelBtn.onclick = () => { if (typeof openBatchSalvageModal === 'function') openBatchSalvageModal(state, { updateAllUI, save, log, addToInventory }); else salvageSelectedItems(); };
    const crystSelBtn = el('crystallize-selected-btn'); if (crystSelBtn) crystSelBtn.onclick = () => { if (typeof openBatchCrystallizeModal === 'function') openBatchCrystallizeModal(state, { updateAllUI, save, log, addToInventory }); else crystallizeSelectedItems(); };
    const combatToggleBtn = el('combat-toggle-btn'); if (combatToggleBtn) combatToggleBtn.onclick = toggleCombatState;
    const ssToggleBtn = el('soulshot-toggle-btn'); if (ssToggleBtn) ssToggleBtn.onclick = toggleSoulshot;
    const apToggleBtn = el('autopotion-toggle-btn'); if (apToggleBtn) apToggleBtn.onclick = toggleAutoPotion;
    const spdToggleBtn = el('speed-toggle-btn'); if (spdToggleBtn) spdToggleBtn.onclick = toggleCombatSpeed;
    const clearLogBtn = el('clear-log-btn'); if (clearLogBtn) clearLogBtn.onclick = clearLog;
    qsa('.log-filter-btn').forEach(btn => btn.onclick = () => setLogFilter(btn.dataset.logfilter));
    const logEl = el('log');
    if (logEl) {
      logEl.onscroll = () => {
        const isNearBottom = (logEl.scrollHeight - logEl.scrollTop - logEl.clientHeight) <= 60;
        const scrollBtn = el('log-scroll-down-btn');
        if (isNearBottom && scrollBtn) {
          scrollBtn.style.display = 'none';
        }
      };
    }
    const scrollDownBtn = el('log-scroll-down-btn');
    if (scrollDownBtn) scrollDownBtn.onclick = scrollLogToBottom;
    const offlineOkBtn = el('offline-ok'); if (offlineOkBtn) offlineOkBtn.onclick = closeOfflineModal;
    const offlineModal = el('offline-modal');
    if (offlineModal) {
      offlineModal.onclick = (e) => {
        if (e.target === offlineModal) closeOfflineModal();
      };
    }
    const resetSpBtn = el('reset-sp-btn'); if (resetSpBtn) resetSpBtn.onclick = resetSP;
    const autoEquipBtn = el('auto-equip-btn'); if (autoEquipBtn) autoEquipBtn.onclick = () => { if (typeof openAutoEquipPreviewModal === 'function') openAutoEquipPreviewModal(state, { updateAllUI, save, log }); else autoEquipBest(); };
    const organizeInvBtn = el('organize-inv-btn'); if (organizeInvBtn) organizeInvBtn.onclick = () => {
      const res = organizeInventory(state, state.inventorySortCriteria || 'recommended');
      log(`🧹 背包整理完成：已釋放 ${res.freedSlots} 個欄位！`, 'loot');
      updateAllUI();
      save();
    };
    const startBtn = el('start-btn'); if (startBtn) startBtn.onclick = startGame;
    const resetBtn = el('reset-btn'); if (resetBtn) resetBtn.onclick = resetSave;
    const resFree = el('res-free'); if (resFree) resFree.onclick = () => resurrect(false);
    const resScroll = el('res-scroll'); if (resScroll) resScroll.onclick = () => resurrect(true);
    const sagaOk = el('saga-ok'); if (sagaOk) sagaOk.onclick = () => { const modal = el('saga-modal'); if (modal) { modal.classList.remove('active'); modal.style.display = 'none'; } };
    const unequipBtn = el('unequip-all-btn'); if (unequipBtn) unequipBtn.onclick = unequipAll;
    qsa('.equip-slot').forEach(slot => { slot.onclick = () => { const s = slot.dataset.slot, uid = state.equipment[s]; if (uid) unequipItem(s); }; });
    const navCraftBtn = el('nav-craft-btn'); if (navCraftBtn) navCraftBtn.onclick = () => { const craftTab = qs('.tab-btn[data-tab="craft"]'); if (craftTab) craftTab.click(); };
    const topMarketBtn = el('top-market-btn'); if (topMarketBtn) topMarketBtn.onclick = () => openPanel('market');
    
    // Chat & Admin Console Handlers
    const chatForm = el('chat-form');
    if (chatForm) {
      chatForm.onsubmit = (e) => {
        e.preventDefault();
        const input = el('chat-input');
        if (input) {
          handleChatSubmit(input.value);
          input.value = '';
        }
      };
    }

    const adminTopBtn = el('admin-top-btn');
    if (adminTopBtn) {
      adminTopBtn.onclick = () => {
        if (isAuthorizedAdmin()) {
          openAdminModal();
        } else {
          adminTopBtn.style.display = 'none';
          log('⛔ 存取遭拒：管理員指令僅限授權管理員使用。', 'system');
        }
      };
      adminTopBtn.style.display = isAuthorizedAdmin() ? 'inline-flex' : 'none';
    }

    const closeAdminBtn = el('close-admin-modal-btn');
    if (closeAdminBtn) {
      closeAdminBtn.onclick = () => {
        const modal = el('admin-modal');
        if (modal) modal.classList.remove('active');
      };
    }

    const topReferralBtn = el('top-referral-btn');
    if (topReferralBtn) {
      topReferralBtn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        uiOpenReferralModal(state);
      };
    }

    const pillarContactsBtn = el('pillar-contacts-btn');
    if (pillarContactsBtn) {
      pillarContactsBtn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        uiOpenReferralModal(state);
      };
    }

    const closeReferralBtn = el('close-referral-modal-btn');
    if (closeReferralBtn) {
      closeReferralBtn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        closeContactsModal();
      };
    }

    // Modal background click to close
    qsa('.modal, .modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          if (modal.classList.contains('modal-overlay')) modal.style.display = 'none';
        }
      });
    });

    // ESC key closes active modals
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          qsa('.modal.active').forEach(m => m.classList.remove('active'));
          qsa('.modal-overlay').forEach(m => { if (m.style.display !== 'none') m.style.display = 'none'; });
        }
      });
    }

    // Admin Navigation Tabs
    qsa('.admin-tab-btn').forEach(btn => {
      btn.onclick = () => switchAdminTab(btn.dataset.adminTab);
    });

    // Admin Rate Presets (1-Click)
    qsa('[data-rate-preset]').forEach(btn => {
      btn.onclick = () => applyServerRatePreset(btn.dataset.ratePreset);
    });

    // Admin Rate Pill Buttons
    qsa('[data-rate-set]').forEach(btn => {
      btn.onclick = () => {
        const [key, val] = (btn.dataset.rateSet || '').split(':');
        if (key && val) setServerRate(key, parseFloat(val));
      };
    });

    // Admin Rate Apply Buttons (Custom inputs)
    qsa('[data-rate-apply]').forEach(btn => {
      btn.onclick = () => {
        const key = btn.dataset.rateApply;
        const inp = el(`admin-rate-inp-${key}`);
        if (inp && inp.value) {
          setServerRate(key, parseFloat(inp.value));
          inp.value = '';
        }
      };
    });

    const closeClassBtn = el('close-class-modal-btn');
    if (closeClassBtn) {
      closeClassBtn.onclick = () => {
        const modal = el('class-transfer-modal');
        if (modal) modal.classList.remove('active');
      };
    }

    qsa('[data-admin-cmd]').forEach(btn => {
      btn.onclick = () => executeAdminCmd(btn.dataset.adminCmd);
    });

    const adminWipeBtn = el('admin-wipe-database-btn');
    if (adminWipeBtn) {
      adminWipeBtn.onclick = async () => {
        const confirm1 = confirm(
          '🚨 嚴重警告：確定要執行伺服器完整清除嗎？\n\n' +
          '此操作將刪除 Cloud Firestore 中全部 17 個正式資料集合：\n' +
          '• 帳號、角色、英雄名稱\n' +
          '• 血盟與血盟成員\n' +
          '• 玩家對戰排行榜、奧林匹亞紀錄與市場\n' +
          '• 上線狀態、好友、好友邀請、導師與封鎖資料\n\n' +
          '所有玩家都會被登出，並從角色建立畫面重新開始。\n\n' +
          '如果你完全確定，請按「確定」。'
        );
        if (!confirm1) return;

        const confirm2 = prompt('若要確認刪除資料，請完整輸入「WIPE ZERO」：');
        if (confirm2 !== 'WIPE ZERO') {
          alert('操作已取消。輸入文字與「WIPE ZERO」不符。');
          return;
        }

        try {
          adminWipeBtn.disabled = true;
          adminWipeBtn.textContent = '⏳ 正在清除 Firestore 的 17 個資料集合...';

          const wipeFn = (typeof window !== 'undefined' && window.FirebaseBridge?.wipeEntireGameDatabase) || 
                         (typeof window !== 'undefined' && window.wipeEntireGameDatabase);
          if (typeof wipeFn !== 'function') {
            throw new Error('找不到 wipeEntireGameDatabase 函式，請確認 Firebase 模組已初始化。');
          }

          const result = await wipeFn();
          console.log('[Admin Wipe] Resultado da operação:', result);

          if (!result.success || (result.errors && result.errors.length > 0)) {
            let errorMsg = `❌ Firestore 因權限不足而阻擋刪除！\n\n`;
            errorMsg += `回傳錯誤（${result.errors.length}）：\n${result.errors.slice(0, 4).join('\n')}\n\n`;
            errorMsg += `⚠️ 原因：Firestore 規則（firestore.rules）尚未發布到 Firebase Console！\n\n`;
            errorMsg += `👉 解決方式：\n1. 開啟 Firebase Console。\n2. 前往「Rules／規則」分頁（位於「Data／資料」旁）。\n3. 貼上 firestore.rules 內容並點擊「Publish／發布」。`;
            alert(errorMsg);
            adminWipeBtn.disabled = false;
            adminWipeBtn.textContent = '🔥 完整清空資料庫（伺服器歸零）';
            return;
          }

          let msg = '✅ 資料庫完整清除成功！\n\n各資料集合刪除文件數：\n';
          let totalDeleted = 0;
          for (const [col, count] of Object.entries(result.deletedCounts || {})) {
            if (count > 0) {
              msg += `• ${col}：${count} 份文件\n`;
              totalDeleted += count;
            }
          }
          if (totalDeleted === 0) {
            msg += '•（資料集合中沒有殘留文件）\n';
          }

          alert(msg + '\n\n伺服器資料已歸零，應用程式將重新啟動並回到角色建立畫面。');

          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('aden_pending_char_creation', '1');
            localStorage.removeItem('aden_wipe_epoch');
          }
          if (typeof sessionStorage !== 'undefined') sessionStorage.clear();
          location.reload();
        } catch (err) {
          console.error('[Admin Wipe] Erro na execução:', err);
          alert(`❌ 執行完整清除失敗：${err.message || err}\n\n請確認目前已使用管理員帳號登入。`);
          adminWipeBtn.disabled = false;
          adminWipeBtn.textContent = '🔥 完整清空資料庫（伺服器歸零）';
        }
      };
    }

    const addXpBtn = el('admin-add-xp-btn');
    if (addXpBtn) {
      addXpBtn.onclick = () => {
        const inp = el('admin-xp-custom');
        if (inp && inp.value) {
          addAdminXP(inp.value);
          inp.value = '';
        }
      };
    }

    const addGoldBtn = el('admin-add-gold-btn');
    if (addGoldBtn) {
      addGoldBtn.onclick = () => {
        const inp = el('admin-gold-custom');
        if (inp && inp.value) {
          addAdminGold(inp.value);
          inp.value = '';
        }
      };
    }

    const addSpBtn = el('admin-add-sp-btn');
    if (addSpBtn) {
      addSpBtn.onclick = () => {
        const inp = el('admin-sp-custom');
        if (inp && inp.value) {
          addAdminSP(inp.value);
          inp.value = '';
        }
      };
    }

    const addAcBtn = el('admin-add-ac-btn');
    if (addAcBtn) {
      addAcBtn.onclick = () => {
        const inp = el('admin-ac-custom');
        if (inp && inp.value) {
          addAdminAC(inp.value);
          inp.value = '';
        }
      };
    }

    const applyCapBtn = el('admin-apply-cap-btn');
    if (applyCapBtn) {
      applyCapBtn.onclick = () => {
        const inp = el('admin-cap-custom');
        if (inp && inp.value) {
          setServerLevelCap(parseInt(inp.value));
          inp.value = '';
        }
      };
    }

    const itemSearchInput = el('admin-item-search');
    if (itemSearchInput) {
      itemSearchInput.oninput = (e) => {
        populateAdminItemSelect(e.target.value);
      };
    }

    const itemSearchClearBtn = el('admin-item-search-clear');
    if (itemSearchClearBtn) {
      itemSearchClearBtn.onclick = () => {
        if (itemSearchInput) {
          itemSearchInput.value = '';
          itemSearchInput.focus();
        }
        populateAdminItemSelect('');
      };
    }

    const spawnBtn = el('admin-spawn-btn');
    if (spawnBtn) {
      spawnBtn.onclick = () => {
        const itemSel = el('admin-item-select');
        const qtyInput = el('admin-item-qty');
        const raritySel = el('admin-item-rarity');
        const enchantSel = el('admin-item-enchant');
        const affixSel = el('admin-item-affix');
        const foundChk = el('admin-item-foundation');
        if (itemSel && itemSel.value) {
          const qty = parseInt(qtyInput?.value || 1) || 1;
          const isFoundation = !!(foundChk && foundChk.checked);
          spawnAdminItem(
            itemSel.value,
            qty,
            raritySel?.value || 'common',
            parseInt(enchantSel?.value || 0) || 0,
            affixSel?.value || 'roll',
            isFoundation
          );
        }
      };
    }

    // ─── EventBus System Subscribers ────────────────────────────────────
    EventBus.on('ui:update', () => updateAllUI());
    EventBus.on('log', (data) => log(data.msg || data, data.type || 'system'));
    EventBus.on('quest:trigger', (data) => triggerQuestEvent(data.type, data.count || 1));
    EventBus.off('state:updated');
    EventBus.on('state:updated', () => updateAllUI());
    // ───────────────────────────────────────────────────────────────────

    initPanelResizers();
  } catch (err) {
    console.error('Failed to bind UI events:', err);
  }
}


function initPanelResizers() {
  const grid = qs('.main-grid');
  if (!grid) return;

  const r1 = el('resizer-col-1');
  const r2 = el('resizer-col-2');
  const rh = el('resizer-row-stage');

  let isDragging = false;
  let activeResizer = null;
  let startX = 0, startY = 0;
  let startW1 = 210, startW3 = 680, startStageH = 340;

  if (r1) {
    r1.onmousedown = (e) => {
      e.preventDefault();
      isDragging = true;
      activeResizer = 'col1';
      startX = e.clientX;
      const statsPanel = qs('.stats-panel');
      startW1 = statsPanel ? statsPanel.getBoundingClientRect().width : 210;
      doc().body.style.cursor = 'col-resize';
    };
  }

  if (r2) {
    r2.onmousedown = (e) => {
      e.preventDefault();
      isDragging = true;
      activeResizer = 'col3';
      startX = e.clientX;
      const tabsPanel = qs('.tabs-panel');
      startW3 = tabsPanel ? tabsPanel.getBoundingClientRect().width : 680;
      doc().body.style.cursor = 'col-resize';
    };
  }

  if (rh) {
    rh.onmousedown = (e) => {
      e.preventDefault();
      isDragging = true;
      activeResizer = 'stage';
      startY = e.clientY;
      const stagePanel = el('stage');
      startStageH = stagePanel ? stagePanel.getBoundingClientRect().height : 340;
      doc().body.style.cursor = 'row-resize';
    };
  }

  const onMove = (e) => {
    if (!isDragging || !activeResizer) return;
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;

    if (activeResizer === 'col1') {
      const deltaX = clientX - startX;
      const newW = Math.max(160, Math.min(450, startW1 + deltaX));
      grid.style.setProperty('--col1-w', `${newW}px`);
    } else if (activeResizer === 'col3') {
      const deltaX = startX - clientX;
      const newW = Math.max(300, Math.min(850, startW3 + deltaX));
      grid.style.setProperty('--col3-w', `${newW}px`);
    } else if (activeResizer === 'stage') {
      const deltaY = clientY - startY;
      const stagePanel = el('stage');
      if (stagePanel) {
        const newH = Math.max(180, Math.min(750, startStageH + deltaY));
        stagePanel.style.height = `${newH}px`;
        stagePanel.style.flex = 'none';
      }
    }
  };

  const onEnd = () => {
    if (isDragging) {
      isDragging = false;
      activeResizer = null;
      doc().body.style.cursor = '';
    }
  };

  addTrackedListener(window, 'mousemove', onMove);
  addTrackedListener(window, 'mouseup', onEnd);
  addTrackedListener(window, 'touchmove', onMove);
  addTrackedListener(window, 'touchend', onEnd);
}

// --------------------------- ALCHEMY & SOUL CRUCIBLE ---------------------------
// A lógica modular de Alquimia, Cadinho e Chaos Boss está isolada em ./src/services/AlchemyService.js


function upgradeAstralNode(nodeId) {
  if (!state.prestigeLevel || state.prestigeLevel < 1) {
    log('🔒 星界精通需要先完成第一次轉生（等級 75+ 重生）！', 'warning');
    if (typeof window !== 'undefined' && window.floatText) {
      window.floatText('🔒 需要轉生！', 'float-meteor');
    }
    return false;
  }
  const node = ASTRAL_NODES[nodeId];
  if (!node) return false;

  if (!state.astralMastery) state.astralMastery = {};
  const currentLvl = state.astralMastery[nodeId] || 0;
  if (currentLvl >= node.max) {
    log(`⚠️ ${node.name} 已達最高等級（${node.max}）！`, 'warning');
    return false;
  }

  const shards = state.astralShards || 0;
  if (shards < node.cost) {
    log(`⚠️ 星界碎片不足！需要 ${node.cost} 個碎片。`, 'warning');
    return false;
  }

  state.astralShards -= node.cost;
  state.astralMastery[nodeId] = currentLvl + 1;

  log(`🌟 已解鎖 ${node.name}（等級 ${currentLvl + 1}/${node.max}）！`, 'rarity-legendary');
  updateAllUI();
  save();
  return true;
}

function reincarnateHero() {
  if ((state.level || 1) < 75) {
    log('⚠️ 古代轉生需要等級 75 以上！', 'warning');
    return false;
  }

  const lvlBonus = (state.level - 74) * 10;
  const timeHours = Math.floor((state.totalPlaytime || 0) / 3600000);
  const timeBonus = timeHours * 2;
  const goldBonus = Math.floor((state.gold || 0) / 2500000);
  const earnedShards = Math.max(10, lvlBonus + timeBonus + goldBonus);

  state.prestigeLevel = (state.prestigeLevel || 0) + 1;
  state.astralShards = (state.astralShards || 0) + earnedShards;

  state.level = 1;
  state.xp = 0;
  state.sp = 10;
  state.skills = {};
  state.zone = 'talkingIsland';
  state.gold = 1000;
  state.hp = state.maxHp || 100;
  state.mp = state.maxMp || 50;

  const titles = [
    '轉生冒險者',
    '星座大師',
    '轉生之主',
    '亞丁遠古之神'
  ];
  const title = titles[Math.min(state.prestigeLevel - 1, titles.length - 1)];

  log(`✨ 古代轉生完成！聲望等級 ${state.prestigeLevel}（${title}），獲得 +${earnedShards} 個星界碎片！`, 'rarity-legendary');
  floatText(`聲望等級 ${state.prestigeLevel}`, 'float-gold');

  updateAllUI();
  save();
  return true;
}

// --------------------------- EXPEDITIONS & MANOR SYSTEM ---------------------------
const MANOR_SEEDS = {
  dark_coda: { id: 'dark_coda', name: '黑暗柯達種子', level: 10, price: 100, reward1: 'stem', reward2: 'braided_hemp', ratio1: 5, ratio2: 2 },
  red_coda: { id: 'red_coda', name: '紅色柯達種子', level: 13, price: 200, reward1: 'varnish', reward2: 'cokes', ratio1: 5, ratio2: 2 },
  chilly_coda: { id: 'chilly_coda', name: '寒冷柯達種子', level: 16, price: 350, reward1: 'suede', reward2: 'oriharukon_ore', ratio1: 5, ratio2: 2 },
  blue_coda: { id: 'blue_coda', name: '藍色柯達種子', level: 19, price: 500, reward1: 'animal_skin', reward2: 'crafted_leather', ratio1: 5, ratio2: 2 },
  red_cobol: { id: 'red_cobol', name: '紅色柯博種子', level: 31, price: 1000, reward1: 'charcoal', reward2: 'enria', ratio1: 10, ratio2: 2 },
  chilly_cobol: { id: 'chilly_cobol', name: '寒冷柯博種子', level: 34, price: 1500, reward1: 'animal_bone', reward2: 'steel', ratio1: 10, ratio2: 3 },
  twin_codran: { id: 'twin_codran', name: '雙生柯德蘭種子', level: 58, price: 3000, reward1: 'charcoal', reward2: 'mold_lubricant', ratio1: 15, ratio2: 3 },
  king_coba: { id: 'king_coba', name: '王者柯巴種子', level: 85, price: 10000, reward1: 'metallic_thread', reward2: 'durable_metal_plate', ratio1: 20, ratio2: 5 }
};

const CASTLES_DEFS = {
  dion: { id: 'dion', name: '狄恩城堡', reqLevel: 30, taxPerHour: 5000, desc: '每小時 +5,000 金幣', enemyName: '狄恩守衛（等級 30）' },
  giran: { id: 'giran', name: '奇岩城堡', reqLevel: 50, taxPerHour: 15000, desc: '每小時 +15,000 金幣，商店折扣 5%', enemyName: '奇岩守衛（等級 50）' },
  goddard: { id: 'goddard', name: '高達特城堡', reqLevel: 70, taxPerHour: 35000, desc: '每小時 +35,000 金幣，並獲得 +5% 經驗值加成', enemyName: '高達特守衛（等級 70）' },
  aden: { id: 'aden', name: '亞丁帝國城堡', reqLevel: 85, taxPerHour: 75000, desc: '每小時 +75,000 金幣，總傷害 +10%', enemyName: '亞丁帝國守衛（等級 85）' }
};

const EXPEDITION_DESTINATIONS = {
  branded: { id: 'branded', name: '烙印地下墓穴', duration: 3600000, cost: 5000, minGold: 20000, maxGold: 30000, desc: '快速遠征（1 小時），可取得金幣與卷軸戰利品' },
  martyrs: { id: 'martyrs', name: '殉道者墓地', duration: 14400000, cost: 20000, minGold: 100000, maxGold: 150000, desc: '中型遠征（4 小時），可取得 C／B 級寶箱與材料' },
  dragon_valley: { id: 'dragon_valley', name: '深淵龍之谷', duration: 28800000, cost: 50000, minGold: 300000, maxGold: 400000, desc: '長程遠征（8 小時），可取得 A／S 級寶箱與星界碎片' },
  shilen_temple: { id: 'shilen_temple', name: '席琳女神神殿', duration: 43200000, cost: 100000, minGold: 800000, maxGold: 1200000, desc: '神話遠征（12 小時），可取得霜之領主寶箱與 25 個星界碎片' }
};

function buyManorSeed(seedId, qty = 1) {
  const seed = MANOR_SEEDS[seedId];
  if (!seed) return false;
  const count = Math.max(1, Math.floor(qty));
  const totalCost = seed.price * count;

  if ((state.gold || 0) < totalCost) {
    log(`⚠️ 金幣不足！需要 ${totalCost.toLocaleString()} 金幣。`, 'warning');
    return false;
  }

  state.gold -= totalCost;
  if (!state.manorSeeds) state.manorSeeds = {};
  state.manorSeeds[seedId] = (state.manorSeeds[seedId] || 0) + count;

  log(`🌾 已購買 ${count}× ${seed.name} 種子！`, 'loot');
  updateAllUI();
  save();
  return true;
}

function exchangeManorCrop(seedId, rewardOption = 1) {
  const seed = MANOR_SEEDS[seedId];
  if (!seed) return false;

  const ownedCrops = state.manorCrops ? (state.manorCrops[seedId] || 0) : 0;
  if (ownedCrops <= 0) {
    log(`⚠️ 你沒有可交付的 ${seed.name} 收成物！`, 'warning');
    return false;
  }

  const matKey = rewardOption === 2 ? seed.reward2 : seed.reward1;
  const ratio = rewardOption === 2 ? seed.ratio2 : seed.ratio1;
  const matAmount = Math.max(1, Math.floor(ownedCrops / ratio));

  if (matAmount < 1) {
    log(`⚠️ 採集數量不足！至少需要 ${ratio} 次採集才能兌換 1 份材料。`, 'warning');
    return false;
  }

  const cropsUsed = matAmount * ratio;
  state.manorCrops[seedId] -= cropsUsed;

  addToInventory(matKey, matAmount);
  log(`🌾 已向莊園管理員交付 ${cropsUsed}× 收成，獲得 +${matAmount}× ${D()?.ALL_ITEMS?.[matKey]?.name || '未知材料'}！`, 'rarity-legendary');

  updateAllUI();
  save();
  return true;
}

function conquerCastle(castleId) {
  const castle = CASTLES_DEFS[castleId];
  if (!castle) return false;

  if (!state.castles) state.castles = {};
  if (state.castles[castleId]?.conquered) {
    log(`⚠️ 你已控制 ${castle.name}！`, 'warning');
    return false;
  }

  const playerLvl = state.level || 1;
  if (playerLvl < castle.reqLevel) {
    log(`⚠️ 等級不足，無法挑戰 ${castle.name}！需要等級 ${castle.reqLevel}。`, 'warning');
    return false;
  }

  state.castles[castleId] = {
    conquered: true,
    lastTaxClaim: Date.now()
  };

  log(`🏰 已征服 ${castle.name.toUpperCase()}！加成已啟用：${castle.desc}。`, 'rarity-legendary');
  floatText(`已征服 ${castle.name}`, 'float-gold');

  updateAllUI();
  save();
  return true;
}

function claimCastleTaxes(castleId) {
  const castle = CASTLES_DEFS[castleId];
  if (!castle) return false;

  const data = state.castles ? state.castles[castleId] : null;
  if (!data || !data.conquered) {
    log(`⚠️ 你尚未控制 ${castle.name}！`, 'warning');
    return false;
  }

  const now = Date.now();
  const hoursPassed = (now - (data.lastTaxClaim || now)) / 3600000;
  if (hoursPassed < 1) {
    const minsLeft = Math.ceil((1 - hoursPassed) * 60);
    log(`⚠️ 還需要等待 ${minsLeft} 分鐘才能領取 ${castle.name} 的稅收。`, 'warning');
    return false;
  }

  const hoursToClaim = Math.min(24, Math.floor(hoursPassed));
  const adenaEarned = hoursToClaim * castle.taxPerHour;

  data.lastTaxClaim = now;
  state.gold = (state.gold || 0) + adenaEarned;

  log(`💰 已從 ${castle.name} 領取 ${adenaEarned.toLocaleString()} 金幣稅收（${hoursToClaim} 小時）！`, 'rarity-legendary');

  updateAllUI();
  save();
  return true;
}

function startExpedition(destId) {
  const dest = EXPEDITION_DESTINATIONS[destId];
  if (!dest) return false;

  if (!state.expeditions) state.expeditions = [];
  const activeExp = state.expeditions.find(e => e.destId === destId && !e.claimed);
  if (activeExp) {
    log(`⚠️ ${dest.name} 已有進行中的遠征！`, 'warning');
    return false;
  }

  if ((state.gold || 0) < dest.cost) {
    log(`⚠️ 金幣不足，無法準備遠征！需要 ${dest.cost.toLocaleString()} 金幣。`, 'warning');
    return false;
  }

  state.gold -= dest.cost;
  const now = Date.now();
  state.expeditions.push({
    id: 'exp_' + now + '_' + Math.floor(Math.random() * 1000),
    destId,
    startTime: now,
    duration: dest.duration,
    claimed: false
  });

  log(`🧭 傭兵小隊已派往 ${dest.name}！時間：${dest.duration / 3600000} 小時。`, 'loot');

  updateAllUI();
  save();
  return true;
}

function claimExpeditionReward(expId) {
  if (!state.expeditions) return false;
  const expIdx = state.expeditions.findIndex(e => e.id === expId);
  if (expIdx < 0) return false;

  const exp = state.expeditions[expIdx];
  const dest = EXPEDITION_DESTINATIONS[exp.destId];
  if (!dest) return false;

  const now = Date.now();
  if (now < exp.startTime + exp.duration) {
    log('⚠️ 這次遠征仍在進行中！', 'warning');
    return false;
  }

  const goldEarned = Math.floor(dest.minGold + Math.random() * (dest.maxGold - dest.minGold));
  state.gold = (state.gold || 0) + goldEarned;

  if (exp.destId === 'shilen_temple') {
    state.astralShards = (state.astralShards || 0) + 25;
    addToInventory('weapon_frost_lord_sword', 1, 'frostlord');
  } else if (exp.destId === 'dragon_valley') {
    state.astralShards = (state.astralShards || 0) + 10;
    addToInventory('jewel_tateossian_ring', 1, 'legendary');
  } else if (exp.destId === 'martyrs') {
    addToInventory('scroll_of_enchant_weapon', 2);
  } else {
    addToInventory('scroll_of_enchant_weapon', 3);
  }

  const seedKeys = Object.keys(MANOR_SEEDS);
  const randomSeed = seedKeys[Math.floor(Math.random() * seedKeys.length)];
  if (!state.manorCrops) state.manorCrops = {};
  state.manorCrops[randomSeed] = (state.manorCrops[randomSeed] || 0) + 10;

  state.expeditions.splice(expIdx, 1);

  log(`🎁 ${dest.name} 遠征完成！獲得 ${goldEarned.toLocaleString()} 金幣 與珍貴獎勵！`, 'rarity-legendary');

  updateAllUI();
  save();
  return true;
}

// --------------------------- FORGE EXPANSION: SOUL CRYSTALS, MASTERWORK & TATTOOS ---------------------------
function buySoulCrystal(color = 'red', stage = 1) {
  const prices = { 1: 15000, 2: 35000, 3: 80000, 4: 180000, 5: 450000 };
  const cost = prices[stage] || 15000;

  if ((state.gold || 0) < cost) {
    log(`⚠️ 金幣不足！需要 ${cost.toLocaleString()} 金幣。`, 'warning');
    return false;
  }

  state.gold -= cost;
  if (!state.soulCrystals) state.soulCrystals = {};
  const key = `${color}_stage${stage}`;
  state.soulCrystals[key] = (state.soulCrystals[key] || 0) + 1;

  log(`🔮 已購買 ${({ red: '紅色', green: '綠色', blue: '藍色' })[color] || '未知顏色'} 靈魂水晶（階段 ${stage}）！`, 'rarity-legendary');
  updateAllUI();
  save();
  return true;
}

function fuseSoulCrystals(color = 'red', stage = 1) {
  if (stage >= 13) return false;
  const key = `${color}_stage${stage}`;
  const owned = state.soulCrystals ? (state.soulCrystals[key] || 0) : 0;
  if (owned < 2) {
    log(`⚠️ 至少需要 2 個相同階段的靈魂水晶才能合成！`, 'warning');
    return false;
  }

  state.soulCrystals[key] -= 2;
  const nextKey = `${color}_stage${stage + 1}`;
  state.soulCrystals[nextKey] = (state.soulCrystals[nextKey] || 0) + 1;

  log(`✨ 合成成功！靈魂水晶已提升至階段 ${stage + 1}！`, 'rarity-legendary');
  updateAllUI();
  save();
  return true;
}

function socketSoulCrystalToWeapon(effect = 'focus', stage = 1) {
  const wpnUid = state.equipment?.weapon;
  if (!wpnUid) {
    log('⚠️ 請先裝備武器，再鑲嵌特殊能力靈魂水晶！', 'warning');
    return false;
  }

  if (!state.weaponSockets) state.weaponSockets = {};
  state.weaponSockets[wpnUid] = {
    effect,
    stage: Math.min(13, Math.max(1, stage))
  };

  log(`🔮 已將特殊能力靈魂水晶 [${({ focus: '專注', acumen: '靈敏', health: '生命', empower: '魔力增幅', guidance: '導引' })[effect] || '未知效果'} 階段 ${stage}] 鑲嵌到目前武器！`, 'rarity-legendary');
  floatText(`特殊能力 ${({ focus: '專注', acumen: '靈敏', health: '生命', empower: '魔力增幅', guidance: '導引' })[effect] || '未知效果'} 已啟用`, 'float-gold');

  updateAllUI();
  save();
  return true;
}

function upgradeItemToMasterwork(itemUid) {
  const item = state.inventory?.find(i => i.uid === itemUid);
  if (!item) return false;

  const itemDef = getItemDef(item.itemId);
  if (!itemDef) return false;

  const tier = itemDef.tier || 1;
  const costs = {
    3: { crystals: 1, adena: 500000, grade: 'b' },
    4: { crystals: 2, adena: 1000000, grade: 'a' },
    5: { crystals: 4, adena: 1500000, grade: 's' },
    6: { crystals: 5, adena: 2500000, grade: 's' }
  };

  const req = costs[tier] || costs[3];
  if ((state.gold || 0) < req.adena) {
    log(`⚠️ 金幣不足！普希金大師需要 ${req.adena.toLocaleString()} 金幣。`, 'warning');
    return false;
  }

  state.gold -= req.adena;
  item.isMasterwork = true;
  item.name = item.name ? ((item.name.includes('[Foundation MW]') || item.name.includes('[名匠]')) ? item.name.replace('[Foundation MW]', '[名匠]') : `${item.name} [名匠]`) : `${itemDef.name} [名匠]`;

  log(`✨ 鐵匠大師普希金打造了 ${item.name.toUpperCase()}（稀有名匠裝備）！`, 'rarity-legendary');
  floatText('稀有名匠裝備！', 'float-gold');

  updateAllUI();
  save();
  return true;
}

function applyTattoo(plusStat = 'str', minusStat = 'con', val = 4) {
  if (!state.tattoos) state.tattoos = [];
  if (state.tattoos.length >= 3) {
    log('⚠️ 你已達到最多 3 個刺青的上限！', 'warning');
    return false;
  }

  const cost = val * 50000;
  if ((state.gold || 0) < cost) {
    log(`⚠️ 金幣不足！套用刺青需要 ${cost.toLocaleString()} 金幣。`, 'warning');
    return false;
  }

  state.gold -= cost;
  state.tattoos.push({
    plusStat,
    minusStat,
    plusVal: val,
    minusVal: val
  });

  log(`🖋️ 刺青已套用：+${val} ${({ str: '力量', dex: '敏捷', con: '體質', int: '智力', wit: '智慧', men: '精神', atk: '物理攻擊', patk: '物理攻擊', def: '物理防禦', pdef: '物理防禦', matk: '魔法攻擊', mdef: '魔法防禦', hp: '生命值', maxHp: '最大生命值', mp: '魔力', maxMp: '最大魔力', eva: '迴避', crit: '暴擊', speed: '速度', spd: '速度', accuracy: '命中', hit: '命中', critDmg: '暴擊傷害', hpRegen: '生命恢復', mpRegen: '魔力恢復' })[plusStat] || '其他屬性'} / -${val} ${({ str: '力量', dex: '敏捷', con: '體質', int: '智力', wit: '智慧', men: '精神', atk: '物理攻擊', patk: '物理攻擊', def: '物理防禦', pdef: '物理防禦', matk: '魔法攻擊', mdef: '魔法防禦', hp: '生命值', maxHp: '最大生命值', mp: '魔力', maxMp: '最大魔力', eva: '迴避', crit: '暴擊', speed: '速度', spd: '速度', accuracy: '命中', hit: '命中', critDmg: '暴擊傷害', hpRegen: '生命恢復', mpRegen: '魔力恢復' })[minusStat] || '其他屬性'}！`, 'rarity-legendary');
  updateAllUI();
  save();
  return true;
}

function removeTattoo(index) {
  if (!state.tattoos || !state.tattoos[index]) return false;
  const removed = state.tattoos.splice(index, 1);
  log(`🖋️ 已移除刺青（+${removed[0]?.plusVal} ${({ str: '力量', dex: '敏捷', con: '體質', int: '智力', wit: '智慧', men: '精神', atk: '物理攻擊', patk: '物理攻擊', def: '物理防禦', pdef: '物理防禦', matk: '魔法攻擊', mdef: '魔法防禦', hp: '生命值', maxHp: '最大生命值', mp: '魔力', maxMp: '最大魔力', eva: '迴避', crit: '暴擊', speed: '速度', spd: '速度', accuracy: '命中', hit: '命中', critDmg: '暴擊傷害', hpRegen: '生命恢復', mpRegen: '魔力恢復' })[removed[0]?.plusStat] || removed[0]?.plusStat?.toUpperCase()}）。`, 'loot');
  updateAllUI();
  save();
  return true;
}

// --------------------------- BASIC MECHANICS: ATTRIBUTES, BELTS & LIFE STONES ---------------------------
function addSkillCharge() {
  state.charges = Math.min(8, (state.charges || 0) + 1);
  log(`⚡ 技能充能累積：**${state.charges}/8 級**（技能傷害 +${(state.charges - 1) * 20}%）！`, 'rarity-legendary');
  floatText(`充能等級 ${state.charges}！`, 'float-gold');
  updateAllUI(); save();
  return true;
}

function addKamaelSoul() {
  state.souls = Math.min(5, (state.souls || 0) + 1);
  log(`👻 已吸收卡麥爾靈魂：**${state.souls}/5**（技能傷害 +${state.souls * 5}%）！`, 'rarity-legendary');
  floatText(`已吸收靈魂（${state.souls}/5）！`, 'float-gold');
  updateAllUI(); save();
  return true;
}

function insertAttributeStone(itemUid, elemType = 'fire') {
  const item = state.inventory?.find(i => i.uid === itemUid);
  if (!item) {
    log('⚠️ 背包中找不到該物品！', 'warning');
    return false;
  }
  const cost = 250000;
  if ((state.gold || 0) < cost) {
    log(`⚠️ 金幣不足！元素鑲嵌需要 ${cost.toLocaleString()} 金幣。`, 'warning');
    return false;
  }

  state.gold -= cost;
  if (!item.elemental) item.elemental = { type: elemType, val: 0 };
  
  const isFirst = item.elemental.val === 0;
  const inc = isFirst ? 20 : 5;
  item.elemental.type = elemType;
  item.elemental.val = Math.min(300, item.elemental.val + inc);

  log(`🔥 元素鑲嵌成功！**${item.name || '物品'}** 獲得 +${inc} ${({ fire: '火', water: '水', wind: '風', earth: '地', holy: '神聖', dark: '黑暗' })[elemType] || '其他屬性'} 屬性（總值：${item.elemental.val}）！`, 'rarity-legendary');
  floatText(`屬性 ${({ fire: '火', water: '水', wind: '風', earth: '地', holy: '神聖', dark: '黑暗' })[elemType] || '其他屬性'} +${inc}！`, 'float-gold');
  updateAllUI(); save();
  return true;
}

function compoundBelts() {
  const cost = 500000;
  if ((state.gold || 0) < cost) {
    log(`⚠️ 金幣不足！腰帶合成需要 ${cost.toLocaleString()} 金幣。`, 'warning');
    return false;
  }

  state.gold -= cost;
  const roll = Math.random();
  if (roll <= 0.70) {
    addToInventory('blessed_top_belt', 1, 'legendary');
    log('✨ 腰帶合成成功！已打造祝福頂級腰帶 [S]（+7.2% 防禦／+6% 傷害）！', 'rarity-legendary');
    floatText('神聖腰帶鍛造完成！', 'float-gold');
  } else {
    log('⚠️ 腰帶合成失敗！請再試一次。', 'warning');
  }

  updateAllUI(); save();
  return true;
}

function augmentWithLifeStone(itemUid) {
  const item = state.inventory?.find(i => i.uid === itemUid);
  if (!item) return false;

  const cost = 750000;
  if ((state.gold || 0) < cost) {
    log(`⚠️ 金幣不足！精煉需要 ${cost.toLocaleString()} 金幣。`, 'warning');
    return false;
  }

  state.gold -= cost;
  const options = [
    { name: '力量（物理攻擊 +8%）', stat: 'patkMult', val: 0.08 },
    { name: '魔力強化（魔法攻擊 +15%）', stat: 'matkMult', val: 0.15 },
    { name: '盾牌（物理防禦 +10%）', stat: 'defMult', val: 0.10 },
    { name: '專注（+50 暴擊率）', stat: 'crit', val: 50 },
    { name: '次級天界護盾（無敵 7 秒）', stat: 'celestial', val: true }
  ];
  const chosen = options[Math.floor(Math.random() * options.length)];
  item.augmentation = chosen;

  log(`🔮 高級精煉完成！**${item.name || '物品'}** 獲得 **物品技能：${chosen.name}**！`, 'rarity-legendary');
  floatText(`精煉：${chosen.name}！`, 'float-gold');
  updateAllUI(); save();
  return true;
}

function executeCompoundAction(targetUid, ingredientUid) {
  if (!targetUid || !ingredientUid) {
    log('⚠️ 請選擇基底物品與材料物品後再進行合成！', 'warning');
    return false;
  }
  if (targetUid === ingredientUid) {
    log('⚠️ 材料物品不可與基底物品相同！', 'warning');
    return false;
  }

  const target = state.inventory?.find(i => i.uid === targetUid);
  const ingredient = state.inventory?.find(i => i.uid === ingredientUid);

  if (!target || !ingredient) {
    log('⚠️ 背包中找不到這些物品！', 'warning');
    return false;
  }

  if (target.itemId !== ingredient.itemId) {
    log('⚠️ 合成用的兩件物品必須是完全相同類型！', 'warning');
    return false;
  }

  const curLv = target.compoundLevel || 1;
  const cost = 100000 * Math.pow(2, Math.min(8, curLv - 1));

  if ((state.gold || 0) < cost) {
    log(`⚠️ 金幣不足！等級 ${curLv} 合成費用為 ${cost.toLocaleString()} 金幣。`, 'warning');
    return false;
  }

  state.gold -= cost;
  
  // Consume ingredient item
  const ingIdx = state.inventory.findIndex(i => i.uid === ingredientUid);
  if (ingIdx >= 0) {
    if (ingredient.count > 1) {
      ingredient.count -= 1;
    } else {
      state.inventory.splice(ingIdx, 1);
    }
  }

  const rates = [0.75, 0.65, 0.50, 0.40, 0.30, 0.25, 0.20, 0.15, 0.10];
  const rate = rates[Math.min(rates.length - 1, curLv - 1)] || 0.50;
  const roll = Math.random();

  if (roll <= rate) {
    const nextLv = curLv + 1;
    target.compoundLevel = nextLv;
    target.enchant = (target.enchant || 0) + 1;
    
    // Scale item stats by +15% per compound level
    target.statsMult = 1 + (nextLv - 1) * 0.15;
    
    log(`✨ 合成成功！**${target.name || '物品'}** 已提升至 **等級 ${nextLv}**！`, 'rarity-legendary');
    floatText(`合成成功！等級 ${nextLv}`, 'float-gold');
  } else {
    log(`💥 合成失敗！**${target.name || '物品'}** 維持在等級 ${curLv}，材料已消耗。`, 'warning');
    floatText('合成失敗！', 'float-dmg');
  }

  updateAllUI();
  save();
  return true;
}

function renderDailyRewardModal() {
  const status = getDailyRewardStatus(state);
  const grid = el('daily-rewards-grid');
  const streakEl = el('daily-streak-text');
  const statusBadge = el('daily-status-badge');
  const claimBtn = el('daily-claim-btn');
  const dotEl = el('daily-reward-dot');

  if (dotEl) {
    dotEl.style.display = status.canClaim ? 'block' : 'none';
  }

  if (streakEl) {
    streakEl.textContent = `${status.streak} ${status.streak === 1 ? '天連續簽到' : '天連續簽到'} 🔥`;
  }

  if (statusBadge) {
    if (status.canClaim) {
      statusBadge.style.background = 'rgba(34,197,94,0.2)';
      statusBadge.style.borderColor = 'rgba(34,197,94,0.5)';
      statusBadge.style.color = '#4ade80';
      statusBadge.textContent = `✨ 第 ${status.currentDay} 天獎勵可領取！`;
    } else {
      statusBadge.style.background = 'rgba(107,114,128,0.2)';
      statusBadge.style.borderColor = 'rgba(107,114,128,0.4)';
      statusBadge.style.color = '#9ca3af';
      statusBadge.textContent = '✓ 今日簽到已完成';
    }
  }

  if (claimBtn) {
    claimBtn.disabled = !status.canClaim;
    claimBtn.style.opacity = status.canClaim ? '1' : '0.5';
    claimBtn.style.cursor = status.canClaim ? 'pointer' : 'not-allowed';
    claimBtn.textContent = status.canClaim
      ? `✨ 領取第 ${status.currentDay} 天禮物`
      : `✓ 第 ${status.currentDay > 1 ? status.currentDay - 1 : 28} 天已領取（明天再來）`;
  }

  if (!grid) return;
  grid.innerHTML = '';

  DAILY_REWARDS_TABLE.forEach(item => {
    const isClaimed = (status.claimedDays || []).includes(item.day);
    const isCurrent = item.day === status.currentDay && status.canClaim;

    let borderColor = 'rgba(255,255,255,0.1)';
    let bg = 'rgba(0,0,0,0.3)';
    if (item.isMilestone) {
      borderColor = 'rgba(234,179,8,0.5)';
      bg = 'rgba(234,179,8,0.08)';
    }
    if (isCurrent) {
      borderColor = '#f59e0b';
      bg = 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(180,83,9,0.25))';
    } else if (isClaimed) {
      borderColor = 'rgba(34,197,94,0.4)';
      bg = 'rgba(34,197,94,0.1)';
    }

    const card = document.createElement('div');
    card.style.cssText = `
      border: 1px solid ${borderColor};
      background: ${bg};
      border-radius: 8px;
      padding: 8px 4px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      min-height: 95px;
      position: relative;
      transition: all 0.2s;
      ${isCurrent ? 'box-shadow: 0 0 12px rgba(245,158,11,0.4); transform: scale(1.03);' : ''}
    `;

    card.innerHTML = `
      <div style="font-size:10px; font-weight:bold; color:${isCurrent ? '#fef08a' : (isClaimed ? '#4ade80' : '#9ca3af')};">
        ${item.isMilestone ? '⭐ ' : ''}第 ${item.day} 天
      </div>
      <div style="font-size:22px; margin:4px 0;">${item.icon}</div>
      <div style="font-size:10px; font-weight:600; color:#f3f4f6; line-height:1.2; max-width:80px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${item.desc}">
        ${item.name}
      </div>
      <div style="font-size:9px; color:${isClaimed ? '#4ade80' : (isCurrent ? '#f59e0b' : '#6b7280')}; margin-top:2px; font-weight:bold;">
        ${isClaimed ? '✓ 已領取' : (isCurrent ? '🎁 領取' : '🔒')}
      </div>
    `;

    grid.appendChild(card);
  });
}

function openDailyRewardModal() {
  renderDailyRewardModal();
  const m = el('daily-reward-modal');
  if (m) m.classList.add('active');
}

function closeDailyRewardModal() {
  const m = el('daily-reward-modal');
  if (m) m.classList.remove('active');
}

function claimDailyRewardAction() {
  const res = claimDailyReward(state, {
    log,
    floatText,
    addToInventory: (itemId, count) => {
      serviceAddToInventory(state, itemId, count);
    }
  });

  if (res.success) {
    updateAllUI();
    save(true, true);
    renderDailyRewardModal();
  } else {
    log(`⚠️ ${res.message}`, 'system');
  }
}

export function init() {
  try {
    // Expose global action handlers to window for inline HTML handlers & global events
    window.openDailyRewardModal = openDailyRewardModal;
    window.closeDailyRewardModal = closeDailyRewardModal;
    window.claimDailyRewardAction = claimDailyRewardAction;
    window.renderDailyRewardModal = renderDailyRewardModal;
    window.scrollLogToBottom = scrollLogToBottom;
    window.clearLog = clearLog;
    window.registerCodexItem = registerCodexItem;
    window.buyItem = buyItem;
    window.depositAllToWarehouse = depositAllToWarehouse;
    window.depositSelectedToWarehouse = depositSelectedToWarehouse;
    window.depositMaterialsToWarehouse = depositMaterialsToWarehouse;
    window.withdrawAllFromWarehouse = withdrawAllFromWarehouse;
    window.withdrawSelectedFromWarehouse = withdrawSelectedFromWarehouse;
    window.selectDollForSynth = selectDollForSynth;
    window.synthesizeDolls = synthesizeDolls;
    window.craftSpecialRecipe = craftSpecialRecipe;
    window.useMagicLamp = useMagicLamp;
    window.refreshRandomCraftWheel = refreshRandomCraftWheel;
    window.spinRandomCraft = spinRandomCraft;
    window.selectZone = selectZone;
    window.startRaidBoss = startRaidBoss;
    window.toggleGodMode = () => {
      state.godMode = !state.godMode;
      log(`🛡️ [管理員] 無敵模式：${state.godMode ? '已啟用' : '已停用'}`, 'rarity-legendary');
      save();
      return state.godMode;
    };
    state = getState();
    try {
      Object.defineProperty(window, 'state', {
        get: () => getState(),
        set: (val) => { state = val; },
        configurable: true
      });
    } catch (e) {
      window.state = state;
    }
    EventBus.off('state:updated:window_sync');
    EventBus.on('state:updated', (newState) => {
      state = newState;
    });
    window.openAddSubclassModal = openAddSubclassModal;
    window.openCertificationModal = openCertificationModal;
    window.closeCertificationModal = closeCertificationModal;
    window.confirmLearnCertification = confirmLearnCertification;
    window.openResetCertificationsModal = openResetCertificationsModal;
    window.confirmResetCertifications = confirmResetCertifications;
    window.openDivineTransformationToggleModal = openDivineTransformationToggleModal;
    window.toggleDivineTransformation = toggleDivineTransformation;
    window.openAddSubclassModal = openAddSubclassModal;
    window.confirmAddSubclass = confirmAddSubclass;
    window.openCraftModal = (itemId) => uiOpenCraftModal(itemId, state, { craftItem, getItemDef, updateAllUI, save });
    window.closeCraftModal = uiCloseCraftModal;
    window.craftItem = craftItem;
    window.canCraft = canCraft;
    window.setGameMode = setGameMode;
    window.switchSubclass = switchSubclass;
    window.renderSubclassesUI = renderSubclassesUI;
    window.claimQuestReward = claimQuestReward;
    window.claimPassReward = claimPassReward;
    window.unlockPremiumPass = unlockPremiumPass;
    window.challengeTowerFloor = challengeTowerFloor;
    window.sweepTowerDaily = sweepTowerDaily;
    window.getTowerFloorDef = getTowerFloorDef;
    window.checkDailyReset = checkDailyReset;
    window.checkQuestProgress = checkQuestProgress;
    window.dissolveItem = (uid) => serviceDissolveItem(state, uid, { log, updateAllUI, save });
    window.dissolveItemsByFilter = (filterGrade) => serviceDissolveItemsByGrade(state, filterGrade, { log, updateAllUI, save });
    window.dissolveAllJunkAction = () => serviceDissolveAllJunkEquipment(state, { log, updateAllUI, save });
    window.craftElixir = (recipeId, qty) => serviceCraftElixir(state, recipeId, qty, { log, updateAllUI, save });
    window.useChaosBossSummonStoneAction = () => {
      const res = serviceUseChaosBossSummonStone(state, { log, updateAllUI, save, floatText, renderStageMonster, attackMonster });
      if (res) {
        if (typeof renderStageMonster === 'function') renderStageMonster();
        if (typeof updateMonsterHP === 'function') updateMonsterHP();
        if (typeof attackMonster === 'function') attackMonster();
      }
    };
    window.ALCHEMY_RECIPES = ALCHEMY_RECIPES;
    window.upgradeAstralNode = upgradeAstralNode;
    window.reincarnateHero = reincarnateHero;
    window.ASTRAL_NODES = ASTRAL_NODES;
    window.buyManorSeed = buyManorSeed;
    window.exchangeManorCrop = exchangeManorCrop;
    window.conquerCastle = conquerCastle;
    window.claimCastleTaxes = claimCastleTaxes;
    window.startExpedition = (destId) => (typeof window.startStrategicExpedition === 'function' ? window.startStrategicExpedition(destId) : ExpeditionService.startExpedition(state, destId, [], { log, updateAllUI, save, floatText }));
    window.claimExpeditionReward = (expId) => ExpeditionService.claimReward(state, expId, { log, updateAllUI, save, floatText });
    window.MANOR_SEEDS = MANOR_SEEDS;
    window.CASTLES_DEFS = CASTLES_DEFS;
    window.EXPEDITION_DESTINATIONS = CANONICAL_EXPEDITION_DESTINATIONS;
    window.selectFishingZone = (zId) => FishingService.selectZone(state, zId, { log, updateAllUI, save });
    window.selectFishingBait = (bId) => FishingService.selectBait(state, bId, { log, updateAllUI, save });
    window.buyFishingBait = (bId, qty) => FishingService.buyBait(state, bId, qty, { log, updateAllUI, save });
    window.buyFishingRod = (rId) => FishingService.buyRod(state, rId, { log, updateAllUI, save });
    window.equipFishingRod = (rId) => FishingService.equipRod(state, rId, { log, updateAllUI, save });
    window.repairFishingRod = (rId) => FishingService.repairRod(state, rId, { log, updateAllUI, save });
    window.castFishingLine = () => {
      const res = FishingService.castLine(state, { log, updateAllUI, save });
      if (res && res.success) {
        setTimeout(() => {
          updateAllUI();
        }, (res.castTime || 3000) * 0.5);
      }
    };
    window.reelInFishingLine = (timing) => FishingService.reelIn(state, timing, { log, updateAllUI, save, floatText });
    window.fishingAction = (actionType) => {
      if (actionType === 'reel') return FishingService.actionReel(state, { log, updateAllUI, save, floatText });
      if (actionType === 'yield') return FishingService.actionYield(state, { log, updateAllUI, save, floatText });
      if (actionType === 'force') return FishingService.actionForce(state, { log, updateAllUI, save, floatText });
      if (actionType === 'rest') return FishingService.actionRest(state, { log, updateAllUI, save, floatText });
    };
    window.toggleAutoFishing = () => FishingService.toggleAutoFish(state, { log, updateAllUI, save, floatText });
    window.exchangeFishForMaterials = (fId, qty) => FishingService.exchangeFish(state, fId, qty, { log, updateAllUI, save, floatText });
    window.FishingService = FishingService;
    window.selectHuntingZone = (zId) => HuntingService.selectZone(state, zId, { log, updateAllUI, save });
    window.selectHuntingLure = (lId) => HuntingService.selectLure(state, lId, { log, updateAllUI, save });
    window.buyHuntingLure = (lId, qty) => HuntingService.buyLure(state, lId, qty, { log, updateAllUI, save });
    window.buyHuntingKnife = (kId) => HuntingService.buyKnife(state, kId, { log, updateAllUI, save });
    window.equipHuntingKnife = (kId) => HuntingService.equipKnife(state, kId, { log, updateAllUI, save });
    window.repairHuntingKnife = (kId) => HuntingService.repairKnife(state, kId, { log, updateAllUI, save });
    window.selectHuntingTactic = (tId) => HuntingService.selectTactic(state, tId, { log, updateAllUI, save });
    window.startHuntingTrack = (tId) => HuntingService.startTracking(state, tId, { log, updateAllUI, save });
    window.skinHuntingPrey = () => HuntingService.finishSkinning(state, { log, updateAllUI, save, floatText });
    window.executeFieldButchering = (choice) => HuntingService.executeFieldButchering(state, choice, { log, updateAllUI, save, floatText });
    window.toggleAutoHunting = () => HuntingService.toggleAutoHunting(state, { log, updateAllUI, save, floatText });
    window.exchangeHuntingPelts = (pId, qty) => HuntingService.exchangePelts(state, pId, qty, { log, updateAllUI, save, floatText });
    window.HuntingService = HuntingService;

    window.selectGatheringZone = (zId) => GatheringService.selectZone(state, zId, { log, updateAllUI, save });
    window.selectGatheringPouch = (pId) => GatheringService.selectPouch(state, pId, { log, updateAllUI, save });
    window.buyGatheringPouch = (pId, qty) => GatheringService.buyPouch(state, pId, qty, { log, updateAllUI, save });
    window.buyGatheringSickle = (sId) => GatheringService.buySickle(state, sId, { log, updateAllUI, save });
    window.equipGatheringSickle = (sId) => GatheringService.equipSickle(state, sId, { log, updateAllUI, save });
    window.repairGatheringSickle = (sId) => GatheringService.repairSickle(state, sId, { log, updateAllUI, save });
    window.selectGatheringTactic = (tId) => GatheringService.selectTactic(state, tId, { log, updateAllUI, save });
    window.startGatheringHarvest = (nId) => (typeof GatheringService.startHarvest === 'function' ? GatheringService.startHarvest(state, nId, { log, updateAllUI, save }) : GatheringService.startGathering(state, nId, { log, updateAllUI, save }));
    window.finishGatheringHarvest = () => (typeof GatheringService.finishHarvest === 'function' ? GatheringService.finishHarvest(state, { log, updateAllUI, save, floatText }) : GatheringService.finishGathering(state, { log, updateAllUI, save, floatText }));
    window.inspectGatheringNode = () => GatheringService.inspectNode(state, { log, updateAllUI, save, floatText });
    window.skipGatheringNode = () => GatheringService.skipNode(state, { log, updateAllUI, save, floatText });
    window.toggleAutoGathering = () => GatheringService.toggleAutoGathering(state, { log, updateAllUI, save, floatText });
    window.exchangeGatheringHerbs = (hId, qty) => (typeof GatheringService.exchangeHerbs === 'function' ? GatheringService.exchangeHerbs(state, hId, qty, { log, updateAllUI, save, floatText }) : false);
    window.GatheringService = GatheringService;

    window.selectMiningZone = (zId) => MiningService.selectZone(state, zId, { log, updateAllUI, save });
    window.selectMiningLamp = (lId) => MiningService.selectLamp(state, lId, { log, updateAllUI, save });
    window.buyMiningLamp = (lId, qty) => MiningService.buyLamp(state, lId, qty, { log, updateAllUI, save });
    window.buyMiningPickaxe = (pId) => MiningService.buyPickaxe(state, pId, { log, updateAllUI, save });
    window.equipMiningPickaxe = (pId) => MiningService.equipPickaxe(state, pId, { log, updateAllUI, save });
    window.repairMiningPickaxe = (pId) => MiningService.repairPickaxe(state, pId, { log, updateAllUI, save });
    window.selectMiningTactic = (tId) => MiningService.selectTactic(state, tId, { log, updateAllUI, save });
    window.startMiningHarvest = (nId) => MiningService.startMining(state, nId, { log, updateAllUI, save });
    window.finishMiningHarvest = () => MiningService.finishMining(state, { log, updateAllUI, save, floatText });
    window.probeMiningVein = () => MiningService.probeVein(state, { log, updateAllUI, save });
    window.shoreUpMiningGallery = () => MiningService.shoreUpGallery(state, { log, updateAllUI, save });
    window.toggleAutoMining = () => MiningService.toggleAutoMining(state, { log, updateAllUI, save, floatText });
    window.exchangeMiningOres = (oId, qty) => MiningService.exchangeOres(state, oId, qty, { log, updateAllUI, save, floatText });
    window.MiningService = MiningService;
    window.recruitMercenary = (candidateUid) => MercenaryService.hireMercenary(state, candidateUid, { log, updateAllUI, save, floatText });
    window.hireMercenary = window.recruitMercenary;
    window.dismissMercenary = (mercUid) => MercenaryService.dismissMercenary(state, mercUid, { log, updateAllUI, save, floatText });
    window.refreshMercenaryTavern = (force = true) => MercenaryService.refreshTavern(state, force, { log, updateAllUI, save });
    window.refreshTavernContracts = window.refreshMercenaryTavern;
    window.toggleMercenaryInExpeditionSquad = (destId, mercUid) => {
      if (!window._expeditionSquadSelections) window._expeditionSquadSelections = {};
      if (!window._expeditionSquadSelections[destId]) window._expeditionSquadSelections[destId] = [];
      const squad = window._expeditionSquadSelections[destId];
      const idx = squad.indexOf(mercUid);
      if (idx >= 0) {
        squad.splice(idx, 1);
      } else {
        if (squad.length >= 3) {
          log('⚠️ 小隊已達最多 3 名傭兵的上限！', 'warning');
          return;
        }
        squad.push(mercUid);
      }
      updateAllUI();
    };
    window.startStrategicExpedition = (destId) => {
      const squad = (window._expeditionSquadSelections && window._expeditionSquadSelections[destId]) || [];
      const directive = (window._selectedExpeditionDirective && window._selectedExpeditionDirective[destId]) || 'balanced';
      const res = ExpeditionService.startExpedition(state, destId, squad, directive, { log, updateAllUI, save, floatText });
      if (res && window._expeditionSquadSelections) {
        delete window._expeditionSquadSelections[destId];
      }
      return res;
    };
    window.setExpeditionDirective = (destId, directive) => {
      if (!window._selectedExpeditionDirective) window._selectedExpeditionDirective = {};
      window._selectedExpeditionDirective[destId] = directive;
      updateAllUI();
    };
    window.resolveExpeditionDilemma = (destId, optionKey) => {
      ExpeditionService.resolveDilemma(state, destId, optionKey, { log, updateAllUI, save, floatText });
    };
    window.MercenaryService = MercenaryService;
    window.ExpeditionService = ExpeditionService;
    window.setForgeSubTab = (tabKey) => {
      window._forgeSubTab = tabKey;
      updateAllUI();
    };
    window.RefineryService = RefineryService;
    window.refineMaterial = (recipeId, times = 1) => RefineryService.refine(state, recipeId, times, window._callbacks);
    window.refineMaterialMax = (recipeId) => RefineryService.refineAll(state, recipeId, window._callbacks);
    window.setRefineryCategory = setRefineryCategory;
    window.updateAllUI = updateAllUI;
    window.buySoulCrystal = buySoulCrystal;
    window.fuseSoulCrystals = fuseSoulCrystals;
    window.socketSoulCrystalToWeapon = socketSoulCrystalToWeapon;
    window.upgradeItemToMasterwork = upgradeItemToMasterwork;
    window.applyTattoo = applyTattoo;
    window.removeTattoo = removeTattoo;
    window.addSkillCharge = addSkillCharge;
    window.addKamaelSoul = addKamaelSoul;
    window.insertAttributeStone = insertAttributeStone;
    window.chargeRandomCraftPoints = (pts = 25) => {
      serviceChargeRandomCraft(state, pts, { log, updateAllUI, save });
    };
    window.claimRandomCraftReward = (slotIdx = 0) => {
      serviceClaimRandomCraft(state, slotIdx, { log, updateAllUI, save });
    };
    window.showDropLocator = (matId) => {
      showDropLocatorModal(matId);
    };
    window.openAutoRecycleModal = () => openAutoRecycleModal(state, { save, log, addToInventory });
    window.closeAutoRecycleModal = closeAutoRecycleModal;
    window.openCompoundModal = openCompoundModal;
    window.closeCompoundModal = closeCompoundModal;
    window.renderCompoundModal = renderCompoundModal;
    window.openAutoEquipPreviewModal = () => openAutoEquipPreviewModal(state, { updateAllUI, save, log });
    window.openBatchSellModal = (uids) => openBatchSellModal(state, { updateAllUI, save, log }, uids);
    window.openBatchSalvageModal = (uids) => openBatchSalvageModal(state, { updateAllUI, save, log, addToInventory }, uids);
    window.openBatchCrystallizeModal = (uids) => openBatchCrystallizeModal(state, { updateAllUI, save, log, addToInventory }, uids);
    window.closeInventoryPreviewModal = closeInventoryPreviewModal;
    window.organizeInventory = (criteria) => organizeInventory(state, criteria);
    window.autoEquipBest = autoEquipBest;
    window._callbacks = {
      updateAllUI,
      save,
      log,
      floatText: typeof floatText === 'function' ? floatText : null,
      equipItem,
      unequipItem,
      useItem
    };

    // Symbol Maker (Dyes & Henna Tattoos)
    function openSymbolMakerModal() {
      const modal = el('symbol-maker-modal');
      if (!modal) return;
      renderSymbolMakerUI();
      modal.classList.add('active');
    }

    function closeSymbolMakerModal() {
      const modal = el('symbol-maker-modal');
      if (modal) modal.classList.remove('active');
    }

    function renderSymbolMakerUI() {
      const modal = el('symbol-maker-modal');
      if (!modal) return;

      const slotsContainer = el('symbol-slots-container');
      const summaryContainer = el('symbol-net-summary');
      const listContainer = el('symbol-hennas-list');

      const slots = DyeService.getDyeSlots(state);
      const net = DyeService.calculateNetDyeBonuses(state);

      // 1. Render Current Slots
      if (slotsContainer) {
        slotsContainer.innerHTML = '';
        slots.forEach((s) => {
          const card = mkEl('div');
          card.style.cssText = `
            background: ${s.unlocked ? (s.tattoo ? 'rgba(212,167,68,0.15)' : 'rgba(0,0,0,0.5)') : 'rgba(30,10,10,0.4)'};
            border: 1px solid ${s.unlocked ? (s.tattoo ? 'var(--border-gilt)' : 'rgba(255,255,255,0.15)') : '#7f1d1d'};
            border-radius: 8px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 8px;
          `;

          if (!s.unlocked) {
            card.innerHTML = `
              <div style="font-size:11px; font-weight:bold; color:#f87171;">🔒 ${s.name}</div>
              <div style="font-size:11px; color:#94a3b8;">等級 ${s.requiredLvl}+ 解鎖</div>
            `;
          } else if (s.tattoo) {
            card.innerHTML = `
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <span style="font-size:11px; font-weight:bold; color:#ffd877;">${s.name}</span>
                  <span style="font-size:14px;">${s.tattoo.icon || '✨'}</span>
                </div>
                <div style="font-weight:bold; font-size:13px; color:#86efac;">${s.tattoo.shortName || s.tattoo.name}</div>
                <div style="font-size:10px; color:#cbd5e1; margin-top:2px;">刻印日期：${new Date(s.tattoo.engravedAt || Date.now()).toLocaleDateString()}</div>
              </div>
              <button class="action-btn action-btn--danger" onclick="window.removeDyeAction(${s.index})" style="padding:4px 8px; font-size:11px; margin-top:6px;">
                🧹 移除（10k 金幣）
              </button>
            `;
          } else {
            card.innerHTML = `
              <div>
                <div style="font-size:11px; font-weight:bold; color:#60a5fa;">✨ ${s.name}</div>
                <div style="font-size:11px; color:#94a3b8; margin-top:4px;">可用空白欄位</div>
              </div>
              <div style="font-size:10px; color:#cbd5e1;">請從下方選擇染料進行刻印</div>
            `;
          }
          slotsContainer.appendChild(card);
        });
      }

      // 2. Render Net Summary Bar
      if (summaryContainer) {
        const statsList = [
          { key: 'str', label: '力量', color: '#f87171' },
          { key: 'dex', label: '敏捷', color: '#60a5fa' },
          { key: 'con', label: '體質', color: '#4ade80' },
          { key: 'int', label: '智力', color: '#c084fc' },
          { key: 'wit', label: '智慧', color: '#fde047' },
          { key: 'men', label: '精神', color: '#38bdf8' }
        ];
        summaryContainer.innerHTML = `
          <div style="font-weight:bold; color:#ffd877;">📊 目前生效的淨屬性加成（上限 +5）：</div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            ${statsList.map(st => {
              const val = net[st.key] || 0;
              const sign = val > 0 ? `+${val}` : `${val}`;
              return `<span style="font-weight:bold; color:${st.color};">${st.label}：${sign}</span>`;
            }).join(' · ')}
          </div>
        `;
      }

      // 3. Render Hennas List
      if (listContainer) {
        listContainer.innerHTML = '';
        const catalog = Object.values(DYES_CATALOG);
        catalog.forEach(dye => {
          const invItem = (state.inventory || []).find(i => i.itemId === dye.id);
          const count = invItem ? (invItem.count || 1) : 0;
          const hasReq = count >= (dye.requiredCount || 10);
          const canAfford = (state.gold || 0) >= (dye.fee || 50000);
          const nextEmptySlot = slots.findIndex(s => s.unlocked && !s.tattoo);

          const row = mkEl('div');
          row.style.cssText = `
            background: rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 6px;
            padding: 8px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
          `;

          row.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:16px;">${dye.icon}</span>
              <div>
                <div style="font-weight:bold; color:#ffd877; font-size:13px;">${dye.name}</div>
                <div style="font-size:11px; color:#cbd5e1;">${dye.desc}</div>
                <div style="font-size:10px; color:#94a3b8; margin-top:2px;">
                  持有：<strong style="color:${hasReq ? '#86efac' : '#f87171'};">${count}/10 染料</strong> · 費用：<strong>${(dye.fee || 50000).toLocaleString()} 金幣</strong>
                </div>
              </div>
            </div>
            <div>
              ${nextEmptySlot >= 0 ? `
                <button class="action-btn ${hasReq && canAfford ? 'action-btn--primary' : ''}" 
                        style="padding:6px 12px; font-size:11px; font-weight:bold;"
                        ${!hasReq || !canAfford ? 'disabled' : ''}
                        onclick="window.drawDyeAction(${nextEmptySlot}, '${dye.id}')">
                  ✍️ 刻印（欄位 ${nextEmptySlot + 1}）
                </button>
              ` : `
                <span style="font-size:10px; color:#94a3b8;">沒有可用欄位</span>
              `}
            </div>
          `;
          listContainer.appendChild(row);
        });
      }
    }

    window.openSymbolMakerModal = openSymbolMakerModal;
    window.closeSymbolMakerModal = closeSymbolMakerModal;
    window.renderSymbolMakerUI = renderSymbolMakerUI;
    window.drawDyeAction = (slotIdx, dyeId) => {
      const res = DyeService.drawDye(state, slotIdx, dyeId, { log, floatText, updateAllUI, save });
      if (res.success) {
        renderSymbolMakerUI();
      }
      return res;
    };
    window.removeDyeAction = (slotIdx) => {
      const res = DyeService.removeDye(state, slotIdx, { log, floatText, updateAllUI, save });
      if (res.success) {
        renderSymbolMakerUI();
      }
      return res;
    };

    const closeSymbolBtn = el('close-symbol-modal-btn');
    if (closeSymbolBtn) closeSymbolBtn.onclick = closeSymbolMakerModal;

    // ═══════════════════════════════════════════════════════════════════════
    // 🐾 PETS & COMPANIONS SYSTEM
    // ═══════════════════════════════════════════════════════════════════════
    function openPetModal() {
      const modal = el('pet-manager-modal');
      if (!modal) return;
      renderPetModalUI();
      modal.classList.add('active');
    }
    function closePetModal() {
      const modal = el('pet-manager-modal');
      if (modal) modal.classList.remove('active');
    }
    function renderPetModalUI() {
      const modal = el('pet-manager-modal');
      if (!modal) return;
      const pState = PetService.getPetState(state);
      const activePet = pState.activePetId ? pState.pets[pState.activePetId] : null;

      const activeContainer = el('pet-active-container');
      const listContainer = el('pet-list-container');

      if (activeContainer) {
        if (activePet) {
          const def = PET_CATALOG[activePet.id];
          const bonus = PetService.getActivePetBonus(state);
          const reqXp = activePet.level * activePet.level * 400;
          const xpPct = Math.min(100, Math.floor(((activePet.xp || 0) / reqXp) * 100));

          activeContainer.innerHTML = `
            <div style="background:rgba(212,167,68,0.15); border:1px solid var(--border-gilt); border-radius:8px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-size:36px;">${def?.icon || '🐾'}</span>
                <div>
                  <div style="font-family:'Cinzel',serif; font-weight:bold; color:#ffd877; font-size:16px;">${activePet.name}（等級 ${activePet.level}/60）</div>
                  <div style="font-size:11px; color:#86efac; margin-top:2px;">✨ 生效加成：${bonus?.desc || ''} (+${Math.round((bonus?.val || 0) * 100)}%)</div>
                  <div style="font-size:11px; color:#93c5fd; margin-top:2px;">⚔️ 支援攻擊：${bonus?.atk || 0} 物理傷害</div>
                  <div style="width:160px; height:6px; background:rgba(0,0,0,0.6); border-radius:3px; margin-top:6px; overflow:hidden;">
                    <div style="width:${xpPct}%; height:100%; background:#eab308;"></div>
                  </div>
                  <div style="font-size:9px; color:#94a3b8; margin-top:2px;">寵物經驗值：${activePet.xp || 0} / ${reqXp}（${xpPct}%）</div>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                <button class="action-btn action-btn--primary" onclick="window.feedPetAction()" style="padding:6px 12px; font-size:11px; font-weight:bold;">
                  🍖 餵食（5k 金幣）
                </button>
                <button class="action-btn" onclick="window.summonPetAction('${activePet.id}')" style="padding:6px 12px; font-size:11px;">
                  🛑 收回寵物
                </button>
              </div>
            </div>
          `;
        } else {
          activeContainer.innerHTML = `
            <div style="padding:16px; text-align:center; background:rgba(0,0,0,0.4); border:1px dashed rgba(212,167,68,0.3); border-radius:8px; color:#94a3b8; font-size:12px;">
              🐾 目前沒有召喚寵物。請從下方選擇一名夥伴召喚，與你並肩作戰！
            </div>
          `;
        }
      }

      if (listContainer) {
        listContainer.innerHTML = '';
        Object.values(PET_CATALOG).forEach(petDef => {
          const owned = !!pState.pets[petDef.id];
          const petData = owned ? pState.pets[petDef.id] : null;
          const isActive = pState.activePetId === petDef.id;
          const canUnlock = (state.level || 1) >= petDef.unlockLvl;
          const canAfford = (state.gold || 0) >= petDef.cost;

          const card = mkEl('div');
          card.style.cssText = `
            background: ${owned ? 'rgba(0,0,0,0.6)' : 'rgba(20,15,10,0.4)'};
            border: 1px solid ${isActive ? 'var(--border-gilt)' : 'rgba(255,255,255,0.1)'};
            border-radius: 8px;
            padding: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
          `;

          card.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:28px;">${petDef.icon}</span>
              <div>
                <div style="font-weight:bold; color:#ffd877; font-size:13px;">${petDef.name} ${owned ? `（等級 ${petData.level}）` : `（需要等級 ${petDef.unlockLvl}）`}</div>
                <div style="font-size:11px; color:#cbd5e1; margin-top:2px;">${petDef.desc}</div>
                <div style="font-size:10px; color:#60a5fa; margin-top:2px;">技能：<strong>${petDef.skillName}</strong> — ${petDef.skillDesc}</div>
              </div>
            </div>
            <div>
              ${owned ? `
                <button class="action-btn ${isActive ? '' : 'action-btn--primary'}" style="padding:6px 12px; font-size:11px; font-weight:bold;" onclick="window.summonPetAction('${petDef.id}')">
                  ${isActive ? '🛑 收回' : '⚔️ 召喚'}
                </button>
              ` : `
                <button class="action-btn ${canUnlock && canAfford ? 'action-btn--primary' : ''}" style="padding:6px 12px; font-size:11px; font-weight:bold;" ${!canUnlock || !canAfford ? 'disabled' : ''} onclick="window.adoptPetAction('${petDef.id}')">
                  🐾 領養（${petDef.cost.toLocaleString()} 金幣）
                </button>
              `}
            </div>
          `;
          listContainer.appendChild(card);
        });
      }
    }

    window.openPetModal = openPetModal;
    window.closePetModal = closePetModal;
    window.renderPetModalUI = renderPetModalUI;
    window.adoptPetAction = (petId) => {
      const res = PetService.adoptPet(state, petId, { log, floatText, updateAllUI, save });
      if (res.success) renderPetModalUI();
      return res;
    };
    window.summonPetAction = (petId) => {
      const res = PetService.summonPet(state, petId, { log, floatText, updateAllUI, save });
      if (res.success) renderPetModalUI();
      return res;
    };
    window.feedPetAction = () => {
      const res = PetService.feedPet(state, { log, floatText, updateAllUI, save });
      if (res.success) renderPetModalUI();
      return res;
    };
    const closePetBtn = el('close-pet-modal-btn');
    if (closePetBtn) closePetBtn.onclick = closePetModal;

    // ═══════════════════════════════════════════════════════════════════════
    // 🌀 SOLO INSTANCES SYSTEM (Kamaloka & Pailaka)
    // ═══════════════════════════════════════════════════════════════════════
    function openInstancesModal() {
      const modal = el('solo-instances-modal');
      if (!modal) return;
      renderInstancesModalUI();
      modal.classList.add('active');
    }
    function closeInstancesModal() {
      const modal = el('solo-instances-modal');
      if (modal) modal.classList.remove('active');
    }
    function renderInstancesModalUI() {
      const modal = el('solo-instances-modal');
      if (!modal) return;
      const listContainer = el('instances-list-container');
      if (!listContainer) return;

      const entries = InstanceService.getDailyEntries(state);
      listContainer.innerHTML = '';

      Object.values(SOLO_INSTANCES).forEach(inst => {
        const completed = !!entries.completed[inst.id];
        const pLvl = state.level || 1;
        const canEnter = pLvl >= inst.minLvl && !completed;

        const card = mkEl('div');
        card.style.cssText = `
          background: ${completed ? 'rgba(10,30,10,0.5)' : 'rgba(0,0,0,0.6)'};
          border: 1px solid ${completed ? '#22c55e' : (canEnter ? 'var(--border-gilt)' : 'rgba(255,255,255,0.1)')};
          border-radius: 8px;
          padding: 12px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        `;

        card.innerHTML = `
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:32px;">${inst.icon}</span>
            <div>
              <div style="font-family:'Cinzel',serif; font-weight:bold; color:#ffd877; font-size:14px;">
                ${inst.name}
                <span style="font-size:10px; padding:2px 6px; border-radius:4px; background:rgba(212,167,68,0.2); margin-left:6px; color:#fde047;">等級 ${inst.minLvl}+</span>
              </div>
              <div style="font-size:11px; color:#cbd5e1; margin-top:2px;">首領：<strong style="color:#f87171;">${inst.bossName}</strong> （生命值：${inst.bossHp.toLocaleString()} · 攻擊：${inst.bossAtk}）</div>
              <div style="font-size:10px; color:#6ee7b7; margin-top:2px;">🎁 獎勵：+${inst.rewards.xp.toLocaleString()} 經驗值 · +${inst.rewards.gold.toLocaleString()} 金幣 · +${inst.rewards.sp} 技能點 · ${inst.rewards.guaranteedRewardText}</div>
            </div>
          </div>
          <div>
            ${completed ? `
              <span style="font-size:11px; font-weight:bold; color:#86efac; background:rgba(34,197,94,0.2); padding:4px 8px; border-radius:4px;">✅ 今日已完成</span>
            ` : `
              <button class="action-btn ${canEnter ? 'action-btn--primary' : ''}" style="padding:8px 16px; font-size:12px; font-weight:bold; font-family:'Cinzel',serif;" ${!canEnter ? 'disabled' : ''} onclick="window.challengeInstanceAction('${inst.id}')">
                ⚔️ 進入
              </button>
            `}
          </div>
        `;
        listContainer.appendChild(card);
      });
    }

    window.openInstancesModal = openInstancesModal;
    window.closeInstancesModal = closeInstancesModal;
    window.renderInstancesModalUI = renderInstancesModalUI;
    window.challengeInstanceAction = (instanceId) => {
      const res = InstanceService.challengeInstance(state, instanceId, { log, floatText, renderStageMonster, updateAllUI });
      if (res.success) {
        closeInstancesModal();
      }
      return res;
    };
    const closeInstBtn = el('close-instances-modal-btn');
    if (closeInstBtn) closeInstBtn.onclick = closeInstancesModal;

    // ═══════════════════════════════════════════════════════════════════════
    // 🌾 MANOR & CROPS FARMING SYSTEM
    // ═══════════════════════════════════════════════════════════════════════
    function openManorModal() {
      const modal = el('manor-manager-modal');
      if (!modal) return;
      renderManorModalUI();
      modal.classList.add('active');
    }
    function closeManorModal() {
      const modal = el('manor-manager-modal');
      if (modal) modal.classList.remove('active');
    }
    function renderManorModalUI() {
      const modal = el('manor-manager-modal');
      if (!modal) return;
      const listContainer = el('manor-provinces-list');
      if (!listContainer) return;

      const mState = ManorService.getManorState(state);
      listContainer.innerHTML = '';

      Object.values(MANOR_PROVINCES).forEach(prov => {
        const seedCount = mState.seeds[prov.seed.id] || 0;
        const cropCount = mState.crops[prov.seed.cropId] || 0;
        const canExchange = cropCount >= prov.seed.exchangeRate;
        const isActive = mState.activeProvince === prov.id;

        const card = mkEl('div');
        card.style.cssText = `
          background: rgba(0,0,0,0.6);
          border: 1px solid ${isActive ? 'var(--border-gilt)' : 'rgba(255,255,255,0.1)'};
          border-radius: 8px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        `;

        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:24px;">${prov.icon}</span>
              <div>
                <div style="font-family:'Cinzel',serif; font-weight:bold; color:#ffd877; font-size:14px;">${prov.name}</div>
                <div style="font-size:11px; color:#94a3b8;">建議區域等級：${prov.minLvl}～${prov.maxLvl}</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:11px; color:#cbd5e1;">使用中的種子：<strong style="color:#fde047;">${seedCount}×</strong> · 收成：<strong style="color:#86efac;">${cropCount}×</strong></span>
            </div>
          </div>
          <div style="background:rgba(212,167,68,0.1); padding:8px 10px; border-radius:6px; font-size:11px; color:#cbd5e1; display:flex; justify-content:space-between; align-items:center;">
            <div>
              🌱 <strong>${prov.seed.name}</strong> （${prov.seed.cost} 金幣／個）<br>
              📦 城堡交換：<strong>${prov.seed.exchangeRate} 份收成 $\rightarrow$ 1 個 ${prov.seed.rewardItemName}</strong>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="action-btn" style="padding:6px 10px; font-size:11px;" onclick="window.buyManorSeedsAction('${prov.id}', 20)">
                🌱 購買 20 個（${(prov.seed.cost * 20).toLocaleString()} 金幣）
              </button>
              <button class="action-btn ${canExchange ? 'action-btn--primary' : ''}" style="padding:6px 10px; font-size:11px; font-weight:bold;" ${!canExchange ? 'disabled' : ''} onclick="window.exchangeManorCropsAction('${prov.id}')">
                📦 交付收成
              </button>
            </div>
          </div>
        `;
        listContainer.appendChild(card);
      });
    }

    window.openManorModal = openManorModal;
    window.closeManorModal = closeManorModal;
    window.renderManorModalUI = renderManorModalUI;
    window.buyManorSeedsAction = (provId, count = 20) => {
      const res = ManorService.buySeeds(state, provId, count, { log, updateAllUI, save });
      if (res.success) renderManorModalUI();
      return res;
    };
    window.exchangeManorCropsAction = (provId) => {
      const res = ManorService.exchangeCrops(state, provId, { log, floatText, updateAllUI, save });
      if (res.success) renderManorModalUI();
      return res;
    };
    const closeManorBtn = el('close-manor-modal-btn');
    if (closeManorBtn) closeManorBtn.onclick = closeManorModal;

    // Cash Shop Comercial
    window.openCashShopModal = openCashShopModal;
    window.closeCashShopModal = closeCashShopModal;
    window.renderCashShopModal = renderCashShopModal;
    window.executeCashShopBuy = (type, id) => {
      let success = false;
      if (type === 'starter_pack') {
        success = CashShopService.buyStarterPack(state, id, { log, onUpdate: () => { updateAllUI(); save(); } });
      } else if (type === 'cosmetic') {
        success = CashShopService.buyCostumeOrSkin(state, id, { log, onUpdate: () => { updateAllUI(); save(); } });
      } else if (type === 'title') {
        success = CashShopService.buyTitleOrEffect(state, id, { log, onUpdate: () => { updateAllUI(); save(); } });
      } else if (type === 'utility') {
        success = CashShopService.buyUtility(state, id, { log, onUpdate: () => { updateAllUI(); save(); } });
      }
      if (success) {
        const modal = document.getElementById('cash-shop-modal');
        if (modal) renderCashShopModal(modal);
      }
      return success;
    };
    window.openPixCheckoutModal = (tierId) => {
      uiOpenPixCheckoutModal(tierId, state);
    };
    window.openReferralModal = (tab) => {
      uiOpenReferralModal(state, tab);
    };
    window.openContactsModal = (tab) => {
      uiOpenReferralModal(state, tab);
    };
    window.closeContactsModal = () => {
      closeContactsModal();
    };
    window.closeReferralModal = () => {
      closeContactsModal();
    };
    window.submitReferralCodeAction = async () => {
      const input = document.getElementById('ref-friend-code-input');
      const rawCode = input ? input.value : '';
      const code = (rawCode || '').trim();

      if (!code) {
        log('⚠️ 請輸入推薦你的冒險者名稱。', 'warning');
        return;
      }
      if ((state.level || 1) > 20) {
        log('⚠️ 手動綁定推薦碼僅限等級 20 以前。', 'warning');
        return;
      }
      if (state.referredBy) {
        log(`⚠️ 你已經綁定推薦人 [${state.referredBy}]。`, 'warning');
        return;
      }
      const myName = (state.name || state.charName || '').trim().toLowerCase();
      if (code.toLowerCase() === myName) {
        log('⚠️ 你不能推薦自己！', 'warning');
        return;
      }

      // Validação Canônica (Gate 8): O herói indicador deve ser um jogador real existente
      let resolvedReferrerName = code;
      if (typeof window !== 'undefined' && window.FirebaseBridge?.getPlayerByName) {
        try {
          const referrerPlayer = await window.FirebaseBridge.getPlayerByName(code);
          if (!referrerPlayer) {
            log(`⚠️ 在亞丁找不到英雄 [${code}]，請確認名稱拼字。`, 'error');
            return;
          }
          resolvedReferrerName = referrerPlayer.name;
        } catch (e) {
          console.debug('Referral verification notice:', e);
        }
      }

      state.referredBy = resolvedReferrerName;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('aden_referred_by', resolvedReferrerName);
      }

      // Concede o Pacote de Novato se ainda não concedido
      if (!state.referralStarterGranted) {
        state.inventory = state.inventory || [];
        const shots = state.inventory.find(i => i.itemId === 'soulshot_ng' || i.itemId === 'spiritshot_ng' || (i.itemId && i.itemId.includes('shot')));
        if (shots) {
          shots.count = (shots.count || 0) + 1000;
        } else {
          state.inventory.push({
            uid: `ref_shots_${Date.now()}`,
            itemId: 'soulshot_ng',
            name: '魂彈：無級別',
            count: 1000,
            rarity: 'common',
            type: 'consumable'
          });
        }
        const pots = state.inventory.find(i => i.itemId === 'hp_potion_s' || i.itemId === 'hp_potion_m' || (i.itemId && i.itemId.includes('potion')));
        if (pots) {
          pots.count = (pots.count || 0) + 10;
        }
        state.referralStarterGranted = true;
      }

      if (typeof window !== 'undefined' && window.lineageIdleCloud?.recordReferral) {
        try {
          window.lineageIdleCloud.recordReferral(code, state.name || state.charName, state.level || 1);
        } catch (e) {
          console.debug('Error registering referral in cloud:', e);
        }
      }

      log(`✨ **推薦綁定成功！** 你已由 **${code}** 推薦！新手加成已啟用：**永久 +10% 經驗值**，並獲得 **1,000 發魂彈**！`, 'rarity-legendary');
      if (typeof floatText === 'function') floatText('✨ 推薦連結已啟用（經驗值 +10%）！', 'float-jackpot');
      updateAllUI();
      save();
      uiOpenReferralModal(state);
    };

    window.claimReferralRewardsAction = async () => {
      const myName = (state.name || state.charName || '').trim();
      if (!myName) return;

      const btn = document.getElementById('ref-check-rewards-btn');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ 正在伺服器上檢查...';
      }

      try {
        let result = { count: state.referralsCount || 0, claimableRewards: 0 };
        if (typeof window !== 'undefined' && window.lineageIdleCloud?.checkReferralRewards) {
          result = await window.lineageIdleCloud.checkReferralRewards(myName);
        }

        if (result.count > (state.referralsCount || 0)) {
          state.referralsCount = result.count;
        }

        if (result.claimableRewards > 0) {
          const totalAC = result.claimableRewards * 50;
          const totalScrolls = result.claimableRewards * 5;
          CashShopService.addAdenCoins(state, totalAC, { log });

          state.inventory = state.inventory || [];
          const bScroll = state.inventory.find(i => i.itemId === 'scroll_blessed_weapon');
          if (bScroll) {
            bScroll.count = (bScroll.count || 1) + totalScrolls;
          } else {
            state.inventory.push({
              uid: `ref_${Date.now()}`,
              itemId: 'scroll_blessed_weapon',
              name: '祝福的武器強化卷軸（通用）',
              count: totalScrolls,
              rarity: 'rare',
              type: 'consumable'
            });
          }

          state.referralRewardsClaimed = (state.referralRewardsClaimed || 0) + result.claimableRewards;
          log(`🎉 **推薦獎勵已領取！** 你推薦的朋友已達等級 40！獲得 **+${totalAC} 亞丁幣** 與 **${totalScrolls}× 祝福武器強化卷軸**！`, 'rarity-legendary');
          if (typeof floatText === 'function') floatText(`🎁 推薦獎勵 +${totalAC} 亞丁幣！`, 'float-jackpot');
          updateAllUI();
          save();
        } else {
          log('ℹ️ 目前沒有待領獎勵。當你推薦的朋友達到等級 40 後，可在這裡領取 50 亞丁幣與 5 張祝福強化卷軸！', 'info');
          if (typeof floatText === 'function') floatText('沒有待領獎勵', 'float-normal');
        }
      } catch (err) {
        console.error('Erro ao verificar recompensas de indicação:', err);
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '🔄 檢查並領取好友獎勵';
        }
        uiOpenReferralModal(state);
      }
    };
    window.executeDonationPix = (tierId) => {
      uiOpenPixCheckoutModal(tierId, state);
    };

    // Raids & Bosses Épicos
    window.startRaidBossAction = (raidId) => {
      const started = serviceStartRaidBoss(state, raidId, {
        log,
        el,
        renderStageMonster,
        attackMonster,
        onUpdate: () => { updateAllUI(); save(); }
      });
      if (started) {
        updateAllUI();
        save();
      }
    };

    // Grand Olympiad & Noblesse Saga
    window.startOlympiadMatchAction = async () => {
      const res = await OlympiadService.startOlympiadMatch(state, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.completeNoblesseStepAction = (step) => {
      const res = NoblesseService.completeStep(state, step, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.setCodexSubTab = (tab) => {
      window._codexSubTab = tab;
      updateCodexUI();
    };
    window.setCardRarityFilter = (filter) => {
      window._cardRarityFilter = filter;
      updateCodexUI();
    };
    window.claimDailyBonusChestAction = () => {
      return serviceClaimDailyBonusChest(state, { log, floatText, updateAllUI, save });
    };
    window.absorbCardAction = (cardId, absorbAll = false) => {
      let absorbedCount = 0;

      const absorbOne = () => {
        const invIdx = state.inventory.findIndex(i => i.itemId === cardId && !i.equipped);
        if (invIdx >= 0) {
          if ((state.inventory[invIdx].count || 1) > 1) {
            state.inventory[invIdx].count -= 1;
          } else {
            state.inventory.splice(invIdx, 1);
          }
          return true;
        }
        const whIdx = (state.warehouse || []).findIndex(i => i.itemId === cardId && !i.equipped);
        if (whIdx >= 0) {
          if ((state.warehouse[whIdx].count || 1) > 1) {
            state.warehouse[whIdx].count -= 1;
          } else {
            state.warehouse.splice(whIdx, 1);
          }
          return true;
        }
        return false;
      };

      if (!absorbAll) {
        if (absorbOne()) {
          CardCodexService.absorbCardIntoCodex(state, cardId, { log });
          absorbedCount = 1;
        } else {
          log('你沒有這張可吸收的卡片。', 'system');
          return;
        }
      } else {
        while (absorbOne()) {
          CardCodexService.absorbCardIntoCodex(state, cardId, {});
          absorbedCount++;
        }
        if (absorbedCount > 0) {
          const cardDef = MONSTER_CARDS[cardId];
          const cur = state.cardCodex?.[cardId] || {};
          log(`🃏 已將 **${absorbedCount} 張 ${cardDef?.name || '未知卡片'} 卡片**吸收到圖鑑！（階級 ${cur.rank}/5 · 總計：${cur.count}）`, 'gain');
        }
      }

      if (absorbedCount > 0) {
        triggerQuestEvent('codex', absorbedCount);
        updateAllUI();
        save();
      }
    };
    window.claimHeroStatusAction = (weaponId) => {
      const res = OlympiadService.claimHeroStatus(state, weaponId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.buyOlympiadItemAction = (itemId) => {
      const res = OlympiadService.buyShopItem(state, itemId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.teleportToQuestZone = (zoneId) => {
      if (zoneId) {
        selectZone(zoneId);
        openPanel('zones');
      }
    };

    // Guia do Aventureiro & Progressão do Jogo
    window.openCurrentTabGuide = (preferredTab) => {
      const modal = el('guide-modal');
      if (!modal) return;
      window.switchGuideTab(preferredTab || 'journey');
      modal.classList.add('active');
    };
    window.closeGuideModal = () => {
      const modal = el('guide-modal');
      if (modal) modal.classList.remove('active');
    };
    window.switchGuideTab = (tab) => {
      const contentEl = el('guide-content');
      if (!contentEl) return;

      const tabs = ['journey', 'forge', 'codex', 'combat', 'sevensigns'];
      tabs.forEach(t => {
        const btn = el(`guide-tab-btn-${t}`);
        if (btn) {
          const isActive = t === tab;
          btn.classList.toggle('active', isActive);
          btn.style.background = isActive ? 'linear-gradient(180deg,#d4a744,#8a641c)' : 'rgba(252,211,77,0.1)';
          btn.style.color = isActive ? '#000' : '#ffd877';
        }
      });

      if (tab === 'journey') {
        contentEl.innerHTML = `
          <div style="background:rgba(0,0,0,0.35); padding:12px; border-radius:8px; border:1px solid rgba(212,175,55,0.2); margin-bottom:10px;">
            <h4 style="color:#fbbf24; margin:0 0 6px 0;">🐣 等級 1～20 — 初次冒險（無級別）</h4>
            <p style="margin:0 0 4px 0;">• <strong>區域：</strong>說話之島、精靈森林、黑暗森林、半獸人村莊、矮人礦坑、卡麥爾巢穴、荒廢前哨、呼嘯荒原。</p>
            <p style="margin:0 0 4px 0;">• <strong>該怎麼做：</strong> 裝備你的職業新手套裝。技能需要正確武器才能使用（例如弓手使用弓、刺客使用匕首）。把多餘裝備送到鍛造系統拆解，以提升帳號鍛造等級。</p>
            <p style="margin:0; color:#34d399; font-weight:bold;">🏆 里程碑：等級 20 完成第一次轉職（解鎖 D 級與「戰爭序曲」史詩任務）。</p>
          </div>

          <div style="background:rgba(0,0,0,0.35); padding:12px; border-radius:8px; border:1px solid rgba(212,175,55,0.2); margin-bottom:10px;">
            <h4 style="color:#fbbf24; margin:0 0 6px 0;">🛡️ 等級 20～40 — D 級與首位團隊首領</h4>
            <p style="margin:0 0 4px 0;">• <strong>區域：</strong>奇岩郊區、歐肯遺跡、遺忘墓穴、黑色城塞。</p>
            <p style="margin:0 0 4px 0;">• <strong>團隊首領：</strong>挑戰<strong>蟻后 👑（等級 40）</strong>，有機會獲得<em>蟻后戒指</em>與<em>蟻后娃娃</em>（圖鑑）。</p>
            <p style="margin:0 0 4px 0;">• <strong>七封印：</strong>蒐集怪物掉落的紅／綠／藍封印石，為陣營每週勝利累積貢獻。</p>
            <p style="margin:0; color:#34d399; font-weight:bold;">🏆 里程碑：等級 40 完成第二次轉職（解鎖 C 級與「覺醒」史詩任務）。</p>
          </div>

          <div style="background:rgba(0,0,0,0.35); padding:12px; border-radius:8px; border:1px solid rgba(212,175,55,0.2); margin-bottom:10px;">
            <h4 style="color:#fbbf24; margin:0 0 6px 0;">⚔️ 等級 40～75 — C／B／A 級、鍛造門檻與貴族</h4>
            <p style="margin:0 0 4px 0;">• <strong>區域：</strong>古魯丁城堡、狼山、虛空裂隙、翡翠樹林、冥界之門、聖者之谷、悲鳴沼澤。</p>
            <p style="margin:0 0 4px 0;">• <strong>團隊首領：</strong>核心（等級 50）、歐爾芬（等級 55）、札肯（等級 60）。</p>
            <p style="margin:0 0 4px 0;">• <strong>鍛造等級 10：</strong>鍛造達到等級 10 後，將解鎖<strong>全球市場</strong>，可自由交易物品。</p>
            <p style="margin:0 0 4px 0;">• <strong>貴族任務（等級 75）：</strong>完成 4 個階段，前往聖者之谷與悲鳴沼澤，並擊敗<strong>團隊首領巴拉基爾</strong>，即可正式成為貴族！</p>
            <p style="margin:0; color:#34d399; font-weight:bold;">🏆 里程碑：等級 76 完成第三次轉職（解鎖遠古史詩任務與 S 級）。</p>
          </div>

          <div style="background:rgba(0,0,0,0.35); padding:12px; border-radius:8px; border:1px solid rgba(212,175,55,0.2);">
            <h4 style="color:#fbbf24; margin:0 0 6px 0;">👑 等級 76～95+ — 後期內容、巨龍與超越（重置）</h4>
            <p style="margin:0 0 4px 0;">• <strong>區域：</strong>亞丁城、龍之谷、帝國陵墓、安塔瑞斯巢穴、諸神熔爐。</p>
            <p style="margin:0 0 4px 0;">• <strong>史詩團隊首領：</strong>皇帝巴溫（等級 75）、弗林泰沙（等級 85）、安塔瑞斯（等級 95）、巴拉卡斯（等級 100）。</p>
            <p style="margin:0 0 4px 0;">• <strong>大奧林匹亞：</strong>貴族玩家每週末爭奪至高英雄稱號。</p>
            <p style="margin:0; color:#ffd700; font-weight:bold;">♾️ 重生／重置：達到等級 85 後可進行超越，重置回等級 1，並累積 +60 永久屬性點數！</p>
          </div>
        `;
      } else if (tab === 'forge') {
        contentEl.innerHTML = `
          <h4 style="color:#fbbf24; margin-top:0;">🔨 帳號鍛造等級與循環經濟</h4>
          <p>• <strong>如何提升鍛造等級：</strong>拆解背包中的多餘裝備或製作配方，都可獲得<strong>鍛造經驗值</strong>。</p>
          <p>• <strong>為什麼鍛造很重要：</strong>更高的鍛造等級會提高製作名匠裝備（普希金）的機率、降低成本，並解鎖 A 級、S 級與至尊級配方。</p>
          <p>• <strong>全球市場解鎖（等級 10）：</strong>為降低機器人濫用並鼓勵正常遊玩，帳號鍛造等級需達 10 才能使用全球市場。</p>
          <p>• <strong>大量物品消耗機制：</strong>後期可在隱藏鐵匠處犧牲舊武器，凝聚遠古能量並打造至尊遺物。</p>
        `;
      } else if (tab === 'codex') {
        contentEl.innerHTML = `
          <h4 style="color:#fbbf24; margin-top:0;">🃏 收藏圖鑑與怪物卡片</h4>
          <p>• <strong>物品收藏：</strong>登錄訓練武器與防具，可為整個帳號解鎖永久攻擊、防禦、生命值被動加成。</p>
          <p>• <strong>怪物卡與首領娃娃：</strong>擊敗團隊首領（蟻后、核心、歐爾芬、札肯、巴溫、安塔瑞斯、巴拉卡斯）時，有機會掉落對應稀有卡片。</p>
          <p>• <strong>吸收到圖鑑：</strong>將卡片吸收到圖鑑後，可為帳號永久增加屬性（物理攻擊、魔法攻擊、吸血等）。</p>
          <p>• <strong>裝備鑲嵌：</strong>也可將卡片鑲嵌到武器欄位，提高元素傷害與暴擊能力。</p>
        `;
      } else if (tab === 'combat') {
        contentEl.innerHTML = `
          <h4 style="color:#fbbf24; margin-top:0;">⚔️ 戰鬥限制、武器招式與 4★ 魔法書</h4>
          <p>• <strong>武器招式限制：</strong>物理技能需要裝備正確武器類型（例如射擊技能需要弓、劍舞技能需要雙劍等）。</p>
          <p>• <strong>元素弱點：</strong>怪物與首領具有火、水、風、地、神聖、黑暗等屬性。使用相剋屬性最高可獲得 +50% 額外傷害。</p>
          <p>• <strong>終極技能（4★）：</strong>首次學習 4★ 技能時，背包必須持有對應的<em>4★ 魔法書</em>。學會後魔法書會消耗，但技能可永久使用。</p>
          <p>• <strong>硬性傷害輸出檢定：</strong>團隊首領具有狂暴倒數。若隊伍無法在期限內造成足夠傷害，首領將進入致命狂暴狀態。</p>
        `;
      } else if (tab === 'sevensigns') {
        contentEl.innerHTML = `
          <h4 style="color:#fbbf24; margin-top:0;">🏛️ 七封印、馬門與貴族</h4>
          <p>• <strong>七封印每週循環：</strong>選擇<strong>黎明領主</strong>或<strong>黃昏革命軍</strong>陣營，繳交狩獵取得的封印石來累積勝利點數。</p>
          <p>• <strong>馬門鐵匠與商人：</strong>勝利陣營可使用馬門服務，包括解除封印、A／S 級武器交換，以及使用古代金幣進行不降低強化值的特殊服務。</p>
          <p>• <strong>貴族任務線（珍貴靈魂的擁有者）：</strong>達到等級 75 後，完成聖者之谷與悲鳴沼澤的 4 個階段，並擊敗團隊首領<strong>巴拉基爾</strong>，即可取得貴族資格。</p>
          <p>• <strong>大奧林匹亞：</strong>等級 76 以上貴族可參加 1 對 1 競技，爭奪無限武器與亞丁至高英雄披風！</p>
        `;
      }
    };
    window.closeOfflineModal = closeOfflineModal;

    // Clan & Castle Siege Actions
    window.setClanSubTab = (t) => {
      window._activeClanSubTab = t;
      updateClanUI();
    };
    window.upgradeClanAction = () => {
      const res = ClanService.upgradeClan(state, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.startCastleSiegeAction = (castleId) => {
      const res = ClanService.startSiege(state, castleId, {
        log,
        onUpdate: () => { window.setClanSubTab('siege'); updateAllUI(); save(); }
      });
      if (res.success) window.setClanSubTab('siege');
      updateAllUI();
      save();
      return res;
    };
    window.executeSiegeTurnAction = () => {
      const res = ClanService.executeSiegeTurn(state, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.claimCastleTaxesAction = (castleId) => {
      const res = ClanService.claimCastleTaxes(state, castleId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.buyCastleShopItemAction = (itemId) => {
      const res = ClanService.buyCastleShopItem(state, itemId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.createOrEditClanAction = (name, motto) => {
      const res = ClanService.createOrEditClan(state, name, motto, {
        log,
        floatText,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.donateToClanAction = (adenaAmt, spAmt) => {
      const res = ClanService.donateToClan(state, adenaAmt, spAmt, {
        log,
        floatText,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.activateClanHallBuffAction = (buffId) => {
      const res = ClanService.activateClanHallBuff(state, buffId, {
        log,
        floatText,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };

    // Skill Enchantment Actions
    window.openSkillEnchantModalAction = (skillId, skillName) => {
      openSkillEnchantModal(skillId, skillName, state);
    };
    window.enchantSkillAction = (skillId, skillName, route, isMastery) => {
      const res = SkillEnchantService.enchantSkill(state, skillId, skillName, route, isMastery, {
        log,
        onUpdate: () => {
          openSkillEnchantModal(skillId, skillName, state);
          updateAllUI();
          save();
        }
      });
      updateAllUI();
      save();
      return res;
    };

    // Weapon Augmentation Actions
    window.openAugmentModalAction = () => {
      openAugmentModal(state);
    };
    window.augmentWeaponAction = (lifeStoneId) => {
      const weapon = state.equipment?.weapon ? (state.inventory?.find(i => i.uid === state.equipment.weapon) || state.equipment.weapon) : null;
      const res = AugmentationService.augmentWeapon(state, weapon, lifeStoneId, {
        log,
        onUpdate: () => {
          openAugmentModal(state);
          updateAllUI();
          save();
        }
      });
      updateAllUI();
      save();
      return res;
    };
    window.removeAugmentAction = () => {
      const weapon = state.equipment?.weapon ? (state.inventory?.find(i => i.uid === state.equipment.weapon) || state.equipment.weapon) : null;
      const res = AugmentationService.removeAugmentation(state, weapon, {
        log,
        onUpdate: () => {
          openAugmentModal(state);
          updateAllUI();
          save();
        }
      });
      updateAllUI();
      save();
      return res;
    };

    // Seven Signs Window Actions
    window.setSevenSignsSubTab = (t) => {
      window._activeSevenSignsSubTab = t;
      updateSevenSignsUI();
    };
    window.joinFactionAction = (factionId) => {
      const res = SevenSignsService.joinFaction(state, factionId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.depositSealStonesAction = (stoneId, count) => {
      const res = SevenSignsService.depositStones(state, stoneId, count, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.startSevenSignsBossFightAction = (bossId) => {
      const res = SevenSignsService.startBossFight(state, bossId, {
        log,
        onUpdate: () => { window.setSevenSignsSubTab('bosses'); updateAllUI(); save(); }
      });
      if (res.success) window.setSevenSignsSubTab('bosses');
      updateAllUI();
      save();
      return res;
    };
    window.executeSevenSignsBossTurnAction = () => {
      const res = SevenSignsService.executeBossTurn(state, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.buyMammonItemAction = (itemId) => {
      const res = SevenSignsService.buyMammonItem(state, itemId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.unsealArmorAction = () => {
      const armor = state.equipment?.armor ? (state.inventory?.find(i => i.uid === state.equipment.armor) || state.equipment.armor) : null;
      const res = SevenSignsService.unsealArmor(state, armor, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };

    // Fortress Window Actions
    window.startFortressSiegeAction = (fortId) => {
      const res = FortressService.startFortressSiege(state, fortId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.executeFortressTurnAction = () => {
      const res = FortressService.executeSiegeTurn(state, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.buyBraceletAction = (braceletId) => {
      const res = FortressService.buyBracelet(state, braceletId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.equipTalismanAction = (talismanId) => {
      const res = FortressService.equipTalisman(state, talismanId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.unequipTalismanAction = (talismanId) => {
      const res = FortressService.unequipTalisman(state, talismanId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };

    // Colosseum Window Actions
    window.startColosseumDuelAction = (tierId) => {
      const res = ColosseumService.startDuel(state, tierId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.executeDuelTurnAction = () => {
      const res = ColosseumService.executeDuelTurn(state, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.startColosseumSurvivalAction = () => {
      const res = ColosseumService.startSurvival(state, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.executeSurvivalTurnAction = () => {
      const res = ColosseumService.executeSurvivalTurn(state, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };
    window.buyColosseumShopItemAction = (itemId) => {
      const res = ColosseumService.buyShopItem(state, itemId, {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      });
      updateAllUI();
      save();
      return res;
    };

    // Market Window Actions
    window.updateMarketUI = () => updateMarketUI();

    // Rankings Window Actions
    window.updateRankingsUI = () => updateRankingsUI();
    window.setRankingCategoryAction = (cat) => {
      window._activeRankingCat = cat;
      uiSetActiveRankingTab(cat);
      updateRankingsUI();
    };
    window.refreshRankingsAction = () => {
      uiSetActiveRankingTab(window._activeRankingCat || 'cp');
      updateRankingsUI();
      log('🏆 世界排行榜與戰鬥力資料已更新。', 'system');
    };
    window.challengeRankingPlayerAction = (charName, oppCP) => {
      openPanel('colosseum');
      const res = ColosseumService.startDuel(state, 'bet_500k', {
        log,
        onUpdate: () => { updateAllUI(); save(); }
      }, {
        charName,
        name: charName,
        className: '排行榜對手',
        statsSnapshot: {
          hp: Math.floor(oppCP * 0.08),
          pAtk: Math.floor(oppCP * 0.06),
          pDef: Math.floor(oppCP * 0.04)
        }
      });
      updateAllUI();
      save();
      return res;
    };
    
    
    window.openMacroSettingsModal = () => {
      const modal = el('macro-settings-modal');
      if (!modal) return;
      window.renderMacroSettingsModal();
      modal.classList.add('active');
    };

    window.closeMacroSettingsModal = () => {
      const modal = el('macro-settings-modal');
      if (modal) modal.classList.remove('active');
    };

    window.renderMacroSettingsModal = () => {
      const contentEl = el('macro-settings-content');
      if (!contentEl) return;

      state.autoPotionSettings = state.autoPotionSettings || {
        hpThreshold: 0.6,
        mpThreshold: 0.4,
        autoHp: true,
        autoMp: true
      };
      state.skillAutoCast = state.skillAutoCast || {};
      state.skillPriorityOrder = state.skillPriorityOrder || [];

      const ap = state.autoPotionSettings;
      const hpVal = Math.round((ap.hpThreshold || 0.6) * 100);
      const mpVal = Math.round((ap.mpThreshold || 0.4) * 100);

      const classSkillIds = getClassSkills(state.class) || [];
      const knownActiveSkills = [];
      for (const [sId, lvl] of Object.entries(state.skills || {})) {
        const def = SKILL_DEFS[sId];
        if (lvl > 0 && def && def.type !== 'passive' && def.type !== 'stat') {
          if (isSkillAllowedForClass(state.class, sId) && (Number(def.requiredLevel || def.reqLvl) || 1) <= state.level) {
            knownActiveSkills.push({ id: sId, lvl, def });
          }
        }
      }

      knownActiveSkills.sort((a, b) => {
        const pA = state.skillPriorityOrder.indexOf(a.id);
        const pB = state.skillPriorityOrder.indexOf(b.id);
        if (pA !== -1 && pB !== -1) return pA - pB;
        if (pA !== -1) return -1;
        if (pB !== -1) return 1;
        return (b.def.tier || 0) - (a.def.tier || 0);
      });

      contentEl.innerHTML = `
        <!-- Section 1: 自動藥水 Avançadas -->
        <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(212,167,68,0.3); border-radius:10px; padding:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="font-family:'Cinzel',serif; font-size:14px; font-weight:bold; color:#ffd877; display:flex; align-items:center; gap:8px;">
              <span>🧪 自動藥水觸發條件</span>
            </div>
            <button onclick="window.toggleCombatAutoPotionAction()" style="background:${state.autoPotionActive ? 'linear-gradient(180deg,#22c55e,#15803d)' : 'rgba(255,255,255,0.1)'}; border:1px solid ${state.autoPotionActive ? '#86efac' : 'rgba(255,255,255,0.2)'}; color:#fff; border-radius:6px; padding:4px 12px; font-size:12px; font-weight:bold; cursor:pointer;">
              ${state.autoPotionActive ? '🟢 已啟用' : '⚪ 已停用'}
            </button>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <!-- HP Trigger Card -->
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(239,68,68,0.3); border-radius:8px; padding:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-weight:bold; font-size:12px; color:#fca5a5;">
                  <input type="checkbox" ${ap.autoHp !== false ? 'checked' : ''} onchange="window.setMacroToggleHp(this.checked)" />
                  自動使用生命藥水
                </label>
                <span style="font-weight:bold; color:#ef4444; font-size:12px;">&lt; ${hpVal}%</span>
              </div>
              <input type="range" min="20" max="90" step="5" value="${hpVal}" oninput="window.setMacroHpThreshold(this.value)" style="width:100%; accent-color:#ef4444; cursor:pointer;" />
              <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-top:2px;">
                <span>20%（危急）</span>
                <span>50%</span>
                <span>90%（安全）</span>
              </div>
            </div>

            <!-- MP Trigger Card -->
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(59,130,246,0.3); border-radius:8px; padding:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-weight:bold; font-size:12px; color:#93c5fd;">
                  <input type="checkbox" ${ap.autoMp !== false ? 'checked' : ''} onchange="window.setMacroToggleMp(this.checked)" />
                  自動使用魔力藥水
                </label>
                <span style="font-weight:bold; color:#3b82f6; font-size:12px;">&lt; ${mpVal}%</span>
              </div>
              <input type="range" min="15" max="85" step="5" value="${mpVal}" oninput="window.setMacroMpThreshold(this.value)" style="width:100%; accent-color:#3b82f6; cursor:pointer;" />
              <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-top:2px;">
                <span>15%（低）</span>
                <span>40%</span>
                <span>85%（高）</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Fila de Prioridade & Rotação de Habilidades -->
        <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(212,167,68,0.3); border-radius:10px; padding:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div>
              <div style="font-family:'Cinzel',serif; font-size:14px; font-weight:bold; color:#ffd877;">
                ⚡ 技能循環與優先順序
              </div>
              <div style="font-size:11px; color:#94a3b8;">
                設定自動戰鬥的技能施放順序。只要冷卻時間結束，角色會優先嘗試使用列表前方的技能。
              </div>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:6px; max-height:260px; overflow-y:auto; padding-right:4px;">
            ${knownActiveSkills.length === 0 ? '<div style="color:#94a3b8; font-size:12px; text-align:center; padding:16px;">目前尚未學習任何主動技能。</div>' : knownActiveSkills.map((sk, idx) => {
              const isAuto = state.skillAutoCast[sk.id] !== false;
              const cdSec = Math.round((sk.def.baseCd || 5000) / 1000);
              const mpCost = sk.def.mpCost || 0;
              return `
                <div style="background:rgba(255,255,255,0.03); border:1px solid ${isAuto ? 'rgba(212,167,68,0.25)' : 'rgba(255,255,255,0.08)'}; border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; opacity:${isAuto ? 1 : 0.6};">
                  <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:12px; font-weight:bold; color:#ffd877; width:20px; text-align:center;">#${idx + 1}</span>
                    <div>
                      <div style="font-weight:bold; font-size:13px; color:#f8fafc; font-family:'Cinzel',serif;">${sk.def.name} <span style="font-size:11px; color:#86efac;">（等級 ${sk.lvl}）</span></div>
                      <div style="font-size:10px; color:#94a3b8;">冷卻：${cdSec} 秒 | 魔力：${mpCost} | 階級：${sk.def.tier || 1}</div>
                    </div>
                  </div>

                  <div style="display:flex; align-items:center; gap:8px;">
                    <label style="display:flex; align-items:center; gap:4px; font-size:11px; cursor:pointer; color:${isAuto ? '#86efac' : '#94a3b8'};">
                      <input type="checkbox" ${isAuto ? 'checked' : ''} onchange="window.toggleSkillAutoCastAction('${sk.id}')" />
                      自動使用
                    </label>
                    <div style="display:flex; gap:3px;">
                      <button ${idx === 0 ? 'disabled' : ''} onclick="window.moveSkillPriorityAction('${sk.id}', -1)" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#fff; border-radius:4px; padding:2px 6px; cursor:${idx === 0 ? 'default' : 'pointer'}; opacity:${idx === 0 ? 0.3 : 1};" title="提高優先順序">▲</button>
                      <button ${idx === knownActiveSkills.length - 1 ? 'disabled' : ''} onclick="window.moveSkillPriorityAction('${sk.id}', 1)" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#fff; border-radius:4px; padding:2px 6px; cursor:${idx === knownActiveSkills.length - 1 ? 'default' : 'pointer'}; opacity:${idx === knownActiveSkills.length - 1 ? 0.3 : 1};" title="降低優先順序">▼</button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Section 3: Filtro AFK & Auto-Recycle -->
        <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(212,167,68,0.3); border-radius:10px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-family:'Cinzel',serif; font-size:14px; font-weight:bold; color:#ffd877;">
              ♻️ 丟棄篩選與掛機自動回收
            </div>
            <div style="font-size:11px; color:#94a3b8;">
              目前狀態：<strong>${state.autoRecycle?.enabled ? '🟢 已啟用（' + (state.autoRecycle.mode === 'sell' ? '自動出售' : '分解成水晶') + '）' : '⚪ 已停用'}</strong>。支援無級別至 A 級，並會強制保護有強化值與稀有物品。
            </div>
          </div>
          <button onclick="window.openAutoRecycleModal()" style="background:linear-gradient(180deg,#d4a744,#8a641c); border:1px solid #ffe699; color:#000; font-family:'Cinzel',serif; font-weight:bold; font-size:12px; border-radius:6px; padding:8px 16px; cursor:pointer;">
            設定掛機篩選 ⚙️
          </button>
        </div>
      `;
    };

    window.setMacroHpThreshold = (val) => {
      state.autoPotionSettings = state.autoPotionSettings || {};
      state.autoPotionSettings.hpThreshold = parseFloat(val) / 100;
      updateCombatControlsUI();
      save();
    };

    window.setMacroMpThreshold = (val) => {
      state.autoPotionSettings = state.autoPotionSettings || {};
      state.autoPotionSettings.mpThreshold = parseFloat(val) / 100;
      updateCombatControlsUI();
      save();
    };

    window.setMacroToggleHp = (checked) => {
      state.autoPotionSettings = state.autoPotionSettings || {};
      state.autoPotionSettings.autoHp = !!checked;
      save();
    };

    window.setMacroToggleMp = (checked) => {
      state.autoPotionSettings = state.autoPotionSettings || {};
      state.autoPotionSettings.autoMp = !!checked;
      save();
    };

    window.toggleCombatAutoPotionAction = () => {
      toggleAutoPotion();
      window.renderMacroSettingsModal();
    };

    window.toggleSkillAutoCastAction = (skillId) => {
      state.skillAutoCast = state.skillAutoCast || {};
      state.skillAutoCast[skillId] = state.skillAutoCast[skillId] === false ? true : false;
      window.renderMacroSettingsModal();
      save();
    };

    window.moveSkillPriorityAction = (skillId, dir) => {
      state.skillPriorityOrder = state.skillPriorityOrder || [];
      const classSkillIds = getClassSkills(state.class) || [];
      const allActive = [];
      for (const [sId, lvl] of Object.entries(state.skills || {})) {
        const def = SKILL_DEFS[sId];
        if (lvl > 0 && def && def.type !== 'passive' && def.type !== 'stat') {
          if (isSkillAllowedForClass(state.class, sId) && (Number(def.requiredLevel || def.reqLvl) || 1) <= state.level) {
            allActive.push(sId);
          }
        }
      }
      const currentList = state.skillPriorityOrder.filter(id => allActive.includes(id));
      for (const id of allActive) {
        if (!currentList.includes(id)) currentList.push(id);
      }
      const idx = currentList.indexOf(skillId);
      if (idx === -1) return;
      const targetIdx = idx + dir;
      if (targetIdx >= 0 && targetIdx < currentList.length) {
        const temp = currentList[idx];
        currentList[idx] = currentList[targetIdx];
        currentList[targetIdx] = temp;
        state.skillPriorityOrder = currentList;
        window.renderMacroSettingsModal();
        save();
      }
    };

    window.openLiveOpsModal = () => {
      const modal = el('liveops-event-modal');
      if (!modal) return;
      const evt = LiveOpsService.getActiveEvent();
      const titleEl = el('liveops-modal-title');
      const subEl = el('liveops-modal-subtitle');
      const contentEl = el('liveops-modal-content');
      if (titleEl) titleEl.innerHTML = `${evt.icon} ${evt.title}`;
      if (subEl) subEl.textContent = evt.desc;
      if (contentEl) {
        contentEl.innerHTML = `
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(234,179,8,0.3); border-radius:8px; padding:14px; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-weight:bold; color:#fde047; font-size:14px;">活動狀態：</span>
              <span style="background:rgba(34,197,94,0.2); color:#4ade80; border:1px solid #22c55e; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:bold;">● 目前啟用</span>
            </div>
            <p style="margin:0 0 10px 0; font-size:12px; color:#cbd5e1;">${evt.desc}</p>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:8px;">
              <div style="background:rgba(0,0,0,0.5); padding:8px; border-radius:6px; text-align:center; border:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:11px; color:#94a3b8;">金幣加成</div>
                <div style="font-size:15px; font-weight:bold; color:#facc15;">+${Math.round((evt.modifiers.goldMult - 1) * 100)}%</div>
              </div>
              <div style="background:rgba(0,0,0,0.5); padding:8px; border-radius:6px; text-align:center; border:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:11px; color:#94a3b8;">經驗值加成</div>
                <div style="font-size:15px; font-weight:bold; color:#38bdf8;">+${Math.round((evt.modifiers.xpMult - 1) * 100)}%</div>
              </div>
              <div style="background:rgba(0,0,0,0.5); padding:8px; border-radius:6px; text-align:center; border:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:11px; color:#94a3b8;">技能點加成</div>
                <div style="font-size:15px; font-weight:bold; color:#c084fc;">+${Math.round((evt.modifiers.spMult - 1) * 100)}%</div>
              </div>
              <div style="background:rgba(0,0,0,0.5); padding:8px; border-radius:6px; text-align:center; border:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:11px; color:#94a3b8;">鍛造／合成</div>
                <div style="font-size:15px; font-weight:bold; color:#fb923c;">+${Math.round(evt.modifiers.enchantBonus * 100)}%</div>
              </div>
            </div>
          </div>
          <div style="font-size:11px; color:#94a3b8; text-align:center; font-style:italic;">
            即時活動會依王國行事曆自動更新。
          </div>
        `;
      }
      modal.classList.add('active');
    };

    window.closeLiveOpsModal = () => {
      const modal = el('liveops-event-modal');
      if (modal) modal.classList.remove('active');
    };

    window.renderStarterJourneyModal = () => {
      const status = StarterJourneyService.getJourneyStatus(state);
      const overviewEl = el('starter-journey-overview');
      const listEl = el('starter-journey-list');

      if (overviewEl) {
        const pct = Math.round((status.claimedCount / 7) * 100);
        overviewEl.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-weight:bold; color:#fef08a; font-size:14px; font-family:'Cinzel',serif;">7 個步驟進度：</span>
            <span style="font-weight:bold; color:#38bdf8; font-size:13px;">${status.claimedCount} / 7 已完成（${pct}%）</span>
          </div>
          <div style="width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
            <div style="width:${pct}%; height:100%; background:linear-gradient(90deg, #eab308, #22c55e); transition:width 0.3s;"></div>
          </div>
        `;
      }

      if (listEl) {
        listEl.innerHTML = status.steps.map(step => {
          const isDone = step.isCompleted;
          const isClaimed = step.isClaimed;
          const canClaim = step.canClaim;
          const pct = Math.min(100, Math.round((step.currentProgress / step.targetCount) * 100));

          let btnHtml = '';
          if (isClaimed) {
            btnHtml = `<button disabled style="background:rgba(255,255,255,0.05); color:#9ca3af; border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:6px 12px; font-size:12px; cursor:default;">✅ 已領取</button>`;
          } else if (canClaim) {
            btnHtml = `<button onclick="window.claimStarterJourneyStepAction('${step.id}')" style="background:linear-gradient(180deg, #22c55e, #16a34a); color:#fff; border:1px solid #4ade80; border-radius:6px; padding:6px 14px; font-size:12px; font-weight:bold; cursor:pointer; box-shadow:0 0 10px rgba(34,197,94,0.4);">🎁 領取</button>`;
          } else {
            btnHtml = `<button disabled style="background:rgba(0,0,0,0.4); color:#64748b; border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:6px 12px; font-size:12px; cursor:not-allowed;">進行中</button>`;
          }

          return `
            <div style="background:rgba(255,255,255,0.03); border:1px solid ${canClaim ? 'rgba(34,197,94,0.6)' : isClaimed ? 'rgba(255,255,255,0.1)' : 'rgba(212,167,68,0.2)'}; border-radius:8px; padding:12px; display:flex; justify-content:space-between; align-items:center; gap:12px; transition:border-color 0.2s;">
              <div style="display:flex; align-items:center; gap:12px; flex:1;">
                <div style="font-size:26px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.3); border-radius:8px; border:1px solid rgba(255,255,255,0.1);">${step.icon}</div>
                <div style="flex:1;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:11px; background:rgba(234,179,8,0.2); color:#fde047; padding:1px 6px; border-radius:4px; font-weight:bold;">步驟 ${step.stepNumber}</span>
                    <span style="font-weight:bold; color:#f8fafc; font-size:14px; font-family:'Cinzel',serif;">${step.title}</span>
                  </div>
                  <div style="font-size:12px; color:#94a3b8; margin:3px 0 6px 0;">${step.desc}</div>
                  <div style="display:flex; align-items:center; gap:10px;">
                    <div style="flex:1; max-width:180px; height:6px; background:rgba(0,0,0,0.5); border-radius:3px; overflow:hidden;">
                      <div style="width:${pct}%; height:100%; background:${isDone ? '#22c55e' : '#eab308'};"></div>
                    </div>
                    <span style="font-size:11px; color:#cbd5e1; font-weight:bold;">${step.currentProgress}/${step.targetCount}</span>
                    <span style="font-size:11px; color:#facc15; margin-left:auto;">🏆 ${step.rewardText}</span>
                  </div>
                </div>
              </div>
              <div>${btnHtml}</div>
            </div>
          `;
        }).join('');
      }
    };

    window.openStarterJourneyModal = () => {
      const modal = el('starter-journey-modal');
      if (!modal) return;
      window.renderStarterJourneyModal();
      modal.classList.add('active');
    };

    window.closeStarterJourneyModal = () => {
      const modal = el('starter-journey-modal');
      if (modal) modal.classList.remove('active');
    };

    window.claimStarterJourneyStepAction = (stepId) => {
      const res = StarterJourneyService.claimStepReward(state, stepId, {
        log,
        floatText,
        onUpdate: () => {
          updateAllUI();
          save();
        }
      });
      if (res.success) {
        window.renderStarterJourneyModal();
        updateLiveOpsUI();
      }
      return res;
    };

    window.claimRankingRewardAction = () => {
      const res = RankingService.claimRankingReward(state, {
        log,
        floatText,
        onUpdate: () => { updateRankingsUI(); updateAllUI(); save(); }
      });
      updateRankingsUI();
      updateAllUI();
      return res;
    };

    window.GameData = {
      ...(window.GameData || {}),
      ALL_ITEMS: window.GameData?.ALL_ITEMS || ALL_ITEMS,
      RARITY: window.GameData?.RARITY || RARITY,
      rollDrop: (window.GameData && typeof window.GameData.rollDrop === 'function') ? window.GameData.rollDrop : rollDrop,
      rollRarity: (window.GameData && typeof window.GameData.rollRarity === 'function') ? window.GameData.rollRarity : rollRarity,
      MERCENARY_RARITIES,
      MERCENARY_SPECIALIZATIONS,
      MERCENARY_TRAITS,
      EXPEDITION_DILEMMAS,
      RISK_DIRECTIVES
    };
    window.MERCENARY_RARITIES = MERCENARY_RARITIES;
    window.MERCENARY_SPECIALIZATIONS = MERCENARY_SPECIALIZATIONS;
    window.MERCENARY_TRAITS = MERCENARY_TRAITS;
    window.EXPEDITION_DILEMMAS = EXPEDITION_DILEMMAS;
    window.RISK_DIRECTIVES = RISK_DIRECTIVES;

    window.getGameState = () => {
      const data = { 
        ...state, 
        totalPlaytime: state.totalPlaytime + (Date.now() - (state.startTime || Date.now())), 
        lastSaveTime: Date.now(),
        selectedUids: Array.from(getSelectedSet())
      };
      delete data.startTime;
      delete data.activeMonster;
      delete data._cds;
      delete data._regenAcc;
      delete data._mpRegenAcc;
      return JSON.parse(JSON.stringify(data));
    };
    window.getRawState = () => state;

    window.saveGameState = (immediate = true, forceCloud = true) => {
      save(immediate, forceCloud);
      return true;
    };
    window.saveState = save;
    window.equipItem = equipItem;
    window.unequipItem = unequipItem;
    window.sellItem = sellItem;
    window.promoteClass = promoteClass;
    window.switchSubclass = switchSubclass;
    window.attackMonster = attackMonster;
    window.spendSP = spendSP;

    window.loadGameState = (cloudData) => {
      if (!cloudData || typeof cloudData !== 'object') return;
      const def = DEFAULT_STATE();
      const allItems = (typeof window !== 'undefined' && window.GameData) ? window.GameData.ALL_ITEMS : (D() ? D().ALL_ITEMS : null);
      const hasItemsDict = allItems && Object.keys(allItems).length > 0;
      const safeInventory = Array.isArray(cloudData.inventory)
        ? cloudData.inventory.filter(item => item && item.itemId && (!hasItemsDict || allItems[item.itemId]))
        : [];
      
      state = { ...def, ...cloudData };
      state.gender = cloudData.gender || cloudData.charGender || cloudData.sex || def.gender || 'M';
      state.charName = cloudData.charName || cloudData.heroName || cloudData.playerName || cloudData.name || def.charName || 'Tristan';
      state.heroName = state.charName;
      state.playerName = state.charName;
      state.name = state.charName;
      if (state.hp <= 0) {
        state.hp = state.maxHp || 100;
      }
      const rawPriv = Number(cloudData.privilegeLevel) || (cloudData.role === 'admin' ? 1 : 0) || 0;
      state.privilegeLevel = isAuthorizedAdmin() ? rawPriv : 0;
      if (!isAuthorizedAdmin() && state.role === 'admin') {
        state.role = 'player';
      }
      if (typeof window !== 'undefined') {
        window.currentUserPrivilege = state.privilegeLevel;
      }
      managerSetState({ privilegeLevel: state.privilegeLevel });
      state.skills = { ...def.skills, ...(cloudData.skills || {}) };
      const _sk = getStarterSkillForClass(state.class);
      if (_sk) { state.skills[_sk] = Math.max(1, state.skills[_sk] || 0); if (!state.selectedSkill) state.selectedSkill = _sk; }
      state.equipment = { ...def.equipment, ...(cloudData.equipment || {}) };
      state.base = { ...def.base, ...(cloudData.base || {}) };
      state.inventory = safeInventory;
      state.selectedUids = new Set(Array.isArray(cloudData.selectedUids) ? cloudData.selectedUids : []);
      
      state.codex = cloudData.codex && typeof cloudData.codex === 'object' ? cloudData.codex : {};
      state.dolls = Array.isArray(cloudData.dolls) ? cloudData.dolls : [];
      state.subclasses = Array.isArray(cloudData.subclasses) ? cloudData.subclasses : [];
      state.activeSubclassIndex = cloudData.activeSubclassIndex !== undefined ? cloudData.activeSubclassIndex : null;
      state.tower = cloudData.tower && typeof cloudData.tower === 'object' ? cloudData.tower : { highestFloor: 0, currentFloor: 1 };
      state.quests = cloudData.quests && typeof cloudData.quests === 'object' ? cloudData.quests : {};
      state.battlePass = cloudData.battlePass && typeof cloudData.battlePass === 'object' ? cloudData.battlePass : {};
      
      if (state.level && state.level > 1) {
        const minXp = getTotalXP(state.level - 1);
        if (state.xp == null || state.xp < minXp) {
          state.xp = minXp;
        }
      }

      // Normalização defensiva de habilidades contra corrupções ou vazamento legado
      normalizeAndValidateSkills(state, { log });

      // Preservar autoridade absoluta das configurações administrativas locais
      const savedAdminSeason = (typeof localStorage !== 'undefined' && Number(localStorage.getItem('aden_server_season'))) || Number(cloudData.serverSeason) || Number(state.serverSeason) || 1;
      state.serverSeason = savedAdminSeason;
      window.__serverSeason = savedAdminSeason;

      const savedAdminCap = (typeof localStorage !== 'undefined' && Number(localStorage.getItem('aden_server_cap'))) || Number(cloudData.serverMaxLevel) || Number(cloudData.levelCap) || Number(state.serverMaxLevel) || 60;
      state.serverMaxLevel = savedAdminCap;
      state.levelCap = savedAdminCap;
      state.serverCap = savedAdminCap;
      window.globalServerCap = savedAdminCap;

      if ((typeof localStorage !== 'undefined' && localStorage.getItem('aden_admin_unlock_all') === 'true') || cloudData.adminUnlockedAll || state.adminUnlockedAll) {
        state.adminUnlockedAll = true;
        window.__adminUnlockedAll = true;
      }

      try {
        updateSeasonTabBadges(ROOT);
        updateTabVisibilityByLevel(state);
      } catch (_) {}

      updateAllUI();
      save(true, true);
      if (cloudData.lastSaveTime) {
        setTimeout(() => checkOfflineProgress(cloudData.lastSaveTime), 600);
      }
      log(`☁️ 已成功從雲端載入等級 ${state.level} 的進度！`, 'rarity-legendary');
    };
    window.toggleMuteAudio = () => {
      if (typeof window !== 'undefined' && window.idleAudio) {
        const isMuted = window.idleAudio.toggleMute();
        const btn = el('audio-mute-btn');
        if (btn) btn.textContent = isMuted ? '🔇 已靜音' : '🔊 音效';
      }
    };

    // Registra todas as Cartas de Monstros colecionáveis no ALL_ITEMS do jogo
    if (D() && D().ALL_ITEMS) {
      for (const [cardId, cardDef] of Object.entries(MONSTER_CARDS)) {
        if (!D().ALL_ITEMS[cardId]) {
          D().ALL_ITEMS[cardId] = {
            id: cardId,
            name: cardDef.name,
            slot: 'card',
            type: 'monster_card',
            rarity: cardDef.rarity || 'common',
            tier: cardDef.rarity === 'sovereign' ? 6 : (cardDef.rarity === 'primordial' ? 5 : (cardDef.rarity === 'mythic' ? 4 : (cardDef.rarity === 'legendary' ? 3 : 2))),
            price: cardDef.level ? cardDef.level * 250 : 2500,
            icon: cardDef.icon || '/assets/2d/monsters/low-level-32x/PNG/Transperent/Icon1.png',
            desc: `怪物 ${cardDef.monster} 的收藏卡片。吸收到圖鑑後，可為整個帳號提供永久被動加成！`
          };
        }
      }
    }

    attachGlobalErrorHandlers();
    bindEvents();
    try {
      const stageEl = el('stage');
      if (stageEl) {
        globalVFXOrchestrator.mount(stageEl);
      }
    } catch (err) {
      console.debug('VFXOrchestrator init mount notice:', err);
    }

    window.openAdminModal = openAdminModal;
    window.isAuthorizedAdmin = isAuthorizedAdmin;
    window.AUTHORIZED_ADMIN_EMAILS = AUTHORIZED_ADMIN_EMAILS;
    window.setServerRate = setServerRate;
    window.applyServerRatePreset = applyServerRatePreset;
    window.toggleVFXProfiler = (enable) => globalVFXOrchestrator.toggleProfiler(enable);
    window.getVFXMetrics = () => globalVFXOrchestrator.getPerformanceMetrics();
    window.globalVFXOrchestrator = globalVFXOrchestrator;
    window.diagnoseSkillTree = (classId = state.class, level = state.level) => {
      const char = { class: classId, level, skills: state.skills || {} };
      const visible = getVisibleSkillsForCharacter(char);
      const learned = [];
      const available = [];
      const locked = [];
      for (const item of visible) {
        if (item.visibility === SKILL_VISIBILITY_STATES.LEARNED) learned.push(item.skillId);
        else if (item.visibility === SKILL_VISIBILITY_STATES.AVAILABLE) available.push(item.skillId);
        else if (item.visibility === SKILL_VISIBILITY_STATES.LOCKED) locked.push(item.skillId);
      }
      const prog = getCharacterProgressionState(char);
      return {
        class: classId,
        level,
        stage: prog.currentStage,
        learned,
        available,
        locked,
        totalVisible: visible.length
      };
    };

    state.startTime = Date.now(); 
    const hasSave = load();
    updateGameModeUI();

    if (hasSave) { 
      updateAllUI(); 
      if (state.zone) startCombat(); 
    } else { 
      state.race = 'human'; 
      state.class = 'fighter'; 
      const race = RACES.human, cls = CLASSES.fighter; 
      state.base = { atk: 0, def: 0, eva: 0, matk: 0, mdef: 0 }; 
      for (const k of ['atk','def','eva','matk','mdef']) { 
        state.base[k] = (race.stats[k] || 0) + (cls.base[k] || 0); 
      } 
      updateRaceClassUI(); 
      updateStatsUI(); 
    }

    // Verifica status da Recompensa Diária (Daily Check-in)
    setTimeout(() => {
      try {
        const dailyStatus = getDailyRewardStatus(state);
        const dotEl = el('daily-reward-dot');
        if (dotEl) dotEl.style.display = dailyStatus.canClaim ? 'block' : 'none';
        if (dailyStatus.canClaim) {
          openDailyRewardModal();
        }
      } catch (err) {
        console.warn('Erro ao checar daily reward status:', err);
      }

      // Verifica retorno de pagamento do Checkout Cakto
      try {
        if (typeof window !== 'undefined' && window.location) {
          const urlParams = new URLSearchParams(window.location.search);
          const status = urlParams.get('status');
          const payment = urlParams.get('payment');
          if (status === 'approved' || status === 'completed' || payment === 'success' || urlParams.get('unlocked_premium') === '1') {
            if (!state.battlePass?.unlockedPremium) {
              state.battlePass = state.battlePass || { xp: 0, claimedFree: [], claimedPremium: [], unlockedPremium: false };
              state.battlePass.unlockedPremium = true;
              updateAllUI();
              save();
              log('🎉 付款成功！你的高級通行證已啟用！', 'rarity-legendary');
            }
          }
        }
      } catch (err) {
        console.warn('Erro ao processar retorno de pagamento:', err);
      }
    }, 1200);

    _intervals.push(setInterval(updateClock, 1000)); 
    _intervals.push(setInterval(save, 10000)); 
    _intervals.push(setInterval(tickUI, 1000));

    const saveAndCloudSyncOnUnload = () => {
      save();
      if (typeof window !== 'undefined' && typeof window.saveCloudOnUnload === 'function') {
        window.saveCloudOnUnload();
      }
    };

    addTrackedListener(window, 'beforeunload', saveAndCloudSyncOnUnload);
    addTrackedListener(window, 'pagehide', saveAndCloudSyncOnUnload);
    addTrackedListener(document, 'visibilitychange', () => {
      if (document.visibilityState === 'hidden') saveAndCloudSyncOnUnload();
    });

    // ---- Embers / brasas globais (GrimoireFX) ----
    // Monta automaticamente em modo standalone (index.html direto)
    // No modo Shadow DOM (React), o IdleGame.tsx já monta via shadow.getElementById
    if (typeof window !== 'undefined' && window.GrimoireFX) {
      const rootObj = typeof _root !== 'undefined' ? _root : document;
      const gameRoot = rootObj.getElementById?.('game') || rootObj.querySelector?.('#game') || document.getElementById('game');
      if (gameRoot && !gameRoot.querySelector('.g-ember-global')) {
        const emberDiv = document.createElement('div');
        emberDiv.className = 'g-ember-global';
        gameRoot.insertBefore(emberDiv, gameRoot.firstChild);
        window.GrimoireFX.mountEmbers(emberDiv, {
          count: 45,
          colors: ['#f0883e', '#f0cd7e', '#e87d2e', '#ffd166', '#ff9b42']
        });
      }
    }

    // ---- Global Handlers para os 7 Subsistemas da Forja Imperial ----
    if (typeof window !== 'undefined') {
      window.buyInitialSoulCrystal = () => {
        const cost = 50000;
        if ((state.gold || 0) < cost) {
          log('金幣不足！購買初始靈魂水晶需要 50,000 金幣。', 'system');
          return;
        }
        state.gold -= cost;
        serviceAddToInventory(state, 'soul_crystal_red_stage1', 1, 'rare', false, { log, updateAllUI, save }, true);
        const crystal = (state.inventory || []).find(i => i.itemId === 'soul_crystal_red_stage1');
        if (crystal) {
          crystal.isSoulCrystal = true;
          crystal.stage = 1;
          crystal.crystalLevel = 1;
          crystal.absorbedSouls = 0;
        }
        log('🔮 已取得靈魂水晶！請放在背包中以吸收靈魂。', 'rarity-epic');
        updateAllUI();
        save();
      };

      window.applySAAction = (color, saKey, targetUid) => {
        const wpnUid = targetUid || window._selectedSAWeaponUid || state.equipment?.weapon;
        if (!wpnUid) {
          log('請選擇或裝備一把武器，再鑲嵌靈魂水晶！', 'system');
          return;
        }
        ElementalService.applySoulCrystalToWeapon(state, wpnUid, color, saKey, { log, updateAllUI, save, floatText });
        updateCraftUI();
      };

      window.removeSAAction = (targetUid) => {
        const wpnUid = targetUid || window._selectedSAWeaponUid || state.equipment?.weapon;
        if (!wpnUid) return;
        ElementalService.removeSoulCrystalFromWeapon(state, wpnUid, { log, updateAllUI, save });
        updateCraftUI();
      };

      window.unsealItemAction = (uid) => {
        serviceUnsealItem(state, uid, { log, updateAllUI, save });
      };

      window.polishMasterworkAction = (uid) => {
        servicePolishMasterwork(state, uid, { log, updateAllUI, save });
      };

      window.applyInitialDyeAction = (key) => {
        state.dyeSymbols = state.dyeSymbols || [null, null, null];
        const freeSlot = state.dyeSymbols.findIndex(s => !s);
        if (freeSlot === -1) {
          log('3 個刺青欄位都已使用！請先移除一個現有刺青。', 'system');
          return;
        }
        const cost = 10000;
        if ((state.gold || 0) < cost) {
          log('金幣不足！刻印符號需要 10,000 金幣。', 'system');
          return;
        }
        state.gold -= cost;
        serviceApplyDyeSymbol(state, freeSlot, key, 1, { log, updateAllUI, save });
      };

      window.upgradeDyeAction = (slotIdx) => {
        serviceUpgradeDyeSymbol(state, slotIdx, { log, updateAllUI, save });
      };

      window.removeDyeAction = (slotIdx) => {
        serviceRemoveDyeSymbol(state, slotIdx, { log, updateAllUI, save });
      };

      window.ElementalService = ElementalService;
      window.applyElementalAction = (uid, elem) => {
        ElementalService.applyElementalInfusion(state, uid, elem, { log, updateAllUI, save });
        updateCraftUI();
      };

      window.removeElementalAction = (uid) => {
        ElementalService.removeElementalInfusion(state, uid, { log, updateAllUI, save });
        updateCraftUI();
      };

      window.SynthesisService = SynthesisService;
      window.executeSynthesisAction = (primaryUid, secondaryUid) => {
        const res = SynthesisService.executeSynthesis(state, primaryUid, secondaryUid, { log, updateAllUI, save, playCombatVFX });
        updateCraftUI();
        return res;
      };

      window.compoundBeltsWithDuplicateAction = (pUid, sUid) => {
        const primary = pUid || el('belt-primary-select')?.value || window._synthesisTargetUid;
        const secondary = sUid || el('belt-secondary-select')?.value || window._synthesisIngredientUid;
        if (!primary || !secondary) {
          log('請選擇兩件物品進行合成！', 'system');
          return;
        }
        return window.executeSynthesisAction(primary, secondary);
      };

      window.swapWeaponSameGradeAction = (weaponUid, targetId) => {
        serviceSwapWeaponSameGrade(state, weaponUid, targetId, { log, updateAllUI, save });
      };

      window.applyAugmentAction = (uid, grade) => {
        serviceApplyLifeStone(state, uid, grade, { log, updateAllUI, save });
      };

      window.removeAugmentAction = (uid) => {
        serviceRemoveAugment(state, uid, { log, updateAllUI, save });
      };

      window.chargeRandomCraftWithAdenaAction = () => {
        serviceChargeRandomCraftWithAdena(state, { log, updateAllUI, save });
      };

      window.claimRandomCraftReward = (idx) => {
        serviceSpinRandomCraft(state, { log, updateAllUI, save, floatText });
      };

      window.spinRandomCraftAction = () => {
        const rc = state.randomCraft;
        if (!rc || !rc.charge || rc.charge < 1) {
          serviceSpinRandomCraft(state, { log, updateAllUI, save, floatText });
          return;
        }

        const root = ROOT || (typeof document !== 'undefined' ? document : null);
        const pedestals = root ? Array.from(root.querySelectorAll('.imp-rc-pedestal')) : [];
        if (pedestals.length > 0 && !window._rcSpinning) {
          window._rcSpinning = true;
          let step = 0;
          const interval = setInterval(() => {
            pedestals.forEach((p, i) => {
              if (i === (step % pedestals.length)) {
                p.classList.add('is-active-pulse');
              } else {
                p.classList.remove('is-active-pulse');
              }
            });
            step++;
            if (step > 9) {
              clearInterval(interval);
              pedestals.forEach(p => p.classList.remove('is-active-pulse'));
              window._rcSpinning = false;
              serviceSpinRandomCraft(state, { log, updateAllUI, save, floatText });
            }
          }, 45);
        } else if (!window._rcSpinning) {
          serviceSpinRandomCraft(state, { log, updateAllUI, save, floatText });
        }
      };

      window.refreshRandomCraftSlotsAction = () => {
        serviceRefreshRandomCraftSlots(state, { log, updateAllUI, save });
      };

      window.openMarketTab = () => openPanel('market');
      window.openMarket = () => openPanel('market');

      window.WeaponResonanceService = WeaponResonanceService;
      window.StaggerEngine = StaggerEngine;
      window.CosmeticService = CosmeticService;
      window.MonsterAIEngine = MonsterAIEngine;

      window.setHuntingDifficulty = (diffId) => {
        const res = MonsterAIEngine.setDifficulty(state, diffId);
        if (!res.success) {
          log(`⚠️ ${res.reason}`, 'warning');
          floatText(res.reason, 'float-warning');
          return;
        }
        log(`⚡ 狩獵難度已調整為 **${res.difficulty.name}**（${res.difficulty.xpMult}× 經驗值／金幣、${res.difficulty.dropMult}× 掉落）！`, 'rarity-epic');
        floatText(`⚡ ${res.difficulty.name.toUpperCase()} 模式！`, 'float-jackpot');
        state.activeMonster = null;
        pickRandomMonster();
        renderZoneMap();
        renderZoneInfoCard();
        save();
      };

      
    window.AchievementService = AchievementService;
    
    window.WorldBossService = WorldBossService;

    window.openWorldBossModal = () => {
      const modal = el('worldboss-modal');
      if (!modal) return;
      window.renderWorldBossModal();
      modal.classList.add('active');
    };

    window.closeWorldBossModal = () => {
      const modal = el('worldboss-modal');
      if (modal) modal.classList.remove('active');
    };

    window.renderWorldBossModal = () => {
      const contentEl = el('worldboss-modal-content');
      if (!contentEl || !WorldBossService) return;

      const status = WorldBossService.getStatus();
      const boss = status.isActive ? status.currentBoss : status.nextBoss;

      contentEl.innerHTML = `
        <!-- Banner de Status & Contagem Regressiva -->
        <div style="background:${status.isActive ? 'rgba(220,38,38,0.25)' : 'rgba(0,0,0,0.5)'}; border:1px solid ${status.isActive ? '#ef4444' : 'rgba(212,167,68,0.3)'}; border-radius:10px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:bold; background:${status.isActive ? '#ef4444' : '#3b82f6'}; color:#fff; padding:2px 8px; border-radius:4px;">
                ${status.isActive ? '● 世界入侵進行中' : '⏳ 等待甦醒'}
              </span>
              <span style="font-size:13px; color:#cbd5e1; font-weight:bold;">
                ${status.isActive ? '剩餘時間：' : '距離下次入侵：'}
              </span>
            </div>
            <div style="font-size:24px; font-family:'Cinzel',serif; font-weight:bold; color:${status.isActive ? '#f87171' : '#fde047'}; margin-top:4px;">
              ${status.timeFormatted}
            </div>
          </div>

          <div>
            ${status.isActive ? `
              <button onclick="window.joinWorldBossFightAction()" style="padding:10px 20px; font-family:'Cinzel',serif; font-weight:bold; font-size:14px; background:linear-gradient(180deg,#ef4444,#991b1b); border:1px solid #fca5a5; color:#fff; border-radius:6px; cursor:pointer; box-shadow:0 0 16px rgba(239,68,68,0.6); animation:pulse 1.5s infinite;">
                ⚔️ 立即加入世界入侵！
              </button>
            ` : `
              <button disabled style="padding:10px 18px; font-family:'Cinzel',serif; font-size:12px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); color:#9ca3af; border-radius:6px; cursor:not-allowed;">
                等待世界入侵（每 3 小時一次）
              </button>
            `}
          </div>
        </div>

        <!-- Perfil do Chefe em Destaque -->
        <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:16px; display:flex; gap:16px; align-items:flex-start;">
          <div style="width:72px; height:72px; border-radius:10px; border:2px solid #ef4444; background:#120707; display:flex; align-items:center; justify-content:center; font-size:36px; box-shadow:0 0 15px rgba(239,68,68,0.4);">
            🐉
          </div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:baseline;">
              <div>
                <h3 style="margin:0; font-family:'Cinzel',serif; font-size:18px; color:#fca5a5;">${boss.name}</h3>
                <div style="font-size:12px; color:#ffd877; font-weight:bold;">${boss.title}（等級 ${boss.lvl}）</div>
              </div>
              <div style="font-size:13px; font-weight:bold; color:#ef4444;">生命值：${boss.hp.toLocaleString()}</div>
            </div>
            <p style="margin:8px 0; font-size:12px; line-height:1.5; color:#94a3b8;">${boss.lore}</p>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:6px; background:rgba(0,0,0,0.5); padding:8px; border-radius:6px; font-size:11px;">
              <div>攻擊：<strong style="color:#f87171;">${boss.atk}</strong></div>
              <div>防禦：<strong style="color:#60a5fa;">${boss.def}</strong></div>
              <div>魔防：<strong style="color:#c084fc;">${boss.mdef}</strong></div>
              <div>金幣：<strong style="color:#facc15;">${boss.goldReward.toLocaleString()}</strong></div>
              <div>亞丁幣：<strong style="color:#ffd700;">+${boss.adenCoinsReward}</strong></div>
            </div>
          </div>
        </div>

        <!-- Recompensas Épicas da Incursão -->
        <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(212,167,68,0.25); border-radius:10px; padding:14px;">
          <div style="font-family:'Cinzel',serif; font-size:13px; font-weight:bold; color:#fef08a; margin-bottom:8px;">
            🏆 全服參與獎勵與掉落：
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:8px;">
            ${boss.drops.map(d => `
              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(212,167,68,0.2); border-radius:6px; padding:8px; display:flex; align-items:center; gap:8px; font-size:11px;">
                <span style="font-size:16px;">${d.isEpicJewel ? '💎' : d.itemId.includes('book') ? '📜' : '⚡'}</span>
                <div>
                  <div style="font-weight:bold; color:${d.isEpicJewel ? '#d8b4fe' : '#f8fafc'};">${d.name}</div>
                  <div style="color:#94a3b8; font-size:10px;">機率：${Math.round(d.chance * 100)}%</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    };

    window.joinWorldBossFightAction = () => {
      const res = WorldBossService.joinWorldBoss(state, {
        log,
        floatText,
        renderStageMonster,
        attackMonster,
        save
      });
      if (res.success) {
        window.closeWorldBossModal();
        updateAllUI();
      }
      return res;
    };

    window.claimAchievementAction = (achId) => {
      const res = AchievementService.claimAchievement(state, achId, {
        log,
        floatText,
        onUpdate: () => {
          updateCosmeticsUI();
          updateAllUI();
          save();
        }
      });
      if (res.success) {
        updateCosmeticsUI();
      }
      return res;
    };

      window.buyCosmeticAction = (category, itemId) => {
        CosmeticService.buyCosmetic(state, category, itemId, { log, save, updateAllUI });
        updateCosmeticsUI();
      };

      window.equipCosmeticAction = (category, itemId) => {
        CosmeticService.equipCosmetic(state, category, itemId, { log, save, updateAllUI });
        updateCosmeticsUI();
      };

      // Inicializa listeners em tempo real e sincronização do Mercado de Giran
      MarketService.initCloudSubscription(state, { log, updateAllUI, save });
      MarketService.subscribeUI(() => {
        updateMarketUI();
      });
    }
  } catch (err) {
    console.warn('Game init warning:', err);
  }
}

function tickUI() {
  const now = Date.now(); let buffChanged = false;
  for (const k of Object.keys(state.buffs || {})) { if (state.buffs[k].until < now) { delete state.buffs[k]; buffChanged = true; } }
  const gpsEl = el('gps-text'); if (gpsEl) { gpsEl.textContent = getGoldPerSec() > 0 ? `${getGoldPerSec().toFixed(1)}/秒` : '—'; }
  safeUiUpdate('stats-tick', updateStatsUI);
  const mt = el('mystic-timer'); if (mt) { mt.textContent = fmtCountdown(D().getMysticRotation()[0]?.msLeft || 0); }
  if (buffChanged) { safeUiUpdate('shop-tick', updateShopUI); }
}
