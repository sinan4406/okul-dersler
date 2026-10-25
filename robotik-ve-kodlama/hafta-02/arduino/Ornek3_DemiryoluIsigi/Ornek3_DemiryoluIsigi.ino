/*
  ROBOTİK KODLAMA 10 - 2. HAFTA - ÖRNEK 3 (ÖNCEKİ HAFTALARLA BİRLEŞTİRME): DEMİRYOLU GEÇİDİ  (2 LED)
  ----------------------------------------------------------------------
  Senaryo : Hemzemin geçitte iki kırmızı ışık dönüşümlü yanar. 1. haftada öğrendiğin pin bilgisiyle
            D13 ve D8 seçildi (D0 ve D1 seri haberleşmeye ayrıldığı için kullanılmaz).
  Kazanım : İki pini birlikte sürmek; pinMode, digitalWrite ve delay'i birleştirmek.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (kırmızı)         2     Her LED'in uzun bacağı kendi direncinden gelir, kısa bacaklar GND hattında
    Direnç 220 ohm        2     D13 ve D8 ile LED anotları arasında (her LED'in kendi direnci)
    Jumper kablo          3     D13 -> direnç 1, D8 -> direnç 2, GND -> mavi (-) hat

  TINKERCAD: Her LED için ayrı direnç kullan; iki LED'i tek dirence bağlama. Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(13, OUTPUT);     // D13: sol ışık çıkış
  pinMode(8, OUTPUT);      // D8: sağ ışık çıkış
}

void loop() {
  digitalWrite(13, HIGH);  // sol ışık yanar
  digitalWrite(8, LOW);    // sağ ışık sönük
  delay(500);              // yarım saniye bekle
  digitalWrite(13, LOW);   // sol ışık söner
  digitalWrite(8, HIGH);   // sağ ışık yanar
  delay(500);              // yarım saniye bekle
}

/*
  DEĞİŞTİR VE GÖZLE
  1) Her iki delay(500) değerini 250 yap. Her ışık saniyede kaç kez yanar?
  2) 8. satırdaki digitalWrite(8, LOW); satırını sil. D8'deki LED ne yapar?
*/
