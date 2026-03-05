import { z } from 'zod'

export const contractStatusEnum = z.enum(['active', 'finished', 'canceled', 'defaulted'])

export const contractSchema = z.object({
  id: z.string().uuid().describe('Contract unique identifier'),
  propertyId: z.string().uuid().describe('Property ID'),
  tenantId: z.string().uuid().describe('Tenant ID'),
  startDate: z.coerce.date().describe('Contract start date'),
  endDate: z.coerce.date().describe('Contract end date'),
  rentAmount: z.number().positive().describe('Monthly rent amount'),
  depositAmount: z.number().nonnegative().describe('Security deposit amount'),
  status: contractStatusEnum.describe('Current status of the contract'),
  createdAt: z.date().describe('Creation date'),
  updatedAt: z.date().describe('Last update date')
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