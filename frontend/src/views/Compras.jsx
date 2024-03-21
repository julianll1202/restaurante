import { Button, Group, TextInput, Title, Select, Container, Stack, Image } from "@mantine/core"
import { AdjustmentsHorizontal, CirclePlus, Search } from "tabler-icons-react"
import Tabla from "../components/Tabla"
import { useEffect, useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import { getOneProducto } from "../controllers/productoController"
import ModalCompras from "../components/ModalCompras"
import { deleteCompra, comprasConProductos } from "../controllers/compraController"
import GraficoBarras from "../components/GraficoBarras"

const Compras = () => {
    const header = [
        "Id de la compra", "Fecha de compra", "Productos", "Valor total"
    ] // Encabezado de la tabla
    const [content, setContent] = useState([]) // Contenido de la tabla
    const [comprasC, setComprasC] = useState([]) // Lista de compras completa
    const [comprasdelMes, setComprasdelMes] = useState(0)
    const [comprasdelAño, setComprasdelAño] = useState(0)
    const [opened, handlers] = useDisclosure(false); // Manejo de estado del modal
    const [row, setRow] = useState({puesto: ''}) // Fila a editar
    const [rowD, setRowD] = useState(0) // Fila a eliminar

    const data = [
        { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
        { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
        { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
        { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
        { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
        { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
      ];
    const series = [
        { name: 'Smartphones', color: 'violet.6' },
        { name: 'Laptops', color: 'blue.6' },
        { name: 'Tablets', color: 'teal.6' }
    ]

    const setRowIndex = (data) => {
        setRow(comprasC[data])
        console.log(comprasC[data])
        handlers.open()
    }
   
    const openCreateModal = () => {
        setRow({puesto: ''})
        handlers.open()
    }

    const setRowDIndex = (data) => {
        deleteOneCompra(comprasC[data]['compraId'])
        setRowD(comprasC[data]['compraId'])
    }

    const deleteOneCompra = async (id) => {
        const deleteRes = await deleteCompra(id)
    }

    const getComprasList = async () => {
        const res = await comprasConProductos()

        await Promise.all(res.map(async (compra) => {
            compra['compras'] = Object.values(compra['productosEnCompra'])
            let valorTotal = 0
            let producto = ''
            let res = ''
            for (let i = 0; i < compra['compras'].length; i++) {
                res = await getOneProducto(compra['compras'][i].productoId)
                producto += `${res.productoNombre}, `
                valorTotal += compra['compras'][i].precioTotal
            }
            compra['productos'] = producto.slice(0, -2)
            compra['valorTotal'] = valorTotal
        }));
        
        setComprasC(res)
        console.log(res)
        let data = res.map((e) => Object.values(e))
        let contadorMes = 0;
        let contadorAño = 0;
        data.forEach((compra) => {
            compra.splice(2,2)
            const fechaC = new Date(compra[1])
            if (fechaC.getMonth() === new Date().getMonth()) {
                contadorMes++
            }
            if (fechaC.getFullYear() === new Date().getFullYear()) {
                contadorAño++
            }
            compra[1] = fechaC.toDateString()
        });
        setComprasdelMes(contadorMes)
        setComprasdelAño(contadorAño)
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
        getComprasList()
    }, [opened, rowD])
    return (
        <div style={{
            width: '100%',
            padding: '3vw',
        }}>
            <Container direction="column" size='xl' w='90vw' justify='center' align='center' >
                <Title ta='left' order={1} mb={10}>Compras</Title>
                <Group grow wrap="nowrap">
                <GraficoBarras data={data} dataKey={'month'} type={'stacked'} series={series}/>
                <Stack>
                    <Stack bg="#ECF2FF" justify="center" align="center" p={5} w="15rem">
                        <Image src="https://duralcor.es/wp-content/uploads/2021/10/servicio-de-almacenamiento-150x150.png" alt="Compras del mes" w="30%" h="30%"/>
                        <Title size='xs'>Compras del mes</Title>
                        <Title order={2}>{comprasdelMes}</Title>
                    </Stack>
                    <Stack bg="#E8F7FF" justify="center" align="center" p={5} w="15rem">
                        <Image src="https://duralcor.es/wp-content/uploads/2021/10/servicio-de-almacenamiento-150x150.png" alt="Compras del mes" w="30%" h="30%"/>
                        <Title size='xs'>Compras del año</Title>
                        <Title order={2}>{comprasdelAño}</Title>
                    </Stack>
                </Stack>
                </Group>
                <Group mt={10} mb={15} align='flex-start' justify='flex-start'>
                    <TextInput placeholder="Buscar un producto"  rightSection={<Search />} />
                    <Select placeholder="Ordenar por..." w='20%' rightSection={<AdjustmentsHorizontal />} data={[
                        {value: 'NOMBRE', label: 'Ordenar por nombre'},
                        {value: 'VALORM', label: 'Ordenar de mayor a menor por valor total en inventario'},
                        {value: 'VALOR', label: 'Ordenar de menor a mayor por valor total en inventario'},
                        {value: 'CANTIDADM', label: 'Ordenar de mayor a menor por cantidad en existencia'},
                        {value: 'CANTIDAD', label: 'Ordenar de menor a mayor por cantidad en existencia'},
                        ]} onChange={(_value, option) => ordenarTabla(_value)} />
                    <Button leftSection={<CirclePlus />} color="brown.9" onClick={openCreateModal}>Agregar producto</Button>
                </Group>
                <Tabla headers={header} content={content} row={setRowIndex} rowD={setRowDIndex} />
            </Container>
            <ModalCompras opened={opened} close={handlers.close} update={row.puesto !== '' ? true : false} updateInfo={row}  />
        </div>
    )
}

export default Compras
