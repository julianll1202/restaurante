import API from "../utils/api"


export const getAllComandas = async() => {
    const res = await API.get('comandas/listar')
    return res
}

export const createComanda = async(empleadoId, clienteId, mesaId, precioFinal, platillos) => {
    const res = await API.post('comandas/crear', {
        clienteId: clienteId,
        empleadoId: empleadoId,
        mesaId: mesaId,
        precioFinal: precioFinal,
        platillos: platillos
    })
    return res
}

export const updateComanda = async(comandaId, empleadoId, clienteId, mesaId, precioFinal, platillos) => {
    const res = await API.put('comandas/actualizar', {
        id: comandaId,
        clienteId: clienteId,
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