import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, MapPin, Heart, Share2, Tag } from 'lucide-react'
import { IKINCI_EL_LISTINGS } from '../data/mockIlanlar'

const CONDITION_COLOR = {
  'Sıfır Gibi':    'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Az Kullanılmış':'bg-blue-50 text-blue-700 border-blue-200',
  'İyi':           'bg-gray-100 text-gray-700 border-gray-200',
  'Orta':          'bg-orange-50 text-orange-700 border-orange-200',
}

export default function IkincielDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = IKINCI_EL_LISTINGS.find(i => i.id === parseInt(id))
  const [saved, setSaved] = useState(false)

  if (!item) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">İlan bulunamadı</p>
    </div>
  )

  // Benzer ilanlar (aynı kategori, farklı id)
  const similar = IKINCI_EL_LISTINGS.filter(i => i.category === item.category && i.id !== item.id)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-semibold flex-1 line-clamp-1">{item.title}</h1>
          <button
            onClick={() => setSaved(s => !s)}
            className="text-gray-500"
          >
            <Heart
              size={20} strokeWidth={1.5}
              className={saved ? 'text-red-400 fill-red-400' : 'text-gray-400'}
            />
          </button>
          <button className="text-gray-500">
            <Share2 size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="pt-14 pb-28">

        {/* Büyük görsel */}
        <div className="bg-gray-100 flex items-center justify-center" style={{ height: 280 }}>
          <span className="text-9xl opacity-25">{item.emoji}</span>
        </div>

        {/* Fotoğraf nokta gösterge (mock) */}
        <div className="flex justify-center gap-1.5 mt-3">
          {[0, 1, 2].map(i => (
            <div key={i} className={`rounded-full ${i === 0 ? 'w-4 h-1.5 bg-gray-800' : 'w-1.5 h-1.5 bg-gray-300'}`} />
          ))}
        </div>

        <div className="px-4 mt-4 space-y-3">

          {/* Başlık + Fiyat */}
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <h1 className="text-gray-900 text-base font-bold flex-1 leading-snug">{item.title}</h1>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-xl border shrink-0 ${CONDITION_COLOR[item.condition] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                {item.condition}
              </span>
            </div>

            <p className="text-gray-900 text-2xl font-extrabold mt-2">{item.price}</p>

            <div className="flex items-center gap-3 mt-2.5">
              <div className="flex items-center gap-1">
                <Tag size={11} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-gray-500 text-xs">{item.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={11} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-gray-500 text-xs">{item.location}</span>
              </div>
              <span className="text-gray-400 text-xs">{item.date}</span>
            </div>
          </div>

          {/* Açıklama */}
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
            <p className="text-gray-800 text-sm font-bold mb-2">Açıklama</p>
            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </div>

          {/* Benzer ilanlar */}
          {similar.length > 0 && (
            <div>
              <p className="text-gray-800 text-sm font-bold mb-2.5 px-0.5">Benzer İlanlar</p>
              <div className="space-y-2.5">
                {similar.map(s => (
                  <div
                    key={s.id}
                    onClick={() => navigate(`/ilanlar/ikinciel/${s.id}`)}
                    className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-2xl">
                      {s.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-sm font-semibold line-clamp-1">{s.title}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{s.condition}</p>
                      <p className="text-gray-900 text-sm font-bold mt-1">{s.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Alt buton */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3 flex gap-3">
          <a
            href={`tel:${item.phone}`}
            className="flex-1 border border-gray-200 text-gray-700 font-semibold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Phone size={16} strokeWidth={1.5} />
            Ara
          </a>
          <button className="flex-1 bg-gray-900 text-white font-semibold text-sm py-4 rounded-2xl active:scale-95 transition-transform">
            Mesaj Gönder
          </button>
        </div>
      </div>

    </div>
  )
}
