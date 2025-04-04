// src/components/ProtectedRoute.tsx
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <div>Cargando...</div>
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}