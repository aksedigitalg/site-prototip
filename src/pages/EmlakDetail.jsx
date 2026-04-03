import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Phone, BedDouble, Maximize2,
  Layers, Thermometer, Building2, Heart, Share2,
} from 'lucide-react'
import { EMLAK_LISTINGS } from '../data/mockIlanlar'

export default function EmlakDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = EMLAK_LISTINGS.find(i => i.id === parseInt(id))
  const [saved, setSaved] = useState(false)

  if (!item) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">İlan bulunamadı</p>
    </div>
  )

  const statusColor = item.status === 'Satılık' ? 'bg-blue-600' : 'bg-emerald-500'

  const stats = [
    item.m2   && { icon: Maximize2,  label: 'Brüt m²',      value: `${item.m2} m²` },
    item.rooms && { icon: BedDouble,  label: 'Oda Sayısı',   value: item.rooms },
    item.floor != null && {
      icon: Layers,
      label: 'Bulunduğu Kat',
      value: item.floor === 0 ? 'Zemin Kat' : `${item.floor}. Kat`,
    },
    item.totalFloor && { icon: Building2,   label: 'Bina Kat Sayısı', value: `${item.totalFloor} Kat` },
    item.age  != null && { icon: Building2,  label: 'Bina Yaşı',      value: item.age === 0 ? 'Sıfır' : `${item.age} yıllık` },
    item.heating && { icon: Thermometer, label: 'Isıtma',          value: item.heating },
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Görsel + Overlay header */}
      <div className="relative" style={{ height: 260 }}>
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-8xl opacity-15">🏠</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Geri + Aksiyon */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-black/30 backdrop-blur rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={18} strokeWidth={1.5} className="text-white" />
          </button>
          <div className="flex gap-2">
            <button className="w-9 h-9 bg-black/30 backdrop-blur rounded-full flex items-center justify-center">
              <Share2 size={16} strokeWidth={1.5} className="text-white" />
            </button>
            <button
              onClick={() => setSaved(s => !s)}
              className="w-9 h-9 bg-black/30 backdrop-blur rounded-full flex items-center justify-center"
            >
              <Heart
                size={16} strokeWidth={1.5}
                className={saved ? 'text-red-400 fill-red-400' : 'text-white'}
              />
            </button>
          </div>
        </div>

        {/* Alt bilgi */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex items-end justify-between">
            <div>
              <span className={`text-white text-xs font-bold px-2.5 py-1 rounded-xl ${statusColor}`}>
                {item.status}
              </span>
              <h1 className="text-white text-lg font-bold mt-2 leading-snug">{item.title}</h1>
            </div>
            <span className="text-white/70 text-xs">{item.date}</span>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="pb-28 px-4 pt-4 space-y-3">

        {/* Fiyat */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-400 text-xs mb-1">Fiyat</p>
          <p className="text-gray-900 text-2xl font-extrabold">{item.price}</p>
          <div className="flex items-center gap-1 mt-2">
            <MapPin size={12} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-500 text-sm">{item.location}</span>
          </div>
        </div>

        {/* İlan Detayları */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-800 text-sm font-bold mb-3">İlan Detayları</p>
          <div className="grid grid-cols-2 gap-2.5">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Icon size={12} strokeWidth={1.5} className="text-gray-400" />
                  <p className="text-gray-400 text-xs">{label}</p>
                </div>
                <p className="text-gray-800 text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Özellikler */}
        {item.features?.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
            <p className="text-gray-800 text-sm font-bold mb-3">Özellikler</p>
            <div className="flex flex-wrap gap-2">
              {item.features.map(f => (
                <span key={f} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-xl">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Açıklama */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-800 text-sm font-bold mb-2">Açıklama</p>
          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
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
