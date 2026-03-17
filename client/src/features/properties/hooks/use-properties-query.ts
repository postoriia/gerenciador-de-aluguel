import { useQuery } from '@tanstack/react-query'
import { getProperties } from '../services/properties-service'

export const usePropertiesQuery = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
    staleTime: 1000 * 60 * 5,
  })
}
