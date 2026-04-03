export const SERVICE_CATEGORIES = [
  'Tümü', 'Temizlik', 'Elektrik', 'Tesisat', 'Boya', 'Nakliyat', 'Klima', 'Bahçe', 'Tadilat', 'Sağlık', 'Düğün',
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
  {
    id: 9, name: 'Dr. Ahmet Yılmaz', category: 'Sağlık',
    rating: 4.9, reviewCount: 512, price: 600, priceUnit: 'muayene',
    distance: '0.5 km', isAvailable: true, badge: 'Çok Tercih Edilen',
    desc: 'Dahiliye uzmanı. Genel sağlık muayenesi, kronik hastalık takibi.',
  },
  {
    id: 10, name: 'DentSmile Diş Kliniği', category: 'Sağlık',
    rating: 4.8, reviewCount: 334, price: 500, priceUnit: 'muayene',
    distance: '1.0 km', isAvailable: true, badge: null,
    desc: 'Diş tedavisi, implant, estetik diş uygulamaları, ortodonti.',
  },
  {
    id: 11, name: 'Psikolog Zeynep Kaya', category: 'Sağlık',
    rating: 4.9, reviewCount: 187, price: 800, priceUnit: 'seans',
    distance: '1.4 km', isAvailable: true, badge: 'Uzman',
    desc: 'Bireysel terapi, kaygı ve depresyon, ilişki danışmanlığı.',
  },
  {
    id: 12, name: 'Royal Düğün Salonu', category: 'Düğün',
    rating: 4.8, reviewCount: 420, price: 0, priceUnit: 'paket',
    distance: '2.2 km', isAvailable: true, badge: 'Çok Tercih Edilen',
    desc: '500 kişilik kapasiteli lüks düğün salonu. Tam donanım, ikram dahil paketler.',
  },
  {
    id: 13, name: 'Anı Fotoğraf Stüdyosu', category: 'Düğün',
    rating: 4.7, reviewCount: 298, price: 0, priceUnit: 'paket',
    distance: '1.8 km', isAvailable: true, badge: 'Hızlı Yanıt',
    desc: 'Düğün & nişan fotoğraf ve video çekimi. Drone ve sinematik film.',
  },
  {
    id: 14, name: 'Çiçek & Organizasyon', category: 'Düğün',
    rating: 4.6, reviewCount: 156, price: 0, priceUnit: 'paket',
    distance: '0.9 km', isAvailable: true, badge: null,
    desc: 'Düğün süslemesi, çiçek aranjmanı, masa dekorasyonu, kırmızı halı.',
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
  9: {
    phone: '0532 900 11 22', address: 'Gebze Sağlık Mah., Kocaeli', hours: '09:00 - 18:00',
    services: [
      { name: 'Genel Dahiliye Muayene', price: '600₺', duration: '20-30 dk' },
      { name: 'Kan Tahlili Yorumlama', price: '300₺', duration: '15 dk' },
      { name: 'Kronik Hastalık Takibi', price: '450₺', duration: '30 dk' },
      { name: 'Sağlık Raporu',          price: '400₺', duration: '20 dk' },
    ],
    reviews: [
      { id: 1, name: 'Fatma K.', rating: 5, date: '1 gün önce',   text: 'Çok ilgili ve sabırlı bir doktor. Tüm sorularımı yanıtladı.' },
      { id: 2, name: 'Ali R.',   rating: 5, date: '3 gün önce',   text: 'Randevu tam zamanında, bekleme yok. Teşekkürler.' },
      { id: 3, name: 'Selin M.', rating: 4, date: '1 hafta önce', text: 'İyi muayene, biraz pahalı ama kaliteli.' },
    ],
  },
  10: {
    phone: '0533 900 22 33', address: 'Gebze Merkez, Kocaeli', hours: '09:00 - 20:00',
    services: [
      { name: 'Genel Diş Muayenesi', price: '500₺',  duration: '20 dk' },
      { name: 'Diş Temizliği',        price: '800₺',  duration: '45 dk' },
      { name: 'Diş Çekimi',           price: '600₺',  duration: '30 dk' },
      { name: 'Kanal Tedavisi',        price: '2.500₺',duration: '60-90 dk' },
      { name: 'Diş Beyazlatma',        price: '3.000₺',duration: '60 dk' },
    ],
    reviews: [
      { id: 1, name: 'Mert A.', rating: 5, date: '2 gün önce',   text: 'Ağrısız diş çekimi, harika ekip!' },
      { id: 2, name: 'Aylin B.', rating: 4, date: '5 gün önce',  text: 'Temiz, modern klinik. Personel çok nazik.' },
    ],
  },
  11: {
    phone: '0534 900 33 44', address: 'Gebze, Kocaeli', hours: '10:00 - 19:00',
    services: [
      { name: 'Bireysel Terapi Seansı', price: '800₺',  duration: '50 dk' },
      { name: 'İlk Görüşme',            price: '600₺',  duration: '60 dk' },
      { name: 'Çift Terapisi',          price: '1.000₺',duration: '60 dk' },
      { name: 'Online Seans',           price: '700₺',  duration: '50 dk' },
    ],
    reviews: [
      { id: 1, name: 'Anonyms', rating: 5, date: '4 gün önce',   text: 'Hayatımı değiştirdi. Çok profesyonel yaklaşım.' },
      { id: 2, name: 'S.K.',    rating: 5, date: '2 hafta önce', text: 'Güvenli bir alan yaratıyor. Şiddetle tavsiye ederim.' },
    ],
  },
  12: {
    phone: '0535 900 44 55', address: 'Gebze Düğün Vadisi, Kocaeli', hours: '10:00 - 22:00',
    services: [
      { name: 'Ekonomik Paket (100 kişi)',   price: '45.000₺', duration: '5 saat' },
      { name: 'Standart Paket (200 kişi)',   price: '80.000₺', duration: '6 saat' },
      { name: 'Lüks Paket (350 kişi)',       price: '130.000₺',duration: '7 saat' },
      { name: 'Nişan / Söz Organizasyonu',   price: '25.000₺', duration: '4 saat' },
    ],
    reviews: [
      { id: 1, name: 'Cansu & Emre', rating: 5, date: '2 hafta önce',  text: 'Düğünümüz harikaydı! Her şey mükemmel planlandı.' },
      { id: 2, name: 'Selin B.',     rating: 4, date: '1 ay önce',     text: 'Büyük salon, güzel dekor. Yemekler çok iyiydi.' },
    ],
  },
  13: {
    phone: '0536 900 55 66', address: 'Gebze, Kocaeli', hours: '09:00 - 21:00',
    services: [
      { name: 'Fotoğraf Paketi',             price: '8.000₺',  duration: 'Düğün günü' },
      { name: 'Video Paketi',                price: '10.000₺', duration: 'Düğün günü' },
      { name: 'Foto + Video Combo',          price: '15.000₺', duration: 'Düğün günü' },
      { name: 'Drone Çekimi (Ek)',           price: '3.000₺',  duration: '1 saat' },
      { name: 'Fotoğraf Albümü (50 sayfa)', price: '4.500₺',  duration: '4-6 hafta' },
    ],
    reviews: [
      { id: 1, name: 'Büşra & Can', rating: 5, date: '3 hafta önce', text: 'Karelerimiz inanılmaz güzel çıktı. Teşekkürler!' },
      { id: 2, name: 'Merve K.',    rating: 5, date: '1 ay önce',    text: 'Drone çekimi muhteşem. Kesinlikle tavsiye ederim.' },
    ],
  },
  14: {
    phone: '0537 900 66 77', address: 'Gebze Çarşı, Kocaeli', hours: '09:00 - 20:00',
    services: [
      { name: 'Düğün Salonu Süsleme',  price: '12.000₺', duration: '1 gün' },
      { name: 'Gelin Arabası Süsleme', price: '2.500₺',  duration: '2 saat' },
      { name: 'Masa Çiçek Aranjmanı',  price: '500₺/masa',duration: '—' },
      { name: 'Kırmızı Halı + Stand',  price: '3.000₺',  duration: '—' },
    ],
    reviews: [
      { id: 1, name: 'Aslı T.', rating: 5, date: '1 hafta önce', text: 'Mekan masalara dönüştü! Harika el işçiliği.' },
      { id: 2, name: 'Zeynep M.',rating: 4, date: '3 hafta önce',text: 'Çiçekler çok tazeydi, renkler tam istediğimiz gibiydi.' },
    ],
  },
}
