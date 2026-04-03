import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Star, MapPin, Clock, Phone,
  Plus, Minus, ShoppingBag, Copy, MessageSquare,
} from 'lucide-react'
import {
  MAGAZALAR, URUNLER, KAMPANYALAR,
  MAGAZA_HAKKINDA, MAGAZA_YORUMLAR,
} from '../data/mockAlisveris'

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

export default function SaticiProfil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const magazaId = parseInt(id)

  const magaza   = MAGAZALAR.find(m => m.id === magazaId)
  const urunler  = URUNLER[magazaId]   || []
  const kampanya = KAMPANYALAR[magazaId] || []
  const hakkinda = MAGAZA_HAKKINDA[magazaId]
  const yorumlar = MAGAZA_YORUMLAR[magazaId] || []

  const [activeTab,  setActiveTab]  = useState('urunler')
  const [cart,       setCart]       = useState({})
  const [copiedKod,  setCopiedKod]  = useState(null)

  if (!magaza) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">Mağaza bulunamadı</p>
    </div>
  )

  function addToCart(itemId)    { setCart(c => ({ ...c, [itemId]: (c[itemId] || 0) + 1 })) }
  function removeFromCart(itemId) {
    setCart(c => {
      const n = { ...c }
      if (n[itemId] > 1) n[itemId]--
      else delete n[itemId]
      return n
    })
  }
  function copyKod(kod) {
    navigator.clipboard?.writeText(kod)
    setCopiedKod(kod)
    setTimeout(() => setCopiedKod(null), 2000)
  }

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)
  const totalPrice = Object.entries(cart).reduce((sum, [itemId, qty]) => {
    const item = urunler.find(i => i.id === parseInt(itemId))
    return sum + (item?.fiyat || 0) * qty
  }, 0)

  const avgRating = yorumlar.length > 0
    ? (yorumlar.reduce((s, r) => s + r.rating, 0) / yorumlar.length).toFixed(1)
    : magaza.puan

  const TABS = [
    { key: 'urunler',   label: 'Ürünler' },
    { key: 'kampanya',  label: `Kampanyalar${kampanya.length > 0 ? ` (${kampanya.length})` : ''}` },
    { key: 'hakkinda',  label: 'Hakkında' },
    { key: 'yorumlar',  label: `Yorumlar (${yorumlar.length})` },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-gray-800 text-base font-semibold flex-1">{magaza.name}</h1>
          {totalItems > 0 && (
            <div className="relative">
              <ShoppingBag size={22} strokeWidth={1.5} className="text-gray-700" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-bold leading-none">
                {totalItems}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Profil kartı */}
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <div className="flex gap-4 items-center">
          <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center text-4xl shrink-0">
            {magaza.logo}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-gray-900 text-base font-bold">{magaza.name}</h1>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${magaza.acik ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                {magaza.acik ? 'Açık' : 'Kapalı'}
              </span>
            </div>
            <p className="text-gray-500 text-sm">{magaza.kategori}</p>
            <div className="flex items-center gap-1 mt-1">
              <Stars rating={magaza.puan} size={13} />
              <span className="text-gray-700 text-xs font-semibold ml-1">{magaza.puan}</span>
              <span className="text-gray-400 text-xs">({magaza.yorumSayisi})</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
            <p className="text-gray-400 text-xs">Mesafe</p>
            <p className="text-gray-800 text-xs font-bold mt-0.5">{magaza.mesafe}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
            <p className="text-gray-400 text-xs">Kampanya</p>
            <p className="text-gray-800 text-xs font-bold mt-0.5">{magaza.kampanyaSayisi} aktif</p>
          </div>
          <div className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
            <p className="text-gray-400 text-xs">Ürünler</p>
            <p className="text-gray-800 text-xs font-bold mt-0.5">{urunler.length}+</p>
          </div>
        </div>
      </div>

      {/* Tabs — 4 adet */}
      <div className="sticky top-[57px] z-30 bg-white border-b border-gray-100 flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 flex-1 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap px-2 ${
              activeTab === tab.key ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── ÜRÜNLER ── */}
      {activeTab === 'urunler' && (
        <div className="px-4 pt-4 pb-32">
          {urunler.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">Ürün listesi henüz eklenmedi</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {urunler.map(item => {
                const qty = cart[item.id] || 0
                return (
                  <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex flex-col">
                    {/* Ürün görseli */}
                    <div className="w-full h-24 bg-gray-50 rounded-xl flex items-center justify-center text-4xl mb-2.5">
                      {item.emoji}
                    </div>
                    {/* İsim */}
                    <p className="text-gray-800 text-xs font-semibold leading-snug line-clamp-2 flex-1">{item.name}</p>
                    {/* Fiyat */}
                    <div className="mt-1.5 mb-2">
                      {item.eskiFiyat && (
                        <p className="text-gray-400 text-xs line-through">{item.eskiFiyat}₺</p>
                      )}
                      <p className="text-gray-900 text-sm font-extrabold">{item.fiyat}₺</p>
                    </div>
                    {/* Sepet kontrol */}
                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(item.id)}
                        className="w-full py-1.5 rounded-xl bg-gray-900 text-white text-xs font-semibold active:scale-95 transition-transform"
                      >
                        + Sepete
                      </button>
                    ) : (
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 rounded-xl bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
                        >
                          <Minus size={12} strokeWidth={2} className="text-gray-700" />
                        </button>
                        <span className="text-gray-800 text-sm font-bold">{qty}</span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="w-7 h-7 rounded-xl bg-gray-900 flex items-center justify-center active:scale-90 transition-transform"
                        >
                          <Plus size={12} strokeWidth={2} className="text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── KAMPANYALAR ── */}
      {activeTab === 'kampanya' && (
        <div className="px-4 pt-4 pb-8 space-y-3">
          {kampanya.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">Aktif kampanya bulunmuyor</p>
          ) : kampanya.map(k => (
            <div key={k.id} className="bg-white border border-dashed border-gray-300 rounded-2xl px-4 py-4 shadow-sm">
              <p className="text-gray-800 text-sm font-bold">{k.title}</p>
              <p className="text-gray-500 text-xs mt-0.5">{k.desc}</p>
              <div className="flex items-center justify-between mt-3">
                <button onClick={() => copyKod(k.kod)} className="flex items-center gap-2">
                  <span className="text-gray-600 text-xs font-mono bg-gray-50 border border-gray-200 px-3 py-1 rounded-lg">{k.kod}</span>
                  {copiedKod === k.kod
                    ? <span className="text-green-500 text-xs font-semibold">✓ Kopyalandı</span>
                    : <Copy size={13} className="text-gray-400" />}
                </button>
                <span className="text-gray-400 text-xs">{k.sonTarih}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── HAKKINDA ── */}
      {activeTab === 'hakkinda' && (
        <div className="px-4 pt-4 pb-8 space-y-3">
          {hakkinda && [
            { icon: MapPin, label: 'Adres',           value: hakkinda.adres },
            { icon: Clock,  label: 'Çalışma Saatleri',value: hakkinda.saatler },
            { icon: Phone,  label: 'Telefon',          value: hakkinda.telefon },
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

      {/* ── YORUMLAR ── */}
      {activeTab === 'yorumlar' && (
        <div className="px-4 pt-4 pb-8 space-y-3">

          {/* Özet */}
          {yorumlar.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex gap-4 items-center">
              <div className="text-center">
                <p className="text-gray-900 text-4xl font-bold">{avgRating}</p>
                <Stars rating={parseFloat(avgRating)} size={14} />
                <p className="text-gray-400 text-xs mt-1">{yorumlar.length} yorum</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5,4,3,2,1].map(star => {
                  const count = yorumlar.filter(r => r.rating === star).length
                  const pct = yorumlar.length > 0 ? (count / yorumlar.length) * 100 : 0
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
          )}

          {yorumlar.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm flex flex-col items-center gap-2">
              <MessageSquare size={28} strokeWidth={1.5} className="text-gray-300" />
              Henüz yorum yapılmamış
            </div>
          ) : yorumlar.map(r => (
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
      {magaza.acik && totalItems > 0 && (
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
    </div>
  )
}
