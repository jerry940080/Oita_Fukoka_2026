#!/usr/bin/env python3
"""把照片轉成 WebP 存到 img/，並把檔案路徑加進 index.html 的 IMG。
用法：addphotos.py <cardKey> <圖檔1> [圖檔2 ...]
規則：橫式縮到寬 1000、直式縮到高 1000，q78 WebP；第一張是卡片封面。
檔名 img/<key>-<序號>-<內容雜湊8碼>.webp：內容變了檔名就變，service worker 的快取不會拿到舊圖。
（2026-10-14 起照片不再 base64 內嵌，見 CLAUDE.md 變更（六十）。）"""
import sys, hashlib, io, os, re
from PIL import Image

ROOT='/home/user/IzuAtami-trip'
HTML=ROOT+'/index.html'
key, files = sys.argv[1], sys.argv[2:]
assert files, '沒有給圖檔'

s=open(HTML,encoding='utf-8').read()
anchor='const IMG={'
assert s.count(anchor)==1
assert not re.search(r"(?:\{|\n )"+key+r":\[?'(?:data:image|img/)",s), key+' 已經有照片了，先手動移除（記得也刪掉 img/ 裡的舊檔）'

os.makedirs(ROOT+'/img',exist_ok=True)
paths=[]
for i,f in enumerate(files):
    im=Image.open(f).convert('RGB')
    w,h=im.size
    if w>=h: nw=min(1000,w); nh=round(h*nw/w)
    else:    nh=min(1000,h); nw=round(w*nh/h)
    im=im.resize((nw,nh), Image.LANCZOS)
    buf=io.BytesIO(); im.save(buf,'WEBP',quality=78,method=6)
    b=buf.getvalue()
    p='img/%s-%d-%s.webp'%(key,i,hashlib.sha1(b).hexdigest()[:8])
    open(ROOT+'/'+p,'wb').write(b)
    print('  %-22s %dx%d -> %dx%d  %4.0f KB  %s'%(os.path.basename(f),w,h,nw,nh,len(b)/1024,p))
    paths.append(p)

val='['+','.join("'%s'"%u for u in paths)+']' if len(paths)>1 else "'%s'"%paths[0]
s=s.replace(anchor, anchor+key+':'+val+',\n ',1)
open(HTML,'w',encoding='utf-8').write(s)
print('✓ %s 加入 %d 張，index.html %.2f MB'%(key,len(paths),os.path.getsize(HTML)/1048576))
