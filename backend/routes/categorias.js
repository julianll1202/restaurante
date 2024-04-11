import express from 'express'
import { createCategoria, deleteCategoria, getAllCategorias, updateCategoria } from '../controllers/categoriaController.js'
import { authenticatePlatillos, isAuthenticated } from '../middlewares/authentication.js'

const router = express.Router()

router.get('/listar', authenticatePlatillos, isAuthenticated, async function (req, res) {
    const categorias = await getAllCategorias(req, res)
    res.status(200).send(categorias)
})

router.post('/crear', authenticatePlatillos, isAuthenticated, async function (req, res) {
    const categoria = await createCategoria(req, res)
    if (!JSON.stringify(categoria).startsWith('"Error')) {
        res.status(200).send(categoria)
    } else {
        res.status(400).send(categoria)
    }
})

router.put('/actualizar', authenticatePlatillos, isAuthenticated, async function (req, res) {
    const categoriaActualizada = await updateCategoria(req, res)
    if (!JSON.stringify(categoriaActualizada).startsWith('"Error')) {
        res.status(200).send(categoriaActualizada)
    } else {
        res.status(400).send(categoriaActualizada)
    }
})
router.delete('/eliminar', authenticatePlatillos, isAuthenticated, async function (req, res) {
    const categoriaD = await deleteCategoria(req, res)
    if (!JSON.stringify(categoriaD).startsWith('"Error')) {
        res.status(200).send(categoriaD)
    } else {
        res.status(400).send(categoriaD)
    }
})
export default router
