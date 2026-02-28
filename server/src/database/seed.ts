import bcrypt from 'bcrypt'
import { DatabaseConnection } from './connection'
import * as schema from './schema'

async function seed() {
  const dbConnection = DatabaseConnection.getInstance()
  const db = dbConnection.getClient()

  console.log('🌱 Seeding database...')

  await db.delete(schema.payments)
  await db.delete(schema.contracts)
  await db.delete(schema.properties)
  await db.delete(schema.tenants)
  await db.delete(schema.users)

  const passwordHash = await bcrypt.hash('password123', 10)

  console.log('👤 Creating users...')

  const [owner] = await db
    .insert(schema.users)
    .values({
      name: 'Edson Proprietário',
      email: 'proprietario@habittar.com',
      password_hash: passwordHash,
      cpf: '123.456.789-01',
      phone: '(11) 98888-8888'
    })
    .returning()

  console.log('👥 Creating tenants...')

  // Create tenants
  const [tenant1] = await db
    .insert(schema.tenants)
    .values({
      name: 'Maria Silva',
      email: 'maria@email.com',
      cpf: '222.333.444-55',
      phone: '(11) 97777-7777'
    })
    .returning()

  const [tenant2] = await db
    .insert(schema.tenants)
    .values({
      name: 'João Santos',
      email: 'joao@email.com',
      cpf: '333.444.555-66',
      phone: '(11) 96666-6666'
    })
    .returning()

  console.log('🏠 Creating properties...')

  const [property1] = await db
    .insert(schema.properties)
    .values({
      ownerId: owner.id,
      title: 'Apartamento Centro',
      type: 'Apartamento',
      street: 'Rua das Flores',
      number: '120',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000',
      bedrooms: 2,
      area: '65',
      rentAmount: '1800.00',
      condominiumFee: '500.00',
      iptu: '150.00',
      isAvailable: false,
      imageUrl:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop'
    })
    .returning()

  const [property2] = await db
    .insert(schema.properties)
    .values({
      ownerId: owner.id,
      title: 'Casa Jardim Europa',
      type: 'Casa',
      street: 'Av. dos Ipês',
      number: '450',
      neighborhood: 'Jardim Europa',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01451-000',
      bedrooms: 3,
      area: '120',
      rentAmount: '3200.00',
      condominiumFee: '0.00',
      iptu: '450.00',
      isAvailable: false,
      imageUrl:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
    })
    .returning()

  const [property3] = await db
    .insert(schema.properties)
    .values({
      ownerId: owner.id,
      title: 'Kitnet Vila Madalena',
      type: 'Apartamento',
      street: 'Rua Harmonia',
      number: '88',
      neighborhood: 'Vila Madalena',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '05435-000',
      bedrooms: 1,
      area: '30',
      rentAmount: '1200.00',
      condominiumFee: '200.00',
      iptu: '50.00',
      isAvailable: true,
      imageUrl:
        'https://images.unsplash.com/photo-1536376074432-bc96fa4789e8?q=80&w=1974&auto=format&fit=crop'
    })
    .returning()

  console.log('📄 Creating contracts...')

  const [contract1] = await db
    .insert(schema.contracts)
    .values({
      propertyId: property1.id,
      tenantId: tenant1.id,
      startDate: new Date('2024-01-10'),
      endDate: new Date('2025-01-10'),
      rentAmount: '1800.00',
      depositAmount: '5400.00',
      status: 'active'
    })
    .returning()

  const [contract2] = await db
    .insert(schema.contracts)
    .values({
      propertyId: property2.id,
      tenantId: tenant2.id,
      startDate: new Date('2024-02-15'),
      endDate: new Date('2026-02-15'),
      rentAmount: '3200.00',
      depositAmount: '9600.00',
      status: 'active'
    })
    .returning()

  console.log('💰 Creating payments...')

  await db.insert(schema.payments).values([
    {
      contractId: contract1.id,
      dueDate: new Date('2025-01-10'),
      paymentDate: new Date('2025-01-09'),
      amount: '1800.00',
      status: 'paid',
      referenceMonth: 1,
      referenceYear: 2025
    },
    {
      contractId: contract1.id,
      dueDate: new Date('2025-02-10'),
      paymentDate: new Date('2025-02-08'),
      amount: '1800.00',
      status: 'paid',
      referenceMonth: 2,
      referenceYear: 2025
    }
  ])

  await db.insert(schema.payments).values([
    {
      contractId: contract2.id,
      dueDate: new Date('2025-01-15'),
      paymentDate: new Date('2025-01-15'),
      amount: '3200.00',
      status: 'paid',
      referenceMonth: 1,
      referenceYear: 2025
    },
    {
      contractId: contract2.id,
      dueDate: new Date('2025-02-15'),
      amount: '3200.00',
      status: 'late',
      referenceMonth: 2,
      referenceYear: 2025
    }
  ])

  console.log('✅ Database seeded successfully!')

  await dbConnection.disconnect()
}

seed().catch((err) => {
  console.error('❌ Error seeding database:', err)
  process.exit(1)
})
