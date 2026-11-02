/*
  ROBOTİK KODLAMA 10 - 8. HAFTA - ÖRNEK 2 (UYGULAMA): DEMİRYOLU GEÇİDİ UYARI IŞIĞI  (3 LED, for)
  ----------------------------------------------------------------------
  Senaryo : Hemzemin geçitte yol açıkken yeşil yanar. Tren yaklaşınca iki kırmızı lamba
            dönüşümlü yanıp söner (6 kez).
  Kazanım : Pin adları + for döngüsü (7. hafta) birleşimi; iki çıkışı dönüşümlü sürmek.

  MALZEME LİSTESİ
    Arduino Uno 1 · Breadboard 1 · LED kırmızı 2 (D4, D3) · LED yeşil 1 (D2)
    Direnç 220 ohm 3 · Jumper kablo 4

  DEVRE
    1) GND -> mavi (-) hat. 2) Her LED'in katodu mavi hatta, anodu kendi 220 ohm direncine.
    3) D4 -> sol kırmızı, D3 -> sağ kırmızı, D2 -> yeşil.
*/

int solKirmizi = 4;   // sol kırmızı lamba
int sagKirmizi = 3;   // sağ kırmızı lamba
int yesil = 2;        // yol açık ışığı
int i;                // for sayacı

void setup() {
  pinMode(solKirmizi, OUTPUT);
  pinMode(sagKirmizi, OUTPUT);
  pinMode(yesil, OUTPUT);
}

void loop() {
  digitalWrite(yesil, HIGH);          // yol açık
  delay(3000);
  digitalWrite(yesil, LOW);           // tren geliyor
  for (i = 0; i < 6; i++) {           // 6 kez dönüşümlü
    digitalWrite(solKirmizi, HIGH);
    delay(500);
    digitalWrite(solKirmizi, LOW);
    digitalWrite(sagKirmizi, HIGH);
    delay(500);
    digitalWrite(sagKirmizi, LOW);
  }
}

/*
  DEĞİŞTİR VE GÖZLE
    - for içindeki 6 değerini 10 yap. Tren daha uzun mu geçer?
    - delay(500) değerlerini 250 yap. Yanıp sönme hızlanır.

  TOPLAM SÜRE (doğrulama): 3000 + 6 x (500 + 500) = 9000 ms
*/
