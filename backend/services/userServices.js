import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export function findUserByUsername (username) {
    return prisma.users.findUnique({
        where: {
            username: username
        }
    })
}

export function findUserById (id) {
    return prisma.users.findUnique({
        where: {
            userId: id
        }
    })
}
