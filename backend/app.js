import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import empleadosRouter from './routes/empleados.js'
import puestosRouter from './routes/puestos.js'
import categoriasRouter from './routes/categorias.js'
import platillosRouter from './routes/platillos.js'
import mesasRouter from './routes/mesas.js'
import clientesRouter from './routes/clientes.js'
import comandasRouter from './routes/comandas.js'
import comprasRouter from './routes/compras.js'
import productosRouter from './routes/productos.js'
import rolesRouter from './routes/roles.js'
import imgRouter from './routes/imagenes.js'
import authRouter from './routes/auth.js'
import cors from 'cors'
import { isAuthenticated } from './middlewares/authentication.js'
import {soap} from 'express-soap';
import { getAllMesas, createMesaSOAP, updateMesaSOAP, deleteMesaSOAP } from './controllers/mesaController.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/empleados', empleadosRouter)
app.use('/puestos', puestosRouter)
app.use('/categorias', categoriasRouter)
app.use('/platillos', platillosRouter)
app.use('/mesas', mesasRouter)
app.use('/clientes', clientesRouter)
app.use('/comandas', comandasRouter)
app.use('/compras', comprasRouter)
app.use('/productos', productosRouter)
app.use('/roles', rolesRouter)
app.use('/imagenes', imgRouter)

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

app.use('/soap/mesas', soap({
    services: {
        MesaService: {
            CRUD: {
                Listar: function() {
                    return new Promise(async (resolve, reject) => {
                        const mesas = await getAllMesas()
                        resolve({
                            result: mesas
                        });
                    });
                },
                Crear: function(args) {
                    return new Promise(async (resolve, reject) => {
                        try {
                            if(args == undefined) reject('Error: Faltan datos')
                            const capacidad = args.capacidad
                            const ubicacion = args.ubicacion
                            const tipoMesa = args.tipoMesa
                            if(capacidad == undefined || ubicacion == undefined || tipoMesa == undefined) reject('Error: Faltan datos')
                            const mesa = await createMesaSOAP(capacidad, ubicacion, tipoMesa)
                            resolve({
                                result: mesa
                            });
                        }catch(err){
                            reject(err)
                        }
                    });
                },
                Actualizar: function(args) {
                    return new Promise(async (resolve, reject) => {
                        try {
                            if(args == undefined) reject('Error: Faltan datos')
                            const mesaId = args.mesaId
                            const capacidad = args.capacidad
                            const ubicacion = args.ubicacion
                            const tipoMesa = args.tipoMesa
                            const ocupada = args.ocupada
                            if(mesaId == undefined || capacidad == undefined || ubicacion == undefined || tipoMesa == undefined) reject('Error: Faltan datos')
                            const mesaActualizada = await updateMesaSOAP(mesaId, capacidad, ubicacion, tipoMesa, ocupada)
                            resolve({
                                result: mesaActualizada
                            });
                        } catch(err) {
                            reject(err)
                        }
                    });
                },
                Eliminar: function(args) {
                    return new Promise(async (resolve, reject) => {
                        try{
                            if(args == undefined) reject('Error: Faltan datos')
                            const mesaId = args.mesaId
                            if(mesaId == undefined) reject('Error: Faltan datos')
                            const mesaD = await deleteMesaSOAP(mesaId)
                            resolve({
                                result: mesaD
                            });
                        }catch(err){
                            reject(err)
                        }
                    });
                }
              }
        }
    }, 
    wsdl: xml
}));

export default app




