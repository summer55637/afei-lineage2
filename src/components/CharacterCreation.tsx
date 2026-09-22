import React, { useState } from 'react';
import { checkNicknameAvailability } from '../firebase';
import { getClassIcon } from '../services/IconService';

export interface CharacterCreationData {
  charName: string;
  race: string;
  className: string;
  gender: 'M' | 'F';
}

interface CharacterCreationProps {
  onComplete: (data: CharacterCreationData) => void;
  onCancel?: () => void;
  isChangeScroll?: boolean;
  initialCharName?: string;
  initialRace?: string;
  initialClass?: string;
  initialGender?: 'M' | 'F';
}

const RACES_INFO: Record<string, {
  id: string;
  name: string;
  icon: string;
  desc: string;
  perks: string[];
  allowedClasses: { id: string; name: string; desc: string; icon: string }[];
  image: Record<string, { M: string; F: string }>;
  startZoneName: string;
}> = {
  human: {
    id: 'human',
    name: '人類',
    icon: '🧑‍🌾',
    desc: '在各種戰鬥與魔法領域都相當均衡且靈活。',
    perks: ['⚔️ 物理能力均衡', '🛡️ 優秀的適應能力', '🏰 從說話之島開始'],
    allowedClasses: [
      { id: 'fighter', name: '戰士', desc: '使用劍與盾進行近戰，並擁有較高的生存能力。', icon: '⚔️' },
      { id: 'mage', name: '法師', desc: '擅長元素魔法，並擁有充足的魔力。', icon: '🔮' },
      { id: 'human_deathknight_0', name: '死亡騎士 💀', desc: '以黑暗能量與冰冷斬擊作戰的死亡騎士。', icon: '💀' },
      { id: 'werewolf_0', name: '狼人 🐺', desc: '憑藉野性本能與恢復能力戰鬥的兇猛近戰者。', icon: '🐺' },
      { id: 'secret_assassin_male_0', name: '刺客 🗡️', desc: '使用高速匕首與暗影分身的致命刺客。', icon: '🗡️' }
    ],
    image: {
      fighter: { M: '/img/m_humanfighter.jpg', F: '/img/f_humanfighter.jpg' },
      warrior: { M: '/img/m_humanwarrior.jpg', F: '/img/f_humanwarrior.jpg' },
      knight: { M: '/img/m_humanknight.jpg', F: '/img/f_humanknight.jpg' },
      rogue: { M: '/img/m_humanrogue.jpg', F: '/img/f_humanrogue.jpg' },
      mage: { M: '/img/m_humanmistyc.jpg', F: '/img/f_humanmistyc.jpg' },
      wizard: { M: '/img/m_humanwizard.jpg', F: '/img/f_humanwizard.jpg' },
      cleric: { M: '/img/m_cleric.jpg', F: '/img/f_cleric.jpg' },
      human_deathknight_0: { M: '/img/m_darkavenger.jpg', F: '/img/f_darkavenger.jpg' },
      deathPilgrim: { M: '/img/m_darkavenger.jpg', F: '/img/f_darkavenger.jpg' },
      werewolf_0: { M: '/img/m_humanwarrior.jpg', F: '/img/f_humanwarrior.jpg' },
      wargBase: { M: '/img/m_humanwarrior.jpg', F: '/img/f_humanwarrior.jpg' },
      secret_assassin_male_0: { M: '/img/m_treasurehunter.jpg', F: '/img/f_treasurehunter.jpg' },
      assassinS0: { M: '/img/m_treasurehunter.jpg', F: '/img/f_treasurehunter.jpg' },
      assassinBase: { M: '/img/m_treasurehunter.jpg', F: '/img/f_treasurehunter.jpg' }
    },
    startZoneName: '說話之島'
  },
  elf: {
    id: 'elf',
    name: '精靈',
    icon: '🧝‍♂️',
    desc: '受到伊娃女神祝福，優雅而且極為敏捷。',
    perks: ['🍃 +8 基礎迴避', '⚡ 高移動速度', '🏝️ 從說話之島開始（等級 1）'],
    allowedClasses: [
      { id: 'elven_fighter', name: '精靈戰士', desc: '兼具優雅防守與高速弓術，擁有致命的精準度。', icon: '🏹' },
      { id: 'elven_mage', name: '精靈法師', desc: '擅長水系魔法、神聖之光與快速支援。', icon: '🌊' },
      { id: 'elf_deathknight_0', name: '死亡騎士 💀', desc: '擅長迴避與冰刃攻擊的精靈死亡騎士。', icon: '💀' }
    ],
    image: {
      elven_fighter: { M: '/img/elfwswM.png', F: '/img/elfswsF.png' },
      elven_mage: { M: '/img/elfmageM.png', F: '/img/elfmageF.png' },
      elf_deathknight_0: { M: '/img/elfwswM.png', F: '/img/elfswsF.png' },
      elfFighter: { M: '/img/elfwswM.png', F: '/img/elfswsF.png' },
      elfMage: { M: '/img/elfmageM.png', F: '/img/elfmageF.png' },
      fighter: { M: '/img/elfwswM.png', F: '/img/elfswsF.png' },
      mage: { M: '/img/elfmageM.png', F: '/img/elfmageF.png' }
    },
    startZoneName: '說話之島'
  },
  darkelf: {
    id: 'darkelf',
    name: '黑暗精靈',
    icon: '🧝‍♀️',
    desc: '席琳的黑暗魔法大師，擅長強力暴擊。',
    perks: ['🔥 +15 攻擊與魔法威力', '🗡️ 高暴擊威力', '🏝️ 從說話之島開始（等級 1）'],
    allowedClasses: [
      { id: 'dark_fighter', name: '黑暗精靈戰士', desc: '專精暴擊傷害的致命刺客與黑暗騎士。', icon: '🗡️' },
      { id: 'dark_mage', name: '黑暗精靈法師', desc: '擅長詛咒、火焰與黑暗魔法的高爆發施法者。', icon: '🔮' },
      { id: 'delf_deathknight_0', name: '死亡騎士 💀', desc: '精通黑暗魔法的黑暗精靈死亡騎士。', icon: '💀' },
      { id: 'secret_assassin_female_0', name: '刺客 🗡️', desc: '使用毒素與暴擊的致命暗影刺客。', icon: '🗡️' },
      { id: 'rose_vain_0', name: '血玫瑰 🌹', desc: '侍奉席琳的神秘施法者，使用黑荊棘魔法與吸血能力。', icon: '🌹' }
    ],
    image: {
      dark_fighter: { M: '/img/darkelfskM.png', F: '/img/darkelfskF.png' },
      dark_mage: { M: '/img/darkelfmageM.png', F: '/img/darkelfmageF.png' },
      delf_deathknight_0: { M: '/img/darkelfskM.png', F: '/img/darkelfskF.png' },
      secret_assassin_female_0: { M: '/img/darkelfskM.png', F: '/img/darkelfskF.png' },
      rose_vain_0: { M: '/img/darkelfmageM.png', F: '/img/darkelfmageF.png' },
      darkElfFighter: { M: '/img/darkelfskM.png', F: '/img/darkelfskF.png' },
      darkElfMage: { M: '/img/darkelfmageM.png', F: '/img/darkelfmageF.png' },
      deathPilgrim: { M: '/img/darkelfskM.png', F: '/img/darkelfskF.png' },
      elfDeathPilgrim: { M: '/img/darkelfskM.png', F: '/img/darkelfskF.png' },
      assassinS0: { M: '/img/darkelfskM.png', F: '/img/darkelfskF.png' },
      assassinBase: { M: '/img/darkelfskM.png', F: '/img/darkelfskF.png' },
      bloodRoseBase: { M: '/img/darkelfmageM.png', F: '/img/darkelfmageF.png' },
      bloodRoseS1: { M: '/img/darkelfmageM.png', F: '/img/darkelfmageF.png' },
      fighter: { M: '/img/darkelfskM.png', F: '/img/darkelfskF.png' },
      mage: { M: '/img/darkelfmageM.png', F: '/img/darkelfmageF.png' }
    },
    startZoneName: '說話之島'
  },
  orc: {
    id: 'orc',
    name: '半獸人',
    icon: '👹',
    desc: '擁有驚人力量與強韌體魄的戰士種族。',
    perks: ['💪 +100 最大生命值（HP）', '🛡️ 長時間戰鬥耐久', '🏝️ 從說話之島開始（等級 1）'],
    allowedClasses: [
      { id: 'orc_fighter', name: '半獸人戰士', desc: '使用雙手斧與狂暴之力作戰的破壞者。', icon: '🪓' },
      { id: 'orc_mage', name: '半獸人薩滿', desc: '使用戰鬥魔法與部族增益強化血量及耐力。', icon: '🔥' },
      { id: 'orc_rider_0', name: '先鋒騎士 🐉', desc: '擅長騎乘衝鋒與長槍突刺的半獸人騎士。', icon: '🐉' }
    ],
    image: {
      orc_fighter: { M: '/img/orcfighterM.png', F: '/img/orcfighterF.png' },
      orc_mage: { M: '/img/orc_mage.png', F: '/img/orc_mage.png' },
      orc_rider_0: { M: '/img/orcfighterM.png', F: '/img/orcfighterF.png' },
      orcFighter: { M: '/img/orcfighterM.png', F: '/img/orcfighterF.png' },
      orcMage: { M: '/img/orc_mage.png', F: '/img/orc_mage.png' },
      rider: { M: '/img/orcfighterM.png', F: '/img/orcfighterF.png' },
      orcRider: { M: '/img/orcfighterM.png', F: '/img/orcfighterF.png' },
      fighter: { M: '/img/orcfighterM.png', F: '/img/orcfighterF.png' },
      mage: { M: '/img/orc_mage.png', F: '/img/orc_mage.png' }
    },
    startZoneName: '說話之島'
  },
  dwarf: {
    id: 'dwarf',
    name: '矮人',
    icon: '⚒️',
    desc: '鍛造大師，擅長採礦與製作物品。',
    perks: ['🎒 +100 背包欄位', '⚒️ 製作與素材掉落加成', '🏝️ 從說話之島開始（等級 1）'],
    allowedClasses: [
      { id: 'dwarven_fighter', name: '工匠', desc: '擅長打造武器、重型防具與戰鎚。', icon: '⚒️' },
      { id: 'shineMakerBase', name: '光輝工匠 ✨', desc: '掌握水晶之光、神聖支援與光輝戰鎚的工匠。', icon: '✨' }
    ],
    image: {
      dwarven_fighter: { M: '/img/dwarfmaestroM.png', F: '/img/dwarfmaestroF.png' },
      dwarfFighter: { M: '/img/dwarfmaestroM.png', F: '/img/dwarfmaestroF.png' },
      artisan: { M: '/img/dwarfmaestroM.png', F: '/img/dwarfmaestroF.png' },
      fighter: { M: '/img/dwarfmaestroM.png', F: '/img/dwarfmaestroF.png' },
      shinemakerS1: { M: '/img/dwarfmaestroM.png', F: '/img/dwarfmaestroF.png' },
      shineMakerBase: { M: '/img/dwarfmaestroM.png', F: '/img/dwarfmaestroF.png' }
    },
    startZoneName: '說話之島'
  },
  kamael: {
    id: 'kamael',
    name: '闇天使',
    icon: '🪶',
    desc: '單翼種族，精通高速刀刃與細劍。',
    perks: ['⚡ 使用輕型防具', '🗡️ 超高速物理攻擊', '🏝️ 從說話之島開始（等級 1）'],
    allowedClasses: [
      { id: 'jin_kamael_soldier', name: '闇天使戰士', desc: '擅長細劍與靈魂吸收的暗影劍士。', icon: '🗡️' },
      { id: 'crow_0', name: '武士 ⛩️', desc: '精通古老武士刀與高速居合斬。', icon: '⛩️' }
    ],
    image: {
      jin_kamael_soldier: { M: '/img/kamaelshM.png', F: '/img/kamaelshF.png' },
      crow_0: { M: '/img/kamaelDM.png', F: '/img/kamaelDF.png' },
      kamaelSoldier: { M: '/img/kamaelshM.png', F: '/img/kamaelshF.png' },
      soulbreaker: { M: '/img/kamaelshM.png', F: '/img/kamaelshF.png' },
      fighter: { M: '/img/kamaelDM.png', F: '/img/kamaelDF.png' },
      samuraiBase: { M: '/img/kamaelDM.png', F: '/img/kamaelDF.png' },
      hatamoto: { M: '/img/kamaelDM.png', F: '/img/kamaelDF.png' }
    },
    startZoneName: '說話之島'
  },
  sylph: {
    id: 'sylph',
    name: '希爾芙',
    icon: '🔫',
    desc: '使用槍械操控風元素的遠程射手。',
    perks: ['💨 +12 迴避與速度', '🔫 元素遠程射手', '🏝️ 從說話之島開始（等級 1）'],
    allowedClasses: [
      { id: 'sylphid', name: '風暴槍手 🔫', desc: '使用高速槍械與風之射擊的元素射手。', icon: '🔫' }
    ],
    image: {
      sylphid: { M: '/img/sylphM.png', F: '/img/sylphF.png' },
      sylphGunner: { M: '/img/sylphM.png', F: '/img/sylphF.png' },
      fighter: { M: '/img/sylphM.png', F: '/img/sylphF.png' }
    },
    startZoneName: '說話之島'
  },
  highelf: {
    id: 'highelf',
    name: '高等精靈',
    icon: '✨',
    desc: '掌握神聖之光與元素奧義的高等精靈。',
    perks: ['🌟 +8 魔法與神聖防禦', '🛡️ 亞丁神聖守護者', '🏝️ 從說話之島開始（等級 1）'],
    allowedClasses: [
      { id: 'sacred_templar_0', name: '神聖聖殿騎士 🛡️', desc: '使用神聖護盾、堅不可摧的頂級守護坦克。', icon: '🛡️' },
      { id: 'spirit_0', name: '元素編織者 🌀', desc: '融合火、水、風三大元素的高階法師。', icon: '🌀' }
    ],
    image: {
      sacred_templar_0: { M: '/img/elfwswM.png', F: '/img/elfswsF.png' },
      spirit_0: { M: '/img/elfmageM.png', F: '/img/elfmageF.png' },
      divineTemplarBase: { M: '/img/elfwswM.png', F: '/img/elfswsF.png' },
      divineTemplarS1: { M: '/img/elfwswM.png', F: '/img/elfswsF.png' },
      elementWeaverBase: { M: '/img/elfmageM.png', F: '/img/elfmageF.png' },
      elementWeaverS1: { M: '/img/elfmageM.png', F: '/img/elfmageF.png' },
      fighter: { M: '/img/elfwswM.png', F: '/img/elfswsF.png' },
      mage: { M: '/img/elfmageM.png', F: '/img/elfmageF.png' }
    },
    startZoneName: '說話之島'
  },
  ertheia: {
    id: 'ertheia',
    name: '阿爾特亞',
    icon: '🌪️',
    desc: '受到賽哈之風與精靈眷顧的敏捷戰士與神秘施法者。',
    perks: ['🌪️ +10 基礎迴避', '🥊 武術與體術戰鬥', '🏰 從說話之島開始'],
    allowedClasses: [
      { id: 'marauderBase', name: '掠奪者／破壞者 🌪️', desc: '使用利爪、高速拳擊與旋風連段的近戰鬥士。', icon: '🥊' },
      { id: 'sayhaMageBase', name: '賽哈追尋者 🌀', desc: '召喚強風與賽哈守護精靈的召喚師。', icon: '🌀' }
    ],
    image: {
      marauderBase: { M: '/img/elfwswM.png', F: '/img/elfswsF.png' },
      marauder: { M: '/img/elfwswM.png', F: '/img/elfswsF.png' },
      sayhaMageBase: { M: '/img/elfmageM.png', F: '/img/elfmageF.png' },
      sayhaSeer: { M: '/img/elfmageM.png', F: '/img/elfmageF.png' },
      fighter: { M: '/img/elfwswM.png', F: '/img/elfswsF.png' },
      mage: { M: '/img/elfmageM.png', F: '/img/elfmageF.png' }
    },
    startZoneName: '說話之島'
  }
};

