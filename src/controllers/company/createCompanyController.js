import { createCompany, companyValidateToCreate } from '../../models/companyModel.js'

const createCompanyController = async (req, res) => {
  try {
    const { name, address } = req.body

    // Validar os dados da empresa
    const validation = companyValidateToCreate({ name, address })
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors })
    }

    const company = await createCompany({ name, address })

    res.status(201).json(company)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default createCompanyController