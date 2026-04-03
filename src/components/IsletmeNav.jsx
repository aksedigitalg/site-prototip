import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, User, CalendarCheck, MessageCircle } from 'lucide-react'

const TABS = [
  { icon: LayoutDashboard, label: 'Ana',          path: '/isletme/dashboard' },
  { icon: User,            label: 'Profilim',     path: '/isletme/profil' },
  { icon: CalendarCheck,   label: 'Rezervasyon',  path: '/isletme/rezervasyonlar' },
  { icon: MessageCircle,   label: 'Mesajlar',     path: '/isletme/mesajlar' },
]

export default function IsletmeNav() {
  const navigate  = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
      <div
        className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-t border-gray-100 flex items-center justify-around px-2 pb-6 pt-2"
        style={{ borderRadius: '10px 10px 0 0' }}
      >
        {TABS.map(({ icon: Icon, label, path }) => {
          const aktif = pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 px-4 py-1 active:scale-90 transition-transform"
            >
              <Icon size={22} strokeWidth={aktif ? 2 : 1.5} className={aktif ? 'text-gray-900' : 'text-gray-400'} />
              <span className={`text-[10px] font-semibold ${aktif ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