const RANDOM_NAMES = [
  'Astaroth', 'Valerius', 'Kaelen', 'Sylas', 'Lyrion',
  'Ignis', 'Morgana', 'Vaelin', 'Darian', 'Balthazar',
  'Thorne', 'Elysia', 'Gideon', 'Zephyr', 'Orion',
  'Aethelgard', 'Aerion', 'Caelum', 'Elowen', 'Fenris',
  'Galadriel', 'Isolden', 'Malakor', 'Naelis', 'Thalor',
  'Azrael', 'Belial', 'Kaelen', 'Malakor', 'Moros',
  'Nocturna', 'Oberon', 'Ravena', 'Soren', 'Vesper',
  'Aethelstan', 'Boran', 'Cassian', 'Draven', 'Eldrin',
  'Garrick', 'Kaelith', 'Ragnar', 'Valen', 'Varian',
  'Astraea', 'Celestia', 'Eridanus', 'Hesperos', 'Lyra',
  'Nebula', 'Solon', 'Tenebris', 'Vael', 'Zorion'
];

export const CharacterCreation: React.FC<CharacterCreationProps> = ({
  onComplete,
  onCancel,
  isChangeScroll = false,
  initialCharName = '',
  initialRace = 'human',
  initialClass = 'fighter',
  initialGender = 'M'
}) => {
  const [charName, setCharName] = useState(initialCharName);
  const [selectedRace, setSelectedRace] = useState(initialRace);
  const [selectedClass, setSelectedClass] = useState(initialClass);
  const [gender, setGender] = useState<'M' | 'F'>(initialGender);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const currentRaceObj = RACES_INFO[selectedRace] || RACES_INFO.human;

  const handleSelectRace = (raceId: string) => {
    setSelectedRace(raceId);
    const rInfo = RACES_INFO[raceId];
    if (rInfo && rInfo.allowedClasses.length > 0) {
      if (!rInfo.allowedClasses.some(c => c.id === selectedClass)) {
        setSelectedClass(rInfo.allowedClasses[0].id);
      }
    }
  };

  const handleGenerateRandomName = () => {
    if (isChangeScroll) return;
    setNameError(null);
    const idx = Math.floor(Math.random() * RANDOM_NAMES.length);
    setCharName(RANDOM_NAMES[idx]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError(null);
    const finalName = charName.trim();
    if (!finalName || finalName.length < 3) {
      setNameError('角色名稱至少需要 3 個字元。');
      return;
    }

    if (!isChangeScroll) {
      setIsChecking(true);
      try {
        const check = await checkNicknameAvailability(finalName);
        if (!check.available) {
          setNameError(check.reason || '這個名稱已被其他玩家使用。');
          setIsChecking(false);
          return;
        }
      } catch (err) {
        // Fallback
      } finally {
        setIsChecking(false);
      }
    }

    onComplete({
      charName: finalName,
      race: selectedRace,
      className: selectedClass,
      gender: gender
    });
  };

  // Pega a imagem baseada na classe e no gênero (com fallbacks de segurança)
  const currentImgObj = currentRaceObj.image[selectedClass] || currentRaceObj.image.fighter;
  const currentImg = currentImgObj?.[gender] || '/img/human_fighter.png';

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto min-h-[100dvh]">
      <div className="relative w-full max-w-4xl my-auto rounded-2xl border border-amber-500/30 bg-[#0b0e17] p-4 sm:p-6 shadow-2xl text-white max-h-[92dvh] overflow-y-auto">
        
        {/* Banner Header */}
        <div className="mb-6 text-center border-b border-amber-500/20 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1">
            {isChangeScroll ? '📜 種族與職業變更卷軸' : '✨ 天堂 II · 亞丁競技場'}
          </div>
          <h2 className="font-display text-2xl font-bold tracking-wide text-amber-100">
            {isChangeScroll ? '變更種族與職業' : '建立與自訂角色'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isChangeScroll
              ? '選擇新的種族與職業；角色名稱不會改變。'
              : '選擇角色名稱、性別、種族與初始職業，開始你的冒險。'}
          </p>
        </div>

        {isChangeScroll && (
          <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5 text-xs text-amber-200 flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-bold text-amber-300">重新專精提醒：</p>
              <p className="mt-0.5 text-amber-200/90 leading-relaxed">
                確認變更種族與職業後，<strong>所有技能都會重置</strong>，<strong>已花費的 SP 會全數返還</strong>，<strong>目前裝備會安全卸下</strong>並放回背包。
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Character Details & Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* 1. 角色名稱 */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                1. 角色名稱 {isChangeScroll && '（🔒 固定）'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={16}
                  value={charName}
                  onChange={(e) => {
                    setNameError(null);
                    if (!isChangeScroll) setCharName(e.target.value);
                  }}
                  disabled={isChangeScroll || isChecking}
                  placeholder="輸入你的角色名稱..."
                  className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold ${
                    nameError
                      ? 'bg-red-950/30 border-red-500/60 text-red-200 focus:border-red-400 focus:outline-none'
                      : isChangeScroll
                      ? 'bg-slate-900/90 border-slate-700 text-amber-300/80 cursor-not-allowed'
                      : 'bg-black/50 border-amber-500/30 text-amber-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400'
                  }`}
                  required
                />
                {!isChangeScroll && (
                  <button
                    type="button"
                    onClick={handleGenerateRandomName}
                    disabled={isChecking}
                    className="rounded-xl border border-amber-500/40 bg-amber-500/20 px-3 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition flex items-center gap-1.5 disabled:opacity-50"
                    title="隨機產生名稱"
                  >
                    🎲 隨機
                  </button>
                )}
              </div>
              {nameError && (
                <div className="mt-2 rounded-lg bg-red-500/15 border border-red-500/40 p-2 text-xs text-red-300 flex items-center gap-2 animate-shake">
                  <span className="text-sm">⚠️</span>
                  <span>{nameError}</span>
                </div>
              )}
            </div>

            {/* 2. Escolha do Gênero */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                2. 性別
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setGender('M')}
                  className={`flex-1 py-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition ${
                    gender === 'M'
                      ? 'border-blue-500 bg-blue-500/20 text-blue-200 ring-1 ring-blue-500/50'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-blue-500/40 hover:bg-blue-500/10'
                  }`}
                >
                  ♂️ 男性
                </button>
                <button
                  type="button"
                  onClick={() => setGender('F')}
                  className={`flex-1 py-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition ${
                    gender === 'F'
                      ? 'border-pink-500 bg-pink-500/20 text-pink-200 ring-1 ring-pink-500/50'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-pink-500/40 hover:bg-pink-500/10'
                  }`}
                >
                  ♀️ 女性
                </button>
              </div>
            </div>

            {/* 3. Escolha da Raça */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                3. 選擇種族 ({currentRaceObj.name})
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(RACES_INFO).map((r) => {
                  const isSelected = selectedRace === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleSelectRace(r.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/50 shadow-lg'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-amber-500/40 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-2xl mb-1">{r.icon}</span>
                      <span className="text-xs font-bold">{r.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Escolha da Classe Inicial */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                4. 初始職業
              </label>
              <div className="grid grid-cols-2 gap-3">
                {currentRaceObj.allowedClasses.map((cls) => {
                  const isSelected = selectedClass === cls.id;
                  return (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => setSelectedClass(cls.id)}
                      className={`p-3 rounded-xl border text-left transition ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/50'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-amber-500/40 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <img
                          src={getClassIcon(cls.id)}
                          alt={cls.name}
                          className="w-8 h-8 object-contain rounded-md bg-black/60 border border-amber-500/40 p-0.5 shadow-md shrink-0 transition-transform group-hover:scale-105"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling;
                            if (fallback) fallback.style.display = 'inline-block';
                          }}
                        />
                        <span className="text-lg hidden">{cls.icon}</span>
                        <span className="text-xs font-bold text-amber-300 leading-tight">{cls.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {cls.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Race Perks Summary */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs space-y-1">
              <span className="font-bold text-amber-300 block mb-1">✨ 種族加成：{currentRaceObj.name}:</span>
              {currentRaceObj.perks.map((perk, idx) => (
                <div key={idx} className="text-slate-300 text-[11px]">
                  • {perk}
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Live Portrait & Summary (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
            
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
                角色預覽
              </div>

              {/* Character Card / Artwork */}
              <div className="relative mx-auto w-48 h-56 rounded-xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-black/60 to-black p-2 flex flex-col items-center justify-center shadow-xl overflow-hidden group">
                <img
                  key={`${selectedRace}_${selectedClass}_${gender}_${currentImg}`}
                  src={currentImg}
                  alt={currentRaceObj.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.src = '/img/humanpalaM.png';
                    img.style.display = 'block';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 inset-x-2 text-center">
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wide drop-shadow">
                    {charName || '角色'}
                  </span>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="mt-4 text-xs space-y-1.5 border-t border-white/10 pt-3 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400">性別：</span>
                  <span className="font-bold text-amber-200">{gender === 'M' ? '男性 ♂️' : '女性 ♀️'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">種族：</span>
                  <span className="font-bold text-amber-200">{currentRaceObj.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">職業：</span>
                  <span className="font-bold text-amber-200 flex items-center gap-1.5">
                    <img
                      src={getClassIcon(selectedClass)}
                      alt={selectedClass}
                      className="w-5 h-5 object-contain rounded bg-black/60 border border-amber-500/40 p-0.5"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span>{currentRaceObj.allowedClasses.find(c => c.id === selectedClass)?.name || selectedClass}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">初始區域：</span>
                  <span className="font-bold text-slate-200">{currentRaceObj.startZoneName}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2">
              <button
                type="submit"
                disabled={isChecking}
                className="w-full rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 py-3 text-sm font-bold uppercase tracking-wider text-black shadow-lg hover:from-amber-500 hover:to-yellow-400 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChecking ? '⏳ 正在檢查名稱是否可用...' : '✨ 建立角色並進入亞丁'}
              </button>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-semibold text-slate-400 hover:bg-white/10 hover:text-white transition"
                >
                  取消
                </button>
              )}
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}

export default function App() {
  const [created, setCreated] = useState<CharacterCreationData | null>(null);

  if (created) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0e17] p-4 text-white text-center">
        <div className="max-w-md w-full rounded-2xl border border-amber-500/30 bg-black/50 p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">角色建立完成！</h2>
          <pre className="text-left text-amber-100 bg-black/80 p-4 rounded-xl border border-white/10 text-sm overflow-x-auto">
            {JSON.stringify(created, null, 2)}
          </pre>
          <button 
            onClick={() => setCreated(null)}
            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-black font-bold uppercase tracking-wider rounded-xl transition shadow-lg"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <CharacterCreation 
      onComplete={(data) => setCreated(data)} 
    />
  );
}
