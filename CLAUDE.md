# CLAUDE.md — 大分・由布院・福岡 旅遊紀錄（2026/2/25–3/2）

> 使用者以繁體中文溝通，回覆請一律使用繁體中文。

## 專案是什麼

**已經去過的旅行**做成的回憶錄網站：單一 `index.html`，GitHub Pages 從 `main` 分支根目錄發布
（`https://jerry940080.github.io/Oita_Fukoka_2026/`）。首頁 `https://jerry940080.github.io/` 會讀根目錄的 `trip.json` 把這趟列進總覽。

- **第五版「旅途攝影集」（2026-11-17，現行）**：使用者覺得剪貼簿版文字太多、照片像配角，要「以圖片跟影片為主體」。把截圖與資料包（scratchpad `design-brief-v2.zip`：說明與規格、`trip-data.json`、15 張公開照片）交給 ChatGPT 出三款樣板
  （scratchpad `tpl/`：A 相冊放映室／B 旅途攝影集／C 六日影像牆），使用者選「B 為主混 C」。
  視覺：米白 `#faf7ef`、墨綠 `#22271f`、強調綠 `#435c39`、底色 `#edeade`、線 `#d2d0c1`；標題 Noto Serif TC、內文 Noto Sans TC、時間 monospace；沒有貼紙、膠帶、歪斜。
  結構：**首頁**（書名＋金鱗湖主圖、六張日期卡＝小封面＋標題＋每天一句＋站數照片數、六天總覽地圖摺疊、附錄連結）；
  **一天＝一條長卷軸**（`#/day/N`）：標題（可展開「本日路線」小地圖，點地圖上的點捲到那一站）→ 依 `STOPS` 順序：有照片／影片的站是「場景」（時間、類型、站名、一句心得 `MEMO.cards`、「＋ 備註」折疊卡片介紹／標籤／Google 地圖；
  照片格＝第一張主圖原比例不裁切（B）＋其餘方格（C，手機 3 欄、電腦 4 欄主圖佔 2×2；兩張時並排 4:5）；影片格＝縮圖＋▶，點了在格下方嵌 YouTube 原地播、Shorts 直式）；
  沒有照片的站與每段移動收成「短列」`.quiet-row`（連續的合成一組）→ 私人隨手拍（有時間插進順序、沒有就放最後「當日隨手拍」）→「那一天」回顧＋夜宿＋下一天。
  點照片開 `<dialog>` 大圖（同一站左右翻、鍵盤、滑動）。**附錄**（`#/stay|food|tx|album|items|next|print`）同一套版面：住宿照片格、吃了什麼只留餐別店名心得（點了跳到那一天那一站）、交通表手機兩行、列印頁每站最多 4 張縮圖。
  渲染程式全部在最後一段 `/* ================= RENDER（第五版「旅途攝影集」） */`；資料區、行程工具、地圖引擎、Firebase 私人照片區塊沿用。交通頁手寫 HTML 放在 `<template id="txTpl">`。
  **舊版**：剪貼簿 H／相冊書 F 版看 git 歷史 d632a95（第四輪）之前；App 殼看 f65af95 之前。
- 資料來源：使用者給的行程 Excel（分頁：行程、住宿、行李、景點、餐廳、交通、行李箱寄送）。原檔沒放進 repo。
- **回憶錄模式**（使用者選的）：出發前才用得到的功能都拿掉——待辦／訂票（`BOOK=[]`、`BOOK_DT={}`）、天氣（`WX_LOC／WX_DAY` 清空）、
  記帳 trip-tools（手機底部「記帳」分頁、電腦 `#acct`、餐廳頁「家人推薦」、住宿每人每晚都拿掉）、雨備開關（`RAIN_STOPS={}`）、
  靜岡／熱海總覽（`areaHTML／izuHTML` 回傳空字串）。程式碼大多留著，只是資料清空或不顯示。
