import { CreateOrgUseCaseRequest } from '@/useCases/orgs/create/createOrgUseCase'
import { Org } from '@prisma/client'
import { OrgsRepository } from '../orgsRepository'
import { randomUUID } from 'crypto'
import { hash } from 'bcryptjs'

export class InMemoryOrgsRepository implements OrgsRepository {
  orgs: Org[] = []

  async findById(id: string) {
    const org = this.orgs.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: CreateOrgUseCaseRequest) {
    const org: Org = {
      ...data,
      password: await hash(data.password, 6),
      id: randomUUID(),
    }

    this.orgs.push(org)

    return org
  }
}
