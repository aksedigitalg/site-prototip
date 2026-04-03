import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, MapPin, ChevronLeft, CheckCircle } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { SERVICE_CATEGORIES, SERVICE_FILTERS, SERVICES } from '../data/mockServices'
import StoryBar from '../components/StoryBar'
import { STORIES, MARKALAR } from '../data/mockStory'

const CATEGORY_ICONS = {
  'Temizlik': '🧹', 'Elektrik': '⚡', 'Tesisat': '🔧', 'Boya': '🎨',
  'Nakliyat': '🚛', 'Klima': '❄️', 'Bahçe': '🌿', 'Tadilat': '🏗️',
}

function ServiceCard({ s, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex gap-4 cursor-pointer active:scale-95 transition-transform"
    >
      {/* Avatar */}
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0 text-3xl">
        {CATEGORY_ICONS[s.category] || '🔨'}
      </div>

      {/* Bilgi */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-gray-800 text-sm font-bold">{s.name}</h3>
            <p className="text-gray-400 text-xs">{s.category}</p>
          </div>
          <div className={`shrink-0 px-2 py-0.5 rounded-lg text-xs font-semibold ${s.isAvailable ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
            {s.isAvailable ? 'Müsait' : 'Meşgul'}
          </div>
        </div>

        <p className="text-gray-500 text-xs mt-1 line-clamp-1">{s.desc}</p>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-gray-700 text-xs font-semibold">{s.rating}</span>
            <span className="text-gray-400 text-xs">({s.reviewCount})</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <MapPin size={10} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-500 text-xs">{s.distance}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-gray-800 text-xs font-bold">{s.price}₺<span className="text-gray-400 font-normal">/{s.priceUnit}</span></span>
        </div>

        {s.badge && (
          <div className="mt-2 flex items-center gap-1">
            <CheckCircle size={11} className="text-blue-500" />
            <span className="text-blue-500 text-xs font-medium">{s.badge}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [activeFilter, setActiveFilter] = useState(null)

  const filtered = SERVICES.filter(s =>
    activeCategory === 'Tümü' || s.category === activeCategory
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">Hizmetler</h1>
          <button onClick={() => navigate('/search')} className="text-gray-500">
            <Search size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="pt-14 pb-24">

        {/* Story + Markalar */}
        <StoryBar stories={STORIES.services} markalar={MARKALAR.services} />

        {/* Arama */}
        <div className="px-4 pt-4">
          <button
            onClick={() => navigate('/search')}
            className="w-full flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm"
          >
            <Search size={15} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-400 text-sm">Hizmet ara...</span>
          </button>
        </div>

        {/* Kategoriler */}
        <div className="mt-4">
          <div className="flex gap-2 px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {SERVICE_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                {cat !== 'Tümü' && CATEGORY_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtreler */}
        <div className="flex gap-2 px-4 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {SERVICE_FILTERS.map(f => (
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

        {/* Hizmet Listesi */}
        <div className="px-4 mt-4 space-y-3">
          <p className="text-gray-500 text-xs">{filtered.length} hizmet bulundu</p>
          {filtered.map(s => (
            <ServiceCard
              key={s.id}
              s={s}
              onClick={() => navigate(`/service/${s.id}`)}
            />
          ))}
        </div>

      </div>

      <BottomNav active="home" />
    </div>
  )
}
