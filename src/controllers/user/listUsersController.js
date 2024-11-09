import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const listUsersController = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default listUsersController