export interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  cpf: string
  createdAt: string
  updatedAt: string
}

export interface TenantsResponse {
  message: string
  data: Tenant[]
}
