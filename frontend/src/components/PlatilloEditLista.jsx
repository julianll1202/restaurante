import { Avatar, Group, Text } from "@mantine/core"
import QuantityPicker from "./QuantityPicker"
import { useContext, useEffect, useState } from "react"
import { PropTypes } from 'prop-types';
import { comandaE } from "../views/EditarComanda";

const PlatilloEditLista = ({imagen, id, nombre, precio, cantidad}) => {
    const [quantity, setQuantity] = useState(cantidad)
    const { comandaEdit, setComandaEdit } = useContext(comandaE)
    const updateCantidad = () => {
        if (comandaEdit) {
            const oldListaP = {...comandaEdit}
            if (quantity === 0) {
                const index = comandaEdit.platillosEnComanda.findIndex((i) => i.platillo.platillId === id)
                oldListaP.platillosEnComanda.splice(index,1)
            } else {
                oldListaP.platillosEnComanda.forEach((item) => {
                    if (item.platillo.platilloId === id) {
                        item.cantidad = quantity
                    }
                })
            }
            setComandaEdit(oldListaP)
            console.log(comandaEdit)
        }
    }
    useEffect(() => {
        setQuantity(cantidad)
    }, [])
    useEffect(() => {
        updateCantidad()
    }, [quantity])
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

PlatilloEditLista.propTypes = {
    id: PropTypes.number,
    nombre: PropTypes.string,
    precio: PropTypes.string,
    imagen: PropTypes.string,
    cantidad: PropTypes.number
}
export default PlatilloEditLista