- **路由**（`route()`／`show()`）：`#/` 首頁、`#/day/N/I` 第 N 天第 I 張（翻頁時 `replaceState`）、`#/stay|food|tx|album|next`；舊的 `#dN` 自動轉。
- **一天的內容 `dayEntries(d)`**：每個正式站一筆 `stop`（`media`＝`mediaOf(card)`：公開照片 → 私人照片 → 公開影片 → 私人影片；**只有 `card` 的站才帶照片**，只有 `at` 的退房／休息不帶）、每段 `go` 一筆 `leg`、私人隨手拍 `snap`、沒時間的集中成 `extra`。`pack()` 把沒有媒體的連續筆合成一組短列。
- 右上：六天數字（`#dayNav`，電腦版在一天的頁面顯示）、「私人」、選單。沒有卡片彈窗了（`openCard` 已移除）；住宿頁照片開大圖，餐廳列點了跳到那一天的那一站。

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
- localStorage 前綴 `kyu-`（`kyu-priv`＝登入過私人照片）；`sw.js` 快取 `kyu-v6`（2026-11-17 第五版版面時加一）。

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

### 2026-11-16 視覺第三次換皮：方案 H 剪貼簿（travel-memoir-kit）
- 使用者給了 ChatGPT 產的 `travel-memoir-kit.zip`（PROMPT.md 規格＋一個 16 KB 的單頁原型＋8 個 SVG）。評估後決定**保留 F 結構、只換視覺**（kit 的原型沒有地圖、登入與資料）。在 Design 畫布加第三輪 G 雜誌刊物／H 剪貼簿，使用者選 **H**。
- scratchpad `h/patch.py`：`<style>` 整段換成 `h/style.css`；封面改成「那些在九州的日子。」＋兩張歪斜貼上的照片＋郵戳＋便利貼；六天入口是歪斜小卡；檢視器照片放白框（`.frame`，膠帶是 `::before/::after`），下緣手寫註記 `.pcap`＝卡片心得或一句話；心得是黃色便利貼；「下一站」黑底紅影按鈕；小地圖像貼上去的紙。手機版改成直向：照片框在上、筆記在下、底部翻頁列 `.vbot`（`#vNextInfo` 顯示下一站）。
- 新增 **旅途收藏** 頁（`#/items`，`ITEMS` 陣列：id／title／date／note／img，掃描檔放 `img/items/`，目前三筆都還沒圖）與 **列印** 頁（`#/print`，`renderPrint()` 把六天攤成冊子，`@media print` 只印這一頁；選單「列印 / PDF」）。
- kit 的 `paper.svg` 紙紋改成 data URI 直接寫在 `body` 背景；其他 SVG（郵戳、票券有 SAMPLE 字樣）沒用。
- 驗證：Playwright 電腦 1280／手機 390 首頁、封面、站、過場、收藏、列印、住宿截圖，零錯誤。

### 2026-11-16 私人照片：登入 trip-tools 的成員才看得到
使用者不想讓有家人朋友的照片出現在公開網站。評估過三條路（加密、Cloudflare Access、連結），因為 `trip-tools` 已有 Google 登入與成員制，決定**照片存 Firestore、沿用 trip-tools 的登入**（不開 Storage、不升 Blaze）。
- **資料**：`trips/Oita_Fukoka_2026/photos/{auto}`＝`{card, order, data(data URL WebP), w, h, name, by, at}`，由 trip-tools 的「照片」分頁上傳（主辦人），規則成員可讀。`cards.json`（本 repo 根目錄，`{key: 名稱}`）給 trip-tools 的下拉清單用，**新增卡片要同步更新**。
- **本站**（F 版面下仍適用）：右上「私人」按鈕（`#privBtn`）。第一次按才動態 `import` Firebase SDK 10.12.2（gstatic；公開訪客不載），`signInWithPopup` Google 登入；登入成功記 `localStorage kyu-priv=1`，之後開頁自動載入。
  `onSnapshot(photos)` → `setPriv()` 依 `card` 分組進 `PRIV`，`imgsOf(k)`＝公開 `img/` 接私人；`renderAll()` 重畫首頁日期卡、其他頁、目前這一天的張。私人的照片在檢視器、住宿、彈窗都有 🔒。`card` 空的集中在「私人相簿」頁（`#/album`，點開用 `openCard('__album', i)`）。
  規則擋下（不是成員）→ 按鈕顯示「🔒 不是成員」並提示要邀請連結；按鈕點開小選單（`#pmenu`）：到 trip-tools 管理、登出。
