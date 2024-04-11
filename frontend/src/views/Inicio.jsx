import { Container, Title } from "@mantine/core";
import { useContext, useEffect } from "react";
// import UserContext from "../contexts/userContext";
import AuthContext from "../contexts/AuthProvider";
import { notifications } from "@mantine/notifications";
import { MessageCircle } from "tabler-icons-react";

const Inicio = () => {
    const { auth } = useContext(AuthContext)
    // const callHelloWord = async () => {
    //     const test = await prueba()
    //     console.log(test)
    //     return test
    // }
    useEffect(() => {
        notifications.show({
            message: `Bienvenido, ${auth?.user ? auth.user.username : 'usuario'}.`,
            color: 'teal',
            icon: <MessageCircle size={20} />,
          });
    }, [])
    return (
        <Container style={{
            maxWidth: '100vw',
            'padding': '0'
        }}>
            <Title>Inicio</Title>
            <h2>Hola,</h2>
            {/* <p>{ auth.user.username }</p> */}
        </Container>
    );
};

export default Inicio;