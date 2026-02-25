import { type ReactElement } from 'react'
import { Navigate } from 'react-router'
import useAuthStore from '@/store/auth-store'

interface Props {
  children: ReactElement
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuthStore((state) => state)

  return isAuthenticated ? children : <Navigate to="/entrar" />
}

export default PrivateRoute
