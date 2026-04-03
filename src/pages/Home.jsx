import { useNavigate } from 'react-router-dom'

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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600 flex flex-col items-center justify-center px-6 text-center relative">
      {/* Logout */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 text-white/60 text-sm font-medium"
      >
        Çıkış
      </button>

      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-5xl mb-6 shadow-lg">
        👤
      </div>

      {/* Greeting */}
      <h1 className="text-white text-3xl font-bold mb-2">
        Hoş geldin{user ? `, ${user.firstName}!` : '!'}
      </h1>
      {user && (
        <p className="text-white/70 text-base">
          {user.firstName} {user.lastName}
        </p>
      )}

      {/* Card */}
      <div className="mt-10 w-full bg-white/15 backdrop-blur rounded-3xl p-6 text-left shadow-xl">
        <p className="text-white/90 text-sm leading-relaxed">
          🏙️ Şehrin nabzı burada atıyor. Yakında daha fazla özellik geliyor...
        </p>
      </div>
    </div>
  )
}
