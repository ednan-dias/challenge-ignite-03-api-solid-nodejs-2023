import { Pet } from '@prisma/client'
import { PetsRepository } from '../petsRepository'
import { randomUUID } from 'node:crypto'
import { CreatePetUseCaseRequest } from '@/useCases/pets/createPet/createPetUseCase'

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = []

  async getPetsByCity(city: string) {
    const pets = this.pets.filter((pets) => pets)
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
