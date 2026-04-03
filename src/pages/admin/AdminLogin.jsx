import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { ADMIN_SIFRE } from '../../data/mockAdmin'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [sifre,  setSifre]  = useState('')
  const [goster, setGoster] = useState(false)
  const [hata,   setHata]   = useState('')

  function girisYap() {
    if (sifre !== ADMIN_SIFRE) { setHata('Şifre hatalı. (admin123)'); return }
    localStorage.setItem('admin_session', 'true')
    navigate('/admin/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[360px]">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
            <ShieldCheck size={26} strokeWidth={1.5} className="text-white" />
          </div>
          <h1 className="text-white text-2xl font-extrabold">Admin Paneli</h1>
          <p className="text-white/40 text-sm mt-1">Yönetici girişi</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={goster ? 'text' : 'password'}
              value={sifre}
              onChange={e => setSifre(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && girisYap()}
              placeholder="Admin şifresi"
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white text-sm outline-none placeholder-white/30 pr-12"
            />
            <button onClick={() => setGoster(!goster)} className="absolute right-4 top-1/2 -translate-y-1/2">
              {goster ? <EyeOff size={16} className="text-white/40" /> : <Eye size={16} className="text-white/40" />}
            </button>
          </div>

          {hata && <p className="text-red-400 text-xs font-medium text-center">{hata}</p>}

          <button
            onClick={girisYap}
            className="w-full bg-white text-gray-900 text-sm font-bold py-4 rounded-2xl active:scale-[0.98] transition-transform"
          >
            Giriş Yap
          </button>

          <p className="text-center text-white/30 text-xs">Demo: <span className="text-white/50 font-bold">admin123</span></p>
        </div>
      </div>
    </div>
  )
}
