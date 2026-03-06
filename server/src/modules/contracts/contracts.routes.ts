import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  createContractSchema,
  updateContractSchema,
  contractIdSchema,
  contractSchema
} from './contracts.schema'
import { ContractController } from './contracts.controller'
import { z } from 'zod/v4'

const messageSchema = z.object({ message: z.string() })

export class ContractRoutes {
  public prefix_route = '/contracts'
  private controller: ContractController

  constructor() {
    this.controller = new ContractController()
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
          summary: 'Create contract',
          description: 'Creates a new rental contract.',
          tags: ['Contracts'],
          body: createContractSchema,
          response: {
            201: z.object({
              message: z.string(),
              data: contractSchema
            }),
            400: messageSchema
          }
        }
      },
      async (request) => await this.controller.create(request)
    )

    fastifyWithZod.get(
      '/:id',
      {
        schema: {
          summary: 'Get contract by ID',
          tags: ['Contracts'],
          params: contractIdSchema,
          response: {
            200: z.object({
              message: z.string(),
              data: contractSchema
            }),
            404: messageSchema
          }
        }
      },
      async (request) => await this.controller.findById(request)
    )

    fastifyWithZod.get(
      '/',
      {
        schema: {
          summary: 'List all contracts',
          tags: ['Contracts'],
          response: {
            200: z.object({
              message: z.string(),
              data: z.array(contractSchema)
            })
          }
        }
      },
      async () => await this.controller.findAll()
    )

    fastifyWithZod.put(
      '/:id',
      {
        schema: {
          summary: 'Update contract',
          tags: ['Contracts'],
          params: contractIdSchema,
          body: updateContractSchema,
          response: {
            200: z.object({
              message: z.string(),
              data: contractSchema
            }),
            404: messageSchema
          }
        }
      },
      async (request) => await this.controller.update(request)
    )

    fastifyWithZod.delete(
      '/:id',
      {
        schema: {
          summary: 'Delete contract',
          tags: ['Contracts'],
          params: contractIdSchema,
          response: {
            200: messageSchema,
            404: messageSchema
          }
        }
      },
      async (request) => await this.controller.deleteById(request)
    )
  }
}