import { PrismaClient } from '@prisma/client'
import { isMesaOcupada } from './mesaController'

const prisma = new PrismaClient()

export const getAllComandas = async (req, res) => {
    const comandas = await prisma.comandas.findMany({
        select: {
            empleado: {
                select: {
                    empleadoId: true,
                    empleadoNombre: true,
                    paterno: true,
                    materno: true
                }
            },
            mesaId: true,
            fechaCreacion: true,
            precioFinal: true,
            completada: true,
            platillosEnComanda: {
                select: {
                    cantidad: true,
                    platillo: {
                        select: {
                            platilloNombre: true,
                            platilloId: true,
                            imagen: {
                                select: {
                                    url: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    return comandas
}

export const createComanda = async (req, res) => {
    const comandaInfo = req.body
    try {
        if (!isMesaOcupada(comandaInfo.mesaId)) {
            const comandaNueva = await prisma.comandas.create({
                data: {
                    clienteId: comandaInfo.clienteId,
                    empleadoId: comandaInfo.empleadoId,
                    mesaId: comandaInfo.mesaId,
                    precioFinal: comandaInfo.precioFinal
                }
            })
            await prisma.mesas.update({
                where: {
                    mesaId: comandaInfo.mesaId
                },
                data: {
                    ocupada: true
                }
            })
            const platillos = comandaInfo.platillos
            platillos.forEach((p) => {
                p.comandaId = comandaNueva.comandaId
            })
            await prisma.platillosEnComandas.createMany({
                data: platillos
            })
            return comandaNueva
        } else {
            return 'Error: La mesa esta ocupada'
        }
    } catch (err) {
        console.log(err)
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
