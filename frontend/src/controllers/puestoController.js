import API from "../utils/api"

export const getAllPuestosList = async() => {
    const res = await API.get('puestos/listar')
    return res
}

export const createPuesto = async(nombre, pSueldo) => {
    const res = await API.post('puestos/crear', {
        nombre: nombre,
        sueldo: pSueldo
    })
    return res
}