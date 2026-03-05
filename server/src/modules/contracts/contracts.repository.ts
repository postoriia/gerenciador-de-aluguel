import { DatabaseConnection } from '@/database/connection'
import { IContract, IContractRepository } from './contracts.types'
import { contracts } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import * as schema from '@/database/schema'

export class ContractRepository implements IContractRepository {
  private db: PostgresJsDatabase<typeof schema>

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient()
  }

  async save(data: Omit<IContract, 'id' | 'createdAt' | 'updatedAt'>): Promise<IContract> {
    try {
      const [contract] = await this.db.insert(contracts).values({
        ...data,
        rentAmount: data.rentAmount.toString(),
        depositAmount: data.depositAmount.toString()
      }).returning()
      return contract as unknown as IContract
    } catch (error) {
      throw new Error('Error saving contract: ' + error)
    }
  }

  async findById(id: string): Promise<IContract | null> {
    const contract = await this.db.query.contracts.findFirst({ where: eq(contracts.id, id) })
    return (contract as unknown as IContract) || null
  }

  async findAll(): Promise<IContract[]> {
    const all = await this.db.query.contracts.findMany()
    return all as unknown as IContract[]
  }

  async deleteById(id: string): Promise<void> {
    await this.db.delete(contracts).where(eq(contracts.id, id))
  }

  async update(id: string, data: Partial<IContract>): Promise<IContract> {
    try {
      const updateData: any = { ...data, updatedAt: new Date() }
      
      if (data.rentAmount !== undefined) updateData.rentAmount = data.rentAmount.toString()
      if (data.depositAmount !== undefined) updateData.depositAmount = data.depositAmount.toString()

      const [updated] = await this.db.update(contracts)
        .set(updateData)
        .where(eq(contracts.id, id))
        .returning()

      if (!updated) throw new Error('Contract not found')
      return updated as unknown as IContract
    } catch (error) {
      throw new Error('Error updating contract: ' + error)
    }
  }
}