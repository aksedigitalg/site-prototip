export const MAGAZA_CATEGORIES = [
  'Tümü', 'Süpermarket', 'Elektronik', 'Giyim', 'Kozmetik', 'Kitap', 'Spor', 'Ev & Yaşam',
]

export const MAGAZALAR = [
  {
    id: 1, name: 'Migros', kategori: 'Süpermarket', logo: '🛒',
    puan: 4.6, yorumSayisi: 1240, mesafe: '0.4 km', acik: true,
    kampanyaSayisi: 4, slogan: 'Her gün en taze ürünler',
  },
  {
    id: 2, name: 'BİM', kategori: 'Süpermarket', logo: '🏪',
    puan: 4.3, yorumSayisi: 876, mesafe: '0.2 km', acik: true,
    kampanyaSayisi: 6, slogan: 'Tasarrufun adresi',
  },
  {
    id: 3, name: 'A101', kategori: 'Süpermarket', logo: '🏬',
    puan: 4.2, yorumSayisi: 543, mesafe: '0.7 km', acik: true,
    kampanyaSayisi: 5, slogan: 'Uygun fiyat, kaliteli ürün',
  },
  {
    id: 4, name: 'MediaMarkt', kategori: 'Elektronik', logo: '📺',
    puan: 4.5, yorumSayisi: 2100, mesafe: '1.2 km', acik: true,
    kampanyaSayisi: 8, slogan: 'Her şey teknoloji için',
  },
  {
    id: 5, name: 'Teknosa', kategori: 'Elektronik', logo: '💻',
    puan: 4.4, yorumSayisi: 890, mesafe: '1.5 km', acik: false,
    kampanyaSayisi: 3, slogan: 'Teknolojiyi hisset',
  },
  {
    id: 6, name: 'LC Waikiki', kategori: 'Giyim', logo: '👕',
    puan: 4.3, yorumSayisi: 670, mesafe: '0.9 km', acik: true,
    kampanyaSayisi: 5, slogan: 'Herkes için moda',
  },
  {
    id: 7, name: 'Zara', kategori: 'Giyim', logo: '👗',
    puan: 4.6, yorumSayisi: 1450, mesafe: '2.1 km', acik: true,
    kampanyaSayisi: 2, slogan: 'Her mevsim yeni koleksiyon',
  },
  {
    id: 8, name: 'Gratis', kategori: 'Kozmetik', logo: '💄',
    puan: 4.4, yorumSayisi: 980, mesafe: '0.8 km', acik: true,
    kampanyaSayisi: 7, slogan: 'Güzelliğin adresi',
  },
  {
    id: 9, name: 'D&R', kategori: 'Kitap', logo: '📚',
    puan: 4.7, yorumSayisi: 560, mesafe: '1.8 km', acik: true,
    kampanyaSayisi: 3, slogan: 'Kitap, müzik ve daha fazlası',
  },
  {
    id: 10, name: 'Decathlon', kategori: 'Spor', logo: '⚽',
    puan: 4.5, yorumSayisi: 1120, mesafe: '2.3 km', acik: true,
    kampanyaSayisi: 4, slogan: 'Sporu herkes için uygun',
  },
]

