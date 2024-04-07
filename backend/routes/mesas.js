import express from 'express'
import { createMesa, deleteMesa, getAllMesas, getMesasLibres, updateEstatusMesa, updateMesa } from '../controllers/mesaController.js'
var soap = require('soap');

const router = express.Router()

router.post('/listar', async function (req, res) {
    /*
    const mesas = await getAllMesas(req, res)
    res.status(200).send(mesas)
    */
    var args = {};
    var xml = 'C:/Users/JML15/Desktop/CODE/ProyectoWEBYAOS/restaurante/backend/myservice.wsdl'

    try {
        var client = await soap.createClientAsync(xml, { endpoint: 'http://localhost:3000/soap/mesas'});
        var result = await client.ListarAsync(args);
        console.log(result[0])
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al listar las mesas')
    }
    
})

router.get('/libres', async function (req, res) {
    const mesas = await getMesasLibres()
    res.status(200).send(mesas)
})

router.post('/crear', async function (req, res) {
    const mesa = await createMesa(req, res)
    if (!JSON.stringify(mesa).startsWith('"Error')) {
        res.status(200).send(mesa)
    } else {
        res.status(400).send(mesa)
    }
})

router.put('/actualizar', async function (req, res) {
    const mesaActualizada = await updateMesa(req, res)
    if (!JSON.stringify(mesaActualizada).startsWith('"Error')) {
        res.status(200).send(mesaActualizada)
    } else {
        res.status(400).send(mesaActualizada)
    }
})

router.put('/cambiar-estado', async function (req, res) {
    const mesaActualizada = await updateEstatusMesa(req, res)
    if (!JSON.stringify(mesaActualizada).startsWith('"Error')) {
        res.status(200).send(mesaActualizada)
    } else {
        res.status(400).send(mesaActualizada)
    }
})

router.delete('/eliminar', async function (req, res) {
    const mesaD = await deleteMesa(req, res)
    if (!JSON.stringify(mesaD).startsWith('"Error')) {
        res.status(200).send(mesaD)
    } else {
        res.status(400).send(mesaD)
    }
})
export default router
