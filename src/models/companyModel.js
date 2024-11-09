import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const companySchema = z.object({
  name: z.string().min(3, "O nome deve ter ao menos 3 caracteres").max(100, "O nome deve ter no máximo 100 caracteres"),
  address: z.string().optional()
})

export const companyValidateToCreate = (company) => {
  return companySchema.safeParse(company)
}

export const createCompany = async (data) => {
  return await prisma.empresas.create({ data })
}