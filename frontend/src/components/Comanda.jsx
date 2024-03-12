import { Card, ColorSwatch, Group, Image, Text } from "@mantine/core"
import { PropTypes } from 'prop-types';

const Comanda = ({ comandaInfo }) => {
    return (
        <Card withBorder shadow="sm"  radius="md" w={350}>
            {/* Encabezado */}
            <Card.Section  inheritPadding py="xs">
                <Group justify="space-between">
                    <Text fw={600} fz={22}>Pendiente</Text>
                    <ColorSwatch size={15}  color="orange" />
                </Group>
            </Card.Section>
            {/* Imagen */}
            <Card.Section >
            <Image w="90%" radius={20} src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png" />
            </Card.Section>
            {/* Informacion */}
            <Card.Section mt="sm" mb={5} inheritPadding>
                <Text ta='left' ><b>Mesero/a: </b>Nombre Apellido</Text>
                <Text ta='left' ><b>No. de nesa: </b>#1</Text>
                <Text ta='left' ><b>Fecha: </b>06/03/2024</Text>
                <Text ta='left' ><b>Hora: </b>16:08</Text>
            </Card.Section>
        </Card>
    )
}

Comanda.PropTypes = {
    comandaInfo: PropTypes.object,
}

export default Comanda