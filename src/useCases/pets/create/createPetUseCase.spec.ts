import { InMemoryPetsRepository } from '@/useCases/repositories/inMemory/inMemoryPetsRepository'
import { describe, expect, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './createPetUseCase'

import { InMemoryOrgsRepository } from '@/useCases/repositories/inMemory/inMemoryOrgsRepository'
import { AppError } from '@/errors/AppError'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Org dos animais fofos',
      address: 'Rua dos Pets, 343',
      city: 'São Paulo',
      whatsapp_number: '(17) 991336532',
      email: 'org_cute@gmail.com',
      password: '123456',
    })

    const { pet } = await sut.execute({
      type: 'DOG',
      race: 'Salsicha',
      color: 'brown',
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet with a incorrectly org id', async () => {
    await expect(() =>
      sut.execute({
        type: 'DOG',
        race: 'Salsicha',
        color: 'brown',
        org_id: 'incorrect_org_id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
