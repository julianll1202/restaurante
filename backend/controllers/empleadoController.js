import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllEmpleados = async (req, res) => {
    const empleados = await prisma.empleados.findMany({
        select: {
            empleadoId: true,
            empleadoNombre: true,
            paterno: true,
            materno: true,
            telefono: true,
            puesto: {
                select: {
                    puestoNombre: true,
                    sueldo: true
                }
            },
            imagen: {
                select: {
                    imagenId: true,
                    url: true
                }
            }
        }
    })
    return empleados
}

export const createEmpleado = async (req, res) => {
    const empInfo = req.body
    try {
        const empNuevo = await prisma.empleados.create({
            data: {
                empleadoNombre: empInfo.nombre,
                paterno: empInfo.paterno,
                materno: empInfo.materno,
                telefono: empInfo.telefono,
                puestoId: empInfo.puestoId,
                imagenId: empInfo.imagenId
            }
        })
        return empNuevo
    } catch (err) {
        console.error(err)
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteEmpleado = async (req, res) => {
    const empleado = req.params
    if (!empleado) {
        return 'Error: El id del empleado es necesario'
    }
    try {
        const deletedEmpleado = await prisma.empleados.delete({
            where: {
                empleadoId: Number(req.params.empleadoId)
            }
        })
        return deletedEmpleado
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateEmpleado = async (req, res) => {
    const empleado = req.body
    if (!empleado.id) {
        return 'Error: El id del empleado es necesario'
    }
    try {
        const updatedEmpleado = await prisma.empleados.update({
            where: {
                empleadoId: empleado.id
            },
            data: {
                empleadoNombre: empleado.nombre,
                paterno: empleado.paterno,
                materno: empleado.materno,
                telefono: empleado.telefono,
                puestoId: empleado.puestoId,
                imagenId: empleado.imagenId
            }
        })
        return updatedEmpleado
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}

export const getMeseros = async () => {
    try {
        const meseros = await prisma.empleados.findMany({
            where: {
                puesto: {
                    puestoNombre: {
                        contains: 'mesero'
                    }
                }
            }
        })
        return meseros
    } catch (err) {
        console.log(err)
        return 'Error: No se pudieron encontrar los registros'
    }
}
