import fastify from 'fastify'
import { AppError } from './errors/AppError'
import { env } from './env'

const app = fastify()

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
