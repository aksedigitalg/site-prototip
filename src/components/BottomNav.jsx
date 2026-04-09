import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home, Search, Sparkles, Compass, MessageCircle, X, ChevronRight, LayoutGrid,
  UtensilsCrossed, Wrench, Tag, Calendar, Briefcase, Hotel, Car, Map, Target,
} from 'lucide-react'

const SHEET_KATEGORILER = [
  { icon: UtensilsCrossed, label: 'Yemek',          path: '/food' },
  { icon: UtensilsCrossed, label: 'Restoran',       path: '/food' },
  { icon: Wrench,          label: 'Hizmetler',      path: '/services' },
  { icon: Tag,             label: 'İlanlar',         path: '/ilanlar' },
  { icon: Calendar,        label: 'Etkinlikler',    path: '/etkinlikler' },
  { icon: Briefcase,       label: 'İş İlanları',    path: '/is-ilanlari' },
  { icon: Hotel,           label: 'Otel',           path: '/oteller' },
  { icon: Map,             label: 'Keşfet',         path: '/explore' },
  { icon: Target,          label: 'Kampanyalar',    path: '/campaigns' },
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
  const [sheetMounted, setSheetMounted] = useState(false)
  const [sheetVisible, setSheetVisible] = useState(false)
  const [dragY, setDragY] = useState(0)
  const dragStart = useRef(null)
  const scrollRef = useRef(null)
  const savedScrollY = useRef(0)

  function openSheet() {
    savedScrollY.current = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollY.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    setSheetMounted(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSheetVisible(true))
    })
  }

  const closeSheet = useCallback(() => {
    setSheetVisible(false)
    setDragY(0)
    setTimeout(() => {
      setSheetMounted(false)
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      window.scrollTo(0, savedScrollY.current)
    }, 300)
  }, [])

  function onTouchStart(e) {
    const el = scrollRef.current
    if (el && el.scrollTop > 0) return
    dragStart.current = e.touches[0].clientY
  }
  function onTouchMove(e) {
    if (dragStart.current === null) return
    const diff = e.touches[0].clientY - dragStart.current
    if (diff > 0) {
      setDragY(diff)
      e.preventDefault()
    } else {
      dragStart.current = null
      setDragY(0)
    }
  }
  function onTouchEnd() {
    if (dragY > 80) {
      closeSheet()
    } else {
      setDragY(0)
    }
    dragStart.current = null
  }

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

          <button onClick={openSheet} className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 9999 }}>
            <LayoutGrid size={24} strokeWidth={2} className="text-gray-400" />
          </button>

          <button onClick={() => navigate('/explore')} className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 9999, background: active === 'explore' ? '#111827' : 'transparent' }}>
            <Compass size={24} strokeWidth={2} className={active === 'explore' ? 'text-white' : 'text-gray-400'} />
          </button>

          <button onClick={() => navigate('/mesajlarim')} className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 9999 }}>
            <MessageCircle size={24} strokeWidth={2} className="text-gray-400" />
          </button>

          <button onClick={() => navigate('/profile')} className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 9999 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              border: active === 'profile' ? '2px solid #111827' : '2px solid transparent',
              background: '#e5e7eb',
            }} />
          </button>

        </div>
      </nav>

      {/* Kategori + AI Sheet */}
      {sheetMounted && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div
            className="absolute inset-0"
            style={{ background: `rgba(0,0,0,${sheetVisible ? 0.4 : 0})`, transition: 'background 0.3s ease' }}
            onClick={closeSheet}
          />
          <div
            className="relative rounded-t-3xl z-10 flex flex-col"
            style={{
              height: '98vh',
              background: '#f5f6f8',
              transform: `translateY(${sheetVisible ? dragY : window.innerHeight}px)`,
              transition: dragY > 0 ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >

            {/* Çentik */}
            <div className="flex justify-center pt-3 pb-4 shrink-0">
              <div className="w-10 h-1.5 rounded-full bg-gray-300" />
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-8">

              {/* GebzemAI — en üstte */}
              <button
                onClick={() => { closeSheet(); navigate('/gebzem-ai') }}
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
                {SHEET_KATEGORILER.map(({ icon: Icon, label, path }) => (
                  <button
                    key={label}
                    onClick={() => { closeSheet(); navigate(path) }}
                    className="flex flex-col items-center justify-center gap-3 py-5 rounded-2xl bg-white active:scale-95 transition-transform"
                  >
                    <Icon size={28} strokeWidth={1.5} className="text-gray-700" />
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
