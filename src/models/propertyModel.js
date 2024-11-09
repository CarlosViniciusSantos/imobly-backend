import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const propertySchema = z.object({
  title: z.string().min(3, "O título deve ter ao menos 3 caracteres").max(100, "O título deve ter no máximo 100 caracteres"),
  description: z.string().optional(),
  price: z.number().positive("O preço deve ser um número positivo"),
  companyId: z.number().positive("O ID da empresa deve ser um número positivo")
})

export const propertyValidateToCreate = (property) => {
  return propertySchema.safeParse(property)
}

export const createProperty = async (data) => {
  return await prisma.imoveis.create({ data })
}

export const getPropertyById = async (id) => {
  return await prisma.property.findUnique({ where: { id } })
}

export const listProperties = async () => {
  return await prisma.property.findMany()
}

export const updateProperty = async (id, data) => {
  return await prisma.property.update({
    where: { id },
    data
  })
}

export const removeProperty = async (id) => {
  return await prisma.property.delete({ where: { id } })
}