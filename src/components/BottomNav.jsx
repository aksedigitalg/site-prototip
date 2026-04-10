import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, Compass, MessageCircle, LayoutGrid, X, Clock, TrendingUp, ChevronRight } from 'lucide-react'
import {
  SON_ARAMALAR as INITIAL_SON,
  POPULER_ARAMALAR,
  ARAMA_SONUCLARI,
  KATEGORI_FILTRELERI,
} from '../data/mockSearch'

const TIP_EMOJI = {
  restoran: '🍽️', hizmet: '🔧', emlak: '🏠', vasita: '🚗',
  ikinciel: '📦', etkinlik: '🎉', magaza: '🛍️', yer: '📍',
}

const SHEET_KATEGORILER = [
  { path: '/food' },
  { path: '/food' },
  { path: '/services' },
  { path: '/ilanlar' },
  { path: '/etkinlikler' },
  { path: '/is-ilanlari' },
  { path: '/oteller' },
  { path: '/campaigns' },
]

function getActive(pathname) {
  if (pathname === '/search')    return 'search'
  if (pathname === '/gebzem-ai') return 'ai'
  if (pathname === '/explore')   return 'explore'
  if (pathname.startsWith('/mesajlarim') || pathname.startsWith('/mesaj/')) return 'messages'
  if (
    pathname === '/profile' || pathname === '/pro' ||
    pathname.startsWith('/rezervasyonlarim') || pathname.startsWith('/randevularim') ||
    pathname.startsWith('/tekliflerim') || pathname.startsWith('/ilanlarim')
  ) return 'profile'
  return 'home'
}

