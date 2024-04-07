import API from "../utils/api"


export const getAllMesas = async () => {
    const res = await API.get('mesas/listar')
    return res.data
}

export const getMesasLibres = async () => {
    const res = await API.get('mesas/libres')
    return res.data
}

export const createMesa = async (capacidad, ubicacion, tipoMesa) => {
    const res = await API.post('mesas/crear', {
        capacidad: capacidad,
        ubicacion: ubicacion,
        tipoMesa: tipoMesa
    })
    return res
}

export const updateMesa = async (mesaId, capacidad, ubicacion, tipoMesa, ocupada) => {
    const res = await API.put('mesas/actualizar', {
        mesaId: mesaId,
        capacidad: capacidad,
        ubicacion: ubicacion,
        tipoMesa: tipoMesa,
        ocupada: ocupada
    })
    return res
}
export const deleteMesa = async (mesaId) => {
    const res = await API.delete(`mesas/eliminar/${mesaId}`)
    return res
}