import { PaymentRepository } from './payments.repository'
import { IPayment, IPaymentRepository } from './payments.types'
import { AppError } from '@/core/errors/app-error'
import { CreatePaymentInput, UpdatePaymentInput } from './payments.schema'

export class PaymentService {
  constructor(
    private readonly repository: IPaymentRepository = new PaymentRepository()
  ) {}

  public async create(data: CreatePaymentInput): Promise<IPayment> {
    return await this.repository.save({
      ...data,
      paymentDate: null
    })
  }

  public async findById(id: string): Promise<IPayment> {
    const payment = await this.repository.findById(id)
    if (!payment) throw new AppError('Payment not found', 404)
    return payment
  }

  public async findAll(): Promise<IPayment[]> {
    return await this.repository.findAll()
  }

  public async findByContractId(contractId: string): Promise<IPayment[]> {
    return await this.repository.findByContractId(contractId)
  }

  public async deleteById(id: string): Promise<void> {
    await this.findById(id) // Verifica existência
    return await this.repository.deleteById(id)
  }

  public async update(id: string, data: UpdatePaymentInput): Promise<IPayment> {
    await this.findById(id) // Verifica existência
    return await this.repository.update(id, data)
  }
}