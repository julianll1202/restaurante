import API from "../utils/api"


export const getAllComandas = async() => {
    const res = await API.get('comandas/listar')
    return res
}

export const createComanda = async(empleadoId, mesaId, precioFinal, platillos) => {
    const res = await API.post('comandas/crear', {
        clienteId: 1,
        empleadoId: empleadoId,
        mesaId: mesaId,
        precioFinal: precioFinal,
        platillos: platillos
    })
    return res
}

export const cancelarComanda = async(comandaId) => {
    const res = await API.put(`comandas/cancelar/${comandaId}`)
    return res
}

export const cambiarEstatus = async(comandaId, estatus) => {
    const res = await API.put(`comandas/cambiar/${comandaId}`, {
        estatus: estatus
    })
    return res
}

export const getComanda = async(comandaId) => {
    const res = await API.get(`comandas/ver/${comandaId}`)
    console.log(res)
    return res
}