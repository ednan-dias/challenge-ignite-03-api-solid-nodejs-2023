import { InMemoryPetsRepository } from '@/useCases/repositories/inMemory/inMemoryPetsRepository'
import { describe, expect, it, beforeEach } from 'vitest'

import { AppError } from '@/errors/AppError'
import { GetPetDetailsUseCase } from './getPetDetailsUseCase'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get a specific pet', async () => {
    const petCreated = await petsRepository.create({
      name: 'Bruce',
      race: 'Salsicha',
      weight: 8.5,
      owner_name: 'Ednan',
      org_id: '101',
    })

    const { pet } = await sut.execute({ id: petCreated.id })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to get a specific pet with an inexistent id', async () => {
    await petsRepository.create({
      name: 'Bruce',
      race: 'Salsicha',
      weight: 8.5,
      owner_name: 'Ednan',
      org_id: '101',
    })

    await expect(() =>
      sut.execute({ id: 'inexistent id' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
