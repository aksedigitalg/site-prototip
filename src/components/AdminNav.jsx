import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Building2, Settings } from 'lucide-react'

const TABS = [
  { icon: LayoutDashboard, label: 'Özet',        path: '/admin/dashboard' },
  { icon: Users,           label: 'Kullanıcılar', path: '/admin/kullanicilar' },
  { icon: Building2,       label: 'İşletmeler',   path: '/admin/isletmeler' },
  { icon: Settings,        label: 'Ayarlar',      path: '/admin/ayarlar' },
]

export default function AdminNav() {
  const navigate     = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
      <div
        className="w-full max-w-[430px] bg-gray-900 flex items-center justify-around px-2 pb-6 pt-2"
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
              <Icon size={22} strokeWidth={aktif ? 2 : 1.5} className={aktif ? 'text-white' : 'text-gray-500'} />
              <span className={`text-[10px] font-semibold ${aktif ? 'text-white' : 'text-gray-500'}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
