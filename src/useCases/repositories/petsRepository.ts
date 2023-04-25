import { Pet } from '@prisma/client'
import { CreatePetUseCaseRequest } from '../pets/create/createPetUseCase'
import { GetPetsUseCaseRequest } from '../pets/getPets/getPetsUseCase'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findMany(data: GetPetsUseCaseRequest): Promise<Pet[]>
  create(data: CreatePetUseCaseRequest): Promise<Pet>
}
