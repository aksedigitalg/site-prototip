import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, Sparkles, Compass, MessageCircle, X, ChevronRight, LayoutGrid } from 'lucide-react'

const SHEET_KATEGORILER = [
  { emoji: '🍜', label: 'Yemek',          path: '/food',          renk: '#fff7ed' },
  { emoji: '🍽️', label: 'Restoran',       path: '/food',          renk: '#fff7ed' },
  { emoji: '🛍️', label: 'Alışveriş',      path: '/alisveris',     renk: '#eff6ff' },
  { emoji: '🔧', label: 'Hizmetler',      path: '/services',      renk: '#f0fdf4' },
  { emoji: '🏠', label: 'İlanlar',         path: '/ilanlar',       renk: '#fdf4ff' },
  { emoji: '🎭', label: 'Etkinlikler',    path: '/etkinlikler',   renk: '#fef9c3' },
  { emoji: '💼', label: 'İş İlanları',    path: '/is-ilanlari',   renk: '#f0f9ff' },
  { emoji: '🏨', label: 'Otel',           path: '/oteller',       renk: '#fef2f2' },
  { emoji: '🚗', label: 'Araç Kiralama',  path: '/arac-kiralama', renk: '#f5f3ff' },
  { emoji: '🗺️', label: 'Keşfet',         path: '/explore',       renk: '#ecfdf5' },
  { emoji: '🎯', label: 'Kampanyalar',    path: '/campaigns',     renk: '#fff1f2' },
]

function getActive(pathname) {
  if (pathname === '/search')    return 'search'
  if (pathname === '/gebzem-ai') return 'ai'
  if (pathname === '/explore')   return 'explore'
  if (
    pathname === '/profile' || pathname === '/pro' ||
    pathname.startsWith('/rezervasyonlarim') || pathname.startsWith('/randevularim') ||
    pathname.startsWith('/tekliflerim') || pathname.startsWith('/mesajlarim') ||
    pathname.startsWith('/mesaj/') || pathname.startsWith('/ilanlarim')
  ) return 'profile'
  return 'home'
}

function shouldShow(pathname) {
  if (pathname.startsWith('/isletme')) return false
  if (pathname.startsWith('/admin'))   return false
  if (pathname.startsWith('/sosyal'))  return false
  const hidden = ['/login', '/register', '/onboarding', '/forgot-password', '/reset-otp', '/new-password', '/']
  return !hidden.includes(pathname)
}

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sheet, setSheet] = useState(false)

  if (!shouldShow(location.pathname)) return null

  const active = getActive(location.pathname)

  return (
    <>
      <nav className="fixed z-50 flex justify-center" style={{ bottom: 20, left: 0, right: 0 }}>
        <div className="bg-white/85 backdrop-blur-md flex items-center justify-center gap-[6px]" style={{ borderRadius: 9999, padding: '8px 8px', position: 'relative', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>

          <button onClick={() => navigate('/home')} className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 9999, background: active === 'home' ? '#111827' : 'transparent' }}>
            <Home size={24} strokeWidth={2} className={active === 'home' ? 'text-white' : 'text-gray-400'} />
          </button>

          <button onClick={() => navigate('/search')} className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 9999, background: active === 'search' ? '#111827' : 'transparent' }}>
            <Search size={24} strokeWidth={2} className={active === 'search' ? 'text-white' : 'text-gray-400'} />
          </button>

          <button onClick={() => setSheet(true)} className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 9999 }}>
            <LayoutGrid size={24} strokeWidth={2} className="text-gray-400" />
          </button>

          <button onClick={() => navigate('/explore')} className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 9999, background: active === 'explore' ? '#111827' : 'transparent' }}>
            <Compass size={24} strokeWidth={2} className={active === 'explore' ? 'text-white' : 'text-gray-400'} />
          </button>

          <button onClick={() => navigate('/mesajlarim')} className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 9999 }}>
            <MessageCircle size={24} strokeWidth={2} className="text-gray-400" />
          </button>

          <button onClick={() => navigate('/profile')} className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 9999 }}>
            <img
              src="https://images.pexels.com/photos/19760873/pexels-photo-19760873.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Profil"
              style={{
                width: 32, height: 32, borderRadius: '50%', objectFit: 'cover',
                border: active === 'profile' ? '2px solid #111827' : '2px solid transparent',
              }}
            />
          </button>

        </div>
      </nav>

      {/* Kategori + AI Sheet */}
      {sheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSheet(false)} />
          <div className="relative bg-white rounded-t-3xl z-10 flex flex-col" style={{ height: '80vh' }}>

            {/* iPhone çentik */}
            <div className="flex justify-center pt-3 pb-2 shrink-0">
              <div className="w-10 h-1.5 rounded-full bg-gray-300" />
            </div>

            <div className="flex items-center justify-between px-5 pb-3 shrink-0">
              <h3 className="text-gray-900 text-base font-bold">Kategoriler</h3>
              <button onClick={() => setSheet(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={16} strokeWidth={2} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-8">

              {/* GebzemAI — en üstte */}
              <button
                onClick={() => { setSheet(false); navigate('/gebzem-ai') }}
                className="w-full flex items-center gap-3 rounded-2xl px-4 py-4 mb-4 active:scale-[0.97] transition-transform"
                style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 55%, #EC4899 100%)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <Sparkles size={24} strokeWidth={2} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-bold">GebzemAI</p>
                  <p className="text-white/60 text-xs mt-0.5">Yapay zeka ile şehrini keşfet</p>
                </div>
                <ChevronRight size={16} strokeWidth={2} className="text-white/40" />
              </button>

              {/* Kategoriler grid */}
              <div className="grid grid-cols-3 gap-3">
                {SHEET_KATEGORILER.map(({ emoji, label, path, renk }) => (
                  <button
                    key={label}
                    onClick={() => { setSheet(false); navigate(path) }}
                    className="flex flex-col items-center justify-center gap-3 py-5 rounded-2xl active:scale-95 transition-transform"
                    style={{ background: renk }}
                  >
                    <span className="text-3xl">{emoji}</span>
                    <span className="text-gray-700 text-xs font-semibold text-center leading-tight px-1">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
