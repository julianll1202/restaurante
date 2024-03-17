import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllCompras = async (req, res) => {
    const compras = await prisma.compras.findMany()
    return compras
}

export const comprasConProductos = async (req, res) => {
    const compras = await prisma.compras.findMany({
        select: {
            compraId: true,
            fechaCompra: true,
            productosEnCompra: {
                select: {
                    productoId: true,
                    cantidad: true,
                    precioTotal: true
            }
        }
    }})
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
        const productos = compraInfo.productos
        productos.forEach(async (prod) => {
            prod.compraId = compraNueva.compraId
            const updateProd = await prisma.productos.update({
                where: {
                    productoId: prod.productoId
                },
                data: {
                    cantidad: {
                        increment: prod.cantidad
                    },
                }
            })
        })
        const prodCompras = await prisma.productosEnCompras.createMany({
            data: productos
        })
        return compraNueva
    } catch (err) {
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteCompra = async (req, res) => {
    const compra = req.params
    if (!compra.id) {
        return 'Error: El id de la compra es necesario'
    }
    try {
        const deletedCompra = await prisma.compras.delete({
            where: {
                compraId: Number(compra.id)
            }
        })
        return deletedCompra
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateCompra = async (req, res) => {
    const compra = req.body
    if (!compra.compraId) {
        return 'Error: El id de la compra es necesario'
    }
    try {
        const updatedCompra = await prisma.compras.update({
            where: {
                compraId: compra.compraId
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
