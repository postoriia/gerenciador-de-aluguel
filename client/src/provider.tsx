import { QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { AuthGuard } from './components/auth-guard'
import { queryClient } from './lib/react-query'

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>{children}</AuthGuard>
    </QueryClientProvider>
  )
}