function shouldShow(pathname) {
  if (pathname.startsWith('/isletme')) return false
  if (pathname.startsWith('/admin'))   return false
  if (pathname.startsWith('/sosyal'))  return false
  if (pathname.startsWith('/mesaj/'))  return false
  const hidden = ['/login', '/register', '/onboarding', '/forgot-password', '/reset-otp', '/new-password', '/']
  return !hidden.includes(pathname)
}

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  // ── Ortak sheet state ──
  const [activeSheet, setActiveSheet] = useState(null) // 'kategori' | 'search' | null
  const [sheetVisible, setSheetVisible] = useState(false)
  const [dragY, setDragY] = useState(0)
  const dragStart = useRef(null)
  const scrollRef = useRef(null)
  const savedScrollY = useRef(0)

  // ── Search state ──
  const [query, setQuery] = useState('')
  const [aktifFiltre, setAktifFiltre] = useState('Tümü')
  const [sonAramalar, setSonAramalar] = useState(INITIAL_SON)
  const searchInputRef = useRef(null)

  function openSheetGeneric(type) {
    savedScrollY.current = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollY.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    setActiveSheet(type)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSheetVisible(true))
    })
  }

  function openSheet() { openSheetGeneric('kategori') }
  function openSearchSheet() {
    openSheetGeneric('search')
    setTimeout(() => searchInputRef.current?.focus(), 350)
  }

  const closeAnySheet = useCallback(() => {
    setSheetVisible(false)
    setDragY(0)
    setTimeout(() => {
      setActiveSheet(null)
      setQuery('')
      setAktifFiltre('Tümü')
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      window.scrollTo(0, savedScrollY.current)
    }, 300)
  }, [])

  useEffect(() => {
    const handler = () => openSearchSheet()
    window.addEventListener('open-search-sheet', handler)
    return () => window.removeEventListener('open-search-sheet', handler)
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
      closeAnySheet()
    } else {
      setDragY(0)
    }
    dragStart.current = null
  }

  // ── Search helpers ──
  function aramaYap(metin) {
    setQuery(metin)
    if (metin && !sonAramalar.includes(metin)) {
      setSonAramalar(prev => [metin, ...prev].slice(0, 6))
    }
  }

  const lower = query.toLowerCase()
  const filtrelenmis = ARAMA_SONUCLARI.filter(s => {
    const eslesme = s.isim.toLowerCase().includes(lower) || s.aciklama?.toLowerCase().includes(lower)
    if (!eslesme) return false
    if (aktifFiltre === 'Tümü') return true
    if (aktifFiltre === 'Restoran') return s.tipLabel === 'Restoran'
    if (aktifFiltre === 'Hizmet')   return s.tipLabel === 'Hizmet'
    if (aktifFiltre === 'Emlak')    return s.tipLabel === 'Emlak'
    if (aktifFiltre === 'Araç')     return s.tipLabel === 'Araç'
    if (aktifFiltre === 'Etkinlik') return s.tipLabel === 'Etkinlik'
    if (aktifFiltre === 'Mağaza')   return s.tipLabel === 'Mağaza'
    return true
  })

  if (!shouldShow(location.pathname)) return null

  const active = getActive(location.pathname)

  return (
    <>
      <nav className="fixed z-50 flex justify-center" style={{ bottom: 0, left: 0, right: 0 }}>
        <div className="w-full max-w-[430px] flex items-center justify-between" style={{ borderRadius: '15px 15px 0 0', padding: '10px 20px', background: '#000000' }}>

          <button onClick={() => navigate('/home')} className="flex items-center justify-center" style={{ width: 44, height: 44 }}>
            <Home size={24} strokeWidth={2} className={active === 'home' ? 'text-white' : 'text-gray-400'} />
          </button>

          <button onClick={openSearchSheet} className="flex items-center justify-center" style={{ width: 44, height: 44 }}>
            <Search size={24} strokeWidth={2} className="text-gray-400" />
          </button>

          <button onClick={openSheet} className="flex items-center justify-center" style={{ width: 44, height: 44 }}>
            <LayoutGrid size={24} strokeWidth={2} className="text-gray-400" />
          </button>

          <button onClick={() => navigate('/explore')} className="flex items-center justify-center" style={{ width: 44, height: 44 }}>
            <Compass size={24} strokeWidth={2} className={active === 'explore' ? 'text-white' : 'text-gray-400'} />
          </button>

          <button onClick={() => navigate('/mesajlarim')} className="relative flex items-center justify-center" style={{ width: 44, height: 44 }}>
            <MessageCircle size={24} strokeWidth={2} className={active === 'messages' ? 'text-white' : 'text-gray-400'} />
            <div className="absolute" style={{ top: 8, right: 8, width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
          </button>

          <button onClick={() => navigate('/profile')} className="flex items-center justify-center" style={{ width: 44, height: 44 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: active === 'profile' ? '#ffffff' : '#e5e7eb',
            }} />
          </button>

        </div>
      </nav>

      {/* ══ Sheet (Kategori / Search / Explore) ══ */}
      {activeSheet && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div
            className="absolute inset-0"
            style={{ background: `rgba(0,0,0,${sheetVisible ? 0.4 : 0})`, transition: 'background 0.3s ease' }}
            onClick={closeAnySheet}
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

            {/* ── Kategori İçeriği ── */}
            {activeSheet === 'kategori' && (
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-8">
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => { closeAnySheet(); navigate('/gebzem-ai') }}
                    className="rounded-2xl active:scale-95 transition-transform"
                    style={{ height: 100, background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 55%, #EC4899 100%)' }}
                  />
                  {SHEET_KATEGORILER.map(({ path }, i) => (
                    <button
                      key={i}
                      onClick={() => { closeAnySheet(); navigate(path) }}
                      className="rounded-2xl bg-white active:scale-95 transition-transform"
                      style={{ height: 100 }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Search İçeriği ── */}
            {activeSheet === 'search' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Arama input */}
                <div style={{ padding: '0 16px 12px' }}>
                  <div className="flex items-center gap-2 bg-white rounded-2xl px-4" style={{ height: 44 }}>
                    <Search size={16} strokeWidth={2} className="text-gray-400 shrink-0" />
                    <input
                      ref={searchInputRef}
                      value={query}
                      onChange={e => aramaYap(e.target.value)}
                      placeholder="Ne arıyorsun?"
                      className="flex-1 bg-transparent text-gray-800 text-sm outline-none placeholder-gray-400"
                    />
                    {query.length > 0 && (
                      <button onClick={() => setQuery('')}>
                        <X size={16} strokeWidth={2.5} className="text-gray-400" />
                      </button>
                    )}
                  </div>

                  {/* Kategori filtreler */}
                  {query.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', marginTop: 10 }}>
                      {KATEGORI_FILTRELERI.map(f => (
                        <button
                          key={f}
                          onClick={() => setAktifFiltre(f)}
                          className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                          style={{
                            background: aktifFiltre === f ? '#111827' : '#ffffff',
                            color: aktifFiltre === f ? 'white' : '#6b7280',
                          }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sonuçlar */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ padding: '0 16px 24px' }}>
                  {query.length === 0 ? (
                    <div>
                      {/* Son aramalar */}
                      {sonAramalar.length > 0 && (
                        <div style={{ marginBottom: 24 }}>
                          <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                            <h3 className="text-gray-800 text-sm font-semibold">Son Aramalar</h3>
                            <button onClick={() => setSonAramalar([])} className="text-gray-400 text-xs">Temizle</button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {sonAramalar.map(s => (
                              <div key={s} className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5">
                                <Clock size={12} strokeWidth={1.5} className="text-gray-400" />
                                <button onClick={() => aramaYap(s)} className="text-gray-700 text-xs font-medium">{s}</button>
                                <button onClick={() => setSonAramalar(prev => prev.filter(x => x !== s))}>
                                  <X size={11} strokeWidth={2} className="text-gray-400" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Popüler aramalar */}
                      <div>
                        <h3 className="text-gray-800 text-sm font-semibold" style={{ marginBottom: 12 }}>Popüler Aramalar</h3>
                        <div className="flex flex-wrap gap-2">
                          {POPULER_ARAMALAR.map(s => (
                            <button
                              key={s}
                              onClick={() => aramaYap(s)}
                              className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 active:bg-gray-100 transition-colors"
                            >
                              <TrendingUp size={12} strokeWidth={1.5} className="text-gray-500" />
                              <span className="text-gray-700 text-xs font-medium">{s}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : filtrelenmis.length === 0 ? (
                    <div className="flex flex-col items-center justify-center pt-20 text-center">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center" style={{ marginBottom: 16 }}>
                        <Search size={28} strokeWidth={1.5} className="text-gray-400" />
                      </div>
                      <p className="text-gray-800 text-base font-bold" style={{ marginBottom: 4 }}>Sonuç bulunamadı</p>
                      <p className="text-gray-400 text-sm">"{query}" için eşleşme yok.</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-400 text-xs" style={{ marginBottom: 12 }}>{filtrelenmis.length} sonuç bulundu</p>
                      <div className="flex flex-col divide-y divide-gray-200/50">
                        {filtrelenmis.map(s => (
                          <button
                            key={s.id}
                            onClick={() => { closeAnySheet(); navigate(s.path) }}
                            className="flex items-center gap-3 active:bg-white/50 transition-colors"
                            style={{ padding: '14px 0' }}
                          >
                            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0 text-lg">
                              {TIP_EMOJI[s.tip] || '📍'}
                            </div>
                            <div className="flex-1 text-left min-w-0">
                              <p className="text-gray-800 text-sm font-semibold truncate">{s.isim}</p>
                              <p className="text-gray-400 text-xs truncate">{s.aciklama}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-gray-500">{s.tipLabel}</span>
                              {s.puan && <span className="text-yellow-500 text-[11px] font-bold">★ {s.puan}</span>}
                              {s.mesafe && !s.puan && <span className="text-gray-400 text-[11px]">{s.mesafe}</span>}
                            </div>
                            <ChevronRight size={16} strokeWidth={1.5} className="text-gray-300 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  )
}
