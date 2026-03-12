export interface Property {
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
  createdAt: string
  updatedAt: string
}

export interface PropertiesResponse {
  message: string
  data: Property[]
}

export interface PropertyResponse {
  message: string
  data: Property
}
