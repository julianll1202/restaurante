import express from 'express'
import { createProducto, deleteProducto, getAllProductos, updateProducto, getOneProducto } from '../controllers/productoController.js'

const router = express.Router()

router.get('/listar', async function (req, res) {
    const productos = await getAllProductos(req, res)
    res.status(200).send(productos)
})

router.get('/obtener/:id', async function (req, res) {
    const producto = await getOneProducto(req, res, req.params.id)
    if (!JSON.stringify(producto).startsWith('"Error')) {
        res.status(200).send(producto)
    } else {
        res.status(400).send(producto)
    }
})

router.post('/crear', async function (req, res) {
    const producto = await createProducto(req, res)
    if (!JSON.stringify(producto).startsWith('"Error')) {
        res.status(200).send(producto)
    } else {
        res.status(400).send(producto)
    }
})

router.put('/actualizar', async function (req, res) {
    const productoActualizado = await updateProducto(req, res)
    if (!JSON.stringify(productoActualizado).startsWith('"Error')) {
        res.status(200).send(productoActualizado)
    } else {
        res.status(400).send(productoActualizado)
    }
})
router.delete('/eliminar/:id', async function (req, res) {
    const productoD = await deleteProducto(req, res)
    if (!JSON.stringify(productoD).startsWith('"Error')) {
        res.status(200).send(productoD)
    } else {
        res.status(400).send(productoD)
    }
})
export default router
