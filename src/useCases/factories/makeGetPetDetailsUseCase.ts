import { GetPetDetailsUseCase } from '../pets/getPetDetails/getPetDetailsUseCase'

import { PrismaPetsRepository } from '../repositories/prisma/prismaPetsRepository'

export function MakeGetPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetDetailsUseCase(petsRepository)

  return useCase
}
