import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/database/prisma'
import { hash } from 'bcryptjs'

describe('Refresh Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'animaisfofos@org.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
