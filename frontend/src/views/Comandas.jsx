import { Button, Group, TextInput, Title, Select, Container } from "@mantine/core"
import { useEffect } from "react"
import { useLocation } from "react-router-dom";
import { AdjustmentsHorizontal, CirclePlus, Search } from "tabler-icons-react";
import Comanda from "../components/Comanda";
import { getAllComandas } from "../controllers/comandaController";


const Comandas = () => {
    const location = useLocation();
    let mesaId;
    try {
        mesaId = location.state.mesaId;
    }catch(e) {
    }

    const getComandasList = async () => {
        const res = await getAllComandas()
        console.log(res)
    }
    useEffect(() => {
        getComandasList()
    }, [])
    return (
        <div style={{
            width: '100%',
            padding: '3vw',
        }}>
            <Container direction="column" size='xl' w='90vw' justify='center' align='center' >
                <Title ta='left' order={1} mb={10}>Comandas</Title>
                { mesaId ? <Title ta='left' order={4}>{mesaId}</Title> : null}
                <Group mt={10} mb={15} align='flex-start' justify='flex-start'>
                    <Button leftSection={<CirclePlus />} color="brown.9" >Crear comanda</Button>
                    <TextInput  rightSection={<Search />} />
                    <Select rightSection={<AdjustmentsHorizontal />} data={[
                        {value: 'NOMBRE', label: 'Ordenar por nombre'},
                        {value: 'PUESTO', label: 'Ordenar por puesto'},
                        {value: 'SUELDO', label: 'Ordenar por sueldo'},
                        ]}  />
                </Group>
                <Comanda />
            </Container>
        </div>
    )
}

export default Comandas
