export interface IExample {
  id: string
  title: string
  description: string | null
  createdAt: Date
  updatedAt: Date
}

export interface IExampleRepository {
  save(
    example: Omit<IExample, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<IExample>
  findById(id: string): Promise<IExample | null>
  findAll(): Promise<IExample[]>
  deleteById(id: string): Promise<void>
  update(
    id: string,
    data: Partial<Omit<IExample, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<IExample>
}
