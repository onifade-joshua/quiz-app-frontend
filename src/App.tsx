import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { QuestionsPage } from './pages/QuestionsPage'
import { QuizPage } from './pages/QuizPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Routes>
      <Toaster position="top-right" reverseOrder={false} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/questions" element={<ProtectedRoute><QuestionsPage /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/questions" replace />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  )
}

export default App
