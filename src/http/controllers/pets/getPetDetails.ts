import { MakeGetPetDetailsUseCase } from '@/useCases/factories/makeGetPetDetailsUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetDetails(req: FastifyRequest, reply: FastifyReply) {
  const querySearchSchema = z.object({
    id: z.string(),
  })

  const { id } = querySearchSchema.parse(req.params)

  const getPetsDetailsUseCase = MakeGetPetDetailsUseCase()

  const { pet } = await getPetsDetailsUseCase.execute({ id })

  return reply.send({ pet })
}
