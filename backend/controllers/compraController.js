import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllCompras = async (req, res) => {
    const compras = await prisma.compras.findMany()
    return compras
}

export const createCompra = async (req, res) => {
    const compraInfo = req.body
    try {
        const compraNueva = await prisma.compras.create({
            data: {
                fechaCompra: compraInfo.fechaCompra,
                total: compraInfo.total
            }
        })
        return compraNueva
    } catch (err) {
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteCompra = async (req, res) => {
    const compra = req.body
    if (!compra.id) {
        return 'Error: El id de la compra es necesario'
    }
    try {
        const deletedCompra = await prisma.compras.delete({
            where: {
                compraId: compra.id
            }
        })
        return deletedCompra
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateCompra = async (req, res) => {
    const compra = req.body
    if (!compra.id) {
        return 'Error: El id de la compra es necesario'
    }
    try {
        const updatedCompra = await prisma.compras.update({
            where: {
                compraId: compra.id
            },
            data: {
                fechaCompra: compra.fechaCompra,
                total: compra.total
            }
        })
        return updatedCompra
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
