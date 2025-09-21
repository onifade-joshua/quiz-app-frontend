import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { QuestionsPage } from './pages/QuestionsPage'
import { QuizPage } from './pages/QuizPage'
import { Dashboard } from '../src/components/common/Dashboard'
import  Profile  from '../src/components/common/Profile'
import { Results } from '../src/components/common/Results'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/questions" element={<ProtectedRoute><QuestionsPage /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/questions" replace />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  )
}

export default App
