import express from 'express'
import { createPlatillo, deletePlatillo, getAllPlatillos, updatePlatillo, getPlatillosCategoria } from '../controllers/platilloController.js'

const router = express.Router()

router.get('/listar', async function (req, res) {
    const platillos = await getAllPlatillos(req, res)
    res.status(200).send(platillos)
})

router.get('/buscarCategoria', async function (req, res) {
    const categoriaId = req.query.categoriaId
    const platillosCategoria = await getPlatillosCategoria(req, res, categoriaId)
    res.status(200).send(platillosCategoria)
})

router.post('/crear', async function (req, res) {
    const platillo = await createPlatillo(req, res)
    if (!JSON.stringify(platillo).startsWith('"Error')) {
        res.status(200).send(platillo)
    } else {
        res.status(400).send(platillo)
    }
})

router.put('/actualizar/:id', async function (req, res) {
    const platilloActualizado = await updatePlatillo(req, res)
    if (!JSON.stringify(platilloActualizado).startsWith('"Error')) {
        res.status(200).send(platilloActualizado)
    } else {
        res.status(400).send(platilloActualizado)
    }
})
router.delete('/eliminar/:id', async function (req, res) {
    const platilloD = await deletePlatillo(req, res)
    if (!JSON.stringify(platilloD).startsWith('"Error')) {
        res.status(200).send(platilloD)
    } else {
        res.status(400).send(platilloD)
    }
})
export default router
