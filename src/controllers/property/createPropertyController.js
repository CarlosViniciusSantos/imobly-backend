import { createProperty, propertyValidateToCreate } from '../../models/propertyModel.js'

const createPropertyController = async (req, res) => {
  try {
    const { title, description, price, companyId } = req.body

    // Validar os dados do imóvel
    const validation = propertyValidateToCreate({ title, description, price, companyId })
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors })
    }

    const property = await createProperty({ title, description, price, companyId })

    res.status(201).json(property)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default createPropertyController