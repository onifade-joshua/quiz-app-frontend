import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { LoginForm } from '../components/auth/LoginForm'
import { RegisterForm } from '../components/auth/RegisterForm'
import { useStore } from '../store/useStore'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, setUser } = useStore()

  // Auto-login if token exists
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const currentUser = await authAPI.getMe()
        setUser(currentUser)
      } catch (err: any) {
        console.error('Failed to fetch current user:', err)
        localStorage.removeItem('token')
        toast.error('Session expired. Please login again.')
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [setUser])

  // Loader while checking token
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'mirror' }}
          className="text-xl font-semibold text-primary-700"
        >
          Checking session...
        </motion.div>
      </div>
    )
  }

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left side - Hero / Branding */}
      <div className="relative md:w-1/2 w-full h-64 md:h-auto overflow-hidden">
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src="https://img.freepik.com/free-vector/quiz-comic-pop-art-style_175838-505.jpg"
          alt="Quiz App"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary-900/90 to-primary-700/70 flex items-center justify-center">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-extrabold text-white text-center px-6 drop-shadow-lg"
          >
            <span className="text-yellow-300">CBT Portal</span>
            <br />
            Powered by SamjodaTechSolutions
          </motion.h1>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-gray-200 relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-200 rounded-full blur-3xl opacity-30"></div>

          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back 👋' : 'Join the Community 🚀'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin
                ? 'Sign in to access quizzes and track your progress.'
                : 'Create an account to start your learning journey.'}
            </p>
          </div>

          {/* Render Forms with animated switch */}
          <motion.div
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {isLogin ? (
              <LoginForm onToggleMode={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onToggleMode={() => setIsLogin(true)} />
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
