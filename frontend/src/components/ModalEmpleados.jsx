'use client'
import { Group, Modal, Button, Flex, Text,TextInput, NumberInput, FileButton, Select, Image,
} from "@mantine/core";
import { DeviceFloppy } from "tabler-icons-react";
import { PropTypes } from 'prop-types';
import "../styles/ModalEmpleados.css";
import { getAllPuestosList } from './../controllers/puestoController';
import { useEffect, useRef, useState } from "react";


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

    return (
        <Modal.Root opened={opened} onClose={close} centered size="xl" closeOnClickOutside w={200} h={500}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title  fw="bold" ta="center" ml="auto">Agregar empleado</Modal.Title>
                    <Modal.CloseButton bg="gris" color="negro"></Modal.CloseButton>
                </Modal.Header>
                <Modal.Body>
                    <Flex direction="row" align="flex-start" justify="center" gap={20}>
                        <Flex direction="column" className="datos" w="45%">
                            <Text fw="bold">Datos personales</Text>
                            <TextInput label="Nombre" w='95%' />
                            <Group>
                                <TextInput label="Apellido paterno" w='45%'  />
                                <TextInput label="Apellido materno" w='45%'  />
                            </Group>
                            <TextInput label="Número de teléfono"  w='95%'  />
                            <Select label="Puesto" ref={puestoIn}  w='95%'  onChange={selectPuesto}  data={puestos}/>
                            <NumberInput label="Sueldo" w='95%' value={sueldo} />
                        </Flex>
                        <Flex direction="column" className="datos" w="45%">
                            <Text fw="bold">Foto de perfil</Text>
                            <Group>
                                <Image src={URL.createObjectURL(file)} radius='md' w={150} h={150}  />
                                <FileButton onChange={setFile} accept="image/png,image/jpeg">
                                    {(props) => <Button color="brown.9" {...props}>Subir imagen</Button>}
                                </FileButton>
                            </Group>
                        </Flex>
                    </Flex>
                    <Group justify='center' align="center" mt={16}>
                        <Button leftSection={<DeviceFloppy />}  onClick={close}>Guardar</Button>
                        <Button color="black" onClick={close}>Cancelar</Button>
                    </Group>
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