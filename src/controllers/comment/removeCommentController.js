import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const removeCommentController = async (req, res) => {
  try {
    const comment = await prisma.comment.delete({
      where: { id: parseInt(req.params.id) }
    })

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default removeCommentController