import { makeCreateOrgUseCase } from '@/useCases/factories/makeCreateOrgUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    city: z.string(),
    address: z.string(),
    whatsapp_number: z.string(),
  })

  const { name, email, password, address, city, whatsapp_number } =
    createBodySchema.parse(req.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  const { org } = await createOrgUseCase.execute({
    name,
    email,
    password,
    address,
    city,
    whatsapp_number,
  })

  reply.status(201).send({
    ...org,
    password: undefined,
  })
}
