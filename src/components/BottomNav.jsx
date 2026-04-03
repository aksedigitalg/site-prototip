import { useNavigate } from 'react-router-dom'
import { Home, Search, Compass, Tag, User } from 'lucide-react'

const items = [
  { icon: Home,    label: 'Anasayfa',   path: '/home',      key: 'home' },
  { icon: Search,  label: 'Arama',      path: '/search',    key: 'search' },
  { icon: Compass, label: 'Keşfet',     path: '/explore',   key: 'explore' },
  { icon: Tag,     label: 'Kampanyalar',path: '/campaigns', key: 'campaigns' },
  { icon: User,    label: 'Profil',     path: '/profile',   key: 'profile' },
]

export default function BottomNav({ active }) {
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-t border-gray-100 px-2 pb-2 pt-2 flex items-center justify-around">
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
