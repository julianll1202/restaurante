import { Button, Group, Text, TextInput, Title, Flex, Select, Container } from "@mantine/core"
import { AdjustmentsHorizontal, CirclePlus, Search } from "tabler-icons-react"
import Tabla from "../components/Tabla"
import { useEffect, useState } from "react"
import { deleteEmpleado } from "../controllers/empleadoControllers"
import { useDisclosure } from "@mantine/hooks"
import { getAllProductos } from "../controllers/productoController"
import ModalProductos from "../components/ModalProductos"
import { DateTimePicker } from "@mantine/dates"

const Productos = () => {
    const header = [
        "Id", "Nombre del producto", "Fecha de caducidad", "Cantidad", "Valor total"
    ] // Encabezado de la tabla
    const [content, setContent] = useState([]) // Contenido de la tabla
    const [productosC, setProductosC] = useState([]) // Lista de empleados completa
    const [opened, handlers] = useDisclosure(false); // Manejo de estado del modal
    const [row, setRow] = useState({puesto: ''}) // Fila a editar
    const [rowD, setRowD] = useState(0) // Fila a eliminar

    const setRowIndex = (data) => {
        setRow(productosC[data])
        console.log(productosC[data])
        handlers.open()
    }

    const openCreateModal = () => {
        setRow({puesto: ''})
        handlers.open()
    }

    const setRowDIndex = (data) => {
        setRowD(productosC[data]['productoId'])
        deleteOneEmpleado(productosC[data]['productoId'])
    }

    const deleteOneEmpleado = async (id) => {
        console.log(id)
        const deleteRes = await deleteEmpleado(id)
        console.log(deleteRes)
    }

    const getProductosList = async () => {
        const res = await getAllProductos()
        res.forEach((prod) => {
            prod['compras'] = Object.values(prod['productosEnCompra'])
            let valorTotal = 0
            for (let i = 0; i < prod['compras'].length; i++) {
                valorTotal += prod['compras'][i].precioTotal
            }
            prod['valorTotal'] = valorTotal
        })
        setProductosC(res)
        console.log(res)
        let data = res.map((e) => Object.values(e))
        data.forEach((prod) => {
            prod.splice(3,2)
        });
        console.log(data)
        setContent(data)
    }

    const ordenarTabla = (filtro) => {
        const contenido = [...content]
        switch (filtro) {
            case 'NOMBRE':
                contenido.sort((a, b) => {
                    if (a[1] > b[1]) {
                        return 1;
                      }
                      if (a[1] < b[1]) {
                        return -1;
                      }
                      // a es igual a b
                      return 0;
                })
                setContent(contenido)
                break;
            case 'SUELDO':
                contenido.sort((a, b) => {
                    if (Number(a[4]) > Number(b[4])) {
                        return -1;
                        }
                        if (Number(a[4]) < Number(b[4])) {
                        return 1;
                        }
                        // a es igual a b
                        return 0;
                })
                setContent(contenido)
                break;
            case 'PUESTO':
                contenido.sort((a, b) => {
                    if (a[3] > b[3]) {
                        return 1;
                        }
                        if (a[3] < b[3]) {
                        return -1;
                        }
                        // a es igual a b
                        return 0;
                })
                setContent(contenido)
                break;
        }
    }

    useEffect(() => {
        getProductosList()
    }, [opened, rowD])
    return (
        <div style={{
            width: '100%',
            padding: '3vw',
        }}>
            <Container direction="column" size='xl' w='90vw' justify='center' align='center' >
                <Title ta='left' order={1} mb={10}>Inventario</Title>
                <Group>
                    <Flex direction='column'>
                        <Title ta='left' order={4}>Productos</Title>
                        <Text ta='left'>{content.length}</Text>
                    </Flex>
                    <Flex direction='column'>
                        <Title ta='left' order={4}>Valor total de inventario</Title>
                        <Text ta='left'>{content.length}</Text>
                        <DateTimePicker withSeconds label='Fecha de caducidad' />
                    </Flex>
                </Group>
                <Group mt={10} mb={15} align='flex-start' justify='flex-start'>
                    <TextInput  rightSection={<Search />} />
                    <Select rightSection={<AdjustmentsHorizontal />} data={[
                        {value: 'NOMBRE', label: 'Ordenar por nombre'},
                        {value: 'PUESTO', label: 'Ordenar por puesto'},
                        {value: 'SUELDO', label: 'Ordenar por sueldo'},
                        ]} onChange={(_value, option) => ordenarTabla(_value)} />
                    <Button leftSection={<CirclePlus />} color="brown.9" onClick={openCreateModal}>Agregar empleado</Button>
                </Group>
                <Tabla headers={header} content={content} row={setRowIndex} rowD={setRowDIndex} />
            </Container>
            <ModalProductos opened={opened} close={handlers.close} update={row.puesto !== '' ? true : false} updateInfo={row}  />
        </div>
    )
}

export default Productos
