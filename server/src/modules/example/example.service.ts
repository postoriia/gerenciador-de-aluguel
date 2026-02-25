import { ExampleRepository } from './example.repository'
import { IExample, IExampleRepository } from './example.types'
import { AppError } from '@/core/errors/app-error'
import { CreateExampleInput, UpdateExampleInput } from './example.schema'

export class ExampleService {
  constructor(
    private readonly repository: IExampleRepository = new ExampleRepository()
  ) {}

  public async create(data: CreateExampleInput): Promise<IExample> {
    const example = await this.repository.save({
      title: data.title,
      description: data.description || null
    })
    return example
  }

  public async findById(id: string): Promise<IExample> {
    const example = await this.repository.findById(id)
    if (!example) {
      throw new AppError('Example not found', 404)
    }
    return example
  }

  public async findAll(): Promise<IExample[]> {
    return await this.repository.findAll()
  }

  public async deleteById(id: string): Promise<void> {
    return await this.repository.deleteById(id)
  }

  public async update(id: string, data: UpdateExampleInput): Promise<IExample> {
    const updatedExample = await this.repository.update(id, data)
    return updatedExample
  }
}
