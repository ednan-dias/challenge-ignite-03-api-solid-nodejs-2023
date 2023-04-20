import { Org } from '@prisma/client'
import { RegisterOrgUseCaseRequest } from '../orgs/registerOrg/registerOrgUseCase'

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  create(data: RegisterOrgUseCaseRequest): Promise<Org>
}
