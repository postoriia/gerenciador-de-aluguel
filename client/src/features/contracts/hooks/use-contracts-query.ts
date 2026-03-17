import { useQuery } from '@tanstack/react-query'
import { getContracts } from '../services/contracts-service'

export const useContractsQuery = () => {
  return useQuery({
    queryKey: ['contracts'],
    queryFn: getContracts,
    staleTime: 1000 * 60 * 5,
  })
}
