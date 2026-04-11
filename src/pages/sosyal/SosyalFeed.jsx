import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, Image, Film, Hash } from 'lucide-react'
import { SOSYAL_POSTLAR, SOSYAL_KULLANICILAR } from '../../data/mockSosyal'
import SosyalNav from '../../components/SosyalNav'

function zamanOnce(tarih) {
  const fark = Date.now() - new Date(tarih).getTime()
  const dk = Math.floor(fark / 60000)
  if (dk < 1) return 'şimdi'
  if (dk < 60) return `${dk}dk`
  const saat = Math.floor(dk / 60)
  if (saat < 24) return `${saat}sa`
  const gun = Math.floor(saat / 24)
  return `${gun}g`
}

function PostCard({ post, kullanici, navigate }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.begeniler.length)

  function handleLike() {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex gap-3" style={{ padding: '16px 16px 12px' }}>
        {/* Avatar */}
        <button onClick={() => navigate(`/sosyal/profil/${kullanici.id}`)} className="shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: kullanici.bg }}>
            {kullanici.avatar}
          </div>
        </button>

        {/* İçerik */}
        <div className="flex-1 min-w-0">
          {/* Üst: isim + zaman + more */}
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(`/sosyal/profil/${kullanici.id}`)}>
              <span className="text-white text-[14px] font-bold">{kullanici.kullaniciAdi}</span>
            </button>
            <span className="text-gray-600 text-[13px]">{zamanOnce(post.tarih)}</span>
            <div className="flex-1" />
            <MoreHorizontal size={16} className="text-gray-600" />
          </div>

          {/* Metin */}
          <p className="text-white text-[14px] leading-relaxed mt-1">{post.aciklama}</p>

          {/* Etiketler */}
          {post.etiketler.length > 0 && (
            <p className="text-blue-400 text-[13px] mt-1">
              {post.etiketler.map(e => `#${e}`).join(' ')}
            </p>
          )}

          {/* Görsel — sadece bazı postlarda */}
          {post.gradyan && post.id % 3 === 0 && (
            <div className="mt-3 rounded-xl overflow-hidden" style={{ background: post.gradyan, height: 200 }}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-5xl">{post.emoji}</span>
              </div>
            </div>
          )}

          {/* Aksiyonlar */}
          <div className="flex items-center gap-5 mt-3">
            <button onClick={handleLike} className="flex items-center gap-1.5">
              <Heart size={18} strokeWidth={1.8} className={liked ? 'text-red-500' : 'text-gray-500'} fill={liked ? '#ef4444' : 'none'} />
              {likeCount > 0 && <span className="text-gray-500 text-[12px]">{likeCount}</span>}
            </button>
            <button onClick={() => navigate(`/sosyal/post/${post.id}`)} className="flex items-center gap-1.5">
              <MessageCircle size={18} strokeWidth={1.8} className="text-gray-500" />
              {post.yorumSayisi > 0 && <span className="text-gray-500 text-[12px]">{post.yorumSayisi}</span>}
            </button>
            <button>
              <Repeat2 size={18} strokeWidth={1.8} className="text-gray-500" />
            </button>
            <button>
              <Send size={16} strokeWidth={1.8} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SosyalFeed() {
  const navigate = useNavigate()
  const raw = localStorage.getItem('sehir_user')
  const user = raw ? JSON.parse(raw) : null

  const postlar = [...SOSYAL_POSTLAR].sort((a, b) => new Date(b.tarih) - new Date(a.tarih))

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>

      {/* Header */}
      <div className="flex items-center justify-center" style={{ paddingTop: 14, paddingBottom: 10 }}>
        <span className="text-white text-lg font-bold">Gebzem</span>
      </div>

      {/* Composer */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex gap-3" style={{ padding: '12px 16px' }}>
          <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0 flex items-center justify-center text-sm">
            {user?.firstName?.[0] || '?'}
          </div>
          <div className="flex-1">
            <button onClick={() => navigate('/sosyal/paylasim')} className="w-full text-left">
              <p className="text-gray-600 text-[14px]">Ne düşünüyorsun?</p>
            </button>
            <div className="flex items-center gap-4 mt-3">
              <Image size={18} strokeWidth={1.8} className="text-gray-600" />
              <Film size={18} strokeWidth={1.8} className="text-gray-600" />
              <Hash size={18} strokeWidth={1.8} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div style={{ paddingBottom: 80 }}>
        {postlar.map(post => {
          const kullanici = SOSYAL_KULLANICILAR.find(k => k.id === post.kullaniciId)
          if (!kullanici) return null
          return <PostCard key={post.id} post={post} kullanici={kullanici} navigate={navigate} />
        })}
      </div>

      <SosyalNav />
    </div>
  )
}
