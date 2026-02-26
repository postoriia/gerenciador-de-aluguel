import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'

export const examples = pgTable('examples', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  cpf: text('cpf').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const refreshTokens = pgTable('refresh_tokens', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  hashedToken: text('hashed_token').notNull().unique(),
  
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
    
  revoked: boolean('revoked').default(false).notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})