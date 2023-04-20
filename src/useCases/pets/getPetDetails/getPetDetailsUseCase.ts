import { PetsRepository } from '../../repositories/petsRepository'
import { Pet } from '@prisma/client'

import { AppError } from '@/errors/AppError'

export interface GetPetDetailsUseCaseRequest {
  id: string
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const petFind = await this.petsRepository.findById(id)

    if (!petFind) {
      throw new AppError('This pet not exists!')
    }

    return { pet: petFind }
  }
}
