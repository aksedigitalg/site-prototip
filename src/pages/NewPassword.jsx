import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function NewPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password.length < 4) { setError('Şifre en az 4 karakter olmalı'); return }
    if (password !== confirm) { setError('Şifreler eşleşmiyor'); return }
    const raw = localStorage.getItem('sehir_user')
    if (!raw) { navigate('/login'); return }
    const user = JSON.parse(raw)
    user.password = password
    localStorage.setItem('sehir_user', JSON.stringify(user))
    sessionStorage.removeItem('sehir_reset_phone')
    navigate('/login')
  }

  const valid = password.length >= 4 && confirm.length >= 4

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 py-12">
      <div className="pt-8 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 shadow-sm">
          <Lock size={22} strokeWidth={1.5} className="text-gray-900" />
        </div>
        <h1 className="text-gray-900 text-2xl font-bold">Yeni Şifre</h1>
        <p className="text-gray-400 text-sm mt-1">Yeni şifreni belirle</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Yeni Şifre</label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="En az 4 karakter"
              className="flex-1 py-4 text-gray-900 text-base outline-none bg-transparent"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-300 ml-2">
              {showPass ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Şifre Tekrar</label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <input
              type={showPass ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Şifreni tekrar gir"
              className="flex-1 py-4 text-gray-900 text-base outline-none bg-transparent"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={!valid}
          className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl shadow-sm active:scale-95 transition-transform disabled:opacity-30 disabled:scale-100 mt-2"
        >
          Şifremi Güncelle
        </button>
      </form>
    </div>
  )
}
