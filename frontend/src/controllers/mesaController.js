import API from "../utils/api"


export const getAllMesas = async () => {
    const res = await API.get('mesas/listar')
    return res.data
}