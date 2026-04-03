import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim()) return
    const user = { firstName: firstName.trim(), lastName: lastName.trim() }
    localStorage.setItem('sehir_user', JSON.stringify(user))
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 px-6 pt-16 pb-12 rounded-b-3xl">
        <div className="text-4xl mb-3">✨</div>
        <h1 className="text-white text-2xl font-bold">Hesap Oluştur</h1>
        <p className="text-white/70 text-sm mt-1">Seni tanımak istiyoruz!</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-slate-600 text-sm font-medium block mb-2">Ad</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Adın"
              className="w-full border-2 border-slate-200 rounded-2xl px-4 py-4 text-slate-800 text-base outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-slate-600 text-sm font-medium block mb-2">Soyad</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Soyadın"
              className="w-full border-2 border-slate-200 rounded-2xl px-4 py-4 text-slate-800 text-base outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={!firstName.trim() || !lastName.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg py-4 rounded-2xl shadow-md active:scale-95 transition-transform disabled:opacity-40 disabled:scale-100 mt-2"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  )
}
