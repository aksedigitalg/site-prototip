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
- Gradient yok, sade tasarım. (İstisna: GebzemAI FAB butonu mor→pembe gradient)
- Mobil görünüm, `max-width: 430px`, `rounded-2xl` kartlar.
- Tüm sayfalar `fixed` header + `BottomNav` (veya sadece header) yapısında.
- `font-size: 16px !important` global olarak input/textarea/select'e uygulanır (iOS zoom fix).
- `overscroll-behavior: none` global olarak html/body'e uygulanır (iOS mavi overscroll fix).

---

## Auth Akışları

### Kullanıcı Auth (localStorage)
| Key | Açıklama |
|-----|----------|
| `sehir_session` | Oturum var mı (PrivateRoute/PublicRoute bunu kontrol eder) |
| `sehir_user` | `{ firstName, lastName, phone, password }` — çıkışta silinmez |
| `sehir_onboarded` | Onboarding tamamlandı mı |
| `sehir_phone` | sessionStorage — OTP sayfasında geçici |
| `sehir_reset_phone` | sessionStorage — şifre sıfırlama akışında |
| `sehir_konum` | Seçili şehir/konum (İstanbul varsayılan) |

Akış: `/register` → `/otp` (OTP: `111111`) → `/home`
Şifre sıfırlama: `/forgot-password` → `/reset-otp` → `/new-password`
Çıkış: sadece `sehir_session` kaldırılır, kullanıcı verisi korunur.

### İşletme Auth (localStorage)
| Key | Açıklama |
|-----|----------|
| `isletme_session` | İşletme oturumu (IsletmeRoute bunu kontrol eder) |
| `isletme_user` | `{ isim, sahipAdi, telefon, kategori, password }` |
| `isletme_phone` | sessionStorage — kayıt sonrası OTP için |
| `isletme_reset_phone` | sessionStorage — şifre sıfırlama için |

Akış: `/isletme/register` → `/isletme/otp` (OTP: `111111`) → `/isletme/dashboard`
Giriş: `/isletme/login` — gerçek localStorage kontrolü (telefon + şifre)
Şifre sıfırlama: `/isletme/forgot-password` → `/isletme/reset-otp` → `/isletme/new-password`

### Admin Auth
| Key | Açıklama |
|-----|----------|
| `admin_session` | Admin oturumu (AdminRoute bunu kontrol eder) |

Giriş: `/admin/login` — sabit şifre: `admin123`

---

## localStorage — Kullanıcı Verisi
- `sehir_rezervasyonlar` → kullanıcının yaptığı restoran rezervasyonları (JSON array)
- `sehir_randevular` → hizmet randevuları (JSON array)
- `sehir_teklifler` → düğün/organizasyon teklif talepleri (JSON array)

---

## Proje Yapısı

