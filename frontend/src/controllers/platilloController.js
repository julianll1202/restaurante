import API from "../utils/api"


export const getAllPlatillos = async () => {
    const res = await API.get('platillos/listar')
    return res.data
}

export const getPlatillosCategoria = async (categoriaId) => {
    if (categoriaId == null || categoriaId == undefined) {
        return []
    }
    const res = await API.get('platillos/buscarCategoria', {
        params: {
            categoriaId: categoriaId
        }
    })
    return res.data
}

export const createPlatillo = async (platilloNombre, descripcion, precio, categoriaId, imagenId, productos) => {
    const res = await API.post('platillos/crear', {
        nombre: platilloNombre,
        descripcion: descripcion,
        precio: precio,
        categoriaId: categoriaId,
        imagenId: imagenId,
        productos: productos
    })
    return res
}

export const updatePlatillo = async (platilloId, platilloNombre, descripcion, precio, categoriaId, imagenId, productos) => {
    const res = await API.put(`platillos/actualizar/${platilloId}`, {
        nombre: platilloNombre,
        descripcion: descripcion,
        precio: precio,
        categoriaId: categoriaId,
        imagenId: imagenId,
        productos: productos
    })
    return res
}

export const deletePlatillo = async (platilloId) => {
    const res = await API.delete(`platillos/eliminar/${platilloId}`)
    return res
}

