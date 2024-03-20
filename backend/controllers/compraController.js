import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllCompras = async (req, res) => {
    const compras = await prisma.compras.findMany()
    return compras
}

export const getCompraPorId = async (req, res, compraId) => {
    const compra = await prisma.$queryRaw`SELECT c.compraId, c.total, pc.productoId, pc.cantidad, pc.precioTotal, p.productoNombre AS 'nombreProducto' FROM Compras c INNER JOIN ProductosEnCompras pc ON c.compraId = pc.compraId INNER JOIN Productos p ON pc.productoId = p.productoId WHERE c.compraId = ${compraId};`
    return compra
}

export const getCompraById = async(id) => {
    const compra = await prisma.compras.findUnique({
        where: {
            compraId: Number(id),
        },
        select: {
            compraId: true,
            total: true,
            productosEnCompra: {
                select: {
                    precioTotal: true,
                    cantidad: true,
                    producto: {
                        select: {
                            productoNombre: true,
                            productoId: true,
                        }
                    }
                }
            }
        }
    })
    return compra
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
        deletedCompra.forEach(async(c) => {
            await prisma.productos.update({
                where: {
                    productoId: c.productoId
                },
                data: {
                    cantidad: {
                        decrement: c.cantidad
                    }
                }
            })
        })
        return deletedCompra
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateCompra = async (req, res) => {
    const compraInfo = req.body
    if (!compraInfo.compraId) {
        return 'Error: El id de la compra es necesario'
    }
        try {
            const updatedCompra = await prisma.compras.update({
                where: {
                    compraId: Number(compraInfo.compraId)
                },
                data: {
                    fechaCompra: compraInfo.fechaCompra,
                    total: Number(compraInfo.total)
                }
            })
            const productosEnCompra = await prisma.productosEnCompras.findMany({
                where: {
                    compraId: Number(compraInfo.compraId)
                }
            })
            const productos = compraInfo.productos
            for (let p = 0; p < productos.length; p++) {
                for (let pA = 0; pA < productosEnCompra.length; pA++) {
                    if (productos[p].productoId === productosEnCompra[pA].productoId) {
                        let diferencia = productos[p].cantidad - productosEnCompra[pA].cantidad
                        if (diferencia > 0) {
                            await prisma.productosEnCompras.update({
                                where: {
                                    compraId_productoId: {compraId: productos[p].compraId, productoId: productos[p].productoId}
                                },
                                data: {
                                    cantidad: productos[p].cantidad
                                }
                            })
                            await prisma.productos.update({
                                where: {
                                    productoId: productos[p].productoId
                                },
                                data: {
                                    cantidad: {
                                        increment: diferencia
                                    }
                                }
                            })
                            break
                        } else if (diferencia < 0) {
                            await prisma.productosEnCompras.update({
                                where: {
                                    compraId_productoId: {compraId: productos[p].compraId, productoId: productos[p].productoId}
                                },
                                data: {
                                    cantidad: productos[p].cantidad
                                }
                            })
                            await prisma.productos.update({
                                where: {
                                    productoId: productos[p].productoId
                                },
                                data: {
                                    cantidad: {
                                        decrement: Math.abs(diferencia)
                                    }
                                }
                            })
                            break
                        } else {
                            break
                        }
                    }
                    if (pA === productosEnCompra.length - 1) {
                        await prisma.productosEnCompras.create({
                            data: {
                                precioTotal: productos[p].precioTotal,
                                compraId: productos[p].compraId,
                                productoId: productos[p].productoId,
                                cantidad: productos[p].cantidad
                            }
                        })

                        await prisma.productos.update({
                            where: {
                                productoId: productos[p].productoId
                            },
                            data: {
                                cantidad: {
                                    increment: productos[p].cantidad
                                }
                            }
                        })
                    }
                }

            }
            for (let pA = 0; pA < productosEnCompra.length; pA++) {
                for (let p = 0; p < productos.length; p++) {
                    if (productos[p].productoId === productosEnCompra[pA].productoId)
                        break
                        if (p === productos.length - 1) {
                            await prisma.productosEnCompras.delete({
                                where: {
                                    compraId_productoId: {compraId: productosEnCompra[pA].compraId, productoId: productosEnCompra[pA].productoId}
                                }
                            })

                            await prisma.productos.update({
                                where: {
                                    productoId: productosEnCompra[pA].productoId
                                },
                                data: {
                                    cantidad: {
                                        decrement: productosEnCompra[pA].cantidad
                                    }
                                }
                            })
                        }
                }
            }
            // if(productos.length === 0) {
            //     productosEnCompra.forEach(async (prod) => {
            //         const updateProd = await prisma.productos.update({
            //             where: {
            //                 productoId: Number(prod.productoId)
            //             },
            //             data: {
            //                 cantidad: {
            //                     decrement: Number(prod.cantidad)
            //                 }
            //             }
            //         })
            //         const deleteProd = await prisma.productosEnCompras.delete({
            //             where: {
            //                 compraId_productoId: {
            //                     compraId: Number(compraInfo.compraId),
            //                     productoId: Number(prod.productoId)
            //                 }
            //             }
            //         })
            //     })
            // } else {
            //     productosEnCompra.forEach(async (prod) => {
            //         productos.forEach(async (prod2) => {
            //             if (prod.productoId === prod2.productoId) {
            //                 prod2.eliminado = false
            //             } else {
            //                 prod2.eliminado = true
            //             }
            //         })
            //     })
            //     productos.forEach(async (prod) => {
            //         if(prod.eliminado) {
            //             const updateProd = await prisma.productos.update({
            //                 where: {
            //                     productoId: Number(prod.productoId)
            //                 },
            //                 data: {
            //                     cantidad: {
            //                         decrement: Number(prod.cantidad)
            //                     }
            //                 }
            //             })
            //             const deleteProd = await prisma.productosEnCompras.delete({
            //                 where: {
            //                     compraId_productoId: {
            //                         compraId: Number(compraInfo.compraId),
            //                         productoId: Number(prod.productoId)
            //                     }
            //                 }
            //             })
            //         } else {
            //             /*
            //             const updateProd = await prisma.productos.update({
            //                 where: {
            //                     productoId: Number(prod.productoId)
            //                 },
            //                 data: {
            //                     cantidad: Number(prod.cantidad)
            //                 }
            //             })*/
            //             const updateMM = await prisma.productosEnCompras.upsert({
            //                 where: {
            //                     compraId_productoId: {
            //                         compraId: Number(compraInfo.compraId),
            //                         productoId: Number(prod.productoId)
            //                     }
            //                 },
            //                 update: {
            //                     cantidad: Number(prod.cantidad),
            //                     precioTotal: Number(prod.precioTotal)
            //                 },
            //                 create: {
            //                     compraId: Number(compraInfo.compraId),
            //                     productoId: Number(prod.productoId),
            //                     cantidad: Number(prod.cantidad),
            //                     precioTotal: Number(prod.precioTotal)
            //                 }
            //             })
            //         }
            //     })
            // }
            return updatedCompra
    } catch (err) {
        console.error(err)
        return 'Error: No se pudo eliminar el registro'
    }
}
