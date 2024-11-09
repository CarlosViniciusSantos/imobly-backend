import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const companySchema = z.object({
  nome: z.string().min(3, "O nome deve ter ao menos 3 caracteres").max(100, "O nome deve ter no máximo 100 caracteres"),
  cnpj: z.string().length(14, "O CNPJ deve ter 14 caracteres"),
  email: z.string().email("Email inválido").max(100, "O email deve ter no máximo 100 caracteres"),
  senha: z.string().min(6, "A senha deve ter ao menos 6 caracteres").max(255, "A senha deve ter no máximo 255 caracteres"),
  foto_perfil: z.string().url("URL inválida").optional()
})

export const companyValidateToCreate = (company) => {
  return companySchema.safeParse(company)
}

export const createCompany = async (data) => {
  return await prisma.empresas.create({ data })
}