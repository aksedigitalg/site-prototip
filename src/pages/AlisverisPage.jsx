import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronLeft, Star, MapPin, Tag } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { MAGAZA_CATEGORIES, MAGAZALAR } from '../data/mockAlisveris'

function MagazaCard({ m, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex gap-4 cursor-pointer active:scale-[0.98] transition-transform"
    >
      {/* Logo */}
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl shrink-0">
        {m.logo}
      </div>

      {/* Bilgi */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-gray-800 text-sm font-bold">{m.name}</h3>
            <p className="text-gray-400 text-xs">{m.kategori}</p>
          </div>
          <div className={`shrink-0 px-2 py-0.5 rounded-lg text-xs font-semibold ${m.acik ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
            {m.acik ? 'Açık' : 'Kapalı'}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-gray-700 text-xs font-semibold">{m.puan}</span>
            <span className="text-gray-400 text-xs">({m.yorumSayisi})</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <MapPin size={10} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-500 text-xs">{m.mesafe}</span>
          </div>
        </div>

        {m.kampanyaSayisi > 0 && (
          <div className="flex items-center gap-1 mt-2">
            <Tag size={10} strokeWidth={1.5} className="text-orange-500" />
            <span className="text-orange-500 text-xs font-semibold">{m.kampanyaSayisi} aktif kampanya</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AlisverisPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('Tümü')

  const filtered = MAGAZALAR.filter(m =>
    activeCategory === 'Tümü' || m.kategori === activeCategory
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">Alışveriş</h1>
          <button onClick={() => navigate('/search')} className="text-gray-500">
            <Search size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="pt-14 pb-24">

        {/* Arama */}
        <div className="px-4 pt-4">
          <button
            onClick={() => navigate('/search')}
            className="w-full flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm"
          >
            <Search size={15} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-400 text-sm">Mağaza veya ürün ara...</span>
          </button>
        </div>

        {/* Kategoriler */}
        <div className="flex gap-2 px-4 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {MAGAZA_CATEGORIES.map(cat => (
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

        {/* Mağaza Listesi */}
        <div className="px-4 mt-4 space-y-3">
          <p className="text-gray-500 text-xs">{filtered.length} mağaza bulundu</p>
          {filtered.map(m => (
            <MagazaCard
              key={m.id}
              m={m}
              onClick={() => navigate(`/magaza/${m.id}`)}
            />
          ))}
        </div>

      </div>

      <BottomNav active="home" />
    </div>
  )
}
