import { FastifyInstance } from 'fastify'
import { PetsController } from '../controllers/petsController'

export async function petsRoutes(app: FastifyInstance) {
  const petsController = new PetsController()

  app.post('/', petsController.create)
}
