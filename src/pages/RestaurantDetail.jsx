import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Star, Clock, MapPin, Phone,
  Plus, Minus, ShoppingBag, MessageSquare, Copy, Share2,
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

const COVER_IMG = 'https://www.yesilyurtavm.com/uploads/sayfalar/329e2.png'
const LOGO_IMG = 'https://yt3.googleusercontent.com/1WniihFDVTi6FmS8jsx89tadboWFXn5gIcjQDTteWBFytrQVSrswN3A3yz5HXXk3thuFG_U5=s900-c-k-c0x00ffffff-no-rj'

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

      {/* ── Hero Cover ── */}
      <div className="relative" style={{ height: 260 }}>
        {/* Arka plan resmi */}
        <img src={COVER_IMG} alt="" className="w-full h-full object-cover" />

        {/* Gradient overlay — alttan yukarı, alt %100 siyah, ortaya doğru %20 */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.1) 100%)' }} />

        {/* Üst butonlar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
          >
            <ArrowLeft size={18} strokeWidth={2} className="text-white" />
          </button>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
          >
            <Share2 size={16} strokeWidth={2} className="text-white" />
          </button>
        </div>

        {/* Logo + İsim — alt kısım ortada */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center" style={{ paddingBottom: 20 }}>
          <img
            src={LOGO_IMG}
            alt={restaurant.name}
            className="object-cover"
            style={{ width: 60, height: 60, borderRadius: '50%' }}
          />
          <h1 className="text-white text-lg font-bold mt-3">{restaurant.name}</h1>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center gap-1">
              <Star size={13} className="text-yellow-400 fill-yellow-400" />
              <span className="text-white text-[13px] font-semibold">{restaurant.rating}</span>
              <span className="text-white/50 text-[12px]">({restaurant.reviewCount})</span>
            </div>
            <span className="text-white/30">·</span>
            <span className="text-white/60 text-[12px]">{restaurant.category}</span>
            <span className="text-white/30">·</span>
            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${restaurant.isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {restaurant.isOpen ? 'Açık' : 'Kapalı'}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bilgi şeridi ── */}
      <div className="bg-white px-4 py-3 flex items-center justify-center gap-6">
        {[
          { icon: Clock, value: restaurant.deliveryTime },
          { icon: MapPin, value: restaurant.distance },
          { icon: ShoppingBag, value: `Min. ${restaurant.minOrder}₺` },
        ].map(({ icon: Icon, value }) => (
          <div key={value} className="flex items-center gap-1.5">
            <Icon size={14} strokeWidth={1.5} className="text-gray-400" />
            <span className="text-gray-600 text-[12px] font-medium">{value}</span>
          </div>
        ))}
      </div>

      {/* İndirim kartları */}
      {discounts.length > 0 && (
        <div className="bg-white border-t border-gray-100 py-3">
          <div className="flex gap-3 px-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {discounts.map(d => (
              <div key={d.id} className="shrink-0 border border-dashed border-gray-200 rounded-xl px-4 py-3 min-w-[150px]">
                <p className="text-gray-800 text-xs font-bold">{d.title}</p>
                <p className="text-gray-400 text-[11px] mt-0.5">{d.desc}</p>
                <button onClick={() => copyCode(d.code)} className="flex items-center gap-1 mt-2">
                  <span className="text-gray-400 text-[11px] font-mono bg-gray-50 px-2 py-0.5 rounded-lg">{d.code}</span>
                  {copiedCode === d.code
                    ? <span className="text-green-500 text-[11px]">✓</span>
                    : <Copy size={10} className="text-gray-300" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tabs ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 flex">
        {[
          { key: 'menu', label: 'Menü' },
          { key: 'about', label: 'Hakkında' },
          { key: 'reviews', label: `Yorumlar (${totalReviews})` },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 text-[13px] font-semibold border-b-2 transition-all ${
              activeTab === tab.key ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── MENÜ ── */}
      {activeTab === 'menu' && (
        <div>
          <div className="bg-white border-b border-gray-100 px-4 py-2 flex gap-2 overflow-x-auto sticky top-[45px] z-20" style={{ scrollbarWidth: 'none' }}>
            {menu.map((section, i) => (
              <button
                key={section.section}
                onClick={() => {
                  setActiveSection(i)
                  sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                  activeSection === i ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {section.section}
              </button>
            ))}
          </div>

          <div className="pb-32 px-4 pt-4 space-y-6">
            {menu.map((section, i) => (
              <div key={section.section} ref={el => sectionRefs.current[i] = el}>
                <h3 className="text-gray-800 text-[13px] font-bold mb-3">{section.section}</h3>
                <div className="space-y-2">
                  {section.items.map(item => {
                    const qty = cart[item.id] || 0
                    return (
                      <div key={item.id} className="bg-white rounded-xl p-3 flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-xl">🍴</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-800 text-[13px] font-semibold">{item.name}</p>
                          <p className="text-gray-400 text-[11px] mt-0.5 line-clamp-1">{item.desc}</p>
                          <p className="text-gray-900 text-[13px] font-bold mt-1">{item.price}₺</p>
                        </div>
                        {qty === 0 ? (
                          <button
                            onClick={() => addToCart(item.id)}
                            className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center shrink-0 active:scale-90 transition-transform"
                          >
                            <Plus size={15} strokeWidth={2} className="text-white" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform">
                              <Minus size={13} strokeWidth={2} className="text-gray-600" />
                            </button>
                            <span className="text-gray-800 text-[13px] font-bold w-4 text-center">{qty}</span>
                            <button onClick={() => addToCart(item.id)} className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center active:scale-90 transition-transform">
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

      {/* ── HAKKINDA ── */}
      {activeTab === 'about' && (
        <div className="px-4 pt-4 space-y-2 pb-8">
          {info && [
            { icon: MapPin, label: 'Adres', value: info.address },
            { icon: Clock, label: 'Çalışma Saatleri', value: info.hours },
            { icon: Phone, label: 'Telefon', value: info.phone },
            { icon: ShoppingBag, label: 'Min. Sipariş', value: info.minOrder },
            { icon: Clock, label: 'Teslimat Süresi', value: info.deliveryTime },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-xl px-4 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <Icon size={15} strokeWidth={1.5} className="text-gray-500" />
              </div>
              <div>
                <p className="text-gray-400 text-[11px]">{label}</p>
                <p className="text-gray-800 text-[13px] font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── YORUMLAR ── */}
      {activeTab === 'reviews' && (
        <div className="px-4 pt-4 space-y-2 pb-8">
          <div className="bg-white rounded-xl p-4 flex gap-4 items-center">
            <div className="text-center">
              <p className="text-gray-900 text-3xl font-bold">{avgRating}</p>
              <Stars rating={parseFloat(avgRating)} size={13} />
              <p className="text-gray-400 text-[11px] mt-1">{totalReviews} yorum</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5,4,3,2,1].map(star => {
                const count = reviews.filter(r => r.rating === star).length
                const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-gray-400 text-[11px] w-3">{star}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-800 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm flex flex-col items-center gap-2">
              <MessageSquare size={24} strokeWidth={1.5} className="text-gray-300" />
              Henüz yorum yapılmamış
            </div>
          ) : reviews.map(r => (
            <div key={r.id} className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500 text-[11px] font-bold">{r.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-gray-800 text-[13px] font-semibold">{r.name}</p>
                    <p className="text-gray-400 text-[11px]">{r.date}</p>
                  </div>
                </div>
                <Stars rating={r.rating} size={11} />
              </div>
              <p className="text-gray-600 text-[13px] leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Sepet / CTA ── */}
      {restaurant.isOpen && totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
          <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3">
            <button className="w-full bg-gray-900 text-white font-semibold text-[13px] py-4 rounded-2xl active:scale-95 transition-transform flex items-center justify-between px-5">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-[11px] font-bold">{totalItems}</span>
              </div>
              <span>Sepeti Görüntüle</span>
              <span className="font-bold">{totalPrice}₺</span>
            </button>
          </div>
        </div>
      )}

      {restaurant.isOpen && totalItems === 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
          <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3 flex gap-2">
            <button
              onClick={() => navigate(`/rezervasyon/${restaurant.id}`)}
              className="flex-1 border border-gray-200 text-gray-700 font-semibold text-[13px] py-3.5 rounded-2xl active:scale-95 transition-transform"
            >
              Rezervasyon
            </button>
            <button className="flex-1 bg-gray-900 text-white font-semibold text-[13px] py-3.5 rounded-2xl active:scale-95 transition-transform">
              Sipariş Ver
            </button>
          </div>
        </div>
      )}

      {!restaurant.isOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
          <div className="w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-3">
            <button
              onClick={() => navigate(`/rezervasyon/${restaurant.id}`)}
              className="w-full bg-gray-900 text-white font-semibold text-[13px] py-3.5 rounded-2xl active:scale-95 transition-transform"
            >
              Rezervasyon Yap
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
