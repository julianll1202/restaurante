import express from 'express'
import { createPuesto, deletePuesto, getAllPuestos, updatePuesto } from '../controllers/puestoController.js'

const router = express.Router()

router.get('/listar', async function (req, res) {
    const puestos = await getAllPuestos(req, res)
    res.status(200).send(puestos)
})

router.post('/crear', async function (req, res) {
    const puesto = await createPuesto(req, res)
    if (!JSON.stringify(puesto).startsWith('"Error')) {
        res.status(200).send(puesto)
    } else {
        res.status(400).send(puesto)
    }
})

router.put('/actualizar', async function (req, res) {
    const puestoActualizado = await updatePuesto(req, res)
    if (!JSON.stringify(puestoActualizado).startsWith('"Error')) {
        res.status(200).send(puestoActualizado)
    } else {
        res.status(400).send(puestoActualizado)
    }
})
router.delete('/eliminar', async function (req, res) {
    const puestoD = await deletePuesto(req, res)
    if (!JSON.stringify(puestoD).startsWith('"Error')) {
        res.status(200).send(puestoD)
    } else {
        res.status(400).send(puestoD)
    }
})
export default router
