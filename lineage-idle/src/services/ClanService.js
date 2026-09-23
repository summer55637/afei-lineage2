/**
 * ClanService.js — Gerenciamento de 血盟s, Guerras de 攻城 (Castle Sieges) e Renda de 城堡s.
 */

import { CLAN_LEVEL_DATA, CLAN_SKILLS } from '../data/clan.js';
import { CASTLES, CASTLE_SHOP_CATALOG } from '../data/castles.js';

export class ClanService {
  /**
   * Retorna o estado do 血盟 do jogador e seus atributos agregados.
   */
  static getClanStatus(state) {
    if (!state.clan) {
      state.clan = {
        name: '亞丁守護者',
        level: 1,
        castles: [],
        lastTaxTimestamp: Date.now(),
        accumulatedTaxes: {}
      };
    }

    const lvlData = CLAN_LEVEL_DATA[state.clan.level] || CLAN_LEVEL_DATA[1];
    
    // Obter todas as habilidades desbloqueadas até o nível atual do clã
    const unlockedSkillIds = [];
    for (let l = 1; l <= state.clan.level; l++) {
      const d = CLAN_LEVEL_DATA[l];
      if (d && d.unlockedSkills) {
        unlockedSkillIds.push(...d.unlockedSkills);
      }
    }

    const activeSkills = unlockedSkillIds.map(id => CLAN_SKILLS[id]).filter(Boolean);

    // Calcular bônus totais de 血盟
    let pAtkBonusPercent = 0;
    let pDefBonusPercent = 0;
    let mAtkBonusPercent = 0;
    let mDefBonusPercent = 0;
    let hpBonusPercent = 0;
    let cpBonusPercent = 0;
    let regenBonusPercent = 0;
    let speedBonus = 0;

    for (const sk of activeSkills) {
      if (sk.stats.pAtkPercent) pAtkBonusPercent += sk.stats.pAtkPercent;
      if (sk.stats.pDefPercent) pDefBonusPercent += sk.stats.pDefPercent;
      if (sk.stats.mAtkPercent) mAtkBonusPercent += sk.stats.mAtkPercent;
      if (sk.stats.mDefPercent) mDefBonusPercent += sk.stats.mDefPercent;
      if (sk.stats.hpPercent) hpBonusPercent += sk.stats.hpPercent;
      if (sk.stats.cpPercent) cpBonusPercent += sk.stats.cpPercent;
      if (sk.stats.regenPercent) regenBonusPercent += sk.stats.regenPercent;
      if (sk.stats.speedBonus) speedBonus += sk.stats.speedBonus;
    }

    return {
      clan: state.clan,
      levelData: lvlData,
      nextLevelData: CLAN_LEVEL_DATA[state.clan.level + 1] || null,
      activeSkills,
      bonusStats: {
        pAtkBonusPercent,
        pDefBonusPercent,
        mAtkBonusPercent,
        mDefBonusPercent,
        hpBonusPercent,
        cpBonusPercent,
        regenBonusPercent,
        speedBonus
      },
      ownedCastles: state.clan.castles || []
    };
  }

  /**
   * Evolui o 血盟 para o próximo nível.
   */
  static upgradeClan(state, callbacks = {}) {
    const { log = console.log, onUpdate = () => {} } = callbacks;
    const status = this.getClanStatus(state);

    if (!status.nextLevelData) {
      log('你的血盟已達最高等級（等級 5－帝國騎士團）！', 'warning');
      return { success: false, reason: 'max_level' };
    }

    const next = status.nextLevelData;
    const playerLevel = state.level || 1;

    if (playerLevel < next.reqCharLevel) {
      log(`角色需要達到 ${next.reqCharLevel} 級以上，才能將血盟提升至 ${next.level} 級。`, 'error');
      return { success: false, reason: 'level_low' };
    }

    if ((state.gold || 0) < next.costAdena) {
      log(`金幣不足。血盟升級需要 ${next.costAdena.toLocaleString()} 金幣。`, 'error');
      return { success: false, reason: 'gold_low' };
    }

    if ((state.sp || 0) < next.costSp) {
      log(`技能點不足。血盟升級需要 ${next.costSp.toLocaleString()} 技能點。`, 'error');
      return { success: false, reason: 'sp_low' };
    }

    // Consumir custos
    state.gold -= next.costAdena;
    state.sp -= next.costSp;
    state.clan.level = next.level;

    log(`🎉 恭喜！你的血盟已提升至 ${next.level} 級（${next.title}）！`, 'success');
    log(`✨ 已解鎖新的血盟技能：${next.unlockedSkills.map(id => CLAN_SKILLS[id]?.name).join(', ')}`, 'info');

    onUpdate();
    return { success: true, newLevel: next.level };
  }