- **備註、哪一天、時間（2026-11-16 第二版）**：trip-tools 上傳時可填 `note`／`day`／`t`。`setPriv` 把 `card` 空但 `day` 有的放 `PRIVD[day]`；`daySlides` 把它們做成 `snap` 張（有 `t` 就插在第一個時間比它晚的站前面，沒有就放最後），標題＝備註第一行、`.pcap`＝備註。
  站的照片翻到私人那張時，`.pcap` 換成那張的備註（`capOf(k,i)`，存在 `#vPh` 的 `data-caps`）；相簿頁的照片也顯示備註；列印頁有隨手拍。`?privmock=1` 多了 m5–m7 三張示範（有備註、有時間、有換行）。
- **私人影片（2026-11-17）**：trip-tools 照片分頁貼的 YouTube 不公開連結（`photos` 集合裡 `kind:'video'`、`url`，其餘欄位同照片）。`setPriv` 分到 `PVID[card]`／`PVIDD[day]`。
  `vidsOf(k)`＝公開 `CARDS[k].video` ＋ 私人（`priv:1`，標 🔒，`note` 當標籤）；站的張把全部影片列成 `.vbtns` 按鈕，按了在 `#vYt` 嵌入（同一時間只播一支，按鈕 `.on`）。
  `card` 空、`day` 有的影片＝那天的 `snap` 張（`sl.v`）：白框裡放 YouTube 縮圖（`i.ytimg.com/vi/<id>/hqdefault.jpg`，抓不到就隱藏）＋ ▶ `.vplay`，按了整個框換成 iframe；文字頁有「在 YouTube 開啟」。
  都沒有的放私人相簿頁（`.ph.vid`，點了另開 YouTube）；彈窗 `openCard` 也列私人影片。Shorts（網址含 `/shorts/`）用 9:16 的 `.yt.short`。底片條、列印頁用縮圖＋▶。
  首頁日期卡的 🔒 數＝私人照片＋影片；封面張的 meta 多「N 支影片」。`?privmock=1` 多了 v1–v4（兩支對到金鱗湖、一支 Day 3 隨手拍、一支相簿）。
- **隨手拍合併（2026-11-17）**：`PRIVD` 裡**連續、同備註、同時間**的照片合成一張 `snap`（`sl.ps` 陣列，白框內可左右翻、有 `1 / N`），例如「由布院商店街」兩張只佔一站。`snap` 結構改成 `{ps, v, t, note}`（舊的 `sl.p` 已不存在）。
- 使用者 2026-11-17 已上傳完畢：45 項（36 張照片、9 支影片；aotmuseum 7 張、torida 6 張＋1 支、oyamadam 4、kinrinko 1＋3 支、kawakami 2＋1 支、Day 2 隨手拍 3 張、Day 1／3 隨手拍影片 3 支）。公開影片使用者還沒給。
- `sw.js` `kyu-v4`（2026-11-17 私人影片時加一）：gstatic 的 `/firebasejs/` 也 cacheFirst，登入過的人離線也能載 SDK（Firestore 自己有 IndexedDB 離線快取）。
- 開發環境連不到 gstatic／Firebase：網址加 `?privmock=1` 用四張既有照片假扮私人照片看版面（兩張到 tsuruta、兩張到相簿）。Playwright 公開／mock 桌機／mock 手機零錯誤，截圖看過。
- **使用者已在 Firebase 上傳 2 張到「新鶴田飯店」**（2026-11-16），真正的登入流程由使用者上線測。Firebase 授權網域與 trip-tools 同一個 `jerry940080.github.io`，不用再加。

