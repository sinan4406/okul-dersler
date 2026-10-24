/*
  ROBOTİK KODLAMA 10 - 7. HAFTA - ÖRNEK 2 (UYGULAMA): AMBULANS ÇAKARI  (2 LED)
  ----------------------------------------------------------------------
  Senaryo : Bir ambulansın çakar lambası önce kırmızıyı iki kez, sonra maviyi iki kez çaktırır.
  Kazanım : İki LED'i iki ayrı pinle sürmek; her LED'e ayrı direnç bağlamak.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (kırmızı)         1     D4 -> direnç -> LED anot; katot GND hattında
    LED (mavi)            1     D5 -> direnç -> LED anot; katot GND hattında
    Direnç 220 ohm        2     Her LED için birer tane
    Jumper kablo          3     D4, D5 ve GND bağlantıları

  DEVRE (adım adım)
    1) GND -> breadboard mavi (-) hat.
    2) İki LED'in katodunu (kısa bacak) mavi hatta bağla. Anotları ayrı sütunlara tak.
    3) Her anot sütununa kendi 220 ohm direncini tak; kırmızı için D4, mavi için D5.

  İPUCU: İki LED tek dirence bağlanmaz. Mavi LED'in gerilim düşümü daha yüksektir (yaklaşık 3 V),
         220 ohm yine güvenlidir; yalnız biraz daha az akım çeker.
*/

void setup() {
  pinMode(4, OUTPUT);     // D4: kırmızı çakar çıkış
  pinMode(5, OUTPUT);     // D5: mavi çakar çıkış
}

void loop() {
  digitalWrite(4, HIGH); delay(100);   // kırmızı 1. çakma
  digitalWrite(4, LOW);  delay(60);    // kırmızı kısa ara
  digitalWrite(4, HIGH); delay(100);   // kırmızı 2. çakma
  digitalWrite(4, LOW);  delay(140);   // kırmızı bitti, bekle
  digitalWrite(5, HIGH); delay(100);   // mavi 1. çakma
  digitalWrite(5, LOW);  delay(60);    // mavi kısa ara
  digitalWrite(5, HIGH); delay(100);   // mavi 2. çakma
  digitalWrite(5, LOW);  delay(140);   // mavi bitti, bekle
}

/*
  DEĞİŞTİR VE GÖZLE
    - Bütün delay(100) değerlerini 50 yap. Çakar hızlanır; aciliyet hissi artar mı?
    - Mavi çakmaları sil (son 4 satır). Yalnız kırmızı çakar kalır; D5 LED'i ne yapar?

  TOPLAM SÜRE (doğrulama): kırmızı 100 + 60 + 100 + 140 = 400 ms, mavi 400 ms -> 800 ms
*/
