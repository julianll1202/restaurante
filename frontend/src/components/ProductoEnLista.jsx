import { Group, Text } from "@mantine/core"
import QuantityPicker from "./QuantityPicker"
import { PropTypes } from 'prop-types';
import { useState, useEffect, useContext } from "react"
import { listaProd } from "./ModalCompras";

const ProductoEnLista = ({producto}) => {
    const [quantity, setQuantity] = useState(1)
    const { productos, setProductos } = useContext(listaProd)

    useEffect(() => {
        updateCantidad()
    }, [quantity])

    useEffect(() => {
        cantidadActualizada()
    }, [productos])


    if(!producto) return (
        <Group mb={15}>
            <Text>No has seleccionado ningún producto</Text>
        </Group>
    )

    let productoF = {
        nombreProducto: producto.nombreProducto,
        precio: (producto.precio)*quantity
    }

    const cantidadActualizada = () => {
        const oldListaP = [...productos]
        oldListaP.forEach((item) => {
            if (item.productoId === producto.productoId) {
                setQuantity(item.cantidad)
                return
            }
        })
    }

    const updateCantidad = () => {
        const oldListaP = [...productos]
        if (quantity === 0) {
            const index = oldListaP.findIndex((i) => i.productoId === producto.productoId)
            oldListaP.splice(index,1)
        } else {
            oldListaP.forEach((item) => {
                if (item.productoId === producto.productoId) {
                    item.cantidad = quantity
                }
            })
        }
        setProductos(oldListaP)
    }

    return (
        <Group mb={15}>
            {/* <Avatar size='lg' radius='md' src={`${STORED_IMAGES_URL}image-1710119778692.png`} /> */}
            <Text>{productoF.nombreProducto}</Text>
            <QuantityPicker setQty={setQuantity} getQty={quantity}/>
            <Text>{productoF.precio}</Text>
        </Group>
    )
}
ProductoEnLista.propTypes = {
    producto: PropTypes.object
}
export default ProductoEnLista