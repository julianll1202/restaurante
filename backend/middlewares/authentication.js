import { JWT_SECRET_KEY } from '../config'

const jwt = require('jsonwebtoken')

export function isAuthenticated (req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401)
        throw new Error('Unauthorized')
    }

    try {
        const token = authorization.split(' ')[1]
        const payload = jwt.verify(token, JWT_SECRET_KEY)
        req.payload = payload
    } catch (err) {
        res.status(401)
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name)
        }
        throw new Error('Unauthorized')
    }

    return next()
}
