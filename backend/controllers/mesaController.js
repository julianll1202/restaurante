import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllMesas = async () => {
    const mesas = await prisma.mesas.findMany()
    return mesas
}

export const getMesasLibres = async () => {
    const mesas = await prisma.mesas.findMany({
        where: {
            ocupada: false
        }
    })
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

export const createMesaSOAP = async (capacidad, ubicacion, tipoMesa) => {
    try {
        const mesaNueva = await prisma.mesas.create({
            data: {
                capacidad: capacidad,
                ubicacion: ubicacion,
                tipoMesa: tipoMesa
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

export const deleteMesaSOAP = async (mesaId) => {
    if (!mesaId) {
        return 'Error: El id de la mesa es necesario'
    }
    try {
        const deletedMesa = await prisma.mesas.delete({
            where: {
                mesaId: mesaId
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
                tipoMesa: mesa.tipoMesa,
                ocupada: mesa.ocupada
            }
        })
        return updatedMesa
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}

export const updateMesaSOAP = async (mesaId, capacidad, ubicacion, tipoMesa, ocupada) => {
    if (!mesaId) {
        return 'Error: El id de la mesa es necesario'
    }
    try {
        const updatedMesa = await prisma.mesas.update({
            where: {
                mesaId: mesaId
            },
            data: {
                capacidad: capacidad,
                ubicacion: ubicacion,
                tipoMesa: tipoMesa,
                ocupada: ocupada
            }
        })
        return updatedMesa
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}

export const updateEstatusMesa = async (req, res) => {
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
                ocupada: mesa.ocupada
            }
        })
        return updatedMesa
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}

export const isMesaOcupada = async (id) => {
    try {
        const mesa = await prisma.mesas.findUnique({
            where: {
                mesaId: id
            },
            select: {
                ocupada: true
            }
        })
        return mesa.ocupada
    } catch (err) {
        return 'Error'
    }
}
