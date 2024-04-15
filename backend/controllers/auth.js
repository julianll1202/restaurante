import { PrismaClient } from '@prisma/client'
import { generateTokens } from '../services/tokenService.js'
import { randomUUID } from 'crypto'
import { addRefreshTokenToWhitelist, revokeTokens } from '../services/authServices.js'
import { hashToken } from '../services/hashToken.js'

const prisma = new PrismaClient()

export const login = async (req, res) => {
    const { username, password } = req.body
    const user = await prisma.users.findFirst({
        where: {
            username: username
        }
    })
    if (!user) {
        return { response: 'User not found' }
    }

    if (user.password === password) {
        const jti = randomUUID()
        const { accessToken, refreshToken } = generateTokens(user, jti)
        await addRefreshTokenToWhitelist({ jti, refreshToken: hashToken(refreshToken), userId: user.userId })
        return { response: 'Authorized entry', user: user, accessToken: accessToken, refreshToken: refreshToken }
    } else {
        return { response: 'Invalid password' }
    }
}

export const logout = async (req, res) => {
    const { userId } = req.body
    try {
        await revokeTokens(userId)
        return { response: 'Logged out successfully' }
    } catch (err) {
        res.status(401)
        throw new Error({ response: 'Unauthorized' })
    }
}
