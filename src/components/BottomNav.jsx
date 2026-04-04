import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, Sparkles, Compass, User } from 'lucide-react'

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
  const hidden = ['/login', '/register', '/onboarding', '/forgot-password', '/reset-otp', '/new-password', '/']
  return !hidden.includes(pathname)
}

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  if (!shouldShow(location.pathname)) return null

  const active = getActive(location.pathname)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border border-gray-100 rounded-t-[10px] px-2 pb-6 pt-2 flex items-center justify-around">

        {/* Anasayfa */}
        <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-1 px-3 py-1">
          <Home size={22} strokeWidth={1.5} className={active === 'home' ? 'text-gray-900' : 'text-gray-400'} />
          <span className={`text-xs ${active === 'home' ? 'text-gray-900 font-semibold' : 'text-gray-400 font-medium'}`}>Anasayfa</span>
        </button>

        {/* Arama */}
        <button onClick={() => navigate('/search')} className="flex flex-col items-center gap-1 px-3 py-1">
          <Search size={22} strokeWidth={1.5} className={active === 'search' ? 'text-gray-900' : 'text-gray-400'} />
          <span className={`text-xs ${active === 'search' ? 'text-gray-900 font-semibold' : 'text-gray-400 font-medium'}`}>Arama</span>
        </button>

        {/* GebzemAI — ortada büyük daire */}
        <button
          onClick={() => navigate('/gebzem-ai')}
          className="flex items-center justify-center active:scale-90 transition-transform"
          style={{
            width: 52, height: 52,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 55%, #EC4899 100%)',
            boxShadow: '0 4px 16px rgba(147,51,234,0.35)',
            marginTop: -18,
          }}
        >
          <Sparkles size={22} strokeWidth={2} color="#fff" />
        </button>

        {/* Keşfet */}
        <button onClick={() => navigate('/explore')} className="flex flex-col items-center gap-1 px-3 py-1">
          <Compass size={22} strokeWidth={1.5} className={active === 'explore' ? 'text-gray-900' : 'text-gray-400'} />
          <span className={`text-xs ${active === 'explore' ? 'text-gray-900 font-semibold' : 'text-gray-400 font-medium'}`}>Keşfet</span>
        </button>

        {/* Profil */}
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1 px-3 py-1">
          <User size={22} strokeWidth={1.5} className={active === 'profile' ? 'text-gray-900' : 'text-gray-400'} />
          <span className={`text-xs ${active === 'profile' ? 'text-gray-900 font-semibold' : 'text-gray-400 font-medium'}`}>Profil</span>
        </button>

      </div>
    </nav>
  )
}
