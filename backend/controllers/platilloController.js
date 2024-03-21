import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllPlatillos = async (req, res) => {
    const platillos = await prisma.platillos.findMany()
    return platillos
}

export const getPlatillosCategoria = async (req, res, categoria) => {
    const platillosCategoria = await prisma.platillos.findMany({
        where: {
            categoriaId: parseInt(categoria)
        },
        select: {
            platilloId: true,
            platilloNombre: true,
            precio: true,
            descripcion: true,
            categoriaId: true,
            imagen: {
                select: {
                    imagenId: true,
                    url: true
                }
            },
            productosEnPlatillo: {
                select: {
                    cantidad: true,
                    producto: {
                        select: {
                            productoId: true,
                            productoNombre: true
                        }
                    }
                }
            }
        }
    })
    return platillosCategoria
}

export const createPlatillo = async (req, res) => {
    const platilloInfo = req.body
    try {
        const platilloNuevo = await prisma.platillos.create({
            data: {
                platilloNombre: platilloInfo.nombre,
                descripcion: platilloInfo.descripcion,
                precio: platilloInfo.precio,
                categoriaId: platilloInfo.categoriaId,
                imagenId: platilloInfo.imagenId,
            }
        })
        platilloInfo.productos.forEach((p) => {
            p.platilloId = platilloNuevo.platilloId
        });
        await prisma.productosEnPlatillos.createMany({
            data: platilloInfo.productos
        })
        return platilloNuevo
    } catch (err) {
        console.error(err)
        return 'Error: No se pudo crear el registro'
    }
}

export const deletePlatillo = async (req, res) => {
    const platillo = req.params
    if (!platillo.id) {
        return 'Error: El id del platillo es necesario'
    }
    try {
        const deletedPlatillo = await prisma.platillos.delete({
            where: {
                platilloId: Number(platillo.id)
            }
        })
        return deletedPlatillo
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updatePlatillo = async (req, res) => {
    const p = req.params
    const platillo = req.body
    if (!p) {
        return 'Error: El id del platillo es necesario'
    }
    try {
        const updatedPlatillo = await prisma.platillos.update({
            where: {
                platilloId: Number(p.id)
            },
            data: {
                platilloNombre: platillo.nombre,
                descripcion: platillo.descripcion,
                precio: platillo.precio,
                categoriaId: platillo.categoriaId,
                imagenId: platillo.imagenId
            }
        })
        const productosAnt = await prisma.productosEnPlatillos.findMany({
            where: {
                platilloId: Number(p.id)
            }
        })
        const productos = platillo.productos

        for (let pA = 0; pA < productosAnt.length; pA++) {
            for (let p = 0; p < productos.length; p++) {
                if (productos[p].productoId === productosAnt[pA].productoId)
                    break
                    if (p === productos.length - 1) {
                        await prisma.productosEnPlatillos.delete({
                            where: {
                                productoId_platilloId: {platilloId: productosAnt[pA].platilloId, productoId: productosAnt[pA].productoId}
                            }
                        })
                    }
            }
        }
        productos.forEach(async (producto) => {
            await prisma.productosEnPlatillos.upsert({
                where: {
                    productoId_platilloId: {productoId: producto.productoId, platilloId: Number(p.id)}
                },
                update: {
                    cantidad: producto.cantidad
                },
                create: {
                    productoId: producto.productoId,
                    platilloId: Number(p.id),
                    cantidad: producto.cantidad
                }
            })

        })
        return updatedPlatillo
    } catch (err) {
        console.log(err)
        return 'Error: No se pudo actualizar el registro'
    }
}
