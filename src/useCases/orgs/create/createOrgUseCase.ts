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
    const org = await this.orgsRepository.create(data)

    return { org }
  }
}
