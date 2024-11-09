import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const removeUserController = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default removeUserController