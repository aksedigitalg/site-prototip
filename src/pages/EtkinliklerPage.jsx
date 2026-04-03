import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronLeft, MapPin, Clock, ChevronRight } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { ETKINLIK_CATEGORIES, ETKINLIKLER } from '../data/mockEtkinlikler'

function FeaturedCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="shrink-0 w-72 rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-transform relative"
      style={{ height: 180, backgroundColor: item.bg }}
    >
      <div className="absolute inset-0 flex items-center justify-end pr-6 opacity-10">
        <span className="text-8xl">{item.emoji}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute top-3 left-3">
        <span className="text-xs font-bold text-white bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-xl">
          {item.kategori}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        <p className="text-white font-bold text-sm leading-snug">{item.title}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex items-center gap-1">
            <Clock size={10} className="text-white/70" />
            <span className="text-white/70 text-xs">{item.tarih}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={10} className="text-white/70" />
            <span className="text-white/70 text-xs">{item.mekan}</span>
          </div>
        </div>
        <p className="text-white font-bold text-sm mt-1.5">
          {item.fiyat == null ? 'Ücretsiz' : `${item.fiyat}₺`}
        </p>
      </div>
    </div>
  )
}

export default function EtkinliklerPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [featuredIdx,    setFeaturedIdx]    = useState(0)

  const featured = ETKINLIKLER.filter(e => e.featured)

  useEffect(() => {
    if (featured.length <= 1) return
    const t = setInterval(() => setFeaturedIdx(i => (i + 1) % featured.length), 3000)
    return () => clearInterval(t)
  }, [featured.length])

  const filtered = ETKINLIKLER.filter(e =>
    activeCategory === 'Tümü' || e.kategori === activeCategory
  )

  // Ay kısaltmaları
  const AYLAR = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara']
  function parseTarih(tarih) {
    // "12 Nisan 2026, Pazar" → { gun: '12', ay: 'Nis' }
    const parts = tarih.split(' ')
    if (parts[0].includes('–')) return { gun: '—', ay: '—' }
    const gun = parts[0]
    const ayAdlari = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık']
    const ayIdx = ayAdlari.findIndex(a => tarih.includes(a))
    return { gun, ay: ayIdx >= 0 ? AYLAR[ayIdx] : '?' }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-bold flex-1">Etkinlikler</h1>
          <button onClick={() => navigate('/search')} className="text-gray-500">
            <Search size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="pt-14 pb-24">

        {/* Öne Çıkan (Carousel) */}
        <div className="pt-4">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="text-gray-800 text-sm font-bold">Öne Çıkan</h2>
            <span className="text-gray-400 text-xs">{featuredIdx + 1}/{featured.length}</span>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {featured.map((item, i) => (
              <FeaturedCard
                key={item.id}
                item={item}
                onClick={() => navigate(`/etkinlik/${item.id}`)}
              />
            ))}
          </div>
          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setFeaturedIdx(i)}
                className={`rounded-full transition-all ${i === featuredIdx ? 'w-4 h-1.5 bg-gray-800' : 'w-1.5 h-1.5 bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Kategoriler */}
        <div className="flex gap-2 px-4 mt-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {ETKINLIK_CATEGORIES.map(cat => (
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

        {/* Etkinlik Listesi */}
        <div className="px-4 mt-4 space-y-2.5">
          <p className="text-gray-500 text-xs">{filtered.length} etkinlik bulundu</p>

          {filtered.map(item => {
            const { gun, ay } = parseTarih(item.tarih)
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/etkinlik/${item.id}`)}
                className="bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm flex gap-3.5 cursor-pointer active:scale-[0.98] transition-transform"
              >
                {/* Tarih bloku */}
                <div
                  className="w-14 shrink-0 rounded-xl flex flex-col items-center justify-center py-2.5"
                  style={{ backgroundColor: item.bg + '22' }}
                >
                  <span className="text-xl font-extrabold leading-none" style={{ color: item.bg }}>{gun}</span>
                  <span className="text-xs font-semibold mt-0.5" style={{ color: item.bg }}>{ay}</span>
                </div>

                {/* Bilgi */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-gray-400 mb-0.5 block">{item.kategori}</span>
                      <p className="text-gray-800 text-sm font-bold leading-snug">{item.title}</p>
                    </div>
                    <ChevronRight size={16} strokeWidth={1.5} className="text-gray-300 shrink-0 mt-0.5" />
                  </div>

                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Clock size={11} strokeWidth={1.5} className="text-gray-400" />
                      <span className="text-gray-500 text-xs">{item.saat}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={11} strokeWidth={1.5} className="text-gray-400" />
                      <span className="text-gray-500 text-xs line-clamp-1">{item.mekan}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <p className={`text-sm font-extrabold ${item.fiyat == null ? 'text-emerald-600' : 'text-gray-900'}`}>
                      {item.fiyat == null ? 'Ücretsiz' : `${item.fiyat}₺'den başlayan`}
                    </p>
                    {item.kontenjan && (
                      <span className="text-gray-400 text-xs">{item.kontenjan} kontenjan</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <BottomNav active="home" />
    </div>
  )
}
