import { AuthRepository } from './auth.repository'
import { IAuthRepository, IUser } from './auth.types'
import { AppError } from '@/core/errors/app-error'
import { RegisterInput, LoginInput } from './auth.schema'
import { PasswordHash } from '@/shared/utils/password-hash'
import { createHash, randomBytes } from 'crypto'

export class AuthService {
  constructor(
    private readonly repository: IAuthRepository = new AuthRepository()
  ) {}

  public async register(data: RegisterInput): Promise<IUser> {
    const userExists = await this.repository.findByEmail(data.email)

    if (userExists) {
      throw new AppError('User already exists', 409)
    }

    const passwordHash = await PasswordHash.hash(data.password)

    const user = await this.repository.saveUser({
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