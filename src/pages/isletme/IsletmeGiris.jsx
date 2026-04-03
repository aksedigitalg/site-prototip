import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Building2, LogIn, UserPlus } from 'lucide-react'

export default function IsletmeGiris() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-14 pb-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 text-sm mb-10 w-fit"
      >
        <ArrowLeft size={16} strokeWidth={2} /> Geri
      </button>

      {/* Logo & Başlık */}
      <div className="flex flex-col items-center text-center flex-1 justify-center pb-12">
        <div className="w-20 h-20 rounded-3xl bg-gray-900 flex items-center justify-center mb-6 shadow-lg">
          <Building2 size={36} strokeWidth={1.5} className="text-white" />
        </div>
        <h1 className="text-gray-900 text-2xl font-extrabold mb-2">İşletme Paneli</h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
          İşletmenizi yönetin, rezervasyonları takip edin ve kampanya oluşturun.
        </p>

        {/* Özellik listesi */}
        <div className="mt-8 flex flex-col gap-3 w-full max-w-[300px]">
          {[
            { emoji: '📊', text: 'Görüntülenme ve tıklama istatistikleri' },
            { emoji: '📅', text: 'Rezervasyon ve randevu yönetimi' },
            { emoji: '💬', text: 'Müşteri mesajları' },
            { emoji: '🎁', text: 'Kampanya oluştur ve yönet' },
          ].map(({ emoji, text }) => (
            <div key={text} className="flex items-center gap-3 text-left">
              <span className="text-lg shrink-0">{emoji}</span>
              <span className="text-gray-500 text-sm">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Butonlar */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate('/isletme/login')}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl shadow-sm active:scale-95 transition-transform"
        >
          <LogIn size={18} strokeWidth={2} />
          Giriş Yap
        </button>
        <button
          onClick={() => navigate('/isletme/register')}
          className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-base py-4 rounded-2xl active:scale-95 transition-transform"
        >
          <UserPlus size={18} strokeWidth={2} />
          İşletme Kaydı Oluştur
        </button>
      </div>
    </div>
  )
}
