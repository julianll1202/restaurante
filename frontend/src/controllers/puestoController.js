import API from "../utils/api"

export const getAllPuestosList = async() => {
    const res = await API.get('puestos/listar')
    return res
}