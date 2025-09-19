import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { authAPI } from '../services/api'
import { LoadingSpinner } from './common/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, setUser, isLoading, setLoading } = useStore()
  const location = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
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
    }

    checkAuth()
  }, [isAuthenticated, setUser, setLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return <>{children}</>
}