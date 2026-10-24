// Anadolu Teknik Lisesi — Okulum Projesi — Hafta 15: Olaylar ve Fonksiyonlar
// Bu dosya hem index.html hem iletisim.html'e bağlıdır, bu yüzden her sayfada
// bulunmayan elemanları seçmeden önce kontrol ediyoruz (aksi hâlde index.html
// açıldığında "iletisim-formu bulunamadı" hatası alırız).

// --- Hafta 14'ten kalan kısım (index.html'de çalışır) ---
const baslikElemani = document.querySelector("#okul-basligi");
if (baslikElemani) {
  console.log("Seçilen eleman:", baslikElemani);
}

// --- Fonksiyon tanımlama: form doğrulama mesajını göstermek için ---
function geriBildirimGoster(kutu, tur, metin) {
  kutu.textContent = metin;
  kutu.classList.remove("basarili", "hata");
  kutu.classList.add(tur); // "basarili" ya da "hata"
}

// --- Olay dinleyicisi: iletişim formu gönderildiğinde ---
const iletisimFormu = document.querySelector("#iletisim-formu");

if (iletisimFormu) {
  iletisimFormu.addEventListener("submit", function (e) {
    // e.preventDefault() olmadan tarayıcı sayfayı yeniden yükler ve
    // yazdığımız her şey kaybolur — bu satır sayfanın yenilenmesini engeller.
    e.preventDefault();

    const geriBildirimKutusu = document.querySelector("#form-geri-bildirim");
    geriBildirimGoster(geriBildirimKutusu, "basarili", "Mesajınız alındı, teşekkür ederiz!");

    console.log("Form gönderildi:", {
      ad: document.querySelector("#ad").value,
      eposta: document.querySelector("#eposta").value,
      mesaj: document.querySelector("#mesaj").value,
    });
  });
}
