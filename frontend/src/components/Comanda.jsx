import { ActionIcon, Button, Card, ColorSwatch, Group, Image, List, Text } from "@mantine/core"
import { PropTypes } from 'prop-types';
import { useEffect, useState } from "react";
import { STORED_IMAGES_URL } from "../utils/constants";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Edit, Trash } from "tabler-icons-react";
import { cambiarEstatus, cancelarComanda } from "../controllers/comandaController";
import { useNavigate } from "react-router";

const Comanda = ({ comandaInfo, color, prev, next }) => {
    const [comanda, setComanda] = useState({})
    const [seeDetails, setSeeDetails] = useState(false)
    const navigate = useNavigate()
    const getDateAndTime = () => {
        console.log(comanda)
        const fechaCreacion = new Date(comandaInfo.fechaCreacion)
        const c = {...comandaInfo}
        c['fecha'] = `${fechaCreacion.getUTCDate()}/${fechaCreacion.getUTCMonth()}/${fechaCreacion.getFullYear()}`
        c['hora'] = `${fechaCreacion.getHours()}:${fechaCreacion.getMinutes()}:${fechaCreacion.getSeconds()}`
        setComanda(c)
    }
    useEffect(() => {
        console.log(comandaInfo)
        setComanda(comandaInfo)
        getDateAndTime()
    },[])
    return (
        <Card withBorder shadow="sm"  radius="lg" w={300}>
            {/* Encabezado */}
            <Card.Section  inheritPadding py="xs">
                <Group justify="space-between">
                    <Text fw={600} fz={20}>{ comandaInfo.completada }</Text>
                    <ColorSwatch size={15}  color={color} />
                </Group>
            </Card.Section>
            {/* Imagen */}
            <Card.Section  >
            <Image w="90%" h={150}  radius={20} src={comandaInfo.platillosEnComanda.length > 0 ? `${STORED_IMAGES_URL}${comandaInfo.platillosEnComanda[0].platillo.imagen.url}` : null} />
            </Card.Section>
            {/* Informacion */}
            <Card.Section mt="sm" mb={5} inheritPadding>
                <Text ta='left' ><b>Mesero/a: </b>{ comandaInfo? `${ comandaInfo.empleado.empleadoNombre } ${ comandaInfo.empleado.paterno } ${ comandaInfo.empleado.materno }`: null}</Text>
                <Text ta='left' ><b>No. de nesa: </b>#{comandaInfo ? comanda.mesaId : null}</Text>
                <Text display={!seeDetails ? 'none': 'block'} ta='left'><b>Platillos:</b></Text>
                <List display={!seeDetails ? 'none': 'block'}>

                    {
                        comandaInfo.platillosEnComanda.length > 0 ?
                        comandaInfo.platillosEnComanda.map((com, index) => {
                            return(
                                <List.Item key={index} ta='left' ml={15}>{ `${com.cantidad} ${com.platillo.platilloNombre} - $${Number(com.platillo.precio)*com.cantidad} `}</List.Item>
                            )
                        })
                        : null
                    }
                </List>
                <Text ta='left' ><b>Fecha: </b>{ comandaInfo ? comanda['fecha'] : null }</Text>
                <Text ta='left' ><b>Hora: </b>{ comandaInfo ? comanda['hora'] : null }</Text>
                <Text display={!seeDetails ? 'none': 'block'} ta='left'><b>Total: </b>${comandaInfo ? comandaInfo.precioFinal : null}</Text>
            </Card.Section>
            <Card.Section>
                <Group justify="center">
                    <ActionIcon display={prev === 0 ? 'none' : 'block'} color="gray" radius='xl' size='lg' onClick={async() => cambiarEstatus(Number(comandaInfo.comandaId), prev)} ><ChevronLeft /></ActionIcon>
                    <ActionIcon color="red" radius='xl' size='lg' p={5} onClick={async() => cancelarComanda(Number(comandaInfo.comandaId))}><Trash /></ActionIcon>
                    <ActionIcon radius='xl' size='lg' onClick={() => navigate(`/editar-comanda/${comandaInfo.comandaId}`)}  ><Edit /></ActionIcon>
                    <ActionIcon display={next === 0  ? 'none' : 'block'} color="gray" radius='xl' size='lg' onClick={async() => cambiarEstatus(Number(comandaInfo.comandaId), next)} ><ChevronRight /></ActionIcon>
                </Group>
            </Card.Section>
            <Card.Section inheritPadding mt="sm" mb={5}>
                <Button onClick={() => setSeeDetails(!seeDetails)} leftSection={!seeDetails ? <ChevronDown /> : <ChevronUp />} color="light-brown">{!seeDetails ? 'Ver' : 'Ocultar'} detalles</Button>
            </Card.Section>
        </Card>
    )
}

Comanda.propTypes = {
    comandaInfo: PropTypes.object,
    color: PropTypes.string,
    prev: PropTypes.number,
    next: PropTypes.number,
}

export default Comanda