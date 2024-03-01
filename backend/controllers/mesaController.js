import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllMesas = async (req, res) => {
    const mesas = await prisma.mesas.findMany()
    return mesas
}

export const createMesa = async (req, res) => {
    const mesaInfo = req.body
    try {
        const mesaNueva = await prisma.mesas.create({
            data: {
                capacidad: mesaInfo.capacidad,
                ubicacion: mesaInfo.ubicacion,
                tipoMesa: mesaInfo.tipoMesa
            }
        })
        return mesaNueva
    } catch (err) {
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteMesa = async (req, res) => {
    const mesa = req.body
    if (!mesa.id) {
        return 'Error: El id de la mesa es necesario'
    }
    try {
        const deletedMesa = await prisma.mesas.delete({
            where: {
                mesaId: mesa.id
            }
        })
        return deletedMesa
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateMesa = async (req, res) => {
    const mesa = req.body
    if (!mesa.id) {
        return 'Error: El id de la mesa es necesario'
    }
    try {
        const updatedMesa = await prisma.mesas.update({
            where: {
                mesaId: mesa.id
            },
            data: {
                capacidad: mesa.capacidad,
                ubicacion: mesa.ubicacion,
                tipoMesa: mesa.tipoMesa
            }
        })
        return updatedMesa
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
