import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { FOOD_CATEGORIES, FOOD_FILTERS, SLIDER_BANNERS, RESTAURANTS } from '../data/mockFood'
import StoryBar from '../components/StoryBar'
import { STORIES, MARKALAR } from '../data/mockStory'

function Slider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % SLIDER_BANNERS.length), 3000)
    return () => clearInterval(t)
  }, [])

  const s = SLIDER_BANNERS[current]

  return (
    <div className="mx-4 mt-4 rounded-2xl overflow-hidden relative" style={{ height: 140 }}>
      <div
        className="w-full h-full flex flex-col justify-center px-6"
        style={{ backgroundColor: s.bg, transition: 'background-color 0.5s' }}
      >
        <p className="text-white/60 text-xs font-medium mb-1">Özel Teklif</p>
        <h2 className="text-white text-xl font-bold leading-tight">{s.title}</h2>
        <p className="text-white/70 text-sm mt-1">{s.subtitle}</p>
      </div>
      {/* Dots */}
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {SLIDER_BANNERS.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{ width: i === current ? 18 : 6, backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.4)' }}
          />
        ))}
      </div>
    </div>
  )
}

function RestaurantCard({ r, onClick }) {
  return (
    <div onClick={onClick} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden active:scale-95 transition-transform cursor-pointer">
      {/* Görsel alanı */}
      <div className="w-full h-36 bg-gray-100 relative flex items-center justify-center">
        <span className="text-4xl">🍽️</span>
        {r.discount && (
          <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-lg">
            {r.discount} İndirim
          </div>
        )}
        {!r.isOpen && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-gray-500 text-sm font-semibold">Kapalı</span>
          </div>
        )}
      </div>
      {/* Bilgiler */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-gray-800 text-sm font-bold leading-tight">{r.name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-gray-700 text-xs font-semibold">{r.rating}</span>
            <span className="text-gray-400 text-xs">({r.reviewCount})</span>
          </div>
        </div>
        <p className="text-gray-400 text-xs mt-0.5">{r.category}</p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <Clock size={11} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-500 text-xs">{r.deliveryTime}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500 text-xs">Min. {r.minOrder}₺</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500 text-xs">{r.distance}</span>
        </div>
      </div>
    </div>
  )
}

export default function FoodPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [activeFilter, setActiveFilter] = useState(null)

  const filtered = RESTAURANTS.filter(r =>
    activeCategory === 'Tümü' || r.category === activeCategory
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">Yemek & Restoran</h1>
          <button onClick={() => navigate('/search')} className="text-gray-500">
            <Search size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="pt-14 pb-24">

        {/* Slider */}
        <Slider />

        {/* Story + Markalar */}
        <StoryBar stories={STORIES.food} markalar={MARKALAR.food} />

        {/* Kategoriler */}
        <div className="mt-5">
          <div className="flex gap-2 px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {FOOD_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtreler */}
        <div className="flex gap-2 px-4 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {FOOD_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(activeFilter === f ? null : f)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                activeFilter === f
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white border-gray-200 text-gray-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* İşletmeler */}
        <div className="px-4 mt-4 grid grid-cols-1 gap-3">
          {filtered.map(r => (
            <RestaurantCard
              key={r.id}
              r={r}
              onClick={() => navigate(`/restaurant/${r.id}`)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              Bu kategoride işletme bulunamadı
            </div>
          )}
        </div>

      </div>

      <BottomNav active="home" />
    </div>
  )
}
