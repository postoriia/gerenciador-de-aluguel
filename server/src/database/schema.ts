import {
  pgTable,
  text,
  timestamp,
  boolean,
  decimal,
  pgEnum,
  integer
} from 'drizzle-orm/pg-core'

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
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const tenants = pgTable('tenants', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone').notNull(),
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

export const properties = pgTable('properties', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ownerId: text('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  type: text('type').notNull(),
  street: text('street').notNull(),
  number: text('number').notNull(),
  neighborhood: text('neighborhood').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zipCode: text('zip_code'),
  bedrooms: integer('bedrooms').notNull().default(0),
  area: decimal('area', { precision: 10, scale: 2 }).notNull().default('0'),
  rentAmount: decimal('rent_amount', { precision: 10, scale: 2 }).notNull(),
  condominiumFee: decimal('condominium_fee', { precision: 10, scale: 2 }),
  iptu: decimal('iptu', { precision: 10, scale: 2 }),
  isAvailable: boolean('is_available').default(true).notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const contractStatusEnum = pgEnum('contract_status', [
  'active',
  'finished',
  'canceled',
  'defaulted'
])

export const contracts = pgTable('contracts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  propertyId: text('property_id')
    .notNull()
    .references(() => properties.id, { onDelete: 'cascade' }),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  rentAmount: decimal('rent_amount', { precision: 10, scale: 2 }).notNull(),
  depositAmount: decimal('deposit_amount', { precision: 10, scale: 2 }),
  status: contractStatusEnum('status').default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'paid',
  'late',
  'canceled'
])

export const payments = pgTable('payments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  contractId: text('contract_id')
    .notNull()
    .references(() => contracts.id, { onDelete: 'cascade' }),
  dueDate: timestamp('due_date').notNull(),
  paymentDate: timestamp('payment_date'),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: paymentStatusEnum('status').default('pending').notNull(),
  referenceMonth: integer('reference_month'),
  referenceYear: integer('reference_year'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})
