import {Group, Title, Stack, Text, Button, TextInput, Select, Breadcrumbs } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllCategorias } from "../controllers/categoriaController"
import Categoria from "../components/Categoria"
import Platillo from "../components/Platillo"
import { deletePlatillo, getPlatillosCategoria } from "../controllers/platilloController"
import { useNavigate, useLocation } from "react-router-dom";
import ModalPlatillos from "../components/ModalPlatillos"
import { useDisclosure } from "@mantine/hooks"
import { STORED_IMAGES_URL } from "../utils/constants"
import { AdjustmentsHorizontal, Search } from "tabler-icons-react"

const Platillos = () => {
    const [opened, handlers] = useDisclosure(false); // Manejo de estado del modal
    const [row, setRow] = useState({categoriaId: '', imagen: {url: ''}}) // Fila a editar

    const openCreateModal = () => {
        setRow({categoria: ''})
        handlers.open()
    }

    const openUpdateModal = (data) => {
        setRow(data)
        handlers.open()
    }
    //Obtener categoriaId si es que existe.
    const location = useLocation();
    let categoriaId;
    let categoriaNombre;
    try {
        categoriaId = location.state.categoriaId;
        categoriaNombre = location.state.categoriaNombre
    }catch(e){
    }

    const [categoriasPAG, setCategoriasPAG] = useState([])
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
        if (res.length === 0) {
            setPlatillosPAG(null)
            return
        }
        setPlatillosPAG(res)
    }

    const eliminarPlatillo = async (platilloId) => {
        await deletePlatillo(platilloId)
    }

    const navigate = useNavigate();
    const cambioRuta_PlatillosCategoria = async (categoriaId, categoriaNombre) => {
        navigate('/platillos', {
            state: {
              categoriaId: categoriaId,
              categoriaNombre: categoriaNombre
            }
          });
    }

    const ordenarDatos = (filtro) => {
        const contenido = [...platillosPAG]
        switch (filtro) {
            case 'NOMBRE':
                contenido.sort((a, b) => {
                    if (a.platilloNombre > b.platilloNombre) {
                        return 1;
                      }
                      if (a.platilloNombre < b.platilloNombre) {
                        return -1;
                      }
                      // a es igual a b
                      return 0;
                })
                setPlatillosPAG(contenido)
                break;
            case 'NOMBREM':
                contenido.sort((a, b) => {
                    if (a.platilloNombre > b.platilloNombre) {
                        return -1;
                        }
                        if (a.platilloNombre < b.platilloNombre) {
                        return 1;
                        }
                        // a es igual a b
                        return 0;
                })
                setPlatillosPAG(contenido)
                break;
            case 'PRECIO':
                contenido.sort((a, b) => {
                    if (Number(a.precio) > Number(b.precio)) {
                        return 1;
                        }
                        if (Number(a.precio) < Number(b.precio)) {
                        return -1;
                        }
                        // a es igual a b
                        return 0;
                })
                setPlatillosPAG(contenido)
                break;
            case 'PRECIOM':
                contenido.sort((a, b) => {
                if (Number(a.precio) > Number(b.precio)) {
                    return -1;
                    }
                    if (Number(a.precio) < Number(b.precio)) {
                    return 1;
                    }
                    // a es igual a b
                    return 0;
                })
                setPlatillosPAG(contenido)
                break;
        }
    }

    useEffect(() => {
        getCategoriasList()
    }, [opened])
    useEffect(() => {
        getPlatillosCategoriaList(categoriaId)
    }, [categoriaId, opened, row])

    return (
        <Stack gap="lg" align="flex-start" justify="center" w="100%" bg="white" p="3vw">
            <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
                <Title onClick={async () => cambioRuta_PlatillosCategoria(null,'')}>Platillos</Title>
                {categoriaNombre !== '' ? <Title order={2}>{ categoriaNombre }</Title> : null}
            </Breadcrumbs>
            { platillosPAG === null || platillosPAG.length === 0 ?
                <Button color="#4F4A45" w="10rem" radius="md" onClick={async () => openCreateModal()}>Crear platillo</Button>
                :
            <Group mt={10} mb={15} align='flex-start' justify='flex-start'>
                    <Button color="#4F4A45" w="10rem" radius="md" onClick={async () => openCreateModal()}>Crear platillo</Button>
                    <TextInput  rightSection={<Search />} />
                    <Select rightSection={<AdjustmentsHorizontal />} data={[
                        {value: 'NOMBRE', label: 'Ordenar por nombre de menor a mayor'},
                        {value: 'NOMBREM', label: 'Ordenar por nombre de mayor a menor'},
                        {value: 'PRECIO', label: 'Ordenar por precio de menor a mayor'},
                        {value: 'PRECIOM', label: 'Ordenar por precio de mayor a menor'},
                    ]} onChange={(_value, option) => ordenarDatos(_value)} />
            </Group>
            }
            {
                categoriaId ?
                <Group gap={48} justify="center" w="100%" bg="white">
                    {
                        platillosPAG ?
                        platillosPAG.map((platillo, index) => {
                            {
                                return (
                                    <Platillo direccionamientoEliminar={async () => {
                                        eliminarPlatillo(platillo.platilloId)
                                        setRow(platillo)
                                    }}  direccionamientoEditar={() => openUpdateModal(platillo)} imagenURL_platillo={`${STORED_IMAGES_URL}${platillo.imagen.url}`} precio_platillo={platillo.precio} descripcion_platillo={platillo.descripcion} titulo_platillo={platillo.platilloNombre} key={index}/>
                                    );
                                }
                            })
                            :
                            <Text>No hay platillos para esta categoría</Text>
                        }
                </Group>
            :
            <Group gap={48} justify="center" w="100%" bg="white">
            {
                categoriasPAG ?
                categoriasPAG.map((categoria, index) => {
                    {
                        return (
                            <Categoria direccionamiento={async () => cambioRuta_PlatillosCategoria(categoria.categoriaId, categoria.categoriaNombre)} imagenURL_categoria={categoria.imagen.url} titulo_categoria={categoria.categoriaNombre} descripcion_categoria={categoria.descripcion} key={index}/>
                            );
                        }
                    })
                    :
                    <Text>No hay categorías disponibles</Text>
                }
            </Group>
            }
            <ModalPlatillos opened={opened} close={handlers.close} update={row.categoria !== '' ? true : false} updateInfo={row}  />
        </Stack>
    )
}

export default Platillos
