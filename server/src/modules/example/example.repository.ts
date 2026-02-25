import { DatabaseConnection } from '@/database/connection'
import { IExample, IExampleRepository } from './example.types'
import { examples } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import * as schema from '@/database/schema'

export class ExampleRepository implements IExampleRepository {
  private db: PostgresJsDatabase<typeof schema>

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient()
  }

  async save(
    data: Omit<IExample, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<IExample> {
    try {
      const [example] = await this.db
        .insert(examples)
        .values({
          title: data.title,
          description: data.description
        })
        .returning()

      return example as IExample
    } catch (error) {
      throw new Error('Error saving example to database: ' + error)
    }
  }

  async findById(id: string): Promise<IExample | null> {
    try {
      const example = await this.db.query.examples.findFirst({
        where: eq(examples.id, id)
      })

      return (example as IExample) || null
    } catch (error) {
      throw new Error('Error finding example by ID: ' + error)
    }
  }

  async findAll(): Promise<IExample[]> {
    try {
      const allExamples = await this.db.query.examples.findMany()
      return allExamples as IExample[]
    } catch (error) {
      throw new Error('Error finding all examples: ' + error)
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.db.delete(examples).where(eq(examples.id, id))
    } catch (error) {
      throw new Error('Error deleting example: ' + error)
    }
  }

  async update(
    id: string,
    data: Partial<Omit<IExample, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<IExample> {
    try {
      const [updatedExample] = await this.db
        .update(examples)
        .set({
          ...data,
          updatedAt: new Date()
        })
        .where(eq(examples.id, id))
        .returning()

      if (!updatedExample) {
        throw new Error('Example not found for update')
      }

      return updatedExample as IExample
    } catch (error) {
      throw new Error('Error updating example: ' + error)
    }
  }
}
