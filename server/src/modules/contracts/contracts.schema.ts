import { z } from 'zod/v4'

export const contractStatusEnum = z.enum(['active', 'finished', 'canceled', 'defaulted'])

export const contractSchema = z.object({
  id: z.string().uuid(),
  propertyId: z.string().uuid(),
  tenantId: z.string().uuid(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  rentAmount: z.coerce.number(),
  depositAmount: z.coerce.number(),
  status: contractStatusEnum,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
})

export const createContractSchema = z.object({
  propertyId: z.string().uuid('Invalid Property ID'),
  tenantId: z.string().uuid('Invalid Tenant ID'),
  startDate: z.coerce.date({ message: 'Valid start date is required' }),
  endDate: z.coerce.date({ message: 'Valid end date is required' }),
  rentAmount: z.number().positive('Rent amount must be greater than 0'),
  depositAmount: z.number().nonnegative('Deposit amount cannot be negative'),
  status: contractStatusEnum.default('active')
})

export const updateContractSchema = createContractSchema.partial()

export const contractIdSchema = z.object({
  id: z.string().uuid('Invalid UUID format').min(1, 'ID is required')
})

export type CreateContractInput = z.infer<typeof createContractSchema>
export type UpdateContractInput = z.infer<typeof updateContractSchema>