export type PaymentStatus = 'pending' | 'paid' | 'late' | 'canceled'

export interface IPayment {
  id: string
  contractId: string
  dueDate: Date
  paymentDate: Date | null
  amount: number
  status: PaymentStatus
  referenceMonth: number
  referenceYear: number
  createdAt: Date
}

export interface IPaymentRepository {
  save(data: Omit<IPayment, 'id' | 'createdAt'>): Promise<IPayment>
  findById(id: string): Promise<IPayment | null>
  findAll(): Promise<IPayment[]>
  findByContractId(contractId: string): Promise<IPayment[]>
  deleteById(id: string): Promise<void>
  update(id: string, data: Partial<Omit<IPayment, 'id' | 'createdAt'>>): Promise<IPayment>
}