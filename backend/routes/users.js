import express from 'express'
import { login } from '../controllers/auth.js'
const router = express.Router()

router.post('/login', async function (req, res, next) {
    const auth = await login(req, res)
    if (auth.response === 'Authorized entry') {
        res.status(200).json({ user: auth.user, token: auth.token })
    } else {
        res.status(401).json(auth)
    }
})
export default router
