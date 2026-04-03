import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronLeft, MapPin, BedDouble, Maximize2, Gauge, Fuel, Car } from 'lucide-react'
import {
  EMLAK_SUBCATEGORIES, EMLAK_STATUS, EMLAK_LISTINGS,
  VASITA_SUBCATEGORIES, VASITA_LISTINGS,
  IKINCI_EL_CATEGORIES, IKINCI_EL_LISTINGS,
} from '../data/mockIlanlar'

// ─── EMLAK KARTI ─────────────────────────────────────────────────────────────
function EmlakCard({ item, onClick }) {
  const statusColor = item.status === 'Satılık'
    ? 'bg-blue-600 text-white'
    : 'bg-emerald-500 text-white'

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
    >
      {/* Görsel */}
      <div className="relative h-44 bg-gray-100 flex items-center justify-center">
        <span className="text-6xl opacity-20">🏠</span>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${statusColor}`}>
            {item.status}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-black/40 text-white backdrop-blur-sm">
            {item.type}
          </span>
        </div>
        <span className="absolute top-3 right-3 text-xs text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-lg">
          {item.date}
        </span>
      </div>

      {/* Bilgi */}
      <div className="p-3.5">
        <p className="text-gray-800 text-sm font-bold leading-snug">{item.title}</p>
        <p className="text-gray-900 text-lg font-extrabold mt-1">{item.price}</p>

        {/* Stats */}
        <div className="flex items-center gap-3 mt-2.5 flex-wrap">
          {item.m2 && (
            <div className="flex items-center gap-1">
              <Maximize2 size={11} className="text-gray-400" />
              <span className="text-gray-600 text-xs font-medium">{item.m2} m²</span>
            </div>
          )}
          {item.rooms && (
            <div className="flex items-center gap-1">
              <BedDouble size={11} className="text-gray-400" />
              <span className="text-gray-600 text-xs font-medium">{item.rooms}</span>
            </div>
          )}
          {item.floor != null && (
            <span className="text-gray-600 text-xs font-medium">
              {item.floor === 0 ? 'Zemin' : `${item.floor}. Kat`}
              {item.totalFloor ? `/${item.totalFloor}` : ''}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2">
          <MapPin size={11} strokeWidth={1.5} className="text-gray-400" />
          <span className="text-gray-500 text-xs">{item.location}</span>
        </div>
      </div>
    </div>
  )
}

// ─── VASITA KARTI ─────────────────────────────────────────────────────────────
function VasitaCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
    >
      {/* Görsel */}
      <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-6xl opacity-20">🚗</span>
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-black/40 text-white backdrop-blur-sm">
            {item.condition}
          </span>
        </div>
        <span className="absolute top-3 right-3 text-xs text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-lg">
          {item.date}
        </span>
        {/* Yıl etiketi */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1">
          <span className="text-gray-800 text-xs font-bold">{item.year}</span>
        </div>
      </div>

      {/* Bilgi */}
      <div className="p-3.5">
        <p className="text-gray-800 text-sm font-bold leading-snug">{item.title}</p>
        <p className="text-gray-900 text-lg font-extrabold mt-1">{item.price}</p>

        {/* Stats */}
        <div className="flex items-center gap-3 mt-2.5 flex-wrap">
          <div className="flex items-center gap-1">
            <Gauge size={11} className="text-gray-400" />
            <span className="text-gray-600 text-xs font-medium">{item.km}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel size={11} className="text-gray-400" />
            <span className="text-gray-600 text-xs font-medium">{item.fuel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Car size={11} className="text-gray-400" />
            <span className="text-gray-600 text-xs font-medium">{item.gear}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <MapPin size={11} strokeWidth={1.5} className="text-gray-400" />
          <span className="text-gray-500 text-xs">{item.location}</span>
        </div>
      </div>
    </div>
  )
}

// ─── 2. EL KARTI ─────────────────────────────────────────────────────────────
const CONDITION_COLOR = {
  'Sıfır Gibi':    'bg-emerald-50 text-emerald-600',
  'Az Kullanılmış':'bg-blue-50 text-blue-600',
  'İyi':           'bg-gray-100 text-gray-600',
  'Orta':          'bg-orange-50 text-orange-600',
}

function IkincielCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex gap-3 cursor-pointer active:scale-[0.98] transition-transform"
    >
      {/* Görsel */}
      <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-3xl">
        {item.emoji}
      </div>

      {/* Bilgi */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <p className="text-gray-800 text-sm font-bold leading-snug flex-1">{item.title}</p>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-lg shrink-0 ${CONDITION_COLOR[item.condition] || 'bg-gray-100 text-gray-600'}`}>
            {item.condition}
          </span>
        </div>
        <p className="text-gray-400 text-xs mt-0.5">{item.category}</p>
        <p className="text-gray-900 text-base font-extrabold mt-1.5">{item.price}</p>
        <div className="flex items-center gap-1 mt-1">
          <MapPin size={10} strokeWidth={1.5} className="text-gray-400" />
          <span className="text-gray-400 text-xs">{item.location}</span>
          <span className="text-gray-300 text-xs ml-1">• {item.date}</span>
        </div>
      </div>
    </div>
  )
}

