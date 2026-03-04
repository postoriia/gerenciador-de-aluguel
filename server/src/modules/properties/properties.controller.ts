import { FastifyRequest } from 'fastify'
import { PropertyService } from './properties.service'
import { IProperty } from './properties.types'
import { CreatePropertyInput, UpdatePropertyInput } from './properties.schema'

export class PropertyController {
    private service: PropertyService

    constructor() {
        this.service = new PropertyService()
    }

    public async create(
        request: FastifyRequest
    ): Promise<{ message: string; data: IProperty }> {
        const data = request.body as CreatePropertyInput

        const property = await this.service.create(data)

        return {
            message: 'Property created successfully',
            data: property
        }
    }

    public async findById(
        request: FastifyRequest
    ): Promise<{ message: string; data: IProperty }> {
        const { id } = request.params as { id: string }

        const property = await this.service.findById(id)

        return {
            message: 'Property found successfully',
            data: property
        }
    }

    public async findAll(): Promise<{ message: string; data: IProperty[] }> {
        const properties = await this.service.findAll()

        return {
            message: 'Properties retrieved successfully',
            data: properties
        }
    }

    public async deleteById(
        request: FastifyRequest
    ): Promise<{ message: string }> {
        const { id } = request.params as { id: string }

        await this.service.deleteById(id)

        return { message: 'Property deleted successfully' }
    }

    public async update(
        request: FastifyRequest
    ): Promise<{ message: string; data: IProperty }> {
        const { id } = request.params as { id: string }
        const data = request.body as UpdatePropertyInput

        const property = await this.service.update(id, data)

        return {
            message: 'Property updated successfully',
            data: property
        }
    }
}
