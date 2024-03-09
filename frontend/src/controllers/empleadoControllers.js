import API from "../utils/api"


export const getAllEmpleados = async () => {
    const res = await API.get('empleados/listar')
    return res.data
}

export const createEmpleado = async (empleadoNombre, paterno, materno, telefono, puestoId) => {
    const res = await API.post('empleados/crear', {
        nombre: empleadoNombre,
        paterno: paterno,
        materno: materno,
        telefono: telefono,
        puestoId: puestoId,
    })
    return res
}
