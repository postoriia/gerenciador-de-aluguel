import { api } from '@/lib/api'
import { type LoginBody, type LoginResponse, type User } from '../types/auth'

export const login = async (body: LoginBody): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', {
    email: body.email,
    password: body.password,
  })
  return response.data
}

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>('/auth/me')
  return response.data
}

export const logout = async () => {
  await api.post('/auth/logout')
}
