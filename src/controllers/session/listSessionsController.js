import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const listSessionsController = async (req, res) => {
  try {
    const sessions = await prisma.session.findMany()
    res.json(sessions)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar sessões' })
  }
}

export default listSessionsController