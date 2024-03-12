import {Group, Title, Stack } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllCategorias } from "../controllers/categoriaController"
import Categoria from "../components/Categoria"

const Platillos = () => {
    const [content, setContent] = useState([])
    const getCategoriasList = async () => {
        const res = await getAllCategorias()
        setContent(res)
    }

    useEffect(() => {
        getCategoriasList()
    })
    return (
        <Stack gap="lg" align="flex-start" justify="center" w="100%" bg="white" p="3vw">
            <Title>Platillos</Title>
            <Group gap={48} justify="center" w="100%" bg="white">
            {
                content.map((categoria, index) => {
                    {
                        return (
                            <Categoria imagenURL_categoria="https://cbx-prod.b-cdn.net/COLOURBOX25805277.jpg" titulo_categoria={categoria.categoriaNombre} descripcion_categoria={categoria.descripcion} key={index}/>
                        );
                    }
                })
            }
            </Group>
        </Stack>
    )
}

export default Platillos
