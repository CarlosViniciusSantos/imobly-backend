import { getSessionByToken, updateToken } from "../../models/sessionModel.js"
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../../config.js"
import { getById } from "../../models/userModel.js"

const refreshToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization

    if (!authorization) {
      return res.status(403).json({ error: "Não Autorizado, AccessToken não informado!" })
    }

    const accessToken = authorization.split(' ')[1]

    const session = await getSessionByToken(accessToken)

    if (!session) {
      return res.status(403).json({ error: "Não Autorizado, AccessToken não encontrado!" })
    }

    const userLogged = await getById(session.user_id)

    // Gerar o novo token de acesso
    const newToken = jwt.sign(
      { id: userLogged.id, email: userLogged.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    )

    // Atualizar o token na sessão
    const result = await updateToken(accessToken, newToken)

    if (!result) {
      return res.status(403).json({ error: "Erro ao atualizar novo Token!" })
    }

    // Devolver o novo token de acesso para o usuário
    return res.json({
      success: "Token atualizado com sucesso!",
      accessToken: newToken,
      user: {
        public_id: userLogged.public_id,
        name: userLogged.nome,
        email: userLogged.email
      }
    })
  } catch (error) {
    next(error)
  }
}

export default refreshToken