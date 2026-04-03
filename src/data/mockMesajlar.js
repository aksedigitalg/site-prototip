// ─── KONUŞMALAR (Mesaj listesi) ───────────────────────────────────────────────
export const KONUSMALAR = [
  {
    id: 1,
    isletme: { id: 1, name: 'Ahmet Temizlik', logo: '🧹', kategori: 'Hizmet' },
    sonMesaj: 'Yarın saat 10\'da uygun, görüşürüz!',
    sonMesajZaman: '14:35',
    okunmadi: 2,
    mesajlar: [
      { id: 1, gelen: false, metin: 'Merhaba, ev temizliği için fiyat öğrenmek istiyorum.', saat: '14:10' },
      { id: 2, gelen: true,  metin: 'Merhaba! Tabii, kaç metrekarelik bir ev?', saat: '14:13' },
      { id: 3, gelen: false, metin: '120 m², 3+1. Haftalık temizlik istiyorum.', saat: '14:20' },
      { id: 4, gelen: true,  metin: 'Haftalık için aylık 1.800₺ yapıyoruz. Deneme için ilk seans 500₺.', saat: '14:25' },
      { id: 5, gelen: false, metin: 'Tamam, ne zaman başlayabiliriz?', saat: '14:30' },
      { id: 6, gelen: true,  metin: 'Yarın saat 10\'da uygun, görüşürüz!', saat: '14:35' },
    ],
  },
  {
    id: 2,
    isletme: { id: 12, name: 'Royal Düğün Salonu', logo: '💒', kategori: 'Düğün' },
    sonMesaj: 'Teklifinizi sistem üzerinden ilettik, inceleyebilirsiniz.',
    sonMesajZaman: 'Dün',
    okunmadi: 0,
    mesajlar: [
      { id: 1, gelen: false, metin: 'Merhaba, Haziran 2026 için düğün salonu merakediyoruz.', saat: '10:00' },
      { id: 2, gelen: true,  metin: 'Merhaba! Haziran için birkaç tarihimiz müsait. Kaç kişilik düşünüyorsunuz?', saat: '10:18' },
      { id: 3, gelen: false, metin: '200-250 kişilik planlıyoruz. Bütçemiz 80-100 bin TL arası.', saat: '10:25' },
      { id: 4, gelen: true,  metin: 'Harika! Paket detaylarını ve fiyatlarımızı içeren teklif hazırlayalım mı?', saat: '10:40' },
      { id: 5, gelen: false, metin: 'Evet lütfen.', saat: '10:41' },
      { id: 6, gelen: true,  metin: 'Teklifinizi sistem üzerinden ilettik, inceleyebilirsiniz.', saat: '11:05' },
    ],
  },
  {
    id: 3,
    isletme: { id: 9, name: 'Dr. Ahmet Yılmaz', logo: '🏥', kategori: 'Sağlık' },
    sonMesaj: 'Randevunuz 14 Nisan Pazartesi saat 10:30\'a alındı.',
    sonMesajZaman: '2 gün önce',
    okunmadi: 0,
    mesajlar: [
      { id: 1, gelen: false, metin: 'Merhaba, dahiliye muayenesi için randevu almak istiyorum.', saat: '09:00' },
      { id: 2, gelen: true,  metin: 'Merhaba, en yakın tarih 14 Nisan Pazartesi saat 10:30. Uygun mu?', saat: '09:15' },
      { id: 3, gelen: false, metin: 'Evet, uygun.', saat: '09:17' },
      { id: 4, gelen: true,  metin: 'Randevunuz 14 Nisan Pazartesi saat 10:30\'a alındı.', saat: '09:20' },
    ],
  },
  {
    id: 4,
    isletme: { id: 1, name: 'Döner Palace', logo: '🥙', kategori: 'Restoran' },
    sonMesaj: 'Rezervasyonunuz onaylandı. İyi akşamlar dileriz!',
    sonMesajZaman: '3 gün önce',
    okunmadi: 0,
    mesajlar: [
      { id: 1, gelen: false, metin: 'Merhaba, 4 kişilik Cumartesi 19:30 için rezervasyon yaptım. Pencere kenarı tercih ederiz.', saat: '15:00' },
      { id: 2, gelen: true,  metin: 'Merhaba! Rezervasyonunuzu aldık. Pencere kenarı için elimizden geleni yapacağız.', saat: '15:10' },
      { id: 3, gelen: true,  metin: 'Rezervasyonunuz onaylandı. İyi akşamlar dileriz!', saat: '15:11' },
    ],
  },
]

