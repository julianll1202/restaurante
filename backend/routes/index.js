import express from 'express'
import { isAuthenticated } from '../middlewares/authentication'
const router = express.Router()

/* GET home page. */
router.get('/', isAuthenticated, function (req, res, next) {
    res.send('Hello, world!')
})

export default router
