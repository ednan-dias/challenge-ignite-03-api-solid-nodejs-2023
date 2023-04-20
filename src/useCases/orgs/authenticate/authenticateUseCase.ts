import { AppError } from '@/errors/AppError'
import { OrgsRepository } from '@/useCases/repositories/orgsRepository'

import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'

export interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new AppError('Invalid credentials!', 404)
    }

    const isPasswordValid = await compare(password, org.password)

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials!', 404)
    }

    return {
      org,
    }
  }
}
