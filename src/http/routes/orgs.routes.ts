import { FastifyInstance } from 'fastify'

import { OrgsController } from '../controllers/orgsController'

export async function orgsRoutes(app: FastifyInstance) {
  const orgsController = new OrgsController()

  app.post('/sessions', orgsController.authenticate)
}
