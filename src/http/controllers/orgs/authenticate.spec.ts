import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/database/prisma'
import { hash } from 'bcryptjs'

describe('Authenticate Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await prisma.org.create({
      data: {
        name: 'Org dos Animais fofos',
        email: 'animaisfofos@org.com',
        password: await hash('123456', 6),
        address: 'Rua Lua dos Luares, 555',
        city: 'São Paulo',
        whatsapp_number: '17 991246578',
      },
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'animaisfofos@org.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })
})
