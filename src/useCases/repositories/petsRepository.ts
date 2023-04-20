import { Pet } from '@prisma/client'
import { CreatePetUseCaseRequest } from '../pets/createPet/createPetUseCase'

export interface PetsRepository {
  create(data: CreatePetUseCaseRequest): Promise<Pet>
  getPetsByCity(city: string): Promise<Pet[]>
}
