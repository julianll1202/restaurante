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