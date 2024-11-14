import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updatePropertyController = async (req, res) => {
  try {
    const { id } = req.params
    const { id_empresa, ...data } = req.body
    const empresaId = req.userLogged.id

    // Verificar se o imóvel pertence à empresa logada
    const property = await prisma.imoveis.findUnique({
      where: { id: parseInt(id) }
    })

    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }

    if (property.id_empresa !== empresaId) {
      return res.status(403).json({ error: 'Not authorized to update this property' })
    }

    const updatedProperty = await prisma.imoveis.update({
      where: { id: parseInt(id) },
      data
    })

    res.status(200).json(updatedProperty)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default updatePropertyController