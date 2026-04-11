import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Settings, Grid3X3, MessageCircle } from 'lucide-react'
import { SOSYAL_KULLANICILAR, SOSYAL_POSTLAR } from '../../data/mockSosyal'
import SosyalNav from '../../components/SosyalNav'

export default function SosyalProfil() {
  const { id } = useParams()
  const navigate = useNavigate()

  const raw = localStorage.getItem('sehir_user')
  const currentUser = raw ? JSON.parse(raw) : null
  const isSelf = id === 'ben' || id === '0'

  const kullanici = isSelf
    ? { id: 0, isim: `${currentUser?.firstName} ${currentUser?.lastName}`, kullaniciAdi: currentUser?.firstName?.toLowerCase() || 'ben', avatar: '👤', bg: '#374151', bio: 'Gebzem kullanıcısı', takipci: 42, takipEdilen: 78, postSayisi: 3 }
    : SOSYAL_KULLANICILAR.find(k => k.id === parseInt(id))

  const [takipEdiliyor, setTakipEdiliyor] = useState(false)

  if (!kullanici) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#000' }}>
      <p className="text-gray-500 text-sm">Kullanıcı bulunamadı</p>
    </div>
  )

  const postlar = SOSYAL_POSTLAR.filter(p => p.kullaniciId === kullanici.id)

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>

      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '14px 16px 10px' }}>
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft size={20} strokeWidth={2} className="text-white" />
        </button>
        <span className="text-white text-[15px] font-bold">{kullanici.kullaniciAdi}</span>
        {isSelf ? (
          <button className="w-10 h-10 flex items-center justify-center">
            <Settings size={20} strokeWidth={1.8} className="text-white" />
          </button>
        ) : <div className="w-10" />}
      </div>

      {/* Profil bilgileri */}
      <div style={{ padding: '16px 20px' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold">{kullanici.isim}</h1>
            <p className="text-gray-500 text-[13px] mt-0.5">@{kullanici.kullaniciAdi}</p>
          </div>
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: kullanici.bg }}>
            {kullanici.avatar}
          </div>
        </div>

        <p className="text-gray-300 text-[14px] mt-3">{kullanici.bio}</p>

        {/* İstatistikler */}
        <div className="flex items-center gap-5 mt-4">
          <div className="flex items-center gap-1">
            <span className="text-white text-[14px] font-bold">{kullanici.takipci}</span>
            <span className="text-gray-500 text-[13px]">takipçi</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white text-[14px] font-bold">{kullanici.takipEdilen}</span>
            <span className="text-gray-500 text-[13px]">takip</span>
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex gap-2 mt-4">
          {isSelf ? (
            <>
              <button className="flex-1 rounded-xl text-white text-[13px] font-semibold" style={{ height: 36, border: '1px solid rgba(255,255,255,0.15)' }}>
                Profili Düzenle
              </button>
              <button className="flex-1 rounded-xl text-white text-[13px] font-semibold" style={{ height: 36, border: '1px solid rgba(255,255,255,0.15)' }}>
                Paylaş
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setTakipEdiliyor(!takipEdiliyor)}
                className="flex-1 rounded-xl text-[13px] font-semibold"
                style={{ height: 36, background: takipEdiliyor ? 'transparent' : '#ffffff', color: takipEdiliyor ? '#fff' : '#000', border: takipEdiliyor ? '1px solid rgba(255,255,255,0.15)' : 'none' }}
              >
                {takipEdiliyor ? 'Takipte' : 'Takip Et'}
              </button>
              <button className="flex-1 rounded-xl text-white text-[13px] font-semibold" style={{ height: 36, border: '1px solid rgba(255,255,255,0.15)' }}>
                Mesaj
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tab */}
      <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex-1 flex items-center justify-center" style={{ height: 44, borderBottom: '2px solid #fff' }}>
          <Grid3X3 size={18} strokeWidth={2} className="text-white" />
        </div>
        <div className="flex-1 flex items-center justify-center" style={{ height: 44 }}>
          <MessageCircle size={18} strokeWidth={1.8} className="text-gray-600" />
        </div>
      </div>

      {/* Postlar grid */}
      <div className="grid grid-cols-3 gap-0.5" style={{ paddingBottom: 80 }}>
        {postlar.map(post => (
          <button
            key={post.id}
            onClick={() => navigate(`/sosyal/post/${post.id}`)}
            className="flex items-center justify-center"
            style={{ background: post.gradyan, aspectRatio: '1/1' }}
          >
            <span className="text-3xl">{post.emoji}</span>
          </button>
        ))}
        {postlar.length === 0 && (
          <div className="col-span-3 text-center py-16">
            <p className="text-gray-600 text-sm">Henüz gönderi yok</p>
          </div>
        )}
      </div>

      <SosyalNav />
    </div>
  )
}
