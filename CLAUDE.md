# CLAUDE.md — 大分・由布院・福岡 旅遊紀錄（2026/2/25–3/2）

> 使用者以繁體中文溝通，回覆請一律使用繁體中文。

## 專案是什麼

**已經去過的旅行**做成的回憶錄網站：單一 `index.html`，GitHub Pages 從 `main` 分支根目錄發布
（`https://jerry940080.github.io/Oita_Fukoka_2026/`）。首頁 `https://jerry940080.github.io/` 會讀根目錄的 `trip.json` 把這趟列進總覽。

- 程式是從 `jerry940080/IzuAtami-trip`（2027 熱海・伊豆・靜岡）**當時最新版**複製來的，不是 skill 裡的舊參考版；
  所以電腦版左側目錄、手機 App 外殼、地圖「地區固定視角」、住宿分段版面都和熱海網站一樣。
  做法、資料格式、踩雷筆記看 `.claude/skills/trip-guide/` 和 IzuAtami-trip 的 CLAUDE.md。
- 資料來源：使用者給的行程 Excel（分頁：行程、住宿、行李、景點、餐廳、交通、行李箱寄送）。原檔沒放進 repo。
- **回憶錄模式**（使用者選的）：出發前才用得到的功能都拿掉——待辦／訂票（`BOOK=[]`、`BOOK_DT={}`）、天氣（`WX_LOC／WX_DAY` 清空）、
  記帳 trip-tools（手機底部「記帳」分頁、電腦 `#acct`、餐廳頁「家人推薦」、住宿每人每晚都拿掉）、雨備開關（`RAIN_STOPS={}`）、
  靜岡／熱海總覽（`areaHTML／izuHTML` 回傳空字串）。程式碼大多留著，只是資料清空或不顯示。
- 手機底部分頁：首頁／行程／地圖／資訊（住宿、景點、交通、餐廳）。電腦目錄：首頁、6 天、交通、餐廳、吃了什麼、住宿。

## 行程

| Day | 日期 | 內容 | 住 |
|---|---|---|---|
| 1 | 2/25 三 | 8:00 北門集合 → 桃園 12:00 → 大分 15:00 → 16:25 機場巴士 → 別府北濱 → 新鶴田飯店 → 味のあなば | 新鶴田飯店（別府） |
| 2 | 2/26 四 | 飯店早餐 → 退房寄行李 → 別府商店街 → 鰻の成瀬 → 14:00 龜之井巴士 36 → 由布院超市 → 入住、自己煮 | 由布院 Kawakami（sakura 房） |
| 3 | 2/27 五 | 自己煮早餐 → 金鱗湖、取票 → 退房 → Tabimusubi → 12:01 ゆふいんの森 → 日田租車：大山水壩、進擊的巨人本館、新館 → 18:12 ゆふいんの森 → 博多拿行李 → 入住 → 中洲屋台 | Chome Haruyoshi（天神南） |
| 4 | 2/28 六 | 休息 → 牛かつもと村 → 天神（Mandarake、Bookoff、Parco、Bic Camera）→ もつ鍋 一藤 | 同上 |
| 5 | 3/1 日 | 自己煮早餐 → 大濠公園・舞鶴公園 → 水炊き 鳥田 → 新幹線到小倉 あるあるCity → 回福岡 Shin-Shin → 唐吉訶德 → 一蘭 | 同上 |
| 6 | 3/2 一 | 自己煮早餐 → 退房 → 博多站放行李 → 午餐 → 14:00 去機場 → 福岡 16:55 → 桃園 18:30 | — |

## 資料怎麼放（和熱海網站同一套）

- 地點 `P／NAMES／GQ`、景點卡 `CARDS`（25 張，含 8 張餐廳卡）、行程 `STOPS`（唯一來源）、`DAYS`（標題、住宿、卡片順序）。
- 住宿 `STAY_RG`（別府／由布院／福岡三區，都已 `pick`）＋ `STAYS`。
- 餐廳 `RESTO`：Excel 餐廳分頁全部列進來，`in`＝排進行程的、`c`＝當時的候選。**候選沒有座標**（沒查證位置），名單上顯示「地圖上沒有位置」。
- 景點樹 `SPOT_TREE`：大分（別府／由布院／日田）、福岡（天神・中洲／公園・博多）、小倉。新增卡片要放進葉節點。
- 交通地圖 `TXREG／TXLEGS／TXSEG／TXDAY`；交通頁 `#tickets` 是手寫 HTML（交通明細表、日田公車替代方案、交通網站、每日交通 `.ldays`）。
- 地圖地區（固定視角）`MAP_REG`：台北・桃園、大分機場、別府、由布院、日田、福岡、小倉。
- 底圖：`LAND` 用 `make_geo.py --bbox 128.8,32.3,133.2,34.7 --src japan --tol 0.0006`（dataofjapan）；`LINES` 用 Natural Earth 鐵道（沒有路線名，`RAIL_OK` 一律放行，地鐵畫直線）。
- localStorage 前綴 `kyu-`；`sw.js` 快取 `kyu-v1`。

## 重要事實與未查證

- **座標全部是依地址或記憶估的**（誤差約 100–300 m），check.js 落海檢查都過（台北、桃園的警告是既有的：台灣畫在 `LAND_WIDE`）。
- 機場巴士、龜之井巴士、ゆふいんの森、日田租車、新幹線的時間與價錢取自 Excel 交通分頁；大山水壩 → 本館 → 新館的開車時間是估的。
- 航空公司 Excel 沒寫，網站只寫時間。10:00 桃園報到是估的。
- 「博多站拿行李」：Excel 有黑貓宅急便博多駅中央街營業所的資料，推測行李是從別府寄過去的。
- 評分（Google／Tabelog）、營業時間、價錢都是出發前查的。
- 同行人數依 JR 訂票「票數 2」推測是 2 人，網站上沒寫人數。

## 變更紀錄

### 2026-10-27 建立
- 從 IzuAtami-trip 複製 `index.html`、`sw.js`、`manifest.webmanifest`、`icons/`，換成九州資料並拿掉出發前功能（見上）。
- **`sw.js` 改成只刪 `kyu-` 開頭的舊快取**：原本的寫法會刪掉同網域所有不同名的快取，打開這個網站會把熱海網站的離線快取刪掉（IzuAtami-trip 也同步修正）。
- 圖示改成橘底溫泉符號（PIL 畫的）。
- `trip.json`：`cover` 先空著（首頁用顏色＋「九州」色塊），照片補上後放 `cover.jpg`。
- 驗證：`check.js` 全過；scratchpad `kyu/err.js`（電腦、手機零錯誤）、`kyu/shot.js`（截圖）。重建流程是 scratchpad `kyu/build.sh`（從 IzuAtami 複製 → 底圖 → data.py → edit2–6.py），之後直接改 `index.html` 就好，不用再跑。

## 待辦

1. **照片**：使用者會陸續傳。用 `python3 tools/addphotos.py <卡片 key> <圖檔…>`（從 IzuAtami-trip 複製的新版，照片存成 `img/` 獨立檔；skill 裡的 `scripts/addphotos.py` 是舊版，會把照片塞進 HTML，不要用）。
   住宿照片放 `IMG.tsuruta／kawakami／haruyoshi`，再把 `STAYS[].secs` 的照片索引補上。封面挑一張存 `cover.jpg`（640px）並填 `trip.json` 的 `cover`。
2. 使用者若記得實際去過的店、和 Excel 計畫不同的地方，改 `STOPS`、`RESTO`（`in`／`c`）。
3. GitHub Pages：Settings → Pages → Deploy from a branch → `main` / `(root)`。
