import { type ReactNode, useEffect } from 'react'
import { useMeQuery } from '@/features/auth/hooks/use-me-query'
import useAuthStore from '@/store/auth-store'
import { Loader2 } from 'lucide-react'

export function AuthGuard({ children }: { children: ReactNode }) {
  const { setIsAuthenticated, setUser } = useAuthStore()
  const { data, isLoading, isError } = useMeQuery()

  useEffect(() => {
    if (data) {
      setIsAuthenticated(true)
      setUser(data)
    } else if (isError) {
      setIsAuthenticated(false)
      setUser(null)
    }
  }, [data, isError, setIsAuthenticated, setUser])

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
