import express from 'express'
import { login, logout } from '../controllers/auth.js'
import { isAuthenticated } from '../middlewares/authentication.js'
const router = express.Router()

router.post('/login', async function (req, res, next) {
    const auth = await login(req, res)
    if (auth.response === 'Authorized entry') {
        res.status(200).send(auth)
    } else {
        res.status(401).json(auth)
    }
})

router.post('/logout', isAuthenticated, async function (req, res, next) {
    const auth = await logout(req, res)
    if (auth.response === 'Logged out successfully') {
        res.status(200).send(auth)
    } else {
        res.status(401).json(auth)
    }
})
export default router
