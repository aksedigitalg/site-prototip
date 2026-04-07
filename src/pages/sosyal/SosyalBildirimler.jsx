import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SOSYAL_BILDIRIMLER, SOSYAL_KULLANICILAR, SOSYAL_POSTLAR } from '../../data/mockSosyal'
import SosyalNav from '../../components/SosyalNav'

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

function bildirimMetni(tip) {
  if (tip === 'begeni') return 'gönderini beğendi'
  if (tip === 'yorum') return 'gönderine yorum yaptı'
  if (tip === 'takip') return 'seni takip etmeye başladı'
  return ''
}

export default function SosyalBildirimler() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.9)' }}>
        <div className="w-full max-w-[430px] flex items-center justify-between" style={{ padding: '10px 20px', height: 56 }}>
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={20} strokeWidth={2} className="text-gray-900" />
          </button>
          <h1 className="text-gray-900 text-base font-bold">Bildirimler</h1>
          <div style={{ width: 20 }} />
        </div>
      </header>

      <div style={{ paddingTop: 56, paddingBottom: 96, paddingLeft: 20, paddingRight: 20 }}>
        {SOSYAL_BILDIRIMLER.map(bildirim => {
          const kullanici = SOSYAL_KULLANICILAR.find(k => k.id === bildirim.kimden)
          const post = bildirim.postId ? SOSYAL_POSTLAR.find(p => p.id === bildirim.postId) : null
          if (!kullanici) return null

          return (
            <button
              key={bildirim.id}
              onClick={() => bildirim.postId ? navigate(`/sosyal/post/${bildirim.postId}`) : navigate(`/sosyal/profil/${bildirim.kimden}`)}
              className="w-full flex items-center gap-3 py-3 text-left active:bg-gray-50 transition-colors"
              style={{ background: bildirim.okundu ? 'transparent' : 'rgba(59,130,246,0.04)' }}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: kullanici.bg }}>
                  {kullanici.avatar}
                </div>
                {!bildirim.okundu && (
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                )}
              </div>

              {/* İçerik */}
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold text-gray-900">{kullanici.kullaniciAdi}</span>{' '}
                  <span className="text-gray-600">{bildirimMetni(bildirim.tip)}</span>
                </p>
                <p className="text-gray-400 text-[11px] mt-0.5">{zamanOnce(bildirim.tarih)}</p>
              </div>

              {/* Post thumbnail */}
              {post && (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: post.gradyan }}>
                  <span className="text-lg">{post.emoji}</span>
                </div>
              )}
            </button>
          )
        })}
      </div>

      <SosyalNav />
    </div>
  )
}
