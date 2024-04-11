import { Button, Group, Text, TextInput, Title, Flex, Select, Container, Divider } from "@mantine/core"
import { AdjustmentsHorizontal, CirclePlus, Search } from "tabler-icons-react"
import Tabla from "../components/Tabla"
import { useEffect, useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import { deleteProducto, getAllProductos } from "../controllers/productoController"
import ModalProductos from "../components/ModalProductos"
import useAuth from "../hooks/useAuth"

const Productos = () => {
    const { canEdit } = useAuth()
    const header = [
        "Id", "Nombre del producto", "Fecha de caducidad", "", "Cantidad", "Valor total"
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
    
    const calcularValorTotal = () => {
        let valorTotal = 0
        for (let i = 0; i < content.length; i++) {
            valorTotal += Number(content[i][5])
        }
        return valorTotal
    }
    const openCreateModal = () => {
        setRow({puesto: ''})
        handlers.open()
    }

    const setRowDIndex = (data) => {
        deleteOneProducto(productosC[data]['productoId'])
        setRowD(productosC[data]['productoId'])
    }

    const deleteOneProducto = async (id) => {
        const deleteRes = await deleteProducto(id)
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
            prod.splice(5,2)
            const fechaC = new Date(prod[4])
            prod[4] = fechaC.toDateString()
            const hoy = new Date()
            const diffInTime = fechaC.getTime() - hoy.getTime()
            const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24))
            prod.splice(2,0, prod[4])
            prod.splice(4,2)
            prod.splice(3,0, `${diffInDays} días restantes`)
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
            case 'CANTIDAD':
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
            case 'CANTIDADM':
                contenido.sort((a, b) => {
                    if (a[3] > b[3]) {
                        return -1;
                        }
                    if (a[3] < b[3]) {
                    return 1;
                    }
                    // a es igual a b
                    return 0;
                })
                setContent(contenido)
                break;
            case 'VALOR':
                contenido.sort((a, b) => {
                    if (a[4] > b[4]) {
                        return 1;
                        }
                        if (a[4] < b[4]) {
                        return -1;
                        }
                        // a es igual a b
                        return 0;
                })
                setContent(contenido)
                break;
            case 'VALORM':
                contenido.sort((a, b) => {
                    if (a[4] > b[4]) {
                        return -1;
                        }
                        if (a[4] < b[4]) {
                        return 1;
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
                    <Divider orientation="vertical" color="black" size='xs' />
                    <Flex direction='column'>
                        <Title ta='left' order={4}>Valor total de inventario</Title>
                        <Text ta='left'>${calcularValorTotal()}</Text>
                    </Flex>
                </Group>
                <Group mt={10} mb={15} align='flex-start' justify='flex-start'>
                    <TextInput  rightSection={<Search />} />
                    <Select w='20%' rightSection={<AdjustmentsHorizontal />} data={[
                        {value: 'NOMBRE', label: 'Ordenar por nombre'},
                        {value: 'VALORM', label: 'Ordenar de mayor a menor por valor total en inventario'},
                        {value: 'VALOR', label: 'Ordenar de menor a mayor por valor total en inventario'},
                        {value: 'CANTIDADM', label: 'Ordenar de mayor a menor por cantidad en existencia'},
                        {value: 'CANTIDAD', label: 'Ordenar de menor a mayor por cantidad en existencia'},
                        ]} onChange={(_value) => ordenarTabla(_value)} />
                    <Button leftSection={<CirclePlus />} display={canEdit ? 'block' : 'none' }  color="brown.9" onClick={openCreateModal}>Agregar producto</Button>
                </Group>
                <Tabla headers={header} content={content} row={setRowIndex} rowD={setRowDIndex} />
            </Container>
            <ModalProductos opened={opened} close={handlers.close} isEditable={canEdit} update={row.puesto !== '' ? true : false} updateInfo={row}  />
        </div>
    )
}

export default Productos
