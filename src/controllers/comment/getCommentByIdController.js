import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getCommentByIdController = async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(req.params.id) }
    })

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default getCommentByIdController