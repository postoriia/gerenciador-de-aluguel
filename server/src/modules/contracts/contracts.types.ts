export type ContractStatus = 'active' | 'finished' | 'canceled' | 'defaulted'

export interface IContract {
  id: string
  propertyId: string
  tenantId: string
  startDate: Date
  endDate: Date
  rentAmount: number
  depositAmount: number
  status: ContractStatus
  createdAt: Date
  updatedAt: Date
}

export interface IContractRepository {
  save(
    data: Omit<IContract, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<IContract>
  findById(id: string): Promise<IContract | null>
  findAll(): Promise<IContract[]>
  deleteById(id: string): Promise<void>
  update(
    id: string,
    data: Partial<Omit<IContract, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<IContract>
}