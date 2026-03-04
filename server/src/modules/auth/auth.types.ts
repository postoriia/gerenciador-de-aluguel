export interface IUser {
  id: string
  name: string
  email: string
  password_hash: string
  cpf: string
  createdAt: Date
  updatedAt: Date
}

export interface IRefreshToken {
  id: string
  hashedToken: string
  userId: string
  revoked: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface IAuthRepository {
  save(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser>
  findByEmail(email: string): Promise<IUser | null>
  findById(id: string): Promise<IUser | null>
  findAll(): Promise<IUser[]>
  deleteById(id: string): Promise<void>
  update(id: string, data: Partial<Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>>): Promise<IUser>

  saveRefreshToken(data: Omit<IRefreshToken, 'id' | 'createdAt' | 'updatedAt'>): Promise<IRefreshToken>
  findByHashedToken(hashedToken: string): Promise<IRefreshToken | null>
  revokeAllTokensByUserId(userId: string): Promise<void>
  updateToken(id: string, revoked: boolean): Promise<IRefreshToken>
  updateByHashedToken(hashedToken: string, revoked: boolean): Promise<IRefreshToken>
}