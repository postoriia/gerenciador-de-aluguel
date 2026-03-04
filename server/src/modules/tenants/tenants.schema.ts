import { z } from 'zod/v4'
import { isValidCPF } from '@/shared/utils/cpf-validator'

export const tenantSchema = z.object({
    id: z.string().uuid().describe('Tenant unique identifier'),
    name: z.string().min(1).describe('Tenant name'),
    email: z.string().email().describe('Tenant email'),
    phone: z.string().min(1).describe('Tenant phone number'),
    cpf: z.string().describe('Tenant CPF'),
    createdAt: z.date().describe('Creation date'),
    updatedAt: z.date().describe('Last update date')
})

export const createTenantSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    phone: z.string().min(1, 'Phone is required'),
    cpf: z.string().refine((val) => isValidCPF(val), {
        message: 'CPF inválido.'
    })
})

export const updateTenantSchema = createTenantSchema.partial()

export const tenantIdSchema = z.object({
    id: z.string().uuid('Invalid UUID format').min(1, 'ID is required')
})

export type CreateTenantInput = z.infer<typeof createTenantSchema>
export type UpdateTenantInput = z.infer<typeof updateTenantSchema>
