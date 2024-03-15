import { ActionIcon, Group, TextInput } from "@mantine/core"
import { Minus, Plus } from "tabler-icons-react"
import { PropTypes } from 'prop-types';
import { useState } from "react";

const QuantityPicker = ({ setQty }) => {
    const [quantity, setQuantity] = useState(1)
    return (
        <Group w={140} mb={10} gap='xs'>
            <ActionIcon size='md' mr={0} radius='lg'  onClick={() => {
                setQty(quantity+1);
                setQuantity(quantity+1)
            }}><Plus /></ActionIcon>
            <TextInput ta='center' readOnly  w='42px' size="sm" value={quantity} />
            <ActionIcon ml={0} size='md' radius='lg'  onClick={() => {
                if (quantity !== 1){
                    setQty(quantity-1);
                    setQuantity(quantity-1)
                }
            }} ><Minus /></ActionIcon>
        </Group>
    )
}

QuantityPicker.propTypes = {
    setQty: PropTypes.func
}

export default QuantityPicker