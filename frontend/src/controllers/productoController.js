import API from "../utils/api"


export const getAllProductos = async () => {
    const res = await API.get('productos/listar')
    return res.data
}

export const createPropducto = async (productoNombre, cantidad, cantidadMax, fechaCaducidad) => {
    const res = await API.post('productos/crear', {
        productoNombre: productoNombre,
        cantidad: cantidad,
        cantidadMax: cantidadMax,
        fechaCaducidad: fechaCaducidad,
    })
    return res
}

export const updateProducto = async (productoId, productoNombre, cantidad, cantidadMax, fechaCaducidad) => {
    const res = await API.put('productos/actualizar', {
        id: productoId,
        productoNombre: productoNombre,
        cantidad: cantidad,
        cantidadMax: cantidadMax,
        fechaCaducidad: fechaCaducidad,
    })
    return res
}
export const deleteProducto = async (productoId) => {
    const res = await API.delete(`productos/eliminar/${productoId}`)
    return res
}
