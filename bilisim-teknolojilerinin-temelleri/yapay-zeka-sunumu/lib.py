# -*- coding: utf-8 -*-
"""Slayt yazımı için küçük yardımcılar. Her fonksiyon HTML metni döndürür."""
import html as _h

def esc(s):
    return _h.escape(s, quote=False)

def sec(id, eyebrow, title, body, notes, dark=False, foot=None, data_title=None):
    cls = 'sl dark' if dark else 'sl light'
    dt = ' data-title="%s"' % _h.escape(data_title, quote=True) if data_title else ''
    head = ''
    if title:
        head = '<div class="hd"><p class="eb">%s</p><h2 class="ttl">%s</h2></div>' % (eyebrow, title)
    f = '<p class="foot">%s</p>' % foot if foot else ''
    return '<section id="%s" class="%s"%s>%s%s%s<aside>%s</aside></section>\n' % (id, cls, dt, head, body, f, notes)

def divider(id, kicker, title, sub, notes, chips=''):
    return ('<section id="%s" data-title="%s" style="background:#14202E;color:#F6F4EE;font-family:Rubik,Arial,sans-serif;padding:112px;display:flex;flex-direction:column;justify-content:center;gap:40px">'
            '<p style="font-size:28px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:#FF9F5A">%s</p>'
            '<h1 style="font-size:112px;font-weight:700;line-height:1.05;color:#F6F4EE">%s</h1>'
            '<p style="font-size:38px;line-height:1.35;color:#BFCAD6;max-width:1500px">%s</p>%s'
            '<aside>%s</aside></section>\n') % (id, _h.escape(title.replace('<br>', ' '), quote=True), kicker, title, sub, chips, notes)

def row(*items, gap=None, cls=''):
    st = ' style="gap:%dpx"' % gap if gap else ''
    return '<div class="row %s"%s>%s</div>' % (cls, st, ''.join(items))

def col(*items, cls='', style='', gap=None):
    if gap:
        style = 'gap:%dpx;' % gap + style
    return '<div class="col %s" style="%s">%s</div>' % (cls, style, ''.join(items))

def grid(n, *items, style=''):
    return '<div class="g%d" style="%s">%s</div>' % (n, style, ''.join(items))

def card(title, text, kind='', style=''):
    t = '<h3>%s</h3>' % title if title else ''
    return '<div class="card %s" style="%s">%s%s</div>' % (kind, style, t, text)

def p(text, cls='', style=''):
    return '<p class="%s" style="%s">%s</p>' % (cls, style, text)

def ul(*items, cls=''):
    return '<ul class="%s">%s</ul>' % (cls, ''.join('<li>%s</li>' % i for i in items))

def tip(word, text, dn=False, lf=False):
    c = 'tip' + (' dn' if dn else '') + (' lf' if lf else '')
    return '<span class="%s" tabindex="0" data-tip="%s">%s</span>' % (c, _h.escape(text, quote=True), word)

def qa(question, answer, btn='Cevabı göster', cls=''):
    return ('<div class="col %s" style="gap:10px">%s<button class="ans-btn sm" type="button">%s</button>'
            '<div class="ans" hidden>%s</div></div>') % (cls, question, btn, answer)

def ansall():
    return '<button class="ans-btn" type="button" data-all="1">Tüm cevapları göster</button>'

def code(src, title=None):
    t = '<p style="font-size:25px;font-weight:600;color:#FF9F5A">%s</p>' % title if title else ''
    return '<div class="codebox">%s<pre class="code">%s</pre></div>' % (t, src)

def table(headers, rows, widths=None, size=25, head_bg='#14202E', head_fg='#F6F4EE'):
    th = ''.join('<th style="color:%s;%s">%s</th>' % (head_fg, ('width:%s;' % widths[i]) if widths else '', h) for i, h in enumerate(headers))
    tr = ''.join('<tr>%s</tr>' % ''.join('<td>%s</td>' % c for c in r) for r in rows)
    return ('<table style="font-size:%dpx;background:#FFFFFF;color:#1B2533;border-radius:12px;overflow:hidden"><tr style="background:%s">%s</tr>%s</table>'
            % (size, head_bg, th, tr))

def stepper_ctl(auto=True):
    a = '<button type="button" data-act="auto">Otomatik oynat</button>' if auto else ''
    return ('<div class="stp"><button type="button" data-act="first">Başa</button><button type="button" data-act="prev">◀ Geri</button>'
            '<button type="button" class="go" data-act="next">İleri ▶</button>%s<span class="cnt"></span></div>') % a

def tabs(items, first=None):
    """items: [(id, label, pane_html)] ; sekme düğmeleri + paneller"""
    b = ''.join('<button type="button" class="tb" data-tab="%s" aria-pressed="false">%s</button>' % (i, l) for i, l, _ in items)
    ps = ''.join('<div class="tp" data-pane="%s" hidden>%s</div>' % (i, ph) for i, _, ph in items)
    return '<div data-tabs class="col" style="gap:18px"><div class="tabs">%s</div>%s</div>' % (b, ps)

def cls_activity(rows, labels, check='Cevapları kontrol et', compact=False):
    """rows: [(metin, doğru_etiket_no, açıklama)] ; labels: etiket listesi (1'den başlar)"""
    out = []
    for text, right, why in rows:
        opts = ''.join('<button type="button" class="opt" data-v="%d" aria-pressed="false">%s</button>' % (i + 1, l) for i, l in enumerate(labels))
        w = '<span class="why sm mute" hidden style="flex-basis:100%%">%s</span>' % why if why else ''
        out.append('<div class="crow" data-right="%d" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;padding:12px 0;border-bottom:1px solid rgba(20,32,46,.12)">'
                   '<span style="font-size:30px;flex:1;min-width:420px;line-height:1.3">%s</span>%s%s</div>' % (right, text, opts, w))
    return ('<div class="cls col%s" style="gap:0">%s<div class="row" style="gap:16px;align-items:center;margin-top:14px">'
            '<button type="button" class="ans-btn cls-check" style="background:#2F6FDE">%s</button>'
            '<button type="button" class="ans-btn alt cls-reset sm">Sıfırla</button><span class="cls-score" style="font-size:26px;font-weight:600"></span></div></div>') % (' cmp' if compact else '', ''.join(out), check)

def timer(sec_, label='Süre'):
    return ('<div class="timer row" data-sec="%d" style="align-items:center;gap:16px"><span class="mono t-val" style="font-size:44px;font-weight:700">0:00</span>'
            '<button type="button" class="ans-btn t-go">Başlat</button><span class="sm mute">%s</span></div>') % (sec_, label)

def win(title, body, id='', style=''):
    return ('<div class="win" id="%s" style="%s"><div class="win-bar"><span class="ico"></span><span class="wt">%s</span><span class="wc">–▢✕</span></div>'
            '<div style="padding:22px 28px">%s</div></div>') % (id, style, title, body)


def chk(id, items):
    li = ''.join('<label style="display:flex;align-items:center;gap:14px;font-size:27px;line-height:1.3"><input type="checkbox" class="chk-i" style="width:30px;height:30px;accent-color:#2E8540;flex:none"><span>%s</span></label>' % t for t in items)
    return '<div id="%s" class="chk col" style="gap:12px">%s<p class="chk-s" style="font-size:26px;font-weight:700;color:#C2410C">0 / %d tamam</p></div>' % (id, li, len(items))
