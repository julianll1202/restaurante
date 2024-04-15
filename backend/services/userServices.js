import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export function findUserByUsername (username) {
    return prisma.users.findUnique({
        where: {
            username: username
        }
    })
}

export function findUserByIdFull (id) {
    return prisma.users.findUnique({
        where: {
            userId: id
        }, select: {
            userId: true,
            username: true,
            role: {
                select: {
                    roleId: true,
                    permits: {
                        select: {
                            permit: {
                                select: {
                                    action: true,
                                    area: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export function findUserById (id) {
    return prisma.users.findUnique({
        where: {
            userId: id
        }, select: {
            userId: true,
            username: true,
            roleId: true
        }
    })
}