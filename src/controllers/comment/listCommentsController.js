import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const listCommentsController = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany()
    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default listCommentsController