export const URUNLER = {
  1: [
    { id: 101, name: 'Süt 1 lt', fiyat: 42, eskiFiyat: null,  emoji: '🥛', kategori: 'İçecek' },
    { id: 102, name: 'Ekmek',    fiyat: 15, eskiFiyat: null,  emoji: '🍞', kategori: 'Fırın' },
    { id: 103, name: 'Yumurta 10\'lu', fiyat: 89, eskiFiyat: 110, emoji: '🥚', kategori: 'Kahvaltılık' },
    { id: 104, name: 'Muz 1 kg', fiyat: 45, eskiFiyat: 60,  emoji: '🍌', kategori: 'Meyve' },
    { id: 105, name: 'Tavuk Göğsü 500g', fiyat: 125, eskiFiyat: null, emoji: '🍗', kategori: 'Et' },
    { id: 106, name: 'Peynir 400g', fiyat: 145, eskiFiyat: 175, emoji: '🧀', kategori: 'Süt Ürünleri' },
  ],
  2: [
    { id: 201, name: 'Zeytinyağı 500ml', fiyat: 180, eskiFiyat: 220, emoji: '🫒', kategori: 'Bakliyat' },
    { id: 202, name: 'Makarna 500g',     fiyat: 28,  eskiFiyat: null, emoji: '🍝', kategori: 'Bakliyat' },
    { id: 203, name: 'Deterjan 1 kg',    fiyat: 89,  eskiFiyat: 120, emoji: '🧴', kategori: 'Temizlik' },
    { id: 204, name: 'Meyve Suyu 1 lt',  fiyat: 55,  eskiFiyat: null, emoji: '🧃', kategori: 'İçecek' },
    { id: 205, name: 'Çikolata',         fiyat: 45,  eskiFiyat: 55,  emoji: '🍫', kategori: 'Atıştırmalık' },
    { id: 206, name: 'Kahve 200g',       fiyat: 220, eskiFiyat: null, emoji: '☕', kategori: 'İçecek' },
  ],
  3: [
    { id: 301, name: 'Şampuan 400ml',  fiyat: 75,  eskiFiyat: 95,  emoji: '🧴', kategori: 'Kişisel Bakım' },
    { id: 302, name: 'Tuvalet Kağıdı', fiyat: 65,  eskiFiyat: null, emoji: '🧻', kategori: 'Temizlik' },
    { id: 303, name: 'Pilav Bulguru',  fiyat: 38,  eskiFiyat: null, emoji: '🌾', kategori: 'Bakliyat' },
    { id: 304, name: 'Domates Salçası',fiyat: 55,  eskiFiyat: 70,  emoji: '🍅', kategori: 'Bakliyat' },
  ],
  4: [
    { id: 401, name: 'Samsung TV 55"',     fiyat: 18999, eskiFiyat: 22999, emoji: '📺', kategori: 'TV' },
    { id: 402, name: 'iPhone 15 128GB',    fiyat: 62999, eskiFiyat: null,  emoji: '📱', kategori: 'Telefon' },
    { id: 403, name: 'Sony Kulaklık WH1000XM5', fiyat: 8499, eskiFiyat: 9999, emoji: '🎧', kategori: 'Ses' },
    { id: 404, name: 'MacBook Air M3',     fiyat: 65999, eskiFiyat: null,  emoji: '💻', kategori: 'Bilgisayar' },
    { id: 405, name: 'PS5 Slim',           fiyat: 22999, eskiFiyat: 25999, emoji: '🎮', kategori: 'Oyun' },
    { id: 406, name: 'Dyson V15 Süpürge',  fiyat: 15999, eskiFiyat: null,  emoji: '🧹', kategori: 'Ev Aletleri' },
  ],
  5: [
    { id: 501, name: 'Laptop Çantası',     fiyat: 450, eskiFiyat: 600, emoji: '💼', kategori: 'Aksesuar' },
    { id: 502, name: 'Şarj Adaptörü 65W',  fiyat: 299, eskiFiyat: null, emoji: '🔌', kategori: 'Aksesuar' },
    { id: 503, name: 'Lenovo IdeaPad',     fiyat: 24999, eskiFiyat: 27999, emoji: '💻', kategori: 'Bilgisayar' },
    { id: 504, name: 'Xiaomi 14T Pro',     fiyat: 28999, eskiFiyat: null, emoji: '📱', kategori: 'Telefon' },
  ],
  6: [
    { id: 601, name: 'Basic T-Shirt',    fiyat: 199, eskiFiyat: 299, emoji: '👕', kategori: 'Üst Giyim' },
    { id: 602, name: 'Slim Fit Jean',    fiyat: 449, eskiFiyat: null, emoji: '👖', kategori: 'Alt Giyim' },
    { id: 603, name: 'Spor Ayakkabı',    fiyat: 699, eskiFiyat: 899, emoji: '👟', kategori: 'Ayakkabı' },
    { id: 604, name: 'Çocuk Parka',      fiyat: 549, eskiFiyat: 749, emoji: '🧥', kategori: 'Çocuk' },
    { id: 605, name: 'Elbise',           fiyat: 349, eskiFiyat: null, emoji: '👗', kategori: 'Kadın' },
  ],
  7: [
    { id: 701, name: 'Blazer Ceket',     fiyat: 1299, eskiFiyat: null, emoji: '🧥', kategori: 'Üst Giyim' },
    { id: 702, name: 'Midi Etek',        fiyat: 899, eskiFiyat: 1199, emoji: '👗', kategori: 'Kadın' },
    { id: 703, name: 'Triko Kazak',      fiyat: 749, eskiFiyat: null, emoji: '🧶', kategori: 'Üst Giyim' },
    { id: 704, name: 'Deri Çanta',       fiyat: 1499, eskiFiyat: 1999, emoji: '👜', kategori: 'Aksesuar' },
  ],
  8: [
    { id: 801, name: 'Ruj Kırmızı',      fiyat: 189, eskiFiyat: null,  emoji: '💄', kategori: 'Makyaj' },
    { id: 802, name: 'Fondöten SPF30',   fiyat: 349, eskiFiyat: 449,   emoji: '✨', kategori: 'Makyaj' },
    { id: 803, name: 'Parfüm 100ml',     fiyat: 899, eskiFiyat: null,   emoji: '🌸', kategori: 'Parfüm' },
    { id: 804, name: 'Serum C Vitamini', fiyat: 459, eskiFiyat: 599,   emoji: '💊', kategori: 'Cilt Bakımı' },
    { id: 805, name: 'Saç Maskesi',      fiyat: 219, eskiFiyat: null,   emoji: '🧴', kategori: 'Saç Bakımı' },
    { id: 806, name: 'BB Krem',          fiyat: 275, eskiFiyat: 350,   emoji: '🪞', kategori: 'Makyaj' },
  ],
  9: [
    { id: 901, name: 'Tutunamayanlar',   fiyat: 145, eskiFiyat: null,  emoji: '📗', kategori: 'Roman' },
    { id: 902, name: 'Dune',             fiyat: 195, eskiFiyat: 230,   emoji: '📘', kategori: 'Bilimkurgu' },
    { id: 903, name: 'Kuantum Fiziği',   fiyat: 220, eskiFiyat: null,  emoji: '🔭', kategori: 'Bilim' },
    { id: 904, name: 'Küçük Prens',      fiyat: 90,  eskiFiyat: null,  emoji: '📙', kategori: 'Çocuk' },
  ],
  10: [
    { id: 1001, name: 'Futbol Topu',      fiyat: 299, eskiFiyat: 399, emoji: '⚽', kategori: 'Futbol' },
    { id: 1002, name: 'Koşu Ayakkabısı', fiyat: 899, eskiFiyat: null, emoji: '👟', kategori: 'Koşu' },
    { id: 1003, name: 'Bisiklet Kaskı',   fiyat: 459, eskiFiyat: 599, emoji: '⛑️', kategori: 'Bisiklet' },
    { id: 1004, name: 'Yoga Matı',        fiyat: 249, eskiFiyat: null, emoji: '🧘', kategori: 'Fitness' },
    { id: 1005, name: 'Dumbbell 5kg çift',fiyat: 699, eskiFiyat: 849, emoji: '🏋️', kategori: 'Fitness' },
    { id: 1006, name: 'Yüzme Gözlüğü',   fiyat: 185, eskiFiyat: null, emoji: '🥽', kategori: 'Yüzme' },
  ],
}

