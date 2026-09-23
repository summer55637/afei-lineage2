/**
 * SocialIntegrityService.ts — Camada de Integridade Social do Aden Arena
 *
 * Responsável pela coordenação de Amizades, Mentoria e Bloqueios,
 * garantindo atomicidade, inexistência de entidades sintéticas e aplicação
 * estrita das regras de negócio.
 */

import {
  db,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from '../firebase';
import { PlayerRegistry, type CharacterEntity } from './PlayerRegistry';
import { EntityValidator } from './EntityValidator';

export interface FriendDisplay {
  characterId: string;
  name: string;
  level: number;
  classTitle: string;
  raceId: string;
  online: boolean;
  clanName: string;
}

export class SocialIntegrityService {
  /**
   * Constrói o ID único determinístico para amizades
   */
  private static getFriendshipId(charAId: string, charBId: string): string {
    return charAId < charBId ? `${charAId}_${charBId}` : `${charBId}_${charAId}`;
  }

  /**
   * Adiciona um amigo pelo nome (com validação estrita no banco)
   */
  static async addFriend(myCharId: string, targetName: string): Promise<FriendDisplay> {
    if (!myCharId) {
      throw new Error('未提供玩家識別資料。');
    }
    if (!targetName || !targetName.trim()) {
      throw new Error('請輸入有效的角色名稱。');
    }

    // 1. Resolve o alvo canonicamente pelo nome
    const target = await PlayerRegistry.getPlayerByName(targetName);
    if (!target) {
      const err = new Error(`亞丁世界中不存在角色「${targetName}」。`);
      (err as any).code = 'PLAYER_NOT_FOUND';
      throw err;
    }

    // 2. Garante que é um jogador real (Gate 4)
    if (target.playerType !== 'real') {
      const err = new Error(`「${targetName}」不是真實玩家。`);
      (err as any).code = 'REAL_PLAYER_REQUIRED';
      throw err;
    }

    // 3. Valida relacionamento (impede auto-amizade)
    const relCheck = EntityValidator.validateRelationship(myCharId, target.characterId);
    if (!relCheck.valid) {
      const err = new Error(relCheck.reason || '無效的社交關係。');
      (err as any).code = 'INVALID_RELATIONSHIP';
      throw err;
    }

    // 4. Cria o documento de amizade
    const friendshipId = this.getFriendshipId(myCharId, target.characterId);
    const friendRef = doc(db, 'friends', friendshipId);
    const friendSnap = await getDoc(friendRef);

    if (friendSnap.exists() && friendSnap.data()?.status === 'accepted') {
      const err = new Error(`你已經與「${target.name}」是好友。`);
      (err as any).code = 'ALREADY_FRIENDS';
      throw err;
    }

    await setDoc(friendRef, {
      friendshipId,
      characterAId: myCharId < target.characterId ? myCharId : target.characterId,
      characterBId: myCharId < target.characterId ? target.characterId : myCharId,
      status: 'accepted',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // 5. Consulta presença para status online
    let isOnline = false;
    try {
      const presSnap = await getDoc(doc(db, 'presence', target.characterId));
      if (presSnap.exists()) {
        isOnline = Boolean(presSnap.data()?.online);
      }
    } catch (e) {}

    return {
      characterId: target.characterId,
      name: target.name,
      level: target.level,
      classTitle: target.classId,
      raceId: target.raceId,
      online: isOnline,
      clanName: target.clanName || '無血盟'
    };
  }

  /**
   * Remove um amigo
   */
  static async removeFriend(myCharId: string, targetCharId: string): Promise<boolean> {
    if (!myCharId || !targetCharId) return false;
    try {
      const friendshipId = this.getFriendshipId(myCharId, targetCharId);
      await deleteDoc(doc(db, 'friends', friendshipId));
      return true;
    } catch (err) {
      console.warn('[SocialIntegrityService] Falha ao remover amigo:', err);
      return false;
    }
  }

  /**
   * Obtém a lista completa de amigos reais do jogador (sem N+1)
   */
  static async getFriends(myCharId: string): Promise<FriendDisplay[]> {
    if (!myCharId) return [];

    try {
      // 1. Busca amizades onde o herói é o participante A ou B
      const qA = query(
        collection(db, 'friends'),
        where('characterAId', '==', myCharId),
        where('status', '==', 'accepted')
      );
      const qB = query(
        collection(db, 'friends'),
        where('characterBId', '==', myCharId),
        where('status', '==', 'accepted')
      );

      const [snapA, snapB] = await Promise.all([getDocs(qA), getDocs(qB)]);
      const otherCharIds = new Set<string>();

      snapA.forEach((d) => {
        const data = d.data();
        if (data.characterBId && data.characterBId !== myCharId) {
          otherCharIds.add(data.characterBId);
        }
      });
      snapB.forEach((d) => {
        const data = d.data();
        if (data.characterAId && data.characterAId !== myCharId) {
          otherCharIds.add(data.characterAId);
        }
      });

      if (otherCharIds.size === 0) return [];

      // 2. Batch get dos personagens (Anti N+1)
      const characters = await PlayerRegistry.getPlayersBatch([...otherCharIds]);

      // 3. Consulta presenças em batch
      const presencePromises = characters.map(async (c) => {
        try {
          const pSnap = await getDoc(doc(db, 'presence', c.characterId));
          return { id: c.characterId, online: pSnap.exists() ? Boolean(pSnap.data()?.online) : false };
        } catch {
          return { id: c.characterId, online: false };
        }
      });
      const presences = await Promise.all(presencePromises);
      const presenceMap = new Map(presences.map(p => [p.id, p.online]));

      return characters.map((c) => ({
        characterId: c.characterId,
        name: c.name,
        level: c.level,
        classTitle: c.classId,
        raceId: c.raceId,
        online: presenceMap.get(c.characterId) || false,
        clanName: c.clanName || '無血盟'
      }));
    } catch (err) {
      console.warn('[SocialIntegrityService] Falha ao listar amigos:', err);
      return [];
    }
  }

  /**
   * Vincula um mentor oficial (Gate 8: Desacoplado de Referral)
   */
  static async bindMentorship(
    apprenticeCharId: string,
    apprenticeLevel: number,
    mentorName: string
  ): Promise<{ mentorName: string; mentorCharId: string }> {
    if (!apprenticeCharId || !mentorName) {
      throw new Error('導師資料不完整。');
    }
    if (apprenticeLevel > 20) {
      const err = new Error('只有等級 20 以下才能建立導師關係。');
      (err as any).code = 'LEVEL_TOO_HIGH';
      throw err;
    }

    // 1. Resolve o mentor
    const mentor = await PlayerRegistry.getPlayerByName(mentorName);
    if (!mentor) {
      const err = new Error(`亞丁世界中找不到導師「${mentorName}」。`);
      (err as any).code = 'PLAYER_NOT_FOUND';
      throw err;
    }

    if (mentor.playerType !== 'real') {
      const err = new Error(`「${mentorName}」不是真實玩家。`);
      (err as any).code = 'REAL_PLAYER_REQUIRED';
      throw err;
    }

    if (mentor.characterId === apprenticeCharId) {
      const err = new Error('你不能成為自己的導師。');
      (err as any).code = 'SELF_MENTOR_PROHIBITED';
      throw err;
    }

    if (mentor.level < 40) {
      const err = new Error(`導師至少需要等級 40（目前等級：${mentor.level}）。`);
      (err as any).code = 'MENTOR_LEVEL_LOW';
      throw err;
    }

    // 2. Cria documento de mentoria
    const mentorshipId = `mentor_${mentor.characterId}_${apprenticeCharId}`;
    const mentorRef = doc(db, 'mentorships', mentorshipId);
    await setDoc(mentorRef, {
      mentorshipId,
      mentorCharacterId: mentor.characterId,
      mentorName: mentor.name,
      apprenticeCharacterId: apprenticeCharId,
      apprenticeLevelAtStart: apprenticeLevel,
      status: 'active',
      graduated: false,
      rewardClaimedByMentor: false,
      rewardClaimedByApprentice: false,
      startedAt: serverTimestamp(),
      completedAt: null
    });

    return {
      mentorName: mentor.name,
      mentorCharId: mentor.characterId
    };
  }

  /**
   * Bloqueia um jogador
   */
  static async blockPlayer(myCharId: string, myOwnerUid: string, targetName: string): Promise<string> {
    const target = await PlayerRegistry.getPlayerByName(targetName);
    if (!target) {
      const err = new Error(`找不到玩家「${targetName}」。`);
      (err as any).code = 'PLAYER_NOT_FOUND';
      throw err;
    }
    if (target.characterId === myCharId) {
      throw new Error('你不能封鎖自己。');
    }

    const blockId = `block_${myCharId}_${target.characterId}`;
    await setDoc(doc(db, 'blocks', blockId), {
      blockId,
      characterId: myCharId,
      blockedCharacterId: target.characterId,
      blockedName: target.name,
      ownerUid: myOwnerUid,
      createdAt: serverTimestamp()
    });

    return target.name;
  }

  /**
   * Desbloqueia um jogador
   */
  static async unblockPlayer(myCharId: string, blockedName: string): Promise<boolean> {
    const target = await PlayerRegistry.getPlayerByName(blockedName);
    if (!target) return false;
    const blockId = `block_${myCharId}_${target.characterId}`;
    await deleteDoc(doc(db, 'blocks', blockId));
    return true;
  }

  /**
   * Lista jogadores bloqueados
   */
  static async getBlocked(myCharId: string): Promise<string[]> {
    if (!myCharId) return [];
    try {
      const q = query(collection(db, 'blocks'), where('characterId', '==', myCharId));
      const snap = await getDocs(q);
      const blocked: string[] = [];
      snap.forEach((d) => {
        const data = d.data();
        if (data.blockedName) blocked.push(data.blockedName);
      });
      return blocked;
    } catch (e) {
      return [];
    }
  }
}
