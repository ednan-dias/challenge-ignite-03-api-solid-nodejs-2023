import { Pet } from '@prisma/client'
import { CreatePetUseCaseRequest } from '../pets/create/createPetUseCase'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: CreatePetUseCaseRequest): Promise<Pet>
}
