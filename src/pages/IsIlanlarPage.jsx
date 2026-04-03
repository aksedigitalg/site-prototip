import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Search, MapPin, Clock, Briefcase, ChevronRight, Bookmark,
} from 'lucide-react'
import { IS_ILANLARI, IS_KATEGORILER, IS_TURLERI } from '../data/mockIsIlanlari'
import BottomNav from '../components/BottomNav'

const TUR_RENK = {
  tam:       { bg: '#f0fdf4', text: '#15803d' },
  yari:      { bg: '#fef9c3', text: '#a16207' },
  uzaktan:   { bg: '#eff6ff', text: '#1d4ed8' },
  staj:      { bg: '#fdf4ff', text: '#7e22ce' },
  freelance: { bg: '#fff7ed', text: '#c2410c' },
}

export default function IsIlanlarPage() {
  const navigate = useNavigate()
  const [arama,     setArama]     = useState('')
  const [kategori,  setKategori]  = useState('tumu')
  const [tur,       setTur]       = useState('')

  const filtrelenmis = IS_ILANLARI.filter(i => {
    const aramaEsles = !arama || i.baslik.toLowerCase().includes(arama.toLowerCase()) || i.isletme.toLowerCase().includes(arama.toLowerCase())
    const katEsles   = kategori === 'tumu' || i.kategoriValue === kategori
    const turEsles   = !tur || i.turValue === tur
    return aramaEsles && katEsles && turEsles
  })

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200 transition-colors">
              <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-700" />
            </button>
            <h1 className="text-gray-900 text-base font-bold flex-1">İş İlanları</h1>
            <span className="text-gray-400 text-xs">{filtrelenmis.length} ilan</span>
          </div>

          {/* Arama */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
            <Search size={14} strokeWidth={1.5} className="text-gray-400 shrink-0" />
            <input
              value={arama}
              onChange={e => setArama(e.target.value)}
              placeholder="Pozisyon veya şirket ara..."
              className="flex-1 text-gray-800 text-sm outline-none bg-transparent"
            />
          </div>
        </div>
      </header>

      <div className="pt-[116px] pb-24">

        {/* Kategori filtresi */}
        <div className="flex gap-2 px-4 pt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {IS_KATEGORILER.map(k => (
            <button
              key={k.value}
              onClick={() => setKategori(k.value)}
              className="shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
              style={{
                background: kategori === k.value ? '#111827' : '#ffffff',
                color:      kategori === k.value ? '#ffffff' : '#4b5563',
                border:     kategori === k.value ? '1.5px solid #111827' : '1.5px solid #e5e7eb',
              }}
            >
              {k.label}
            </button>
          ))}
        </div>

        {/* İş türü filtresi */}
        <div className="flex gap-2 px-4 pt-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setTur('')}
            className="shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: !tur ? '#f3f4f6' : 'transparent',
              color:      !tur ? '#111827' : '#9ca3af',
            }}
          >
            Tüm Türler
          </button>
          {IS_TURLERI.map(t => {
            const renkler = TUR_RENK[t.value]
            return (
              <button
                key={t.value}
                onClick={() => setTur(tur === t.value ? '' : t.value)}
                className="shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background: tur === t.value ? renkler.bg : 'transparent',
                  color:      tur === t.value ? renkler.text : '#9ca3af',
                  border:     tur === t.value ? `1.5px solid ${renkler.text}33` : '1.5px solid #e5e7eb',
                }}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {/* İlan listesi */}
        <div className="px-4 pt-3 flex flex-col gap-3">
          {filtrelenmis.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-500 text-sm">Bu kriterlere uygun ilan bulunamadı.</p>
            </div>
          ) : (
            filtrelenmis.map(ilan => {
              const turRenk = TUR_RENK[ilan.turValue]
              return (
                <button
                  key={ilan.id}
                  onClick={() => navigate(`/is-ilani/${ilan.id}`)}
                  className="bg-white border border-gray-100 rounded-2xl p-4 text-left active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-start gap-3">
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0">
                      {ilan.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          {ilan.acil && (
                            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full mr-1.5">ACİL</span>
                          )}
                          <p className="text-gray-900 text-sm font-bold leading-snug">{ilan.baslik}</p>
                        </div>
                        <Bookmark size={16} strokeWidth={1.5} className="text-gray-300 shrink-0 mt-0.5" />
                      </div>

                      <p className="text-gray-500 text-xs mt-0.5">{ilan.isletme}</p>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                        <span className="flex items-center gap-1 text-gray-400 text-xs">
                          <MapPin size={10} strokeWidth={1.5} />
                          {ilan.konum}
                        </span>
                        <span className="flex items-center gap-1 text-gray-400 text-xs">
                          <Clock size={10} strokeWidth={1.5} />
                          {ilan.sure}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-gray-900 text-xs font-bold">{ilan.maas}</span>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: turRenk.bg, color: turRenk.text }}
                        >
                          {ilan.tur}
                        </span>
                      </div>

                      {/* Özellik etiketleri */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {ilan.ozellikler.map(o => (
                          <span key={o} className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {o}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <span className="text-gray-400 text-xs">{ilan.basvuruSayisi} başvuru</span>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/isveren/${ilan.isverenId}`) }}
                      className="text-gray-400 text-xs flex items-center gap-0.5 active:text-gray-700"
                    >
                      Profili Gör <ChevronRight size={11} strokeWidth={2} />
                    </button>
                  </div>
                </button>
              )
            })
          )}
        </div>

      </div>

      <BottomNav active="" />
    </div>
  )
}
