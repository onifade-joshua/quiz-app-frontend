import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthPage } from './pages/AuthPage'
import { QuestionsPage } from './pages/QuestionsPage'
import { QuizPage } from './pages/QuizPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useStore } from './store/useStore'
import { authAPI } from './services/api'

function App() {
  const { setUser, setLoading } = useStore()

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      setLoading(true)
      try {
        const { user } = await authAPI.getMe()
        setUser(user)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [setUser, setLoading])

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/questions"
              element={
                <ProtectedRoute>
                  <QuestionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/questions" replace />} />
          </Routes>
        </div>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  )
}

export default App