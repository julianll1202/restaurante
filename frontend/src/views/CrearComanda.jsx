import { Container, Flex, Grid, Group, ScrollArea, Text, Title } from '@mantine/core';
import ResumenComanda from '../components/ResumenComanda';
import CarruselCategorias from '../components/CarruselCategorias';
import { createContext, useEffect, useState } from 'react';
import { getAllCategorias } from '../controllers/categoriaController';
import { getPlatillosCategoria } from '../controllers/platilloController';
import { STORED_IMAGES_URL } from '../utils/constants';
import Platillo from '../components/Platillo';

export const listaP = createContext({})
const CrearComanda = () => {
    const [categoriasPAG, setCategoriasPAG] = useState([])
    const [ selectCat, setSelectCat] = useState(0)
    const [listaPlatillos, setListaPlatillos] = useState([])

    const setCategory = (data) => {
        if (categoriasPAG.length !== 0)
            setSelectCat(categoriasPAG[data].categoriaId)
        console.log(selectCat)
    }

    const addItem = (item) => {
        const items = JSON.parse(JSON.stringify({...item}))
        console.log(items)
        let lista = []
        if (listaPlatillos.length > 0) {
            lista = [...listaPlatillos]
        }
        let existente = false
        lista.forEach((i) => {
            if (i.platilloId === item.platilloId) {
                i.cantidad += 1
                existente = true
            }
        })
        if(!existente) {
            lista.push(items)
        }
        console.log(lista)
        setListaPlatillos(lista)
    }
    const getCategoriasList = async () => {
        const res = await getAllCategorias(1)
        if (res.length === 0) {
            setCategoriasPAG(null)
            return
        }
        setCategoriasPAG(res)
    }
    const [platillosPAG, setPlatillosPAG] = useState([])
    const getPlatillosCategoriaList = async (categoriaId) => {
        const res = await getPlatillosCategoria(categoriaId)
        console.log(res)
        if (res.length === 0) {
            setPlatillosPAG(null)
            return
        }
        setPlatillosPAG(res)
    }
    useEffect(() => {
        getCategoriasList()
    }, [])

    useEffect(() => {
        getPlatillosCategoriaList(selectCat)
    }, [selectCat])
    return (
        <listaP.Provider value={{listaPlatillos, setListaPlatillos}}>
            <div style={{
                width: '100%',
                padding: '20px',
            }}>
                <Container direction="column" size='100vw' w='100vw' justify='center' align='center' style={{
                    paddingInline: 'none',
                    marginInline: 'none'
                }} >
                    <Title ta='left'>Crear comanda</Title>
                    <Group justify='center' align='center' w='100%'>
                        <Flex direction='column' w='55%' justify='center' align='center'>
                            <Title order={3}>Lista de platillos</Title>
                            <CarruselCategorias categorias={categoriasPAG} setCatIndex={setCategory} />
                            <ScrollArea h={550} offsetScrollbars>
                                <Grid gap={48} mt={15}  w="100%" bg="white">
                                {
                                    platillosPAG ?
                                    platillosPAG.map((platillo, index) => {
                                        {
                                            return (
                                                <Grid.Col span={3}>
                                                    <Platillo miniVersion direccionamientoAgregar={addItem} platillo_Id={platillo.platilloId} imagenURL_platillo={`${STORED_IMAGES_URL}${platillo.imagen.url}`} precio_platillo={platillo.precio} descripcion_platillo={platillo.descripcion} titulo_platillo={platillo.platilloNombre} key={index}/>
                                                </Grid.Col>
                                                );
                                            }
                                        })
                                        :
                                        <Text>No hay platillos para esta categoría</Text>
                                        }
                                </Grid>
                            </ScrollArea>
                        </Flex>
                        <Group w='40%'>
                            <ResumenComanda items={listaPlatillos} />
                        </Group>
                    </Group>
                </Container>
            </div>
        </listaP.Provider>
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