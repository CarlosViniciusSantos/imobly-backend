import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updateCommentController = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userLogged.id

    // Verificar se o comentário pertence ao usuário logado
    const comment = await prisma.comentarios.findUnique({
      where: { id: parseInt(id) }
    })

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    if (comment.id_usuario !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this comment' })
    }

    const updatedComment = await prisma.comentarios.update({
      where: { id: parseInt(id) },
      data: req.body
    })

    res.status(200).json(updatedComment)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default updateCommentController