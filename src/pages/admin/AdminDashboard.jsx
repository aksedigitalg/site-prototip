import { useNavigate } from 'react-router-dom'
import { Users, Building2, FileText, Eye, Bell, LogOut, ChevronRight } from 'lucide-react'
import AdminNav from '../../components/AdminNav'
import { ADMIN_ISTATISTIK, ADMIN_SON_AKTIVITE } from '../../data/mockAdmin'

const TIP_EMOJI = {
  yeni_kullanici: '👤',
  yeni_isletme:  '🏪',
  yeni_ilan:     '📋',
  onay:          '✅',
}

function StatKart({ label, deger, ikon: Icon, renk, alt }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: renk + '18' }}>
          <Icon size={16} strokeWidth={1.5} style={{ color: renk }} />
        </div>
        {alt && <span className="text-[10px] font-bold bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full">{alt}</span>}
      </div>
      <p className="text-gray-900 text-xl font-extrabold">{deger.toLocaleString()}</p>
      <p className="text-gray-400 text-[11px] mt-0.5">{label}</p>
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const s = ADMIN_ISTATISTIK

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[430px] bg-gray-900 px-4 pt-12 pb-3 flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[10px] font-semibold">Şehir App</p>
            <h1 className="text-white text-base font-extrabold">Yönetim Paneli</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <Bell size={16} strokeWidth={1.5} className="text-white" />
              </button>
              {s.bekleyenOnay > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">
                  {s.bekleyenOnay}
                </span>
              )}
            </div>
            <button
              onClick={() => { localStorage.removeItem('admin_session'); navigate('/admin/login', { replace: true }) }}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
            >
              <LogOut size={16} strokeWidth={1.5} className="text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="pt-[80px] pb-24 px-4">
        <div className="pt-4 grid grid-cols-2 gap-3">
          <StatKart label="Toplam Kullanıcı" deger={s.toplamKullanici} ikon={Users}    renk="#6366f1" />
          <StatKart label="Aktif İşletme"    deger={s.aktifIsletme}   ikon={Building2} renk="#10b981" alt={`${s.bekleyenOnay} bekliyor`} />
          <StatKart label="Toplam İlan"       deger={s.toplamIlan}     ikon={FileText}  renk="#f59e0b" />
          <StatKart label="Günlük Ziyaret"    deger={s.gunlukZiyaret}  ikon={Eye}       renk="#3b82f6" />
        </div>

        {/* Bekleyen onay butonu */}
        {s.bekleyenOnay > 0 && (
          <button
            onClick={() => navigate('/admin/isletmeler')}
            className="w-full mt-4 flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3.5 active:scale-[0.98] transition-transform"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
              <Building2 size={18} strokeWidth={1.5} className="text-orange-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-orange-800 text-sm font-bold">{s.bekleyenOnay} İşletme Onay Bekliyor</p>
              <p className="text-orange-500 text-xs">Başvuruları incele →</p>
            </div>
            <ChevronRight size={16} strokeWidth={1.5} className="text-orange-400" />
          </button>
        )}

        {/* Son aktivite */}
        <div className="mt-5">
          <h2 className="text-gray-700 text-sm font-bold mb-3">Son Aktivite</h2>
          <div className="flex flex-col gap-2">
            {ADMIN_SON_AKTIVITE.map(a => (
              <div key={a.id} className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                <span className="text-xl">{TIP_EMOJI[a.tip]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-700 text-xs font-medium truncate">{a.metin}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">{a.zaman}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bu ay */}
        <div className="mt-4 bg-gray-900 rounded-2xl px-4 py-4">
          <p className="text-white/50 text-xs mb-1">Bu Ay</p>
          <p className="text-white text-base font-extrabold">+{s.buAyYeniKullanici} yeni kullanıcı</p>
          <p className="text-white/40 text-xs mt-0.5">Büyüme devam ediyor 📈</p>
        </div>
      </div>

      <AdminNav />
    </div>
  )
}
