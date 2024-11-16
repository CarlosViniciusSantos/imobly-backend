import { createProperty, propertyValidateToCreate } from '../../models/propertyModel.js'

const createPropertyController = async (req, res) => {
  try {
    const { cep, cidade, estado, tipo, descricao, valor, foto_imovel, id_empresa } = req.body

    // Validar os dados do imóvel
    const validation = propertyValidateToCreate({ cep, cidade, estado, tipo, descricao, valor, foto_imovel, id_empresa })
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors })
    }

    const property = await createProperty({ cep, cidade, estado, tipo, descricao, valor, foto_imovel, id_empresa })

    res.status(201).json(property)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default createPropertyController