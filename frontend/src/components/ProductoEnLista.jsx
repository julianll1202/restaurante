import { Avatar, Group, Text } from "@mantine/core"
import QuantityPicker from "./QuantityPicker"
import { PropTypes } from 'prop-types';
import { useState } from "react"
import { STORED_IMAGES_URL } from "../utils/constants"

const ProductoEnLista = ({producto}) => {
    const [quantity, setQuantity] = useState(1)
    const [productoTotalLista, setProductoTotalLista] = useState([])
    if(!producto) return (
        <Group mb={15}>
            <Text>No has seleccionado ningún producto</Text>
        </Group>
    )

    const getCantidadInfo = async () => {
        const productoLista = {
            producto: producto,
            cantidad: quantity
        }
        setProductoTotalLista(productoLista)
    }

    useEffect(() => {
        getSelectInfo()
    }, [])
    return (
        <Group mb={15}>
            <Avatar size='lg' radius='md' src={`${STORED_IMAGES_URL}image-1710119778692.png`} />
            <Text>{producto.nombreProducto}</Text>
            <QuantityPicker setQty={setQuantity} />
            <Text>{(producto.precio)*quantity}</Text>
        </Group>
    )
}
ProductoEnLista.propTypes = {
    producto: PropTypes.array
}
export default ProductoEnLista