import { Group, Text } from "@mantine/core"
import QuantityPicker from "./QuantityPicker"
import { PropTypes } from 'prop-types';
import { useState, useEffect, useContext } from "react"
import { productosReceta } from "./ModalPlatillos";

const ProductoEnReceta = ({producto}) => {
    const [quantity, setQuantity] = useState(producto.cantidad)
    const { listaProductos, setListaProductos } = useContext(productosReceta)

    useEffect(() => {
        updateCantidad()
    }, [quantity])

    useEffect(() => {
        cantidadActualizada()
    }, [listaProductos])


    if(!producto) return (
        <Group mb={15}>
            <Text>No has seleccionado ningún producto</Text>
        </Group>
    )

    let productoF = {
        nombreProducto: producto.productoNombre,
    }

    const cantidadActualizada = () => {
        const oldListaP = [...listaProductos]
        oldListaP.forEach((item) => {
            if (item.productoId === producto.productoId) {
                setQuantity(item.cantidad)
                return
            }
        })
    }

    const updateCantidad = () => {
        const oldListaP = [...listaProductos]
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
        setListaProductos(oldListaP)
    }

    return (
        <Group mb={15}>
            <Text>{productoF.nombreProducto}</Text>
            <QuantityPicker setQty={setQuantity} cantInicial={producto.cantidad}/>
        </Group>
    )
}
ProductoEnReceta.propTypes = {
    producto: PropTypes.object
}
export default ProductoEnReceta