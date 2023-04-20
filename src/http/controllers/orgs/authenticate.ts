import { makeAuthenticateUseCase } from '@/useCases/factories/makeAuthenticateUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  const { org } = await authenticateUseCase.execute({ email, password })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: org.id,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: org.id,
        expiresIn: '7d',
      },
    },
  )

  reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
