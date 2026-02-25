import { ExampleService } from '@/modules/example/example.service'
import { ExampleRepository } from '@/modules/example/example.repository'
import { AppError } from '@/core/errors/app-error'

jest.mock('@/modules/example/example.repository')

describe('ExampleService', () => {
  let service: ExampleService
  let repository: jest.Mocked<ExampleRepository>

  beforeEach(() => {
    repository = new ExampleRepository() as jest.Mocked<ExampleRepository>
    service = new ExampleService(repository)
  })

  describe('create', () => {
    it('should create an example successfully', async () => {
      const input = { title: 'Test Title', description: 'Test Description' }
      const mockExample = {
        id: '123',
        ...input,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      repository.save.mockResolvedValue(mockExample)

      const result = await service.create(input)

      expect(result).toEqual(mockExample)
      expect(repository.save).toHaveBeenCalledWith({
        title: input.title,
        description: input.description
      })
    })
  })

  describe('findById', () => {
    it('should return an example if found', async () => {
      const mockExample = {
        id: '123',
        title: 'Test',
        description: 'Desc',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      repository.findById.mockResolvedValue(mockExample)

      const result = await service.findById('123')

      expect(result).toEqual(mockExample)
      expect(repository.findById).toHaveBeenCalledWith('123')
    })

    it('should throw AppError if example not found', async () => {
      repository.findById.mockResolvedValue(null)

      await expect(service.findById('123')).rejects.toThrow(AppError)
      await expect(service.findById('123')).rejects.toThrow('Example not found')
    })
  })

  describe('findAll', () => {
    it('should return a list of examples', async () => {
      const mockExamples = [
        {
          id: '1',
          title: 'Ex 1',
          description: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      repository.findAll.mockResolvedValue(mockExamples)

      const result = await service.findAll()

      expect(result).toEqual(mockExamples)
      expect(repository.findAll).toHaveBeenCalled()
    })
  })

  describe('deleteById', () => {
    it('should delete an example', async () => {
      repository.deleteById.mockResolvedValue(undefined)

      await service.deleteById('123')

      expect(repository.deleteById).toHaveBeenCalledWith('123')
    })
  })

  describe('update', () => {
    it('should update an example', async () => {
      const input = { title: 'Updated' }
      const mockExample = {
        id: '123',
        title: 'Updated',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      repository.update.mockResolvedValue(mockExample)

      const result = await service.update('123', input)

      expect(result).toEqual(mockExample)
      expect(repository.update).toHaveBeenCalledWith('123', input)
    })
  })
})
