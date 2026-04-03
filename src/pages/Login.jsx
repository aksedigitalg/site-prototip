import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone } from 'lucide-react'

export default function Login() {
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (phone.replace(/\D/g, '').length < 10) return
    sessionStorage.setItem('sehir_phone', phone)
    navigate('/otp')
  }

  function formatPhone(val) {
    const digits = val.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`
  }

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 py-12">
      {/* Header */}
      <div className="pt-8 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 shadow-sm">
          <Phone size={22} strokeWidth={1.5} className="text-gray-900" />
        </div>
        <h1 className="text-gray-900 text-2xl font-bold">Giriş Yap</h1>
        <p className="text-gray-400 text-sm mt-1">Telefon numaranla devam et</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">
            Telefon Numarası
          </label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <span className="text-gray-400 text-sm mr-2">+90</span>
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

        <button
          type="submit"
          disabled={phone.replace(/\D/g, '').length < 10}
          className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl shadow-sm active:scale-95 transition-transform disabled:opacity-30 disabled:scale-100 mt-2"
        >
          Kod Gönder
        </button>
      </form>

      <p className="text-gray-300 text-xs text-center mt-8 leading-relaxed">
        Devam ederek kullanım koşullarını kabul etmiş sayılırsın.
      </p>
    </div>
  )
}
