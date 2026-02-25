import { FastifyRequest } from 'fastify'
import { ExampleService } from './example.service'
import { IExample } from './example.types'
import { CreateExampleInput, UpdateExampleInput } from './example.schema'

export class ExampleController {
  private service: ExampleService

  constructor() {
    this.service = new ExampleService()
  }

  public async create(
    request: FastifyRequest
  ): Promise<{ message: string; data: IExample }> {
    const data = request.body as CreateExampleInput

    const example = await this.service.create(data)

    return {
      message: 'Example created successfully',
      data: example
    }
  }

  public async findById(
    request: FastifyRequest
  ): Promise<{ message: string; data: IExample }> {
    const { id } = request.params as { id: string }

    const example = await this.service.findById(id)

    return {
      message: 'Example found successfully',
      data: example
    }
  }

  public async findAll(): Promise<{ message: string; data: IExample[] }> {
    const examples = await this.service.findAll()

    return {
      message: 'Examples retrieved successfully',
      data: examples
    }
  }

  public async deleteById(
    request: FastifyRequest
  ): Promise<{ message: string }> {
    const { id } = request.params as { id: string }

    await this.service.deleteById(id)

    return { message: 'Example deleted successfully' }
  }

  public async update(
    request: FastifyRequest
  ): Promise<{ message: string; data: IExample }> {
    const { id } = request.params as { id: string }
    const data = request.body as UpdateExampleInput

    const example = await this.service.update(id, data)

    return {
      message: 'Example updated successfully',
      data: example
    }
  }
}
