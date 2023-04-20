import { describe, expect, it, beforeEach } from 'vitest'

import { InMemoryOrgsRepository } from '@/useCases/repositories/inMemory/inMemoryOrgsRepository'
import { CreateOrgUseCase } from './createOrgUseCase'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute({
      name: 'Org dos animais fofos',
      address: 'Rua Lua dos Luares, 555',
      city: 'São Paulo',
      whatsapp_number: '(17) 991345533',
      email: 'org_cute@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
