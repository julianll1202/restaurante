import API from "../utils/api"


export const getAllCompras = async() => {
    const res = await API.get('compras/listar')
    return res
}

export const getCompraPorId = async (compraId) => {
    const res = await API.get(`compras/obtener/${compraId}`)
    return res.data
}

export const comprasConProductos = async() => {
    const res = await API.get('compras/comprasConProductos')
    return res.data
}

export const createCompra = async(fechaCompra, total, productos) => {
    const res = await API.post('compras/crear', {
        fechaCompra: fechaCompra,
        total: total,
        productos: productos
    })
    return res
}

export const deleteCompra = async (compraId) => {
    const res = await API.delete(`compras/eliminar/${compraId}`)
    return res
}

export const updateCompra = async(compraId, fechaCompra, total, productos) => {
    console.log(compraId, fechaCompra, total, productos)
    const res = await API.put('compras/actualizar', {
        compraId: compraId,
        fechaCompra: fechaCompra,
        total: total,
        productos: productos
    })
    return res
}
