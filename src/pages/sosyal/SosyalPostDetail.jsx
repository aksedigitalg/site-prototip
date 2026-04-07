import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'
import { SOSYAL_POSTLAR, SOSYAL_KULLANICILAR, SOSYAL_YORUMLAR } from '../../data/mockSosyal'

function zamanOnce(tarih) {
  const fark = Date.now() - new Date(tarih).getTime()
  const dk = Math.floor(fark / 60000)
  if (dk < 1) return 'Şimdi'
  if (dk < 60) return `${dk} dk`
  const saat = Math.floor(dk / 60)
  if (saat < 24) return `${saat} sa`
  const gun = Math.floor(saat / 24)
  return `${gun} gün`
}

function Yorum({ yorum, kullanicilar, onYanitGoster }) {
  const kullanici = kullanicilar.find(k => k.id === yorum.kullaniciId)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(yorum.begeniler?.length || 0)

  return (
    <div className="mb-4">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0" style={{ background: kullanici?.bg || '#e5e7eb' }}>
          {kullanici?.avatar || '👤'}
        </div>
        <div className="flex-1">
          <p className="text-sm">
            <span className="font-semibold text-gray-900">{kullanici?.kullaniciAdi || 'kullanici'}</span>{' '}
            <span className="text-gray-700">{yorum.metin}</span>
          </p>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-gray-400 text-[11px]">{zamanOnce(yorum.tarih)}</span>
            <button className="text-gray-400 text-[11px] font-semibold" onClick={onYanitGoster}>Yanıtla</button>
            <button onClick={() => { setLiked(!liked); setLikeCount(prev => liked ? prev - 1 : prev + 1) }}>
              <Heart size={12} strokeWidth={2} className={liked ? 'text-red-500' : 'text-gray-400'} fill={liked ? '#ef4444' : 'none'} />
            </button>
            {likeCount > 0 && <span className="text-gray-400 text-[11px]">{likeCount}</span>}
          </div>

          {/* Yanıtlar */}
          {yorum.yanitlar?.length > 0 && (
            <div className="mt-3 pl-2 border-l-2 border-gray-100">
              {yorum.yanitlar.map(yanit => {
                const yanitKullanici = kullanicilar.find(k => k.id === yanit.kullaniciId)
                return (
                  <div key={yanit.id} className="mb-2">
                    <p className="text-sm">
                      <span className="font-semibold text-gray-900">{yanitKullanici?.kullaniciAdi || 'kullanici'}</span>{' '}
                      <span className="text-gray-700">{yanit.metin}</span>
                    </p>
                    <span className="text-gray-400 text-[11px]">{zamanOnce(yanit.tarih)}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SosyalPostDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const postId = parseInt(id)
  const post = SOSYAL_POSTLAR.find(p => p.id === postId)
  const kullanici = post ? SOSYAL_KULLANICILAR.find(k => k.id === post.kullaniciId) : null
  const yorumlar = SOSYAL_YORUMLAR[postId] || []

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post?.begeniler?.length || 0)
  const [saved, setSaved] = useState(false)
  const [yeniYorum, setYeniYorum] = useState('')
  const [ekYorumlar, setEkYorumlar] = useState([])

  if (!post || !kullanici) return null

  function yorumGonder() {
    if (!yeniYorum.trim()) return
    setEkYorumlar(prev => [...prev, {
      id: Date.now(),
      kullaniciId: 0,
      metin: yeniYorum.trim(),
      tarih: new Date().toISOString(),
      begeniler: [],
      yanitlar: [],
    }])
    setYeniYorum('')
  }

  const tumYorumlar = [...yorumlar, ...ekYorumlar]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.9)' }}>
        <div className="w-full max-w-[430px] flex items-center justify-between" style={{ padding: '10px 20px', height: 56 }}>
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={20} strokeWidth={2} className="text-gray-900" />
          </button>
          <h1 className="text-gray-900 text-base font-bold">Gönderi</h1>
          <div style={{ width: 20 }} />
        </div>
      </header>

      {/* İçerik */}
      <div style={{ paddingTop: 56, paddingBottom: 80, paddingLeft: 20, paddingRight: 20 }}>

        {/* Post Header */}
        <div className="flex items-center gap-3 py-3">
          <button onClick={() => navigate(`/sosyal/profil/${kullanici.id}`)} className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background: kullanici.bg }}>
            {kullanici.avatar}
          </button>
          <button onClick={() => navigate(`/sosyal/profil/${kullanici.id}`)} className="flex-1 text-left">
            <p className="text-gray-900 text-sm font-semibold">{kullanici.kullaniciAdi}</p>
          </button>
          <MoreHorizontal size={18} className="text-gray-400" />
        </div>

        {/* Görsel */}
        <div className="w-full rounded-2xl flex items-center justify-center" style={{ background: post.gradyan, aspectRatio: '1/1' }}>
          <span className="text-7xl">{post.emoji}</span>
        </div>

        {/* Aksiyonlar */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-4">
            <button onClick={() => { setLiked(!liked); setLikeCount(prev => liked ? prev - 1 : prev + 1) }}>
              <Heart size={24} strokeWidth={2} className={liked ? 'text-red-500' : 'text-gray-800'} fill={liked ? '#ef4444' : 'none'} />
            </button>
            <MessageCircle size={24} strokeWidth={2} className="text-gray-800" />
            <Send size={24} strokeWidth={2} className="text-gray-800" />
          </div>
          <button onClick={() => setSaved(!saved)}>
            <Bookmark size={24} strokeWidth={2} className={saved ? 'text-gray-900' : 'text-gray-800'} fill={saved ? '#111827' : 'none'} />
          </button>
        </div>

        <p className="text-gray-900 text-sm font-semibold mt-2">{likeCount} beğeni</p>

        <p className="text-gray-800 text-sm mt-1">
          <span className="font-semibold">{kullanici.kullaniciAdi}</span>{' '}
          {post.aciklama}
        </p>

        {post.etiketler.length > 0 && (
          <p className="text-blue-500 text-sm mt-0.5">
            {post.etiketler.map(e => `#${e}`).join(' ')}
          </p>
        )}

        {/* Yorumlar */}
        <div className="mt-6">
          <p className="text-gray-900 text-sm font-semibold mb-4">Yorumlar</p>
          {tumYorumlar.map(yorum => (
            <Yorum key={yorum.id} yorum={yorum} kullanicilar={SOSYAL_KULLANICILAR} onYanitGoster={() => {}} />
          ))}
          {tumYorumlar.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-8">Henüz yorum yok</p>
          )}
        </div>
      </div>

      {/* Yorum Input */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center" style={{ background: 'rgba(255,255,255,0.95)', borderTop: '1px solid #f3f4f6' }}>
        <div className="w-full max-w-[430px] flex items-center gap-3" style={{ padding: '10px 20px' }}>
          <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0" />
          <input
            type="text"
            value={yeniYorum}
            onChange={e => setYeniYorum(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && yorumGonder()}
            placeholder="Yorum ekle..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
          />
          <button onClick={yorumGonder} className="text-blue-500 text-sm font-semibold">Paylaş</button>
        </div>
      </div>
    </div>
  )
}
