import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updateCompanyController = async (req, res) => {
  try {
    const company = await prisma.empresas.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    })

    if (!company) {
      return res.status(404).json({ error: 'Company not found' })
    }

    res.status(200).json(company)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default updateCompanyController