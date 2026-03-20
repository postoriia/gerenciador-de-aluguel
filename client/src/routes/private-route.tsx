import { type ReactElement } from 'react'
import { Navigate } from 'react-router'
import useAuthStore from '@/store/auth-store'

interface Props {
  children: ReactElement
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuthStore((state) => state)

  if (!isAuthenticated) {
    return <Navigate to="/entrar" replace />
  }

  return children
}

export default PrivateRoute
