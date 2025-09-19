import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { LoginForm } from '../components/auth/LoginForm'
import { RegisterForm } from '../components/auth/RegisterForm'
import { useStore } from '../store/useStore'

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { isAuthenticated } = useStore()

  if (isAuthenticated) {
    return <Navigate to="/questions" replace />
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - image with overlay */}
      <div className="relative md:w-1/2 w-full h-64 md:h-auto">
        <img
          src="https://img.freepik.com/free-vector/quiz-comic-pop-art-style_175838-505.jpg"
          alt="Quiz App"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary-800/80 to-primary-600/70 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center px-4">
            Welcome to <span className="text-yellow-300">Quiz App</span>
          </h1>
        </div>
      </div>

      {/* Right side - form */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50 p-6 sm:p-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin
                ? 'Access quizzes, track progress, and improve your knowledge.'
                : 'Join our community and start creating or taking quizzes.'}
            </p>
          </div>

          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleMode={() => setIsLogin(true)} />
          )}

          {/* Demo credentials (only for dev/demo) */}
          <div className="mt-8 text-center bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="text-sm text-gray-600">
              Demo login: <br />
              <span className="font-mono text-gray-800">demo@example.com</span> /{' '}
              <span className="font-mono text-gray-800">password123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
