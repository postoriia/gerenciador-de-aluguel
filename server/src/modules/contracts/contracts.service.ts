import { ContractRepository } from './contracts.repository'
import { IContract, IContractRepository } from './contracts.types'
import { AppError } from '@/core/errors/app-error'
import { CreateContractInput, UpdateContractInput } from './contracts.schema'

export class ContractService {
  constructor(
    private readonly repository: IContractRepository = new ContractRepository()
  ) {}

  public async create(data: CreateContractInput): Promise<IContract> {
    return await this.repository.save(data)
  }

  public async findById(id: string): Promise<IContract> {
    const contract = await this.repository.findById(id)
    if (!contract) {
      throw new AppError('Contract not found', 404)
    }
    return contract
  }

  public async findAll(): Promise<IContract[]> {
    return await this.repository.findAll()
  }

  public async deleteById(id: string): Promise<void> {
    // Poderia adicionar validação se o contrato existe antes de deletar (mas não quero)
    return await this.repository.deleteById(id)
  }

  public async update(id: string, data: UpdateContractInput): Promise<IContract> {
    return await this.repository.update(id, data)
  }
}