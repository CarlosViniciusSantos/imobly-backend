import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createCompany = async (data) => {
  return await prisma.company.create({ data })
}

export const getCompanyById = async (id) => {
  return await prisma.company.findUnique({ where: { id } })
}

export const listCompanies = async () => {
  return await prisma.company.findMany()
}

export const updateCompany = async (id, data) => {
  return await prisma.company.update({
    where: { id },
    data
  })
}

export const removeCompany = async (id) => {
  return await prisma.company.delete({ where: { id } })
}