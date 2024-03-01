import { PrismaClient } from '@prisma/client'
import { generateAccessToken } from '../services/tokenService.js'

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
        const token = generateAccessToken(user)
        return { response: 'Authorized entry', user: user, token: token }
    } else {
        return { response: 'Invalid password' }
    }
}
