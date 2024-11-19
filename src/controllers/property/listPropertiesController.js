import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const listPropertiesController = async (req, res) => {
  try {
    const properties = await prisma.imoveis.findMany()
    if (properties.length === 0) {
      return res.status(200).json({ error: 'No properties found' })
    }
    res.status(200).json(properties)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default listPropertiesController