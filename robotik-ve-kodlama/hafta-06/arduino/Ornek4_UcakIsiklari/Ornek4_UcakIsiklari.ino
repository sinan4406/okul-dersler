/*
  ROBOTİK KODLAMA 10 - 6. HAFTA - ÖRNEK 4 (SEKTÖR): UÇAK NAVİGASYON IŞIKLARI
  --------------------------------------------------------------------------
  Senaryo : Uçağın sol kanadında kırmızı, sağ kanadında yeşil ışık sürekli yanık kalır.
            Beyaz çakar ışık çift flaş yapar. (Gerçek uçaklarda gece görünürlük ve yön tayini içindir.)
  Kazanım : setup() içinde bir kez açılan ve loop() içinde sürekli çalışan işleri ayırmak.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     -
    LED kırmızı           1     D2 (direnç üzerinden)  -> sol kanat
    LED yeşil             1     D3 (direnç üzerinden)  -> sağ kanat
    LED beyaz             1     D4 (direnç üzerinden)  -> çakar
    Direnç 220 ohm        3     Her LED için birer tane
    Jumper kablo          4     D2, D3, D4 ve GND

  AKIM HESAPLARI (doğrulama, her biri 20 mA'in altında)
    Kırmızı : (5 - 2,0) / 220 = 13,6 mA
    Yeşil   : (5 - 2,2) / 220 = 12,7 mA
    Beyaz   : (5 - 3,0) / 220 =  9,1 mA
    Toplam  : 35,4 mA  (Uno'nun tüm pinler için toplam sınırı 200 mA, güvenli)

  DEVRE: Üç LED'in katodu (kısa bacak) mavi GND hattında. Her anot kendi direnci üzerinden kendi pinine gider.
*/

void setup() {
  pinMode(2, OUTPUT);       // D2: kırmızı (sol kanat) çıkış
  pinMode(3, OUTPUT);       // D3: yeşil (sağ kanat) çıkış
  pinMode(4, OUTPUT);       // D4: beyaz çakar çıkış
  digitalWrite(2, HIGH);    // kırmızı BİR KEZ açılır, bir daha kapatılmayacağı için hep yanık kalır
  digitalWrite(3, HIGH);    // yeşil BİR KEZ açılır, hep yanık kalır
}

void loop() {
  digitalWrite(4, HIGH); delay(70);     // 1. flaş: 70 ms yan
  digitalWrite(4, LOW);  delay(100);    // kısa ara
  digitalWrite(4, HIGH); delay(70);     // 2. flaş: 70 ms yan
  digitalWrite(4, LOW);  delay(1500);   // uzun ara, sonra çift flaş tekrar eder
}

/*
  DEĞİŞTİR VE GÖZLE
    - İkinci flaşın 2 satırını sil. Çakar tek flaş olur.
    - delay(1500) değerini 300 yap. Bu cihaz hangi araç gibi görünür? (Polis/ambulans benzeri hızlı çakar.)

  TOPLAM SÜRE (doğrulama): 70 + 100 + 70 + 1500 = 1740 ms (beyaz ışık her 1,74 saniyede çift flaş)
*/
