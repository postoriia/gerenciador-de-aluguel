import { FastifyRequest } from 'fastify'
import { PaymentService } from './payments.service'
import { IPayment } from './payments.types'
import { CreatePaymentInput, UpdatePaymentInput } from './payments.schema'

export class PaymentController {
  private service: PaymentService

  constructor() {
    this.service = new PaymentService()
  }

  public async create(request: FastifyRequest): Promise<{ message: string; data: IPayment }> {
    const data = request.body as CreatePaymentInput
    const payment = await this.service.create(data)
    return { message: 'Payment created successfully', data: payment }
  }

  public async findById(request: FastifyRequest): Promise<{ message: string; data: IPayment }> {
    const { id } = request.params as { id: string }
    const payment = await this.service.findById(id)
    return { message: 'Payment found successfully', data: payment }
  }

  public async findAll(): Promise<{ message: string; data: IPayment[] }> {
    const payments = await this.service.findAll()
    return { message: 'Payments retrieved successfully', data: payments }
  }

  public async deleteById(request: FastifyRequest): Promise<{ message: string }> {
    const { id } = request.params as { id: string }
    await this.service.deleteById(id)
    return { message: 'Payment deleted successfully' }
  }

  public async update(request: FastifyRequest): Promise<{ message: string; data: IPayment }> {
    const { id } = request.params as { id: string }
    const data = request.body as UpdatePaymentInput
    const payment = await this.service.update(id, data)
    return { message: 'Payment updated successfully', data: payment }
  }
}