```
src/
  pages/
    ── Kullanıcı Auth ────────────────────────────
    Onboarding.jsx          # 3 slaytlı tanıtım
    Login.jsx               # Telefon + şifre girişi
    Register.jsx            # Ad, soyad, tel, şifre kayıt
    ForgotPassword.jsx      # Şifre sıfırlama — telefon gir
    ResetOTP.jsx            # OTP doğrulama (kod: 111111)
    NewPassword.jsx         # Yeni şifre belirleme

    ── Ana & Genel ───────────────────────────────
    Home.jsx                # Ana sayfa:
                            #   - Konum seçici (header ortası, bottom sheet)
                            #   - Arama kutusu
                            #   - Slider (3 banner, otomatik kaydırma)
                            #   - Hızlı Erişim (6 görünür + "Tümü" → 22 kategorili sheet)
                            #   - Yakınında kartları (yatay scroll, hepsi aynı sıra, bus first)
                            #   - Kategoriler grid (4 kolon, "Tümü" → 85% yükseklik büyük kartlı sheet)
                            #   - GebzemAI FAB (mor→pembe gradient)
                            #   - Dev Sıfırla butonu (sol alt, yarı saydam)
    Profile.jsx             # Profil: Pro Hesap butonu (siyah, taç ikonu) + Arkadaşını Davet Et
                            #   (aktivitelerin üstünde), avatar, istatistikler, aktivite menüsü,
                            #   hesap bilgileri, İşletme & Admin giriş linkleri
    Search.jsx              # Canlı arama: son aramalar, popüler, kategori filtreler,
                            #   ünifiye sonuçlar, boş state → GebzemAI yönlendirme
    Explore.jsx             # Keşfet: Servis Talepleri bölümü (en üstte, yatay scroll talepler
                            #   + "Talep Oluştur" butonu), hero carousel, popüler yerler,
                            #   haftalık öneriler, yeni işletmeler, kategori dünyası
    ProPage.jsx             # Pro Hesap: Ücretsiz/Pro ₺79/İşletme ₺199, aylık-yıllık toggle,
                            #   özellik karşılaştırma, SSS accordion
    Campaigns.jsx           # Kampanyalar: kategori filtreler, büyük featured kart,
                            #   küçük kart listesi, kalan gün sayacı
    GebzemAI.jsx            # AI sohbet: siyah/beyaz minimal, öneri chips (yatay scroll),
                            #   welcome/chat state, typing animasyon, 1500ms mock delay

    ── Yemek & Restoran ──────────────────────────
    FoodPage.jsx            # Slider + kategori filtreli restoran listesi
    RestaurantDetail.jsx    # Menü/Hakkında/Yorumlar sekmeli detay + sepet + rezervasyon

    ── Hizmetler ─────────────────────────────────
    ServicesPage.jsx        # Kategori filtreli hizmet listesi
    ServiceDetail.jsx       # Kategoriye göre CTA:
                            #   Düğün → Teklif Al (/teklif-form/:id)
                            #   Sağlık → Randevu Al (/randevu-form/:id)
                            #   Diğer → Talep Gönder

    ── İlanlar ───────────────────────────────────
    IlanlarPage.jsx         # 3 sekme: Emlak 🏠 | Vasıta 🚗 | 2. El 📦
    EmlakDetail.jsx         # Emlak detay: fiyat, m², oda, kat, ısıtma, özellikler
    VasitaDetail.jsx        # Araç detay: 3x2 grid (yıl/km/yakıt/vites/renk/durum)
    IkincielDetail.jsx      # 2. el detay: benzer ilanlar bölümü

    ── Etkinlikler ───────────────────────────────
    EtkinliklerPage.jsx     # Öne çıkan carousel + tarih bloklu liste
    EtkinlikDetail.jsx      # Renkli poster cover, ücretsiz=yeşil/ücretli=siyah CTA

    ── Alışveriş ─────────────────────────────────
    AlisverisPage.jsx       # Kategori filtreli mağaza listesi
    SaticiProfil.jsx        # 4 sekme: Ürünler (2 kolon grid) | Kampanyalar | Hakkında | Yorumlar

    ── Rezervasyon / Randevu / Teklif ────────────
    RezervasyonForm.jsx     # Restoran rezervasyonu & hizmet randevusu (aynı component)
                            # tarih/saat/kişi/not → localStorage
    TeklifForm.jsx          # Düğün teklif talebi: etkinlik/tarih/kişi/bütçe → localStorage

    ── Servis Talep Sistemi ──────────────────────
    TaleplerPage.jsx        # Tüm servis talepleri, kategori filtreli
    TalepDetay.jsx          # Talep detay + usta teklifleri (puan, fiyat, kabul et)
    TalepOlustur.jsx        # Yeni talep formu: başlık/kategori/açıklama/bütçe/konum

    ── İş İlanları ───────────────────────────────
    IsIlanlarPage.jsx       # İş ilanları: arama, kategori + iş türü filtresi (tam/yarı/uzaktan/staj)
    IsIlanDetail.jsx        # Detay: Açıklama/Gereksinimler/Avantajlar sekmeleri, "Şimdi Başvur" CTA
    IsverenProfil.jsx       # İşveren profili: hakkında, istatistikler, açık pozisyonlar

    ── Profil Alt Sayfaları ──────────────────────
    Rezervasyonlarim.jsx    # Restoran rezervasyonları listesi
    Randevularim.jsx        # Hizmet randevuları listesi
    TekliflerPage.jsx       # Düğün/organizasyon teklifleri, "Kabul Et / Müzakere Et"
    MesajlarPage.jsx        # Konuşma listesi (okunmamış badge)
    MesajDetay.jsx          # Chat UI: baloncuklar, otomatik mock yanıt, Enter gönder

    ── Yakın Çevre (Harita) ──────────────────────
    NearbyDetail.jsx        # Liste/Harita toggle, Leaflet (CartoDB Positron tiles)
                            # Merkez: Gebze (40.8025, 29.4301), attributionControl=false

    ── İşletme Paneli (/isletme/*) ───────────────
    isletme/
      IsletmeLogin.jsx          # Tel + şifre girişi, localStorage kontrolü
      IsletmeRegister.jsx       # İşletme adı, yetkili, tel, kategori, şifre → OTP'ye
      IsletmeOTP.jsx            # 6 haneli OTP (111111) → dashboard
      IsletmeForgotPassword.jsx # Tel gir → reset OTP
      IsletmeResetOTP.jsx       # OTP doğrula (111111)
      IsletmeNewPassword.jsx    # Yeni şifre kaydet → login
      IsletmeDashboard.jsx      # Stat kartları, rezervasyon/mesaj/kampanya hızlı erişim
      IsletmeProfil.jsx         # İşletme bilgilerini düzenle, kaydet
      IsletmeRezervasyonlar.jsx # Gelen rezervasyonlar: Bekliyor/Onaylı/Tamamlandı, Onayla/Reddet
      IsletmeMesajlar.jsx       # Gelen mesajlar listesi (okunmamış badge)
      IsletmeKampanyalar.jsx    # Kampanya listesi + yeni kampanya oluştur

    ── Admin Paneli (/admin/*) ───────────────────
    admin/
      AdminLogin.jsx        # Sabit şifre (admin123), koyu tema
      AdminDashboard.jsx    # Stat kartları, son aktivite feed, bekleyen onay uyarısı
      AdminKullanicilar.jsx # Kullanıcı listesi, arama, askıya al/aktifleştir
      AdminIsletmeler.jsx   # İşletme listesi: Bekliyor/Onaylı/Reddedildi, Onayla/Reddet
      AdminAyarlar.jsx      # Uygulama adı, şehir, e-posta, bakım modu toggle

  data/
    mockFood.js             # FOOD_CATEGORIES, FOOD_FILTERS, SLIDER_BANNERS, RESTAURANTS,
                            # MENUS, REVIEWS, RESTAURANT_INFO, DISCOUNT_CARDS
    mockServices.js         # SERVICE_CATEGORIES (14 kategori: Temizlik→Düğün→Sağlık),
                            # SERVICES (14 adet), SERVICE_DETAILS
    mockPlaces.js           # pharmacy, atm, fuel, hospital, supermarket, parking,
                            # charging + PLACE_LABELS (22 kategori type)
    mockIlanlar.js          # EMLAK_LISTINGS (6), VASITA_LISTINGS (6), IKINCI_EL_LISTINGS (6)
    mockEtkinlikler.js      # ETKINLIKLER (8): Konser/Tiyatro/Spor/Festival/Sergi/Sinema
    mockAlisveris.js        # MAGAZALAR (10), URUNLER, KAMPANYALAR, MAGAZA_HAKKINDA, MAGAZA_YORUMLAR
    mockMesajlar.js         # KONUSMALAR (4), REZERVASYONLAR (3), RANDEVULAR (3), TEKLIFLER (2)
    mockAI.js               # ONERI_SORULAR (4), AI_YANIT_SABLONLARI (8 kategori keyword),
                            # VARSAYILAN_YANIT, AI_ILKmesaj
    mockSearch.js           # SON_ARAMALAR, POPULER_ARAMALAR, ARAMA_SONUCLARI (24 sonuç),
                            # KATEGORI_FILTRELERI (7 filtre)
    mockExplore.js          # HERO_ITEMS (3), POPULER_YERLER (6), YENI_ISLETMELER (5),
                            # HAFTALIK_ONERILER (4), KESFET_KATEGORILER (6)
    mockCampaigns.js        # KAMPANYA_KATEGORILER (5), KAMPANYALAR (12 kampanya)
    mockIsletme.js          # ISLETME_PROFIL, ISLETME_ISTATISTIK, ISLETME_REZERVASYONLAR (5),
                            # ISLETME_MESAJLAR (3), ISLETME_KAMPANYALAR (2)
    mockAdmin.js            # ADMIN_ISTATISTIK, ADMIN_SON_AKTIVITE (5), ADMIN_KULLANICILAR (8),
                            # ADMIN_ISLETMELER (10), ADMIN_ILANLAR (6)
                            # ADMIN_SIFRE = 'admin123', ISLETME_SIFRE = 'isletme123' (artık kullanılmıyor)
    mockPro.js              # PRO_PLANLAR (Ücretsiz/Pro/İşletme), PRO_SSS (3 soru)
    mockTalep.js            # TALEP_KATEGORILER (10), TALEPLER (6), TALEP_TEKLIFLERI (usta teklifleri)
    mockIsIlanlari.js       # IS_KATEGORILER (11), IS_TURLERI (5), IS_ILANLARI (8),
                            # ISVEREN_PROFILLER (5 işveren)

  components/
    BottomNav.jsx           # Fixed bottom nav, bg-white/80 backdrop-blur, rounded-t-[10px]
                            # active prop: 'home' | 'search' | 'explore' | 'campaigns' | 'profile'
    IsletmeNav.jsx          # İşletme paneli bottom nav (koyu beyaz, 4 sekme)
    AdminNav.jsx            # Admin paneli bottom nav (koyu gri-900, 4 sekme)

  App.jsx                   # Route yönetimi: PrivateRoute, PublicRoute, IsletmeRoute, AdminRoute
  main.jsx                  # BrowserRouter burada
  index.css                 # @import "tailwindcss" + leaflet css + Plus Jakarta Sans font
                            # Global: iOS zoom fix, overscroll-behavior: none
```

