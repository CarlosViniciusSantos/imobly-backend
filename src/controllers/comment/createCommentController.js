import { createComment, commentValidateToCreate } from '../../models/commentModel.js'

const createCommentController = async (req, res) => {
  try {
    const { text, userId, propertyId } = req.body

    // Validar os dados do comentário
    const validation = commentValidateToCreate({ text, userId, propertyId })
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors })
    }

    const comment = await createComment({ text, userId, propertyId })

    res.status(201).json(comment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default createCommentController