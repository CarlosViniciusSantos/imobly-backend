import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createCommentController = async (req, res) => {
  try {
    const { text, userId, propertyId } = req.body

    const comment = await prisma.comment.create({
      data: {
        text,
        userId,
        propertyId
      }
    })

    res.status(201).json(comment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default createCommentController