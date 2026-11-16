# CLAUDE.md — 大分・由布院・福岡 旅遊紀錄（2026/2/25–3/2）

> 使用者以繁體中文溝通，回覆請一律使用繁體中文。

## 專案是什麼

**已經去過的旅行**做成的回憶錄網站：單一 `index.html`，GitHub Pages 從 `main` 分支根目錄發布
（`https://jerry940080.github.io/Oita_Fukoka_2026/`）。首頁 `https://jerry940080.github.io/` 會讀根目錄的 `trip.json` 把這趟列進總覽。

- **版面是「方案 F 相冊書」（2026-11-16 第二次重做，延續 B 的白底大字視覺）**：**一天一頁、一站一跨頁**。
  首頁＝封面＋六張日期卡；點一天進檢視器（`#viewer`，固定全螢幕）：電腦左照片右白色文字頁、底部底片條；手機整張照片、文字壓在下方、上方進度條、左右滑。
  交通段是獨立的一張「過場」：小地圖放大、`animateMap` 畫出那一段路線（只畫起訖兩點）；站點那一張右下（手機左上）有這天的小地圖，點了放大，目前的站紅圈。
  住宿、吃了什麼、交通、私人相簿、下次會不一樣的地方是 `#pages` 裡的獨立頁。電腦與手機同一套 DOM，只用 CSS 切版。
  資料區（`P／CARDS／STOPS／DAYS／STAYS／RESTO`）、行程工具（`foldGos／routeInfo／dayMapCfg／autoLegs`）與地圖引擎（`buildMap／animateMap`）
  沿用熱海範本；渲染程式全部重寫在最後一段 `/* ================= RENDER（方案 B 相冊） */`。
  舊版（App 殼、記帳、天氣、待辦等）看 git 歷史 f65af95 之前的 `index.html`。
- 資料來源：使用者給的行程 Excel（分頁：行程、住宿、行李、景點、餐廳、交通、行李箱寄送）。原檔沒放進 repo。
- **回憶錄模式**（使用者選的）：出發前才用得到的功能都拿掉——待辦／訂票（`BOOK=[]`、`BOOK_DT={}`）、天氣（`WX_LOC／WX_DAY` 清空）、
  記帳 trip-tools（手機底部「記帳」分頁、電腦 `#acct`、餐廳頁「家人推薦」、住宿每人每晚都拿掉）、雨備開關（`RAIN_STOPS={}`）、
  靜岡／熱海總覽（`areaHTML／izuHTML` 回傳空字串）。程式碼大多留著，只是資料清空或不顯示。
- **路由**（`route()`／`show()`）：`#/` 首頁、`#/day/N/I` 第 N 天第 I 張（翻頁時 `replaceState`）、`#/stay|food|tx|album|next`；舊的 `#dN` 自動轉。
- **每一天的張 `daySlides(d)`**：`cover`（這天的封面照、標題、回顧 `MEMO.days`）→ 依 `STOPS` 順序：每個正式站一張 `stop`（照片輪播＝`imgsOf(key)`，公開＋私人；沒照片就大字＋圖示），
  站與站之間依 `autoLegs` 插入 `leg`（從目前所在地出發、可經中途點的那幾段，`leg.g` 是產生它的 go，顯示時間、文字、價錢）→ `end`（回顧＋下一天）。
  `renderSlide()` 只重畫 `#vPh／#vTx／#vMap`；底片條 `#vFs`、進度 `#vBars／#vProg`。鍵盤 ←→、手機左右滑（照片多張時先滑照片）、底片條點選。
  影片：`CARDS[].video` 第一支 → 「▶ 影片」按鈕，按了才嵌 YouTube。
- 右上：六天數字圓鈕（`#dayNav`，只在檢視器顯示）、「私人」、選單。住宿頁、餐廳頁點卡片仍開彈窗（`openCard`）。

## 行程（2026-11-16 依使用者口述改成實際走的；原訂沒去的店與景點保留為「原訂」卡片）

