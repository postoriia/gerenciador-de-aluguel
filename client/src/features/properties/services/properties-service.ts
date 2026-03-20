import { api } from '@/lib/api'
import { type PropertiesResponse, type PropertyResponse } from '../types/properties'

export const getProperties = async (): Promise<PropertiesResponse> => {
  const response = await api.get<PropertiesResponse>('/properties/owner')
  return response.data
}

export const getPropertyById = async (id: string): Promise<PropertyResponse> => {
  const response = await api.get<PropertyResponse>(`/properties/${id}`)
  return response.data
}
