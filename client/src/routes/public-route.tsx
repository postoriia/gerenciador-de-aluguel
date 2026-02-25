import { type ReactElement } from 'react'
import { Navigate } from 'react-router'
import useAuthStore from '@/store/auth-store'

interface Props {
  children: ReactElement
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuthStore((state) => state)

  return isAuthenticated ? <Navigate to="/dashboard" /> : children
}

export default PublicRoute
