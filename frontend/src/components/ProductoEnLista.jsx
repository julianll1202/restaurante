import { Avatar, Group, Text, Button } from "@mantine/core"
import QuantityPicker from "./QuantityPicker"
import { PropTypes } from 'prop-types';
import { useState, useEffect } from "react"
import { STORED_IMAGES_URL } from "../utils/constants"
import { DeviceFloppy } from "tabler-icons-react";

const ProductoEnLista = ({producto, sendDataToParent}) => {
    const [quantity, setQuantity] = useState(1)
    const [data, setData] = useState( {} );

    if(!producto) return (
        <Group mb={15}>
            <Text>No has seleccionado ningún producto</Text>
        </Group>
    )

    let productoF = {
        nombreProducto: producto.nombreProducto,
        precio: (producto.precio)*quantity
    }

    const handleData = async() => {
        setData(productoF);
        sendDataToParent(data);
    }
    useEffect(() => {
        handleData()
    }, [quantity])
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