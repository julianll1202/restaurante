import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllEmpleados = async (req, res) => {
    const empleados = await prisma.empleados.findMany({
        select: {
            empleadoNombre: true,
            paterno: true,
            materno: true,
            telefono: true,
            puesto: {
                select: {
                    puestoNombre: true,
                    sueldo: true
                }
            }
        }
    })
    return empleados
}

export const createEmpleado = async (req, res) => {
    const empInfo = req.body
    console.log(empInfo)
    try {
        const empNuevo = await prisma.empleados.create({
            data: {
                empleadoNombre: empInfo.nombre,
                paterno: empInfo.paterno,
                materno: empInfo.materno,
                telefono: empInfo.telefono,
                puestoId: empInfo.puestoId
            }
        })
        return empNuevo
    } catch (err) {
        console.log(err)
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteEmpleado = async (req, res) => {
    const empleado = req.body
    if (!empleado.id) {
        return 'Error: El id del empleado es necesario'
    }
    try {
        const deletedEmpleado = await prisma.empleados.delete({
            where: {
                empleadoId: empleado.id
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
                puestoId: empleado.puestoId
            }
        })
        return updatedEmpleado
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
