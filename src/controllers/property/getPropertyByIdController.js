import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getPropertyByIdController = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: parseInt(req.params.id) }
    })

    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }

    res.status(200).json(property)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default getPropertyByIdController