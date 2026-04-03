import { useNavigate } from 'react-router-dom'
import { LogOut, ChevronRight, User, Phone, Lock } from 'lucide-react'
import BottomNav from '../components/BottomNav'

export default function Profile() {
  const navigate = useNavigate()
  const raw = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

  function handleLogout() {
    localStorage.removeItem('sehir_session')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <span className="text-gray-800 text-base font-bold">Profil</span>
          <button onClick={handleLogout} className="text-gray-400">
            <LogOut size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="pt-16 pb-24 px-4">

        {/* Avatar */}
        <div className="flex flex-col items-center pt-8 pb-6">
          <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-3 shadow-sm">
            <span className="text-gray-700 text-2xl font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          <h1 className="text-gray-900 text-lg font-bold">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-400 text-sm mt-1">+90 {user?.phone}</p>
        </div>

        {/* Bilgiler */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-50">
          {[
            { icon: User,  label: 'Ad Soyad', value: `${user?.firstName} ${user?.lastName}` },
            { icon: Phone, label: 'Telefon',  value: `+90 ${user?.phone}` },
            { icon: Lock,  label: 'Şifre',    value: '••••••••' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-4">
              <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Icon size={15} strokeWidth={1.5} className="text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs">{label}</p>
                <p className="text-gray-800 text-sm font-medium truncate">{value}</p>
              </div>
              <ChevronRight size={14} strokeWidth={1.5} className="text-gray-300" />
            </div>
          ))}
        </div>

        {/* Çıkış */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm flex items-center gap-3 text-left active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            <LogOut size={15} strokeWidth={1.5} className="text-gray-600" />
          </div>
          <span className="text-gray-700 text-sm font-medium">Çıkış Yap</span>
        </button>

      </div>

      <BottomNav active="profile" />
    </div>
  )
}
