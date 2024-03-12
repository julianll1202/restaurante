'use client'
import { Group, Modal, Button, Flex, TextInput, NumberInput } from "@mantine/core";
import { DeviceFloppy } from "tabler-icons-react";
import { PropTypes } from 'prop-types';
import "../styles/ModalEmpleados.css";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import { createPropducto, updateProducto } from "../controllers/productoController";

function ModalProductos ({opened, close, update, updateInfo}) {
    const [ fechaCad, setFechaCad ] = useState(null)
    const form = useForm({
        initialValues: {
            nombre: '',
            cantidad: 0,
            cantidadMax: 0,
        },
        validate: {
            nombre: (value) => (value === '' ? 'Nombre no válido': null),
            cantidadMax: (value) => (value < 0 ? 'El valor debe ser un entero positivo': null),
            cantidad: (value) => (value < 0 ? 'El valor debe ser un entero positivo': null),
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



    const handleCreateProducto = async (values) => {
        console.log(fechaCad)
        if (form.validate()) {
            const res = await createPropducto(values.nombre, values.cantidad, values.cantidadMax, fechaCad)
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
        <Modal.Root opened={opened} onClose={close} centered size="md" closeOnClickOutside w={200} h={500}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title  fw="bold" ta="center" ml="auto">{ update ? 'Actualizar': 'Agregar' } producto</Modal.Title>
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
                        <form onSubmit={form.onSubmit(handleCreateProducto)}>
                        <Flex direction="column" align="center" justify="center" gap={20}>
                            <TextInput {...form.getInputProps('nombre')} label="Nombre del producto" w='95%' />
                            <NumberInput {...form.getInputProps('cantidad')} label="Cantidad" w='95%' />
                            <NumberInput {...form.getInputProps('cantidadMax')} label="Cantidad máxima" w='95%' />
                            <DateTimePicker withSeconds label='Fecha de caducidad' valueFormat="YYYY-MM-DD hh:mm:ss" onChange={setFechaCad} w='95%'  />
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