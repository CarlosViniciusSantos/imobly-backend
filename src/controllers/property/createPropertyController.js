import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createPropertyController = async (req, res) => {
  try {
    const { title, description, price, companyId } = req.body

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price,
        companyId
      }
    })

    res.status(201).json(property)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default createPropertyController