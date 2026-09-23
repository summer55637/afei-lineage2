/**
 * MonsterAIEngine.js — IA de Combate para Monstros, Perfis/Arquétipos & Dificuldade Progressiva
 * 
 * NÍVEL 15 (Master Plan v5):
 * 15.1. IA de Combate por Perfil de Monstro (Berserker, Caster, Tank, Assassin, Support)
 * 15.2. Habilidades de Monstro e Traços de Campeões/Elites (Vampiric, Reflect, Mana Burn, Fortress)
 * 15.3. Sagas e Mapas por Faixa de Nível (Gludio a Forge of the Gods)
 * 15.4. Sistema de 4 Níveis de Dificuldade de Caça (Normal, Hard, Nightmare, Hell)
 * 15.5. Recompensas Progressivas por Dificuldade (XP, SP, Adena, Drop Rates)
 */

export const MONSTER_ARCHETYPES = {
  BERSERKER: 'berserker',
  CASTER: 'caster',
  TANK: 'tank',
  ASSASSIN: 'assassin',
  SUPPORT: 'support'
};

export const ARCHETYPE_INFO = {
  [MONSTER_ARCHETYPES.BERSERKER]: {
    label: '狂戰士',
    icon: '⚔️',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.4)',
    desc: '侵略性極高。生命值低於 35% 時進入狂暴，攻擊力 +30%。'
  },
  [MONSTER_ARCHETYPES.CASTER]: {
    label: '魔法施術者',
    icon: '🔮',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.15)',
    border: 'rgba(168, 85, 247, 0.4)',
    desc: '奧術施法型怪物，會使用元素魔法；較怕物理傷害與失衡破防。'
  },
  [MONSTER_ARCHETYPES.TANK]: {
    label: '守護者／坦克',
    icon: '🛡️',
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.4)',
    desc: '物理防禦高；有機率以盾牌格擋 50% 傷害，生命值低於 50% 時可進入堡壘姿態。'
  },
  [MONSTER_ARCHETYPES.ASSASSIN]: {
    label: '暗影刺客',
    icon: '🗡️',
    color: '#eab308',
    bg: 'rgba(234, 179, 8, 0.15)',
    border: 'rgba(234, 179, 8, 0.4)',
    desc: '敏捷且致命；有機率觸發暗影閃避，並造成高額暴擊。'
  },
  [MONSTER_ARCHETYPES.SUPPORT]: {
    label: '輔助／薩滿',
    icon: '✨',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.4)',
    desc: '生命值低於 40% 時會自我治療，並以詛咒削弱玩家。'
  }
};

/**
 * 4 Níveis de Dificuldade de Caça Progressiva (15.4 e 15.5)
 */
export const HUNTING_DIFFICULTIES = {
  normal: {
    id: 'normal',
    name: '一般',
    icon: '🟢',
    minLvl: 1,
    hpMult: 1.0,
    atkMult: 1.0,
    defMult: 1.0,
    xpMult: 1.0,
    goldMult: 1.0,
    dropMult: 1.0,
    champBonus: 0,
    color: '#10b981',
    badge: '一般',
    desc: '適合初期成長的標準平衡難度。'
  },
  hard: {
    id: 'hard',
    name: '困難',
    icon: '🟡',
    minLvl: 40,
    hpMult: 1.6,
    atkMult: 1.35,
    defMult: 1.25,
    xpMult: 1.5,
    goldMult: 1.5,
    dropMult: 1.35,
    champBonus: 4,
    color: '#f59e0b',
    badge: '困難（等級 40+）',
    desc: '經驗值／金幣 +50%、掉落率 +35%，怪物更加耐打。'
  },
  nightmare: {
    id: 'nightmare',
    name: '夢魘',
    icon: '🔴',
    minLvl: 60,
    hpMult: 2.8,
    atkMult: 1.8,
    defMult: 1.6,
    xpMult: 2.5,
    goldMult: 2.5,
    dropMult: 1.8,
    champBonus: 8,
    crystalBonus: true,
    color: '#ef4444',
    badge: '夢魘（等級 60+）',
    desc: '經驗值／金幣 +150%、掉落率 +80%，靈魂水晶與魔法書掉落提升。'
  },
  hell: {
    id: 'hell',
    name: '煉獄',
    icon: '🟣',
    minLvl: 76,
    hpMult: 4.5,
    atkMult: 2.6,
    defMult: 2.2,
    xpMult: 4.0,
    goldMult: 4.0,
    dropMult: 2.5,
    champBonus: 15,
    rareDropBonus: true,
    color: '#a855f7',
    badge: '煉獄（等級 76+）',
    desc: '經驗值／金幣 +300%、掉落率 +150%，冠軍怪更常出現並提高菁英掉落。'
  }
};

