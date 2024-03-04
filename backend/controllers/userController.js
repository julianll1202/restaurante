import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllUsers = async (req, res) => {
    const users = await prisma.users.findMany()
    return users
}

export const createUser = async (req, res) => {
    const userInfo = req.body
    try {
        const userNuevo = await prisma.users.create({
            data: {
                username: userInfo.username,
                password: userInfo.password,
                roleId: userInfo.roleId
            }
        })
        return userNuevo
    } catch (err) {
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteUser = async (req, res) => {
    const user = req.body
    if (!user.id) {
        return 'Error: El id del user es necesario'
    }
    try {
        const deletedUser = await prisma.users.delete({
            where: {
                userId: user.id
            }
        })
        return deletedUser
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateUser = async (req, res) => {
    const user = req.body
    if (!user.id) {
        return 'Error: El id del user es necesario'
    }
    try {
        const updatedUser = await prisma.users.update({
            where: {
                userId: user.id
            },
            data: {
                username: user.username,
                password: user.password,
                roleId: user.roleId
            }
        })
        return updatedUser
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
