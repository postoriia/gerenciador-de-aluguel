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
}