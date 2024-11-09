import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config.js'

const prisma = new PrismaClient()

const loginController = async (req, res) => {
  try {
    const { email, senha } = req.body

    // Tentar encontrar o usuário pelo email
    const user = await prisma.usuarios.findUnique({ where: { email } })
    const company = await prisma.empresas.findUnique({ where: { email } })

    if (!user && !company) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    let isPasswordValid = false
    let token = null
    let sessionData = null

    if (user) {
      isPasswordValid = await bcrypt.compare(senha, user.senha)
      if (isPasswordValid) {
        token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' })
        sessionData = { user_id: user.id, token }
      }
    }

    if (company) {
      isPasswordValid = await bcrypt.compare(senha, company.senha)
      if (isPasswordValid) {
        token = jwt.sign({ id: company.id, email: company.email }, SECRET_KEY, { expiresIn: '1h' })
        sessionData = { user_id: company.id, token }
      }
    }

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    // Criar sessão
    await prisma.session.create({
      data: sessionData
    })

    res.status(200).json({
      usuario: user || company,
      token
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export default loginController