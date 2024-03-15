import { Card, Image, Text } from '@mantine/core';
import { PropTypes } from 'prop-types';
import { STORED_IMAGES_URL } from '../utils/constants';
function Categoria ({direccionamiento, imagenURL_categoria, titulo_categoria, descripcion_categoria}) {
    return(
        <Card
        shadow="sm"
        padding="xl"
        component="a"
        w="20rem"
        h="30rem"
        onClick={direccionamiento}
      >
        <Card.Section h="80%">
          <Image
            src={`${STORED_IMAGES_URL}${imagenURL_categoria}`}
            h="100%"
            w="100%"
            alt="Categoria de platillos"
          />
        </Card.Section>
  
        <Text fw={700} size="lg" mt="md" >
            {titulo_categoria}
        </Text>
  
        <Text mt="xs" c="dimmed" size="sm">
            {descripcion_categoria}
        </Text>
      </Card>
    );
}

Categoria.propTypes = {
    direccionamiento : PropTypes.func,
    imagenURL_categoria : PropTypes.string,
    titulo_categoria : PropTypes.string,
    descripcion_categoria : PropTypes.string
};
export default Categoria;
