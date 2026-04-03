export const ONERI_SORULAR = [
  'Yakınımdaki en iyi restoranları öner',
  'Düğün organizasyonu için tavsiye ver',
  'Bu hafta Gebze\'de ne etkinlik var?',
  'Güvenilir elektrikçi nasıl bulurum?',
]

export const AI_YANIT_SABLONLARI = [
  {
    keywords: ['restoran', 'yemek', 'ye', 'pizza', 'döner', 'sushi', 'burger', 'cafe', 'kafe', 'lokanta', 'öner'],
    yanit: `Gebze'de öne çıkan restoranlar şunlar 🍽️\n\n🥙 Döner Palace — 4.7 ⭐ · 0.4 km\n🍕 Pizza Roma — 4.8 ⭐ · 0.8 km\n🍣 Sushi Bar — 4.6 ⭐ · 1.2 km\n🍔 Burger House — 4.5 ⭐ · 0.6 km\n\nRezervasyon veya sipariş için Yemek sayfasına gidebilirsiniz.`,
  },
  {
    keywords: ['düğün', 'nikah', 'nişan', 'söz', 'kına', 'organizasyon', 'salon', 'evlen'],
    yanit: `Düğün organizasyonu için yüksek puanlı firmalar 💍\n\n💒 Royal Düğün Salonu — 4.8 ⭐ · 500 kişi kapasiteli\n📸 Anı Fotoğraf Stüdyosu — 4.7 ⭐ · Drone dahil\n🌸 Çiçek & Organizasyon — 4.6 ⭐ · Süsleme, dekor\n\nTeklif almak için Hizmetler → Düğün bölümüne bakabilirsiniz.`,
  },
  {
    keywords: ['etkinlik', 'konser', 'tiyatro', 'festival', 'spor', 'sergi', 'sinema', 'ne var', 'nerede'],
    yanit: `Bu hafta Gebze'de öne çıkan etkinlikler 🎉\n\n🎸 Rock Geceleri Konseri — 12 Nisan · 350₺\n🎭 Hamlet (Tiyatro) — 15 Nisan · 180₺\n🏃 Gebze Yarı Maraton — 20 Nisan · Ücretsiz\n🎪 Yaz Müzik Festivali — 25 Nisan · 500₺\n\nTümünü Etkinlikler sayfasında görebilirsiniz.`,
  },
  {
    keywords: ['elektrik', 'tesisat', 'temizlik', 'boya', 'tadilat', 'klima', 'nakliyat', 'hizmet', 'usta', 'tamirci', 'bul'],
    yanit: `Gebze'de güvenilir hizmet uzmanları 🔧\n\n⚡ Usta Elektrik — 4.7 ⭐ · 300₺/iş başı\n🔧 Su Tesisatçısı Mehmet — 4.8 ⭐ · 350₺/iş başı\n🧹 Ahmet Temizlik — 4.9 ⭐ · 250₺/saat\n🏗️ Tadilat Ustası — 4.7 ⭐ · 350₺/gün\n\nFiyat teklifi almak için Hizmetler sayfasından mesaj atabilirsiniz.`,
  },
  {
    keywords: ['doktor', 'sağlık', 'hastane', 'diş', 'psikolog', 'muayene', 'randevu', 'hasta'],
    yanit: `Gebze'de sağlık hizmetleri 🏥\n\n👨‍⚕️ Dr. Ahmet Yılmaz — 4.9 ⭐ · Dahiliye · 600₺\n🦷 DentSmile Diş Kliniği — 4.8 ⭐ · 500₺\n🧠 Psikolog Zeynep Kaya — 4.9 ⭐ · 800₺/seans\n\nOnline randevu için Hizmetler → Sağlık kategorisine bakabilirsiniz.`,
  },
  {
    keywords: ['emlak', 'daire', 'kiralık', 'satılık', 'villa', 'arsa', 'işyeri', 'konut'],
    yanit: `Gebze'de güncel emlak ilanları 🏠\n\n🏢 3+1 Merkezi Daire — Satılık · 4.500.000₺\n🏡 2+1 Eşyalı Kiralık — 12.000₺/ay\n🏰 4+1 Bahçeli Villa — Satılık · 9.800.000₺\n🏗️ İmarlı Köşe Arsa — Satılık · 2.100.000₺\n\nTüm ilanlar için İlanlar → Emlak sayfasına bakabilirsiniz.`,
  },
  {
    keywords: ['araba', 'araç', 'vasıta', 'otomobil', 'toyota', 'volkswagen', 'bmw', 'ikinci el'],
    yanit: `Gebze'de popüler araç ilanları 🚗\n\n🚗 Toyota Corolla Hybrid 2021 — 1.250.000₺\n🚙 VW Tiguan 2020 — 1.680.000₺\n🏎️ BMW 320i M Sport 2018 — 1.450.000₺\n🛻 Ford Transit Custom 2019 — 1.100.000₺\n\nTüm araçlar için İlanlar → Vasıta sayfasına bakabilirsiniz.`,
  },
  {
    keywords: ['alışveriş', 'market', 'migros', 'bim', 'a101', 'elektronik', 'giyim', 'mağaza'],
    yanit: `Gebze'de alışveriş için popüler mağazalar 🛒\n\n🛒 Migros — 4.6 ⭐ · 0.4 km · 4 kampanya\n🏪 BİM — 4.3 ⭐ · 0.2 km · 6 kampanya\n📺 MediaMarkt — 4.5 ⭐ · 1.2 km · 8 kampanya\n👕 LC Waikiki — 4.3 ⭐ · 0.9 km · 5 kampanya\n\nTüm mağazalar için Alışveriş sayfasına bakabilirsiniz.`,
  },
]

export const VARSAYILAN_YANIT = `Merhaba! Gebze ve çevresi hakkında size yardımcı olmaktan mutluluk duyarım 😊\n\nŞu konularda bilgi verebilirim:\n\n🍽️ Restoran ve yemek önerileri\n🔧 Hizmet ve usta bulma\n🎉 Etkinlikler ve aktiviteler\n🏠 Emlak ve araç ilanları\n💒 Düğün organizasyonu\n🏥 Sağlık ve randevu\n🛒 Alışveriş ve mağazalar\n\nNe hakkında bilgi almak istersiniz?`

export const AI_ILKmesaj = 'Merhaba! Şehrinizle ilgili bir soru sorun, size en iyi önerileri sunayım 💡'
