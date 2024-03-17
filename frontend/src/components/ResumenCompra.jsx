import { Button, Container, Flex, Group, Select, Tabs, Text, Textarea } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { useEffect, useState } from "react"
import { Calendar } from "tabler-icons-react"
import { getAllMesas } from "../controllers/mesaController"
import { useForm } from "@mantine/form"
import { getAllMeseros } from "../controllers/empleadoControllers"
import ProductoEnLista from './ProductoEnLista';

const ResumenCompra = ({productos}) => {
    const [activeTab, setActiveTab] = useState('lista')
    const [mesas, setMesas] = useState([])
    const [meseros, setMeseros] = useState([])

    const getMesas = async() => {
        const lista = await getAllMesas()
        const list = lista.map((p) => Object.values(p))
        console.log(list)
        const listaM = []
        list.forEach((mesa) => {
            const m = {
                "value": mesa[0].toString(),
                "label": mesa[0].toString(),
            }
            listaM.push(m)
        })
        setMesas(listaM)
    }
    const crearComanda = (values) => {
        console.log(values)
        form.validate()
    }
    const getMeseros = async() => {
        const lista = await getAllMeseros()
        const list = lista.map((p) => Object.values(p))
        console.log(list)
        const listaM = []
        list.forEach((mesero) => {
            const m = {
                "value": mesero[0].toString(),
                "label": `${mesero[1]} ${mesero[2]}`,
            }
            listaM.push(m)
        })
        console.log(listaM)
        setMeseros(listaM)
    }

    const form = useForm({
        initialValues: {
            mesero: '0',
            mesa: '0',
            fecha: null,
        },
        validate: {
            mesa: (value) => ((value === '0' || value === null) ? 'Seleccione una mesa': null),
            mesero: (value) => ((value === '0' || value === null) ? 'Seleccione un mesero': null),
            fecha: (value) => ((new Date(value).getTime() < (new Date().getTime()-600000)) ? 'La fecha debe ser a partir de hoy' : null)
        }
    })

    const getSelectInfo = () => {
        getMesas()
        getMeseros()
    }
    useEffect(() => {
        getSelectInfo()
    }, [])
    return (
        <Container size='sm' w={450} m='10px 50px' p={15} style={{
            border: '2px solid #D9D9D9',
            borderRadius: '20px',
        }}>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List mb={25}>
                    <Tabs.Tab value="lista" color="orange">Lista</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="lista">
                    <Flex direction='column'>
                        <ProductoEnLista />
                    </Flex>
                    <Container bg="#17C653" p='10px 15px' pb={0} style={{
                        borderRadius: '20px'
                    }}>
                        <Group justify="space-between">
                            <Text fw='bold' c="white">Subtotal</Text>
                            <Text fw='bold' c="white">$00.00</Text>
                        </Group>
                        <Group justify="space-between">
                            <Text fz='2.2rem' fw='bold' c="white">Total</Text>
                            <Text fz='2.2rem' fw='bold' c="white">$00.00</Text>
                        </Group>
                    </Container>
                </Tabs.Panel>
            </Tabs>
        </Container>
    )
}

ResumenCompra.propTypes = {
    productos: PropTypes.array
}

export default ResumenCompra