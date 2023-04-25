import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { env } from './env'
import { petsRoutes } from './http/routes/pets.routes'
import { orgsRoutes } from './http/routes/orgs.routes'
import { ZodError } from 'zod'
import { AppError } from './errors/AppError'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(petsRoutes)
app.register(orgsRoutes)

app.setErrorHandler((err, req, reply) => {
  if (err instanceof AppError) {
    env.NODE_ENV !== 'production' && console.log(err.message)
    return reply.status(err.statusCode).send({ message: err.message })
  }

  if (err instanceof ZodError) {
    env.NODE_ENV !== 'production' && console.log(err.message)

    return reply
      .status(400)
      .send({ message: 'Validation error', issues: err.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  } else {
    //
  }

  return reply.status(500).send('Internal Server Error')
})

export { app }
