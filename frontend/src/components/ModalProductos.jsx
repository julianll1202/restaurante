'use client'
import { Group, Modal, Button, Flex, Text,TextInput, NumberInput } from "@mantine/core";
import { DeviceFloppy } from "tabler-icons-react";
import { PropTypes } from 'prop-types';
import "../styles/ModalEmpleados.css";
import { createPuesto, getAllPuestosList } from '../controllers/puestoController';
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { createEmpleado, updateEmpleado } from "../controllers/empleadoControllers";
import { useInputState } from "@mantine/hooks";
import { createImagen } from "../controllers/imagenController";
import { DateTimePicker } from "@mantine/dates";

function ModalProductos ({opened, close, update, updateInfo}) {
    const [puestos, setPuestos] = useState([])
    const [puestosC, setPuestosC] = useState([])
    const [puesto, setPuesto] = useState('')
    const [newPuestoN, setNewPuestoN] = useInputState('')
    const [newSueldo, setNewSueldo] = useInputState(0)
    const [aciveTab, setActiveTab] = useState('seleccionar')
    const puestoIn = useRef()
    const [sueldo, setSueldo] = useState(0)
    const getPuestos = async() => {
        const lista = await getAllPuestosList()
        const list = lista.data.map((p) => Object.values(p))
        setPuestosC(list)
        const listaP = []
        list.forEach((puesto) => {
            const p = {
                "value": puesto[0].toString(),
                "label": puesto[1],
            }
            listaP.push(p)
        })
        setPuestos(listaP)
        console.log(list)
    }

    const getSueldo = (id) => {
        const salario = puestosC.find((p) => p[0] === Number(id))
        console.log(id)
        return salario[2]
    }

    const getPuestoId = (nombre) => {
        const id = puestosC.find((p) => p[1] === nombre)
        return id[0].toString()
    }

    const saveImage = async () => {
        const formData = new FormData()
        formData.append('image', file)
        const res = await createImagen(formData)
        return res
    }
    const form = useForm({
        initialValues: {
            nombre: '',
            cantidad: 0,
            cantidadMax: 0,
            fechaCaducidad: '',
        },
        validate: {
            nombre: (value) => (value === '' ? 'Nombre no válido': null),
            cantidadMax: (value) => (value < 0 ? 'El valor debe ser un entero positivo': null),
            cantidad: (value) => (value < 0 ? 'El valor debe ser un entero positivo': null),
        }
    })

    useEffect(() => {
        getPuestos()
        if (update) {
            form.setValues({
                nombre: updateInfo.empleadoNombre,
                paterno: updateInfo.paterno,
                materno: updateInfo.materno,
                telefono: updateInfo.telefono
            })
            console.log(getPuestoId(updateInfo.puesto))
            setPuesto(getPuestoId(updateInfo.puesto))
            setSueldo(Number(updateInfo.sueldo))
        } else {
            form.setValues({
                nombre: '',
                cantidad: 0,
                cantidadMax: 0,
                fechaCaducidad: '',
            })
            setSueldo(0)
            setPuesto('')
        }
    }, [updateInfo])



    const handleCreateEmpleado = async (values) => {
        form.validate()
        const img = await saveImage()
        if (img.status === 200) {
            const res = await createEmpleado(values.nombre, values.paterno, values.materno, values.telefono, Number(puesto), img.data.imagenId)
            if (res.status === 200) {
                console.log(res)
                close()
            }
        }
    }

    const handleUpdateEmpleado = async (values) => {
        console.log(file)
        form.validate()
        if (file !== null) {
            const img = await saveImage()
            console.log(img)
            if (img.status === 200) {
                updateInfo.imagenId = img.data.imagenId
            }
        }
        const res = await updateEmpleado(updateInfo.empleadoId, values.nombre, values.paterno, values.materno, values.telefono, Number(puesto), updateInfo.imagenId)
        if (res.status === 200) {
            close()
        }
    }

    const handleCreatePuesto = async () => {
        const res = await createPuesto(newPuestoN, newSueldo)
        if (res.status === 200) {
            setActiveTab('seleccionar')
            getPuestos()
            setPuesto(res.data.puestoNombre)
            setSueldo(Number(res.data.sueldo))
        }
    }
    return (
        <Modal.Root opened={opened} onClose={close} centered size="lg" closeOnClickOutside w={200} h={500}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title  fw="bold" ta="center" ml="auto">{ update ? 'Actualizar': 'Agregar' } producto</Modal.Title>
                    <Modal.CloseButton bg="gris" color="negro"></Modal.CloseButton>
                </Modal.Header>
                <Modal.Body>
                    { update ?
                        <form onSubmit={form.onSubmit(handleUpdateEmpleado)}>
                        <Flex direction="column" align="center" justify="center" gap={20}>
                            <Text fw="bold">Datos del producto</Text>
                            <TextInput {...form.getInputProps('nombre')} label="Nombre del producto" w='95%' />
                            <NumberInput {...form.getInputProps('cantidad')} label="Cantidad" w='95%' />
                            <NumberInput {...form.getInputProps('cantidadMax')} label="Cantidad máxima" w='95%' />
                            <DateTimePicker withSeconds label='Fecha de caducidad' popoverProps={{ zIndex: 10000 }}  />
                        </Flex>
                        <Group justify='center' align="center" mt={16}>
                            <Button type="submit" leftSection={<DeviceFloppy />} >Actualizar</Button>
                            <Button color="black" onClick={close}>Cancelar</Button>
                        </Group>
                        </form>
                    :
                        <form onSubmit={form.onSubmit(handleCreateEmpleado)}>
                        <Flex direction="column" align="center" justify="center" gap={20}>
                            <Text fw="bold">Datos del producto</Text>
                            <TextInput {...form.getInputProps('nombre')} label="Nombre del producto" w='95%' />
                            <NumberInput {...form.getInputProps('cantidad')} label="Cantidad" w='95%'  readOnly value={sueldo} />
                            <NumberInput {...form.getInputProps('cantidadMax')} label="Cantidad máxima" w='95%' />
                            <DateTimePicker withSeconds label='Fecha de caducidad' popoverProps={{ zIndex: 10000, withinPortal: true, width: '200px' }}  />
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
    );
}

ModalProductos.propTypes = {
    opened: PropTypes.bool,
    close: PropTypes.func,
    update: PropTypes.bool,
    updateInfo: PropTypes.object
};

export default ModalProductos;