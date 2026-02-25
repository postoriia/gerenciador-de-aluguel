import { create } from 'zustand'
import { logger } from './logger'
import { type User } from '@/features/auth/types/auth'

type AuthState = {
  isAuthenticated: boolean
  user: User | null
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setUser: (user: User | null) => void
}

const useAuthStore = create<AuthState>()(
  logger<AuthState>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated })
      },
      setUser: (user) => {
        set({ user })
      },
    }),
    'authStore'
  )
)

export default useAuthStore
