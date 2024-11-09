import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updateCommentController = async (req, res) => {
  try {
    const comment = await prisma.comment.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    })

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default updateCommentController