import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Compass, PlusSquare, Heart, User } from 'lucide-react'

function getActive(pathname) {
  if (pathname === '/sosyal') return 'feed'
  if (pathname === '/sosyal/kesfet') return 'kesfet'
  if (pathname === '/sosyal/paylasim') return 'paylasim'
  if (pathname === '/sosyal/bildirimler') return 'bildirimler'
  if (pathname.startsWith('/sosyal/profil')) return 'profil'
  return 'feed'
}

export default function SosyalNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const active = getActive(pathname)

  const tabs = [
    { key: 'feed', icon: Home, path: '/sosyal' },
    { key: 'kesfet', icon: Compass, path: '/sosyal/kesfet' },
    { key: 'paylasim', icon: PlusSquare, path: '/sosyal/paylasim' },
    { key: 'bildirimler', icon: Heart, path: '/sosyal/bildirimler' },
    { key: 'profil', icon: User, path: '/sosyal/profil/ben' },
  ]

  return (
    <nav className="fixed z-50 flex justify-center" style={{ bottom: 20, left: 0, right: 0 }}>
      <div
        className="bg-white/85 backdrop-blur-md flex items-center justify-center gap-[6px]"
        style={{ borderRadius: 9999, padding: '8px 8px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}
      >
        {tabs.map(({ key, icon: Icon, path }) => (
          <button
            key={key}
            onClick={() => navigate(path)}
            className="flex items-center justify-center"
            style={{ width: 44, height: 44, borderRadius: 9999, background: active === key ? '#111827' : 'transparent' }}
          >
            <Icon size={24} strokeWidth={2} className={active === key ? 'text-white' : 'text-gray-400'} />
          </button>
        ))}
      </div>
    </nav>
  )
}
