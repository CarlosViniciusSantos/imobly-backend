import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const removePropertyController = async (req, res) => {
  try {
    const property = await prisma.property.delete({
      where: { id: parseInt(req.params.id) }
    })

    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default removePropertyController