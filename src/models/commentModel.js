import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const commentSchema = z.object({
  text: z.string().min(1, "O texto do comentário não pode ser vazio"),
  userId: z.number().positive("O ID do usuário deve ser um número positivo"),
  propertyId: z.number().positive("O ID do imóvel deve ser um número positivo")
})

export const commentValidateToCreate = (comment) => {
  return commentSchema.safeParse(comment)
}

export const createComment = async (data) => {
  return await prisma.comentarios.create({ data })
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