  /**
   * Inicia o 攻城 a um 城堡 (Castle Siege).
   */
  static startSiege(state, castleId, callbacks = {}) {
    const { log = console.log, onUpdate = () => {} } = callbacks;
    const castle = CASTLES[castleId];

    if (!castle) {
      return { success: false, reason: 'invalid_castle' };
    }

    if ((state.clan?.level || 1) < castle.reqClanLevel) {
      log(`只有 ${castle.reqClanLevel} 級以上血盟才能對 ${castle.name} 宣戰。`, 'error');
      return { success: false, reason: 'clan_level_low' };
    }

    if ((state.level || 1) < castle.reqCharLevel) {
      log(`角色等級不足。攻城 ${castle.name} 需要 ${castle.reqCharLevel} 級以上。`, 'error');
      return { success: false, reason: 'char_level_low' };
    }

    state.activeSiege = {
      castleId,
      castleName: castle.name,
      phase: 1, // 1: Portões, 2: Guardas, 3: Seal of Ruler
      gateHp: castle.siege.gateHp,
      maxGateHp: castle.siege.gateHp,
      guardsHp: castle.siege.guardsHp,
      maxGuardsHp: castle.siege.guardsHp,
      castRounds: 0,
      reqCastRounds: castle.siege.castRoundsRequired,
      isCompleted: false,
      logs: [`⚔️ 已向 ${castle.name} 宣布攻城！第 1 階段：攻擊外城門。`]
    };

    log(`🏰 戰爭號角響起！${castle.name} 攻城戰開始！`, 'warning');
    onUpdate();
    return { success: true, siege: state.activeSiege };
  }

  /**
   * Executa uma rodada de ação do 攻城 (Phase-based progression).
   */
  static executeSiegeTurn(state, callbacks = {}) {
    const { log = console.log, onUpdate = () => {} } = callbacks;
    const siege = state.activeSiege;

    if (!siege || siege.isCompleted) {
      return { success: false, reason: 'no_active_siege' };
    }

    const castle = CASTLES[siege.castleId];
    if (!castle) return { success: false };

    const pAtk = Math.max(50, state.stats?.atk || 200);
    const mAtk = Math.max(50, state.stats?.matk || 200);
    const totalDmg = Math.round((pAtk * 1.5 + mAtk * 1.2) * (0.9 + Math.random() * 0.25));

    // FASE 1: Destruição dos Portões Exteriores
    if (siege.phase === 1) {
      const dmgToGate = Math.max(100, Math.round(totalDmg * 2.2)); // Bônus de aríete/golem de cerco
      siege.gateHp = Math.max(0, siege.gateHp - dmgToGate);

      const msg = `💥 血盟攻城槌與投石機對城門造成 ${dmgToGate.toLocaleString()} 傷害！（生命值：${siege.gateHp.toLocaleString()}/${siege.maxGateHp.toLocaleString()}）`;
      siege.logs.unshift(msg);
      log(msg, 'info');

      if (siege.gateHp <= 0) {
        siege.phase = 2;
        const advMsg = `⚡ ${castle.name} 的城門已被攻破！第 2 階段：攻入中庭並迎戰皇家守衛！`;
        siege.logs.unshift(advMsg);
        log(advMsg, 'warning');
      }
    }
    // FASE 2: Confronto com os Guardas Reais
    else if (siege.phase === 2) {
      const dmgToGuards = Math.max(100, Math.round(totalDmg * 1.4));
      siege.guardsHp = Math.max(0, siege.guardsHp - dmgToGuards);

      const msg = `⚔️ 你的戰士猛烈攻擊皇家守衛，造成 ${dmgToGuards.toLocaleString()} 傷害！`;
      siege.logs.unshift(msg);
      log(msg, 'info');

      if (siege.guardsHp <= 0) {
        siege.phase = 3;
        const advMsg = `👑 皇家守衛已被擊敗！進入第 3 階段：前往王座廳，引導統治者封印！`;
        siege.logs.unshift(advMsg);
        log(advMsg, 'warning');
      }
    }
    // FASE 3: Canalização do Seal of Ruler
    else if (siege.phase === 3) {
      siege.castRounds += 1;
      const castMsg = `✨ 正在引導統治者封印……（${siege.castRounds}/${siege.reqCastRounds} 回合未被中斷）`;
      siege.logs.unshift(castMsg);
      log(castMsg, 'info');

      if (siege.castRounds >= siege.reqCastRounds) {
        siege.isCompleted = true;
        
        if (!state.clan.castles.includes(siege.castleId)) {
          state.clan.castles.push(siege.castleId);
        }

        const victoryReward = 5000000;
        state.gold = (state.gold || 0) + victoryReward;

        const triumphMsg = `🏆 至高勝利！封印已刻印於神聖祭壇！${state.name || '你的血盟'} 現在正式成為 ${castle.name} 的領主！（寶庫 +${victoryReward.toLocaleString()} 金幣）`;
        siege.logs.unshift(triumphMsg);
        log(triumphMsg, 'success');
      }
    }

    onUpdate();
    return { success: true, siege };
  }

