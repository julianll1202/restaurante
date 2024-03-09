import { Button, Group, Text, TextInput, Title, Flex, Select } from "@mantine/core"
import { AdjustmentsHorizontal, CirclePlus, Search } from "tabler-icons-react"
import Tabla from "../components/Tabla"
import { useEffect, useState } from "react"
import { getAllEmpleados } from "../controllers/empleadoControllers"
import { useDisclosure } from "@mantine/hooks"
import ModalEmpleados from "../components/ModalEmpleados"

const Empleados = () => {
    const header = [
        "Nombre del empleado", "Número de teléfono", "Puesto", "Sueldo"
    ]
    const [content, setContent] = useState([])
    const [opened, handlers] = useDisclosure(false);
    const getEmpleadosList = async () => {
        const res = await getAllEmpleados()
        res.forEach((emp) => {
            emp['puesto'] = Object.values(emp['puesto'])
            emp['sueldo'] = emp['puesto'][1]
            emp['puesto'] = emp['puesto'][0]
        })
        let data = res.map((e) => Object.values(e))
        console.log(data)
        data.forEach((emp) => {
            emp[0] = `${emp[0]} ${emp[1]} ${emp[2]}`
            emp.splice(1,2)
        });
        setContent(data)
    }
    useEffect(() => {
        getEmpleadosList()
    }, [opened])
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
                    <Button leftSection={<CirclePlus />} color="brown.9" onClick={handlers.open}>Agregar empleado</Button>
                </Group>
                <Tabla headers={header} content={content} />
            </Flex>
            <ModalEmpleados opened={opened} close={handlers.close} />
        </div>
    )
}

export default Empleados
