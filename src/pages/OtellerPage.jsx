import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Star, MapPin, Calendar, Users } from 'lucide-react'
import { OTELLER, OTEL_KATEGORILER } from '../data/mockOtel'
import BottomNav from '../components/BottomNav'

function StarRow({ puan }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={10} strokeWidth={0}
          fill={i <= Math.round(puan) ? '#eab308' : '#e5e7eb'} />
      ))}
    </div>
  )
}

export default function OtellerPage() {
  const navigate = useNavigate()
  const today    = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const [giris,    setGiris]    = useState(today)
  const [cikis,    setCikis]    = useState(tomorrow)
  const [misafir,  setMisafir]  = useState(2)
  const [kategori, setKategori] = useState('tumu')
  const [arama,    setArama]    = useState('')

  const geceSayisi = Math.max(1,
    Math.round((new Date(cikis) - new Date(giris)) / 86400000)
  )

  const liste = OTELLER.filter(o => {
    const aramaEsles = !arama || o.isim.toLowerCase().includes(arama.toLowerCase())
    const katEsles   = kategori === 'tumu' || o.tip === kategori
    return aramaEsles && katEsles
  })

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sadece back + başlık fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200 transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-700" />
          </button>
          <h1 className="text-gray-900 text-base font-bold flex-1">Otel Ara</h1>
          <span className="text-gray-400 text-xs">{liste.length} otel</span>
        </div>
      </header>

      {/* Scroll içeriği */}
      <div className="pt-14 pb-24">

        {/* Arama + Filtreler (scroll ile birlikte iner) */}
        <div className="px-4 pt-4 pb-3 bg-white border-b border-gray-100 space-y-3">

          {/* Arama */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
            <Search size={14} strokeWidth={1.5} className="text-gray-400 shrink-0" />
            <input value={arama} onChange={e => setArama(e.target.value)}
              placeholder="Otel adı veya konum ara..."
              className="flex-1 text-gray-800 text-sm outline-none bg-transparent" />
          </div>

          {/* Tarih + Misafir */}
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2.5">
              <p className="text-gray-400 text-[10px] mb-0.5 flex items-center gap-1">
                <Calendar size={9} strokeWidth={2} /> Giriş
              </p>
              <input type="date" value={giris} min={today}
                onChange={e => { setGiris(e.target.value); if (e.target.value >= cikis) setCikis(e.target.value) }}
                className="text-gray-900 text-xs font-bold outline-none bg-transparent w-full" />
            </div>
            <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2.5">
              <p className="text-gray-400 text-[10px] mb-0.5 flex items-center gap-1">
                <Calendar size={9} strokeWidth={2} /> Çıkış
              </p>
              <input type="date" value={cikis} min={giris}
                onChange={e => setCikis(e.target.value)}
                className="text-gray-900 text-xs font-bold outline-none bg-transparent w-full" />
            </div>
            <div className="bg-gray-100 rounded-xl px-3 py-2.5 flex flex-col items-center justify-center shrink-0">
              <p className="text-gray-400 text-[10px] flex items-center gap-1"><Users size={9} strokeWidth={2} /> Kişi</p>
              <div className="flex items-center gap-2 mt-0.5">
                <button onClick={() => setMisafir(m => Math.max(1, m - 1))} className="text-gray-600 font-bold text-base w-5 h-5 flex items-center justify-center">−</button>
                <span className="text-gray-900 text-xs font-bold">{misafir}</span>
                <button onClick={() => setMisafir(m => Math.min(8, m + 1))} className="text-gray-600 font-bold text-base w-5 h-5 flex items-center justify-center">+</button>
              </div>
            </div>
          </div>

          {/* Gece chip */}
          <div className="flex items-center gap-2">
            <span className="bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{geceSayisi} gece</span>
            <span className="text-gray-400 text-[10px]">{misafir} misafir</span>
          </div>

          {/* Kategori filtreleri */}
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {OTEL_KATEGORILER.map(k => (
              <button key={k.value} onClick={() => setKategori(k.value)}
                className="shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
                style={{
                  background: kategori === k.value ? '#111827' : '#f9fafb',
                  color:      kategori === k.value ? '#ffffff' : '#4b5563',
                  border:     kategori === k.value ? '1.5px solid #111827' : '1.5px solid #e5e7eb',
                }}>
                {k.label}
              </button>
            ))}
          </div>
        </div>

        {/* Otel kartları */}
        <div className="px-4 pt-3 flex flex-col gap-3">
          {liste.map(otel => (
            <button key={otel.id}
              onClick={() => navigate(`/otel/${otel.id}`, { state: { giris, cikis, misafir } })}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform">

              {/* Görsel */}
              <div className="w-full flex items-center justify-center relative" style={{ height: '160px', background: otel.bg }}>
                <span className="text-7xl">{otel.emoji}</span>
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-xl px-2 py-1 flex items-center gap-1">
                  <Star size={10} fill="#fbbf24" strokeWidth={0} />
                  <span className="text-white text-[10px] font-bold">{otel.puan}</span>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 rounded-xl px-2 py-1">
                  <span className="text-gray-700 text-[10px] font-bold">
                    {otel.tip === 'apart' ? 'Apart' : otel.tip === 'butik' ? 'Butik' : `${otel.tip}★`}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 text-sm font-bold">{otel.isim}</h3>
                    <div className="flex items-center gap-1 mt-0.5 text-gray-400 text-xs">
                      <MapPin size={10} strokeWidth={1.5} />
                      <span>{otel.konum} · {otel.mesafe}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-gray-900 text-base font-extrabold">₺{(otel.fiyatBaslangic * geceSayisi).toLocaleString('tr-TR')}</p>
                    <p className="text-gray-400 text-[10px]">{geceSayisi} gece</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <StarRow puan={otel.puan} />
                    <span className="text-gray-500 text-xs">({otel.yorumSayisi})</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    {otel.ozellikler.slice(0, 3).map(o => (
                      <span key={o} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{o}</span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>

      <BottomNav active="" />
    </div>
  )
}