---

## Route Tablosu

### Kullanıcı Rotaları
| Path | Sayfa | Erişim |
|------|-------|--------|
| `/` | Yönlendirme (session/onboarded'a göre) | Public |
| `/onboarding` | Onboarding | Public |
| `/login` | Giriş | PublicRoute |
| `/register` | Kayıt | PublicRoute |
| `/forgot-password` | Şifre sıfırlama adım 1 | Public |
| `/reset-otp` | OTP doğrulama | Public |
| `/new-password` | Yeni şifre | Public |
| `/home` | Ana sayfa | Private |
| `/nearby/:type` | Yakın yer haritası (22 tip) | Private |
| `/search` | Arama | Private |
| `/explore` | Keşfet | Private |
| `/campaigns` | Kampanyalar | Private |
| `/profile` | Profil | Private |
| `/gebzem-ai` | GebzemAI sohbet | Private |
| `/food` | Yemek/Restoran listesi | Private |
| `/restaurant/:id` | Restoran detayı | Private |
| `/services` | Hizmetler listesi | Private |
| `/service/:id` | Hizmet detayı | Private |
| `/ilanlar` | İlanlar (Emlak/Vasıta/2.El) | Private |
| `/ilanlar/emlak/:id` | Emlak detayı | Private |
| `/ilanlar/vasita/:id` | Vasıta detayı | Private |
| `/ilanlar/ikinciel/:id` | 2. El detayı | Private |
| `/etkinlikler` | Etkinlikler listesi | Private |
| `/etkinlik/:id` | Etkinlik detayı | Private |
| `/alisveris` | Alışveriş mağazaları | Private |
| `/magaza/:id` | Satıcı/Mağaza profili | Private |
| `/rezervasyon/:id` | Restoran rezervasyon formu | Private |
| `/randevu-form/:id` | Hizmet randevu formu (= RezervasyonForm) | Private |
| `/teklif-form/:id` | Düğün teklif formu | Private |
| `/rezervasyonlarim` | Rezervasyon geçmişi | Private |
| `/randevularim` | Randevu geçmişi | Private |
| `/tekliflerim` | Teklif geçmişi | Private |
| `/mesajlarim` | Mesaj listesi | Private |
| `/mesaj/:id` | Konuşma detayı | Private |
| `/pro` | Pro Hesap planları | Private |
| `/talepler` | Servis talepleri listesi | Private |
| `/talep/:id` | Talep detayı + usta teklifleri | Private |
| `/talep-olustur` | Yeni talep oluştur | Private |
| `/is-ilanlari` | İş ilanları listesi | Private |
| `/is-ilani/:id` | İş ilanı detayı | Private |
| `/isveren/:id` | İşveren profili | Private |

### İşletme Rotaları
| Path | Sayfa | Erişim |
|------|-------|--------|
| `/isletme/login` | İşletme girişi | Public |
| `/isletme/register` | İşletme kaydı | Public |
| `/isletme/otp` | Kayıt OTP doğrulama | Public |
| `/isletme/forgot-password` | Şifre sıfırlama adım 1 | Public |
| `/isletme/reset-otp` | Şifre sıfırlama OTP | Public |
| `/isletme/new-password` | Yeni şifre | Public |
| `/isletme/dashboard` | Dashboard | IsletmeRoute |
| `/isletme/profil` | Profil düzenle | IsletmeRoute |
| `/isletme/rezervasyonlar` | Rezervasyon yönetimi | IsletmeRoute |
| `/isletme/mesajlar` | Mesaj gelen kutusu | IsletmeRoute |
| `/isletme/kampanyalar` | Kampanya yönetimi | IsletmeRoute |

### Admin Rotaları
| Path | Sayfa | Erişim |
|------|-------|--------|
| `/admin/login` | Admin girişi (admin123) | Public |
| `/admin/dashboard` | Dashboard + istatistikler | AdminRoute |
| `/admin/kullanicilar` | Kullanıcı yönetimi | AdminRoute |
| `/admin/isletmeler` | İşletme onay/red | AdminRoute |
| `/admin/ayarlar` | Uygulama ayarları | AdminRoute |

---

## Önemli Tasarım Kararları
- **RestaurantDetail sepet**: `cart` state `{ [itemId]: qty }` — `Object.entries` ile toplam hesap
- **SaticiProfil** 4 sekmeli; RestaurantDetail 3 sekmeli
- **EtkinlikDetail CTA**: `fiyat === null` → yeşil "Ücretsiz Katıl", aksi → siyah "Bilet Al — X₺"
- **ServiceDetail CTA**: `category === 'Düğün'` → Teklif Al, `'Sağlık'` → Randevu Al, diğer → Talep Gönder
- **Harita tiles**: CartoDB Positron (sade, gri/sarı), `attributionControl={false}`
- **DevReset butonu**: Sadece Home.jsx'te, `fixed bottom-24 left-4`, yarı saydam
- **GebzemAI**: Siyah/beyaz minimal, `height: 100dvh`, `overscrollBehavior: none`, `paddingBottom: 168px`
- **Home slider**: `scrollSnapType: x mandatory`, dot indikatörler, 3500ms otomatik geçiş
- **Hızlı Erişim**: İlk 5 ikon + "Tümü" → bottom sheet'te 22 kategori, 5'li grid
- **Konum seçici**: Header ortasına tıklayınca bottom sheet: GPS, kayıtlı konumlar, yeni konum ekle
- **İşletme auth**: `isletme_user` localStorage'da, gerçek tel+şifre kontrolü, OTP: `111111`
- **Admin auth**: Sabit şifre `admin123`, ayrı koyu tema (gray-900 header/nav)
- **NearbyCard**: Tüm yakın yer kartları tek yatay scroll'da, bus kartı first + yeşil "X dk" badge
- **Home Kategoriler**: 4'lü grid + "Tümü" → 85% yükseklik bottom sheet (emoji + renkli bg kartlar, 12 kategori)
- **Pro sayfası**: `secili` state ile plan seçimi, fiyat toggle (aylık/yıllık), `PRO_PLANLAR` mock verisi
- **Servis talebi sistemi**: Explore sayfasında talep kartları, `/talepler` listesi, `/talep/:id` usta teklifleri
- **İş ilanları**: kategori + iş türü çift filtre, işveren profili sayfası, başvuru state
