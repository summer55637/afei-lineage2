/**
 * rarities.js — Escala Expandida de 11 Raridades do Aden Arena / MMORPG Hardcore.
 */

export const RARITIES = {
  common: {
    id: 'common',
    name: '普通',
    color: '#9e9e9e',
    glowColor: 'rgba(158, 158, 158, 0.2)',
    badge: '⚪ 普通',
    multiplier: 1.0
  },
  uncommon: {
    id: 'uncommon',
    name: '優良',
    color: '#4caf50',
    glowColor: 'rgba(76, 175, 80, 0.3)',
    badge: '🟢 優良',
    multiplier: 1.25
  },
  rare: {
    id: 'rare',
    name: '稀有',
    color: '#2196f3',
    glowColor: 'rgba(33, 150, 243, 0.4)',
    badge: '🔵 稀有',
    multiplier: 1.6
  },
  epic: {
    id: 'epic',
    name: '史詩',
    color: '#9c27b0',
    glowColor: 'rgba(156, 39, 176, 0.5)',
    badge: '🟣 史詩',
    multiplier: 2.2
  },
  legendary: {
    id: 'legendary',
    name: '傳說',
    color: '#ff9800',
    glowColor: 'rgba(255, 152, 0, 0.6)',
    badge: '🟡 傳說',
    multiplier: 3.0
  },
  mythic: {
    id: 'mythic',
    name: '神話',
    color: '#f44336',
    glowColor: 'rgba(244, 67, 54, 0.7)',
    badge: '🔴 神話',
    multiplier: 4.2
  },
  ancestral: {
    id: 'ancestral',
    name: '遠古',
    color: '#d4af37',
    glowColor: 'rgba(212, 175, 55, 0.75)',
    badge: '🟤 遠古',
    multiplier: 5.8
  },
  ascendant: {
    id: 'ascendant',
    name: '昇華',
    color: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.8)',
    badge: '💠 昇華',
    multiplier: 8.0
  },
  primordial: {
    id: 'primordial',
    name: '太古',
    color: '#e040fb',
    glowColor: 'rgba(224, 64, 251, 0.85)',
    badge: '🌌 太古',
    multiplier: 11.5
  },
  sovereign: {
    id: 'sovereign',
    name: '君王',
    color: '#ffd700',
    glowColor: 'rgba(255, 215, 0, 0.95)',
    badge: '👑 君王',
    multiplier: 16.0
  },
  absolute: {
    id: 'absolute',
    name: '絕對',
    color: '#ffffff',
    glowColor: 'linear-gradient(45deg, #ff0055, #00ffff, #ffff00)',
    badge: '♾️ 絕對',
    multiplier: 24.0
  }
};

/**
 * Retorna os efeitos de brilho e aura visual baseado no nível de encantamento.
 * @param {number} enchantLevel
 * @returns {{ auraClass: string, glowColor: string, label: string }}
 */
export function getEnchantVisuals(enchantLevel) {
  const enc = Math.max(0, parseInt(enchantLevel, 10) || 0);
  if (enc >= 20) {
    return { auraClass: 'aura-cosmic-godly', glowColor: '#00ffff', label: '絕對宇宙光環' };
  }
  if (enc >= 16) {
    return { auraClass: 'aura-crimson-fire', glowColor: '#ff1744', label: '熾烈緋紅火焰' };
  }
  if (enc >= 10) {
    return { auraClass: 'aura-golden-amber', glowColor: '#ffc107', label: '耀眼金光' };
  }
  if (enc >= 4) {
    return { auraClass: 'aura-blue-ice', glowColor: '#29b6f6', label: '冰藍光輝' };
  }
  return { auraClass: 'aura-none', glowColor: 'transparent', label: '一般' };
}
