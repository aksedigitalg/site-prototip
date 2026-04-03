import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function IsletmeOTP() {
  const navigate = useNavigate()
  const phone = sessionStorage.getItem('isletme_phone') || ''
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [hata,   setHata]   = useState('')
  const refs = useRef([])

  useEffect(() => { refs.current[0]?.focus() }, [])

  function handleChange(i, val) {
    if (!/^\d?$/.test(val)) return
    const next = [...digits]
    next[i] = val
    setDigits(next)
    if (val && i < 5) refs.current[i + 1]?.focus()
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  function dogrula() {
    const kod = digits.join('')
    if (kod.length < 6) { setHata('6 haneli kodu eksiksiz gir'); return }
    if (kod !== '111111') { setHata('Kod hatalı. Demo kod: 111111'); return }
    localStorage.setItem('isletme_session', 'true')
    sessionStorage.removeItem('isletme_phone')
    navigate('/isletme/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-14">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 text-sm mb-8 w-fit">
        <ArrowLeft size={16} strokeWidth={2} /> Geri
      </button>

      <h1 className="text-gray-900 text-2xl font-extrabold mb-2">Doğrulama Kodu</h1>
      <p className="text-gray-400 text-sm mb-8">
        <span className="text-gray-700 font-semibold">+90 {phone}</span> numarasına gönderilen kodu girin.
      </p>

      {/* OTP kutuları */}
      <div className="flex gap-3 justify-center mb-6">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={el => refs.current[i] = el}
            value={d}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            maxLength={1}
            inputMode="numeric"
            className="w-12 h-14 text-center text-xl font-bold border-2 rounded-2xl outline-none transition-all bg-gray-50"
            style={{ borderColor: d ? '#111827' : '#e5e7eb' }}
          />
        ))}
      </div>

      {hata && <p className="text-red-400 text-sm text-center mb-4">{hata}</p>}

      <button
        onClick={dogrula}
        className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl active:scale-95 transition-transform"
      >
        Doğrula
      </button>

      <p className="text-center text-gray-400 text-sm mt-6">
        Demo kod: <span className="font-bold text-gray-600">111111</span>
      </p>
    </div>
  )
}
