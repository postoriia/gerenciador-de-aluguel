import { z } from 'zod/v4'
import { isValidCPF } from '@/shared/utils/cpf-validator'

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

// Cadastro agora sem o campo role
export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  cpf: z.string().refine((val) => isValidCPF(val), {
    message: 'CPF inválido.'
  })
})

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória')
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>