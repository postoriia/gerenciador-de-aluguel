import { z } from 'zod/v4'

export const paymentStatusEnum = z.enum(['pending', 'paid', 'late', 'canceled'])

export const paymentSchema = z.object({
  id: z.string().uuid().describe('Payment unique identifier'),
  contractId: z.string().uuid().describe('Associated contract ID'),
  dueDate: z.coerce.date().describe('Payment due date'),
  paymentDate: z.coerce.date().nullable().describe('Actual payment date'),
  amount: z.coerce.number().describe('Payment amount'),
  status: paymentStatusEnum.describe('Current status'),
  referenceMonth: z.number().min(1).max(12).describe('Reference month (1-12)'),
  referenceYear: z.number().min(2000).describe('Reference year'),
  createdAt: z.date().describe('Creation date')
})

export const createPaymentSchema = z.object({
  contractId: z.string().uuid('Invalid contract ID'),
  dueDate: z.coerce.date({ message: 'Due date is required' }),
  amount: z.number().positive('Amount must be positive'),
  referenceMonth: z.number().min(1).max(12),
  referenceYear: z.number().min(2000),
  status: paymentStatusEnum.default('pending')
})

export const updatePaymentSchema = z.object({
  status: paymentStatusEnum.optional(),
  paymentDate: z.coerce.date().nullable().optional(),
  amount: z.number().positive().optional()
})

export const paymentIdSchema = z.object({
  id: z.string().uuid('Invalid UUID format')
})

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>