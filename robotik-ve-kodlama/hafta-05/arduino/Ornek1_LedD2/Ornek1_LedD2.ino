/*
  ROBOTİK KODLAMA 10 - 5. HAFTA - ÖRNEK 1 (TEMEL): BREADBOARD'DA LED, D2 PİNİ  (1 LED)
  ----------------------------------------------------------------------
  Senaryo : Kitap s.62-63, 3. Uygulama. D2'ye bağlı LED 1 saniye yanar, 1 saniye söner.
  Kazanım : Breadboard üzerinde dirençli LED devresi kurmak; devre ile kodun aynı pini göstermesi.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     USB ile bilgisayara
    Breadboard            1     -
    LED (kırmızı)         1     Katot (kısa) mavi hatta, anot (uzun) dirençten
    Direnç 220 ohm        1     (kırmızı-kırmızı-kahverengi-altın) D2 ile LED anodu arasında
    Jumper kablo          2     GND -> mavi hat, D2 -> direnç

  LED BAĞLANTISI: Uno GND -> breadboard mavi (-) hat. LED'in kısa bacağı (katot) mavi hatta,
  uzun bacağı (anot) 220 ohm direncin bir ucuna; direncin öbür ucu ilgili pine. Direnç unutulursa LED zarar görür.
  YÜKLEME: Araçlar > Kart > Arduino Uno; Araçlar > Port > COM numarası; Yükle düğmesi.
  TINKERCAD: Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(2, OUTPUT);        // D2 çıkış olsun
}

void loop() {
  digitalWrite(2, HIGH);     // LED yanar
  delay(1000);               // 1 saniye bekle
  digitalWrite(2, LOW);      // LED söner
  delay(1000);               // 1 saniye bekle
}

/*
  DEĞİŞTİR VE GÖZLE
  1) Kitap s.46 "Sıra Sizde": LED'i 2 saniye aralıkla yakıp söndür. Hangi değerler değişir?
  2) LED'i D4'e taşı (kabloyu da). Kodda hangi satırlar değişir?
*/
