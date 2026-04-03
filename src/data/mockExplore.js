export const HERO_ITEMS = [
  {
    id: 1,
    baslik: 'Gebze\'nin En İyi Restoranları',
    altBaslik: 'Bu hafta 12 yeni değerlendirme',
    bg: '#1a1a2e',
    accent: '#e94560',
    path: '/food',
    emoji: '🍽️',
  },
  {
    id: 2,
    baslik: 'Nisan Etkinlikleri Başladı',
    altBaslik: '8 etkinlik seni bekliyor',
    bg: '#0f3460',
    accent: '#533483',
    path: '/etkinlikler',
    emoji: '🎉',
  },
  {
    id: 3,
    baslik: 'Güvenilir Ustalar Burada',
    altBaslik: '200+ onaylı hizmet uzmanı',
    bg: '#16213e',
    accent: '#0f9b8e',
    path: '/services',
    emoji: '🔧',
  },
]

export const POPULER_YERLER = [
  { id: 1, isim: 'Döner Palace', kategori: 'Restoran', puan: '4.7', mesafe: '0.4 km', emoji: '🥙', path: '/restaurant/1' },
  { id: 2, isim: 'Pizza Roma', kategori: 'Restoran', puan: '4.8', mesafe: '0.8 km', emoji: '🍕', path: '/restaurant/2' },
  { id: 3, isim: 'Ahmet Temizlik', kategori: 'Temizlik', puan: '4.9', mesafe: '0.7 km', emoji: '🧹', path: '/service/2' },
  { id: 4, isim: 'Gebze AVM', kategori: 'Alışveriş', puan: '4.6', mesafe: '1.5 km', emoji: '🛍️', path: '/alisveris' },
  { id: 5, isim: 'Sushi Bar', kategori: 'Restoran', puan: '4.6', mesafe: '1.2 km', emoji: '🍣', path: '/restaurant/3' },
  { id: 6, isim: 'MediaMarkt', kategori: 'Elektronik', puan: '4.5', mesafe: '1.2 km', emoji: '📺', path: '/magaza/3' },
]

export const YENI_ISLETMELER = [
  { id: 1, isim: 'Taco Fiesta', kategori: 'Restoran', aciklama: 'Meksika Mutfağı · Yeni Açıldı', emoji: '🌮', path: '/restaurant/6' },
  { id: 2, isim: 'Yoga Studio', kategori: 'Spor', aciklama: 'Pilates & Yoga · İlk Ders Ücretsiz', emoji: '🧘', path: '/service/10' },
  { id: 3, isim: 'Kitabevi', kategori: 'Alışveriş', aciklama: 'Kitap & Kırtasiye · %10 İndirim', emoji: '📚', path: '/magaza/8' },
  { id: 4, isim: 'Pet Shop Pati', kategori: 'Evcil Hayvan', aciklama: 'Mama, Aksesuar, Bakım', emoji: '🐾', path: '/magaza/9' },
  { id: 5, isim: 'Güzel Saçlar', kategori: 'Kuaför', aciklama: 'Erkek & Kadın Kuaförü', emoji: '✂️', path: '/service/11' },
]

export const HAFTALIK_ONERILER = [
  { id: 1, isim: 'Rock Geceleri', tarih: '12 Nisan', yer: 'Gebze Arena', emoji: '🎸', fiyat: '350₺', path: '/etkinlik/1' },
  { id: 2, isim: 'Gebze Yarı Maraton', tarih: '20 Nisan', yer: 'Belediye Meydanı', emoji: '🏃', fiyat: 'Ücretsiz', path: '/etkinlik/3' },
  { id: 3, isim: 'Yaz Müzik Festivali', tarih: '25 Nisan', yer: 'Meydan Parkı', emoji: '🎪', fiyat: '500₺', path: '/etkinlik/8' },
  { id: 4, isim: 'Hamlet Tiyatrosu', tarih: '15 Nisan', yer: 'Kültür Merkezi', emoji: '🎭', fiyat: '180₺', path: '/etkinlik/2' },
]

export const KESFET_KATEGORILER = [
  { label: 'Yemek', emoji: '🍽️', path: '/food', bg: '#fff7ed' },
  { label: 'Hizmetler', emoji: '🔧', path: '/services', bg: '#f0fdf4' },
  { label: 'Alışveriş', emoji: '🛍️', path: '/alisveris', bg: '#eff6ff' },
  { label: 'Etkinlikler', emoji: '🎉', path: '/etkinlikler', bg: '#fdf4ff' },
  { label: 'İlanlar', emoji: '📋', path: '/ilanlar', bg: '#fef9c3' },
  { label: 'GebzemAI', emoji: '✨', path: '/gebzem-ai', bg: '#f8fafc' },
]