### 2026-11-17 第四輪：依 ChatGPT 評估調整版面（使用者選「照建議做，8–12 都做」）
使用者把截圖與說明包（scratchpad `review-for-chatgpt.zip`）丟給 ChatGPT，拿回 16 條建議；做了 1–12，沒做：列印版雙版本與 A4 分頁、旅途收藏票券清單（等掃描檔）、下次搬到 Day 6（只加連結）、同行者補記。
CSS 全部追加在 `<style>` 最後一段「2026-11-17 第四輪」（後面的規則蓋前面的，原本的規則沒刪）；JS 的「每一天的張」「檢視器」「首頁」三段整段重寫。
- **例行站與短程過場收成一行**（`isMinorStop`／`isMinorLeg`）：有 `card` 的站一律保留；只有 `at` 的住宿／交通站，名稱含 退房・休息・睡飽・放回・寄放・拿行李・報到・降落・還車、或 `k==='住宿'`、或 `k==='交通'` 且沒有 `d` 的，
  不再各佔一張，改成接在**上一站或上一段過場**尾端（`sl.after`）；一天一開始的（睡飽休息）放第一站開頭（`sl.before`）。短程過場＝步行、計程車、地鐵，或兩點 8 km 內（`kmOf`）的任何方式（飛機除外），同樣收成一行；
  跨城的巴士、特急、新幹線、日田站 → 水壩的車程仍是整張過場。畫面用 `minorsHTML()`（`.minors`：時間＋圖示＋名稱＋小字說明，過場那行有虛線框）；列印頁同樣一行。`stopCount` 只算保留下來的站，所以「第 N 站 / M」變少了。
- **檢視器**：`vhead` 改成一行 13px mono「08:00 · 第 2 站 / 14」＋手機才顯示的「📍 本日位置」按鈕（`.mapbtn`，按了 `#vMap.big` 變成置中的固定浮層、點一下關閉；手機平常不再把小地圖壓在相紙右下）。站名 24／30px、正文 16px/1.7、橫線 `--rule` 淡成 `#ece5d6`、桌機文字欄最寬 460px。
  相紙：多張照片時右下是「1 / 9 · 看全部」按鈕（`.pcnt[data-grid]`），點開相紙內 3 欄縮圖格（`.pgrid`），選了跳到那張（`pslideTo`）；左右箭頭 `.pnav` 移進相紙內側、只在多張時出現；直幅照（高 > 寬 × 1.15，`onload` 加 `.por`）在相紙內等比顯示不裁切。
  影片入口改成 `.vcard`（80×56 縮圖＋標題＋「私人影片・點了在這裡播」），點了在下方 `#vYt` 播、再點收起；Shorts 最寬 320px、最高 65dvh。
  手機底欄：左右是「‹ 上一頁」「下一頁 ›」（`.varr` 直排小字），中間黑卡 `#vNextInfo` 顯示「DAY 3 · 8 / 19」＋下一站名；最後一張時變「回到六日目錄」。
  點上方進度條 `#vBars` 打開**當日目錄** `#vToc`（`dayToc()`：封面、每站時間與名稱、過場、結尾，點了跳）；Esc 關目錄或地圖。
  結尾張：相紙放那天前兩張照片的拼貼（`.duo`）、回顧便利貼、「翻到第 N 天」＋「回到六日目錄」（`#/days`＝首頁捲到日期卡）。底片條的過場改成 34px 窄票券（`.fsi.leg`）。
- **首頁**：hero 拆成 `hx`（書名、副標、日期路線）、`hp`（照片）、`hnote`（便利貼一句）、`hgo`（「從第 1 天開始」＋「選一天翻 ↓」），桌機 grid-template-areas 左右排、手機依 書名 → 照片 → 便利貼 → 按鈕；手機不顯示 eyebrow 與郵戳。
  日期卡多「每天一句」（`oneLine(d)`＝`MEMO.days` 第一句，兩行截斷）；沒照片的那天（Day 4、6）改成紙底文字卡 `.txtc`（日期、章名、一句），不再是灰底大字。
  日期卡下面「看這六天怎麼走」摺疊（`details.omap`，第一次展開才 `buildMap`）：主要停留點＋跨城移動（排除台北、桃園與短程過場），點地圖上的點跳到那一天（`KEY_DAY`，capture 階段攔下、不開卡片），下面六個日期膠囊。
  「旅途附錄」一排七格（住宿／吃了什麼／交通／私人相簿／旅途收藏／下次／列印），每格有小字說明。
