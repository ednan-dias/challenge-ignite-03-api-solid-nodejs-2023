import { CreatePetUseCaseRequest } from '@/useCases/pets/create/createPetUseCase'
import { GetPetsUseCaseRequest } from '@/useCases/pets/getPets/getPetsUseCase'
import { PetsRepository } from '../petsRepository'
import { prisma } from '@/database/prisma'
import { Pet } from '@prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findMany({ city, color, race, type }: GetPetsUseCaseRequest) {
    const petsToReturn: Pet[] = []

    const orgs = await prisma.org.findMany({
      where: {
        city,
      },
      include: {
        pets: true,
      },
    })

    if (color || race || type) {
      for (const org of orgs) {
        // eslint-disable-next-line array-callback-return
        org.pets.map((pet) => {
          if (pet.color === color || pet.type === type || pet.race === race) {
            petsToReturn.push(pet)
          }
        })
      }
    } else {
      for (const org of orgs) {
        petsToReturn.push(...org.pets)
      }
    }

    return petsToReturn
  }

  async create(data: CreatePetUseCaseRequest) {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
