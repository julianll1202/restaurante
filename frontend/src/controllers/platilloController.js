import API from "../utils/api"


export const getAllPlatillos = async () => {
    const res = await API.get('platillos/listar')
    return res.data
}