// ─── ANA SAYFA ───────────────────────────────────────────────────────────────
const TABS = [
  { key: 'emlak',     label: 'Emlak',  emoji: '🏠' },
  { key: 'vasita',    label: 'Vasıta', emoji: '🚗' },
  { key: 'ikinciel',  label: '2. El',  emoji: '📦' },
]

export default function IlanlarPage() {
  const navigate = useNavigate()
  const [activeTab,        setActiveTab]        = useState('emlak')
  const [emlakSub,         setEmlakSub]         = useState('Tümü')
  const [emlakStatus,      setEmlakStatus]      = useState('Tümü')
  const [vasitaSub,        setVasitaSub]        = useState('Tümü')
  const [ikincielCategory, setIkincielCategory] = useState('Tümü')

  const filteredEmlak = EMLAK_LISTINGS.filter(i =>
    (emlakSub === 'Tümü' || i.type === emlakSub) &&
    (emlakStatus === 'Tümü' || i.status === emlakStatus)
  )

  const filteredVasita = VASITA_LISTINGS.filter(i =>
    vasitaSub === 'Tümü' || i.type === vasitaSub
  )

  const filteredIkinciel = IKINCI_EL_LISTINGS.filter(i =>
    ikincielCategory === 'Tümü' || i.category === ikincielCategory
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">İlanlar</h1>
          <button onClick={() => navigate('/search')} className="text-gray-500">
            <Search size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="pt-14 pb-24">

        {/* Arama çubuğu */}
        <div className="px-4 pt-4">
          <button
            onClick={() => navigate('/search')}
            className="w-full flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm"
          >
            <Search size={15} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-400 text-sm">İlan ara...</span>
          </button>
        </div>

        {/* Büyük kategori seçici */}
        <div className="flex gap-3 px-4 mt-4">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-2xl border transition-all ${
                activeTab === tab.key
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              <span className="text-xl">{tab.emoji}</span>
              <span className="text-xs font-bold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── EMLAK İÇERİĞİ ── */}
        {activeTab === 'emlak' && (
          <div>
            {/* Alt kategori */}
            <div className="flex gap-2 px-4 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {EMLAK_SUBCATEGORIES.map(s => (
                <button
                  key={s}
                  onClick={() => setEmlakSub(s)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    emlakSub === s
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </button>
              ))}
              <div className="w-px shrink-0 bg-gray-200 mx-1 my-1" />
              {EMLAK_STATUS.map(s => (
                <button
                  key={s}
                  onClick={() => setEmlakStatus(s)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    emlakStatus === s
                      ? s === 'Satılık' ? 'bg-blue-600 text-white border-blue-600'
                      : s === 'Kiralık' ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="px-4 mt-4 space-y-3">
              <p className="text-gray-500 text-xs">{filteredEmlak.length} ilan bulundu</p>
              {filteredEmlak.map(item => (
                <EmlakCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate(`/ilanlar/emlak/${item.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── VASITA İÇERİĞİ ── */}
        {activeTab === 'vasita' && (
          <div>
            <div className="flex gap-2 px-4 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {VASITA_SUBCATEGORIES.map(s => (
                <button
                  key={s}
                  onClick={() => setVasitaSub(s)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    vasitaSub === s
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="px-4 mt-4 space-y-3">
              <p className="text-gray-500 text-xs">{filteredVasita.length} ilan bulundu</p>
              {filteredVasita.map(item => (
                <VasitaCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate(`/ilanlar/vasita/${item.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── 2. EL İÇERİĞİ ── */}
        {activeTab === 'ikinciel' && (
          <div>
            <div className="flex gap-2 px-4 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {IKINCI_EL_CATEGORIES.map(s => (
                <button
                  key={s}
                  onClick={() => setIkincielCategory(s)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    ikincielCategory === s
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="px-4 mt-4 space-y-2.5">
              <p className="text-gray-500 text-xs">{filteredIkinciel.length} ilan bulundu</p>
              {filteredIkinciel.map(item => (
                <IkincielCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate(`/ilanlar/ikinciel/${item.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
