import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllImagenes = async (req, res) => {
    const images = await prisma.imagenes.findMany()
    return images
}

export const getCategoriaImagenes = async (req, res) => {
    const images = await prisma.imagenes.findMany({
        where: {
            imagenId: {
                lte: 20
            }
        }
    })
    return images
}
export const createImagen = async (req, res) => {
    const imgData = req.file
    try {
        const img = await prisma.imagenes.create({
            data: {
                tipo: imgData.mimetype,
                url: imgData.filename
            }
        })
        return img
    } catch (err) {
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteImagen = async (req, res) => {
    const img = req.params
    if (!img.id) {
        return 'Error: El id de la imagen es necesaria'
    }
    try {
        const deletedImagen = await prisma.imagenes.delete({
            where: {
                imagenId: img.id
            }
        })
        return deletedImagen
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateImagen = async (req, res) => {
    const img = req.body
    if (!img.id) {
        return 'Error: El id de la imagen es necesaria'
    }
    try {
        const updatedImagen = await prisma.imagenes.update({
            where: {
                imagenId: img.id
            },
            data: {
                tipo: img.tipo,
                url: img.url
            }
        })
        return updatedImagen
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
