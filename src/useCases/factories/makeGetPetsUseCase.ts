import { GetPetsUseCase } from '../pets/getPets/getPetsUseCase'
import { PrismaPetsRepository } from '../repositories/prisma/prismaPetsRepository'

export function MakeGetPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetsUseCase(petsRepository)

  return useCase
}
