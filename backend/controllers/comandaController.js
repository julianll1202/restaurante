import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllComandas = async (req, res) => {
    const comandas = await prisma.comandas.findMany()
    return comandas
}

export const createComanda = async (req, res) => {
    const comandaInfo = req.body
    try {
        const comandaNueva = await prisma.comandas.create({
            data: {
                clienteId: comandaInfo.clienteId,
                empleadoId: comandaInfo.empleadoId,
                mesaId: comandaInfo.mesaId,
                completada: comandaInfo.completada,
                precioFinal: comandaInfo.precioFinal,
                fechaCreacion: comandaInfo.fechaCreacion,
                fechaCierre: comandaInfo.fechaCierre
            }
        })
        return comandaNueva
    } catch (err) {
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteComanda = async (req, res) => {
    const comanda = req.body
    if (!comanda.id) {
        return 'Error: El id de la comanda es necesario'
    }
    try {
        const deletedComanda = await prisma.comandas.delete({
            where: {
                comandaId: comanda.id
            }
        })
        return deletedComanda
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateComanda = async (req, res) => {
    const comanda = req.body
    if (!comanda.id) {
        return 'Error: El id de la comanda es necesario'
    }
    try {
        const updatedComanda = await prisma.comandas.update({
            where: {
                comandaId: comanda.id
            },
            data: {
                clienteId: comanda.clienteId,
                empleadoId: comanda.empleadoId,
                mesaId: comanda.mesaId,
                completada: comanda.completada,
                precioFinal: comanda.precioFinal,
                fechaCreacion: comanda.fechaCreacion,
                fechaCierre: comanda.fechaCierre
            }
        })
        return updatedComanda
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
