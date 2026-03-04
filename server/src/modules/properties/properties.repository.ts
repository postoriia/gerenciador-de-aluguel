import { DatabaseConnection } from '@/database/connection'
import { IProperty, IPropertyRepository } from './properties.types'
import { properties } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import * as schema from '@/database/schema'

export class PropertyRepository implements IPropertyRepository {
    private db: PostgresJsDatabase<typeof schema>

    constructor() {
        this.db = DatabaseConnection.getInstance().getClient()
    }

    async save(
        data: Omit<IProperty, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<IProperty> {
        try {
            const [property] = await this.db
                .insert(properties)
                .values({
                    ownerId: data.ownerId,
                    title: data.title,
                    type: data.type,
                    street: data.street,
                    number: data.number,
                    neighborhood: data.neighborhood,
                    city: data.city,
                    state: data.state,
                    zipCode: data.zipCode,
                    bedrooms: data.bedrooms,
                    area: data.area.toString(),
                    rentAmount: data.rentAmount.toString(),
                    condominiumFee: data.condominiumFee?.toString() ?? null,
                    iptu: data.iptu?.toString() ?? null,
                    isAvailable: data.isAvailable,
                    imageUrl: data.imageUrl
                })
                .returning()

            return {
                ...property,
                area: Number(property.area),
                rentAmount: Number(property.rentAmount),
                condominiumFee: property.condominiumFee ? Number(property.condominiumFee) : null,
                iptu: property.iptu ? Number(property.iptu) : null
            } as IProperty
        } catch (error) {
            throw new Error('Error saving property to database: ' + error)
        }
    }

    async findById(id: string): Promise<IProperty | null> {
        try {
            const property = await this.db.query.properties.findFirst({
                where: eq(properties.id, id)
            })

            if (!property) return null

            return {
                ...property,
                area: Number(property.area),
                rentAmount: Number(property.rentAmount),
                condominiumFee: property.condominiumFee ? Number(property.condominiumFee) : null,
                iptu: property.iptu ? Number(property.iptu) : null
            } as IProperty
        } catch (error) {
            throw new Error('Error finding property by ID: ' + error)
        }
    }

    async findAll(): Promise<IProperty[]> {
        try {
            const allProperties = await this.db.query.properties.findMany()
            return allProperties.map(property => ({
                ...property,
                area: Number(property.area),
                rentAmount: Number(property.rentAmount),
                condominiumFee: property.condominiumFee ? Number(property.condominiumFee) : null,
                iptu: property.iptu ? Number(property.iptu) : null
            })) as IProperty[]
        } catch (error) {
            throw new Error('Error finding all properties: ' + error)
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.db.delete(properties).where(eq(properties.id, id))
        } catch (error) {
            throw new Error('Error deleting property: ' + error)
        }
    }

    async update(
        id: string,
        data: Partial<Omit<IProperty, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<IProperty> {
        try {
            const [updatedProperty] = await this.db
                .update(properties)
                .set({
                    ...data,
                    area: data.area?.toString(),
                    rentAmount: data.rentAmount?.toString(),
                    condominiumFee: data.condominiumFee !== undefined ? data.condominiumFee?.toString() ?? null : undefined,
                    iptu: data.iptu !== undefined ? data.iptu?.toString() ?? null : undefined,
                    updatedAt: new Date()
                })
                .where(eq(properties.id, id))
                .returning()

            if (!updatedProperty) {
                throw new Error('Property not found for update')
            }

            return {
                ...updatedProperty,
                area: Number(updatedProperty.area),
                rentAmount: Number(updatedProperty.rentAmount),
                condominiumFee: updatedProperty.condominiumFee ? Number(updatedProperty.condominiumFee) : null,
                iptu: updatedProperty.iptu ? Number(updatedProperty.iptu) : null
            } as IProperty
        } catch (error) {
            throw new Error('Error updating property: ' + error)
        }
    }
}
