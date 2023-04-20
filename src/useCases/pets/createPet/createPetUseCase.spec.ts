import { InMemoryPetsRepository } from '@/useCases/repositories/inMemory/inMemoryPetsRepository'
import { describe, expect, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './createPetUseCase'
import { Decimal } from '@prisma/client/runtime/library'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Bruce',
      race: 'Salsicha',
      weight: new Decimal(8),
      owner_name: 'Ednan',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
