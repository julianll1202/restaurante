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
import cors from 'cors'
import {soap} from 'express-soap';

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', indexRouter)
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

app.use('/soap/calculation', soap({
    services: {
        CalculatorService: {
            ICalculator: {
                Add({a, b}, res) {
                    res({
                            result: a + b
                    });
                },
                Subtract({a, b}, res) {
                    res({
                            result: a - b
                    });
                }
              }
        }
    }, 
    wsdl: xml
}));

export default app




