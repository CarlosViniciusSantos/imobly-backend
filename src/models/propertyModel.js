import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createProperty = async (data) => {
  return await prisma.property.create({ data })
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