import { DatabaseConnection } from '@/database/connection'
import { IAuthRepository, IRefreshToken, IUser } from './auth.types'
import { users, refreshTokens } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import * as schema from '@/database/schema'

export class AuthRepository implements IAuthRepository {
  private db: PostgresJsDatabase<typeof schema>

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient()
  }

  async saveUser(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    const [user] = await this.db.insert(users).values(data).returning()
    return user as IUser
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await this.db.query.users.findFirst({
        where: eq(users.email, email)
      })

      return (user as IUser) || null
    } catch (error) {
      throw new Error('Error finding user by email: ' + error)
    }
  }

  async saveRefreshToken(data: Omit<IRefreshToken, 'id' | 'createdAt' | 'updatedAt'>): Promise<IRefreshToken> {
    const [token] = await this.db.insert(refreshTokens).values(data).returning()
    return token as IRefreshToken
  }

  async findByHashedToken(hashedToken: string): Promise<IRefreshToken | null> {
    const token = await this.db.query.refreshTokens.findFirst({
      where: eq(refreshTokens.hashedToken, hashedToken)
    })
    return (token as IRefreshToken) || null
  }

  async revokeAllTokensByUserId(userId: string): Promise<void> {
    await this.db
      .update(refreshTokens)
      .set({ revoked: true, updatedAt: new Date() })
      .where(eq(refreshTokens.userId, userId))
  }

  async updateToken(id: string, revoked: boolean): Promise<IRefreshToken> {
    const [updatedToken] = await this.db
      .update(refreshTokens)
      .set({ revoked, updatedAt: new Date() })
      .where(eq(refreshTokens.id, id))
      .returning()
    return updatedToken as IRefreshToken
  }

  async updateByHashedToken(hashedToken: string, revoked: boolean): Promise<IRefreshToken> {
    const [updatedToken] = await this.db
      .update(refreshTokens)
      .set({ revoked, updatedAt: new Date() })
      .where(eq(refreshTokens.hashedToken, hashedToken))
      .returning()
    return updatedToken as IRefreshToken
  }
}