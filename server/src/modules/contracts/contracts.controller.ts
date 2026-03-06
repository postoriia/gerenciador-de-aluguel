import { FastifyRequest } from 'fastify'
import { ContractService } from './contracts.service'
import { IContract } from './contracts.types'
import { CreateContractInput, UpdateContractInput } from './contracts.schema'

export class ContractController {
  private service: ContractService

  constructor() {
    this.service = new ContractService()
  }

  public async create(
    request: FastifyRequest
  ): Promise<{ message: string; data: IContract }> {
    const data = request.body as CreateContractInput
    const contract = await this.service.create(data)

    return {
      message: 'Contract created successfully',
      data: contract
    }
  }

  public async findById(
    request: FastifyRequest
  ): Promise<{ message: string; data: IContract }> {
    const { id } = request.params as { id: string }
    const contract = await this.service.findById(id)

    return {
      message: 'Contract found successfully',
      data: contract
    }
  }

  public async findAll(): Promise<{ message: string; data: IContract[] }> {
    const contracts = await this.service.findAll()

    return {
      message: 'Contracts retrieved successfully',
      data: contracts
    }
  }

  public async deleteById(
    request: FastifyRequest
  ): Promise<{ message: string }> {
    const { id } = request.params as { id: string }
    await this.service.deleteById(id)

    return { message: 'Contract deleted successfully' }
  }

  public async update(
    request: FastifyRequest
  ): Promise<{ message: string; data: IContract }> {
    const { id } = request.params as { id: string }
    const data = request.body as UpdateContractInput
    const contract = await this.service.update(id, data)

    return {
      message: 'Contract updated successfully',
      data: contract
    }
  }
}