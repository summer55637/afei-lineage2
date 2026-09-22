# ⚔️ Aden Arena — Lineage Idle RPG

> 一款完整運行於網頁上的 **Lineage Idle RPG**，並支援 Progressive Web App（PWA）。專案使用 **React 19**、**Vite**、**TypeScript**、**Tailwind CSS**，搭配隔離於 Shadow DOM 中的 **Vanilla JS 遊戲引擎**，以及 **Firebase Realtime Database**，提供雲端同步與多人全球市場功能。

---

## 📑 目錄

1. [專案概覽](#-專案概覽)
2. [如何在本機執行](#-如何在本機執行)
3. [架構：React vs Engine](#-架構react-vs-engine)
4. [介面 UI 的黃金規則](#-介面-ui-的黃金規則)
5. [快速指南：各功能要修改哪裡](#-快速指南各功能要修改哪裡)
6. [完整資料夾結構](#-完整資料夾結構)
7. [遊戲核心機制](#-遊戲核心機制)
8. [指令與部署](#-指令與部署)

---

## 🎮 專案概覽

**Aden Arena** 將 **Lineage II** 經典的懷舊感與複雜數值系統，結合現代放置型 RPG（Idle RPG）的遊玩方式：

- **194 種職業與轉職路線**，具備完整且符合原作設定的職業樹。
- **846 個原作技能**，並驗證技能所需武器類型。
- **雙武器系統（Dual Arsenal System）**：可同時裝備 2 個武器欄位，屬性可疊加並觸發特殊共鳴。
- **姿態破壞條（Stagger）**：可打破 Boss 防禦姿態，並觸發 2.0 倍傷害倍率。
- **全球即時市場**：透過 Firebase 讓玩家彼此買賣物品。
- **高可靠自動存檔**：LocalStorage 本機存檔 + Firebase 雲端存檔，搭配防複製與交易保護。
- **3 種遊戲顯示模式**：
  1. **Idle Game（主要模式）**：完整介面，風格參考經典 Lineage II 客戶端。
  2. **2D Pixel RPG**：以 HTML5 Canvas 製作的復古自動戰鬥模式，使用 spritesheet。
  3. **3D Arena**：以 Three.js 製作的生存／動作模式。

---

## 🚀 如何在本機執行

### 前置需求

- **Node.js**：18 以上版本，建議使用 20+ LTS。
- **npm**，或 **pnpm / yarn**。

```bash
# 1. Clone 專案
git clone https://github.com/Triistan93/adenarena.git
cd adenarena

# 2. 安裝相依套件
npm install

# 3. 啟動開發伺服器
npm run dev
```

接著在瀏覽器開啟：

`http://localhost:5173`

建立正式版 Build：

```bash
npm run build
```

---

## 🏛️ 架構：React vs Engine

本專案採用混合式高效能架構：

```text
┌─────────────────────────────────────────────────────────────────┐
│                       REACT APPLICATION                         │
│   src/App.tsx · src/components/ · 驗證系統 · Modal 視窗          │
└───────────────────────────────┬─────────────────────────────────┘
                                │ 透過 Shadow DOM 掛載
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     VANILLA JS GAME ENGINE                      │
│   lineage-idle/main.js · src/engine/ · src/services/ · 60 FPS   │
└───────────────────────────────┬─────────────────────────────────┘
                                │ 即時同步
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FIREBASE CLOUD DATABASE                      │
│   全球 P2P 市場 · 雲端存檔 · 多人排行榜                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚠️ 介面 UI 的黃金規則

> [!IMPORTANT]
> **遊戲主介面 100% 定義於 `src/idle/markup.ts`！**
>
> 遊戲執行時，主要介面的 HTML 只會從以下檔案載入：
>
> 👉 `src/idle/markup.ts`
>
> 任何新的按鈕、分頁、Modal 視窗或裝備欄位，都應直接新增到 **`src/idle/markup.ts`**。
>
> 舊版靜態 HTML 已移至 `legado/`，避免誤改到不再使用的舊檔案。

---

## 📍 快速指南：各功能要修改哪裡

| 想修改的內容 | 主要檔案 | 次要檔案 |
|---|---|---|
| **遊戲 HTML 結構** | `src/idle/markup.ts` | `src/idle/IdleGame.tsx` |
| **全域樣式與主題** | `lineage-idle/style.css` | `lineage-idle/src/ui/GameUI.css` |
| **戰鬥與攻擊循環** | `lineage-idle/src/engine/CombatEngine.js` | `lineage-idle/main.js` |
| **Stagger／姿態破壞** | `lineage-idle/src/engine/StaggerEngine.js` | `lineage-idle/src/ui/GameUI.js` |
| **Dual Arsenal（雙武器欄）** | `lineage-idle/src/services/EquipmentService.js` | `lineage-idle/src/engine/StatsEngine.js` |
| **武器共鳴** | `lineage-idle/src/services/WeaponResonanceService.js` | `lineage-idle/src/ui/GameUI.js` |
| **技能與武器需求驗證** | `lineage-idle/src/engine/SkillEngine.js` | `lineage-idle/data/echo-adapter.js` |
| **轉職（Lv 20、40、76）** | `lineage-idle/main.js`（`openClassTransferModal`） | `lineage-idle/src/services/CharacterService.js` |
| **角色建立** | `src/components/CharacterCreation.tsx` | `lineage-idle/src/data/races.js` |
| **背包與裝備** | `lineage-idle/src/services/InventoryService.js` | `lineage-idle/src/services/EquipmentService.js` |
| **能力值計算（Stats）** | `lineage-idle/src/engine/StatsEngine.js` | `lineage-idle/src/engine/BalanceEngine.js` |
| **怪物與 Spawn** | `lineage-idle/src/data/monsters.js` | `lineage-idle/src/data/raids.js` |
| **區域與地圖** | `lineage-idle/src/data/zones.js` | `lineage-idle/art.js` |
| **全球市場與 Firebase** | `src/firebase.ts` | `lineage-idle/src/services/MarketService.js` |
| **存檔系統** | `lineage-idle/main.js`（`saveGameState`） | `lineage-idle/src/engine/SecurityEngine.js` |
| **職業與怪物圖片** | `lineage-idle/art.js` | `public/img/` |
| **2D Pixel 模式** | `src/pixel2d/Aden2DGame.tsx` | `public/assets/2d/` |

---

## 📁 完整資料夾結構

### 1. 主要目錄總覽

```text
adenarena/
├── public/          # Vite 提供的靜態資源（圖片、sprites、圖示）
├── src/             # React 前端（Modal、登入、Markup、2D／3D 模式）
├── lineage-idle/    # 完整遊戲引擎（戰鬥、能力值、邏輯、資料）
├── legado/          # 歷史檔案與舊版 mockup（僅供參考）
├── api/             # Serverless Webhooks（Vercel）
└── dist/            # 正式版 Build 輸出
```

---

### 2. `src/` 詳細說明（React 層）

| 路徑 | 說明 |
|---|---|
| `src/App.tsx` | React 入口，負責畫面路由與模式選擇（Idle、2D、3D）。 |
| `src/firebase.ts` | Firebase Authentication 與 Realtime Database 連線，供市場與存檔使用。 |
| `src/components/` | React 畫面：`LoginScreen.tsx`、`AuthModal.tsx`、`CharacterCreation.tsx`。 |
| `src/idle/markup.ts` | **UI 核心檔案**：包含注入 Shadow DOM 的完整主介面 HTML。 |
| `src/idle/IdleGame.tsx` | Bridge 元件，用來初始化並管理 Shadow DOM 內的遊戲引擎。 |
| `src/pixel2d/Aden2DGame.tsx` | 使用 HTML5 Canvas 製作的 2D 復古自動戰鬥模式，並與遊戲狀態共用資料。 |
| `src/game/` | Three.js 3D Arena 模式（`Game.ts`、`models.ts`）。 |

---

### 3. `lineage-idle/` 詳細說明（遊戲引擎）

| 子資料夾／檔案 | 遊戲中的功能 |
|---|---|
| `main.js` | 遊戲引擎核心、遊戲 Loop、點擊事件與存檔。 |
| `art.js` | 角色 Avatar（`heroSVG`）與怪物圖像（`monsterSVG`）渲染系統。 |
| `style.css` | 官方主要樣式表，採用經典 Lineage II 風格。 |
| `src/engine/` | 數值引擎：`CombatEngine`、`StatsEngine`、`SkillEngine`、`StaggerEngine`、`LevelEngine`。 |
| `src/services/` | 服務層：`EquipmentService`、`WeaponResonanceService`、`InventoryService`、`MarketService`、`CraftService`、`DyeService`、`PetService`。 |
| `src/data/` | 怪物（`monsters.js`）、Raid（`raids.js`）、區域（`zones.js`）與物品資料（`items/`）。 |
| `data/echo-adapter.js` | 產生全部 **846 個技能**與 **194 條職業樹**的資料來源。 |

---

### 4. `public/` 詳細說明（資源與圖片）

| 資料夾 | 內容 |
|---|---|
| `public/img/` | **119 張怪物圖片**（`mon_*.jpg`）與 **36 張男女職業高解析度圖片**。 |
| `public/assets/2d/` | 角色 spritesheet（Knight、Rogue 等）與 2D 戰鬥場景。 |
| `public/assets/skills/` | 技能與魔法圖示。 |

---

### 5. `legado/` 詳細說明（僅供參考）

| 資料夾／檔案 | 說明 |
|---|---|
| `legado/lineage-idle/index.html` | 舊版 standalone 靜態 HTML mockup，現已由 `src/idle/markup.ts` 取代。 |
| `legado/lineage-idle/public/` | Vite 重構前的舊資源副本。 |
| `legado/scripts/` | 模組化前使用的圖示同步腳本（`sync-icons.js`、`validate-icons.js`）。 |
| `legado/scratch/` | 約 90 個開發期間使用的稽核、測試與資料遷移腳本。 |

---

## ⚔️ 遊戲核心機制

### 1. Dual Arsenal 與武器共鳴

- 玩家可同時使用兩個武器欄：**武器 1（`weapon`）**與 **武器 2（`weapon2`）**。
- 兩把武器都會累加屬性（P.Atk、M.Atk）、Soul Crystal（SA）、強化值（+1 ～ +16）以及 Augmentation。
- 特定武器搭配會觸發**武器共鳴**，例如：
  - 弓 + 匕首 = 影之獵人
  - 雙刀 + 長槍 = 風暴領主
- 技能引擎（`SkillEngine.js`）會檢查兩個已裝備武器欄，只要任一武器符合技能需求即可使用。

### 2. 姿態破壞條（Stagger）

- Boss、Elite 與 Raid 怪物，在 HP 下方會顯示黃色姿態條。
- 物理攻擊、暴擊與衝擊型魔法會降低姿態值。
- 姿態值降到 0 時會觸發 **BREAK**：
  - 怪物會被暫時控制，5 秒內無法反擊。
  - 期間受到 **2.0 倍傷害**。

### 3. 轉職與血統傳承（Lv. 20、40、76）

- 達到指定等級時，會開啟轉職 Modal，顯示各條完整職業路線與圖片。
- 玩家最多可保留前一職業的 **2 個技能**，使其成為永久被動能力。
- 已投入的 SP 會 100% 返還，供新職業重新配置。

### 4. 全球即時市場

- 玩家可以使用 Adena 或 Gold Coins 彼此買賣物品。
- 購買流程使用 Firebase 原子交易鎖，避免物品重複取得。
- 玩家離線期間完成的交易，會在下次登入時自動入帳。

---

## 🛠️ 指令與部署

```bash
# 啟動本機開發伺服器
npm run dev

# 驗證 TypeScript 並建立正式版 Build
npm run build

# 在本機預覽正式版 Build
npm run preview
```

### 自動部署（CI/CD）

此專案已整合 **Vercel**。

每次將 commit 推送到 `main` 分支後，都會自動觸發正式環境部署：

```bash
git add .
git commit -m "feat: 你的修改內容"
git push origin main
```

---

⚔️ *願殷海薩的祝福與格蘭肯的怒火，指引你在亞丁世界中的每一行程式碼！*
