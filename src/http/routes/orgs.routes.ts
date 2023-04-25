import { FastifyInstance } from 'fastify'

import { create } from '../controllers/orgs/create'
import { authenticate } from '../controllers/orgs/authenticate'
import { refresh } from '../controllers/orgs/refresh'

export async function orgsRoutes(app: FastifyInstance) {
  // Criar pet
  app.post('/orgs', create)

  // Autenticar
  app.post('/sessions', authenticate)

  // Refresh Token
  app.patch('/refresh', refresh)
}
