import API from "../utils/api"


export const getAllEmpleados = async () => {
    const res = await API.get('empleados/listar')
    return res.data
}

export const createEmpleado = async (empleadoNombre, paterno, materno, telefono, puestoId, imagenId) => {
    const res = await API.post('empleados/crear', {
        nombre: empleadoNombre,
        paterno: paterno,
        materno: materno,
        telefono: telefono,
        puestoId: puestoId,
        imagenId: imagenId
    })
    return res
}

export const updateEmpleado = async (empleadoId, empleadoNombre, paterno, materno, telefono, puestoId) => {
    const res = await API.put('empleados/actualizar', {
        id: empleadoId,
        nombre: empleadoNombre,
        paterno: paterno,
        materno: materno,
        telefono: telefono,
        puestoId: puestoId,
    })
    return res
}
export const deleteEmpleado = async (empleadoId) => {
    console.log(empleadoId)
    const res = await API.delete(`empleados/eliminar/${empleadoId}`)
    return res
}
