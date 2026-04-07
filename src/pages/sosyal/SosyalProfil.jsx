import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Grid3X3 } from 'lucide-react'
import { SOSYAL_KULLANICILAR, SOSYAL_POSTLAR } from '../../data/mockSosyal'
import SosyalNav from '../../components/SosyalNav'

export default function SosyalProfil() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [takipEdiyor, setTakipEdiyor] = useState(false)

  const isBen = id === 'ben' || id === '0'
  const raw = localStorage.getItem('sehir_user')
  const currentUser = raw ? JSON.parse(raw) : null

  const kullanici = isBen
    ? { id: 0, isim: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Ben', kullaniciAdi: currentUser?.firstName?.toLowerCase() || 'ben', avatar: '😊', bg: '#667eea', bio: 'Şehir App kullanıcısı', takipci: 156, takipEdilen: 89, postSayisi: 5 }
    : SOSYAL_KULLANICILAR.find(k => k.id === parseInt(id))

  if (!kullanici) return null

  const postlar = SOSYAL_POSTLAR.filter(p => p.kullaniciId === kullanici.id)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.9)' }}>
        <div className="w-full max-w-[430px] flex items-center justify-between" style={{ padding: '10px 20px', height: 56 }}>
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={20} strokeWidth={2} className="text-gray-900" />
          </button>
          <h1 className="text-gray-900 text-base font-bold">{kullanici.kullaniciAdi}</h1>
          <div style={{ width: 20 }} />
        </div>
      </header>

      <div style={{ paddingTop: 56, paddingBottom: 96, paddingLeft: 20, paddingRight: 20 }}>

        {/* Profil Header */}
        <div className="flex items-center gap-5 py-5">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shrink-0" style={{ background: kullanici.bg }}>
            {kullanici.avatar}
          </div>
          <div className="flex-1">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-gray-900 text-lg font-bold">{postlar.length || kullanici.postSayisi}</p>
                <p className="text-gray-500 text-xs">Gönderi</p>
              </div>
              <div>
                <p className="text-gray-900 text-lg font-bold">{kullanici.takipci}</p>
                <p className="text-gray-500 text-xs">Takipçi</p>
              </div>
              <div>
                <p className="text-gray-900 text-lg font-bold">{kullanici.takipEdilen}</p>
                <p className="text-gray-500 text-xs">Takip</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-gray-900 text-sm font-semibold">{kullanici.isim}</p>
          <p className="text-gray-600 text-sm mt-0.5">{kullanici.bio}</p>
        </div>

        {/* Takip butonu */}
        {!isBen && (
          <button
            onClick={() => setTakipEdiyor(!takipEdiyor)}
            className="w-full rounded-xl py-2.5 text-sm font-semibold mb-5"
            style={{
              background: takipEdiyor ? '#f3f4f6' : '#111827',
              color: takipEdiyor ? '#374151' : '#ffffff',
            }}
          >
            {takipEdiyor ? 'Takipten Çık' : 'Takip Et'}
          </button>
        )}

        {/* Grid başlık */}
        <div className="flex justify-center border-t border-gray-100 pt-3 mb-3">
          <Grid3X3 size={20} strokeWidth={1.5} className="text-gray-900" />
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-3 gap-1">
          {postlar.map(post => (
            <button
              key={post.id}
              onClick={() => navigate(`/sosyal/post/${post.id}`)}
              className="aspect-square rounded-lg flex items-center justify-center"
              style={{ background: post.gradyan }}
            >
              <span className="text-3xl">{post.emoji}</span>
            </button>
          ))}
          {postlar.length === 0 && (
            <div className="col-span-3 py-12 text-center">
              <p className="text-gray-400 text-sm">Henüz gönderi yok</p>
            </div>
          )}
        </div>
      </div>

      <SosyalNav />
    </div>
  )
}
