import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllRoles = async (req, res) => {
    const roles = await prisma.roles.findMany({
        select: {
            roleId: true,
            permits: {
                select: {
                    permit: {
                        select: {
                            action: true,
                            area: true
                        }
                    }
                }
            }
        }
    })
    return roles
}

export const getRol = async(id) => {
    const rol = await prisma.roles.findFirst({
        where: {
            roleId: id,
        },
        select: {
            roleId: true,
            permits: {
                select: {
                    permit: {
                        select: {
                            action: true,
                            area: true
                        }
                    }
                }
            }
        }
    })
    return rol
}

export const createRol = async (req, res) => {
    const rolInfo = req.body
    try {
        const rolNuevo = await prisma.roles.create({
            data: {
                roleName: rolInfo.roleName
            }
        })
        return rolNuevo
    } catch (err) {
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteRol = async (req, res) => {
    const rol = req.body
    if (!rol.id) {
        return 'Error: El id del rol es necesario'
    }
    try {
        const deletedRol = await prisma.roles.delete({
            where: {
                roleId: rol.id
            }
        })
        return deletedRol
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateRol = async (req, res) => {
    const rol = req.body
    if (!rol.id) {
        return 'Error: El id del rol es necesario'
    }
    try {
        const updatedRol = await prisma.roles.update({
            where: {
                roleId: rol.id
            },
            data: {
                roleName: rol.roleName
            }
        })
        return updatedRol
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
