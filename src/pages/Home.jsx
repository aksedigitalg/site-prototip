import { useNavigate } from 'react-router-dom'
import { MapPin, LogOut } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()
  const raw = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

  function handleLogout() {
    localStorage.removeItem('sehir_user')
    sessionStorage.removeItem('sehir_phone')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12">
      {/* Top bar */}
      <div className="flex items-center justify-between pt-4 mb-10">
        <div className="flex items-center gap-2">
          <MapPin size={18} strokeWidth={1.5} className="text-gray-400" />
          <span className="text-gray-400 text-sm font-medium">İstanbul</span>
        </div>
        <button onClick={handleLogout} className="text-gray-300">
          <LogOut size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Greeting */}
      <div className="mb-10">
        <p className="text-gray-400 text-sm font-medium mb-1">Merhaba 👋</p>
        <h1 className="text-gray-900 text-3xl font-bold">
          {user ? `${user.firstName} ${user.lastName}` : 'Hoş Geldin'}
        </h1>
      </div>

      {/* Placeholder card */}
      <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
        <p className="text-gray-400 text-sm leading-relaxed">
          Şehrin nabzı burada atıyor. Yakında daha fazla özellik geliyor...
        </p>
      </div>
    </div>
  )
}