| Day | 日期 | 內容 | 住 |
|---|---|---|---|
| 1 | 2/25 三 | 8:00 北門集合 → 桃園 12:00 → 大分 15:00 → 16:25 機場巴士 → 別府北濱 → 新鶴田飯店 → **焼肉 一力**（原訂味のあなば）→ 唐吉訶德 別府店 | 新鶴田飯店（別府） |
| 2 | 2/26 四 | 飯店早餐 → 退房寄行李 → 別府商店街 → 鰻の成瀬 → 14:00 龜之井巴士 36 → 由布院超市 → 入住、自己煮；住處有室外溫泉 | 由布院 Kawakami（sakura 房） |
| 3 | 2/27 五 | 自己煮早餐 → 金鱗湖、取票 → 退房 → Tabimusubi → 12:01 ゆふいんの森 → 日田租車：大山水壩、進擊的巨人本館、新館 → 18:12 ゆふいんの森 → 博多拿行李 → 入住休息 → 走過中洲屋台 → **博多一双 中洲店** | Chome Haruyoshi（天神南） |
| 4 | 2/28 六 | 休息 → 牛かつ要等很久先去 **Bic Camera 天神（兩館）看鍋子** → 回來吃牛かつもと村 → 下午休息 → もつ鍋 一藤 → **一蘭 天神西通り店**（這趟最好吃） | 同上 |
| 5 | 3/1 日 | 自己煮早餐 → **Bic Camera 買鍋子**（大濠・舞鶴沒去）→ 水炊き 鳥田（合理正常）→ 新幹線到小倉 あるあるCity → 回福岡晚餐簡單吃（Shin-Shin 沒去）→ 東西放回住處 → 一蘭本店（失望）→ 唐吉訶德 中洲店 | 同上 |
| 6 | 3/2 一 | 超商早餐（草莓三明治）→ 退房 → 行李放博多站附近 → 逛二次元店家 → 地下街伴手禮 → 地下街燒肉定食 → 14:00 去機場 → 福岡 16:55 → 桃園 18:30 | — |


## 資料怎麼放（和熱海網站同一套）

- **回憶錄文字 `MEMO`**（RENDER 段最前面）：`days[n]` 那天的回顧（空字串就不顯示）、`cards[key]` 一句實際心得（照片格說明、順序列、彈窗都會帶出）、`next[]` 下次會不一樣的地方。目前全空，等使用者寫。
- **照片格**：每天依 `STOPS` 順序，取有照片的卡片（`card` 或 `at` 對到 `CARDS`），第一張寬版；前一晚住宿的照片不算這天的。沒照片的站只出現在「那天的順序」。
  `DAY_KAN` 是那天完全沒照片時六天格上的大字。

- 地點 `P／NAMES／GQ`、景點卡 `CARDS`（25 張，含 8 張餐廳卡）、行程 `STOPS`（唯一來源）、`DAYS`（標題、住宿、卡片順序）。
- 住宿 `STAY_RG`（別府／由布院／福岡三區，都已 `pick`）＋ `STAYS`。
- 餐廳 `RESTO`：Excel 餐廳分頁全部列進來，`in`＝排進行程的、`c`＝當時的候選。**候選沒有座標**（沒查證位置），名單上顯示「地圖上沒有位置」。
- 景點樹 `SPOT_TREE`：大分（別府／由布院／日田）、福岡（天神・中洲／公園・博多）、小倉。新增卡片要放進葉節點。
- 交通地圖 `TXREG／TXLEGS／TXSEG／TXDAY`；交通頁 `#tickets` 是手寫 HTML（交通明細表、日田公車替代方案、交通網站、每日交通 `.ldays`）。
- 地圖地區（固定視角）`MAP_REG`：台北・桃園、大分機場、別府、由布院、日田、福岡、小倉。
- 底圖：`LAND` 用 `make_geo.py --bbox 128.8,32.3,133.2,34.7 --src japan --tol 0.0006`（dataofjapan）；`LINES` 用 Natural Earth 鐵道（沒有路線名，`RAIL_OK` 一律放行，地鐵畫直線）。
- localStorage 前綴 `kyu-`（`kyu-priv`＝登入過私人照片）；`sw.js` 快取 `kyu-v3`（2026-11-16 私人照片時加一）。

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

### 2026-10-28 照片（一）：從 Google 雲端硬碟加入 15 張
- 使用者把挑好的照片（HEIC，已排除有人臉的）放在雲端硬碟 `旅遊／japan／去過／別府-由布院-日田-福岡／照片影片`，
  用 Google Drive 連接器抓下來，依 EXIF 拍攝時間＋GPS 對到行程、看過內容後分配，使用者確認後套用。
  處理完雲端硬碟的暫存檔已移到垃圾桶（使用者不想重複佔空間，原檔在 Google 相簿）。
