import { api } from '@/lib/api'
import { type TenantsResponse } from '../types/tenants'

export const getTenants = async (): Promise<TenantsResponse> => {
  const response = await api.get<TenantsResponse>('/tenants/owner')
  return response.data
}
