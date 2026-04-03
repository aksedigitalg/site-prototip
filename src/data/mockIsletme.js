export const ISLETME_PROFIL = {
  id: 'b1',
  isim: 'Döner Palace',
  kategori: 'Restoran',
  telefon: '0262 555 11 22',
  adres: 'Gebze Merkez, İstanbul Cad. No:45',
  aciklama: 'Gebze\'nin en lezzetli dönerini sunuyoruz. 1998\'den beri hizmetinizdeyiz.',
  puan: '4.7',
  degerlendirme: 238,
  durum: 'Onaylı',
}

export const ISLETME_ISTATISTIK = {
  buAyGoruntulenme: 1842,
  buAyTiklama: 374,
  buAyRezervasyon: 28,
  buAyMesaj: 14,
  oncekiAyGoruntulenme: 1560,
  oncekiAyTiklama: 310,
}

export const ISLETME_REZERVASYONLAR = [
  { id: 1, musteri: 'Ahmet Y.', tarih: '4 Nisan 2026', saat: '19:30', kisi: 4, not: 'Pencere kenarı rica ediyorum', durum: 'bekliyor' },
  { id: 2, musteri: 'Zeynep K.', tarih: '5 Nisan 2026', saat: '20:00', kisi: 2, not: '', durum: 'onaylandi' },
  { id: 3, musteri: 'Mert D.', tarih: '6 Nisan 2026', saat: '13:00', kisi: 6, not: 'Doğum günü kutlaması', durum: 'bekliyor' },
  { id: 4, musteri: 'Selin A.', tarih: '3 Nisan 2026', saat: '12:30', kisi: 3, not: '', durum: 'tamamlandi' },
  { id: 5, musteri: 'Burak T.', tarih: '3 Nisan 2026', saat: '21:00', kisi: 2, not: '', durum: 'tamamlandi' },
]

export const ISLETME_MESAJLAR = [
  { id: 1, gonderen: 'Ahmet Yılmaz', mesaj: 'Merhaba, rezervasyon yapmak istiyorum...', zaman: '14:32', okunmadi: true },
  { id: 2, gonderen: 'Zeynep Kaya', mesaj: 'Glütensiz seçeneğiniz var mı?', zaman: '11:15', okunmadi: true },
  { id: 3, gonderen: 'Mert Demir', mesaj: 'Teşekkürler, harika bir akşamdı!', zaman: 'Dün', okunmadi: false },
]

export const ISLETME_KAMPANYALAR = [
  { id: 1, baslik: 'Akşam Menüsünde %20', aciklama: '18:00 sonrası geçerli', durum: 'aktif', bitisTarihi: '12 Nisan' },
  { id: 2, baslik: '2 Al 1 Öde', aciklama: 'Hafta içi öğle saatlerinde', durum: 'bitti', bitisTarihi: '1 Nisan' },
]
