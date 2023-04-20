import { AuthenticateUseCase } from '../orgs/authenticate/authenticateUseCase'
import { PrismaOrgsRepository } from '../repositories/prisma/prismaOrgsRepository'

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new AuthenticateUseCase(orgsRepository)

  return useCase
}
