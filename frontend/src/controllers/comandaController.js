import API from "../utils/api"


export const getAllComandas = async() => {
    const res = await API.get('comandas/listar')
    return res
}