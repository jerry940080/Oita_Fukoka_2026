// 產生 media.json：給 trip-tools「排版」分頁用的可選媒體清單（公開照片、公開影片、卡片名、六天、每天的移動段）
// 用法：node tools/make_media.js  （改了 IMG／CARDS[].video／STOPS 之後重跑，再 commit）
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const m=html.match(/<script>([\s\S]*?)<\/script>\s*<script>([\s\S]*?)<\/script>/);let src=m[1]+'\n'+m[2];src=src.slice(0,src.indexOf('/* ================= RENDER')); // 第一段是 LAND／LINES 底圖，autoLegs 要用
const ctx={matchMedia:()=>({matches:false}),document:{getElementById:()=>null,querySelector:()=>null},window:{},location:{search:'',hash:''},localStorage:{getItem:()=>null},navigator:{},addEventListener(){},console};
vm.createContext(ctx);vm.runInContext(src+';this.__={DAYS,STOPS,CARDS,NAMES,IMG,P,MODE,autoLegs,locOf}',ctx);const X=ctx.__;
const ytId=u=>{const r=String(u||'').match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);return r?r[1]:'';};
const photos=[],videos=[],cards={};
Object.keys(X.CARDS).forEach(k=>{cards[k]=X.CARDS[k].name;});
Object.entries(X.IMG).forEach(([k,v])=>[].concat(v).forEach((src,i)=>photos.push({id:'pub:'+k+':'+i,card:k,src,name:(X.CARDS[k]||{}).name||k})));
Object.entries(X.CARDS).forEach(([k,c])=>[].concat(c.video||[]).forEach((v,i)=>{const u=typeof v==='string'?v:v.u;if(ytId(u))videos.push({id:'pubvid:'+k+':'+i,card:k,url:u,name:(typeof v==='object'&&v.l)||c.name});}));
const legs={};X.DAYS.forEach(d=>{legs[d.n]=X.autoLegs(d).filter(l=>!l.opt).map(l=>({a:l.a,b:l.b,mode:l.mode,label:(l.g&&l.g.at?l.g.at+' ':'')+X.NAMES[l.a][0]+' → '+X.NAMES[l.b][0]+'（'+((X.MODE[l.mode]||{}).label||l.mode)+'）'}));});
const stops={};X.DAYS.forEach(d=>{stops[d.n]=(d.stops||[]).filter(s=>s.k!=='選項'&&s.k!=='提醒').map(s=>({t:s.t,n:s.n,k:s.k,card:s.card||'',at:s.at||''}));});
const out={v:1,made:new Date().toISOString().slice(0,10),days:X.DAYS.map(d=>({n:d.n,date:d.date,wd:d.wd,title:d.title})),cards,photos,videos,legs,stops};
fs.writeFileSync(path.join(root,'media.json'),JSON.stringify(out));
console.log('media.json:',photos.length,'photos',videos.length,'videos',Object.keys(cards).length,'cards');
