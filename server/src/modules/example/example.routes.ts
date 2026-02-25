import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  createExampleSchema,
  updateExampleSchema,
  exampleIdSchema,
  exampleSchema
} from './example.schema'
import { ExampleController } from './example.controller'
import { z } from 'zod/v4'

const messageSchema = z.object({ message: z.string() })

export class ExampleRoutes {
  public prefix_route = '/examples'
  private controller: ExampleController

  constructor() {
    this.controller = new ExampleController()
  }

  public routes = async (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions
  ) => {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>()

    fastifyWithZod.post(
      '/',
      {
        schema: {
          summary: 'Create example',
          description: 'Creates a new example record.',
          tags: ['Examples'],
          body: createExampleSchema,
          response: {
            201: z.object({
              message: z.string().describe('Success message'),
              data: exampleSchema.describe('The created example object')
            }),
            400: messageSchema
          }
        }
      },
      async (request, _reply) => await this.controller.create(request)
    )

    fastifyWithZod.get(
      '/:id',
      {
        schema: {
          summary: 'Get example by ID',
          description: 'Retrieves details of a specific example.',
          tags: ['Examples'],
          params: exampleIdSchema,
          response: {
            200: z.object({
              message: z.string().describe('Success message'),
              data: exampleSchema.describe('The example object')
            }),
            404: messageSchema
          }
        }
      },
      async (request, _reply) => await this.controller.findById(request)
    )

    fastifyWithZod.get(
      '/',
      {
        schema: {
          summary: 'List examples',
          description: 'Returns a list of all examples.',
          tags: ['Examples'],
          response: {
            200: z.object({
              message: z.string().describe('Success message'),
              data: z.array(exampleSchema).describe('List of example objects')
            })
          }
        }
      },
      async (_request, _reply) => await this.controller.findAll()
    )

    fastifyWithZod.delete(
      '/:id',
      {
        schema: {
          summary: 'Delete example',
          description: 'Deletes an example record. Requires ownership.',
          tags: ['Examples'],
          params: exampleIdSchema,
          response: {
            204: messageSchema,
            403: messageSchema,
            404: messageSchema
          }
        }
      },
      async (request, _reply) => await this.controller.deleteById(request)
    )

    fastifyWithZod.put(
      '/:id',
      {
        schema: {
          summary: 'Update example',
          description: 'Updates an example record. Requires ownership.',
          tags: ['Examples'],
          params: exampleIdSchema,
          body: updateExampleSchema,
          response: {
            200: z.object({
              message: z.string().describe('Success message'),
              data: exampleSchema.describe('The updated example object')
            }),
            403: messageSchema,
            404: messageSchema
          }
        }
      },
      async (request, _reply) => await this.controller.update(request)
    )
  }
}
