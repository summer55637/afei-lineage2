// ═══════════════════════════════════════════
// SKILLS — Buffs & Harmonies (Self-Buff, Party-Buff, Warcry)
// ═══════════════════════════════════════════

export const BUFF_SKILLS = {
  fighter_will: {
    id: "fighter_will",
    name: "戰士意志",
    type: "buff",
    rarity: "1★",
    cost: 5,
    max: 5,
    reqLvl: 1,
    tier: 0,
    icon: "⚔️✨",
    effect: "warcry",
    baseCd: 60000,
    info: "+15% 物理攻擊、+10% 攻擊速度、+15 移動速度（20 分鐘）。"
  },
  mage_will: {
    id: "mage_will",
    name: "法師意志",
    type: "buff",
    rarity: "1★",
    cost: 5,
    max: 5,
    reqLvl: 1,
    tier: 0,
    icon: "🔮✨",
    effect: "warcry",
    baseCd: 60000,
    info: "+15% 魔法攻擊、+10% 施法速度、+50 最大魔力（20 分鐘）。"
  },
  war_cry: {
    id: "war_cry",
    name: "戰吼",
    type: "buff",
    rarity: "2★",
    cost: 25,
    max: 5,
    reqLvl: 40,
    tier: 2,
    icon: "📯",
    effect: "warcry",
    baseCd: 60000,
    info: "60 秒內暫時提升 20% 物理攻擊。"
  },
  battle_roar: {
    id: "battle_roar",
    name: "戰鬥咆哮",
    type: "buff",
    rarity: "2★",
    cost: 20,
    max: 5,
    reqLvl: 40,
    tier: 1,
    icon: "📯💥",
    effect: "warcry",
    baseCd: 60000,
    info: "恢復 20% 生命值，並暫時提高最大生命值。"
  },
  gladiators_harmony: {
    id: "gladiators_harmony",
    name: "鬥士和諧",
    type: "buff",
    rarity: "2★",
    cost: 10,
    max: 5,
    reqLvl: 40,
    tier: 1,
    icon: "⚔️⚔️✨",
    effect: "warcry",
    baseCd: 60000,
    info: "雙刀物理攻擊 +25%、暴擊傷害 +20%、攻擊速度 +15%（20 分鐘）。"
  },
  paladins_harmony: {
    id: "paladins_harmony",
    name: "聖騎士和諧",
    type: "buff",
    rarity: "2★",
    cost: 10,
    max: 5,
    reqLvl: 40,
    tier: 1,
    icon: "🛡️✨",
    effect: "warcry",
    baseCd: 60000,
    info: "物理防禦 +30%、魔法防禦 +30%、盾牌格擋 +40%、最大生命值 +25%（20 分鐘）。"
  },
  haste_buff: {
    id: "haste_buff",
    name: "加速術",
    type: "buff",
    rarity: "2★",
    cost: 15,
    max: 5,
    reqLvl: 40,
    tier: 1,
    icon: "⚡",
    effect: "warcry",
    baseCd: 600000,
    info: "使隊伍攻擊速度提高 30%，持續 10 分鐘。"
  },
  might_buff: {
    id: "might_buff",
    name: "力量強化",
    type: "buff",
    rarity: "2★",
    cost: 15,
    max: 5,
    reqLvl: 40,
    tier: 1,
    icon: "💪",
    effect: "warcry",
    baseCd: 600000,
    info: "使隊伍物理攻擊提高 20%，持續 10 分鐘。"
  }
};
