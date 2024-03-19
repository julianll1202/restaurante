import { Button, Container, Flex, Group, Select, Tabs, Text, Textarea } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { useContext, useEffect, useState } from "react"
import { Calendar } from "tabler-icons-react"
import { getAllMesas } from "../controllers/mesaController"
import { useForm } from "@mantine/form"
import { getAllMeseros } from "../controllers/empleadoControllers"
import PlatilloEnLista from './PlatilloEnLista';
import { createComanda } from "../controllers/comandaController"
import { PropTypes } from 'prop-types';
import { comandaE} from './../views/EditarComanda';

const ResumenEditComanda = ({ update }) => {
    const [activeTab, setActiveTab] = useState('lista')
    const [mesas, setMesas] = useState([])
    const [meseros, setMeseros] = useState([])
    const { comandaEdit } = useContext(comandaE)
    const [subTotal, setSubTotal] = useState(0)

    const getSubTotal = () => {
        let total = 0
        if (comandaEdit) {
            comandaEdit.platillosEnComanda.forEach((p) => {
                total += p.cantidad*p.platillo.precio
            })
        }
        setSubTotal(total)
    }

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
    const crearComanda = async(values) => {
        console.log(values)
        const copyLista = [...comandaEdit.platillosEnComanda]
        copyLista.forEach((p) => {
            delete p['platilloNombre']
            delete p['platillo']['precio']
            delete p['platillo']['imagen']['url']
        })
        if (form.validate()) {
            const res = await createComanda(Number(values.mesero), Number(values.mesa), (subTotal+(subTotal*0.16)), copyLista)
            console.log(res)
        }
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
        if (update) {
            form.setValues({
                mesa: comandaEdit.mesaId,
                mesero: comandaEdit.empleadoId,
            })
        }
    }, [])

    useEffect(() => {
        getSubTotal()
    }, [comandaEdit])
    return (
        <Container size='sm' w={500} m='10px 50px' p={15} style={{
            border: '2px solid #D9D9D9',
            borderRadius: '20px',
        }}>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List mb={25}>
                    <Tabs.Tab value="lista" color="orange">Lista</Tabs.Tab>
                    <Tabs.Tab value="comanda" color="orange">Comanda</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="lista">
                    <Flex direction='column'>
                        { comandaEdit ?
                        comandaEdit.platillosEnComanda.map((item, index) => {
                            return (<PlatilloEnLista cantidad={item.cantidad} nombre={item.platillo.platilloNombre} id={item.platillo.platilloId} precio={item.platillo.precio} imagen={item.platillo.imagen.url} key={index} />)
                        }): null}

                    </Flex>
                    <Container bg="#17C653" p='10px' pb={0} style={{
                        borderRadius: '20px'
                    }}>
                        <Group justify="space-between">
                            <Text fw='bold' c="white">Subtotal</Text>
                            <Text fw='bold' c="white">${subTotal}</Text>
                        </Group>
                        <Group justify="space-between">
                            <Text fw='bold' c="white">IVA (16%)</Text>
                            <Text fw='bold' c="white">${subTotal*0.16}</Text>
                        </Group>
                        <Group justify="space-between">
                            <Text fz='2.2rem' fw='bold' c="white">Total</Text>
                            <Text fz='2.2rem' fw='bold' c="white">${subTotal+(subTotal*0.16)}</Text>
                        </Group>
                    </Container>
                </Tabs.Panel>
                <Tabs.Panel value="comanda">
                    <form onSubmit={form.onSubmit(crearComanda)}>
                        <Select ta='left' label='Mesero' w='100%' styles={{
                            label: {
                                fontWeight: 'bold',
                                textAlign: 'left'
                            }}} data={meseros} {...form.getInputProps('mesero')}  />
                        <Group w='100%' mt={10} mb={10}>
                            <Select styles={{
                            label: {
                                fontWeight: 'bold',
                                textAlign: 'left'
                            }}} leftSection='#' ta='left' data={mesas} {...form.getInputProps('mesa')}  label='Mesa' w='30%' />
                        </Group>
                        <Textarea ta='left' styles={{
                            label: {
                                fontWeight: 'bold',
                                textAlign: 'left'
                            }
                        }} label='Notas adicionales' />
                        <Button mt={10} type="submit" w='100%'>Crear</Button>

                    </form>
                </Tabs.Panel>
            </Tabs>
        </Container>
    )
}

ResumenEditComanda.propTypes = {
    update: PropTypes.bool
}

export default ResumenEditComanda