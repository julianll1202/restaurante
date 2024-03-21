import { Button, Group, TextInput, Title, Select, Container, Grid, Tabs} from "@mantine/core"
import { useEffect, useState } from "react"
// import { useLocation } from "react-router-dom";
import { AdjustmentsHorizontal, CirclePlus, Search } from "tabler-icons-react";
import { getAllComandas } from "../controllers/comandaController";
import Comanda from "../components/Comanda";
import { useNavigate } from "react-router-dom";

const Comandas = () => {
    // const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('pendiente')
    const [comandas, setComandas] = useState([])
    // let mesaId;
    // try {
    //     mesaId = location.state.mesaId;
    // }catch(e) {
    // }

    const getComandasList = async () => {
        const res = await getAllComandas()
        const data = res.data
        // res.data.map((e) => Object.values(e))
        console.log(data)
        setComandas(res.data)
    }
    useEffect(() => {
        getComandasList()
        console.log(comandas.length)
    }, [activeTab])
    return (
        <div style={{
            width: '100%',
            padding: '3vw',
        }}>
            <Container direction="column" size='xl' w='90vw' justify='center' align='center' >
                <Title ta='left' order={1} mb={10}>Comandas</Title>
                {/* { mesaId ? <Title ta='left' order={4}>{mesaId}</Title> : null} */}
                <Group mt={10} mb={15} align='flex-start' justify='flex-start'>
                    <Button leftSection={<CirclePlus />} onClick={() => navigate('/comandas/crear-comanda')} color="brown.9" >Crear comanda</Button>
                    <TextInput  rightSection={<Search />} />
                    <Select rightSection={<AdjustmentsHorizontal />} data={[
                        {value: 'NOMBRE', label: 'Ordenar por nombre'},
                        {value: 'PUESTO', label: 'Ordenar por puesto'},
                        {value: 'SUELDO', label: 'Ordenar por sueldo'},
                        ]}  />
                </Group>
                <Tabs value={activeTab} onChange={setActiveTab}>
                    <Tabs.List mb={25}>
                        <Tabs.Tab value="pendiente" color="yellow">Pendientes</Tabs.Tab>
                        <Tabs.Tab value="iniciada" color="orange">Iniciadas</Tabs.Tab>
                        <Tabs.Tab value="entregada" color="blue">Entregadas</Tabs.Tab>
                        <Tabs.Tab value="pagada" color="green">Pagadas</Tabs.Tab>
                        <Tabs.Tab value="cancelada" color="red">Canceladas</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="pendiente">
                        <Grid>
                            { comandas.length > 0 ? comandas.map((comanda, index) => {
                                if (comanda.completada === activeTab.toUpperCase()){
                                    return (
                                        <Grid.Col span={3} key={index}>
                                            <Comanda comandaInfo={comanda} color='yellow' prev={0} next={2} />
                                        </Grid.Col>
                                        )
                                }
                                })
                                : null}
                        </Grid>
                    </Tabs.Panel>
                    <Tabs.Panel value="iniciada" >
                        <Grid>
                            { comandas.length > 0 ? comandas.map((comanda, index) => {
                                if (comanda.completada === activeTab.toUpperCase()){
                                    return (
                                        <Grid.Col span={4} key={index}>
                                            <Comanda comandaInfo={comanda} color='orange' prev={1} next={3} />
                                        </Grid.Col>
                                        )
                                    }
                                })
                                : null}
                        </Grid>
                    </Tabs.Panel>
                    <Tabs.Panel value="entregada" >
                        <Grid>
                            { comandas.length > 0 ? comandas.map((comanda, index) => {
                                if (comanda.completada === activeTab.toUpperCase()){
                                    return (
                                        <Grid.Col span={4} key={index}>
                                            <Comanda comandaInfo={comanda} color='blue' prev={2} next={4} />
                                        </Grid.Col>
                                        )
                                    }
                                })
                                : null}
                        </Grid>
                    </Tabs.Panel>
                    <Tabs.Panel value="pagada" >
                        <Grid>
                            { comandas.length > 0 ? comandas.map((comanda, index) => {
                                if (comanda.completada === activeTab.toUpperCase()){
                                    return (
                                        <Grid.Col span={4} key={index}>
                                            <Comanda comandaInfo={comanda} prev={3} next={0} color='green' />
                                        </Grid.Col>
                                        )
                                    }
                                })
                                : null}
                        </Grid>
                    </Tabs.Panel>
                    <Tabs.Panel value="cancelada" >
                        <Grid>
                            { comandas.length > 0 ? comandas.map((comanda, index) => {
                                if (comanda.completada === activeTab.toUpperCase()){
                                    return (
                                        <Grid.Col span={3} key={index}>
                                            <Comanda comandaInfo={comanda} color='red' prev={1} next={1}/>
                                        </Grid.Col>
                                        )
                                    }
                                })
                                : null}
                        </Grid>
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </div>
    )
}

export default Comandas
