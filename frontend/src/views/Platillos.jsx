import {Group, Title, Stack, Text, Button } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllCategorias } from "../controllers/categoriaController"
import Categoria from "../components/Categoria"
import Platillo from "../components/Platillo"
import { getPlatillosCategoria, createPlatillo } from "../controllers/platilloController"
import { useNavigate, useLocation } from "react-router-dom";
import ModalPlatillos from "../components/ModalPlatillos"
import { useDisclosure } from "@mantine/hooks"

const Platillos = () => {
    const [opened, handlers] = useDisclosure(false); // Manejo de estado del modal
    const [row, setRow] = useState({categoria: ''}) // Fila a editar

    const openCreateModal = () => {
        setRow({categoria: ''})
        handlers.open()
    }

    //Obtener categoriaId si es que existe.
    const location = useLocation();
    let categoriaId;
    try {
        categoriaId = location.state.categoriaId;
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

    const navigate = useNavigate();
    const cambioRuta_PlatillosCategoria = async (categoriaId) => {
        navigate('/platillos', {
            state: {
              categoriaId: categoriaId
            }
          });
    }

    const cambioRuta_direccionamientoCrear = async () => {
        navigate('/mesas'); //Esta ruta es temporal, mientras se define la ruta correcta
    }

    const cambioRuta_direccionamientoEliminar = async (platilloId) => {
        navigate('/mesas', { //Esta ruta es temporal, mientras se define la ruta correcta
            state: {
                platilloId: platilloId
            }
          });
    }

    const cambioRuta_direccionamientoEditar = async (platilloId) => {
        navigate('/mesas', { //Esta ruta es temporal, mientras se define la ruta correcta
            state: {
                platilloId: platilloId
            }
          });
    }

    useEffect(() => {
        getCategoriasList()
    }, [])
    useEffect(() => {
        getPlatillosCategoriaList(categoriaId)
    }, [categoriaId])
    return (
        <Stack gap="lg" align="flex-start" justify="center" w="100%" bg="white" p="3vw">
            <Title>Platillos</Title>
            <Button color="#4F4A45" w="10rem" radius="md" onClick={async () => openCreateModal()}>
                Crear platillo
            </Button>
            <ModalPlatillos opened={opened} close={handlers.close} update={row.categoria !== '' ? true : false} updateInfo={row}  />
            {
                categoriaId ?
                <Group gap={48} justify="center" w="100%" bg="white">
                    {
                        platillosPAG ?
                        platillosPAG.map((platillo, index) => {
                                {
                                    return (
                                        <Platillo direccionamientoEliminar={async () => cambioRuta_direccionamientoEliminar(platillo.platilloId)}  direccionamientoEditar={async () => cambioRuta_direccionamientoEditar(platillo.platilloId)} imagenURL_platillo="https://cbx-prod.b-cdn.net/COLOURBOX25805277.jpg" precio_platillo={platillo.precio} descripcion_platillo={platillo.descripcion} titulo_platillo={platillo.platilloNombre} key={index}/>
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
                            <Categoria direccionamiento={async () => cambioRuta_PlatillosCategoria(categoria.categoriaId)} imagenURL_categoria="https://cbx-prod.b-cdn.net/COLOURBOX25805277.jpg" titulo_categoria={categoria.categoriaNombre} descripcion_categoria={categoria.descripcion} key={index}/>
                        );
                    }
                })
                :
                <Text>No hay categorías disponibles</Text>
            }
            </Group>
            }
        </Stack>
    )
}

export default Platillos
