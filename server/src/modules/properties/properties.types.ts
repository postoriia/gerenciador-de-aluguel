export interface IProperty {
    id: string
    ownerId: string
    title: string
    type: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    zipCode: string | null
    bedrooms: number
    area: number
    rentAmount: number
    condominiumFee: number | null
    iptu: number | null
    isAvailable: boolean
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
}

export interface IPropertyRepository {
    save(
        property: Omit<IProperty, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<IProperty>
    findById(id: string): Promise<IProperty | null>
    findAll(): Promise<IProperty[]>
    deleteById(id: string): Promise<void>
    update(
        id: string,
        data: Partial<Omit<IProperty, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<IProperty>
}
