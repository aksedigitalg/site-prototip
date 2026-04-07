import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Camera } from 'lucide-react'
import { SOSYAL_POSTLAR, SOSYAL_KULLANICILAR, SOSYAL_HIKAYELER } from '../../data/mockSosyal'
import SosyalNav from '../../components/SosyalNav'

function zamanOnce(tarih) {
  const fark = Date.now() - new Date(tarih).getTime()
  const dk = Math.floor(fark / 60000)
  if (dk < 1) return 'Şimdi'
  if (dk < 60) return `${dk} dk önce`
  const saat = Math.floor(dk / 60)
  if (saat < 24) return `${saat} saat önce`
  const gun = Math.floor(saat / 24)
  if (gun < 7) return `${gun} gün önce`
  return `${Math.floor(gun / 7)} hafta önce`
}

function StoryCircle({ story, onClick }) {
  return (
    <button onClick={onClick} className="shrink-0 flex flex-col items-center gap-1">
      <div className="rounded-full p-[2px]" style={{ background: 'linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)' }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: story.bg, border: '2px solid white' }}>
          {story.emoji}
        </div>
      </div>
      <span className="text-[11px] text-gray-500 w-14 text-center truncate">{story.kullanici}</span>
    </button>
  )
}

function PostCard({ post, kullanici, navigate }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.begeniler.length)
  const [saved, setSaved] = useState(false)
  const [showHeart, setShowHeart] = useState(false)

  function handleLike() {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  function handleDoubleTap() {
    if (!liked) {
      setLiked(true)
      setLikeCount(prev => prev + 1)
    }
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 800)
  }

  return (
    <div className="mb-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => navigate(`/sosyal/profil/${kullanici.id}`)} className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background: kullanici.bg }}>
          {kullanici.avatar}
        </button>
        <button onClick={() => navigate(`/sosyal/profil/${kullanici.id}`)} className="flex-1 text-left">
          <p className="text-gray-900 text-sm font-semibold">{kullanici.kullaniciAdi}</p>
        </button>
        <MoreHorizontal size={18} className="text-gray-400" />
      </div>

      {/* Görsel */}
      <button
        onDoubleClick={handleDoubleTap}
        className="w-full relative flex items-center justify-center rounded-2xl"
        style={{ background: post.gradyan, aspectRatio: '1/1' }}
      >
        <span className="text-7xl">{post.emoji}</span>
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart size={80} fill="white" strokeWidth={0} className="like-heart" />
          </div>
        )}
      </button>

      {/* Aksiyonlar */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-4">
          <button onClick={handleLike}>
            <Heart size={24} strokeWidth={2} className={liked ? 'text-red-500' : 'text-gray-800'} fill={liked ? '#ef4444' : 'none'} />
          </button>
          <button onClick={() => navigate(`/sosyal/post/${post.id}`)}>
            <MessageCircle size={24} strokeWidth={2} className="text-gray-800" />
          </button>
          <Send size={24} strokeWidth={2} className="text-gray-800" />
        </div>
        <button onClick={() => setSaved(!saved)}>
          <Bookmark size={24} strokeWidth={2} className={saved ? 'text-gray-900' : 'text-gray-800'} fill={saved ? '#111827' : 'none'} />
        </button>
      </div>

      {/* Beğeni sayısı */}
      <p className="text-gray-900 text-sm font-semibold mt-2">{likeCount} beğeni</p>

      {/* Açıklama */}
      <p className="text-gray-800 text-sm mt-1">
        <span className="font-semibold">{kullanici.kullaniciAdi}</span>{' '}
        {post.aciklama}
      </p>

      {/* Etiketler */}
      {post.etiketler.length > 0 && (
        <p className="text-blue-500 text-sm mt-0.5">
          {post.etiketler.map(e => `#${e}`).join(' ')}
        </p>
      )}

      {/* Yorumlar linki */}
      {post.yorumSayisi > 0 && (
        <button onClick={() => navigate(`/sosyal/post/${post.id}`)} className="mt-1">
          <p className="text-gray-400 text-sm">{post.yorumSayisi} yorumun tümünü gör</p>
        </button>
      )}

      {/* Zaman */}
      <p className="text-gray-400 text-[11px] mt-1">{zamanOnce(post.tarih)}</p>
    </div>
  )
}

export default function SosyalFeed() {
  const navigate = useNavigate()
  const [storyViewer, setStoryViewer] = useState(null)

  const postlar = [...SOSYAL_POSTLAR].sort((a, b) => new Date(b.tarih) - new Date(a.tarih))

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.9)' }}>
        <div className="w-full max-w-[430px] flex items-center justify-between" style={{ padding: '10px 20px', height: 56 }}>
          <button onClick={() => navigate('/profile')} className="flex items-center gap-2">
            <ArrowLeft size={20} strokeWidth={2} className="text-gray-900" />
          </button>
          <h1 className="text-gray-900 text-lg font-bold">Sosyal</h1>
          <div style={{ width: 20 }} />
        </div>
      </header>

      {/* İçerik */}
      <div style={{ paddingTop: 56, paddingBottom: 96, paddingLeft: 20, paddingRight: 20 }}>

        {/* Story Bar */}
        <div className="flex gap-3 overflow-x-auto py-4" style={{ scrollbarWidth: 'none' }}>
          {/* Hikaye Ekle */}
          <button onClick={() => navigate('/sosyal/paylasim')} className="shrink-0 flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
              <Camera size={22} strokeWidth={1.5} className="text-gray-400" />
            </div>
            <span className="text-[11px] text-gray-500">Ekle</span>
          </button>
          {SOSYAL_HIKAYELER.map(story => (
            <StoryCircle key={story.id} story={story} onClick={() => setStoryViewer(story)} />
          ))}
        </div>

        {/* Ayırıcı */}
        <div className="h-px bg-gray-100 mb-4" />

        {/* Postlar */}
        {postlar.map(post => {
          const kullanici = SOSYAL_KULLANICILAR.find(k => k.id === post.kullaniciId)
          if (!kullanici) return null
          return <PostCard key={post.id} post={post} kullanici={kullanici} navigate={navigate} />
        })}
      </div>

      {/* Story Viewer */}
      {storyViewer && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: storyViewer.renk }}>
          <button onClick={() => setStoryViewer(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white text-xl">✕</span>
          </button>
          <div className="absolute top-6 left-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(255,255,255,0.2)' }}>
              {storyViewer.emoji}
            </div>
            <p className="text-white text-sm font-semibold">{storyViewer.kullanici}</p>
          </div>
          <div className="text-center">
            <span className="text-8xl">{storyViewer.icerik}</span>
            <p className="text-white text-xl font-bold mt-6">{storyViewer.baslik}</p>
            <p className="text-white/70 text-sm mt-2">{storyViewer.aciklama}</p>
          </div>
        </div>
      )}

      <SosyalNav />
    </div>
  )
}
