import { Routes, Route, Navigate } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetOTP from './pages/ResetOTP'
import NewPassword from './pages/NewPassword'
import Home from './pages/Home'
import NearbyDetail from './pages/NearbyDetail'
import FoodPage from './pages/FoodPage'
import RestaurantDetail from './pages/RestaurantDetail'
import ServicesPage from './pages/ServicesPage'
import ServiceDetail from './pages/ServiceDetail'
import IlanlarPage from './pages/IlanlarPage'
import EmlakDetail from './pages/EmlakDetail'
import VasitaDetail from './pages/VasitaDetail'
import IkincielDetail from './pages/IkincielDetail'
import EtkinliklerPage from './pages/EtkinliklerPage'
import EtkinlikDetail from './pages/EtkinlikDetail'
import AlisverisPage from './pages/AlisverisPage'
import SaticiProfil from './pages/SaticiProfil'
import RezervasyonForm from './pages/RezervasyonForm'
import TeklifForm from './pages/TeklifForm'
import Rezervasyonlarim from './pages/Rezervasyonlarim'
import Randevularim from './pages/Randevularim'
import TekliflerPage from './pages/TekliflerPage'
import MesajlarPage from './pages/MesajlarPage'
import MesajDetay from './pages/MesajDetay'
import GebzemAI from './pages/GebzemAI'
import Search from './pages/Search'
import Explore from './pages/Explore'
import Campaigns from './pages/Campaigns'
import Profile from './pages/Profile'

// İşletme paneli
import IsletmeLogin         from './pages/isletme/IsletmeLogin'
import IsletmeDashboard     from './pages/isletme/IsletmeDashboard'
import IsletmeProfil        from './pages/isletme/IsletmeProfil'
import IsletmeRezervasyonlar from './pages/isletme/IsletmeRezervasyonlar'
import IsletmeMesajlar      from './pages/isletme/IsletmeMesajlar'
import IsletmeKampanyalar   from './pages/isletme/IsletmeKampanyalar'

// Admin paneli
import AdminLogin       from './pages/admin/AdminLogin'
import AdminDashboard   from './pages/admin/AdminDashboard'
import AdminKullanicilar from './pages/admin/AdminKullanicilar'
import AdminIsletmeler  from './pages/admin/AdminIsletmeler'
import AdminAyarlar     from './pages/admin/AdminAyarlar'

function PrivateRoute({ children }) {
  const session = localStorage.getItem('sehir_session')
  return session ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const session = localStorage.getItem('sehir_session')
  if (session) return <Navigate to="/home" replace />
  return children
}

function IsletmeRoute({ children }) {
  const session = localStorage.getItem('isletme_session')
  return session ? children : <Navigate to="/isletme/login" replace />
}

