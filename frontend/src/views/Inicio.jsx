import { Container, Title } from "@mantine/core";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/userContext";
import { prueba } from "../utils/auth";

const Inicio = () => {
    const user = useContext(UserContext).user;
    const callHelloWord = async () => {
        const test = await prueba()
        console.log(test)
        return test
    }
    useEffect(() => {
        callHelloWord()
    }, [])
    return (
        <Container style={{
            maxWidth: '100vw',
            'padding': '0'
        }}>
            <Title>Inicio</Title>
            <h2>Hola,</h2>
            <p>{ user.username }</p>
        </Container>
    );
};

export default Inicio;