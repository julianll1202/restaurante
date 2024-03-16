import { Card, Image, Text, Button, Group } from '@mantine/core';
import { PropTypes } from 'prop-types';
import { CircleX, Edit } from 'tabler-icons-react';

function Platillo ({direccionamientoEliminar, direccionamientoEditar, imagenURL_platillo, titulo_platillo, descripcion_platillo, precio_platillo}) {
    return(
        <Card
        shadow="sm"
        padding="lg"
        component="a"
        w="20rem"
        h="25rem"
        pb={0}
      >
        <Text fw={700} size="lg" mt={0.1} mb="md" >
            {titulo_platillo}
        </Text>

        <Card.Section h="50%">
          <Image
            src={imagenURL_platillo}
            h="100%"
            mr='auto'
            ml='auto'
            w="90%"
            alt="Categoria de platillos"
            radius="md"
          />
        </Card.Section>
        <Card.Section inheritPadding>
          <Text ta='left' mt="md" size="sm">
              <b>Descripción:</b> {descripcion_platillo}
          </Text>

          <Text ta='left' mt="xs" size="sm">
              <b>Precio:</b> ${precio_platillo}
          </Text>
        </Card.Section>
      <Card.Section inheritPadding mb={0} py="xs">
          <Button color="red" leftSection={<CircleX />} mr={10}  w="45%" mt="md" radius="md" onClick={direccionamientoEliminar}>
            Eliminar
          </Button>
          <Button color="brown.8" leftSection={<Edit />} ml={10} w="45%" mt="md" mb={0} radius="md" onClick={direccionamientoEditar}>
            Editar
          </Button>
      </Card.Section>
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
