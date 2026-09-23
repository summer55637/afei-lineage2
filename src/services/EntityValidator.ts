/**
 * EntityValidator.ts — Validador Estrito de Entidades, Invariantes e Imutabilidade
 *
 * Garante que nenhuma entidade sintética/corrompida ingresse no sistema e que
 * os campos de identidade permaneçam imutáveis.
 */

export interface CharacterValidationResult {
  valid: boolean;
  errors: string[];
}

export class EntityValidator {
  static IMMUTABLE_CHARACTER_FIELDS = [
    'ownerUid',
    'accountId',
    'characterId',
    'entityType',
    'playerType',
    'createdAt'
  ] as const;

  /**
   * Valida o tipo de entidade (player, bot, npc, monster)
   */
  static validateEntityType(entityType: unknown): boolean {
    return ['player', 'bot', 'npc', 'monster'].includes(String(entityType));
  }

  /**
   * Valida o tipo de jogador (real, bot)
   */
  static validatePlayerType(playerType: unknown): boolean {
    return ['real', 'bot'].includes(String(playerType));
  }

  /**
   * Valida a integridade completa de um documento de personagem
   */
  static validateCharacter(char: any): CharacterValidationResult {
    const errors: string[] = [];

    if (!char || typeof char !== 'object') {
      return { valid: false, errors: ['角色資料不存在或無效。'] };
    }

    if (!char.characterId || typeof char.characterId !== 'string' || !char.characterId.trim()) {
      errors.push('characterId 為必填且不可為空。');
    }

    if (!char.ownerUid || typeof char.ownerUid !== 'string' || !char.ownerUid.trim()) {
      errors.push('ownerUid 為必填。');
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
      errors.push(`等級無效：${char.level}。允許範圍為 1 到 120。`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Garante que campos imutáveis não foram alterados durante um UPDATE
   */
  static assertImmutableFields(currentData: any, updateData: any): { allowed: boolean; violation?: string } {
    if (!currentData || !updateData) return { allowed: true };

    for (const field of this.IMMUTABLE_CHARACTER_FIELDS) {
      if (field in updateData && updateData[field] !== undefined) {
        if (currentData[field] !== undefined && String(updateData[field]) !== String(currentData[field])) {
          return {
            allowed: false,
            violation: `禁止修改不可變更欄位：'${field}'，原值 '${currentData[field]}'，新值 '${updateData[field]}'`
          };
        }
      }
    }

    return { allowed: true };
  }

  /**
   * Valida relacionamentos entre dois personagens (amizade, mentoria, duelo)
   */
  static validateRelationship(charAId: string, charBId: string): { valid: boolean; reason?: string } {
    if (!charAId || !charBId) {
      return { valid: false, reason: '關係識別資料不可為空。' };
    }
    if (charAId === charBId) {
      return { valid: false, reason: '禁止建立自身關係：角色不能與自己建立關係。' };
    }
    return { valid: true };
  }

  /**
   * Valida que o personagem pertence ao usuário autenticado
   */
  static validateOwnership(char: any, authUid: string | null): boolean {
    if (!char || !authUid) return false;
    return char.ownerUid === authUid;
  }
}
