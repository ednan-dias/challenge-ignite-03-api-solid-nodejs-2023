import { Pet } from '@prisma/client'
import { PetsRepository } from '../petsRepository'
import { randomUUID } from 'node:crypto'
import { CreatePetUseCaseRequest } from '@/useCases/pets/create/createPetUseCase'

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: CreatePetUseCaseRequest) {
    const pet: Pet = {
      ...data,
      id: randomUUID(),
    }

    this.pets.push(pet)

    return pet
  }
}
