import { FastifyRequest } from 'fastify'
import { TenantService } from './tenants.service'
import { ITenant } from './tenants.types'
import { CreateTenantInput, UpdateTenantInput } from './tenants.schema'

export class TenantController {
    private service: TenantService

    constructor() {
        this.service = new TenantService()
    }

    public async create(
        request: FastifyRequest
    ): Promise<{ message: string; data: ITenant }> {
        const data = request.body as CreateTenantInput

        const tenant = await this.service.create(data)

        return {
            message: 'Tenant created successfully',
            data: tenant
        }
    }

    public async findById(
        request: FastifyRequest
    ): Promise<{ message: string; data: ITenant }> {
        const { id } = request.params as { id: string }

        const tenant = await this.service.findById(id)

        return {
            message: 'Tenant found successfully',
            data: tenant
        }
    }

    public async findAll(): Promise<{ message: string; data: ITenant[] }> {
        const tenants = await this.service.findAll()

        return {
            message: 'Tenants retrieved successfully',
            data: tenants
        }
    }

    public async deleteById(
        request: FastifyRequest
    ): Promise<{ message: string }> {
        const { id } = request.params as { id: string }

        await this.service.deleteById(id)

        return { message: 'Tenant deleted successfully' }
    }

    public async update(
        request: FastifyRequest
    ): Promise<{ message: string; data: ITenant }> {
        const { id } = request.params as { id: string }
        const data = request.body as UpdateTenantInput

        const tenant = await this.service.update(id, data)

        return {
            message: 'Tenant updated successfully',
            data: tenant
        }
    }
}
