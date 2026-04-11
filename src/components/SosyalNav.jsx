import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, PenSquare, Heart, User } from 'lucide-react'

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
    { key: 'kesfet', icon: Search, path: '/sosyal/kesfet' },
    { key: 'paylasim', icon: PenSquare, path: '/sosyal/paylasim' },
    { key: 'bildirimler', icon: Heart, path: '/sosyal/bildirimler' },
    { key: 'profil', icon: User, path: '/sosyal/profil/ben' },
  ]

  return (
    <nav className="fixed z-50 flex justify-center" style={{ bottom: 25, left: 0, right: 0 }}>
      <div className="flex items-center justify-between" style={{ borderRadius: 9999, padding: '10px 15px', background: '#000000', width: 'calc(100% - 120px)', maxWidth: 310 }}>
        {tabs.map(({ key, icon: Icon, path }) => (
          <button
            key={key}
            onClick={() => navigate(path)}
            className="flex items-center justify-center"
            style={{ width: 44, height: 44 }}
          >
            <Icon size={24} strokeWidth={active === key ? 2.5 : 1.8} className={active === key ? 'text-white' : 'text-gray-600'} />
          </button>
        ))}
      </div>
    </nav>
  )
}
