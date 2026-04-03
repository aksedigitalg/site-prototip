export const ADMIN_ISTATISTIK = {
  toplamKullanici: 2847,
  aktifIsletme: 184,
  toplamIlan: 312,
  gunlukZiyaret: 1243,
  bekleyenOnay: 7,
  buAyYeniKullanici: 143,
}

export const ADMIN_SON_AKTIVITE = [
  { id: 1, tip: 'yeni_kullanici', metin: 'Yeni kullanıcı kaydı: Ahmet Y.', zaman: '5 dakika önce' },
  { id: 2, tip: 'yeni_isletme', metin: 'Yeni işletme başvurusu: Taco Fiesta', zaman: '18 dakika önce' },
  { id: 3, tip: 'yeni_ilan', metin: 'Yeni emlak ilanı: 3+1 Satılık Daire', zaman: '34 dakika önce' },
  { id: 4, tip: 'yeni_kullanici', metin: 'Yeni kullanıcı kaydı: Zeynep K.', zaman: '1 saat önce' },
  { id: 5, tip: 'onay', metin: 'İşletme onaylandı: Pizza Roma', zaman: '2 saat önce' },
]

export const ADMIN_KULLANICILAR = [
  { id: 1, isim: 'Ahmet Yılmaz', telefon: '0532 111 22 33', kayitTarih: '1 Nisan 2026', durum: 'aktif' },
  { id: 2, isim: 'Zeynep Kaya', telefon: '0533 222 33 44', kayitTarih: '28 Mart 2026', durum: 'aktif' },
  { id: 3, isim: 'Mert Demir', telefon: '0535 333 44 55', kayitTarih: '25 Mart 2026', durum: 'aktif' },
  { id: 4, isim: 'Selin Arslan', telefon: '0536 444 55 66', kayitTarih: '20 Mart 2026', durum: 'aktif' },
  { id: 5, isim: 'Burak Türk', telefon: '0537 555 66 77', kayitTarih: '15 Mart 2026', durum: 'askida' },
  { id: 6, isim: 'Ayşe Çelik', telefon: '0538 666 77 88', kayitTarih: '10 Mart 2026', durum: 'aktif' },
  { id: 7, isim: 'Emre Şahin', telefon: '0539 777 88 99', kayitTarih: '5 Mart 2026', durum: 'aktif' },
  { id: 8, isim: 'Fatma Yıldız', telefon: '0541 888 99 00', kayitTarih: '1 Mart 2026', durum: 'aktif' },
]

export const ADMIN_ISLETMELER = [
  { id: 1, isim: 'Döner Palace', kategori: 'Restoran', sahip: 'Ali Kaya', basvuruTarih: '15 Mart 2026', durum: 'onaylandi' },
  { id: 2, isim: 'Pizza Roma', kategori: 'Restoran', sahip: 'Marco B.', basvuruTarih: '18 Mart 2026', durum: 'onaylandi' },
  { id: 3, isim: 'Taco Fiesta', kategori: 'Restoran', sahip: 'Carlos M.', basvuruTarih: '2 Nisan 2026', durum: 'bekliyor' },
  { id: 4, isim: 'Ahmet Temizlik', kategori: 'Hizmet', sahip: 'Ahmet D.', basvuruTarih: '10 Mart 2026', durum: 'onaylandi' },
  { id: 5, isim: 'Yoga Studio', kategori: 'Spor', sahip: 'Elif T.', basvuruTarih: '1 Nisan 2026', durum: 'bekliyor' },
  { id: 6, isim: 'Güzel Saçlar Kuaför', kategori: 'Güzellik', sahip: 'Fatma K.', basvuruTarih: '31 Mart 2026', durum: 'bekliyor' },
  { id: 7, isim: 'Usta Elektrik', kategori: 'Hizmet', sahip: 'Mustafa E.', basvuruTarih: '12 Mart 2026', durum: 'onaylandi' },
  { id: 8, isim: 'MediaMarkt', kategori: 'Elektronik', sahip: 'MM Türkiye', basvuruTarih: '8 Mart 2026', durum: 'onaylandi' },
  { id: 9, isim: 'Kitabevi', kategori: 'Alışveriş', sahip: 'Hasan B.', basvuruTarih: '3 Nisan 2026', durum: 'bekliyor' },
  { id: 10, isim: 'Pet Shop Pati', kategori: 'Evcil Hayvan', sahip: 'Seda M.', basvuruTarih: '3 Nisan 2026', durum: 'bekliyor' },
]

export const ADMIN_ILANLAR = [
  { id: 1, baslik: '3+1 Satılık Daire', kategori: 'Emlak', ekleyen: 'Mert D.', tarih: '2 Nisan 2026', durum: 'aktif' },
  { id: 2, baslik: 'Toyota Corolla 2021', kategori: 'Vasıta', ekleyen: 'Burak T.', tarih: '1 Nisan 2026', durum: 'aktif' },
  { id: 3, baslik: 'iPhone 14 Pro Max', kategori: '2. El', ekleyen: 'Selin A.', tarih: '31 Mart 2026', durum: 'aktif' },
  { id: 4, baslik: '2+1 Kiralık Daire', kategori: 'Emlak', ekleyen: 'Ayşe Ç.', tarih: '30 Mart 2026', durum: 'aktif' },
  { id: 5, baslik: 'VW Tiguan 2020', kategori: 'Vasıta', ekleyen: 'Emre Ş.', tarih: '28 Mart 2026', durum: 'aktif' },
  { id: 6, baslik: 'MacBook Pro M2', kategori: '2. El', ekleyen: 'Fatma Y.', tarih: '27 Mart 2026', durum: 'kaldirild' },
]

export const ADMIN_SIFRE = 'admin123'
export const ISLETME_SIFRE = 'isletme123'
