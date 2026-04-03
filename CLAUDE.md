# Şehir App — Proje Rehberi

## Genel Bilgi
- Kullanıcıyla **her zaman Türkçe** konuş. Adımlar, açıklamalar, hata mesajları hepsi Türkçe.
- Bu bir mobil öncelikli şehir uygulaması prototipidir.

## Tech Stack
- **React 19** + **Vite 8** (build aracı)
- **Tailwind CSS 4** (`@tailwindcss/vite` plugin ile)
- **React Router v7**
- **vite-plugin-pwa** (PWA desteği için, `.npmrc` ile `legacy-peer-deps=true` ayarlı)

## Deploy
- GitHub repo: `aksedigitalg/site-prototip`
- Vercel'e bağlı — `git push` yapınca otomatik deploy olur
- Sunucuyu durdurmadan `git add . && git commit -m "..." && git push` yapabilirsin

## Proje Yapısı
```
src/
  pages/
    Onboarding.jsx   # 3 slaytlı tanıtım ekranı
    Login.jsx        # Telefon no girişi
    OTP.jsx          # 6 haneli kod doğrulama (doğru kod: 111111)
    Register.jsx     # Ad, soyad kayıt
    Home.jsx         # Ana sayfa - "Hoş geldin [isim]"
  App.jsx            # Route yönetimi
  main.jsx           # BrowserRouter burada
  index.css          # Tailwind import
```

## Auth Akışı
- Tüm auth **localStorage** tabanlı, backend yok
- `sehir_onboarded` → onboarding tamamlandı mı
- `sehir_user` → kayıtlı kullanıcı bilgisi (firstName, lastName)
- `sehir_phone` → sessionStorage, OTP sayfasında telefon no göstermek için
- Uygulama açılınca `sehir_user` varsa direkt `/home`'a gider

## Tema
- Mavi (`blue-600`, `blue-700`) + Turuncu (`orange-500`, `orange-600`)
- Mobil görünüm, max-width 430px
- Rounded, modern kart tasarımı

## Yeni Bilgisayarda Başlangıç
```bash
git clone https://github.com/aksedigitalg/site-prototip.git
cd site-prototip
npm install
npm run dev
```
