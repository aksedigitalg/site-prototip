import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, CircleUser, Lock, Bell, Languages,
  Tag,
  Crown, Sun, Info, HelpCircle, MoveRight,
} from 'lucide-react'

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

  const raw = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

  function handleLogout() {
    localStorage.removeItem('sehir_session')
    navigate('/login')
  }

  const ROW_CLS = 'w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50 transition-colors'
  const ICON_CLS = 'w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center shrink-0'

  function Row({ icon: Icon, label, value, onClick, danger }) {
    return (
      <button onClick={onClick} className={ROW_CLS}>
        <div className={ICON_CLS}>
          <Icon size={20} strokeWidth={2} className={danger ? 'text-red-500' : 'text-gray-500'} />
        </div>
        <span className={`flex-1 text-left text-sm font-medium ${danger ? 'text-red-500' : 'text-gray-800'}`}>{label}</span>
        {value && <span className="text-gray-400 text-sm mr-1">{value}</span>}
        <ChevronRight size={16} strokeWidth={2} className="text-gray-300" />
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-center">
          <span className="text-gray-800 text-base font-bold">Profil</span>
        </div>
      </header>

      <div className="pt-16 pb-24 px-4 space-y-5">

        {/* Profil Kartı */}
        <div className="bg-white rounded-2xl px-4 py-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1 min-w-0">
            <h1 className="text-gray-900 text-base font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">+90 {user?.phone}</p>
          </div>
          <button className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 active:scale-95 transition-transform shrink-0">
            Düzenle
          </button>
        </div>

        {/* Hesap */}
        <div>
          <p className="text-gray-400 font-medium px-1 mb-2" style={{ fontSize: 14 }}>Hesap</p>
          <div className="bg-white rounded-2xl divide-y divide-gray-100">
            <Row icon={CircleUser} label="Profili Düzenle" />
            <Row icon={Lock} label="Şifre & Güvenlik" />
            <Row icon={Bell} label="Bildirimler" />
            <Row icon={Languages} label="Dil" value="Türkçe" />
          </div>
        </div>

        {/* Aktiviteler */}
        <div>
          <p className="text-gray-400 font-medium px-1 mb-2" style={{ fontSize: 14 }}>Aktiviteler</p>
          <div className="bg-white rounded-2xl divide-y divide-gray-100">
            <Row icon={Tag} label="İlanlarım" onClick={() => navigate('/ilanlarim')} />
          </div>
        </div>

        {/* Tercihler */}
        <div>
          <p className="text-gray-400 font-medium px-1 mb-2" style={{ fontSize: 14 }}>Tercihler</p>
          <div className="bg-white rounded-2xl divide-y divide-gray-100">
            <Row icon={Crown} label="Pro Hesap" />
            <Row icon={Sun} label="Tema" value="Açık" />
            <Row icon={Info} label="Hakkımızda" />
          </div>
        </div>

        {/* Destek */}
        <div>
          <p className="text-gray-400 font-medium px-1 mb-2" style={{ fontSize: 14 }}>Destek</p>
          <div className="bg-white rounded-2xl divide-y divide-gray-100">
            <Row icon={HelpCircle} label="Yardım Merkezi" />
            <button onClick={handleLogout} className={ROW_CLS}>
              <div className={ICON_CLS}>
                <MoveRight size={20} strokeWidth={2} className="text-red-500" />
              </div>
              <span className="flex-1 text-left text-sm font-medium text-red-500">Çıkış Yap</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