- **其他頁**：吃了什麼每列只剩 餐別・店名・一句心得（`MEMO.cards`，候選顯示備註第一段），評分營業時間折進「店家資料」（`details.sd`，`onclick` 擋住開卡片）；候選摘要「當時存的候選（N）」。
  住宿卡多一句心得（`.hw`），走路／入住／早餐折進「住宿資料」（桌機預設展開、手機收起）；手機照片在上（`.st .sp{order:-1}`）。
  交通表手機改成每段兩行（`tr` 變 grid：區間一行、方式＋車資一行、付款小字），不再左右捲。列印預覽手機：日期獨立一行、48px 時間欄、照片在正文下；`@page A4 15mm`。「下次」頁底加「回到六日目錄」。
- toast 縮到 1.5 秒。`sw.js` `kyu-v5`。
- 驗證：Playwright 公開／`?privmock=1` 桌機 1280 與手機 390 零錯誤；六天的張序列印出來看過（例如 Day 3 從 24 張變 17 張：退房、還車、拿行李、休息都收成一行）；截圖看過首頁、封面、站、過場、結尾、縮圖格、當日目錄、本日位置、總覽地圖、吃了什麼、住宿、交通、列印。

### 2026-11-17 第五版：旅途攝影集（B 為主混 C）
- 使用者看過第四輪後說「應該要以圖片跟影片為主體來修改」，決定請 ChatGPT 出全新樣板。我給的委託包：scratchpad `design2/`（`說明與規格.md`、`data/trip-data.json`、`img/`、`shots/`）＋ prompt。ChatGPT 回了 A／B／C 三款（scratchpad `tpl/`，純 HTML、只載 Google Fonts），
  我在 390／1280 截圖零錯誤後評估：A 翻頁有空頁與直幅照片黑邊、B 原比例最自然但長、C 密度高但裁切；建議 B 為主混 C，使用者同意。
- 組裝：scratchpad `r5/`（`style.css`、`body.html`、`render.js`、組裝腳本在對話裡）：保留 head、兩段資料與引擎 script、Firebase 區塊（`PRIV={}` 重設時一併清 `PRIVD／PVID／PVIDD`），其餘全換。第四輪的 `index.html` 備份在 `r5/index-v4-backup.html`。
- 字型改 Noto Sans TC ＋ Noto Serif TC（拿掉 IBM Plex Mono、Klee One）；`theme-color #faf7ef`。
- 驗證：Playwright 公開／`?privmock=1` 桌機 1280 與手機 390 零錯誤；Day 3 的筆序列印出來看過（金鱗湖 5 項媒體、隨手拍插在 16:40、當日隨手拍 3 項）；大圖 1/3、影片 iframe、吃了什麼跳站、總覽地圖與本日路線都有 svg；截圖看過首頁、金鱗湖、巨人本館、影片播放、住宿、吃了什麼、交通、列印、那一天。
- 沒搬過來的：底片條、當日目錄、結尾拼貼、「本日位置」按鈕（第四輪的東西，長卷軸不需要）；`ITEMS` 搬到 RENDER 段最前面的附錄區。

## 待辦

0. **回憶錄文字**：已填（2026-11-16，含第二輪補充：牛かつ有吃、鳥田心得、Shin-Shin 沒去、唐吉訶德別府店與中洲店）。
1. **旅途收藏**：使用者掃描車票、收據、明信片後放 `img/items/`，填進 `ITEMS[].img`（保留原比例，點了放大）。
1. **照片**：已加 15 張（見 2026-10-28）。沒照片的卡還有 anaba、naruse、motomura、ichifuji、torida、shinshin、ohori、maizuru、aruaru、donki、tenjin、haruyoshi；影片之後再處理（放 YouTube 連結）。補照片時用 `python3 tools/addphotos.py <卡片 key> <圖檔…>`（從 IzuAtami-trip 複製的新版，照片存成 `img/` 獨立檔；skill 裡的 `scripts/addphotos.py` 是舊版，會把照片塞進 HTML，不要用）。
   住宿照片放 `IMG.tsuruta／kawakami／haruyoshi`，再把 `STAYS[].secs` 的照片索引補上。封面挑一張存 `cover.jpg`（640px）並填 `trip.json` 的 `cover`。
2. 使用者若記得實際去過的店、和 Excel 計畫不同的地方，改 `STOPS`、`RESTO`（`in`／`c`）。
3. GitHub Pages 已開（2026-10-28）。
