# -*- coding: utf-8 -*-
import sys, importlib.util, pathlib, os
here = pathlib.Path(__file__).parent
sys.path.insert(0, str(here))
MODS = ['s0_giris', 's1_yz', 's2_modeller', 's3_prompt', 's4_icerik', 's5_otomasyon', 's6_kapanis']
check = '--check' in sys.argv
local = '--local' in sys.argv
only = [a for a in sys.argv[1:] if not a.startswith('--')]

def rd(p):
    return (here / p).read_text(encoding='utf-8')

body, demos = [], []
for m in MODS:
    f = here / 'slides' / (m + '.py')
    if not f.exists():
        continue
    spec = importlib.util.spec_from_file_location(m, f)
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    body.append(mod.slides())
    j = here / 'slides' / (m + '.js')
    if j.exists():
        demos.append('/* %s */\n(function(){\n%s\n})();\n' % (m, j.read_text(encoding='utf-8')))

head = '''<title>Yapay Zekâ Teknolojileri</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap">
<style>
%s
</style>
<div id="app">
<div id="viewport"><div id="stage">
''' % rd('assets/style.css')

foot = '''</div>
<div id="notes" hidden><b>Öğretmen notu</b><div id="notestxt"></div></div>
</div>
<div id="barwrap">
<div id="bar">
<button id="bprev" type="button" aria-label="Önceki slayt">◀<span class="hide-sm"> Önceki</span></button>
<button id="bnext" type="button" aria-label="Sonraki slayt"><span class="hide-sm">Sonraki </span>▶</button>
<span id="count">1 / 1</span>
<span id="stitle"></span>
<button id="bnotes" type="button" aria-pressed="false">Notlar<span class="hide-sm"> (N)</span></button>
<button id="bfull" type="button">Tam ekran<span class="hide-sm"> (F)</span></button>
</div>
<div id="prog"></div>
</div>
</div>
'''
js = '<script>\n' + rd('assets/engine.js') + '\n</script>\n<script>\n' + '\n'.join(demos) + '\n</script>\n'
if check:
    js += '<script>\n' + rd('check.js') + '\n</script>\n'
out = head + '\n'.join(body) + foot + js
if check or local:
    out = '<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' + out + '</body></html>'
dst = here / 'dist' / ('index_check.html' if check else ('index_local.html' if local else 'index.html'))
dst.write_text(out, encoding='utf-8')
print('yazıldı', dst, len(out)//1024, 'KB', out.count('<section'), 'slayt')
