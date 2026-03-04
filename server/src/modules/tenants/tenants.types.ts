export interface ITenant {
    id: string
    name: string
    email: string
    phone: string
    cpf: string
    createdAt: Date
    updatedAt: Date
}

export interface ITenantRepository {
    save(
        tenant: Omit<ITenant, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<ITenant>
    findById(id: string): Promise<ITenant | null>
    findAll(): Promise<ITenant[]>
    deleteById(id: string): Promise<void>
    update(
        id: string,
        data: Partial<Omit<ITenant, 'id' | 'createdAt' | 'updatedAt'>>
    ): Promise<ITenant>
}
