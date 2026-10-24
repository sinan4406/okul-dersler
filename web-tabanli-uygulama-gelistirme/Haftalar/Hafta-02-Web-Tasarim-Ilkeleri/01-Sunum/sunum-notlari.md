# Sunum Notları — Hafta 2: Web Tasarım İlkeleri

> Bu hafta, MEB müfredatının tanımladığı 7 web tasarım ilkesini işliyoruz: İçerik, Tasarım, Biçimsellik,
> İşlevsellik ve Kullanılabilirlik, Güncellik, Uygunluk ve Güvenilirlik, Uyumluluk. Her ilkeye güncel bir
> teknoloji notu eklenmiştir.

## 1. İçerik

Tasarımdan önce gelen ilk soru: **"Bu sitede ne anlatılacak?"** İyi bir tasarım, kötü/eksik içeriği kurtaramaz.
İçerik planlaması şunları kapsar:
- Kullanılacak metinlerin belirlenmesi (kısa, net, hedef kitleye uygun dil)
- Kullanılacak görsellerin/videoların belirlenmesi (telifsiz/kendi ürettiğiniz görseller kullanılmalı)

Anlatım önerisi: Öğrencilere "Bir siteye girip 3 saniye içinde ne yaptığını anlayamıyorsanız, o sitenin içerik
planlaması başarısızdır" fikrini örnekleyin (kötü tasarlanmış bir site ekran görüntüsü gösterin).

## 2. Tasarım (Yerleşim Planı)

Sayfadaki öğelerin (logo, menü, içerik, footer) nerede duracağının planlanmasıdır. Klasik bir web sayfası
yerleşimi genellikle şöyledir:

```
┌─────────────────────────────┐
│           HEADER             │  ← Logo, site adı, menü
├─────────────────────────────┤
│                               │
│        ANA İÇERİK ALANI      │  ← Sayfanın asıl konusu
│                               │
├───────────────┬───────────────┤
│   SIDEBAR      │  (opsiyonel)  │  ← Ek bağlantılar, reklam vb.
├─────────────────────────────┤
│           FOOTER             │  ← İletişim, telif, alt menü
└─────────────────────────────┘
```

Bu yerleşim, Hafta 5'te HTML5 semantik etiketleriyle (`<header>`, `<main>`, `<aside>`, `<footer>`) birebir
eşleşecek — bu bağlantıyı öğrencilere şimdiden hatırlatın, gelecek haftalara merak uyandırır.

## 3. Biçimsellik (Renk, Tipografi, Okunabilirlik)

- **Renk düzeni:** Genelde 1 ana renk + 1-2 tamamlayıcı renk + nötr tonlar (beyaz/gri/siyah) kullanılır. Çok fazla
  renk karmaşa yaratır.
- **Tipografi:** Başlıklar için farklı, gövde metni için farklı (ama uyumlu) font kullanımı; okunabilir font
  boyutu (gövde metni genelde 16px ve üzeri).
- **İçerik-tasarım ilişkisi:** Renk ve yazı tipi seçimi, sitenin amacına uygun olmalı (örn. bir çocuk sitesi
  canlı renkler kullanabilir, bir hukuk bürosu sitesi daha sade/ciddi renkler tercih eder).

**Güncel not:** Modern CSS'te `hsl()` ve `oklch()` gibi renk fonksiyonları ile daha tutarlı renk paletleri
oluşturulabiliyor; CSS özel değişkenleri (`--ana-renk: #2563eb;`) ile tüm sitede tek noktadan renk yönetimi
yapmak artık standart bir uygulama (detayına Hafta 11'de gireceğiz).

## 4. İşlevsellik ve Kullanılabilirlik

- Web sitesinin **kullanıcı dostu** olması: Menüler kolay bulunabilmeli, butonlar ne işe yaradığını belli
  etmeli.
- **Erişim kolaylığı:** Ziyaretçi aradığını az tıklamayla bulabilmeli.
- **Site haritası (sitemap):** Sitenin tüm sayfalarının hiyerarşik listesi — hem kullanıcı hem arama motorları için önemli.

**Güncel not — Erişilebilirlik (Accessibility):** Günümüzde "kullanılabilirlik" kavramı, engelli kullanıcılar
için de siteyi kullanılabilir kılmayı kapsıyor (WCAG 2.2 standardı). Örnek: Görme engelli bir kullanıcı, ekran
okuyucu (screen reader) ile sitenizi "dinler" — bu yüzden görsellere `alt` metni eklemek (Hafta 6) ve anlamlı
HTML etiketleri kullanmak zorunludur, sadece "güzel görünsün" diye değil.

## 5. Güncellik

- Sitede kullanılan **teknolojilerin** ve **içeriğin** güncel tutulması gerekir.
- Eski, bakımsız görünen bir site, ziyaretçide güvensizlik hissi yaratır.
- Çalışılacak platform, yeni nesil teknolojilere uygun seçilmelidir.

**Güncel not:** Bu dersin kendisi de bu ilkenin bir örneği — 2020 tarihli ders kitabındaki bazı bilgiler (örn.
teknoloji sürümleri) güncelliğini yitirmiş olabilir, bu yüzden her ünitede "Güncel Konu Notu" ekliyoruz.
Öğrencilere, öğrendikleri her teknolojinin birkaç yıl içinde güncelleneceğini, bu yüzden "öğrenmeyi öğrenmenin"
önemini vurgulayın.

## 6. Uygunluk ve Güvenilirlik

- **Alan adının** site içeriğiyle uyumlu ve akılda kalıcı olması.
- **Özgün içerik** kullanılması (başka sitelerden kopyalanmamış).
- **Dilbilgisi kurallarına** uyulması — yazım hataları, sitenin güvenilirliğini düşürür.

## 7. Uyumluluk (Tarayıcı Uyumluluğu ve Responsive Tasarım)

- Bir web sitesi; Chrome, Edge, Firefox, Safari gibi **farklı tarayıcılarda** sorunsuz çalışmalıdır (tarayıcı
  uyumluluk testi).
- **Responsive (duyarlı) tasarım:** Site, telefon/tablet/bilgisayar gibi farklı ekran boyutlarında düzgün
  görünmelidir.
- **Media query:** CSS'te "ekran şu boyuttan küçükse bu stili uygula" mantığıyla çalışan kurallardır (Hafta 12'de
  detaylı işlenecek).

**Güncel not:** 2026 itibarıyla internet trafiğinin büyük çoğunluğu mobil cihazlardan geliyor — bu yüzden
tasarımcılar artık **mobile-first** (önce mobil, sonra masaüstü) yaklaşımını benimsiyor. Ayrıca CSS'in yeni
**container query** özelliği (`@container`), sadece ekran boyutuna değil, bir bileşenin kendi kapladığı alana
göre stil uygulanmasına imkân tanıyor — Hafta 12'de bu konuya değineceğiz.

---

## Ders Sonu Özeti (Slaytın Son Sayfası İçin)

**7 İlke:** İçerik → Tasarım → Biçimsellik → İşlevsellik/Kullanılabilirlik → Güncellik → Uygunluk/Güvenilirlik → Uyumluluk

Bu 7 ilke, ilerleyen haftalarda kuracağımız **Kütüphane Takip Sistemi** projesinin arayüzünü tasarlarken
kontrol listemiz olacak.
