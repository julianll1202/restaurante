import { Group, Text } from "@mantine/core"
import QuantityPicker from "./QuantityPicker"
import { PropTypes } from 'prop-types';
import { useState, useEffect, useContext } from "react"
import { listaProd } from "./ModalCompras";

const ProductoEnLista = ({producto, sendDataToParent}) => {
    const [quantity, setQuantity] = useState(1)
    const [data, setData] = useState( {} );
    const { productos, setProductos } = useContext(listaProd)

    useEffect(() => {
        handleData()
        updateCantidad()
    }, [quantity])

    if(!producto) return (
        <Group mb={15}>
            <Text>No has seleccionado ningún producto</Text>
        </Group>
    )

    let productoF = {
        nombreProducto: producto.nombreProducto,
        precio: (producto.precio)*quantity
    }

    const updateCantidad = () => {
        const oldListaP = [...productos]
        if (quantity === 0) {
            const index = oldListaP.findIndex((i) => i.platilloId === producto.platilloId)
            oldListaP.splice(index,1)
        } else {
            oldListaP.forEach((item) => {
                if (item.platilloId === producto.platilloId) {
                    item.cantidad = quantity
                }
            })
        }
        setProductos(oldListaP)
        console.log(productos)
    }

    const handleData = async() => {
        setData(productoF);
        sendDataToParent(data);
    }

    return (
        <Group mb={15}>
            {/* <Avatar size='lg' radius='md' src={`${STORED_IMAGES_URL}image-1710119778692.png`} /> */}
            <Text>{productoF.nombreProducto}</Text>
            <QuantityPicker setQty={setQuantity}/>
            <Text>{productoF.precio}</Text>
        </Group>
    )
}
ProductoEnLista.propTypes = {
    producto: PropTypes.object,
    sendDataToParent: PropTypes.func
}
export default ProductoEnLista