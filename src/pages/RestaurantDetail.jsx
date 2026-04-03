import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Star, Clock, MapPin, Phone, Info,
  Plus, ChevronRight, Copy, X, MessageSquare,
} from 'lucide-react'
import { RESTAURANTS, MENUS, REVIEWS, RESTAURANT_INFO, DISCOUNT_CARDS } from '../data/mockFood'

function Stars({ rating, size = 12 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  )
}

function RatingBar({ label, count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-500 text-xs w-4">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gray-800 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-gray-400 text-xs w-4">{count}</span>
    </div>
  )
}

export default function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurantId = parseInt(id)

  const restaurant = RESTAURANTS.find(r => r.id === restaurantId)
  const menu = MENUS[restaurantId] || []
  const reviews = REVIEWS[restaurantId] || []
  const info = RESTAURANT_INFO[restaurantId]
  const discounts = DISCOUNT_CARDS[restaurantId] || []

  const [activeTab, setActiveTab] = useState('menu')
  const [copiedCode, setCopiedCode] = useState(null)

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">İşletme bulunamadı</p>
      </div>
    )
  }

  const totalReviews = reviews.length
  const avgRating = totalReviews > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1)
    : restaurant.rating

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star, count: reviews.filter(r => r.rating === star).length,
  }))

  function copyCode(code) {
    navigator.clipboard?.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Kapak */}
      <div className="relative bg-gray-200 flex items-center justify-center" style={{ height: 200 }}>
        <span className="text-7xl">🍽️</span>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
        >
          <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-700" />
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
        >
          <Info size={16} strokeWidth={1.5} className="text-gray-700" />
        </button>
      </div>

      {/* İşletme bilgisi */}
      <div className="bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-gray-900 text-lg font-bold">{restaurant.name}</h1>
            <p className="text-gray-500 text-sm">{restaurant.category}</p>
          </div>
          <div className={`px-2.5 py-1 rounded-xl text-xs font-semibold ${restaurant.isOpen ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
            {restaurant.isOpen ? 'Açık' : 'Kapalı'}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <Stars rating={restaurant.rating} />
            <span className="text-gray-700 text-xs font-semibold ml-1">{restaurant.rating}</span>
            <span className="text-gray-400 text-xs">({restaurant.reviewCount})</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <Clock size={11} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-500 text-xs">{restaurant.deliveryTime}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <MapPin size={11} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-500 text-xs">{restaurant.distance}</span>
          </div>
        </div>
      </div>

      {/* İndirim kartları */}
      {discounts.length > 0 && (
        <div className="bg-white border-b border-gray-100 py-3">
          <div className="flex gap-3 px-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {discounts.map(d => (
              <div key={d.id} className="shrink-0 border border-dashed border-gray-300 rounded-2xl px-4 py-3 flex flex-col gap-1 min-w-[140px]">
                <p className="text-gray-800 text-xs font-bold">{d.title}</p>
                <p className="text-gray-500 text-xs">{d.desc}</p>
                <button
                  onClick={() => copyCode(d.code)}
                  className="flex items-center gap-1 mt-1"
                >
                  <span className="text-gray-400 text-xs font-mono">{d.code}</span>
                  {copiedCode === d.code
                    ? <span className="text-green-500 text-xs">Kopyalandı!</span>
                    : <Copy size={10} strokeWidth={1.5} className="text-gray-400" />
                  }
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 flex">
        {[
          { key: 'menu',    label: 'Menü' },
          { key: 'about',   label: 'Hakkında' },
          { key: 'reviews', label: `Yorumlar (${totalReviews})` },
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

      {/* İçerik */}
      <div className="flex-1 pb-24">

        {/* MENÜ */}
        {activeTab === 'menu' && (
          <div className="px-4 pt-4 space-y-6">
            {menu.map(section => (
              <div key={section.section}>
                <h3 className="text-gray-800 text-sm font-bold mb-3">{section.section}</h3>
                <div className="space-y-2">
                  {section.items.map(item => (
                    <div key={item.id} className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-xl">
                        🍴
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 text-sm font-semibold">{item.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{item.desc}</p>
                        <p className="text-gray-800 text-sm font-bold mt-1">{item.price}₺</p>
                      </div>
                      <button className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center shrink-0 active:scale-90 transition-transform">
                        <Plus size={16} strokeWidth={2} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {menu.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-8">Menü henüz eklenmedi</p>
            )}
          </div>
        )}

        {/* HAKKINDA */}
        {activeTab === 'about' && (
          <div className="px-4 pt-4 space-y-3">
            {info && [
              { icon: MapPin,  label: 'Adres',            value: info.address },
              { icon: Clock,   label: 'Çalışma Saatleri', value: info.hours },
              { icon: Phone,   label: 'Telefon',          value: info.phone },
              { icon: Clock,   label: 'Min. Sipariş',     value: info.minOrder },
              { icon: Clock,   label: 'Teslimat Süresi',  value: info.deliveryTime },
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
            {/* Özet */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex gap-4">
              <div className="flex flex-col items-center justify-center">
                <span className="text-gray-900 text-4xl font-bold">{avgRating}</span>
                <Stars rating={parseFloat(avgRating)} size={14} />
                <span className="text-gray-400 text-xs mt-1">{totalReviews} yorum</span>
              </div>
              <div className="flex-1 space-y-1.5">
                {ratingCounts.map(({ star, count }) => (
                  <RatingBar key={star} label={star} count={count} total={totalReviews} />
                ))}
              </div>
            </div>

            {/* Yorumlar */}
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

      {/* Alt buton */}
      {restaurant.isOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
          <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3">
            <button className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl active:scale-95 transition-transform">
              Sipariş Ver
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
