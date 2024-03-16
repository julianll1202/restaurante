import API from "../utils/api"

export const createImagen = async (imagen) => {
    const res = await API.post('/imagenes/crear', imagen, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return res
}

export const getCatImagenes = async () => {
    const res = await API.get('/imagenes/listar/cat')
    return res
}