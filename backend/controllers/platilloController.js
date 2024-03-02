import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllPlatillos = async (req, res) => {
    const platillos = await prisma.platillos.findMany()
    return platillos
}

export const createPlatillo = async (req, res) => {
    const platilloInfo = req.body
    try {
        const platilloNuevo = await prisma.platillos.create({
            data: {
                platilloNombre: platilloInfo.nombre,
                descripcion: platilloInfo.descripcion,
                precio: platilloInfo.precio,
                categoriaId: platilloInfo.categoriaId
            }
        })
        return platilloNuevo
    } catch (err) {
        return 'Error: No se pudo crear el registro'
    }
}

export const deletePlatillo = async (req, res) => {
    const platillo = req.body
    if (!platillo.id) {
        return 'Error: El id del platillo es necesario'
    }
    try {
        const deletedPlatillo = await prisma.platillos.delete({
            where: {
                platilloId: platillo.id
            }
        })
        return deletedPlatillo
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updatePlatillo = async (req, res) => {
    const platillo = req.body
    if (!platillo.id) {
        return 'Error: El id del platillo es necesario'
    }
    try {
        const updatedPlatillo = await prisma.platillos.update({
            where: {
                platilloId: platillo.id
            },
            data: {
                platilloNombre: platillo.nombre,
                descripcion: platillo.descripcion,
                precio: platillo.precio,
                categoriaId: platillo.categoriaId
            }
        })
        return updatedPlatillo
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
