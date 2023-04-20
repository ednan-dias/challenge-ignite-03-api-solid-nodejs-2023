import { describe, expect, it, beforeEach } from 'vitest'

import { InMemoryOrgsRepository } from '@/useCases/repositories/inMemory/inMemoryOrgsRepository'
import { RegisterOrgUseCase } from './registerOrgUseCase'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute({
      name: 'Org dos animaiszinhos',
      address: 'Rua Lua dos Luares, 555',
      city: 'São Paulo',
      whatsapp_number: '(17) 991345533',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
