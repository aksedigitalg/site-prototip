import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

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

    // Auto verify when all filled
    if (digit && index === 5) {
      const code = [...next].join('')
      if (code.length === 6) {
        setTimeout(() => verify(next), 100)
      }
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
    if (code.length < 6) {
      setError('Lütfen 6 haneli kodu gir')
      return
    }
    if (code === CORRECT_OTP) {
      const isRegistered = localStorage.getItem('sehir_user')
      if (isRegistered) {
        navigate('/home')
      } else {
        navigate('/register')
      }
    } else {
      setError('Hatalı kod')
      setDigits(Array(6).fill(''))
      refs.current[0]?.focus()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-6 pt-16 pb-12 rounded-b-3xl">
        <button onClick={() => navigate('/login')} className="text-white/70 text-sm mb-4 block">
          ← Geri
        </button>
        <div className="text-4xl mb-3">📱</div>
        <h1 className="text-white text-2xl font-bold">Kodu Gir</h1>
        <p className="text-white/70 text-sm mt-1">
          {sessionStorage.getItem('sehir_phone')
            ? `+90 ${sessionStorage.getItem('sehir_phone')} numarasına gönderildi`
            : 'Telefonuna gönderilen kodu gir'}
        </p>
      </div>

      {/* OTP inputs */}
      <div className="flex-1 px-6 pt-10 flex flex-col gap-6">
        <div className="flex gap-3 justify-center" onPaste={handlePaste}>
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
              className={`w-12 h-14 text-center text-xl font-bold rounded-2xl border-2 outline-none transition-colors
                ${d ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-800'}
                ${error ? 'border-red-400 bg-red-50' : ''}
                focus:border-blue-500`}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">{error}</p>
        )}

        <button
          onClick={() => verify()}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg py-4 rounded-2xl shadow-md active:scale-95 transition-transform"
        >
          Doğrula
        </button>

        <button
          onClick={() => {
            setDigits(Array(6).fill(''))
            setError('')
            refs.current[0]?.focus()
          }}
          className="text-blue-600 text-sm font-medium text-center"
        >
          Kodu tekrar gönder
        </button>
      </div>
    </div>
  )
}
