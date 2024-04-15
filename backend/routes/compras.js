import express from 'express'
import { createCompra, deleteCompra, getAllCompras, updateCompra, comprasConProductos, getCompraPorId, getCompraById } from '../controllers/compraController.js'
import { authenticateCompras, isAuthenticated } from '../middlewares/authentication.js'

const router = express.Router()

router.get('/listar', isAuthenticated,authenticateCompras, async function (req, res) {
    const compras = await getAllCompras(req, res)
    res.status(200).send(compras)
})

router.get('/ver/:id', isAuthenticated,authenticateCompras, async function (req, res) {
    const id =req.params.id
    const compras = await getCompraById(id)
    res.status(200).send(compras)
})

router.get('/obtener/:id', isAuthenticated,authenticateCompras, async function (req, res) {
    const compra = await getCompraPorId(req, res, req.params.id)
    if (!JSON.stringify(compra).startsWith('"Error')) {
        res.status(200).send(compra)
    } else {
        res.status(400).send(compra)
    }
})

router.get('/comprasConProductos', isAuthenticated, authenticateCompras, async function (req, res) {
    const comprasList = await comprasConProductos(req, res)
    res.status(200).send(comprasList)
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

router.delete('/eliminar/:id', authenticateCompras, isAuthenticated, async function (req, res) {
    const compraD = await deleteCompra(req, res)
    if (!JSON.stringify(compraD).startsWith('"Error')) {
        res.status(200).send(compraD)
    } else {
        res.status(400).send(compraD)
    }
})

export default router
