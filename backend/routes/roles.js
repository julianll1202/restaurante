import express from 'express'
import { createRol, deleteRol, getAllRoles, getRol, updateRol } from '../controllers/rolController.js'

const router = express.Router()

router.get('/listar', async function (req, res) {
    const roles = await getAllRoles(req, res)
    res.status(200).send(roles)
})

router.get('/ver/:id', async function (req, res) {
    try {
        const id = req.params.id
        const rol = await getRol(Number(id))
        res.status(200).send(rol)
    } catch (err) {
        res.status(400).send({message:'Rol no existe'})
    }
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
