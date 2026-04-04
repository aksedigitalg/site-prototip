import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Tag, Clock, MapPin, X } from 'lucide-react'

const ILAN_KATEGORILER = ['Emlak', 'Vasıta', '2. El']

const MOCK_ILANLARIM = [
  { id: 1, baslik: '3+1 Daire Satılık', kategori: 'Emlak', fiyat: '2.850.000 ₺', tarih: '2 gün önce', konum: 'Gebze Merkez', durum: 'aktif', emoji: '🏠' },
  { id: 2, baslik: 'iPhone 14 Pro Max', kategori: '2. El', fiyat: '42.000 ₺', tarih: '5 gün önce', konum: 'Gebze', durum: 'aktif', emoji: '📱' },
]

const DURUM_RENK = {
  aktif:     { bg: '#f0fdf4', color: '#16a34a', label: 'Aktif' },
  bekliyor:  { bg: '#fff7ed', color: '#ea580c', label: 'Bekliyor' },
  pasif:     { bg: '#f9fafb', color: '#6b7280', label: 'Pasif' },
}

export default function Ilanlarim() {
  const navigate = useNavigate()
  const [ilanlar, setIlanlar] = useState(MOCK_ILANLARIM)
  const [yeniSheet, setYeniSheet] = useState(false)

  const [baslik,   setBaslik]   = useState('')
  const [kategori, setKategori] = useState('Emlak')
  const [fiyat,    setFiyat]    = useState('')
  const [konum,    setKonum]    = useState('Gebze')
  const [aciklama, setAciklama] = useState('')

  function ilanEkle() {
    if (!baslik || !fiyat) return
    const yeni = {
      id: Date.now(),
      baslik,
      kategori,
      fiyat: fiyat + ' ₺',
      tarih: 'Az önce',
      konum,
      durum: 'bekliyor',
      emoji: kategori === 'Emlak' ? '🏠' : kategori === 'Vasıta' ? '🚗' : '📦',
    }
    setIlanlar(prev => [yeni, ...prev])
    setBaslik(''); setFiyat(''); setKonum('Gebze'); setAciklama('')
    setYeniSheet(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 h-[56px] flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200 transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-700" />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">İlanlarım</h1>
          <button
            onClick={() => setYeniSheet(true)}
            className="flex items-center gap-1 bg-gray-900 text-white rounded-xl px-3 py-1.5 text-xs font-semibold active:scale-95 transition-transform"
          >
            <Plus size={13} strokeWidth={2.5} /> İlan Ver
          </button>
        </div>
      </header>

      <div className="pt-[56px] pb-24 px-4">

        {ilanlar.length === 0 ? (
          <div className="flex flex-col items-center pt-20 text-center">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-800 text-sm font-bold">Henüz ilanın yok</p>
            <p className="text-gray-400 text-xs mt-1">İlk ilanını oluştur, hemen yayınlansın!</p>
            <button
              onClick={() => setYeniSheet(true)}
              className="mt-5 bg-gray-900 text-white text-sm font-bold px-6 py-3 rounded-2xl active:scale-95 transition-transform"
            >
              İlan Oluştur
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pt-3">
            {ilanlar.map(ilan => {
              const ds = DURUM_RENK[ilan.durum]
              return (
                <div key={ilan.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl shrink-0">
                      {ilan.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-gray-800 text-sm font-bold truncate">{ilan.baslik}</p>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0" style={{ background: ds.bg, color: ds.color }}>
                          {ds.label}
                        </span>
                      </div>
                      <p className="text-gray-900 text-base font-extrabold mt-1">{ilan.fiyat}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Tag size={10} strokeWidth={1.5} />{ilan.kategori}</span>
                        <span className="flex items-center gap-1"><MapPin size={10} strokeWidth={1.5} />{ilan.konum}</span>
                        <span className="flex items-center gap-1"><Clock size={10} strokeWidth={1.5} />{ilan.tarih}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Yeni İlan Sheet */}
      {yeniSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setYeniSheet(false)} />
          <div className="relative bg-white rounded-t-3xl px-5 pt-5 pb-10 z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-gray-900 text-base font-bold">Yeni İlan</h3>
              <button onClick={() => setYeniSheet(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>

            <div>
              <label className="text-gray-500 text-xs font-semibold block mb-1.5">İlan Başlığı</label>
              <input value={baslik} onChange={e => setBaslik(e.target.value)}
                placeholder="Örn: 3+1 Daire Satılık"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 outline-none" />
            </div>

            <div>
              <label className="text-gray-500 text-xs font-semibold block mb-1.5">Kategori</label>
              <div className="flex gap-2">
                {ILAN_KATEGORILER.map(k => (
                  <button key={k} onClick={() => setKategori(k)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-center transition-all"
                    style={{
                      background: kategori === k ? '#111827' : '#f3f4f6',
                      color:      kategori === k ? '#fff' : '#4b5563',
                    }}>
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-gray-500 text-xs font-semibold block mb-1.5">Fiyat (₺)</label>
                <input type="text" inputMode="numeric" value={fiyat} onChange={e => setFiyat(e.target.value)}
                  placeholder="50.000"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 outline-none" />
              </div>
              <div className="flex-1">
                <label className="text-gray-500 text-xs font-semibold block mb-1.5">Konum</label>
                <input value={konum} onChange={e => setKonum(e.target.value)}
                  placeholder="Gebze"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-xs font-semibold block mb-1.5">Açıklama (isteğe bağlı)</label>
              <textarea value={aciklama} onChange={e => setAciklama(e.target.value)}
                placeholder="Detaylı bilgi..."
                rows={2}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 outline-none resize-none" />
            </div>

            <button onClick={ilanEkle} disabled={!baslik || !fiyat}
              className="w-full bg-gray-900 text-white font-bold text-sm py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-30">
              İlanı Yayınla
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
