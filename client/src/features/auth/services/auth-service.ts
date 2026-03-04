import { api } from '@/lib/api'
import {
  type LoginBody,
  type LoginResponse,
  type RegisterBody,
  type RegisterResponse,
  type User,
} from '../types/auth'

export const login = async (body: LoginBody): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', {
    email: body.email,
    password: body.password,
  })
  return response.data
}

export const register = async (body: RegisterBody): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/auth/register', {
    name: body.name,
    email: body.email,
    password: body.password,
    cpf: body.cpf,
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

