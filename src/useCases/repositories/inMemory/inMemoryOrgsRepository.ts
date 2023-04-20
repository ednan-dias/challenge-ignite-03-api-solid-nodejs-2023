import { RegisterOrgUseCaseRequest } from '@/useCases/orgs/registerOrg/registerOrgUseCase'
import { Org } from '@prisma/client'
import { OrgsRepository } from '../orgsRepository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  private orgs: Org[] = []

  async findById(id: string) {
    const org = this.orgs.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: RegisterOrgUseCaseRequest) {
    const org: Org = {
      ...data,
      id: randomUUID(),
    }

    this.orgs.push(org)

    return org
  }
}
