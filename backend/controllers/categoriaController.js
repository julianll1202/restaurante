import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllCategorias = async (req, res) => {
    const categorias = await prisma.categorias.findMany({
        select: {
            categoriaId: true,
            categoriaNombre: true,
            descripcion: true,
            imagen: {
                select: {
                    imagenId: true,
                    url: true,
                }
            }
        }
    })
    return categorias
}

export const createCategoria = async (req, res) => {
    const categoriaInfo = req.body
    try {
        const categoriaNueva = await prisma.categorias.create({
            data: {
                categoriaNombre: categoriaInfo.nombre,
                descripcion: categoriaInfo.descripcion,
                imagenId: categoriaInfo.imagenId
            }
        })
        return categoriaNueva
    } catch (err) {
        console.log(err)
        return 'Error: No se pudo crear el registro'
    }
}

export const deleteCategoria = async (req, res) => {
    const categoria = req.body
    if (!categoria.id) {
        return 'Error: El id de la categoria es necesario'
    }
    try {
        const deletedCategoria = await prisma.categorias.delete({
            where: {
                categoriaId: categoria.id
            }
        })
        return deletedCategoria
    } catch (err) {
        return 'Error: No se pudo eliminar el registro'
    }
}

export const updateCategoria = async (req, res) => {
    const categoria = req.body
    if (!categoria.id) {
        return 'Error: El id de la categoria es necesario'
    }
    try {
        const updatedCategoria = await prisma.categorias.update({
            where: {
                categoriaId: categoria.id
            },
            data: {
                categoriaNombre: categoria.nombre,
                descripcion: categoria.descripcion
            }
        })
        return updatedCategoria
    } catch (err) {
        return 'Error: No se pudo actualizar el registro'
    }
}
