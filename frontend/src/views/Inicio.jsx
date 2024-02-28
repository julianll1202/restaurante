import { Container, Title } from "@mantine/core";
import { useContext } from "react";
import UserContext from "../contexts/userContext";

const Inicio = () => {
    const user = useContext(UserContext).user;

    return (
        <Container style={{
            maxWidth: '100vw',
            'padding': '0'
        }}>
            <Title>Inicio</Title>
            <h2>Hola,</h2>
            <p>{ user => user.user.username}</p>
        </Container>
    );
};

export default Inicio;