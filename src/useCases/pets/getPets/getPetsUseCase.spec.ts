import { InMemoryPetsRepository } from '@/useCases/repositories/inMemory/inMemoryPetsRepository'
import { describe, expect, it, beforeEach } from 'vitest'

import { GetPetsUseCase } from './getPetsUseCase'
import { AppError } from '@/errors/AppError'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsUseCase

describe('Get Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsUseCase(petsRepository)
  })

  it('should be able to get a list of pets', async () => {
    await petsRepository.create({
      type: 'DOG',
      race: 'salsicha',
      color: 'brown',
      org_id: '101',
    })

    await petsRepository.create({
      type: 'CAT',
      race: 'siames',
      color: 'black/white',
      org_id: '66',
    })

    await petsRepository.create({
      type: 'CAT',
      race: 'gold',
      color: 'yellow',
      org_id: '88',
    })

    const { pets } = await sut.execute({ city: 'Novais', type: 'CAT' })

    expect(pets).toHaveLength(2)
  })

  it('should not be able to get a list of pets with not pass city', async () => {
    await petsRepository.create({
      type: 'DOG',
      race: 'salsicha',
      color: 'brown',
      org_id: '101',
    })

    await petsRepository.create({
      type: 'CAT',
      race: 'siames',
      color: 'black/white',
      org_id: '66',
    })

    await petsRepository.create({
      type: 'CAT',
      race: 'gold',
      color: 'yellow',
      org_id: '88',
    })

    await expect(() =>
      sut.execute({ city: '', type: 'CAT' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
