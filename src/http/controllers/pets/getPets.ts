import { MakeGetPetsUseCase } from '@/useCases/factories/makeGetPetsUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPets(req: FastifyRequest, reply: FastifyReply) {
  const querySearchSchema = z.object({
    city: z.string(),
    type: z.enum(['CAT', 'DOG']).optional(),
    race: z.string().optional(),
    color: z.string().optional(),
  })

  const { city, type, race, color } = querySearchSchema.parse(req.query)

  const getPetsUseCase = MakeGetPetsUseCase()

  const { pets } = await getPetsUseCase.execute({ city, type, color, race })

  return reply.send({ pets })
}
