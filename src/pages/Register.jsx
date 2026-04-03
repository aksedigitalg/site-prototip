import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function formatPhone(val) {
    const digits = val.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`
  }

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.firstName.trim()) { setError('Ad boş olamaz'); return }
    if (!form.lastName.trim()) { setError('Soyad boş olamaz'); return }
    if (form.phone.replace(/\D/g, '').length < 10) { setError('Geçerli bir telefon numarası gir'); return }
    if (form.password.length < 4) { setError('Şifre en az 4 karakter olmalı'); return }
    const user = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.replace(/\D/g, '').replace(/^0+/, ''),
      password: form.password,
    }
    localStorage.setItem('sehir_user', JSON.stringify(user))
    localStorage.setItem('sehir_session', '1')
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 py-12 overflow-y-auto">
      <div className="pt-8 mb-8">
        <h1 className="text-gray-900 text-2xl font-bold">Hesap Oluştur</h1>
        <p className="text-gray-400 text-sm mt-1">Bilgilerini girerek kayıt ol</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Ad */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Ad</label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => set('firstName', e.target.value)}
            placeholder="Adın"
            className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-gray-900 text-base outline-none bg-gray-50 focus:border-gray-400 focus:bg-white transition-all shadow-sm"
          />
        </div>

        {/* Soyad */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Soyad</label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => set('lastName', e.target.value)}
            placeholder="Soyadın"
            className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-gray-900 text-base outline-none bg-gray-50 focus:border-gray-400 focus:bg-white transition-all shadow-sm"
          />
        </div>

        {/* Telefon */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Telefon</label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <span className="text-gray-400 text-sm mr-1">+90</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set('phone', formatPhone(e.target.value))}
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
            <input
              type={showPass ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              placeholder="En az 4 karakter"
              className="flex-1 py-4 text-gray-900 text-base outline-none bg-transparent"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-300 ml-2">
              {showPass ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl shadow-sm active:scale-95 transition-transform mt-2"
        >
          Kayıt Ol
        </button>
      </form>

      <p className="text-gray-400 text-sm text-center mt-8">
        Zaten hesabın var mı?{' '}
        <Link to="/login" className="text-gray-900 font-semibold">
          Giriş Yap
        </Link>
      </p>
    </div>
  )
}
