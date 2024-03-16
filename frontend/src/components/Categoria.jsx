import { Card, Image, Text } from '@mantine/core';
import { PropTypes } from 'prop-types';
import { STORED_IMAGES_URL } from '../utils/constants';
function Categoria ({direccionamiento, imagenURL_categoria, titulo_categoria, descripcion_categoria}) {
    return(
        <Card shadow="sm" padding="lg" component="a" w="20rem" h="25rem" onClick={direccionamiento}>
          <Card.Section h="80%">
            <Image
              src={`${STORED_IMAGES_URL}${imagenURL_categoria}`}
              ml='auto'
              mr='auto'
              h="100%"
              w="90%"
              fit='fill'
              alt="Categoria de platillos"
            />
          </Card.Section>
          <Card.Section mb={0}>
            <Text fw={700} size="lg" mt="md" >{titulo_categoria}</Text>
            <Text mt="xs" mb={0} c="dimmed" size="sm">{descripcion_categoria}</Text>
          </Card.Section>
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
