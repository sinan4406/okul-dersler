// GÖREV: Bu dosyada bilet fiyatını YANLIŞ hesaplatan 4 hata var. Fiyatlandırma
// şöyle olmalı: 0-6 yaş ücretsiz, 7-17 yaş 50 TL, 18-64 yaş 100 TL, 65+ yaş 40 TL.
// Farklı yaşlar deneyerek (örn. 5, 10, 30, 65, 70) her birinin doğru fiyatı
// verip vermediğini kontrol edin.

const btn = document.querySelector("#hesapla-btn");

btn.addEventListener("click", function () {
  const yasSayi = document.querySelector("#yas-input").value;

  if (typeof yasSayi === "number") {
    document.querySelector("#fiyat-sonuc").textContent = "Lütfen geçerli bir sayı girin.";
    return;
  }

  let fiyat;

  if (yasSayi = 6) {
    fiyat = 0;
  }

  if (yasSayi <= 17) {
    fiyat = 50;
  }

  if (yasSayi <= 64) {
    fiyat = 100;
  }

  if (yasSayi > 65) {
    fiyat = 40;
  }

  document.querySelector("#fiyat-sonuc").textContent = `Bilet fiyatı: ${fiyat} TL`;
});
