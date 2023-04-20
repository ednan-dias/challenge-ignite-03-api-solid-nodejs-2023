import { FastifyReply, FastifyRequest } from 'fastify'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  return reply.send()
}