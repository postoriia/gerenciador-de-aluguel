import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { type AxiosError } from 'axios'
import { toast } from 'sonner'
import { login } from '../services/auth-service'
import { type LoginBody } from '../types/auth'
import { setItem } from '@/lib/local-storage'
import useAuthStore from '@/store/auth-store'

interface ApiErrorResponse {
  status: string
  message: string
  statusCode: number
}

export const useLoginMutation = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated, setUser } = useAuthStore()

  return useMutation({
    mutationFn: (body: LoginBody) => login(body),
    onSuccess: (data) => {
      setItem('token', data.accessToken)
      setItem('user', data.data)
      setUser(data.data)
      setIsAuthenticated(true)
      toast.success('Login realizado com sucesso!')
      navigate('/dashboard')
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message =
        error.response?.data?.message || 'Erro ao realizar login. Tente novamente.'
      toast.error(message)
    },
  })
}
