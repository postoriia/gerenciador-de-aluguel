import { useQuery } from '@tanstack/react-query'
import { getTenants } from '../services/tenants-service'

export const useTenantsQuery = () => {
  return useQuery({
    queryKey: ['tenants'],
    queryFn: getTenants,
    staleTime: 1000 * 60 * 5,
  })
}
