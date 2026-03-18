import { type ReactElement } from 'react'
import { Navigate } from 'react-router'
import useAuthStore from '@/store/auth-store'

interface Props {
  children: ReactElement
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuthStore((state) => state)

  // Se o Zustand diz que está logado, ele manda para o dashboard
  // Adicione um log aqui para debugar no F12
  console.log("PublicRoute - Autenticado?", isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default PublicRoute
