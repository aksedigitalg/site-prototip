import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-6 pt-16 pb-12 rounded-b-3xl">
        <div className="text-4xl mb-3">🏙️</div>
        <h1 className="text-white text-2xl font-bold">Şehir'e Giriş Yap</h1>
        <p className="text-white/70 text-sm mt-1">Telefon numaranla devam et</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-slate-600 text-sm font-medium block mb-2">
              Telefon Numarası
            </label>
            <div className="flex items-center border-2 border-slate-200 rounded-2xl px-4 focus-within:border-blue-500 transition-colors">
              <span className="text-slate-500 font-medium mr-2">🇹🇷 +90</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(5XX) XXX XXXX"
                className="flex-1 py-4 text-slate-800 text-base outline-none bg-transparent"
                inputMode="numeric"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={phone.replace(/\D/g, '').length < 10}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg py-4 rounded-2xl shadow-md active:scale-95 transition-transform disabled:opacity-40 disabled:scale-100"
          >
            Kod Gönder
          </button>
        </form>

        <p className="text-slate-400 text-xs text-center mt-6 leading-relaxed">
          Devam ederek kullanım koşullarını kabul etmiş sayılırsın.
        </p>
      </div>
    </div>
  )
}
