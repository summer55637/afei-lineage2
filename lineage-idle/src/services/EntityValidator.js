/**
 * EntityValidator.js — Validador Estrito de Entidades, Invariantes e Imutabilidade
 * Versão do motor lineage-idle.
 */

export class EntityValidator {
  static IMMUTABLE_CHARACTER_FIELDS = [
    'ownerUid',
    'accountId',
    'characterId',
    'entityType',
    'playerType',
    'createdAt'
  ];

  static validateEntityType(entityType) {
    return ['player', 'bot', 'npc', 'monster'].includes(String(entityType));
  }

  static validatePlayerType(playerType) {
    return ['real', 'bot'].includes(String(playerType));
  }

  static validateCharacter(char) {
    const errors = [];
    if (!char || typeof char !== 'object') {
      return { valid: false, errors: ['角色資料為空或無效。'] };
    }
    if (!char.characterId || typeof char.characterId !== 'string' || !char.characterId.trim()) {
      errors.push('characterId 為必要欄位，且不可為空。');
    }
    if (!char.ownerUid || typeof char.ownerUid !== 'string' || !char.ownerUid.trim()) {
      errors.push('ownerUid 為必要欄位。');
    }
    if (!char.name || typeof char.name !== 'string' || char.name.trim().length < 3) {
      errors.push('名稱至少需要 3 個字元。');
    }
    if (char.entityType !== 'player') {
      errors.push(`entityType 無效：${char.entityType}。預期值為 'player'。`);
    }
    if (char.playerType !== 'real' && char.playerType !== 'bot') {
      errors.push(`playerType 無效：${char.playerType}。預期值為 'real' 或 'bot'。`);
    }
    const level = Number(char.level);
    if (isNaN(level) || level < 1 || level > 120) {
      errors.push(`等級無效：${char.level}。允許範圍為 1～120。`);
    }
    return {
      valid: errors.length === 0,
      errors
    };
  }

  static assertImmutableFields(currentData, updateData) {
    if (!currentData || !updateData) return { allowed: true };
    for (const field of this.IMMUTABLE_CHARACTER_FIELDS) {
      if (field in updateData && updateData[field] !== undefined) {
        if (currentData[field] !== undefined && String(updateData[field]) !== String(currentData[field])) {
          return {
            allowed: false,
            violation: `禁止修改不可變更欄位：'${field}'，原值 '${currentData[field]}'，新值 '${updateData[field]}'。`
          };
        }
      }
    }
    return { allowed: true };
  }

  static validateRelationship(charAId, charBId) {
    if (!charAId || !charBId) {
      return { valid: false, reason: '關聯識別碼不可為空。' };
    }
    if (charAId === charBId) {
      return { valid: false, reason: '禁止自我關聯：角色不能與自己建立關聯。' };
    }
    return { valid: true };
  }

  static validateOwnership(char, authUid) {
    if (!char || !authUid) return false;
    return char.ownerUid === authUid;
  }
}
