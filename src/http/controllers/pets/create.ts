import { MakeCreatePetUseCase } from '@/useCases/factories/makeCreatePetUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    type: z.enum(['DOG', 'CAT']),
    race: z.string(),
    color: z.string(),
    org_id: z.string(),
  })

  const data = createPetBodySchema.parse(req.body)

  const createPetUseCase = MakeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute(data)

  return reply.status(201).send({ pet })
}
