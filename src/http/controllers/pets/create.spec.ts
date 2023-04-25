import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/database/prisma'
import { hash } from 'bcryptjs'

describe('Create Pet Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
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

    const response = await request(app.server).post('/pets').send({
      type: 'CAT',
      race: 'siames',
      color: 'black/white',
      org_id: org.id,
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
