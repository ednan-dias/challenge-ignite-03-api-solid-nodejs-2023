import { CreateOrgUseCase } from '../orgs/create/createOrgUseCase'
import { PrismaOrgsRepository } from '../repositories/prisma/prismaOrgsRepository'

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new CreateOrgUseCase(orgsRepository)

  return useCase
}
