import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { hash } from 'bcryptjs'

describe('Create Org Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an org', async () => {
    const response = await request(app.server)
      .post('/orgs')
      .send({
        name: 'Org dos Animais fofos',
        email: 'animaisfofos@org.com',
        password: await hash('123456', 6),
        address: 'Rua Lua dos Luares, 555',
        city: 'São Paulo',
        whatsapp_number: '17 991246578',
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
