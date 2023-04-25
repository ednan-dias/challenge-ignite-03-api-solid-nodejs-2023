import { Pet } from '@prisma/client'
import { PetsRepository } from '../petsRepository'
import { randomUUID } from 'node:crypto'
import { CreatePetUseCaseRequest } from '@/useCases/pets/create/createPetUseCase'
import { GetPetsUseCaseRequest } from '@/useCases/pets/getPets/getPetsUseCase'

export class InMemoryPetsRepository implements PetsRepository {
  pets: Pet[] = []

  async findMany({ city, type, color = '', race = '' }: GetPetsUseCaseRequest) {
    const petsReturn: Pet[] = []

    for (const pet of this.pets) {
      if (type || color || race) {
        if (type === pet.type) {
          petsReturn.push(pet)
        }

        if (color === pet.color) {
          petsReturn.push(pet)
        }

        if (race === pet.race) {
          petsReturn.push(pet)
        }
      } else {
        return this.pets
      }
    }

    return petsReturn
  }

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
