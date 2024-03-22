import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export async function addRefreshTokenToWhitelist ({ jti, refreshToken, userId }) {
    const reg = await prisma.refreshToken.create({
        data: {
            id: jti,
            hashedToken: refreshToken,
            userId: userId
        }
    })
    console.log(reg)
    return reg
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
