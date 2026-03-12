import { api } from '@/lib/api'
import { type ContractsResponse } from '../types/contracts'

export const getContracts = async (): Promise<ContractsResponse> => {
  const response = await api.get<ContractsResponse>('/contracts')
  return response.data
}
