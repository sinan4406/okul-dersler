/* Ortak sınav motoru. Soru tipleri: mc, tf, fill, multi */
(function () {
  const C = window.SINAV;
  const Q = C.questions;
  const state = { i: 0, ans: Q.map(() => null), flag: Q.map(() => false), left: C.minutes * 60, timer: null, name: "" };
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const norm = (s) => String(s).toLowerCase().replace(/\s+/g, "").replace(/["']/g, "");
  const fmt = (s) => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");

  function init() {
    document.title = C.title;
    $("title").textContent = C.title;
    $("sub").textContent = C.subtitle;
    $("chips").innerHTML = [
      Q.length + " soru", C.minutes + " dakika", "Başarı sınırı: %" + C.passPercent, "Her soru eşit puan",
    ].map((t) => '<span class="chip">' + t + "</span>").join("");
    $("rules").innerHTML = C.rules.map((r) => "<li>" + r + "</li>").join("");
    $("topics").innerHTML = C.topics.map((t) => "<li>" + t + "</li>").join("");
    $("start").onclick = start;
  }

  function start() {
    state.name = $("name").value.trim();
    $("intro").classList.add("hidden");
    $("exam").classList.remove("hidden");
    state.timer = setInterval(tick, 1000);
    render();
  }

  function tick() {
    state.left--;
    const t = $("timer");
    t.textContent = fmt(Math.max(state.left, 0));
    t.classList.toggle("low", state.left <= 300);
    if (state.left <= 0) finish(true);
  }

  function answered(i) {
    const a = state.ans[i];
    if (a === null) return false;
    if (Array.isArray(a)) return a.length > 0;
    return String(a).trim() !== "";
  }

  function optionsOf(q) {
    return q.t === "tf" ? ["Doğru", "Yanlış"] : q.opts;
  }

  function render() {
    const q = Q[state.i];
    let h = '<div class="qno">Soru ' + (state.i + 1) + " / " + Q.length + " · " + q.topic + "</div>";
    h += '<p class="qtext">' + q.q + "</p>";
    if (q.code) h += '<pre class="code">' + esc(q.code) + "</pre>";
    if (q.t === "fill") {
      h += '<input type="text" id="fillIn" autocomplete="off" placeholder="Cevabınızı yazın" value="' + esc(state.ans[state.i] || "").replace(/"/g, "&quot;") + '">';
    } else {
      const multi = q.t === "multi";
      if (multi) h += '<div class="sub" style="margin:0 0 6px">Birden fazla doğru cevap vardır.</div>';
      optionsOf(q).forEach((o, k) => {
        const a = state.ans[state.i];
        const sel = multi ? Array.isArray(a) && a.includes(k) : a === k;
        h += '<label class="opt' + (sel ? " sel" : "") + '"><input type="' + (multi ? "checkbox" : "radio") + '" name="o" value="' + k + '"' + (sel ? " checked" : "") + "><span>" + o + "</span></label>";
      });
    }
    $("question").innerHTML = h;
    if (q.t === "fill") {
      $("fillIn").oninput = (e) => { state.ans[state.i] = e.target.value; paint(); };
    } else {
      $("question").querySelectorAll("input").forEach((inp) => {
        inp.onchange = () => {
          const k = +inp.value;
          if (q.t === "multi") {
            const cur = Array.isArray(state.ans[state.i]) ? state.ans[state.i].slice() : [];
            const at = cur.indexOf(k);
            at >= 0 ? cur.splice(at, 1) : cur.push(k);
            state.ans[state.i] = cur;
          } else state.ans[state.i] = k;
          render();
        };
      });
    }
    paint();
  }

  function paint() {
    const n = Q.filter((_, i) => answered(i)).length;
    $("prog").style.width = (n / Q.length) * 100 + "%";
    $("count").textContent = n + " / " + Q.length + " cevaplandı";
    $("prev").disabled = state.i === 0;
    $("next").disabled = state.i === Q.length - 1;
    $("flagBtn").textContent = state.flag[state.i] ? "⚑ İşareti kaldır" : "⚐ Sonra bak";
    $("palette").innerHTML = Q.map((_, i) =>
      '<button data-i="' + i + '" class="' + [answered(i) ? "done" : "", i === state.i ? "cur" : "", state.flag[i] ? "flag" : ""].join(" ") + '">' + (i + 1) + "</button>").join("");
    $("palette").querySelectorAll("button").forEach((b) => (b.onclick = () => { state.i = +b.dataset.i; render(); }));
  }

  function isCorrect(q, a) {
    if (a === null) return false;
    if (q.t === "fill") return q.ans.some((x) => norm(x) === norm(a));
    if (q.t === "multi") {
      const s = [...(a || [])].sort().join(",");
      return s === [...q.ans].sort().join(",");
    }
    return a === q.ans;
  }

  function correctText(q) {
    if (q.t === "fill") return q.ans[0];
    const o = optionsOf(q);
    return (q.t === "multi" ? q.ans : [q.ans]).map((k) => o[k]).join(" · ");
  }
  function givenText(q, a) {
    if (!answered(Q.indexOf(q))) return "<em>Boş bırakıldı</em>";
    if (q.t === "fill") return "<code>" + esc(a) + "</code>";
    const o = optionsOf(q);
    return (q.t === "multi" ? a : [a]).map((k) => o[k]).join(" · ");
  }

  function finish(auto) {
    clearInterval(state.timer);
    const modal = document.querySelector(".modal");
    if (modal) modal.remove();
    $("exam").classList.add("hidden");
    $("result").classList.remove("hidden");
    window.scrollTo(0, 0);

    let ok = 0;
    const per = {};
    Q.forEach((q, i) => {
      const r = isCorrect(q, state.ans[i]);
      if (r) ok++;
      per[q.topic] = per[q.topic] || { ok: 0, n: 0 };
      per[q.topic].n++;
      if (r) per[q.topic].ok++;
    });
    const empty = Q.filter((_, i) => !answered(i)).length;
    const pct = Math.round((ok / Q.length) * 100);
    const passed = pct >= C.passPercent;
    const used = C.minutes * 60 - Math.max(state.left, 0);

    let h = '<div class="card"><h1>Sınav Sonucu</h1>';
    if (state.name) h += '<p class="sub">' + esc(state.name) + " · " + new Date().toLocaleString("tr-TR") + "</p>";
    if (auto) h += '<p class="exp">Süre dolduğu için sınav otomatik olarak bitirildi.</p>';
    h += '<p class="score ' + (passed ? "pass" : "fail") + '">%' + pct + "</p>";
    h += "<p><strong>" + (passed ? "Başarılı" : "Tekrar çalışmanız önerilir") + "</strong> — " + ok + " doğru, " + (Q.length - ok - empty) + " yanlış, " + empty + " boş · Geçen süre: " + fmt(used) + "</p>";
    h += "<h2>Konu bazında sonuç</h2><table><tr><th>Konu</th><th>Doğru</th><th>Oran</th></tr>";
    Object.keys(per).forEach((t) => {
      h += "<tr><td>" + t + "</td><td>" + per[t].ok + " / " + per[t].n + "</td><td>%" + Math.round((per[t].ok / per[t].n) * 100) + "</td></tr>";
    });
    h += '</table><div class="nav"><button class="primary" onclick="location.reload()">Sınavı yeniden başlat</button><button onclick="window.print()">Yazdır</button></div></div>';
    h += "<h2>Soru soru inceleme</h2>";
    Q.forEach((q, i) => {
      const r = isCorrect(q, state.ans[i]);
      h += '<div class="card rev ' + (r ? "ok" : "bad") + '"><div class="qno">Soru ' + (i + 1) + " · " + q.topic + '<span class="tag ' + (r ? "ok" : "bad") + '">' + (r ? "Doğru" : "Yanlış") + "</span></div>";
      h += '<p class="qtext">' + q.q + "</p>";
      if (q.code) h += '<pre class="code">' + esc(q.code) + "</pre>";
      h += "<div><strong>Cevabınız:</strong> " + givenText(q, state.ans[i]) + "</div>";
      if (!r) h += "<div><strong>Doğru cevap:</strong> " + correctText(q) + "</div>";
      h += '<div class="exp">' + q.exp + "</div></div>";
    });
    $("result").innerHTML = h;
  }

  function confirmFinish() {
    const empty = Q.filter((_, i) => !answered(i)).length;
    const flagged = state.flag.filter(Boolean).length;
    const m = document.createElement("div");
    m.className = "modal";
    m.innerHTML = '<div class="box"><h2 style="margin-top:0">Sınavı bitirmek istiyor musunuz?</h2><p>' +
      (empty ? "<strong>" + empty + "</strong> soru boş. " : "Tüm sorular cevaplandı. ") +
      (flagged ? "<strong>" + flagged + "</strong> soru işaretli. " : "") +
      'Bitirdikten sonra cevaplar değiştirilemez.</p><div class="btns"><button id="mNo">Sınava dön</button><button class="primary" id="mYes">Sınavı bitir</button></div></div>';
    document.body.appendChild(m);
    $("mNo").onclick = () => m.remove();
    $("mYes").onclick = () => finish(false);
  }

  document.addEventListener("DOMContentLoaded", () => {
    init();
    $("prev").onclick = () => { state.i--; render(); };
    $("next").onclick = () => { state.i++; render(); };
    $("flagBtn").onclick = () => { state.flag[state.i] = !state.flag[state.i]; paint(); };
    $("finish").onclick = confirmFinish;
    $("timer").textContent = fmt(state.left);
  });
})();
