import { Estatus, PrismaClient } from '@prisma/client'
import { isMesaOcupada } from './mesaController'

const prisma = new PrismaClient()

export const getAllComandas = async (req, res) => {
    const comandas = await prisma.comandas.findMany({
        select: {
            comandaId: true,
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
                            precio: true,
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

export const getComandaById = async (id) => {
    const comanda = await prisma.comandas.findMany({
        where: {
            comandaId: Number(id),
        },
        select: {
            comandaId: true,
            empleadoId: true,
            mesaId: true,
            fechaCreacion: true,
            precioFinal: true,
            completada: true,
            platillosEnComanda: {
                select: {
                    cantidad: true,
                    comandaId: true,
                    platillo: {
                        select: {
                            platilloNombre: true,
                            platilloId: true,
                            precio: true,
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
    return comanda
}
export const createComanda = async (req, res) => {
    const comandaInfo = req.body
    try {
        if (!(await isMesaOcupada(comandaInfo.mesaId))) {
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
            platillos.forEach(async(p) => {
                p.comandaId = comandaNueva.comandaId
                const productos = await prisma.productosEnPlatillos.findMany({
                    where: {
                        platilloId: p.platilloId
                    }
                })
                productos.forEach(async(prod) => {
                    await prisma.productos.update({
                        where: {
                            productoId: prod.productoId
                        },
                        data: {
                            cantidad: {
                                decrement: p.cantidad*prod.cantidad
                            }
                        }
                    })
                })
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
                precioFinal: comanda.precioFinal,
            }
        })
        const platillosAnt = await prisma.platillosEnComandas.findMany({
            where: {
                comandaId: comanda.id
            }
        })
        const platillos = comanda.platillos
        for (let p = 0; p < platillos.length; p++) {
            for (let pA = 0; pA < platillosAnt.length; pA++) {
                if (platillos[p].platilloId === platillosAnt[pA].platilloId) {
                    let diferencia = platillos[p].cantidad - platillosAnt[pA].cantidad
                    if (diferencia > 0) {
                        await prisma.platillosEnComandas.update({
                            where: {
                                platilloId_comandaId: {platilloId: platillos[p].platilloId , comandaId: comanda.id}
                            },
                            data: {
                                cantidad: platillos[p].cantidad
                            }
                        })
                        const productos = await prisma.productosEnPlatillos.findMany({
                            where: {
                                platilloId: platillos[p].platilloId
                            }
                        })
                        productos.forEach(async (p) => {
                            await prisma.productos.update({
                                where: {
                                    productoId: p.productoId
                                },
                                data: {
                                    cantidad: {
                                        decrement: diferencia*p.cantidad
                                    }
                                }
                            })
                        })
                        break
                    } else if (diferencia < 0) {
                        await prisma.platillosEnComandas.update({
                            where: {
                                platilloId_comandaId: {platilloId: platillos[p].platilloId , comandaId: comanda.id}
                            },
                            data: {
                                cantidad: platillos[p].cantidad
                            }
                        })
                        const productos = await prisma.productosEnPlatillos.findMany({
                            where: {
                                platilloId: platillos[p].platilloId
                            }
                        })
                        productos.forEach(async (p) => {
                            await prisma.productos.update({
                                where: {
                                    productoId: p.productoId
                                },
                                data: {
                                    cantidad: {
                                        increment: Math.abs(diferencia*p.cantidad)
                                    }
                                }
                            })
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
        for (let plA = 0; plA < platillosAnt.length; plA++) {
            for (let pl = 0; pl < platillos.length; pl++) {
                if (platillos[pl].platilloId === platillosAnt[plA].platilloId)
                    break
                    if (pl === platillos.length - 1) {
                        await prisma.platillosEnComandas.delete({
                            where: {
                                platilloId_comandaId: {comandaId: platillosAnt[plA].comandaId, platilloId: platillosAnt[plA].platilloId}
                            }
                        })
                        const productos = await prisma.productosEnPlatillos.findMany({
                            where: {
                                platilloId: platillosAnt[plA].platilloId
                            }
                        })
                        productos.forEach(async (p) => {
                            await prisma.productos.update({
                                where: {
                                    productoId: p.productoId
                                },
                                data: {
                                    cantidad: {
                                        increment: p.cantidad*platillosAnt[plA].cantidad
                                    }
                                }
                            })
                        })
                    }
            }
        }
        return updatedComanda
    } catch (err) {
        console.error(err)
        return 'Error: No se pudo actualizar el registro'
    }
}

export const cancelComanda = async (id) => {
    try {
        const comanda = await prisma.comandas.update({
            where: {
                comandaId: Number(id)
            },
            data: {
                completada: Estatus.CANCELADA
            }
        })

        const platillos = await prisma.platillosEnComandas.findMany({
            where: {
                comandaId: Number(id)
            }
        })
        platillos.forEach(async(p) => {
            const productos = await prisma.productosEnPlatillos.findMany({
                where: {
                    platilloId: p.platilloId
                }
            })
            productos.forEach(async(prod) => {
                await prisma.productos.update({
                    where: {
                        productoId: prod.productoId
                    },
                    data: {
                        cantidad: {
                            increment: p.cantidad*prod.cantidad
                        }
                    }
                })
            })
        })
        await prisma.mesas.update({
            where: {
                mesaId: comanda.mesaId
            },
            data: {
                ocupada: false
            }
        })
        return comanda
    } catch (err) {
        console.error(err)
        return 'Error: No se pudo cancelar la comanda'
    }
}

export const cambiarEstatusComanda = async (id, estatus) => {
    try {
        let comanda
        switch (estatus) {
            case 1:
                comanda = await prisma.comandas.update({
                    where: {
                        comandaId: id
                    },
                    data: {
                        completada: Estatus.PENDIENTE
                    }
                })
                break;
            case 2:
                comanda = await prisma.comandas.update({
                    where: {
                        comandaId: id
                    },
                    data: {
                        completada: Estatus.INICIADA
                    }
                })
                break;
            case 3:
                comanda = await prisma.comandas.update({
                    where: {
                        comandaId: id
                    },
                    data: {
                        completada: Estatus.ENTREGADA
                    }
                })
                break;
            case 4:
            comanda = await prisma.comandas.update({
                where: {
                    comandaId: id
                },
                data: {
                    completada: Estatus.PAGADA
                }
            })
            await prisma.mesas.update({
                where: {
                    mesaId: comanda.mesaId
                },
                data: {
                    ocupada: false
                }
            })
            break;
            default:
                comanda = await prisma.comandas.update({
                    where: {
                        comandaId: id
                    },
                    data: {
                        completada: Estatus.PENDIENTE
                    }
                })
                break;
        }
        return comanda
    } catch (err) {
        console.error(err)

        return 'Error: No se actualizar la comanda'
    }
}
