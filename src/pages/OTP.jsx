import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

const CORRECT_OTP = '111111'

export default function OTP() {
  const [digits, setDigits] = useState(Array(6).fill(''))
  const [error, setError] = useState('')
  const refs = useRef([])
  const navigate = useNavigate()

  function handleChange(index, val) {
    const digit = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    setError('')

    if (digit && index < 5) {
      refs.current[index + 1]?.focus()
    }

    if (digit && index === 5) {
      const code = [...next].join('')
      if (code.length === 6) setTimeout(() => verify(next), 100)
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = Array(6).fill('')
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    setDigits(next)
    refs.current[Math.min(pasted.length, 5)]?.focus()
  }

  function verify(d = digits) {
    const code = d.join('')
    if (code.length < 6) { setError('Lütfen 6 haneli kodu gir'); return }
    if (code === CORRECT_OTP) {
      navigate(localStorage.getItem('sehir_user') ? '/home' : '/register')
    } else {
      setError('Hatalı kod')
      setDigits(Array(6).fill(''))
      refs.current[0]?.focus()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 py-12">
      {/* Header */}
      <div className="pt-4 mb-10">
        <button onClick={() => navigate('/login')} className="text-gray-400 mb-6 block">
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 shadow-sm">
          <ShieldCheck size={22} strokeWidth={1.5} className="text-gray-900" />
        </div>
        <h1 className="text-gray-900 text-2xl font-bold">Kodu Gir</h1>
        <p className="text-gray-400 text-sm mt-1">
          {sessionStorage.getItem('sehir_phone')
            ? `+90 ${sessionStorage.getItem('sehir_phone')} numarasına gönderildi`
            : 'Telefonuna gönderilen kodu gir'}
        </p>
      </div>

      {/* OTP inputs */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 justify-between" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-12 h-14 text-center text-xl font-bold rounded-2xl border outline-none transition-all shadow-sm
                ${d ? 'border-gray-900 bg-gray-50 text-gray-900' : 'border-gray-200 bg-gray-50 text-gray-900'}
                ${error ? 'border-red-300 bg-red-50' : ''}
                focus:border-gray-900 focus:bg-white`}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center font-medium">{error}</p>
        )}

        <button
          onClick={() => verify()}
          className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl shadow-sm active:scale-95 transition-transform mt-2"
        >
          Doğrula
        </button>

        <button
          onClick={() => { setDigits(Array(6).fill('')); setError(''); refs.current[0]?.focus() }}
          className="text-gray-400 text-sm font-medium text-center"
        >
          Kodu tekrar gönder
        </button>
      </div>
    </div>
  )
}
