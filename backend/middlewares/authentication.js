import { JWT_SECRET_KEY } from '../config'
import { findUserByIdFull } from '../services/userServices'

const jwt = require('jsonwebtoken')

export function isAuthenticated (req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401)
        throw new Error('Unauthorized')
    }

    try {
        const token = authorization.split(' ')[1]
        const payload = jwt.verify(token, JWT_SECRET_KEY)
        req.payload = payload
    } catch (err) {
        res.status(401)
        if (err.name === 'TokenExpiredError') {
            console.log(authorization)
            throw new Error(err.name)
        }
        throw new Error('Unauthorized')
    }

    return next()
}

export async function authenticateCompras (req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).send()
    }
    let valid = false
    try {
        const token = authorization.split(' ')[1]
        const userT = jwt.decode(token, JWT_SECRET_KEY)
        const user = await findUserByIdFull(userT.userId)
        const ruta = req.route.path
        user.role.permits.forEach((p) => {
            if (p.permit.area === 'COMPRAS' || p.permit.area === 'PRODUCTOS') {
                if (p.permit.action === 'VER' || p.permit.action === 'EDITAR'){
                    if (isMethodValid(p.permit.action, ruta))
                        valid = true
                }
            } else {
                console.log('No autorizado')
            }
        })
        if (!valid) {
            console.log(valid)
            return res.status(401).send()
        }
        return next()
    } catch (err) {
        res.status(401)
        console.log(err)
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send()
        }
        throw new Error('Unauthorized')
    }
}

export async function authenticateUsuarios (req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401)
        throw new Error('Unauthorized')
    }
    let valid = false
    try {
        const token = authorization.split(' ')[1]
        const userT = jwt.decode(token, JWT_SECRET_KEY)
        const user = await findUserByIdFull(userT.userId)
        const ruta = req.route.path
        console.log(user.role.permits)
        console.log(req.method)
        user.role.permits.forEach((p) => {
            if (p.permit.area === 'USUARIOS') {
                if (p.permit.action === 'VER' || p.permit.action === 'EDITAR'){
                    if (isMethodValid(p.permit.action, ruta))
                        valid = true
                }
            } else {
                console.log('No autorizado')
            }
        })
        console.log('hola')
    } catch (err) {
        res.status(401)
        console.log(err)
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name)
        }
        throw new Error('Unauthorized')
    }
    if (!valid) {
        console.log(valid)
        return res.status(401).send()
    }
    return next()
}

export async function authenticatePlatillos (req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401)
        throw new Error('Unauthorized')
    }
    let valid = false
    try {
        const token = authorization.split(' ')[1]
        const userT = jwt.decode(token, JWT_SECRET_KEY)
        const user = await findUserByIdFull(userT.userId)
        const ruta = req.route.path
        console.log(user.role.permits)
        console.log(req.method)
        user.role.permits.forEach((p) => {
            if (p.permit.area === 'PLATILLOS') {
                if (p.permit.action === 'VER' || p.permit.action === 'EDITAR'){
                    if (isMethodValid(p.permit.action, ruta))
                        valid = true
                }
            } else {
                console.log('No autorizado')
            }
        })
        console.log('hola')
    } catch (err) {
        res.status(401)
        console.log(err)
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name)
        }
        throw new Error('Unauthorized')
    }
    if (!valid) {
        console.log(valid)
        return res.status(401).send()
    }
    return next()
}

export async function authenticateEmpleados (req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).send()
        // throw new Error('Unauthorized')
    }
    let valid = false
    try {
        const token = authorization.split(' ')[1]
        const userT = jwt.decode(token, JWT_SECRET_KEY)
        const user = await findUserByIdFull(userT.userId)
        const ruta = req.route.path
        console.log(user.role.permits)
        console.log(req.method)
        user.role.permits.forEach((p) => {
            if (p.permit.area === 'EMPLEADOS') {
                if (p.permit.action === 'VER' || p.permit.action === 'EDITAR'){
                    if (isMethodValid(p.permit.action, ruta))
                        valid = true
                }
            } else {
                console.log('No autorizado')
            }
        })
        console.log('hola')
    } catch (err) {
        res.status(401)
        console.log(err)
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name)
        }
        throw new Error('Unauthorized')
    }
    if (!valid) {
        console.log(valid)
        return res.status(401).send()
    }
    return next()
}

export async function authenticateComandas (req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401)
        throw new Error('Unauthorized')
    }
    let valid = false
    try {
        const token = authorization.split(' ')[1]
        const userT = jwt.decode(token, JWT_SECRET_KEY)
        const user = await findUserByIdFull(userT.userId)
        const ruta = req.route.path
        console.log(user.role.permits)
        console.log(req.method)
        user.role.permits.forEach((p) => {
            if (p.permit.area === 'COMANDAS') {
                if (p.permit.action === 'VER' || p.permit.action === 'EDITAR'){
                    if (isMethodValid(p.permit.action, ruta))
                        valid = true
                }
            } else {
                console.log('No autorizado')
            }
        })
        console.log('hola')
    } catch (err) {
        res.status(401)
        console.log(err)
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name)
        }
        throw new Error('Unauthorized')
    }
    if (!valid) {
        console.log(valid)
        return res.status(401).send()
    }
    return next()
}

export async function authenticateProductos (req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401)
        throw new Error('Unauthorized')
    }
    let valid = false
    try {
        const token = authorization.split(' ')[1]
        const userT = jwt.decode(token, JWT_SECRET_KEY)
        const payload = jwt.verify(token, JWT_SECRET_KEY)
        const user = await findUserByIdFull(userT.userId)
        const ruta = req.route.path
        console.log(user.role.permits)
        console.log(req.method)
        user.role.permits.forEach((p) => {
            if (p.permit.area === 'PRODUCTOS') {
                if (p.permit.action === 'VER' || p.permit.action === 'EDITAR'){
                    if (isMethodValid(p.permit.action, ruta))
                    valid = true
                    } else {
                        console.log('No autorizado')
                    }
                }
        })
        if (!valid) {
            console.log(valid)
            return res.status(401).send()
        }
        return next()
    } catch (err) {
        res.status(401).send()
        console.log(err)
        if (err.name === 'TokenExpiredError') {
            res.status(401).send()
            // throw new Error(err.name)
        }
        // throw new Error('Unauthorized')
    }
}

function isMethodValid (permit, method) {
    let valid = true
    switch (method) {
        case 'GET':
            if (permit === 'VER' || permit === 'EDITAR')
                valid = true
        case 'POST':
            if (permit === 'VER') {
                valid = false
                break
            }
        case 'PUT':
            if (permit === 'VER') {
                valid = false
                break
            }
        case 'DELETE':
            if (permit === 'VER') {
                valid = false
                break
            }
    }
    return valid
}
