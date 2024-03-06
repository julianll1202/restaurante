import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export function addRefreshTokenToWhitelist ({ jti, refreshToken, userId }) {
    return prisma.refreshToken.create({
        data: {
            id: jti,
            hashedToken: refreshToken,
            userId: userId
        }
    })
}

export function findRefreshTokenById (id) {
    return prisma.refreshToken.findUnique({
        where: {
            id: id
        }
    })
}

export function deleteRefreshToken (id) {
    return prisma.refreshToken.update({
        where: {
            id: id
        },
        data: {
            revoked: true
        }
    })
}

export function revokeTokens (userId) {
    return prisma.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    })
}
