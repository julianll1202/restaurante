'use client'
import { Group, Modal, Button, Flex, TextInput, NumberInput, Select } from "@mantine/core";
import { DeviceFloppy } from "tabler-icons-react";
import { PropTypes } from 'prop-types';
import "../styles/ModalEmpleados.css";
import { createContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import { createPropducto, updateProducto,  getAllProductos, getOneProducto } from "../controllers/productoController";
import { createCompra, updateCompra, getCompraPorId } from "../controllers/compraController";
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
    const [compraIdUpdate, setCompraIdUpdate] = useState(0)

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

    const getCompraInfo = async (updateInfo) => {
        let Productos;
        for(let key in updateInfo){
            if(key ==='compraId'){
                Productos  = await getCompraPorId(updateInfo[key])
            }
        }
        const precioProductos = await getAllProductos()
        let listaM = []
        precioProductos.forEach((productos) => {
            productos['precioP'] = Object.values(productos['productosEnCompra'])
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
                "precio": precio
            }
            listaM.push(m)
        })
        for(let i = 0; i < Productos.length; i++){
            for(let j = 0; j < listaM.length; j++){
                if(Productos[i].productoId === listaM[j].productoId){
                    Productos[i].precio = listaM[j].precio
                }
            }
        }
        setProductos(Productos)
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
            setCompraIdUpdate(updateInfo.compraId)
            getCompraInfo(updateInfo)
            form.setValues({
                fecha: new Date(updateInfo.fechaCompra)
            })
        } else {
            form.setValues({
                fecha: null
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

    const hadleUpdateCompra = async (values) => {
        if (form.validate()) {
            const res = await updateCompra(compraIdUpdate, values.fecha, total, productos)
            setProductos([])
            if (res.status === 200) {
                console.log(res)
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
                            <form onSubmit={form.onSubmit(hadleUpdateCompra)}>
                                <Flex direction="column" align="center" justify="center" gap={20}>
                                    <DateTimePicker {...form.getInputProps('fecha')} withSeconds label='Fecha de compra' valueFormat="YYYY-MM-DD hh:mm:ss"  w='95%'  />
                                    <Group>
                                        <Select label='Productos' data={listaProductos} onChange={(value, label) => setCurrentlySelected(Number(value))} />
                                        <Button onClick={addToList}>Agregar</Button>
                                    </Group>
                                    <ResumenCompra setTotalCompra={setTotal} productos={productos}/>
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