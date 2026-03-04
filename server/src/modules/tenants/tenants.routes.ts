import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
    createTenantSchema,
    updateTenantSchema,
    tenantIdSchema,
    tenantSchema
} from './tenants.schema'
import { TenantController } from './tenants.controller'
import { z } from 'zod/v4'

const messageSchema = z.object({ message: z.string() })

export class TenantsRoutes {
    public prefix_route = '/tenants'
    private controller: TenantController

    constructor() {
        this.controller = new TenantController()
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
                    summary: 'Create tenant',
                    description: 'Creates a new tenant record.',
                    tags: ['Tenants'],
                    body: createTenantSchema,
                    response: {
                        201: z.object({
                            message: z.string().describe('Success message'),
                            data: tenantSchema.describe('The created tenant object')
                        }),
                        400: messageSchema
                    }
                }
            },
            async (request, reply) => {
                const response = await this.controller.create(request)
                return reply.status(201).send(response)
            }
        )

        fastifyWithZod.get(
            '/:id',
            {
                schema: {
                    summary: 'Get tenant by ID',
                    description: 'Retrieves details of a specific tenant.',
                    tags: ['Tenants'],
                    params: tenantIdSchema,
                    response: {
                        200: z.object({
                            message: z.string().describe('Success message'),
                            data: tenantSchema.describe('The tenant object')
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
                    summary: 'List tenants',
                    description: 'Returns a list of all tenants.',
                    tags: ['Tenants'],
                    response: {
                        200: z.object({
                            message: z.string().describe('Success message'),
                            data: z.array(tenantSchema).describe('List of tenant objects')
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
                    summary: 'Delete tenant',
                    description: 'Deletes a tenant record.',
                    tags: ['Tenants'],
                    params: tenantIdSchema,
                    response: {
                        204: z.null(),
                        403: messageSchema,
                        404: messageSchema
                    }
                }
            },
            async (request, reply) => {
                await this.controller.deleteById(request)
                return reply.status(204).send()
            }
        )

        fastifyWithZod.put(
            '/:id',
            {
                schema: {
                    summary: 'Update tenant',
                    description: 'Updates a tenant record.',
                    tags: ['Tenants'],
                    params: tenantIdSchema,
                    body: updateTenantSchema,
                    response: {
                        200: z.object({
                            message: z.string().describe('Success message'),
                            data: tenantSchema.describe('The updated tenant object')
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
