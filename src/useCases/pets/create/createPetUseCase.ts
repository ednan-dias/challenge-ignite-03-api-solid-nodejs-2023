import { PetsRepository } from '../../repositories/petsRepository'
import { Pet } from '@prisma/client'
import { OrgsRepository } from '@/useCases/repositories/orgsRepository'
import { AppError } from '@/errors/AppError'

export interface CreatePetUseCaseRequest {
  type: 'DOG' | 'CAT'
  race: string
  color: string
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute(
    data: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(data.org_id)

    if (!org) {
      throw new AppError('This org not exists!')
    }

    const pet = await this.petsRepository.create(data)

    return { pet }
  }
}
