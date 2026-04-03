export const SON_ARAMALAR = [
  'Pizza Roma',
  'Elektrikçi',
  'Gebze Konseri',
  '3+1 Kiralık',
]

export const POPULER_ARAMALAR = [
  'Nöbetçi Eczane',
  'En yakın ATM',
  'Düğün salonu',
  'Temizlikçi',
  'Satılık daire',
  'Bu haftaki etkinlikler',
]

export const ARAMA_SONUCLARI = [
  // Restoranlar
  { id: 'r1', tip: 'restoran', tipLabel: 'Restoran', isim: 'Döner Palace', aciklama: 'Döner, Pide, Kebap', puan: '4.7', mesafe: '0.4 km', path: '/restaurant/1' },
  { id: 'r2', tip: 'restoran', tipLabel: 'Restoran', isim: 'Pizza Roma', aciklama: 'İtalyan Mutfağı, Pizza, Makarna', puan: '4.8', mesafe: '0.8 km', path: '/restaurant/2' },
  { id: 'r3', tip: 'restoran', tipLabel: 'Restoran', isim: 'Sushi Bar', aciklama: 'Japon Mutfağı, Sushi, Ramen', puan: '4.6', mesafe: '1.2 km', path: '/restaurant/3' },
  { id: 'r4', tip: 'restoran', tipLabel: 'Restoran', isim: 'Burger House', aciklama: 'Hamburger, Patates, İçecek', puan: '4.5', mesafe: '0.6 km', path: '/restaurant/4' },
  { id: 'r5', tip: 'restoran', tipLabel: 'Restoran', isim: 'Lahmacun Ustası', aciklama: 'Lahmacun, Mercimek Çorbası', puan: '4.6', mesafe: '0.9 km', path: '/restaurant/5' },

  // Hizmetler
  { id: 's1', tip: 'hizmet', tipLabel: 'Hizmet', isim: 'Usta Elektrik', aciklama: 'Elektrik, Montaj, Arıza', puan: '4.7', mesafe: '1.1 km', path: '/service/1' },
  { id: 's2', tip: 'hizmet', tipLabel: 'Hizmet', isim: 'Ahmet Temizlik', aciklama: 'Ev Temizliği, Ofis Temizliği', puan: '4.9', mesafe: '0.7 km', path: '/service/2' },
  { id: 's3', tip: 'hizmet', tipLabel: 'Hizmet', isim: 'Royal Düğün Salonu', aciklama: 'Düğün, Nişan, Kına Organizasyon', puan: '4.8', mesafe: '2.1 km', path: '/service/7' },
  { id: 's4', tip: 'hizmet', tipLabel: 'Hizmet', isim: 'Dr. Ahmet Yılmaz', aciklama: 'Dahiliye Uzmanı', puan: '4.9', mesafe: '1.5 km', path: '/service/4' },
  { id: 's5', tip: 'hizmet', tipLabel: 'Hizmet', isim: 'Nakliyat Pro', aciklama: 'Ev Taşıma, Ofis Taşıma', puan: '4.6', mesafe: '3.2 km', path: '/service/6' },

  // İlanlar
  { id: 'i1', tip: 'emlak', tipLabel: 'Emlak', isim: '3+1 Merkezi Daire', aciklama: 'Satılık · 120m² · Gebze Merkez', puan: null, mesafe: '1.8 km', path: '/ilanlar/emlak/1' },
  { id: 'i2', tip: 'emlak', tipLabel: 'Emlak', isim: '2+1 Eşyalı Kiralık', aciklama: 'Kiralık · 85m² · 12.000₺/ay', puan: null, mesafe: '0.5 km', path: '/ilanlar/emlak/2' },
  { id: 'i3', tip: 'vasita', tipLabel: 'Araç', isim: 'Toyota Corolla Hybrid 2021', aciklama: 'Satılık · 45.000 km · Otomatik', puan: null, mesafe: null, path: '/ilanlar/vasita/1' },
  { id: 'i4', tip: 'vasita', tipLabel: 'Araç', isim: 'Volkswagen Tiguan 2020', aciklama: 'Satılık · 62.000 km · Dizel', puan: null, mesafe: null, path: '/ilanlar/vasita/2' },
  { id: 'i5', tip: 'ikinciel', tipLabel: '2. El', isim: 'iPhone 14 Pro Max', aciklama: '2. El · 256GB · Siyah', puan: null, mesafe: null, path: '/ilanlar/ikinciel/1' },

  // Etkinlikler
  { id: 'e1', tip: 'etkinlik', tipLabel: 'Etkinlik', isim: 'Rock Geceleri Konseri', aciklama: '12 Nisan · Gebze Arena · 350₺', puan: null, mesafe: '2.4 km', path: '/etkinlik/1' },
  { id: 'e2', tip: 'etkinlik', tipLabel: 'Etkinlik', isim: 'Hamlet Tiyatrosu', aciklama: '15 Nisan · Kültür Merkezi · 180₺', puan: null, mesafe: '1.1 km', path: '/etkinlik/2' },
  { id: 'e3', tip: 'etkinlik', tipLabel: 'Etkinlik', isim: 'Gebze Yarı Maraton', aciklama: '20 Nisan · Belediye Meydanı · Ücretsiz', puan: null, mesafe: '0.8 km', path: '/etkinlik/3' },

  // Mağazalar
  { id: 'm1', tip: 'magaza', tipLabel: 'Mağaza', isim: 'Migros Gebze', aciklama: 'Market · 4 Kampanya', puan: '4.6', mesafe: '0.4 km', path: '/magaza/1' },
  { id: 'm2', tip: 'magaza', tipLabel: 'Mağaza', isim: 'MediaMarkt Gebze', aciklama: 'Elektronik · 8 Kampanya', puan: '4.5', mesafe: '1.2 km', path: '/magaza/3' },
  { id: 'm3', tip: 'magaza', tipLabel: 'Mağaza', isim: 'LC Waikiki', aciklama: 'Giyim · 5 Kampanya', puan: '4.3', mesafe: '0.9 km', path: '/magaza/4' },

  // Hızlı erişim yerleri
  { id: 'p1', tip: 'yer', tipLabel: 'Yer', isim: 'Nöbetçi Eczane — EczacıBaşı', aciklama: 'Eczane · 0.3 km · 24 saat açık', puan: null, mesafe: '0.3 km', path: '/nearby/pharmacy' },
  { id: 'p2', tip: 'yer', tipLabel: 'Yer', isim: 'Garanti BBVA ATM', aciklama: 'ATM · 0.2 km', puan: null, mesafe: '0.2 km', path: '/nearby/atm' },
]

export const KATEGORI_FILTRELERI = ['Tümü', 'Restoran', 'Hizmet', 'Emlak', 'Araç', 'Etkinlik', 'Mağaza']
