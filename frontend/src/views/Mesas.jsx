import { Button, Group, Text, TextInput, Title, Flex, Select, Stack } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllMesas } from "../controllers/mesaController"
import { useNavigate } from "react-router-dom";

const Mesas = () => {
    const [content, setContent] = useState([])
    const getMesasList = async () => {
        const res = await getAllMesas()
        setContent(res)
    }
    const navigate = useNavigate(); 
    const cambioRuta = async (mesaId) => {
        navigate('/comandas', {
            state: {
              mesaId: mesaId
            }
          });
    }

    useEffect(() => {
        getMesasList()
    })
    return (
        <Stack gap="lg" align="flex-start" justify="center" w="100%" bg="white" p="3vw">
            <Title>Mesas</Title>
            <Group gap={48} justify="flex-start" w="100%" bg="white">
            {
                content.map((mesa, index) => {
                    return (
                        <Button size="1.6rem" h="10rem" w="13rem" onClick={async () => cambioRuta(mesa.mesaId)} key={index}>Mesa {mesa.mesaId} <br/> {mesa.capacidad} asientos</Button>
                    )
                })
            }
            </Group>
        </Stack>
    )
}

export default Mesas
