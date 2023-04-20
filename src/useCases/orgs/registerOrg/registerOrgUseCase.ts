import { OrgsRepository } from '@/useCases/repositories/orgsRepository'

import { Org } from '@prisma/client'

export interface RegisterOrgUseCaseRequest {
  name: string
  address: string
  city: string
  whatsapp_number: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    data: RegisterOrgUseCaseRequest,
  ): Promise<RegisterOrgUseCaseResponse> {
    const org = await this.orgsRepository.create(data)

    return { org }
  }
}
