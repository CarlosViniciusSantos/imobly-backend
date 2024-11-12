import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const propertySchema = z.object({
  cep: z.string().min(8, "O CEP deve ter ao menos 8 caracteres").max(10, "O CEP deve ter no máximo 10 caracteres"),
  cidade: z.string().min(3, "A cidade deve ter ao menos 3 caracteres").max(100, "A cidade deve ter no máximo 100 caracteres"),
  estado: z.string().length(2, "O estado deve ter 2 caracteres"),
  tipo: z.string().min(3, "O tipo deve ter ao menos 3 caracteres").max(50, "O tipo deve ter no máximo 50 caracteres"),
  valor: z.number().positive("O valor deve ser um número positivo"),
  descricao: z.string().optional(),
  id_empresa: z.number().positive("O ID da empresa deve ser um número positivo")
})

export const propertyValidateToCreate = (property) => {
  return propertySchema.safeParse(property)
}

export const createProperty = async (data) => {
  return await prisma.imoveis.create({ data })
}

export const getPropertyById = async (id) => {
  return await prisma.imoveis.findUnique({ where: { id } })
}

export const listProperties = async () => {
  return await prisma.imoveis.findMany()
}

export const updateProperty = async (id, data) => {
  return await prisma.imoveis.update({
    where: { id },
    data
  })
}

export const removeProperty = async (id) => {
  return await prisma.imoveis.delete({ where: { id } })
}