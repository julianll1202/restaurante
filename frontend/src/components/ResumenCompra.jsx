import { Container, Flex, Group, Tabs, Text } from "@mantine/core"
import { useContext, useEffect, useState } from "react"
import ProductoEnLista from './ProductoEnLista';
import { PropTypes } from 'prop-types';
import { listaProd } from "./ModalCompras"

const ResumenCompra = ({productos, setTotalCompra}) => {
    const [activeTab, setActiveTab] = useState('lista')
    const listaP = useContext(listaProd).productos
    const [subTotal, setSubTotal] = useState(0)

    const getSubTotal = () => {
        let total = 0
        listaP.forEach((p) => {
            total += p.cantidad*p.precio
            total = Math.round(total*100)/100
        })
        setSubTotal(total)
        setTotalCompra(total)
    }

    useEffect(() => {
        getSubTotal()
    }, [listaP])

    return (
        <Container size='sm' w={400} m='10px 50px' p={15} style={{
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
                        productos.map((producto, index) => <ProductoEnLista key={index} producto={producto} />)
                        }
                    </Flex>
                    <Container bg="#17C653" p='10px 15px' pb={0} style={{
                        borderRadius: '20px'
                    }}>
                        <Group justify="space-between">
                            <Text fw='bold' c="white">Subtotal</Text>
                            <Text fw='bold' c="white">${subTotal}</Text>
                        </Group>
                        <Group justify="space-between">
                            <Text fz='2.2rem' fw='bold' c="white">Total</Text>
                            <Text fz='2.2rem' fw='bold' c="white">${subTotal}</Text>
                        </Group>
                    </Container>
                </Tabs.Panel>
            </Tabs>
        </Container>
    )
}

ResumenCompra.propTypes = {
    productos: PropTypes.array,
    setTotalCompra: PropTypes.func
}

export default ResumenCompra