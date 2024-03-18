import { Card, Image, Text, Button, Center } from '@mantine/core';
import { PropTypes } from 'prop-types';
import { CirclePlus, CircleX, Edit } from 'tabler-icons-react';

function Platillo ({direccionamientoEliminar, direccionamientoEditar, imagenURL_platillo, titulo_platillo, descripcion_platillo, precio_platillo, platillo_Id, miniVersion, direccionamientoAgregar}) {
    return(
        <Card
        shadow="sm"
        padding={miniVersion ? 'md': "lg"}
        w={ miniVersion ? '15rem' :"20rem"}
        h={miniVersion ? '20rem': '25rem'}
        bg={miniVersion ? '#f5f5f5' : '#FFFFFF'}
        pb={0}
      >
        { miniVersion ?
          null
         :
          <Text fw={700} size="lg" mt={0.1} mb="md" >
              {titulo_platillo}
          </Text>
        }
          <Card.Section h={miniVersion ? '60%':"50%"} mt={miniVersion ? 10 : 0} inheritPadding>
            <Image
              src={imagenURL_platillo}
              h="100%"
              mr='auto'
              ml='auto'
              w="100%"
              alt="Categoria de platillos"
              radius="md"
            />
          </Card.Section>
        {
          miniVersion ?
          <Card.Section mt={10}>
            <Text fw='bold' ta='center'>{titulo_platillo}</Text>
            <Text fw='bold' ta='center' c="dimmed">${precio_platillo}</Text>
          </Card.Section>
          :
          <Card.Section inheritPadding>
            <Text ta='left' mt="md" size="sm">
                <b>Descripción:</b> {descripcion_platillo}
            </Text>

            <Text ta='left' mt="xs" size="sm">
                <b>Precio:</b> ${precio_platillo}
            </Text>
          </Card.Section>
        }
      {
        miniVersion ?
        <Card.Section inheritPadding mb={10}>
          <Center>
            <Button ml='auto' mr='auto' justify='center' leftSection={<CirclePlus />} onClick={() => direccionamientoAgregar({id:platillo_Id, nombre:titulo_platillo, precio:precio_platillo, url:imagenURL_platillo})}>Agregar</Button>
          </Center>
        </Card.Section>
        :
        <Card.Section inheritPadding mb={0} py="xs">
            <Button color="red" leftSection={<CircleX />} mr={10}  w="45%" mt="md" radius="md" onClick={direccionamientoEliminar}>
              Eliminar
            </Button>
            <Button color="brown.8" leftSection={<Edit />} ml={10} w="45%" mt="md" mb={0} radius="md" onClick={direccionamientoEditar}>
              Editar
            </Button>
        </Card.Section>
      }
      </Card>
    );
}

Platillo.propTypes = {
  direccionamientoEliminar: PropTypes.func,
  direccionamientoEditar: PropTypes.func,
  imagenURL_platillo: PropTypes.string,
  titulo_platillo: PropTypes.string,
  descripcion_platillo: PropTypes.string,
  precio_platillo: PropTypes.string,
  miniVersion: PropTypes.bool,
  platillo_Id: PropTypes.number,
  direccionamientoAgregar: PropTypes.func,
};
export default Platillo;
