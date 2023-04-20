import { FastifyInstance } from 'fastify'

import { create } from '../controllers/orgs/create'
import { authenticate } from '../controllers/orgs/authenticate'
import { refresh } from '../controllers/orgs/refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)

  // Authentication
  app.post('/sessions', authenticate)
  app.patch('/refresh', refresh)
}
