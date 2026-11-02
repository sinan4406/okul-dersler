/*
  ROBOTİK KODLAMA 10 - 8. HAFTA - ÖRNEK 4 (SEKTÖR): İKİ YOLLU KAVŞAK  (6 LED)
  ----------------------------------------------------------------------
  Senaryo : Kuzey-Güney (KG) ve Doğu-Batı (DB) yolları kesişir. Her yolun üç lambası var.
            İki yolda aynı anda yeşil yanmamalı; geçişlerde kısa bir "hepsi kırmızı" süre bırakılır.
  Kazanım : Çakışmayan fazlar tasarlamak; 6 pini adlandırarak kısa ve okunur kod yazmak.

  MALZEME LİSTESİ
    Arduino Uno 1 · Uzun breadboard (42 sütun) 1 · LED: kırmızı 2, sarı 2, yeşil 2
    Direnç 220 ohm 6 · Jumper kablo 7

  PİNLER
    KG: D2 kırmızı, D3 sarı, D4 yeşil   |   DB: D5 kırmızı, D6 sarı, D7 yeşil
*/

int kgKirmizi = 2;
int kgSari = 3;
int kgYesil = 4;
int dbKirmizi = 5;
int dbSari = 6;
int dbYesil = 7;

void setup() {
  pinMode(kgKirmizi, OUTPUT);
  pinMode(kgSari, OUTPUT);
  pinMode(kgYesil, OUTPUT);
  pinMode(dbKirmizi, OUTPUT);
  pinMode(dbSari, OUTPUT);
  pinMode(dbYesil, OUTPUT);
  digitalWrite(kgKirmizi, HIGH);   // başlangıç: hepsi kırmızı
  digitalWrite(dbKirmizi, HIGH);
}

void loop() {
  digitalWrite(kgKirmizi, LOW);    // KG yeşil
  digitalWrite(kgYesil, HIGH);
  delay(4000);
  digitalWrite(kgYesil, LOW);      // KG sarı
  digitalWrite(kgSari, HIGH);
  delay(1500);
  digitalWrite(kgSari, LOW);       // hepsi kırmızı
  digitalWrite(kgKirmizi, HIGH);
  delay(1000);
  digitalWrite(dbKirmizi, LOW);    // DB yeşil
  digitalWrite(dbYesil, HIGH);
  delay(4000);
  digitalWrite(dbYesil, LOW);      // DB sarı
  digitalWrite(dbSari, HIGH);
  delay(1500);
  digitalWrite(dbSari, LOW);       // hepsi kırmızı
  digitalWrite(dbKirmizi, HIGH);
  delay(1000);
}

/*
  DEĞİŞTİR VE GÖZLE
    - KG yeşil süresini 8000 yap (ana cadde). Kavşak kaç saniyede bir tur atar?
    - Hepsi kırmızı beklemesini (delay(1000)) sil. Güvenlik açısından ne kaybedersin?

  TOPLAM SÜRE (doğrulama): 4000 + 1500 + 1000 + 4000 + 1500 + 1000 = 13000 ms
*/
