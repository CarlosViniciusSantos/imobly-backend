import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const removePropertyController = async (req, res) => {
  try {
    const property = await prisma.imoveis.delete({
      where: { id: parseInt(req.params.id) }
    })

    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }

    res.status(200).json({ message: `Imóvel ${property.title} excluído com sucesso` })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default removePropertyController