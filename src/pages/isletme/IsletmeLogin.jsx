import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { ISLETME_SIFRE } from '../../data/mockAdmin'

export default function IsletmeLogin() {
  const navigate = useNavigate()
  const [telefon, setTelefon] = useState('')
  const [sifre,   setSifre]   = useState('')
  const [goster,  setGoster]  = useState(false)
  const [hata,    setHata]    = useState('')

  function girisYap() {
    if (!telefon || !sifre) { setHata('Lütfen tüm alanları doldurun.'); return }
    if (sifre !== ISLETME_SIFRE) { setHata('Şifre hatalı. (isletme123)'); return }
    localStorage.setItem('isletme_session', 'true')
    navigate('/isletme/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-5 pt-14">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 text-sm mb-8 w-fit">
        <ArrowLeft size={16} strokeWidth={2} /> Geri
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center">
          <Building2 size={22} strokeWidth={1.5} className="text-white" />
        </div>
        <div>
          <h1 className="text-gray-900 text-xl font-extrabold">İşletme Paneli</h1>
          <p className="text-gray-400 text-xs">İşletme hesabınızla giriş yapın</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-gray-700 text-xs font-semibold mb-1.5 block">Telefon Numarası</label>
          <input
            value={telefon}
            onChange={e => setTelefon(e.target.value)}
            placeholder="05xx xxx xx xx"
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="text-gray-700 text-xs font-semibold mb-1.5 block">Şifre</label>
          <div className="relative">
            <input
              type={goster ? 'text' : 'password'}
              value={sifre}
              onChange={e => setSifre(e.target.value)}
              placeholder="Şifreniz"
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none focus:border-gray-400 pr-12"
            />
            <button onClick={() => setGoster(!goster)} className="absolute right-4 top-1/2 -translate-y-1/2">
              {goster ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
            </button>
          </div>
        </div>

        {hata && <p className="text-red-500 text-xs font-medium">{hata}</p>}

        <button
          onClick={girisYap}
          className="w-full bg-gray-900 text-white text-sm font-bold py-4 rounded-2xl mt-2 active:scale-[0.98] transition-transform"
        >
          Giriş Yap
        </button>

        <p className="text-center text-gray-400 text-xs">
          Demo şifre: <span className="font-bold text-gray-600">isletme123</span>
        </p>
      </div>
    </div>
  )
}
