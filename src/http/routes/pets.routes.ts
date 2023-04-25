import { FastifyInstance } from 'fastify'
import { create } from '../controllers/pets/create'
import { getPets } from '../controllers/pets/getPets'
import { getPetDetails } from '../controllers/pets/getPetDetails'

export async function petsRoutes(app: FastifyInstance) {
  // Listar pets, sendo possível passar alguns parâmetros
  app.get('/pets', getPets)

  // listar pet específico
  app.get('/pets/:id', getPetDetails)

  // Criar pet
  app.post('/pets', create)
}
