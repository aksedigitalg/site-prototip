export const FOOD_CATEGORIES = [
  'Tümü', 'Döner', 'Pizza', 'Burger', 'Köfte', 'Pide', 'Kebap', 'Tavuk', 'Tatlı',
]

export const FOOD_FILTERS = [
  'En Yakın', 'En Popüler', 'En Yüksek Puan', 'Ücretsiz Teslimat',
]

export const SLIDER_BANNERS = [
  { id: 1, title: 'İlk Siparişte %20 İndirim', subtitle: 'Hemen sipariş ver, kaçırma!', bg: '#111827' },
  { id: 2, title: 'Ücretsiz Teslimat',          subtitle: '150₺ ve üzeri tüm siparişlerde', bg: '#1e293b' },
  { id: 3, title: 'Yeni İşletmeler',            subtitle: 'Keşfetmeye başla', bg: '#0f172a' },
]

export const RESTAURANTS = [
  {
    id: 1, name: 'Dönerci Mehmet Usta', category: 'Döner',
    rating: 4.8, reviewCount: 234, deliveryTime: '20-30 dk',
    minOrder: 50, distance: '0.8 km', isOpen: true, discount: '%20',
  },
  {
    id: 2, name: 'Pizza House', category: 'Pizza',
    rating: 4.5, reviewCount: 189, deliveryTime: '25-40 dk',
    minOrder: 80, distance: '1.2 km', isOpen: true, discount: null,
  },
  {
    id: 3, name: 'Burger Bros', category: 'Burger',
    rating: 4.6, reviewCount: 312, deliveryTime: '15-25 dk',
    minOrder: 60, distance: '0.5 km', isOpen: true, discount: '%10',
  },
  {
    id: 4, name: 'Köfteci Yusuf', category: 'Köfte',
    rating: 4.9, reviewCount: 521, deliveryTime: '20-35 dk',
    minOrder: 40, distance: '1.5 km', isOpen: true, discount: null,
  },
  {
    id: 5, name: 'Pide Fırını', category: 'Pide',
    rating: 4.3, reviewCount: 98, deliveryTime: '30-45 dk',
    minOrder: 70, distance: '2.1 km', isOpen: false, discount: null,
  },
  {
    id: 6, name: 'Kebapçı Ali', category: 'Kebap',
    rating: 4.7, reviewCount: 445, deliveryTime: '25-35 dk',
    minOrder: 55, distance: '0.9 km', isOpen: true, discount: '%15',
  },
]

export const DISCOUNT_CARDS = {
  1: [
    { id: 1, title: 'İlk Sipariş', desc: '%20 indirim', code: 'ILK20' },
    { id: 2, title: '2 Al 1 Öde', desc: 'Dürümda geçerli', code: '2AL1ODE' },
    { id: 3, title: 'Hafta Sonu', desc: '%10 indirim', code: 'HAFTASONU' },
  ],
  2: [
    { id: 1, title: 'Aile Boyu', desc: '%25 indirim', code: 'AILE25' },
  ],
  3: [
    { id: 1, title: 'Combo Menü', desc: '₺20 indirim', code: 'COMBO20' },
    { id: 2, title: 'İkinci Burger', desc: 'Yarı fiyatına', code: 'BURGER50' },
  ],
  4: [], 5: [], 6: [
    { id: 1, title: 'Kebap Günü', desc: '%15 indirim', code: 'KEBAP15' },
  ],
}

