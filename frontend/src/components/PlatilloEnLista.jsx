import { Avatar, Group, Text } from "@mantine/core"
import QuantityPicker from "./QuantityPicker"
import { useContext, useEffect, useState } from "react"
import { PropTypes } from 'prop-types';
import { listaP } from "../views/CrearComanda";

const PlatilloEnLista = ({imagen, id, nombre, precio, cantidad}) => {
    const [quantity, setQuantity] = useState(cantidad)
    const { listaPlatillos, setListaPlatillos } = useContext(listaP)
    const updateCantidad = () => {
        const oldListaP = [...listaPlatillos]
        if (quantity === 0) {
            const index = oldListaP.findIndex((i) => i.id === id)
            oldListaP.splice(index,1)
        } else {
            oldListaP.forEach((item) => {
                if (item.platilloId === id) {
                    item.cantidad = quantity
                }
            })
        }
        setListaPlatillos(oldListaP)
        console.log(listaPlatillos)
    }
    useEffect(() => {
        updateCantidad()
    }, [quantity])

    useEffect(() => {
        setQuantity(cantidad)
    }, [cantidad])
    return (
        <Group mb={15}>
            <Avatar size='lg' radius='md' src={`${imagen}`} />
            <Text w={70}  style={{
                'overflow': 'hidden',
                'textOverflow':'ellipsis'
            }}>{ nombre }</Text>
            <QuantityPicker setQty={setQuantity} cantInicial={cantidad} />
            <Text>{`$${precio}`}</Text>
        </Group>
    )
}

PlatilloEnLista.propTypes = {
    id: PropTypes.number,
    nombre: PropTypes.string,
    precio: PropTypes.string,
    imagen: PropTypes.string,
    cantidad: PropTypes.number
}
export default PlatilloEnLista