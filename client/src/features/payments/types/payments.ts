export type PaymentStatus = 'pending' | 'paid' | 'late' | 'canceled'

export interface Payment {
  id: string
  contractId: string
  dueDate: string
  paymentDate: string | null
  amount: number
  status: PaymentStatus
  referenceMonth: number
  referenceYear: number
  createdAt: string
}

export interface PaymentsResponse {
  message: string
  data: Payment[]
}

export interface PaymentResponse {
  message: string
  data: Payment
}

export const statusLabels: Record<PaymentStatus, string> = {
  paid: 'Pago',
  pending: 'Pendente',
  late: 'Atrasado',
  canceled: 'Cancelado',
}

export const monthLabels: Record<number, string> = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
}
