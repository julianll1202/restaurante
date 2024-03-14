import { Container, Group, Text, Title } from '@mantine/core';
import ResumenComanda from '../components/ResumenComanda';

const CrearComanda = () => {
    return (
        <div style={{
            width: '100%',
            padding: '3vw',
        }}>
            <Container direction="column" size='xl' w='90vw' justify='center' align='center' >
                <Title>Crear comanda</Title>
                <Group justify='space-between'>
                    <Group>
                        <Text>Lista de platillos</Text>
                    </Group>
                    <ResumenComanda />
                </Group>
            </Container>
        </div>
    )
}

export default CrearComanda
/*
    Estructura general
    Titulo
    2 columnas

    Columna 1
    Titulo platillos
    Secciones o tabs de categorias
    Lista de platillos por categoria

    Columna 2
    Tabs de lista y comanda
    Lista o comanda
    Cuadro del total

    Lista
    Lista de componente platillo seleccionado

*/