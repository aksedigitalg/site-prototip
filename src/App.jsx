import { Routes, Route, Navigate } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetOTP from './pages/ResetOTP'
import NewPassword from './pages/NewPassword'
import Home from './pages/Home'
import Search from './pages/Search'
import Explore from './pages/Explore'
import Campaigns from './pages/Campaigns'
import Profile from './pages/Profile'

function PrivateRoute({ children }) {
  const session = localStorage.getItem('sehir_session')
  return session ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const session = localStorage.getItem('sehir_session')
  if (session) return <Navigate to="/home" replace />
  return children
}

function DevReset() {
  return (
    <button
      onClick={() => { localStorage.clear(); sessionStorage.clear(); window.location.href = '/' }}
      className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white text-xs px-3 py-2 rounded-full opacity-40 hover:opacity-100 transition-opacity"
    >
      ↺ Sıfırla
    </button>
  )
}

export default function App() {
  const session = localStorage.getItem('sehir_session')
  const onboarded = localStorage.getItem('sehir_onboarded')

  return (
    <div className="flex justify-center bg-slate-100 min-h-screen">
      <div className="w-full max-w-[430px] min-h-screen bg-white relative overflow-hidden">
        <Routes>
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
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-otp" element={<ResetOTP />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/home"      element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/search"    element={<PrivateRoute><Search /></PrivateRoute>} />
          <Route path="/explore"   element={<PrivateRoute><Explore /></PrivateRoute>} />
          <Route path="/campaigns" element={<PrivateRoute><Campaigns /></PrivateRoute>} />
          <Route path="/profile"   element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <DevReset />
      </div>
    </div>
  )
}
