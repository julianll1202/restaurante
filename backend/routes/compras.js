import express from 'express'
import { createCompra, deleteCompra, getAllCompras, updateCompra } from '../controllers/compraController.js'

const router = express.Router()

router.get('/listar', async function (req, res) {
    const compras = await getAllCompras(req, res)
    res.status(200).send(compras)
})

router.post('/crear', async function (req, res) {
    const compra = await createCompra(req, res)
    if (!JSON.stringify(compra).startsWith('"Error')) {
        res.status(200).send(compra)
    } else {
        res.status(400).send(compra)
    }
})

router.put('/actualizar', async function (req, res) {
    const compraActualizada = await updateCompra(req, res)
    if (!JSON.stringify(compraActualizada).startsWith('"Error')) {
        res.status(200).send(compraActualizada)
    } else {
        res.status(400).send(compraActualizada)
    }
})
router.delete('/eliminar', async function (req, res) {
    const compraD = await deleteCompra(req, res)
    if (!JSON.stringify(compraD).startsWith('"Error')) {
        res.status(200).send(compraD)
    } else {
        res.status(400).send(compraD)
    }
})
export default router