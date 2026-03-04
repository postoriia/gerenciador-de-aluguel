import { PropertyRepository } from './properties.repository'
import { IProperty, IPropertyRepository } from './properties.types'
import { AppError } from '@/core/errors/app-error'
import {
    CreatePropertyInput,
    UpdatePropertyInput
} from './properties.schema'

export class PropertyService {
    constructor(
        private readonly repository: IPropertyRepository = new PropertyRepository()
    ) { }

    public async create(data: CreatePropertyInput): Promise<IProperty> {
        const property = await this.repository.save({
            ownerId: data.ownerId,
            title: data.title,
            type: data.type,
            street: data.street,
            number: data.number,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode ?? null,
            bedrooms: data.bedrooms,
            area: data.area,
            rentAmount: data.rentAmount,
            condominiumFee: data.condominiumFee ?? null,
            iptu: data.iptu ?? null,
            isAvailable: data.isAvailable,
            imageUrl: data.imageUrl ?? null
        })
        return property
    }

    public async findById(id: string): Promise<IProperty> {
        const property = await this.repository.findById(id)
        if (!property) {
            throw new AppError('Property not found', 404)
        }
        return property
    }

    public async findAll(): Promise<IProperty[]> {
        return await this.repository.findAll()
    }

    public async deleteById(id: string): Promise<void> {
        return await this.repository.deleteById(id)
    }

    public async update(id: string, data: UpdatePropertyInput): Promise<IProperty> {
        const updatedProperty = await this.repository.update(id, data as any)
        return updatedProperty
    }
}
