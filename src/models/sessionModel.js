import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createSession = async (user_id, token) => {
  return await prisma.session.create({
    data: { user_id, token }
  })
}

export const deleteByToken = async (token) => {
  return await prisma.session.delete({ where: { token } })
}

export const getSessionByToken = async (token) => {
  return await prisma.session.findUnique({ where: { token } })
}

export const updateToken = async (oldToken, newToken) => {
  return await prisma.session.update({
    data: { token: newToken },
    where: { token: oldToken }
  })
}
