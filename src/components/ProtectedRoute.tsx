import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'

interface Props { children: React.ReactNode }

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, isLoading } = useStore()
  const location = useLocation()

  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <Navigate to="/auth" state={{ from: location }} replace />

  return <>{children}</>
}
