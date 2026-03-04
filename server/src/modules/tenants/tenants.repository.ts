import { DatabaseConnection } from '@/database/connection'
import { ITenant, ITenantRepository } from './tenants.types'
import { tenants } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import * as schema from '@/database/schema'

export class TenantRepository implements ITenantRepository {
    private db: PostgresJsDatabase<typeof schema>

    constructor() {
        this.db = DatabaseConnection.getInstance().getClient()
    }

    async save(
        data: Omit<ITenant, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<ITenant> {
        try {
            const [tenant] = await this.db
                .insert(tenants)
                .values({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    cpf: data.cpf
                })
                .returning()

            return tenant as unknown as ITenant
        } catch (error) {
            throw new Error('Error saving tenant to database: ' + error)
        }
    }

    async findById(id: string): Promise<ITenant | null> {
        try {
            const tenant = await this.db.query.tenants.findFirst({
                where: eq(tenants.id, id)
            })

            return (tenant as unknown as ITenant) || null
        } catch (error) {
            throw new Error('Error finding tenant by ID: ' + error)
        }
    }

    async findAll(): Promise<ITenant[]> {
        try {
            const allTenants = await this.db.query.tenants.findMany()
            return allTenants as unknown as ITenant[]
        } catch (error) {
            throw new Error('Error finding all tenants: ' + error)
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.db.delete(tenants).where(eq(tenants.id, id))
        } catch (error) {
            throw new Error('Error deleting tenant: ' + error)
        }
    }

    async update(
        id: string,
        data: Partial<Omit<ITenant, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<ITenant> {
        try {
            const [updatedTenant] = await this.db
                .update(tenants)
                .set({
                    ...data,
                    updatedAt: new Date()
                })
                .where(eq(tenants.id, id))
                .returning()

            if (!updatedTenant) {
                throw new Error('Tenant not found for update')
            }

            return updatedTenant as unknown as ITenant
        } catch (error) {
            throw new Error('Error updating tenant: ' + error)
        }
    }
}
