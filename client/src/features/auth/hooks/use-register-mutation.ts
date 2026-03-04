import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { type AxiosError } from 'axios'
import { toast } from 'sonner'
import { register } from '../services/auth-service'
import { type RegisterBody } from '../types/auth'

interface ApiErrorResponse {
  status: string
  message: string
  statusCode: number
}

export const useRegisterMutation = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (body: RegisterBody) => register(body),
    onSuccess: () => {
      toast.success('Conta criada com sucesso! Faça login para continuar.')
      navigate('/entrar')
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message =
        error.response?.data?.message || 'Erro ao criar conta. Tente novamente.'
      toast.error(message)
    },
  })
}
