import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Phone, MapPin, Heart, Share2,
  Gauge, Fuel, Car, Calendar, Palette, ShieldCheck,
} from 'lucide-react'
import { VASITA_LISTINGS } from '../data/mockIlanlar'

export default function VasitaDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = VASITA_LISTINGS.find(i => i.id === parseInt(id))
  const [saved, setSaved] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)

  if (!item) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">İlan bulunamadı</p>
    </div>
  )

  const conditionColor = item.condition === 'Sıfır Km'
    ? 'bg-emerald-500 text-white'
    : 'bg-gray-800 text-white'

  const stats = [
    { icon: Calendar,    label: 'Yıl',      value: String(item.year) },
    { icon: Gauge,       label: 'KM',       value: item.km },
    { icon: Fuel,        label: 'Yakıt',    value: item.fuel },
    { icon: Car,         label: 'Vites',    value: item.gear },
    { icon: Palette,     label: 'Renk',     value: item.color },
    { icon: ShieldCheck, label: 'Durum',    value: item.condition },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Görsel */}
      <div className="relative" style={{ height: 260 }}>
        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
          <span className="text-8xl opacity-10">🚗</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

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

        {/* Fotoğraf nokta göstergesi (mock) */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-1.5">
          {[0, 1, 2, 3].map(i => (
            <button
              key={i}
              onClick={() => setActivePhoto(i)}
              className={`rounded-full transition-all ${
                activePhoto === i ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Alt bilgi */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex items-end justify-between">
            <div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${conditionColor}`}>
                {item.condition}
              </span>
              <h1 className="text-white text-lg font-bold mt-2 leading-snug">{item.title}</h1>
            </div>
            <span className="text-white/70 text-xs">{item.date}</span>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="pb-28 px-4 pt-4 space-y-3">

        {/* Fiyat + Konum */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-400 text-xs mb-1">Fiyat</p>
          <p className="text-gray-900 text-2xl font-extrabold">{item.price}</p>
          <div className="flex items-center gap-1 mt-2">
            <MapPin size={12} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-500 text-sm">{item.location}</span>
          </div>
        </div>

        {/* Araç Bilgileri – 2x3 grid */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
          <p className="text-gray-800 text-sm font-bold mb-3">Araç Bilgileri</p>
          <div className="grid grid-cols-3 gap-2.5">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl px-2.5 py-2.5 text-center">
                <Icon size={15} strokeWidth={1.5} className="text-gray-400 mx-auto mb-1" />
                <p className="text-gray-400 text-xs">{label}</p>
                <p className="text-gray-800 text-xs font-bold mt-0.5 leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Donanım */}
        {item.features?.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm">
            <p className="text-gray-800 text-sm font-bold mb-3">Donanım</p>
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
            Teklif Ver
          </button>
        </div>
      </div>

    </div>
  )
}
