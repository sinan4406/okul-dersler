// Anadolu Teknik Lisesi — Okulum Projesi — Hafta 14: JS'e Giriş, Değişkenler
// Bu dosya index.html ve iletisim.html'nin en altında </body> öncesi bağlanır.

// 1) DOM seçici ile sayfadaki bir elemanı seçip konsola yazdırma
const baslikElemani = document.querySelector("#okul-basligi");
console.log("Seçilen eleman:", baslikElemani);

// 2) Değişkenler ve veri tipleri — okulun bilgileriyle
const okulAdi = "Anadolu Teknik Lisesi";      // string
const kurulusYili = 1998;                     // number
const ogrenciSayisi = 640;                    // number
const kayitAcik = true;                       // boolean

// 3) typeof ile veri tipini kontrol etme
console.log(typeof okulAdi);        // "string"
console.log(typeof kurulusYili);    // "number"
console.log(typeof kayitAcik);      // "boolean"

// 4) Şablon dizgesi (template literal) ile okunaklı metin oluşturma
const bilgiMetni = `${okulAdi}, ${kurulusYili} yılında kuruldu ve şu an ${ogrenciSayisi} öğrencisi var.`;
console.log(bilgiMetni);
