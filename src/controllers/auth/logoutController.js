import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const logoutController = async (req, res) => {
  try {
    const { token } = req.body

    // Excluir a sessão
    await prisma.session.delete({ where: { token } })

    res.status(200).json({ message: 'Logout realizado com sucesso' })
  } catch (error) {
    if (error?.code === 'P2025')
      return res.json({
        success: "Logout efetuado com sucesso!"
      })
    next(error)
  }
}

export default logoutController