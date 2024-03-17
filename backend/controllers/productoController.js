import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllProductos = async (req, res) => {
    const productos = await prisma.productos.findMany({
        select: {
            productoId: true,
            productoNombre: true,
            cantidad: true,
            cantidadMax: true,
            fechaCaducidad: true,
            productosEnCompra: {
                select: {
                    cantidad: true,
                    precioTotal: true
                }
            }
        }
    })
    return productos
}

export const getOneProducto = async (req, res, productoId) => {
    if (!productoId) {
        return 'Error: El id del producto es necesario'
    }
    try {
        const productoInfo = await prisma.productos.findUnique({
            where: {
                productoId: Number(productoId)
            }
        })
        return productoInfo
    } catch (err) {
        return 'Error: No se pudo obtener el registro'
    }
}

export const createProducto = async (req, res) => {
    const productoInfo = req.body
    try {
        const productoNuevo = await prisma.productos.create({
            data: {
                productoNombre: productoInfo.productoNombre,
                cantidad: productoInfo.cantidad,
                cantidadMax: productoInfo.cantidadMax,
                fechaCaducidad: productoInfo.fechaCaducidad
            }
        })
        return productoNuevo
    } catch (err) {
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteProducto = async (req, res) => {
    const producto = req.params
    if (!producto) {
        return 'Error: El id del producto es necesario'
    }
    try {
        const deletedProducto = await prisma.productos.delete({
            where: {
                productoId: Number(producto.id)
            }
        })
        return deletedProducto
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateProducto = async (req, res) => {
    const producto = req.body
    if (!producto.id) {
        return 'Error: El id del producto es necesario'
    }
    try {
        const updatedProducto = await prisma.productos.update({
            where: {
                productoId: producto.id
            },
            data: {
                productoNombre: producto.productoNombre,
                cantidad: producto.cantidad,
                cantidadMax: producto.cantidadMax,
                fechaCaducidad: producto.fechaCaducidad
            }
        })
        return updatedProducto
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
