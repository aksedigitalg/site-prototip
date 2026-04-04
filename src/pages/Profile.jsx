import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogOut, ChevronRight, User, Phone, Lock,
  CalendarDays, Clock, MessageCircle, FileText,
  Crown, Gift, Tag, Camera,
} from 'lucide-react'
import { REZERVASYONLAR, RANDEVULAR, KONUSMALAR, TEKLIFLER } from '../data/mockMesajlar'

export default function Profile() {
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const [avatar, setAvatar] = useState(localStorage.getItem('sehir_avatar') || null)

  function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target.result
      localStorage.setItem('sehir_avatar', dataUrl)
      setAvatar(dataUrl)
    }
    reader.readAsDataURL(file)
  }
  const raw  = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

  const localRezRaw = localStorage.getItem('sehir_rezervasyonlar')
  const localRez    = localRezRaw ? JSON.parse(localRezRaw) : []
  const localRnvRaw = localStorage.getItem('sehir_randevular')
  const localRnv    = localRnvRaw ? JSON.parse(localRnvRaw) : []
  const localTkfRaw = localStorage.getItem('sehir_teklifler')
  const localTkf    = localTkfRaw ? JSON.parse(localTkfRaw) : []

  const rezSayi  = REZERVASYONLAR.length + localRez.length
  const rnvSayi  = RANDEVULAR.length    + localRnv.length
  const msjSayi  = KONUSMALAR.filter(k => k.okunmadi > 0).length
  const tklSayi  = TEKLIFLER.length    + localTkf.length

  function handleLogout() {
    localStorage.removeItem('sehir_session')
    navigate('/login')
  }

  const AKTIVITELER = [
    { icon: CalendarDays, label: 'Rezervasyonlarım', count: rezSayi, path: '/rezervasyonlarim', color: 'bg-blue-50 text-blue-600' },
    { icon: Clock,        label: 'Randevularım',     count: rnvSayi, path: '/randevularim',     color: 'bg-purple-50 text-purple-600' },
    { icon: MessageCircle,label: 'Mesajlarım',       count: msjSayi, path: '/mesajlarim',       color: 'bg-green-50 text-green-600',  badge: msjSayi > 0 },
    { icon: FileText,     label: 'Tekliflerim',      count: tklSayi, path: '/tekliflerim',      color: 'bg-orange-50 text-orange-600' },
    { icon: Tag,          label: 'İlanlarım',        count: 0,       path: '/ilanlarim',        color: 'bg-gray-50 text-gray-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <span className="text-gray-800 text-base font-bold">Profilim</span>
          <button onClick={handleLogout} className="text-gray-400">
            <LogOut size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="pt-16 pb-24 px-4 space-y-4">

        {/* Avatar + İsim */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-4 py-6 flex items-center gap-4">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          <button onClick={() => fileRef.current?.click()} className="relative w-16 h-16 rounded-2xl shrink-0 overflow-hidden active:scale-95 transition-transform">
            {avatar ? (
              <img src={avatar} alt="Profil" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <span className="text-white text-xl font-bold">{user?.firstName?.[0]}{user?.lastName?.[0]}</span>
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
              <Camera size={11} strokeWidth={2} className="text-gray-500" />
            </div>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-gray-900 text-base font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">+90 {user?.phone}</p>
            <p className="text-gray-300 text-xs mt-0.5">Üye · 2026</p>
          </div>
        </div>

        {/* İstatistik grid */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Rezervasyon', count: rezSayi },
            { label: 'Randevu',     count: rnvSayi },
            { label: 'Mesaj',       count: KONUSMALAR.length },
            { label: 'Teklif',      count: tklSayi },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl py-3 text-center shadow-sm">
              <p className="text-gray-900 text-lg font-extrabold">{s.count}</p>
              <p className="text-gray-400 text-xs mt-0.5 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Pro Hesap */}
        <button
          onClick={() => navigate('/pro')}
          className="w-full bg-gray-900 rounded-2xl px-4 py-4 flex items-center gap-3 active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Crown size={18} strokeWidth={1.5} className="text-yellow-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white text-sm font-bold">Pro Hesap</p>
            <p className="text-white/60 text-xs mt-0.5">Reklamsız · Sınırsız AI · ₺79/ay</p>
          </div>
          <ChevronRight size={16} strokeWidth={1.5} className="text-white/40" />
        </button>

        {/* Arkadaşını Davet Et */}
        <button className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm flex items-center gap-3 active:scale-95 transition-transform">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
            <Gift size={18} strokeWidth={1.5} className="text-purple-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-900 text-sm font-bold">Arkadaşını Davet Et</p>
            <p className="text-gray-400 text-xs mt-0.5">Her davet için 1 ay Pro hediye</p>
          </div>
          <ChevronRight size={16} strokeWidth={1.5} className="text-gray-300" />
        </button>

        {/* Aktiviteler */}
        <div>
          <p className="text-gray-500 text-xs font-semibold px-1 mb-2">AKTİVİTELERİM</p>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-50">
            {AKTIVITELER.map(({ icon: Icon, label, count, path, color, badge }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <span className="text-gray-800 text-sm font-medium flex-1 text-left">{label}</span>
                {badge && count > 0 ? (
                  <span className="w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {count}
                  </span>
                ) : (
                  <span className="text-gray-400 text-xs mr-1">{count > 0 ? count : ''}</span>
                )}
                <ChevronRight size={14} strokeWidth={1.5} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Hesap */}
        <div>
          <p className="text-gray-500 text-xs font-semibold px-1 mb-2">HESABIM</p>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-50">
            {[
              { icon: User,  label: 'Ad Soyad', value: `${user?.firstName} ${user?.lastName}` },
              { icon: Phone, label: 'Telefon',  value: `+90 ${user?.phone}` },
              { icon: Lock,  label: 'Şifre',    value: '••••••••' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3.5">
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Icon size={14} strokeWidth={1.5} className="text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="text-gray-800 text-sm font-medium truncate">{value}</p>
                </div>
                <ChevronRight size={13} strokeWidth={1.5} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Çıkış */}
        <button
          onClick={handleLogout}
          className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm flex items-center gap-3 active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <LogOut size={14} strokeWidth={1.5} className="text-red-500" />
          </div>
          <span className="text-red-500 text-sm font-semibold">Çıkış Yap</span>
        </button>

      </div>

    </div>
  )
}
