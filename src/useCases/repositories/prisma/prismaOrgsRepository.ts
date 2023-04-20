import { CreateOrgUseCaseRequest } from '@/useCases/orgs/create/createOrgUseCase'

import { OrgsRepository } from '../orgsRepository'
import { prisma } from '@/database/prisma'
import { hash } from 'bcryptjs'

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async create(data: CreateOrgUseCaseRequest) {
    const org = await prisma.org.create({
      data: {
        ...data,
        password: await hash(data.password, 6),
      },
    })

    return org
  }
}
