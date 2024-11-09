import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updateUserController = async (req, res) => {
  try {
    const user = await prisma.usuarios.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default updateUserController