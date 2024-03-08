import { Button, Group, Text, TextInput, Title, Flex, Select } from "@mantine/core"
import { AdjustmentsHorizontal, CirclePlus, Search } from "tabler-icons-react"
import Tabla from "../components/Tabla"
import { useEffect, useState } from "react"
import { getAllEmpleados } from "../controllers/empleadoControllers"

const Empleados = () => {
    const header = [
        "Nombre del empleado", "Número de teléfono", "Puesto", "Sueldo"
    ]
    const [content, setContent] = useState([])
    // const content = [
    //     ["John Doe", "Mesero", "999-999-999", "$1,800"],
    //     ["John Doe", "Mesero", "999-999-999", "$1,800"],
    //     ["John Doe", "Mesero", "999-999-999", "$1,800"],
    //     ["John Doe", "Mesero", "999-999-999", "$1,800"],
    // ]

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
    }, [])
    return (
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Flex direction="column" w='85vw'>
                <Title order={2}>Empleados</Title>
                <Title order={3}>Total de empleados</Title>
                <Text>30</Text>
                <Group mb={15}>
                    <TextInput  rightSection={<Search />} />
                    <Select rightSection={<AdjustmentsHorizontal />}  />
                    <Button leftSection={<CirclePlus />} color="brown.9">Agregar empleado</Button>
                </Group>
                <Tabla headers={header} content={content} />
            </Flex>
        </div>
    )
}

export default Empleados
