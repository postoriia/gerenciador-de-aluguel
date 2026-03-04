import { z } from 'zod/v4'

export const propertySchema = z.object({
    id: z.string().uuid().describe('Property unique identifier'),
    ownerId: z.string().uuid().describe('Owner of the property'),
    title: z.string().min(1).describe('Property title'),
    type: z.string().min(1).describe('Property type'),
    street: z.string().min(1).describe('Street address'),
    number: z.string().min(1).describe('Street number'),
    neighborhood: z.string().min(1).describe('Neighborhood'),
    city: z.string().min(1).describe('City'),
    state: z.string().min(1).describe('State'),
    zipCode: z.string().nullable().describe('Zip code'),
    bedrooms: z.number().int().describe('Number of bedrooms'),
    area: z.number().describe('Area size'),
    rentAmount: z.number().describe('Rent amount'),
    condominiumFee: z.number().nullable().describe('Condominium fee'),
    iptu: z.number().nullable().describe('IPTU value'),
    isAvailable: z.boolean().describe('Availability status'),
    imageUrl: z.string().nullable().describe('Image URL'),
    createdAt: z.date().describe('Creation date'),
    updatedAt: z.date().describe('Last update date')
})

export const createPropertySchema = z.object({
    ownerId: z.string().uuid('Invalid owner ID format'),
    title: z.string().min(1, 'Title is required'),
    type: z.string().min(1, 'Type is required'),
    street: z.string().min(1, 'Street is required'),
    number: z.string().min(1, 'Number is required'),
    neighborhood: z.string().min(1, 'Neighborhood is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().optional().nullable(),
    bedrooms: z.number().int().default(0),
    area: z.number().default(0),
    rentAmount: z.number({ message: 'Rent amount is required' }),
    condominiumFee: z.number().optional().nullable(),
    iptu: z.number().optional().nullable(),
    isAvailable: z.boolean().default(true),
    imageUrl: z.string().optional().nullable()
})

export const updatePropertySchema = createPropertySchema.partial()

export const propertyIdSchema = z.object({
    id: z.string().uuid('Invalid UUID format').min(1, 'ID is required')
})

export type CreatePropertyInput = z.infer<typeof createPropertySchema>
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>
