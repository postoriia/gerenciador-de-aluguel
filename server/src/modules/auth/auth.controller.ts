import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from './auth.service'
import { IUser } from './auth.types'
import { RegisterInput, LoginInput } from './auth.schema'

export class AuthController {
  private service: AuthService

  constructor() {
    this.service = new AuthService()
  }

  public async register(
    request: FastifyRequest
  ): Promise<{ message: string; data: Omit<IUser, 'password_hash'> }> {
    const data = request.body as RegisterInput

    const user = await this.service.register(data)

    const { password_hash, ...userSafe } = user

    return {
      message: 'User registered successfully',
      data: userSafe
    }
  }

  public async login(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<{ message: string; accessToken: string; data: Omit<IUser, 'password_hash'> }> {
    const data = request.body as LoginInput
    const user = await this.service.login(data)

    const refreshToken = await this.service.createAndStoreRefreshToken(user.id)
    reply.setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    const accessToken = await reply.jwtSign(
      { sub: user.id },
      { expiresIn: '15m' }
    )
    const { password_hash, ...userSafe } = user

    return {
      message: 'Login successful',
      accessToken,
      data: userSafe
    }
  }

  public async findById(
    request: FastifyRequest
  ): Promise<{ message: string; data: Omit<IUser, 'password_hash'> }> {
    const { id } = request.params as { id: string }
    const user = await this.service.findById(id)
    const { password_hash, ...userSafe } = user
    return {
      message: 'User found successfully',
      data: userSafe
    }
  }

  public async findAll(): Promise<{ message: string; data: Omit<IUser, 'password_hash'>[] }> {
    const users = await this.service.findAll()
    const usersSafe = users.map((user) => {
      const { password_hash, ...safe } = user
      return safe
    })
    return {
      message: 'Users retrieved successfully',
      data: usersSafe
    }
  }

  public async deleteById(request: FastifyRequest): Promise<{ message: string }> {
    const { id } = request.params as { id: string }
    await this.service.deleteById(id)
    return { message: 'User deleted successfully' }
  }

  public async update(
    request: FastifyRequest
  ): Promise<{ message: string; data: Omit<IUser, 'password_hash'> }> {
    const { id } = request.params as { id: string }
    const data = request.body as Partial<RegisterInput>
    const user = await this.service.update(id, data)
    const { password_hash, ...userSafe } = user
    return {
      message: 'User updated successfully',
      data: userSafe
    }
  }

  public async logout(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<{ message: string }> {
    await request.jwtVerify()
    const { sub } = request.user as { sub: string }

    await this.service.logout(sub)

    reply.clearCookie('refreshToken', { path: '/' })

    return { message: 'Logged out successfully' }
  }
}