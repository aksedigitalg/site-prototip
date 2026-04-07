// ─── Gradient paleti ─────────────────────────────────────────────────────────
export const GRADYANLAR = [
  { id: 1, css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', isim: 'Mor Gece' },
  { id: 2, css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', isim: 'Pembe' },
  { id: 3, css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', isim: 'Okyanus' },
  { id: 4, css: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', isim: 'Yeşil' },
  { id: 5, css: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', isim: 'Gün Batımı' },
  { id: 6, css: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', isim: 'Lavanta' },
  { id: 7, css: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', isim: 'Şeftali' },
  { id: 8, css: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', isim: 'Gül' },
  { id: 9, css: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', isim: 'Gökyüzü' },
  { id: 10, css: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', isim: 'Turuncu' },
  { id: 11, css: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', isim: 'Karanlık' },
  { id: 12, css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', isim: 'Nane' },
]

// ─── Kullanıcılar ────────────────────────────────────────────────────────────
export const SOSYAL_KULLANICILAR = [
  { id: 1, isim: 'Ayşe Yılmaz', kullaniciAdi: 'ayseyilmaz', avatar: '👩', bg: '#f093fb', bio: 'Gebze gezgini 🌍 Yemek tutkunu 🍕', takipci: 342, takipEdilen: 128, postSayisi: 24 },
  { id: 2, isim: 'Mehmet Kaya', kullaniciAdi: 'mehmetkaya', avatar: '👨', bg: '#667eea', bio: 'Fotoğraf 📸 Seyahat ✈️ Kahve ☕', takipci: 891, takipEdilen: 234, postSayisi: 67 },
  { id: 3, isim: 'Zeynep Demir', kullaniciAdi: 'zeynepdemir', avatar: '👩‍🦰', bg: '#43e97b', bio: 'Doğa aşığı 🌿 Koşucu 🏃‍♀️', takipci: 567, takipEdilen: 189, postSayisi: 45 },
  { id: 4, isim: 'Ali Öztürk', kullaniciAdi: 'aliozturk', avatar: '🧔', bg: '#fa709a', bio: 'Yazılımcı 💻 Oyuncu 🎮', takipci: 1203, takipEdilen: 312, postSayisi: 89 },
  { id: 5, isim: 'Elif Arslan', kullaniciAdi: 'elifarslan', avatar: '👧', bg: '#4facfe', bio: 'Kitap kurdu 📚 Müzik 🎵', takipci: 456, takipEdilen: 201, postSayisi: 33 },
  { id: 6, isim: 'Can Yıldız', kullaniciAdi: 'canyildiz', avatar: '👦', bg: '#f6d365', bio: 'Gebze\'li 🏙️ Basketbol 🏀', takipci: 723, takipEdilen: 156, postSayisi: 51 },
  { id: 7, isim: 'Selin Koç', kullaniciAdi: 'selinkoc', avatar: '👩‍🎨', bg: '#a18cd1', bio: 'Tasarımcı 🎨 Kedi sever 🐱', takipci: 934, takipEdilen: 278, postSayisi: 72 },
  { id: 8, isim: 'Burak Şahin', kullaniciAdi: 'buraksahin', avatar: '🧑', bg: '#11998e', bio: 'Aşçı 👨‍🍳 Gurme 🍽️', takipci: 1567, takipEdilen: 89, postSayisi: 103 },
  { id: 9, isim: 'Deniz Aydın', kullaniciAdi: 'denizaydin', avatar: '🧑‍🦱', bg: '#ff9a9e', bio: 'Müzisyen 🎸 Gebze rock 🤘', takipci: 2341, takipEdilen: 167, postSayisi: 156 },
  { id: 10, isim: 'Merve Çelik', kullaniciAdi: 'mervecelik', avatar: '👩‍💼', bg: '#ffecd2', bio: 'Girişimci 🚀 Kahve bağımlısı ☕', takipci: 412, takipEdilen: 198, postSayisi: 28 },
]

// ─── Postlar ─────────────────────────────────────────────────────────────────
export const SOSYAL_POSTLAR = [
  { id: 1, kullaniciId: 1, gradyan: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '🌆', aciklama: 'Gebze akşam manzarası harika!', etiketler: ['gebze', 'manzara', 'aksam'], begeniler: [2, 3, 5, 7], yorumSayisi: 3, tarih: '2026-04-07T14:30:00' },
  { id: 2, kullaniciId: 2, gradyan: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', emoji: '☕', aciklama: 'Sabah kahvesi olmadan güne başlanmaz', etiketler: ['kahve', 'sabah', 'keyif'], begeniler: [1, 4, 6, 8, 9], yorumSayisi: 5, tarih: '2026-04-07T09:15:00' },
  { id: 3, kullaniciId: 3, gradyan: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', emoji: '🏃‍♀️', aciklama: 'Bugün 10km koştum! Kişisel rekor 💪', etiketler: ['kosu', 'spor', 'rekor'], begeniler: [1, 2, 4, 5, 6, 7], yorumSayisi: 8, tarih: '2026-04-07T07:00:00' },
  { id: 4, kullaniciId: 4, gradyan: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', emoji: '🎮', aciklama: 'Yeni oyun çıktı, gece boyu oynayacağım', etiketler: ['oyun', 'gaming', 'gece'], begeniler: [2, 6, 9], yorumSayisi: 2, tarih: '2026-04-06T22:00:00' },
  { id: 5, kullaniciId: 5, gradyan: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', emoji: '📚', aciklama: 'Bu ay 4 kitap bitirdim. Sıradaki hangisi olsun?', etiketler: ['kitap', 'okuma', 'oneri'], begeniler: [1, 3, 7, 8, 10], yorumSayisi: 12, tarih: '2026-04-06T18:30:00' },
  { id: 6, kullaniciId: 6, gradyan: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', emoji: '🏀', aciklama: 'Gebze sahası yenilendi, harika olmuş!', etiketler: ['basketbol', 'gebze', 'spor'], begeniler: [1, 2, 3, 4], yorumSayisi: 4, tarih: '2026-04-06T16:00:00' },
  { id: 7, kullaniciId: 7, gradyan: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', emoji: '🎨', aciklama: 'Yeni tasarım projesi bitti! Çok mutluyum', etiketler: ['tasarim', 'design', 'proje'], begeniler: [1, 2, 4, 5, 8, 9, 10], yorumSayisi: 6, tarih: '2026-04-06T12:00:00' },
  { id: 8, kullaniciId: 8, gradyan: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', emoji: '🍕', aciklama: 'Ev yapımı pizza tarifi denedim, süper oldu!', etiketler: ['yemek', 'pizza', 'tarif'], begeniler: [1, 2, 3, 5, 6, 7, 9, 10], yorumSayisi: 15, tarih: '2026-04-05T20:00:00' },
  { id: 9, kullaniciId: 9, gradyan: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', emoji: '🎸', aciklama: 'Akustik cover çektim, beğenirsiniz umarım', etiketler: ['muzik', 'gitar', 'cover'], begeniler: [1, 3, 4, 5, 7], yorumSayisi: 9, tarih: '2026-04-05T15:00:00' },
  { id: 10, kullaniciId: 10, gradyan: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', emoji: '🚀', aciklama: 'Yeni girişim fikrim var, heyecanlıyım!', etiketler: ['girisim', 'startup', 'fikir'], begeniler: [2, 4, 6, 8], yorumSayisi: 7, tarih: '2026-04-05T10:00:00' },
  { id: 11, kullaniciId: 1, gradyan: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', emoji: '🌸', aciklama: 'Bahar geldi, çiçekler açtı 🌷', etiketler: ['bahar', 'cicek', 'doga'], begeniler: [3, 5, 7, 9], yorumSayisi: 3, tarih: '2026-04-04T14:00:00' },
  { id: 12, kullaniciId: 2, gradyan: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', emoji: '🏖️', aciklama: 'Hafta sonu planı: deniz kenarı', etiketler: ['tatil', 'deniz', 'haftasonu'], begeniler: [1, 3, 6, 8, 10], yorumSayisi: 4, tarih: '2026-04-04T11:00:00' },
  { id: 13, kullaniciId: 3, gradyan: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '🧘‍♀️', aciklama: 'Meditasyon yapmaya başladım, inanılmaz faydalı', etiketler: ['meditasyon', 'saglik', 'huzur'], begeniler: [1, 5, 7, 9, 10], yorumSayisi: 6, tarih: '2026-04-03T08:00:00' },
  { id: 14, kullaniciId: 4, gradyan: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', emoji: '💻', aciklama: 'Yeni proje deploy ettim, canlıda!', etiketler: ['yazilim', 'kod', 'deploy'], begeniler: [2, 6, 8, 9], yorumSayisi: 5, tarih: '2026-04-03T16:00:00' },
  { id: 15, kullaniciId: 6, gradyan: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', emoji: '⚽', aciklama: 'Halı saha maçı var bu akşam, kim gelir?', etiketler: ['futbol', 'mac', 'halisaha'], begeniler: [1, 2, 3, 4, 9], yorumSayisi: 11, tarih: '2026-04-02T17:00:00' },
  { id: 16, kullaniciId: 7, gradyan: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', emoji: '🐱', aciklama: 'Kedim bugün çok tatlı poz verdi', etiketler: ['kedi', 'hayvan', 'tatli'], begeniler: [1, 2, 3, 5, 6, 8, 9, 10], yorumSayisi: 13, tarih: '2026-04-02T12:00:00' },
  { id: 17, kullaniciId: 8, gradyan: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', emoji: '🍰', aciklama: 'Cheesecake yaptım, tarif isteyene yazarım', etiketler: ['tatli', 'cheesecake', 'tarif'], begeniler: [1, 3, 5, 7, 10], yorumSayisi: 8, tarih: '2026-04-01T19:00:00' },
  { id: 18, kullaniciId: 5, gradyan: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', emoji: '🌙', aciklama: 'Gece okumak ayrı güzel', etiketler: ['gece', 'kitap', 'huzur'], begeniler: [2, 4, 9], yorumSayisi: 2, tarih: '2026-04-01T23:00:00' },
  { id: 19, kullaniciId: 9, gradyan: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', emoji: '🎤', aciklama: 'Konser çok güzeldi! Gebze\'ye tekrar gelin', etiketler: ['konser', 'muzik', 'gebze'], begeniler: [1, 2, 3, 4, 5, 6, 7], yorumSayisi: 10, tarih: '2026-03-31T22:00:00' },
  { id: 20, kullaniciId: 10, gradyan: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', emoji: '☀️', aciklama: 'Günaydın Gebze! Bugün harika bir gün olacak', etiketler: ['gunaydin', 'gebze', 'motivasyon'], begeniler: [1, 3, 5, 8], yorumSayisi: 3, tarih: '2026-03-31T07:30:00' },
]

// ─── Yorumlar (postId key) ───────────────────────────────────────────────────
export const SOSYAL_YORUMLAR = {
  1: [
    { id: 1, kullaniciId: 2, metin: 'Harika manzara! 😍', tarih: '2026-04-07T15:00:00', begeniler: [1, 5], yanitlar: [{ id: 101, kullaniciId: 1, metin: 'Teşekkürler!', tarih: '2026-04-07T15:05:00', begeniler: [] }] },
    { id: 2, kullaniciId: 3, metin: 'Nerede çekildi bu?', tarih: '2026-04-07T15:30:00', begeniler: [1], yanitlar: [{ id: 102, kullaniciId: 1, metin: 'Gebze merkezden 📍', tarih: '2026-04-07T15:35:00', begeniler: [3] }] },
    { id: 3, kullaniciId: 7, metin: 'Renklere bak, muhteşem', tarih: '2026-04-07T16:00:00', begeniler: [], yanitlar: [] },
  ],
  2: [
    { id: 4, kullaniciId: 1, metin: 'Ben de kahve bağımlısıyım ☕', tarih: '2026-04-07T09:30:00', begeniler: [2, 4], yanitlar: [] },
    { id: 5, kullaniciId: 5, metin: 'Hangi kahveyi tercih ediyorsun?', tarih: '2026-04-07T09:45:00', begeniler: [2], yanitlar: [{ id: 103, kullaniciId: 2, metin: 'V60 filtre kahve en sevdiğim', tarih: '2026-04-07T10:00:00', begeniler: [5] }] },
    { id: 6, kullaniciId: 8, metin: 'Latte art yapıyor musun?', tarih: '2026-04-07T10:15:00', begeniler: [], yanitlar: [] },
    { id: 7, kullaniciId: 6, metin: 'Sabah enerjisi 💪', tarih: '2026-04-07T10:30:00', begeniler: [2, 1], yanitlar: [] },
    { id: 8, kullaniciId: 9, metin: 'Bende bir tane alayım', tarih: '2026-04-07T11:00:00', begeniler: [], yanitlar: [] },
  ],
  3: [
    { id: 9, kullaniciId: 1, metin: 'Helal olsun! 👏', tarih: '2026-04-07T07:30:00', begeniler: [3], yanitlar: [] },
    { id: 10, kullaniciId: 2, metin: 'Beni de al yanına', tarih: '2026-04-07T07:45:00', begeniler: [3, 1], yanitlar: [{ id: 104, kullaniciId: 3, metin: 'Hadi yarın sabah 6da!', tarih: '2026-04-07T08:00:00', begeniler: [] }] },
    { id: 11, kullaniciId: 4, metin: 'Kaç dakikada koştun?', tarih: '2026-04-07T08:15:00', begeniler: [], yanitlar: [{ id: 105, kullaniciId: 3, metin: '52 dakika ⏱️', tarih: '2026-04-07T08:20:00', begeniler: [4, 5] }] },
  ],
  5: [
    { id: 12, kullaniciId: 1, metin: 'Sapiens oku kesinlikle!', tarih: '2026-04-06T19:00:00', begeniler: [5, 3], yanitlar: [] },
    { id: 13, kullaniciId: 7, metin: 'Atomic Habits çok iyi', tarih: '2026-04-06T19:15:00', begeniler: [5, 1, 8], yanitlar: [] },
    { id: 14, kullaniciId: 9, metin: 'Dune serisi başla 🚀', tarih: '2026-04-06T19:30:00', begeniler: [5], yanitlar: [{ id: 106, kullaniciId: 5, metin: 'Listeme ekledim!', tarih: '2026-04-06T19:35:00', begeniler: [] }] },
  ],
  8: [
    { id: 15, kullaniciId: 1, metin: 'Tarif paylaşır mısın? 🍕', tarih: '2026-04-05T20:30:00', begeniler: [8, 3], yanitlar: [{ id: 107, kullaniciId: 8, metin: 'Yarın detaylı yazarım!', tarih: '2026-04-05T20:35:00', begeniler: [1] }] },
    { id: 16, kullaniciId: 6, metin: 'Acıktım şimdi 😋', tarih: '2026-04-05T20:45:00', begeniler: [8, 2], yanitlar: [] },
    { id: 17, kullaniciId: 10, metin: 'Hamur tarifi ne?', tarih: '2026-04-05T21:00:00', begeniler: [], yanitlar: [] },
  ],
  16: [
    { id: 18, kullaniciId: 1, metin: 'Çok tatlııı 😻', tarih: '2026-04-02T12:30:00', begeniler: [7, 3, 5], yanitlar: [] },
    { id: 19, kullaniciId: 3, metin: 'Adı ne kedinin?', tarih: '2026-04-02T12:45:00', begeniler: [7], yanitlar: [{ id: 108, kullaniciId: 7, metin: 'Pamuk 🤍', tarih: '2026-04-02T13:00:00', begeniler: [3, 1] }] },
    { id: 20, kullaniciId: 9, metin: 'Kedi sahiplenmek istiyorum', tarih: '2026-04-02T13:15:00', begeniler: [], yanitlar: [] },
  ],
}

// ─── Hikayeler (StoryBar formatı) ────────────────────────────────────────────
export const SOSYAL_HIKAYELER = [
  { id: 1, kullanici: 'Mehmet', emoji: '👨', bg: '#667eea', icerik: '📸', baslik: 'Bugünün karesi', aciklama: 'Gebze sokaklarından...', renk: '#667eea' },
  { id: 2, kullanici: 'Zeynep', emoji: '👩‍🦰', bg: '#43e97b', icerik: '🏃‍♀️', baslik: 'Sabah koşusu', aciklama: '5km tamamlandı!', renk: '#43e97b' },
  { id: 3, kullanici: 'Selin', emoji: '👩‍🎨', bg: '#a18cd1', icerik: '🎨', baslik: 'Yeni çalışma', aciklama: 'Dijital illüstrasyon', renk: '#a18cd1' },
  { id: 4, kullanici: 'Burak', emoji: '🧑', bg: '#11998e', icerik: '🍕', baslik: 'Mutfakta', aciklama: 'Bugünün menüsü', renk: '#11998e' },
  { id: 5, kullanici: 'Deniz', emoji: '🧑‍🦱', bg: '#ff9a9e', icerik: '🎸', baslik: 'Prova', aciklama: 'Yeni şarkı geliyor', renk: '#ff9a9e' },
  { id: 6, kullanici: 'Can', emoji: '👦', bg: '#f6d365', icerik: '🏀', baslik: 'Maç zamanı', aciklama: 'Kim gelecek?', renk: '#f6d365' },
  { id: 7, kullanici: 'Elif', emoji: '👧', bg: '#4facfe', icerik: '📚', baslik: 'Okuma saati', aciklama: 'Yeni kitap başladım', renk: '#4facfe' },
  { id: 8, kullanici: 'Ayşe', emoji: '👩', bg: '#f093fb', icerik: '🌆', baslik: 'Manzara', aciklama: 'Gebze gün batımı', renk: '#f093fb' },
]

// ─── Bildirimler ─────────────────────────────────────────────────────────────
export const SOSYAL_BILDIRIMLER = [
  { id: 1, tip: 'begeni', kimden: 2, postId: 1, tarih: '2026-04-07T16:00:00', okundu: false },
  { id: 2, tip: 'yorum', kimden: 3, postId: 1, tarih: '2026-04-07T15:30:00', okundu: false },
  { id: 3, tip: 'takip', kimden: 4, postId: null, tarih: '2026-04-07T14:00:00', okundu: false },
  { id: 4, tip: 'begeni', kimden: 5, postId: 11, tarih: '2026-04-07T13:00:00', okundu: false },
  { id: 5, tip: 'yorum', kimden: 7, postId: 1, tarih: '2026-04-07T12:00:00', okundu: true },
  { id: 6, tip: 'takip', kimden: 8, postId: null, tarih: '2026-04-06T20:00:00', okundu: true },
  { id: 7, tip: 'begeni', kimden: 9, postId: 11, tarih: '2026-04-06T18:00:00', okundu: true },
  { id: 8, tip: 'yorum', kimden: 1, postId: 2, tarih: '2026-04-06T15:00:00', okundu: true },
  { id: 9, tip: 'begeni', kimden: 6, postId: 11, tarih: '2026-04-06T12:00:00', okundu: true },
  { id: 10, tip: 'takip', kimden: 10, postId: null, tarih: '2026-04-05T22:00:00', okundu: true },
  { id: 11, tip: 'begeni', kimden: 3, postId: 1, tarih: '2026-04-05T19:00:00', okundu: true },
  { id: 12, tip: 'yorum', kimden: 2, postId: 11, tarih: '2026-04-05T16:00:00', okundu: true },
  { id: 13, tip: 'begeni', kimden: 7, postId: 1, tarih: '2026-04-04T14:00:00', okundu: true },
  { id: 14, tip: 'takip', kimden: 1, postId: null, tarih: '2026-04-04T10:00:00', okundu: true },
  { id: 15, tip: 'yorum', kimden: 5, postId: 11, tarih: '2026-04-03T20:00:00', okundu: true },
]

// ─── Popüler emojiler (gönderi oluşturma) ────────────────────────────────────
export const POPULER_EMOJILER = [
  '😊', '😍', '🥰', '😎', '🤩', '😂', '🥳', '😇',
  '❤️', '🔥', '✨', '💫', '⭐', '🌟', '💪', '🙌',
  '🌅', '🌆', '🌃', '🌈', '☀️', '🌙', '⛅', '🌊',
  '🍕', '🍔', '☕', '🍰', '🍜', '🥗', '🍣', '🧁',
  '📸', '🎵', '🎮', '💻', '📚', '🎨', '🎸', '🎤',
]