export const MonsterAIEngine = {
  /**
   * Obtém o arquétipo de combate do monstro com base em suas características.
   */
  getMonsterArchetype(monsterDef) {
    if (!monsterDef) return MONSTER_ARCHETYPES.BERSERKER;
    if (monsterDef.archetype && MONSTER_ARCHETYPES[monsterDef.archetype.toUpperCase()]) {
      return monsterDef.archetype.toLowerCase();
    }

    const name = String(monsterDef.name || '').toLowerCase();
    const traits = Array.isArray(monsterDef.traits) ? monsterDef.traits : [];

    // 1. Suporte / Curandeiro / Xamã
    if (
      name.includes('priest') || name.includes('shaman') || name.includes('bishop') ||
      name.includes('cleric') || name.includes('seer') || name.includes('hierophant') ||
      traits.includes('heal') || traits.includes('support')
    ) {
      return MONSTER_ARCHETYPES.SUPPORT;
    }

    // 2. Conjurador Mágico
    if (
      monsterDef.magic === true || (monsterDef.matk && monsterDef.matk > monsterDef.atk) ||
      name.includes('mage') || name.includes('wizard') || name.includes('sorcerer') ||
      name.includes('witch') || name.includes('magus') || name.includes('archon') ||
      name.includes('lich') || name.includes('spirit') || name.includes('eye')
    ) {
      return MONSTER_ARCHETYPES.CASTER;
    }

    // 3. Tank / Guardião
    if (
      traits.includes('block') || traits.includes('boneArmor') ||
      name.includes('armored') || name.includes('guardian') || name.includes('knight') ||
      name.includes('shield') || name.includes('sentinel') || name.includes('golem') ||
      name.includes('paladin') || name.includes('vanguard') || name.includes('dreadnought') ||
      name.includes('titan')
    ) {
      return MONSTER_ARCHETYPES.TANK;
    }

    // 4. Assassino / Ladino
    if (
      traits.includes('ambush') || traits.includes('lifesteal') ||
      name.includes('thief') || name.includes('stalker') || name.includes('assassin') ||
      name.includes('scout') || name.includes('infiltrator') || name.includes('slayer') ||
      name.includes('ghost') || name.includes('vampire') || name.includes('archer') ||
      name.includes('marksman') || name.includes('serpent') || name.includes('snake')
    ) {
      return MONSTER_ARCHETYPES.ASSASSIN;
    }

    // 5. Berserker (Padrão para guerreiros, feras, orcs furiosos)
    return MONSTER_ARCHETYPES.BERSERKER;
  },

  /**
   * Inicializa o estado de IA do monstro em combate ativo.
   */
  initMonsterAI(monster, state) {
    if (!monster) return;

    const archetype = this.getMonsterArchetype(monster);
    monster.archetype = archetype;

    // Traços de Elite para Elites ou Campeões
    const eliteTraits = [];
    if (monster.champion === 'red') {
      eliteTraits.push('vampiric', 'reflect', 'berserk_frenzy');
    } else if (monster.champion === 'blue') {
      eliteTraits.push('mana_burn', 'barrier');
    } else if (monster.elite || monster.isElite) {
      if (Math.random() < 0.5) eliteTraits.push('vampiric');
      if (Math.random() < 0.4) eliteTraits.push('reflect');
      if (Math.random() < 0.3) eliteTraits.push('mana_burn');
    }

    monster._aiState = {
      archetype,
      enraged: false,
      enrageMultiplier: 1.0,
      fortressActive: false,
      fortressUntil: 0,
      fortressUsed: false,
      healed: false,
      eliteTraits,
      barrierHp: eliteTraits.includes('barrier') ? Math.floor(monster._maxHp * 0.20) : 0,
      lastCastTick: 0
    };
  },

  /**
   * Processa o dano recebido pelo monstro vindo do herói.
   * Aplica Bloqueio de Escudo (Tank), Esquiva Sombria (Assassin),
   * Gatilhos de Enrage (Berserker), Cura (Support) e Reflexão (Elite/Tank).
   */
  processIncomingDamage(monster, incomingDamage, isPhysical, state, callbacks = {}) {
    const ai = monster._aiState || {};
    const result = {
      finalDamage: incomingDamage,
      wasDodged: false,
      wasBlocked: false,
      reflectedDamage: 0,
      healedHp: 0,
      events: []
    };

    if (incomingDamage <= 0) return result;

    // 1. Esquiva Sombria (Assassino): 18% de chance de esquivar completamente se for físico
    if (ai.archetype === MONSTER_ARCHETYPES.ASSASSIN && isPhysical) {
      const dodgeChance = 0.18;
      if (Math.random() < dodgeChance) {
        result.wasDodged = true;
        result.finalDamage = 0;
        result.events.push({
          type: 'dodge',
          floatText: '💨 暗影閃避',
          floatStyle: 'sf-miss',
          log: `💨 **${monster.name}** 融入暗影並閃避了攻擊！`
        });
        return result;
      }
    }

    // 2. Bloqueio de Escudo (Tank): 25% de chance de bloquear 50% do dano físico
    if (ai.archetype === MONSTER_ARCHETYPES.TANK && isPhysical) {
      const blockChance = 0.25;
      if (Math.random() < blockChance) {
        result.wasBlocked = true;
        result.finalDamage = Math.max(1, Math.floor(result.finalDamage * 0.50));
        result.events.push({
          type: 'block',
          floatText: '🛡️ 盾牌格擋（-50%）',
          floatStyle: 'sf-block',
          log: `🛡️ **${monster.name}** 舉起盾牌，格擋了一半傷害！`
        });
      }
    }

    // 3. Postura da Fortaleza (Tank): abaixo de 50% HP ativa por 10s (+40% P.Def e 10% Reflexão)
    const realNow = Date.now();
    if (ai.archetype === MONSTER_ARCHETYPES.TANK && !ai.fortressUsed && (monster.hp - result.finalDamage) < (monster._maxHp * 0.50)) {
      ai.fortressUsed = true;
      ai.fortressActive = true;
      ai.fortressUntil = realNow + 10000;
      result.events.push({
        type: 'fortress',
        floatText: '🛡️ 堡壘姿態！',
        floatStyle: 'float-epic',
        log: `🛡️ **${monster.name}** 進入堡壘姿態（10 秒內強化防禦並反射傷害）！`
      });
    }

    // Se Postura da Fortaleza estiver ativa, reduz mais 25% e reflete 2.5% (balanceado com teto de segurança)
    const playerMaxHp = Number(state?.stats?.maxHp) || 2000;
    if (ai.fortressActive) {
      if (realNow < ai.fortressUntil) {
        result.finalDamage = Math.max(1, Math.floor(result.finalDamage * 0.75));
        const fortressReflectCap = Math.max(10, Math.floor(playerMaxHp * 0.03));
        const fortressReflect = Math.min(fortressReflectCap, Math.max(1, Math.floor(result.finalDamage * 0.025)));
        result.reflectedDamage += fortressReflect;
      } else {
        ai.fortressActive = false;
      }
    }

    // 4. Absorção de Barreira Protetora (Elite Champion)
    if (ai.barrierHp && ai.barrierHp > 0) {
      if (result.finalDamage <= ai.barrierHp) {
        ai.barrierHp -= result.finalDamage;
        result.events.push({
          type: 'barrier',
          floatText: '🔮 屏障吸收',
          floatStyle: 'sf-block',
          log: `🔮 **${monster.name}** 的能量護盾吸收了 ${result.finalDamage} 點傷害！`
        });
        result.finalDamage = 0;
        return result;
      } else {
        const absorbed = ai.barrierHp;
        result.finalDamage -= absorbed;
        ai.barrierHp = 0;
        result.events.push({
          type: 'barrier_break',
          floatText: '💥 屏障破壞',
          floatStyle: 'float-jackpot',
          log: `💥 **${monster.name}** 的奧術屏障已被破壞！`
        });
      }
    }

    // 5. Reflexão de Dano (Elite Reflect Trait — Nerfado de 12% para 3% com teto de 5% Max HP do jogador)
    if (ai.eliteTraits && ai.eliteTraits.includes('reflect')) {
      const eliteReflectCap = Math.max(15, Math.floor(playerMaxHp * 0.05));
      const rawReflect = Math.max(1, Math.floor(result.finalDamage * 0.03));
      const reflectAmt = Math.min(eliteReflectCap, rawReflect);
      result.reflectedDamage += reflectAmt;
      result.events.push({
        type: 'reflect',
        floatText: `⚡ 反射 -${reflectAmt}`,
        floatStyle: 'sf-hurt',
        log: `⚡ **${monster.name}** 的尖刺護甲反射了 ${reflectAmt} 點傷害！`
      });
    }

    // 6. Gatilho de Enrage (Berserker): abaixo de 35% HP
    const remainingHp = monster.hp - result.finalDamage;
    if (ai.archetype === MONSTER_ARCHETYPES.BERSERKER && !ai.enraged && remainingHp > 0 && remainingHp < (monster._maxHp * 0.35)) {
      ai.enraged = true;
      ai.enrageMultiplier = 1.30;
      monster.atk = Math.floor(monster.atk * 1.30);
      result.events.push({
        type: 'enrage',
        floatText: '🔥 狂暴！（攻擊 +30%）',
        floatStyle: 'float-jackpot',
        log: `🔥 **${monster.name}** 進入狂暴狀態！攻擊力 +30%！`
      });
    }

    // 7. Gatilho de Auto-Cura Suprema (Support): abaixo de 40% HP
    if (ai.archetype === MONSTER_ARCHETYPES.SUPPORT && !ai.healed && remainingHp > 0 && remainingHp < (monster._maxHp * 0.40)) {
      ai.healed = true;
      const healAmt = Math.floor(monster._maxHp * 0.30);
      result.healedHp = healAmt;
      monster.hp = Math.min(monster._maxHp, monster.hp + healAmt);
      result.events.push({
        type: 'heal',
        floatText: `✨ +${healAmt} 生命值（治療）`,
        floatStyle: 'sf-heal',
        log: `✨ **${monster.name}** 施展薩滿儀式，恢復 ${healAmt} 生命值！`
      });
    }

    return result;
  },

  /**
   * Processa o ataque do monstro contra o jogador.
   * Aplica magias do Caster, críticos do Assassino, bônus de Fúria do Berserker,
   * drenagem de vida (Vampiric) e queima de mana (Mana Burn).
   */
  processMonsterAttack(monster, playerStats, state) {
    const ai = monster._aiState || {};
    const archetype = ai.archetype || MONSTER_ARCHETYPES.BERSERKER;

    let atkType = (archetype === MONSTER_ARCHETYPES.CASTER || monster.magic === true) ? 'magical' : 'physical';
    let rawAtk = atkType === 'magical' ? (monster.matk || Math.floor(monster.atk * 1.25)) : monster.atk;

    // Berserker enrage bonus
    if (ai.enraged) {
      rawAtk = Math.floor(rawAtk * 1.15);
    }

    let isCrit = false;
    let critMultiplier = 1.0;

    // Assassin critical strikes: 25% chance for 2.2x damage
    if (archetype === MONSTER_ARCHETYPES.ASSASSIN) {
      if (Math.random() < 0.25) {
        isCrit = true;
        critMultiplier = 2.2;
      }
    } else {
      if (Math.random() < 0.08) {
        isCrit = true;
        critMultiplier = 1.6;
      }
    }

    // Caster Elemental Spellcraft
    let spellName = null;
    let spellVfx = null;
    if (archetype === MONSTER_ARCHETYPES.CASTER) {
      const elem = monster.element || 'fire';
      const SPELL_MAP = {
        fire: { name: '元素烈焰', vfx: 'fireball', bonus: 1.25 },
        water: { name: '奧術水爆', vfx: 'water_blast', bonus: 1.20 },
        wind: { name: '切裂颶風', vfx: 'hurricane', bonus: 1.25 },
        earth: { name: '大地尖刺', vfx: 'earth_spike', bonus: 1.20 },
        holy: { name: '神聖日光', vfx: 'holy_ray', bonus: 1.30 },
        dark: { name: '暗影火花', vfx: 'dark_missile', bonus: 1.30 }
      };
      const sp = SPELL_MAP[elem] || SPELL_MAP.fire;
      spellName = sp.name;
      spellVfx = sp.vfx;
      rawAtk = Math.floor(rawAtk * sp.bonus);
    }

    // Support Hex / Gloom Debuff: 25% chance
    let appliedDebuff = null;
    if (archetype === MONSTER_ARCHETYPES.SUPPORT && Math.random() < 0.25) {
      const debuffType = Math.random() < 0.5 ? 'hex' : 'gloom';
      state.buffs = state.buffs || {};
      const now = Date.now();
      if (debuffType === 'hex') {
        state.buffs['monster_hex'] = { amount: 20, until: now + 10000 };
        appliedDebuff = { name: '詛咒術（物理防禦 -20%）', type: 'hex' };
      } else {
        state.buffs['monster_gloom'] = { amount: 20, until: now + 10000 };
        appliedDebuff = { name: '深淵陰霾（魔法防禦 -20%）', type: 'gloom' };
      }
    }

    // Traços de Elite: Vampiric e Mana Burn
    let vampiricHeal = 0;
    let manaBurnAmt = 0;
    if (ai.eliteTraits && ai.eliteTraits.includes('vampiric')) {
      vampiricHeal = 0.25; // 25% do dano final absorvido
    }
    if (ai.eliteTraits && ai.eliteTraits.includes('mana_burn')) {
      manaBurnAmt = Math.floor(Math.random() * 20) + 20; // queima 20-40 MP
    }

    return {
      atkType,
      baseAtk: rawAtk,
      isCrit,
      critMultiplier,
      spellName,
      spellVfx,
      appliedDebuff,
      vampiricHeal,
      manaBurnAmt
    };
  },

  /**
   * Retorna a configuração de Dificuldade de Caça atual.
   */
  getDifficulty(state) {
    const diffId = (state && state.huntingDifficulty) ? state.huntingDifficulty : 'normal';
    const conf = HUNTING_DIFFICULTIES[diffId] || HUNTING_DIFFICULTIES.normal;
    const playerLvl = (state && state.level) || 1;

    // Se o jogador não tiver o nível mínimo da dificuldade, recua em segurança para normal
    if (playerLvl < conf.minLvl) {
      return HUNTING_DIFFICULTIES.normal;
    }
    return conf;
  },

  /**
   * Altera a dificuldade de caça verificando os requisitos de nível.
   */
  setDifficulty(state, diffId) {
    if (!state) return { success: false, reason: '狀態無效' };
    const targetDiff = HUNTING_DIFFICULTIES[diffId];
    if (!targetDiff) return { success: false, reason: '找不到此難度' };

    const playerLvl = state.level || 1;
    if (playerLvl < targetDiff.minLvl) {
      return {
        success: false,
        reason: `需要等級 ${targetDiff.minLvl} 才能解鎖難度「${targetDiff.name}」！`
      };
    }

    state.huntingDifficulty = diffId;
    return {
      success: true,
      difficulty: targetDiff
    };
  },

  /**
   * Aplica multiplicadores de dificuldade aos stats do monstro ao spawnar.
   */
  applyDifficultyToMonster(monster, difficulty) {
    if (!monster || !difficulty) return;
    const diff = difficulty || HUNTING_DIFFICULTIES.normal;

    const finalHp = Math.floor(monster.hp * diff.hpMult);
    monster.hp = finalHp;
    monster._maxHp = finalHp;
    monster.atk = Math.floor(monster.atk * diff.atkMult);
    monster.def = Math.floor(monster.def * diff.defMult);
    if (monster.matk) monster.matk = Math.floor(monster.matk * diff.atkMult);
    if (monster.mdef) monster.mdef = Math.floor(monster.mdef * diff.defMult);

    monster.xp = Math.floor(monster.xp * diff.xpMult);
    monster.gold = [
      Math.floor((monster.gold[0] || 5) * diff.goldMult),
      Math.floor((monster.gold[1] || 15) * diff.goldMult)
    ];
    monster.difficulty = diff.id;
  }
};
