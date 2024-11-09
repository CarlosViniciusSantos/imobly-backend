import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const listCompaniesController = async (req, res) => {
  try {
    const companies = await prisma.empresas.findMany()
    if (companies.length === 0) {
      return res.status(404).json({ error: 'No companies found' })
    }
    res.status(200).json(companies)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default listCompaniesController