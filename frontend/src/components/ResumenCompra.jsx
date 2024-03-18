import { Button, Container, Flex, Group, Select, Tabs, Text, Textarea } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { useEffect, useState } from "react"
import { Calendar } from "tabler-icons-react"
import { getAllMesas } from "../controllers/mesaController"
import { useForm } from "@mantine/form"
import { getAllMeseros } from "../controllers/empleadoControllers"
import ProductoEnLista from './ProductoEnLista';
import { PropTypes } from 'prop-types';

const ResumenCompra = ({productos}) => {
    const [activeTab, setActiveTab] = useState('lista')
    const [dataFromChild, setDataFromChild] = useState({})
    const [total, setTotal] = useState(0)
    
    const handleDataFromChild = async(data) => {
        setDataFromChild(data)
    }

    let productosTOTAL = []

    const filterDataFromChild = async(dataFromChild, productosTOTAL) => {
        if(productosTOTAL.length == 0){
            productosTOTAL.push(dataFromChild)
            return
        } else {
            let index = productosTOTAL.findIndex((producto) => producto.nombreProducto === dataFromChild.nombreProducto)
            if(index !== -1){
                productosTOTAL[index] = dataFromChild
            } else {
                productosTOTAL.push(dataFromChild)
            }
        }
        console.log(productosTOTAL)
    }

    const handleTotal = async(productosTOTAL) => {
        let totalP = 0
        for(let i = 0; i < productosTOTAL.length; i++){
            totalP += productosTOTAL[i].precio
        }
        setTotal(totalP)
    }

    useEffect(() => {
        filterDataFromChild(dataFromChild, productosTOTAL)
    }, [dataFromChild])
    useEffect(() => {
        handleTotal(productosTOTAL)
    }, [productosTOTAL])
    return (
        <Container size='sm' w={450} m='10px 50px' p={15} style={{
            border: '2px solid #D9D9D9',
            borderRadius: '20px',
        }}>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List mb={25}>
                    <Tabs.Tab value="lista" color="orange">Lista</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="lista">
                    <Flex direction='column'>
                        {!productos ?
                        <ProductoEnLista producto={null} />
                        : 
                        productos.map((producto, index) => <ProductoEnLista key={index} producto={producto} sendDataToParent={handleDataFromChild}/>)
                        }
                    </Flex>
                    <Container bg="#17C653" p='10px 15px' pb={0} style={{
                        borderRadius: '20px'
                    }}>
                        <Group justify="space-between">
                            <Text fw='bold' c="white">Subtotal</Text>
                            <Text fw='bold' c="white">${total}</Text>
                        </Group>
                        <Group justify="space-between">
                            <Text fz='2.2rem' fw='bold' c="white">Total</Text>
                            <Text fz='2.2rem' fw='bold' c="white">${total}</Text>
                        </Group>
                    </Container>
                </Tabs.Panel>
            </Tabs>
        </Container>
    )
}

ResumenCompra.propTypes = {
    productos: PropTypes.array
}

export default ResumenCompra