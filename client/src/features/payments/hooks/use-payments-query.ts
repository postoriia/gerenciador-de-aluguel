import { useQuery } from '@tanstack/react-query'
import { getPayments } from '../services/payments-service'

export const usePaymentsQuery = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,
    staleTime: 1000 * 60 * 5,
  })
}
