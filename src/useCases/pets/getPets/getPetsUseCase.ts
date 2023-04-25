import { AppError } from '@/errors/AppError'
import { PetsRepository } from '@/useCases/repositories/petsRepository'
import { Pet } from '@prisma/client'

export interface GetPetsUseCaseRequest {
  city: string
  type?: 'CAT' | 'DOG'
  race?: string
  color?: string
}

interface GetPetsUseCaseResponse {
  pets: Pet[]
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    type,
    color,
    race,
  }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    const pets = await this.petsRepository.findMany({ city, color, race, type })

    if (!city) {
      throw new AppError('This endpoint need a city on query params!')
    }

    return {
      pets,
    }
  }
}
