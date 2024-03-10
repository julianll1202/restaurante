import { Button, Group, Text, TextInput, Title, Flex, Select } from "@mantine/core"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";


const Comandas = () => {
    const location = useLocation();
    let mesaId;
    try {
        mesaId = location.state.mesaId;
    }catch(e){
    }
    useEffect(() => {
    })
    return (
        <Group gap="lg" align="center" justify="center" w="100%" bg="red">
            <Title>Mesa</Title>
            <Title>{mesaId ? mesaId : 0}</Title>
        </Group>
    )
}

export default Comandas
