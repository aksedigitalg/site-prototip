import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function formatPhone(val) {
  const d = val.replace(/\D/g, '').slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6)}`
}

export default function IsletmeForgotPassword() {
  const navigate = useNavigate()
  const [telefon, setTelefon] = useState('')
  const [hata,    setHata]    = useState('')

  function devam() {
    if (telefon.replace(/\D/g, '').length < 10) { setHata('Geçerli telefon numarası gir'); return }
    const raw = localStorage.getItem('isletme_user')
    if (!raw) { setHata('Bu telefona ait işletme hesabı bulunamadı'); return }
    const isletme = JSON.parse(raw)
    const normalize = p => p.replace(/\D/g, '').replace(/^0+/, '')
    if (normalize(isletme.telefon) !== normalize(telefon)) {
      setHata('Bu telefona ait işletme hesabı bulunamadı')
      return
    }
    sessionStorage.setItem('isletme_reset_phone', normalize(telefon))
    navigate('/isletme/reset-otp')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-14">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 text-sm mb-8 w-fit">
        <ArrowLeft size={16} strokeWidth={2} /> Geri
      </button>

      <h1 className="text-gray-900 text-2xl font-extrabold mb-2">Şifremi Unuttum</h1>
      <p className="text-gray-400 text-sm mb-8">İşletme hesabınızın telefon numarasını girin.</p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Telefon</label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <span className="text-gray-400 text-sm mr-1">+90</span>
            <input
              type="tel"
              inputMode="numeric"
              value={telefon}
              onChange={e => setTelefon(formatPhone(e.target.value))}
              placeholder="(5XX) XXX XXXX"
              className="flex-1 py-4 text-gray-900 text-base outline-none bg-transparent"
            />
          </div>
        </div>

        {hata && <p className="text-red-400 text-sm">{hata}</p>}

        <button
          onClick={devam}
          className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl active:scale-95 transition-transform mt-2"
        >
          Kod Gönder
        </button>

        <p className="text-center text-gray-400 text-sm">
          <Link to="/isletme/login" className="text-gray-900 font-semibold">Girişe Dön</Link>
        </p>
      </div>
    </div>
  )
}
