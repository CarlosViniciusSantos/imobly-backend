import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const listCompaniesController = async (req, res) => {
  try {
    const companies = await prisma.company.findMany()
    res.status(200).json(companies)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default listCompaniesController