import { api } from '@/lib/api'
import { type PaymentsResponse } from '../types/payments'

export const getPayments = async (): Promise<PaymentsResponse> => {
  const response = await api.get<PaymentsResponse>('/payments/owner')
  return response.data
}