  /**
   * Coleta as taxas acumuladas de um castelo possuído.
   */
  static claimCastleTaxes(state, castleId, callbacks = {}) {
    const { log = console.log, onUpdate = () => {} } = callbacks;
    const castle = CASTLES[castleId];

    if (!castle || !(state.clan?.castles || []).includes(castleId)) {
      log('你的血盟並未統治此城堡，無法領取稅收。', 'error');
      return { success: false, reason: 'not_owner' };
    }

    const taxes = state.clan.accumulatedTaxes?.[castleId] || 0;
    if (taxes <= 0) {
      log(`${castle.name} 的寶庫目前沒有可領取的累積稅收。`, 'warning');
      return { success: false, amount: 0 };
    }

    state.gold = (state.gold || 0) + taxes;
    state.clan.accumulatedTaxes[castleId] = 0;

    log(`💰 你從 ${castle.name} 寶庫領取了 ${taxes.toLocaleString()} 金幣的王室稅收！`, 'success');
    onUpdate();
    return { success: true, amount: taxes };
  }

  /**
   * Atualiza a geração periódica de taxas dos castelos governados.
   */
  static updateTaxesTick(state) {
    if (!state.clan || !state.clan.castles || state.clan.castles.length === 0) return;

    if (!state.clan.accumulatedTaxes) state.clan.accumulatedTaxes = {};
    const now = Date.now();
    const lastTime = state.clan.lastTaxTimestamp || now;
    const diffMinutes = Math.min(120, Math.floor((now - lastTime) / 60000)); // Cap de 2 horas por tick

    if (diffMinutes >= 1) {
      for (const castleId of state.clan.castles) {
        const castle = CASTLES[castleId];
        if (castle && castle.adenaPerMinute) {
          const generated = castle.adenaPerMinute * diffMinutes;
          state.clan.accumulatedTaxes[castleId] = (state.clan.accumulatedTaxes[castleId] || 0) + generated;
        }
      }
      state.clan.lastTaxTimestamp = now;
    }
  }

