import { describe, expect, it, beforeEach } from 'vitest'

import { InMemoryOrgsRepository } from '@/useCases/repositories/inMemory/inMemoryOrgsRepository'
import { AuthenticateUseCase } from './authenticateUseCase'
import { AppError } from '@/errors/AppError'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'Org dos animais fofos',
      address: 'Rua Lua dos Luares, 555',
      city: 'São Paulo',
      whatsapp_number: '(17) 991345533',
      email: 'org_cute@gmail.com',
      password: '123456',
    })

    const { org } = await sut.execute({
      email: 'org_cute@gmail.com',
      password: '123456',
    })

    expect(org).toEqual(
      expect.objectContaining({
        id: org.id,
      }),
    )
  })

  it('should not be able to authenticate with a unknown email', async () => {
    await expect(() =>
      sut.execute({
        email: 'org_cute@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with a wrong password', async () => {
    await orgsRepository.create({
      name: 'Org dos animais fofos',
      address: 'Rua Lua dos Luares, 555',
      city: 'São Paulo',
      whatsapp_number: '(17) 991345533',
      email: 'org_cute@gmail.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email: 'org_cute@gmail.com',
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
