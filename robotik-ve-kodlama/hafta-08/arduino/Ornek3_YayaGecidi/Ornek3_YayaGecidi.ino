/*
  ROBOTİK KODLAMA 10 - 8. HAFTA - ÖRNEK 3 (UYGULAMA): YAYA GEÇİDİ SİNYALİZASYONU  (5 LED)
  ----------------------------------------------------------------------
  Senaryo : Araçlar için kırmızı/sarı/yeşil, yayalar için kırmızı/yeşil lamba. Aynı anda araç ve
            yaya yeşili yanmaz. Yaya yeşili bitmeden önce yanıp söner (uyarı). Kitap s.73-74.
  Kazanım : 5 çıkışlı bir sıralamayı yalnız değişen pinleri yazarak kısaltmak.

  MALZEME LİSTESİ
    Arduino Uno 1 · Breadboard 1 · LED: kırmızı 2, sarı 1, yeşil 2 · Direnç 220 ohm 5 · Jumper kablo 6

  PİNLER
    D2 araç kırmızı · D3 araç sarı · D4 araç yeşil · D5 yaya kırmızı · D6 yaya yeşil
*/

int ak = 2;   // araç kırmızı
int as = 3;   // araç sarı
int ay = 4;   // araç yeşil
int yk = 5;   // yaya kırmızı
int yy = 6;   // yaya yeşil
int i;        // for sayacı

void setup() {
  pinMode(ak, OUTPUT);
  pinMode(as, OUTPUT);
  pinMode(ay, OUTPUT);
  pinMode(yk, OUTPUT);
  pinMode(yy, OUTPUT);
  digitalWrite(ak, HIGH);   // başlangıç: ikisi de kırmızı
  digitalWrite(yk, HIGH);
}

void loop() {
  digitalWrite(ak, LOW);    // araçlar geçer
  digitalWrite(ay, HIGH);
  delay(5000);
  digitalWrite(ay, LOW);    // araçlar yavaşlar
  digitalWrite(as, HIGH);
  delay(1500);
  digitalWrite(as, LOW);    // yayalar geçer
  digitalWrite(ak, HIGH);
  digitalWrite(yk, LOW);
  digitalWrite(yy, HIGH);
  delay(4000);
  for (i = 0; i < 4; i++) { // yaya yeşili uyarı yanıp söner
    digitalWrite(yy, LOW);
    delay(250);
    digitalWrite(yy, HIGH);
    delay(250);
  }
  digitalWrite(yy, LOW);    // ikisi de kırmızı
  digitalWrite(yk, HIGH);
  delay(1000);
}

/*
  DEĞİŞTİR VE GÖZLE
    - Yaya yeşili süresini (delay(4000)) 8000 yap. Kavşak kaç saniyede bir tur atar?
    - for içindeki 4 değerini 8 yap. Uyarı yanıp sönmesi uzar.

  TOPLAM SÜRE (doğrulama): 5000 + 1500 + 4000 + 4 x 500 + 1000 = 13500 ms
  İLERİ GÖREV: Gelecek hafta yaya butonu eklenecek (dijital giriş).
*/
