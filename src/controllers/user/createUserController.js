import {v4 as uuid} from 'uuid'
import bcrypt from 'bcrypt'
import { userValidateToCreate, createUser } from '../../models/userModel.js'

const createUserController = async (req, res) => {
  try {
    const newUser = req.body

    const validation = userValidateToCreate(newUser)
    validation.data.public_id = uuid()

    if (validation?.error) {
      return res.status(401).json({
        error: "Erro ao criar usuário!",
        fieldErrors: validation.error.flatten().fieldErrors
    })
    }

    validation.data.senha = bcrypt.hashSync(validation.data.senha, 10)

    const user = await createUser(validation.data)

    if (!user) {
      return res.status(401).json({ error: "Erro ao criar usuário" })
    }

    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default createUserController