import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, MapPin, Users, Share2, Calendar } from 'lucide-react'
import { ETKINLIKLER } from '../data/mockEtkinlikler'

export default function EtkinlikDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = ETKINLIKLER.find(e => e.id === parseInt(id))

  if (!item) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">Etkinlik bulunamadı</p>
    </div>
  )

  const isFree = item.fiyat == null

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Poster cover */}
      <div className="relative" style={{ height: 220, backgroundColor: item.bg }}>
        {/* Dekoratif emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-9xl opacity-10">{item.emoji}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Geri + Paylaş */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-black/30 backdrop-blur rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={18} strokeWidth={1.5} className="text-white" />
          </button>
          <button className="w-9 h-9 bg-black/30 backdrop-blur rounded-full flex items-center justify-center">
            <Share2 size={16} strokeWidth={1.5} className="text-white" />
          </button>
        </div>

        {/* Kategori + Başlık */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
          <span className="text-xs font-bold text-white/80 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-xl">
            {item.kategori}
          </span>
          <h1 className="text-white text-xl font-extrabold mt-2 leading-snug">{item.title}</h1>
        </div>
      </div>

      {/* İçerik */}
      <div className="pb-28 px-4 pt-4 space-y-3">

        {/* Tarih / Saat / Yer — Ana bilgi kartı */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.bg + '22' }}>
                <Calendar size={15} strokeWidth={1.5} style={{ color: item.bg }} />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Tarih</p>
                <p className="text-gray-800 text-sm font-semibold">{item.tarih}</p>
              </div>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.bg + '22' }}>
                <Clock size={15} strokeWidth={1.5} style={{ color: item.bg }} />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Saat & Süre</p>
                <p className="text-gray-800 text-sm font-semibold">{item.saat} · {item.sure}</p>
              </div>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.bg + '22' }}>
                <MapPin size={15} strokeWidth={1.5} style={{ color: item.bg }} />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Mekan</p>
                <p className="text-gray-800 text-sm font-semibold">{item.mekan}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.adres}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bilet + Kontenjan */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs">Giriş Ücreti</p>
            <p className={`text-xl font-extrabold mt-0.5 ${isFree ? 'text-emerald-600' : 'text-gray-900'}`}>
              {isFree ? 'Ücretsiz' : `${item.fiyat}₺`}
            </p>
          </div>
          {item.kontenjan && (
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
              <Users size={14} strokeWidth={1.5} className="text-gray-400" />
              <div>
                <p className="text-gray-400 text-xs">Kontenjan</p>
                <p className="text-gray-800 text-sm font-semibold">{item.kontenjan} kişi</p>
              </div>
            </div>
          )}
        </div>

        {/* Açıklama */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-800 text-sm font-bold mb-2">Etkinlik Hakkında</p>
          <p className="text-gray-600 text-sm leading-relaxed">{item.aciklama}</p>
        </div>

        {/* Organizatör */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
            🏛️
          </div>
          <div>
            <p className="text-gray-400 text-xs">Organizatör</p>
            <p className="text-gray-800 text-sm font-semibold">{item.organizator}</p>
          </div>
        </div>

      </div>

      {/* Alt CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3">
          <button
            className={`w-full text-white font-bold text-sm py-4 rounded-2xl active:scale-95 transition-transform ${
              isFree ? 'bg-emerald-500' : 'bg-gray-900'
            }`}
          >
            {isFree ? 'Ücretsiz Katıl' : `Bilet Al — ${item.fiyat}₺`}
          </button>
        </div>
      </div>

    </div>
  )
}
