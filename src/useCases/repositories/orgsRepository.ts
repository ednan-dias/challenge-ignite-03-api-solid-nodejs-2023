import { Org } from '@prisma/client'
import { CreateOrgUseCaseRequest } from '../orgs/create/createOrgUseCase'

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  create(data: CreateOrgUseCaseRequest): Promise<Org>
}
