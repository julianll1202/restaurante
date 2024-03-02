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
import { fileURLToPath } from 'url'
import cors from 'cors'

const app = express()
const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

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

export default app
