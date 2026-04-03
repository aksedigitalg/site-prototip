import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, Compass, Tag, User } from 'lucide-react'

const items = [
  { icon: Home,    label: 'Anasayfa',    path: '/home',      key: 'home' },
  { icon: Search,  label: 'Arama',       path: '/search',    key: 'search' },
  { icon: Compass, label: 'Keşfet',      path: '/explore',   key: 'explore' },
  { icon: Tag,     label: 'Kampanyalar', path: '/campaigns', key: 'campaigns' },
  { icon: User,    label: 'Profil',      path: '/profile',   key: 'profile' },
]

function getActive(pathname) {
  if (pathname === '/search')   return 'search'
  if (pathname === '/explore')  return 'explore'
  if (pathname === '/campaigns') return 'campaigns'
  if (
    pathname === '/profile' || pathname === '/pro' ||
    pathname.startsWith('/rezervasyonlarim') || pathname.startsWith('/randevularim') ||
    pathname.startsWith('/tekliflerim') || pathname.startsWith('/mesajlarim') ||
    pathname.startsWith('/mesaj/')
  ) return 'profile'
  // Tüm diğer kullanıcı sayfaları → home aktif
  return 'home'
}

function shouldShow(pathname) {
  if (pathname.startsWith('/isletme')) return false
  if (pathname.startsWith('/admin'))   return false
  const hiddenExact = ['/login', '/register', '/onboarding', '/forgot-password', '/reset-otp', '/new-password', '/']
  return !hiddenExact.includes(pathname)
}

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  if (!shouldShow(location.pathname)) return null

  const active = getActive(location.pathname)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border border-gray-100 rounded-t-[10px] px-2 pb-6 pt-2 flex items-center justify-around">
        {items.map(({ icon: Icon, label, path, key }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 px-3 py-1"
            >
              <Icon
                size={22}
                strokeWidth={1.5}
                className={isActive ? 'text-gray-900' : 'text-gray-400'}
              />
              <span className={`text-xs ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-400 font-medium'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
