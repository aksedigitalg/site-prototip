export const SERVICE_CATEGORIES = [
  'Tümü', 'Temizlik', 'Elektrik', 'Tesisat', 'Boya', 'Nakliyat', 'Klima', 'Bahçe', 'Tadilat',
]

export const SERVICE_FILTERS = ['En Yakın', 'En Ucuz', 'En Yüksek Puan', 'Müsait']

export const SERVICES = [
  {
    id: 1, name: 'Ahmet Temizlik', category: 'Temizlik',
    rating: 4.9, reviewCount: 312, price: 250, priceUnit: 'saat',
    distance: '0.6 km', isAvailable: true, badge: 'Çok Tercih Edilen',
    desc: 'Ev ve ofis temizliği, cam silme, derin temizlik.',
  },
  {
    id: 2, name: 'Usta Elektrik', category: 'Elektrik',
    rating: 4.7, reviewCount: 189, price: 300, priceUnit: 'iş başı',
    distance: '1.1 km', isAvailable: true, badge: null,
    desc: 'Elektrik tesisatı, priz/sigorta değişimi, aydınlatma.',
  },
  {
    id: 3, name: 'Su Tesisatçısı Mehmet', category: 'Tesisat',
    rating: 4.8, reviewCount: 245, price: 350, priceUnit: 'iş başı',
    distance: '0.9 km', isAvailable: false, badge: null,
    desc: 'Su kaçağı tespiti, boru değişimi, sıhhi tesisat.',
  },
  {
    id: 4, name: 'Renkli Boya', category: 'Boya',
    rating: 4.6, reviewCount: 98, price: 200, priceUnit: 'm²',
    distance: '2.0 km', isAvailable: true, badge: null,
    desc: 'İç cephe, dış cephe boya, dekoratif boya uygulamaları.',
  },
  {
    id: 5, name: 'Hızlı Nakliyat', category: 'Nakliyat',
    rating: 4.5, reviewCount: 421, price: 800, priceUnit: 'taşıma',
    distance: '1.5 km', isAvailable: true, badge: 'Hızlı Yanıt',
    desc: 'Ev ve ofis taşıma, asansörlü nakliyat, paketleme.',
  },
  {
    id: 6, name: 'Soğutma Sistemleri', category: 'Klima',
    rating: 4.8, reviewCount: 156, price: 400, priceUnit: 'iş başı',
    distance: '1.3 km', isAvailable: true, badge: null,
    desc: 'Klima montaj, bakım, gaz dolumu, arıza tespiti.',
  },
  {
    id: 7, name: 'Yeşil Bahçe', category: 'Bahçe',
    rating: 4.4, reviewCount: 67, price: 180, priceUnit: 'saat',
    distance: '2.5 km', isAvailable: true, badge: null,
    desc: 'Çim biçme, budama, peyzaj düzenleme, sulama sistemleri.',
  },
  {
    id: 8, name: 'Tadilat Ustası', category: 'Tadilat',
    rating: 4.7, reviewCount: 203, price: 350, priceUnit: 'gün',
    distance: '0.8 km', isAvailable: true, badge: 'Çok Tercih Edilen',
    desc: 'Alçıpan, fayans, zemin kaplama, mutfak banyo tadilatı.',
  },
]

export const SERVICE_DETAILS = {
  1: {
    phone: '0532 111 22 33',
    address: 'Gebze, Kocaeli',
    hours: '08:00 - 20:00',
    services: [
      { name: 'Standart Ev Temizliği', price: '500₺', duration: '2-3 saat' },
      { name: 'Derin Temizlik',        price: '800₺', duration: '4-5 saat' },
      { name: 'Cam Silme',             price: '300₺', duration: '1-2 saat' },
      { name: 'Ofis Temizliği',        price: '400₺', duration: '2-3 saat' },
    ],
    reviews: [
      { id: 1, name: 'Selin A.', rating: 5, date: '1 gün önce',   text: 'Çok titiz ve hızlı çalıştı, teşekkürler!' },
      { id: 2, name: 'Murat B.', rating: 5, date: '3 gün önce',   text: 'Ev pırıl pırıl oldu, kesinlikle tavsiye ederim.' },
      { id: 3, name: 'Ayşe K.', rating: 4, date: '1 hafta önce', text: 'İyi iş çıkardı, biraz geç geldi sadece.' },
    ],
  },
  2: {
    phone: '0533 222 33 44',
    address: 'Gebze, Kocaeli',
    hours: '09:00 - 19:00',
    services: [
      { name: 'Priz / Anahtar Değişimi', price: '150₺', duration: '30 dk' },
      { name: 'Sigorta Değişimi',        price: '200₺', duration: '1 saat' },
      { name: 'Aydınlatma Kurulumu',     price: '300₺', duration: '1-2 saat' },
      { name: 'Komple Tesisat',          price: '1500₺',duration: '1 gün' },
    ],
    reviews: [
      { id: 1, name: 'Emre S.', rating: 5, date: '2 gün önce', text: 'Sorunu hızlıca tespit edip çözdü.' },
      { id: 2, name: 'Fatma Y.', rating: 4, date: '2 hafta önce', text: 'Temiz ve düzenli çalıştı.' },
    ],
  },
  3: { phone: '0534 333 44 55', address: 'Gebze, Kocaeli', hours: '08:00 - 18:00', services: [], reviews: [] },
  4: { phone: '0535 444 55 66', address: 'Gebze, Kocaeli', hours: '08:00 - 18:00', services: [], reviews: [] },
  5: { phone: '0536 555 66 77', address: 'Gebze, Kocaeli', hours: '07:00 - 22:00', services: [], reviews: [] },
  6: { phone: '0537 666 77 88', address: 'Gebze, Kocaeli', hours: '09:00 - 18:00', services: [], reviews: [] },
  7: { phone: '0538 777 88 99', address: 'Gebze, Kocaeli', hours: '08:00 - 17:00', services: [], reviews: [] },
  8: { phone: '0539 888 99 00', address: 'Gebze, Kocaeli', hours: '08:00 - 19:00', services: [], reviews: [] },
}
