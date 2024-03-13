import { Card, Image, Text } from '@mantine/core';
import { PropTypes } from 'prop-types';
function Categoria ({imagenURL_categoria, titulo_categoria, descripcion_categoria}) {
    return(
        <Card
        shadow="sm"
        padding="xl"
        component="a"
        href=""
        target="_blank"
        w="20rem"
        h="30rem"
      >
        <Card.Section h="80%">
          <Image
            src={imagenURL_categoria}
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
    imagenURL_categoria : PropTypes.string,
    titulo_categoria : PropTypes.string,
    descripcion_categoria : PropTypes.string
};
export default Categoria;