// ─── REZERVASYONlar (Restoran) ────────────────────────────────────────────────
export const REZERVASYONLAR = [
  {
    id: 1, restaurantId: 1, restaurantName: 'Döner Palace', restaurantLogo: '🥙',
    tarih: '15 Nisan 2026, Çarşamba', saat: '19:30', kisiSayisi: 4,
    not: 'Pencere kenarı tercih ederiz.',
    durum: 'Onaylandı',
  },
  {
    id: 2, restaurantId: 2, restaurantName: 'Pizza Roma', restaurantLogo: '🍕',
    tarih: '20 Nisan 2026, Pazartesi', saat: '20:00', kisiSayisi: 2,
    not: '',
    durum: 'Bekliyor',
  },
  {
    id: 3, restaurantId: 4, restaurantName: 'Sushi Bar', restaurantLogo: '🍣',
    tarih: '10 Nisan 2026, Perşembe', saat: '13:00', kisiSayisi: 3,
    not: 'Vejetaryen menü tercih ederiz.',
    durum: 'Tamamlandı',
  },
]

// ─── RANDEVULAR (Hizmet / Sağlık) ─────────────────────────────────────────────
export const RANDEVULAR = [
  {
    id: 1, serviceId: 9, serviceName: 'Dr. Ahmet Yılmaz', serviceLogo: '🏥',
    tarih: '14 Nisan 2026, Pazartesi', saat: '10:30',
    kategori: 'Sağlık', altKategori: 'Dahiliye Muayenesi',
    durum: 'Onaylandı',
  },
  {
    id: 2, serviceId: 2, serviceName: 'Usta Elektrik', serviceLogo: '⚡',
    tarih: '16 Nisan 2026, Çarşamba', saat: '14:00',
    kategori: 'Elektrik', altKategori: 'Priz Değişimi',
    durum: 'Bekliyor',
  },
  {
    id: 3, serviceId: 1, serviceName: 'Ahmet Temizlik', serviceLogo: '🧹',
    tarih: '8 Nisan 2026, Salı', saat: '10:00',
    kategori: 'Temizlik', altKategori: 'Ev Temizliği',
    durum: 'Tamamlandı',
  },
]

// ─── TEKLİFLER (Düğün / Organizasyon) ────────────────────────────────────────
export const TEKLIFLER = [
  {
    id: 1, serviceId: 12, serviceName: 'Royal Düğün Salonu', serviceLogo: '💒',
    etkinlik: 'Düğün', tarih: '14 Haziran 2026',
    kisiSayisi: 220, butce: '80.000 – 100.000 ₺',
    durum: 'Teklif Verildi', teklifTutari: '92.000 ₺',
    aciklama: '220 kişilik düğün paketi: Salon kiralama, ikram, ses & ışık sistemi dahil. Süsleme hariç.',
    sonTarih: '25 Nisan 2026',
  },
  {
    id: 2, serviceId: 13, serviceName: 'Anı Fotoğraf Stüdyosu', serviceLogo: '📸',
    etkinlik: 'Düğün', tarih: '14 Haziran 2026',
    kisiSayisi: null, butce: '15.000 – 25.000 ₺',
    durum: 'Bekliyor', teklifTutari: null,
    aciklama: 'Fotoğraf ve video çekimi için teklif bekleniyor.',
    sonTarih: null,
  },
]
