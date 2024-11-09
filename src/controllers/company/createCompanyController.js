import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createCompanyController = async (req, res) => {
  try {
    const { name, address } = req.body

    const company = await prisma.company.create({
      data: {
        name,
        address
      }
    })

    res.status(201).json(company)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default createCompanyController