import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/database/prisma'
import { hash } from 'bcryptjs'

describe('Get Pet Details Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Org dos Animais fofos',
        email: 'animaisfofos@org.com',
        password: await hash('123456', 6),
        address: 'Rua Lua dos Luares, 555',
        city: 'São Paulo',
        whatsapp_number: '17 991246578',
      },
    })

    const pet = await prisma.pet.create({
      data: {
        type: 'CAT',
        race: 'siames',
        color: 'black/white',
        org_id: org.id,
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    )
  })
})
