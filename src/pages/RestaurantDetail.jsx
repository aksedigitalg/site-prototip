import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Star, Clock, MapPin, Phone,
  Plus, Minus, ShoppingBag, MessageSquare, Copy, Info,
} from 'lucide-react'
import { RESTAURANTS, MENUS, REVIEWS, RESTAURANT_INFO, DISCOUNT_CARDS } from '../data/mockFood'

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

export default function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurantId = parseInt(id)

  const restaurant = RESTAURANTS.find(r => r.id === restaurantId)
  const menu = MENUS[restaurantId] || []
  const reviews = REVIEWS[restaurantId] || []
  const info = RESTAURANT_INFO[restaurantId]
  const discounts = DISCOUNT_CARDS[restaurantId] || []

  const [activeSection, setActiveSection] = useState(0)
  const [activeTab, setActiveTab] = useState('menu')
  const [cart, setCart] = useState({})
  const [copiedCode, setCopiedCode] = useState(null)
  const sectionRefs = useRef([])

  if (!restaurant) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">İşletme bulunamadı</p>
    </div>
  )

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)
  const totalPrice = Object.entries(cart).reduce((sum, [itemId, qty]) => {
    const item = menu.flatMap(s => s.items).find(i => i.id === parseInt(itemId))
    return sum + (item?.price || 0) * qty
  }, 0)

  function addToCart(itemId) { setCart(c => ({ ...c, [itemId]: (c[itemId] || 0) + 1 })) }
  function removeFromCart(itemId) {
    setCart(c => {
      const next = { ...c }
      if (next[itemId] > 1) next[itemId]--
      else delete next[itemId]
      return next
    })
  }

  function copyCode(code) {
    navigator.clipboard?.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const totalReviews = reviews.length
  const avgRating = totalReviews > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1)
    : restaurant.rating

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Kapak */}
      <div className="relative bg-gray-800" style={{ height: 220 }}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-8xl opacity-20">🍽️</span>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Geri */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 bg-black/30 backdrop-blur rounded-full flex items-center justify-center"
        >
          <ArrowLeft size={18} strokeWidth={1.5} className="text-white" />
        </button>

        {/* Info */}
        <button
          onClick={() => setActiveTab('about')}
          className="absolute top-4 right-4 w-9 h-9 bg-black/30 backdrop-blur rounded-full flex items-center justify-center"
        >
          <Info size={16} strokeWidth={1.5} className="text-white" />
        </button>

        {/* Alt bilgi */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-white text-xl font-bold">{restaurant.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Stars rating={restaurant.rating} size={12} />
                <span className="text-white/80 text-xs">{restaurant.rating} ({restaurant.reviewCount})</span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-xl text-xs font-bold ${restaurant.isOpen ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
              {restaurant.isOpen ? 'Açık' : 'Kapalı'}
            </div>
          </div>
        </div>
      </div>

      {/* Hız bilgileri şeridi */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {[
          { icon: Clock,  value: restaurant.deliveryTime },
          { icon: MapPin, value: restaurant.distance },
          { icon: ShoppingBag, value: `Min. ${restaurant.minOrder}₺` },
        ].map(({ icon: Icon, value }) => (
          <div key={value} className="flex items-center gap-1.5 shrink-0">
            <Icon size={13} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-600 text-xs font-medium">{value}</span>
          </div>
        ))}
        {restaurant.discount && (
          <div className="ml-auto shrink-0 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-xl">
            {restaurant.discount} İndirim
          </div>
        )}
      </div>

      {/* İndirim kartları */}
      {discounts.length > 0 && (
        <div className="bg-white border-b border-gray-100 py-3">
          <div className="flex gap-3 px-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {discounts.map(d => (
              <div key={d.id} className="shrink-0 border border-dashed border-gray-300 rounded-2xl px-4 py-3 min-w-[150px]">
                <p className="text-gray-800 text-xs font-bold">{d.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{d.desc}</p>
                <button onClick={() => copyCode(d.code)} className="flex items-center gap-1 mt-2">
                  <span className="text-gray-400 text-xs font-mono bg-gray-50 px-2 py-0.5 rounded-lg">{d.code}</span>
                  {copiedCode === d.code
                    ? <span className="text-green-500 text-xs">✓</span>
                    : <Copy size={10} className="text-gray-400" />}
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
              activeTab === tab.key ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MENÜ */}
      {activeTab === 'menu' && (
        <div>
          {/* Menü kategori scroll */}
          <div className="bg-white border-b border-gray-100 px-4 py-2 flex gap-2 overflow-x-auto sticky top-[45px] z-20" style={{ scrollbarWidth: 'none' }}>
            {menu.map((section, i) => (
              <button
                key={section.section}
                onClick={() => {
                  setActiveSection(i)
                  sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeSection === i ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {section.section}
              </button>
            ))}
          </div>

          <div className="pb-32 px-4 pt-4 space-y-6">
            {menu.map((section, i) => (
              <div key={section.section} ref={el => sectionRefs.current[i] = el}>
                <h3 className="text-gray-800 text-sm font-bold mb-3">{section.section}</h3>
                <div className="space-y-2">
                  {section.items.map(item => {
                    const qty = cart[item.id] || 0
                    return (
                      <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-2xl">🍴</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-800 text-sm font-semibold">{item.name}</p>
                          <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{item.desc}</p>
                          <p className="text-gray-900 text-sm font-bold mt-1">{item.price}₺</p>
                        </div>
                        {/* Sepet kontrol */}
                        {qty === 0 ? (
                          <button
                            onClick={() => addToCart(item.id)}
                            className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center shrink-0 active:scale-90 transition-transform"
                          >
                            <Plus size={16} strokeWidth={2} className="text-white" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-xl bg-gray-100 flex items-center justify-center active:scale-90 transition-transform">
                              <Minus size={13} strokeWidth={2} className="text-gray-700" />
                            </button>
                            <span className="text-gray-800 text-sm font-bold w-4 text-center">{qty}</span>
                            <button onClick={() => addToCart(item.id)} className="w-7 h-7 rounded-xl bg-gray-900 flex items-center justify-center active:scale-90 transition-transform">
                              <Plus size={13} strokeWidth={2} className="text-white" />
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
            {menu.length === 0 && <p className="text-gray-400 text-sm text-center py-8">Menü henüz eklenmedi</p>}
          </div>
        </div>
      )}

      {/* HAKKINDA */}
      {activeTab === 'about' && (
        <div className="px-4 pt-4 space-y-3 pb-8">
          {info && [
            { icon: MapPin,  label: 'Adres',            value: info.address },
            { icon: Clock,   label: 'Çalışma Saatleri', value: info.hours },
            { icon: Phone,   label: 'Telefon',          value: info.phone },
            { icon: ShoppingBag, label: 'Min. Sipariş', value: info.minOrder },
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
        <div className="px-4 pt-4 space-y-3 pb-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex gap-4 items-center">
            <div className="text-center">
              <p className="text-gray-900 text-4xl font-bold">{avgRating}</p>
              <Stars rating={parseFloat(avgRating)} size={14} />
              <p className="text-gray-400 text-xs mt-1">{totalReviews} yorum</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5,4,3,2,1].map(star => {
                const count = reviews.filter(r => r.rating === star).length
                const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs w-3">{star}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-800 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-gray-400 text-xs w-3">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm flex flex-col items-center gap-2">
              <MessageSquare size={28} strokeWidth={1.5} className="text-gray-300" />
              Henüz yorum yapılmamış
            </div>
          ) : reviews.map(r => (
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
          ))}
        </div>
      )}

      {/* Sepet butonu */}
      {restaurant.isOpen && totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
          <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3">
            <button className="w-full bg-gray-900 text-white font-semibold text-sm py-4 rounded-2xl active:scale-95 transition-transform flex items-center justify-between px-5">
              <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{totalItems}</span>
              </div>
              <span>Sepeti Görüntüle</span>
              <span className="font-bold">{totalPrice}₺</span>
            </button>
          </div>
        </div>
      )}

      {restaurant.isOpen && totalItems === 0 && (
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
