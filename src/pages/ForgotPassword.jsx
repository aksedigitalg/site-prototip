import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Phone } from 'lucide-react'

export default function ForgotPassword() {
  const [phone, setPhone] = useState('')
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
    if (!raw) { setError('Bu numara kayıtlı değil'); return }
    const user = JSON.parse(raw)
    if (normalize(user.phone) !== normalize(phone)) { setError('Bu numara kayıtlı değil'); return }
    sessionStorage.setItem('sehir_reset_phone', normalize(phone))
    navigate('/reset-otp')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 py-12">
      <div className="pt-4 mb-10">
        <Link to="/login" className="text-gray-400 mb-6 block">
          <ArrowLeft size={20} strokeWidth={1.5} />
        </Link>
        <h1 className="text-gray-900 text-2xl font-bold">Şifremi Unuttum</h1>
        <p className="text-gray-400 text-sm mt-1">Kayıtlı telefon numaranı gir</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={phone.replace(/\D/g, '').length < 10}
          className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl shadow-sm active:scale-95 transition-transform disabled:opacity-30 disabled:scale-100 mt-2"
        >
          Kod Gönder
        </button>
      </form>
    </div>
  )
}
