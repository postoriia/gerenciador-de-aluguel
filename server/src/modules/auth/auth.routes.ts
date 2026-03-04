import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { AuthController } from './auth.controller'
import { registerSchema, loginSchema, userSchema } from './auth.schema'

const messageSchema = z.object({ message: z.string() })
const userIdSchema = z.object({
  id: z.string().uuid('Invalid UUID format').min(1, 'ID is required')
})

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

    fastifyWithZod.post(
      '/logout',
      {
        onRequest: async (request, reply) => {
          try {
            await request.jwtVerify()
          } catch (err) {
            return reply.status(401).send({ message: 'Unauthorized' })
          }
        },
        schema: {
          summary: 'Logout user',
          description: 'Faz logout invalidando o Refresh Token no banco e limpando os Cookies.',
          tags: ['Auth'],
          response: {
            200: messageSchema,
            401: messageSchema
          }
        }
      },
      async (request, reply) => {
        const result = await this.controller.logout(request, reply)
        return reply.status(200).send(result)
      }
    )

    fastifyWithZod.get(
      '/:id',
      {
        schema: {
          summary: 'Get user by ID',
          description: 'Retrieves details of a specific user.',
          tags: ['Auth'],
          params: userIdSchema,
          response: {
            200: z.object({
              message: z.string(),
              data: userSchema
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
          summary: 'List users',
          description: 'Returns a list of all users.',
          tags: ['Auth'],
          response: {
            200: z.object({
              message: z.string(),
              data: z.array(userSchema)
            })
          }
        }
      },
      async (_request, _reply) => await this.controller.findAll()
    )

    fastifyWithZod.put(
      '/:id',
      {
        schema: {
          summary: 'Update user',
          description: 'Updates a user record.',
          tags: ['Auth'],
          params: userIdSchema,
          body: registerSchema.partial(),
          response: {
            200: z.object({
              message: z.string(),
              data: userSchema
            }),
            404: messageSchema,
            409: messageSchema
          }
        }
      },
      async (request, _reply) => await this.controller.update(request)
    )

    fastifyWithZod.delete(
      '/:id',
      {
        schema: {
          summary: 'Delete user',
          description: 'Deletes a user record.',
          tags: ['Auth'],
          params: userIdSchema,
          response: {
            204: z.null(),
            404: messageSchema
          }
        }
      },
      async (request, reply) => {
        await this.controller.deleteById(request)
        return reply.status(204).send()
      }
    )
  }
}