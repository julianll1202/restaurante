import API from "../utils/api"


export const getAllMesas = async () => {
    const res = await API.get('mesas/listar')
    return res.data
}

export const getMesasLibres = async () => {
    const res = await API.get('mesas/libres')
    return res.data
}