import API from "../utils/api"


export const getAllPlatillos = async () => {
    const res = await API.get('platillos/listar')
    return res.data
}

export const getPlatillosCategoria = async (categoriaId) => {
    if (categoriaId == null || categoriaId == undefined) {
        return []
    }
    const res = await API.get('platillos/buscarCategoria', {
        params: {
            categoriaId: categoriaId
        }
    })
    return res.data
}