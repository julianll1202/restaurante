import express from 'express'
import { createImagen, deleteImagen, getAllImagenes, getCategoriaImagenes, updateImagen } from '../controllers/imagenController'
import multer from 'multer'

const path = require('path')
const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})
router.get('/listar', async function (req, res) {
    const imagenes = await getAllImagenes(req, res)
    res.status(200).send(imagenes)
})

router.get('/listar/cat', async function (req, res) {
    const imagenes = await getCategoriaImagenes(req, res)
    res.status(200).send(imagenes)
})

router.post('/crear', upload.single('image'), async function (req, res) {
    const img = await createImagen(req, res)
    if (!JSON.stringify(img).startsWith('"Error')) {
        res.status(200).send(img)
    } else {
        res.status(400).send(img)
    }
})

router.put('/actualizar', async function (req, res) {
    const imgActualizada = await updateImagen(req, res)
    if (!JSON.stringify(imgActualizada).startsWith('"Error')) {
        res.status(200).send(imgActualizada)
    } else {
        res.status(400).send(imgActualizada)
    }
})
router.delete('/eliminar/:empleadoId', async function (req, res) {
    const imgD = await deleteImagen(req, res)
    if (!JSON.stringify(imgD).startsWith('"Error')) {
        res.status(200).send(imgD)
    } else {
        res.status(400).send(imgD)
    }
})
export default router
