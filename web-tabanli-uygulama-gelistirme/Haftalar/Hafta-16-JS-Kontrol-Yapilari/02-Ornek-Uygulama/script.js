// Anadolu Teknik Lisesi — Okulum Projesi — Hafta 16: Kontrol Yapıları
// Bu dosya hem index.html hem iletisim.html'e bağlıdır.

// --- Hafta 14'ten kalan kısım (index.html'de çalışır) ---
const baslikElemani = document.querySelector("#okul-basligi");
if (baslikElemani) {
  console.log("Seçilen eleman:", baslikElemani);
}

// --- Fonksiyon: geri bildirim mesajı göstermek için (Hafta 15'ten) ---
function geriBildirimGoster(kutu, tur, metin) {
  kutu.textContent = metin;
  kutu.classList.remove("basarili", "hata");
  kutu.classList.add(tur); // "basarili" ya da "hata"
}

// --- YENİ (Hafta 16): form gönderilmeden önce if/else ile alan kontrolü ---
const iletisimFormu = document.querySelector("#iletisim-formu");

if (iletisimFormu) {
  iletisimFormu.addEventListener("submit", function (e) {
    e.preventDefault();

    const ad = document.querySelector("#ad").value;
    const eposta = document.querySelector("#eposta").value;
    const mesaj = document.querySelector("#mesaj").value;
    const geriBildirimKutusu = document.querySelector("#form-geri-bildirim");

    // Kontrol 1: Ad alanı boş mu?
    if (ad === "") {
      geriBildirimGoster(geriBildirimKutusu, "hata", "Lütfen adınızı yazın.");
      return; // fonksiyonu burada durdur, devam etme
    }

    // Kontrol 2: E-posta gerçekten "@" içeriyor mu?
    // (includes() bir string metodu — bir metnin içinde başka bir metin
    // olup olmadığını true/false olarak döner.)
    if (!eposta.includes("@")) {
      geriBildirimGoster(geriBildirimKutusu, "hata", "Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    // Kontrol 3: Mesaj alanı boş mu?
    if (mesaj === "") {
      geriBildirimGoster(geriBildirimKutusu, "hata", "Lütfen bir mesaj yazın.");
      return;
    }

    // Tüm kontrollerden geçtiyse:
    geriBildirimGoster(geriBildirimKutusu, "basarili", "Mesajınız alındı, teşekkür ederiz!");
    console.log("Form gönderildi:", { ad, eposta, mesaj });
  });
}
