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
        precio: Math.round(((producto.precio)*quantity)*100)/100
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
                    item.precioTotal = quantity*item.precio
                    item.precioTotal = Math.round(item.precioTotal*100)/100
                }
            })
        }
        setProductos(oldListaP)
    }

    return (
        <Group mb={15}>
            <Text>{productoF.nombreProducto}</Text>
            <QuantityPicker setQty={setQuantity} cantInicial={producto.cantidad}/>
            <Text>{productoF.precio}</Text>
        </Group>
    )
}
ProductoEnLista.propTypes = {
    producto: PropTypes.object
}
export default ProductoEnLista