- 分配：tsuruta（別府塔夜景，住宿「附近」段）、shotengai（100 週年人孔蓋）、kawakami（由布院街景、自己煮壽喜燒＝「廚房」段）、
  kinrinko（湖中鳥居、由布院街景）、tabimusubi（早午餐）、aotmuseum（日田站前里維像、超大型巨人）、oyamadam（水壩、租車駕駛座）、
  aotnew（原稿）、nakasu（屋台街、屋台拉麵）、ichiran（大樓夜景）。
- **日田三個點座標依照片 GPS 改正**（原本估的偏了 4–5 km）：oyamadam 33.2447,130.9578、aotmuseum 33.2485,130.9718、aotnew 33.2984,130.9436。
- 封面 `cover.jpg`（640×400，金鱗湖鳥居橫向裁切），`trip.json` 的 `cover` 填上。
- `tools/addphotos.py` 的 `ROOT` 改成依腳本位置找 repo（原本寫死 IzuAtami-trip 的路徑）。HEIC 要先用 pillow-heif 轉成 JPEG 並套 EXIF 方向再餵給它。
- 驗證：`check.js` 全過（台北、桃園落海警告是既有的）；Playwright 桌機、手機零錯誤。

### 2026-10-30 版面重做：方案 B 相冊
- 使用者想把行前懶人包改成回憶錄，先給了 Claude Design 用的交付包（scratchpad `kyu/design-brief.zip`），後來直接在 session 裡用 Artifact「Design」畫布做了 A 手帳／B 相冊／C 路線三個方案（https://claude.ai/artifact/JioD39WbBn74L5T1PZqAF5），使用者選 **B**，手機要「單一長卷軸＋右上選單」。
- 用 scratchpad `b/build.py` 把新 head／CSS／body／RENDER 和舊檔的底圖、資料、地圖引擎、交通表格拼成新的 `index.html`（0.51 MB，舊版 0.82 MB）。之後**直接改 `index.html`**，不用再跑 build。
- 拿掉：手機 App 殼、底部分頁、記帳、天氣、待辦、雨備、地圖縮放與標記縮圖、`layoutLabels`（地圖標籤重疊暫不處理）、維基百科示意圖（沒照片就不放圖）。
- `check.js` 是舊版面的檢查工具，**對新結構會報錯（`go is not defined`）**；改用 Playwright 開電腦 1280 與手機 390 看 pageerror／console error 為零，並截圖看版面。
- 已知：Day 4、Day 6 沒有照片，六天格用 `DAY_KAN` 大字；住宿 Chome Haruyoshi 沒照片顯示「還沒有照片」。

### 2026-11-16 實際行程與回憶錄文字
- 使用者在聊天裡口述實際行程，改 `STOPS`（Day 1、3、4、5、6）、`DAYS`（副標、地圖點、卡片）、`RESTO`（anaba／nakasu／motomura 改 `c`，ichiriki 改 `in`，新增 issou、ichiranTenjin、conbini、chika）、`STAYS.kawakami`（室外溫泉）。
- 新增 `P／NAMES／GQ／CARDS`：`ichiriki`（焼肉 一力）、`issou`（博多一双 中洲店）、`ichiranTenjin`（一蘭 天神西通り店）、`bic`（Bic Camera 天神）；座標依地址估。
  原訂沒去的 anaba、motomura、ohori、maizuru、tenjin 卡片名稱加「（原訂）」，留在那天的「其他卡片」。
- 屋台拉麵那張照片（`img/nakasu-1-*.webp`）依 GPS 其實是一双中洲店，改到 `IMG.issou`。
- `MEMO.days／cards／next` 依口述填好；日期格式 bug（3/1 顯示成 003.1）修正。
- 第二輪補充：牛かつもと村其實有吃（先逛 Bic Camera 再回來）、鳥田「合理正常沒驚艷」、Shin-Shin 沒去（改 `c`）、唐吉訶德是 Day 1 別府店（新卡 `donkiBeppu`）與 Day 5 吃完一蘭的中洲店、Day 5 晚餐簡單吃後先把東西放回住處。

