import { prisma } from '@/database/prisma'
import { hash } from 'bcryptjs'

export async function populateFakeDatabase() {
  const org1 = await prisma.org.create({
    data: {
      name: 'Org Test',
      email: 'org_test@gmail.com',
      password: await hash('123456', 6),
      address: 'Rua Test',
      city: 'Novais',
      whatsapp_number: '4002-8922',
    },
  })

  const org2 = await prisma.org.create({
    data: {
      name: 'Org Test 2',
      email: 'org_tes2t@gmail.com',
      password: await hash('123456', 6),
      address: 'Rua Test 2',
      city: 'Novais',
      whatsapp_number: '4002-8922',
    },
  })

  await prisma.pet.create({
    data: {
      type: 'CAT',
      color: 'black/white',
      race: 'siames',
      org_id: org1.id,
    },
  })

  await prisma.pet.create({
    data: {
      type: 'CAT',
      color: 'black/white',
      race: 'siames',
      org_id: org2.id,
    },
  })

  await prisma.pet.create({
    data: {
      type: 'DOG',
      color: 'black',
      race: 'salsicha',
      org_id: org1.id,
    },
  })

  await prisma.pet.create({
    data: {
      type: 'DOG',
      color: 'brown',
      race: 'salsicha',
      org_id: org2.id,
    },
  })
}
