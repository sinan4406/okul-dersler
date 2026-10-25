/*
  ROBOTİK KODLAMA 10 - 2. HAFTA - ÖRNEK 4 (SEKTÖR): ENDÜSTRİYEL ROBOT KOLU UYARI IŞIĞI  (2 LED)
  ----------------------------------------------------------------------
  Senaryo : Fabrikada kaynak robotunun yanında iki ışık vardır. Yeşil: "robot durdu, yaklaşabilirsin".
            Sarı üç kez hızlı çakar: "robot hareket edecek, uzak dur". Tur 3500 ms.
  Kazanım : Robot türlerinden endüstriyel robotun güvenlik ışığını kodlamak.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (yeşil)           1     Uzun bacak dirençten gelir, kısa bacak GND hattında
    LED (sarı)            1     Uzun bacak dirençten gelir, kısa bacak GND hattında
    Direnç 220 ohm        2     D6 ve D7 ile LED anotları arasında (her LED'in kendi direnci)
    Jumper kablo          3     D6 -> direnç 1, D7 -> direnç 2, GND -> mavi (-) hat

  TINKERCAD: Her LED için ayrı direnç kullan. Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(6, OUTPUT);      // D6: yeşil ışık çıkış
  pinMode(7, OUTPUT);      // D7: sarı ışık çıkış
}

void loop() {
  digitalWrite(6, HIGH);   // yeşil yan: robot durdu, güvenli
  delay(2000);             // 2 saniye güvenli süre
  digitalWrite(6, LOW);    // yeşil sön: uyarı başlıyor
  digitalWrite(7, HIGH);   // sarı 1. çakma
  delay(250);              // 250 ms yanık
  digitalWrite(7, LOW);    // sarı sön
  delay(250);              // 250 ms sönük
  digitalWrite(7, HIGH);   // sarı 2. çakma
  delay(250);              // 250 ms yanık
  digitalWrite(7, LOW);    // sarı sön
  delay(250);              // 250 ms sönük
  digitalWrite(7, HIGH);   // sarı 3. çakma
  delay(250);              // 250 ms yanık
  digitalWrite(7, LOW);    // sarı sön
  delay(250);              // 250 ms sönük: robot hareket eder, tur biter
}

/*
  DEĞİŞTİR VE GÖZLE
  1) delay(2000) değerini 4000 yap. Bir tur kaç ms olur? Güvenli süre uzar mı kısalır mı?
  2) digitalWrite(6, LOW); satırını sil. Sarı çakarken yeşil ne yapar? Bu neden tehlikelidir?
*/
