import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { QuestionsPage } from './pages/QuestionsPage'
import QuizPage from "./pages/QuizPage"; 
import  Dashboard  from './pages/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast';
import StudyCommunity from './pages/StudyCommunity';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/questions" element={<ProtectedRoute><QuestionsPage /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/study-community" element={<ProtectedRoute><StudyCommunity /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  )
}

export default App
