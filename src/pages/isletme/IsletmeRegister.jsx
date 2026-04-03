import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

const KATEGORILER = [
  'Restoran', 'Kafe', 'Market', 'Elektronik', 'Giyim',
  'Güzellik & Bakım', 'Spor', 'Sağlık', 'Eğitim',
  'Temizlik', 'Tadilat & Bakım', 'Düğün & Organizasyon',
  'Konaklama', 'Evcil Hayvan', 'Diğer',
]

function formatPhone(val) {
  const d = val.replace(/\D/g, '').slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6)}`
}

export default function IsletmeRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    isim: '', sahipAdi: '', telefon: '', kategori: '', password: '',
  })
  const [goster, setGoster] = useState(false)
  const [hata,   setHata]   = useState('')

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function kayitOl() {
    setHata('')
    if (!form.isim.trim())    { setHata('İşletme adı boş olamaz'); return }
    if (!form.sahipAdi.trim()){ setHata('Yetkili adı boş olamaz'); return }
    if (form.telefon.replace(/\D/g, '').length < 10) { setHata('Geçerli telefon numarası gir'); return }
    if (!form.kategori)       { setHata('Kategori seçmelisin'); return }
    if (form.password.length < 4) { setHata('Şifre en az 4 karakter olmalı'); return }

    const isletme = {
      isim:     form.isim.trim(),
      sahipAdi: form.sahipAdi.trim(),
      telefon:  form.telefon.replace(/\D/g, '').replace(/^0+/, ''),
      kategori: form.kategori,
      password: form.password,
    }
    localStorage.setItem('isletme_user', JSON.stringify(isletme))
    sessionStorage.setItem('isletme_phone', isletme.telefon)
    navigate('/isletme/otp')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12 overflow-y-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 text-sm mb-6 w-fit">
        <ArrowLeft size={16} strokeWidth={2} /> Geri
      </button>

      <div className="mb-8">
        <h1 className="text-gray-900 text-2xl font-extrabold">İşletme Kaydı</h1>
        <p className="text-gray-400 text-sm mt-1">İşletmenizi platforma ekleyin</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* İşletme adı */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">İşletme Adı</label>
          <input
            value={form.isim}
            onChange={e => set('isim', e.target.value)}
            placeholder="Örn: Döner Palace"
            className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-gray-900 text-base outline-none bg-gray-50 focus:border-gray-400 focus:bg-white transition-all shadow-sm"
          />
        </div>

        {/* Yetkili adı */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Yetkili Adı Soyadı</label>
          <input
            value={form.sahipAdi}
            onChange={e => set('sahipAdi', e.target.value)}
            placeholder="Adınız Soyadınız"
            className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-gray-900 text-base outline-none bg-gray-50 focus:border-gray-400 focus:bg-white transition-all shadow-sm"
          />
        </div>

        {/* Telefon */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Telefon</label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <span className="text-gray-400 text-sm mr-1">+90</span>
            <input
              type="tel"
              inputMode="numeric"
              value={form.telefon}
              onChange={e => set('telefon', formatPhone(e.target.value))}
              placeholder="(5XX) XXX XXXX"
              className="flex-1 py-4 text-gray-900 text-base outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Kategori */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">İşletme Kategorisi</label>
          <select
            value={form.kategori}
            onChange={e => set('kategori', e.target.value)}
            className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-gray-900 text-base outline-none bg-gray-50 focus:border-gray-400 focus:bg-white transition-all shadow-sm appearance-none"
          >
            <option value="">Kategori seçin</option>
            {KATEGORILER.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        {/* Şifre */}
        <div>
          <label className="text-gray-600 text-sm font-medium block mb-2">Şifre</label>
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all shadow-sm">
            <input
              type={goster ? 'text' : 'password'}
              value={form.password}
              onChange={e => set('password', e.target.value)}
              placeholder="En az 4 karakter"
              className="flex-1 py-4 text-gray-900 text-base outline-none bg-transparent"
            />
            <button type="button" onClick={() => setGoster(!goster)} className="text-gray-300 ml-2">
              {goster ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {hata && <p className="text-red-400 text-sm text-center">{hata}</p>}

        <button
          onClick={kayitOl}
          className="w-full bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl shadow-sm active:scale-95 transition-transform mt-2"
        >
          Kayıt Ol & Doğrula
        </button>
      </div>

      <p className="text-gray-400 text-sm text-center mt-8">
        Zaten hesabın var mı?{' '}
        <Link to="/isletme/login" className="text-gray-900 font-semibold">Giriş Yap</Link>
      </p>
    </div>
  )
}
