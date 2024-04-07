import express from 'express'
var soap = require('soap');

const router = express.Router()

router.get('/listar', async function (req, res) {
    var args = {};
    var xml = 'C:/Users/JML15/Desktop/CODE/ProyectoWEBYAOS/restaurante/backend/myservice.wsdl'
    try {
        var client = await soap.createClientAsync(xml, { endpoint: 'http://localhost:3000/soap/mesas'});
        var result = await client.ListarAsync(args);
        res.status(200).send(result[0]['result'])
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al listar las mesas')
    }
})

router.post('/crear', async function (req, res) {
    const {capacidad, ubicacion, tipoMesa} = req.body;
    var xml = 'C:/Users/JML15/Desktop/CODE/ProyectoWEBYAOS/restaurante/backend/myservice.wsdl'
    try {
        var client = await soap.createClientAsync(xml, { endpoint: 'http://localhost:3000/soap/mesas'});
        var result = await client.CrearAsync({capacidad, ubicacion, tipoMesa});
        res.status(200).send(result[0])
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al crear la mesa')
    }
})

router.put('/actualizar', async function (req, res) {
    const {mesaId, capacidad, ubicacion, tipoMesa, ocupada} = req.body;
    var xml = 'C:/Users/JML15/Desktop/CODE/ProyectoWEBYAOS/restaurante/backend/myservice.wsdl'
    try {
        var client = await soap.createClientAsync(xml, { endpoint: 'http://localhost:3000/soap/mesas'});
        var result = await client.ActualizarAsync({mesaId, capacidad, ubicacion, tipoMesa, ocupada});
        res.status(200).send(result[0])
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al actualizar la mesa')
    }
})

router.delete('/eliminar/:mesaId', async function (req, res) {
    const {mesaId} = req.params;
    var xml = 'C:/Users/JML15/Desktop/CODE/ProyectoWEBYAOS/restaurante/backend/myservice.wsdl'
    try {
        var client = await soap.createClientAsync(xml, { endpoint: 'http://localhost:3000/soap/mesas'});
        var result = await client.EliminarAsync({mesaId});
        res.status(200).send(result[0])
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al eliminar la mesa')
    }
})
export default router
