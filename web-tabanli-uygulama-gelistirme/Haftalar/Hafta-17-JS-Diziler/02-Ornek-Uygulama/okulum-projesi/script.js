// Okulum projesi — script.js
// Hafta 16'ya kadar: iletişim formunun basit if/else ile doğrulanması (varsayımsal devam).
// Hafta 17 (BU HAFTA): "Bölümlerimiz" listesi artık HTML'e elle yazılmıyor, aşağıdaki
// diziden forEach ile üretiliyor.

// ---- Hafta 17 — YENİ: Bölümler dizisi ----
const bolumler = [
  "Bilişim Teknolojileri",
  "Elektrik-Elektronik Teknolojisi",
  "Makine Teknolojisi",
  "Muhasebe ve Finansman"
];

const bolumListesi = document.getElementById("bolum-listesi");
if (bolumListesi) {
  bolumler.forEach(function (bolum) {
    bolumListesi.innerHTML += "<li>" + bolum + "</li>";
  });
}

// ---- Hafta 16'dan (varsayılan) — İletişim formu doğrulama ----
const iletisimFormu = document.getElementById("iletisim-formu");
if (iletisimFormu) {
  iletisimFormu.addEventListener("submit", function (e) {
    e.preventDefault();
    const ad = document.getElementById("ad").value;
    const mesaj = document.getElementById("mesaj").value;
    const bildirim = document.getElementById("form-bildirim");

    if (ad.trim() === "" || mesaj.trim() === "") {
      bildirim.textContent = "Lütfen tüm alanları doldurun.";
      bildirim.style.color = "red";
    } else {
      bildirim.textContent = "Teşekkürler " + ad + ", mesajınız alındı.";
      bildirim.style.color = "green";
    }
  });
}
