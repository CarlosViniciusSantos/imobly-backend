import { createComment, commentValidateToCreate } from '../../models/commentModel.js'

const createCommentController = async (req, res) => {
  try {
    const { comentario, id_usuario, id_imovel } = req.body

    // Validar os dados do comentário
    const validation = commentValidateToCreate({ comentario, id_usuario, id_imovel })
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors })
    }

    const comment = await createComment({ comentario, id_usuario, id_imovel })

    res.status(201).json(comment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default createCommentController