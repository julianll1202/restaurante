import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllPuestos = async (req, res) => {
    const puestos = await prisma.puestos.findMany()
    return puestos
}

export const createPuesto = async (req, res) => {
    const pInfo = req.body
    try {
        const puestoN = await prisma.puestos.create({
            data: {
                puestoNombre: pInfo.nombre,
                sueldo: pInfo.sueldo
            }
        })
        return puestoN
    } catch (err) {
        if (err.code === 'P2002') {
            return 'Error: Ya existe un registro en la tabla Puestos con ese nombre'
        } else {
            return 'Error: No se pudo crear el registro'
        }
    }
}

export const deletePuesto = async (req, res) => {
    const puesto = req.body
    if (!puesto.id) {
        return 'Error: El id del puesto es necesario'
    }
    try {
        const deletedPuesto = await prisma.puestos.delete({
            where: {
                puestoId: puesto.id
            }
        })
        return deletedPuesto
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updatePuesto = async (req, res) => {
    const puesto = req.body
    if (!puesto.id) {
        return 'Error: El id del puesto es necesario'
    }
    try {
        const updatedPuesto = await prisma.puestos.update({
            where: {
                puestoId: puesto.id
            },
            data: {
                puestoNombre: puesto.nombre,
                sueldo: puesto.sueldo
            }
        })
        return updatedPuesto
    } catch (err) {
        if (err.code === 'P2002') {
            return 'Error: Ya existe un registro en la tabla Puestos con ese nombre'
        } else {
            return 'Error: No se pudo actualizar el registro'
        }
    }
}
