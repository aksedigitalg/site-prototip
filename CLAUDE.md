# Şehir App — Proje Rehberi

## Genel Bilgi
- Kullanıcıyla **her zaman Türkçe** konuş. Adımlar, açıklamalar, hata mesajları hepsi Türkçe.
- Bu bir mobil öncelikli şehir uygulaması prototipidir (Flutter tasarım prototipi olarak React ile yapılıyor).
- **Git push sadece kullanıcı "git pusla" dediğinde yapılır.**
- **Benden izin isteme** — yeni özellikler eklerken onay beklemeden direkt yap.

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

---

## Demo Hesapları (Reset Sonrası da Çalışır)

| Hesap Türü | Telefon | Şifre | Giriş Sayfası |
|------------|---------|-------|---------------|
| Kullanıcı  | 542 646 90 70 | 8014 | `/login` |
| İşletme    | 542 646 90 70 | 8014 | `/isletme/login` |
| Admin      | —       | admin123 | `/admin/login` |

- Demo kullanıcı: `{ firstName: 'Demo', lastName: 'Kullanıcı', phone: '5426469070', password: '8014' }`
- Demo işletme: `{ isim: 'Demo Kafe', sahipAdi: 'Demo Sahip', telefon: '5426469070', kategori: 'Kafe & Restoran', password: '8014' }`
- Login.jsx ve IsletmeLogin.jsx'te **DEMO_USER / DEMO_ISLETME** sabit olarak tanımlı → localStorage'den bağımsız çalışır
- **Dev Sıfırla butonu** (Home.jsx sol alt): session/rezervasyon/randevu siler, demo hesapları yeniler, `/login`'e yönlendirir

---

