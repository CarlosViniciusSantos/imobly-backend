import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const auth = async (req, res, next) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(403).json({ error: "Não Autorizado, AccessToken não informado!" })
  }

  const accessToken = authorization.split(' ')[1]

  if (!accessToken) {
    return res.status(403).json({ error: "Não Autorizado, Bearer com AccessToken não informado!" })
  }

  try {
    const session = await prisma.session.findUnique({ where: { token: accessToken } })

    if (!session) {
      return res.status(403).json({ error: "Token inválido!" })
    }

    const result = jwt.verify(accessToken, SECRET_KEY)
    req.userLogged = { id: result.id, email: result.email }
    next()
  } catch (error) {
    if (error?.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Não Autorizado, AccessToken Expirado!", errorType: "tokenExpired" })
    }

    if (error?.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: "Não Autorizado, AccessToken Inválido!" })
    }

    return res.status(500).json({ error: "Erro no servidor, verifique sua requisição" })
  }
}