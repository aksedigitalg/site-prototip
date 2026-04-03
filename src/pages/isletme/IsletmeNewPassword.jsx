import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function IsletmeNewPassword() {
  const navigate = useNavigate()
  const [sifre,   setSifre]   = useState('')
  const [tekrar,  setTekrar]  = useState('')
  const [goster,  setGoster]  = useState(false)
  const [hata,    setHata]    = useState('')
  const [tamam,   setTamam]   = useState(false)

  function kaydet() {
    if (sifre.length < 4)   { setHata('Şifre en az 4 karakter olmalı'); return }
    if (sifre !== tekrar)   { setHata('Şifreler eşleşmiyor'); return }
    const raw = localStorage.getItem('isletme_user')
    if (!raw) { setHata('Hesap bulunamadı'); return }
    const isletme = JSON.parse(raw)
    isletme.password = sifre
    localStorage.setItem('isletme_user', JSON.stringify(isletme))
    sessionStorage.removeItem('isletme_reset_phone')
    setTamam(true)
    setTimeout(() => navigate('/isletme/login', { replace: true }), 1800)
  }

  if (tamam) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <CheckCircle2 size={56} strokeWidth={1.5} className="text-green-500 mb-4" />
        <h2 className="text-gray-900 text-xl font-extrabold mb-2">Şifre Güncellendi</h2>
        <p className="text-gray-400 text-sm text-center">Yeni şifrenizle giriş yapabilirsiniz.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-14">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 text-sm mb-8 w-fit">
        <ArrowLeft size={16} strokeWidth={2} /> Geri
      </button>

      <h1 className="text-gray-900 text-2xl font-extrabold mb-2">Yeni Şifre</h1>
      <p className="text-gray-400 text-sm mb-8">İşletme hesabınız için yeni şifre belirleyin.</p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Yeni Şifre</label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <input
              type={goster ? 'text' : 'password'}
              value={sifre}
              onChange={e => setSifre(e.target.value)}
              placeholder="En az 4 karakter"
              className="flex-1 py-4 text-gray-900 text-base outline-none bg-transparent"
            />
            <button type="button" onClick={() => setGoster(!goster)} className="text-gray-300 ml-2">
              {goster ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Şifre Tekrar</label>
          <input
            type="password"
            value={tekrar}
            onChange={e => setTekrar(e.target.value)}
            placeholder="Şifrenizi tekrar girin"
            className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-gray-900 text-base outline-none bg-gray-50 focus:border-gray-400 focus:bg-white transition-all shadow-sm"
          />
        </div>

        {hata && <p className="text-red-400 text-sm">{hata}</p>}

        <button
          onClick={kaydet}
          className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl active:scale-95 transition-transform mt-2"
        >
          Şifreyi Kaydet
        </button>
      </div>
    </div>
  )
}