## Tema & Tasarım Kuralları
- **Renk**: Siyah/beyaz/gri tema. `bg-gray-900` primary, `bg-gray-50` background.
- Gradient yok, sade tasarım. (İstisnalar: GebzemAI FAB mor→pembe; Story Viewer tam ekran renkli bg)
- Mobil görünüm, `max-width: 430px`, `rounded-2xl` kartlar.
- Tüm sayfalar `fixed` header + `BottomNav` (veya sadece header) yapısında.
- `font-size: 16px !important` global olarak input/textarea/select'e uygulanır (iOS zoom fix).
- `overscroll-behavior: none` global olarak html/body'e uygulanır (iOS mavi overscroll fix).
- **"Görsel"** gereken yerlerde: gradient bg + büyük emoji (gerçek resim yok, prototip).
- **Date input**: native `<input type="date">` styled bg-gray-50 rounded-xl ile.

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
Giriş: `/isletme/login` — localStorage + DEMO_ISLETME hardcoded fallback
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
    Login.jsx               # Telefon + şifre; DEMO_USER hardcoded (542 646 90 70 / 8014)
    Register.jsx            # Ad, soyad, tel, şifre kayıt
    ForgotPassword.jsx      # Şifre sıfırlama — telefon gir
    ResetOTP.jsx            # OTP doğrulama (kod: 111111)
    NewPassword.jsx         # Yeni şifre belirleme

    ── Ana & Genel ───────────────────────────────
    Home.jsx                # Ana sayfa:
                            #   - Konum seçici (header ortası, bottom sheet)
                            #   - Arama kutusu
                            #   - Slider (3 banner, 3500ms otomatik)
                            #   - Hızlı Erişim (6 ikon + "Tümü" → 22 kategorili sheet)
                            #   - Yakınında kartları (tek yatay scroll, bus first + yeşil "X dk")
                            #   - Kategoriler (4 kolon grid + "Tümü" → 85% sheet, 12 büyük emoji kart)
                            #   - GebzemAI FAB (mor→pembe gradient, fixed bottom-right)
                            #   - Dev Sıfırla (sol alt, opasite 40%, session temizler demo korur)
    Profile.jsx             # Profil:
                            #   - Pro Hesap butonu (bg-gray-900, Crown ikonu, → /pro)
                            #   - Arkadaşını Davet Et (Gift ikonu, mor)
                            #   - İstatistik 4-kolon grid
                            #   - Aktiviteler (Rezervasyon/Randevu/Mesaj/Teklif)
                            #   - Hesap bilgileri
                            #   - İşletme & Admin giriş linkleri
                            #   - Çıkış Yap
    Search.jsx              # Canlı arama: son aramalar, popüler, kategori filtreler,
                            #   ünifiye sonuçlar, boş state → GebzemAI yönlendirme
    Explore.jsx             # Keşfet:
                            #   - Servis Talepleri (en üst, yatay scroll + "Talep Oluştur")
                            #   - Hero carousel (4000ms)
                            #   - Yakınındaki Popüler
                            #   - Bu Hafta Öne Çıkanlar (2 kolon grid)
                            #   - Yeni İşletmeler
                            #   - Kategori Dünyası (3 kolon)
    Campaigns.jsx           # Kampanyalar: kategori filtreler, büyük featured kart,
                            #   küçük kart listesi, kalan gün sayacı
    GebzemAI.jsx            # AI sohbet: siyah/beyaz minimal, öneri chips (yatay scroll),
                            #   welcome/chat state, typing animasyon, 1500ms mock delay
    ProPage.jsx             # Pro Hesap:
                            #   - Ücretsiz / Pro ₺79/ay / İşletme ₺199/ay plan kartları
                            #   - Aylık/Yıllık toggle (%25 indirim)
                            #   - Özellik karşılaştırma (Check/X ikonlar)
                            #   - SSS accordion (ChevronDown/Up)
                            #   - `secili` state ile CTA fiyatı değişir

    ── Yemek & Restoran ──────────────────────────
    FoodPage.jsx            # Story + Markalar (food) → Slider → Kategori → Restoran listesi
    RestaurantDetail.jsx    # Menü/Hakkında/Yorumlar sekmeli detay + sepet + rezervasyon

    ── Hizmetler ─────────────────────────────────
    ServicesPage.jsx        # Story + Markalar (services) → Arama → Kategori → Hizmet listesi
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
    EtkinliklerPage.jsx     # Story + Markalar (etkinlikler) → Öne çıkan carousel → Listesi
    EtkinlikDetail.jsx      # Renkli poster cover, ücretsiz=yeşil/ücretli=siyah CTA

    ── Alışveriş ─────────────────────────────────
    AlisverisPage.jsx       # Story + Markalar (alisveris) → Arama → Kategori → Mağaza listesi
    SaticiProfil.jsx        # 4 sekme: Ürünler (2 kolon grid) | Kampanyalar | Hakkında | Yorumlar

    ── Otel ──────────────────────────────────────
    OtellerPage.jsx         # Otel listesi:
                            #   - Giriş/Çıkış tarih + misafir sayısı picker
                            #   - Gece sayısı hesaplama (toplam fiyat)
                            #   - Kategori filtresi (3★/4★/5★/Butik/Apart)
                            #   - Otel kartları: gradient+emoji görsel, yıldız, puan, özellikler
    OtelDetail.jsx          # Otel detay:
                            #   - Gradient+emoji hero (220px)
                            #   - Tarih/misafir seçici (gece sayısı günceller fiyatı)
                            #   - Sekme: Odalar / Hakkında / Yorumlar
                            #   - Oda kartları: emoji görsel, özellikler, "Rezervasyon Yap" + "Teklif Ver"
                            #   - Rezervasyon özet sheet → başarı ekranı
                            #   - Teklif ver sheet → textarea

    ── Araç Kiralama ─────────────────────────────
    AracKiralamaPage.jsx    # Araç kiralama listesi:
                            #   - Alış/iade tarihi + konum picker
                            #   - Gün sayısı hesaplama (toplam fiyat)
                            #   - Kategori filtresi: Economy/Kompakt/SUV/Lüks/Minivan/Elektrikli
                            #   - Araç kartları: gradient+emoji görsel, specs (yakıt/vites/bagaj/km)
    AracDetail.jsx          # Araç detay:
                            #   - Gradient+emoji hero (220px)
                            #   - Tarih/konum seçici (gün sayısı → toplam fiyat)
                            #   - Sekme: Detaylar / Özellikler / Kiralama Firması / Yorumlar
                            #   - "Hemen Kirala" → kiralama özet sheet → başarı
                            #   - "Teklif Ver" → fiyat + not sheet

    ── Servis Talep Sistemi ──────────────────────
    TaleplerPage.jsx        # Tüm servis talepleri, TALEP_KATEGORILER filtresi, "Talep Oluştur" CTA
    TalepDetay.jsx          # Talep detay: açıklama, konum, bütçe + usta teklifleri (puan/fiyat/sure)
    TalepOlustur.jsx        # Yeni talep formu: başlık/kategori/açıklama/bütçe/konum → başarı

    ── İş İlanları ───────────────────────────────
    IsIlanlarPage.jsx       # İş ilanları:
                            #   - Arama (pozisyon/şirket)
                            #   - Kategori filtresi (11 kategori)
                            #   - İş türü filtresi (Tam/Yarı/Uzaktan/Staj/Freelance) — renk kodlu
                            #   - Kart: logo emoji, acil badge, maaş aralığı, özellik etiketleri
    IsIlanDetail.jsx        # İş detay:
                            #   - Sekme: Açıklama / Gereksinimler / Avantajlar
                            #   - İşveren kartı → /isveren/:id
                            #   - Fixed CTA: "Şimdi Başvur" → başvuruldu state
    IsverenProfil.jsx       # İşveren profili: hakkında, kuruluş/çalışan/açık pozisyon grid,
                            #   açık pozisyonlar listesi

    ── Rezervasyon / Randevu / Teklif ────────────
    RezervasyonForm.jsx     # Restoran rezervasyonu & hizmet randevusu (aynı component)
                            # tarih/saat/kişi/not → localStorage sehir_rezervasyonlar
    TeklifForm.jsx          # Düğün teklif talebi: etkinlik/tarih/kişi/bütçe → localStorage

    ── Profil Alt Sayfaları ──────────────────────
    Rezervasyonlarim.jsx    # Restoran rezervasyonları listesi
    Randevularim.jsx        # Hizmet randevuları listesi
    TekliflerPage.jsx       # Düğün/organizasyon teklifleri (NOT: aynı isim iki farklı şey var!)
                            # → Biri /tekliflerim (profil altı), biri /talepler (servis talebi)
    MesajlarPage.jsx        # Konuşma listesi (okunmamış badge)
    MesajDetay.jsx          # Chat UI: baloncuklar, otomatik mock yanıt, Enter gönder

    ── Yakın Çevre (Harita) ──────────────────────
    NearbyDetail.jsx        # Liste/Harita toggle, Leaflet (CartoDB Positron tiles)
                            # Merkez: Gebze (40.8025, 29.4301), attributionControl=false

    ── İşletme Paneli (/isletme/*) ───────────────
    isletme/
      IsletmeLogin.jsx          # Tel + şifre; DEMO_ISLETME hardcoded (542 646 90 70 / 8014)
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
    mockPlaces.js           # pharmacy, atm, fuel, hospital, supermarket, parking, charging,
                            # bus (nextBus dakika), assembly, mosque + PLACE_LABELS
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
                            # ADMIN_SIFRE = 'admin123'
    mockPro.js              # PRO_PLANLAR (Ücretsiz/Pro ₺79/İşletme ₺199), PRO_SSS (3 SSS)
    mockTalep.js            # TALEP_KATEGORILER (10 kategori), TALEPLER (6 talep),
                            # TALEP_TEKLIFLERI (usta teklifleri objesi, talepId key)
    mockIsIlanlari.js       # IS_KATEGORILER (11), IS_TURLERI (5), IS_ILANLARI (8 ilan),
                            # ISVEREN_PROFILLER (5 işveren — id key ile obje)
    mockOtel.js             # OTEL_KATEGORILER (6), OTELLER (6 otel),
                            # ODALAR (otelId key ile obje — oda dizisi), OTEL_YORUMLAR
    mockAracKiralama.js     # ARAC_KATEGORILER (7), KIRALAMA_SIRKETLERI (3 firma — id key),
                            # ARACLAR (11 araç), ARAC_YORUMLAR
    mockStory.js            # STORIES (food/services/alisveris/etkinlikler — kategori bazlı)
                            # MARKALAR (food/services/alisveris/etkinlikler — marka logo verileri)

  components/
    BottomNav.jsx           # Fixed bottom nav, bg-white/80 backdrop-blur, rounded-t-[10px]
                            # active prop: 'home' | 'search' | 'explore' | 'campaigns' | 'profile'
    IsletmeNav.jsx          # İşletme paneli bottom nav (koyu beyaz, 4 sekme)
    AdminNav.jsx            # Admin paneli bottom nav (koyu gri-900, 4 sekme)
    StoryBar.jsx            # Story çemberleri (gradient ring, tıklanınca full-screen viewer)
                            # + Marka logoları (rounded square, brand color bg, emoji/text)
                            # StoryViewer: progress bar, auto-next (2.5sn), dokunma alanları

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
| `/login` | Giriş (demo: 542 646 90 70 / 8014) | PublicRoute |
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
| `/pro` | Pro Hesap planları | Private |
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
| `/oteller` | Otel arama (tarih picker) | Private |
| `/otel/:id` | Otel detay + oda rezervasyonu | Private |
| `/arac-kiralama` | Araç kiralama listesi | Private |
| `/arac/:id` | Araç detay + kiralama/teklif | Private |
| `/talepler` | Servis talepleri listesi | Private |
| `/talep/:id` | Talep detayı + usta teklifleri | Private |
| `/talep-olustur` | Yeni talep oluştur | Private |
| `/is-ilanlari` | İş ilanları listesi | Private |
| `/is-ilani/:id` | İş ilanı detayı | Private |
| `/isveren/:id` | İşveren profili | Private |
| `/rezervasyon/:id` | Restoran rezervasyon formu | Private |
| `/randevu-form/:id` | Hizmet randevu formu | Private |
| `/teklif-form/:id` | Düğün teklif formu | Private |
| `/rezervasyonlarim` | Rezervasyon geçmişi | Private |
| `/randevularim` | Randevu geçmişi | Private |
| `/tekliflerim` | Teklif geçmişi (düğün) | Private |
| `/mesajlarim` | Mesaj listesi | Private |
| `/mesaj/:id` | Konuşma detayı | Private |

### İşletme Rotaları
| Path | Sayfa | Erişim |
|------|-------|--------|
| `/isletme/login` | İşletme girişi (demo: 542 646 90 70 / 8014) | Public |
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

### Genel
- **Görseller**: Gradient bg + büyük emoji (gerçek resim yok). Otel: `linear-gradient + 🏨`. Araç: `linear-gradient + 🚗`.
- **Tarih picker**: `<input type="date">` styled. `min` prop ile geçmiş tarihi engelle.
- **Gün/gece hesaplama**: `Math.max(1, Math.round((new Date(cikis) - new Date(giris)) / 86400000))`
- **Fiyat çarpımı**: `fiyat * gunSayisi` → formatted `.toLocaleString('tr-TR')`

### Bileşen Patterns
- **RestaurantDetail sepet**: `cart` state `{ [itemId]: qty }` — `Object.entries` ile toplam hesap
- **SaticiProfil** 4 sekmeli; RestaurantDetail 3 sekmeli
- **EtkinlikDetail CTA**: `fiyat === null` → yeşil "Ücretsiz Katıl", aksi → siyah "Bilet Al — X₺"
- **ServiceDetail CTA**: `category === 'Düğün'` → Teklif Al, `'Sağlık'` → Randevu Al, diğer → Talep Gönder
- **Harita tiles**: CartoDB Positron (sade, gri/sarı), `attributionControl={false}`

### Home.jsx
- **DevReset butonu**: `fixed bottom-24 left-4`, session siler, demo hesapları yeniler, `/login`'e yönlendirir
- **GebzemAI FAB**: `fixed bottom-78px right-16px`, mor→pembe gradient, `borderRadius: 20px`
- **Home slider**: `scrollSnapType: x mandatory`, dot indikatörler, 3500ms otomatik geçiş
- **Hızlı Erişim**: 6 ikon + "Tümü" → bottom sheet 22 kategori, 5'li grid
- **Kategoriler**: 7 kategori 4'lü grid + "Tümü" → **85% yükseklik** bottom sheet, 12 büyük emoji kart (3 kolon, renkli bg)
- **Konum seçici**: Header ortasına tıklayınca bottom sheet: GPS + kayıtlı konumlar + yeni ekle
- **NearbyCard**: `width: 148px`, hepsi tek yatay scroll, bus first + yeşil "X dk" badge

### StoryBar
- **Story çemberi**: gradient ring (turuncu→pembe→mor), görüldüyse gri ring
- **StoryViewer**: progress bar (2.5sn per story), soldan dokunmak prev, sağdan next/close
- **Marka logosu**: `rounded-[16px]` kare, brand bg renk, text (NIKE/ZARA/IKEA) veya emoji

### Otel & Araç Kiralama
- **İşletme auth**: `isletme_user` localStorage'da, gerçek tel+şifre + DEMO_ISLETME hardcoded fallback
- **Admin auth**: Sabit şifre `admin123`, ayrı koyu tema (gray-900 header/nav)

### Pro Sayfası
- `secili` state ile aktif plan highlight, fiyat CTA dinamik güncellenir
- Yıllık toggle: `fiyatYillik` alanını kullan, chip "%25 İndirim" göster
