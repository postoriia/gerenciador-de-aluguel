import { z } from 'zod/v4'

export const exampleSchema = z.object({
  id: z.string().uuid().describe('Example unique identifier'),
  title: z.string().min(1).describe('Example title'),
  description: z.string().nullable().describe('Example description'),
  createdAt: z.date().describe('Creation date'),
  updatedAt: z.date().describe('Last update date')
})

export const createExampleSchema = z.object({
  title: z
    .string({ message: 'Title is required' })
    .min(1, 'Title is required')
    .describe('Example title'),
  description: z.string().optional().describe('Example description')
})

export const updateExampleSchema = createExampleSchema.partial()

export const exampleIdSchema = z.object({
  id: z
    .string({ message: 'ID is required' })
    .uuid('Invalid UUID format')
    .min(1, 'ID is required')
    .describe('Example unique identifier')
})

export type CreateExampleInput = z.infer<typeof createExampleSchema>
export type UpdateExampleInput = z.infer<typeof updateExampleSchema>
