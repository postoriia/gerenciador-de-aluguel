import { useQuery } from '@tanstack/react-query'
import { getMe } from '../services/auth-service'

export const useMeQuery = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
    staleTime: Infinity,
  })
}
