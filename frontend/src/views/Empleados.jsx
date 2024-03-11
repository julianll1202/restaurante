import { Button, Group, Text, TextInput, Title, Flex, Select, Container } from "@mantine/core"
import { AdjustmentsHorizontal, CirclePlus, Search } from "tabler-icons-react"
import Tabla from "../components/Tabla"
import { useEffect, useState } from "react"
import { deleteEmpleado, getAllEmpleados } from "../controllers/empleadoControllers"
import { useDisclosure } from "@mantine/hooks"
import ModalEmpleados from "../components/ModalEmpleados"

const Empleados = () => {
    const header = [
        "", "Nombre del empleado", "Número de teléfono", "Puesto", "Sueldo"
    ] // Encabezado de la tabla
    const [content, setContent] = useState([]) // Contenido de la tabla
    const [empleadosC, setEmpleadosC] = useState([]) // Lista de empleados completa
    const [opened, handlers] = useDisclosure(false); // Manejo de estado del modal
    const [row, setRow] = useState({puesto: ''}) // Fila a editar
    const [rowD, setRowD] = useState(0) // Fila a eliminar

    const setRowIndex = (data) => {
        setRow(empleadosC[data])
        console.log(empleadosC[data])
        handlers.open()
    }

    const openCreateModal = () => {
        setRow({puesto: ''})
        handlers.open()
    }

    const setRowDIndex = (data) => {
        setRowD(empleadosC[data]['empleadoId'])
        deleteOneEmpleado(empleadosC[data]['empleadoId'])
    }

    const deleteOneEmpleado = async (id) => {
        console.log(id)
        const deleteRes = await deleteEmpleado(id)
        console.log(deleteRes)
    }

    const getEmpleadosList = async () => {
        const res = await getAllEmpleados()
        res.forEach((emp) => {
            emp['imagen'] = Object.values(emp['imagen'])
            emp['imagenId'] = emp['imagen'][0]
            emp['imagenUrl'] = emp['imagen'][1]
            emp['puesto'] = Object.values(emp['puesto'])
            emp['sueldo'] = emp['puesto'][1]
            emp['puesto'] = emp['puesto'][0]
        })
        let data = res.map((e) => Object.values(e))
        setEmpleadosC(res)
        console.log(data)
        data.forEach((emp) => {
            emp[1] = `${emp[1]} ${emp[2]} ${emp[3]}`
            emp.splice(2,2) // Elimina paterno y materno de la lista
            emp.splice(0,1) // Elimina id de empleado
            emp.splice(3,1) // Elimina objeto imagen
            emp.splice(0,0, emp[4]) // Mueve la imagen al inicio del arreglo
            emp.splice(4,2) // Elimina imagenId y el url de sus posiciones originales
        });
        setContent(data)
    }

    const ordenarTabla = (filtro) => {
        const contenido = [...content]
        switch (filtro) {
            case 'NOMBRE':
                contenido.sort((a, b) => {
                    if (a[1] > b[1]) {
                        return 1;
                      }
                      if (a[1] < b[1]) {
                        return -1;
                      }
                      // a es igual a b
                      return 0;
                })
                setContent(contenido)
                break;
            case 'SUELDO':
                contenido.sort((a, b) => {
                    if (a[4] > b[4]) {
                        return 1;
                        }
                        if (a[4] < b[4]) {
                        return -1;
                        }
                        // a es igual a b
                        return 0;
                })
                setContent(contenido)
                break;
            case 'PUESTO':
                contenido.sort((a, b) => {
                    if (a[3] > b[3]) {
                        return 1;
                        }
                        if (a[3] < b[3]) {
                        return -1;
                        }
                        // a es igual a b
                        return 0;
                })
                setContent(contenido)
                break;
        }
    }

    useEffect(() => {
        getEmpleadosList()
    }, [opened, rowD])
    return (
        <div style={{
            width: '100%',
            padding: '3vw',
        }}>
            <Container direction="column" size='xl' w='90vw' justify='center' align='center' >
                <Title ta='left' order={1} mb={10}>Empleados</Title>
                <Title ta='left' order={4}>Total de empleados</Title>
                <Text ta='left'>30</Text>
                <Group mt={10} mb={15} align='flex-start' justify='flex-start'>
                    <TextInput  rightSection={<Search />} />
                    <Select rightSection={<AdjustmentsHorizontal />} data={[
                        {value: 'NOMBRE', label: 'Ordenar por nombre'},
                        {value: 'PUESTO', label: 'Ordenar por puesto'},
                        {value: 'SUELDO', label: 'Ordenar por sueldo'},
                        ]} onChange={(_value, option) => ordenarTabla(_value)} />
                    <Button leftSection={<CirclePlus />} color="brown.9" onClick={openCreateModal}>Agregar empleado</Button>
                </Group>
                <Tabla headers={header} content={content} row={setRowIndex} rowD={setRowDIndex} />
            </Container>
            <ModalEmpleados opened={opened} close={handlers.close} update={row.puesto !== '' ? true : false} updateInfo={row}  />
        </div>
    )
}

export default Empleados
