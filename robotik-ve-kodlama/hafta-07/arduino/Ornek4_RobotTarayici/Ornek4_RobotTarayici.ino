/*
  ROBOTİK KODLAMA 10 - 7. HAFTA - ÖRNEK 4 (SEKTÖR): GÜVENLİK ROBOTU TARAYICI IŞIĞI  (7 LED, for döngüsü)
  ----------------------------------------------------------------------
  Senaryo : Gece devriyesindeki güvenlik robotunun yüzündeki 7 LED'lik tarayıcı çubuğunda tek bir ışık
            noktası gidip gelir. Kitaptaki 7 LED örneğindeki for döngüsü burada gerçek bir ürüne dönüşür.
  Kazanım : for döngüsüyle 7 pini tek komutla yönetmek, sayaç değişkenini (int i) kullanmak.

  MALZEME LİSTESİ
    Bileşen              Adet   Bağlandığı yer
    Arduino Uno           1     -
    Breadboard            1     Uzun (en az 42 sütun) veya iki küçük breadboard
    LED (kırmızı)         7     D2 ... D8; katotlar GND hattında
    Direnç 220 ohm        7     Her LED için birer tane
    Jumper kablo          8     D2-D8 ve GND bağlantıları

  DEVRE (adım adım)
    1) GND -> breadboard mavi (-) hat.
    2) Her LED'in katodu mavi hatta, anodu kendi sütununa.
    3) Her anot sütununa birer 220 ohm direnç, direncin boşta ucuna kablo (soldan sağa D8, D7 ... D2).

  İPUCU: D0 ve D1 seri haberleşme pinleridir; LED için D2'den başla.
*/

int i;                                  // sayaç: şu an hangi pindeyiz?

void setup() {
  for (i = 2; i <= 8; i++) {            // i sırayla 2, 3, 4, ... 8 olur
    pinMode(i, OUTPUT);                 // tek satır 7 pini çıkış yapar
  }
}

void loop() {
  for (i = 2; i <= 8; i++) {            // 2. pinden 8. pine ilerle
    digitalWrite(i, HIGH);              // i numaralı LED yansın
    delay(100);                         // 100 ms parlasın
    digitalWrite(i, LOW);               // i numaralı LED sönsün
  }
  for (i = 7; i >= 3; i--) {            // 7. pinden 3. pine geri dön
    digitalWrite(i, HIGH);              // i numaralı LED yansın
    delay(100);                         // 100 ms parlasın
    digitalWrite(i, LOW);               // i numaralı LED sönsün
  }
}

/*
  DEĞİŞTİR VE GÖZLE
    - delay(100) değerlerini 50 yap. Tarama iki kat hızlanır.
    - İlk for satırındaki i <= 8 koşulunu i <= 5 yap. Hangi LED'ler hiç yanmaz?

  TOPLAM SÜRE (doğrulama): ileri 7 x 100 = 700 ms, geri 5 x 100 = 500 ms -> 1200 ms
  SIRA: 2 3 4 5 6 7 8 7 6 5 4 3 (sonra tekrar 2'den başlar)
*/
