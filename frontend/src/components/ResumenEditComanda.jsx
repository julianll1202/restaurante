import { Button, Container, Flex, Group, Select, Tabs, Text, Textarea } from "@mantine/core"
import { useContext, useEffect, useState } from "react"
import { getAllMesas } from "../controllers/mesaController"
import { useForm } from "@mantine/form"
import { getAllMeseros } from "../controllers/empleadoControllers"
import { updateComanda } from "../controllers/comandaController"
import { PropTypes } from 'prop-types';
import { comandaE} from './../views/EditarComanda';
import PlatilloEditLista from "./PlatilloEditLista"
import { useNavigate } from "react-router"
import { getAllClientes } from "../controllers/clienteController"
import { STORED_IMAGES_URL } from "../utils/constants"

const ResumenEditComanda = ({ update }) => {
    const [activeTab, setActiveTab] = useState('lista')
    const [mesas, setMesas] = useState([])
    const [clientes, setClientes] = useState([])
    const [meseros, setMeseros] = useState([])
    const { comandaEdit } = useContext(comandaE)
    const [subTotal, setSubTotal] = useState(0)
    const navigate =useNavigate()

    const getClientes = async() => {
        const lista = await getAllClientes()
        const list = lista.map((p) => Object.values(p))
        console.log(list)
        const listaM = []
        list.forEach((cliente) => {
            const m = {
                "value": cliente[0].toString(),
                "label": cliente[0] === 'Anonimo' ? cliente[0] : `${cliente[1]} ${cliente[2]}`,
            }
            listaM.push(m)
        })
        console.log(listaM)
        setClientes(listaM)
    }

    const getSubTotal = () => {
        let total = 0
        if (comandaEdit.platillosEnComanda) {
            console.log(comandaEdit.platillosEnComanda)
            comandaEdit.platillosEnComanda.forEach((p) => {
                if (p.platillo)
                    total += p.cantidad*p.platillo.precio
                else
                    total += p.cantidad*p.precio
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
    const actualizarComanda = async(values) => {
        console.log(values)
        const copyLista = [...comandaEdit.platillosEnComanda]
        copyLista.forEach((p) => {
            if (p.platillo) {
                p['platilloId'] = p['platillo']['platilloId']
                p['comandaId'] = comandaEdit.comandaId
                delete p['platillo']
            } else {
                p['comandaId'] = comandaEdit.comandaId
                delete p['precio']
                delete p['url']
            }
        })
        console.log(copyLista)
        if (form.validate()) {
            const res = await updateComanda(Number(comandaEdit.comandaId), Number(values.mesero),  Number(values.cliente), Number(values.mesa), (subTotal+(subTotal*0.16)), copyLista)
            if (res.status === 200) {
                console.log(res)
                navigate('/comandas')
            }
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
            cliente: comandaEdit.clienteId ? comandaEdit.clienteId.toString() : '0'
        },
        validate: {
            mesa: (value) => ((value === '0' || value === null) ? 'Seleccione una mesa': null),
            mesero: (value) => ((value === '0' || value === null) ? 'Seleccione un mesero': null),
            cliente: (value) => ((value === '0' || value === null) ? 'Seleccione un cliente': null),
            fecha: (value) => ((new Date(value).getTime() < (new Date().getTime()-600000)) ? 'La fecha debe ser a partir de hoy' : null)
        }
    })

    const getSelectInfo = () => {
        getMesas()
        getMeseros()
        getClientes()
    }
    useEffect(() => {
        getSelectInfo()
        if (update) {
            form.setValues({
                mesa: comandaEdit.mesaId ? comandaEdit.mesaId.toString() : '0',
                mesero: comandaEdit.empleadoId ? comandaEdit.empleadoId.toString() : '0',
                cliente: comandaEdit.clienteId ? comandaEdit.clienteId.toString() : '0'
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
                        { comandaEdit.platillosEnComanda ?
                        comandaEdit.platillosEnComanda.map((item, index) => {
                            console.log(item)
                            return (<PlatilloEditLista cantidad={item.cantidad} nombre={item.platillo ? `${item.platillo.platilloNombre}` : item.nombre} id={item.platillo ? item.platillo.platilloId : item.platilloId} precio={item.platillo ? item.platillo.precio : item.precio} imagen={item.platillo ? `${STORED_IMAGES_URL}${item.platillo.imagen.url}` : item.url} key={index} />)
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
                    <form onSubmit={form.onSubmit(actualizarComanda)}>
                        <Select ta='left' label='Mesero' w='100%' styles={{
                            label: {
                                fontWeight: 'bold',
                                textAlign: 'left'
                            }}}  data={meseros} {...form.getInputProps('mesero')}  />
                        <Select ta='left' label='Cliente' w='100%' styles={{
                            label: {
                                fontWeight: 'bold',
                                textAlign: 'left'
                            }}}  data={clientes} {...form.getInputProps('cliente')}  />
                        <Group w='100%' mt={10} mb={10}>
                            <Select styles={{
                            label: {
                                fontWeight: 'bold',
                                textAlign: 'left'
                            }}} leftSection='#'  ta='left' data={mesas} {...form.getInputProps('mesa')}  label='Mesa' w='30%' />
                        </Group>
                        <Textarea ta='left' styles={{
                            label: {
                                fontWeight: 'bold',
                                textAlign: 'left'
                            }
                        }} label='Notas adicionales' />
                        <Button mt={10} type="submit" w='100%'>Actualizar</Button>

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