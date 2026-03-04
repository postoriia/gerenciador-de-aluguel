export interface User {
  id: string
  name: string
  email: string
  cpf: string
  createdAt: string
  updatedAt: string
}

export interface LoginBody {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  accessToken: string
  data: User
}

export interface RegisterBody {
  name: string
  email: string
  password: string
  cpf: string
}

export interface RegisterResponse {
  message: string
  data: User
}

