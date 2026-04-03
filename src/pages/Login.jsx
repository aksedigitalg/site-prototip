import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Phone, Lock, Eye, EyeOff, Building2, ShieldCheck } from 'lucide-react'

export default function Login() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function formatPhone(val) {
    const digits = val.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`
  }

  const normalize = (p) => p.replace(/\D/g, '').replace(/^0+/, '')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const raw = localStorage.getItem('sehir_user')
    if (!raw) { setError('Kayıtlı kullanıcı bulunamadı'); return }
    const user = JSON.parse(raw)
    if (normalize(user.phone) !== normalize(phone)) { setError('Telefon veya şifre hatalı'); return }
    if (user.password !== password) { setError('Telefon veya şifre hatalı'); return }
    localStorage.setItem('sehir_session', '1')
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 py-12">
      <div className="pt-8 mb-10">
        <h1 className="text-gray-900 text-2xl font-bold">Hoş Geldin</h1>
        <p className="text-gray-400 text-sm mt-1">Hesabına giriş yap</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Telefon */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Telefon</label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <Phone size={16} strokeWidth={1.5} className="text-gray-400 mr-2 shrink-0" />
            <span className="text-gray-400 text-sm mr-1">+90</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="(5XX) XXX XXXX"
              className="flex-1 py-4 text-gray-900 text-base outline-none bg-transparent"
              inputMode="numeric"
            />
          </div>
        </div>

        {/* Şifre */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Şifre</label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <Lock size={16} strokeWidth={1.5} className="text-gray-400 mr-2 shrink-0" />
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifren"
              className="flex-1 py-4 text-gray-900 text-base outline-none bg-transparent"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-300 ml-2">
              {showPass ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Şifremi unuttum */}
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-gray-400 text-sm">
            Şifremi Unuttum
          </Link>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={!phone || !password}
          className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl shadow-sm active:scale-95 transition-transform disabled:opacity-30 disabled:scale-100 mt-2"
        >
          Giriş Yap
        </button>
      </form>

      <p className="text-gray-400 text-sm text-center mt-8">
        Hesabın yok mu?{' '}
        <Link to="/register" className="text-gray-900 font-semibold">
          Kayıt Ol
        </Link>
      </p>

      {/* Ayırıcı */}
      <div className="flex items-center gap-3 mt-8">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-gray-300 text-xs">veya</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* İşletme girişi */}
      <button
        onClick={() => navigate('/isletme/login')}
        className="w-full flex items-center justify-center gap-2 mt-4 border border-gray-200 rounded-2xl py-3.5 text-gray-700 text-sm font-semibold active:bg-gray-50 transition-colors"
      >
        <Building2 size={16} strokeWidth={1.5} />
        İşletme Girişi
      </button>

      {/* Admin girişi */}
      <button
        onClick={() => navigate('/admin/login')}
        className="w-full flex items-center justify-center gap-2 mt-3 py-3 text-gray-300 text-xs font-medium active:text-gray-500 transition-colors"
      >
        <ShieldCheck size={13} strokeWidth={1.5} />
        Admin Girişi
      </button>

    </div>
  )
}
