import API from "../utils/api"


export const getAllCategorias = async () => {
    const res = await API.get('categorias/listar')
    return res.data
}