export const KAMPANYALAR = {
  1: [
    { id: 'M1', title: '%20 İndirim',      desc: 'Tüm meyve & sebzede geçerli',         kod: 'MIGROS20', sonTarih: '30 Nisan 2026' },
    { id: 'M2', title: '3 Al 2 Öde',       desc: 'Seçili süt ürünlerinde geçerli',      kod: 'SUTCAMPAIGN', sonTarih: '25 Nisan 2026' },
    { id: 'M3', title: '50₺ İndirim',       desc: '300₺ üzeri alışverişlerde',           kod: 'MIGROS50', sonTarih: '20 Nisan 2026' },
    { id: 'M4', title: 'Kargo Ücretsiz',    desc: 'Migros Go\'da tüm siparişlerde',      kod: 'CARGOFREEMIG', sonTarih: '30 Nisan 2026' },
  ],
  2: [
    { id: 'B1', title: '%15 İndirim',       desc: 'Temizlik ürünleri haftalık fırsatı',  kod: 'BIM15', sonTarih: '18 Nisan 2026' },
    { id: 'B2', title: 'Aktüel Ürün',       desc: 'Bu hafta özel fiyat',                kod: 'BIMAKTUEL', sonTarih: '21 Nisan 2026' },
  ],
  4: [
    { id: 'MM1', title: '%10 Telefon İnd.', desc: 'Tüm akıllı telefonlarda',            kod: 'MM10PHONE', sonTarih: '30 Nisan 2026' },
    { id: 'MM2', title: '500₺ Hediye Çeki', desc: '10.000₺ üzeri TV alımında',          kod: 'MMTV500', sonTarih: '15 Mayıs 2026' },
    { id: 'MM3', title: '0 Faiz 12 Taksit', desc: 'Seçili ürünlerde faizsiz taksit',    kod: 'MM12TAK', sonTarih: '30 Nisan 2026' },
  ],
  6: [
    { id: 'LC1', title: '%25 Yaz İndirimi', desc: 'Tüm yazlık ürünlerde geçerli',       kod: 'LC25YAZ', sonTarih: '1 Mayıs 2026' },
    { id: 'LC2', title: '2. Ürün Bedava',   desc: 'Seçili t-shirt çiftlerinde',         kod: 'LCIKIAL', sonTarih: '22 Nisan 2026' },
  ],
  8: [
    { id: 'G1', title: '%30 Makyaj İnd.',   desc: 'Seçili fondöten ve ruj serilerinde', kod: 'GRATIS30', sonTarih: '20 Nisan 2026' },
    { id: 'G2', title: 'Parfüm 2. %50',     desc: '2. parfümde %50 indirim',            kod: 'PARFUM2', sonTarih: '30 Nisan 2026' },
  ],
  10: [
    { id: 'D1', title: '%20 Spor Giyim',    desc: 'Tüm koşu ve fitness giysilerinde',   kod: 'DEC20', sonTarih: '25 Nisan 2026' },
    { id: 'D2', title: 'Ekipman Paketi',    desc: 'Yoga mat + su şişesi kombosunda',    kod: 'DECPKG', sonTarih: '28 Nisan 2026' },
  ],
}

