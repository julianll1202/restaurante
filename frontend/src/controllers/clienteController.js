import API from "../utils/api"

export const getAllClientes = async () => {
    const res = await API.get('clientes/listar')
    return res.data
}