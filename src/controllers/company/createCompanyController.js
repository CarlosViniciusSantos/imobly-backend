import { createCompany, companyValidateToCreate } from '../../models/companyModel.js'
import bcrypt from 'bcrypt'

const createCompanyController = async (req, res) => {
  try {
    const { nome, cnpj, email, senha, foto_perfil } = req.body

    // Validar os dados da empresa
    const validation = companyValidateToCreate({ nome, cnpj, email, senha, foto_perfil })
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors })
    }

    // Criptografar a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(senha, 10)

    const company = await createCompany({
      nome,
      cnpj,
      email,
      senha: hashedPassword,
      foto_perfil
    })

    res.status(201).json(company)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default createCompanyController