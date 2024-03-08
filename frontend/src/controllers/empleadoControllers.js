import API from "../utils/api"


export const getAllEmpleados = async () => {
    const res = await API.get('empleados/listar')
    return res.data
}
