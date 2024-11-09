import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const removeCompanyController = async (req, res) => {
  try {
    const company = await prisma.empresas.delete({
      where: { id: parseInt(req.params.id) }
    })

    if (!company) {
      return res.status(404).json({ error: 'Company not found' })
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default removeCompanyController