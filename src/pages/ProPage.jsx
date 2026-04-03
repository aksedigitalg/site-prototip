import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Check, X, Crown, Zap, Building2,
  ChevronDown, ChevronUp,
} from 'lucide-react'
import { PRO_PLANLAR, PRO_SSS } from '../data/mockPro'

const PLAN_ICONS = {
  free:     null,
  pro:      Crown,
  isletme:  Building2,
}

export default function ProPage() {
  const navigate = useNavigate()
  const [yillik,    setYillik]    = useState(false)
  const [secili,    setSecili]    = useState('pro')
  const [acikSSS,   setAcikSSS]   = useState(null)

  const planRenk = {
    free:     { bg: '#f9fafb', border: '#e5e7eb',  text: '#6b7280', badge: null },
    pro:      { bg: '#111827', border: '#111827',   text: '#ffffff', badge: 'En Popüler' },
    isletme:  { bg: '#7c3aed', border: '#7c3aed',  text: '#ffffff', badge: 'Kurumsal' },
  }

  function fiyatGoster(plan) {
    if (plan.fiyat === 0) return 'Ücretsiz'
    const fiyat = yillik ? plan.fiyatYillik : plan.fiyat
    return `₺${fiyat}/ay`
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200 transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-700" />
          </button>
          <span className="text-gray-900 text-base font-bold flex-1">Pro Hesap</span>
          <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1.5">
            <Crown size={13} strokeWidth={2} className="text-yellow-500" />
            <span className="text-yellow-700 text-xs font-bold">Ücretsiz</span>
          </div>
        </div>
      </header>

      <div className="pt-16 pb-12">

        {/* Hero */}
        <div className="px-4 pt-6 pb-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-4">
            <Crown size={28} strokeWidth={1.5} className="text-yellow-400" />
          </div>
          <h1 className="text-gray-900 text-xl font-extrabold mb-2">Şehri Pro Yaşa</h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
            Reklamsız deneyim, sınırsız GebzemAI ve çok daha fazlası için Pro'ya geç.
          </p>
        </div>

        {/* Aylık / Yıllık toggle */}
        <div className="flex justify-center mb-6 px-4">
          <div className="flex bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setYillik(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: !yillik ? '#111827' : 'transparent',
                color:      !yillik ? '#ffffff' : '#6b7280',
              }}
            >
              Aylık
            </button>
            <button
              onClick={() => setYillik(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5"
              style={{
                background: yillik ? '#111827' : 'transparent',
                color:      yillik ? '#ffffff' : '#6b7280',
              }}
            >
              Yıllık
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: yillik ? '#ffffff22' : '#dcfce7', color: yillik ? '#86efac' : '#16a34a' }}
              >
                %25 İndirim
              </span>
            </button>
          </div>
        </div>

        {/* Plan kartları */}
        <div className="flex gap-3 px-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {PRO_PLANLAR.map(plan => {
            const renkler = planRenk[plan.id]
            const aktif   = secili === plan.id
            const Icon    = PLAN_ICONS[plan.id]

            return (
              <button
                key={plan.id}
                onClick={() => setSecili(plan.id)}
                className="shrink-0 flex flex-col rounded-2xl p-5 text-left transition-all active:scale-95"
                style={{
                  width: '220px',
                  background:  aktif ? (plan.id === 'free' ? '#f3f4f6' : renkler.bg) : '#ffffff',
                  border:      aktif ? `2px solid ${renkler.border}` : '2px solid #e5e7eb',
                  color:       aktif && plan.id !== 'free' ? '#ffffff' : '#111827',
                }}
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: aktif && plan.id !== 'free' ? 'rgba(255,255,255,0.2)' : '#f3f4f6' }}
                  >
                    {Icon
                      ? <Icon size={18} strokeWidth={1.5} style={{ color: aktif && plan.id !== 'free' ? '#ffffff' : '#374151' }} />
                      : <Zap size={18} strokeWidth={1.5} className="text-gray-400" />
                    }
                  </div>
                  {renkler.badge && (
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-full"
                      style={{
                        background: aktif ? 'rgba(255,255,255,0.25)' : (plan.id === 'pro' ? '#111827' : '#7c3aed'),
                        color: '#ffffff',
                      }}
                    >
                      {renkler.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold mb-1 opacity-70">{plan.isim}</p>
                <p className="text-2xl font-extrabold mb-4">{fiyatGoster(plan)}</p>

                <div className="flex flex-col gap-2">
                  {plan.ozellikler.map((oz, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {oz.var
                        ? <Check size={13} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: aktif && plan.id !== 'free' ? '#86efac' : '#16a34a' }} />
                        : <X    size={13} strokeWidth={2.5} className="mt-0.5 shrink-0 opacity-30" />
                      }
                      <span className="text-xs leading-snug opacity-80">{oz.label}</span>
                    </div>
                  ))}
                </div>
              </button>
            )
          })}
        </div>

        {/* CTA */}
        <div className="px-4 mt-6">
          {secili === 'free' ? (
            <div className="bg-gray-100 rounded-2xl px-5 py-4 text-center">
              <p className="text-gray-500 text-sm font-medium">Ücretsiz planda devam ediyorsunuz.</p>
            </div>
          ) : (
            <button
              className="w-full py-4 rounded-2xl text-white text-sm font-bold active:scale-95 transition-transform"
              style={{ background: secili === 'pro' ? '#111827' : '#7c3aed' }}
            >
              {secili === 'pro'
                ? `Pro'ya Geç — ${yillik ? '₺59' : '₺79'}/ay`
                : `İşletme'ye Geç — ${yillik ? '₺149' : '₺199'}/ay`
              }
            </button>
          )}
          <p className="text-gray-400 text-xs text-center mt-3">
            İstediğiniz zaman iptal edebilirsiniz · Güvenli ödeme
          </p>
        </div>

        {/* SSS */}
        <div className="px-4 mt-8">
          <h2 className="text-gray-900 text-sm font-bold mb-3">Sık Sorulan Sorular</h2>
          <div className="flex flex-col gap-2">
            {PRO_SSS.map((s, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setAcikSSS(acikSSS === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-4 text-left active:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-800 text-sm font-medium flex-1 pr-4">{s.soru}</span>
                  {acikSSS === i
                    ? <ChevronUp   size={16} strokeWidth={1.5} className="text-gray-400 shrink-0" />
                    : <ChevronDown size={16} strokeWidth={1.5} className="text-gray-400 shrink-0" />
                  }
                </button>
                {acikSSS === i && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-500 text-sm leading-relaxed">{s.cevap}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
