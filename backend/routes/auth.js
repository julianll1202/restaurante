import express from 'express'
import { JWT_SECRET_KEY } from '../config/index.js'
import { deleteRefreshToken, findRefreshTokenById, revokeTokens } from '../services/authServices.js'
import { hashToken } from '../services/hashToken.js'
import { randomUUID } from 'crypto'
import { generateTokens } from '../services/tokenService.js'
import { findUserById } from '../services/userServices.js'

const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) {
            res.status(400)
            throw new Error('Missing refresh token')
        }

        const payload = jwt.verify(refreshToken, JWT_SECRET_KEY)
        const savedRefreshToken = await findRefreshTokenById(payload.jti)

        if (!savedRefreshToken || savedRefreshToken.revoked) {
            res.status(400)
            throw new Error('Unauthorized access')
        }

        const hashedToken = hashToken(refreshToken)
        if (hashedToken !== savedRefreshToken.hashedToken) {
            res.status(401)
            throw new Error('Unauthorized access')
        }

        const user = await findUserById(payload.userId)
        if (!user) {
            res.status(401)
            throw new Error('Unauthorized access')
        }

        await deleteRefreshToken(savedRefreshToken.id)
        const jti = randomUUID()
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti)
        res.json({
            accessToken,
            refreshToken: newRefreshToken
        })
    } catch (err) {
        next(err)
    }
})

router.post('/revoke/refresh-token', async (req, res, next) => {
    try {
        const { userId } = req.body
        await revokeTokens(userId)
        res.json({ message: 'Tokens were revoked successfully' })
    } catch (err) {
        next(err)
    }
})