### 2026-11-16 版面第二次重做：方案 F 相冊書（一天一頁）
- 使用者看了 B 版之後要「一天一頁，以一天為單位回顧」。在同一個 Design 畫布加了第二輪三個方案（D 日記翻頁／E 時間軸／F 相冊書＋共用首頁），使用者選 **F**，並要「小地圖當站與站之間的過場動畫，主角仍是照片和當下的文字（或影片）」。
- scratchpad `f/build.py`：CSS 追加（`style-add.css`）、body 換成首頁＋檢視器＋`#pages`（原本的住宿／吃了什麼／交通／相簿／下次區塊搬進去）、RENDER 段換成 `render.js`、`autoLegs` 的 leg 多帶 `g`（產生它的 go）。之後直接改 `index.html`。
- 過場地圖：`dayMapSvg(d, leg)` 只畫起訖兩點、`bboxOf` 框那一段；站點小地圖 `dayMapSvg(d)` 整天路線，`markSel` 把目前的站描紅。地圖 SVG 字串快取在 `MAPC`。
- 驗證：Playwright 六天的張序列印出來看過（Day 3 共 24 張：cover、15 站、7 段、end）；電腦 1280／手機 390 封面、站、過場、結尾、首頁、其他頁截圖，零錯誤。

### 2026-11-16 私人照片：登入 trip-tools 的成員才看得到
使用者不想讓有家人朋友的照片出現在公開網站。評估過三條路（加密、Cloudflare Access、連結），因為 `trip-tools` 已有 Google 登入與成員制，決定**照片存 Firestore、沿用 trip-tools 的登入**（不開 Storage、不升 Blaze）。
- **資料**：`trips/Oita_Fukoka_2026/photos/{auto}`＝`{card, order, data(data URL WebP), w, h, name, by, at}`，由 trip-tools 的「照片」分頁上傳（主辦人），規則成員可讀。`cards.json`（本 repo 根目錄，`{key: 名稱}`）給 trip-tools 的下拉清單用，**新增卡片要同步更新**。
- **本站**（F 版面下仍適用）：右上「私人」按鈕（`#privBtn`）。第一次按才動態 `import` Firebase SDK 10.12.2（gstatic；公開訪客不載），`signInWithPopup` Google 登入；登入成功記 `localStorage kyu-priv=1`，之後開頁自動載入。
  `onSnapshot(photos)` → `setPriv()` 依 `card` 分組進 `PRIV`，`imgsOf(k)`＝公開 `img/` 接私人；`renderAll()` 重畫首頁日期卡、其他頁、目前這一天的張。私人的照片在檢視器、住宿、彈窗都有 🔒。`card` 空的集中在「私人相簿」頁（`#/album`，點開用 `openCard('__album', i)`）。
  規則擋下（不是成員）→ 按鈕顯示「🔒 不是成員」並提示要邀請連結；按鈕點開小選單（`#pmenu`）：到 trip-tools 管理、登出。
- `sw.js` `kyu-v3`：gstatic 的 `/firebasejs/` 也 cacheFirst，登入過的人離線也能載 SDK（Firestore 自己有 IndexedDB 離線快取）。
- 開發環境連不到 gstatic／Firebase：網址加 `?privmock=1` 用四張既有照片假扮私人照片看版面（兩張到 tsuruta、兩張到相簿）。Playwright 公開／mock 桌機／mock 手機零錯誤，截圖看過。
- **使用者已在 Firebase 上傳 2 張到「新鶴田飯店」**（2026-11-16），真正的登入流程由使用者上線測。Firebase 授權網域與 trip-tools 同一個 `jerry940080.github.io`，不用再加。

## 待辦

0. **回憶錄文字**：已填（2026-11-16，含第二輪補充：牛かつ有吃、鳥田心得、Shin-Shin 沒去、唐吉訶德別府店與中洲店）。
1. **照片**：已加 15 張（見 2026-10-28）。沒照片的卡還有 anaba、naruse、motomura、ichifuji、torida、shinshin、ohori、maizuru、aruaru、donki、tenjin、haruyoshi；影片之後再處理（放 YouTube 連結）。補照片時用 `python3 tools/addphotos.py <卡片 key> <圖檔…>`（從 IzuAtami-trip 複製的新版，照片存成 `img/` 獨立檔；skill 裡的 `scripts/addphotos.py` 是舊版，會把照片塞進 HTML，不要用）。
   住宿照片放 `IMG.tsuruta／kawakami／haruyoshi`，再把 `STAYS[].secs` 的照片索引補上。封面挑一張存 `cover.jpg`（640px）並填 `trip.json` 的 `cover`。
2. 使用者若記得實際去過的店、和 Excel 計畫不同的地方，改 `STOPS`、`RESTO`（`in`／`c`）。
3. GitHub Pages 已開（2026-10-28）。
