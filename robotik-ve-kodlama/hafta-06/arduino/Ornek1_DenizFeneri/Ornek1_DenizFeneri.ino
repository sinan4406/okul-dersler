/*
  ROBOTİK KODLAMA 10 - 6. HAFTA - ÖRNEK 1 (TEMEL): DENİZ FENERİ
  -------------------------------------------------------------
  Senaryo : Liman girişindeki deniz feneri 1 saniye yanar, 3 saniye söner.
  Kazanım : Breadboard'a LED + direnç kurmak, setup() ve loop() farkını görmek.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED (kırmızı)         1     Anot (uzun bacak) -> direncin ucu, Katot (kısa bacak) -> GND hattı
    Direnç 220 ohm        1     Bir ucu D8, diğer ucu LED anodu
    Jumper kablo          2     D8 -> direnç, GND -> breadboard mavi (-) hat

  DEVRE (adım adım)
    1) Arduino GND pinini breadboard'un mavi (-) hattına kablo ile bağla.
    2) LED'in kısa bacağını (katot) mavi hatta, uzun bacağını (anot) orta bölümde bir sütuna tak.
    3) 220 ohm direncin bir ucunu LED'in anot sütununa, diğer ucunu başka bir sütuna tak.
    4) O sütundan Arduino D8 pinine kablo çek.

  TINKERCAD'DE KURULUM
    Circuits -> Create new Circuit -> Arduino Uno, Breadboard Small, LED, Resistor (220 ohm)
    sürükle. Kod düğmesi -> Text -> aşağıdaki kodu yapıştır -> Start Simulation.

  AKIM HESABI (doğrulama)
    I = (5 V - 2 V) / 220 ohm = 13,6 mA  (Uno pini sınırı: 20 mA'in altında, güvenli)
*/

void setup() {
  // setup() kart açılınca SADECE BİR KEZ çalışır. Hazırlık işleri buraya yazılır.
  pinMode(8, OUTPUT);     // 8 numaralı pini ÇIKIŞ yap: kart bu pinden LED'e akım verecek
}

void loop() {
  // loop() kart açık kaldıkça başa dönerek SÜREKLİ tekrarlanır.
  digitalWrite(8, HIGH);  // 8. pine 5 V ver -> LED yanar (fener ışık verir)
  delay(1000);            // 1000 milisaniye = 1 saniye bekle (LED yanık kalır)
  digitalWrite(8, LOW);   // 8. pini 0 V yap -> LED söner
  delay(3000);            // 3000 milisaniye = 3 saniye bekle (LED sönük kalır)
}                         // toplam döngü 4 saniye sürer

/*
  DEĞİŞTİR VE GÖZLE
    - delay(3000) değerini 500 yap, yükle. Fener nasıl görünür? (Döngü 1,5 sn'ye düşer, sık yanıp söner.)
    - digitalWrite(8, HIGH) satırının sonundaki ; işaretini sil, derle. Hangi hatayı gördün?
*/
