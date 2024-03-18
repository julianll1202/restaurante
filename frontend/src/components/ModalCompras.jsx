'use client'
import { Group, Modal, Button, Flex, TextInput, NumberInput, Select } from "@mantine/core";
import { DeviceFloppy } from "tabler-icons-react";
import { PropTypes } from 'prop-types';
import "../styles/ModalEmpleados.css";
import { createContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import { createPropducto, updateProducto,  getAllProductos } from "../controllers/productoController";
import { createCompra, updateCompra } from "../controllers/compraController";
import ResumenCompra from '../components/ResumenCompra';

export const listaProd = createContext({})
function ModalCompras ({opened, close, update, updateInfo}) {
    const [ fechaCad, setFechaCad ] = useState(null)
    const [ fechaCompra, setFechaCompra ] = useState(null)
    const [ productos, setProductos ] = useState([])
    const [ productosT, setProductosT ] = useState([])
    const [ listaProductos, setListaProductos ] = useState([])
    const [ currentlySelected, setCurrentlySelected ] = useState(0)
    const [total, setTotal] = useState(0)

    const getComprasList = async() => {
        const lista = await getAllProductos()
        const listaM = []
        setProductosT(lista)
        generateData(lista)
        lista.forEach((productos) => {
            productos['precioP'] = Object.values(productos['productosEnCompra'])
            console.log(productos)
            let precio = 0;
            if(productos['precioP'].length === 0){
                precio = 0;
            } else {
                precio = ((productos['precioP'][0].precioTotal)/(productos['precioP'][0].cantidad))
                precio = Math.round(precio*100)/100
            }
            if(isNaN(precio)) precio = 0
            const m = {
                "productoId": productos['productoId'],
                "nombreProducto": productos['productoNombre'],
                "precio": precio
            }
            listaM.push(m)
        })
        setProductosT(listaM)
    }

    const generateData = (lista) => {
        const listaP = []
        lista.forEach((p) => {
            const prod = {
                "value": p.productoId.toString(),
                "label": p.productoNombre
            }
            listaP.push(prod)
        })
        setListaProductos(listaP)
    }

    const form = useForm({
        initialValues: {
            fecha: null
        },
        validate: {
            fecha: (value) => (value === null ? 'Fecha no válida': null),
        }
    })

    useEffect(() => {
        if (update) {
            form.setValues({
                nombre: updateInfo.productoNombre,
                cantidad: updateInfo.cantidad,
                cantidadMax: updateInfo.cantidadMax,

            })
        } else {
            form.setValues({
                nombre: '',
                cantidad: 0,
                cantidadMax: 0,
            })
        }
    }, [updateInfo])

    useEffect(() => {  
        getComprasList()
    }, [opened])


    const addToList = () => {
        if(currentlySelected === 0){
            const producto = productosT.find((p) => p.productoId === currentlySelected)
            let lista = []
            if (listaProductos.length > 0) {
                lista = [...productos]
            }
            let existente = false
            lista.forEach((i) => {
                if (i.productoId === currentlySelected) {
                    i.cantidad += 1
                    existente = true
                }
            })
            if(!existente) {
                if(producto === undefined){
                    console.log('No se puede agregar un producto inexistente')
                    return;
                } else {
                    producto['cantidad'] = 1
                    lista.push(producto)
                }
            }
            console.log(lista)
            setProductos(lista)
        } else {
            const producto = productosT.find((p) => p.productoId === currentlySelected)
            let lista = []
            if (listaProductos.length > 0) {
                lista = [...productos]
            }
            let existente = false
            lista.forEach((i) => {
                if (i.productoId === currentlySelected) {
                    i.cantidad += 1
                    existente = true
                }
            })
            if(!existente) {
                if(producto === undefined){
                    console.log('No se puede agregar un producto inexistente')
                    return;
                } else {
                    producto['cantidad'] = 1
                    lista.push(producto)
                }
            }
            console.log(lista)
            setProductos(lista)
        }

    }
    const handleCreateCompra = async (values) => {
        const productosCompra = [...productos]
        productosCompra.forEach((p) => {
            delete p['nombreProducto']
            p['precioTotal'] = p['cantidad']*p['precio']
            delete p['precio']
        })
        console.log('hola')
        if (form.validate()) {
            const res = await createCompra(values.fecha, total, productos)
            setProductos([])
            if (res.status === 200) {
                console.log(res)
                close()
            }
        }
    }

    const handleUpdateProducto = async (values) => {
        if (form.validate()) {
            const res = await updateProducto(updateInfo.productoId, values.nombre, values.cantidad, values.cantidadMax, fechaCad)
            if (res.status === 200) {
                close()
            }
        }
    }

    return (
        <listaProd.Provider value={{productos, setProductos}}>
            <Modal.Root opened={opened} onClose={close} centered size="md" closeOnClickOutside w={200} h={500}>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title  fw="bold" ta="center" ml="auto">{ update ? 'Actualizar': 'Agregar' } compra</Modal.Title>
                        <Modal.CloseButton bg="gris" color="negro"></Modal.CloseButton>
                    </Modal.Header>
                    <Modal.Body>
                        { update ?
                            <form onSubmit={form.onSubmit(handleUpdateProducto)}>
                            <Flex direction="column" align="center" justify="center" gap={20}>
                                <TextInput {...form.getInputProps('nombre')} label="Nombre del producto" w='95%' />
                                <NumberInput {...form.getInputProps('cantidad')} label="Cantidad" w='95%' />
                                <NumberInput {...form.getInputProps('cantidadMax')} label="Cantidad máxima" w='95%' />
                                <DateTimePicker onChange={setFechaCad} withSeconds label='Fecha de caducidad' defaultValue={new Date(updateInfo.fechaCaducidad)} />
                            </Flex>
                            <Group justify='center' align="center" mt={16}>
                                <Button type="submit" leftSection={<DeviceFloppy />} >Actualizar</Button>
                                <Button color="black" onClick={close}>Cancelar</Button>
                            </Group>
                            </form>
                        :
                            <form onSubmit={form.onSubmit(handleCreateCompra)}>
                                <Flex direction="column" align="center" justify="center" gap={20}>
                                    <DateTimePicker {...form.getInputProps('fecha')} withSeconds label='Fecha de compra' valueFormat="YYYY-MM-DD hh:mm:ss"  w='95%'  />
                                    <Group>
                                        <Select label='Productos' data={listaProductos} onChange={(value, label) => setCurrentlySelected(Number(value))} />
                                        <Button onClick={addToList}>Agregar</Button>
                                    </Group>
                                    <ResumenCompra setTotalCompra={setTotal} productos={productos}/>
                                </Flex>
                                <Group justify='center' align="center" mt={16}>
                                    <Button type="submit" leftSection={<DeviceFloppy />} >Guardar</Button>
                                    <Button color="black" onClick={close}>Cancelar</Button>
                                </Group>
                            </form>
                        }
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
        </listaProd.Provider>
    );
}

ModalCompras.propTypes = {
    opened: PropTypes.bool,
    close: PropTypes.func,
    update: PropTypes.bool,
    updateInfo: PropTypes.object
};

export default ModalCompras;