import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createComment = async (data) => {
  return await prisma.comment.create({ data })
}

export const getCommentById = async (id) => {
  return await prisma.comment.findUnique({ where: { id } })
}

export const listComments = async () => {
  return await prisma.comment.findMany()
}

export const updateComment = async (id, data) => {
  return await prisma.comment.update({
    where: { id },
    data
  })
}

export const removeComment = async (id) => {
  return await prisma.comment.delete({ where: { id } })
}