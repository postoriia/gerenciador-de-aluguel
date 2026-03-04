import { type ReactNode, useEffect } from 'react'
import useAuthStore from '@/store/auth-store'
import { getItem } from '@/lib/local-storage'
import { type User } from '@/features/auth/types/auth'

export function AuthGuard({ children }: { children: ReactNode }) {
  const { setIsAuthenticated, setUser } = useAuthStore()

  useEffect(() => {
    const token = getItem<string>('token')
    const user = getItem<User>('user')

    if (token && user) {
      setIsAuthenticated(true)
      setUser(user)
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
  }, [setIsAuthenticated, setUser])

  return <>{children}</>
}
