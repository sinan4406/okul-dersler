/*
  ROBOTİK KODLAMA 10 - 4. HAFTA - ÖRNEK 2 (UYGULAMA): MAMA MAKİNESİ ÇALIŞIYOR IŞIĞI  (yerleşik LED)
  ----------------------------------------------------------------------
  Senaryo : 4 Ekim Dünya Hayvanları Koruma Günü. Belediye barınağındaki mama makinesinde "çalışıyorum" ışığı
            saniyede bir kısa çakar (100 ms yanık, 900 ms sönük). Işık çakıyorsa program donmamıştır.
  Kazanım : Yanık ve sönük süreleri ayrı ayarlamak; "kalp atışı" (heartbeat) ışığı kavramı.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     USB kablosuyla bilgisayara
    (Devre elemanı gerekmez: yerleşik LED kullanılır. Dış LED istenirse D13 - 220 ohm - LED - GND.)

  TINKERCAD: Arduino Uno > Code > Text > kodu yapıştır > Start Simulation.
*/

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);       // yerleşik LED çıkış olsun
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);    // "çalışıyorum" ışığı yanar
  delay(100);                         // 100 ms yanık: kısa çakma
  digitalWrite(LED_BUILTIN, LOW);     // ışık söner
  delay(900);                         // 900 ms sönük: tur 1000 ms
}

/*
  DEĞİŞTİR VE GÖZLE
  1) delay(100) ve delay(900) değerlerini ikisini de 500 yap. LED nasıl davranır?
  2) Işığın saniyede iki kez çakması için iki süre ne olmalı?
*/
