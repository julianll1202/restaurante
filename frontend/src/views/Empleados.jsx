import { Button, Group, Text, TextInput, Title, Flex, Select } from "@mantine/core"
import { AdjustmentsHorizontal, CirclePlus, Search } from "tabler-icons-react"
import Tabla from "../components/Tabla"

const Empleados = () => {
    const header = [
        "Nombre del empleado", "Puesto", "Número de teléfono", "Sueldo"
    ]
    const content = [
        ["John Doe", "Mesero", "999-999-999", "$1,800"],
        ["John Doe", "Mesero", "999-999-999", "$1,800"],
        ["John Doe", "Mesero", "999-999-999", "$1,800"],
        ["John Doe", "Mesero", "999-999-999", "$1,800"],
    ]
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
