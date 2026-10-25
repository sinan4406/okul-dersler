/*
  ROBOTİK KODLAMA 10 - 4. HAFTA - ÖRNEK 1 (TEMEL): BLINK, IDE'NİN HAZIR ÖRNEĞİ  (devre elemanı yok)
  ----------------------------------------------------------------------
  Senaryo : Arduino IDE'de Dosya > Örnekler > 01.Basics > Blink yolu ile açılan hazır program (kitap s.58).
            Kartın üzerindeki yerleşik "L" LED'i 1 saniye yanar, 1 saniye söner.
  Kazanım : IDE'yi kullanmak, programı derleyip karta yüklemek, LED_BUILTIN sabitini tanımak.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     USB kablosuyla bilgisayara
    USB kablosu (A-B)     1     Bilgisayar - Arduino Uno

  YÜKLEME ADIMLARI
    1) Araçlar > Kart > Arduino Uno seç.   2) Araçlar > Port > COM numarasını seç (kart bağlıyken görünür).
    3) Derle (onay işareti) düğmesi: hata var mı?   4) Yükle (sağ ok) düğmesi: kart yanıp sönmeye başlar.
  TINKERCAD: Arduino Uno > Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);       // yerleşik LED çıkış olsun
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);    // LED'i yak
  delay(1000);                        // 1 saniye bekle
  digitalWrite(LED_BUILTIN, LOW);     // LED'i söndür
  delay(1000);                        // 1 saniye bekle
}

/*
  DEĞİŞTİR VE GÖZLE
  1) İlk delay(1000) değerini 200 yap, derle ve yükle. LED nasıl yanıp söner?
  2) LED_BUILTIN yerine 13 yaz (üç yerde). Program aynı çalışır mı? Neden?
*/
