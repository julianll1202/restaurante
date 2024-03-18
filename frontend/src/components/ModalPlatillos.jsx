'use client'
import { Group, Modal, Button, Flex, Text,TextInput, NumberInput, FileButton, Select, Image, Tabs,
} from "@mantine/core";
import { DeviceFloppy } from "tabler-icons-react";
import { PropTypes } from 'prop-types';
import "../styles/ModalEmpleados.css";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { createPlatillo, updatePlatillo } from "../controllers/platilloController"
import { getAllCategorias, createCategoria } from "./../controllers/categoriaController"
import { useInputState } from "@mantine/hooks";
import { createImagen, getCatImagenes } from "../controllers/imagenController";
import { STORED_IMAGES_URL } from "../utils/constants";

function ModalPlatillos ({opened, close, update, updateInfo}) {
    const [categorias, setCategorias] = useState([])
    const [categoriasC, setCategoriasC] = useState([])
    const [categoria, setCategoria] = useState('')
    const [newCategoriaN, setNewCategoriaN] = useInputState('')
    const [newCategoriaDesc, setNewCategoriaDesc] = useInputState('')
    const [aciveTab, setActiveTab] = useState('seleccionar')
    const categoriaIn = useRef()
    const [file, setFile] = useState(null);
    const [fileCategoria, setFileCategoria] = useState(null);
    const [imgCategoria, setImgCategoria] = useState([])
    const [imgList, setImgList] = useState([])
    const [imgForCat, setImgForCat] = useState(0)

    const getCategoriaImagenes = async() => {
        const lista = await getCatImagenes()
        const list = lista.data.map((p) => Object.values(p))
        setImgList(list)
        const listaI = []
        list.forEach((c) =>{
            const img = {
                "value":c[0].toString(),
                "label":`Imagen ${c[0].toString()}`
            }
            listaI.push(img)
        })
        setImgCategoria(listaI)
    }
    const getCategorias = async() => {
        const lista = await getAllCategorias()
        const list = lista.data.map((p) => Object.values(p))
        setCategoriasC(list)
        const listaP = []
        list.forEach((categoria) => {
            const p = {
                "value": categoria[0].toString(),
                "label": categoria[1],
            }
            listaP.push(p)
        })
        setCategorias(listaP)
        console.log(list)
    }

    const findImagen = (id) => {
        setImgForCat(Number(id))
        const url = imgList.find((img) => img[0] === Number(id))
        console.log(imgList)
        setFileCategoria(url[2])
    }

    const saveImage = async () => {
        const formData = new FormData()
        formData.append('image', file)
        const res = await createImagen(formData)
        return res
    }


    const form = useForm({
        initialValues: {
            platilloNombre: '',
            descripcion: '',
            precio: '',
            categoria: '0',
        },
        validate: {
            platilloNombre: (value) => (value === '' ? 'Nombre no válido': null),
            descripcion: (value) => (value === '' ? 'Descripción no válida': null),
            precio: (value) => (value === '' ? 'Precio no válido': null)
        }
    })

    useEffect(() => {
        getCategorias()
        getCategoriaImagenes()
        if (update) {
            form.setValues({
                platilloNombre: updateInfo.platilloNombre,
                descripcion: updateInfo.descripcion,
                precio: updateInfo.precio,
                categoria: updateInfo.categoriaId.toString()
            })
            console.log(updateInfo)
            setCategoria(updateInfo.categoriaId)
            // setCategoria(getCategoriaId(updateInfo.categoria))
        } else {
            form.setValues({
                platilloNombre: '',
                descripcion: '',
                precio: '',
                categoria: '0'
            })
            setFile(null)
            setFileCategoria(null)
        }

        setFile(null)
        setFileCategoria(null)
    }, [updateInfo])



    const handleCreatePlatillo = async (values) => {
        form.validate()
        const img = await saveImage()
        if (img.status === 200) {
            const res = await createPlatillo(values.platilloNombre, values.descripcion, values.precio, Number(categoria), img.data.imagenId)
            if (res.status === 200) {
                console.log(res)
                close()
            }
        }
    }

    const handleUpdatePlatillo = async (values) => {
        form.validate()
        if (file !== null) {
            const img = await saveImage()
            if (img.status === 200) {
                updateInfo.imagenId = img.data.imagenId
            }
        }
        console.log(updateInfo)
        const res = await updatePlatillo(updateInfo.platilloId, values.platilloNombre, values.descripcion, values.precio, Number(categoria), updateInfo.imagenId)
        if (res.status === 200) {
            close()
        }
    }

    const handleCreateCategoria = async () => {
        if (fileCategoria) {
            const res = await createCategoria(newCategoriaN, newCategoriaDesc, imgForCat)
            if (res.status === 200) {
                getCategorias()
                setCategoria(res.data.categoriaNombre)
                setActiveTab('seleccionar')
            }
        }
    }
    
    return (
        <Modal.Root opened={opened} onClose={close} centered size="xl" closeOnClickOutside w={200} h={500}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title  fw="bold" ta="center" ml="auto">{ update ? 'Actualizar': 'Agregar' } platillo</Modal.Title>
                    <Modal.CloseButton bg="gris" color="negro"></Modal.CloseButton>
                </Modal.Header>
                <Modal.Body>
                    { update ?
                        <form onSubmit={form.onSubmit(handleUpdatePlatillo)}>
                        <Flex direction="row" align="flex-start" justify="center" gap={20}>
                            <Flex direction="column" w="45%">
                                <Text fw="bold">Información del platillo</Text>
                                <TextInput {...form.getInputProps('platilloNombre')} label="Nombre" w='95%' />
                                <TextInput {...form.getInputProps('descripcion')} label="Descripción" w='95%' />
                                <NumberInput {...form.getInputProps('precio')} label="Precio" w='95%' />
                                <Tabs value={aciveTab} onChange={setActiveTab} >
                                    <Tabs.List>
                                        <Tabs.Tab value="seleccionar" >Seleccionar categoría</Tabs.Tab>
                                        <Tabs.Tab value="crear" >Crear categoría</Tabs.Tab>
                                    </Tabs.List>
                                    <Tabs.Panel value="seleccionar">
                                        <Select label="Categoria" ref={categoriaIn}  w='95%' {...form.getInputProps('categoria')}  onChange={(value, option) => {
                                            setCategoria(value)
                                        }}  data={categorias}/>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="crear">
                                        <TextInput name="categoriaNombre" onChange={setNewCategoriaN}  label="Nombre de la categoría" w='95%' />
                                        <TextInput name="descripcion" onChange={setNewCategoriaDesc}  label="Descripción de la categoría" w='95%' />
                                        <Group mb={10} align="center">
                                            <Select label='Imagenes' w='45%' data={imgCategoria} onChange={(value, option) => findImagen(value) }  />
                                            <Image src={fileCategoria ? `${STORED_IMAGES_URL}${fileCategoria}`: null }radius='md' mt={10} w={80} h={80}  />
                                        </Group>
                                        <Button mt={10} onClick={handleCreateCategoria} >Crear categoría</Button>
                                    </Tabs.Panel>
                                </Tabs>
                            </Flex>
                            <Flex direction="column" w="45%">
                                <Text fw="bold">Imagen para el platillo</Text>
                                <Group mb={10}>
                                    <Image src={file ? URL.createObjectURL(file) : `${STORED_IMAGES_URL}${updateInfo.imagen.url}`} radius='md' w={150} h={150}  />
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
                        <form onSubmit={form.onSubmit(handleCreatePlatillo)}>
                        <Flex direction="row" align="flex-start" justify="center" gap={20}>
                            <Flex direction="column" w="45%">
                                <Text fw="bold">Información del platillo</Text>
                                <TextInput {...form.getInputProps('platilloNombre')} label="Nombre" w='95%' />
                                <TextInput {...form.getInputProps('descripcion')} label="Descripción" w='95%' />
                                <NumberInput {...form.getInputProps('precio')} label="Precio" w='95%' />
                                <Tabs value={aciveTab} onChange={setActiveTab} >
                                    <Tabs.List>
                                        <Tabs.Tab value="seleccionar" >Seleccionar categoría</Tabs.Tab>
                                        <Tabs.Tab value="crear" >Crear categoría</Tabs.Tab>
                                    </Tabs.List>
                                    <Tabs.Panel value="seleccionar">
                                        <Select label="Categoria" ref={categoriaIn}  w='95%' {...form.getInputProps('categoria')} onChange={(value, option) => {
                                            setCategoria(value)
                                        }}  data={categorias}/>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="crear">
                                        <TextInput name="categoriaNombre" onChange={setNewCategoriaN}  label="Nombre de la categoría" w='95%' />
                                        <TextInput name="descripcion" onChange={setNewCategoriaDesc}  label="Descripción de la categoría" w='95%' />
                                        <Group mb={10} align="center">
                                            <Select label='Imagenes' w='45%' data={imgCategoria} onChange={(value, option) => findImagen(value) }  />
                                            <Image src={fileCategoria ? `${STORED_IMAGES_URL}${fileCategoria}`: null }radius='md' mt={10} w={80} h={80}  />
                                        </Group>
                                        <Button mt={10} onClick={handleCreateCategoria} >Crear categoría</Button>
                                    </Tabs.Panel>
                                </Tabs>
                            </Flex>
                            <Flex direction="column" w="45%">
                                <Text fw="bold">Imagen para el platillo</Text>
                                <Group mb={10}>
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

ModalPlatillos.propTypes = {
    opened: PropTypes.bool,
    close: PropTypes.func,
    update: PropTypes.bool,
    updateInfo: PropTypes.object
};

export default ModalPlatillos;