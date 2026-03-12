export type ContractStatus = 'active' | 'finished' | 'canceled' | 'defaulted'

export interface Contract {
  id: string
  propertyId: string
  tenantId: string
  startDate: string
  endDate: string
  rentAmount: number
  depositAmount: number
  status: ContractStatus
  createdAt: string
  updatedAt: string
}

export interface ContractsResponse {
  message: string
  data: Contract[]
}
