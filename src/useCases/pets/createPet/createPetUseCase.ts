import { Decimal } from '@prisma/client/runtime'
import { PetsRepository } from '../../repositories/petsRepository'
import { Pet } from '@prisma/client'

export interface CreatePetUseCaseRequest {
  name: string
  race: string
  weight: Decimal
  owner_name: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    race,
    weight,
    owner_name,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      race,
      weight,
      owner_name,
    })

    return { pet }
  }
}
