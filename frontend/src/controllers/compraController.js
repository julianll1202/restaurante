import API from "../utils/api"


export const getAllCompras = async() => {
    const res = await API.get('compras/listar')
    return res
}

export const comprasConProductos = async() => {
    const res = await API.get('compras/comprasConProductos')
    return res.data
}