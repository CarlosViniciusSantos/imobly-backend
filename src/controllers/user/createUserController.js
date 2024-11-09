import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const createUserController = async (req, res) => {
  try {
    const { nome, cpf, telefone, cidade, estado, foto_perfil, email, senha } = req.body

    // Criptografar a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(senha, 10)

    const user = await prisma.usuarios.create({
      data: {
        nome,
        cpf,
        telefone,
        cidade,
        estado,
        foto_perfil,
        email,
        senha: hashedPassword
      }
    })

    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default createUserController