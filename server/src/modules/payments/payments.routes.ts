import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { 
  paymentSchema, 
  createPaymentSchema, 
  updatePaymentSchema, 
  paymentIdSchema 
} from './payments.schema'
import { PaymentController } from './payments.controller'

const messageSchema = z.object({ message: z.string() })

export class PaymentRoutes {
  public prefix_route = '/payments'
  private controller: PaymentController

  constructor() {
    this.controller = new PaymentController()
  }

  public routes = async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>()

    fastifyWithZod.post('/', {
      schema: {
        summary: 'Create payment',
        tags: ['Payments'],
        body: createPaymentSchema,
        response: {
          201: z.object({ message: z.string(), data: paymentSchema }),
          400: messageSchema
        }
      }
    }, async (request) => await this.controller.create(request))

    fastifyWithZod.get('/:id', {
      schema: {
        summary: 'Get payment by ID',
        tags: ['Payments'],
        params: paymentIdSchema,
        response: {
          200: z.object({ message: z.string(), data: paymentSchema }),
          404: messageSchema
        }
      }
    }, async (request) => await this.controller.findById(request))

    fastifyWithZod.get('/', {
      schema: {
        summary: 'List all payments',
        tags: ['Payments'],
        response: {
          200: z.object({ message: z.string(), data: z.array(paymentSchema) })
        }
      }
    }, async () => await this.controller.findAll())

    fastifyWithZod.put('/:id', {
      schema: {
        summary: 'Update payment',
        tags: ['Payments'],
        params: paymentIdSchema,
        body: updatePaymentSchema,
        response: {
          200: z.object({ message: z.string(), data: paymentSchema }),
          404: messageSchema
        }
      }
    }, async (request) => await this.controller.update(request))

    fastifyWithZod.delete('/:id', {
      schema: {
        summary: 'Delete payment',
        tags: ['Payments'],
        params: paymentIdSchema,
        response: {
          200: messageSchema,
          404: messageSchema
        }
      }
    }, async (request) => await this.controller.deleteById(request))
  }
}