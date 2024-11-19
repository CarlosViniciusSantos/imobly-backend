import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const userSchema = z.object({
    public_id: z.string({ invalid_type_error: "O public_id deve ser uma String", required_error: "O public_id é obrigatório" }),
    nome: z.string().min(3, "O nome deve ter ao menos 3 caracteres").max(100, "O nome deve ter no máximo 100 caracteres"),
    cpf: z.string().length(11, "O CPF deve ter 11 caracteres"),
    telefone: z.string().min(11, "O telefone deve ter 10 caracteres").max(11, "O telefone deve ter 10 caracteres").optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
    foto_perfil: z.string().url("URL inválida").optional(),
    email: z.string().email("Email inválida").max(100, "O email deve ter no máximo 100 caracteres"),
    senha: z.string().min(8, "A senha deve ter ao menos 8 caracteres").max(255, "A senha deve ter no máximo 255 caracteres")
})

export const userValidateToCreate = (user) => {
    return userSchema.safeParse(user)
}

export const createUser = async (data) => {
    return await prisma.usuarios.create({ data })
}

export const userValidateToLogin = (account) => {
    const partialAccountSchema = accountSchema.partial({ id: true, public_id: true, avatar: true, name: true })
    return partialAccountSchema.safeParse(account)
}

export const getByPublicId = async (public_id) => {
    const user = await prisma.user.findUnique({
        where: {
            public_id
        }
    })
    return user
}

export const getById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user
}

export const getByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user
}

export const signUp = async (user) => {
    const result = await prisma.user.create({
        data: user
    })
    return result
}