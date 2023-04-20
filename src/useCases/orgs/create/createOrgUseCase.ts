import { AppError } from '@/errors/AppError'
import { OrgsRepository } from '@/useCases/repositories/orgsRepository'

import { Org } from '@prisma/client'

export interface CreateOrgUseCaseRequest {
  name: string
  address: string
  city: string
  whatsapp_number: string
  email: string
  password: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    data: CreateOrgUseCaseRequest,
  ): Promise<CreateOrgUseCaseResponse> {
    const emailExists = await this.orgsRepository.findByEmail(data.email)

    if (emailExists) {
      throw new AppError('E-mail already exists!')
    }

    const org = await this.orgsRepository.create(data)

    return { org }
  }
}
