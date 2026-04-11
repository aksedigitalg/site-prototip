import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Star, Clock, MapPin, Phone,
  ShoppingBag, MessageSquare, Info, X,
} from 'lucide-react'
import { RESTAURANTS, MENUS, REVIEWS, RESTAURANT_INFO } from '../data/mockFood'

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
  const [activeSection, setActiveSection] = useState(0)
  const [activeTab, setActiveTab] = useState('menu')
  const [cart, setCart] = useState({})
  const [infoOpen, setInfoOpen] = useState(false)
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
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
          >
            <ArrowLeft size={18} strokeWidth={2} className="text-white" />
          </button>
          <button
            onClick={() => setInfoOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
          >
            <Info size={16} strokeWidth={2} className="text-white" />
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
        </div>
      </div>


      {/* ── Tabs ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 flex">
        {[
          { key: 'menu', label: 'Menü' },
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
                        <div className="w-14 h-14 rounded-xl bg-gray-100 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-800 text-[13px] font-semibold">{item.name}</p>
                          <p className="text-gray-400 text-[11px] mt-0.5 line-clamp-1">{item.desc}</p>
                          <p className="text-gray-900 text-[13px] font-bold mt-1">{item.price} TL</p>
                        </div>
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

      {/* ── HAKKINDA POPUP ── */}
      {infoOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setInfoOpen(false)} />
          <div className="relative bg-white rounded-t-3xl z-10">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1.5 rounded-full bg-gray-300" />
            </div>
            <div className="flex items-center justify-between px-5 pb-3">
              <h3 className="text-gray-900 text-base font-bold">Hakkında</h3>
              <button onClick={() => setInfoOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>
            <div className="px-5 pb-10 space-y-2">
              {info && [
                { icon: MapPin, label: 'Adres', value: info.address },
                { icon: Clock, label: 'Çalışma Saatleri', value: info.hours },
                { icon: Phone, label: 'Telefon', value: info.phone },
                { icon: ShoppingBag, label: 'Min. Sipariş', value: info.minOrder },
                { icon: Clock, label: 'Teslimat Süresi', value: info.deliveryTime },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <Icon size={16} strokeWidth={1.5} className="text-gray-400 shrink-0" />
                  <div>
                    <p className="text-gray-400 text-[11px]">{label}</p>
                    <p className="text-gray-800 text-[13px] font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

    </div>
  )
}
