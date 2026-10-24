# Ödev — Hafta 14: Javascript'e Giriş, Değişkenler ve Veri Tipleri

## Görev 1 — Bozuk Hesap Makinesini Onarın (Kod Tamamlama)

[`hesap-makinesi.html`](./hesap-makinesi.html) dosyasını tarayıcıda açın, konsolu (F12) açık tutun.
Bağlı olan [`bozuk-hesap-makinesi.js`](./bozuk-hesap-makinesi.js) dosyasında **4 hata** var — bazıları
konsolda kırmızı hata mesajı olarak görünecek, bazıları ise sessizce yanlış sonuç üretecek.

**Yapmanız gerekenler:**
1. Sayfayı açıp konsoldaki hata mesaj(lar)ını okuyun — Javascript hata mesajları genelde hangi satırda
   ne tür bir sorun olduğunu söyler, İngilizce de olsa dikkatlice okumaya çalışın.
2. `bozuk-hesap-makinesi.js` dosyasını VS Code'da açıp bu hafta işlediğimiz konuları (değişken tanımlama,
   veri tipleri, `Number()` ile çevirme, HTML eleman seçme) tek tek kontrol ederek hataları bulun.
3. Bulduğunuz her hatayı bir liste hâlinde yazın: "X. satırda ... hatası vardı çünkü ...".
4. Hataları düzeltip dosyayı kaydedin, sayfayı yeniden açıp iki sayının artık **doğru toplandığını**
   doğrulayın (örn. `5` ve `8` yazınca `13` çıkmalı, `58` değil).

> **İpucu:** Hatalardan biri, HTML'deki bir elemanın `id`'si ile JS'teki seçicinin **birbirini
> tutmamasından** kaynaklanıyor — HTML dosyasını da dikkatlice okuyun.

## Görev 2 — Kendi Bilgi Kartınız

`bilgi-kartim.js` adında yeni bir dosya ve onu bağlayan basit bir `bilgi-kartim.html` oluşturun.
JS dosyasında:

- [ ] Kendinizle ilgili en az 5 farklı değişken tanımlayın (`let`/`const` kullanın, `var` **kullanmayın**):
      ad, yaş, sınıf, en sevdiğiniz ders, okula yürüyerek mi geldiğiniz (boolean) gibi.
- [ ] Her değişkenin veri tipini `typeof` ile konsola yazdırın.
- [ ] Şablon dizgesi (`` ` `` ve `${}`) kullanarak tüm bilgileri tek bir cümlede birleştiren bir
      `bilgiKarti` değişkeni oluşturun ve konsola yazdırın.
- [ ] `bilgiKarti` değişkenini `document.querySelector()` ile seçtiğiniz bir HTML elemanının içine
      (`textContent`) yazdırın — yani bilgi sayfada da görünsün, sadece konsolda değil.

## Görev 3 — Kısa Cevaplı Sorular

1. `let`, `const` ve `var` arasındaki fark nedir? Bu derste neden `var` kullanmıyoruz?
2. `"5" + 3` işleminin sonucu nedir, neden? `Number("5") + 3` ile farkı ne olurdu?
3. `typeof` operatörü ne işe yarar? Bir örnek verin.
4. `input.value` ile aldığımız bir değer neden her zaman string'dir?
5. Şablon dizgesi (template literal) kullanmanın eski `+` ile birleştirmeye göre avantajı nedir?

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Görev 1 — 4 hata da doğru tespit edilmiş ve düzeltilmiş, hesap makinesi doğru çalışıyor | 35 |
| Görev 2 — en az 5 değişken, doğru veri tipleri, şablon dizgesi ve sayfaya yazdırma tamamlanmış | 40 |
| Görev 3 — 5 soru da kendi cümleleriyle, doğru anlaşılmış şekilde cevaplanmış | 20 |
| Zamanında teslim | 5 |

