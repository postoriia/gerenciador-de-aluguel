import { DatabaseConnection } from '@/database/connection'
import { IPayment, IPaymentRepository } from './payments.types'
import { payments } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import * as schema from '@/database/schema'

export class PaymentRepository implements IPaymentRepository {
  private db: PostgresJsDatabase<typeof schema>

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient()
  }

  async save(data: Omit<IPayment, 'id' | 'createdAt'>): Promise<IPayment> {
    try {
      const [payment] = await this.db
        .insert(payments)
        .values({
          contractId: data.contractId,
          dueDate: data.dueDate,
          paymentDate: data.paymentDate || null,
          amount: data.amount.toString(), // Numeric no banco é string
          status: data.status,
          referenceMonth: data.referenceMonth,
          referenceYear: data.referenceYear
        })
        .returning()

      return payment as unknown as IPayment
    } catch (error) {
      throw new Error('Error saving payment to database: ' + error)
    }
  }

  async findById(id: string): Promise<IPayment | null> {
    const payment = await this.db.query.payments.findFirst({
      where: eq(payments.id, id)
    })
    return (payment as unknown as IPayment) || null
  }

  async findAll(): Promise<IPayment[]> {
    const allPayments = await this.db.query.payments.findMany()
    return allPayments as unknown as IPayment[]
  }

  async findByContractId(contractId: string): Promise<IPayment[]> {
    const results = await this.db.query.payments.findMany({
      where: eq(payments.contractId, contractId)
    })
    return results as unknown as IPayment[]
  }

  async deleteById(id: string): Promise<void> {
    await this.db.delete(payments).where(eq(payments.id, id))
  }

  async update(id: string, data: Partial<Omit<IPayment, 'id' | 'createdAt'>>): Promise<IPayment> {
    const [updated] = await this.db
      .update(payments)
      .set({
        ...data,
        amount: data.amount ? data.amount.toString() : undefined
      })
      .where(eq(payments.id, id))
      .returning()

    if (!updated) throw new Error('Payment not found for update')
    return updated as unknown as IPayment
  }
}