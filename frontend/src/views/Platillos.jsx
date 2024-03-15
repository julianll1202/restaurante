import {Group, Title, Stack, Text, Button } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllCategorias } from "../controllers/categoriaController"
import Categoria from "../components/Categoria"
import Platillo from "../components/Platillo"
import { getPlatillosCategoria } from "../controllers/platilloController"
import { useNavigate, useLocation } from "react-router-dom";

const Platillos = () => {
    //Obtener categoriaId si es que existe.
    const location = useLocation();
    let categoriaId;
    try {
        categoriaId = location.state.categoriaId;
    }catch(e){
    }

    const [categorias, setCategorias] = useState([])
    const getCategoriasList = async () => {
        const res = await getAllCategorias()
        if (res.length === 0) {
            setCategorias(null)
            return
        }
        setCategorias(res)
    }
    const [platillos, setPlatillos] = useState([])
    const getPlatillosCategoriaList = async (categoriaId) => {
        const res = await getPlatillosCategoria(categoriaId)
        if (res.length === 0) {
            setPlatillos(null)
            return
        }
        setPlatillos(res)
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
            <Button color="#4F4A45" w="10rem" radius="md" onClick={async () => cambioRuta_direccionamientoCrear()}>
                Crear platillo
            </Button>
            {
                categoriaId ?
                <Group gap={48} justify="center" w="100%" bg="white">
                    {
                        platillos ?
                            platillos.map((platillo, index) => {
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
                categorias ?
                categorias.map((categoria, index) => {
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