  /**
   * Compra um item da Loja Exclusiva do 城堡.
   */
  static buyCastleShopItem(state, itemId, callbacks = {}) {
    const { log = console.log, onUpdate = () => {} } = callbacks;
    const item = CASTLE_SHOP_CATALOG.find(i => i.id === itemId);

    if (!item) {
      log('城堡商店中找不到此物品。', 'error');
      return { success: false, reason: 'item_not_found' };
    }

    if (!state.clan?.castles || state.clan.castles.length === 0) {
      log('只有城堡領主可以購買皇家商店物品。', 'error');
      return { success: false, reason: 'no_castle' };
    }

    if ((state.gold || 0) < item.priceAdena) {
      log(`金幣不足。價格：${item.priceAdena.toLocaleString()} 金幣。`, 'error');
      return { success: false, reason: 'gold_low' };
    }

    state.gold -= item.priceAdena;

    // Adicionar item ao inventário
    if (!state.inventory) state.inventory = [];
    const existing = state.inventory.find(i => (typeof i === 'object' ? i.id : i) === item.id);

    if (existing && typeof existing === 'object' && existing.count) {
      existing.count += (item.count || 1);
    } else {
      state.inventory.push({
        id: item.id,
        name: item.name,
        slot: item.slot || 'misc',
        tier: 5,
        price: item.priceAdena,
        stats: item.stats || {},
        icon: item.icon,
        desc: item.desc
      });
    }

    log(`✨ 你已從城堡商店購買 ${item.name}！`, 'success');
    onUpdate();
    return { success: true };
  }

  /**
   * Cria ou edita as informações do 血盟 (Nome, Lema, Brasão).
   */
  static createOrEditClan(state, name, motto, callbacks = {}) {
    const { log = console.log, onUpdate = () => {}, floatText = () => {} } = callbacks;
    const cleanName = String(name || '').trim();
    if (!cleanName || cleanName.length < 3) {
      log('血盟名稱至少需要 3 個字元。', 'error');
      return { success: false, reason: 'name_too_short' };
    }
    const isNew = !state.clan || !state.clan.name || state.clan.name === '亞丁守護者';
    const cost = isNew ? 100000 : 250000;
    if ((state.gold || 0) < cost) {
      log(`金幣不足，無法建立／重新命名血盟（需要 ${cost.toLocaleString()} 金幣）。`, 'error');
      return { success: false, reason: 'gold_low' };
    }
    state.gold -= cost;
    if (!state.clan) {
      state.clan = { level: 1, castles: [], lastTaxTimestamp: Date.now(), accumulatedTaxes: {} };
    }
    state.clan.name = cleanName;
    state.clan.level = Math.max(state.clan.level || 0, 1);
    state.clan.motto = motto || '為了亞丁的榮耀！';
    state.clan.reputation = state.clan.reputation || 100;
    state.clan.donationsAdena = state.clan.donationsAdena || 0;
    state.clan.donationsSp = state.clan.donationsSp || 0;

    log(`🏰 血盟 **[${cleanName}]** ${isNew ? '建立成功' : '已更新'}！盟訓：「${state.clan.motto}」`, 'rarity-legendary');
    floatText(`🏰 血盟建立成功！`, 'float-jackpot');
    onUpdate();
    return { success: true, clan: state.clan };
  }

  /**
   * Realiza doação de Adena/SP para o avanço da 聲望 e EXP do 血盟.
   */
  static donateToClan(state, adenaAmt = 0, spAmt = 0, callbacks = {}) {
    const { log = console.log, onUpdate = () => {}, floatText = () => {} } = callbacks;
    if (adenaAmt <= 0 && spAmt <= 0) return { success: false };

    if ((state.gold || 0) < adenaAmt) {
      log('金幣不足，無法進行捐獻。', 'error');
      return { success: false, reason: 'gold_low' };
    }
    if ((state.sp || 0) < spAmt) {
      log('技能點不足，無法進行捐獻。', 'error');
      return { success: false, reason: 'sp_low' };
    }

    state.gold -= adenaAmt;
    state.sp -= spAmt;
    if (!state.clan) this.getClanStatus(state);

    const repGained = Math.floor(adenaAmt / 5000) + Math.floor(spAmt / 100);
    state.clan.reputation = (state.clan.reputation || 0) + repGained;
    state.clan.donationsAdena = (state.clan.donationsAdena || 0) + adenaAmt;
    state.clan.donationsSp = (state.clan.donationsSp || 0) + spAmt;

    log(`🛡️ 血盟捐獻完成：+${adenaAmt.toLocaleString()} 金幣、 +${spAmt.toLocaleString()} 技能點。血盟聲望：**+${repGained}**！`, 'rarity-epic');
    floatText(`+${repGained} 聲望`, 'float-epic');
    onUpdate();
    return { success: true, repGained };
  }

