import { Button, Group, Text, TextInput, Title, Flex, Select } from "@mantine/core"
import { AdjustmentsHorizontal, CirclePlus, Search } from "tabler-icons-react"
import Tabla from "../components/Tabla"
import { useEffect, useState } from "react"
import { deleteEmpleado, getAllEmpleados } from "../controllers/empleadoControllers"
import { useDisclosure } from "@mantine/hooks"
import ModalEmpleados from "../components/ModalEmpleados"

const Empleados = () => {
    const header = [
        "Nombre del empleado", "Número de teléfono", "Puesto", "Sueldo"
    ]
    const [content, setContent] = useState([])
    const [empleadosC, setEmpleadosC] = useState([])
    const [opened, handlers] = useDisclosure(false);
    const [row, setRow] = useState({puesto: ''})
    const [rowD, setRowD] = useState(0)
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
            emp['puesto'] = Object.values(emp['puesto'])
            emp['sueldo'] = emp['puesto'][1]
            emp['puesto'] = emp['puesto'][0]
        })
        let data = res.map((e) => Object.values(e))
        setEmpleadosC(res)
        console.log(data)
        data.forEach((emp) => {
            emp[1] = `${emp[1]} ${emp[2]} ${emp[3]}`
            emp.splice(2,2)
            emp.splice(0,1)
        });
        setContent(data)
    }
    useEffect(() => {
        getEmpleadosList()
    }, [opened, rowD])
    return (
        <div style={{
            width: '100%',
            padding: '3vw',
        }}>
            <Flex direction="column" w='85vw' justify='center' align='center' >
                <Title ta='left' order={1} mb={10}>Empleados</Title>
                <Title ta='left' order={4}>Total de empleados</Title>
                <Text ta='left'>30</Text>
                <Group mt={10} mb={15} align='flex-start' justify='flex-start'>
                    <TextInput  rightSection={<Search />} />
                    <Select rightSection={<AdjustmentsHorizontal />}  />
                    <Button leftSection={<CirclePlus />} color="brown.9" onClick={openCreateModal}>Agregar empleado</Button>
                </Group>
                <Tabla headers={header} content={content} row={setRowIndex} rowD={setRowDIndex} />
            </Flex>
            <ModalEmpleados opened={opened} close={handlers.close} update={row.puesto !== '' ? true : false} updateInfo={row}  />
        </div>
    )
}

export default Empleados
