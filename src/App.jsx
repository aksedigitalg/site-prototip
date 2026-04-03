import { Routes, Route, Navigate } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import OTP from './pages/OTP'
import Register from './pages/Register'
import Home from './pages/Home'

function PrivateRoute({ children }) {
  const user = localStorage.getItem('sehir_user')
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const user = localStorage.getItem('sehir_user')
  if (user) return <Navigate to="/home" replace />
  return children
}

function DevReset() {
  return (
    <button
      onClick={() => { localStorage.clear(); window.location.href = '/' }}
      className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white text-xs px-3 py-2 rounded-full opacity-40 hover:opacity-100 transition-opacity"
    >
      ↺ Sıfırla
    </button>
  )
}

export default function App() {
  const user = localStorage.getItem('sehir_user')
  const onboarded = localStorage.getItem('sehir_onboarded')

  return (
    <div className="flex justify-center bg-slate-100 min-h-screen">
      <div className="w-full max-w-[430px] min-h-screen bg-white relative overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={
              user
                ? <Navigate to="/home" replace />
                : onboarded
                  ? <Navigate to="/login" replace />
                  : <Navigate to="/onboarding" replace />
            }
          />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <DevReset />
      </div>
    </div>
  )
}
