#!/bin/bash
# kullanım: ./shot.sh slayt_id [slayt_id...]  -> scratchpad/<id>.png
cd "$(dirname "$0")"
S="C:/Users/Sinan/AppData/Local/Temp/claude/C--Users-Sinan-Desktop-Okul-Ders-ve-Evraklar--BTT-Ders-Sunumlari/e1616f6c-5cc5-441b-908f-a2a7e3728aca/scratchpad"
python build.py --local >/dev/null
for id in "$@"; do
 "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1180 --virtual-time-budget=9000 --screenshot="$S/$id.png" "file:///$(pwd -W | sed 's/ /%20/g')/dist/index_local.html#$id" 2>/dev/null
done
