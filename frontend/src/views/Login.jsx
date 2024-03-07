import { Button, Group, PasswordInput, TextInput, Title, Text, Stack, Image, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { login } from "../utils/auth";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../contexts/AuthProvider";
import useAxiosClient from "../utils/createAxiosClient";

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const API = useAxiosClient()

    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate();
    const handleLogin = async(values) => {
        const res = await API.post('users/login', {
        username: values.username, password: values.password
    })
        if (res.status === 200) {
            Cookies.set('accessToken', res.data.accessToken);
            setAuth({ user: res.data.user, accessToken: res.data.accessToken });
            navigate(from, { replace: true })
        }
    };

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
    })
    return (
        <Group gap={0} align="center" justify="center" w="100vw" mih="100vh" wrap="nowrap">
        <Stack justify="center" align="center" bg="#6C5F5B" h="100vh" w="50%">
            <Image w="92%" h="92%" radius="md" flex="0 0 auto" src="https://cdn-3.expansion.mx/dims4/default/67914fa/2147483647/strip/true/crop/1638x2048+0+0/resize/1200x1500!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fb5%2Fa9%2F148bd3ba4ab780899ecd12d46cb7%2Fsalon-gallos-merida.jpg"/>
        </Stack>
        <Stack justify="center" align="center" bg="#F6F1EE" h="100vh" w="50%">
            <Title order={1} fw={700} size="3.5rem">¡Bienvenido!</Title>
            <Text size="lg">Inicia sesión en AltaServe</Text>
            <form onSubmit={form.onSubmit(handleLogin)}>
                <TextInput placeholder="Escribe tu usuario" required {...form.getInputProps('username')} size="md" color="red" w={300}/>
                <PasswordInput placeholder="Escribe tu contraseña" required {...form.getInputProps('password')} size="md" mt={15}/>
                <Button type="submit" variant='filled' size="md" mt={20} w={300}>Iniciar Sesión</Button>
            </form>
        </Stack>
        </Group>
    );
};

export default Login;