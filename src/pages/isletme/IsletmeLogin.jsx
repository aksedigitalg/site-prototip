import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Building2, Eye, EyeOff, ArrowLeft, Phone, Lock } from 'lucide-react'

function formatPhone(val) {
  const d = val.replace(/\D/g, '').slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6)}`
}

const normalize = p => p.replace(/\D/g, '').replace(/^0+/, '')

// Demo işletme hesabı — reset sonrası da çalışır
const DEMO_ISLETME = {
  isim: 'Demo Kafe', sahipAdi: 'Demo Sahip',
  telefon: '5426469070', kategori: 'Kafe & Restoran', password: '8014',
}

export default function IsletmeLogin() {
  const navigate = useNavigate()
  const [telefon, setTelefon] = useState('')
  const [sifre,   setSifre]   = useState('')
  const [goster,  setGoster]  = useState(false)
  const [hata,    setHata]    = useState('')

  function girisYap() {
    setHata('')
    if (!telefon || !sifre) { setHata('Tüm alanları doldurun'); return }
    const normTel = normalize(telefon)

    // Demo hesabı kontrolü (her zaman çalışır)
    if (normTel === DEMO_ISLETME.telefon && sifre === DEMO_ISLETME.password) {
      localStorage.setItem('isletme_user', JSON.stringify(DEMO_ISLETME))
      localStorage.setItem('isletme_session', 'true')
      navigate('/isletme/dashboard', { replace: true })
      return
    }

    const raw = localStorage.getItem('isletme_user')
    if (!raw) { setHata('Kayıtlı işletme hesabı bulunamadı'); return }
    const isletme = JSON.parse(raw)
    if (normalize(isletme.telefon) !== normTel) { setHata('Telefon veya şifre hatalı'); return }
    if (isletme.password !== sifre) { setHata('Telefon veya şifre hatalı'); return }
    localStorage.setItem('isletme_session', 'true')
    navigate('/isletme/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 text-sm mb-6 w-fit">
        <ArrowLeft size={16} strokeWidth={2} /> Geri
      </button>

      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center">
          <Building2 size={22} strokeWidth={1.5} className="text-white" />
        </div>
        <div>
          <h1 className="text-gray-900 text-xl font-extrabold">İşletme Girişi</h1>
          <p className="text-gray-400 text-xs">İşletme hesabınızla giriş yapın</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Telefon */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Telefon</label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <Phone size={15} strokeWidth={1.5} className="text-gray-400 mr-2 shrink-0" />
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

        {/* Şifre */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Şifre</label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <Lock size={15} strokeWidth={1.5} className="text-gray-400 mr-2 shrink-0" />
            <input
              type={goster ? 'text' : 'password'}
              value={sifre}
              onChange={e => setSifre(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && girisYap()}
              placeholder="Şifreniz"
              className="flex-1 py-4 text-gray-900 text-base outline-none bg-transparent"
            />
            <button type="button" onClick={() => setGoster(!goster)} className="text-gray-300 ml-2">
              {goster ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Şifremi unuttum */}
        <div className="flex justify-end">
          <Link to="/isletme/forgot-password" className="text-gray-400 text-sm">
            Şifremi Unuttum
          </Link>
        </div>

        {hata && <p className="text-red-400 text-sm text-center">{hata}</p>}

        <button
          onClick={girisYap}
          disabled={!telefon || !sifre}
          className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl shadow-sm active:scale-95 transition-transform disabled:opacity-30 disabled:scale-100 mt-2"
        >
          Giriş Yap
        </button>
      </div>

      <p className="text-gray-400 text-sm text-center mt-8">
        Hesabın yok mu?{' '}
        <Link to="/isletme/register" className="text-gray-900 font-semibold">İşletme Kaydı</Link>
      </p>
    </div>
  )
}
