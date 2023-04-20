import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'

import { AppError } from './errors/AppError'
import { env } from './env'
import { petsRoutes } from './http/routes/pets.routes'
import { orgsRoutes } from './http/routes/orgs.routes'

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

app.register(petsRoutes, {
  prefix: '/pets',
})

app.register(orgsRoutes, {
  prefix: '/orgs',
})

app.setErrorHandler((err, req, reply) => {
  if (err instanceof AppError) {
    return reply.status(err.statusCode).send({ message: err.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  } else {
    //
  }

  return reply.status(500).send('Internal Server Error')
})

export { app }
