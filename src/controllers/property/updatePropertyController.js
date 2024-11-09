import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updatePropertyController = async (req, res) => {
  try {
    const property = await prisma.property.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    })

    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }

    res.status(200).json(property)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default updatePropertyController