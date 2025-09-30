import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import  Dashboard  from './pages/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast';
import StudyCommunity from './pages/StudyCommunity';
import ProfilePage from './pages/ProfilePage';
import CBTPracticePage from './pages/CBTPracticePage';
import AudioPage from './pages/AudioPage';
import {ForgotPassword} from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
         <Route path="/cbt-practice" element={<ProtectedRoute><CBTPracticePage /></ProtectedRoute>} />
        <Route path="/study-community" element={<ProtectedRoute><StudyCommunity /></ProtectedRoute>} />
        <Route path="/audio-page" element={<ProtectedRoute><AudioPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  )
}

export default App
