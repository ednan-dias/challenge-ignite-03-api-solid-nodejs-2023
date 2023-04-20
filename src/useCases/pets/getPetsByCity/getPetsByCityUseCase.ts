import { Decimal } from '@prisma/client/runtime'
import { PetsRepository } from '../../repositories/petsRepository'
import { Pet } from '@prisma/client'

export interface CreatePetUseCaseRequest {
  city: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    //
  }
}
