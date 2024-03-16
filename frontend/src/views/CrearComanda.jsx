import { Container, Flex, Group, Title } from '@mantine/core';
import ResumenComanda from '../components/ResumenComanda';
import CarruselCategorias from '../components/CarruselCategorias';
import { useEffect, useState } from 'react';
import { getAllCategorias } from '../controllers/categoriaController';

const CrearComanda = () => {
    const [categoriasPAG, setCategoriasPAG] = useState([])
    const getCategoriasList = async () => {
        const res = await getAllCategorias(1)
        if (res.length === 0) {
            setCategoriasPAG(null)
            return
        }
        setCategoriasPAG(res)
    }

    useEffect(() => {
        getCategoriasList()
    }, [])
    return (
        <div style={{
            width: '100%',
            padding: '3vw',
        }}>
            <Container direction="column" size='xl' w='90vw' justify='center' align='center' >
                <Title ta='left'>Crear comanda</Title>
                <Group justify='space-around'>
                    <Flex direction='column'>
                        <Title order={3}>Lista de platillos</Title>
                        <CarruselCategorias categorias={categoriasPAG} />
                        {/* <Group mt={10}>
                            <CategoriaBlock />
                            <CategoriaBlock selected />
                            <CategoriaBlock />
                        </Group> */}
                    </Flex>
                    <ResumenComanda />
                </Group>
            </Container>
        </div>
    )
}

export default CrearComanda
/*
    Estructura general
    Titulo
    2 columnas

    Columna 1
    Titulo platillos
    Secciones o tabs de categorias
    Lista de platillos por categoria

    Columna 2
    Tabs de lista y comanda
    Lista o comanda
    Cuadro del total

    Lista
    Lista de componente platillo seleccionado

*/