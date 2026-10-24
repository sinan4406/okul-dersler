#!/bin/bash
cd "$(dirname "$0")"
python build.py --check || exit 1
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --window-size=1920,1080 --virtual-time-budget=40000 --dump-dom "file:///$(pwd -W | sed 's/ /%20/g')/dist/index_check.html" 2>/dev/null | python -I -c "
import sys,re
d=sys.stdin.buffer.read().decode('utf8','replace')
m=re.search(r'<pre id=\"chkout\">(.*?)</pre>',d,re.S)
print(m.group(1) if m else 'RAPOR YOK '+str(len(d)))
"
