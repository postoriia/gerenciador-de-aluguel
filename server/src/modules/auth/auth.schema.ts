import { z } from 'zod/v4'
import { isValidCPF, formatCPF } from '@/shared/utils/cpf-validator'
import { isValidPhone, formatPhone } from '@/shared/utils/phone-validator'

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  phone: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})

// Cadastro agora sem o campo role
// Cadastro agora sem o campo role
export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  phone: z.string()
    .refine(isValidPhone, 'Telefone inválido.')
    .transform(formatPhone)
    .optional()
    .nullable(),
  cpf: z.string()
    .refine((val) => isValidCPF(val), { message: 'CPF inválido.' })
    .transform(formatCPF)
})

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória')
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>