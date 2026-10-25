/*
  ROBOTİK KODLAMA 10 - 2. HAFTA - ÖRNEK 2 (UYGULAMA): ROBOT PİL UYARISI  (1 LED)
  ----------------------------------------------------------------------
  Senaryo : Bir robotun durum LED'i hata kodunu yanıp sönme sayısıyla söyler:
            "3 kısa yanıp sönme, sonra uzun bekleme" = pil azaldı, şarj et.
  Kazanım : delay süreleriyle bir desen (kalıp) üretmek; desenin tur süresini hesaplamak.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (sarı)            1     Uzun bacak (anot) dirençten gelir, kısa bacak (katot) GND hattında
    Direnç 220 ohm        1     D8 ile LED anodu arasında
    Jumper kablo          2     D8 -> direnç, GND -> mavi (-) hat

  TINKERCAD: Arduino Uno + Breadboard Small + LED (rengini sarı yap) + Resistor (220 ohm). Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(8, OUTPUT);      // D8: durum LED'i çıkış
}

void loop() {
  digitalWrite(8, HIGH);   // 1. kısa çakma: yan
  delay(200);              // 200 ms yanık kal
  digitalWrite(8, LOW);    // sön
  delay(200);              // 200 ms sönük kal
  digitalWrite(8, HIGH);   // 2. kısa çakma: yan
  delay(200);              // 200 ms yanık kal
  digitalWrite(8, LOW);    // sön
  delay(200);              // 200 ms sönük kal
  digitalWrite(8, HIGH);   // 3. kısa çakma: yan
  delay(200);              // 200 ms yanık kal
  digitalWrite(8, LOW);    // sön
  delay(1200);             // uzun bekleme: desen biter, baştan başlar
}

/*
  DEĞİŞTİR VE GÖZLE
  1) Son delay(1200) değerini 2200 yap. Bir tur kaç milisaniye olur?
  2) Üçüncü çakmanın 3 satırını (HIGH, delay(200), LOW) sil. Desen nasıl değişir, tur kaç ms olur?
*/
