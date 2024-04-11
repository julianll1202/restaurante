import express from 'express'
import { login, logout } from '../controllers/auth.js'
import { authenticateUsuarios, isAuthenticated } from '../middlewares/authentication.js'
import { createUser, deleteUser, getAllUsers, updateUser } from '../controllers/userController.js'
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

router.get('/listar', authenticateUsuarios, isAuthenticated, async function (req, res) {
    const users = await getAllUsers(req, res)
    res.status(200).send(users)
})

router.post('/crear', authenticateUsuarios, isAuthenticated, async function (req, res) {
    const user = await createUser(req, res)
    if (!JSON.stringify(user).startsWith('"Error')) {
        res.status(200).send(user)
    } else {
        res.status(400).send(user)
    }
})

router.put('/actualizar', authenticateUsuarios, isAuthenticated, async function (req, res) {
    const userActualizado = await updateUser(req, res)
    if (!JSON.stringify(userActualizado).startsWith('"Error')) {
        res.status(200).send(userActualizado)
    } else {
        res.status(400).send(userActualizado)
    }
})

router.delete('/eliminar', authenticateUsuarios, isAuthenticated, async function (req, res) {
    const userD = await deleteUser(req, res)
    if (!JSON.stringify(userD).startsWith('"Error')) {
        res.status(200).send(userD)
    } else {
        res.status(400).send(userD)
    }
})
export default router