export const MENUS = {
  1: [
    {
      section: 'Dönerler',
      items: [
        { id: 1, name: 'Yarım Ekmek Döner',  desc: 'Dana eti, domates, yeşil biber',        price: 85  },
        { id: 2, name: 'Tam Ekmek Döner',    desc: 'Dana eti, domates, yeşil biber',         price: 130 },
        { id: 3, name: 'Dürüm Döner',        desc: 'Dana eti, roka, domates, sos',           price: 110 },
        { id: 4, name: 'Pilav Üstü Döner',   desc: 'Dana eti, pilav, mevsim salata',         price: 145 },
      ],
    },
    {
      section: 'Ekstralar',
      items: [
        { id: 5, name: 'Patates Kızartması', desc: 'Çıtır patates',                          price: 45  },
        { id: 6, name: 'Salata',             desc: 'Mevsim salata',                          price: 35  },
      ],
    },
    {
      section: 'İçecekler',
      items: [
        { id: 7, name: 'Ayran',              desc: 'Ev yapımı soğuk ayran 300ml',            price: 20  },
        { id: 8, name: 'Kola',               desc: '330ml kutu',                             price: 25  },
        { id: 9, name: 'Su',                 desc: '500ml',                                  price: 10  },
      ],
    },
  ],
  2: [
    {
      section: 'Pizzalar',
      items: [
        { id: 1, name: 'Margarita',          desc: 'Domates sos, mozzarella',                price: 140 },
        { id: 2, name: 'Karışık',            desc: 'Sucuk, mantar, biber, zeytin',           price: 175 },
        { id: 3, name: 'Ton Balıklı',        desc: 'Ton balığı, soğan, mısır',              price: 180 },
        { id: 4, name: 'Vejeteryan',         desc: 'Ispanak, mantar, biber, domates',        price: 160 },
      ],
    },
    {
      section: 'İçecekler',
      items: [
        { id: 5, name: 'Kola',               desc: '330ml',                                  price: 25  },
        { id: 6, name: 'Meyve Suyu',         desc: 'Çeşitli tatlar',                        price: 20  },
      ],
    },
  ],
  3: [
    {
      section: 'Burgerlar',
      items: [
        { id: 1, name: 'Classic Burger',     desc: '180g dana köfte, marul, domates',        price: 120 },
        { id: 2, name: 'Cheese Burger',      desc: '180g dana köfte, cheddar peyniri',       price: 135 },
        { id: 3, name: 'Double Smash',       desc: '2x130g dana köfte, özel sos',            price: 175 },
        { id: 4, name: 'Chicken Burger',     desc: 'Çıtır tavuk, coleslaw, turşu',          price: 115 },
      ],
    },
    {
      section: 'Menüler',
      items: [
        { id: 5, name: 'Burger Menü',        desc: 'Burger + orta patates + içecek',         price: 180 },
        { id: 6, name: 'Double Menü',        desc: 'Double burger + büyük patates + içecek', price: 225 },
      ],
    },
  ],
  4: [
    {
      section: 'Köfteler',
      items: [
        { id: 1, name: 'Izgara Köfte',       desc: '3 adet ızgara köfte, ekmek, salata',    price: 95  },
        { id: 2, name: 'Çig Köfte Dürüm',   desc: 'Acılı / acısız seçeneği mevcut',        price: 55  },
        { id: 3, name: 'Köfte Ekmek',        desc: '2 adet köfte, ekmek, sos',              price: 70  },
      ],
    },
  ],
  5: [
    {
      section: 'Pideler',
      items: [
        { id: 1, name: 'Kaşarlı Pide',       desc: 'Bol kaşar peynirli',                    price: 90  },
        { id: 2, name: 'Kıymalı Pide',       desc: 'Kıyma, soğan, biber',                  price: 100 },
        { id: 3, name: 'Karışık Pide',       desc: 'Kıyma + kaşar',                         price: 115 },
      ],
    },
  ],
  6: [
    {
      section: 'Kebaplar',
      items: [
        { id: 1, name: 'Adana Kebap',        desc: 'Acılı kıyma kebap, pilav, salata',      price: 160 },
        { id: 2, name: 'Urfa Kebap',         desc: 'Acısız kıyma kebap, pilav, salata',     price: 155 },
        { id: 3, name: 'Tavuk Şiş',          desc: 'Marine tavuk göğsü, pilav',             price: 140 },
        { id: 4, name: 'Karışık Izgara',     desc: 'Adana, şiş, tavuk, pilav, salata',      price: 220 },
      ],
    },
  ],
}

export const REVIEWS = {
  1: [
    { id: 1, name: 'Ahmet K.',   rating: 5, date: '2 gün önce',   text: 'Harika döner, çok lezzetli. Kesinlikle tavsiye ederim!' },
    { id: 2, name: 'Zeynep M.', rating: 4, date: '1 hafta önce',  text: 'Lezzetli ama biraz geç geldi. Yine de beğendim.' },
    { id: 3, name: 'Emre S.',   rating: 5, date: '2 hafta önce',  text: 'Gebze\'nin en iyi dönerci burası, başka gitmiyorum.' },
    { id: 4, name: 'Elif T.',   rating: 4, date: '1 ay önce',     text: 'Et kalitesi çok iyi, fiyat performans mükemmel.' },
  ],
  2: [
    { id: 1, name: 'Murat B.',  rating: 5, date: '3 gün önce',   text: 'Pizza harikaydı, hamuru çok güzel.' },
    { id: 2, name: 'Selin A.',  rating: 3, date: '2 hafta önce',  text: 'Ortalama bir pizza, beklediğim gibi değildi.' },
  ],
  3: [
    { id: 1, name: 'Can D.',    rating: 5, date: '1 gün önce',   text: 'Double smash burger inanılmaz, mutlaka deneyin!' },
    { id: 2, name: 'Ayşe G.',  rating: 5, date: '5 gün önce',   text: 'Hızlı teslimat ve çok lezzetli.' },
    { id: 3, name: 'Burak K.', rating: 4, date: '1 hafta önce',  text: 'Güzel burger ama patatesler biraz az geldi.' },
  ],
  4: [
    { id: 1, name: 'Hasan Y.', rating: 5, date: '1 hafta önce',  text: 'Köfteleri gerçekten muhteşem!' },
  ],
  5: [], 6: [
    { id: 1, name: 'Serkan T.', rating: 5, date: '3 gün önce',  text: 'Adana kebap nefis, pilav çok güzeldi.' },
  ],
}

export const RESTAURANT_INFO = {
  1: { address: 'Bağcılar Cad. No:12, Gebze/Kocaeli', hours: '09:00 - 23:00', phone: '0262 111 22 33', minOrder: '50₺', deliveryTime: '20-30 dk' },
  2: { address: 'Atatürk Blv. No:45, Gebze/Kocaeli',  hours: '11:00 - 24:00', phone: '0262 222 33 44', minOrder: '80₺', deliveryTime: '25-40 dk' },
  3: { address: 'İnönü Cad. No:8, Gebze/Kocaeli',     hours: '10:00 - 23:30', phone: '0262 333 44 55', minOrder: '60₺', deliveryTime: '15-25 dk' },
  4: { address: 'Fatih Sok. No:21, Gebze/Kocaeli',    hours: '08:00 - 22:00', phone: '0262 444 55 66', minOrder: '40₺', deliveryTime: '20-35 dk' },
  5: { address: 'Cumhuriyet Mah. No:3, Gebze/Kocaeli',hours: '10:00 - 21:00', phone: '0262 555 66 77', minOrder: '70₺', deliveryTime: '30-45 dk' },
  6: { address: 'Mimar Sinan Cad. No:7, Gebze/Kocaeli',hours: '11:00 - 23:00',phone: '0262 666 77 88', minOrder: '55₺', deliveryTime: '25-35 dk' },
}
