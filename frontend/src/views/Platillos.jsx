import {Group, Title, Stack } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllCategorias } from "../controllers/categoriaController"
import Categoria from "../components/Categoria"
import Platillo from "../components/Platillo"
import { getAllPlatillos } from "../controllers/platilloController"
import { useNavigate } from "react-router-dom";

const Platillos = () => {
    const [categorias, setCategorias] = useState([])
    const getCategoriasList = async () => {
        const res = await getAllCategorias()
        setCategorias(res)
    }
    const [platillos, setPlatillos] = useState([])
    const getPlatillosList = async () => {
        const res = await getAllPlatillos()
        setPlatillos(res)
    }

    const navigate = useNavigate();
    const cambioRuta_PlatillosCategoria = async (categoriaId) => {
        navigate('/mesas', { //Esta ruta es temporal, mientras se define la ruta correcta
            state: {
              categoriaId: categoriaId
            }
          });
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
        getCategoriasList(),
        getPlatillosList()
    })
    return (
        <Stack gap="lg" align="flex-start" justify="center" w="100%" bg="white" p="3vw">
            <Title>Categorias</Title>
            <Group gap={48} justify="center" w="100%" bg="white">
            {
                categorias.map((categoria, index) => {
                    {
                        return (
                            <Categoria direccionamiento={async () => cambioRuta_PlatillosCategoria(categoria.categoriaId)} imagenURL_categoria="https://cbx-prod.b-cdn.net/COLOURBOX25805277.jpg" titulo_categoria={categoria.categoriaNombre} descripcion_categoria={categoria.descripcion} key={index}/>
                        );
                    }
                })
            }
            </Group>
            <Title>Platillos</Title>
            <Group gap={48} justify="center" w="100%" bg="white">
            {
                platillos.map((platillo, index) => {
                    {
                        return (
                            <Platillo direccionamientoEliminar={async () => cambioRuta_direccionamientoEliminar(platillo.platilloId)}  direccionamientoEditar={async () => cambioRuta_direccionamientoEditar(platillo.platilloId)} imagenURL_platillo="https://cbx-prod.b-cdn.net/COLOURBOX25805277.jpg" precio_platillo={platillo.precio} descripcion_platillo={platillo.descripcion} titulo_platillo={platillo.platilloNombre} key={index}/>
                        );
                    }
                })
            }
            </Group>
        </Stack>
    )
}

export default Platillos