export const MAGAZA_HAKKINDA = {
  1:  { adres: 'Cumhuriyet Mah. Gebze, Kocaeli',  saatler: '07:00 – 23:00', telefon: '0262 111 22 33' },
  2:  { adres: 'Atatürk Cad. Gebze, Kocaeli',     saatler: '08:00 – 22:00', telefon: '0262 222 33 44' },
  3:  { adres: 'İstasyon Cad. Gebze, Kocaeli',    saatler: '08:00 – 22:00', telefon: '0262 333 44 55' },
  4:  { adres: 'Gebze Center AVM, Kocaeli',       saatler: '10:00 – 22:00', telefon: '0262 444 55 66' },
  5:  { adres: 'Gebze Center AVM, Kocaeli',       saatler: '10:00 – 22:00', telefon: '0262 555 66 77' },
  6:  { adres: 'Gebze Center AVM, Kocaeli',       saatler: '10:00 – 22:00', telefon: '0262 666 77 88' },
  7:  { adres: 'Gebze Center AVM, Kocaeli',       saatler: '10:00 – 22:00', telefon: '0262 777 88 99' },
  8:  { adres: 'Cumhuriyet Cad. Gebze, Kocaeli',  saatler: '09:00 – 21:00', telefon: '0262 888 99 00' },
  9:  { adres: 'Gebze Center AVM, Kocaeli',       saatler: '10:00 – 22:00', telefon: '0262 999 00 11' },
  10: { adres: 'Osmangazi Cad. Gebze, Kocaeli',   saatler: '09:00 – 22:00', telefon: '0262 000 11 22' },
}

export const MAGAZA_YORUMLAR = {
  1: [
    { id: 1, name: 'Selin A.', rating: 5, date: '2 gün önce',  text: 'Ürünler çok taze, kasiyerler güler yüzlü. Her hafta buradan alışveriş yapıyoruz.' },
    { id: 2, name: 'Murat K.', rating: 4, date: '1 hafta önce',text: 'Fiyatlar biraz yüksek ama kalite iyi. Meyve sebze bölümü harika.' },
    { id: 3, name: 'Ayşe D.', rating: 5, date: '3 gün önce',   text: 'Online siparişim zamanında geldi, sorunsuz.' },
  ],
  4: [
    { id: 1, name: 'Emre S.', rating: 5, date: '1 gün önce',   text: 'TV aldım, çok memnun kaldım. Personel çok bilgili.' },
    { id: 2, name: 'Fatma Y.', rating: 4, date: '5 gün önce',  text: 'Geniş ürün yelpazesi. Fiyatlar rekabetçi.' },
    { id: 3, name: 'Ahmet B.', rating: 3, date: '2 hafta önce',text: 'Serviste biraz beklettiler ama sonunda çözüldü.' },
  ],
  8: [
    { id: 1, name: 'Zeynep Ö.', rating: 5, date: '3 gün önce', text: 'Her zaman kampanya var, cilt bakım ürünleri mükemmel.' },
    { id: 2, name: 'Büşra M.', rating: 4, date: '1 hafta önce',text: 'Parfüm çeşidi çok fazla. Personel yardımsever.' },
  ],
}
