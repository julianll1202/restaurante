import express from 'express'
import { createCliente, deleteCliente, getAllClientes, updateCliente } from '../controllers/clienteController.js'

const router = express.Router()

router.get('/listar', async function (req, res) {
    const clientes = await getAllClientes(req, res)
    res.status(200).send(clientes)
})

router.post('/crear', async function (req, res) {
    const cliente = await createCliente(req, res)
    if (!JSON.stringify(cliente).startsWith('"Error')) {
        res.status(200).send(cliente)
    } else {
        res.status(400).send(cliente)
    }
})

router.put('/actualizar', async function (req, res) {
    const clienteActualizado = await updateCliente(req, res)
    if (!JSON.stringify(clienteActualizado).startsWith('"Error')) {
        res.status(200).send(clienteActualizado)
    } else {
        res.status(400).send(clienteActualizado)
    }
})

router.delete('/eliminar', async function (req, res) {
    const clienteD = await deleteCliente(req, res)
    if (!JSON.stringify(clienteD).startsWith('"Error')) {
        res.status(200).send(clienteD)
    } else {
        res.status(400).send(clienteD)
    }
})
export default router