  /**
   * Ativa bênçãos mágicas do Clan Hall.
   */
  static activateClanHallBuff(state, buffId, callbacks = {}) {
    const { log = console.log, onUpdate = () => {}, floatText = () => {} } = callbacks;
    const buff = CLAN_HALL_BUFFS[buffId];
    if (!buff) return { success: false, reason: 'invalid_buff' };

    if ((state.gold || 0) < buff.costAdena) {
      log(`金幣不足，無法啟用 ${buff.name}（需要 ${buff.costAdena.toLocaleString()} 金幣）。`, 'error');
      return { success: false, reason: 'gold_low' };
    }

    state.gold -= buff.costAdena;
    state.buffs = state.buffs || {};
    state.buffs['clan_hall_' + buffId] = {
      until: Date.now() + buff.durationMs,
      amount: 1,
      name: buff.name
    };

    log(`✨ **[血盟會館]** ${buff.name} 已啟用 1 小時！（${buff.desc}）`, 'rarity-legendary');
    floatText(`✨ ${buff.name.toUpperCase()}!`, 'float-jackpot');
    onUpdate();
    return { success: true };
  }

  /**
   * Retorna os membros do 血盟 (incluindo o jogador e veteranos simulados).
   */
  static getClanRoster(state) {
    const clan = (state && state.clan) ? state.clan : { name: '亞丁守護者', level: 1, reputation: 100 };
    const pName = state?.charName || state?.heroName || state?.playerName || state?.name || '冒險者';
    const pLvl = state?.level || 1;
    const pClass = state?.className || state?.class || '戰士';

    return [
      { name: pName, rank: '👑 血盟盟主', level: pLvl, className: pClass, contribution: (clan.donationsAdena || 0) + (clan.donationsSp || 0) * 10, isPlayer: true },
      { name: '加拉哈德爵士', rank: '⚔️ 將軍', level: Math.max(40, pLvl + 2), className: '聖騎士', contribution: 350000, isPlayer: false },
      { name: '艾蓮娜・月歌', rank: '🔮 皇家法師', level: Math.max(38, pLvl + 1), className: '咒術詩人', contribution: 280000, isPlayer: false },
      { name: '凱倫・暗影', rank: '🗡️ 資深刺客', level: Math.max(35, pLvl), className: '深淵行者', contribution: 210000, isPlayer: false },
      { name: '索加・鐵匠', rank: '🛡️ 工匠大師', level: Math.max(32, pLvl - 2), className: '賞金獵人', contribution: 190000, isPlayer: false },
      { name: '莉拉・陽語', rank: '✨ 女祭司', level: Math.max(30, pLvl - 3), className: '主教', contribution: 150000, isPlayer: false }
    ];
  }
}

export const CLAN_HALL_BUFFS = {
  eva_blessing: {
    id: 'eva_blessing',
    name: '伊娃祝福',
    icon: '💧',
    desc: '魔力恢復 +20%、魔力消耗 -10%',
    costAdena: 50000,
    durationMs: 3600000,
    stats: { mpRegenPercent: 0.20 }
  },
  paagrio_protection: {
    id: 'paagrio_protection',
    name: "帕格立歐守護",
    icon: '🔥',
    desc: '+12% 物理防禦、+12% 魔法防禦',
    costAdena: 75000,
    durationMs: 3600000,
    stats: { pDefPercent: 0.12, mDefPercent: 0.12 }
  },
  shilen_harmony: {
    id: 'shilen_harmony',
    name: '席琳的和諧',
    icon: '🌑',
    desc: '狩獵經驗值 +15%、金幣掉落 +10%',
    costAdena: 100000,
    durationMs: 3600000,
    stats: { xpBoost: 0.15, goldBoost: 0.10 }
  },
  royal_teleport: {
    id: 'royal_teleport',
    name: '血盟祕法傳送門',
    icon: '🌀',
    desc: '降低瞬間移動費用並增加 10 點速度',
    costAdena: 60000,
    durationMs: 3600000,
    stats: { speedBonus: 10 }
  }
};
