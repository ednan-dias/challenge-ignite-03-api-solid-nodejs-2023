import { CreatePetUseCase } from '../pets/create/createPetUseCase'
import { PrismaOrgsRepository } from '../repositories/prisma/prismaOrgsRepository'

import { PrismaPetsRepository } from '../repositories/prisma/prismaPetsRepository'

export function MakeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new CreatePetUseCase(petsRepository, orgsRepository)

  return useCase
}
