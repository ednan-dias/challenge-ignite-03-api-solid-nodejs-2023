import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { populateFakeDatabase } from '@/utils/test/populateFakeDatabase'

describe('Get Pets Controller', () => {
  beforeAll(async () => {
    await app.ready()

    await populateFakeDatabase()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pets only city parameter', async () => {
    const response = await request(app.server).get('/pets').query({
      city: 'Novais',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(4)
  })

  it('should be able to get pets with other parameters', async () => {
    const response = await request(app.server).get('/pets').query({
      city: 'Novais',
      type: 'DOG',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
