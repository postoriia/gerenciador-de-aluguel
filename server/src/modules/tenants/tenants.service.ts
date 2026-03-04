import { TenantRepository } from './tenants.repository'
import { ITenant, ITenantRepository } from './tenants.types'
import { AppError } from '@/core/errors/app-error'
import {
    CreateTenantInput,
    UpdateTenantInput
} from './tenants.schema'

export class TenantService {
    constructor(
        private readonly repository: ITenantRepository = new TenantRepository()
    ) { }

    public async create(data: CreateTenantInput): Promise<ITenant> {
        const tenant = await this.repository.save({
            name: data.name,
            email: data.email,
            phone: data.phone,
            cpf: data.cpf
        })
        return tenant
    }

    public async findById(id: string): Promise<ITenant> {
        const tenant = await this.repository.findById(id)
        if (!tenant) {
            throw new AppError('Tenant not found', 404)
        }
        return tenant
    }

    public async findAll(): Promise<ITenant[]> {
        return await this.repository.findAll()
    }

    public async deleteById(id: string): Promise<void> {
        return await this.repository.deleteById(id)
    }

    public async update(id: string, data: UpdateTenantInput): Promise<ITenant> {
        const updatedTenant = await this.repository.update(id, data)
        return updatedTenant
    }
}
