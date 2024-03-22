import { Button, Group, PasswordInput, TextInput, Title, Text, Stack, Image, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";
import { login } from "../utils/auth";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../contexts/AuthProvider";

const Login = () => {
    const { setAuth, persist, setPersist } = useContext(AuthContext)
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate();
    const handleLogin = async(values) => {
        const res = await login(values.username, values.password)
        if (res.status === 200) {
            Cookies.set('accessToken', res.data.accessToken);
            setAuth({ user: res.data.user, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken });
            setPersist(true)
            localStorage.setItem('persist', persist)
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
          <Stack h="20vh" w="100%">
            <Group justify="right" pr="3rem">
            <Text>¿No tienes una cuenta?</Text><Anchor ml="-0.5rem" c="#2656FF">Regístrate</Anchor>
            </Group>
          </Stack>
        <Stack h="73vh">
          <Title order={1} fw={700} size="4.5rem" mb="0">¡Bienvenido!</Title>
            <Text size="1.5rem" mt="-0.5rem" mb={30}>Inicia sesión en AltaServe</Text>
            <form onSubmit={form.onSubmit(handleLogin)}>
                <TextInput placeholder="Escribe tu usuario" required {...form.getInputProps('username')} radius="md" size="xl" mb={25} color="red" w="100%"/>
                <PasswordInput placeholder="Escribe tu contraseña" required {...form.getInputProps('password')} size="xl" mt={15} w="100%"/>
                <Button type="submit" variant='filled' size="xl" mt={30} w="100%" >Iniciar Sesión</Button>
            </form>
        </Stack>
        </Stack>
    </Group>
    );
};

export default Login;