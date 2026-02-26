import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { AuthController } from './auth.controller'
import { registerSchema, loginSchema, userSchema } from './auth.schema'

const messageSchema = z.object({ message: z.string() })

export class AuthRoutes {
  public prefix_route = '/auth'
  private controller: AuthController

  constructor() {
    this.controller = new AuthController()
  }

  public routes = async (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions
  ) => {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>()

    fastifyWithZod.post(
      '/register',
      {
        schema: {
          summary: 'Register new user',
          description: 'Creates a new user account.',
          tags: ['Auth'],
          body: registerSchema,
          response: {
            201: z.object({
              message: z.string(),
              data: userSchema
            }),
            409: messageSchema
          }
        }
      },
      async (request, reply) => {
        const result = await this.controller.register(request)
        return reply.status(201).send(result)
      }
    )

    fastifyWithZod.post(
      '/login',
      {
        schema: {
          summary: 'Authenticate user',
          description: 'Faz login e retorna o Access Token e o Cookie de sessão.',
          tags: ['Auth'],
          body: loginSchema,
          response: {
            200: z.object({
              message: z.string(),
              accessToken: z.string(), 
              data: userSchema
            }),
            401: messageSchema
          }
        }
      },
      async (request, reply) => {
        const result = await this.controller.login(request, reply)
        return reply.status(200).send(result)
      }
    )
  }
}