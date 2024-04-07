import { Button, Group, Title, Stack, TextInput, Checkbox, Box } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllMesas, deleteMesa, createMesa, updateMesa } from "../controllers/mesaController"
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

const MesasCRUD = () => {
    const [content, setContent] = useState([])
    const getMesasList = async () => {
        const res = await getAllMesas()
        setContent(res)
    }
    const navigate = useNavigate();
    const cambioRuta = async (mesaId) => {
        navigate('/comandas', {
            state: {
              mesaId: mesaId
            }
          });
    }

    const deleteMesaByID = async (mesaId) => {
        const res = await deleteMesa(mesaId)
    }

    const createMesaByData = async (values) => {
        form.validate()
        const res = await createMesa(values.capacidad, values.ubicacion, values.tipoMesa)
        if(res.status === 200) {
            console.log(res)
        }
    }

    const updateMesaByData = async (mesaId, capacidad, ubicacion, tipoMesa, ocupada) => {
        if(ocupada == 'true') {
            ocupada = true
        } else {
            ocupada = false
        }
        form.setValues({
            mesaId: mesaId,
            capacidad: capacidad,
            ubicacion: ubicacion,
            tipoMesa: tipoMesa,
            ocupada: ocupada,
        })
    }

    const updateMesaData = async (values) => {
        form.validate()
        const res = await updateMesa(values.mesaId, values.capacidad, values.ubicacion, values.tipoMesa, values.ocupada)
        if(res.status === 200) {
            console.log(res)
        }
    }

    const form = useForm({
        initialValues: {
            mesaId: '',
            capacidad: '',
            ubicacion: '',
            tipoMesa: '',
            ocupada: false,
        },
        validate: {
            capacidad: (value) => (value === '' ? 'Capacidad no válida': null),
            ubicacion: (value) => (value === '' ? 'Ubicación no válida': null),
            tipoMesa: (value) => (value === '' ? 'Tipo de mesa no válida': null),
        }
      });

    useEffect(() => {
        getMesasList()
    })
    return (
        <Stack gap="lg" align="flex-start" justify="center" w="100%" bg="white" p="3vw">
            <Title>Mesas</Title>
            <Group gap={48} justify="flex-start" w="100%" bg="white">
            {
                content.map((mesa, index) => {
                    {
                        if (mesa.ocupada == 'true') {
                            return (
                                <Button size="1.6rem" h="10rem" w="13rem" key={index} disabled>Mesa {mesa.mesaId} <br/> {mesa.capacidad} asientos</Button>
                            )
                        } else {
                            return (
                                <Group>
                                <Button onClick={async () => deleteMesaByID(mesa.mesaId)}>X</Button>
                                <Button size="1.6rem" h="10rem" w="13rem" onClick={async () => updateMesaByData(mesa.mesaId, mesa.capacidad, mesa.ubicacion, mesa.tipoMesa, mesa.ocupada)} key={index}>Mesa {mesa.mesaId} <br/> {mesa.capacidad} asientos</Button>
                                </Group>
                            )
                        
                        }
                    }
                })
            }
            </Group>
    <Box maw={340} mx="auto">
        <form onSubmit={form.values.mesaId === '' ? form.onSubmit(createMesaByData) : form.onSubmit(updateMesaData)}>
      <TextInput
          withAsterisk
          label="mesaId"
          placeholder="0"
          {...form.getInputProps('mesaId')}
          disabled={true}
        />

        <TextInput
          withAsterisk
          label="Capacidad"
          placeholder="1"
          {...form.getInputProps('capacidad')}
        />
        <TextInput
          withAsterisk
          label="Ubicación"
          placeholder="Atras"
          {...form.getInputProps('ubicacion')}
        />
        <TextInput
          withAsterisk
          label="Tipo de mesa"
          placeholder="Grande"
          {...form.getInputProps('tipoMesa')}
        />
        <Checkbox
          mt="md"
          label="Ocupada"
          {...form.getInputProps('ocupada', { type: 'checkbox' })}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
        </Stack>
    )
}

export default MesasCRUD
