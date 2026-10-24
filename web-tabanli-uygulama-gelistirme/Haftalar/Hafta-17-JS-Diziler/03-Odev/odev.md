# Ödev — Hafta 17: Diziler

## Görev 1 — Hata Avcısı: İkinci Tur

`favori-renkler.html` adında bir dosya oluşturun. İçine aşağıdaki (kasıtlı olarak hatalı) kodu yazın:

```html
<script>
  const renkler = ["Mavi", "Yeşil", "Kırmızı", "Sarı"];
  for (let i = 1; i <= renkler.length; i++) {
    console.log(renkler[i]);
  }
</script>
```

Bu kodu çalıştırıp konsol çıktısını inceleyin. **İki ayrı hata** vardır (biri "Mavi" yazısının hiç
görünmemesi, diğeri son satırın `undefined` olması). Her iki hatayı da bulup düzeltin, düzeltilmiş kodu
ve "neden hatalıydı" açıklamanızı birlikte teslim edin.

## Görev 2 — Kendi Diziniz: Sınıf Notları

`sinif-notlari.html` adında bir dosya oluşturun. İçinde:

- [ ] En az 6 sayıdan oluşan bir `notlar` dizisi tanımlayın.
- [ ] `for` döngüsü ile tüm notları sayfaya (bir `<ul>` içine) yazdırın.
- [ ] `forEach()` kullanarak notların **toplamını** hesaplayıp `<p>` içinde gösterin (ipucu: döngü dışında
      `toplam` adında bir değişken tanımlayıp her adımda üzerine ekleyin).
- [ ] Notların **ortalamasını** hesaplayıp (`toplam / notlar.length`) sayfada gösterin.
- [ ] `Math.max(...notlar)` kullanarak en yüksek notu bulun ve sayfada gösterin (bu, derste görmediğimiz
      küçük bir ek özellik — araştırıp kullanmayı deneyin).

## Görev 3 — Kısa Cevaplı Sorular

1. Bir dizide 7 eleman varsa, son elemanın index'i kaçtır? Neden?
2. `dizi[10]` gibi var olmayan bir index'e erişirsek ne olur? Bu davranış neden tehlikeli olabilir?
3. `forEach()` ile `map()` arasındaki en önemli fark nedir?
4. `push()` ve `pop()` metotları ne işe yarar?

---

## Öğretmen İçin Değerlendirme Ölçütleri

| Ölçüt | Puan |
|---|---|
| Görev 1 — her iki hata da doğru tespit edilmiş ve düzeltilmiş, açıklama doğru | 30 |
| Görev 2 — tüm kontrol listesi maddeleri çalışır şekilde tamamlanmış | 45 |
| Görev 3 — 4 soru da doğru ve kendi cümleleriyle cevaplanmış | 20 |
| Zamanında teslim | 5 |

Cevap anahtarı için bkz. [`cevap-anahtari/`](./cevap-anahtari/).
