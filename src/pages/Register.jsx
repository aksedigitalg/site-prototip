import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserRound } from 'lucide-react'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim()) return
    localStorage.setItem('sehir_user', JSON.stringify({ firstName: firstName.trim(), lastName: lastName.trim() }))
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 py-12">
      {/* Header */}
      <div className="pt-8 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 shadow-sm">
          <UserRound size={22} strokeWidth={1.5} className="text-gray-900" />
        </div>
        <h1 className="text-gray-900 text-2xl font-bold">Hesabını Oluştur</h1>
        <p className="text-gray-400 text-sm mt-1">Seni tanımak istiyoruz</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Ad</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Adın"
            className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-gray-900 text-base outline-none bg-gray-50 focus:border-gray-400 focus:bg-white transition-all shadow-sm"
          />
        </div>

        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Soyad</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Soyadın"
            className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-gray-900 text-base outline-none bg-gray-50 focus:border-gray-400 focus:bg-white transition-all shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={!firstName.trim() || !lastName.trim()}
          className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl shadow-sm active:scale-95 transition-transform disabled:opacity-30 disabled:scale-100 mt-2"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  )
}
