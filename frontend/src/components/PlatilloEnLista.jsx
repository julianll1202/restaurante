import { Avatar, Group, Text } from "@mantine/core"
import QuantityPicker from "./QuantityPicker"
import { useState } from "react"
import { STORED_IMAGES_URL } from "../utils/constants"

const PlatilloEnLista = () => {
    const [quantity, setQuantity] = useState(1)
    return (
        <Group mb={15}>
            <Avatar size='lg' radius='md' src={`${STORED_IMAGES_URL}image-1710119778692.png`} />
            <Text>Biscuit Sandwich</Text>
            <QuantityPicker setQty={setQuantity} />
            <Text>$65.00</Text>
        </Group>
    )
}

export default PlatilloEnLista