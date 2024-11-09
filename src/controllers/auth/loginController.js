import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config.js'

const prisma = new PrismaClient()

const loginController = async (req, res) => {
  try {
    const { email, senha } = req.body

    const user = await prisma.usuarios.findUnique({ where: { email } })

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' })

    // Criar sessão
    await prisma.session.create({
      data: {
        user_id: user.id,
        token
      }
    })

    res.status(200).json({
      usuario: {
        ...user
      },
      token
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export default loginController