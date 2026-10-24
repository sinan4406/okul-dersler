// Okulum projesi — script.js
// Hafta 17'den: "Bölümlerimiz" listesi bir diziden forEach ile üretiliyor.
// Hafta 16'dan (varsayılan): iletişim formunun basit if/else ile doğrulanması.
// Hafta 18 (BU HAFTA) — YENİ: setInterval ile canlı saat, setTimeout ile bildirimin
// birkaç saniye sonra otomatik kaybolması. Bu, projenin bu dönem için SON eklentisidir.

// ---- Hafta 18 — YENİ: Canlı saat (setInterval) ----
const saatElemani = document.getElementById("canli-saat");
if (saatElemani) {
  function saatiGuncelle() {
    saatElemani.textContent = new Date().toLocaleTimeString("tr-TR");
  }
  saatiGuncelle();              // sayfa açılır açılmaz bir kez hemen göster
  setInterval(saatiGuncelle, 1000); // sonra her saniye güncelle
}

// ---- Hafta 17 — Bölümler dizisi ----
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

// ---- İletişim formu doğrulama + Hafta 18 YENİ: setTimeout ile bildirim otomatik kaybolur ----
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
      return; // hata mesajını otomatik silmiyoruz, kullanıcı düzeltene kadar kalsın
    }

    bildirim.textContent = "Teşekkürler " + ad + ", mesajınız alındı.";
    bildirim.style.color = "green";

    // Hafta 18 — YENİ: başarı bildirimi 4 saniye sonra kendiliğinden kaybolsun
    setTimeout(function () {
      bildirim.textContent = "";
    }, 4000);
  });
}
