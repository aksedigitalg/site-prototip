import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Clock, ChevronLeft, MapPin, SlidersHorizontal, X, Search } from 'lucide-react'
import { FOOD_CATEGORIES, RESTAURANTS } from '../data/mockFood'

const FILTER_CATS = FOOD_CATEGORIES.filter(c => c !== 'Tümü')

export default function FoodPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = RESTAURANTS.filter(r => {
    const catMatch = !activeCategory || r.category === activeCategory
    const queryMatch = !query || r.name.toLowerCase().includes(query.toLowerCase())
    return catMatch && queryMatch
  })

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform">
            <ChevronLeft size={18} strokeWidth={2} className="text-gray-700" />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">Yemek & Restoran</h1>
        </div>
      </header>

      <div style={{ paddingTop: 66, paddingBottom: 110, paddingLeft: 16, paddingRight: 16 }}>

        {/* Arama */}
        <div className="flex items-center gap-2 bg-white rounded-xl px-3" style={{ height: 42, marginBottom: 14 }}>
          <Search size={16} strokeWidth={2} className="text-gray-400 shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Restoran ara..."
            className="flex-1 bg-transparent text-gray-800 text-[13px] outline-none placeholder-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')}>
              <X size={14} strokeWidth={2} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Aktif filtre göstergesi */}
        {activeCategory && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gray-400 text-[11px]">Filtre:</span>
            <button
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-1 bg-gray-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full"
            >
              {activeCategory}
              <X size={10} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* İşletme kartları */}
        <div className="flex flex-col gap-3">
          {filtered.map(r => (
            <button
              key={r.id}
              onClick={() => navigate(`/restaurant/${r.id}`)}
              className="flex gap-3 bg-white overflow-hidden active:scale-[0.98] transition-transform text-left"
              style={{ borderRadius: 10 }}
            >
              {/* Sol — görsel */}
              <div className="shrink-0 bg-gray-100 flex items-center justify-center" style={{ width: 110, minHeight: 100 }}>
                <span className="text-3xl">🍽️</span>
              </div>

              {/* Sağ — bilgiler */}
              <div className="flex-1 min-w-0 py-3 pr-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-gray-900 text-[14px] font-bold leading-tight truncate">{r.name}</h3>
                  {r.discount && (
                    <span className="shrink-0 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">{r.discount}</span>
                  )}
                </div>
                <p className="text-gray-400 text-[12px] mt-1">{r.category}</p>

                <div className="flex items-center gap-1 mt-2">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-700 text-[12px] font-semibold">{r.rating}</span>
                  <span className="text-gray-300 text-[12px]">({r.reviewCount})</span>
                </div>

                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Clock size={11} strokeWidth={1.5} className="text-gray-400" />
                    <span className="text-gray-500 text-[11px]">{r.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={11} strokeWidth={1.5} className="text-gray-400" />
                    <span className="text-gray-500 text-[11px]">{r.distance}</span>
                  </div>
                </div>

                {!r.isOpen && (
                  <span className="inline-block mt-1.5 text-red-400 text-[10px] font-semibold">Kapalı</span>
                )}
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-sm">
              Sonuç bulunamadı
            </div>
          )}
        </div>
      </div>

      {/* Filtre butonu — alt menünün 10px üstünde */}
      <div className="fixed z-40 flex justify-center" style={{ bottom: 90, left: 0, right: 0 }}>
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 bg-gray-900 text-white px-5 rounded-full active:scale-95 transition-transform"
          style={{ height: 40 }}
        >
          <SlidersHorizontal size={15} strokeWidth={2} />
          <span className="text-[13px] font-semibold">Filtre</span>
        </button>
      </div>

      {/* Filtre popup */}
      {filterOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
          <div className="relative bg-white rounded-t-3xl z-10" style={{ maxHeight: '70vh' }}>
            {/* Çentik */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1.5 rounded-full bg-gray-300" />
            </div>

            {/* Başlık */}
            <div className="flex items-center justify-between px-5 pb-4">
              <h3 className="text-gray-900 text-base font-bold">Kategori Seç</h3>
              <button onClick={() => setFilterOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>

            {/* Kategori grid — 3 kolon */}
            <div className="px-5 pb-10">
              {/* Tümü butonu */}
              <button
                onClick={() => { setActiveCategory(null); setFilterOpen(false) }}
                className="w-full flex items-center gap-3 mb-3 active:scale-[0.97] transition-transform"
                style={{ background: !activeCategory ? '#111827' : '#f5f5f5', borderRadius: 10, padding: '12px 14px' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: !activeCategory ? 'rgba(255,255,255,0.15)' : '#e5e7eb' }}>
                  <Star size={14} strokeWidth={2} className={!activeCategory ? 'text-white' : 'text-gray-500'} />
                </div>
                <span className={`text-[13px] font-semibold ${!activeCategory ? 'text-white' : 'text-gray-700'}`}>Tümü</span>
              </button>

              <div className="grid grid-cols-3 gap-2">
                {FILTER_CATS.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setFilterOpen(false) }}
                    className="flex items-center gap-2.5 active:scale-95 transition-transform"
                    style={{
                      background: activeCategory === cat ? '#111827' : '#f5f5f5',
                      borderRadius: 10,
                      padding: '12px 10px',
                    }}
                  >
                    <div className="w-7 h-7 rounded-full shrink-0" style={{ background: activeCategory === cat ? 'rgba(255,255,255,0.15)' : '#e5e7eb' }} />
                    <span className={`text-[12px] font-semibold ${activeCategory === cat ? 'text-white' : 'text-gray-700'}`}>{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
