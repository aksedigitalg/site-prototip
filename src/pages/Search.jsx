import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, X, Clock, TrendingUp, ChevronRight } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import {
  SON_ARAMALAR as INITIAL_SON,
  POPULER_ARAMALAR,
  ARAMA_SONUCLARI,
  KATEGORI_FILTRELERI,
} from '../data/mockSearch'

const TIP_EMOJI = {
  restoran: '🍽️',
  hizmet:   '🔧',
  emlak:    '🏠',
  vasita:   '🚗',
  ikinciel: '📦',
  etkinlik: '🎉',
  magaza:   '🛍️',
  yer:      '📍',
}

export default function SearchPage() {
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const [query,       setQuery]       = useState('')
  const [aktifFiltre, setAktifFiltre] = useState('Tümü')
  const [sonAramalar, setSonAramalar] = useState(INITIAL_SON)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 150)
  }, [])

  const lower = query.toLowerCase()
  const filtrelenmis = ARAMA_SONUCLARI.filter(s => {
    const eslesme = s.isim.toLowerCase().includes(lower) || s.aciklama?.toLowerCase().includes(lower)
    if (!eslesme) return false
    if (aktifFiltre === 'Tümü') return true
    if (aktifFiltre === 'Restoran') return s.tipLabel === 'Restoran'
    if (aktifFiltre === 'Hizmet')   return s.tipLabel === 'Hizmet'
    if (aktifFiltre === 'Emlak')    return s.tipLabel === 'Emlak'
    if (aktifFiltre === 'Araç')     return s.tipLabel === 'Araç'
    if (aktifFiltre === 'Etkinlik') return s.tipLabel === 'Etkinlik'
    if (aktifFiltre === 'Mağaza')   return s.tipLabel === 'Mağaza'
    return true
  })

  function aramaYap(metin) {
    setQuery(metin)
    if (metin && !sonAramalar.includes(metin)) {
      setSonAramalar(prev => [metin, ...prev].slice(0, 6))
    }
  }

  function sonAraSil(metin) {
    setSonAramalar(prev => prev.filter(s => s !== metin))
  }

  const headerH = query.length > 0 ? 136 : 88

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Header ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-b border-gray-100 px-4 pt-12 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 active:scale-90 transition-transform"
            >
              <ArrowLeft size={18} strokeWidth={2} className="text-gray-700" />
            </button>
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-2.5">
              <Search size={15} strokeWidth={1.5} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => aramaYap(e.target.value)}
                placeholder="Ne arıyorsun?"
                className="flex-1 bg-transparent text-gray-800 text-sm outline-none placeholder-gray-400"
              />
              {query.length > 0 && (
                <button onClick={() => setQuery('')}>
                  <X size={15} strokeWidth={2} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Kategori filtreler */}
          {query.length > 0 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
              {KATEGORI_FILTRELERI.map(f => (
                <button
                  key={f}
                  onClick={() => setAktifFiltre(f)}
                  className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                  style={{
                    background: aktifFiltre === f ? '#111827' : '#f3f4f6',
                    color:      aktifFiltre === f ? 'white'   : '#6b7280',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── İçerik ── */}
      <div className="pb-24" style={{ paddingTop: `${headerH}px` }}>

        {query.length === 0 ? (
          <div className="px-4 pt-4 space-y-6">

            {/* Son aramalar */}
            {sonAramalar.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-800 text-sm font-semibold">Son Aramalar</h3>
                  <button onClick={() => setSonAramalar([])} className="text-gray-400 text-xs">Temizle</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sonAramalar.map(s => (
                    <div key={s} className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5">
                      <Clock size={12} strokeWidth={1.5} className="text-gray-400" />
                      <button onClick={() => aramaYap(s)} className="text-gray-700 text-xs font-medium">{s}</button>
                      <button onClick={() => sonAraSil(s)}>
                        <X size={11} strokeWidth={2} className="text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Popüler aramalar */}
            <div>
              <h3 className="text-gray-800 text-sm font-semibold mb-3">Popüler Aramalar</h3>
              <div className="flex flex-wrap gap-2">
                {POPULER_ARAMALAR.map(s => (
                  <button
                    key={s}
                    onClick={() => aramaYap(s)}
                    className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 active:bg-gray-100 transition-colors"
                  >
                    <TrendingUp size={12} strokeWidth={1.5} className="text-gray-500" />
                    <span className="text-gray-700 text-xs font-medium">{s}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : filtrelenmis.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 px-8 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-800 text-base font-bold mb-1">Sonuç bulunamadı</p>
            <p className="text-gray-400 text-sm mb-6">"{query}" için eşleşme yok.</p>
            <button
              onClick={() => navigate('/gebzem-ai')}
              className="bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl active:scale-95 transition-transform"
            >
              GebzemAI'ya Sor ✦
            </button>
          </div>
        ) : (
          <div className="px-4 pt-3">
            <p className="text-gray-400 text-xs mb-3">{filtrelenmis.length} sonuç bulundu</p>
            <div className="flex flex-col divide-y divide-gray-100">
              {filtrelenmis.map(s => (
                <button
                  key={s.id}
                  onClick={() => navigate(s.path)}
                  className="flex items-center gap-3 py-3.5 active:bg-gray-50 transition-colors -mx-4 px-4"
                >
                  <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0 text-lg">
                    {TIP_EMOJI[s.tip] || '📍'}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-gray-800 text-sm font-semibold truncate">{s.isim}</p>
                    <p className="text-gray-400 text-xs truncate">{s.aciklama}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      {s.tipLabel}
                    </span>
                    {s.puan && <span className="text-yellow-500 text-[11px] font-bold">★ {s.puan}</span>}
                    {s.mesafe && !s.puan && <span className="text-gray-400 text-[11px]">{s.mesafe}</span>}
                  </div>
                  <ChevronRight size={16} strokeWidth={1.5} className="text-gray-300 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      <BottomNav active="search" />
    </div>
  )
}
