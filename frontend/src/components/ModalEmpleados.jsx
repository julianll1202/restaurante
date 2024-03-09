'use client'
import { Group, Modal, Button, Flex, Text,TextInput, NumberInput, FileButton, Select, Image,
} from "@mantine/core";
import { DeviceFloppy } from "tabler-icons-react";
import { PropTypes } from 'prop-types';
import "../styles/ModalEmpleados.css";
import { getAllPuestosList } from './../controllers/puestoController';
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { createEmpleado } from "../controllers/empleadoControllers";

function ModalEmpleados ({opened, close}) {
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

    const getSueldo = () => {
        puestosC.forEach((puesto) => {
            if(puesto[1] === puestoIn.current.value) {
                setSueldo(Number(puesto[2]))
                console.log(puesto[2])
            }
        })
    }

    const getPuestoId = () => {
        puestosC.forEach((puesto) => {
            if(puesto[1] === puestoIn.current.value) {
                setPuesto(puesto[0])
            }
        })
    }

    const selectPuesto = () => {
        getPuestoId()
        getSueldo()
    }
    useEffect(() => {
        getPuestos()
    }, [])

    const form = useForm({
        initialValues: {
            nombre: '',
            paterno: '',
            materno: '',
            telefono: ''
        },
    })

    const handleCreateEmpleado = async (values) => {
        console.log
        const res = await createEmpleado(values.nombre, values.paterno, values.materno, values.telefono, puesto)
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
                    <Modal.Title  fw="bold" ta="center" ml="auto">Agregar empleado</Modal.Title>
                    <Modal.CloseButton bg="gris" color="negro"></Modal.CloseButton>
                </Modal.Header>
                <Modal.Body>
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
                            <Select label="Puesto" ref={puestoIn}  w='95%'  onChange={selectPuesto}  data={puestos}/>
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
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
}

ModalEmpleados.propTypes = {
    opened: PropTypes.bool,
    close: PropTypes.func,
};

export default ModalEmpleados;