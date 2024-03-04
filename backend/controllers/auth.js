import { PrismaClient } from '@prisma/client'
import { generateTokens } from '../services/tokenService.js'
import { randomUUID } from 'crypto'
import { addRefreshTokenToWhitelist } from '../services/authServices.js'

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
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.userId })
        return { response: 'Authorized entry', user: user, accessToken: accessToken, refreshToken: refreshToken }
    } else {
        return { response: 'Invalid password' }
    }
}
