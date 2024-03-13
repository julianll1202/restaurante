import { Card, ColorSwatch, Group, Image, Text } from "@mantine/core"
import { PropTypes } from 'prop-types';
import { useEffect, useState } from "react";
import { STORED_IMAGES_URL } from "../utils/constants";

const Comanda = ({ comandaInfo, color }) => {
    const [comanda, setComanda] = useState({})
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
            <Card.Section >
            <Image w="90%" radius={20} src={comandaInfo.platillosEnComanda.length > 0 ? `${STORED_IMAGES_URL}${comandaInfo.platillosEnComanda[0].platillo.imagen.url}` : null} />
            </Card.Section>
            {/* Informacion */}
            <Card.Section mt="sm" mb={5} inheritPadding>
                <Text ta='left' ><b>Mesero/a: </b>{ comandaInfo? `${ comandaInfo.empleado.empleadoNombre } ${ comandaInfo.empleado.paterno } ${ comandaInfo.empleado.materno }`: null}</Text>
                <Text ta='left' ><b>No. de nesa: </b>#{comandaInfo ? comanda.mesaId : null}</Text>
                <Text ta='left' ><b>Fecha: </b>{ comandaInfo ? comanda['fecha'] : null }</Text>
                <Text ta='left' ><b>Hora: </b>{ comandaInfo ? comanda['hora'] : null }</Text>
            </Card.Section>
        </Card>
    )
}

Comanda.propTypes = {
    comandaInfo: PropTypes.object,
    color: PropTypes.string
}

export default Comanda