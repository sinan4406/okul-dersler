// GÖREV: Bu dosyada, tarayıcı konsolunda hata verdiren VEYA yanlış sonuç
// üreten 4 hata var. hesap-makinesi.html ile birlikte test edin, konsoldaki
// (F12) hata mesajlarını okuyarak ve bu haftaki konuları hatırlayarak
// hataları bulup düzeltin.

var sayi1 = document.querySelector("#sayi1").value;
var sayi2 = document.querySelector("#sayi2").value;

const toplam = sayi1 + sayi2;

console.log("Toplam: " toplam);

const mesaj = `Sonuç: ${toplam}`;
document.querySelector("#sonuc").textContent = mesaj;
