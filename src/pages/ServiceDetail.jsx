import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Star, MapPin, Phone, Clock,
  MessageSquare, CheckCircle, Info, ChevronRight, Send,
} from 'lucide-react'
import { SERVICES, SERVICE_DETAILS } from '../data/mockServices'

const CATEGORY_ICONS = {
  'Temizlik': '🧹', 'Elektrik': '⚡', 'Tesisat': '🔧', 'Boya': '🎨',
  'Nakliyat': '🚛', 'Klima': '❄️', 'Bahçe': '🌿', 'Tadilat': '🏗️',
}

function Stars({ rating, size = 12 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size}
          className={i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  )
}

export default function ServiceDetail() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const serviceId = parseInt(id)

  const service = SERVICES.find(s => s.id === serviceId)
  const detail = SERVICE_DETAILS[serviceId]
  const [activeTab, setActiveTab] = useState('services')

  if (!service) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">Hizmet bulunamadı</p>
    </div>
  )

  const reviews = detail?.reviews || []
  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : service.rating

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-semibold flex-1">{service.name}</h1>
        </div>
      </header>

      <div className="pt-14 pb-28 overflow-y-auto">

        {/* Profil kartı */}
        <div className="bg-white border-b border-gray-100 px-4 py-5">
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center text-4xl shrink-0">
              {CATEGORY_ICONS[service.category] || '🔨'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-gray-900 text-base font-bold">{service.name}</h1>
                {service.badge && (
                  <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-lg">
                    <CheckCircle size={10} className="text-blue-500" />
                    <span className="text-blue-500 text-xs font-medium">{service.badge}</span>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-sm">{service.category}</p>
              <div className="flex items-center gap-1 mt-1">
                <Stars rating={service.rating} size={13} />
                <span className="text-gray-700 text-xs font-semibold ml-1">{service.rating}</span>
                <span className="text-gray-400 text-xs">({service.reviewCount} yorum)</span>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-3 leading-relaxed">{service.desc}</p>

          {/* İstatistikler */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: 'Fiyat',    value: `${service.price}₺/${service.priceUnit}` },
              { label: 'Mesafe',   value: service.distance },
              { label: 'Durum',    value: service.isAvailable ? 'Müsait' : 'Meşgul' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
                <p className="text-gray-400 text-xs">{label}</p>
                <p className="text-gray-800 text-xs font-bold mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex">
          {[
            { key: 'services', label: 'Hizmetler' },
            { key: 'about',    label: 'Hakkında' },
            { key: 'reviews',  label: `Yorumlar (${reviews.length})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* HİZMETLER */}
        {activeTab === 'services' && (
          <div className="px-4 pt-4 space-y-3">
            {(detail?.services || []).length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">Hizmet listesi eklenmemiş</p>
            ) : (
              detail.services.map((s, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-gray-800 text-sm font-semibold">{s.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{s.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 text-sm font-bold">{s.price}</p>
                    <button className="text-xs text-gray-500 mt-1 border border-gray-200 rounded-lg px-2 py-0.5">
                      Talep Et
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* HAKKINDA */}
        {activeTab === 'about' && (
          <div className="px-4 pt-4 space-y-3">
            {detail && [
              { icon: MapPin,  label: 'Konum',             value: detail.address },
              { icon: Clock,   label: 'Çalışma Saatleri',  value: detail.hours },
              { icon: Phone,   label: 'Telefon',           value: detail.phone },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Icon size={15} strokeWidth={1.5} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="text-gray-800 text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* YORUMLAR */}
        {activeTab === 'reviews' && (
          <div className="px-4 pt-4 space-y-3">
            {reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm flex flex-col items-center gap-2">
                <MessageSquare size={28} strokeWidth={1.5} className="text-gray-300" />
                Henüz yorum yapılmamış
              </div>
            ) : (
              reviews.map(r => (
                <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-600 text-xs font-bold">{r.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm font-semibold">{r.name}</p>
                        <p className="text-gray-400 text-xs">{r.date}</p>
                      </div>
                    </div>
                    <Stars rating={r.rating} size={11} />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.text}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Alt buton — kategoriye göre değişir */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
        <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3 flex gap-2">
          {/* Mesaj her kategoride var */}
          <button
            onClick={() => navigate('/mesajlarim')}
            className="w-12 h-12 shrink-0 border border-gray-200 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <Send size={16} strokeWidth={1.5} className="text-gray-600" />
          </button>

          {service.isAvailable && service.category === 'Düğün' && (
            <>
              <a
                href={`tel:${detail?.phone}`}
                className="flex-1 border border-gray-200 text-gray-700 font-semibold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Phone size={15} strokeWidth={1.5} />
                Ara
              </a>
              <button
                onClick={() => navigate(`/teklif-form/${service.id}`)}
                className="flex-1 bg-gray-900 text-white font-semibold text-sm py-3.5 rounded-2xl active:scale-95 transition-transform"
              >
                Teklif Al
              </button>
            </>
          )}

          {service.isAvailable && service.category === 'Sağlık' && (
            <>
              <a
                href={`tel:${detail?.phone}`}
                className="flex-1 border border-gray-200 text-gray-700 font-semibold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Phone size={15} strokeWidth={1.5} />
                Ara
              </a>
              <button
                onClick={() => navigate(`/randevu-form/${service.id}`)}
                className="flex-1 bg-gray-900 text-white font-semibold text-sm py-3.5 rounded-2xl active:scale-95 transition-transform"
              >
                Randevu Al
              </button>
            </>
          )}

          {service.isAvailable && service.category !== 'Düğün' && service.category !== 'Sağlık' && (
            <>
              <a
                href={`tel:${detail?.phone}`}
                className="flex-1 border border-gray-200 text-gray-700 font-semibold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Phone size={15} strokeWidth={1.5} />
                Ara
              </a>
              <button className="flex-1 bg-gray-900 text-white font-semibold text-sm py-3.5 rounded-2xl active:scale-95 transition-transform">
                Talep Gönder
              </button>
            </>
          )}

          {!service.isAvailable && (
            <div className="flex-1 bg-gray-100 text-gray-400 font-semibold text-sm py-3.5 rounded-2xl flex items-center justify-center">
              Şu an müsait değil
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
