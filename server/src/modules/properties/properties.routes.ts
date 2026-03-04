import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
    createPropertySchema,
    updatePropertySchema,
    propertyIdSchema,
    propertySchema
} from './properties.schema'
import { PropertyController } from './properties.controller'
import { z } from 'zod/v4'

const messageSchema = z.object({ message: z.string() })

export class PropertiesRoutes {
    public prefix_route = '/properties'
    private controller: PropertyController

    constructor() {
        this.controller = new PropertyController()
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
                    summary: 'Create property',
                    description: 'Creates a new property record.',
                    tags: ['Properties'],
                    body: createPropertySchema,
                    response: {
                        201: z.object({
                            message: z.string().describe('Success message'),
                            data: propertySchema.describe('The created property object')
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
                    summary: 'Get property by ID',
                    description: 'Retrieves details of a specific property.',
                    tags: ['Properties'],
                    params: propertyIdSchema,
                    response: {
                        200: z.object({
                            message: z.string().describe('Success message'),
                            data: propertySchema.describe('The property object')
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
                    summary: 'List properties',
                    description: 'Returns a list of all properties.',
                    tags: ['Properties'],
                    response: {
                        200: z.object({
                            message: z.string().describe('Success message'),
                            data: z.array(propertySchema).describe('List of property objects')
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
                    summary: 'Delete property',
                    description: 'Deletes a property record.',
                    tags: ['Properties'],
                    params: propertyIdSchema,
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
                    summary: 'Update property',
                    description: 'Updates a property record.',
                    tags: ['Properties'],
                    params: propertyIdSchema,
                    body: updatePropertySchema,
                    response: {
                        200: z.object({
                            message: z.string().describe('Success message'),
                            data: propertySchema.describe('The updated property object')
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