function AdminRoute({ children }) {
  const session = localStorage.getItem('admin_session')
  return session ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  const session  = localStorage.getItem('sehir_session')
  const onboarded = localStorage.getItem('sehir_onboarded')

  return (
    <div className="flex justify-center bg-slate-100 min-h-screen">
      <div className="w-full max-w-[430px] min-h-screen bg-white relative overflow-hidden">
        <Routes>
          {/* ── Yönlendirme ── */}
          <Route
            path="/"
            element={
              session
                ? <Navigate to="/home" replace />
                : onboarded
                  ? <Navigate to="/login" replace />
                  : <Navigate to="/onboarding" replace />
            }
          />

          {/* ── Auth ── */}
          <Route path="/onboarding"      element={<Onboarding />} />
          <Route path="/login"           element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register"        element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-otp"       element={<ResetOTP />} />
          <Route path="/new-password"    element={<NewPassword />} />

          {/* ── Ana ── */}
          <Route path="/home"            element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/nearby/:type"    element={<PrivateRoute><NearbyDetail /></PrivateRoute>} />
          <Route path="/search"          element={<PrivateRoute><Search /></PrivateRoute>} />
          <Route path="/explore"         element={<PrivateRoute><Explore /></PrivateRoute>} />
          <Route path="/campaigns"       element={<PrivateRoute><Campaigns /></PrivateRoute>} />
          <Route path="/profile"         element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/gebzem-ai"       element={<PrivateRoute><GebzemAI /></PrivateRoute>} />

          {/* ── Yemek & Restoran ── */}
          <Route path="/food"            element={<PrivateRoute><FoodPage /></PrivateRoute>} />
          <Route path="/restaurant/:id"  element={<PrivateRoute><RestaurantDetail /></PrivateRoute>} />

          {/* ── Hizmetler ── */}
          <Route path="/services"        element={<PrivateRoute><ServicesPage /></PrivateRoute>} />
          <Route path="/service/:id"     element={<PrivateRoute><ServiceDetail /></PrivateRoute>} />

          {/* ── İlanlar ── */}
          <Route path="/ilanlar"               element={<PrivateRoute><IlanlarPage /></PrivateRoute>} />
          <Route path="/ilanlar/emlak/:id"     element={<PrivateRoute><EmlakDetail /></PrivateRoute>} />
          <Route path="/ilanlar/vasita/:id"    element={<PrivateRoute><VasitaDetail /></PrivateRoute>} />
          <Route path="/ilanlar/ikinciel/:id"  element={<PrivateRoute><IkincielDetail /></PrivateRoute>} />

          {/* ── Etkinlikler ── */}
          <Route path="/etkinlikler"     element={<PrivateRoute><EtkinliklerPage /></PrivateRoute>} />
          <Route path="/etkinlik/:id"    element={<PrivateRoute><EtkinlikDetail /></PrivateRoute>} />

          {/* ── Alışveriş ── */}
          <Route path="/alisveris"       element={<PrivateRoute><AlisverisPage /></PrivateRoute>} />
          <Route path="/magaza/:id"      element={<PrivateRoute><SaticiProfil /></PrivateRoute>} />

          {/* ── Rezervasyon / Randevu / Teklif ── */}
          <Route path="/rezervasyon/:id"   element={<PrivateRoute><RezervasyonForm /></PrivateRoute>} />
          <Route path="/randevu-form/:id"  element={<PrivateRoute><RezervasyonForm /></PrivateRoute>} />
          <Route path="/teklif-form/:id"   element={<PrivateRoute><TeklifForm /></PrivateRoute>} />

          {/* ── Profil Alt Sayfaları ── */}
          <Route path="/rezervasyonlarim"  element={<PrivateRoute><Rezervasyonlarim /></PrivateRoute>} />
          <Route path="/randevularim"      element={<PrivateRoute><Randevularim /></PrivateRoute>} />
          <Route path="/tekliflerim"       element={<PrivateRoute><TekliflerPage /></PrivateRoute>} />
          <Route path="/mesajlarim"        element={<PrivateRoute><MesajlarPage /></PrivateRoute>} />
          <Route path="/mesaj/:id"         element={<PrivateRoute><MesajDetay /></PrivateRoute>} />

          {/* ── İşletme Paneli ── */}
          <Route path="/isletme/login"          element={<IsletmeLogin />} />
          <Route path="/isletme/dashboard"      element={<IsletmeRoute><IsletmeDashboard /></IsletmeRoute>} />
          <Route path="/isletme/profil"         element={<IsletmeRoute><IsletmeProfil /></IsletmeRoute>} />
          <Route path="/isletme/rezervasyonlar" element={<IsletmeRoute><IsletmeRezervasyonlar /></IsletmeRoute>} />
          <Route path="/isletme/mesajlar"       element={<IsletmeRoute><IsletmeMesajlar /></IsletmeRoute>} />
          <Route path="/isletme/kampanyalar"    element={<IsletmeRoute><IsletmeKampanyalar /></IsletmeRoute>} />

          {/* ── Admin Paneli ── */}
          <Route path="/admin/login"        element={<AdminLogin />} />
          <Route path="/admin/dashboard"    element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/kullanicilar" element={<AdminRoute><AdminKullanicilar /></AdminRoute>} />
          <Route path="/admin/isletmeler"   element={<AdminRoute><AdminIsletmeler /></AdminRoute>} />
          <Route path="/admin/ayarlar"      element={<AdminRoute><AdminAyarlar /></AdminRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}
