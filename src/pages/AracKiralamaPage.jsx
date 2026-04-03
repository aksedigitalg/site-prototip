import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Calendar, MapPin, Star, Users,
} from 'lucide-react'
import { ARACLAR, ARAC_KATEGORILER } from '../data/mockAracKiralama'

function StarRow({ puan }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={9} strokeWidth={0} fill={i <= Math.round(puan) ? '#eab308' : '#e5e7eb'} />
      ))}
    </div>
  )
}

const YAKIT_COLOR = {
  'Benzin':  { bg: '#fff7ed', text: '#c2410c' },
  'Dizel':   { bg: '#eff6ff', text: '#1d4ed8' },
  'Hibrit':  { bg: '#f0fdf4', text: '#15803d' },
  'Elektrik (620 km menzil)': { bg: '#1e293b', text: '#7dd3fc' },
  'Elektrik (480 km menzil)': { bg: '#064e3b', text: '#6ee7b7' },
}

export default function AracKiralamaPage() {
  const navigate  = useNavigate()
  const today     = new Date().toISOString().split('T')[0]
  const tomorrow  = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const [alis,     setAlis]     = useState(today)
  const [iade,     setIade]     = useState(tomorrow)
  const [konum,    setKonum]    = useState('Gebze Merkez')
  const [kategori, setKategori] = useState('tumu')

  const gunSayisi = Math.max(1, Math.round((new Date(iade) - new Date(alis)) / 86400000))

  const liste = kategori === 'tumu'
    ? ARACLAR
    : ARACLAR.filter(a => a.kategori === kategori)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sadece back + başlık fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200 transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-700" />
          </button>
          <h1 className="text-gray-900 text-base font-bold flex-1">Araç Kiralama</h1>
          <span className="text-gray-400 text-xs">{liste.length} araç</span>
        </div>
      </header>

      {/* Scroll içeriği */}
      <div className="pt-14 pb-24">

        {/* Filtreler (scroll ile birlikte iner) */}
        <div className="px-4 pt-4 pb-3 bg-white border-b border-gray-100 space-y-3">

          {/* Konum */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
            <MapPin size={14} strokeWidth={1.5} className="text-gray-400 shrink-0" />
            <input value={konum} onChange={e => setKonum(e.target.value)}
              placeholder="Alış lokasyonu..."
              className="flex-1 text-gray-800 text-sm outline-none bg-transparent" />
          </div>

          {/* Tarih */}
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2.5">
              <p className="text-gray-400 text-[10px] mb-0.5 flex items-center gap-1">
                <Calendar size={9} strokeWidth={2} /> Alış Tarihi
              </p>
              <input type="date" value={alis} min={today}
                onChange={e => { setAlis(e.target.value); if (e.target.value >= iade) setIade(e.target.value) }}
                className="text-gray-900 text-xs font-bold outline-none bg-transparent w-full" />
            </div>
            <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2.5">
              <p className="text-gray-400 text-[10px] mb-0.5 flex items-center gap-1">
                <Calendar size={9} strokeWidth={2} /> İade Tarihi
              </p>
              <input type="date" value={iade} min={alis}
                onChange={e => setIade(e.target.value)}
                className="text-gray-900 text-xs font-bold outline-none bg-transparent w-full" />
            </div>
          </div>

          {/* Gün chip */}
          <div className="flex items-center gap-2">
            <span className="bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{gunSayisi} gün</span>
          </div>

          {/* Kategori filtreleri */}
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {ARAC_KATEGORILER.map(k => (
              <button key={k.value} onClick={() => setKategori(k.value)}
                className="shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 flex items-center gap-1"
                style={{
                  background: kategori === k.value ? '#111827' : '#f9fafb',
                  color:      kategori === k.value ? '#ffffff' : '#4b5563',
                  border:     kategori === k.value ? '1.5px solid #111827' : '1.5px solid #e5e7eb',
                }}>
                <span>{k.emoji}</span>
                {k.label}
              </button>
            ))}
          </div>
        </div>

        {/* Araç kartları */}
        <div className="px-4 pt-3 flex flex-col gap-3">
          {liste.map(arac => {
            const yakitRenk = YAKIT_COLOR[arac.yakit] || { bg: '#f3f4f6', text: '#374151' }
            return (
              <button key={arac.id}
                onClick={() => navigate(`/arac/${arac.id}`, { state: { alis, iade, konum } })}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform">

                {/* Araç görseli */}
                <div className="w-full flex items-center justify-center relative"
                  style={{ height: '150px', background: arac.bg }}>
                  <span className="text-8xl">{arac.emoji}</span>
                  {!arac.musait && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-sm font-bold bg-red-500 px-3 py-1 rounded-full">Müsait Değil</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-xl px-2 py-1">
                    <span className="text-white text-[10px] font-bold">{arac.kategoriLabel}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <div className="bg-white/90 rounded-xl px-2 py-1 flex items-center gap-1">
                      <Users size={9} strokeWidth={1.5} className="text-gray-600" />
                      <span className="text-gray-700 text-[10px] font-bold">{arac.koltuk}</span>
                    </div>
                  </div>
                  {/* Fiyat etiketi */}
                  <div className="absolute bottom-3 right-3 bg-white rounded-xl px-3 py-1.5">
                    <p className="text-gray-900 text-sm font-extrabold">₺{(arac.gunlukFiyat * gunSayisi).toLocaleString('tr-TR')}</p>
                    <p className="text-gray-400 text-[9px] text-right">{gunSayisi} gün</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 text-sm font-bold">{arac.marka} {arac.model}</h3>
                      <p className="text-gray-400 text-xs">{arac.yil} · {arac.renk}</p>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      ₺{arac.gunlukFiyat.toLocaleString('tr-TR')}/gün
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: yakitRenk.bg, color: yakitRenk.text }}>
                      {arac.yakit.split(' (')[0]}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      {arac.vites === 'Otomatik' ? '🤖' : '⚙️'} {arac.vites}
                    </span>
                    <span className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      🧳 {arac.bagaj}
                    </span>
                    <span className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {arac.kilometre}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {arac.ozellikler.slice(0, 3).map(o => (
                      <span key={o} className="text-[10px] text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">{o}</span>
                    ))}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

      </div>

    </div>
  )
}
