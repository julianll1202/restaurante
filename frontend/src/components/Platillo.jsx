import { Card, Image, Text, Button, Group } from '@mantine/core';
import { PropTypes } from 'prop-types';

function Platillo ({direccionamientoEliminar, direccionamientoEditar, imagenURL_platillo, titulo_platillo, descripcion_platillo, precio_platillo}) {
    return(
        <Card
        shadow="sm"
        padding="xl"
        component="a"
        w="20rem"
        h="30rem"
      >
        <Text fw={700} size="lg" mt={0.1} mb="md" >
            {titulo_platillo}
        </Text>

        <Card.Section h="50%">
          <Image
            src={imagenURL_platillo}
            h="100%"
            w="100%"
            alt="Categoria de platillos"
            radius="md"
          />
        </Card.Section>
  
        <Text mt="md" size="sm">
            <b>Descripción:</b> {descripcion_platillo}
        </Text>

        <Text mt="xs" size="sm">
            <b>Precio:</b> ${precio_platillo}
        </Text>
      
      <Group justify="space-between" mt="md" mb="xs">
      <Button color="blue" w="45%" mt="md" radius="md" onClick={direccionamientoEliminar}>
        Eliminar
      </Button>
      <Button color="blue" w="45%" mt="md" radius="md" onClick={direccionamientoEditar}>
        Editar
      </Button>
      </Group>
      </Card>
    );
}

Platillo.propTypes = {
  direccionamientoEliminar: PropTypes.func,
  direccionamientoEditar: PropTypes.func,
  imagenURL_platillo: PropTypes.string,
  titulo_platillo: PropTypes.string,
  descripcion_platillo: PropTypes.string,
  precio_platillo: PropTypes.string
};
export default Platillo;
