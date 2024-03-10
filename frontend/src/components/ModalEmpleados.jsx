'use client'
import { Group, Modal, Button, Flex, Text,TextInput, NumberInput, FileButton, Select, Image,
} from "@mantine/core";
import { DeviceFloppy } from "tabler-icons-react";
import { PropTypes } from 'prop-types';
import "../styles/ModalEmpleados.css";
import { getAllPuestosList } from './../controllers/puestoController';
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { createEmpleado, updateEmpleado } from "../controllers/empleadoControllers";

function ModalEmpleados ({opened, close, update, updateInfo}) {
    const [puestos, setPuestos] = useState([])
    const [puestosC, setPuestosC] = useState([])
    const [puesto, setPuesto] = useState('')
    const puestoIn = useRef()
    const [sueldo, setSueldo] = useState(0)
    const [file, setFile] = useState(null);
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

    const form = useForm({
        initialValues: {
            nombre: '',
            paterno: '',
            materno: '',
            telefono: ''
        },
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
                paterno: '',
                materno: '',
                telefono: ''
            })
            setSueldo(0)
        }
    }, [updateInfo])



    const handleCreateEmpleado = async (values) => {
        const res = await createEmpleado(values.nombre, values.paterno, values.materno, values.telefono, Number(puesto))
        if (res.status === 200) {
            console.log(res)
            close()
        }
    }

    const handleUpdateEmpleado = async (values) => {
        console.log(values)
        const res = await updateEmpleado(updateInfo.empleadoId, values.nombre, values.paterno, values.materno, values.telefono, Number(puesto))
        if (res.status === 200) {
            console.log(res)
            close()
        }
    }

    return (
        <Modal.Root opened={opened} onClose={close} centered size="xl" closeOnClickOutside w={200} h={500}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title  fw="bold" ta="center" ml="auto">{ update ? 'Actualizar': 'Agregar' } empleado</Modal.Title>
                    <Modal.CloseButton bg="gris" color="negro"></Modal.CloseButton>
                </Modal.Header>
                <Modal.Body>
                    { update ?
                        <form onSubmit={form.onSubmit(handleUpdateEmpleado)}>
                        <Flex direction="row" align="flex-start" justify="center" gap={20}>
                            <Flex direction="column" className="datos" w="45%">
                                <Text fw="bold">Datos personales</Text>
                                <TextInput {...form.getInputProps('nombre')} label="Nombre" w='95%' />
                                <Group>
                                    <TextInput {...form.getInputProps('paterno')} label="Apellido paterno" w='45%'  />
                                    <TextInput {...form.getInputProps('materno')} label="Apellido materno" w='45%'  />
                                </Group>
                                <TextInput {...form.getInputProps('telefono')} label="Número de teléfono"  w='95%'  />
                                <Select label="Puesto" ref={puestoIn}  w='95%' defaultValue={puesto}  onChange={(value, option) => {
                                    setPuesto(value)
                                    setSueldo(getSueldo(value))
                                }}  data={puestos}/>
                                <NumberInput label="Sueldo" w='95%'  readOnly value={sueldo} />
                            </Flex>
                            <Flex direction="column" className="datos" w="45%">
                                <Text fw="bold">Foto de perfil</Text>
                                <Group>
                                    <Image src={file ? URL.createObjectURL(file) : null} radius='md' w={150} h={150}  />
                                    <FileButton onChange={setFile} accept="image/png,image/jpeg">
                                        {(props) => <Button color="brown.9" {...props}>Subir imagen</Button>}
                                    </FileButton>
                                </Group>
                            </Flex>
                        </Flex>
                        <Group justify='center' align="center" mt={16}>
                            <Button type="submit" leftSection={<DeviceFloppy />} >Actualizar</Button>
                            <Button color="black" onClick={close}>Cancelar</Button>
                        </Group>
                        </form>
                    :
                        <form onSubmit={form.onSubmit(handleCreateEmpleado)}>
                        <Flex direction="row" align="flex-start" justify="center" gap={20}>
                            <Flex direction="column" className="datos" w="45%">
                                <Text fw="bold">Datos personales</Text>
                                <TextInput {...form.getInputProps('nombre')} label="Nombre" w='95%' />
                                <Group>
                                    <TextInput {...form.getInputProps('paterno')} label="Apellido paterno" w='45%'  />
                                    <TextInput {...form.getInputProps('materno')} label="Apellido materno" w='45%'  />
                                </Group>
                                <TextInput {...form.getInputProps('telefono')} label="Número de teléfono"  w='95%'  />
                                <Select label="Puesto" ref={puestoIn}  w='95%'  onChange={(value, option) => {
                                    setPuesto(value)
                                    setSueldo(getSueldo(value))
                                }}  data={puestos}/>
                                <NumberInput label="Sueldo" w='95%'  readOnly value={sueldo} />
                            </Flex>
                            <Flex direction="column" className="datos" w="45%">
                                <Text fw="bold">Foto de perfil</Text>
                                <Group>
                                    <Image src={file ? URL.createObjectURL(file) : null} radius='md' w={150} h={150}  />
                                    <FileButton onChange={setFile} accept="image/png,image/jpeg">
                                        {(props) => <Button color="brown.9" {...props}>Subir imagen</Button>}
                                    </FileButton>
                                </Group>
                            </Flex>
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

ModalEmpleados.propTypes = {
    opened: PropTypes.bool,
    close: PropTypes.func,
    update: PropTypes.bool,
    updateInfo: PropTypes.object
};

export default ModalEmpleados;