import express from 'express'
import { createRol, deleteRol, getAllRoles, updateRol } from '../controllers/rolController.js'

const router = express.Router()

router.get('/listar', async function (req, res) {
    const roles = await getAllRoles(req, res)
    res.status(200).send(roles)
})

router.post('/crear', async function (req, res) {
    const rol = await createRol(req, res)
    if (!JSON.stringify(rol).startsWith('"Error')) {
        res.status(200).send(rol)
    } else {
        res.status(400).send(rol)
    }
})

router.put('/actualizar', async function (req, res) {
    const rolActualizado = await updateRol(req, res)
    if (!JSON.stringify(rolActualizado).startsWith('"Error')) {
        res.status(200).send(rolActualizado)
    } else {
        res.status(400).send(rolActualizado)
    }
})

router.delete('/eliminar', async function (req, res) {
    const rolD = await deleteRol(req, res)
    if (!JSON.stringify(rolD).startsWith('"Error')) {
        res.status(200).send(rolD)
    } else {
        res.status(400).send(rolD)
    }
})
export default router
