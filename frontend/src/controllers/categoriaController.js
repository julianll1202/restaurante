import API from "../utils/api"


export const getAllCategorias = async (dataM) => {
    if(dataM){
        const res = await API.get('categorias/listar')
        return res.data
    }
    const res = await API.get('categorias/listar')
    return res
}

export const createCategoria = async(categoriaNombre, descripcion, imagenId) => {
    const res = await API.post('categorias/crear', {
        nombre: categoriaNombre,
        descripcion: descripcion,
        imagenId: imagenId
    })
    return res
}
