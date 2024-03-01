import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllClientes = async (req, res) => {
    const clientes = await prisma.clientes.findMany()
    return clientes
}

export const createCliente = async (req, res) => {
    const clienteInfo = req.body
    try {
        const clienteNuevo = await prisma.clientes.create({
            data: {
                clienteNombre: clienteInfo.clienteNombre,
                paterno: clienteInfo.paterno,
                materno: clienteInfo.materno,
                telefono: clienteInfo.telefono
            }
        })
        return clienteNuevo
    } catch (err) {
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteCliente = async (req, res) => {
    const cliente = req.body
    if (!cliente.id) {
        return 'Error: El id del cliente es necesario'
    }
    try {
        const deletedCliente = await prisma.clientes.delete({
            where: {
                clienteId: cliente.id
            }
        })
        return deletedCliente
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateCliente = async (req, res) => {
    const cliente = req.body
    if (!cliente.id) {
        return 'Error: El id del cliente es necesario'
    }
    try {
        const updatedCliente = await prisma.clientes.update({
            where: {
                clienteId: cliente.id
            },
            data: {
                clienteNombre: cliente.clienteNombre,
                paterno: cliente.paterno,
                materno: cliente.materno,
                telefono: cliente.telefono
            }
        })
        return updatedCliente
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
