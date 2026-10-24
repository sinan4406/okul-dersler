/*
  ROBOTİK KODLAMA 10 - 6. HAFTA - ÖRNEK 2 (UYGULAMA): SOS MORS IŞIĞI
  -------------------------------------------------------------------
  Senaryo : Denizde kaybolan bir tekne imdat sinyali verir: S = 3 kısa, O = 3 uzun, S = 3 kısa.
  Kazanım : delay() süreleriyle ritim kurmak, aynı pini tekrar tekrar sürmek, yorum satırı yazmak.

  ZAMANLAMA TABLOSU
    Kısa yanma  (nokta)  : 200 ms
    Uzun yanma  (çizgi)  : 600 ms
    Yanmalar arası ara   : 200 ms
    Harfler arası ara    : 600 ms (200 ms ara + 400 ms ek)
    Tekrar arası ara     : 2000 ms

  MALZEME VE DEVRE: Örnek 1 ile aynı (LED + 220 ohm direnç, D8 ve GND).

  TINKERCAD'DE KURULUM
    Örnek 1 devresini kopyala, kodu bu dosyayla değiştir. Seri Monitör gerekmez.
*/

void setup() {
  pinMode(8, OUTPUT);       // 8. pin LED için çıkış
}

void loop() {
  // ---- S harfi: ... (üç kısa) ----
  digitalWrite(8, HIGH); delay(200);   // 1. kısa yan
  digitalWrite(8, LOW);  delay(200);   // ara
  digitalWrite(8, HIGH); delay(200);   // 2. kısa yan
  digitalWrite(8, LOW);  delay(200);   // ara
  digitalWrite(8, HIGH); delay(200);   // 3. kısa yan
  digitalWrite(8, LOW);  delay(600);   // harf arası uzun ara

  // ---- O harfi: --- (üç uzun) ----
  digitalWrite(8, HIGH); delay(600);   // 1. uzun yan
  digitalWrite(8, LOW);  delay(200);   // ara
  digitalWrite(8, HIGH); delay(600);   // 2. uzun yan
  digitalWrite(8, LOW);  delay(200);   // ara
  digitalWrite(8, HIGH); delay(600);   // 3. uzun yan
  digitalWrite(8, LOW);  delay(600);   // harf arası uzun ara

  // ---- S harfi: ... (üç kısa) ----
  digitalWrite(8, HIGH); delay(200);   // 1. kısa yan
  digitalWrite(8, LOW);  delay(200);   // ara
  digitalWrite(8, HIGH); delay(200);   // 2. kısa yan
  digitalWrite(8, LOW);  delay(200);   // ara
  digitalWrite(8, HIGH); delay(200);   // 3. kısa yan
  digitalWrite(8, LOW);  delay(2000);  // sinyal bitti, tekrardan önce 2 sn bekle
}

/*
  DEĞİŞTİR VE GÖZLE
    - Kısa süreyi 100 ms, uzun süreyi 300 ms yap. Sinyal hâlâ okunabiliyor mu?
    - Kodda "digitalwrite" (küçük w) yazıp derle. Derleyici ne diyor?

  TOPLAM SÜRE (doğrulama)
    S: 3x200 + 2x200 + 600 = 1600 ms
    O: 3x600 + 2x200 + 600 = 2800 ms
    S: 3x200 + 2x200 + 2000 = 3000 ms
    Döngü = 7400 ms = 7,4 saniye
*/
