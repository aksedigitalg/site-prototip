# Şehir App — Proje Rehberi

## Genel Bilgi
- Kullanıcıyla **her zaman Türkçe** konuş. Adımlar, açıklamalar, hata mesajları hepsi Türkçe.
- Bu bir mobil öncelikli şehir uygulaması prototipidir (Flutter tasarım prototipi olarak React ile yapılıyor).
- **Git push sadece kullanıcı "git pusla" dediğinde yapılır.**

## Tech Stack
- **React 19** + **Vite 8** (build aracı)
- **Tailwind CSS 4** (`@tailwindcss/vite` plugin ile)
- **React Router v7**
- **Lucide React** (ikonlar)
- **vite-plugin-pwa** (PWA desteği, `.npmrc` ile `legacy-peer-deps=true` ayarlı)
- Leaflet + react-leaflet (harita, NearbyDetail'de kullanılıyor)

## Deploy
- GitHub repo: `aksedigitalg/site-prototip`
- Vercel'e bağlı — `git push` yapınca otomatik deploy olur
- Sunucuyu durdurmadan push yapılabilir

## Yeni Bilgisayarda Başlangıç
```bash
git clone https://github.com/aksedigitalg/site-prototip.git
cd site-prototip
npm install
npm run dev
```

## Tema & Tasarım Kuralları
- **Renk**: Siyah/beyaz/gri tema. `bg-gray-900` primary, `bg-gray-50` background.
- Gradient yok, sade tasarım.
- Mobil görünüm, `max-width: 430px`, `rounded-2xl` kartlar.
- Tüm sayfalar `fixed` header + `BottomNav` (veya sadece header) yapısında.

## Auth Akışı (localStorage tabanlı, backend yok)
- `sehir_session` → oturum var mı (PrivateRoute/PublicRoute bunu kontrol eder)
- `sehir_user` → `{ firstName, lastName, phone, password }` — çıkışta silinmez
- `sehir_onboarded` → onboarding tamamlandı mı
- `sehir_phone` → sessionStorage, OTP sayfasında geçici
- `sehir_reset_phone` → sessionStorage, şifre sıfırlama akışında
- OTP kodu her yerde `111111`
- Çıkış: sadece `sehir_session` kaldırılır, kullanıcı verisi korunur

## localStorage — Kullanıcı Verisi
- `sehir_rezervasyonlar` → kullanıcının yaptığı restoran rezervasyonları (JSON array)
- `sehir_randevular` → hizmet randevuları (JSON array)
- `sehir_teklifler` → düğün/organizasyon teklif talepleri (JSON array)

---

## Proje Yapısı

```
src/
  pages/
    ── Auth ──────────────────────────────────────
    Onboarding.jsx       # 3 slaytlı tanıtım
    Login.jsx            # Telefon + şifre girişi
    Register.jsx         # Ad, soyad, tel, şifre kayıt
    OTP.jsx              # 6 haneli kod (şimdilik kullanılmıyor)
    ForgotPassword.jsx   # Şifre sıfırlama — telefon gir
    ResetOTP.jsx         # OTP doğrulama (kod: 111111)
    NewPassword.jsx      # Yeni şifre belirleme

    ── Ana & Genel ───────────────────────────────
    Home.jsx             # Ana sayfa: Hızlı Erişim, Yakınında, Kategoriler
    Profile.jsx          # Profil: avatar, istatistikler, aktivite menüsü, hesap
    Search.jsx           # Arama sayfası
    Explore.jsx          # Keşfet
    Campaigns.jsx        # Kampanyalar

    ── Yemek & Restoran ──────────────────────────
    FoodPage.jsx         # Slider + kategori filtreli restoran listesi
    RestaurantDetail.jsx # Menü/Hakkında/Yorumlar sekmeli detay + sepet + rezervasyon

    ── Hizmetler ─────────────────────────────────
    ServicesPage.jsx     # Kategori filtreli hizmet listesi
    ServiceDetail.jsx    # Hizmet detayı — kategoriye göre CTA:
                         #   Düğün → Teklif Al (/teklif-form/:id)
                         #   Sağlık → Randevu Al (/randevu-form/:id)
                         #   Diğer → Talep Gönder

    ── İlanlar ───────────────────────────────────
    IlanlarPage.jsx      # 3 sekme: Emlak 🏠 | Vasıta 🚗 | 2. El 📦
    EmlakDetail.jsx      # Emlak detay: fiyat, m², oda, kat, ısıtma, özellikler
    VasitaDetail.jsx     # Araç detay: 3x2 grid (yıl/km/yakıt/vites/renk/durum)
    IkincielDetail.jsx   # 2. el detay: benzer ilanlar bölümü

    ── Etkinlikler ───────────────────────────────
    EtkinliklerPage.jsx  # Öne çıkan carousel + tarih bloklu liste
    EtkinlikDetail.jsx   # Renkli poster cover, ücretsiz=yeşil/ücretli=siyah CTA

    ── Alışveriş ─────────────────────────────────
    AlisverisPage.jsx    # Kategori filtreli mağaza listesi
    SaticiProfil.jsx     # 4 sekme: Ürünler (2 kolon grid) | Kampanyalar | Hakkında | Yorumlar
                         # Sepet mekanizması RestaurantDetail ile aynı

    ── Rezervasyon / Randevu / Teklif ────────────
    RezervasyonForm.jsx  # Restoran rezervasyonu: tarih/saat/kişi/not → localStorage
                         # Aynı sayfa /randevu-form/:id için de kullanılıyor
    TeklifForm.jsx       # Düğün teklif talebi: etkinlik/tarih/kişi/bütçe → localStorage

    ── Profil Alt Sayfaları ──────────────────────
    Rezervasyonlarim.jsx # Restoran rezervasyonları listesi
    Randevularim.jsx     # Hizmet randevuları listesi
    TekliflerPage.jsx    # Düğün/organizasyon teklifleri, "Kabul Et / Müzakere Et"
    MesajlarPage.jsx     # Konuşma listesi (okunmamış badge)
    MesajDetay.jsx       # Chat UI: baloncuklar, otomatik mock yanıt, Enter gönder

    ── Yakın Çevre (Harita) ──────────────────────
    NearbyDetail.jsx     # Liste/Harita toggle, Leaflet (CartoDB Positron tiles)
                         # Merkez: Gebze (40.8025, 29.4301), attributionControl=false

  data/
    mockFood.js          # FOOD_CATEGORIES, FOOD_FILTERS, SLIDER_BANNERS, RESTAURANTS,
                         # MENUS, REVIEWS, RESTAURANT_INFO, DISCOUNT_CARDS
    mockServices.js      # SERVICE_CATEGORIES (Temizlik→Düğün), SERVICES (14 adet),
                         # SERVICE_DETAILS (phone/address/hours/services/reviews)
                         # Kategoriler: ...Tadilat, Sağlık (Dr./Diş/Psikolog), Düğün (Salon/Fotoğraf/Çiçek)
    mockPlaces.js        # pharmacy, atm, fuel, hospital, supermarket, parking, charging + PLACE_LABELS
    mockIlanlar.js       # EMLAK_LISTINGS (6), VASITA_LISTINGS (6), IKINCI_EL_LISTINGS (6)
    mockEtkinlikler.js   # ETKINLIKLER (8): Konser/Tiyatro/Spor/Festival/Sergi/Sinema, featured flag, bg rengi
    mockAlisveris.js     # MAGAZALAR (10), URUNLER, KAMPANYALAR, MAGAZA_HAKKINDA, MAGAZA_YORUMLAR
    mockMesajlar.js      # KONUSMALAR (4 hazır konuşma), REZERVASYONLAR (3), RANDEVULAR (3), TEKLIFLER (2)

  components/
    BottomNav.jsx        # Fixed bottom nav, bg-white/80 backdrop-blur, rounded-t-[10px]

  App.jsx                # Route yönetimi, PrivateRoute/PublicRoute, DevReset butonu
  main.jsx               # BrowserRouter burada
  index.css              # @import "tailwindcss" + leaflet css + Plus Jakarta Sans font
```

## Route Tablosu

| Path | Sayfa | Erişim |
|------|-------|--------|
| `/` | Yönlendirme (session/onboarded'a göre) | Public |
| `/onboarding` | Onboarding | Public |
| `/login` | Giriş | Public |
| `/register` | Kayıt | Public |
| `/forgot-password` → `/reset-otp` → `/new-password` | Şifre sıfırlama | Public |
| `/home` | Ana sayfa | Private |
| `/nearby/:type` | Yakın yer haritası | Private |
| `/food` | Yemek/Restoran listesi | Private |
| `/restaurant/:id` | Restoran detayı | Private |
| `/rezervasyon/:id` | Restoran rezervasyon formu | Private |
| `/services` | Hizmetler listesi | Private |
| `/service/:id` | Hizmet detayı | Private |
| `/teklif-form/:id` | Düğün teklif formu | Private |
| `/randevu-form/:id` | Sağlık randevu formu | Private |
| `/ilanlar` | İlanlar (Emlak/Vasıta/2.El) | Private |
| `/ilanlar/emlak/:id` | Emlak detayı | Private |
| `/ilanlar/vasita/:id` | Vasıta detayı | Private |
| `/ilanlar/ikinciel/:id` | 2. El detayı | Private |
| `/etkinlikler` | Etkinlikler listesi | Private |
| `/etkinlik/:id` | Etkinlik detayı | Private |
| `/alisveris` | Alışveriş mağazaları | Private |
| `/magaza/:id` | Satıcı/Mağaza profili | Private |
| `/rezervasyonlarim` | Rezervasyon geçmişi | Private |
| `/randevularim` | Randevu geçmişi | Private |
| `/tekliflerim` | Teklif geçmişi | Private |
| `/mesajlarim` | Mesaj listesi | Private |
| `/mesaj/:id` | Konuşma detayı (chat) | Private |
| `/search` | Arama | Private |
| `/explore` | Keşfet | Private |
| `/campaigns` | Kampanyalar | Private |
| `/profile` | Profil | Private |

## Anasayfa Kategori Yönlendirmeleri
```
Yemek      → /food
Restoran   → /food
Hizmetler  → /services
İş İlanları→ null (henüz yok)
İlanlar    → /ilanlar
Etkinlikler→ /etkinlikler
Alışveriş  → /alisveris
```

## Önemli Tasarım Kararları
- **RestaurantDetail sepet**: `cart` state `{ [itemId]: qty }` — `Object.entries` ile toplam hesap
- **SaticiProfil** tek 4-sekmeli sayfa; diğerleri 3 sekme veya seksiz
- **EtkinlikDetail CTA**: `fiyat === null` → yeşil "Ücretsiz Katıl", aksi → siyah "Bilet Al — X₺"
- **ServiceDetail CTA**: `category === 'Düğün'` → Teklif Al, `'Sağlık'` → Randevu Al, diğer → Talep Gönder
- **Harita tiles**: CartoDB Positron (sade, gri/sarı), `attributionControl={false}`
- **DevReset butonu**: App.jsx'te `fixed bottom-4 right-4`, localStorage + sessionStorage temizler
