import { AuthRepository } from './auth.repository'
import { IAuthRepository, IUser } from './auth.types'
import { AppError } from '@/core/errors/app-error'
import { RegisterInput, LoginInput } from './auth.schema'
import { PasswordHash } from '@/shared/utils/password-hash'
import { createHash, randomBytes } from 'crypto'

export class AuthService {
  constructor(
    private readonly repository: IAuthRepository = new AuthRepository()
  ) { }

  public async register(data: RegisterInput): Promise<IUser> {
    const userExists = await this.repository.findByEmail(data.email)

    if (userExists) {
      throw new AppError('User already exists', 409)
    }

    const passwordHash = await PasswordHash.hash(data.password)

    const user = await this.repository.save({
      name: data.name,
      email: data.email,
      password_hash: passwordHash,
      cpf: data.cpf
    })

    return user
  }

  public async login(data: LoginInput): Promise<IUser> {
    const user = await this.repository.findByEmail(data.email)

    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    const passwordMatch = await PasswordHash.compare(
      data.password,
      user.password_hash
    )

    if (!passwordMatch) {
      throw new AppError('Invalid credentials', 401)
    }
    return user
  }

  public async findById(id: string): Promise<IUser> {
    const user = await this.repository.findById(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }
    return user
  }

  public async findAll(): Promise<IUser[]> {
    return await this.repository.findAll()
  }

  public async deleteById(id: string): Promise<void> {
    const userExists = await this.repository.findById(id)
    if (!userExists) {
      throw new AppError('User not found', 404)
    }
    await this.repository.deleteById(id)
  }

  public async update(id: string, data: Partial<RegisterInput>): Promise<IUser> {
    const user = await this.repository.findById(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await this.repository.findByEmail(data.email)
      if (emailExists) {
        throw new AppError('Email already in use', 409)
      }
    }

    if (data.password) {
      data.password = await PasswordHash.hash(data.password)
    }



    return Object.keys(data).length > 0
      ? await this.repository.update(id, data as Partial<Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>>)
      : user
  }

  public async logout(userId: string): Promise<void> {
    await this.repository.revokeAllTokensByUserId(userId)
  }

  public async createAndStoreRefreshToken(userId: string): Promise<string> {
    const refreshToken = randomBytes(64).toString('hex')

    const hashedToken = createHash('sha256').update(refreshToken).digest('hex')

    await this.repository.saveRefreshToken({
      hashedToken,
      userId,
      revoked: false
    })

    return refreshToken
  }
}